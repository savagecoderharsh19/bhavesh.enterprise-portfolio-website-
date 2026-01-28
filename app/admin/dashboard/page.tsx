"use client"

import { useEffect, useState } from "react"
import {
    Download,
    Search,
    RefreshCw,
    LogOut,
    FileSpreadsheet,
    CheckCircle2,
    Clock,
    AlertCircle,
    Filter,
    FileText,
    Trash2,
    Moon,
    Sun
} from "lucide-react"
import { BrandMark } from "@/components/ui/BrandMark"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { signOut } from "next-auth/react"
import { useTheme } from "next-themes"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"

interface Enquiry {
    id: string
    enquiryNumber: string
    createdAt: string
    name: string
    email: string | null
    phone: string
    description: string
    quantity: string | null
    status: string
    requirementType: string | null
    fileUrls: string[]
    fileNames: string[]
}

const STATUS_OPTIONS = [
    {
        label: 'New / Uncomplete',
        value: 'NEW',
        color: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-800'
    },
    {
        label: 'In Progress',
        value: 'IN_PROGRESS',
        color: 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/40 dark:text-amber-300 dark:border-amber-800'
    },
    {
        label: 'Completed',
        value: 'COMPLETED',
        color: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/40 dark:text-green-300 dark:border-green-800'
    },
]

export default function AdminDashboard() {
    const [enquiries, setEnquiries] = useState<Enquiry[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState<string>("ALL")
    const [updatingId, setUpdatingId] = useState<string | null>(null)
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    // Avoid hydration mismatch
    useEffect(() => {
        setMounted(true)
    }, [])

    const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; id: string | null; name: string | null }>({
        isOpen: false,
        id: null,
        name: null
    })

    useEffect(() => {
        fetchEnquiries()
    }, [])

    const fetchEnquiries = async () => {
        setIsLoading(true)
        try {
            const res = await fetch('/api/enquiries')
            const data = await res.json()
            setEnquiries(data)
        } catch (error) {
            console.error("Failed to fetch enquiries", error)
        } finally {
            setIsLoading(false)
        }
    }

    const updateStatus = async (id: string, newStatus: string) => {
        setUpdatingId(id)
        try {
            const res = await fetch('/api/enquiries', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, status: newStatus })
            })
            if (res.ok) {
                setEnquiries(prev => prev.map(e => e.id === id ? { ...e, status: newStatus } : e))
            }
        } catch (error) {
            console.error("Failed to update status", error)
        } finally {
            setUpdatingId(null)
        }
    }

    const initiateDelete = (id: string, name: string) => {
        setDeleteModal({ isOpen: true, id, name })
    }

    const confirmDelete = async () => {
        if (!deleteModal.id) return

        const id = deleteModal.id
        setUpdatingId(id)
        setDeleteModal({ isOpen: false, id: null, name: null })

        try {
            const res = await fetch('/api/enquiries', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            })

            if (res.ok) {
                setEnquiries(prev => prev.filter(e => e.id !== id))
            } else {
                const errorData = await res.json().catch(() => ({}))
                alert(`Failed to delete: ${errorData.error || res.statusText}`)
            }
        } catch (error) {
            console.error("Delete error:", error)
            alert("An error occurred while deleting.")
        } finally {
            setUpdatingId(null)
        }
    }

    const filteredEnquiries = enquiries.filter(e => {
        const matchesSearch =
            e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            e.enquiryNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (e.email?.toLowerCase() || "").includes(searchTerm.toLowerCase())

        const matchesStatus = statusFilter === "ALL" || e.status === statusFilter

        return matchesSearch && matchesStatus
    })

    const stats = {
        total: enquiries.length,
        new: enquiries.filter(e => e.status === 'NEW').length,
        inProgress: enquiries.filter(e => e.status === 'IN_PROGRESS').length,
        completed: enquiries.filter(e => e.status === 'COMPLETED').length,
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] flex flex-col font-sans transition-colors duration-300">
            {/* Header */}
            <header className="bg-[#0C4A6E] text-white sticky top-0 z-30 shadow-lg px-6 py-4">
                <div className="max-w-[1600px] mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <BrandMark className="w-10 h-10" />
                        <div>
                            <h1 className="text-xl font-black tracking-tighter uppercase leading-none">
                                BHAVESH ENTERPRISES
                            </h1>
                            <p className="text-[10px] font-black text-[#D97706] tracking-[0.3em] uppercase mt-1">
                                One-Stop Industrial Hub
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        {/* Theme Toggle */}
                        {mounted && (
                            <button
                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                            >
                                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                            </button>
                        )}
                        <div className="hidden md:block text-right">
                            <p className="text-sm font-medium">Administrator</p>
                            <p className="text-xs text-white/60">admin@bhaveshenterprises.com</p>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-white hover:bg-white/10"
                            onClick={() => signOut({ callbackUrl: '/admin/login' })}
                        >
                            <LogOut className="h-4 w-4 mr-2" /> Logout
                        </Button>
                    </div>
                </div>
            </header>

            {/* Sub-header with Stats */}
            <div className="bg-white dark:bg-[#1E293B] border-b border-gray-200 dark:border-white/10 px-6 py-8 transition-colors duration-300">
                <div className="max-w-[1600px] mx-auto">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                        <div>
                            <h2 className="text-3xl font-black text-[#0C4A6E] dark:text-white uppercase tracking-tighter">Dashboard Overview</h2>
                            <p className="text-gray-500 dark:text-gray-400 mt-1 uppercase text-xs font-bold tracking-widest">Manage and track customer requirements</p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full lg:w-auto">
                            <StatCard label="Total Enquiries" value={stats.total} color="blue" icon={<FileText className="w-4 h-4" />} />
                            <StatCard label="New Requests" value={stats.new} color="amber" icon={<AlertCircle className="w-4 h-4" />} />
                            <StatCard label="In Progress" value={stats.inProgress} color="indigo" icon={<Clock className="w-4 h-4" />} />
                            <StatCard label="Completed" value={stats.completed} color="green" icon={<CheckCircle2 className="w-4 h-4" />} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-1 max-w-[1600px] w-full mx-auto px-6 py-8">
                {/* Filters Row */}
                <div className="mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="relative flex-1 md:w-80">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Search by name, ID or email..."
                                className="pl-10 h-11 bg-white dark:bg-[#1E293B] border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:ring-[#073652] focus:border-[#073652] rounded-xl font-medium"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <select
                                className="pl-10 pr-4 h-11 bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-white/10 rounded-xl text-sm font-bold text-gray-900 dark:text-white focus:ring-[#073652] focus:border-[#073652] appearance-none"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="ALL">ALL STATUS</option>
                                <option value="NEW">NEW / UNCOMPLETE</option>
                                <option value="IN_PROGRESS">IN PROGRESS</option>
                                <option value="COMPLETED">COMPLETED</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <Button variant="outline" className="h-11 border-gray-200 dark:border-white/10 dark:text-white dark:hover:bg-white/5 rounded-xl font-bold" onClick={fetchEnquiries}>
                            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} /> REFRESH
                        </Button>
                        <Button
                            className="h-11 bg-[#D97706] hover:bg-[#B45309] text-white rounded-xl font-bold shadow-lg shadow-amber-900/10"
                            onClick={async () => {
                                const { copyToClipboard } = await import('@/lib/exportToExcel');
                                copyToClipboard(filteredEnquiries);
                            }}
                            disabled={filteredEnquiries.length === 0}
                        >
                            <FileSpreadsheet className="h-4 w-4 mr-2" /> EXPORT TO CLIPBOARD
                        </Button>
                    </div>
                </div>

                {/* Table Container */}
                <div className="bg-white dark:bg-[#1E293B] rounded-2xl shadow-xl border border-gray-100 dark:border-white/10 overflow-hidden transition-colors duration-300">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader className="bg-gray-50 dark:bg-black/20">
                                <TableRow>
                                    <TableHead className="w-[120px] py-6 text-[#0C4A6E] dark:text-secondary font-black uppercase tracking-widest text-[10px]">Ref No.</TableHead>
                                    <TableHead className="py-6 text-[#0C4A6E] dark:text-secondary font-black uppercase tracking-widest text-[10px]">Date</TableHead>
                                    <TableHead className="py-6 text-[#0C4A6E] dark:text-secondary font-black uppercase tracking-widest text-[10px]">Customer Details</TableHead>
                                    <TableHead className="py-6 text-[#0C4A6E] dark:text-secondary font-black uppercase tracking-widest text-[10px]">Requirement</TableHead>
                                    <TableHead className="py-6 text-[#0C4A6E] dark:text-secondary font-black uppercase tracking-widest text-[10px]">Files</TableHead>
                                    <TableHead className="py-6 text-[#0C4A6E] dark:text-secondary font-black uppercase tracking-widest text-[10px]">Status</TableHead>
                                    <TableHead className="text-right py-6 text-[#0C4A6E] dark:text-secondary font-black uppercase tracking-widest text-[10px]">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoading ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="h-64 text-center text-gray-500">
                                            <div className="flex flex-col items-center gap-2">
                                                <RefreshCw className="h-8 w-8 animate-spin text-[#0C4A6E]" />
                                                <p className="font-bold uppercase tracking-widest text-xs">Syncing Database...</p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : filteredEnquiries.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="h-64 text-center text-gray-500">
                                            <div className="flex flex-col items-center gap-2">
                                                <AlertCircle className="h-8 w-8 text-gray-300 dark:text-gray-600" />
                                                <p className="font-bold uppercase tracking-widest text-xs text-gray-400">No matching records found</p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredEnquiries.map((enquiry) => (
                                        <TableRow key={enquiry.id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 border-gray-100 dark:border-white/5 transition-colors">
                                            <TableCell className="font-mono text-[11px] font-black text-[#0C4A6E] dark:text-secondary">
                                                {enquiry.enquiryNumber || enquiry.id.slice(0, 8)}
                                            </TableCell>
                                            <TableCell className="text-gray-500 dark:text-gray-400 text-[11px] font-bold">
                                                {new Date(enquiry.createdAt).toLocaleDateString('en-IN', {
                                                    day: '2-digit',
                                                    month: 'short',
                                                    year: 'numeric'
                                                })}
                                            </TableCell>
                                            <TableCell>
                                                <div className="font-black text-gray-900 dark:text-white uppercase text-sm tracking-tight">{enquiry.name}</div>
                                                <div className="text-gray-400 dark:text-gray-500 text-[11px] font-bold mt-0.5">{enquiry.phone}</div>
                                                {enquiry.email && <div className="text-[#0C4A6E] dark:text-secondary-light text-[11px] font-bold hover:underline cursor-pointer">{enquiry.email}</div>}
                                            </TableCell>
                                            <TableCell className="max-w-[300px]">
                                                <div className="text-[10px] font-black text-[#D97706] uppercase tracking-widest mb-1">{enquiry.requirementType || "General"}</div>
                                                <div className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2 font-medium" title={enquiry.description}>
                                                    {enquiry.description}
                                                </div>
                                                {enquiry.quantity && (
                                                    <div className="mt-1 text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                        Qty: <span className="text-gray-900 dark:text-white">{enquiry.quantity}</span>
                                                    </div>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {enquiry.fileUrls.length > 0 ? (
                                                    <div className="flex flex-wrap gap-1">
                                                        {enquiry.fileUrls.map((url, i) => (
                                                            <a
                                                                key={i}
                                                                href={url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                download
                                                                className="inline-flex items-center px-2 py-1 bg-gray-100 dark:bg-white/5 rounded-md text-[9px] font-black text-gray-600 dark:text-gray-400 hover:bg-[#0C4A6E] hover:text-white transition-all uppercase tracking-tighter"
                                                                title="Download Component Data"
                                                            >
                                                                <Download className="h-3 w-3 mr-1" /> DATA {i + 1}
                                                            </a>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <span className="text-gray-300 dark:text-gray-700 text-[10px] font-black uppercase italic">No Material Data</span>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <StatusBadge status={enquiry.status} />
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-3 px-4">
                                                    <select
                                                        disabled={updatingId === enquiry.id}
                                                        className="text-[10px] font-black uppercase tracking-widest border-2 border-gray-100 dark:border-white/10 rounded-xl px-4 py-2 bg-white dark:bg-[#1E293B] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0C4A6E] dark:focus:ring-secondary shadow-lg transition-all disabled:opacity-50 cursor-pointer appearance-none text-center min-w-[140px]"
                                                        value={enquiry.status}
                                                        onChange={(e) => updateStatus(enquiry.id, e.target.value)}
                                                    >
                                                        {STATUS_OPTIONS.map(opt => (
                                                            <option key={opt.value} value={opt.value} className="dark:bg-[#1E293B]">{opt.label.toUpperCase()}</option>
                                                        ))}
                                                    </select>

                                                    <button
                                                        disabled={updatingId === enquiry.id}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            initiateDelete(enquiry.id, enquiry.name);
                                                        }}
                                                        className="text-red-500 hover:text-white p-2.5 rounded-xl hover:bg-red-600 transition-all disabled:opacity-50 cursor-pointer shadow-lg shadow-red-900/10 border border-transparent hover:border-red-500"
                                                        title="Purge Enquiry"
                                                        type="button"
                                                    >
                                                        <Trash2 className="h-5 w-5 pointer-events-none" />
                                                    </button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </main>

            <footer className="py-10 text-center transition-colors duration-300 border-t border-gray-100 dark:border-white/10">
                <div className="flex flex-col items-center gap-4">
                    <BrandMark className="w-8 h-8 opacity-40 grayscale" />
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-400">
                        &copy; {new Date().getFullYear()} BHAVESH ENTERPRISES | SECURE ADMIN INTERFACE
                    </p>
                </div>
            </footer>

            {/* Custom Delete Confirmation Modal */}
            {deleteModal.isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-6">
                    <div className="bg-white dark:bg-[#1E293B] rounded-3xl shadow-2xl p-8 w-full max-w-md border border-red-500/20 animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex flex-col items-center text-center mb-8">
                            <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-red-600/10">
                                <Trash2 className="w-10 h-10 text-red-600 dark:text-red-400" />
                            </div>
                            <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">System Confirmation</h3>
                            <p className="text-gray-500 dark:text-gray-400 mt-4 font-medium text-sm">
                                You are about to purge the dataset for <span className="font-black text-[#0C4A6E] dark:text-secondary">{deleteModal.name}</span>.
                            </p>
                            <div className="bg-red-50 dark:bg-red-900/10 p-4 rounded-2xl mt-6 border border-red-100 dark:border-red-900/20">
                                <p className="text-[10px] text-red-600 dark:text-red-400 font-black uppercase tracking-widest">Permanent Data Removal Warning</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Button
                                variant="outline"
                                onClick={() => setDeleteModal({ isOpen: false, id: null, name: null })}
                                className="flex-1 h-14 rounded-2xl border-2 font-black uppercase tracking-widest text-xs dark:border-white/10 dark:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={confirmDelete}
                                className="flex-1 h-14 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-red-900/10 active:scale-[0.98] transition-all"
                            >
                                Purge Record
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

function StatusBadge({ status }: { status: string }) {
    const config = STATUS_OPTIONS.find(opt => opt.value === status) || STATUS_OPTIONS[0]

    return (
        <span className={`inline-flex items-center px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border-2 transition-all shadow-lg ${config.color}`}>
            {status === 'IN_PROGRESS' ? (
                <Clock className="w-3.5 h-3.5 mr-2 animate-pulse" />
            ) : status === 'COMPLETED' ? (
                <CheckCircle2 className="w-3.5 h-3.5 mr-2" />
            ) : (
                <AlertCircle className="w-3.5 h-3.5 mr-2" />
            )}
            {config.label}
        </span>
    )
}

function StatCard({ label, value, color, icon }: { label: string, value: number, color: 'blue' | 'amber' | 'indigo' | 'green', icon: React.ReactNode }) {
    const colors = {
        blue: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-900/30 shadow-blue-500/5',
        amber: 'text-[#D97706] bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-900/30 shadow-amber-500/5',
        indigo: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 border-indigo-100 dark:border-indigo-900/30 shadow-indigo-500/5',
        green: 'text-green-600 bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-900/30 shadow-green-500/5',
    }

    return (
        <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-white/10 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:translate-y-[-4px] cursor-default group">
            <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 rounded-2xl border ${colors[color]} group-hover:scale-110 transition-transform duration-500`}>
                    {icon}
                </div>
                <span className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">{label}</span>
            </div>
            <div className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter">{value}</div>
        </div>
    )
}
