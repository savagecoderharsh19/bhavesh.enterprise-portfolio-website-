"use client"

import Link from "next/link"
import { ShieldCheck, Zap } from "lucide-react"
import { motion } from "framer-motion"
import { BrandMark } from "@/components/ui/BrandMark"

export function Hero() {
    return (
        <section id="home" className="relative w-full h-[700px] flex items-center justify-center overflow-hidden">
            {/* Background Image + Cinematic Dark Overlay */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center"
                style={{
                    backgroundImage: "url('/hero-bg.png')",
                }}
            >
                {/* Multi-layered overlay for depth */}
                <div className="absolute inset-0 bg-slate-950/70" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50" />
            </div>

            <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center max-w-[1000px]">
                {/* Clean Mechanical Branding */}
                <div className="flex flex-col items-center mb-10">
                    <div className="relative w-28 h-28 flex items-center justify-center mb-6">
                        {/* Static Subtle Glow Ring */}
                        <div className="absolute inset-0 border border-white/5 rounded-full" />

                        {/* Smooth Rotating Main Icon */}
                        <motion.div
                            animate={{
                                rotateY: [0, 15, 0, -15, 0],
                                rotateX: [0, -10, 0, 10, 0]
                            }}
                            transition={{
                                rotateY: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                                rotateX: { duration: 7, repeat: Infinity, ease: "easeInOut" }
                            }}
                            className="relative z-10"
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            <BrandMark className="w-24 h-24" />
                        </motion.div>

                        {/* Fixed Center Point */}
                        <div className="absolute w-4 h-4 bg-white rounded-full z-20 shadow-[0_0_15px_rgba(217,119,6,0.5)] border-2 border-[#D97706]" />
                    </div>
                    <h2 className="text-4xl font-black text-white tracking-[0.05em] uppercase leading-none">
                        BHAVESH <span className="text-[#D97706]">ENTERPRISES</span>
                    </h2>
                    <div className="flex flex-col items-center gap-4 mb-8">
                        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-amber-500/30 bg-amber-500/5 backdrop-blur-md">
                            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                            <span className="text-amber-500 text-[10px] md:text-xs font-black uppercase tracking-[0.3em] whitespace-nowrap">
                                ONE-STOP INDUSTRIAL HUB
                            </span>
                        </div>
                        <h1 className="text-white text-4xl md:text-7xl font-black text-center leading-[0.95] tracking-tighter uppercase drop-shadow-2xl">
                            INTEGRATED <span className="text-amber-500">INDUSTRIAL</span> <br /> SOLUTIONS
                        </h1>
                    </div>

                    <p className="text-white/90 text-sm md:text-xl font-bold max-w-3xl text-center leading-relaxed tracking-tight px-4 mb-10 drop-shadow-lg">
                        From high-precision engineering components to everyday industrial essentials.
                        We catter to a <span className="text-amber-500">wide range of needs</span>—no requirement is too small or too complex.
                    </p>
                </div>

                {/* CTA - High Premium Button */}
                <Link href="#enquiry" onClick={(e: React.MouseEvent) => {
                    e.preventDefault();
                    document.getElementById('enquiry')?.scrollIntoView({ behavior: 'smooth' });
                }}>
                    <button className="group relative bg-[#D97706] text-white px-12 py-5 rounded-[4px] text-[15px] font-black uppercase tracking-widest hover:bg-[#B45309] transition-all overflow-hidden shadow-[0_10px_30px_rgba(217,119,6,0.2)]">
                        <span className="relative z-10">Initialize Requirement Submission</span>
                        <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-[-20deg]" />
                    </button>
                </Link>
            </div>
        </section>
    )
}
