"use client"

import { motion } from "framer-motion"

export function BrandMark({ className = "w-12 h-12", color = "#D97706" }) {
    return (
        <div className={`relative flex items-center justify-center ${className}`}>
            <svg viewBox="0 0 100 100" className="w-full h-full fill-none overflow-visible">
                {/* Outer Hexagonal Frame */}
                <motion.path
                    d="M50 5 L89 27.5 L89 72.5 L50 95 L11 72.5 L11 27.5 Z"
                    stroke={color}
                    strokeWidth="2"
                    strokeOpacity="0.3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                />

                {/* Rotating Inner Precision Ring */}
                <motion.g
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="origin-center"
                >
                    <circle cx="50" cy="50" r="35" stroke={color} strokeWidth="0.5" strokeDasharray="2 4" />
                    {[0, 60, 120, 180, 240, 300].map((angle) => (
                        <rect
                            key={angle}
                            x="48"
                            y="12"
                            width="4"
                            height="8"
                            fill={color}
                            transform={`rotate(${angle} 50 50)`}
                        />
                    ))}
                </motion.g>

                {/* The Exclusive "B" Industrial Glyph */}
                <path
                    d="M35 30 H55 C65 30 65 45 55 45 H35 M35 45 H58 C70 45 70 70 58 70 H35"
                    stroke="white"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M35 25 V75"
                    stroke={color}
                    strokeWidth="8"
                    strokeLinecap="round"
                />

                {/* Precision Crosshair */}
                <line x1="50" y1="40" x2="50" y2="60" stroke={color} strokeWidth="1" strokeOpacity="0.5" />
                <line x1="40" y1="50" x2="60" y2="50" stroke={color} strokeWidth="1" strokeOpacity="0.5" />
            </svg>

            {/* Subtle Glow Pulse */}
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute inset-0 rounded-full blur-xl bg-[#D97706]"
            />
        </div>
    )
}
