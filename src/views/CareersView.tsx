import React, { useState, useRef } from 'react';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Users, 
  Building2, 
  Sparkles, 
  Search, 
  Filter, 
  Send, 
  FileText, 
  AlertCircle,
  X,
  Mail,
  Phone,
  Layers,
  Award,
  UploadCloud,
  Loader2
} from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { mapCmsCareerToJobOpening, submitCareerApplication, DEFAULT_FALLBACK_CAREER_SLUG } from '../services/cmsApi';
import { JobOpening } from '../types';

interface CareersViewProps {
  onRequestConsultation: (initialCategory?: string) => void;
}

export const CareersView: React.FC<CareersViewProps> = ({ onRequestConsultation }) => {
  const { careers: cmsCareers, urgentCareers, settings, loading } = useCms();

  const mappedJobs = React.useMemo(() => {
    return (cmsCareers || []).map(mapCmsCareerToJobOpening);
  }, [cmsCareers]);

  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeJobForApplication, setActiveJobForApplication] = useState<JobOpening | null>(null);
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);

  React.useEffect(() => {
    if (mappedJobs.length > 0 && !expandedJobId) {
      setExpandedJobId(mappedJobs[0].id);
    }
  }, [mappedJobs]);

  const departments = React.useMemo(() => {
    const list = [{ id: 'all', label: 'All Departments' }];
    const depts = new Set<string>();
    mappedJobs.forEach(j => {
      if (j.department) depts.add(j.department);
    });
    depts.forEach(d => {
      list.push({ id: d, label: d });
    });
    return list;
  }, [mappedJobs]);


  // Form states
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantExperience, setApplicantExperience] = useState('');
  const [applicantNotice, setApplicantNotice] = useState('');
  const [applicantNote, setApplicantNote] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Status and feedback states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean>(false);
  const [apiSuccessMessage, setApiSuccessMessage] = useState<string | null>(null);
  const [submittedApplicantName, setSubmittedApplicantName] = useState('');
  const [apiError, setApiError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  // Field validation flags
  const [emailTouched, setEmailTouched] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);

  const isEmailValid = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  };

  const isPhoneValid = (phone: string) => {
    const cleaned = phone.replace(/[\s\-\(\)\+]/g, '');
    return cleaned.length >= 7 && /^\d+$/.test(cleaned);
  };

  const validateAndSetFile = (file: File | null) => {
    setFileError(null);
    if (!file) {
      setResumeFile(null);
      return;
    }
    const MAX_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB
    if (file.size > MAX_SIZE_BYTES) {
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      setFileError(`Resume file size (${sizeMb} MB) exceeds the 10 MB limit. Please select a smaller file.`);
      setResumeFile(null);
      return;
    }
    const allowedExtensions = ['.pdf', '.doc', '.docx'];
    const nameLower = file.name.toLowerCase();
    const hasValidExt = allowedExtensions.some(ext => nameLower.endsWith(ext));
    if (!hasValidExt) {
      setFileError('Invalid file format. Only PDF, DOC, or DOCX resume files are supported.');
      setResumeFile(null);
      return;
    }
    setResumeFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const filteredJobs = mappedJobs.filter((job) => {
    const matchesDept = selectedDepartment === 'all' || job.department === selectedDepartment;
    const matchesSearch = 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    setFieldErrors({});

    let hasClientError = false;
    if (!applicantName.trim()) {
      hasClientError = true;
    }
    if (!isEmailValid(applicantEmail)) {
      setEmailTouched(true);
      hasClientError = true;
    }
    if (!isPhoneValid(applicantPhone)) {
      setPhoneTouched(true);
      hasClientError = true;
    }
    if (!resumeFile) {
      setFileError('Resume / CV is required (PDF, DOC, or DOCX format, max 10 MB).');
      hasClientError = true;
    }

    if (hasClientError) return;

    const dynamicSlug = activeJobForApplication?.slug || activeJobForApplication?.id || 'general-application';

    setIsSubmitting(true);
    try {
      const result = await submitCareerApplication({
        career_slug: dynamicSlug,
        full_name: applicantName.trim(),
        email: applicantEmail.trim(),
        mobile_phone: applicantPhone.trim(),
        total_experience: applicantExperience.trim() || undefined,
        notice_period: applicantNotice.trim() || undefined,
        professional_summary: applicantNote.trim() || undefined,
        resume: resumeFile!
      });

      if (result.success) {
        // Success: show confirmation message and reset form fields
        setSubmittedApplicantName(applicantName.trim());
        setApiSuccessMessage(result.message);
        setSubmissionSuccess(true);
        
        // Reset form
        setApplicantName('');
        setApplicantEmail('');
        setApplicantPhone('');
        setApplicantExperience('');
        setApplicantNotice('');
        setApplicantNote('');
        setResumeFile(null);
        setFileError(null);
        setEmailTouched(false);
        setPhoneTouched(false);
        setFieldErrors({});
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        // Validation / API error: show error message and preserve entered form data
        setApiError(result.message || 'Unable to submit your application. Please review the details below.');
        if (result.errors) {
          setFieldErrors(result.errors);
        }
      }
    } catch (err: any) {
      setApiError(err?.message || 'A network error occurred while submitting your application. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setActiveJobForApplication(null);
    setApplicantName('');
    setApplicantEmail('');
    setApplicantPhone('');
    setApplicantExperience('');
    setApplicantNotice('');
    setApplicantNote('');
    setResumeFile(null);
    setFileError(null);
    setEmailTouched(false);
    setPhoneTouched(false);
    setSubmissionSuccess(null);
    setApiSuccessMessage(null);
    setSubmittedApplicantName('');
    setApiError(null);
    setFieldErrors({});
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Careers Header */}
      <section className="relative bg-slate-950 text-white py-16 sm:py-20 lg:py-24 overflow-hidden border-b border-slate-800">
        {/* Ambient Grid & Architectural Glow */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FFE500_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute -top-24 right-1/4 w-96 h-96 bg-[#FFE500]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Heading, Description, Stats & Action */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFE500]/15 text-[#FFE500] text-xs font-bold border border-[#FFE500]/30 tracking-wide uppercase">
                <Briefcase className="w-3.5 h-3.5" />
                <span>Join Megalux International – Dubai, UAE</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight leading-tight">
                Engineer Landmark Urban Spaces & Perimeter Defense
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
                Shape the infrastructure of tomorrow. We are hiring talented engineers, lighting designers, project managers, and estimation specialists across our three core pillars: <span className="text-white font-semibold">Outdoor & Street Furniture</span>, <span className="text-white font-semibold">High-Security Systems</span>, and <span className="text-white font-semibold">Architectural Lighting</span>.
              </p>

              {/* Quick Stat Pill Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-[#FFE500]/50 transition-colors">
                  <div className="text-[#FFE500] font-bold text-lg">Dubai HQ</div>
                  <div className="text-xs text-slate-400">Al Quoz Ind. 3 Hub</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-[#FFE500]/50 transition-colors">
                  <div className="text-[#FFE500] font-bold text-lg">3 Sectors</div>
                  <div className="text-xs text-slate-400">Equal Multi-Discipline</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-[#FFE500]/50 transition-colors">
                  <div className="text-[#FFE500] font-bold text-lg">ISO & DET</div>
                  <div className="text-xs text-slate-400">Accredited Operations</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-[#FFE500]/50 transition-colors">
                  <div className="text-[#FFE500] font-bold text-lg">GCC Scope</div>
                  <div className="text-xs text-slate-400">Tier-1 Masterplans</div>
                </div>
              </div>

              {/* Direct Action Links */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    document.getElementById('jobs-directory')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3 rounded-xl bg-[#FFE500] text-black font-extrabold text-xs sm:text-sm hover:bg-yellow-400 transition-all flex items-center gap-2 shadow-lg shadow-[#FFE500]/20 cursor-pointer active:scale-95"
                >
                  <span>Explore Open Positions ({mappedJobs.length})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onRequestConsultation('careers')}
                  className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm border border-slate-800 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-[#FFE500]" />
                  <span>Speculative Application</span>
                </button>
              </div>
            </div>

            {/* Right Column: Hero Visual Showcase (Fixing missing image) */}
            <div className="lg:col-span-5 relative">
              {/* Outer decorative halo */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-[#FFE500]/30 to-blue-500/20 rounded-3xl blur-xl opacity-70" />

              <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl group">
                {/* Hero Team / Engineering Photography */}
                <div className="relative h-80 sm:h-96 w-full overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
                    alt="Megalux Engineering & Design Team collaborating in Dubai"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Fallback image if network blip
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                  {/* Top Floating Status Badge */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700 text-xs font-bold text-white shadow-lg">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Hiring 2026 • Immediate Visas</span>
                    </div>

                    <span className="px-2.5 py-1 rounded-md bg-[#FFE500] text-black text-[11px] font-black uppercase font-mono tracking-wider shadow-md">
                      Dubai Hub
                    </span>
                  </div>

                  {/* Bottom Overlay Card */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-slate-800/90 text-white space-y-2 shadow-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-[#FFE500]" />
                        <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                          Megalux Technical HQ
                        </span>
                      </div>
                      <span className="text-[11px] text-emerald-400 font-mono font-semibold">
                        SIRA & ISO 9001
                      </span>
                    </div>
                    
                    <p className="text-xs text-slate-300 leading-snug">
                      Al Quoz Industrial Area 3, Dubai • Multi-discipline engineering studio, estimation lab & central testing warehouse.
                    </p>

                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-[#FFE500]" />
                        <span>Engineering, Lighting & Physical Defense</span>
                      </span>
                      <span className="text-slate-200 font-bold">Dubai, UAE</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Work With Us Section */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-display">
              Why Build Your Career at Megalux?
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              A collaborative, engineering-first environment delivering certified solutions to the Middle East's most demanding developers and consultants.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#FFE500] transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#FFE500] text-black flex items-center justify-center font-bold mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Pioneering Multi-Discipline Portfolio</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Work at the intersection of urban design, physical crash-rated defense, and photometrics. Expand your skillset across three major civil engineering fields with equal priority.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#FFE500] transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#FFE500] text-black flex items-center justify-center font-bold mb-4">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Landmark Regional Exposure</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Direct engagement with leading government entities, Dubai Municipality, RTA, major master developers, and top MEP consultants across the UAE and Saudi Arabia.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#FFE500] transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#FFE500] text-black flex items-center justify-center font-bold mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Professional Growth & Stability</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Structured career progression, comprehensive ISO 9001/45001 training, technical software certifications, and competitive UAE compensation packages.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Jobs Directory */}
      <section id="jobs-directory" className="py-14 sm:py-16 scroll-mt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Filter Bar */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm mb-8 space-y-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Search Box */}
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search roles by title, skill, or keyword..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#FFE500] focus:border-black"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-black text-xs"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Department Pills */}
              <div className="flex items-center gap-1.5 flex-wrap w-full md:w-auto">
                <Filter className="w-3.5 h-3.5 text-slate-500 mr-1 hidden sm:inline" />
                {departments.map((dept) => (
                  <button
                    key={dept.id}
                    onClick={() => setSelectedDepartment(dept.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      selectedDepartment === dept.id
                        ? 'bg-black text-[#FFE500] shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {dept.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
              <span>Showing <strong>{filteredJobs.length}</strong> active opportunities in Dubai, UAE</span>
              <span>All applications reviewed by Megalux HR</span>
            </div>
          </div>

          {/* Job List */}
          <div className="space-y-4">
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-40 rounded-2xl bg-white border border-slate-200 p-6 animate-pulse" />
                ))}
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center">
                <Briefcase className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800">No positions match your current search</h3>
                <p className="text-xs text-slate-500 mt-1 mb-4">Try clearing your filters or send us an open speculative CV.</p>
                <button
                  onClick={() => {
                    setSelectedDepartment('all');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 bg-black text-[#FFE500] rounded-xl text-xs font-bold"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              filteredJobs.map((job) => {
                const isExpanded = expandedJobId === job.id;
                return (
                  <div 
                    key={job.id}
                    id={`job-${job.id}`}
                    className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all overflow-hidden"
                  >
                    {/* Header Row */}
                    <div className="p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-800 font-mono text-[11px] font-bold border border-slate-200">
                            {job.department}
                          </span>
                          {job.featured && (
                            <span className="px-2 py-0.5 rounded-md bg-[#FFE500] text-black text-[10px] font-extrabold uppercase tracking-wider">
                              Urgent Hire
                            </span>
                          )}
                          <span className="text-xs text-slate-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {job.type}
                          </span>
                        </div>

                        <h3 className="text-lg sm:text-xl font-bold text-slate-950 font-display">
                          {job.title}
                        </h3>

                        <div className="flex items-center gap-4 text-xs text-slate-600 flex-wrap">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-[#FFE500] fill-black" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Briefcase className="w-3.5 h-3.5 text-slate-500" />
                            Exp: {job.experience}
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 sm:self-end lg:self-center shrink-0">
                        <button
                          onClick={() => setExpandedJobId(isExpanded ? null : job.id)}
                          className="px-4 py-2.5 rounded-xl border border-slate-300 hover:border-slate-400 bg-white text-slate-800 text-xs font-bold transition-all cursor-pointer"
                        >
                          {isExpanded ? 'Hide Details' : 'View Requirements'}
                        </button>
                        <button
                          onClick={() => setActiveJobForApplication(job)}
                          className="px-5 py-2.5 rounded-xl bg-[#FFE500] hover:bg-[#F5DC00] text-black text-xs font-black tracking-tight transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
                        >
                          <span>Apply Now</span>
                          <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                        </button>
                      </div>
                    </div>

                    {/* Expandable Details Drawer */}
                    {isExpanded && (
                      <div className="px-5 pb-6 sm:px-6 pt-2 border-t border-slate-100 bg-slate-50/50 space-y-5 animate-in fade-in duration-150">
                        <div>
                          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold mb-1.5">
                            Role Description
                          </h4>
                          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                            {job.description}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold mb-2">
                              Key Responsibilities
                            </h4>
                            <ul className="space-y-1.5 text-xs text-slate-700">
                              {job.responsibilities.map((resp, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                                  <span>{resp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold mb-2">
                              Candidate Requirements
                            </h4>
                            <ul className="space-y-1.5 text-xs text-slate-700">
                              {job.requirements.map((req, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <ShieldCheck className="w-3.5 h-3.5 text-[#FFE500] fill-black mt-0.5 shrink-0" />
                                  <span>{req}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                          <span className="text-xs text-slate-500">
                            Location: {settings.address || 'Dubai, United Arab Emirates'}
                          </span>
                          <button
                            onClick={() => setActiveJobForApplication(job)}
                            className="w-full sm:w-auto px-6 py-2.5 bg-black text-[#FFE500] rounded-xl text-xs font-bold hover:bg-slate-900 transition-colors flex items-center justify-center gap-1.5"
                          >
                            <span>Submit Application for {job.title}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Spontaneous Speculative CV Submission */}
          <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 text-white border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-[#FFE500] text-[11px] font-mono font-bold">
                Talent Community
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-display">
                Don’t see your exact profile listed?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                We are always seeking passionate electrical engineers, landscape architects, AutoCAD technicians, and site specialists. Send us a spontaneous application.
              </p>
            </div>

            <button
              onClick={() => setActiveJobForApplication({
                id: 'spontaneous-application',
                slug: mappedJobs[0]?.slug || DEFAULT_FALLBACK_CAREER_SLUG,
                title: 'General / Spontaneous Engineering Application',
                department: 'General Engineering & Projects',
                location: 'Dubai, UAE',
                type: 'Full-Time / Contract',
                experience: 'Any Experience Level',
                description: 'General candidate submission for upcoming projects and technical roles across Outdoor Furniture, Security Systems, and Lighting.',
                responsibilities: ['Reviewed by Megalux engineering directors and talent acquisition.'],
                requirements: ['Technical, engineering, or architectural industry background in the UAE / GCC.'],
                postedDate: 'Always Open'
              })}
              className="px-6 py-3.5 rounded-xl bg-[#FFE500] hover:bg-[#F5DC00] text-black font-extrabold text-xs sm:text-sm tracking-tight transition-all cursor-pointer whitespace-nowrap shrink-0 shadow-lg"
            >
              Submit Spontaneous Application
            </button>
          </div>
        </div>
      </section>

      {/* Application Modal */}
      {activeJobForApplication && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-300 overflow-hidden max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="px-6 py-4 bg-slate-950 text-white flex items-center justify-between border-b border-slate-800">
              <div>
                <div className="text-[11px] font-mono text-[#FFE500] font-bold uppercase tracking-wider">
                  Job Application – Dubai, UAE
                </div>
                <h3 className="text-base sm:text-lg font-bold truncate max-w-md">
                  {activeJobForApplication.title}
                </h3>
              </div>
              <button 
                onClick={resetForm}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4">
              {submissionSuccess ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-14 h-14 bg-[#FFE500] text-black rounded-full flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 font-display">
                    Application Received Successfully
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    {apiSuccessMessage || (
                      <>
                        Thank you, <strong>{submittedApplicantName || 'Applicant'}</strong>. Your application and CV for <strong>{activeJobForApplication.title}</strong> have been submitted successfully. Our Human Resources team will review your qualifications and contact you if shortlisted.
                      </>
                    )}
                  </p>
                  <button
                    onClick={resetForm}
                    className="px-6 py-2.5 bg-black text-[#FFE500] font-bold text-xs rounded-xl hover:bg-slate-900 cursor-pointer"
                  >
                    Close & Return to Careers
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplySubmit} className="space-y-4">
                  {/* API / Validation Error Banner */}
                  {apiError && (
                    <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5">
                      <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
                      <div className="space-y-1">
                        <div className="font-bold text-rose-900">Application Submission Error</div>
                        <p className="leading-relaxed text-[11px] sm:text-xs">{apiError}</p>
                        {fieldErrors && Object.keys(fieldErrors).length > 0 && (
                          <ul className="list-disc list-inside mt-1 space-y-0.5 text-[11px] text-rose-700">
                            {Object.entries(fieldErrors).map(([field, msgs]) => (
                              <li key={field}>
                                <strong className="capitalize">{field.replace('_', ' ')}:</strong>{' '}
                                {Array.isArray(msgs) ? msgs.join(', ') : String(msgs)}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
                    <span>Department: <strong>{activeJobForApplication.department}</strong></span>
                    <span>Location: <strong>{activeJobForApplication.location}</strong></span>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input 
                      type="text"
                      required
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none focus:ring-2 ${
                        fieldErrors.full_name
                          ? 'border-rose-400 bg-rose-50/40 focus:ring-rose-400'
                          : 'border-slate-300 focus:ring-[#FFE500] focus:border-black'
                      }`}
                    />
                    {fieldErrors.full_name && (
                      <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {fieldErrors.full_name.join(', ')}
                      </p>
                    )}
                  </div>

                  {/* Email & Phone with real-time feedback */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input 
                        type="email"
                        required
                        value={applicantEmail}
                        onChange={(e) => {
                          setApplicantEmail(e.target.value);
                          if (!emailTouched) setEmailTouched(true);
                        }}
                        onBlur={() => setEmailTouched(true)}
                        placeholder="you@domain.com"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none focus:ring-2 ${
                          (emailTouched && !isEmailValid(applicantEmail)) || fieldErrors.email
                            ? 'border-rose-400 bg-rose-50/40 focus:ring-rose-400'
                            : 'border-slate-300 focus:ring-[#FFE500] focus:border-black'
                        }`}
                      />
                      {emailTouched && !isEmailValid(applicantEmail) && (
                        <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> Please enter a valid email address
                        </p>
                      )}
                      {fieldErrors.email && (
                        <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {fieldErrors.email.join(', ')}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        Mobile Phone / WhatsApp <span className="text-rose-500">*</span>
                      </label>
                      <input 
                        type="tel"
                        required
                        value={applicantPhone}
                        onChange={(e) => {
                          setApplicantPhone(e.target.value);
                          if (!phoneTouched) setPhoneTouched(true);
                        }}
                        onBlur={() => setPhoneTouched(true)}
                        placeholder="+971 50 123 4567"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none focus:ring-2 ${
                          (phoneTouched && !isPhoneValid(applicantPhone)) || fieldErrors.mobile_phone
                            ? 'border-rose-400 bg-rose-50/40 focus:ring-rose-400'
                            : 'border-slate-300 focus:ring-[#FFE500] focus:border-black'
                        }`}
                      />
                      {phoneTouched && !isPhoneValid(applicantPhone) && (
                        <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> Please enter a valid phone number (min 7 digits)
                        </p>
                      )}
                      {fieldErrors.mobile_phone && (
                        <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {fieldErrors.mobile_phone.join(', ')}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Experience & Notice Period */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        Total Experience <span className="text-rose-500">*</span>
                      </label>
                      <select
                        required
                        value={applicantExperience}
                        onChange={(e) => setApplicantExperience(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#FFE500] focus:border-black bg-white"
                      >
                        <option value="">Select Experience</option>
                        <option value="1 – 3 Years">1 – 3 Years</option>
                        <option value="3 – 5 Years">3 – 5 Years</option>
                        <option value="5 – 8 Years">5 – 8 Years</option>
                        <option value="8+ Years">8+ Years</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        Notice Period / UAE Availability <span className="text-rose-500">*</span>
                      </label>
                      <select
                        required
                        value={applicantNotice}
                        onChange={(e) => setApplicantNotice(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#FFE500] focus:border-black bg-white"
                      >
                        <option value="">Select Notice Period</option>
                        <option value="Immediate / Available in UAE">Immediate / Available in UAE</option>
                        <option value="15 Days">15 Days</option>
                        <option value="30 Days">30 Days</option>
                        <option value="Overseas / Relocating">Overseas / Relocating</option>
                      </select>
                    </div>
                  </div>

                  {/* Cover Note & Profile Summary */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      Professional Summary / Technical Qualifications
                    </label>
                    <textarea 
                      rows={3}
                      value={applicantNote}
                      onChange={(e) => setApplicantNote(e.target.value)}
                      placeholder="Brief summary of your background in outdoor furniture, security systems, or lighting engineering, project references, or LinkedIn profile..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#FFE500] focus:border-black resize-none"
                    />
                  </div>

                  {/* Resume / CV File Upload (Required: PDF, DOC, DOCX, Max 10MB) */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-bold text-slate-800">
                        Resume / Curriculum Vitae <span className="text-rose-500">*</span>
                      </label>
                      <span className="text-[11px] font-mono text-slate-500">
                        PDF, DOC, DOCX (Max 10 MB)
                      </span>
                    </div>

                    {!resumeFile ? (
                      <div
                        onDragOver={(e) => {
                          e.preventDefault();
                          setIsDragging(true);
                        }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`border-2 border-dashed rounded-xl p-4 sm:p-5 text-center cursor-pointer transition-all ${
                          isDragging
                            ? 'border-black bg-[#FFE500]/10'
                            : fileError || fieldErrors.resume
                            ? 'border-rose-400 bg-rose-50/40 hover:bg-rose-50/60'
                            : 'border-slate-300 bg-slate-50/60 hover:bg-slate-100 hover:border-slate-400'
                        }`}
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              validateAndSetFile(e.target.files[0]);
                            }
                          }}
                        />
                        <div className="flex flex-col items-center justify-center gap-1 text-slate-600">
                          <div className="w-8 h-8 rounded-full bg-white shadow-xs border border-slate-200 flex items-center justify-center text-slate-700">
                            <UploadCloud className="w-4 h-4 text-black" />
                          </div>
                          <div className="text-xs font-bold text-slate-800">
                            Click to browse or drag & drop your Resume / CV
                          </div>
                          <div className="text-[11px] text-slate-500">
                            Required format: PDF, DOC, or DOCX • Maximum file size: 10 MB
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-300">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-8 h-8 rounded-lg bg-black text-[#FFE500] flex items-center justify-center shrink-0">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-slate-900 truncate">
                              {resumeFile.name}
                            </p>
                            <p className="text-[11px] font-mono text-slate-500">
                              {(resumeFile.size / (1024 * 1024)).toFixed(2)} MB • File verified
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setResumeFile(null);
                            setFileError(null);
                            if (fileInputRef.current) fileInputRef.current.value = '';
                          }}
                          className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
                          title="Remove file"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    {fileError && (
                      <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {fileError}
                      </p>
                    )}
                    {fieldErrors.resume && (
                      <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {fieldErrors.resume.join(', ')}
                      </p>
                    )}
                  </div>

                  {/* Submit & Cancel Buttons */}
                  <div className="pt-2 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-2.5 rounded-xl bg-[#FFE500] hover:bg-[#F5DC00] text-black font-extrabold text-xs tracking-tight shadow-md flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Submitting Application to Meglux HR...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Application</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
