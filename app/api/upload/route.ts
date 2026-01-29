import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"
import { checkRateLimit, getClientIdentifier, RATE_LIMITS } from "@/lib/rate-limit"

const BUCKET_NAME = 'enquiry-files'

export async function POST(req: Request) {
    try {
        const clientId = getClientIdentifier(req)
        const limit = checkRateLimit(`upload:${clientId}`, RATE_LIMITS.UPLOAD)

        if (!limit.allowed) {
            return NextResponse.json(
                { error: "Too many upload requests. Please try again later." },
                { status: 429, headers: { 'Retry-After': String(Math.ceil((limit.resetTime - Date.now()) / 1000)) } }
            )
        }

        const formData = await req.formData()
        const file = formData.get("file")

        if (!file || !(file instanceof File)) {
            return NextResponse.json({ error: "Invalid file" }, { status: 400 })
        }

        // Validation
        const allowedExtensions = /\.(pdf|jpe?g|png|dwg|dxf)$/i
        if (!allowedExtensions.test(file.name)) {
            return NextResponse.json({ error: "File type not supported" }, { status: 415 })
        }

        if (file.size > 10 * 1024 * 1024) {
            return NextResponse.json({ error: "File exceeds 10MB limit" }, { status: 413 })
        }

        // Human-friendly storage path
        const timestamp = Date.now()
        const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
        const filePath = `entries/${timestamp}-${safeName}`

        const buffer = Buffer.from(await file.arrayBuffer())

        const { data, error } = await supabaseAdmin.storage
            .from(BUCKET_NAME)
            .upload(filePath, buffer, {
                contentType: file.type || 'application/octet-stream',
                cacheControl: '3600'
            })

        if (error) throw error

        const { data: { publicUrl } } = supabaseAdmin.storage
            .from(BUCKET_NAME)
            .getPublicUrl(filePath)

        return NextResponse.json({
            url: publicUrl,
            name: file.name,
            path: data.path
        })
    } catch (error) {
        console.error('[UPLOAD_ERROR]', error)
        return NextResponse.json({ error: "Upload failed" }, { status: 500 })
    }
}
