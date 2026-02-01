"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { BrandMark } from "@/components/ui/BrandMark"
import { BrandLogo } from "@/components/ui/BrandLogo"

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isMobileMenuOpen]);

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
        <>
            <motion.header
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
                    isScrolled ? "py-4" : "py-8"
                )}
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "circOut" }}
            >
                <div className="container mx-auto px-4 md:px-6 max-w-[1000px]">
                    <div
                        className={cn(
                            "flex items-center justify-between rounded-full px-4 py-2 md:px-6 md:py-3 transition-all duration-500 ease-in-out border backdrop-blur-xl backdrop-saturate-150",
                            isScrolled
                                ? "bg-white/90 border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.12)] scale-100"
                                : "bg-white/70 border-white/40 shadow-[0_4px_20px_rgb(0,0,0,0.08)] scale-[1.02]"
                        )}
                    >
                        {/* Logo / Brand */}
                        <Link href="/" className="group relative z-10">
                            <BrandLogo className="w-28 md:w-36 h-auto" />
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center gap-10">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-[13px] font-black uppercase tracking-[0.1em] text-slate-600 hover:text-[#1B4D63] transition-all relative group/item"
                                >
                                    {link.name}
                                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#1B4D63] transition-all duration-300 group-hover/item:w-full" />
                                </Link>
                            ))}

                            {/* Premium CTA Button */}
                            <button
                                onClick={() => document.getElementById('enquiry')?.scrollIntoView({ behavior: 'smooth' })}
                                className="group/btn relative flex items-center gap-3 bg-[#1B4D63] hover:bg-[#D97706] text-white px-7 py-3 rounded-xl font-black uppercase tracking-widest text-[11px] transition-all duration-300 active:scale-95 shadow-lg shadow-[#1B4D63]/20"
                            >
                                <span>Get Technical Quote</span>
                                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                            </button>
                        </nav>

                        {/* Mobile Toggle */}
                        <button
                            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 border border-slate-200 text-slate-800 hover:bg-slate-200 transition-colors"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <Menu className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* Premium Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        className="fixed inset-0 z-[60] bg-slate-950/95 backdrop-blur-2xl lg:hidden flex flex-col p-10"
                    >
                        <div className="flex justify-between items-center mb-8">
                            <BrandLogo className="w-32 h-auto" />
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        <nav className="flex flex-col gap-8 flex-1">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <Link
                                        href={link.href}
                                        className="text-4xl font-black text-white hover:text-[#D97706] transition-colors uppercase tracking-tighter"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        <button
                            onClick={() => {
                                setIsMobileMenuOpen(false);
                                document.getElementById('enquiry')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="bg-[#D97706] text-white p-6 rounded-2xl font-black uppercase tracking-widest text-center shadow-lg"
                        >
                            Submit Requirement
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
