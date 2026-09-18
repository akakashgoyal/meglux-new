import { CmsClient, CmsTestimonial, CmsSettings, CmsCareer } from '../types';

/**
 * Initial empty structures for CMS state before the API loads.
 * No mock, fake, or placeholder business data is kept here.
 */
export const DEFAULT_CMS_SETTINGS: CmsSettings = {
  id: 1,
  company_name: 'meglux',
  logo: null,
  favicon: null,
  phone_numbers: ['+971 4 5803082'],
  email_addresses: ['sales@megaluxintl.com'],
  address: 'Bldg No. 26 - 26 6A Street - Al Qouz Ind.third - Al Quoz - Dubai - United Arab Emirates',
  website: 'https://www.megaluxintl.com',
  office_hours: 'Monday – Friday: 08:00 AM – 06:00 PM (GST)',
  timezone: 'GST (UTC+4)',
  facebook: null,
  instagram: null,
  linkedin: null,
  youtube: null,
  twitter: null,
  copyright_text: null,
  is_active: true
};

export const DEFAULT_CMS_CLIENTS: CmsClient[] = [];

export const DEFAULT_CMS_TESTIMONIALS: CmsTestimonial[] = [];

export const DEFAULT_CMS_CAREERS: CmsCareer[] = [];
