"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function BrandMark({ className = "w-12 h-12" }) {
    return (
        <motion.div
            className={`relative flex items-center justify-center ${className}`}
            animate={{
                y: [0, -4, 0],
                filter: [
                    "drop-shadow(0 0 0px rgba(217, 119, 6, 0))",
                    "drop-shadow(0 0 8px rgba(217, 119, 6, 0.3))",
                    "drop-shadow(0 0 0px rgba(217, 119, 6, 0))"
                ]
            }}
            transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
            }}
            whileHover={{ scale: 1.05, filter: "drop-shadow(0 0 12px rgba(217, 119, 6, 0.5))" }}
        >
            <Image
                src="/bhavesh_logo_nobg.png"
                alt="Brand Mark"
                width={200}
                height={200}
                className="w-full h-auto object-contain relative z-10"
            />
        </motion.div>
    )
}
