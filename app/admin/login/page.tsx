'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Loader2, Lock, ShieldCheck } from 'lucide-react'
import { BrandMark } from '@/components/ui/BrandMark'

export default function AdminLoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            })

            if (result?.error) {
                setError('AUTHENTICATION FAILED: INVALID CREDENTIALS')
            } else if (result?.ok) {
                await router.push('/admin/dashboard')
                return // Avoid state updates after navigation
            }
        } catch (error) {
            console.error('Login error:', error)
            setError('SYSTEM ERROR: PLEASE RETRY LATER')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] dark:bg-[#0F172A] p-4 font-sans transition-colors duration-500 relative overflow-hidden">
            {/* Background Decorative Element */}
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#0C4A6E]/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px]" />

            <div className="w-full max-w-md relative z-10">
                {/* Branding / Logo */}
                <div className="flex flex-col items-center mb-10">
                    <BrandMark className="w-20 h-20 mb-6" />
                    <h1 className="text-3xl font-black text-[#0C4A6E] dark:text-white tracking-tighter uppercase leading-none">
                        BHAVESH <span className="text-amber-600">ENTERPRISES</span>
                    </h1>
                    <div className="flex items-center gap-3 mt-3">
                        <div className="h-[1px] w-8 bg-amber-500/30" />
                        <p className="text-[10px] font-black text-[#D97706] tracking-[0.4em] uppercase">
                            One-Stop Industrial Hub
                        </p>
                        <div className="h-[1px] w-8 bg-amber-500/30" />
                    </div>
                </div>

                {/* Card */}
                <div className="bg-white dark:bg-[#1E293B] rounded-[32px] shadow-2xl border border-gray-100 dark:border-white/10 p-10 transition-all duration-500">
                    <div className="mb-10 text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 mb-4">
                            <ShieldCheck className="w-3 h-3 text-amber-500" />
                            <span className="text-[9px] font-black text-slate-500 dark:text-gray-400 uppercase tracking-widest">SECURE ADMINISTRATIVE PORTAL</span>
                        </div>
                        <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
                            System Login
                        </h2>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-8 p-4 bg-red-50 dark:bg-red-900/10 border-2 border-red-100 dark:border-red-900/20 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                            <p className="text-[10px] font-black text-red-600 dark:text-red-400 uppercase tracking-widest">{error}</p>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-2 px-1">
                                Terminal Identity (Email)
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-5 py-4 bg-slate-50 dark:bg-[#0F172A] border-2 border-transparent focus:border-[#0C4A6E] dark:focus:border-[#D97706] rounded-2xl transition-all text-gray-900 dark:text-white placeholder:text-gray-400 font-bold text-sm outline-none"
                                placeholder="Enter admin email"
                                disabled={isLoading}
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-2 px-1">
                                Security Protocol (Password)
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full px-5 py-4 bg-slate-50 dark:bg-[#0F172A] border-2 border-transparent focus:border-[#0C4A6E] dark:focus:border-[#D97706] rounded-2xl transition-all text-gray-900 dark:text-white pr-12 font-bold text-sm outline-none"
                                    placeholder="••••••••"
                                    disabled={isLoading}
                                />
                                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-600" />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full group bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black py-5 rounded-2xl shadow-2xl shadow-slate-900/20 dark:shadow-white/5 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3 uppercase tracking-widest text-xs"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    SYNCING...
                                </>
                            ) : (
                                <>
                                    Initialize Dashboard
                                    <ShieldCheck className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Meta Info */}
                    <div className="mt-10 pt-8 border-t border-gray-100 dark:border-white/10 text-center">
                        <p className="text-[9px] font-black text-gray-400 dark:text-gray-600 uppercase tracking-[0.5em]">
                            &copy; {new Date().getFullYear()} BHAVESH ENTERPRISES | ENCRYPTED ACCESS
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
