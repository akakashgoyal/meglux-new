import React, { useEffect, useState } from 'react';
import { X, ShieldCheck, FileText, Loader2, AlertCircle, RefreshCw, Calendar } from 'lucide-react';
import { fetchLegalPage, LegalPage } from '../services/cmsApi';

interface PrivacyTermsModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const PrivacyTermsModal: React.FC<PrivacyTermsModalProps> = ({
  type,
  onClose
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [legalData, setLegalData] = useState<LegalPage | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!type) {
      setLegalData(null);
      setError(null);
      return;
    }

    let isMounted = true;
    const slug = type === 'privacy' ? 'privacy-policy' : 'terms-conditions';

    const loadPage = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchLegalPage(slug);
        if (!isMounted) return;

        if (data) {
          setLegalData(data);
        } else {
          setError(`Unable to load ${type === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'} from Meglux CMS. Please try again.`);
        }
      } catch (err: any) {
        if (!isMounted) return;
        setError(err?.message || 'Network error while fetching legal documentation.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadPage();

    return () => {
      isMounted = false;
    };
  }, [type]);

  if (!type) return null;

  const formattedDate = legalData?.updated_at
    ? new Date(legalData.updated_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FFE500]/20 border border-[#FFE500]/40 flex items-center justify-center text-slate-950 shadow-xs">
              {type === 'privacy' ? <ShieldCheck className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-950 font-display leading-tight">
                {legalData?.title || (type === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions')}
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-[#FFE500] text-black font-mono">
                  Official Policy
                </span>
                {formattedDate && (
                  <span className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    Last Updated: {formattedDate}
                  </span>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-200/80 hover:bg-slate-300 flex items-center justify-center text-slate-700 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body with Dynamic Content - Zero Ugly Scrollbar */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {loading && (
            <div className="py-16 flex flex-col items-center justify-center gap-3 text-slate-500">
              <Loader2 className="w-7 h-7 animate-spin text-[#FFE500]" />
              <p className="text-sm font-bold text-slate-800">Loading documentation from Meglux CMS...</p>
              <p className="text-xs text-slate-500">Connecting to {type === 'privacy' ? 'privacy-policy' : 'terms-conditions'} endpoint</p>
            </div>
          )}

          {!loading && error && (
            <div className="py-10 px-6 rounded-2xl bg-rose-50 border border-rose-200 text-center space-y-3">
              <AlertCircle className="w-8 h-8 text-rose-600 mx-auto" />
              <h4 className="text-sm font-bold text-rose-950">Unable to Fetch Content</h4>
              <p className="text-xs text-rose-800 max-w-md mx-auto">{error}</p>
              <button
                onClick={() => {
                  const slug = type === 'privacy' ? 'privacy-policy' : 'terms-conditions';
                  setLoading(true);
                  setError(null);
                  fetchLegalPage(slug).then((data) => {
                    if (data) setLegalData(data);
                    else setError('Unable to reach CMS legal endpoint. Please retry.');
                  }).catch((err) => setError(err?.message || 'Error fetching document.')).finally(() => setLoading(false));
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Retry Connection
              </button>
            </div>
          )}

          {!loading && !error && legalData && (
            <div 
              className="prose max-w-none text-slate-700 text-xs sm:text-sm leading-relaxed 
                [&_p]:mb-3 [&_p]:text-slate-700 [&_p]:leading-relaxed
                [&_strong]:text-slate-950 [&_strong]:font-bold
                [&_h1]:text-slate-950 [&_h1]:font-black [&_h1]:text-lg [&_h1]:mb-3 [&_h1]:mt-6 [&_h1]:font-display
                [&_h2]:text-slate-950 [&_h2]:font-extrabold [&_h2]:text-base [&_h2]:mb-2 [&_h2]:mt-5 [&_h2]:font-display
                [&_h3]:text-slate-950 [&_h3]:font-bold [&_h3]:text-sm [&_h3]:mb-2 [&_h3]:mt-4
                [&_h4]:text-slate-900 [&_h4]:font-bold [&_h4]:text-xs [&_h4]:uppercase [&_h4]:tracking-wider [&_h4]:mb-2 [&_h4]:mt-4 [&_h4]:font-mono
                [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-3 [&_ul]:space-y-1.5
                [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-3 [&_ol]:space-y-1.5
                [&_li]:text-slate-700
                [&_a]:text-slate-950 [&_a]:underline [&_a]:font-semibold [&_a]:hover:text-black
                [&_table]:w-full [&_table]:border-collapse [&_table]:my-4
                [&_th]:border [&_th]:border-slate-200 [&_th]:p-2.5 [&_th]:bg-slate-50 [&_th]:text-left [&_th]:font-bold [&_th]:text-slate-900
                [&_td]:border [&_td]:border-slate-200 [&_td]:p-2.5"
              dangerouslySetInnerHTML={{ __html: legalData.content }}
            />
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-slate-100 bg-slate-50 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-slate-500 font-medium">
            Megalux International • Official Corporate Documentation
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
