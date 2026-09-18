import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  MessageSquare,
  ShieldCheck,
  User,
  AlertCircle,
  Upload,
  Globe,
  FileText,
  FileCode,
  Image as ImageIcon,
  Loader2,
  X
} from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { DubaiMap } from '../components/DubaiMap';
import { submitProjectEnquiry } from '../services/cmsApi';

const ALLOWED_CATEGORIES = [
  'Lighting',
  'Outdoor Furniture / Street Furniture',
  'Security Systems'
] as const;

const ALLOWED_EXTENSIONS = ['pdf', 'jpg', 'jpeg', 'png', 'dwg'];
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

export const ContactView: React.FC = () => {
  const { settings } = useCms();

  const companyName = settings.company_name || 'meglux';
  const address = settings.address || 'Bldg No. 26 - 26 6A Street - Al Qouz Ind.third - Al Quoz - Dubai - United Arab Emirates';
  const officeHours = settings.office_hours || 'Monday – Friday: 08:00 AM – 06:00 PM (GST)';
  const website = settings.website || 'https://www.megaluxintl.com';

  // Dynamic phone numbers driven by CMS settings
  const allPhones = useMemo(() => {
    const defaultLabels = [
      'Main Switchboard',
      'Direct Office',
      'Mobile / WhatsApp',
      'Project Operations',
      'Office Fax'
    ];

    const rawPhones = Array.isArray(settings.phone_numbers) && settings.phone_numbers.length > 0
      ? settings.phone_numbers
      : ['+971 4 5803082'];

    return rawPhones.map((num, idx) => ({
      number: num.trim(),
      label: defaultLabels[idx] || `Line ${idx + 1}`
    }));
  }, [settings.phone_numbers]);

  // Dynamic emails driven by CMS settings
  const allEmails = useMemo(() => {
    const defaultLabels = [
      'Sales Desk',
      'Corporate & General Inquiries',
      'Technical Support',
      'Procurement Desk'
    ];

    const rawEmails = Array.isArray(settings.email_addresses) && settings.email_addresses.length > 0
      ? settings.email_addresses
      : ['sales@megaluxintl.com', 'info@megaluxintl.com'];

    return rawEmails.map((em, idx) => ({
      email: em.trim(),
      label: defaultLabels[idx] || `Email Desk ${idx + 1}`
    }));
  }, [settings.email_addresses]);

  // Form State
  const [formData, setFormData] = useState({
    full_name: '',
    company: '',
    email: '',
    phone: '',
    project_location: 'Dubai / UAE',
    product_category: 'Lighting',
    message: '',
    attachment: null as File | null
  });

  const [dragOver, setDragOver] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [fileError, setFileError] = useState<string | null>(null);

  const validateEmail = (email: string): boolean => {
    const trimmed = email.trim();
    if (!trimmed) return false;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(trimmed);
  };

  const handleFileChange = (file: File | null) => {
    if (!file) {
      setFormData(prev => ({ ...prev, attachment: null }));
      setFileError(null);
      return;
    }

    const ext = file.name.split('.').pop()?.toLowerCase() || '';
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      setFileError(`Unsupported format for "${file.name}". Supported formats: PDF, JPG, JPEG, PNG, DWG (max 10MB).`);
      setFormData(prev => ({ ...prev, attachment: null }));
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
      setFileError(`File "${file.name}" (${sizeMb} MB) exceeds the maximum 10 MB limit.`);
      setFormData(prev => ({ ...prev, attachment: null }));
      return;
    }

    setFileError(null);
    setFormData(prev => ({ ...prev, attachment: file }));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const removeAttachment = () => {
    setFormData(prev => ({ ...prev, attachment: null }));
    setFileError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setGeneralError(null);
    const errors: Record<string, string> = {};

    if (!formData.full_name.trim()) {
      errors.full_name = 'Full name is required.';
    }

    if (!formData.email.trim()) {
      errors.email = 'Corporate email is required.';
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid corporate email address (e.g. name@company.com).';
    }

    if (!formData.product_category || !ALLOWED_CATEGORIES.includes(formData.product_category as any)) {
      errors.product_category = 'Please select a valid product category.';
    }

    if (!formData.message.trim()) {
      errors.message = 'Message & technical specifications are required.';
    }

    if (fileError) {
      errors.attachment = fileError;
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setGeneralError('Unable to submit your enquiry at the moment. Please check the highlighted fields and try again.');
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);

    try {
      const result = await submitProjectEnquiry({
        full_name: formData.full_name,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        project_location: formData.project_location,
        product_category: formData.product_category,
        message: formData.message,
        attachment: formData.attachment
      });

      if (result.success) {
        setSubmitted(true);
        setSuccessMessage(
          'Thank you. Your enquiry has been submitted successfully. Our Meglux specialists will review your requirements and get in touch with you shortly.'
        );
        setFormData({
          full_name: '',
          company: '',
          email: '',
          phone: '',
          project_location: 'Dubai / UAE',
          product_category: 'Lighting',
          message: '',
          attachment: null
        });
        setFieldErrors({});
        setGeneralError(null);
      } else {
        setGeneralError(
          result.message || 'Unable to submit your enquiry at the moment. Please check the highlighted fields and try again.'
        );
        if (result.errors) {
          const backendErrors: Record<string, string> = {};
          Object.entries(result.errors).forEach(([field, msgs]) => {
            if (Array.isArray(msgs) && msgs.length > 0) {
              backendErrors[field] = msgs[0];
            }
          });
          setFieldErrors(backendErrors);
        }
      }
    } catch (err) {
      console.error('Submission error:', err);
      setGeneralError('Something went wrong while submitting your enquiry. Please try again in a moment.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-12 sm:space-y-16 py-8 pb-16">
      {/* Contact Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white border border-slate-200 p-8 sm:p-12 relative overflow-hidden shadow-xl">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#FFE500] text-black text-xs font-black uppercase tracking-wider font-mono">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Project Engagement</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 font-display tracking-tight leading-tight">
              Contact Megalux International
            </h1>

            <p className="text-base text-slate-700 leading-relaxed font-medium">
              Connect directly with our Dubai lighting and perimeter security specialists for technical submittals, photometrics, crash-test data, and competitive project quotations.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid: Form (Col 7) + Contact Cards (Col 5) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xl space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-extrabold text-slate-950 font-display">
                Request a Consultation & Project Quotation
              </h2>
              <p className="text-xs text-slate-600 font-medium">
                Submit your project specifications, location, and plan drawings or BoQs for technical review.
              </p>
            </div>

            {submitted ? (
              <div className="py-12 text-center space-y-5 max-w-md mx-auto animate-in fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-black text-slate-950 font-display">
                    Enquiry Submitted Successfully
                  </h3>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    {successMessage || 'Thank you. Your enquiry has been submitted successfully. Our Meglux specialists will review your requirements and get in touch with you shortly.'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2 text-xs">
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-500 font-medium">Corporate Email:</span>
                    <span className="text-slate-900 font-bold font-mono">sales@megaluxintl.com</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Main Switchboard:</span>
                    <span className="text-slate-900 font-bold font-mono">{allPhones[0]?.number || '+971 4 5803082'}</span>
                  </div>
                </div>

                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-3 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer shadow-md"
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                {/* General Error Message Banner */}
                {generalError && (
                  <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-start gap-2 animate-in fade-in">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <div className="flex-1">{generalError}</div>
                    <button 
                      type="button" 
                      onClick={() => setGeneralError(null)} 
                      className="text-rose-500 hover:text-rose-800 cursor-pointer p-0.5"
                      aria-label="Dismiss error"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name (Required) */}
                  <div className="space-y-1.5">
                    <label className="block text-slate-800 font-bold">Full Name *</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Eng. / Mr. Full Name"
                        value={formData.full_name}
                        onChange={(e) => {
                          setFormData({ ...formData, full_name: e.target.value });
                          if (fieldErrors.full_name) {
                            setFieldErrors(prev => ({ ...prev, full_name: '' }));
                          }
                        }}
                        className={`w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-50 border focus:border-slate-900 text-slate-900 outline-none transition-colors font-medium ${
                          fieldErrors.full_name ? 'border-rose-400 bg-rose-50/40' : 'border-slate-200'
                        }`}
                      />
                    </div>
                    {fieldErrors.full_name && (
                      <p className="text-[11px] text-rose-600 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {fieldErrors.full_name}
                      </p>
                    )}
                  </div>

                  {/* Company / Organization (Optional) */}
                  <div className="space-y-1.5">
                    <label className="block text-slate-800 font-bold">Company / Organization</label>
                    <div className="relative">
                      <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Company, Consultant, Developer"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-slate-900 text-slate-900 outline-none transition-colors font-medium"
                      />
                    </div>
                  </div>

                  {/* Corporate Email (Required) */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="block text-slate-800 font-bold">Corporate Email *</label>
                    </div>
                    <div className="relative">
                      <Mail className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${fieldErrors.email ? 'text-rose-500' : 'text-slate-400'}`} />
                      <input
                        type="email"
                        required
                        placeholder="name@company.com"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (fieldErrors.email) {
                            setFieldErrors(prev => ({ ...prev, email: '' }));
                          }
                        }}
                        className={`w-full pl-10 pr-10 py-2.5 rounded-xl outline-none transition-colors font-medium ${
                          fieldErrors.email 
                            ? 'bg-rose-50/40 border border-rose-400 text-rose-950 focus:border-rose-600' 
                            : formData.email && validateEmail(formData.email)
                            ? 'bg-emerald-50/20 border border-emerald-400/60 focus:border-emerald-600 text-slate-900'
                            : 'bg-slate-50 border border-slate-200 focus:border-slate-900 text-slate-900'
                        }`}
                      />
                      {formData.email && validateEmail(formData.email) && !fieldErrors.email && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      )}
                    </div>
                    {fieldErrors.email && (
                      <p className="text-[11px] text-rose-600 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {fieldErrors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone / Mobile (Optional) */}
                  <div className="space-y-1.5">
                    <label className="block text-slate-800 font-bold">Phone / Mobile</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        placeholder="+971 50 123 4567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-slate-900 text-slate-900 outline-none transition-colors font-medium"
                      />
                    </div>
                  </div>

                  {/* Project Location (Optional) */}
                  <div className="space-y-1.5">
                    <label className="block text-slate-800 font-bold">Project Location</label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="e.g. Dubai, Abu Dhabi, Riyadh, Doha"
                        value={formData.project_location}
                        onChange={(e) => setFormData({ ...formData, project_location: e.target.value })}
                        className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-slate-900 text-slate-900 outline-none transition-colors font-medium"
                      />
                    </div>
                  </div>

                  {/* Product Category (Required - 3 allowed values) */}
                  <div className="space-y-1.5">
                    <label className="block text-slate-800 font-bold">Product Category *</label>
                    <select
                      required
                      value={formData.product_category}
                      onChange={(e) => {
                        setFormData({ ...formData, product_category: e.target.value });
                        if (fieldErrors.product_category) {
                          setFieldErrors(prev => ({ ...prev, product_category: '' }));
                        }
                      }}
                      className={`w-full px-3 py-2.5 rounded-xl bg-slate-50 border focus:border-slate-900 text-slate-900 outline-none transition-colors font-medium cursor-pointer ${
                        fieldErrors.product_category ? 'border-rose-400 bg-rose-50/40' : 'border-slate-200'
                      }`}
                    >
                      <option value="">Select Category *</option>
                      <option value="Lighting">Lighting</option>
                      <option value="Outdoor Furniture / Street Furniture">Outdoor Furniture / Street Furniture</option>
                      <option value="Security Systems">Security Systems</option>
                    </select>
                    {fieldErrors.product_category && (
                      <p className="text-[11px] text-rose-600 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {fieldErrors.product_category}
                      </p>
                    )}
                  </div>
                </div>

                {/* Message & Technical Specifications (Required) */}
                <div className="space-y-1.5">
                  <label className="block text-slate-800 font-bold">Message & Technical Specifications *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Outline your scope, required lumen parameters, crash rating criteria, or tender timeline..."
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (fieldErrors.message) {
                        setFieldErrors(prev => ({ ...prev, message: '' }));
                      }
                    }}
                    className={`w-full p-3.5 rounded-xl bg-slate-50 border focus:border-slate-900 text-slate-900 outline-none transition-colors font-medium ${
                      fieldErrors.message ? 'border-rose-400 bg-rose-50/40' : 'border-slate-200'
                    }`}
                  />
                  {fieldErrors.message && (
                    <p className="text-[11px] text-rose-600 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {fieldErrors.message}
                    </p>
                  )}
                </div>

                {/* Optional Attachment (.pdf, .jpg, .jpeg, .png, .dwg; max 10MB) */}
                <div className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <label className="block text-slate-800 font-bold">
                      Optional Plan Drawings / BoQ / Document (.pdf, .jpg, .jpeg, .png, .dwg)
                    </label>
                    <div className="flex items-center gap-1 text-[10px] font-mono text-slate-500 font-semibold">
                      <span className="px-1.5 py-0.5 rounded bg-red-100 text-red-700 font-bold">PDF</span>
                      <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 font-bold">JPG</span>
                      <span className="px-1.5 py-0.5 rounded bg-sky-100 text-sky-700 font-bold">PNG</span>
                      <span className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 font-bold">DWG</span>
                      <span className="text-slate-400">Max 10MB</span>
                    </div>
                  </div>

                  {fileError && (
                    <div className="flex items-start justify-between gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium animate-in fade-in">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                        <span>{fileError}</span>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => setFileError(null)}
                        className="text-rose-500 hover:text-rose-800 p-0.5 cursor-pointer"
                        aria-label="Dismiss file error"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  {formData.attachment ? (
                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-100 border border-slate-200 text-xs font-medium">
                      <div className="flex items-center gap-2.5 text-slate-900 truncate">
                        {formData.attachment.name.toLowerCase().endsWith('.pdf') && (
                          <span className="px-1.5 py-0.5 rounded bg-red-100 border border-red-200 text-red-700 text-[10px] font-mono font-black shrink-0 flex items-center gap-1">
                            <FileText className="w-3 h-3" /> PDF
                          </span>
                        )}
                        {formData.attachment.name.toLowerCase().endsWith('.dwg') && (
                          <span className="px-1.5 py-0.5 rounded bg-blue-100 border border-blue-200 text-blue-700 text-[10px] font-mono font-black shrink-0 flex items-center gap-1">
                            <FileCode className="w-3 h-3" /> DWG
                          </span>
                        )}
                        {(formData.attachment.name.toLowerCase().endsWith('.png') ||
                          formData.attachment.name.toLowerCase().endsWith('.jpg') ||
                          formData.attachment.name.toLowerCase().endsWith('.jpeg')) && (
                          <span className="px-1.5 py-0.5 rounded bg-sky-100 border border-sky-200 text-sky-700 text-[10px] font-mono font-black shrink-0 flex items-center gap-1">
                            <ImageIcon className="w-3 h-3" /> IMAGE
                          </span>
                        )}
                        <span className="truncate font-bold">{formData.attachment.name}</span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          ({(formData.attachment.size / (1024 * 1024)).toFixed(2)} MB)
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={removeAttachment}
                        className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer transition-colors"
                        title="Remove attachment"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div
                      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                      onDragLeave={() => setDragOver(false)}
                      onDrop={handleDrop}
                      className={`relative p-5 rounded-2xl border-2 border-dashed transition-all text-center cursor-pointer ${
                        dragOver ? 'border-[#FFE500] bg-yellow-50' : 'border-slate-300 bg-slate-50 hover:border-slate-400'
                      }`}
                    >
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png,.dwg,application/pdf,image/jpeg,image/png"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleFileChange(e.target.files[0]);
                            e.target.value = '';
                          }
                        }}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />
                      <div className="flex flex-col items-center justify-center space-y-1 pointer-events-none">
                        <Upload className="w-5 h-5 text-slate-800" />
                        <span className="font-bold text-slate-900 text-xs">Drag and drop document or click to browse</span>
                        <span className="text-[11px] text-slate-600 font-medium">
                          Supported: <strong className="text-slate-900">.pdf</strong>, <strong className="text-slate-900">.jpg</strong>, <strong className="text-slate-900">.png</strong>, <strong className="text-slate-900">.dwg</strong> (max 10MB)
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-[#FFE500] hover:bg-[#F5DC00] text-black text-sm font-black tracking-tight transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 border border-black/10"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-black" />
                        <span>Submitting Enquiry...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 stroke-[2.5]" />
                        <span>Submit Enquiry to Megalux Specialists</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Contact Details Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Corporate Location Card */}
            <div className="rounded-3xl bg-white border border-slate-200 p-6 space-y-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FFE500] text-black flex items-center justify-center shadow-xs">
                  <Building2 className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-950 font-display">
                    {companyName}
                  </h3>
                  <span className="text-xs text-slate-600 font-mono font-bold">Dubai Headquarters</span>
                </div>
              </div>

              <div className="space-y-3.5 text-xs text-slate-700 font-medium pt-2 border-t border-slate-100">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-slate-900 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-950 font-bold block leading-relaxed">{address}</span>
                  </div>
                </div>

                {/* Multiple Phone Numbers */}
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-slate-900 shrink-0 mt-1" />
                  <div className="space-y-1.5 w-full">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block font-mono">
                      Telephone & Mobile Numbers
                    </span>
                    <div className="space-y-1.5">
                      {allPhones.map((p, idx) => (
                        <div key={idx} className="flex items-center justify-between gap-2 text-xs">
                          <a 
                            href={`tel:${p.number.replace(/[\s\-\(\)]/g, '')}`} 
                            className="text-slate-950 font-bold hover:text-amber-600 transition-colors font-mono"
                          >
                            {p.number}
                          </a>
                          <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-600 font-medium">
                            {p.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Multiple Email Addresses */}
                <div className="flex items-start gap-3 pt-1 border-t border-slate-100">
                  <Mail className="w-4 h-4 text-slate-900 shrink-0 mt-1" />
                  <div className="space-y-1.5 w-full">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block font-mono">
                      Official Email Contacts
                    </span>
                    <div className="space-y-1.5">
                      {allEmails.map((m, idx) => (
                        <div key={idx} className="flex items-center justify-between gap-2 text-xs">
                          <a 
                            href={`mailto:${m.email}`} 
                            className="text-slate-950 font-bold hover:text-amber-600 transition-colors truncate"
                          >
                            {m.email}
                          </a>
                          <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-600 font-medium shrink-0">
                            {m.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-slate-900 shrink-0" />
                  <span className="text-slate-900 font-bold">{website}</span>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-slate-900 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-950 font-bold block">Office Hours</span>
                    <span className="text-slate-600">{officeHours}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Consultation Assurance Box */}
            <div className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 space-y-3 shadow-xl">
              <div className="flex items-center gap-2 text-xs font-black text-[#FFE500] font-mono uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Our Turnaround Guarantee</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                All tender documents, Bill of Quantities (BoQ), and architectural submittal requests received are assigned to a dedicated Dubai project engineer within 4 hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Dubai Interactive Map Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-black bg-[#FFE500] px-3 py-1 rounded-md font-mono inline-block">
              Location & Logistics
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950 font-display">
              Dubai Headquarters & Regional Distribution Hub
            </h2>
          </div>
          <DubaiMap />
        </div>
      </section>
    </div>
  );
};
