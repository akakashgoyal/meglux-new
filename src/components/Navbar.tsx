import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Menu, 
  X, 
  Search, 
  Phone, 
  Mail, 
  MapPin, 
  ChevronDown, 
  FileCheck2, 
  FileSpreadsheet,
  ArrowRight,
  Shield,
  Layers,
  Sparkles
} from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { Logo } from './Logo';
import { COMPANY_DETAILS } from '../data/companyData';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string, subCategory?: string) => void;
  onRequestConsultation: (initialCategory?: string) => void;
  onOpenSearch: () => void;
  rfqCount?: number;
  onOpenRFQDrawer?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onRequestConsultation,
  onOpenSearch
}) => {
  const { settings, categories: cmsCategories } = useCms();
  const phone = settings.phone_numbers?.[0] || COMPANY_DETAILS.phone || '+971 4 5803082';
  const email = settings.email_addresses?.[0] || COMPANY_DETAILS.email || 'sales@megaluxintl.com';
  const address = settings.address || 'Dubai, UAE';

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [scrolled, setScrolled] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [corporateDropdownOpen, setCorporateDropdownOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(true);
  const [mobileCorporateOpen, setMobileCorporateOpen] = useState(false);

  const productsRef = useRef<HTMLDivElement>(null);
  const corporateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (productsRef.current && !productsRef.current.contains(event.target as Node)) {
        setProductsDropdownOpen(false);
      }
      if (corporateRef.current && !corporateRef.current.contains(event.target as Node)) {
        setCorporateDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const productSubItems = useMemo(() => {
    const items = [
      { label: 'All Products & Solutions', category: 'all', desc: 'Complete catalogue across all disciplines' }
    ];
    if (cmsCategories && cmsCategories.length > 0) {
      cmsCategories.forEach((cat) => {
        items.push({
          label: cat.name,
          category: cat.slug || String(cat.id),
          desc: cat.description || `Megalux ${cat.name} Portfolio`
        });
      });
    } else {
      items.push(
        { label: 'Outdoor Furniture / Street Furniture', category: 'outdoor-furniture', desc: 'Architectural benches, cycle parking, waste receptacles & planters' },
        { label: 'Security Systems', category: 'security-systems', desc: 'Crash bollards, road blockers, tyre spikes & automated gates' },
        { label: 'Lighting', category: 'lighting', desc: 'Architectural fixtures, linear pendants & solar street poles' }
      );
    }
    return items;
  }, [cmsCategories]);

  const corporateSubItems = [
    { label: 'Corporate Objectives', tab: 'objectives', desc: 'Strategic milestones and corporate goals' },
    { label: 'Trade Licence & Verification', tab: 'trade-licence', desc: 'Dubai DET registration and commercial credentials' },
    // Commented out per client request: Approvals and Certifications
    // { label: 'Quality & HSE Policy', tab: 'approvals', desc: 'ISO 9001 quality frameworks and health & safety standards' }
  ];

  const handleNavClick = (id: string, category?: string) => {
    onSelectTab(id, category);
    setMobileMenuOpen(false);
    setProductsDropdownOpen(false);
    setCorporateDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isCorporateActive = ['objectives', 'trade-licence'].includes(currentTab);
  const isProjectsActive = currentTab === 'projects' || currentTab === 'gallery';

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Top Bar - International B2B Corporate Trust Bar (Fully Responsive) */}
      <div className="bg-slate-950 text-[11px] sm:text-xs text-slate-300 py-1.5 px-3 sm:px-6 lg:px-8 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          {/* Contact & Location Details */}
          <div className="flex items-center gap-2.5 sm:gap-4 lg:gap-6 min-w-0">
            {/* Location (Adaptive text length for small screens) */}
            <div className="flex items-center gap-1.5 hover:text-[#FFE500] transition-colors shrink-0">
              <MapPin className="w-3.5 h-3.5 text-[#FFE500] shrink-0" />
              <span className="sm:hidden font-medium text-slate-300">Dubai, UAE</span>
              <span 
                className="hidden sm:inline font-medium text-slate-300 truncate max-w-[340px] md:max-w-[480px] lg:max-w-[560px] xl:max-w-none"
                title={address}
              >
                {address}
              </span>
            </div>

            {/* Direct Phone Call */}
            <div className="flex items-center gap-1.5 hover:text-[#FFE500] transition-colors shrink-0">
              <Phone className="w-3.5 h-3.5 text-[#FFE500] shrink-0" />
              <a 
                href={`tel:${phone.replace(/\s+/g, '')}`} 
                className="font-mono font-bold tracking-tight text-slate-200 hover:text-[#FFE500] text-xs sm:text-sm"
                title={`Call Megalux International: ${phone}`}
              >
                <span>{phone}</span>
              </a>
            </div>

            {/* Email Address (Medium/Large Screens) */}
            <div className="hidden lg:flex items-center gap-1.5 hover:text-[#FFE500] transition-colors shrink-0">
              <Mail className="w-3.5 h-3.5 text-[#FFE500] shrink-0" />
              <a 
                href={`mailto:${email}`} 
                className="font-medium text-slate-300 hover:text-[#FFE500]"
              >
                {email}
              </a>
            </div>
          </div>
          
          {/* Trust Badges & Verification */}
          <div className="flex items-center gap-2 sm:gap-3 font-semibold shrink-0">
            {/* Commented out Approval and Certifications badge per client request */}
            {/*
            <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-850 text-slate-200 border border-slate-700/80 text-[10px] sm:text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFE500] animate-pulse" />
              <span>ASTM M50 & ISO 9001</span>
            </span>
            */}
            
            <button 
              onClick={() => handleNavClick('trade-licence')}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#FFE500]/10 hover:bg-[#FFE500] text-[#FFE500] hover:text-black transition-all font-bold whitespace-nowrap cursor-pointer border border-[#FFE500]/30 text-[10px] sm:text-xs"
              title="View Dubai DET Commercial Licence & Verification"
            >
              <span>DET Licenced</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar (Guaranteed Single Row) */}
      <nav className={`w-full transition-all duration-200 ${
        scrolled 
          ? 'bg-white/98 backdrop-blur-md border-b border-slate-300 shadow-md py-2' 
          : 'bg-white border-b border-slate-200 py-2.5 sm:py-3'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between flex-nowrap gap-2 xl:gap-4">
          {/* Brand Logo */}
          <button 
            id="nav-brand-logo"
            onClick={() => handleNavClick('home')}
            className="flex items-center group text-left cursor-pointer focus:outline-none shrink-0"
            aria-label="Megalux International Home"
          >
            <Logo size="md" variant="badge-with-text" />
          </button>

          {/* Desktop Navigation Links (Single Row, No Wrap) */}
          <div className="hidden lg:flex items-center gap-0.5 xl:gap-1 2xl:gap-1.5 shrink-0">
            {/* Home (Merged Overview & About) */}
            <button
              id="nav-link-home"
              onClick={() => handleNavClick('home')}
              className={`px-2.5 py-1.5 xl:px-3 xl:py-2 text-xs xl:text-sm font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                currentTab === 'home'
                  ? 'text-black bg-[#FFE500] shadow-xs'
                  : 'text-slate-700 hover:text-black hover:bg-slate-100'
              }`}
            >
              Home
            </button>

            {/* Products Dropdown */}
            <div 
              ref={productsRef}
              className="relative"
              onMouseEnter={() => setProductsDropdownOpen(true)}
              onMouseLeave={() => setProductsDropdownOpen(false)}
            >
              <button
                id="nav-link-products"
                onClick={() => handleNavClick('products')}
                className={`flex items-center gap-1 px-2.5 py-1.5 xl:px-3 xl:py-2 text-xs xl:text-sm font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                  currentTab === 'products'
                    ? 'text-black bg-[#FFE500] shadow-xs'
                    : 'text-slate-700 hover:text-black hover:bg-slate-100'
                }`}
              >
                <span>Products</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${productsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Hover bridge container */}
              {productsDropdownOpen && (
                <div className="absolute left-0 top-full pt-1.5 w-96 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="rounded-2xl bg-white border border-slate-200 shadow-2xl p-2 space-y-1">
                    <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
                        Product Portfolios
                      </span>
                      <span className="text-[10px] font-bold text-black bg-[#FFE500] px-2 py-0.5 rounded">
                        3 Core Disciplines
                      </span>
                    </div>

                    {productSubItems.map((sub) => (
                      <button
                        key={sub.category}
                        onClick={() => handleNavClick('products', sub.category)}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-800 hover:text-black hover:bg-slate-50 hover:border-l-4 hover:border-[#FFE500] transition-all flex items-center justify-between group cursor-pointer"
                      >
                        <div className="pr-2">
                          <div className="font-bold text-slate-900 group-hover:text-black">{sub.label}</div>
                          <div className="text-[11px] text-slate-500 font-normal line-clamp-1">{sub.desc}</div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-900 opacity-0 group-hover:opacity-100 transform -translate-x-1 group-hover:translate-x-0 transition-all shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Projects & Gallery (Merged) */}
            <button
              id="nav-link-projects"
              onClick={() => handleNavClick('projects')}
              className={`px-2.5 py-1.5 xl:px-3 xl:py-2 text-xs xl:text-sm font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                isProjectsActive
                  ? 'text-black bg-[#FFE500] shadow-xs'
                  : 'text-slate-700 hover:text-black hover:bg-slate-100'
              }`}
            >
              Projects & Gallery
            </button>

            {/* Careers */}
            <button
              id="nav-link-careers"
              onClick={() => handleNavClick('careers')}
              className={`px-2.5 py-1.5 xl:px-3 xl:py-2 text-xs xl:text-sm font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                currentTab === 'careers'
                  ? 'text-black bg-[#FFE500] shadow-xs'
                  : 'text-slate-700 hover:text-black hover:bg-slate-100'
              }`}
            >
              Careers
            </button>

            {/* Corporate Dropdown */}
            <div 
              ref={corporateRef}
              className="relative"
              onMouseEnter={() => setCorporateDropdownOpen(true)}
              onMouseLeave={() => setCorporateDropdownOpen(false)}
            >
              <button
                id="nav-link-corporate"
                onClick={() => handleNavClick('trade-licence')}
                className={`flex items-center gap-1 px-2.5 py-1.5 xl:px-3 xl:py-2 text-xs xl:text-sm font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                  isCorporateActive
                    ? 'text-black bg-[#FFE500] shadow-xs'
                    : 'text-slate-700 hover:text-black hover:bg-slate-100'
                }`}
              >
                <span>Corporate</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    corporateDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {corporateDropdownOpen && (
                <div className="absolute left-0 top-full pt-1.5 w-80 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="rounded-2xl bg-white border border-slate-200 shadow-2xl p-2 space-y-1">
                    <div className="px-3 py-2 border-b border-slate-100">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
                        Governance & Credentials
                      </span>
                    </div>

                    {corporateSubItems.map((sub) => (
                      <button
                        key={sub.tab}
                        onClick={() => handleNavClick(sub.tab)}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-between group cursor-pointer ${
                          currentTab === sub.tab
                            ? 'bg-[#FFE500]/20 text-black border-l-4 border-[#FFE500]'
                            : 'text-slate-800 hover:text-black hover:bg-slate-50 hover:border-l-4 hover:border-[#FFE500]'
                        }`}
                      >
                        <div className="pr-2">
                          <div className="font-bold text-slate-900 group-hover:text-black">
                            {sub.label}
                          </div>
                          <div className="text-[11px] text-slate-500 font-normal">
                            {sub.desc}
                          </div>
                        </div>

                        <ArrowRight className="w-3.5 h-3.5 text-slate-900 opacity-0 group-hover:opacity-100 transform -translate-x-1 group-hover:translate-x-0 transition-all shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Contact */}
            <button
              id="nav-link-contact"
              onClick={() => handleNavClick('contact')}
              className={`px-2.5 py-1.5 xl:px-3 xl:py-2 text-xs xl:text-sm font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                currentTab === 'contact'
                  ? 'text-black bg-[#FFE500] shadow-xs'
                  : 'text-slate-700 hover:text-black hover:bg-slate-100'
              }`}
            >
              Contact
            </button>
          </div>

          {/* Right Action Icons & Consultation CTA (Compact, No Wrap) */}
          <div className="hidden lg:flex items-center gap-1.5 xl:gap-2 shrink-0">
            {/* Global Search Button (Icon Button) */}
            <button
              id="header-search-btn"
              onClick={onOpenSearch}
              className="p-2 text-slate-700 hover:text-black hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors flex items-center justify-center cursor-pointer shadow-xs"
              title="Search catalogue & projects (Ctrl+K)"
              aria-label="Search catalogue"
            >
              <Search className="w-4 h-4 text-slate-700" />
            </button>

            {/* Consultation CTA */}
            <button
              id="header-request-consultation-btn"
              onClick={() => onRequestConsultation()}
              className="px-3 py-2 xl:px-4 xl:py-2.5 rounded-xl bg-[#FFE500] hover:bg-[#F5DC00] text-black text-xs xl:text-sm font-black tracking-tight transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center gap-1.5 border border-black/10 whitespace-nowrap shrink-0"
            >
              <span>Consultation</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>

          {/* Mobile Menu Actions */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenSearch}
              className="p-2 text-slate-800 hover:text-black rounded-lg hover:bg-slate-100"
              aria-label="Search"
            >
              <Search className="w-5 h-5 text-slate-800" />
            </button>

            <button
              id="mobile-hamburger-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-900 hover:text-black rounded-lg hover:bg-slate-100 transition-colors focus:outline-none cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 stroke-[2.5]" /> : <Menu className="w-6 h-6 stroke-[2.5]" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-3 sm:px-5 pt-3 pb-8 space-y-3 mt-2 shadow-2xl animate-in fade-in slide-in-from-top-3 duration-200 max-h-[85vh] overflow-y-auto">
            
            {/* Quick Action Search in Mobile Menu */}
            <div className="pb-1">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSearch();
                }}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200 text-xs font-semibold transition-colors text-left"
              >
                <span className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-slate-800" />
                  <span>Search products, models & projects...</span>
                </span>
                <span className="text-[10px] font-mono font-bold bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-500">
                  Search
                </span>
              </button>
            </div>

            {/* Navigation Items List */}
            <div className="grid gap-1">
              {/* Home */}
              <button
                onClick={() => handleNavClick('home')}
                className={`text-left px-3.5 py-3 rounded-xl text-sm font-bold transition-colors ${
                  currentTab === 'home' 
                    ? 'text-black bg-[#FFE500] shadow-xs' 
                    : 'text-slate-800 hover:bg-slate-50'
                }`}
              >
                Home
              </button>

              {/* Products & Solutions Collapsible Dropdown */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden my-0.5 transition-all">
                <div className="flex items-center justify-between p-1.5">
                  <button
                    onClick={() => handleNavClick('products')}
                    className={`flex-1 text-left px-3 py-2 rounded-xl text-sm font-bold transition-colors ${
                      currentTab === 'products'
                        ? 'text-black bg-[#FFE500] shadow-xs'
                        : 'text-slate-900 hover:text-black'
                    }`}
                  >
                    <span>Products & Solutions</span>
                  </button>

                  <button
                    onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                    className="p-2 rounded-xl text-slate-600 hover:text-black hover:bg-slate-200/70 transition-all cursor-pointer"
                    aria-label="Toggle Products Submenu"
                  >
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileProductsOpen ? 'rotate-180 text-black' : ''}`} />
                  </button>
                </div>

                {mobileProductsOpen && (
                  <div className="px-3 pb-3 pt-1 border-t border-slate-200/80 space-y-1 bg-white/70">
                    {productSubItems.map((sub) => (
                      <button
                        key={sub.category}
                        onClick={() => handleNavClick('products', sub.category)}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs text-slate-800 hover:text-black hover:bg-[#FFE500]/20 transition-all flex items-center justify-between group"
                      >
                        <div>
                          <div className="font-bold text-slate-900 group-hover:text-black">
                            {sub.label}
                          </div>
                          <div className="text-[11px] text-slate-500 font-normal line-clamp-1">
                            {sub.desc}
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-800 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Projects & Gallery */}
              <button
                onClick={() => handleNavClick('projects')}
                className={`text-left px-3.5 py-3 rounded-xl text-sm font-bold transition-colors ${
                  isProjectsActive 
                    ? 'text-black bg-[#FFE500] shadow-xs' 
                    : 'text-slate-800 hover:bg-slate-50'
                }`}
              >
                Projects & Gallery
              </button>

              {/* Careers */}
              <button
                onClick={() => handleNavClick('careers')}
                className={`text-left px-3.5 py-3 rounded-xl text-sm font-bold transition-colors ${
                  currentTab === 'careers' 
                    ? 'text-black bg-[#FFE500] shadow-xs' 
                    : 'text-slate-800 hover:bg-slate-50'
                }`}
              >
                Careers
              </button>

              {/* Corporate Governance Collapsible Dropdown */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden my-0.5 transition-all">
                <div className="flex items-center justify-between p-1.5">
                  <button
                    onClick={() => handleNavClick('trade-licence')}
                    className={`flex-1 text-left px-3 py-2 rounded-xl text-sm font-bold transition-colors ${
                      isCorporateActive
                        ? 'text-black bg-[#FFE500] shadow-xs'
                        : 'text-slate-900 hover:text-black'
                    }`}
                  >
                    <span>Corporate & Governance</span>
                  </button>

                  <button
                    onClick={() => setMobileCorporateOpen(!mobileCorporateOpen)}
                    className="p-2 rounded-xl text-slate-600 hover:text-black hover:bg-slate-200/70 transition-all cursor-pointer"
                    aria-label="Toggle Corporate Submenu"
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        mobileCorporateOpen ? 'rotate-180 text-black' : ''
                      }`}
                    />
                  </button>
                </div>

                {mobileCorporateOpen && (
                  <div className="px-3 pb-3 pt-1 border-t border-slate-200/80 space-y-1 bg-white/70">
                    {corporateSubItems.map((sub) => (
                      <button
                        key={sub.tab}
                        onClick={() => handleNavClick(sub.tab)}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-all flex items-center justify-between group ${
                          currentTab === sub.tab
                            ? 'bg-[#FFE500]/25 text-black font-bold'
                            : 'text-slate-800 hover:text-black hover:bg-slate-100 font-medium'
                        }`}
                      >
                        <div>
                          <div className="font-bold text-slate-900">{sub.label}</div>
                          <div className="text-[11px] text-slate-500">{sub.desc}</div>
                        </div>

                        <ArrowRight className="w-3.5 h-3.5 text-slate-800 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Contact */}
              <button
                onClick={() => handleNavClick('contact')}
                className={`text-left px-3.5 py-3 rounded-xl text-sm font-bold transition-colors ${
                  currentTab === 'contact' 
                    ? 'text-black bg-[#FFE500] shadow-xs' 
                    : 'text-slate-800 hover:bg-slate-50'
                }`}
              >
                Contact & Dubai Office
              </button>
            </div>

            {/* Mobile Footer CTAs */}
            <div className="pt-3 border-t border-slate-200 space-y-3">
              <button
                id="mobile-request-consultation-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onRequestConsultation();
                }}
                className="w-full py-3.5 rounded-xl bg-[#FFE500] hover:bg-[#F5DC00] text-black font-black text-sm text-center flex items-center justify-center gap-2 shadow-md border border-black/10 cursor-pointer transition-all"
              >
                <span>Request a Consultation</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
              
              {/* Direct Quick Contact links */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                {phone && (
                  <a 
                    href={`tel:${phone.replace(/\s+/g, '')}`} 
                    className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#FFE500] fill-current" />
                    <span className="font-mono truncate">{phone}</span>
                  </a>
                )}
                {email && (
                  <a 
                    href={`mailto:${email}`} 
                    className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-slate-900" />
                    <span>Send Email</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
