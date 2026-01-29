import { cn } from "@/lib/utils"
import { Clock, CheckCircle2, AlertCircle, FileText, Send } from "lucide-react"

const STATUS_CONFIG = {
    NEW: {
        label: "NEW",
        color: "bg-blue-500/10 text-blue-500 border-blue-500/20",
        icon: AlertCircle,
    },
    IN_PROGRESS: {
        label: "IN PROGRESS",
        color: "bg-amber-500/10 text-amber-500 border-amber-500/20",
        icon: Clock,
    },
    UNDER_REVIEW: {
        label: "UNDER REVIEW",
        color: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
        icon: FileText,
    },
    RESPONDED: {
        label: "RESPONDED",
        color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
        icon: Send,
    },
    COMPLETED: {
        label: "COMPLETED",
        color: "bg-green-500/10 text-green-500 border-green-500/20",
        icon: CheckCircle2,
    },
} as const

interface StatusBadgeProps {
    status: string
    showIcon?: boolean
    className?: string
}

export function StatusBadge({ status, showIcon = true, className }: StatusBadgeProps) {
    const config = STATUS_CONFIG[status as keyof typeof STATUS_CONFIG] || STATUS_CONFIG.NEW
    const Icon = config.icon

    return (
        <span
            className={cn(
                "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border",
                config.color,
                className
            )}
        >
            {showIcon && <Icon className="w-3 h-3" />}
            {config.label}
        </span>
    )
}
