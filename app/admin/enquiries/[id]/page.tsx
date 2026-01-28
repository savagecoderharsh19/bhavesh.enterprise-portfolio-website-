"use client"

import { use, useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Download, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { SlideUp } from "@/components/animations/motion-wrapper"

type Enquiry = {
    id: string
    enquiryNumber: string
    name: string
    email: string | null
    phone: string
    status: string
    description: string
    fileNames: string[]
    fileUrls: string[]
    createdAt: string
}

export default function EnquiryDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const [enquiry, setEnquiry] = useState<Enquiry | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetch(`/api/enquiries/${id}`)
            .then((r) => {
                if (!r.ok) throw new Error("Failed to load")
                return r.json()
            })
            .then(setEnquiry)
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false))
    }, [id])

    const statusClass = (s: string) =>
        s === "NEW"
            ? "bg-blue-500/10 text-blue-500"
            : s === "UNDER_REVIEW"
                ? "bg-yellow-500/10 text-yellow-500"
                : s === "RESPONDED"
                    ? "bg-green-500/10 text-green-500"
                    : "bg-gray-500/10 text-gray-400"

    if (loading) {
        return (
            <div className="max-w-5xl mx-auto py-12 text-center text-gray-400">
                Loading enquiry...
            </div>
        )
    }
    if (error || !enquiry) {
        return (
            <div className="max-w-5xl mx-auto py-12 text-center text-red-400">
                {error ?? "Enquiry not found"}
                <Link href="/admin/enquiries">
                    <Button variant="link" className="mt-4 block">Back to Enquiries</Button>
                </Link>
            </div>
        )
    }

    const files = enquiry.fileNames.map((name, i) => ({
        name,
        url: enquiry.fileUrls[i] || "",
    }))

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <div className="flex items-center gap-4 flex-wrap">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/admin/enquiries">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-3">
                        {enquiry.enquiryNumber}
                        <span
                            className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusClass(enquiry.status)}`}
                        >
                            {enquiry.status.replaceAll("_", " ")}
                        </span>
                    </h1>
                    <p className="text-gray-400 text-sm">
                        Received on {new Date(enquiry.createdAt).toLocaleDateString()}
                    </p>
                </div>
                <div className="ml-auto flex gap-2">
                    <Button variant="outline" disabled>Print</Button>
                    <Button disabled>Responded</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-8">
                    <SlideUp>
                        <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                            <h3 className="text-lg font-medium text-white mb-4">Requirement Details</h3>
                            <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                                {enquiry.description}
                            </p>
                        </div>
                    </SlideUp>

                    <SlideUp delay={0.1}>
                        <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                            <h3 className="text-lg font-medium text-white mb-4">Attachments</h3>
                            <div className="grid gap-2">
                                {files.length === 0 ? (
                                    <p className="text-gray-500 text-sm">No attachments</p>
                                ) : (
                                    files.map((f, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 hover:border-primary/50 transition-colors"
                                        >
                                            <span className="text-sm text-gray-300 truncate">{f.name}</span>
                                            {f.url ? (
                                                <Button variant="ghost" size="sm" asChild>
                                                    <a href={f.url} target="_blank" rel="noreferrer">
                                                        <Download className="h-4 w-4" />
                                                    </a>
                                                </Button>
                                            ) : (
                                                <span className="text-xs text-gray-500">—</span>
                                            )}
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </SlideUp>

                    <SlideUp delay={0.2}>
                        <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                            <h3 className="text-lg font-medium text-white mb-4">Internal Notes</h3>
                            <Textarea placeholder="Add notes for internal team..." />
                            <div className="mt-4 flex justify-end">
                                <Button variant="secondary" size="sm" disabled>Save Note</Button>
                            </div>
                        </div>
                    </SlideUp>
                </div>

                <div className="space-y-6">
                    <SlideUp delay={0.3}>
                        <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">
                                Customer Info
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Name</div>
                                    <div className="font-medium text-white">{enquiry.name}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Email</div>
                                    {enquiry.email ? (
                                        <a
                                            href={`mailto:${enquiry.email}`}
                                            className="flex items-center gap-2 text-primary hover:underline"
                                        >
                                            <Mail className="h-3 w-3" /> {enquiry.email}
                                        </a>
                                    ) : (
                                        <span className="flex items-center gap-2 text-gray-400 cursor-not-allowed">
                                            <Mail className="h-3 w-3" /> —
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Phone</div>
                                    <div className="flex items-center gap-2 text-gray-300">
                                        <Phone className="h-3 w-3" /> {enquiry.phone}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SlideUp>

                    <SlideUp delay={0.4}>
                        <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">
                                Activity
                            </h3>
                            <div className="relative pl-4 border-l border-white/10 space-y-6">
                                <div className="relative">
                                    <div className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full bg-blue-500" />
                                    <p className="text-sm text-white">Enquiry received</p>
                                    <p className="text-xs text-gray-500">
                                        {new Date(enquiry.createdAt).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </SlideUp>
                </div>
            </div>
        </div>
    )
}
