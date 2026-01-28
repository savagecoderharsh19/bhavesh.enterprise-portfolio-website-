"use client"

import { motion, HTMLMotionProps, Variants } from "framer-motion"
import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface AnimationProps extends HTMLMotionProps<"div"> {
    children: ReactNode
    delay?: number
    duration?: number
    className?: string
}

export function FadeIn({ children, delay = 0, duration = 0.5, className, ...props }: AnimationProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration, delay, ease: "easeOut" }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    )
}

export function SlideUp({ children, delay = 0, duration = 0.5, className, ...props }: AnimationProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration, delay, ease: "easeOut" }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    )
}

export function ScaleIn({ children, delay = 0, duration = 0.4, className, ...props }: AnimationProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration, delay, ease: "easeOut" }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    )
}

export function StaggerContainer({ children, delay = 0, staggerChildren = 0.1, className, ...props }: AnimationProps & { staggerChildren?: number }) {
    return (
        <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
                hidden: {},
                show: {
                    transition: {
                        staggerChildren,
                        delayChildren: delay,
                    },
                },
            }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    )
}

export const staggerItem: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}
