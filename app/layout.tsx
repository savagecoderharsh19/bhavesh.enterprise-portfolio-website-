import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { SmoothScrollProvider } from '@/components/providers/smooth-scroll'
import { Providers } from '@/components/Providers'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-poppins'
})

export const metadata: Metadata = {
  title: 'Bhavesh Enterprises | Custom Engineering Solutions',
  description: 'Premium industrial portfolio and lead generation for custom manufacturing and engineering sourcing.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={cn(inter.variable, poppins.variable, "bg-dark text-white font-sans antialiased overflow-x-hidden selection:bg-secondary/30 selection:text-secondary-light")} suppressHydrationWarning>
        <Providers>
          <SmoothScrollProvider>
            {children}
          </SmoothScrollProvider>
        </Providers>
      </body>
    </html>
  )
}
