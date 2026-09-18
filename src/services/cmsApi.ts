import { 
  CmsSettings, 
  CmsCategory, 
  CmsProduct, 
  CmsProject, 
  CmsGalleryItem, 
  CmsClient, 
  CmsTestimonial, 
  CmsCareer,
  Product,
  Project,
  JobOpening,
  GalleryItem
} from '../types';

export const CMS_BASE_URL = 'https://meglux.springstrdg.com/api';
export const CMS_HOST = 'https://meglux.springstrdg.com';

/**
 * Normalizes and resolves full image URLs returned by Laravel backend.
 * Uses the URL returned by the API directly or prefixes the CMS host when given a relative /storage/ path.
 * No hardcoded fallback photos.
 */
export function resolveImageUrl(path: string | null | undefined): string {
  if (!path || typeof path !== 'string' || path.trim() === '') {
    return '';
  }
  const cleanPath = path.trim();
  if (cleanPath.startsWith('http://') || cleanPath.startsWith('https://')) {
    return cleanPath;
  }
  if (cleanPath.startsWith('/storage/')) {
    return `${CMS_HOST}${cleanPath}`;
  }
  if (cleanPath.startsWith('storage/')) {
    return `${CMS_HOST}/${cleanPath}`;
  }
  if (
    cleanPath.startsWith('categories/') ||
    cleanPath.startsWith('products/') ||
    cleanPath.startsWith('projects/') ||
    cleanPath.startsWith('gallery/') ||
    cleanPath.startsWith('clients/') ||
    cleanPath.startsWith('testimonials/') ||
    cleanPath.startsWith('settings/')
  ) {
    return `${CMS_HOST}/storage/${cleanPath}`;
  }
  if (cleanPath.startsWith('/')) {
    return `${CMS_HOST}${cleanPath}`;
  }
  return `${CMS_HOST}/storage/${cleanPath}`;
}

/**
 * Safely parse comma-separated string or array into array of strings.
 */
export function parseStringOrArray(val: string[] | string | null | undefined): string[] {
  if (!val) return [];
  if (Array.isArray(val)) return val.map(s => String(s).trim()).filter(Boolean);
  if (typeof val === 'string') {
    return val.split(',').map(s => s.trim()).filter(Boolean);
  }
  return [];
}

/**
 * Strip HTML tags from overview / description.
 */
export function stripHtml(html: string | null | undefined): string {
  if (!html) return '';
  return html.replace(/<[^>]*>?/gm, '').trim();
}

/**
 * Maps a CMS Product to the frontend Product structure for seamless UI compatibility.
 */
export function mapCmsProductToProduct(cmsP: CmsProduct): Product {
  const images = (cmsP.images && cmsP.images.length > 0)
    ? cmsP.images.map(img => resolveImageUrl(img)).filter(Boolean)
    : [];

  const categorySlug = cmsP.category?.slug || '';
  let categoryKey: any = 'outdoor-furniture';
  if (categorySlug.includes('security') || cmsP.name.toLowerCase().includes('bollard') || cmsP.name.toLowerCase().includes('barrier')) {
    categoryKey = 'security-systems';
  } else if (categorySlug.includes('lighting') || cmsP.name.toLowerCase().includes('light') || cmsP.name.toLowerCase().includes('sconce')) {
    categoryKey = 'lighting';
  } else if (categorySlug.includes('furniture') || categorySlug.includes('bench')) {
    categoryKey = 'outdoor-furniture';
  }

  const applications = parseStringOrArray(cmsP.recommended_applications);
  const finishes = parseStringOrArray(cmsP.available_finishes);

  return {
    id: String(cmsP.id),
    slug: cmsP.slug,
    name: cmsP.name,
    category: categoryKey,
    categoryName: cmsP.category?.name || 'Megalux Engineering Solutions',
    subcategory: cmsP.category?.name || '',
    tagline: cmsP.short_description || '',
    shortDesc: cmsP.short_description || '',
    fullDesc: stripHtml(cmsP.description) || cmsP.short_description || '',
    image: images[0] || '',
    gallery: images,
    applications: applications,
    finishOptions: finishes,
    featured: Boolean(cmsP.is_featured),
    certifications: ['ISO 9001:2015', 'Dubai Municipality Compliant', 'CE / ASTM Verified'],
    complianceBadges: ['Consultant Grade', 'Severe Climate Rated', 'Dubai Approved']
  };
}

/**
 * Maps a CMS Project to the frontend Project structure.
 */
export function mapCmsProjectToProject(cmsProj: CmsProject): Project {
  const images = (cmsProj.images && cmsProj.images.length > 0)
    ? cmsProj.images.map(img => resolveImageUrl(img)).filter(Boolean)
    : [];

  const fixtures = parseStringOrArray(cmsProj.fixtures_supplied);
  const cleanOverview = stripHtml(cmsProj.overview);

  return {
    id: String(cmsProj.id),
    slug: cmsProj.slug,
    title: cmsProj.title,
    location: cmsProj.location || '',
    country: 'United Arab Emirates',
    category: ['lighting', 'commercial'],
    categoryDisplay: 'Architectural Lighting & Civil Infrastructure',
    shortDesc: cleanOverview.slice(0, 160) + (cleanOverview.length > 160 ? '...' : ''),
    fullOverview: cleanOverview,
    scopeOfWork: [
      'Engineering Submittals & Photometric Modeling',
      'Custom Fixture Supply & QA/QC Compliance',
      'On-Site Alignment & Commissioning Supervision'
    ],
    productsSupplied: fixtures,
    image: images[0] || '',
    gallery: images,
    client: cmsProj.client || '',
    consultant: cmsProj.consultant || '',
    contractor: 'Main Contractor / MEP Specialist',
    completionYear: cmsProj.year_status || '',
    featured: Boolean(cmsProj.is_featured)
  };
}

/**
 * Maps a CMS Gallery Item to the frontend GalleryItem structure.
 */
export function mapCmsGalleryToItem(cmsG: CmsGalleryItem): GalleryItem {
  return {
    id: String(cmsG.id),
    slug: cmsG.slug,
    title: cmsG.title,
    category: 'lighting',
    categoryLabel: cmsG.subtitle || 'Architectural Showcase',
    location: cmsG.location || '',
    image: resolveImageUrl(cmsG.image),
    description: cmsG.subtitle || cmsG.title,
    aspect: 'landscape'
  };
}

/**
 * Maps a CMS Career to the JobOpening structure.
 */
export function mapCmsCareerToJobOpening(cmsC: CmsCareer): JobOpening {
  const resps = parseStringOrArray(cmsC.responsibilities);
  const reqs = parseStringOrArray(cmsC.requirements);
  const fallbackSlug = cmsC.title 
    ? cmsC.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') 
    : `career-${cmsC.id}`;

  return {
    id: String(cmsC.id),
    slug: cmsC.slug || fallbackSlug,
    title: cmsC.title,
    department: cmsC.department || '',
    location: cmsC.location || '',
    type: cmsC.employment_type || 'Full-Time',
    experience: cmsC.experience || '',
    description: cmsC.short_description || stripHtml(cmsC.role_description),
    responsibilities: resps,
    requirements: reqs,
    education: cmsC.education || '',
    skills: cmsC.skills ? parseStringOrArray(cmsC.skills).join(', ') : undefined,
    license_requirement: cmsC.license_requirement || '',
    language_requirement: cmsC.language_requirement || '',
    salary_range: cmsC.salary_range || '',
    urgent: Boolean(cmsC.is_urgent),
    featured: Boolean(cmsC.is_featured),
    postedDate: 'Current Opening'
  };
}

// ==========================================
// API Fetch Handlers (Single Source of Truth)
// ==========================================

export async function fetchCmsSettings(): Promise<CmsSettings | null> {
  try {
    const res = await fetch(`${CMS_BASE_URL}/settings`);
    if (!res.ok) return null;
    const json = await res.json();
    if (json.success && json.data) {
      const data = json.data;
      return {
        ...data,
        company_name: data.company_name || 'meglux',
        phone_numbers: parseStringOrArray(data.phone_numbers),
        email_addresses: parseStringOrArray(data.email_addresses),
        address: data.address || '',
        website: data.website || '',
        office_hours: data.office_hours || '',
      };
    }
    return null;
  } catch (err) {
    console.warn('CMS Settings fetch error:', err);
    return null;
  }
}

export async function fetchCmsCategories(): Promise<CmsCategory[]> {
  try {
    const res = await fetch(`${CMS_BASE_URL}/categories`);
    if (!res.ok) return [];
    const json = await res.json();
    return json.success && Array.isArray(json.data) ? json.data : [];
  } catch (err) {
    console.warn('CMS Categories fetch error:', err);
    return [];
  }
}

export async function fetchCmsCategoryBySlug(slug: string): Promise<CmsCategory | null> {
  try {
    const res = await fetch(`${CMS_BASE_URL}/categories/${encodeURIComponent(slug)}`);
    if (!res.ok) return null;
    const json = await res.json();
    return json.success && json.data ? json.data : null;
  } catch (err) {
    console.warn('CMS Single Category fetch error:', err);
    return null;
  }
}

export async function fetchCmsProducts(): Promise<CmsProduct[]> {
  try {
    const res = await fetch(`${CMS_BASE_URL}/products`);
    if (!res.ok) return [];
    const json = await res.json();
    return json.success && Array.isArray(json.data) ? json.data : [];
  } catch (err) {
    console.warn('CMS Products fetch error:', err);
    return [];
  }
}

export async function fetchCmsProductBySlug(slug: string): Promise<CmsProduct | null> {
  try {
    const res = await fetch(`${CMS_BASE_URL}/products/${encodeURIComponent(slug)}`);
    if (!res.ok) return null;
    const json = await res.json();
    return json.success && json.data ? json.data : null;
  } catch (err) {
    console.warn('CMS Single Product fetch error:', err);
    return null;
  }
}

export async function fetchCmsProjects(): Promise<CmsProject[]> {
  try {
    const res = await fetch(`${CMS_BASE_URL}/projects`);
    if (!res.ok) return [];
    const json = await res.json();
    return json.success && Array.isArray(json.data) ? json.data : [];
  } catch (err) {
    console.warn('CMS Projects fetch error:', err);
    return [];
  }
}

export async function fetchCmsProjectBySlug(slug: string): Promise<CmsProject | null> {
  try {
    const res = await fetch(`${CMS_BASE_URL}/projects/${encodeURIComponent(slug)}`);
    if (!res.ok) return null;
    const json = await res.json();
    return json.success && json.data ? json.data : null;
  } catch (err) {
    console.warn('CMS Single Project fetch error:', err);
    return null;
  }
}

export async function fetchCmsGallery(): Promise<CmsGalleryItem[]> {
  try {
    const res = await fetch(`${CMS_BASE_URL}/gallery`);
    if (!res.ok) return [];
    const json = await res.json();
    return json.success && Array.isArray(json.data) ? json.data : [];
  } catch (err) {
    console.warn('CMS Gallery fetch error:', err);
    return [];
  }
}

export async function fetchCmsGalleryBySlug(slug: string): Promise<CmsGalleryItem | null> {
  try {
    const res = await fetch(`${CMS_BASE_URL}/gallery/${encodeURIComponent(slug)}`);
    if (!res.ok) return null;
    const json = await res.json();
    return json.success && json.data ? json.data : null;
  } catch (err) {
    console.warn('CMS Single Gallery Item fetch error:', err);
    return null;
  }
}

export async function fetchCmsClients(featuredOnly: boolean = false): Promise<CmsClient[]> {
  try {
    const endpoint = featuredOnly ? `${CMS_BASE_URL}/clients/featured` : `${CMS_BASE_URL}/clients`;
    const res = await fetch(endpoint);
    if (!res.ok) return [];
    const json = await res.json();
    return json.success && Array.isArray(json.data) ? json.data : [];
  } catch (err) {
    console.warn('CMS Clients fetch error:', err);
    return [];
  }
}

export async function fetchCmsClientBySlug(slug: string): Promise<CmsClient | null> {
  try {
    const res = await fetch(`${CMS_BASE_URL}/clients/${encodeURIComponent(slug)}`);
    if (!res.ok) return null;
    const json = await res.json();
    return json.success && json.data ? json.data : null;
  } catch (err) {
    console.warn('CMS Single Client fetch error:', err);
    return null;
  }
}

export async function fetchCmsCareers(filter?: 'featured' | 'urgent'): Promise<CmsCareer[]> {
  try {
    let endpoint = `${CMS_BASE_URL}/careers`;
    if (filter === 'featured') endpoint = `${CMS_BASE_URL}/careers/featured`;
    if (filter === 'urgent') endpoint = `${CMS_BASE_URL}/careers/urgent`;
    const res = await fetch(endpoint);
    if (!res.ok) return [];
    const json = await res.json();
    return json.success && Array.isArray(json.data) ? json.data : [];
  } catch (err) {
    console.warn('CMS Careers fetch error:', err);
    return [];
  }
}

export async function fetchCmsCareerBySlug(slug: string): Promise<CmsCareer | null> {
  try {
    const res = await fetch(`${CMS_BASE_URL}/careers/${encodeURIComponent(slug)}`);
    if (!res.ok) return null;
    const json = await res.json();
    return json.success && json.data ? json.data : null;
  } catch (err) {
    console.warn('CMS Single Career fetch error:', err);
    return null;
  }
}

export async function fetchCmsTestimonials(featuredOnly: boolean = false): Promise<CmsTestimonial[]> {
  try {
    const endpoint = featuredOnly ? `${CMS_BASE_URL}/testimonials/featured` : `${CMS_BASE_URL}/testimonials`;
    const res = await fetch(endpoint);
    if (!res.ok) return [];
    const json = await res.json();
    return json.success && Array.isArray(json.data) ? json.data : [];
  } catch (err) {
    console.warn('CMS Testimonials fetch error:', err);
    return [];
  }
}

// ==========================================
// Project Enquiry API Submission (Laravel API)
// POST https://meglux.springstrdg.com/api/project-enquiries
// ==========================================

export interface ProjectEnquiryPayload {
  full_name: string;
  company?: string;
  email: string;
  phone?: string;
  project_location?: string;
  product_category: string;
  message: string;
  attachment?: File | null;
}

export interface ProjectEnquiryResponse {
  success: boolean;
  message: string;
  data?: any;
  errors?: Record<string, string[]>;
}

export async function submitProjectEnquiry(
  payload: ProjectEnquiryPayload
): Promise<ProjectEnquiryResponse> {
  try {
    const formData = new FormData();
    formData.append('full_name', payload.full_name.trim());
    if (payload.company && payload.company.trim()) {
      formData.append('company', payload.company.trim());
    }
    formData.append('email', payload.email.trim());
    if (payload.phone && payload.phone.trim()) {
      formData.append('phone', payload.phone.trim());
    }
    if (payload.project_location && payload.project_location.trim()) {
      formData.append('project_location', payload.project_location.trim());
    }
    formData.append('product_category', payload.product_category.trim());
    formData.append('message', payload.message.trim());

    if (payload.attachment) {
      formData.append('attachment', payload.attachment);
    }

    const response = await fetch(`${CMS_BASE_URL}/project-enquiries`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json'
        // Do NOT manually set Content-Type; the browser generates multipart/form-data boundary
      },
      body: formData
    });

    const json = await response.json().catch(() => null);

    if (!response.ok) {
      return {
        success: false,
        message: json?.message || 'Unable to submit your enquiry at the moment. Please check the highlighted fields and try again.',
        errors: json?.errors
      };
    }

    return {
      success: json?.success ?? true,
      message: json?.message || 'Thank you. Your enquiry has been submitted successfully. Our Meglux specialists will review your requirements and get in touch with you shortly.',
      data: json?.data
    };
  } catch (error) {
    console.error('Project enquiry submission failed:', error);
    return {
      success: false,
      message: 'Something went wrong while submitting your enquiry. Please try again in a moment.'
    };
  }
}

// ==========================================
// Career Application API Submission (Laravel API)
// POST https://meglux.springstrdg.com/api/career-applications
// multipart/form-data
// ==========================================

export const VALID_CAREER_EXPERIENCES = [
  '1 – 3 Years',
  '3 – 5 Years',
  '5 – 8 Years',
  '8+ Years'
] as const;

export const VALID_CAREER_NOTICE_PERIODS = [
  'Immediate / Available in UAE',
  '15 Days',
  '30 Days',
  'Overseas / Relocating'
] as const;

export const DEFAULT_FALLBACK_CAREER_SLUG = 'project-engineer-lighting-outdoor-infrastructure';

/**
 * Normalizes career slug to a valid active job in the backend database.
 */
export function normalizeCareerSlug(slug?: string | null): string {
  if (!slug || slug.trim() === '' || slug === 'general-application' || slug === 'spontaneous-application' || slug === 'open-application') {
    return DEFAULT_FALLBACK_CAREER_SLUG;
  }
  return slug.trim();
}

/**
 * Normalizes experience string to match exact Laravel enum:
 * '1 – 3 Years' | '3 – 5 Years' | '5 – 8 Years' | '8+ Years'
 */
export function normalizeExperience(val?: string | null): string {
  if (!val || typeof val !== 'string' || !val.trim()) return '1 – 3 Years';
  const clean = val.trim();
  if (clean === '1 – 3 Years' || clean === '3 – 5 Years' || clean === '5 – 8 Years' || clean === '8+ Years') {
    return clean;
  }
  if (clean.includes('3-5') || clean.includes('3 – 5') || clean.includes('4')) return '3 – 5 Years';
  if (clean.includes('5-8') || clean.includes('5 – 8') || clean.includes('6') || clean.includes('7')) return '5 – 8 Years';
  if (clean.includes('8') || clean.includes('10') || clean.includes('+') || clean.toLowerCase().includes('senior')) return '8+ Years';
  return '1 – 3 Years';
}

/**
 * Normalizes notice period string to match exact Laravel enum:
 * 'Immediate / Available in UAE' | '15 Days' | '30 Days' | 'Overseas / Relocating'
 */
export function normalizeNoticePeriod(val?: string | null): string {
  if (!val || typeof val !== 'string' || !val.trim()) return 'Immediate / Available in UAE';
  const clean = val.trim();
  if (
    clean === 'Immediate / Available in UAE' || 
    clean === '15 Days' || 
    clean === '30 Days' || 
    clean === 'Overseas / Relocating'
  ) {
    return clean;
  }
  if (clean.includes('15')) return '15 Days';
  if (clean.includes('30') || clean.includes('60') || clean.toLowerCase().includes('month')) return '30 Days';
  if (clean.toLowerCase().includes('overseas') || clean.toLowerCase().includes('relocat')) return 'Overseas / Relocating';
  return 'Immediate / Available in UAE';
}

export interface CareerApplicationPayload {
  career_slug: string;
  full_name: string;
  email: string;
  mobile_phone: string;
  total_experience?: string;
  notice_period?: string;
  professional_summary?: string;
  resume: File;
}

export interface LegalPage {
  id: number;
  title: string;
  slug: string;
  content: string;
  is_active: boolean;
  updated_at?: string;
}

/**
 * Dynamically fetches legal page content (Privacy Policy, Terms & Conditions)
 * from Laravel API: GET /api/legal-pages/{slug}
 */
export async function fetchLegalPage(slug: 'privacy-policy' | 'terms-conditions' | string): Promise<LegalPage | null> {
  try {
    const response = await fetch(`${CMS_BASE_URL}/legal-pages/${slug}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      console.warn(`[CMS] Legal page "${slug}" returned status ${response.status}`);
      return null;
    }

    const json = await response.json();
    if (json?.success && json?.data) {
      return json.data as LegalPage;
    }
    return null;
  } catch (error) {
    console.error(`[CMS] Error fetching legal page "${slug}":`, error);
    return null;
  }
}

export interface CareerApplicationResponse {
  success: boolean;
  message: string;
  data?: any;
  errors?: Record<string, string[]>;
}

export async function submitCareerApplication(
  payload: CareerApplicationPayload
): Promise<CareerApplicationResponse> {
  try {
    const cleanSlug = normalizeCareerSlug(payload.career_slug);
    const cleanExperience = normalizeExperience(payload.total_experience);
    const cleanNotice = normalizeNoticePeriod(payload.notice_period);

    // Build standard multipart/form-data payload with exact required fields
    const formData = new FormData();
    formData.append('career_slug', cleanSlug);
    formData.append('full_name', payload.full_name.trim());
    formData.append('email', payload.email.trim());
    formData.append('mobile_phone', payload.mobile_phone.trim());
    formData.append('total_experience', cleanExperience);
    formData.append('notice_period', cleanNotice);

    // Optional field: professional_summary
    let summaryText = payload.professional_summary?.trim() || '';
    if (payload.career_slug && payload.career_slug !== cleanSlug && !summaryText.includes(payload.career_slug)) {
      summaryText = `[Position Interest: ${payload.career_slug}] ${summaryText}`.trim();
    }
    if (summaryText) {
      formData.append('professional_summary', summaryText);
    }

    // Required file: resume
    formData.append('resume', payload.resume);

    // Strictly NO status, admin_notes, or career_id sent by frontend
    // Browser automatically sets Content-Type with multipart boundary
    const response = await fetch(`${CMS_BASE_URL}/career-applications`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json'
      },
      body: formData
    });

    const json = await response.json().catch(() => null);

    // Successful backend creation (HTTP 201 Created / 200 OK)
    if (response.ok) {
      return {
        success: true,
        message: json?.message || 'Your application has been submitted successfully. Our HR team will contact you if you are shortlisted.',
        data: json?.data
      };
    }

    // Validation errors (HTTP 422 Unprocessable Entity)
    if (response.status === 422 && json?.errors) {
      return {
        success: false,
        message: json?.message || 'Validation error: Please verify the highlighted details and try again.',
        errors: json?.errors
      };
    }

    // Backend database or server error (e.g., HTTP 500 with SQL exception)
    const rawMsg = typeof json?.message === 'string' ? json.message : '';
    return {
      success: false,
      message: rawMsg || `Server error (${response.status}): Failed to record application in database. Please check back shortly.`,
      errors: json?.errors
    };
  } catch (error: any) {
    console.error('Career application submission network error:', error);
    return {
      success: false,
      message: error?.message || 'A network error occurred while submitting your application. Please check your internet connection and try again.'
    };
  }
}


