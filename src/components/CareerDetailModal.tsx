import React, { useState, useRef } from 'react';
import { 
  X, 
  Briefcase, 
  MapPin, 
  Clock, 
  Award, 
  CheckCircle2, 
  Send, 
  AlertCircle,
  FileText,
  Building2,
  DollarSign,
  GraduationCap,
  UploadCloud,
  Loader2
} from 'lucide-react';
import { CmsCareer } from '../types';
import { parseStringOrArray, stripHtml, submitCareerApplication } from '../services/cmsApi';

interface CareerDetailModalProps {
  career: CmsCareer | null;
  onClose: () => void;
}

export const CareerDetailModal: React.FC<CareerDetailModalProps> = ({ career, onClose }) => {
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean>(false);
  const [apiSuccessMessage, setApiSuccessMessage] = useState<string | null>(null);
  const [submittedApplicantName, setSubmittedApplicantName] = useState('');
  const [apiError, setApiError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  if (!career) return null;

  const responsibilities = parseStringOrArray(career.responsibilities);
  const requirements = parseStringOrArray(career.requirements);
  const skills = parseStringOrArray(career.skills);
  const cleanRoleDesc = stripHtml(career.role_description);

  const validateAndSetFile = (file: File | null) => {
    setFileError(null);
    if (!file) {
      setResumeFile(null);
      return;
    }
    const MAX_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB
    if (file.size > MAX_SIZE_BYTES) {
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      setFileError(`Resume size (${sizeMb} MB) exceeds 10 MB limit.`);
      setResumeFile(null);
      return;
    }
    const allowed = ['.pdf', '.doc', '.docx'];
    const nameLower = file.name.toLowerCase();
    if (!allowed.some(ext => nameLower.endsWith(ext))) {
      setFileError('Invalid format. Only PDF, DOC, or DOCX resume files are supported.');
      setResumeFile(null);
      return;
    }
    setResumeFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    setFieldErrors({});

    if (!applicantName.trim() || !applicantEmail.trim()) {
      return;
    }

    if (!resumeFile) {
      setFileError('Resume / CV is required (PDF, DOC, or DOCX format, max 10 MB).');
      return;
    }

    const dynamicSlug = career.slug || String(career.id) || 'career-application';

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
        resume: resumeFile
      });

      if (result.success) {
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
        setFieldErrors({});
        if (fileInputRef.current) fileInputRef.current.value = '';
      } else {
        setApiError(result.message || 'Unable to submit application.');
        if (result.errors) setFieldErrors(result.errors);
      }
    } catch (err: any) {
      setApiError(err?.message || 'Network error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-1 rounded-md text-[10px] font-black bg-[#FFE500] text-black uppercase tracking-wider font-mono">
              {career.department || 'Engineering & Operations'}
            </span>
            {career.is_urgent && (
              <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-rose-600 text-white uppercase font-mono animate-pulse">
                Urgent Hiring
              </span>
            )}
            {career.is_featured && (
              <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-slate-900 text-white uppercase font-mono">
                Featured Position
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-200/80 hover:bg-slate-300 flex items-center justify-center text-slate-700 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 sm:p-8 flex-1 overflow-y-auto space-y-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 font-display">
              {career.title}
            </h2>
            <div className="flex items-center gap-4 text-xs text-slate-500 font-mono mt-2 flex-wrap">
              {career.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-black" />
                  <span>{career.location}</span>
                </div>
              )}
              {career.employment_type && (
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-black" />
                  <span>{career.employment_type}</span>
                </div>
              )}
              {career.experience && (
                <div className="flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5 text-black" />
                  <span>{career.experience}</span>
                </div>
              )}
              {career.salary_range && (
                <div className="flex items-center gap-1 text-slate-700 font-bold">
                  <DollarSign className="w-3.5 h-3.5 text-black" />
                  <span>{career.salary_range}</span>
                </div>
              )}
            </div>
          </div>

          {career.short_description && (
            <p className="text-sm text-slate-700 leading-relaxed font-medium bg-slate-50 p-4 rounded-xl border border-slate-100">
              {career.short_description}
            </p>
          )}

          {cleanRoleDesc && (
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                Role Description:
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {cleanRoleDesc}
              </p>
            </div>
          )}

          {responsibilities.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                Key Responsibilities:
              </h4>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
                {responsibilities.map((r, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-black shrink-0 mt-0.5" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {requirements.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                Candidate Requirements:
              </h4>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
                {requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Extra Qualifications */}
          {(career.education || career.license_requirement || career.language_requirement || skills.length > 0) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
              {career.education && (
                <div>
                  <span className="font-mono font-bold text-slate-500 uppercase block">Education:</span>
                  <span className="text-slate-800 font-medium">{career.education}</span>
                </div>
              )}
              {career.license_requirement && (
                <div>
                  <span className="font-mono font-bold text-slate-500 uppercase block">License:</span>
                  <span className="text-slate-800 font-medium">{career.license_requirement}</span>
                </div>
              )}
              {career.language_requirement && (
                <div>
                  <span className="font-mono font-bold text-slate-500 uppercase block">Languages:</span>
                  <span className="text-slate-800 font-medium">{career.language_requirement}</span>
                </div>
              )}
              {skills.length > 0 && (
                <div className="sm:col-span-2">
                  <span className="font-mono font-bold text-slate-500 uppercase block mb-1">Key Skills:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.map((s, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-800 font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Direct Application Form */}
          <div className="pt-4 border-t border-slate-200">
            <h3 className="text-base font-black text-slate-950 font-display mb-4">
              Apply For This Position
            </h3>

            {submissionSuccess ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold text-emerald-950">Application Received</h4>
                <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed max-w-md mx-auto">
                  {apiSuccessMessage || (
                    <>
                      Thank you, <span className="font-bold">{submittedApplicantName || 'Applicant'}</span>. Your application for <span className="font-bold">{career.title}</span> has been submitted successfully. Our HR team will review your qualifications and contact you if shortlisted.
                    </>
                  )}
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-3 px-5 py-2 bg-slate-950 text-white rounded-xl text-xs font-bold hover:bg-slate-800 cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {apiError && (
                  <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
                    <div className="space-y-1">
                      <div className="font-bold text-rose-900">Submission Error</div>
                      <p className="leading-relaxed text-[11px] sm:text-xs">{apiError}</p>
                      {fieldErrors && Object.keys(fieldErrors).length > 0 && (
                        <ul className="list-disc list-inside mt-1 space-y-0.5 text-[11px] text-rose-700">
                          {Object.entries(fieldErrors).map(([field, msgs]) => (
                            <li key={field}>
                              <strong className="capitalize">{field.replace('_', ' ')}:</strong> {Array.isArray(msgs) ? msgs.join(', ') : String(msgs)}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-black outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={applicantEmail}
                      onChange={(e) => setApplicantEmail(e.target.value)}
                      placeholder="e.g. name@domain.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-black outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Contact Phone (UAE / GCC) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={applicantPhone}
                      onChange={(e) => setApplicantPhone(e.target.value)}
                      placeholder="+971 50 123 4567"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-black outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Total Experience *
                    </label>
                    <select
                      required
                      value={applicantExperience}
                      onChange={(e) => setApplicantExperience(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-black outline-none bg-white"
                    >
                      <option value="">Select Experience</option>
                      <option value="1 – 3 Years">1 – 3 Years</option>
                      <option value="3 – 5 Years">3 – 5 Years</option>
                      <option value="5 – 8 Years">5 – 8 Years</option>
                      <option value="8+ Years">8+ Years</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Notice Period / Availability *
                  </label>
                  <select
                    required
                    value={applicantNotice}
                    onChange={(e) => setApplicantNotice(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-black outline-none bg-white"
                  >
                    <option value="">Select Notice Period</option>
                    <option value="Immediate / Available in UAE">Immediate / Available in UAE</option>
                    <option value="15 Days">15 Days</option>
                    <option value="30 Days">30 Days</option>
                    <option value="Overseas / Relocating">Overseas / Relocating</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Cover Note / Relevant Highlights
                  </label>
                  <textarea
                    rows={3}
                    value={applicantNote}
                    onChange={(e) => setApplicantNote(e.target.value)}
                    placeholder="Briefly describe your key qualifications and availability..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-black outline-none"
                  />
                </div>

                {/* Resume / CV Upload */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-slate-700">
                      Resume / CV (PDF, DOC, DOCX - Max 10 MB) *
                    </label>
                  </div>

                  {!resumeFile ? (
                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                      }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setIsDragging(false);
                        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                          validateAndSetFile(e.dataTransfer.files[0]);
                        }
                      }}
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${
                        isDragging ? 'border-black bg-slate-100' : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
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
                        <UploadCloud className="w-5 h-5 text-slate-700" />
                        <span className="text-xs font-bold text-slate-800">
                          Click to upload or drag & drop Resume / CV
                        </span>
                        <span className="text-[10px] text-slate-500">
                          PDF, DOC, DOCX up to 10 MB
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-black" />
                        <div>
                          <p className="text-xs font-bold text-slate-900 truncate">{resumeFile.name}</p>
                          <p className="text-[10px] font-mono text-slate-500">
                            {(resumeFile.size / (1024 * 1024)).toFixed(2)} MB
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
                        className="p-1 text-slate-400 hover:text-slate-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {fileError && (
                    <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {fileError}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Submitting Application...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Application</span>
                        <Send className="w-3.5 h-3.5 text-[#FFE500]" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
