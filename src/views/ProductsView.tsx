import React, { useState, useMemo } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  Layers, 
  X, 
  ArrowRight,
  FileSpreadsheet,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Cpu,
  Award,
  Sparkles
} from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { useCms } from '../context/CmsContext';
import { Product } from '../types';
import { resolveImageUrl } from '../services/cmsApi';

interface ProductsViewProps {
  initialCategory?: string;
  onViewProductDetails: (product: Product) => void;
  onRequestQuote: (product: Product) => void;
  rfqItemIds?: string[];
  onToggleRFQ?: (product: Product) => void;
  onOpenRFQDrawer?: () => void;
}


const CATEGORY_VISUALS: Record<string, { image: string; tag: string; description: string; highlights: string[] }> = {
  'outdoor-furniture': {
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80',
    tag: 'Public Realm & Urban Amenities',
    description: 'Contemporary street furniture including architectural UHPC concrete seating, 316 stainless cycle stands, multi-compartment recycling bins, and tree grates.',
    highlights: ['Architectural UHPC Benches', 'Bicycle & Cycle Parking Stands', 'Segregated Litter Receptacles', 'Planters & Shaded Structures']
  },
  'security-systems': {
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb180c5f5?auto=format&fit=crop&w=1200&q=80',
    tag: 'Perimeter Defense & Crash Barriers',
    description: 'Crash-rated ASTM M50 / PAS 68 rising bollards, heavy hydraulic road blockers, tyre killers, and automated security gates for perimeter protection.',
    highlights: ['ASTM M50 Crash Bollards', 'Hydraulic Wedge Road Blockers', 'Spike Tyre Killers', 'Cantilever Crash Barrier Gates']
  },
  'lighting': {
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
    tag: 'Architectural, Indoor & Outdoor Lighting',
    description: 'High-efficacy architectural interior luminaires, linear pendants, luxury chandeliers, municipal LED streetlights, and 360° solar poles.',
    highlights: ['Architectural Sconces & Pendants', 'Bespoke Atrium Chandeliers', 'Smart LED Streetlights', 'Off-Grid 360° Solar Poles']
  }
};

const CATEGORY_CARDS_DATA = [
  {
    id: 'outdoor-furniture',
    label: 'Outdoor Furniture / Street Furniture',
    count: '4 Products',
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80',
    subtext: 'UHPC Benches • Cycle Racks • Bins • Planters'
  },
  {
    id: 'security-systems',
    label: 'Security Systems',
    count: '5 Products',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb180c5f5?auto=format&fit=crop&w=800&q=80',
    subtext: 'ASTM M50 Bollards • Road Blockers • Spikes • Gates'
  },
  {
    id: 'lighting',
    label: 'Lighting',
    count: '7 Products',
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    subtext: 'Indoor Sconces • Chandeliers • Streetlights • Solar'
  }
];

export const ProductsView: React.FC<ProductsViewProps> = ({
  initialCategory = 'all',
  onViewProductDetails,
  onRequestQuote,
  rfqItemIds = [],
  onToggleRFQ,
  onOpenRFQDrawer
}) => {
  const { products: cmsProducts, categories: cmsCategories, loading } = useCms();
  const allProducts = cmsProducts;

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'name'>('featured');

  // Sync initialCategory prop if changed externally
  React.useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
      setSelectedSubcategory('all');
    }
  }, [initialCategory]);

  // Dynamically build categories from API categories
  const categories = useMemo(() => {
    const list: { id: string; label: string; count: number }[] = [
      { id: 'all', label: 'All Products', count: allProducts.length }
    ];

    if (cmsCategories && cmsCategories.length > 0) {
      cmsCategories.forEach((cat) => {
        const catKey = cat.slug || String(cat.id);
        const count = allProducts.filter(
          p => p.category === catKey || p.category === cat.slug || p.category === String(cat.id) || p.categoryName === cat.name
        ).length;
        list.push({
          id: catKey,
          label: cat.name,
          count: count || cat.products_count || 0
        });
      });
    } else {
      const catsMap = new Map<string, { label: string; count: number }>();
      allProducts.forEach(p => {
        if (p.category) {
          const key = p.category;
          const existing = catsMap.get(key) || { label: p.categoryName || key, count: 0 };
          existing.count += 1;
          catsMap.set(key, existing);
        }
      });
      catsMap.forEach((val, key) => {
        list.push({ id: key, label: val.label, count: val.count });
      });
    }

    return list;
  }, [cmsCategories, allProducts]);

  // Dynamic Category Cards data
  const dynamicCategoryCards = useMemo(() => {
    if (cmsCategories && cmsCategories.length > 0) {
      return cmsCategories.map((cat) => {
        const catKey = cat.slug || String(cat.id);
        const count = allProducts.filter(
          p => p.category === catKey || p.category === cat.slug || p.category === String(cat.id) || p.categoryName === cat.name
        ).length;
        const fallbackImg = CATEGORY_VISUALS[cat.slug || '']?.image || 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80';
        return {
          id: catKey,
          label: cat.name,
          count: `${count || cat.products_count || 0} Products`,
          image: cat.image ? resolveImageUrl(cat.image) : fallbackImg,
          subtext: cat.description || `Megalux ${cat.name} Portfolio`
        };
      });
    }
    return CATEGORY_CARDS_DATA;
  }, [cmsCategories, allProducts]);

  // Get active subcategories based on current category
  const activeSubcategories = useMemo(() => {
    if (selectedCategory === 'all') return [];
    const matchingProducts = allProducts.filter(
      p => p.category === selectedCategory || p.categoryName?.toLowerCase() === selectedCategory.toLowerCase()
    );
    const subs = new Set<string>();
    matchingProducts.forEach(p => {
      if (p.subcategory) subs.add(p.subcategory);
    });
    return Array.from(subs);
  }, [selectedCategory, allProducts]);

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all') {
        const match = 
          product.category === selectedCategory ||
          product.categoryName?.toLowerCase() === selectedCategory.toLowerCase();
        if (!match) return false;
      }
      // Subcategory filter
      if (selectedSubcategory !== 'all' && product.subcategory !== selectedSubcategory) {
        return false;
      }
      // Text search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesDesc = (product.shortDesc || '').toLowerCase().includes(q) || (product.fullDesc || '').toLowerCase().includes(q);
        const matchesSub = (product.subcategory || '').toLowerCase().includes(q);
        const matchesBadges = (product.complianceBadges || []).some(b => b.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc && !matchesSub && !matchesBadges) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [selectedCategory, selectedSubcategory, searchQuery, sortBy, allProducts]);


  const currentCmsCategory = useMemo(() => {
    if (selectedCategory === 'all') return null;
    return cmsCategories.find(
      c => c.slug === selectedCategory || 
           String(c.id) === selectedCategory || 
           c.name.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [selectedCategory, cmsCategories]);

  const activeCategoryInfo = useMemo(() => {
    if (selectedCategory === 'all') return null;
    const visualFallback = CATEGORY_VISUALS[selectedCategory] || 
      (selectedCategory.includes('furniture') ? CATEGORY_VISUALS['outdoor-furniture'] : null) ||
      (selectedCategory.includes('security') ? CATEGORY_VISUALS['security-systems'] : null) ||
      (selectedCategory.includes('light') ? CATEGORY_VISUALS['lighting'] : null);

    if (currentCmsCategory) {
      const dbImg = currentCmsCategory.image ? resolveImageUrl(currentCmsCategory.image) : null;
      return {
        image: dbImg || visualFallback?.image || 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80',
        tag: `Engineered ${currentCmsCategory.name}`,
        description: currentCmsCategory.description || visualFallback?.description || `Explore certified ${currentCmsCategory.name} systems engineered for Middle Eastern civic and commercial environments.`,
        highlights: visualFallback?.highlights || [
          'Material Approval Submittal (MAS) Ready',
          'Civil & Structural Foundation Data',
          'Consultant & Authority Verified',
          'Comprehensive Project Warranty'
        ]
      };
    }

    return visualFallback || null;
  }, [selectedCategory, currentCmsCategory]);

  return (
    <div className="space-y-10 sm:space-y-14 py-8 pb-16">
      {/* Products Hero Banner with High-Impact Visual Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-950 text-white border border-slate-800 p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#FFE500] text-black text-xs font-black uppercase tracking-wider font-mono">
              <Layers className="w-3.5 h-3.5" />
              <span>Full Systems Catalogue</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-display tracking-tight leading-tight">
              Products & Engineering Systems
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
              Explore our comprehensive portfolio of architectural fixtures, solar street luminaires, crash-rated vehicle bollards, road blockers, and urban street amenities certified for Middle Eastern projects.
            </p>
          </div>

          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20 pointer-events-none hidden lg:block overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1000&q=80" 
              alt="Engineering"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Visual Category Cards Carousel / Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-3 mb-4">
          <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
            Explore By Primary Discipline
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {dynamicCategoryCards.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <div
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(isSelected ? 'all' : cat.id);
                  setSelectedSubcategory('all');
                }}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 border h-44 sm:h-52 flex flex-col justify-end p-4 sm:p-5 ${
                  isSelected
                    ? 'border-[#FFE500] ring-3 ring-[#FFE500]/30 shadow-lg'
                    : 'border-slate-200 hover:border-slate-900 hover:shadow-md'
                }`}
              >
                <img 
                  src={cat.image} 
                  alt={cat.label}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className={`absolute inset-0 transition-opacity ${
                  isSelected 
                    ? 'bg-gradient-to-t from-black/90 via-black/50 to-black/20' 
                    : 'bg-gradient-to-t from-black/80 via-black/40 to-transparent'
                }`} />

                <div className="relative z-10 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-black/70 text-[#FFE500] backdrop-blur-xs">
                      {cat.count}
                    </span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-[#FFE500] shadow-sm animate-pulse" />
                    )}
                  </div>
                  <h3 className="text-xs sm:text-sm font-black text-white font-display leading-snug">
                    {cat.label}
                  </h3>
                  <p className="text-[10px] text-slate-300 truncate hidden sm:block">
                    {cat.subtext}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Active Category Detail Visual Banner (When a specific category is chosen) */}
      {activeCategoryInfo && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-md">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-black bg-[#FFE500] px-2.5 py-1 rounded-md inline-block">
                    {activeCategoryInfo.tag}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-950 font-display">
                    {categories.find(c => c.id === selectedCategory)?.label || currentCmsCategory?.name || 'Engineering'} Systems
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    {activeCategoryInfo.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
                  {activeCategoryInfo.highlights.map((hl, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-slate-800 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-black shrink-0" />
                      <span className="truncate">{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 relative h-48 lg:h-auto min-h-[180px] bg-slate-100">
                <img 
                  src={activeCategoryInfo.image} 
                  alt="Active Category"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/40 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Filter and Search Navigation Controls */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {/* Main Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 scrollbar-thin">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setSelectedSubcategory('all');
                  }}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                    isSelected
                      ? 'bg-[#FFE500] text-black shadow-md border border-black/10'
                      : 'bg-white text-slate-700 hover:text-black hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Subcategory Pills if applicable */}
          {activeSubcategories.length > 0 && (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              <span className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider mr-1">Filter by type:</span>
              <button
                onClick={() => setSelectedSubcategory('all')}
                className={`px-3 py-1 rounded-lg border text-xs transition-colors cursor-pointer ${
                  selectedSubcategory === 'all'
                    ? 'bg-slate-900 text-white border-slate-900 font-bold'
                    : 'bg-white text-slate-600 hover:text-slate-900 border-slate-200'
                }`}
              >
                All {categories.find(c => c.id === selectedCategory)?.label}
              </button>

              {activeSubcategories.map((sub, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedSubcategory(sub)}
                  className={`px-3 py-1 rounded-lg border text-xs transition-colors cursor-pointer whitespace-nowrap ${
                    selectedSubcategory === sub
                      ? 'bg-[#FFE500] text-black border-black/20 font-bold'
                      : 'bg-white text-slate-600 hover:text-slate-900 border-slate-200'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          )}

          {/* Search, Sort & RFQ Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-md">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search models, wattage, crash-ratings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-8 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:border-slate-900 text-xs text-slate-900 placeholder-slate-400 outline-none transition-colors font-medium"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center justify-between w-full sm:w-auto gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-500 font-mono text-[11px] font-bold">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-3 py-1.5 outline-none focus:border-slate-900 font-medium cursor-pointer"
                >
                  <option value="featured">Featured First</option>
                  <option value="name">Alphabetical</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-96 rounded-2xl bg-slate-100 animate-pulse border border-slate-200" />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-20 text-center space-y-4 rounded-3xl bg-white border border-slate-200 p-8 shadow-sm">
            <SlidersHorizontal className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="text-lg font-bold text-slate-900 font-display">No Products Match Your Criteria</h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              Try adjusting your category filter, subcategory or search term. Megalux International also custom engineers bespoke lighting and security enclosures upon request.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedSubcategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={onViewProductDetails}
                onEnquire={onRequestQuote}
                isInRFQ={rfqItemIds.includes(product.id)}
                onToggleRFQ={onToggleRFQ}
              />
            ))}
          </div>
        )}
      </section>

      {/* Engineering Capabilities & Testing Visual Showcase Strip - Commented out per user request */}
      {/*
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-10 border border-slate-800 space-y-6 shadow-xl">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold uppercase text-[#FFE500]">
              Dubai Technical Verification
            </span>
            <h3 className="text-xl sm:text-2xl font-black font-display">
              Engineering Studies, Lab Testing & Custom Submittals
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-medium">
              Every system in our catalogue is supported by complete technical data sheets, photometric IES calculation files, CAD foundation details, and ASTM/PAS crash test reports.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: 'DIALux Photometric Studies',
                desc: '3D lux distribution simulations, roadway luminance calculations, and glare rating evaluations.',
                image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80'
              },
              {
                title: 'Crash Impact Verification',
                desc: 'ASTM F2656 M50 and PAS 68 physical crash test reports with certified vehicle penetration ratings.',
                image: 'https://images.unsplash.com/photo-1541888946425-d0fbb180c5f5?auto=format&fit=crop&w=600&q=80'
              },
              {
                title: 'Custom Metal & RAL Finishes',
                desc: 'AkzoNobel marine-grade polyester powder coating and bespoke architectural color matching.',
                image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80'
              },
              {
                title: 'Smart IoT & CMS Integration',
                desc: 'Zhaga Book 18 and 7-Pin NEMA socket compatibility for smart city central management systems.',
                image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80'
              }
            ].map((cap, idx) => (
              <div key={idx} className="rounded-2xl bg-slate-800/80 border border-slate-700 overflow-hidden group hover:border-[#FFE500] transition-all flex flex-col justify-between">
                <div>
                  <div className="relative h-28 w-full overflow-hidden bg-slate-700">
                    <img 
                      src={cap.image} 
                      alt={cap.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                  </div>
                  <div className="p-4 space-y-1.5">
                    <h4 className="text-xs font-bold text-white font-display group-hover:text-[#FFE500] transition-colors">
                      {cap.title}
                    </h4>
                    <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
                      {cap.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      */}

      {/* Bottom Architectural Consultation CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl font-black text-slate-950 font-display">
              Need Custom Technical Submittals or DIALux Studies?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl font-medium">
              Our Dubai engineering team develops tailored illuminance calculations, BIM models, and crash barrier impact foundation drawings for consultants and contractors.
            </p>
          </div>

          <button
            onClick={() => onRequestQuote(filteredProducts[0] || allProducts[0])}
            className="px-6 py-3.5 rounded-xl bg-[#FFE500] hover:bg-[#F5DC00] text-black text-xs sm:text-sm font-black tracking-tight transition-all shadow-md flex items-center gap-2 cursor-pointer shrink-0 border border-black/10"
          >
            <span>Request Engineering Submittal</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </section>
    </div>
  );
};
