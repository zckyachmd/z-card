import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

import '@testing-library/jest-dom'
// Import Next.js mocks
import './mocks/next'

// Cleanup after each test
afterEach(() => {
  cleanup()
})
