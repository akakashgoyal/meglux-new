import React from 'react';
import { Target, Compass, TrendingUp, Zap, ShieldCheck, Users, CheckCircle2, ArrowRight } from 'lucide-react';
import { CORPORATE_OBJECTIVES } from '../data/companyData';

interface ObjectivesViewProps {
  onSelectTab: (tab: string) => void;
  onRequestConsultation: () => void;
}

export const ObjectivesView: React.FC<ObjectivesViewProps> = ({
  onSelectTab,
  onRequestConsultation
}) => {
  return (
    <div className="space-y-10 sm:space-y-14 py-8 pb-16">
      {/* Objectives Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white border border-slate-200 p-8 sm:p-12 relative overflow-hidden shadow-xl">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#FFE500] text-black text-xs font-black uppercase tracking-wider font-mono">
              <Target className="w-3.5 h-3.5" />
              <span>Strategic Roadmap</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 font-display tracking-tight leading-tight">
              Corporate Objectives
            </h1>

            <p className="text-base text-slate-700 leading-relaxed font-medium">
              Megalux International is driven by structured engineering goals aimed at advancing sustainable urban illumination and critical perimeter security infrastructure across the Middle East.
            </p>
          </div>
        </div>
      </section>

      {/* Objectives Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-black bg-[#FFE500] px-3 py-1 rounded-md font-mono inline-block">
            Core Strategic Goals
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-display">
            Strategic Focus & Milestones
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CORPORATE_OBJECTIVES.map((obj, idx) => (
            <div 
              key={obj.id}
              className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 hover:border-slate-900 transition-all flex flex-col justify-between space-y-4 shadow-md hover:shadow-xl group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-900 group-hover:bg-[#FFE500] transition-colors">
                    {idx === 0 && <TrendingUp className="w-5 h-5 stroke-[2.5]" />}
                    {idx === 1 && <Zap className="w-5 h-5 stroke-[2.5]" />}
                    {idx === 2 && <ShieldCheck className="w-5 h-5 stroke-[2.5]" />}
                    {idx === 3 && <Users className="w-5 h-5 stroke-[2.5]" />}
                    {idx === 4 && <Target className="w-5 h-5 stroke-[2.5]" />}
                  </div>
                  <span className="text-xs font-mono text-black font-black bg-[#FFE500] px-2 py-0.5 rounded-md">Goal 0{idx + 1}</span>
                </div>

                <h3 className="text-lg font-black text-slate-950 font-display group-hover:text-black transition-colors">
                  {obj.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {obj.description}
                </p>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase text-slate-500 block">Measurable Target:</span>
                  <span className="text-xs font-black text-slate-950 block">{obj.target}</span>
                </div>
              </div>

              <div className="pt-3 text-[11px] text-slate-500 font-semibold flex items-center gap-1.5 border-t border-slate-100">
                <CheckCircle2 className="w-3.5 h-3.5 text-slate-900" />
                <span>Executive Steering Reviewed</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Strategic Vision 2030 Alignment Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white border border-slate-800 space-y-6 shadow-2xl">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-black bg-[#FFE500] px-3 py-1 rounded-md font-mono inline-block">
              National Vision Alignment
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              Supporting UAE Net Zero 2050 & Regional Vision Initiatives
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              Our ongoing transition towards ultra-high efficacy LEDs, smart municipal IoT sensors, zero-emissions solar street poles, and pedestrian-friendly high-security barriers directly supports the urban masterplanning agendas of the United Arab Emirates and broader GCC.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs text-slate-300 font-medium">
              Partner with Megalux on your next masterplanned community.
            </span>
            <button
              onClick={onRequestConsultation}
              className="px-6 py-2.5 rounded-xl bg-[#FFE500] hover:bg-[#F5DC00] text-black text-xs font-black tracking-wide transition-all shadow-md cursor-pointer border border-black/10"
            >
              Discuss Partnership
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
