import { NextResponse } from 'next/server'

type HealthStatus = {
  status: 'healthy' | 'degraded' | 'unhealthy'
  timestamp: string
  uptime: number
  version: string
  environment: string
  checks: {
    api: 'ok' | 'error'
    memory: 'ok' | 'warning' | 'error'
  }
}

export async function GET() {
  const startTime = process.uptime()
  const memoryUsage = process.memoryUsage()
  const memoryUsageMB = {
    rss: Math.round((memoryUsage.rss / 1024 / 1024) * 100) / 100,
    heapTotal: Math.round((memoryUsage.heapTotal / 1024 / 1024) * 100) / 100,
    heapUsed: Math.round((memoryUsage.heapUsed / 1024 / 1024) * 100) / 100,
  }

  // Memory check - warning if > 500MB, error if > 1GB
  let memoryStatus: 'ok' | 'warning' | 'error' = 'ok'
  if (memoryUsageMB.heapUsed > 1000) {
    memoryStatus = 'error'
  } else if (memoryUsageMB.heapUsed > 500) {
    memoryStatus = 'warning'
  }

  const health: HealthStatus = {
    status:
      memoryStatus === 'error' ? 'unhealthy' : memoryStatus === 'warning' ? 'degraded' : 'healthy',
    timestamp: new Date().toISOString(),
    uptime: Math.round(startTime),
    version: process.env.npm_package_version || '0.1.0',
    environment: process.env.NODE_ENV || 'development',
    checks: {
      api: 'ok',
      memory: memoryStatus,
    },
  }

  const statusCode = health.status === 'healthy' ? 200 : health.status === 'degraded' ? 200 : 503

  return NextResponse.json(health, {
    status: statusCode,
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'Content-Type': 'application/json',
    },
  })
}
