import { NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import { join } from "path"
import { existsSync } from "fs"

export async function POST(req: Request) {
    try {
        const formData = await req.formData()
        const file = formData.get("file") as File

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 })
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
