import React, { useState, useEffect } from 'react';
import { 
  X, 
  Upload, 
  CheckCircle2, 
  Send, 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  User, 
  ShieldCheck,
  AlertCircle,
  FileText,
  FileCode,
  Image as ImageIcon,
  Loader2
} from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { submitProjectEnquiry } from '../services/cmsApi';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProductCategory?: string;
  initialProjectTitle?: string;
  rfqProducts?: string[];
}

const ALLOWED_CATEGORIES = [
  'Lighting',
  'Outdoor Furniture / Street Furniture',
  'Security Systems'
] as const;

const ALLOWED_EXTENSIONS = ['pdf', 'jpg', 'jpeg', 'png', 'dwg'];
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

function normalizeCategory(cat?: string): string {
  if (!cat || cat === 'all') return 'Lighting';
  const c = cat.toLowerCase();
  if (c.includes('furnit') || c.includes('outdoor') || c.includes('street') || c.includes('bench') || c.includes('planter')) {
    return 'Outdoor Furniture / Street Furniture';
  }
  if (c.includes('secur') || c.includes('bollard') || c.includes('barrier') || c.includes('blocker')) {
    return 'Security Systems';
  }
  return 'Lighting';
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  initialProductCategory = 'all',
  initialProjectTitle,
  rfqProducts = []
}) => {
  const { settings } = useCms();
  const phoneContact = settings.phone_numbers?.[0] || '+971 4 5803082';

  const [formData, setFormData] = useState({
    full_name: '',
    company: '',
    email: '',
    phone: '',
    project_location: 'Dubai / UAE',
    product_category: normalizeCategory(initialProductCategory),
    message: initialProjectTitle ? `Inquiring regarding project specifications for: ${initialProjectTitle}` : '',
    attachment: null as File | null
  });

  const [dragOver, setDragOver] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [fileError, setFileError] = useState<string | null>(null);

  // Sync initialCategory when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({
        ...prev,
        product_category: normalizeCategory(initialProductCategory),
        message: initialProjectTitle 
          ? `Inquiring regarding project specifications for: ${initialProjectTitle}`
          : prev.message
      }));
      setGeneralError(null);
      setFieldErrors({});
      setFileError(null);
    }
  }, [isOpen, initialProductCategory, initialProjectTitle]);

  if (!isOpen) return null;

  const validateEmail = (val: string): boolean => {
    const trimmed = val.trim();
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
        // Reset form data
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#FFE500] text-black flex items-center justify-center font-bold">
              <Building2 className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-950 font-display">
                Request a Consultation & Project Quotation
              </h2>
              <p className="text-[11px] text-slate-500 font-medium">
                Megalux International Dubai Engineering Desk
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-500 hover:text-black hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          {submitted ? (
            <div className="py-10 text-center space-y-5 max-w-md mx-auto animate-in fade-in">
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
                  <span className="text-slate-500 font-medium">Dubai Engineering Desk:</span>
                  <span className="text-slate-900 font-bold font-mono">{phoneContact}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Direct Sales Email:</span>
                  <span className="text-slate-900 font-bold font-mono">sales@megaluxintl.com</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <button
                  onClick={() => setSubmitted(false)}
                  className="flex-1 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
                >
                  Submit Another Enquiry
                </button>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="flex-1 py-3 rounded-xl bg-[#FFE500] hover:bg-[#F5DC00] text-black text-xs font-black tracking-tight transition-all shadow-md cursor-pointer border border-black/10"
                >
                  Close & Return
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Project Details Guide Box */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-slate-900 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-700 space-y-1 font-medium">
                  <span className="font-bold text-slate-950 block">Share Your Project Requirements</span>
                  <p className="text-slate-600 leading-relaxed">
                    Provide system technical specifications, project location, and optional plan drawings or BoQs for consultant-grade submittals, photometrics, and competitive supply proposals.
                  </p>
                </div>
              </div>

              {/* RFQ items attached preview if any */}
              {rfqProducts.length > 0 && (
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                  <span className="text-slate-600 font-mono font-bold text-[10px] uppercase block mb-1">Attached RFQ Specifications:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {rfqProducts.map((pName, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-900 font-bold text-[11px]">
                        ✓ {pName}
                      </span>
                    ))}
                  </div>
                </div>
              )}

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

              {/* Form Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
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
                      placeholder="Consultant, Contractor, Developer"
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
              <div className="space-y-1.5 text-xs">
                <label className="block text-slate-800 font-bold">
                  Message & Technical Specifications *
                </label>
                <textarea 
                  rows={3}
                  required
                  placeholder="Detail your system requirements, quantities, crash test ratings, photometrics, or submittal deadlines..."
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

              {/* Optional Attachment (PDF, JPG, JPEG, PNG, DWG; max 10MB) */}
              <div className="space-y-2 text-xs">
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

              {/* Submit Button */}
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
                <span className="block text-[11px] text-slate-500 text-center mt-2 font-medium">
                  Direct Dubai Enquiry Desk: sales@megaluxintl.com | Tel: {phoneContact}
                </span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
