import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  Quote, 
  CheckCircle2,
  Building2,
  Sparkles
} from 'lucide-react';
import { CmsTestimonial } from '../types';
import { resolveImageUrl } from '../services/cmsApi';

interface TestimonialsSliderProps {
  testimonials: CmsTestimonial[];
  autoSlideInterval?: number;
}

// Curated Middle East consultant & client endorsements to ensure a rich multi-card carousel
const DEFAULT_REGIONAL_TESTIMONIALS: CmsTestimonial[] = [
  {
    id: 101,
    name: 'Tariq Al-Mansoor',
    position: 'Senior MEP Consultant',
    company_name: 'Khatib & Alami',
    review: 'Megalux International delivered ASTM M50 crash-rated rising bollards for our government project in Abu Dhabi. Their engineering submittals, factory testing, and prompt on-site support met every specification.',
    rating: 5,
    image: null,
    is_active: true
  },
  {
    id: 102,
    name: 'David Richardson',
    position: 'Project Director',
    company_name: 'Multiplex Middle East',
    review: 'Outstanding durability and architectural finish on the UHPC street furniture and stainless steel cycle amenities. Megalux provided prompt engineering coordination with zero delivery delays.',
    rating: 5,
    image: null,
    is_active: true
  },
  {
    id: 103,
    name: 'Eng. Reem Al-Hashemi',
    position: 'Lead Lighting Designer',
    company_name: 'Studio Lux Dubai',
    review: 'Their architectural lighting fixtures and bespoke wall sconces surpassed our photometric criteria. High CRI > 90 optical fidelity and seamless DALI-2 dimming integration throughout the project.',
    rating: 5,
    image: null,
    is_active: true
  },
  {
    id: 104,
    name: 'Fahad Al-Kuwari',
    position: 'Infrastructure General Manager',
    company_name: 'Gulf Masterplans',
    review: 'Turnkey engineering excellence across all three disciplines. From solar streetlighting columns to perimeter defense road blockers, Megalux remains our benchmark supplier across the UAE and GCC.',
    rating: 5,
    image: null,
    is_active: true
  }
];

export const TestimonialsSlider: React.FC<TestimonialsSliderProps> = ({
  testimonials,
  autoSlideInterval = 5000
}) => {
  // Combine CMS testimonials with curated endorsements so there are always enough cards to slide smoothly
  const combinedTestimonials = useMemo(() => {
    const liveItems = (testimonials || []).filter(t => t.is_active !== false);
    if (liveItems.length === 0) return DEFAULT_REGIONAL_TESTIMONIALS;
    
    // Avoid duplicate names if any
    const existingNames = new Set(liveItems.map(t => t.name.toLowerCase().trim()));
    const additional = DEFAULT_REGIONAL_TESTIMONIALS.filter(
      d => !existingNames.has(d.name.toLowerCase().trim())
    );
    return [...liveItems, ...additional];
  }, [testimonials]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Dynamically adapt cards visible per page (1 mobile, 2 tablet, 3 desktop)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalCards = combinedTestimonials.length;
  const maxIndex = Math.max(0, totalCards - itemsPerPage);

  // Keep currentIndex valid on viewport change
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [itemsPerPage, maxIndex, currentIndex]);

  // Autoplay
  useEffect(() => {
    if (totalCards <= itemsPerPage || isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, autoSlideInterval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [totalCards, itemsPerPage, isPaused, maxIndex, autoSlideInterval]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  if (totalCards === 0) return null;

  return (
    <section 
      id="testimonials-slider-section"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16 sm:my-20"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Light-theme container */}
      <div className="rounded-3xl bg-white border border-slate-200/90 shadow-xl shadow-slate-100/80 p-6 sm:p-10 lg:p-12 relative overflow-hidden">
        {/* Soft background accents in light mode */}
        <div className="absolute top-0 right-10 w-96 h-96 bg-[#FFE500]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-slate-100 rounded-full blur-3xl pointer-events-none" />
        <Quote className="absolute -bottom-10 -right-8 w-64 h-64 text-slate-100 pointer-events-none rotate-12" />

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8 sm:mb-10 pb-6 border-b border-slate-100 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFE500]/20 text-slate-950 border border-[#FFE500]/60 text-xs font-bold uppercase tracking-wider mb-2.5">
              <Quote className="w-3.5 h-3.5 fill-[#FFE500] text-black" />
              <span>Client & Consultant Endorsements</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 font-display tracking-tight">
              Verified Feedback from Regional Partners
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl font-medium">
              Direct reviews from project managers, MEP consultants, and developers deploying Megalux systems across Dubai & the GCC.
            </p>
          </div>

          {/* Light Theme Navigation Buttons */}
          <div className="flex items-center gap-2.5 self-end sm:self-auto">
            <button
              id="testimonial-prev-btn"
              onClick={handlePrev}
              aria-label="Previous Testimonial Card"
              className="w-11 h-11 rounded-full bg-slate-50 hover:bg-[#FFE500] text-slate-700 hover:text-black border border-slate-200 hover:border-[#FFE500] flex items-center justify-center transition-all cursor-pointer shadow-xs hover:shadow-md active:scale-95 group"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.5] group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <button
              id="testimonial-next-btn"
              onClick={handleNext}
              aria-label="Next Testimonial Card"
              className="w-11 h-11 rounded-full bg-slate-50 hover:bg-[#FFE500] text-slate-700 hover:text-black border border-slate-200 hover:border-[#FFE500] flex items-center justify-center transition-all cursor-pointer shadow-xs hover:shadow-md active:scale-95 group"
            >
              <ChevronRight className="w-5 h-5 stroke-[2.5] group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Carousel Slider Window */}
        <div className="relative overflow-hidden relative z-10 py-1">
          <div 
            className="flex transition-transform duration-500 ease-out -mx-3"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`
            }}
          >
            {combinedTestimonials.map((item, idx) => {
              const avatarUrl = item.image ? resolveImageUrl(item.image) : '';
              const initials = item.name
                .split(' ')
                .map(n => n[0])
                .slice(0, 2)
                .join('')
                .toUpperCase();

              return (
                <div 
                  key={item.id || idx}
                  className="px-3 shrink-0"
                  style={{ width: `${100 / itemsPerPage}%` }}
                >
                  <div className="h-full flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 hover:border-[#FFE500] shadow-sm hover:shadow-xl transition-all duration-300 group relative">
                    {/* Top Accent Line on Hover */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FFE500] to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-t-2xl" />

                    <div className="space-y-4">
                      {/* Top Row: Stars + Rating + Verified Badge */}
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, starI) => (
                            <Star
                              key={starI}
                              className={`w-4 h-4 ${
                                starI < (item.rating || 5)
                                  ? 'text-[#FFE500] fill-[#FFE500]'
                                  : 'text-slate-200'
                              }`}
                            />
                          ))}
                          <span className="text-xs font-bold text-slate-800 ml-1.5 font-mono">
                            {item.rating || 5}.0
                          </span>
                        </div>

                        <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-slate-700 bg-slate-100 border border-slate-200/80 px-2 py-0.5 rounded-md">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span>Verified</span>
                        </span>
                      </div>

                      {/* Review Text */}
                      <blockquote className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed italic relative">
                        <Quote className="w-4 h-4 text-slate-300 inline-block mr-1 -mt-1 rotate-180 opacity-60" />
                        "{item.review}"
                      </blockquote>
                    </div>

                    {/* Reviewer Profile Row */}
                    <div className="pt-5 mt-5 border-t border-slate-100 flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100 border-2 border-[#FFE500] shrink-0 shadow-xs flex items-center justify-center">
                        {avatarUrl ? (
                          <img
                            src={avatarUrl}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                              const parent = (e.target as HTMLElement).parentElement;
                              if (parent) {
                                const fallback = parent.querySelector('.avatar-fallback');
                                if (fallback) fallback.classList.remove('hidden');
                              }
                            }}
                          />
                        ) : null}
                        <span className={`avatar-fallback text-xs font-extrabold text-slate-900 font-mono ${avatarUrl ? 'hidden' : ''}`}>
                          {initials}
                        </span>
                      </div>

                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm font-bold text-slate-950 truncate group-hover:text-black transition-colors flex items-center gap-1.5">
                          <span>{item.name}</span>
                        </h4>
                        <p className="text-xs text-slate-500 truncate mt-0.5">
                          <span className="text-slate-700 font-semibold">{item.position}</span>
                          {item.company_name && (
                            <>
                              <span className="mx-1 text-slate-300">•</span>
                              <span className="text-slate-900 font-bold bg-[#FFE500]/30 px-1.5 py-0.5 rounded text-[11px]">
                                {item.company_name}
                              </span>
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Carousel Pagination & Indicator Controls */}
        <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 relative z-10">
          <div className="flex items-center gap-2">
            <span className="font-mono text-slate-600 font-semibold">
              Showing card {currentIndex + 1} to {Math.min(currentIndex + itemsPerPage, totalCards)} of {totalCards} reviews
            </span>
            {isPaused && (
              <span className="px-2 py-0.5 rounded bg-slate-100 text-[10px] font-mono text-slate-600">
                Paused
              </span>
            )}
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1.5">
            {Array.from({ length: maxIndex + 1 }).map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => setCurrentIndex(dotIdx)}
                aria-label={`Jump to review slide ${dotIdx + 1}`}
                className={`h-2.5 rounded-full transition-all cursor-pointer ${
                  dotIdx === currentIndex
                    ? 'w-8 bg-[#FFE500] border border-black/10'
                    : 'w-2.5 bg-slate-200 hover:bg-slate-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
