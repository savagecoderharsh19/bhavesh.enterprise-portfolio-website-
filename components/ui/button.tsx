import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { motion, HTMLMotionProps } from "framer-motion"

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20",
                destructive:
                    "bg-red-500 text-white hover:bg-red-500/90",
                outline:
                    "border border-white/10 bg-white/5 hover:bg-white/10 text-white backdrop-blur-sm",
                secondary:
                    "bg-secondary text-white hover:bg-secondary/90 shadow-lg shadow-secondary/20",
                ghost: "hover:bg-white/10 text-white hover:text-white",
                link: "text-primary underline-offset-4 hover:underline",
                premium: "bg-gradient-to-r from-primary to-primary-light text-white shadow-xl shadow-primary/30 hover:shadow-primary/50 border border-white/10",
            },
            size: {
                default: "h-11 px-8 py-2",
                sm: "h-9 rounded-md px-3",
                lg: "h-14 rounded-md px-10 text-base",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

// Wrap with motion for hover effects
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"

        // If it's a motion component, we need to handle it differently, 
        // but for simplicity in this strict TS setup without full Framer Motion types on Slot,
        // we will wrap the content or use a motion.button if not asChild.

        // However, to keep it simple and compatible with Shadcn patterns while adding effects:
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
