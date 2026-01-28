"use client"

import { ClipboardList, Upload, UserCheck, Headphones, UploadCloud } from "lucide-react"

const processSteps = [
    { icon: ClipboardList, text: "Share your requirement" },
    { icon: Upload, text: "Upload photos or drawings (optional)" },
    { icon: UserCheck, text: "Engineers review manually" },
    { icon: Headphones, text: "Team contacts you" },
]

export function FormSection() {
    return (
        <section id="form-section" className="flex flex-col lg:flex-row w-full min-h-[600px]">
            {/* Left Column - Blue Info */}
            <div className="lg:w-1/2 bg-[#0C4A6E] p-16 flex flex-col justify-center text-white">
                <h2 className="text-[32px] font-bold mb-12">How It Works</h2>

                <div className="space-y-8">
                    {processSteps.map((step, index) => (
                        <div key={index} className="flex items-center gap-6">
                            <step.icon className="w-12 h-12 text-white opacity-90" strokeWidth={1.5} />
                            <span className="text-[20px] font-semibold">{step.text}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Column - White Form */}
            <div className="lg:w-1/2 bg-white p-12 lg:p-16 flex flex-col justify-center">
                <h2 className="text-[28px] font-bold text-[#0C4A6E] mb-8">
                    Submit Your Engineering Requirement
                </h2>

                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[14px] font-medium text-[#374151]">Name <span className="text-gray-400">(Required)</span></label>
                            <input type="text" className="w-full border border-gray-300 rounded px-4 py-3 focus:ring-2 focus:ring-[#0C4A6E] focus:border-transparent outline-none transition-all" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[14px] font-medium text-[#374151]">Email <span className="text-gray-400">(Required)</span></label>
                            <input type="email" className="w-full border border-gray-300 rounded px-4 py-3 focus:ring-2 focus:ring-[#0C4A6E] focus:border-transparent outline-none transition-all" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[14px] font-medium text-[#374151]">Phone <span className="text-gray-400">(Optional)</span></label>
                        <input type="tel" className="w-full border border-gray-300 rounded px-4 py-3 focus:ring-2 focus:ring-[#0C4A6E] focus:border-transparent outline-none transition-all" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[14px] font-medium text-[#374151]">Engineering Requirement <span className="text-gray-400">(Required)</span></label>
                        <div className="border-2 border-dashed border-gray-300 rounded bg-[#F9FAFB] p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer group">
                            <UploadCloud className="w-10 h-10 text-gray-400 mb-2 group-hover:text-[#0C4A6E]" />
                            <p className="text-[14px] text-gray-500">
                                <span className="font-semibold text-[#0C4A6E]">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-[12px] text-gray-400 mt-1">
                                PDF, PNG, JPG, CAD (max 10MB)
                            </p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[14px] font-medium text-[#374151]">Subject <span className="text-gray-400">(Optional)</span></label>
                        <input type="text" className="w-full border border-gray-300 rounded px-4 py-3 focus:ring-2 focus:ring-[#0C4A6E] focus:border-transparent outline-none transition-all" />
                    </div>

                    <button
                        type="submit"
                        className="bg-[#D97706] text-white font-bold py-4 px-12 rounded hover:bg-[#B45309] transition-colors mt-6 w-full md:w-auto"
                    >
                        SUBMIT REQUIREMENT
                    </button>
                </form>

                <p className="text-[14px] text-[#6B7280] text-center mt-6 leading-relaxed max-w-lg mx-auto font-medium">
                    Have a specialized industrial requirement or a custom component design? Our engineering consultants are ready to provide technical review and procurement assistance.
                </p>
            </div>
        </section>
    )
}
