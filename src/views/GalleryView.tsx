import React, { useState } from 'react';
import { Image as ImageIcon, MapPin, Maximize2 } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { Lightbox } from '../components/Lightbox';

export const GalleryView: React.FC = () => {
  const { gallery: cmsGallery, loading } = useCms();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="space-y-10 sm:space-y-12 py-8 pb-16">
      {/* Gallery Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white border border-slate-200 p-8 sm:p-12 relative overflow-hidden shadow-xl">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#FFE500] text-black text-xs font-black uppercase tracking-wider font-mono">
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Visual Showcase</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 font-display tracking-tight leading-tight">
              Visual Project & Product Gallery
            </h1>

            <p className="text-base text-slate-700 leading-relaxed font-medium">
              Explore photography of our architectural luminaires, solar installations, crash barrier deployments, and civic urban furniture across the Middle East.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Grid (No category options, pure full visual showcase) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-80 rounded-3xl bg-slate-100 animate-pulse border border-slate-200" />
            ))}
          </div>
        ) : cmsGallery.length === 0 ? (
          <div className="py-16 text-center space-y-3 rounded-3xl bg-white border border-slate-200 p-8 shadow-sm">
            <ImageIcon className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-900">No Gallery Photos Found</h3>
            <p className="text-xs text-slate-500">Check back soon for new installations and photography.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cmsGallery.map((item, idx) => (
              <div
                key={item.id || idx}
                onClick={() => openLightbox(idx)}
                className="group relative rounded-3xl overflow-hidden bg-white border border-slate-200 hover:border-slate-950 transition-all duration-300 cursor-pointer shadow-md hover:shadow-2xl h-80 flex flex-col justify-end"
              >
                {/* Image (Clean without any top yellow line/pill) */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent group-hover:from-slate-950/90 transition-all" />

                {/* Quick View Icon */}
                <div className="absolute top-4 right-4 z-10 w-9 h-9 rounded-xl bg-white/90 backdrop-blur-md text-slate-900 flex items-center justify-center border border-slate-200 opacity-0 group-hover:opacity-100 transition-all transform scale-90 group-hover:scale-100 shadow-md">
                  <Maximize2 className="w-4 h-4" />
                </div>

                {/* Bottom Caption Info */}
                <div className="relative z-10 p-6 space-y-1.5">
                  <h3 className="text-base font-black text-white font-display group-hover:text-[#FFE500] transition-colors leading-snug">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed font-medium">
                      {item.description}
                    </p>
                  )}
                  {item.location && (
                    <div className="flex items-center gap-1.5 pt-1 text-[11px] text-[#FFE500] font-bold">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{item.location}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox Modal */}
      <Lightbox
        items={cmsGallery}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />
    </div>
  );
};
