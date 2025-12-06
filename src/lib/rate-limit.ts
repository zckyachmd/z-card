/**
 * Rate Limiting
 *
 * Simple in-memory rate limiting untuk API routes
 */

interface RateLimitEntry {
  count: number
  resetAt: number
}

// In-memory store untuk rate limiting
const rateLimitStore = new Map<string, RateLimitEntry>()

// Clean up old entries setiap 5 menit
setInterval(
  () => {
    const now = Date.now()
    for (const [key, entry] of rateLimitStore.entries()) {
      if (entry.resetAt < now) {
        rateLimitStore.delete(key)
      }
    }
  },
  5 * 60 * 1000,
) // 5 minutes

/**
 * Check rate limit untuk IP address
 */
export function checkRateLimit(ip: string): {
  allowed: boolean
  remaining: number
  resetAt: number
} {
  const maxRequests = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '5', 10)
  const windowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10)

  const now = Date.now()
  const entry = rateLimitStore.get(ip)

  // If no entry or reset time passed, create new entry
  if (!entry || entry.resetAt < now) {
    const newEntry: RateLimitEntry = {
      count: 1,
      resetAt: now + windowMs,
    }
    rateLimitStore.set(ip, newEntry)
    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetAt: newEntry.resetAt,
    }
  }

  // Check if limit exceeded
  if (entry.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: entry.resetAt,
    }
  }

  // Increment count
  entry.count += 1
  rateLimitStore.set(ip, entry)

  return {
    allowed: true,
    remaining: maxRequests - entry.count,
    resetAt: entry.resetAt,
  }
}

/**
 * Validate IP address format (IPv4 or IPv6)
 */
function isValidIP(ip: string): boolean {
  // IPv4 regex
  const ipv4Regex =
    /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
  // IPv6 regex (simplified - covers most cases)
  const ipv6Regex =
    /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^::1$|^::$|^(?:[0-9a-fA-F]{1,4}:)*::(?:[0-9a-fA-F]{1,4}:)*[0-9a-fA-F]{1,4}$/
  return ipv4Regex.test(ip) || ipv6Regex.test(ip)
}

/**
 * Sanitize IP address to prevent injection
 */
function sanitizeIP(ip: string): string {
  // Remove any non-IP characters (whitespace, special chars, etc.)
  return ip.trim().replace(/[^0-9a-fA-F.:]/g, '')
}

/**
 * Get client IP address dari request
 * Validates and sanitizes IP to prevent injection attacks
 */
export function getClientIP(request: Request): string {
  // Try various headers untuk get IP
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    const firstIP = forwarded.split(',')[0]?.trim()
    if (firstIP) {
      const sanitized = sanitizeIP(firstIP)
      if (isValidIP(sanitized)) {
        return sanitized
      }
    }
  }

  const realIP = request.headers.get('x-real-ip')
  if (realIP) {
    const sanitized = sanitizeIP(realIP)
    if (isValidIP(sanitized)) {
      return sanitized
    }
  }

  // Fallback untuk development or invalid IPs
  return 'unknown'
}
