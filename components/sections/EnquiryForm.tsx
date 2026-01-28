"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useDropzone } from "react-dropzone"
import { Upload, X, Loader2, Send, MapPin, Phone, Mail } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { enquirySchema, type EnquiryFormValues } from "@/lib/validations/enquiry"
import { SlideUp } from "@/components/animations/motion-wrapper"
import { cn } from "@/lib/utils"

export function EnquiryForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [uploadedFiles, setUploadedFiles] = useState<{ id: string; file: File }[]>([])
    const [submitSuccess, setSubmitSuccess] = useState(false)
    const [fileError, setFileError] = useState<string | null>(null)

    // Move timeout to useEffect
    useEffect(() => {
        if (submitSuccess) {
            const timeout = setTimeout(() => setSubmitSuccess(false), 5000)
            return () => clearTimeout(timeout)
        }
    }, [submitSuccess])

    const defaultValues: Partial<EnquiryFormValues> = {
        requirementType: "Custom Manufacturing",
    }

    const form = useForm<EnquiryFormValues>({
        resolver: zodResolver(enquirySchema),
        defaultValues,
    })

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset
    } = form

    const onDrop = (acceptedFiles: File[], fileRejections: any[]) => {
        const manuallyAccepted: File[] = [];

        fileRejections.forEach((rejection) => {
            const isCAD = /\.(dwg|dxf)$/i.test(rejection.file.name);
            const isSizeOk = rejection.file.size <= 10 * 1024 * 1024;

            if (isCAD && isSizeOk) {
                manuallyAccepted.push(rejection.file);
            } else {
                const error = rejection.errors[0]?.code === 'file-too-large'
                    ? "File is too large (max 10MB)"
                    : "Invalid file type. Only PDF, Images, and CAD files are allowed.";
                alert(`${rejection.file.name}: ${error}`);
            }
        });

        const allNewFiles = [...acceptedFiles, ...manuallyAccepted];

        if (allNewFiles.length > 0) {
            setUploadedFiles(prev => {
                const newFiles = allNewFiles.map(f => ({ id: Math.random().toString(36).substring(2, 11), file: f }));
                const next = [...prev, ...newFiles];
                setValue("files", next.map(nf => nf.file));
                return next;
            });
        }
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
            'image/*': ['.png', '.jpg', '.jpeg'],
        },
        maxSize: 10 * 1024 * 1024
    })

    const removeFile = (id: string) => {
        setUploadedFiles(prev => {
            const next = prev.filter(f => f.id !== id);
            setValue("files", next.map(nf => nf.file));
            return next;
        })
    }

    async function onSubmit(data: EnquiryFormValues) {
        setIsSubmitting(true)

        try {
            const fileNames: string[] = []
            const fileUrls: string[] = []

            for (const { file: f } of uploadedFiles) {
                try {
                    const fd = new FormData()
                    fd.append("file", f)
                    const up = await fetch("/api/upload", { method: "POST", body: fd })
                    const j = await up.json()

                    if (up.ok && j?.url) {
                        fileNames.push(f.name)
                        fileUrls.push(j.url)
                    } else {
                        console.error("Upload failed for file:", f.name, j?.error);
                        alert(`Failed to upload ${f.name}: ${j?.error || 'Unknown error'}`);
                        return; // Abort whole submission on error to keep names/urls in sync
                    }
                } catch (error) {
                    console.error("Upload error for file:", f.name, error);
                    alert(`System error uploading ${f.name}`);
                    return; // Abort
                }
            }

            const { files: _files, ...rest } = data
            const body = { ...rest, fileNames, fileUrls }

            const response = await fetch("/api/enquiries", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            })

            if (!response.ok) {
                const err = await response.json().catch(() => ({}))
                throw new Error(err?.error ?? "Submission failed")
            }

            setSubmitSuccess(true)
            reset()
            setUploadedFiles([])
        } catch (error) {
            console.error("Submission error:", error)
            alert(error instanceof Error ? error.message : "Failed to submit enquiry. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section id="enquiry" className="py-24 bg-primary relative">
            <div className="absolute inset-0 bg-primary/5 clip-path-polygon" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    {/* Info Side */}
                    <SlideUp>
                        <h2 className="text-secondary font-bold tracking-wider uppercase text-sm mb-3">Start a Project</h2>
                        <h3 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter leading-none">
                            Request a Quote
                        </h3>
                        <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                            Ready to bring your requirements to life? From complex technical parts to simple industrial essentials.
                            Submit your enquiry and our sourcing team will handle the rest.
                        </p>

                        <div className="bg-white/5 rounded-2xl p-8 border border-white/10 backdrop-blur-sm">
                            <h4 className="text-xl font-bold text-white mb-4">Why work with us?</h4>
                            <ul className="space-y-4">
                                {[
                                    "24-hour initial response time",
                                    "Detailed technical feasibility review",
                                    "Competitive pricing and lead times",
                                    "Strict quality control measures"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-gray-300">
                                        <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                                            <div className="h-2 w-2 rounded-full bg-primary" />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-white/5 rounded-2xl p-8 border border-white/10 backdrop-blur-sm mt-6">
                            <h4 className="text-xl font-bold text-white mb-4">Technical Support</h4>
                            <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                Need immediate technical assistance or have questions about material compatibility?
                                Our specialized engineering team is available for priority consultations.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-2 w-2 rounded-full bg-secondary" />
                                    <span className="text-gray-300 text-sm">On-site technical review available</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="h-2 w-2 rounded-full bg-secondary" />
                                    <span className="text-gray-300 text-sm">Material certification support</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="h-2 w-2 rounded-full bg-secondary" />
                                    <span className="text-gray-300 text-sm">24/7 Priority email assistance</span>
                                </div>
                            </div>
                        </div>
                    </SlideUp>

                    {/* Form Side */}
                    <SlideUp delay={0.2}>
                        {submitSuccess ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-green-500/10 border border-green-500/20 rounded-2xl p-12 text-center"
                            >
                                <div className="h-20 w-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Send className="h-10 w-10" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Enquiry Received!</h3>
                                <p className="text-gray-300">
                                    Thank you for submitting your requirements. We have received your query.
                                    We will contact you shortly.
                                </p>
                                <Button
                                    onClick={() => setSubmitSuccess(false)}
                                    className="mt-8" variant="outline"
                                >
                                    Send Another Enquiry
                                </Button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-medium text-gray-300">Name *</label>
                                        <Input id="name" {...register("name")} placeholder="Your Name" autoComplete="name" />
                                        {errors.name && <p className="text-red-400 text-xs">{errors.name.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="phone" className="text-sm font-medium text-gray-300">Phone *</label>
                                        <Input id="phone" {...register("phone")} placeholder="+91 98765 43210" autoComplete="tel" />
                                        {errors.phone && <p className="text-red-400 text-xs">{errors.phone.message}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium text-gray-300">Email</label>
                                        <Input id="email" {...register("email")} placeholder="john@company.com" autoComplete="email" />
                                        {errors.email && <p className="text-red-400 text-xs">{errors.email.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="quantity" className="text-sm font-medium text-gray-300">Quantity</label>
                                        <Input id="quantity" {...register("quantity")} placeholder="e.g. 500 units" autoComplete="off" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="description" className="text-sm font-medium text-gray-300">Description *</label>
                                    <Textarea id="description" {...register("description")} placeholder="Describe your requirement, material specs, etc." rows={4} autoComplete="off" />
                                    {errors.description && <p className="text-red-400 text-xs">{errors.description.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="file-upload" className="text-sm font-medium text-gray-300">Attachments (Drawings, CAD, PDFs)</label>
                                    <div
                                        {...getRootProps()}
                                        className={cn(
                                            "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
                                            isDragActive ? "border-primary bg-primary/10" : "border-white/20 hover:border-white/40 hover:bg-white/5"
                                        )}
                                    >
                                        <input id="file-upload" {...getInputProps()} />
                                        <Upload className="h-8 w-8 mx-auto text-gray-400 mb-3" />
                                        <p className="text-sm text-gray-300">
                                            {isDragActive ? "Drop files here" : "Drag & drop files here, or click to select"}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">Max 10MB per file</p>
                                    </div>

                                    {/* File List */}
                                    <div className="space-y-2 mt-4">
                                        <AnimatePresence>
                                            {uploadedFiles.map(({ id, file }) => (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    key={id}
                                                    className="flex items-center justify-between text-sm bg-white/5 p-2 rounded-md border border-white/10"
                                                >
                                                    <span className="truncate max-w-[200px] text-gray-300">{file.name}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeFile(id)}
                                                        className="text-gray-500 hover:text-red-400 transition-colors"
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </button>
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    size="lg"
                                    className="w-full text-lg mt-4"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Submitting...
                                        </>
                                    ) : (
                                        "Submit Requirement"
                                    )}
                                </Button>
                            </form>
                        )}
                    </SlideUp>
                </div>
            </div>
        </section>
    )
}
