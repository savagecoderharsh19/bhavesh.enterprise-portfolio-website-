import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

/**
 * Admin client for server-side operations (Storage, etc.)
 */
export const supabaseAdmin = createClient(url, serviceKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
})

/**
 * Public client for client-side interactions
 */
export const supabase = createClient(
    url,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
