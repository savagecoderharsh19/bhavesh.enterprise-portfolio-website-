"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { BrandLogo } from "@/components/ui/BrandLogo"
import { BrandMark } from "@/components/ui/BrandMark"

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setIsScrolled(window.scrollY > 20)
                    ticking = false;
                });
                ticking = true;
            }
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
                isScrolled ? "py-4" : "py-8"
            )}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "circOut" }}
        >
            <div className="container mx-auto px-2 md:px-6 max-w-[1000px]">
                <div
                    className={cn(
                        "flex items-center justify-between rounded-full px-3 py-2 md:px-6 md:py-3 transition-all duration-500 ease-in-out border backdrop-blur-md md:backdrop-blur-xl backdrop-saturate-150 overflow-x-auto no-scrollbar",
                        isScrolled
                            ? "bg-white/90 border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.12)] scale-100"
                            : "bg-white/70 border-white/40 shadow-[0_4px_20px_rgb(0,0,0,0.08)] scale-[1.02]"
                    )}
                >
                    {/* Brand Identity - Adaptive */}
                    <div className="shrink-0 mr-2 md:mr-0">
                        {/* Mobile Icon */}
                        <Link href="/" className="md:hidden block">
                            <BrandMark className="w-14 h-14" />
                        </Link>
                        {/* Desktop Logo */}
                        <Link href="/" className="hidden md:block group relative z-10">
                            <BrandLogo className="w-40 h-auto" />
                        </Link>
                    </div>

                    {/* Navigation Items (Values Condensed for Mobile) */}
                    <nav className="flex items-center gap-2 md:gap-10 shrink-0">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-[9px] md:text-[13px] font-black uppercase tracking-[0.05em] md:tracking-[0.1em] text-slate-600 hover:text-[#1B4D63] transition-all relative group/item whitespace-nowrap"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#1B4D63] transition-all duration-300 group-hover/item:w-full" />
                            </Link>
                        ))}

                        {/* Premium CTA Button - Adaptive Text */}
                        <button
                            onClick={() => document.getElementById('enquiry')?.scrollIntoView({ behavior: 'smooth' })}
                            className="group/btn relative flex items-center gap-1 md:gap-3 bg-[#1B4D63] hover:bg-[#D97706] text-white px-3 md:px-7 py-2 md:py-3 rounded-lg md:rounded-xl font-black uppercase tracking-widest text-[9px] md:text-[11px] transition-all duration-300 active:scale-95 shadow-lg shadow-[#1B4D63]/20 whitespace-nowrap"
                        >
                            <span className="md:hidden">Quote</span>
                            <span className="hidden md:inline">Get Technical Quote</span>
                            <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                    </nav>
                </div>
            </div>
        </motion.header>
    )
}
