import { expect, test } from '@playwright/test'
test('contact reports success and delivery failure using mocked HTTP transport', async ({
  page,
}) => {
  await page.goto('/contact')
  let succeeds = true
  await page.route('**/api/contact', route =>
    route.fulfill({
      status: succeeds ? 200 : 503,
      contentType: 'application/json',
      body: JSON.stringify(
        succeeds ? { success: true } : { success: false, error: 'Message could not be delivered.' },
      ),
    }),
  )
  async function fill() {
    await page.getByLabel('Name', { exact: true }).fill('Test Person')
    await page.getByLabel('Email', { exact: true }).fill('test@example.invalid')
    await page
      .getByLabel('Message', { exact: true })
      .fill('An isolated test message, never delivered.')
    await page.getByRole('button', { name: 'Send message', exact: true }).click()
  }
  await fill()
  await expect(page.locator('form [role="status"]')).toContainText('Message sent successfully.')
  succeeds = false
  await fill()
  await expect(page.locator('form [role="status"]')).toContainText('could not be delivered')
})
test('contact form has labels, validation and honest email fallback', async ({ page }) => {
  await page.goto('/contact')
  await expect(page.getByLabel('Name', { exact: true })).toBeVisible()
  await expect(page.getByLabel('Email', { exact: true })).toBeVisible()
  await expect(page.getByLabel('Message', { exact: true })).toBeVisible()
  await page.getByLabel('Name', { exact: true }).fill('A')
  expect(
    await page
      .getByLabel('Name', { exact: true })
      .evaluate(
        (element: HTMLInputElement) =>
          element.validity.tooShort || element.value.length < element.minLength,
      ),
  ).toBe(true)
  await expect(page.getByRole('link', { name: 'hi@zacky.id', exact: true })).toHaveAttribute(
    'href',
    'mailto:hi@zacky.id',
  )
})
test('contact endpoint rejects malformed and oversized bodies without sending mail', async ({
  request,
}) => {
  expect(
    (
      await request.post('/api/contact', {
        headers: { 'content-type': 'text/plain' },
        data: 'invalid',
      })
    ).status(),
  ).toBe(400)
  expect(
    (
      await request.post('/api/contact', {
        headers: { 'content-type': 'application/json' },
        data: 'not-json',
      })
    ).status(),
  ).toBe(400)
  expect(
    (
      await request.post('/api/contact', {
        headers: { 'content-type': 'application/json' },
        data: 'x'.repeat(1024 * 1024 + 1),
      })
    ).status(),
  ).toBe(413)
})
