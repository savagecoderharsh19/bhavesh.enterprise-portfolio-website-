import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { enquirySchema } from '@/lib/validations/enquiry'
import { checkRateLimit, getClientIdentifier, RATE_LIMITS } from '@/lib/rate-limit'
import crypto from 'crypto'

export async function POST(req: Request) {
    try {
        const clientId = getClientIdentifier(req)
        const limit = checkRateLimit(`enquiry:${clientId}`, RATE_LIMITS.FORM)

        if (!limit.allowed) {
            return NextResponse.json(
                { error: "Too many submissions. Please wait before trying again." },
                { status: 429, headers: { 'Retry-After': String(Math.ceil((limit.resetTime - Date.now()) / 1000)) } }
            )
        }

        const body = await req.json()
        const payload = enquirySchema.parse(body)

        // Generate a human-readable enquiry number
        const generateRef = () => {
            const date = new Date().toISOString().slice(2, 10).replace(/-/g, '')
            const random = crypto.randomBytes(2).toString('hex').toUpperCase()
            return `BE-${date}-${random}`
        }

        const enquiry = await prisma.enquiry.create({
            data: {
                enquiryNumber: generateRef(),
                name: payload.name,
                phone: payload.phone,
                email: payload.email || null,
                quantity: payload.quantity || null,
                description: payload.description,
                requirementType: payload.requirementType,
                fileNames: JSON.stringify(payload.fileNames || []),
                fileUrls: JSON.stringify(payload.fileUrls || []),
                status: 'NEW'
            }
        })

        return NextResponse.json({ success: true, ref: enquiry.enquiryNumber })
    } catch (error: any) {
        console.error('[ENQUIRY_POST]', error)
        if (error.name === 'ZodError') {
            return NextResponse.json({ error: 'Validation failed', issues: error.issues }, { status: 400 })
        }
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

export async function GET() {
    try {
        const session = await getServerSession(authOptions)
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

        const enquiries = await prisma.enquiry.findMany({
            orderBy: { createdAt: 'desc' }
        })

        const formatted = enquiries.map(e => ({
            ...e,
            fileNames: JSON.parse(String(e.fileNames || '[]')),
            fileUrls: JSON.parse(String(e.fileUrls || '[]'))
        }))

        return NextResponse.json(formatted)
    } catch (error) {
        console.error('[ENQUIRY_GET]', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

export async function PATCH(req: Request) {
    try {
        const session = await getServerSession(authOptions)
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

        const { id, ...data } = await req.json()
        if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 })

        const updated = await prisma.enquiry.update({
            where: { id },
            data
        })

        return NextResponse.json(updated)
    } catch (error) {
        console.error('[ENQUIRY_PATCH]', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

export async function DELETE(req: Request) {
    try {
        const session = await getServerSession(authOptions)
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

        const { id } = await req.json()
        await prisma.enquiry.delete({ where: { id } })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('[ENQUIRY_DELETE]', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
