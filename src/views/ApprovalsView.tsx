import React, { useState, useMemo } from 'react';
import { ShieldCheck, Search } from 'lucide-react';
import { APPROVALS_DOCUMENTS, APPROVAL_CATEGORIES } from '../data/companyData';
import { DocumentCard } from '../components/DocumentCard';
import { DocumentItem } from '../types';

interface ApprovalsViewProps {
  onPreviewDocument: (doc: DocumentItem) => void;
  onDownloadDocument: (doc: DocumentItem) => void;
  onRequestConsultation: () => void;
}

export const ApprovalsView: React.FC<ApprovalsViewProps> = ({
  onPreviewDocument,
  onDownloadDocument,
  onRequestConsultation
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredDocs = useMemo(() => {
    return APPROVALS_DOCUMENTS.filter((doc) => {
      if (selectedCategory !== 'all' && doc.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = doc.title.toLowerCase().includes(q);
        const matchesOrg = doc.issuingOrg.toLowerCase().includes(q);
        const matchesRef = doc.refNumber.toLowerCase().includes(q);
        const matchesSum = doc.summary.toLowerCase().includes(q);
        if (!matchesTitle && !matchesOrg && !matchesRef && !matchesSum) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="space-y-12 sm:space-y-16 py-8 pb-16">
      {/* Approvals Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white border border-slate-200 p-8 sm:p-12 relative overflow-hidden shadow-xl">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#FFE500] text-black text-xs font-black uppercase tracking-wider font-mono">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Approvals & Certification</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 font-display tracking-tight leading-tight">
              Approvals & Certifications
            </h1>

            <p className="text-base text-slate-700 leading-relaxed font-medium">
              Review our project approvals, ISO quality management certificates, and compliance statements.
            </p>
          </div>
        </div>
      </section>

      {/* Compliance Overview Metrics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              title: 'Consultant Approvals',
              desc: 'Verified project approvals and submittals across regional masterdevelopments.',
              badge: 'Project Approvals'
            },
            {
              title: 'ISO 9001:2015',
              desc: 'Certified quality management system for supply of lighting fixtures.',
              badge: 'Quality Management'
            },
            {
              title: 'CE & RoHS Directives',
              desc: 'Safety compliance and environmental standards for electrical luminaires.',
              badge: 'Standards'
            }
          ].map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-md space-y-2">
              <span className="px-2.5 py-1 rounded bg-[#FFE500] text-black text-[10px] font-mono font-black uppercase tracking-wider">
                {item.badge}
              </span>
              <h3 className="text-base font-black text-slate-950 font-display mt-2">{item.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-md">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-thin">
            {APPROVAL_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'bg-[#FFE500] text-black shadow-sm border border-black/10'
                      : 'bg-slate-50 text-slate-700 hover:text-black hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search certificate, standard, org..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:border-slate-900 text-xs text-slate-900 placeholder-slate-400 outline-none transition-colors font-medium"
            />
          </div>
        </div>
      </section>

      {/* Documents Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredDocs.length === 0 ? (
          <div className="py-16 text-center space-y-3 rounded-3xl bg-white border border-slate-200 p-8 shadow-sm">
            <ShieldCheck className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-900">No Certificates Found</h3>
            <p className="text-xs text-slate-500">
              Clear your search filter to review all approvals or contact our QA desk for specific manufacturer test records.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocs.map((doc) => (
              <DocumentCard
                key={doc.id}
                doc={doc}
                onPreview={onPreviewDocument}
                onDownload={onDownloadDocument}
              />
            ))}
          </div>
        )}
      </section>

      {/* Consultant MAS Submittal Support Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 text-white border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-lg font-bold text-white font-display">
              Requesting Complete Consultant Submittal Dossiers?
            </h3>
            <p className="text-xs text-slate-300 max-w-xl">
              We provide formal MAS binders with compliance statements, mill test certificates, photometrics, sample boards, and engineer signatures for municipal approvals.
            </p>
          </div>

          <button
            onClick={onRequestConsultation}
            className="px-6 py-3.5 rounded-xl bg-[#FFE500] hover:bg-[#F5DC00] text-black text-xs font-black tracking-tight transition-all shadow-md cursor-pointer shrink-0 border border-black/10"
          >
            Request Consultant MAS Package
          </button>
        </div>
      </section>
    </div>
  );
};
