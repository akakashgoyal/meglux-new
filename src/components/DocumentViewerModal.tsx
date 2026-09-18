import React from 'react';
import { 
  X, 
  Download, 
  CheckCircle,
  Printer 
} from 'lucide-react';
import { DocumentItem } from '../types';
import { useCms } from '../context/CmsContext';
import { printElement } from '../utils/printHelper';

interface DocumentViewerModalProps {
  doc: DocumentItem | null;
  onClose: () => void;
  onDownload: (doc: DocumentItem) => void;
}

export const DocumentViewerModal: React.FC<DocumentViewerModalProps> = ({
  doc,
  onClose,
  onDownload
}) => {
  const { settings } = useCms();
  const address = settings.address || 'Dubai, UAE';
  const phone = settings.phone_numbers?.[0] || '';
  const companyName = settings.company_name || 'MEGLUX';

  if (!doc) return null;

  const handlePrint = () => {
    printElement('printable-document-viewer', `Megalux - ${doc.title}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col text-slate-800 print-document-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50 no-print">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-md text-xs font-black bg-[#FFE500] text-black uppercase font-mono">
              {doc.category}
            </span>
            <span className="text-xs text-slate-500 font-mono font-bold">
              Ref: {doc.refNumber}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 text-slate-700 hover:text-black hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-1.5 text-xs font-bold cursor-pointer"
              title="Print document"
            >
              <Printer className="w-4 h-4 text-slate-900" />
              <span>Print</span>
            </button>
            <button
              onClick={() => onDownload(doc)}
              className="p-2 text-slate-700 hover:text-black hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-1.5 text-xs font-bold cursor-pointer"
            >
              <Download className="w-4 h-4 text-slate-900" />
              <span>Download</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-500 hover:text-black hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Document Simulation Sheet View */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 bg-slate-100 space-y-6 print:bg-white print:p-0">
          {/* Simulated Official Document Sheet */}
          <div id="printable-document-viewer" className="max-w-2xl mx-auto bg-white text-slate-900 rounded-2xl shadow-xl p-8 sm:p-12 border border-slate-200 space-y-8 font-sans print:shadow-none print:border-none print:p-0">
            {/* Document Header with Megalux / Authority Banner */}
            <div className="flex items-start justify-between border-b-2 border-slate-900 pb-6">
              <div>
                <span className="text-xl font-black tracking-tight text-slate-950 font-display block">
                  {companyName.toUpperCase()}
                </span>
                <span className="text-[10px] tracking-[0.2em] text-slate-500 uppercase font-black block">
                  DUBAI, UNITED ARAB EMIRATES
                </span>
                <span className="text-[11px] text-slate-600 block mt-1 font-medium">
                  {address}{phone ? ` | Tel: ${phone}` : ''}
                </span>
              </div>

              <div className="text-right">
                <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-300 text-[11px] font-mono font-bold text-slate-900 uppercase block">
                  {doc.fileType} DOCUMENT
                </span>
                <span className="text-[10px] text-slate-500 font-mono mt-1 block">
                  Document ID: {doc.refNumber}
                </span>
              </div>
            </div>

            {/* Document Title & Category */}
            <div className="space-y-2">
              <span className="text-xs font-black text-black bg-[#FFE500] px-2 py-0.5 rounded tracking-wider uppercase inline-block">
                {doc.category} — Formal Record
              </span>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-950 leading-snug">
                {doc.title}
              </h2>
            </div>

            {/* Structured Table */}
            <div className="rounded-xl border border-slate-200 overflow-hidden text-xs">
              <div className="grid grid-cols-2 bg-slate-50 border-b border-slate-200 p-3">
                <span className="font-bold text-slate-600">Issuing Authority / Organization:</span>
                <span className="text-slate-950 font-semibold">{doc.issuingOrg}</span>
              </div>
              <div className="grid grid-cols-2 p-3 border-b border-slate-200">
                <span className="font-bold text-slate-600">Date of Registration / Issue:</span>
                <span className="text-slate-950 font-semibold">{doc.date}</span>
              </div>
              <div className="grid grid-cols-2 bg-slate-50 border-b border-slate-200 p-3">
                <span className="font-bold text-slate-600">Applicable System Scope:</span>
                <span className="text-slate-950 font-semibold">{doc.productCategory}</span>
              </div>
              <div className="grid grid-cols-2 p-3">
                <span className="font-bold text-slate-600">Verification Status:</span>
                <span className="text-emerald-700 font-black flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> Active & Authorized
                </span>
              </div>
            </div>

            {/* Executive Statement & Summary */}
            <div className="space-y-3 text-xs leading-relaxed text-slate-700 font-medium">
              <h4 className="font-black text-slate-950 uppercase text-[11px] tracking-wide">
                Statement of Compliance & Technical Validity
              </h4>
              <p>
                {doc.summary}
              </p>
              <p className="text-slate-600 text-[11px] italic bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                * Note: This digital preview provides structural verification. Complete manufacturer mill test certificates, photometrics, and stamped material approval submittal (MAS) binders are available to authorized consultants and contractors upon formal request.
              </p>
            </div>

            {/* Official Stamping & Verification Footer */}
            <div className="pt-8 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
              <div>
                <span className="block font-bold text-slate-900">Megalux International QA/QC Department</span>
                <span className="text-[10px]">Dubai, United Arab Emirates</span>
              </div>
              <div className="border border-slate-300 rounded-xl p-2.5 text-center bg-slate-50">
                <span className="block text-[9px] uppercase tracking-widest font-mono text-slate-500 font-bold">CERTIFICATE AUDIT</span>
                <span className="text-[10px] font-black text-slate-900">VERIFIED REFERENCE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-mono font-bold">
            File Package: {doc.fileSize} ({doc.fileType})
          </span>
          <button
            onClick={() => onDownload(doc)}
            className="px-5 py-2.5 rounded-xl bg-[#FFE500] hover:bg-[#F5DC00] text-black text-xs font-black tracking-tight transition-all shadow-sm flex items-center gap-1.5 cursor-pointer border border-black/10"
          >
            <Download className="w-4 h-4 stroke-[2.5]" />
            <span>Download Official File</span>
          </button>
        </div>
      </div>
    </div>
  );
};
