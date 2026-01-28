import { NextResponse } from "next/server"
import { put } from "@vercel/blob"
import { writeFile, mkdir } from "fs/promises"
import { join } from "path"
import { existsSync } from "fs"

export async function POST(req: Request) {
    try {
        // Note: This endpoint is intentionally public to allow enquiry form submissions
        // from unauthenticated visitors. File validation and size limits provide security.
        // TODO: Add rate limiting in production to prevent abuse

        const formData = await req.formData()
        const file = formData.get("file")

        if (!file || !(file instanceof File)) {
            return NextResponse.json({ error: "Invalid file upload" }, { status: 400 })
        }

        // Validate file type
        const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
        const isAllowedExtension = /\.(pdf|jpe?g|png|dwg|dxf)$/i.test(file.name);

        if (!allowedTypes.includes(file.type) && !isAllowedExtension) {
            return NextResponse.json({ error: "File type not allowed" }, { status: 415 })
        }

        // Enforce max size (10MB)
        const MAX_SIZE = 10 * 1024 * 1024;
        if (file.size > MAX_SIZE) {
            return NextResponse.json({ error: "File too large (max 10MB)" }, { status: 413 })
        }

        // Sanitize filename
        const sanitizedFilename = file.name.replace(/[^a-zA-Z0-9.-]/g, '_').substring(0, 100);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const filename = `${uniqueSuffix}-${sanitizedFilename}`

        // Check if we have Vercel Blob configured (production)
        if (process.env.BLOB_READ_WRITE_TOKEN) {
            // Use Vercel Blob for production
            const blob = await put(`uploads/${filename}`, file, {
                access: 'public',
            })
            return NextResponse.json({ url: blob.url, filename: file.name })
        } else {
            // Fallback to local filesystem for development
            const bytes = await file.arrayBuffer()
            const buffer = Buffer.from(bytes)

            const uploadDir = join(process.cwd(), "public/uploads")
            if (!existsSync(uploadDir)) {
                await mkdir(uploadDir, { recursive: true })
            }

            const filepath = join(uploadDir, filename)
            await writeFile(filepath, buffer)

            const url = `/uploads/${filename}`
            return NextResponse.json({ url: url, filename: file.name })
        }
    } catch (error) {
        console.error("Upload error:", error)
        return NextResponse.json({ error: "Upload failed" }, { status: 500 })
    }
}
