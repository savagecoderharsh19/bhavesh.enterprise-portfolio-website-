"use client"

import { motion } from "framer-motion"
import { ClientMarquee } from "./ClientMarquee"

const CustomIndustrialIcon = ({ type }: { type: string }) => {
    const renders: Record<string, React.ReactNode> = {
        sealing: (
            <svg viewBox="0 0 100 100" className="w-12 h-12">
                <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2" className="opacity-30" />
                <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="4" />
                <path d="M50 20 V30 M50 70 V80 M20 50 H30 M70 50 H80" stroke="currentColor" strokeWidth="2" />
                <circle cx="50" cy="50" r="5" fill="#D97706" />
            </svg>
        ),
        polymer: (
            <svg viewBox="0 0 100 100" className="w-12 h-12">
                <rect x="25" y="25" width="50" height="50" rx="4" stroke="currentColor" strokeWidth="3" />
                <path d="M25 40 H75 M25 60 H75 M40 25 V75 M60 25 V75" stroke="currentColor" strokeWidth="1" className="opacity-40" />
                <circle cx="75" cy="25" r="8" fill="#D97706" />
            </svg>
        ),
        rubber: (
            <svg viewBox="0 0 100 100" className="w-12 h-12">
                <path d="M10 50 Q30 20 50 50 T90 50" stroke="currentColor" strokeWidth="4" fill="none" />
                <path d="M10 60 Q30 30 50 60 T90 60" stroke="currentColor" strokeWidth="2" fill="none" className="opacity-50" />
                <rect x="45" y="45" width="10" height="10" fill="#D97706" transform="rotate(45 50 50)" />
            </svg>
        ),
        tooling: (
            <svg viewBox="0 0 100 100" className="w-12 h-12">
                <path d="M30 20 L70 20 L80 80 L20 80 Z" stroke="currentColor" strokeWidth="3" fill="none" />
                <circle cx="50" cy="50" r="10" stroke="currentColor" strokeWidth="2" />
                <path d="M50 10 V20 M50 80 V90" stroke="#D97706" strokeWidth="5" strokeLinecap="round" />
            </svg>
        ),
        metallurgy: (
            <svg viewBox="0 0 100 100" className="w-12 h-12">
                <path d="M20 20 H80 V40 H20 Z" fill="currentColor" className="opacity-20" />
                <path d="M20 50 H80 V70 H20 Z" fill="currentColor" />
                <path d="M20 20 L20 80 M80 20 L80 80" stroke="#D97706" strokeWidth="2" />
            </svg>
        ),
        force: (
            <svg viewBox="0 0 100 100" className="w-12 h-12">
                <motion.g
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                    <path d="M50 10 L60 40 L90 50 L60 60 L50 90 L40 60 L10 50 L40 40 Z" stroke="currentColor" strokeWidth="2" fill="none" />
                </motion.g>
                <circle cx="50" cy="50" r="12" fill="#D97706" />
            </svg>
        ),
        mounting: (
            <svg viewBox="0 0 100 100" className="w-12 h-12">
                <path d="M10 80 H90 M20 80 V30 H80 V80" stroke="currentColor" strokeWidth="3" fill="none" />
                <circle cx="50" cy="40" r="15" stroke="#D97706" strokeWidth="4" />
            </svg>
        ),
        sourcing: (
            <svg viewBox="0 0 100 100" className="w-12 h-12">
                <path d="M20 50 L50 20 L80 50 L50 80 Z" stroke="currentColor" strokeWidth="2" fill="none" />
                <path d="M50 20 V80 M20 50 H80" stroke="currentColor" strokeWidth="1" className="opacity-30" />
                <rect x="42" y="42" width="16" height="16" rx="2" fill="#D97706" />
            </svg>
        )
    };
    return renders[type] || renders.sourcing;
};

const TechIcon = ({ type }: { type: string }) => (
    <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
        <div className="absolute inset-0 border border-[#0C4A6E]/10 rounded-2xl rotate-45" />
        <div className="absolute inset-2 border-2 border-slate-900 rounded-xl" />
        <div className="absolute inset-[3px] bg-gradient-to-br from-[#0C4A6E] to-slate-900 rounded-[10px] shadow-2xl" />
        <div className="relative z-10 text-white/90 group-hover:text-amber-500 transition-all duration-700 group-hover:scale-110">
            <CustomIndustrialIcon type={type} />
        </div>
        <div className="absolute top-0 right-0 p-1">
            <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse shadow-[0_0_8px_#D97706]" />
        </div>
        <div className="absolute bottom-1 left-2">
            <span className="text-[6px] font-black text-white/20 uppercase tracking-tighter">REF-BH-26</span>
        </div>
    </div>
)

const productCategories = [
    {
        title: "Sealing Systems",
        type: "sealing",
        products: [
            "Mechanical Seals & S Seals",
            "High-Performance Rubber Gaskets",
            "Industrial Oil & Water Seals",
            "Custom Bonded Sealing Rings",
            "Pressure-Resistant Seal Kits",
            "FKM & Viton Sealing Solutions"
        ]
    },
    {
        title: "Polymer Engineering",
        type: "polymer",
        products: [
            "MC901 Nylon Saddle Pads",
            "Teflon (PTFE) Machined Bushes",
            "Customized Nylon Components",
            "Polyurethane (PU) Parts",
            "Polymer Guide Bushings",
            "High-Density Machined Plastics"
        ]
    },
    {
        title: "Rubber Fabrication",
        type: "rubber",
        products: [
            "Rubber Bonded Key Way Shafts",
            "Rubber Mould Block Stoppers",
            "Custom Rubber Dampeners",
            "Anti-Vibration Mountings",
            "Fabric Reinforced Rubber",
            "Extruded Rubber Profiles"
        ]
    },
    {
        title: "Precision Tooling",
        type: "tooling",
        products: [
            "HSS Precision Punches",
            "Hardened Pinion Assemblies",
            "Manifold Block Machining",
            "Machined Bakelite Sheets",
            "Burr Masher Precision Rolls",
            "Custom CNC Turning Parts"
        ]
    },
    {
        title: "Metal Metallurgy",
        type: "metallurgy",
        products: [
            "SS Wire Mesh Strainers",
            "SS 310 High-Temp Washers",
            "SS Fusible Lead Plugs",
            "SS Retainer & Spacer Rings",
            "Corrosion Resistant Fasteners",
            "Stainless Steel Filter Plates"
        ]
    },
    {
        title: "Force Transmission",
        type: "force",
        products: [
            "Shrink Disk Couplings",
            "Drive PU Couplings",
            "Custom Gear & Pinions",
            "Shaft Coupling Solutions",
            "Mechanical Power Connectors",
            "Torque Transmission Components"
        ]
    },
    {
        title: "Mounting & Fastening",
        type: "mounting",
        products: [
            "Heavy Duty Eye Bolts & Studs",
            "MS Mounting Brackets",
            "Aluminium Ring Retainers",
            "Steel Coil Deck Assemblies",
            "Mechanical Guide Tables",
            "Custom Industrial Fastening"
        ]
    },
    {
        title: "Industrial Sourcing",
        type: "sourcing",
        products: [
            "Industrial Tables & Workstations",
            "Custom Sourcing (Tools & Spoons)",
            "Safety Gear & PPE Solutions",
            "Packaging & Storage Skids",
            "Workshop Utility Essentials",
            "Any Specialized Sourcing Request"
        ]
    }
]

const PortfolioCard = ({ category, idx }: { category: typeof productCategories[0], idx: number }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: idx * 0.1, duration: 0.5 }}
        whileHover={{
            y: -10,
            boxShadow: "0 25px 50px -12px rgba(12, 74, 110, 0.25)"
        }}
        className="min-w-[320px] md:min-w-[420px] bg-white rounded-[40px] p-12 shadow-sm border border-gray-100 transition-all duration-500 group mr-8 relative overflow-hidden"
    >
        {/* Aesthetic Background Detail */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-amber-50 transition-colors duration-500" />

        <div className="flex items-center gap-8 mb-12 relative z-10">
            <TechIcon type={category.type} />
            <h3 className="text-2xl font-black text-[#0C4A6E] leading-tight uppercase tracking-tighter drop-shadow-sm">
                {category.title}
            </h3>
        </div>

        <ul className="space-y-4">
            {category.products.map((product, pIdx) => (
                <motion.li
                    key={pIdx}
                    className="flex items-center gap-4 group/item"
                    whileHover={{ x: 8 }}
                >
                    <div className="w-2 h-2 rounded-full bg-gray-200 group-hover/item:bg-[#D97706] transition-colors" />
                    <span className="text-gray-600 text-[15px] font-bold group-hover/item:text-gray-900 transition-colors">
                        {product}
                    </span>
                </motion.li>
            ))}
        </ul>

        <div className="mt-10 pt-8 border-t border-gray-50 flex items-center justify-between text-[#0C4A6E] font-black text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
            <span>Industrial Grade</span>
            <div className="h-[2px] w-12 bg-[#D97706]" />
        </div>
    </motion.div>
);

export function ProductPortfolio() {
    return (
        <section id="portfolio" className="py-24 bg-[#F8FAFC] overflow-hidden">
            <div className="container mx-auto px-4 max-w-[1200px]">
                <div className="text-center mb-16">
                    <h2 className="text-[40px] font-black text-[#0C4A6E] mb-4 uppercase tracking-tight">
                        Specialized Component Portfolio
                    </h2>
                    <div className="w-24 h-1.5 bg-[#D97706] mx-auto mb-6" />
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
                        Delivering precision-engineered components and comprehensive industrial solutions for critical operational needs.
                    </p>
                </div>

                <div className="relative overflow-hidden py-10 no-scrollbar">
                    <motion.div
                        className="flex"
                        animate={{
                            x: [0, -1 * (productCategories.length * 432)]
                        }}
                        transition={{
                            duration: 40,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        style={{ width: 'max-content' }}
                    >
                        {/* First Set of Cards */}
                        {productCategories.map((category, idx) => (
                            <PortfolioCard key={`set1-${idx}`} category={category} idx={idx} />
                        ))}
                        {/* Duplicate Set for Seamless Loop */}
                        {productCategories.map((category, idx) => (
                            <PortfolioCard key={`set2-${idx}`} category={category} idx={idx} />
                        ))}
                    </motion.div>
                </div>

                {/* Industrial Summary */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 p-10 bg-[#0C4A6E] rounded-[40px] text-white flex flex-col md:flex-row items-center justify-between gap-10 shadow-3xl shadow-[#0C4A6E]/20"
                >
                    <div className="max-w-2xl text-center md:text-left">
                        <h4 className="text-3xl font-black mb-4 uppercase tracking-tight">Need a Custom Component?</h4>
                        <p className="text-white/70 text-lg leading-relaxed font-medium">
                            Our technical lab specializes in reverse engineering and custom fabrication for specialized, retired, or obsolete industrial components.
                        </p>
                    </div>
                    <button
                        onClick={() => document.getElementById('enquiry')?.scrollIntoView({ behavior: 'smooth' })}
                        className="group relative bg-[#D97706] hover:bg-[#B45309] text-white px-10 py-5 rounded-xl font-black uppercase tracking-widest transition-all shadow-xl active:scale-95 overflow-hidden"
                    >
                        <span className="relative z-10">Request Technical Quote</span>
                        <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
                    </button>
                </motion.div>

                <ClientMarquee />
            </div>

            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </section>
    )
}
