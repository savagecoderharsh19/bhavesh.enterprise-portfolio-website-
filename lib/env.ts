/**
 * Environment Variable Validation
 * Validates required environment variables on app startup
 */

const requiredServerEnvVars = [
    'DATABASE_URL',
    'NEXTAUTH_SECRET',
    'NEXTAUTH_URL',
    'ADMIN_PASSWORD',
] as const;

const requiredClientEnvVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
] as const;

function validateEnvVars() {
    const missingVars: string[] = [];

    // Check server-side vars (only on server)
    if (typeof window === 'undefined') {
        for (const envVar of requiredServerEnvVars) {
            if (!process.env[envVar]) {
                missingVars.push(envVar);
            }
        }
    }

    // Check client-safe vars
    for (const envVar of requiredClientEnvVars) {
        if (!process.env[envVar]) {
            missingVars.push(envVar);
        }
    }

    if (missingVars.length > 0) {
        throw new Error(
            `⚠️ Missing required environment variables:\n${missingVars.map(v => `  - ${v}`).join('\n')}\n\nPlease check your .env.local file. See .env.example for required variables.`
        );
    }
}

// Run validation on import (server-side only)
if (typeof window === 'undefined') {
    validateEnvVars();
}

// Split into server and public environments
export const serverEnv = {
    DATABASE_URL: process.env.DATABASE_URL!,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET!,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL!,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD!,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
};

export const publicEnv = {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
};

// Deprecated: use serverEnv or publicEnv instead
export const env = { ...serverEnv, ...publicEnv };
