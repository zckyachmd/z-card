import { browser } from 'k6/browser'
import { check } from 'k6'
const base = __ENV.BASE_URL || 'http://127.0.0.1:3000'
if (
  !/^http:\/\/(localhost|127\.0\.0\.1|web|host\.docker\.internal)(:|\/|$)/.test(base) &&
  __ENV.ALLOW_REMOTE !== 'true'
)
  throw new Error('Remote browser test requires ALLOW_REMOTE=true')
export const options = {
  summaryTrendStats: ['avg', 'min', 'med', 'p(75)', 'p(90)', 'p(95)', 'p(99)', 'max'],
  scenarios: {
    browser: {
      executor: 'shared-iterations',
      vus: 1,
      iterations: 3,
      options: { browser: { type: 'chromium' } },
    },
  },
  thresholds: {
    browser_web_vital_lcp: ['p(75)<2500'],
    browser_web_vital_cls: ['p(75)<0.1'],
    browser_web_vital_inp: ['p(75)<200'],
  },
}
export default async function browserJourney() {
  const page = await browser.newPage()
  try {
    await page.goto(base)
    await page.locator('header a[href="/projects"]').click()
    check(await page.title(), { 'projects rendered': title => title.includes('Projects') })
    await page.waitForTimeout(1000)
  } finally {
    await page.close()
  }
}
