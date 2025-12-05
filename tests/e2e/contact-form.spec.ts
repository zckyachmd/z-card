import { test, expect } from '@playwright/test'

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to home page
    await page.goto('/')
    // Wait for page to fully load
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(300) // Wait for React hydration

    // Click contact link in navbar
    const contactLink = page.getByRole('link', { name: /Contact/i })
    await expect(contactLink).toBeVisible()
    await contactLink.click()

    // Wait for hash to update and scroll to complete
    await page.waitForURL(/#contact/, { timeout: 2000 })
    await page.waitForTimeout(800) // Wait for scroll animation

    // Ensure contact section is in viewport
    const contactSection = page.locator('#contact')
    await expect(contactSection).toBeVisible()
  })

  test('should display contact form', async ({ page }) => {
    // Check form heading is visible
    const heading = page.getByRole('heading', { name: 'Get in touch' })
    await expect(heading).toBeVisible()

    // Check all form fields are visible
    const nameInput = page.getByLabel('Name')
    const emailInput = page.getByLabel('Email')
    const messageInput = page.getByLabel('Message')
    const submitButton = page.getByRole('button', { name: /Send/i })

    await expect(nameInput).toBeVisible()
    await expect(emailInput).toBeVisible()
    await expect(messageInput).toBeVisible()
    await expect(submitButton).toBeVisible()

    // Verify form fields are enabled and ready for input
    await expect(nameInput).toBeEnabled()
    await expect(emailInput).toBeEnabled()
    await expect(messageInput).toBeEnabled()
  })

  test('should show validation errors for empty required fields', async ({ page }) => {
    // Get form elements
    const submitButton = page.getByRole('button', { name: /Send/i })
    const nameInput = page.getByLabel('Name')
    const emailInput = page.getByLabel('Email')
    const messageInput = page.getByLabel('Message')

    // Verify form is empty
    await expect(nameInput).toHaveValue('')
    await expect(emailInput).toHaveValue('')
    await expect(messageInput).toHaveValue('')

    // Try to submit empty form - HTML5 validation should prevent submission
    await submitButton.click()

    // Wait for browser validation to trigger
    await page.waitForTimeout(200)

    // Check that form fields are still visible (form didn't submit)
    await expect(nameInput).toBeVisible()
    await expect(emailInput).toBeVisible()
    await expect(messageInput).toBeVisible()

    // Check HTML5 validation (browser native) - at least one field should be invalid
    const nameValidity = await nameInput.evaluate((el: HTMLInputElement) => el.validity.valid)
    const emailValidity = await emailInput.evaluate((el: HTMLInputElement) => el.validity.valid)
    const messageValidity = await messageInput.evaluate(
      (el: HTMLTextAreaElement) => el.validity.valid,
    )

    // At least one required field should be invalid
    expect(nameValidity || emailValidity || messageValidity).toBe(false)
  })

  test('should fill and submit contact form', async ({ page }) => {
    // Mock API response untuk successful submission
    await page.route('/api/contact', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          message: 'Message sent successfully',
        }),
      })
    })

    // Fill form fields
    const nameInput = page.getByLabel('Name')
    const emailInput = page.getByLabel('Email')
    const messageInput = page.getByLabel('Message')
    const submitButton = page.getByRole('button', { name: /Send/i })

    await nameInput.fill('Test User')
    await emailInput.fill('test@example.com')
    await messageInput.fill('This is a test message with enough characters')

    // Verify fields are filled
    await expect(nameInput).toHaveValue('Test User')
    await expect(emailInput).toHaveValue('test@example.com')
    await expect(messageInput).toHaveValue('This is a test message with enough characters')

    // Submit form
    await submitButton.click()

    // Wait for button state change (submitting state)
    await expect(submitButton).toContainText('Sending…', { timeout: 2000 })

    // Wait for success message
    const successMessage = page.getByRole('alert', { name: /Message sent successfully/i })
    await expect(successMessage).toBeVisible({ timeout: 5000 })

    // Verify form is reset after success
    await expect(nameInput).toHaveValue('', { timeout: 2000 })
    await expect(emailInput).toHaveValue('')
    await expect(messageInput).toHaveValue('')
  })

  test('should handle email validation', async ({ page }) => {
    // Fill form with invalid email
    const nameInput = page.getByLabel('Name')
    const emailInput = page.getByLabel('Email')
    const messageInput = page.getByLabel('Message')
    const submitButton = page.getByRole('button', { name: /Send/i })

    await nameInput.fill('Test User')
    await emailInput.fill('invalid-email')
    await messageInput.fill('Test message')

    // Try to submit
    await submitButton.click()

    // Wait for browser validation to trigger
    await page.waitForTimeout(200)

    // HTML5 email validation should prevent submission
    // Check validation state (browser native)
    const isValid = await emailInput.evaluate((el: HTMLInputElement) => el.validity.valid)
    expect(isValid).toBe(false)

    // Check validation message (browser native)
    const validationMessage = await emailInput.evaluate(
      (el: HTMLInputElement) => el.validationMessage,
    )
    expect(validationMessage.length).toBeGreaterThan(0)
  })

  test('should disable submit button while submitting', async ({ page }) => {
    // Mock API response dengan delay untuk test button state
    await page.route('/api/contact', async route => {
      await page.waitForTimeout(500) // Simulate API delay
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          message: 'Message sent successfully',
        }),
      })
    })

    // Fill form
    const nameInput = page.getByLabel('Name')
    const emailInput = page.getByLabel('Email')
    const messageInput = page.getByLabel('Message')
    const submitButton = page.getByRole('button', { name: /Send/i })

    await nameInput.fill('Test User')
    await emailInput.fill('test@example.com')
    await messageInput.fill('Test message with enough characters')

    // Verify button is enabled before submission
    await expect(submitButton).toBeEnabled()

    // Submit form
    await submitButton.click()

    // Button should be disabled during submission
    await expect(submitButton).toBeDisabled({ timeout: 200 })

    // Button text should also change to "Sending…"
    await expect(submitButton).toContainText('Sending…', { timeout: 500 })

    // Wait for submission to complete
    await expect(submitButton).toBeEnabled({ timeout: 2000 })
  })

  test('should show error message on API error', async ({ page }) => {
    // Mock API response untuk error
    await page.route('/api/contact', async route => {
      await route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({
          success: false,
          error: 'Validation failed',
          details: {
            field: 'email',
          },
        }),
      })
    })

    // Fill form
    const nameInput = page.getByLabel('Name')
    const emailInput = page.getByLabel('Email')
    const messageInput = page.getByLabel('Message')
    const submitButton = page.getByRole('button', { name: /Send/i })

    await nameInput.fill('Test User')
    await emailInput.fill('test@example.com')
    await messageInput.fill('Test message with enough characters')

    // Submit form
    await submitButton.click()

    // Wait for error message
    const errorMessage = page.getByRole('alert', { name: /Validation failed/i })
    await expect(errorMessage).toBeVisible({ timeout: 5000 })
  })
})
