import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Create Supabase client for storage
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
})

const BUCKET_NAME = 'enquiry-files'

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
        const filePath = `uploads/${filename}`

        // Convert file to buffer for Supabase upload
        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        // Upload to Supabase Storage
        const { data, error } = await supabase.storage
            .from(BUCKET_NAME)
            .upload(filePath, buffer, {
                contentType: file.type || 'application/octet-stream',
                upsert: false
            })

        if (error) {
            console.error("Supabase storage error:", error)
            return NextResponse.json({
                error: "Upload failed",
                details: error.message
            }, { status: 500 })
        }

        // Get public URL for the uploaded file
        const { data: urlData } = supabase.storage
            .from(BUCKET_NAME)
            .getPublicUrl(filePath)

        return NextResponse.json({
            url: urlData.publicUrl,
            filename: file.name,
            path: data.path
        })
    } catch (error) {
        console.error("Upload error:", error)
        return NextResponse.json({ error: "Upload failed" }, { status: 500 })
    }
}
