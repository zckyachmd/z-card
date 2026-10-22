import fs from 'node:fs'
import { execFileSync } from 'node:child_process'
const [target, output = 'tests/performance/results/resources.jsonl', kind = 'process'] =
  process.argv.slice(2)
if (!target)
  throw new Error(
    'Provide a process PID or container name and output path; optional kind=container',
  )
fs.mkdirSync(new URL('./results', import.meta.url), { recursive: true })
function sample() {
  const timestamp = new Date().toISOString()
  try {
    const metrics =
      kind === 'container'
        ? execFileSync('docker', ['stats', '--no-stream', '--format', '{{json .}}', target], {
            encoding: 'utf8',
          }).trim()
        : execFileSync('ps', ['-p', target, '-o', 'pid=,%cpu=,rss='], { encoding: 'utf8' }).trim()
    const state =
      kind === 'container'
        ? execFileSync(
            'docker',
            [
              'inspect',
              '--format',
              '{{json .State}} {{.RestartCount}} {{.HostConfig.Memory}} {{.HostConfig.NanoCpus}}',
              target,
            ],
            { encoding: 'utf8' },
          ).trim()
        : 'RSS in KiB; CPU is ps lifetime average, not instantaneous saturation; no container limits/restarts'
    fs.appendFileSync(output, JSON.stringify({ timestamp, kind, target, metrics, state }) + '\n')
  } catch (error) {
    fs.appendFileSync(output, JSON.stringify({ timestamp, error: String(error) }) + '\n')
    process.exitCode = 1
    clearInterval(timer)
  }
}
const timer = setInterval(sample, 2000)
sample()
process.on('SIGTERM', () => {
  clearInterval(timer)
  process.exit()
})
