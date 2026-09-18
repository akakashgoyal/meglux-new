import React from 'react';
import { ExternalLink, Building } from 'lucide-react';
import { useCms } from '../context/CmsContext';

export const DubaiMap: React.FC = () => {
  const { settings } = useCms();
  const phone = settings.phone_numbers?.[0] || '+971 4 5803082';
  const email = settings.email_addresses?.[0] || 'sales@megaluxintl.com';
  const address = settings.address || 'Bldg No. 26 - 26 6A Street - Al Qouz Ind.third - Al Quoz - Dubai - United Arab Emirates';
  const hours = settings.office_hours || 'Mon - Fri: 8:00 AM - 6:00 PM (GST)';
  const companyName = settings.company_name || 'meglux';

  return (
    <div className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-xl">
      {/* Map Header / Location Bar */}
      <div className="p-4 sm:p-6 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FFE500] text-black flex items-center justify-center font-bold">
            <Building className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <h4 className="text-sm font-black text-slate-950 font-display capitalize">
              {companyName} Headquarters
            </h4>
            <p className="text-xs text-slate-600 font-medium">
              {address}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://maps.app.goo.gl/axNGijwRrmahBsxD6?g_st=ic"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-900 border border-slate-200 text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <span>Open in Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-900" />
          </a>
        </div>
      </div>

      {/* Interactive Map Visual Area */}
      <div className="relative h-80 sm:h-96 w-full bg-slate-100 overflow-hidden">
        {/* Interactive Stylized Dubai Map iframe */}
        <iframe
          title={`${companyName} Dubai Headquarters`}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3612.082323433939!2d55.21798429999999!3d25.132907499999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6b55bd508d23%3A0x2a73670ce27aca7a!2sMEGALUX%20INTERNATIONAL!5e0!3m2!1sen!2sin!4v1789390098210!5m2!1sen!2sin"
          className="w-full h-full border-0 contrast-[105%] opacity-90 hover:opacity-100 transition-opacity"
          loading="lazy"
          allowFullScreen
        />
      </div>

      {/* Footer Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 bg-slate-50 text-xs p-4">
        <div className="p-3 space-y-1">
          <span className="text-slate-500 text-[10px] uppercase font-mono font-bold block">Direct Telephone</span>
          {phone && (
            <a href={`tel:${phone.replace(/\s+/g, '')}`} className="text-slate-950 font-bold hover:text-black transition-colors font-mono">
              {phone}
            </a>
          )}
        </div>
        <div className="p-3 space-y-1">
          <span className="text-slate-500 text-[10px] uppercase font-mono font-bold block">Project Sales Email</span>
          {email && (
            <a href={`mailto:${email}`} className="text-slate-950 font-bold hover:text-black transition-colors">
              {email}
            </a>
          )}
        </div>
        <div className="p-3 space-y-1">
          <span className="text-slate-500 text-[10px] uppercase font-mono font-bold block">Working Hours</span>
          <span className="text-slate-900 font-semibold">{hours}</span>
        </div>
      </div>
    </div>
  );
};
