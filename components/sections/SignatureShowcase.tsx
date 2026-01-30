"use client"

import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useRef } from "react"
import { Cpu, Layers, Box, ShieldCheck, Zap, Wrench } from "lucide-react"
import { BrandMark } from "@/components/ui/BrandMark"

export function SignatureShowcase() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    })

    // Cinematic transforms
    const scale = useTransform(smoothProgress, [0.1, 0.4], [0.8, 1])
    const opacity = useTransform(smoothProgress, [0.1, 0.3], [0, 1])
    const rotateX = useTransform(smoothProgress, [0.1, 0.4], [45, 0])

    // "Exploded view" parts
    const part1X = useTransform(smoothProgress, [0.4, 0.6], [0, -150])
    const part1Y = useTransform(smoothProgress, [0.4, 0.6], [0, -100])
    const part2X = useTransform(smoothProgress, [0.4, 0.6], [0, 150])
    const part2Y = useTransform(smoothProgress, [0.4, 0.6], [0, -100])
    const part3Y = useTransform(smoothProgress, [0.4, 0.6], [0, 150])

    const textOpacity = useTransform(smoothProgress, [0.4, 0.5, 0.6], [0, 1, 0])
    const textScale = useTransform(smoothProgress, [0.4, 0.5, 0.6], [0.8, 1, 1.2])

    const lineOpacity = useTransform(smoothProgress, [0.3, 0.4], [0, 0.5])

    return (
        <section ref={containerRef} className="relative h-[300vh] bg-gradient-to-b from-slate-950 via-[#050505] to-slate-950 overflow-clip transform-gpu">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

                {/* Background Glow */}
                <motion.div
                    style={{ opacity }}
                    className="absolute w-[600px] h-[600px] bg-[#D97706]/10 rounded-full blur-[120px]"
                />

                {/* Central Assembly */}
                <motion.div
                    style={{
                        scale,
                        opacity,
                        rotateX,
                        perspective: "1000px"
                    }}
                    className="relative flex items-center justify-center"
                >
                    {/* Core Hub */}
                    <div className="relative z-20 w-32 h-32 bg-[#0a0a0a] rounded-2xl shadow-2xl flex items-center justify-center transform-gpu border border-white/10">
                        <BrandMark className="w-20 h-20" />
                        <div className="absolute inset-0 border-4 border-amber-500/20 rounded-2xl animate-pulse" />
                    </div>

                    {/* Exploding Part 1: Custom Engineering */}
                    <motion.div
                        style={{ x: part1X, y: part1Y }}
                        className="absolute z-10 p-6 bg-white/5 border border-white/10 backdrop-blur-md rounded-xl flex flex-col items-center gap-2 min-w-[140px]"
                    >
                        <Wrench className="text-amber-500 w-8 h-8" />
                        <span className="text-[10px] font-black text-white uppercase tracking-widest">Custom Engineering</span>
                    </motion.div>

                    {/* Exploding Part 2: Material Expertise */}
                    <motion.div
                        style={{ x: part2X, y: part2Y }}
                        className="absolute z-10 p-6 bg-white/5 border border-white/10 backdrop-blur-md rounded-xl flex flex-col items-center gap-2 min-w-[140px]"
                    >
                        <Layers className="text-amber-500 w-8 h-8" />
                        <span className="text-[10px] font-black text-white uppercase tracking-widest">Material Expertise</span>
                    </motion.div>

                    {/* Exploding Part 3: Industrial Sourcing */}
                    <motion.div
                        style={{ y: part3Y }}
                        className="absolute z-10 p-6 bg-white/5 border border-white/10 backdrop-blur-md rounded-xl flex flex-col items-center gap-2 min-w-[140px]"
                    >
                        <Box className="text-amber-500 w-8 h-8" />
                        <span className="text-[10px] font-black text-white uppercase tracking-widest">Industrial Sourcing</span>
                    </motion.div>

                    {/* Laser Connections (Lines) */}
                    <svg className="absolute inset-0 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                        <motion.line
                            style={{ opacity: lineOpacity }}
                            x1="250" y1="250" x2="100" y2="150"
                            stroke="rgba(217, 119, 6, 0.5)" strokeWidth="1" strokeDasharray="4 4"
                        />
                        <motion.line
                            style={{ opacity: lineOpacity }}
                            x1="250" y1="250" x2="400" y2="150"
                            stroke="rgba(217, 119, 6, 0.5)" strokeWidth="1" strokeDasharray="4 4"
                        />
                        <motion.line
                            style={{ opacity: lineOpacity }}
                            x1="250" y1="250" x2="250" y2="400"
                            stroke="rgba(217, 119, 6, 0.5)" strokeWidth="1" strokeDasharray="4 4"
                        />
                    </svg>
                </motion.div>

                {/* Floating Content Text */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <motion.div
                        style={{ opacity: textOpacity, scale: textScale }}
                        className="text-center"
                    >
                        <h2 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none mb-4">
                            INTEGRATED<br /><span className="text-amber-500">SOLUTIONS</span>
                        </h2>
                        <p className="text-gray-400 font-bold uppercase tracking-[0.3em] text-sm">
                            Tailored For Industrial Excellence
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
