/**
 * In-memory sliding window rate limiter.
 * Recommended for single-instance deployments.
 * For distributed environments, migrate to a Redis-based store.
 */

interface RateLimitEntry {
    count: number
    resetTime: number
}

const table = new Map<string, RateLimitEntry>()

// Periodic cleanup of stale entries
if (typeof setInterval !== 'undefined') {
    setInterval(() => {
        const now = Date.now()
        for (const [key, entry] of table.entries()) {
            if (now > entry.resetTime) table.delete(key)
        }
    }, 5 * 60 * 1000)
}

export interface RateLimitConfig {
    maxRequests: number
    windowMs: number
}

export interface RateLimitResult {
    allowed: boolean
    remaining: number
    resetTime: number
}

/**
 * Validates request quota for a given identifier.
 */
export function checkRateLimit(
    id: string,
    config: RateLimitConfig
): RateLimitResult {
    const now = Date.now()
    let entry = table.get(id)

    if (!entry || now > entry.resetTime) {
        entry = { count: 1, resetTime: now + config.windowMs }
        table.set(id, entry)
        return { allowed: true, remaining: config.maxRequests - 1, resetTime: entry.resetTime }
    }

    entry.count++

    if (entry.count > config.maxRequests) {
        return { allowed: false, remaining: 0, resetTime: entry.resetTime }
    }

    return {
        allowed: true,
        remaining: config.maxRequests - entry.count,
        resetTime: entry.resetTime
    }
}

/**
 * Extracts a unique client identifier from request headers.
 */
export function getClientIdentifier(req: Request): string {
    const headers = [
        'x-forwarded-for',
        'x-real-ip',
        'cf-connecting-ip'
    ]

    for (const h of headers) {
        const val = req.headers.get(h)
        if (val) return val.split(',')[0].trim()
    }

    return 'local-dev'
}

export const RATE_LIMITS = {
    UPLOAD: { maxRequests: 10, windowMs: 60 * 1000 },
    API: { maxRequests: 100, windowMs: 60 * 1000 },
    AUTH: { maxRequests: 5, windowMs: 60 * 1000 },
    FORM: { maxRequests: 5, windowMs: 60 * 1000 },
} as const
