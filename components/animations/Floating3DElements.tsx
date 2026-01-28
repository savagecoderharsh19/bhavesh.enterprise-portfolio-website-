"use client"

import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion"
import { Settings, Cpu, Box, Hexagon, LucideIcon } from "lucide-react"

interface FloatingIconProps {
    Icon: LucideIcon;
    progress: MotionValue<number>;
    top: string;
    left?: string;
    right?: string;
    size: number;
    rotateSpeed: number;
    parallaxRange: [number, number];
}

export function Floating3DElements() {
    const { scrollYProgress } = useScroll()

    // Smooth out the scroll value
    const smoothScroll = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    })

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-20">
            {/* Element 1: Large Gear */}
            <FloatingIcon
                Icon={Settings}
                progress={smoothScroll}
                top="15%"
                left="5%"
                size={120}
                rotateSpeed={0.5}
                parallaxRange={[-100, 100]}
            />

            {/* Element 2: CPU Chip */}
            <FloatingIcon
                Icon={Cpu}
                progress={smoothScroll}
                top="40%"
                right="8%"
                size={80}
                rotateSpeed={-0.3}
                parallaxRange={[200, -200]}
            />

            {/* Element 3: Hexagon Grid Fragment */}
            <FloatingIcon
                Icon={Hexagon}
                progress={smoothScroll}
                top="70%"
                left="10%"
                size={60}
                rotateSpeed={1}
                parallaxRange={[-150, 150]}
            />

            {/* Element 4: Floating Box */}
            <FloatingIcon
                Icon={Box}
                progress={smoothScroll}
                top="85%"
                right="15%"
                size={100}
                rotateSpeed={-0.8}
                parallaxRange={[300, -300]}
            />

            {/* Additional Geometric Accents */}
            <div className="absolute top-[30%] left-[20%] w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px]" />
            <div className="absolute top-[60%] right-[10%] w-[400px] h-[400px] bg-[#0C4A6E]/5 rounded-full blur-[100px]" />
        </div>
    )
}

function FloatingIcon({ Icon, progress, top, left, right, size, rotateSpeed, parallaxRange }: FloatingIconProps) {
    const y = useTransform(progress, [0, 1], parallaxRange)
    const rotate = useTransform(progress, [0, 1], [0, 360 * rotateSpeed])
    const opacity = useTransform(progress, [0, 0.2, 0.8, 1], [0.1, 0.3, 0.3, 0.1])

    return (
        <motion.div
            style={{
                position: "absolute",
                top,
                left,
                right,
                y,
                rotate,
                opacity,
                perspective: 1000
            }}
            className="text-white/40"
        >
            <motion.div
                animate={{
                    rotateY: [0, 10, 0, -10, 0],
                    rotateX: [0, -10, 0, 10, 0]
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                <Icon size={size} strokeWidth={0.5} />
            </motion.div>
        </motion.div>
    )
}
