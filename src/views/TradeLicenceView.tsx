import React from 'react';
import { Building2, CheckCircle2, ShieldCheck } from 'lucide-react';
import { TRADE_LICENCE_DATA } from '../data/companyData';
import { useCms } from '../context/CmsContext';
import { Logo } from '../components/Logo';

interface TradeLicenceViewProps {
  onRequestConsultation: () => void;
}

export const TradeLicenceView: React.FC<TradeLicenceViewProps> = ({
  onRequestConsultation
}) => {
  const { settings } = useCms();
  const address = settings.address || 'Dubai, UAE';
  const companyName = settings.company_name || TRADE_LICENCE_DATA.companyName;

  return (
    <div className="space-y-12 sm:space-y-16 py-8 pb-16">
      {/* Trade Licence Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 no-print">
        <div className="rounded-3xl bg-white border border-slate-200 p-8 sm:p-12 relative overflow-hidden shadow-xl">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#FFE500] text-black text-xs font-black uppercase tracking-wider font-mono">
              <Building2 className="w-3.5 h-3.5" />
              <span>Legal Registration & Governance</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 font-display tracking-tight leading-tight">
              Trade Licence & Commercial Registration
            </h1>

            <p className="text-base text-slate-700 leading-relaxed font-medium">
              Official commercial registration details authorized by the Department of Economy and Tourism (DET), Government of Dubai, United Arab Emirates.
            </p>
          </div>
        </div>
      </section>

      {/* Official Certificate Card Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Action Bar */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-200 shadow-sm text-xs no-print">
            <div className="flex items-center gap-2 text-emerald-700 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Commercial Registration Active & In Good Standing</span>
            </div>

            <div className="flex items-center gap-1.5 text-slate-500 font-mono text-[11px] font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>DET Verified Document</span>
            </div>
          </div>

          {/* Official Document Sheet */}
          <div id="printable-trade-licence" className="bg-white text-slate-900 rounded-3xl shadow-xl p-8 sm:p-12 border border-slate-200 space-y-8 font-sans print-document-container print:shadow-none print:border-none print:p-0">
            {/* Header */}
            <div className="flex items-start justify-between border-b-2 border-slate-900 pb-6">
              <div>
                <span className="text-xs font-black text-slate-500 uppercase tracking-widest block">
                  GOVERNMENT OF DUBAI • DEPARTMENT OF ECONOMY & TOURISM
                </span>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950 font-display mt-1">
                  COMMERCIAL LICENCE / رخصة تجارية
                </h2>
                <span className="text-xs text-slate-600 block mt-1 font-medium">
                  Emirate of Dubai, United Arab Emirates
                </span>
              </div>

              <div className="text-right">
                <span className="px-3 py-1 rounded-md bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-mono font-black uppercase block">
                  STATUS: {TRADE_LICENCE_DATA.status}
                </span>
                <span className="text-[11px] text-slate-600 font-mono font-bold mt-1 block">
                  Licence No: {TRADE_LICENCE_DATA.licenceNo}
                </span>
              </div>
            </div>

            {/* Corporate Registration Details Table */}
            <div className="rounded-2xl border border-slate-200 overflow-hidden text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 bg-slate-50 border-b border-slate-200 p-3.5">
                <span className="font-bold text-slate-600">Trade Name (English):</span>
                <span className="text-slate-950 font-black">{companyName}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 p-3.5 border-b border-slate-200">
                <span className="font-bold text-slate-600">Legal Form:</span>
                <span className="text-slate-900 font-semibold">{TRADE_LICENCE_DATA.legalForm}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 bg-slate-50 border-b border-slate-200 p-3.5">
                <span className="font-bold text-slate-600">Issuing Authority:</span>
                <span className="text-slate-900 font-semibold">{TRADE_LICENCE_DATA.authority}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 p-3.5 border-b border-slate-200">
                <span className="font-bold text-slate-600">Commercial Register No:</span>
                <span className="text-slate-900 font-mono font-bold">{TRADE_LICENCE_DATA.commercialRegisterNo}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 bg-slate-50 border-b border-slate-200 p-3.5">
                <span className="font-bold text-slate-600">Chamber of Commerce Membership:</span>
                <span className="text-slate-900 font-mono font-bold">{TRADE_LICENCE_DATA.chamberOfCommerceNo}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 p-3.5">
                <span className="font-bold text-slate-600">Jurisdiction & Address:</span>
                <span className="text-slate-900 font-semibold">{address}</span>
              </div>
            </div>

            {/* Permitted Commercial Activities */}
            <div className="space-y-3">
              <h3 className="text-xs font-black text-slate-950 uppercase tracking-wider border-b border-slate-200 pb-1">
                Authorized Commercial Activities (نشاط الرخصة)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {TRADE_LICENCE_DATA.permittedActivities.map((act, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="text-slate-900 font-semibold">{act}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Verification Seal */}
            <div className="pt-6 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
              <div>
                <span className="block font-bold text-slate-900">Commercial Register Record Verification</span>
                <span className="text-[11px] text-slate-500">Certified for client vendor registration and consultant pre-qualification</span>
              </div>
              <div className="border border-slate-300 rounded-xl p-2.5 text-center bg-slate-50">
                <span className="block text-[9px] uppercase tracking-widest font-mono text-slate-500 font-bold">VERIFIED STATUS</span>
                <span className="text-[10px] font-black text-emerald-700">OFFICIAL RECORD</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vendor Pre-qualification CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 text-white border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto shadow-2xl">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-base font-bold text-white font-display">
              Submitting Vendor Pre-Qualification (PQ) Documents?
            </h3>
            <p className="text-xs text-slate-300">
              We provide complete vendor registration packs including VAT certificate, bank reference letters, and authorized signatory records.
            </p>
          </div>

          <button
            onClick={onRequestConsultation}
            className="px-6 py-3 rounded-xl bg-[#FFE500] hover:bg-[#F5DC00] text-black text-xs font-black tracking-tight transition-all shadow-md cursor-pointer shrink-0 border border-black/10"
          >
            Request Vendor Registration Pack
          </button>
        </div>
      </section>
    </div>
  );
};
