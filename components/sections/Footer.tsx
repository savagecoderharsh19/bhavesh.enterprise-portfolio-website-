"use client"

import Link from "next/link"
import { MapPin, Phone, Mail } from "lucide-react"
import { BrandLogo } from "@/components/ui/BrandLogo"

export function Footer() {
    return (
        <footer className="bg-slate-950 text-white pt-20 pb-10 border-t border-white/5">
            <div className="container mx-auto px-6 max-w-[1200px]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">

                    {/* Column 1: Core Mission */}
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <BrandLogo className="w-40 h-auto" />
                        </div>
                        <p className="text-gray-400 text-[13px] leading-relaxed mb-6 font-medium">
                            Leading one-stop industrial hub and engineering consultant. We deliver integrated industrial solutions—from high-precision manufacturing to essential workshop requirements.
                        </p>
                        <div className="flex items-center gap-2">
                            <div className="h-[1px] flex-1 bg-white/5" />
                            <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em]">ESTD 2011</span>
                        </div>
                    </div>

                    {/* Column 2: Material Expertise */}
                    <div>
                        <h4 className="text-white font-black uppercase tracking-widest text-[11px] mb-8 border-l-2 border-[#D97706] pl-4">Material Expertise</h4>
                        <div className="space-y-6">
                            <div>
                                <h5 className="text-[11px] font-black text-[#D97706] uppercase tracking-wider mb-2">Metals & Alloys</h5>
                                <p className="text-[12px] text-gray-500 font-medium">SS-304/310, Brass, Aluminium, MS, HSS, Chrome Plated</p>
                            </div>
                            <div>
                                <h5 className="text-[11px] font-black text-[#D97706] uppercase tracking-wider mb-2">Technical Polymers</h5>
                                <p className="text-[12px] text-gray-500 font-medium">MC901 Nylon, Teflon (PTFE), PU, Bakelite, Delrin</p>
                            </div>
                            <div>
                                <h5 className="text-[11px] font-black text-[#D97706] uppercase tracking-wider mb-2">Industrial Rubber</h5>
                                <p className="text-[12px] text-gray-500 font-medium">Nitrile, Silicone, Viton, Neoprene, Fabric Bonded</p>
                            </div>
                            <div>
                                <h5 className="text-[11px] font-black text-[#D97706] uppercase tracking-wider mb-2">Engineering Hardware Consumables</h5>
                                <p className="text-[12px] text-gray-400 font-medium leading-relaxed">
                                    Hand & Power Tools, Pumps & Valves, Safety PPE, Abrasives, Testing Instruments, Adhesive Sealant Tapes, Cutting Tools & Fasteners
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Column 3: Industry Verticals */}
                    <div>
                        <h4 className="text-white font-black uppercase tracking-widest text-[11px] mb-8 border-l-2 border-[#D97706] pl-4">Industries Served</h4>
                        <ul className="space-y-3 text-[13px] text-gray-400 font-medium">
                            <li className="flex items-center gap-2"><span>Defence Industry</span></li>
                            <li className="flex items-center gap-2"><span>Ports & Shipping</span></li>
                            <li className="flex items-center gap-2"><span>Steel Plants</span></li>
                            <li className="flex items-center gap-2"><span>EV Components & Spokes</span></li>
                            <li className="flex items-center gap-2"><span>Oil & Gas Exploration</span></li>
                            <li className="flex items-center gap-2"><span>Automotive & Aerospace</span></li>
                            <li className="flex items-center gap-2"><span>Chemical & Pharma</span></li>
                            <li className="flex items-center gap-2"><span>Heavy Engineering Units</span></li>
                            <li className="flex items-center gap-2"><span>Machine Tool Industry</span></li>
                            <li className="flex items-center gap-2"><span>Textile & Paper Mills</span></li>
                        </ul>
                    </div>

                    {/* Column 4: Global Contact */}
                    <div>
                        <h4 className="text-white font-black uppercase tracking-widest text-[11px] mb-8 border-l-2 border-[#D97706] pl-4">Direct Contact</h4>
                        <div className="space-y-6">
                            <a
                                href="https://www.google.com/maps/dir/?api=1&destination=E+101+,+372,+Jyoti+Chambers+Narshinatha+Street+Masjid+Bunder+Mumbai+400009"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-start gap-4 group/address"
                            >
                                <MapPin className="w-5 h-5 text-[#D97706] shrink-0 mt-1 transition-transform group-hover/address:scale-110" />
                                <span className="text-[13px] text-gray-400 leading-relaxed font-medium group-hover/address:text-white transition-colors">
                                    E 101 , 372, Jyoti Chambers Narshinatha Street Masjid Bunder Mumbai 400009
                                </span>
                            </a>
                            <div className="space-y-3">
                                <div className="flex items-start gap-4">
                                    <Phone className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
                                    <div className="flex flex-col gap-1">
                                        <a href="tel:02249608180" className="text-[13px] text-gray-400 font-medium hover:text-white transition-colors">
                                            022 49608180 (Tel)
                                        </a>
                                        <a href="tel:9833491238" className="text-[13px] text-gray-400 font-medium hover:text-white transition-colors">
                                            98334 91238
                                        </a>
                                        <a href="tel:9137611033" className="text-[13px] text-gray-400 font-medium hover:text-white transition-colors">
                                            91376 11033
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Mail className="w-5 h-5 text-[#D97706] shrink-0" />
                                    <a href="mailto:mbhaveshenteprise@gmail.com" className="text-[13px] text-gray-400 font-medium hover:text-white transition-colors">
                                        mbhaveshenteprise@gmail.com
                                    </a>
                                </div>
                            </div>
                            <div className="pt-4 border-t border-white/5">
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Operational Hours</p>
                                <p className="text-[12px] text-gray-400 font-medium">Mon - Sat | 10:00 AM - 07:00 PM</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[10px] text-gray-600 font-black uppercase tracking-[0.2em]">
                        © {new Date().getFullYear()} BHAVESH ENTERPRISES | INDUSTRIAL SOLUTIONS
                    </p>
                    <div className="flex gap-8 text-[10px] text-gray-600 font-black uppercase tracking-widest">
                        <Link href="#capabilities" className="hover:text-white transition-colors">Capabilities</Link>
                        <Link href="#portfolio" className="hover:text-white transition-colors">Portfolio</Link>
                        <Link href="#enquiry" className="hover:text-white transition-colors">Get Quote</Link>
                        <button
                            type="button"
                            aria-label="Back to Top"
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="hover:text-white transition-colors cursor-pointer"
                        >Back to Top</button>
                    </div>
                </div>
            </div>
        </footer>
    )
}
