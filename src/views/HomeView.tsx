import React, { useState, useMemo } from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Award, 
  ChevronRight, 
  Compass, 
  Cpu, 
  Sliders, 
  Zap, 
  Users, 
  FileCheck2,
  Shield,
  ArrowUpRight,
  Building2,
  TreePine,
  Lightbulb,
  FileText,
  MapPin,
  Clock,
  Sparkles
} from 'lucide-react';
import { 
  WHY_CHOOSE_MEGALUX, 
  PROJECT_PROCESS_STEPS, 
  TRADE_LICENCE_DATA
} from '../data/companyData';
import { ProjectCard } from '../components/ProjectCard';
import { ClientsMarquee } from '../components/ClientsMarquee';
import { TestimonialsSlider } from '../components/TestimonialsSlider';
import { useCms } from '../context/CmsContext';
import { Product, Project } from '../types';
import { Logo } from '../components/Logo';
import { resolveImageUrl } from '../services/cmsApi';
import introShowcaseImage from '../assets/images/regenerated_image_1787815891981.png';

interface HomeViewProps {
  onSelectTab: (tab: string, subCategory?: string) => void;
  onRequestConsultation: (initialCategory?: string) => void;
  onViewProductDetails: (product: Product) => void;
  onViewProjectDetails: (project: Project) => void;
  rfqItemIds?: string[];
  onToggleRFQ?: (product: Product) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onSelectTab,
  onRequestConsultation,
  onViewProductDetails,
  onViewProjectDetails,
  rfqItemIds = [],
  onToggleRFQ
}) => {
  const { 
    products: cmsProducts, 
    projects: cmsProjects, 
    categories: cmsCategories,
    clients, 
    testimonials,
    settings,
    loading
  } = useCms();

  const featuredProjects = cmsProjects.filter(p => p.featured).length > 0 
    ? cmsProjects.filter(p => p.featured).slice(0, 3) 
    : cmsProjects.slice(0, 3);
  const featuredProducts = cmsProducts.filter(p => p.featured).length > 0 
    ? cmsProducts.filter(p => p.featured).slice(0, 4) 
    : cmsProducts.slice(0, 4);

  const [heroProductIndex, setHeroProductIndex] = useState(0);
  const heroSpotlightProduct = cmsProducts.length > 0 ? cmsProducts[heroProductIndex % cmsProducts.length] : null;

  // Dynamic categories mapped directly from CMS database categories
  const dynamicCoreCategories = useMemo(() => {
    if (cmsCategories && cmsCategories.length > 0) {
      return cmsCategories.map((cat, idx) => {
        const catKey = cat.slug || String(cat.id);
        const s = (cat.slug || cat.name || '').toLowerCase();
        
        let icon = TreePine;
        let subtitle = 'Public Realm & Urban Amenities';
        let specBadge = 'Civic & Masterplan Grade';
        let defaultHighlights = [
          'UHPC Architectural Concrete Benches',
          'AISI 316 Marine Stainless Cycle Stands',
          'Segregated Public Realm Litter Bins',
          'Bollard Integrated Seating & Tree Grates'
        ];
        let fallbackImg = 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1000&q=80';

        if (s.includes('security') || s.includes('barrier') || s.includes('bollard')) {
          icon = ShieldCheck;
          subtitle = 'Physical Perimeter Intrusion Defense';
          specBadge = 'ASTM M50 & PAS 68 Certified';
          defaultHighlights = [
            'ASTM M50 / K12 Crash-Rated Rising Bollards',
            'Shallow-Mount & Heavy Hydraulic Road Blockers',
            'Surface & Embedded Spike Tyre Killers',
            'Automatic High-Speed Cantilever Crash Gates'
          ];
          fallbackImg = 'https://images.unsplash.com/photo-1541888946425-d0fbb180c5f5?auto=format&fit=crop&w=1000&q=80';
        } else if (s.includes('light') || s.includes('solar') || s.includes('lamp')) {
          icon = Lightbulb;
          subtitle = 'Architectural, Interior & Solar Illumination';
          specBadge = 'High Efficacy & DIALux Ready';
          defaultHighlights = [
            'Architectural Wall Sconces & Linear Pendants',
            'Custom Grand Hospitality Chandeliers',
            'Smart Municipal LED Streetlights (Al Sa\'fat)',
            '360° Off-Grid Solar-Powered Streetlight Poles'
          ];
          fallbackImg = 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1000&q=80';
        }

        const resolvedImg = cat.image ? resolveImageUrl(cat.image) : fallbackImg;
        const matchingCount = cmsProducts.filter(
          p => p.category === catKey || p.category === cat.slug || p.category === String(cat.id) || p.categoryName === cat.name
        ).length;

        return {
          id: catKey,
          title: cat.name,
          subtitle,
          icon,
          desc: cat.description || `Specialized ${cat.name} engineered for commercial developments, civic infrastructure and high-threat environments across the UAE.`,
          image: resolvedImg,
          highlights: defaultHighlights,
          specBadge,
          productCount: matchingCount || cat.products_count || 0
        };
      });
    }

    // Default 3 categories if CMS categories are still loading
    return [
      {
        id: 'outdoor-furniture-street-furniture',
        title: 'Outdoor Furniture / Street Furniture',
        subtitle: 'Public Realm & Urban Amenities',
        icon: TreePine,
        desc: 'Architectural ultra-high-performance concrete (UHPC) seating, 316 stainless cycle parking, segmented litter receptacles, tree grilles, and contemporary urban landscape furniture.',
        image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1000&q=80',
        highlights: [
          'UHPC Architectural Concrete Benches',
          'AISI 316 Stainless Steel Cycle & Bike Racks',
          'Segregated Public Realm Litter Bins',
          'Bollard Integrated Seating & Tree Grates'
        ],
        specBadge: 'Civic & Masterplan Grade',
        productCount: 4
      },
      {
        id: 'security-systems',
        title: 'Security Systems',
        subtitle: 'Physical Perimeter Intrusion Defense',
        icon: ShieldCheck,
        desc: 'Full-scale physical crash-tested vehicle barriers (ASTM M50 / PAS 68 / K12), heavy hydraulic road blockers, tyre killers, and automated security gates protecting critical assets.',
        image: 'https://images.unsplash.com/photo-1541888946425-d0fbb180c5f5?auto=format&fit=crop&w=1000&q=80',
        highlights: [
          'ASTM M50 / K12 Crash-Rated Rising Bollards',
          'Shallow-Mount & Heavy Hydraulic Road Blockers',
          'Surface & Embedded Spike Tyre Killers',
          'Automatic High-Speed Cantilever Crash Gates'
        ],
        specBadge: 'ASTM M50 & PAS 68 Verified',
        productCount: 5
      },
      {
        id: 'lighting',
        title: 'Lighting',
        subtitle: 'Architectural, Interior & Solar Illumination',
        icon: Lightbulb,
        desc: 'Precision optical engineering for luxury hospitality interiors, commercial facades, smart city municipal roadways, and 360° off-grid solar streetlighting columns.',
        image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1000&q=80',
        highlights: [
          'Architectural Wall Sconces & Linear Pendants',
          'Custom Grand Hospitality Chandeliers',
          'Smart Municipal LED Streetlights (Al Sa\'fat / Estidama)',
          '360° Off-Grid Solar-Powered Streetlight Poles'
        ],
        specBadge: 'Efficacy up to 160 lm/W',
        productCount: 7
      }
    ];
  }, [cmsCategories, cmsProducts]);

  // Key Services & Turnkey Capabilities
  const keyServices = [
    {
      title: 'Engineering Submittals & BoQ Estimation',
      desc: 'Exhaustive Material Approval Submittal (MAS) binders, compliance statements, bill-of-quantities take-offs, and value engineering.',
      icon: FileText
    },
    {
      title: 'DIALux Photometrics & 3D Simulations',
      desc: 'Custom illuminance modeling, glare reduction (UGR < 19), 3D lux contours, and Estidama / Al Sa\'fat green building compliance.',
      icon: Sparkles
    },
    {
      title: 'Crash Defense & Foundation Engineering',
      desc: 'Civil foundation trenching design, hydraulic line layout, and certified ASTM F2656 / PAS 68 impact calculations.',
      icon: Shield
    },
    {
      title: 'Custom Streetscape & Urban Fabrication',
      desc: 'Bespoke UHPC mold engineering, high-durability coatings for extreme UAE heat and coastal salinity, and custom RAL matching.',
      icon: Building2
    },
    {
      title: 'Site Quality Supervision & Commissioning',
      desc: 'On-site technical support, hydraulic pressure calibration, loop detector alignment, and consultant sign-off facilitation.',
      icon: Cpu
    },
    {
      title: 'Dubai Warehouse & Post-Handover Warranty',
      desc: 'Centralized inventory in Al Quoz Industrial Area 3, immediate spare parts availability, and comprehensive manufacturer warranties.',
      icon: Award
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* 1. HERO SECTION (Equal Prominence for the 3 Pillars) */}
      <section className="relative overflow-hidden bg-white border-b border-slate-200">
        {/* Subtle Background Architectural Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2000&q=85" 
            alt="Dubai Infrastructure and Urban Space"
            className="w-full h-full object-cover object-center transform scale-105 opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/60" />
          <div className="absolute inset-0 light-beam opacity-40 pointer-events-none" />
          <div className="absolute inset-0 architectural-grid opacity-30 pointer-events-none" />
        </div>

        {/* Hero Content Container - Clean, Compact Spacing */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 sm:pt-7 lg:pt-8 pb-7 sm:pb-9 lg:pb-10 text-center sm:text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
            
            {/* Left Col - Headline & Core Value */}
            <div className="lg:col-span-8 space-y-6">
              {/* Trust Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 text-white text-xs font-semibold shadow-md">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFE500] animate-pulse" />
                <span>Dubai, UAE • Certified Middle East Engineering Partner</span>
              </div>

              {/* Headline with 3 equal disciplines */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight font-display leading-[1.1]">
                Outdoor Furniture, Security Systems & Lighting for <span className="bg-[#FFE500] text-black px-2 py-0.5 rounded-md inline-block">Modern Spaces</span>
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium max-w-3xl">
                Megalux International delivers consultant-grade solutions across three equally prioritized engineering disciplines: <strong className="text-black">Outdoor Furniture / Street Furniture</strong>, <strong className="text-black">High-Security Perimeter Defense</strong>, and <strong className="text-black">Architectural Lighting</strong> for residential masterdevelopments, commercial towers, hospitality resorts, and municipal infrastructure across Dubai, UAE, and the GCC.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center sm:justify-start gap-3 sm:gap-4 w-full sm:w-auto">
                <button
                  id="hero-explore-solutions-btn"
                  onClick={() => onSelectTab('projects')}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#FFE500] hover:bg-[#F5DC00] text-slate-950 font-extrabold text-sm tracking-tight transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2.5 cursor-pointer border border-black/10 text-center"
                >
                  <span>Explore all projects</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>

                <button
                  id="hero-discuss-project-btn"
                  onClick={() => onRequestConsultation()}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer text-center"
                >
                  <span>Request Engineering Consultation</span>
                  <ChevronRight className="w-4 h-4 text-[#FFE500]" />
                </button>
              </div>

              {/* Trust Badges */}
              <div className="pt-4 flex flex-wrap items-center gap-2 text-xs font-bold text-slate-800">
                <span className="px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-[#FFE500] fill-black" /> Dubai DET Licenced (788165)
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> ASTM M50 & PAS 68 Crash Certified
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> ISO 9001 / 14001 / 45001
                </span>
              </div>
            </div>

            {/* Right Col - Hero Featured Product Spotlight Card */}
            <div className="lg:col-span-4 hidden lg:block">
              <div className="rounded-3xl bg-white border border-slate-200 shadow-2xl p-6 relative overflow-hidden space-y-4">
                {/* Header with Spotlight Indicator & Count */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFE500] animate-pulse" />
                    <span className="text-[11px] font-mono font-black uppercase tracking-wider text-slate-900">
                      Product Spotlight
                    </span>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {cmsProducts.length || '30+'} Systems Ready
                  </span>
                </div>
                
                {/* Product Showcase Image */}
                <div 
                  onClick={() => {
                    if (heroSpotlightProduct) onViewProductDetails(heroSpotlightProduct);
                    else onSelectTab('products');
                  }}
                  className="relative rounded-2xl overflow-hidden shadow-inner h-52 bg-slate-100 cursor-pointer group"
                >
                  <img 
                    src={heroSpotlightProduct?.image ? resolveImageUrl(heroSpotlightProduct.image) : introShowcaseImage} 
                    alt={heroSpotlightProduct?.name || "Megalux Engineered Systems"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                  
                  {/* Category Pill on Image */}
                  <div className="absolute top-3 left-3 bg-[#FFE500] text-black font-extrabold text-[10px] px-2.5 py-1 rounded-md shadow-sm font-mono uppercase tracking-wider">
                    {heroSpotlightProduct?.categoryName || "Engineered Solution"}
                  </div>

                  {/* Product Title on Image Bottom */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h4 className="text-sm font-bold truncate group-hover:text-[#FFE500] transition-colors">
                      {heroSpotlightProduct?.name || "Architectural Luminaire & Barrier Systems"}
                    </h4>
                    <p className="text-[11px] text-slate-300 truncate">
                      {heroSpotlightProduct?.shortDesc || "Consultant-Grade & SIRA / ASTM Certified"}
                    </p>
                  </div>
                </div>

                {/* Product Specs & MAS Status */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600 font-medium">Compliance & Specs:</span>
                    <span className="font-bold text-slate-900 font-mono text-[11px]">ASTM / ISO / MAS Ready</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-600">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">Full 3D CAD, DIALux Photometrics & BoQ Submittals</span>
                  </div>
                </div>

                {/* Prominent "View All Products" CTA Button */}
                <button
                  id="hero-card-view-all-products-btn"
                  onClick={() => onSelectTab('products')}
                  className="w-full py-3 px-4 rounded-xl bg-slate-950 hover:bg-[#FFE500] text-white hover:text-black font-extrabold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md group border border-slate-800 active:scale-98"
                >
                  <span>View All Products</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* AUTO-SCROLLING CLIENTS & PARTNERS TICKER */}
      <div className="!mt-0">
        <ClientsMarquee clients={clients} className="border-t-0" />
      </div>

      {/* 2. MERGED CORE: GENERAL COMPANY OVERVIEW & WHAT MEGALUX IS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white border border-slate-200 p-8 sm:p-12 lg:p-14 shadow-xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#FFE500] text-black text-xs font-black uppercase tracking-wider font-mono">
                <Building2 className="w-3.5 h-3.5" />
                <span>Company Overview</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 font-display leading-tight">
                A Specialized Dubai Partner for Urban Spaces & Security
              </h2>

              {/* What Megalux Is */}
              <div className="space-y-3 text-slate-700 leading-relaxed font-medium text-sm sm:text-base">
                <p>
                  <strong>Megalux International LLC</strong> is a Dubai-based engineering supplier and project partner established in the United Arab Emirates (DET Commercial Licence No. 788165, Dubai Chamber No. 292834). Operating under certified ISO 9001:2015, ISO 14001:2015, and ISO 45001:2018 management frameworks, we bridge aesthetic architectural design with heavy-duty structural resilience.
                </p>
                <p className="text-xs sm:text-sm text-slate-600">
                  Rather than focusing on a single product type, Megalux accords <strong>equal priority</strong> to its three pillars: <strong>Outdoor Furniture & Street Furniture</strong> that invigorates civic walkways, <strong>Security Systems & Vehicle Barriers</strong> that protect high-threat perimeters, and <strong>Architectural Lighting</strong> that defines contemporary skylines and luxury interiors.
                </p>
              </div>

              {/* What We Do */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
                  What We Do – End-to-End Engineering Delivery
                </h3>
                <p className="text-xs text-slate-700 leading-relaxed">
                  We collaborate directly with architects, master developers, security advisors, landscape architects, and MEP contractors across the Middle East. We provide complete tender take-offs, custom CAD/BIM shop drawings, photometric DIALux simulations, structural foundation calculations, and on-site testing and commissioning.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs">
                    <strong className="block text-slate-900 font-bold mb-0.5">Design & Pre-Bid</strong>
                    <span className="text-slate-500 text-[11px]">DIALux, BoQs & MAS Submittal binders</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs">
                    <strong className="block text-slate-900 font-bold mb-0.5">Supply & QA/QC</strong>
                    <span className="text-slate-500 text-[11px]">ASTM M50, ISO 9001 & CE conformity</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs">
                    <strong className="block text-slate-900 font-bold mb-0.5">Site Execution</strong>
                    <span className="text-slate-500 text-[11px]">Supervision, calibration & handover</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onRequestConsultation()}
                  className="px-6 py-3 rounded-xl bg-black text-[#FFE500] font-bold text-xs hover:bg-slate-900 transition-colors flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <span>Engage with Megalux Engineers</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onSelectTab('trade-licence')}
                  className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs transition-colors border border-slate-200 cursor-pointer"
                >
                  Verify Dubai DET Licence
                </button>
              </div>

            </div>

            {/* Right Column Showcase Visual & Credentials */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-xl relative">
                <img 
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80" 
                  alt="Dubai Commercial Skyline and Modern Civic Realm"
                  className="w-full h-80 object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[11px] font-mono text-[#FFE500] uppercase tracking-wider font-bold block">
                    Al Quoz Industrial Area 3 • Dubai, UAE
                  </span>
                  <span className="text-sm font-bold block">
                    Central Warehousing & Technical Operations Facility
                  </span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2 text-slate-700 font-medium">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="text-slate-500">Commercial Registration</span>
                  <span className="font-mono font-bold text-slate-900">{TRADE_LICENCE_DATA.commercialRegisterNo}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="text-slate-500">Dubai Chamber of Commerce</span>
                  <span className="font-mono font-bold text-slate-900">{TRADE_LICENCE_DATA.chamberOfCommerceNo}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Operating Status</span>
                  <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">Active / Certified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PRODUCTS – THREE MAIN CATEGORIES (EQUAL VISIBILITY & IMPORTANCE) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-black bg-[#FFE500] px-3 py-1 rounded-md font-mono inline-block">
            Three Main Portfolios
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 font-display">
            Equal Priority for All Product Disciplines
          </h2>
          <p className="text-sm text-slate-600 font-medium leading-relaxed">
            Megalux International elevates all three core product categories with equal engineering rigor, high-specification materials, and dedicated technical submittals.
          </p>
        </div>

        {/* Large Equal Priority Category Cards dynamically from Database */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {dynamicCoreCategories.map((cat, idx) => {
            const IconComponent = cat.icon;
            return (
              <div 
                key={cat.id}
                className="group rounded-3xl bg-white border-2 border-slate-200 hover:border-slate-950 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-lg hover:shadow-2xl relative"
              >
                <div>
                  {/* Category Image Header directly from Database */}
                  <div className="relative h-60 w-full overflow-hidden bg-slate-100">
                    <img 
                      src={cat.image} 
                      alt={cat.title} 
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/25 to-transparent" />
                    
                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <div className="w-10 h-10 rounded-xl bg-black text-[#FFE500] flex items-center justify-center shadow-md">
                        <IconComponent className="w-5 h-5 stroke-[2.2]" />
                      </div>
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-black bg-white/95 text-slate-900 uppercase tracking-wider font-mono shadow-sm">
                        Portfolio 0{idx + 1}
                      </span>
                    </div>

                    <div className="absolute top-4 right-4 flex items-center gap-1.5">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold bg-[#FFE500] text-black shadow-sm font-mono">
                        {cat.specBadge}
                      </span>
                    </div>

                    {/* Bottom Title on Image */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono uppercase tracking-wider text-[#FFE500] font-bold block">
                          {cat.subtitle}
                        </span>
                        <span className="text-[10px] font-mono text-slate-300 bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs">
                          {cat.productCount} Products
                        </span>
                      </div>
                      <h3 className="text-xl font-black font-display text-white mt-0.5">
                        {cat.title}
                      </h3>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                      {cat.desc}
                    </p>

                    <div className="pt-2 border-t border-slate-100 space-y-2">
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 block">
                        Engineered Specifications:
                      </span>
                      <ul className="space-y-1.5 text-xs text-slate-800 font-medium">
                        {cat.highlights.map((point, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-black shrink-0 mt-0.5" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Card Footer Action Button */}
                <div className="p-6 pt-0">
                  <button
                    onClick={() => onSelectTab('products', cat.id)}
                    className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-[#FFE500] text-white hover:text-black text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm group-hover:shadow-md"
                  >
                    <span>Explore {cat.title} Range</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. KEY SERVICES & IMPORTANT HIGHLIGHTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-950 text-white p-8 sm:p-12 lg:p-14 shadow-2xl relative overflow-hidden border border-slate-800">
          
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-black bg-[#FFE500] px-3 py-1 rounded-md font-mono inline-block">
              Turnkey Technical Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              Key Services & Engineering Highlights
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              From consultant pre-qualification and photometrics to civil trenching drawings and on-site testing sign-offs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {keyServices.map((svc, idx) => {
              const SvcIcon = svc.icon;
              return (
                <div 
                  key={idx}
                  className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-[#FFE500] transition-colors space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-700 flex items-center justify-center text-[#FFE500]">
                      <SvcIcon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-white font-display">
                      {svc.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-medium">
                      {svc.desc}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-[#FFE500] font-mono">
                    <span>Engineering Verified</span>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Consultation Ribbon */}
          <div className="mt-10 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <span className="text-xs text-slate-400 block">Need custom specifications or tender BoQs?</span>
              <strong className="text-sm text-white">Our Dubai technical desk responds within 24 business hours.</strong>
            </div>

            <button
              onClick={() => onRequestConsultation()}
              className="px-6 py-3 rounded-xl bg-[#FFE500] hover:bg-[#F5DC00] text-black font-extrabold text-xs tracking-tight transition-all shadow-md cursor-pointer"
            >
              Request Technical Consultation
            </button>
          </div>
        </div>
      </section>

      {/* 5. PROJECT PROCESS (Visual 4-Step Engineering Lifecycle) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-black bg-[#FFE500] px-3 py-1 rounded-md font-mono inline-block">
            Workflow & Engagement
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-display">
            From Concept to Completion
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            A structured 4-step engineering and project lifecycle ensuring smooth consultant approvals and flawless on-site commissioning.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {PROJECT_PROCESS_STEPS.map((step, idx) => (
            <div 
              key={step.step}
              className="rounded-3xl bg-white border border-slate-200 hover:border-slate-900 transition-all flex flex-col justify-between overflow-hidden shadow-md hover:shadow-xl group"
            >
              <div>
                <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                  <img 
                    src={step.image} 
                    alt={step.title}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Fallback to high-reliability architectural image if needed
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80';
                    }}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="text-2xl font-black text-white font-mono drop-shadow-md">
                      {step.step}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3">
                    <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-md bg-[#FFE500] text-black shadow-sm">
                      Phase {idx + 1}
                    </span>
                  </div>

                  <div className="absolute bottom-2.5 left-3 right-3">
                    <span className="text-xs font-black text-white block drop-shadow-md">
                      {step.subtitle}
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="text-base font-black text-slate-950 font-display">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {step.desc}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="pt-3 text-[11px] text-slate-800 font-mono font-semibold flex items-center justify-between border-t border-slate-100">
                  <span>Verified Milestone</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-black" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. SELECTED PROJECT REFERENCES & DIRECT GALLERY LINK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-black bg-[#FFE500] px-3 py-1 rounded-md font-mono inline-block">
              Proven Track Record
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-display">
              Projects & Realized Installations
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl font-medium">
              Landmark Middle Eastern project deployments across public streetscapes, perimeter defense, and luxury hospitality.
            </p>
          </div>

          <button
            id="view-all-projects-btn"
            onClick={() => onSelectTab('projects')}
            className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer w-fit shadow-md"
          >
            <span>Explore All Projects & Gallery</span>
            <ArrowRight className="w-4 h-4 text-[#FFE500]" />
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-80 rounded-2xl bg-slate-100 animate-pulse border border-slate-200" />
            ))}
          </div>
        ) : featuredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map((proj) => (
              <ProjectCard 
                key={proj.id}
                project={proj}
                onViewProject={onViewProjectDetails}
              />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-slate-50 border border-slate-200 rounded-2xl">
            <p className="text-xs text-slate-500 font-medium">No project records published yet.</p>
          </div>
        )}
      </section>

      {/* CLIENT TESTIMONIALS & CONSULTANT ENDORSEMENTS SLIDER */}
      <TestimonialsSlider testimonials={testimonials} />
    </div>
  );
};
