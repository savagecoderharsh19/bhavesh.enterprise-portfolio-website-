import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import crypto from 'crypto'

// Validation schema to match client-side
const enquirySchema = z.object({
    name: z.string().min(1, "Name is required"),
    phone: z.string().min(1, "Phone is required"),
    email: z.string().email().optional().or(z.literal('')),
    quantity: z.string().optional(),
    description: z.string().min(1, "Description is required"),
    requirementType: z.string().optional(),
    files: z.array(z.string()).optional(),
    fileNames: z.array(z.string()).optional(),
    fileUrls: z.array(z.string()).optional(),
})

export async function POST(req: Request) {
    try {
        const body = await req.json()

        // Validate input
        const validData = enquirySchema.parse(body)

        // Retry logic for unique Enquiry Number generation
        let retries = 3;
        let newEnquiry;

        while (retries > 0) {
            try {
                // Generate robust unique ID instead of reliance on count
                const timestamp = Date.now();
                const randomHex = crypto.randomBytes(3).toString('hex').toUpperCase();
                const enquiryNumber = `BE-${timestamp}-${randomHex}`;

                const fileNames = validData.fileNames ?? validData.files ?? []
                const fileUrls = validData.fileUrls ?? []

                newEnquiry = await prisma.enquiry.create({
                    data: {
                        enquiryNumber,
                        name: validData.name,
                        phone: validData.phone,
                        email: validData.email || null,
                        quantity: validData.quantity || null,
                        description: validData.description,
                        requirementType: validData.requirementType || "Custom Manufacturing",
                        fileNames: JSON.stringify(fileNames),
                        fileUrls: JSON.stringify(fileUrls),
                        status: 'NEW'
                    }
                });
                break; // Success
            } catch (e) {
                if (e && typeof e === 'object' && 'code' in e && e.code === 'P2002') { // Unique constraint violation
                    retries--;
                    continue;
                }
                throw e;
            }
        }

        if (!newEnquiry) throw new Error("Failed to generate unique Enquiry ID after retries");

        return NextResponse.json({ success: true, id: newEnquiry.id, number: newEnquiry.enquiryNumber })

    } catch (error) {
        console.error('Enquiry API Error:', error)
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: 'Validation failed', details: error.issues }, { status: 400 })
        }
        return NextResponse.json({ error: 'Failed to save enquiry' }, { status: 500 })
    }
}

export async function GET() {
    try {
        const session = await getServerSession(authOptions)
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }
        const enquiries = await prisma.enquiry.findMany({
            orderBy: { createdAt: 'desc' }
        })
        const safeEnquiries = enquiries.map(e => {
            let fileNames: string[] = [];
            let fileUrls: string[] = [];
            try {
                const fnRaw = e.fileNames;
                fileNames = Array.isArray(fnRaw) ? fnRaw : JSON.parse(String(fnRaw || '[]'));
            } catch { fileNames = [] }
            try {
                const fuRaw = e.fileUrls;
                fileUrls = Array.isArray(fuRaw) ? fuRaw : JSON.parse(String(fuRaw || '[]'));
            } catch { fileUrls = [] }

            return {
                ...e,
                fileNames,
                fileUrls
            }
        })
        return NextResponse.json(safeEnquiries)
    } catch (error) {
        console.error('Enquiry API Read Error:', error)
        return NextResponse.json({ error: 'Enquiry API Read Error', details: error instanceof Error ? error.message : String(error) }, { status: 500 })
    }
}

export async function PATCH(req: Request) {
    try {
        const session = await getServerSession(authOptions)
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { id, status, internalNotes } = await req.json()

        if (!id) {
            return NextResponse.json({ error: 'Missing ID' }, { status: 400 })
        }

        // Validate status enum
        const ALLOWED_STATUSES = ['NEW', 'IN_PROGRESS', 'UNDER_REVIEW', 'RESPONDED', 'COMPLETED'];
        if (status && !ALLOWED_STATUSES.includes(status)) {
            return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
        }

        try {
            const enquiry = await prisma.enquiry.update({
                where: { id },
                data: {
                    ...(status && { status }),
                    ...(internalNotes !== undefined && { internalNotes })
                },
            })
            return NextResponse.json({ success: true, enquiry })
        } catch (err: any) {
            if (err.code === 'P2025') {
                return NextResponse.json({ error: 'Enquiry not found' }, { status: 404 });
            }
            throw err;
        }
    } catch (error) {
        console.error('Enquiry API Update Error:', error)
        return NextResponse.json({ error: 'Failed to update enquiry' }, { status: 500 })
    }
}

export async function DELETE(req: Request) {
    try {
        const session = await getServerSession(authOptions)
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await req.json()
        const { id } = body

        if (!id) {
            return NextResponse.json({ error: 'Missing ID' }, { status: 400 })
        }

        await prisma.enquiry.delete({
            where: { id }
        })

        return NextResponse.json({ success: true })
    } catch (error: any) {
        console.error('Enquiry API Delete Error:', error)
        if (error.code === 'P2025') {
            return NextResponse.json({ error: 'Enquiry not found' }, { status: 404 })
        }
        return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
    }
}
