import React from 'react';
import { 
  ArrowRight, 
  Check, 
  Plus, 
  FileText, 
  Maximize2 
} from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  onEnquire: (product: Product) => void;
  isInRFQ?: boolean;
  onToggleRFQ?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onViewDetails,
  onEnquire,
  isInRFQ = false,
  onToggleRFQ
}) => {
  return (
    <div className="group rounded-2xl bg-white border border-slate-200 hover:border-slate-900 transition-all duration-300 flex flex-col overflow-hidden shadow-md hover:shadow-xl flex-1">
      {/* Image Container with Hover Zoom & Badges */}
      <div className="relative h-56 sm:h-64 w-full bg-slate-100 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

        {/* Category Pill */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="px-2.5 py-1 rounded-md text-[11px] font-black bg-[#FFE500] text-black tracking-wide uppercase shadow-sm">
            {product.categoryName}
          </span>
          {product.subcategory && (
            <span className="px-2 py-1 rounded-md text-[10px] font-bold bg-black/80 text-white backdrop-blur-md">
              {product.subcategory}
            </span>
          )}
        </div>

        {/* Quick View Button on Image */}
        <button
          onClick={() => onViewDetails(product)}
          className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-white/90 text-slate-800 hover:bg-[#FFE500] hover:text-black transition-all flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 focus:opacity-100 cursor-pointer"
          title="View Details"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h3 
            onClick={() => onViewDetails(product)}
            className="text-base sm:text-lg font-black text-slate-950 font-display hover:text-black transition-colors cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>
          <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed font-medium">
            {product.fullDesc || product.shortDesc}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <button
            onClick={() => onViewDetails(product)}
            className="flex-1 px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-slate-200"
          >
            <FileText className="w-3.5 h-3.5 text-slate-900" />
            <span>View Details</span>
          </button>

          <button
            onClick={() => onEnquire(product)}
            className="flex-1 px-4 py-2.5 rounded-xl bg-[#FFE500] hover:bg-[#F5DC00] text-black text-xs font-extrabold tracking-tight transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer border border-black/10"
          >
            <span>Enquire</span>
            <ArrowRight className="w-3 h-3 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );
};
