import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

// Test endpoint to verify database connection and admin auth
// DELETE THIS FILE AFTER DEBUGGING
export async function GET() {
    try {
        console.log('[TEST] Checking database connection...')

        const admin = await prisma.admin.findUnique({
            where: { email: 'admin@bhaveshenterprises.com' },
            select: {
                id: true,
                email: true,
                password: true,
                role: true,
            }
        })

        if (!admin) {
            return NextResponse.json({
                status: 'error',
                message: 'Admin not found in database',
                dbConnected: true
            })
        }

        // Test password
        const testPassword = 'Bhavesh#Industrial@2026'
        const isValid = await bcrypt.compare(testPassword, admin.password)

        return NextResponse.json({
            status: 'success',
            dbConnected: true,
            adminFound: true,
            adminEmail: admin.email,
            passwordHashPrefix: admin.password.substring(0, 20),
            passwordValid: isValid,
            message: isValid ? 'All checks passed!' : 'Password mismatch!'
        })
    } catch (error: any) {
        console.error('[TEST] Error:', error)
        return NextResponse.json({
            status: 'error',
            dbConnected: false,
            message: error.message,
            stack: error.stack
        }, { status: 500 })
    }
}
