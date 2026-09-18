import React from 'react';
import { 
  Building2, 
  Target, 
  Compass, 
  ShieldCheck, 
  Award, 
  Users2, 
  Leaf, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  Mail,
  FileText
} from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { Logo } from '../components/Logo';

interface AboutViewProps {
  onSelectTab: (tab: string, subCategory?: string) => void;
  onRequestConsultation: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  onSelectTab,
  onRequestConsultation
}) => {
  const { settings } = useCms();
  const phone = settings.phone_numbers?.[0] || '';
  const address = settings.address || 'Dubai, UAE';
  const companyName = settings.company_name || "Meglux";
  const coreValues = [
    {
      title: 'Quality & Craftsmanship',
      desc: 'Sourcing and engineering systems with aircraft-grade alloys, premium CREE/Osram LEDs, and rigorous factory QC testing.',
      icon: Award
    },
    {
      title: 'Safety & Perimeter Integrity',
      desc: 'Delivering full-scale physical crash-tested barriers (ASTM/PAS 68) engineered to safeguard critical infrastructure and public venues.',
      icon: ShieldCheck
    },
    {
      title: 'Engineering Innovation',
      desc: 'Pioneering intelligent solar street lighting, smart DALI/Zigbee controls, and shallow-mount crash bollard technologies.',
      icon: Sparkles
    },
    {
      title: 'Consultant & Client Focus',
      desc: 'Providing turnkey technical support, DIALux calculations, BIM families, and rapid sample delivery for smooth project approvals.',
      icon: Users2
    },
    {
      title: 'Sustainability & Efficiency',
      desc: 'Championing high efficacy (>150 lm/W), dark-sky compliant optics, solar harvesting, and recyclable construction materials.',
      icon: Leaf
    }
  ];

  const stakeholders = [
    {
      title: 'Architects & Lighting Designers',
      desc: 'Custom aesthetic finishes, minimal form factors, precise beam optics (5° to 120°), and photometrically accurate 3D CAD/IES assets.'
    },
    {
      title: 'Engineering Consultants',
      desc: 'Exhaustive Material Approval Submittals (MAS), compliance matrices, structural foundation calculations, and third-party laboratory certifications.'
    },
    {
      title: 'Main Contractors & MEPs',
      desc: 'On-time Dubai warehouse inventory, plug-and-play installation kits, pre-wired junction boxes, and field commissioning support.'
    },
    {
      title: 'Master Developers & Hospitality',
      desc: 'Long-term durability in saline coastal and desert heat conditions, 5-year comprehensive warranties, and bespoke architectural signature fixtures.'
    },
    {
      title: 'Government & Municipal Authorities',
      desc: 'Smart city integration, energy-saving streetlighting conversions, and high-security anti-terror perimeter barriers for ministry campuses.'
    },
    {
      title: 'Corporate & Commercial Estates',
      desc: 'Seamless access control integration, license plate recognition compatibility, and elegant welcoming entrance aesthetics.'
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24 py-8 pb-16">
      {/* Top Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white border border-slate-200 p-8 sm:p-14 relative overflow-hidden shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#FFE500] text-black text-xs font-black uppercase tracking-wider font-mono">
                <Building2 className="w-3.5 h-3.5" />
                <span>Corporate Profile</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 font-display tracking-tight leading-tight">
                About Megalux International
              </h1>

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
                Megalux International is a Dubai-based company dedicated to bringing state-of-the-art lighting products and perimeter intrusion prevention solutions to the Middle East.
              </p>
            </div>

            <div className="shrink-0 p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <Logo size="lg" variant="badge-with-text" />
            </div>
          </div>
        </div>
      </section>

      {/* Narrative & Company Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-display">
              A Trusted Partner for Middle East Landmark Projects
            </h2>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
              Established in Dubai, United Arab Emirates, Megalux International operates as a specialized supplier and engineering partner for architectural lighting, exterior illuminations, and high-security perimeter protection infrastructure.
            </p>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Our engineering philosophy combines optical precision with heavy-duty structural integrity. Whether illuminating a luxury five-star resort facade in Dubai, retrofitting sustainable solar illumination across a regional master development, or securing sensitive governmental gateways with ASTM M50 / K12 anti-ram bollards, Megalux International ensures international standards of compliance, quality, and longevity.
            </p>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-md space-y-3">
              <h3 className="text-sm font-black text-slate-950 font-display uppercase tracking-wider">
                Our Core Business Spectrum:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-800 font-semibold">
                {[
                  'Architectural & Facade Lighting',
                  'Indoor Hospitality & Commercial Luminaires',
                  'Outdoor, Landscape & Solar Street Lighting',
                  'High Security Crash-Rated Bollards (ASTM M50)',
                  'Road Blockers, Spike Tyre Killers & Gates',
                  'Custom Urban Furniture & Amenity Structures'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#FFE500] border border-black/20" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80" 
                alt="Dubai Commercial Skyline"
                className="w-full h-80 object-cover object-center"
              />
            </div>
            
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-md text-xs space-y-2 text-slate-700 font-medium">
              <div className="flex items-center gap-2 text-slate-950 font-black">
                <MapPin className="w-4 h-4 text-[#FFE500]" />
                <span>Dubai Head Office & Regional Distribution</span>
              </div>
              <p className="text-slate-600">
                {address} | Tel: <span className="font-mono text-slate-900">{phone}</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vision */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 relative overflow-hidden space-y-4 shadow-md hover:shadow-xl transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#FFE500] text-black flex items-center justify-center shadow-xs">
              <Compass className="w-6 h-6 stroke-[2.5]" />
            </div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-500 block">
              Strategic Aspiration
            </span>
            <h3 className="text-2xl font-black text-slate-950 font-display">Our Vision</h3>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
              "To be the leading lighting and security solutions partner in the Middle East, recognized for innovation, quality, and engineering excellence in landmark developments."
            </p>
          </div>

          {/* Mission */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 relative overflow-hidden space-y-4 shadow-md hover:shadow-xl transition-all">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 text-[#FFE500] flex items-center justify-center shadow-xs">
              <Target className="w-6 h-6 stroke-[2.5]" />
            </div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-500 block">
              Daily Operational Purpose
            </span>
            <h3 className="text-2xl font-black text-slate-950 font-display">Our Mission</h3>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
              "To deliver reliable, energy-efficient lighting and certified high-security infrastructure solutions that protect people, enhance architecture, and build sustainable communities."
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-black bg-[#FFE500] px-3 py-1 rounded-md font-mono inline-block">
            Guiding Principles
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-display">
            Our Core Corporate Values
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Principles that define every supplier relationship, engineering submittal, and client interaction.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreValues.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div key={idx} className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-slate-900 transition-all space-y-3 group shadow-md hover:shadow-xl">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900 group-hover:bg-[#FFE500] group-hover:text-black transition-all">
                  <Icon className="w-5 h-5 stroke-[2.5]" />
                </div>
                <h3 className="text-base font-black text-slate-950 font-display">
                  {val.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {val.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Who We Serve */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 space-y-8 shadow-2xl">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-black bg-[#FFE500] px-3 py-1 rounded-md font-mono inline-block">
              Market Segments
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              Who We Serve Across the GCC
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">
              Specialized technical and commercial packages structured for each stakeholder in the built environment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stakeholders.map((stk, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2 shadow-sm">
                <div className="flex items-center gap-2 text-white font-bold text-sm font-display">
                  <CheckCircle2 className="w-4 h-4 text-[#FFE500]" />
                  <span>{stk.title}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed pl-6">
                  {stk.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs text-slate-300">
              Interested in reviewing our formal company profile or trade registration?
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => onSelectTab('trade-licence')}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/10 transition-colors cursor-pointer"
              >
                View Trade Licence
              </button>
              <button
                onClick={onRequestConsultation}
                className="px-5 py-2.5 rounded-xl bg-[#FFE500] hover:bg-[#F5DC00] text-black text-xs font-black transition-all shadow-md cursor-pointer border border-black/10"
              >
                Discuss a Project
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
