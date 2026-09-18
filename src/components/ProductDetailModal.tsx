import React, { useState } from 'react';
import { 
  X, 
  ArrowRight, 
  Share2, 
  FileSpreadsheet,
  Check,
  Building2,
  Layers
} from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onEnquire: (product: Product) => void;
  onGenerateSpecSheet?: (product: Product) => void;
  isInRFQ?: boolean;
  onToggleRFQ?: (product: Product) => void;
  onSelectRelatedProduct: (product: Product) => void;
  allProducts: Product[];
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onEnquire,
  isInRFQ = false,
  onToggleRFQ,
  onSelectRelatedProduct,
  allProducts
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  if (!product) return null;

  const galleryImages = [product.image, ...(product.gallery || [])].filter((v, i, a) => a.indexOf(v) === i);
  const relatedProducts = allProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

  const handleShare = async () => {
    const shareUrl = window.location.href;
    const shareText = `Check out ${product.name} from Megalux International: ${product.tagline || product.fullDesc}`;
    
    // Try native mobile Web Share API first
    if (navigator.share && typeof navigator.share === 'function') {
      try {
        await navigator.share({
          title: `${product.name} | Megalux International`,
          text: shareText,
          url: shareUrl,
        });
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
        return;
      } catch (err) {
        // If user cancelled / dismissed the native share sheet, do not fallback to copy
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }
      }
    }

    // Resilient fallback to clipboard
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = shareUrl;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-md text-xs font-black bg-[#FFE500] text-black uppercase tracking-wider font-mono">
              {product.categoryName}
            </span>
            {product.subcategory && (
              <span className="text-xs text-slate-600 font-medium">
                {product.subcategory}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 text-slate-600 hover:text-black hover:bg-slate-200 rounded-xl border border-slate-200 transition-colors text-xs flex items-center gap-1.5 cursor-pointer font-medium"
              title="Copy link"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{copied ? 'Copied!' : 'Share'}</span>
            </button>

            <button
              id="close-product-modal-btn"
              onClick={onClose}
              className="p-2 text-slate-500 hover:text-black hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Top Hero Grid: Image Gallery + Long Description */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Gallery Column (5 cols) */}
            <div className="lg:col-span-5 space-y-3">
              <div className="relative h-72 sm:h-80 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-inner">
                <img 
                  src={galleryImages[activeImageIndex] || product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover object-center transition-all duration-300"
                />
              </div>

              {/* Thumbnails */}
              {galleryImages.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-16 h-14 rounded-xl overflow-hidden shrink-0 border transition-all cursor-pointer ${
                        activeImageIndex === idx 
                          ? 'border-black ring-2 ring-black/20' 
                          : 'border-slate-200 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="thumb" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details & Simple Long Description (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-950 font-display leading-tight">
                    {product.name}
                  </h1>
                  <p className="text-sm text-slate-700 font-bold mt-1">
                    {product.tagline}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h3 className="text-xs font-black text-slate-900 uppercase font-mono tracking-wider flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-slate-800" />
                    <span>Product Description</span>
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed font-medium">
                    {product.fullDesc}
                  </p>
                </div>

                {/* Applications / Suitable Settings */}
                {product.applications && product.applications.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-900 font-mono uppercase block">
                      Recommended Applications:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {product.applications.map((app, i) => (
                        <div key={i} className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-slate-900 shrink-0" />
                          <span className="text-xs text-slate-800 font-medium">{app}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Finishes / Options if any */}
                {product.finishOptions && product.finishOptions.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-900 font-mono uppercase block">
                      Available Finishes:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {product.finishOptions.map((finish, i) => (
                        <span key={i} className="px-3 py-1 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 font-medium">
                          {finish}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Primary Modal Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-3 border-t border-slate-200">
                <button
                  id="modal-request-quote-btn"
                  onClick={() => onEnquire(product)}
                  className="w-full px-6 py-3.5 rounded-xl bg-[#FFE500] hover:bg-[#F5DC00] text-black text-xs sm:text-sm font-black tracking-tight transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer border border-black/10"
                >
                  <span>Enquire for this Product</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            </div>
          </div>

          {/* Related Products Carousel / Grid */}
          {relatedProducts.length > 0 && (
            <div className="space-y-4 pt-6 border-t border-slate-200">
              <h3 className="text-sm font-black text-slate-950 font-display uppercase tracking-wider flex items-center gap-2">
                <Building2 className="w-4 h-4 text-slate-800" />
                <span>Other Products in {product.categoryName}</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {relatedProducts.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectRelatedProduct(rel)}
                    className="p-3 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-900 transition-all cursor-pointer group flex items-center gap-3"
                  >
                    <img src={rel.image} alt={rel.name} className="w-14 h-14 rounded-xl object-cover shrink-0" />
                    <div className="overflow-hidden">
                      <h5 className="text-xs font-bold text-slate-950 truncate group-hover:text-black transition-colors">
                        {rel.name}
                      </h5>
                      <span className="text-[10px] text-slate-500 block truncate font-medium">{rel.subcategory}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
