import { NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import { join } from "path"
import { existsSync } from "fs"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions)
        // Note: For public enquiry forms, we might allow unauthenticated uploads 
        // but let's stick to the prompt's request for auth check.
        // If this breaks the public form, we'll need a different strategy.
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const formData = await req.formData()
        const file = formData.get("file")

        if (!file || !(file instanceof File)) {
            return NextResponse.json({ error: "Invalid file upload" }, { status: 400 })
        }

        // 2. Validate file type
        const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
        const isAllowedExtension = /\.(pdf|jpe?g|png|dwg|dxf)$/i.test(file.name);

        if (!allowedTypes.includes(file.type) && !isAllowedExtension) {
            return NextResponse.json({ error: "File type not allowed" }, { status: 415 })
        }

        // 3. Enforce max size (10MB)
        const MAX_SIZE = 10 * 1024 * 1024;
        if (file.size > MAX_SIZE) {
            return NextResponse.json({ error: "File too large (max 10MB)" }, { status: 413 })
        }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // Create uploads directory if it doesn't exist
        const uploadDir = join(process.cwd(), "public/uploads")
        if (!existsSync(uploadDir)) {
            await mkdir(uploadDir, { recursive: true })
        }

        // Sanitize filename
        const sanitizedFilename = file.name.replace(/[^a-zA-Z0-9.-]/g, '_').substring(0, 100);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const filename = `${uniqueSuffix}-${sanitizedFilename}`
        const filepath = join(uploadDir, filename)

        // Write file
        await writeFile(filepath, buffer)

        // Return public URL
        const url = `/uploads/${filename}`
        return NextResponse.json({ url: url, filename: file.name })
    } catch (error) {
        console.error("Upload error:", error)
        return NextResponse.json({ error: "Upload failed" }, { status: 500 })
    }
}
