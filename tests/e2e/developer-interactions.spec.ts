import { expect, test } from '@playwright/test'

test('skill tree responds to keyboard and reveals real project paths', async ({ page }) => {
  await page.goto('/')
  const group = page.getByRole('group', { name: 'Engineering skill areas' })
  for (const name of ['Back end', 'Data', 'Interfaces', 'Operations', 'Tools']) {
    const node = group.getByRole('button', { name, exact: true })
    await node.focus()
    await page.keyboard.press('Enter')
    await expect(node).toHaveAttribute('aria-pressed', 'true')
  }
  await expect(page.getByText('Full map explored.', { exact: true })).toBeVisible()
  await page.getByRole('link', { name: 'Inspect the downloader' }).click()
  await expect(page).toHaveURL(/\/projects\/immich-album-downloader$/)
})
test('command menu filters, navigates, and restores focus on escape', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Open command menu' }).click()
  await page.getByRole('textbox', { name: 'Find a page' }).fill('projects')
  await page.getByRole('textbox', { name: 'Find a page' }).press('Enter')
  await expect(page).toHaveURL(/\/projects$/)
  await page.getByRole('button', { name: 'Open command menu' }).click()
  await page.getByRole('textbox', { name: 'Find a page' }).fill('unknown-command')
  await expect(page.getByText('No matching page. Try “projects” or “contact”.')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('button', { name: 'Open command menu' })).toBeFocused()
})
test('digital business card remains usable', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Save contact card' }).click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await expect(page.getByRole('dialog')).toContainText('Zacky')
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).not.toBeVisible()
})
test('default theme follows device until manually changed', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' })
  await page.goto('/')
  await expect(page.locator('html')).toHaveClass(/dark/)
  await page.emulateMedia({ colorScheme: 'light' })
  await expect(page.locator('html')).toHaveClass(/light/)
})
