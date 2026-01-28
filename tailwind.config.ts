import type { Config } from 'tailwindcss'
import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'
import animate from 'tailwindcss-animate'

const config: Config = {
    darkMode: 'class',
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                // EXACT PALETTE
                industrial: {
                    DEFAULT: '#0C4A6E', // industrial-blue
                    light: '#0369A1',
                },
                safety: {
                    DEFAULT: '#D97706', // safety-orange
                    light: '#F59E0B',
                },
                gray: {
                    light: '#F3F4F6',  // light-gray (cards)
                    medium: '#6B7280', // medium-gray (text)
                    dark: '#1F2937',   // dark-text
                },
                // Re-mapping to semantic names for ease if needed, but sticking to logic
                primary: '#0C4A6E',
                secondary: '#D97706',
                background: '#FFFFFF',
                dark: '#1F2937',
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
                display: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
            },
            boxShadow: {
                'subtle': '0 1px 3px rgba(0,0,0,0.1)',
                'medium': '0 4px 6px rgba(0,0,0,0.1)',
            },
            animation: {
                'spin-slow': 'spin 8s linear infinite',
            }
        },
    },
    plugins: [
        forms,
        typography,
        animate,
    ],
}

export default config
