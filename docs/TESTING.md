# Testing

Run from the pinned Node/pnpm environment. `pnpm format:check`, `pnpm lint`, `pnpm type-check`, `pnpm test`, `pnpm build`, and `pnpm audit --prod --audit-level=high` are independent gates. Vitest uses jsdom for UI/browser utilities and node for filesystem publishing checks. Contact delivery is mocked: do not send real email in automated tests.

Playwright: `pnpm exec playwright install chromium firefox webkit`, build, leave port 3000 free, then `pnpm test:e2e`. The config starts `pnpm start`, never next dev. Browser engines are not silently disabled. Tests cover pages/navigation, metadata/404s/feed/sitemap, responsive menu, theme/device preference, reduced motion, digital card, interactive skill tree, command menu, contact labels and input rejection, plus representative axe checks.

For a real article-detail rendering check without publishing sample writing: `CONTENT_DIRECTORY=tests/fixtures/articles pnpm build`, then `CONTENT_DIRECTORY=tests/fixtures/articles pnpm exec playwright test -g 'article fixture'`. Rebuild without this variable afterward. This verifies anchors, duplicate heading IDs, table of contents, safe Markdown, code controls and feed inclusion. The normal-content test intentionally reports the fixture case skipped; the separate fixture build must execute it.

For manual accessibility review, Tab through the skip link, navigation, theme, skill nodes, forms and dialogs. Confirm focus restoration and Escape behavior. Check both themes, 320/375px phones, tablet, laptop and wide desktop, 200% zoom, visible errors, reduced motion and text resizing. Axe findings are evidence, not a full WCAG conformance claim. Screen-reader behavior requires manual validation with actual assistive technology.

Performance: use tests/performance/README.md. Run k6 smoke/baseline/load against production, capture resource samples separately, retain actual summaries and report environment details. Browser vitals are synthetic and do not establish field Core Web Vitals. Stress/spike/soak are manual isolated-environment profiles. No contact POST traffic is generated.

CI workflow contains these gates; a committed workflow is not a verified CI run. Record exact commands/results and environmental limitations in the delivery report. Never report blocked tests as passed.
