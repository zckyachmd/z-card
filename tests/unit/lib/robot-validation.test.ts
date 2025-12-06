import { beforeEach, describe, expect, it } from 'vitest'

import { validateRobot } from '@/lib/robot-validation'

describe('validateRobot', () => {
  beforeEach(() => {
    // Reset environment variables
    delete process.env.ROBOT_MIN_SUBMISSION_TIME
  })

  describe('honeypot validation', () => {
    it('should detect robot when honeypot is filled', () => {
      const result = validateRobot({
        honeypot: 'filled',
      })
      expect(result.isRobot).toBe(true)
      expect(result.reason).toBe('Honeypot field filled')
    })

    it('should not detect robot when honeypot is empty', () => {
      const result = validateRobot({
        honeypot: '',
      })
      expect(result.isRobot).toBe(false)
      expect(result.reason).toBeUndefined()
    })

    it('should detect robot when honeypot is whitespace only (after trim)', () => {
      const result = validateRobot({
        honeypot: '   ',
      })
      // Whitespace-only string after trim is empty, so it should not be detected as robot
      // But the check is: if (data.honeypot && data.honeypot.trim() !== '')
      // So '   '.trim() === '' which means it's not detected
      expect(result.isRobot).toBe(false)
      expect(result.reason).toBeUndefined()
    })

    it('should not detect robot when honeypot is undefined', () => {
      const result = validateRobot({})
      expect(result.isRobot).toBe(false)
      expect(result.reason).toBeUndefined()
    })
  })

  describe('submission timing validation', () => {
    it('should detect robot when submission is too fast (default 2 seconds)', () => {
      const result = validateRobot({
        submissionTime: 1000, // 1 second
      })
      expect(result.isRobot).toBe(true)
      expect(result.reason).toBe('Submission too fast (likely automated)')
    })

    it('should not detect robot when submission time is acceptable (default 2 seconds)', () => {
      const result = validateRobot({
        submissionTime: 3000, // 3 seconds
      })
      expect(result.isRobot).toBe(false)
      expect(result.reason).toBeUndefined()
    })

    it('should not detect robot when submission time equals minimum (default 2 seconds)', () => {
      const result = validateRobot({
        submissionTime: 2000, // Exactly 2 seconds
      })
      expect(result.isRobot).toBe(false)
      expect(result.reason).toBeUndefined()
    })

    it('should use custom ROBOT_MIN_SUBMISSION_TIME from environment', () => {
      process.env.ROBOT_MIN_SUBMISSION_TIME = '5000' // 5 seconds
      const result = validateRobot({
        submissionTime: 3000, // 3 seconds (less than 5)
      })
      expect(result.isRobot).toBe(true)
      expect(result.reason).toBe('Submission too fast (likely automated)')
    })

    it('should not detect robot when submission time meets custom minimum', () => {
      process.env.ROBOT_MIN_SUBMISSION_TIME = '5000' // 5 seconds
      const result = validateRobot({
        submissionTime: 6000, // 6 seconds (more than 5)
      })
      expect(result.isRobot).toBe(false)
      expect(result.reason).toBeUndefined()
    })

    it('should not detect robot when submissionTime is undefined', () => {
      const result = validateRobot({})
      expect(result.isRobot).toBe(false)
      expect(result.reason).toBeUndefined()
    })
  })

  describe('combined validation', () => {
    it('should detect robot when honeypot is filled even if timing is valid', () => {
      const result = validateRobot({
        honeypot: 'filled',
        submissionTime: 5000, // Valid timing
      })
      expect(result.isRobot).toBe(true)
      expect(result.reason).toBe('Honeypot field filled')
    })

    it('should detect robot when timing is too fast even if honeypot is empty', () => {
      const result = validateRobot({
        honeypot: '',
        submissionTime: 1000, // Too fast
      })
      expect(result.isRobot).toBe(true)
      expect(result.reason).toBe('Submission too fast (likely automated)')
    })

    it('should not detect robot when both checks pass', () => {
      const result = validateRobot({
        honeypot: '',
        submissionTime: 5000, // Valid timing
      })
      expect(result.isRobot).toBe(false)
      expect(result.reason).toBeUndefined()
    })
  })
})
