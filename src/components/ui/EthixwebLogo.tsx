import React from 'react';

interface EthixwebLogoProps {
  className?: string;
  variant?: 'light' | 'dark'; // 'light' is for light backgrounds (shows brand red/dark), 'dark' is for dark backgrounds (shows white/red)
}

export default function EthixwebLogo({ className = 'h-8 w-auto', variant = 'light' }: EthixwebLogoProps) {
  const isDark = variant === 'dark';
  const textColor = isDark ? '#FFFFFF' : '#0F1012';
  const brandRed = '#C0272D';

  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      {/* Authentic Geometric Ethixweb Brand Mark */}
      <svg
        viewBox="0 0 210 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto"
        aria-label="Ethixweb"
      >
        {/* Modern Stylized Geometric Lettering matching Ethixweb Identity */}
        <text
          x="0"
          y="24"
          fontFamily="var(--font-display), 'Plus Jakarta Sans', sans-serif"
          fontWeight="900"
          fontSize="24"
          letterSpacing="0.08em"
          fill={brandRed}
        >
          ETHIX
        </text>
        <text
          x="94"
          y="24"
          fontFamily="var(--font-display), 'Plus Jakarta Sans', sans-serif"
          fontWeight="900"
          fontSize="24"
          letterSpacing="0.08em"
          fill={textColor}
        >
          WEB
        </text>
        {/* Subtle geometric dot accent */}
        <circle cx="178" cy="22" r="3" fill={brandRed} />
      </svg>
    </div>
  );
}
