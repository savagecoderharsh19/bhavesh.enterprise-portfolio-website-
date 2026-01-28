"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Settings, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isMenuOpen]);

    const scrollTo = (id: string) => {
        setIsMenuOpen(false);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-subtle h-[80px] flex items-center px-8">
            <div className="container mx-auto flex items-center justify-between max-w-[1200px]">

                {/* LOGO LEFT */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative w-12 h-12 flex items-center justify-center">
                        {/* Simple visual approximation of gear: Outer Blue, Inner Orange */}
                        <Settings className="w-12 h-12 text-[#0C4A6E] absolute" />
                        <div className="w-4 h-4 bg-[#D97706] rounded-full absolute" />
                    </div>

                    <div className="flex flex-col justify-center">
                        <span className="text-lg font-bold text-[#0C4A6E] tracking-tight leading-tight">
                            BHAVESH ENTERPRISES
                        </span>
                        <span className="text-[10px] font-bold text-[#0C4A6E] tracking-[0.1em] uppercase">
                            Engineering Simplified
                        </span>
                    </div>
                </Link>

                {/* NAVIGATION RIGHT */}
                <div className="flex items-center gap-8">
                    <nav className="hidden md:flex items-center gap-8">
                        {["Home", "Capabilities", "How it Works", "About"].map((item) => (
                            <Link
                                key={item}
                                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                                className="text-base font-medium text-[#0C4A6E] hover:underline hover:text-safety transition-colors"
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollTo(item.toLowerCase().replace(/\s+/g, '-'));
                                }}
                            >
                                {item}
                            </Link>
                        ))}
                    </nav>

                    <button
                        onClick={() => scrollTo('enquiry')}
                        className="hidden md:block bg-[#D97706] text-white px-6 py-3 rounded text-base font-semibold hover:bg-[#B45309] transition-all shadow-subtle hover:shadow-medium"
                    >
                        Submit Requirement
                    </button>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden p-2 text-[#0C4A6E]"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle Menu"
                    >
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="fixed inset-0 top-[80px] bg-white z-40 md:hidden animate-in fade-in slide-in-from-right duration-300">
                    <nav className="flex flex-col items-center gap-8 pt-12">
                        {["Home", "Capabilities", "How it Works", "About"].map((item) => (
                            <Link
                                key={item}
                                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                                className="text-2xl font-bold text-[#0C4A6E]"
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollTo(item.toLowerCase().replace(/\s+/g, '-'));
                                }}
                            >
                                {item}
                            </Link>
                        ))}
                        <button
                            onClick={() => scrollTo('enquiry')}
                            className="bg-[#D97706] text-white px-8 py-4 rounded-full text-lg font-bold shadow-lg"
                        >
                            Submit Requirement
                        </button>
                    </nav>
                </div>
            )}
        </header>
    )
}
