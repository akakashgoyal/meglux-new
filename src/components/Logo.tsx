import React, { useState } from 'react';
import { useCms } from '../context/CmsContext';
import { resolveImageUrl } from '../services/cmsApi';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
  variant?: 'badge-only' | 'badge-with-text' | 'horizontal';
  theme?: 'light' | 'dark';
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
  variant = 'badge-with-text',
  theme = 'light'
}) => {
  const { settings } = useCms();
  const [imageError, setImageError] = useState(false);

  const logoUrl = settings?.logo ? resolveImageUrl(settings.logo) : '';
  const companyName = settings?.company_name || 'MEGLUX';

  // Size dimensions for the square badge or dynamic logo image
  const sizeMap = {
    sm: { 
      badge: 'w-8 h-8', 
      imgH: 'h-8 w-8',
      textLg: 'text-[13px]', 
      textSm: 'text-[9px]'
    },
    md: { 
      badge: 'w-11 h-11 sm:w-12 sm:h-12', 
      imgH: 'h-11 w-11 sm:h-12 sm:w-12',
      textLg: 'text-base sm:text-lg', 
      textSm: 'text-[10px] sm:text-[11px]'
    },
    lg: { 
      badge: 'w-14 h-14 sm:w-16 sm:h-16', 
      imgH: 'h-14 w-14 sm:h-16 sm:w-16',
      textLg: 'text-lg sm:text-xl', 
      textSm: 'text-xs sm:text-sm'
    },
    xl: { 
      badge: 'w-24 h-24 sm:w-28 sm:h-28', 
      imgH: 'h-24 w-24 sm:h-28 sm:w-28',
      textLg: 'text-2xl sm:text-3xl', 
      textSm: 'text-sm sm:text-base'
    },
  };

  const currentSize = sizeMap[size];

  // SVG representation of the official Megalux International yellow badge logo as crisp vector
  const badgeSvg = (
    <div className={`relative shrink-0 select-none ${currentSize.badge}`}>
      <svg
        viewBox="0 0 500 500"
        className="w-full h-full shadow-xs"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Yellow primary base container */}
        <rect x="0" y="0" width="465" height="465" fill="#FFE500" />
        
        {/* Right solid black accent bar */}
        <rect x="465" y="0" width="35" height="500" fill="#111111" />
        
        {/* Bottom solid black accent bar */}
        <rect x="0" y="465" width="500" height="35" fill="#111111" />

        {/* MEGA LUX text */}
        <text
          x="38"
          y="256"
          fill="#111111"
          fontFamily="'Outfit', 'Plus Jakarta Sans', 'Arial Black', sans-serif"
          fontWeight="900"
          fontSize="68"
          letterSpacing="0.01em"
        >
          MEGA LUX
        </text>

        {/* INTERNATIONAL text */}
        <text
          x="38"
          y="328"
          fill="#111111"
          fontFamily="'Barlow Condensed', 'DIN Alternate', 'Arial Narrow', 'Impact', sans-serif"
          fontWeight="800"
          fontSize="53"
          letterSpacing="0.04em"
          textLength="388"
          lengthAdjust="spacingAndGlyphs"
        >
          INTERNATIONAL
        </text>
      </svg>
    </div>
  );

  // Use CMS uploaded logo if available, otherwise use crisp vector badge
  const badgeElement = (logoUrl && !imageError) ? (
    <div className={`relative shrink-0 select-none ${currentSize.badge}`}>
      <img
        src={logoUrl}
        alt={companyName}
        className="w-full h-full object-contain rounded-xs shadow-xs"
        referrerPolicy="no-referrer"
        onError={() => setImageError(true)}
      />
    </div>
  ) : badgeSvg;

  if (variant === 'badge-only' || !showText) {
    return (
      <div className={`inline-flex items-center ${className}`}>
        {badgeElement}
      </div>
    );
  }

  const textColorClass = theme === 'dark' ? 'text-white' : 'text-slate-950';
  const subtextColorClass = theme === 'dark' ? 'text-slate-400' : 'text-slate-500';

  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {badgeElement}
      <div className="flex flex-col leading-none justify-center">
        <div className="flex items-center gap-1.5">
          <span className={`font-black tracking-tight ${textColorClass} font-display uppercase ${currentSize.textLg}`}>
            MEGA LUX
          </span>
          <span className="px-1.5 py-0.5 rounded bg-[#FFE500] text-black font-extrabold text-[9px] font-mono uppercase tracking-wider">
            DUBAI
          </span>
        </div>
        <span className={`font-bold tracking-wider ${subtextColorClass} font-mono uppercase mt-1 ${currentSize.textSm}`}>
          INTERNATIONAL LLC
        </span>
      </div>
    </div>
  );
};

