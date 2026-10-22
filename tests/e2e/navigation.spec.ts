import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('homepage and primary navigation', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Software engineer.')
  for (const [label, pathname] of [
    ['About', '/about'],
    ['Projects', '/projects'],
    ['Journal', '/blog'],
    ['Contact', '/contact'],
  ]) {
    await page
      .getByRole('navigation', { name: 'Main navigation' })
      .getByRole('link', { name: label, exact: true })
      .click()
    await expect(page).toHaveURL(new RegExp(`${pathname}$`))
    await expect(page.locator('h1')).toHaveCount(1)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `https://zacky.id${pathname}`,
    )
  }
})
test('projects, real 404s, RSS, sitemap, and metadata', async ({ page, request }) => {
  await page.goto('/projects')
  await page.getByRole('heading', { name: 'Plantarium' }).getByRole('link').click()
  await expect(page).toHaveURL(/\/projects\/plantarium$/)
  await expect(page.locator('main')).toContainText('Engineering considerations')
  for (const pathname of [
    '/projects/missing-project',
    '/blog/missing-article',
    '/blog/publishing-template',
  ]) {
    expect((await request.get(pathname)).status()).toBe(404)
  }
  expect((await request.get('/feed.xml')).headers()['content-type']).toContain(
    'application/rss+xml',
  )
  const sitemap = await (await request.get('/sitemap.xml')).text()
  expect(sitemap).toContain('https://zacky.id/projects/plantarium')
  expect(sitemap).not.toContain('publishing-template')
  const data = await page.locator('script[type="application/ld+json"]').allTextContents()
  expect(data.map(value => JSON.parse(value)['@type'])).toContain('SoftwareSourceCode')
})
test('mobile menu, focus, responsive overflow, and reduced motion', async ({
  page,
  browserName,
}) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await page.keyboard.press(browserName === 'webkit' ? 'Alt+Tab' : 'Tab')
  await expect(page.getByRole('link', { name: /skip/i })).toBeFocused()
  await page.getByRole('button', { name: 'Open navigation' }).click()
  await expect(page.getByRole('button', { name: 'Close navigation' })).toHaveAttribute(
    'aria-expanded',
    'true',
  )
  await page
    .getByRole('navigation', { name: 'Main navigation' })
    .getByRole('link', { name: 'Journal' })
    .click()
  await expect(page).toHaveURL(/\/blog$/)
  await page.waitForLoadState('networkidle')
  for (const pathname of [
    '/',
    '/about',
    '/projects',
    '/projects/plantarium',
    '/blog',
    '/contact',
  ]) {
    await page.goto(pathname)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    expect(
      await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior),
    ).toBe('auto')
  }
})
test('theme selection persists', async ({ page }) => {
  await page.goto('/')
  const before = await page.locator('html').getAttribute('class')
  await page.getByRole('button', { name: 'Toggle theme' }).click()
  await expect(page.locator('html')).not.toHaveAttribute('class', before || '')
  const after = await page.locator('html').getAttribute('class')
  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('class', after || '')
})
test('representative light and dark accessibility', async ({ page }) => {
  for (const pathname of ['/', '/about', '/projects/plantarium', '/blog', '/contact']) {
    await page.goto(pathname)
    const light = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze()
    expect(light.violations).toEqual([])
    await page.getByRole('button', { name: 'Toggle theme' }).click()
    const dark = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze()
    expect(dark.violations).toEqual([])
  }
})
test('article fixture renders safely when fixture build is selected', async ({ page, request }) => {
  test.skip(
    process.env.CONTENT_DIRECTORY !== 'tests/fixtures/articles',
    'Real content build has no published articles; fixture build runs in CI separately.',
  )
  await page.goto('/blog/verification-fixture')
  await expect(page.locator('h1')).toHaveText('Publishing verification fixture')
  await expect(page.locator('#a-heading')).toBeVisible()
  await expect(page.locator('#a-heading-1')).toBeAttached()
  await expect(page.locator('main script:not([type="application/ld+json"])')).toHaveCount(0)
  await expect(page.getByRole('navigation', { name: 'Table of contents' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Copy code' })).toBeVisible()
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'article')
  expect(
    (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze())
      .violations,
  ).toEqual([])
  expect(await (await request.get('/feed.xml')).text()).toContain('verification-fixture')
})
