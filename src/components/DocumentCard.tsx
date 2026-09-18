import React from 'react';
import { FileText, Download, Eye, Calendar, Building } from 'lucide-react';
import { DocumentItem } from '../types';

interface DocumentCardProps {
  doc: DocumentItem;
  onPreview: (doc: DocumentItem) => void;
  onDownload: (doc: DocumentItem) => void;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({
  doc,
  onPreview,
  onDownload
}) => {
  return (
    <div className="group rounded-2xl bg-white border border-slate-200 hover:border-slate-900 transition-all duration-300 p-5 flex flex-col justify-between space-y-4 shadow-md hover:shadow-xl">
      <div className="space-y-3">
        {/* Top meta */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#FFE500] text-black flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-xs">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="px-2 py-0.5 rounded text-[10px] font-black bg-slate-900 text-white uppercase tracking-wider block w-fit">
                {doc.category}
              </span>
              <span className="text-[11px] text-slate-500 font-mono font-semibold mt-0.5 block">
                Ref: {doc.refNumber}
              </span>
            </div>
          </div>

          <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-[10px] font-mono font-bold text-slate-600">
            {doc.fileType} • {doc.fileSize}
          </span>
        </div>

        {/* Title & Summary */}
        <div className="space-y-1.5">
          <h3 
            onClick={() => onPreview(doc)}
            className="text-sm sm:text-base font-black text-slate-950 font-display hover:text-black transition-colors cursor-pointer leading-snug"
          >
            {doc.title}
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 font-medium">
            {doc.summary}
          </p>
        </div>

        {/* Issuing organization & date */}
        <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-600 font-medium">
          <div className="flex items-center gap-1.5 text-slate-800">
            <Building className="w-3.5 h-3.5 text-slate-900 shrink-0" />
            <span className="truncate font-semibold">{doc.issuingOrg}</span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-1.5 text-slate-500">
              <Calendar className="w-3 h-3 text-slate-700" />
              <span>{doc.date}</span>
            </div>
            <span className="text-black bg-[#FFE500] px-1.5 py-0.5 rounded text-[10px] font-bold">
              {doc.productCategory}
            </span>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
        <button
          onClick={() => onPreview(doc)}
          className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-slate-200"
        >
          <Eye className="w-3.5 h-3.5 text-slate-900" />
          <span>Preview</span>
        </button>

        <button
          onClick={() => onDownload(doc)}
          className="py-2 px-3 rounded-xl bg-[#FFE500] hover:bg-[#F5DC00] text-black text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0 border border-black/10 shadow-xs"
          title="Download official document / submittal package"
        >
          <Download className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Download</span>
        </button>
      </div>
    </div>
  );
};
