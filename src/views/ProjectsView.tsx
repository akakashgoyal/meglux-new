import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  Search, 
  ArrowRight, 
  Image as ImageIcon, 
  Maximize2, 
  MapPin, 
  SlidersHorizontal,
  LayoutGrid,
  Sparkles,
  Layers,
  CheckCircle2,
  Calendar,
  Briefcase
} from 'lucide-react';
import { ProjectCard } from '../components/ProjectCard';
import { ClientsMarquee } from '../components/ClientsMarquee';
import { Lightbox } from '../components/Lightbox';
import { useCms } from '../context/CmsContext';
import { Project, GalleryItem } from '../types';

interface ProjectsViewProps {
  onViewProjectDetails: (project: Project) => void;
  onRequestConsultation: (projectTitle?: string) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  onViewProjectDetails,
  onRequestConsultation
}) => {
  const { projects: cmsProjects, gallery: cmsGallery, categories: cmsCategories, clients, loading } = useCms();
  const allProjects = cmsProjects;
  const allGallery = cmsGallery;

  // Dynamically derive project categories
  const projectCategories = useMemo(() => {
    const list = [{ id: 'all', label: 'All Disciplines & Sectors' }];
    if (cmsCategories && cmsCategories.length > 0) {
      cmsCategories.forEach((c) => {
        list.push({ id: c.slug || String(c.id), label: c.name });
      });
    } else {
      list.push(
        { id: 'outdoor-furniture', label: 'Outdoor Furniture / Street Furniture' },
        { id: 'security-systems', label: 'Security Systems' },
        { id: 'lighting', label: 'Lighting' }
      );
    }
    return list;
  }, [cmsCategories]);

  // Navigation & View Mode
  const [activeTab, setActiveTab] = useState<'all' | 'projects' | 'gallery'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Lightbox State for Visual Gallery
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);

  // Filtered Projects
  const filteredProjects = useMemo(() => {
    return allProjects.filter((proj) => {
      // Category filter
      if (selectedCategory !== 'all') {
        const matchesCategory = 
          proj.category.includes(selectedCategory) ||
          (selectedCategory === 'security-systems' && proj.category.includes('security')) ||
          (selectedCategory === 'outdoor-furniture' && proj.category.includes('outdoor-furniture'));
        if (!matchesCategory) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = proj.title.toLowerCase().includes(q);
        const matchesLoc = proj.location.toLowerCase().includes(q);
        const matchesDesc = (proj.shortDesc || '').toLowerCase().includes(q) || (proj.fullOverview || '').toLowerCase().includes(q);
        const matchesClient = proj.client ? proj.client.toLowerCase().includes(q) : false;
        const matchesConsultant = proj.consultant ? proj.consultant.toLowerCase().includes(q) : false;
        const matchesContractor = proj.contractor ? proj.contractor.toLowerCase().includes(q) : false;
        const matchesProd = (proj.productsSupplied || []).some(p => p.toLowerCase().includes(q));
        if (!matchesTitle && !matchesLoc && !matchesDesc && !matchesClient && !matchesConsultant && !matchesContractor && !matchesProd) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, searchQuery, allProjects]);

  // Filtered Gallery Items
  const filteredGalleryItems = useMemo(() => {
    return allGallery.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'lighting' && item.category !== 'lighting' && !item.categoryLabel.toLowerCase().includes('lighting')) return false;
        if (selectedCategory === 'security-systems' && item.category !== 'security' && !item.categoryLabel.toLowerCase().includes('security')) return false;
        if (selectedCategory === 'outdoor-furniture' && !item.title.toLowerCase().includes('bench') && !item.title.toLowerCase().includes('urban') && item.category !== 'projects') return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesDesc = (item.description || '').toLowerCase().includes(q);
        const matchesLoc = (item.location || '').toLowerCase().includes(q);
        const matchesTag = (item.categoryLabel || '').toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesLoc && !matchesTag) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, searchQuery, allGallery]);


  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="space-y-10 sm:space-y-14 py-8 pb-16">
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-950 text-white border border-slate-800 p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#FFE500] text-black text-xs font-black uppercase tracking-wider font-mono">
              <Building2 className="w-3.5 h-3.5" />
              <span>Projects & Visual Gallery</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-display tracking-tight leading-tight">
              Projects & Gallery Showcase
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
              Explore our project deliveries, landmark engineering references, and high-resolution photographic gallery across Outdoor Furniture / Street Furniture, Security Systems, and Lighting throughout the Middle East.
            </p>
          </div>

          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20 pointer-events-none hidden lg:block overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=80" 
              alt="Projects & Gallery"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Controls Bar: View Toggle, Categories & Search */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {/* Top View Mode Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-2.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center gap-1.5 w-full sm:w-auto">
              <button
                id="btn-view-all"
                onClick={() => setActiveTab('all')}
                className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-[#FFE500] text-black shadow-xs font-black'
                    : 'text-slate-600 hover:text-black hover:bg-slate-100'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
                <span>All Showcase ({filteredProjects.length + filteredGalleryItems.length})</span>
              </button>

              <button
                id="btn-view-projects"
                onClick={() => setActiveTab('projects')}
                className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === 'projects'
                    ? 'bg-[#FFE500] text-black shadow-xs font-black'
                    : 'text-slate-600 hover:text-black hover:bg-slate-100'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>Project References ({filteredProjects.length})</span>
              </button>

              <button
                id="btn-view-gallery"
                onClick={() => setActiveTab('gallery')}
                className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === 'gallery'
                    ? 'bg-[#FFE500] text-black shadow-xs font-black'
                    : 'text-slate-600 hover:text-black hover:bg-slate-100'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>Visual Photo Gallery ({filteredGalleryItems.length})</span>
              </button>
            </div>

            {/* Live Search */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search project, location, client..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:border-slate-900 text-xs text-slate-900 placeholder-slate-400 outline-none transition-colors font-medium"
              />
            </div>
          </div>

          {/* Core Discipline & Sector Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 scrollbar-thin">
            {projectCategories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'bg-[#FFE500] text-black shadow-md border border-black/10'
                      : 'bg-white text-slate-700 hover:text-black hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 1. Project Case Studies Section */}
      {(activeTab === 'all' || activeTab === 'projects') && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#C88A00] block">
                Deliveries & References
              </span>
              <h2 className="text-2xl font-black text-slate-950 font-display">
                Project Deliveries & Specifications ({filteredProjects.length})
              </h2>
            </div>
            <p className="text-xs text-slate-500 max-w-md">
              Click any project card to review complete scope of work, consultant sign-offs, and product details.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-96 rounded-2xl bg-slate-100 animate-pulse border border-slate-200" />
              ))}
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="py-12 text-center space-y-3 rounded-3xl bg-white border border-slate-200 p-8 shadow-sm">
              <Building2 className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-900">No Projects Found</h3>
              <p className="text-xs text-slate-500">Try adjusting your category filter or search terms.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((proj) => (
                <ProjectCard
                  key={proj.id}
                  project={proj}
                  onViewProject={onViewProjectDetails}
                />
              ))}
            </div>
          )}
        </section>
      )}

      {/* 2. Visual Photo Gallery Section */}
      {(activeTab === 'all' || activeTab === 'gallery') && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#C88A00] block">
                High-Resolution Visual Showcase
              </span>
              <h2 className="text-2xl font-black text-slate-950 font-display">
                Site Installations & Architectural Gallery ({filteredGalleryItems.length})
              </h2>
            </div>
            <p className="text-xs text-slate-500 max-w-md">
              Click any photograph to launch the interactive full-screen lightbox with zoom and keyboard navigation.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-80 rounded-3xl bg-slate-100 animate-pulse border border-slate-200" />
              ))}
            </div>
          ) : filteredGalleryItems.length === 0 ? (
            <div className="py-12 text-center space-y-3 rounded-3xl bg-white border border-slate-200 p-8 shadow-sm">
              <ImageIcon className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-900">No Gallery Photos Found</h3>
              <p className="text-xs text-slate-500">Try clearing your search query or selecting another discipline.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGalleryItems.map((item, idx) => (
                <div
                  key={item.id}
                  onClick={() => openLightbox(idx)}
                  className="group relative rounded-3xl overflow-hidden bg-white border border-slate-200 hover:border-slate-900 transition-all duration-300 cursor-pointer shadow-md hover:shadow-2xl h-80 flex flex-col justify-end"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent group-hover:from-slate-950/90 transition-all" />

                  {/* Category Pill */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 rounded-md text-[11px] font-black bg-[#FFE500] text-black uppercase tracking-wider font-mono shadow-xs border border-black/10">
                      {item.categoryLabel}
                    </span>
                  </div>

                  {/* Lightbox Quick View Icon */}
                  <div className="absolute top-4 right-4 z-10 w-9 h-9 rounded-xl bg-white/90 backdrop-blur-md text-slate-900 flex items-center justify-center border border-slate-200 opacity-0 group-hover:opacity-100 transition-all transform scale-90 group-hover:scale-100 shadow-md">
                    <Maximize2 className="w-4 h-4" />
                  </div>

                  {/* Bottom Caption Info */}
                  <div className="relative z-10 p-6 space-y-2">
                    <h3 className="text-base font-black text-white font-display group-hover:text-[#FFE500] transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed font-medium">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-1.5 pt-1 text-[11px] text-[#FFE500] font-bold">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Auto-scrolling Client & Developer Partners */}
      <ClientsMarquee clients={clients} />

      {/* Tender / RFP Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 text-white border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-mono font-bold uppercase text-[#FFE500]">
              Tender Submittals & BoQ Verification
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white font-display">
              Tendering a Landmark Development in the GCC?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl font-medium">
              Invite Megalux International to participate in your Outdoor Furniture, Security Systems, or Architectural Lighting tender packages with complete engineering compliance.
            </p>
          </div>

          <button
            onClick={() => onRequestConsultation()}
            className="px-6 py-3.5 rounded-xl bg-[#FFE500] hover:bg-[#F5DC00] text-black text-xs sm:text-sm font-black tracking-tight transition-all shadow-md flex items-center gap-2 cursor-pointer shrink-0 border border-black/10"
          >
            <span>Send Tender Document / BoQ</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </section>

      {/* Lightbox Modal */}
      <Lightbox
        items={filteredGalleryItems}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />
    </div>
  );
};
