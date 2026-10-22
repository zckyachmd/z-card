import http from 'k6/http'
import { check } from 'k6'
import { Counter } from 'k6/metrics'
import execution from 'k6/execution'

const base = (__ENV.BASE_URL || 'http://127.0.0.1:3000').replace(/\/$/, '')
const host = base
  .replace(/^https?:\/\//, '')
  .split('/')[0]
  .split(':')[0]
if (
  !['localhost', '127.0.0.1', 'web', 'host.docker.internal'].includes(host) &&
  __ENV.ALLOW_REMOTE !== 'true'
)
  throw new Error(
    'Remote targets require ALLOW_REMOTE=true; public production stress is not authorized.',
  )
const profile = __ENV.PROFILE || 'smoke'
const rate = Number(__ENV.RATE || (profile === 'smoke' ? 2 : 10))
const duration =
  __ENV.DURATION || (profile === 'smoke' ? '10s' : profile === 'soak' ? '30m' : '30s')
const allocated = Number(__ENV.VUS || 20)
const constant = {
  executor: 'constant-arrival-rate',
  rate,
  timeUnit: '1s',
  duration,
  preAllocatedVUs: allocated,
  maxVUs: allocated * 4,
}
const ramp = stages => ({
  executor: 'ramping-arrival-rate',
  startRate: 1,
  timeUnit: '1s',
  preAllocatedVUs: allocated,
  maxVUs: allocated * 4,
  stages,
})
const profiles = {
  smoke: constant,
  baseline: constant,
  load: ramp([
    { duration: '10s', target: rate },
    { duration, target: rate },
    { duration: '10s', target: 0 },
  ]),
  stress: ramp([
    { duration: '30s', target: rate },
    { duration: '1m', target: rate * 3 },
    { duration: '1m', target: rate * 6 },
    { duration: '30s', target: 0 },
  ]),
  spike: ramp([
    { duration: '10s', target: rate },
    { duration: '1s', target: rate * 10 },
    { duration: '30s', target: rate * 10 },
    { duration: '10s', target: rate },
  ]),
  soak: constant,
}
if (!profiles[profile]) throw new Error(`Unknown profile ${profile}`)
const routes = [
  ['/', 30],
  ['/about', 12],
  ['/projects', 18],
  ['/projects/klikin-click', 12],
  ['/projects/plantarium', 8],
  ['/blog', 12],
  ['/contact', 4],
  ['/sitemap.xml', 2],
  ['/feed.xml', 2],
]
if (__ENV.COMPARE_HOME === 'true') routes.splice(0, routes.length, ['/', 100])
if (__ENV.ARTICLE_PATH) routes.push([__ENV.ARTICLE_PATH, 10])
const thresholds = {
  http_req_failed: ['rate<0.01'],
  checks: ['rate>=0.99'],
  'dropped_iterations{scenario:pages}': ['count==0'],
}
for (const [route] of routes) {
  thresholds[`http_reqs{route:${route},scenario:pages}`] = ['count>0']
  thresholds[`http_req_duration{route:${route},scenario:pages}`] = [
    `p(95)<${__ENV.P95 || 500}`,
    `p(99)<${__ENV.P99 || 1000}`,
  ]
}
export const options = {
  scenarios: {
    pages: profiles[profile],
    health: {
      executor: 'constant-arrival-rate',
      exec: 'health',
      rate: 1,
      timeUnit: '1s',
      duration,
      preAllocatedVUs: 1,
      maxVUs: 2,
    },
  },
  thresholds,
  summaryTrendStats: ['avg', 'med', 'p(90)', 'p(95)', 'p(99)', 'max'],
}
const statuses = new Counter('status_distribution')
const pageRequests = new Counter('page_requests')
export function setup() {
  for (const [route] of routes) {
    const response = http.get(`${base}${route}`, { tags: { route, phase: 'warmup' } })
    check(response, { 'warmup returns 200': response => response.status === 200 })
  }
}
export default function userTraffic() {
  const total = routes.reduce((sum, route) => sum + route[1], 0)
  let pick = Math.random() * total
  const weightedRoute =
    routes.find(route => {
      pick -= route[1]
      return pick < 0
    })?.[0] || '/'
  const route =
    execution.scenario.iterationInTest < routes.length
      ? routes[execution.scenario.iterationInTest][0]
      : weightedRoute
  const response = http.get(`${base}${route}`, { tags: { route, phase: 'steady' } })
  statuses.add(1, { status: String(response.status), route })
  pageRequests.add(1, { route })
  check(response, {
    'page returns 200': response => response.status === 200,
    'has expected content type': response =>
      /text\/html|xml/.test(response.headers['Content-Type'] || ''),
  })
}
export function health() {
  const response = http.get(`${base}/api/health`, {
    tags: { route: '/api/health', phase: 'health' },
  })
  check(response, { 'health returns 200': response => response.status === 200 })
}
export function handleSummary(data) {
  const output = __ENV.OUTPUT || 'tests/performance/results'
  const metrics = data.metrics
  const pages = metrics['http_req_duration']?.values || {}
  const report = `# k6 ${profile}\n\nTarget: ${base}\nCommit: ${__ENV.COMMIT_SHA || 'unrecorded'}\nNode: ${__ENV.NODE_VERSION || 'unrecorded'}\nNext: ${__ENV.NEXT_VERSION || 'unrecorded'}\nk6: ${__ENV.K6_VERSION || 'unrecorded'}\nEnvironment: ${__ENV.TEST_ENVIRONMENT || 'unrecorded'}\nCPU/memory limits: ${__ENV.RESOURCE_LIMITS || 'unrestricted host; shared resources'}\nCache: warm after setup\nDuration: ${duration} (plus ramp stages where applicable)\nTarget rate: ${rate} pages/s (ramp multiplier for stress/spike)\nAchieved overall HTTP RPS, includes health/warmup: ${metrics.http_reqs?.values.rate}\nRequests: ${metrics.http_reqs?.values.count}\nIterations/s: ${metrics.iterations?.values.rate}\nFailure rate: ${metrics.http_req_failed?.values.rate}\nDropped iterations: ${metrics.dropped_iterations?.values.count || 0}\nLatency avg/median/p90/p95/p99/max ms: ${JSON.stringify(pages)}\n\nPer-route thresholds, throughput, network bytes and status distribution are in the JSON summary and optional raw JSON stream. Server resource samples are separate; k6 does not measure application CPU or memory.\n`
  return {
    [`${output}/${profile}.json`]: JSON.stringify(data, null, 2),
    [`${output}/${profile}.md`]: report,
    stdout: report,
  }
}
