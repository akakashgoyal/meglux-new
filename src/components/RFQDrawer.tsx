import React from 'react';
import { X, Trash2, ArrowRight, FileSpreadsheet } from 'lucide-react';
import { Product } from '../types';

interface RFQDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: Product[];
  onRemoveItem: (productId: string) => void;
  onClearAll: () => void;
  onProceedToConsultation: () => void;
}

export const RFQDrawer: React.FC<RFQDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onClearAll,
  onProceedToConsultation
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white border-l border-slate-200 h-full flex flex-col shadow-2xl text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#FFE500] text-black flex items-center justify-center font-bold">
              <FileSpreadsheet className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-950 font-display">
                Specification / RFQ List
              </h3>
              <span className="text-[10px] text-slate-500 font-mono font-bold">
                {items.length} {items.length === 1 ? 'System Selected' : 'Systems Selected'}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-500 hover:text-black rounded-xl hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
          {items.length === 0 ? (
            <div className="py-20 text-center space-y-3 text-slate-500 text-xs max-w-xs mx-auto">
              <FileSpreadsheet className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="font-bold text-slate-900">Your Specification List is Empty</p>
              <p className="text-[11px] leading-relaxed font-medium">
                Browse our product catalogue and click "+ Add to RFQ" on any fixture, crash bollard, or security gate to compile a batch quotation enquiry.
              </p>
            </div>
          ) : (
            items.map((prod) => (
              <div 
                key={prod.id} 
                className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 group"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <img src={prod.image} alt={prod.name} className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-200" />
                  <div className="truncate">
                    <h4 className="text-xs font-bold text-slate-950 truncate group-hover:text-black transition-colors">
                      {prod.name}
                    </h4>
                    <span className="text-[10px] text-slate-500 block truncate font-medium">{prod.categoryName}</span>
                    <span className="text-[10px] text-slate-900 font-mono font-bold block">
                      {prod.specs[0]?.value}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onRemoveItem(prod.id)}
                  className="p-2 text-slate-400 hover:text-rose-600 transition-colors shrink-0 cursor-pointer"
                  title="Remove from specification list"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer Actions */}
        {items.length > 0 && (
          <div className="p-4 sm:p-6 border-t border-slate-200 bg-slate-50 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-600 font-medium">Total Systems in RFQ:</span>
              <span className="font-mono font-bold text-black bg-[#FFE500] px-2 py-0.5 rounded">{items.length} Items</span>
            </div>

            <button
              onClick={() => {
                onClose();
                onProceedToConsultation();
              }}
              className="w-full py-3.5 rounded-xl bg-[#FFE500] hover:bg-[#F5DC00] text-black text-xs font-black tracking-tight transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer border border-black/10"
            >
              <span>Proceed to Submit RFQ Package</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>

            <button
              onClick={onClearAll}
              className="w-full py-1.5 text-slate-500 hover:text-slate-900 text-[11px] text-center font-bold cursor-pointer"
            >
              Clear All Items
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
