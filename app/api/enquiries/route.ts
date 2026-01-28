import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

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
                // Generate a simple enquiry number (Concurrency safe via retry)
                const count = await prisma.enquiry.count();
                // Add random component to reduce collision chance in race conditions
                const suffix = (count + 1001 + Math.floor(Math.random() * 10)).toString();
                const enquiryNumber = `BE-${suffix}`;

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
            let fileNames = [];
            let fileUrls = [];
            try {
                fileNames = JSON.parse(e.fileNames || '[]');
            } catch { fileNames = [] }
            try {
                fileUrls = JSON.parse(e.fileUrls || '[]');
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
        return NextResponse.json([], { status: 500 })
    }
}

export async function PATCH(req: Request) {
    try {
        const session = await getServerSession(authOptions)
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await req.json()
        const { id, status, internalNotes } = body

        if (!id) {
            return NextResponse.json({ error: 'Missing ID' }, { status: 400 })
        }

        const updatedEnquiry = await prisma.enquiry.update({
            where: { id },
            data: {
                ...(status && { status }),
                ...(internalNotes !== undefined && { internalNotes })
            }
        })

        return NextResponse.json(updatedEnquiry)
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
    } catch (error) {
        console.error('Enquiry API Delete Error:', error)
        return NextResponse.json({ error: 'Failed to delete enquiry' }, { status: 500 })
    }
}
