"use client"

import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export const BrandLogo = ({ className }: { className?: string }) => {
    return (
        <div className={cn("relative flex items-center", className)}>
            <Image
                src="/nav_footer_logo.png"
                alt="Bhavesh Enterprises Logo"
                width={300}
                height={120}
                className="w-full h-auto object-contain relative z-10"
                priority
            />
        </div>
    )
}
