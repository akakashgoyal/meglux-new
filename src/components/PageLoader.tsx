import React, { useEffect, useState } from 'react';
import { Logo } from './Logo';

interface PageLoaderProps {
  isLoading: boolean;
  pageName?: string;
  subtitle?: string;
}

export const PageLoader: React.FC<PageLoaderProps> = ({
  isLoading,
  pageName,
  subtitle = 'Engineering Architectural Luminance & Security Infrastructure'
}) => {
  const [shouldRender, setShouldRender] = useState(isLoading);
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    let progressTimer: NodeJS.Timeout;
    let removeTimer: NodeJS.Timeout;

    if (isLoading) {
      setShouldRender(true);
      setProgress(20);
      
      // Animate progress smoothly towards 90%
      progressTimer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return prev;
          const increment = Math.random() * 25 + 10;
          return Math.min(prev + increment, 90);
        });
      }, 80);
    } else {
      // Complete progress bar to 100% then fade out
      setProgress(100);
      removeTimer = setTimeout(() => {
        setShouldRender(false);
      }, 350);
    }

    return () => {
      clearInterval(progressTimer);
      clearTimeout(removeTimer);
    };
  }, [isLoading]);

  if (!shouldRender) return null;

  const pageDisplayTitles: Record<string, string> = {
    home: 'Engineering Architectural Portfolios & Solutions',
    products: 'Loading Lighting, Street Furniture & Security Systems',
    projects: 'Loading GCC Infrastructure & Commercial Projects',
    careers: 'Loading Technical & Engineering Career Openings',
    approvals: 'Loading Compliance Submittals & Technical Approvals',
    objectives: 'Loading Mission, Vision & Strategic Objectives',
    'trade-licence': 'Loading Official Government Trade Licences & Registration',
    contact: 'Loading Engineering Consultation Desk & Dubai Headquarters',
  };

  const currentDisplay = (pageName && pageDisplayTitles[pageName]) 
    ? pageDisplayTitles[pageName] 
    : (pageName ? `Loading ${pageName.charAt(0).toUpperCase() + pageName.slice(1)}` : 'Loading Systems & Specifications');

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading page"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-950/85 backdrop-blur-md transition-all duration-350 ease-out ${
        isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Subtle background ambient glow */}
      <div className="absolute w-96 h-96 rounded-full bg-[#FFE500]/10 blur-3xl pointer-events-none animate-pulse" />

      {/* Main Loader Container */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-md w-full">
        {/* Animated Badge Halo Wrapper */}
        <div className="relative mb-6 flex items-center justify-center">
          {/* Outer glowing pulsing ring */}
          <div className="absolute -inset-3.5 rounded-2xl bg-[#FFE500]/25 blur-md animate-pulse" />

          {/* Rotating precision spinner border */}
          <div className="absolute -inset-2.5 rounded-2xl border-2 border-transparent border-t-[#FFE500] border-r-[#FFE500]/40 animate-spin [animation-duration:1.2s]" />

          {/* Secondary counter-rotating dashed ring */}
          <div className="absolute -inset-4 rounded-3xl border border-dashed border-[#FFE500]/30 animate-spin [animation-duration:6s] [animation-direction:reverse]" />

          {/* Core Logo Badge */}
          <div className="relative p-2.5 bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl">
            <Logo size="lg" variant="badge-only" />
          </div>
        </div>

        {/* Company Identity */}
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-xl sm:text-2xl font-black text-white font-display tracking-wider">
            MEGA LUX
          </span>
          <span className="px-2 py-0.5 rounded bg-[#FFE500] text-black font-extrabold text-[10px] font-mono uppercase tracking-wider">
            DUBAI
          </span>
        </div>
        <p className="text-[11px] sm:text-xs text-slate-400 font-mono uppercase tracking-[0.2em] font-semibold mb-5">
          INTERNATIONAL LLC
        </p>

        {/* Active Page / Dynamic Status */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-200 mb-3 bg-slate-900/80 border border-slate-800 px-3.5 py-1.5 rounded-full shadow-inner">
          <span className="w-2 h-2 rounded-full bg-[#FFE500] animate-ping" />
          <span className="truncate max-w-[280px] sm:max-w-xs">{currentDisplay}</span>
        </div>

        {/* Progress Bar */}
        <div className="w-56 sm:w-64 h-1.5 bg-slate-800/90 rounded-full overflow-hidden p-0.5 border border-slate-700/60 shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-[#FFE500] via-amber-300 to-[#FFE500] rounded-full transition-all duration-200 ease-out shadow-[0_0_10px_rgba(255,229,0,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Subtitle */}
        <p className="mt-4 text-[10px] sm:text-[11px] text-slate-400 font-mono tracking-wider max-w-xs leading-relaxed">
          {subtitle}
        </p>
      </div>
    </div>
  );
};
