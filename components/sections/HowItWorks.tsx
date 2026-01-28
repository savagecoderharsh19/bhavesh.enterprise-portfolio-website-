"use client"

import { ClipboardList, Upload, UserCheck, Headphones } from "lucide-react"

const steps = [
    {
        icon: ClipboardList,
        title: "Share your requirement",
        description: "Submit your technical specifications or project details through our secure enquiry channel."
    },
    {
        icon: Upload,
        title: "Upload photos or drawings (optional)",
        description: "Provide CAD files, design blueprints, or reference images for our engineering team to review."
    },
    {
        icon: UserCheck,
        title: "Engineers review manually",
        description: "Our technical experts conduct a thorough feasibility and cost assessment for your project."
    },
    {
        icon: Headphones,
        title: "Team contacts you",
        description: "Receive a professional consultation and a detailed project quotation within 24 hours."
    }
]

export function HowItWorks() {
    return (
        <section id="how-it-works" className="py-24 bg-white">
            <div className="container mx-auto px-4 max-w-[1200px]">
                <div className="flex flex-col items-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-[#0C4A6E] tracking-tighter uppercase mb-2 text-center">
                        Operational Process
                    </h2>
                    <div className="w-20 h-1 bg-[#D97706]" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="bg-[#F3F4F6] p-8 rounded-lg flex flex-col items-center text-center">
                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-subtle mb-6">
                                <step.icon className="w-10 h-10 text-[#0C4A6E] stroke-1" />
                            </div>

                            <h3 className="text-[18px] font-bold text-[#0C4A6E] mb-3 leading-tight">
                                {step.title}
                            </h3>

                            <p className="text-[14px] text-[#6B7280] leading-[1.5]">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
