/**
 * Robot Validation
 *
 * Simple robot/bot detection untuk contact form
 * Uses honeypot field dan submission timing
 */

import { getIntEnv } from '@/lib/env'

interface RobotCheckResult {
  isRobot: boolean
  reason?: string
}

/**
 * Check if submission is from a robot
 */
export function validateRobot(data: {
  honeypot?: string
  submissionTime?: number
}): RobotCheckResult {
  // Honeypot check: If honeypot field is filled, it's a bot
  if (data.honeypot && data.honeypot.trim() !== '') {
    return {
      isRobot: true,
      reason: 'Honeypot field filled',
    }
  }

  // Submission timing check: If submitted too fast (< 2 seconds), likely a bot
  if (data.submissionTime) {
    const minSubmissionTime = getIntEnv('ROBOT_MIN_SUBMISSION_TIME', 2000) // 2 seconds
    if (data.submissionTime < minSubmissionTime) {
      return {
        isRobot: true,
        reason: 'Submission too fast (likely automated)',
      }
    }
  }

  return {
    isRobot: false,
  }
}
