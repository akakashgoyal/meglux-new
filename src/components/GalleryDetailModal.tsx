import React from 'react';
import { X, MapPin, Image as ImageIcon, Sparkles } from 'lucide-react';
import { CmsGalleryItem } from '../types';
import { resolveImageUrl } from '../services/cmsApi';

interface GalleryDetailModalProps {
  item: CmsGalleryItem | null;
  onClose: () => void;
}

export const GalleryDetailModal: React.FC<GalleryDetailModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  const imageUrl = resolveImageUrl(item.image);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-1 rounded-md text-[10px] font-black bg-[#FFE500] text-black uppercase tracking-wider font-mono">
              Gallery Showcase
            </span>
            {item.location && (
              <div className="flex items-center gap-1.5 text-xs text-slate-300 font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#FFE500]" />
                <span>{item.location}</span>
              </div>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Media */}
        <div className="p-4 sm:p-6 flex-1 overflow-y-auto space-y-4">
          <div className="relative rounded-2xl overflow-hidden bg-black max-h-[60vh] flex items-center justify-center border border-slate-800/80">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={item.alt_text || item.title}
                className="max-h-[58vh] w-auto max-w-full object-contain rounded-xl"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="py-20 flex flex-col items-center justify-center text-slate-500 gap-2">
                <ImageIcon className="w-12 h-12" />
                <span className="text-xs font-mono">Visual asset placeholder</span>
              </div>
            )}
          </div>

          <div className="space-y-2 pt-2">
            <h3 className="text-xl sm:text-2xl font-black text-white font-display">
              {item.title}
            </h3>
            {item.subtitle && (
              <p className="text-sm text-slate-300 leading-relaxed font-medium">
                {item.subtitle}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
