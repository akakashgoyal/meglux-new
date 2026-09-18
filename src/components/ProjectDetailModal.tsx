import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  CheckCircle2, 
  Layers, 
  ArrowRight, 
  Briefcase,
  Share2,
  Check
} from 'lucide-react';
import { Project } from '../types';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onRequestConsultation: (projectName?: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onRequestConsultation
}) => {
  const [activeImg, setActiveImg] = useState(0);
  const [copied, setCopied] = useState(false);

  if (!project) return null;

  const galleryImages = [project.image, ...(project.gallery || [])].filter((v, i, a) => a.indexOf(v) === i);

  const handleShare = async () => {
    const shareUrl = window.location.href;
    const shareText = `Check out the ${project.title} reference project (${project.location}, ${project.country}) by Megalux International: ${project.shortDesc}`;
    
    // Try native mobile Web Share API first
    if (navigator.share && typeof navigator.share === 'function') {
      try {
        await navigator.share({
          title: `${project.title} | Megalux International`,
          text: shareText,
          url: shareUrl,
        });
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
        return;
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }
      }
    }

    // Fallback to clipboard
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = shareUrl;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-md text-xs font-black bg-[#FFE500] text-black uppercase tracking-wider font-mono">
              {project.categoryDisplay}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
              <MapPin className="w-3.5 h-3.5 text-slate-900" />
              <span>{project.location}, {project.country}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 text-slate-600 hover:text-black hover:bg-slate-200 rounded-xl border border-slate-200 transition-colors text-xs flex items-center gap-1.5 cursor-pointer font-medium"
              title="Share project link"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copied ? 'Copied!' : 'Share'}</span>
            </button>

            <button
              id="close-project-modal-btn"
              onClick={onClose}
              className="p-2 text-slate-500 hover:text-black hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Main Showcase Image & Gallery */}
          <div className="space-y-3">
            <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-inner">
              <img 
                src={galleryImages[activeImg] || project.image} 
                alt={project.title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4">
                <h2 className="text-xl sm:text-2xl font-black text-white font-display">
                  {project.title}
                </h2>
              </div>
            </div>

            {galleryImages.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImg(idx)}
                    className={`relative w-24 h-16 rounded-xl overflow-hidden shrink-0 border transition-all cursor-pointer ${
                      activeImg === idx ? 'border-black ring-2 ring-black/20' : 'border-slate-200 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Project Stakeholders & Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
            <div>
              <span className="text-slate-500 block font-mono text-[10px] font-bold uppercase">Client / Developer</span>
              <span className="text-slate-950 font-bold block mt-0.5">{project.client}</span>
            </div>
            <div>
              <span className="text-slate-500 block font-mono text-[10px] font-bold uppercase">Consultant / Architect</span>
              <span className="text-slate-950 font-bold block mt-0.5">{project.consultant}</span>
            </div>
            <div>
              <span className="text-slate-500 block font-mono text-[10px] font-bold uppercase">Year / Status</span>
              <span className="text-slate-950 font-mono font-bold block mt-0.5">{project.completionYear || 'Completed'}</span>
            </div>
          </div>

          {/* Project Overview */}
          <div className="space-y-2">
            <h3 className="text-sm font-black text-slate-950 font-display uppercase tracking-wider">
              Project Overview
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {project.fullOverview}
            </p>
          </div>

          {/* Sconces Fixture Supplied */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase font-mono flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-slate-800" />
              <span>Fixtures Supplied</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.productsSupplied.map((prod, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 font-medium flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-black shrink-0" />
                  <span>{prod}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTA */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200">
            <p className="text-xs text-slate-600 font-medium">
              Interested in wall sconce lighting for your project? Contact our team.
            </p>
            <button
              onClick={() => {
                onClose();
                onRequestConsultation(project.title);
              }}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#FFE500] hover:bg-[#F5DC00] text-black text-xs sm:text-sm font-black tracking-tight transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer shrink-0 border border-black/10"
            >
              <span>Enquire Now</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
