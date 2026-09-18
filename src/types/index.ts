export type ProductCategory = 
  | 'all'
  | 'outdoor-furniture'
  | 'security-systems'
  | 'lighting'
  | 'indoor-lighting'
  | 'outdoor-lighting'
  | 'perimeter-security'
  | 'access-road-security'
  | 'urban-amenities';

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug?: string;
  name: string;
  category: ProductCategory;
  categoryName: string;
  subcategory: string;
  tagline: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  gallery: string[];
  applications: string[];
  specs?: ProductSpec[];
  materials?: string[];
  dimensions?: string;
  certifications?: string[];
  complianceBadges?: string[];
  features?: string[];
  modelNumber?: string;
  ipRating?: string;
  impactRating?: string;
  powerRating?: string;
  finishOptions?: string[];
  featured?: boolean;
}

export interface JobOpening {
  id: string;
  slug?: string;
  title: string;
  department: string;
  categoryKey?: 'outdoor-furniture' | 'security-systems' | 'lighting' | 'operations' | string;
  location: string;
  type: string;
  experienceLevel?: string;
  experience?: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  education?: string;
  skills?: string;
  license_requirement?: string;
  language_requirement?: string;
  salary_range?: string;
  urgent?: boolean;
  postedDate?: string;
  featured?: boolean;
}

export interface JobApplication {
  fullName: string;
  email: string;
  phone: string;
  position: string;
  experienceYears: string;
  visaStatus: string;
  coverLetter?: string;
  resumeFileName?: string;
}

export type ProjectCategory = 
  | 'all'
  | 'outdoor-furniture'
  | 'security-systems'
  | 'lighting'
  | 'security'
  | 'commercial'
  | 'residential'
  | 'hospitality'
  | 'infrastructure'
  | 'industrial'
  | 'retail';

export interface Project {
  id: string;
  slug?: string;
  title: string;
  location: string;
  country: string;
  category: ProjectCategory[];
  categoryDisplay: string;
  shortDesc: string;
  fullOverview: string;
  scopeOfWork: string[];
  productsSupplied: string[];
  image: string;
  gallery: string[];
  client: string; // Clearly structured placeholder
  consultant: string; // Clearly structured placeholder
  contractor?: string;
  completionYear?: string;
  featured?: boolean;
}

export interface DocumentItem {
  id: string;
  title: string;
  category: 'Consultant Approvals' | 'Architect Approvals' | 'Product Certifications' | 'Manufacturer Certifications' | 'Compliance Documents' | 'Other Approvals';
  issuingOrg: string;
  date: string;
  productCategory: string;
  refNumber: string;
  summary: string;
  fileSize: string;
  fileType: 'PDF' | 'DOCX' | 'CERT';
  previewImage?: string;
  isPlaceholder?: boolean;
}

export interface GalleryItem {
  id: string;
  slug?: string;
  title: string;
  category: 'all' | 'projects' | 'lighting' | 'security' | 'installations' | 'products' | 'completed';
  categoryLabel: string;
  location: string;
  image: string;
  description: string;
  aspect?: 'landscape' | 'portrait' | 'square';
}

export interface SolutionCard {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  points: string[];
  targetCategory: ProductCategory;
}

export interface QualityPrinciple {
  id: string;
  title: string;
  description: string;
  iconName: string;
  metric?: string;
}

export interface HSECommitment {
  id: string;
  title: string;
  description: string;
  iconName: string;
  keyPractices: string[];
}

export interface CorporateObjective {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  targetMetric: string;
  iconName: string;
}

export interface ConsultationEnquiry {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  projectLocation: string;
  projectType?: string;
  productCategory: string;
  projectStage: string;
  quantityEstimate?: string;
  message: string;
  files: { name: string; size: string; extension?: string }[];
}

// ==========================================
// CMS REST API Models (meglux.springstrdg.com)
// ==========================================

export interface CmsSettings {
  id?: number;
  company_name: string;
  logo: string | null;
  favicon: string | null;
  phone_numbers: string[];
  email_addresses: string[];
  address: string;
  website: string;
  office_hours: string;
  timezone: string;
  facebook?: string | null;
  instagram?: string | null;
  linkedin?: string | null;
  youtube?: string | null;
  twitter?: string | null;
  copyright_text?: string | null;
  is_active?: boolean;
}

export interface CmsCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  image?: string | null;
  is_active: boolean;
  products_count?: number;
}

export interface CmsProduct {
  id: number;
  category_id: number;
  name: string;
  slug: string;
  short_description: string;
  description: string;
  recommended_applications: string[] | string;
  available_finishes: string[] | string;
  images: string[];
  is_featured: boolean;
  is_active: boolean;
  sort_order?: number;
  category?: {
    id: number;
    name: string;
    slug: string;
    description?: string;
    image?: string | null;
    is_active?: boolean;
  };
}

export interface CmsProject {
  id: number;
  title: string;
  slug: string;
  location: string;
  client: string;
  consultant: string;
  year_status: string;
  overview: string;
  fixtures_supplied: string[] | string;
  images: string[];
  is_featured: boolean;
  is_active: boolean;
  sort_order?: number;
}

export interface CmsGalleryItem {
  id: number;
  title: string;
  slug: string;
  subtitle: string;
  location: string;
  image: string;
  alt_text?: string;
  is_featured?: boolean;
  is_active: boolean;
  sort_order?: number;
}

export interface CmsClient {
  id: number;
  company_name: string;
  slug: string;
  logo: string;
  website_url?: string | null;
  short_description?: string;
  is_featured?: boolean;
  is_active: boolean;
  sort_order?: number;
}

export interface CmsTestimonial {
  id: number;
  name: string;
  position: string;
  company_name: string;
  review: string;
  rating: number; // 1 - 5
  image?: string | null;
  is_featured?: boolean;
  is_active: boolean;
  sort_order?: number;
}

export interface CmsCareer {
  id: number;
  title: string;
  slug: string;
  department: string;
  employment_type: string;
  location: string;
  experience: string;
  short_description?: string;
  role_description: string;
  responsibilities: string[] | string;
  requirements: string[] | string;
  education?: string;
  skills?: string[] | string | null;
  license_requirement?: string;
  language_requirement?: string;
  salary_range?: string | null;
  is_urgent?: boolean;
  is_featured?: boolean;
  is_active: boolean;
  sort_order?: number;
}

