import React from 'react';
import { X, Printer, Check, Building2 } from 'lucide-react';
import { Product } from '../types';
import { useCms } from '../context/CmsContext';
import { Logo } from './Logo';
import { printElement } from '../utils/printHelper';

interface SpecSheetGeneratorModalProps {
  product: Product | null;
  onClose: () => void;
}

export const SpecSheetGeneratorModal: React.FC<SpecSheetGeneratorModalProps> = ({
  product,
  onClose
}) => {
  const { settings } = useCms();
  const phone = settings.phone_numbers?.[0] || '';
  const email = settings.email_addresses?.[0] || '';
  const website = settings.website || 'meglux.springstrdg.com';
  const companyName = settings.company_name || 'Meglux';
  const address = settings.address || 'Dubai, UAE';

  if (!product) return null;

  const handlePrint = () => {
    printElement('printable-spec-sheet', `Megalux - ${product.name} Specification Sheet`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col text-slate-800 print-document-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Controls */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50 no-print">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-md text-xs font-black bg-[#FFE500] text-black uppercase font-mono">
              Product Overview Brochure
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer border border-slate-200"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-500 hover:text-black rounded-xl hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Brochure Page */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-100 print:bg-white print:p-0">
          <div id="printable-spec-sheet" className="max-w-3xl mx-auto bg-white text-slate-900 rounded-2xl shadow-xl p-8 sm:p-12 border border-slate-200 space-y-8 font-sans print:shadow-none print:border-none print:p-0">
            {/* Header */}
            <div className="flex items-start justify-between border-b-2 border-slate-900 pb-6">
              <div>
                <div className="mb-2">
                  <Logo size="md" />
                </div>
                <span className="text-[10px] tracking-widest text-slate-500 uppercase font-black block">
                  PRODUCT PROFILE & OVERVIEW
                </span>
                <span className="text-[11px] text-slate-600 block mt-1 font-medium">
                  {address}{phone ? ` | Tel: ${phone}` : ''}{email ? ` | ${email}` : ''}
                </span>
              </div>

              <div className="text-right">
                <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-300 text-[10px] font-mono font-bold text-slate-900 uppercase block">
                  CATEGORY: {product.categoryName}
                </span>
              </div>
            </div>

            {/* Product Title & Hero Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              <div className="md:col-span-8 space-y-3">
                <h1 className="text-2xl font-black text-slate-950 leading-tight">
                  {product.name}
                </h1>
                <p className="text-xs font-bold text-slate-700">
                  {product.tagline}
                </p>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <h4 className="text-[11px] font-bold uppercase text-slate-900 font-mono mb-1">
                    About this Product
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {product.fullDesc}
                  </p>
                </div>
              </div>

              <div className="md:col-span-4 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 h-52 shadow-inner">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Applications & Finishes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs pt-4 border-t border-slate-200">
              {product.applications && (
                <div className="space-y-2">
                  <h4 className="font-black text-slate-950 uppercase text-[11px] flex items-center gap-1.5 font-mono">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Recommended Applications:</span>
                  </h4>
                  <ul className="space-y-1.5 text-slate-700 font-medium">
                    {product.applications.map((a, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-slate-900 shrink-0 mt-0.5" />
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {product.finishOptions && (
                <div className="space-y-2">
                  <h4 className="font-black text-slate-950 uppercase text-[11px] font-mono">
                    Available Finishes:
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {product.finishOptions.map((f, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-xs text-slate-800">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Submittal Footer */}
            <div className="pt-6 border-t border-slate-300 flex items-center justify-between text-[11px] text-slate-500">
              <div>
                <span className="font-bold text-slate-900">{companyName}</span>
                <span className="block text-[10px]">{address}</span>
              </div>
              <div className="text-right">
                <span className="font-mono font-bold text-slate-900">{website}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
