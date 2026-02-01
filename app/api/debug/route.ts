import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { supabaseAdmin } from '@/lib/supabase'

// Temporary debug endpoint - DELETE AFTER TESTING
export async function GET() {
    const results: any = {
        database: { connected: false, error: null },
        storage: { connected: false, error: null },
        env: {
            hasDbUrl: !!process.env.DATABASE_URL,
            hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
            hasSupabaseAnon: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            hasSupabaseService: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
        }
    }

    // Test database
    try {
        const count = await prisma.enquiry.count()
        results.database.connected = true
        results.database.enquiryCount = count
    } catch (e: any) {
        results.database.error = e.message
    }

    // Test storage
    try {
        const { data, error } = await supabaseAdmin.storage.listBuckets()
        if (error) throw error
        results.storage.connected = true
        results.storage.buckets = data?.map(b => b.name) || []
    } catch (e: any) {
        results.storage.error = e.message
    }

    return NextResponse.json(results)
}
