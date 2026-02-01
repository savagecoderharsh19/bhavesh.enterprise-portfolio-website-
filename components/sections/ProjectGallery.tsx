"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { X, ZoomIn } from "lucide-react"

const projects = [
    { src: "/gallery/project-1.jpg", title: "Precision Components" },
    { src: "/gallery/project-2.jpg", title: "Industrial Assembly" },
    { src: "/gallery/project-3.jpg", title: "Machined Parts" },
    { src: "/gallery/project-4.jpg", title: "Heavy Duty Gear" },
    { src: "/gallery/project-5.jpg", title: "Custom Fabrication" },
    { src: "/gallery/project-6.jpg", title: "Metal Works" },
    { src: "/gallery/project-7.jpg", title: "Engineering Detail" },
    { src: "/gallery/project-8.jpg", title: "Quality Manufacturing" },
    { src: "/gallery/project-9.jpg", title: "Industrial Hardware" },
    { src: "/gallery/project-10.jpg", title: "Technical Instruments" },
    { src: "/gallery/project-11.jpg", title: "Finished Products" },
    { src: "/gallery/project-12.jpg", title: "Advanced Tooling" },
    { src: "/gallery/project-13.jpg", title: "Material Processing" },
    { src: "/gallery/project-14.jpg", title: "Component Testing" },
    { src: "/gallery/project-15.jpg", title: "Structural Integrity" },
    { src: "/gallery/project-16.jpg", title: "Mechanical Systems" },
    { src: "/gallery/project-17.jpg", title: "Industrial Solutions" },
    { src: "/gallery/project-18.jpg", title: "Production Excellence" },
    { src: "/gallery/project-19.jpg", title: "Specialized Parts" },
]

export function ProjectGallery() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    // Handle ESC key and scroll lock
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setSelectedImage(null)
        }

        if (selectedImage) {
            window.addEventListener("keydown", handleKeyDown)
            document.body.style.overflow = "hidden"
        } else {
            window.removeEventListener("keydown", handleKeyDown)
            document.body.style.overflow = "unset"
        }

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
            document.body.style.overflow = "unset"
        }
    }, [selectedImage])

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 max-w-[1200px]">
                {/* Section Header */}
                <div className="flex flex-col items-center mb-16 text-center">
                    <h2 className="text-3xl md:text-5xl font-black text-[#0C4A6E] tracking-tighter uppercase mb-2">
                        Project Showcase
                    </h2>
                    <div className="w-20 h-1 bg-[#D97706] mb-6" />
                    <p className="text-gray-600 max-w-2xl text-lg">
                        A glimpse into our engineering excellence. From custom fabrication to precision sourcing,
                        we deliver quality across every project.
                    </p>
                </div>

                {/* Masonry-style Grid */}
                <div className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-6 space-y-3 md:space-y-6">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="break-inside-avoid relative group rounded-2xl overflow-hidden cursor-pointer bg-gray-100 shadow-md hover:shadow-xl transition-all"
                            onClick={() => setSelectedImage(project.src)}
                        >
                            {/* Image */}
                            <div className="relative w-full">
                                <Image
                                    src={project.src}
                                    alt={project.title}
                                    width={600}
                                    height={400}
                                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                />

                                {/* Overlay on Hover */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <div className="flex flex-col items-center">
                                        <ZoomIn className="text-white w-8 h-8 mb-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 translate-y-4 transition-all duration-500 delay-100" />
                                        <span className="text-white font-bold uppercase tracking-widest text-sm opacity-0 group-hover:translate-y-0 group-hover:opacity-100 translate-y-4 transition-all duration-500 delay-150">
                                            {project.title}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal using Portal to jump out of any stacking context */}
            {mounted && createPortal(
                <AnimatePresence>
                    {selectedImage && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedImage(null)}
                            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
                            style={{ pointerEvents: 'auto' }}
                        >
                            {/* Close Button - Extreme high layer */}
                            <motion.button
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedImage(null);
                                }}
                                className="fixed top-8 right-8 z-[10000] p-4 text-white hover:text-white bg-white/10 hover:bg-[#D97706] rounded-full transition-all duration-300 pointer-events-auto cursor-pointer flex items-center justify-center shadow-2xl"
                                aria-label="Close Gallery"
                            >
                                <X className="w-8 h-8 md:w-10 md:h-10" strokeWidth={3} />
                            </motion.button>

                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                onClick={(e) => e.stopPropagation()}
                                className="relative max-w-7xl w-full h-full flex items-center justify-center"
                            >
                                <div className="relative w-full h-full flex items-center justify-center">
                                    <Image
                                        src={selectedImage}
                                        alt="Gallery Preview"
                                        fill
                                        className="object-contain"
                                        quality={100}
                                        priority
                                    />
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </section>
    )
}
