import React, { useId } from "react"

export const BrandLogo = ({ className }: { className?: string }) => {
    const id = useId();
    const gradientId = `goldGradient-${id.replace(/:/g, '')}`;

    return (
        <svg
            viewBox="-30 0 360 160" // Adjusted viewBox to prevent text clipping
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <defs>
                <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#F59E0B" />
                    <stop offset="100%" stopColor="#D97706" />
                </linearGradient>
            </defs>

            {/* Top Gear Segment */}
            <path
                d="M90 60 C 100 30, 200 30, 210 60"
                stroke="#1B4D63"
                strokeWidth="18"
                strokeLinecap="butt"
                strokeDasharray="14 8"
                fill="none"
            />
            <path
                d="M90 60 C 100 30, 200 30, 210 60"
                stroke="#1B4D63"
                strokeWidth="14"
                strokeLinecap="butt"
                fill="none"
            />

            {/* Bottom Gear Segment */}
            <path
                d="M210 110 C 200 140, 100 140, 90 110"
                stroke="#1B4D63"
                strokeWidth="18"
                strokeLinecap="butt"
                strokeDasharray="14 8"
                fill="none"
            />
            <path
                d="M210 110 C 200 140, 100 140, 90 110"
                stroke="#1B4D63"
                strokeWidth="14"
                strokeLinecap="butt"
                fill="none"
            />

            {/* Top Orange Swoosh */}
            <path
                d="M30 85 H 90 Q 110 85, 120 70 Q 150 25, 200 45"
                stroke={`url(#${gradientId})`}
                strokeWidth="6"
                strokeLinecap="round"
                fill="none"
            />

            {/* Bottom Orange Swoosh */}
            <path
                d="M270 95 H 210 Q 190 95, 180 110 Q 150 155, 100 135"
                stroke={`url(#${gradientId})`}
                strokeWidth="6"
                strokeLinecap="round"
                fill="none"
            />

            {/* Main Text */}
            <text
                x="150"
                y="92"
                textAnchor="middle"
                fill="#1B4D63"
                fontSize="32" // Adjusted size
                fontWeight="900"
                fontFamily="sans-serif"
                className="uppercase tracking-tighter"
            >
                Bhavesh Enterprises
            </text>

            {/* Sub Text */}
            <text
                x="150"
                y="108"
                textAnchor="middle"
                fill="#D97706"
                fontSize="9"
                fontWeight="700"
                fontFamily="sans-serif"
                letterSpacing="3"
                className="uppercase"
            >
                Engineering Simplified
            </text>
        </svg>
    )
}
