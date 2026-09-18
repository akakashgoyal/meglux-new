import React from 'react';
import { ShieldCheck, Building2 } from 'lucide-react';
import { CmsClient } from '../types';
import { resolveImageUrl } from '../services/cmsApi';

interface ClientsMarqueeProps {
  clients: CmsClient[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export const ClientsMarquee: React.FC<ClientsMarqueeProps> = ({
  clients,
  title = "Trusted by Leading Master Developers, Consultants & Authorities",
  subtitle = "Powering landmark civic, hospitality, commercial, and perimeter defense projects across Dubai & the GCC.",
  className = ""
}) => {
  if (!clients || clients.length === 0) return null;

  // Duplicate items to ensure a seamless infinite scroll loop
  const displayClients = [...clients, ...clients, ...clients, ...clients];

  return (
    <section className={`w-full pt-4 pb-5 sm:pt-5 sm:pb-6 bg-slate-50/80 border-y border-slate-200/90 relative overflow-hidden ${className}`}>
      {/* Edge gradient fades matching the clean light palette */}
      <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent pointer-events-none z-10" />
      <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent pointer-events-none z-10" />
      
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-3.5 sm:mb-4 text-center">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] sm:text-xs font-black bg-[#FFE500] text-black font-mono uppercase tracking-wider mb-1.5 shadow-xs">
          <Building2 className="w-3.5 h-3.5" />
          <span>Strategic Project Partners</span>
        </div>
        <h2 className="text-lg sm:text-xl lg:text-2xl font-black text-slate-950 font-display tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl mx-auto font-medium leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {/* Exclusively Client Logos Marquee */}
      <div className="relative w-full overflow-hidden">
        <div className="animate-marquee flex items-center gap-4 sm:gap-6 py-2">
          {displayClients.map((client, idx) => {
            const logoUrl = client.logo ? resolveImageUrl(client.logo) : '';

            return (
              <div
                key={`${client.id}-${idx}`}
                className="flex-shrink-0 group relative bg-white rounded-2xl p-4 sm:p-5 w-44 sm:w-56 h-20 sm:h-24 flex items-center justify-center border border-slate-200/90 hover:border-slate-900 transition-all duration-300 shadow-xs hover:shadow-md hover:-translate-y-0.5"
                title={client.company_name}
              >
                {logoUrl && !logoUrl.includes('photo-') ? (
                  <img
                    src={logoUrl}
                    alt={client.company_name}
                    className="max-h-12 sm:max-h-14 max-w-[140px] sm:max-w-[180px] w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                      const parent = (e.target as HTMLElement).parentElement;
                      if (parent) {
                        const fallback = parent.querySelector('.client-monogram-fallback');
                        if (fallback) fallback.classList.remove('hidden');
                      }
                    }}
                  />
                ) : null}

                {/* Monogram fallback if image is missing or errors */}
                <div className={`client-monogram-fallback flex flex-col items-center justify-center text-center ${logoUrl ? 'hidden' : ''}`}>
                  <span className="text-sm sm:text-base font-black text-slate-950 font-display tracking-wider uppercase">
                    {client.company_name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Trust Subtext */}
      <div className="mt-3 sm:mt-4 text-center text-xs text-slate-600 font-medium flex items-center justify-center gap-2">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
        <span className="font-mono text-[10px] sm:text-xs">
          Pre-Qualified Supplier for Middle East Master Developers & Government Entities
        </span>
      </div>
    </section>
  );
};
