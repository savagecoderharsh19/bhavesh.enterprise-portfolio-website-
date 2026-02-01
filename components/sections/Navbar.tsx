"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { BrandLogo } from "@/components/ui/BrandLogo"

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Capabilities", href: "#capabilities" },
        { name: "Portfolio", href: "#portfolio" },
        { name: "Process", href: "#how-it-works" },
    ]

    return (
        <motion.header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
                isScrolled ? "py-4" : "py-8" // Kept logic same
            )}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "circOut" }}
        >
            <div className="container mx-auto px-4 md:px-6 max-w-[1000px]">
                <div
                    className={cn(
                        "flex items-center justify-between rounded-full px-4 py-2 md:px-6 md:py-3 transition-all duration-500 ease-in-out border backdrop-blur-xl backdrop-saturate-150 overflow-x-auto no-scrollbar",
                        isScrolled
                            ? "bg-white/90 border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.12)] scale-100"
                            : "bg-white/70 border-white/40 shadow-[0_4px_20px_rgb(0,0,0,0.08)] scale-[1.02]"
                    )}
                >
                    {/* Logo / Brand */}
                    <Link href="/" className="group relative z-10 shrink-0 mr-8 md:mr-0">
                        <BrandLogo className="w-28 md:w-36 h-auto" />
                    </Link>

                    {/* Navigation Items (Visible on all screens) */}
                    <nav className="flex items-center gap-6 md:gap-10 shrink-0">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-[13px] font-black uppercase tracking-[0.1em] text-slate-600 hover:text-[#1B4D63] transition-all relative group/item whitespace-nowrap"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#1B4D63] transition-all duration-300 group-hover/item:w-full" />
                            </Link>
                        ))}

                        {/* Premium CTA Button */}
                        <button
                            onClick={() => document.getElementById('enquiry')?.scrollIntoView({ behavior: 'smooth' })}
                            className="group/btn relative flex items-center gap-3 bg-[#1B4D63] hover:bg-[#D97706] text-white px-5 md:px-7 py-2.5 md:py-3 rounded-xl font-black uppercase tracking-widest text-[10px] md:text-[11px] transition-all duration-300 active:scale-95 shadow-lg shadow-[#1B4D63]/20 whitespace-nowrap"
                        >
                            <span>Get Technical Quote</span>
                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                    </nav>
                </div>
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
        </motion.header>
    )
}
