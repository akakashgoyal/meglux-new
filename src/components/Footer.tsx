import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  ArrowUpRight, 
  ShieldCheck, 
  Award, 
  FileText,
  Clock,
  ArrowRight
} from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { Logo } from './Logo';

interface FooterProps {
  onSelectTab: (tab: string, subCategory?: string) => void;
  onRequestConsultation: (initialCategory?: string) => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectTab,
  onRequestConsultation,
  onOpenPrivacy,
  onOpenTerms
}) => {
  const { settings, categories: cmsCategories } = useCms();

  const phone = settings.phone_numbers?.[0] || '';
  const email = settings.email_addresses?.[0] || '';
  const address = settings.address || 'Dubai, UAE';
  const hours = settings.office_hours || 'Monday – Friday: 8:00 AM – 6:00 PM (GST)';
  const copyright = settings.copyright_text || "© 2026 Meglux. All Rights Reserved. Dubai, United Arab Emirates.";
  const website = settings.website || 'meglux.springstrdg.com';

  const handleNav = (tab: string, category?: string) => {

    onSelectTab(tab, category);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 relative overflow-hidden">
      {/* Top CTA Banner */}
      <div className="border-b border-slate-800/80 bg-slate-900/90 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#FFE500]/15 text-[#FFE500] border border-[#FFE500]/30">
                <ShieldCheck className="w-3.5 h-3.5" /> Engineering & Consultant Grade Solutions
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                Ready to Illuminate & Secure Your Next Project?
              </h2>
              <p className="text-sm text-slate-300 max-w-2xl">
                Collaborate with our Dubai-based lighting designers and perimeter security engineers for technical submittals, photometrics, and BoQ tenders.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-end gap-3 w-full lg:w-auto">
              <button
                id="footer-discuss-project-cta"
                onClick={() => onRequestConsultation()}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#FFE500] hover:bg-[#F5DC00] text-black text-sm font-extrabold tracking-tight transition-all shadow-lg hover:shadow-[#FFE500]/20 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2 border border-black/10"
              >
                <span>Discuss Your Project</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
              {/* Commented out Approval and Certifications per client request */}
              {/*
              <button
                id="footer-view-approvals-cta"
                onClick={() => handleNav('approvals')}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-sm font-semibold border border-white/10 hover:border-white/20 transition-all cursor-pointer flex items-center justify-center"
              >
                View Approvals & Specs
              </button>
              */}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1: Company Profile */}
          <div className="space-y-4">
            <div className="bg-white p-3 rounded-2xl inline-block border border-slate-200">
              <Logo size="md" variant="badge-with-text" />
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Megalux International delivers advanced architectural lighting, commercial illumination, and high-security perimeter intrusion prevention systems across the Middle East.
            </p>

            {/* Commented out Approval and Certifications per client request */}
            {/*
            <div className="pt-2 flex flex-col gap-2 text-xs text-slate-300">
              <div className="flex items-center gap-2 text-slate-200">
                <Award className="w-4 h-4 text-[#FFE500]" />
                <span>ASTM M50 & PAS 68 Crash Certified</span>
              </div>
              <div className="flex items-center gap-2 text-slate-200">
                <ShieldCheck className="w-4 h-4 text-[#FFE500]" />
                <span>ISO 9001:2015 Quality Management</span>
              </div>
            </div>
            */}
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider font-display border-l-2 border-[#FFE500] pl-2.5">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button 
                  id="footer-link-home"
                  onClick={() => handleNav('home')} 
                  className="hover:text-white transition-colors flex items-center gap-1.5 group cursor-pointer text-slate-300"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#FFE500] opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  <span>Home (Company & About)</span>
                </button>
              </li>
              <li>
                <button 
                  id="footer-link-products"
                  onClick={() => handleNav('products')} 
                  className="hover:text-white transition-colors flex items-center gap-1.5 group cursor-pointer text-slate-300"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#FFE500] opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  <span>Products & Solutions</span>
                </button>
              </li>
              <li>
                <button 
                  id="footer-link-projects"
                  onClick={() => handleNav('projects')} 
                  className="hover:text-white transition-colors flex items-center gap-1.5 group cursor-pointer text-slate-300"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#FFE500] opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  <span>Projects & Gallery</span>
                </button>
              </li>
              <li>
                <button 
                  id="footer-link-careers"
                  onClick={() => handleNav('careers')} 
                  className="hover:text-white transition-colors flex items-center gap-1.5 group cursor-pointer text-slate-300"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#FFE500] opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  <span>Careers</span>
                </button>
              </li>
              {/* Commented out Approval and Certifications per client request */}
              {/*
              <li>
                <button 
                  id="footer-link-approvals"
                  onClick={() => handleNav('approvals')} 
                  className="hover:text-white transition-colors flex items-center gap-1.5 group cursor-pointer text-slate-300"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#FFE500] opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  <span>Approvals & Certifications</span>
                </button>
              </li>
              */}
              <li>
                <button 
                  id="footer-link-contact"
                  onClick={() => handleNav('contact')} 
                  className="hover:text-white transition-colors flex items-center gap-1.5 group cursor-pointer text-slate-300"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#FFE500] opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  <span>Contact & Location</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Core Disciplines */}
          <div className="space-y-4">
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider font-display border-l-2 border-[#FFE500] pl-2.5">
              Core Disciplines
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {cmsCategories && cmsCategories.length > 0 ? (
                cmsCategories.map((cat) => (
                  <li key={cat.id}>
                    <button 
                      onClick={() => handleNav('products', cat.slug || String(cat.id))} 
                      className="hover:text-white transition-colors flex items-center gap-2 text-left cursor-pointer text-slate-300"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#FFE500]" />
                      <span>{cat.name}</span>
                    </button>
                  </li>
                ))
              ) : (
                <>
                  <li>
                    <button 
                      onClick={() => handleNav('products', 'outdoor-furniture')} 
                      className="hover:text-white transition-colors flex items-center gap-2 text-left cursor-pointer text-slate-300"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#FFE500]" />
                      <span>Outdoor Furniture / Street Furniture</span>
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => handleNav('products', 'security-systems')} 
                      className="hover:text-white transition-colors flex items-center gap-2 text-left cursor-pointer text-slate-300"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#FFE500]" />
                      <span>Security Systems</span>
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => handleNav('products', 'lighting')} 
                      className="hover:text-white transition-colors flex items-center gap-2 text-left cursor-pointer text-slate-300"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#FFE500]" />
                      <span>Lighting</span>
                    </button>
                  </li>
                </>
              )}
              <li>
                <button 
                  onClick={() => handleNav('trade-licence')} 
                  className="hover:text-white transition-colors flex items-center gap-2 text-left text-[#FFE500] font-semibold cursor-pointer pt-2"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Commercial Trade Licence & Verification</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Dubai Headquarters Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider font-display border-l-2 border-[#FFE500] pl-2.5">
              Contact & Headquarters
            </h3>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#FFE500] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">{settings.company_name || "Megalux International LLC"}</strong>
                  <span className="block text-slate-300">{address}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#FFE500] shrink-0" />
                <a 
                  href={`tel:${phone.replace(/\s+/g, '')}`} 
                  className="hover:text-[#FFE500] transition-colors text-slate-200 font-mono"
                >
                  {phone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#FFE500] shrink-0" />
                <a 
                  href={`mailto:${email}`} 
                  className="hover:text-[#FFE500] transition-colors text-slate-200"
                >
                  {email}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-[#FFE500] shrink-0" />
                <span className="text-slate-200">{website}</span>
              </div>

              <div className="flex items-center gap-2.5 text-slate-300 text-xs pt-1">
                <Clock className="w-3.5 h-3.5 text-[#FFE500] shrink-0" />
                <span>{hours}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sub-Footer & Copyright */}
      <div className="border-t border-slate-800 bg-slate-950 py-6 text-xs text-slate-400 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>{copyright}</p>

          <div className="flex items-center gap-6">
            <button 
              id="footer-privacy-btn"
              onClick={onOpenPrivacy}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button 
              id="footer-terms-btn"
              onClick={onOpenTerms}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms & Conditions
            </button>
            <button 
              onClick={() => handleNav('trade-licence')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              DET Trade Licence
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
