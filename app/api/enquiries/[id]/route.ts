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

        // Authorization / Ownership check early to prevent ID enumeration
        if (!session.user || session.user.role !== 'ADMIN') {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const enquiry = await prisma.enquiry.findUnique({
            where: { id },
        })

        if (!enquiry) {
            return NextResponse.json({ error: "Enquiry not found" }, { status: 404 })
        }

        let fileNames: string[] = [];
        let fileUrls: string[] = [];
        try {
            const fnRaw = enquiry.fileNames;
            fileNames = Array.isArray(fnRaw) ? fnRaw : JSON.parse(String(fnRaw || '[]'));
        } catch { fileNames = [] }
        try {
            const fuRaw = enquiry.fileUrls;
            fileUrls = Array.isArray(fuRaw) ? fuRaw : JSON.parse(String(fuRaw || '[]'));
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
