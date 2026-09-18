import React from 'react';
import { X, ExternalLink, Building2, CheckCircle2, ShieldCheck } from 'lucide-react';
import { CmsClient } from '../types';
import { resolveImageUrl } from '../services/cmsApi';

interface ClientDetailModalProps {
  client: CmsClient | null;
  onClose: () => void;
}

export const ClientDetailModal: React.FC<ClientDetailModalProps> = ({ client, onClose }) => {
  if (!client) return null;

  const logoUrl = resolveImageUrl(client.logo);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-auto text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md text-[10px] font-black bg-[#FFE500] text-black uppercase tracking-wider font-mono">
              Client & Partner
            </span>
            {client.is_featured && (
              <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-slate-900 text-white uppercase font-mono">
                Featured Partner
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-200/80 hover:bg-slate-300 flex items-center justify-center text-slate-700 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden shrink-0 shadow-sm p-2">
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt={client.company_name}
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <Building2 className="w-8 h-8 text-slate-400" />
              )}
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-950 font-display">
                {client.company_name}
              </h3>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                Verified Enterprise Partner
              </p>
            </div>
          </div>

          {client.short_description && (
            <div className="space-y-1.5">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 block">
                Overview:
              </span>
              <p className="text-sm text-slate-700 leading-relaxed font-medium bg-slate-50 p-4 rounded-xl border border-slate-100">
                {client.short_description}
              </p>
            </div>
          )}

          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            {client.website_url && (
              <a
                href={client.website_url.startsWith('http') ? client.website_url : `https://${client.website_url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <span>Visit Client Website</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#FFE500]" />
              </a>
            )}
            <button
              onClick={onClose}
              className="w-full sm:w-auto py-3 px-5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-800 text-xs font-bold transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
