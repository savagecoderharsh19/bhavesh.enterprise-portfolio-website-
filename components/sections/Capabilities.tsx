"use client"

import { Settings, ShoppingCart, Lightbulb, Package, Wrench, Cog } from "lucide-react"
import { motion } from "framer-motion"

const capabilities = [
    {
        icon: Settings,
        title: "Custom Manufacturing",
        description: "Cost-effective custom parts made to exact specifications.",
        accent: "blue"
    },
    {
        icon: ShoppingCart,
        title: "Market Sourcing",
        description: "Efficiently sourced parts & machinery at the best rates.",
        accent: "blue"
    },
    {
        icon: Lightbulb,
        title: "Engineering Alternatives",
        description: "Innovative solutions and alternatives for unique challenges.",
        accent: "orange" // Special orange accent as per spec
    },
    {
        icon: Package,
        title: "Small Parts",
        description: "Fasteners, bearings, bushings, and other small precision components.",
        accent: "blue"
    },
    {
        icon: Wrench,
        title: "Repair Components",
        description: "High-quality spares for maintenance and repair needs.",
        accent: "blue"
    },
    {
        icon: Cog,
        title: "Custom Fabrication",
        description: "Tailored fabrication for specific applications and industries.",
        accent: "blue"
    }
]

export function Capabilities() {
    return (
        <section id="capabilities" className="py-24 bg-white">
            <div className="container mx-auto px-4 max-w-[1200px]">
                <div className="flex flex-col items-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-[#0C4A6E] tracking-tighter uppercase mb-2">
                        Strategic Capabilities
                    </h2>
                    <div className="w-20 h-1 bg-[#D97706]" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {capabilities.map((cap, index) => (
                        <motion.div
                            key={index}
                            whileHover={{
                                scale: 1.02,
                                rotateY: index % 2 === 0 ? 5 : -5,
                                rotateX: 2,
                                translateZ: 20
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="group bg-[#F3F4F6] p-8 rounded-lg shadow-subtle hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="mb-6 relative z-10" style={{ transform: "translateZ(30px)" }}>
                                <cap.icon
                                    className={`w-12 h-12 ${cap.accent === 'orange' ? 'text-[#D97706]' : 'text-[#0C4A6E]'}`}
                                    strokeWidth={1.5}
                                />
                            </div>

                            <h3 className="text-[20px] font-bold text-[#0C4A6E] mb-3 relative z-10" style={{ transform: "translateZ(20px)" }}>
                                {cap.title}
                            </h3>

                            <p className="text-[16px] text-[#6B7280] leading-[1.6] relative z-10" style={{ transform: "translateZ(10px)" }}>
                                {cap.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
