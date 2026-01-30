"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import Image from "next/image"

const clients = [
    { name: "Arcelor Mittal Nippon Steel Pvt Ltd", logo: "/clients/amns.png" },
    { name: "Posco Maharashtra Steel India Pvt Ltd", logo: "/clients/posco.svg" },
    { name: "JSW Energy Ltd", logo: "/clients/jsw.svg" },
    { name: "Exide Industries Ltd", logo: "/clients/exide.svg" },
    { name: "Sodexo", logo: "/clients/sodexo.svg" },
    { name: "L&T Defence", logo: "/clients/lnt.svg" },
    { name: "Adani", logo: "/clients/adani.svg" },
    { name: "Siemens", logo: "/clients/siemens.svg" },
    { name: "Swan Defence", logo: "/clients/swan.svg" },
    { name: "Tally Solution", logo: "/clients/tally.png" },
]

export function ClientMarquee() {
    const [failedLogos, setFailedLogos] = useState<Set<string>>(new Set());

    const handleImageError = (id: string) => {
        setFailedLogos(prev => {
            const newSet = new Set(prev);
            newSet.add(id);
            return newSet;
        });
    };

    return (
        <div className="py-20 mt-10 border-t border-gray-200">
            <div className="text-center mb-12">
                <h3 className="text-2xl font-black text-[#0C4A6E] uppercase tracking-widest mb-2">
                    Clients & Customers Served
                </h3>
                <div className="w-16 h-1 bg-[#D97706] mx-auto rounded-full" />
            </div>

            <div className="relative flex overflow-x-hidden group">
                {/* Gradient Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-[#F8FAFC] to-transparent" />
                <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-[#F8FAFC] to-transparent" />

                {/* Marquee Track */}
                <motion.div
                    className="flex items-center gap-20 px-10"
                    animate={{ x: "-50%" }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    style={{
                        width: "fit-content",
                    }}
                >
                    {/* Double the list for seamless loop */}
                    {[...clients, ...clients].map((client, idx) => {
                        const uniqueId = `${client.name}-${idx}`;
                        const showText = failedLogos.has(uniqueId) || !client.logo;

                        return (
                            <div
                                key={uniqueId}
                                className={`relative w-40 h-24 shrink-0 flex items-center justify-center transition-all duration-500 cursor-pointer hover:scale-110 ${!showText ? 'grayscale opacity-60 hover:grayscale-0 hover:opacity-100' : ''}`}
                            >
                                {showText ? (
                                    <span className="text-[#0C4A6E] font-black text-lg uppercase text-center leading-tight tracking-tight px-4 border-2 border-[#0C4A6E]/10 rounded-lg py-2 bg-white shadow-sm whitespace-nowrap">
                                        {client.name}
                                    </span>
                                ) : (
                                    <img
                                        src={client.logo}
                                        alt={client.name}
                                        className="max-w-full max-h-full object-contain"
                                        onError={() => handleImageError(uniqueId)}
                                    />
                                )}
                            </div>
                        );
                    })}
                </motion.div>
            </div>
        </div>
    )
}
