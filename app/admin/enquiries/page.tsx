"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Eye, Search, Filter } from "lucide-react"


import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { SlideUp } from "@/components/animations/motion-wrapper"
import { format } from "date-fns"

type Enquiry = {
    id: string
    enquiryNumber: string
    name: string
    email: string | null
    phone: string
    status: string
    createdAt: string
}

export default function EnquiriesPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [enquiries, setEnquiries] = useState<Enquiry[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetch("/api/enquiries")
            .then((r) => {
                if (!r.ok) throw new Error("Failed to load")
                return r.json()
            })
            .then(setEnquiries)
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false))
    }, [])

    const filtered = enquiries.filter(
        (e) =>
            e.enquiryNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (e.email?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)
    )

    const statusClass = (s: string) =>
        s === "NEW"
            ? "bg-blue-500/10 text-blue-500"
            : s === "UNDER_REVIEW"
                ? "bg-yellow-500/10 text-yellow-500"
                : s === "RESPONDED"
                    ? "bg-green-500/10 text-green-500"
                    : "bg-gray-500/10 text-gray-400"





    return (
        <div className="space-y-8">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Enquiries</h1>
                    <p className="text-gray-400">Manage and track customer requirements</p>
                </div>
                <div className="flex gap-2">
                    <Button
                        size="sm"
                        onClick={async () => {
                            const { copyToClipboard } = await import('@/lib/exportToExcel');
                            copyToClipboard(filtered);
                        }}
                        disabled={loading || filtered.length === 0}
                        className="bg-green-600 hover:bg-green-700 text-white"
                    >
                        📋 Copy Data
                    </Button>
                </div>
            </div>

            <div className="flex gap-4 items-center bg-white/5 p-4 rounded-xl border border-white/10">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                        placeholder="Search by ID, name, or email..."
                        className="pl-10 bg-dark/50"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Button variant="outline" className="gap-2" disabled>
                    <Filter className="h-4 w-4" /> Filter
                </Button>
            </div>

            <SlideUp>
                <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
                    {loading && (
                        <div className="p-12 text-center text-gray-400">Loading enquiries...</div>
                    )}
                    {error && (
                        <div className="p-12 text-center text-red-400">{error}</div>
                    )}
                    {!loading && !error && (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Enquiry ID</TableHead>
                                    <TableHead>Client Name</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filtered.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center text-gray-500 py-12">
                                            No enquiries found
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filtered.map((enquiry) => (
                                        <TableRow key={enquiry.id}>
                                            <TableCell className="font-medium text-white">
                                                {enquiry.enquiryNumber}
                                            </TableCell>
                                            <TableCell>
                                                <div className="font-medium text-white">{enquiry.name}</div>
                                                {enquiry.email && (
                                                    <div className="text-xs text-gray-500">{enquiry.email}</div>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {format(new Date(enquiry.createdAt), "MMM d, yyyy")}
                                            </TableCell>
                                            <TableCell>
                                                <span
                                                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusClass(enquiry.status)}`}
                                                >
                                                    {enquiry.status.replace("_", " ")}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="sm" asChild>
                                                    <Link href={`/admin/enquiries/${enquiry.id}`}>
                                                        <Eye className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    )}
                </div>
            </SlideUp>
        </div>
    )
}
