import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    // Wait for page to fully load
    await page.waitForLoadState('networkidle')
    // Wait for React hydration
    await page.waitForTimeout(300)
  })

  test('should display navbar with all links', async ({ page }) => {
    // Check navbar is visible
    const navbar = page.locator('header')
    await expect(navbar).toBeVisible()

    // Check navigation links
    await expect(page.getByRole('link', { name: /About/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /Projects/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /Contact/i })).toBeVisible()
  })

  test('should navigate to about section', async ({ page }) => {
    // Click About link
    const aboutLink = page.getByRole('link', { name: /About/i })
    await aboutLink.click()

    // Wait for hash to update in URL
    await page.waitForURL(/#about/, { timeout: 2000 })

    // Wait for scroll animation to complete
    await page.waitForTimeout(800)

    // Check about section is visible and in viewport
    const aboutSection = page.locator('#about')
    await expect(aboutSection).toBeVisible()

    // Verify section is scrolled into view (check if it's in viewport)
    const isInViewport = await aboutSection.evaluate(el => {
      const rect = el.getBoundingClientRect()
      return rect.top >= 0 && rect.top <= window.innerHeight
    })
    expect(isInViewport).toBe(true)
  })

  test('should navigate to projects section', async ({ page }) => {
    // Click Projects link
    const projectsLink = page.getByRole('link', { name: /Projects/i })
    await projectsLink.click()

    // Wait for hash to update in URL
    await page.waitForURL(/#projects/, { timeout: 2000 })

    // Wait for scroll animation to complete
    await page.waitForTimeout(800)

    // Check projects section is visible and in viewport
    const projectsSection = page.locator('#projects')
    await expect(projectsSection).toBeVisible()

    // Verify section is scrolled into view
    const isInViewport = await projectsSection.evaluate(el => {
      const rect = el.getBoundingClientRect()
      return rect.top >= 0 && rect.top <= window.innerHeight
    })
    expect(isInViewport).toBe(true)
  })

  test('should navigate to contact section', async ({ page }) => {
    // Click Contact link
    const contactLink = page.getByRole('link', { name: /Contact/i })
    await contactLink.click()

    // Wait for hash to update in URL
    await page.waitForURL(/#contact/, { timeout: 2000 })

    // Wait for scroll animation to complete
    await page.waitForTimeout(800)

    // Check contact section is visible and in viewport
    const contactSection = page.locator('#contact')
    await expect(contactSection).toBeVisible()

    // Verify section is scrolled into view
    const isInViewport = await contactSection.evaluate(el => {
      const rect = el.getBoundingClientRect()
      return rect.top >= 0 && rect.top <= window.innerHeight
    })
    expect(isInViewport).toBe(true)
  })

  test('should navigate to home section', async ({ page }) => {
    // Navigate to contact section first
    await page.getByRole('link', { name: /Contact/i }).click()
    await page.waitForURL(/#contact/, { timeout: 2000 })
    await page.waitForTimeout(500)

    // Click home/logo link (link to root)
    const homeLink = page.getByRole('link', { name: /Zacky Achmad/i }).first()
    await expect(homeLink).toBeVisible()
    await homeLink.click()

    // Wait for navigation to root
    await page.waitForURL(/^http:\/\/localhost:3000\/?$/, { timeout: 2000 })
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(500) // Wait for any scroll animations

    // Check home section is visible
    const homeSection = page.locator('#home')
    await expect(homeSection).toBeVisible()

    // Verify we're at the top of the page (home section)
    const scrollPosition = await page.evaluate(() => window.scrollY)
    expect(scrollPosition).toBeLessThan(100) // Should be near top
  })

  test('should maintain navbar visibility while scrolling', async ({ page }) => {
    // Check navbar is visible initially
    const navbar = page.locator('header')
    await expect(navbar).toBeVisible()

    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(500) // Wait for scroll

    // Navbar should still be visible (sticky header)
    await expect(navbar).toBeVisible()
  })

  test('should handle navigation from hero section buttons', async ({ page }) => {
    // Check "View Projects" button exists
    const viewProjectsButton = page.getByRole('link', { name: /View Projects/i })
    await expect(viewProjectsButton).toBeVisible()

    // Click "View Projects" button
    await viewProjectsButton.click()

    // Wait for hash to update in URL
    await page.waitForURL(/#projects/, { timeout: 2000 })

    // Wait for scroll animation to complete
    await page.waitForTimeout(800)

    // Check projects section is visible and in viewport
    const projectsSection = page.locator('#projects')
    await expect(projectsSection).toBeVisible()

    // Verify section is scrolled into view
    const isInViewport = await projectsSection.evaluate(el => {
      const rect = el.getBoundingClientRect()
      return rect.top >= 0 && rect.top <= window.innerHeight
    })
    expect(isInViewport).toBe(true)
  })
})
