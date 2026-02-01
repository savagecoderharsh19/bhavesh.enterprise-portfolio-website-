"use client"

import Image from "next/image"

export function BrandMark({ className = "w-12 h-12" }) {
    return (
        <div className={`relative flex items-center justify-center ${className}`}>
            <Image
                src="/bhavesh_logo_nobg.png"
                alt="Bhavesh Enterprises Logo"
                width={200}
                height={200}
                className="w-full h-full object-contain"
                priority
            />
        </div>
    )
}
