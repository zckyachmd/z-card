import { expect, test } from '@playwright/test'
test('analytics waits for consent and sends one page view without private query data', async ({
  page,
}) => {
  test.skip(
    !process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    'Runs in isolated analytics fixture build only.',
  )
  let scriptRequests = 0
  await page.route('https://www.googletagmanager.com/**', route => {
    scriptRequests++
    return route.fulfill({
      contentType: 'application/javascript',
      body: '/* isolated analytics loader stub */',
    })
  })
  await page.route(/google-analytics\.com/, route => route.abort())
  await page.goto('/?email=private@example.invalid')
  expect(scriptRequests).toBe(0)
  await page.getByRole('button', { name: 'Allow analytics', exact: true }).click()
  await expect.poll(() => scriptRequests).toBe(1)
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          (window as unknown as { dataLayer: unknown[][] }).dataLayer.filter(
            item => item[0] === 'event' && item[1] === 'page_view',
          ).length,
      ),
    )
    .toBe(1)
  await page
    .getByRole('navigation', { name: 'Main navigation' })
    .getByRole('link', { name: 'About', exact: true })
    .click()
  await expect(page).toHaveURL(/\/about$/)
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          (window as unknown as { dataLayer: unknown[][] }).dataLayer.filter(
            item => item[0] === 'event' && item[1] === 'page_view',
          ).length,
      ),
    )
    .toBe(2)
  const events = await page.evaluate(() =>
    JSON.stringify((window as unknown as { dataLayer: unknown[][] }).dataLayer),
  )
  expect(events).not.toContain('private@example.invalid')
})
test('privacy preference blocks analytics loading', async ({ page }) => {
  test.skip(
    !process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    'Runs in isolated analytics fixture build only.',
  )
  let requests = 0
  await page.addInitScript(() =>
    Object.defineProperty(navigator, 'globalPrivacyControl', { value: true }),
  )
  await page.route('https://www.googletagmanager.com/**', route => {
    requests++
    return route.abort()
  })
  await page.goto('/')
  await expect(page.getByRole('button', { name: 'Allow analytics' })).toHaveCount(0)
  expect(requests).toBe(0)
})
