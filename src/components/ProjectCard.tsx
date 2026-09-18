import React from 'react';
import { MapPin, ArrowRight, Building2, Calendar } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onViewProject: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onViewProject
}) => {
  return (
    <div className="group rounded-2xl bg-white border border-slate-200 hover:border-slate-900 transition-all duration-300 flex flex-col overflow-hidden shadow-md hover:shadow-xl flex-1">
      {/* Project Image */}
      <div className="relative h-60 w-full bg-slate-100 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Location badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md text-white text-xs font-bold shadow-xs">
          <MapPin className="w-3.5 h-3.5 text-[#FFE500]" />
          <span>{project.location}</span>
        </div>

        {/* Completion year or category */}
        {project.completionYear && (
          <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-[#FFE500] text-black text-[11px] font-mono font-bold flex items-center gap-1 shadow-xs">
            <Calendar className="w-3 h-3 text-black" />
            <span>{project.completionYear}</span>
          </div>
        )}

        {/* Category pill at bottom of image */}
        <div className="absolute bottom-3 left-3 right-3">
          <span className="text-[11px] font-black tracking-wider uppercase text-black bg-[#FFE500] px-2.5 py-1 rounded shadow-xs inline-block">
            {project.categoryDisplay}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h3 
            onClick={() => onViewProject(project)}
            className="text-base sm:text-lg font-black text-slate-950 font-display hover:text-black transition-colors cursor-pointer line-clamp-2"
          >
            {project.title}
          </h3>
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-medium">
            {project.shortDesc}
          </p>
        </div>

        {/* Scope & Products tags */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <div className="text-[11px]">
            <span className="text-slate-400 font-mono text-[10px] uppercase font-bold block mb-1">Key Systems Supplied:</span>
            <div className="flex flex-wrap gap-1.5">
              {project.productsSupplied.slice(0, 2).map((item, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-slate-800 text-[10px] font-medium truncate max-w-full">
                  • {item}
                </span>
              ))}
              {project.productsSupplied.length > 2 && (
                <span className="px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-900 font-bold text-[10px]">
                  +{project.productsSupplied.length - 2} more
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 font-mono font-medium flex items-center gap-1">
            <Building2 className="w-3.5 h-3.5 text-slate-900" />
            <span>Middle East Reference</span>
          </span>

          <button
            onClick={() => onViewProject(project)}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-[#FFE500] text-slate-900 hover:text-black text-xs font-black tracking-tight border border-slate-200 hover:border-black/20 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <span>Project Details</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );
};
