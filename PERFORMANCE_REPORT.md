# Performance report

Measured 2026-10-22. These are local engineering observations, **not public-production capacity guarantees or real-user Core Web Vitals**.

## Environment and integrity

Host: macOS arm64, Apple M2, 8 logical CPUs, 8GiB RAM. Node 24.22.1 LTS; pnpm 10.34.7; k6 v2.3.0 (local build reports commit/devel, Go 1.27.1). Before: commit `80cb2fadc5583518ebbe6032aa1b7e2868336e43`, Next 16.1.7, React 19.1.0. After: implementation commit `91c95a0c4797bd0a3fda309a2d2998849f51efd4`, Next 16.4.2, React 19.3.1; later delivery changes are recorded in subsequent commits.

Both comparison servers used pinned Node and production `next start` on loopback, not next dev. Same 10 page iterations/s, 30s duration, one homepage request per iteration, 20 preallocated / 80 maximum page VUs, plus separate 1/s health traffic. Setup warmed the homepage before each measurement. The legacy site has no equivalent multi-page routes, so only `/` is compared. Host resources are shared and uncapped; these are single runs, not statistically controlled repeated trials. No percentage improvement or maximum capacity claim is made.

## Comparable homepage measurements

Latency below is **homepage scenario only**, excluding setup and health.

| Metric             |  Before |   After |
| ------------------ | ------: | ------: |
| Page requests      |     301 |     301 |
| Achieved page RPS  |    9.99 |   10.01 |
| Average            | 12.29ms |  3.76ms |
| Median             | 12.56ms |  3.54ms |
| p90                | 16.26ms |  5.80ms |
| p95                | 17.82ms |  7.11ms |
| p99                | 22.29ms |  8.89ms |
| Maximum            | 28.92ms | 14.76ms |
| HTTP failures      |       0 |       0 |
| Dropped iterations |       0 |       0 |

Observed change is consistent with replacing forced SSR and redundant lazy/Suspense section machinery with static generation. This does not isolate framework upgrades from product changes. Health/setup-inclusive total RPS was 11.02 before / 11.08 after; those totals are not presented as user-page throughput. Total bytes received were 44.95MB before / 16.69MB after for these HTTP runs; this is not a browser bundle-size comparison.

## Representative container load

Image `sha256:7ddc051cda725daeeeafb4651b91ca46969011c0922995fa8d76f7ebccb5a826`; Linux arm64 under OrbStack; **2 CPU / 1GiB memory cap**; non-root, read-only root filesystem with writable tmp/cache mounts. Workload: 10s ramp to 20 page iterations/s, 30s plateau, 10s ramp down. Health scenario is separate and runs 30s. Warm-up requests precede load. The generator runs on the same host; local browser-fixture verification overlapped the beginning of this run, so resource isolation is imperfect.

844 total HTTP requests, 804 page requests; whole-run page throughput 15.82/s because ramp periods intentionally reduce the average. Overall HTTP throughput 16.61/s includes health and setup. No dropped iterations, no HTTP failures, 1,648 checks passed. These observations show the offered short workload was delivered, not the server's maximum capacity.

| Route                    |     p95 |      p99 |
| ------------------------ | ------: | -------: |
| `/`                      |  6.27ms |   8.83ms |
| `/about`                 |  5.55ms |  32.31ms |
| `/projects`              |  5.12ms | 101.22ms |
| `/projects/klikin-click` |  5.74ms |   9.46ms |
| `/projects/plantarium`   |  5.46ms | 102.62ms |
| `/blog`                  |  5.54ms |  81.85ms |
| `/contact`               | 20.44ms |  22.68ms |
| `/sitemap.xml`           | 99.75ms | 175.50ms |
| `/feed.xml`              |  4.93ms |   5.41ms |

All route thresholds passed: p95 <500ms, p99 <1000ms; failures <1%; checks ≥99%; zero dropped page iterations. Overall latency avg 6.76ms, median 2.97ms, p90 5.71ms, p95 9.02ms, p99 140.04ms, max 424.70ms. Total received 28.23MB, sent 65.31KB. Contact POSTs were not exercised; automated unit/browser tests mock mail delivery instead. There are no real published articles initially; `ARTICLE_PATH` enables article traffic when content is available. A separate isolated fixture build validates article rendering without fabricating owner-authored content.

## Resources and bottleneck observations

Docker samples (33 snapshots during/around the short run): CPU 0–158.79% (Docker percentage, where two CPUs can total 200%), sampled mean 12.91%. Container memory 46.34–95.72MiB, ending near 58.02MiB. Container remained healthy with **zero restarts and no OOM**. Memory included initial warm-up growth and later fell; this short observation cannot establish absence of leaks. RSS/HWM collection is available separately through `/proc/1/status`; Docker stats alone is not labeled RSS.

Dynamic contact rendering had a higher median than static pages. Tail outliers appeared across otherwise fast routes during shared-host work; no sustained CPU saturation was observed. No optimization based on a guessed event-loop or database bottleneck was applied. Long-duration resource stability remains unverified.

## Browser rendering

k6 browser, Chromium for Testing (Playwright chromium-1248), one VU / three homepage-to-project journeys against the warm local container. Final run: all checks and browser thresholds passed; browser HTTP failures 0/99. Synthetic p75 LCP **182ms**, CLS **0**, INP **44ms**, FCP **182ms**, TTFB **20.9ms**. This very small local warm-cache sample is not representative field p75, a mobile-network result, or a Lighthouse score. An earlier contended run also passed, but is not compared as an optimization result.

## Reproduction and remaining work

See [suite commands](tests/performance/README.md). HTTP JSON/Markdown summaries, browser JSON and resource samples are retained under `tests/performance/results` locally; selected machine-readable evidence is copied into `docs/evidence/performance`. CI retains results as artifacts. `PROFILE=smoke`, `baseline`, `load`, `stress`, `spike`, and `soak` share the route model. Remote hosts require explicit opt-in, and public production stress is not authorized.

Stress, spike and soak scripts are implemented but **not executed** in this delivery. No public-domain load test, production SMTP test, real-user CWV measurement, or capacity ceiling is claimed. Re-run isolated workloads under deployment-equivalent limits, collect plateau-only throughput and resource samples, and investigate regressions before adjusting thresholds.
