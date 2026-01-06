/**
 * Environment Helpers
 *
 * Safe parsing utilities for env values.
 */

export function getIntEnv(name: string, fallback: number): number {
  const raw = process.env[name]
  if (!raw) {
    return fallback
  }
  const parsed = Number.parseInt(raw, 10)
  if (Number.isNaN(parsed)) {
    console.warn(`[env] ${name}="${raw}" is not a valid integer, using ${fallback}`)
    return fallback
  }
  return parsed
}
