/**
 * Simple in-memory rate limiter for API endpoints
 * Uses a sliding window algorithm
 * 
 * NOTE: For production at scale, consider using Redis-based rate limiting
 * This in-memory approach works well for single-instance deployments
 */

interface RateLimitEntry {
    count: number
    resetTime: number
}

const rateLimitMap = new Map<string, RateLimitEntry>()

// Clean up old entries periodically (every 5 minutes)
if (typeof setInterval !== 'undefined') {
    setInterval(() => {
        const now = Date.now()
        for (const [key, entry] of rateLimitMap.entries()) {
            if (now > entry.resetTime) {
                rateLimitMap.delete(key)
            }
        }
    }, 5 * 60 * 1000)
}

export interface RateLimitConfig {
    /** Maximum number of requests allowed in the window */
    maxRequests: number
    /** Window duration in milliseconds */
    windowMs: number
}

export interface RateLimitResult {
    allowed: boolean
    remaining: number
    resetTime: number
}

/**
 * Check if a request should be rate limited
 * 
 * @param identifier - Unique identifier for the client (e.g., IP address, user ID)
 * @param config - Rate limit configuration
 * @returns RateLimitResult indicating if request is allowed
 */
export function checkRateLimit(
    identifier: string,
    config: RateLimitConfig
): RateLimitResult {
    const now = Date.now()
    const key = identifier

    let entry = rateLimitMap.get(key)

    // If no entry or window has expired, create new entry
    if (!entry || now > entry.resetTime) {
        entry = {
            count: 1,
            resetTime: now + config.windowMs
        }
        rateLimitMap.set(key, entry)

        return {
            allowed: true,
            remaining: config.maxRequests - 1,
            resetTime: entry.resetTime
        }
    }

    // Increment count
    entry.count++

    // Check if over limit
    if (entry.count > config.maxRequests) {
        return {
            allowed: false,
            remaining: 0,
            resetTime: entry.resetTime
        }
    }

    return {
        allowed: true,
        remaining: config.maxRequests - entry.count,
        resetTime: entry.resetTime
    }
}

/**
 * Get client identifier from request (IP address or fallback)
 */
export function getClientIdentifier(req: Request): string {
    // Try to get real IP from various headers (Vercel, Cloudflare, etc.)
    const forwardedFor = req.headers.get('x-forwarded-for')
    if (forwardedFor) {
        // Take the first IP if there are multiple
        return forwardedFor.split(',')[0].trim()
    }

    const realIp = req.headers.get('x-real-ip')
    if (realIp) {
        return realIp
    }

    const cfConnectingIp = req.headers.get('cf-connecting-ip')
    if (cfConnectingIp) {
        return cfConnectingIp
    }

    // Fallback to a generic identifier
    return 'unknown-client'
}

// Preset configurations for common use cases
export const RATE_LIMITS = {
    // Strict limit for sensitive operations like file uploads
    UPLOAD: { maxRequests: 10, windowMs: 60 * 1000 }, // 10 per minute

    // Standard API limit
    API: { maxRequests: 100, windowMs: 60 * 1000 }, // 100 per minute

    // Very strict limit for authentication
    AUTH: { maxRequests: 5, windowMs: 60 * 1000 }, // 5 per minute

    // Form submission limit
    FORM: { maxRequests: 5, windowMs: 60 * 1000 }, // 5 per minute
} as const
