import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// Import Next.js mocks
import './mocks/next'

// Cleanup after each test
afterEach(() => {
  cleanup()
})
