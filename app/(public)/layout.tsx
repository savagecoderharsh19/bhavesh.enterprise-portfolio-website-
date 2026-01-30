import { Navbar } from "@/components/sections/Navbar"
import { Footer } from "@/components/sections/Footer"
import { Floating3DElements } from "@/components/animations/Floating3DElements"

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="relative min-h-screen">
            <Floating3DElements />
            <Navbar />
            <main className="relative">
                {children}
            </main>
            <Footer />
        </div>
    )
}
