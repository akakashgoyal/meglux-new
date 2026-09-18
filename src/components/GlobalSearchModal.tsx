import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Building2, FileText, ChevronRight } from 'lucide-react';
import { Product, Project, DocumentItem } from '../types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  projects: Project[];
  documents: DocumentItem[];
  onSelectProduct: (product: Product) => void;
  onSelectProject: (project: Project) => void;
  onSelectDocument: (doc: DocumentItem) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  products,
  projects,
  documents,
  onSelectProduct,
  onSelectProject,
  onSelectDocument
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const cleanQuery = query.toLowerCase().trim();

  const filteredProducts = cleanQuery 
    ? products.filter(p => 
        p.name.toLowerCase().includes(cleanQuery) || 
        p.categoryName.toLowerCase().includes(cleanQuery) ||
        p.subcategory.toLowerCase().includes(cleanQuery) ||
        p.shortDesc.toLowerCase().includes(cleanQuery)
      )
    : products.slice(0, 4);

  const filteredProjects = cleanQuery
    ? projects.filter(p => 
        p.title.toLowerCase().includes(cleanQuery) || 
        p.location.toLowerCase().includes(cleanQuery) ||
        p.categoryDisplay.toLowerCase().includes(cleanQuery)
      )
    : projects.slice(0, 3);

  const filteredDocuments = cleanQuery
    ? documents.filter(d => 
        d.title.toLowerCase().includes(cleanQuery) || 
        d.category.toLowerCase().includes(cleanQuery) ||
        d.refNumber.toLowerCase().includes(cleanQuery)
      )
    : documents.slice(0, 3);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-200 bg-slate-50">
          <Search className="w-5 h-5 text-slate-800 shrink-0" />
          <input 
            ref={inputRef}
            type="text"
            placeholder="Search lighting fixtures, security bollards, road blockers, project references, certifications..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-slate-900 placeholder-slate-400 outline-none font-medium"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-900 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline px-2 py-0.5 text-[10px] bg-slate-200 rounded-md text-slate-600 font-mono font-bold">ESC</kbd>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Products Results */}
          {filteredProducts.length > 0 && (
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-black bg-[#FFE500] px-2 py-0.5 rounded font-mono inline-block">
                Products & Equipment ({filteredProducts.length})
              </span>
              <div className="space-y-1">
                {filteredProducts.map((prod) => (
                  <button
                    key={prod.id}
                    onClick={() => {
                      onSelectProduct(prod);
                      onClose();
                    }}
                    className="w-full text-left p-3 rounded-2xl hover:bg-slate-50 transition-colors flex items-center justify-between group cursor-pointer border border-transparent hover:border-slate-200"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <img src={prod.image} alt={prod.name} className="w-11 h-11 rounded-xl object-cover shrink-0 border border-slate-200" />
                      <div className="truncate">
                        <h4 className="text-xs font-bold text-slate-950 group-hover:text-black transition-colors truncate">
                          {prod.name}
                        </h4>
                        <span className="text-[11px] text-slate-500 font-medium block truncate">
                          {prod.categoryName} • {prod.subcategory}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-black group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Projects Results */}
          {filteredProjects.length > 0 && (
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-black bg-[#FFE500] px-2 py-0.5 rounded font-mono inline-block">
                Project References ({filteredProjects.length})
              </span>
              <div className="space-y-1">
                {filteredProjects.map((proj) => (
                  <button
                    key={proj.id}
                    onClick={() => {
                      onSelectProject(proj);
                      onClose();
                    }}
                    className="w-full text-left p-3 rounded-2xl hover:bg-slate-50 transition-colors flex items-center justify-between group cursor-pointer border border-transparent hover:border-slate-200"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="w-11 h-11 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-900 shrink-0">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div className="truncate">
                        <h4 className="text-xs font-bold text-slate-950 group-hover:text-black transition-colors truncate">
                          {proj.title}
                        </h4>
                        <span className="text-[11px] text-slate-500 font-medium block truncate">
                          {proj.location} • {proj.categoryDisplay}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-black group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Documents / Approvals */}
          {filteredDocuments.length > 0 && (
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-black bg-[#FFE500] px-2 py-0.5 rounded font-mono inline-block">
                Approvals & Compliance ({filteredDocuments.length})
              </span>
              <div className="space-y-1">
                {filteredDocuments.map((doc) => (
                  <button
                    key={doc.id}
                    onClick={() => {
                      onSelectDocument(doc);
                      onClose();
                    }}
                    className="w-full text-left p-3 rounded-2xl hover:bg-slate-50 transition-colors flex items-center justify-between group cursor-pointer border border-transparent hover:border-slate-200"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="w-11 h-11 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-900 shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="truncate">
                        <h4 className="text-xs font-bold text-slate-950 group-hover:text-black transition-colors truncate">
                          {doc.title}
                        </h4>
                        <span className="text-[11px] text-slate-500 font-medium block truncate">
                          {doc.category} • Ref: {doc.refNumber}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-black group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {filteredProducts.length === 0 && filteredProjects.length === 0 && filteredDocuments.length === 0 && (
            <div className="py-12 text-center text-slate-500 text-xs font-medium">
              No direct matches found for "{query}". You can request customized product engineering via our consultation form.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
