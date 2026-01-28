import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"

export async function GET(
    _req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions)
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const { id } = await params
        const enquiry = await prisma.enquiry.findUnique({
            where: { id },
        })

        if (!enquiry) {
            return NextResponse.json({ error: "Enquiry not found" }, { status: 404 })
        }

        // Authorization / Ownership check
        // Assuming 'role' exists on session user (from Admin model)
        // If Enquiry had an ownerId, we would check: enquiry.ownerId === session.user.id
        if (session.user.role !== 'ADMIN') {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        let fileNames = [];
        let fileUrls = [];
        try {
            fileNames = JSON.parse(enquiry.fileNames || '[]');
        } catch { fileNames = [] }
        try {
            fileUrls = JSON.parse(enquiry.fileUrls || '[]');
        } catch { fileUrls = [] }

        return NextResponse.json({
            ...enquiry,
            fileNames,
            fileUrls
        })
    } catch (error) {
        console.error("Enquiry API [id] Error:", error)
        return NextResponse.json({ error: "Failed to fetch enquiry" }, { status: 500 })
    }
}
