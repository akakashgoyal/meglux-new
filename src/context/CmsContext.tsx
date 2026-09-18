import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
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
  GalleryItem
} from '../types';
import { 
  fetchCmsSettings, 
  fetchCmsCategories, 
  fetchCmsCategoryBySlug,
  fetchCmsProducts, 
  fetchCmsProductBySlug,
  fetchCmsProjects, 
  fetchCmsProjectBySlug,
  fetchCmsGallery, 
  fetchCmsGalleryBySlug,
  fetchCmsClients, 
  fetchCmsClientBySlug,
  fetchCmsCareers, 
  fetchCmsCareerBySlug,
  fetchCmsTestimonials,
  mapCmsProductToProduct,
  mapCmsProjectToProject,
  mapCmsGalleryToItem,
  resolveImageUrl
} from '../services/cmsApi';
import { DEFAULT_CMS_SETTINGS } from '../data/cmsFallbacks';

interface CmsContextType {
  settings: CmsSettings;
  categories: CmsCategory[];
  rawProducts: CmsProduct[];
  products: Product[];
  rawProjects: CmsProject[];
  projects: Project[];
  rawGallery: CmsGalleryItem[];
  gallery: GalleryItem[];
  clients: CmsClient[];
  featuredClients: CmsClient[];
  testimonials: CmsTestimonial[];
  featuredTestimonials: CmsTestimonial[];
  careers: CmsCareer[];
  urgentCareers: CmsCareer[];
  featuredCareers: CmsCareer[];
  loading: boolean;
  error: string | null;
  isLiveConnected: boolean;
  refetchAll: () => Promise<void>;
  getProductBySlug: (slug: string) => Promise<CmsProduct | null>;
  getProjectBySlug: (slug: string) => Promise<CmsProject | null>;
  getCategoryBySlug: (slug: string) => Promise<CmsCategory | null>;
  getCareerBySlug: (slug: string) => Promise<CmsCareer | null>;
  getClientBySlug: (slug: string) => Promise<CmsClient | null>;
  getGalleryBySlug: (slug: string) => Promise<CmsGalleryItem | null>;
}

const CmsContext = createContext<CmsContextType | undefined>(undefined);

export const CmsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<CmsSettings>(DEFAULT_CMS_SETTINGS);
  const [categories, setCategories] = useState<CmsCategory[]>([]);
  const [rawProducts, setRawProducts] = useState<CmsProduct[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [rawProjects, setRawProjects] = useState<CmsProject[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [rawGallery, setRawGallery] = useState<CmsGalleryItem[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [clients, setClients] = useState<CmsClient[]>([]);
  const [testimonials, setTestimonials] = useState<CmsTestimonial[]>([]);
  const [careers, setCareers] = useState<CmsCareer[]>([]);
  
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isLiveConnected, setIsLiveConnected] = useState<boolean>(false);

  const loadAllCmsData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Parallel requests to all Laravel public endpoints
      const [
        cmsSettings,
        cmsCats,
        cmsProds,
        cmsProjs,
        cmsGal,
        cmsClients,
        cmsCareers,
        cmsTests
      ] = await Promise.all([
        fetchCmsSettings(),
        fetchCmsCategories(),
        fetchCmsProducts(),
        fetchCmsProjects(),
        fetchCmsGallery(),
        fetchCmsClients(),
        fetchCmsCareers(),
        fetchCmsTestimonials()
      ]);

      let liveResponsesCount = 0;

      // 1. Global Settings
      if (cmsSettings) {
        setSettings(cmsSettings);
        liveResponsesCount++;

        // Update favicon dynamically from API if present
        if (cmsSettings.favicon) {
          try {
            const faviconUrl = resolveImageUrl(cmsSettings.favicon);
            let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
            if (!link) {
              link = document.createElement('link');
              link.rel = 'icon';
              document.getElementsByTagName('head')[0].appendChild(link);
            }
            link.href = faviconUrl;

            let appleTouchLink: HTMLLinkElement | null = document.querySelector("link[rel='apple-touch-icon']");
            if (!appleTouchLink) {
              appleTouchLink = document.createElement('link');
              appleTouchLink.rel = 'apple-touch-icon';
              document.getElementsByTagName('head')[0].appendChild(appleTouchLink);
            }
            appleTouchLink.href = faviconUrl;
          } catch (e) {
            // ignore DOM issues
          }
        }

        if (cmsSettings.company_name) {
          document.title = `${cmsSettings.company_name.toUpperCase()} | Architectural Lighting, Security Systems & Urban Furniture Dubai`;
        }
      }

      // 2. Categories
      if (cmsCats && Array.isArray(cmsCats)) {
        setCategories(cmsCats.filter(c => c.is_active));
        liveResponsesCount++;
      }

      // 3. Products
      if (cmsProds && Array.isArray(cmsProds)) {
        setRawProducts(cmsProds);
        liveResponsesCount++;
        const activeProds = cmsProds.filter(p => p.is_active);
        const mappedProds = activeProds.map(mapCmsProductToProduct);
        setProducts(mappedProds);
      } else {
        setRawProducts([]);
        setProducts([]);
      }

      // 4. Projects
      if (cmsProjs && Array.isArray(cmsProjs)) {
        setRawProjects(cmsProjs);
        liveResponsesCount++;
        const activeProjs = cmsProjs.filter(p => p.is_active);
        const mappedProjs = activeProjs.map(mapCmsProjectToProject);
        setProjects(mappedProjs);
      } else {
        setRawProjects([]);
        setProjects([]);
      }

      // 5. Gallery
      if (cmsGal && Array.isArray(cmsGal)) {
        setRawGallery(cmsGal);
        liveResponsesCount++;
        const activeGal = cmsGal.filter(g => g.is_active);
        const mappedGal = activeGal.map(mapCmsGalleryToItem);
        setGallery(mappedGal);
      } else {
        setRawGallery([]);
        setGallery([]);
      }

      // 6. Clients
      if (cmsClients && Array.isArray(cmsClients)) {
        const activeClients = cmsClients.filter(c => c.is_active);
        setClients(activeClients);
        liveResponsesCount++;
      } else {
        setClients([]);
      }

      // 7. Careers
      if (cmsCareers && Array.isArray(cmsCareers)) {
        const activeCareers = cmsCareers.filter(c => c.is_active);
        setCareers(activeCareers);
        liveResponsesCount++;
      } else {
        setCareers([]);
      }

      // 8. Testimonials
      if (cmsTests && Array.isArray(cmsTests)) {
        const activeTestimonials = cmsTests.filter(t => t.is_active);
        setTestimonials(activeTestimonials);
        liveResponsesCount++;
      } else {
        setTestimonials([]);
      }

      setIsLiveConnected(liveResponsesCount > 0);
    } catch (err: any) {
      console.warn('Error loading CMS data:', err);
      setError(err?.message || 'Failed to load CMS data');
      setIsLiveConnected(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAllCmsData();
  }, [loadAllCmsData]);

  const featuredClients = clients.filter(c => c.is_featured);
  const featuredTestimonials = testimonials.filter(t => t.is_featured);
  const urgentCareers = careers.filter(c => c.is_urgent);
  const featuredCareers = careers.filter(c => c.is_featured);

  const getProductBySlug = useCallback(async (slug: string) => {
    return await fetchCmsProductBySlug(slug);
  }, []);

  const getProjectBySlug = useCallback(async (slug: string) => {
    return await fetchCmsProjectBySlug(slug);
  }, []);

  const getCategoryBySlug = useCallback(async (slug: string) => {
    return await fetchCmsCategoryBySlug(slug);
  }, []);

  const getCareerBySlug = useCallback(async (slug: string) => {
    return await fetchCmsCareerBySlug(slug);
  }, []);

  const getClientBySlug = useCallback(async (slug: string) => {
    return await fetchCmsClientBySlug(slug);
  }, []);

  const getGalleryBySlug = useCallback(async (slug: string) => {
    return await fetchCmsGalleryBySlug(slug);
  }, []);

  return (
    <CmsContext.Provider
      value={{
        settings,
        categories,
        rawProducts,
        products,
        rawProjects,
        projects,
        rawGallery,
        gallery,
        clients,
        featuredClients,
        testimonials,
        featuredTestimonials,
        careers,
        urgentCareers,
        featuredCareers,
        loading,
        error,
        isLiveConnected,
        refetchAll: loadAllCmsData,
        getProductBySlug,
        getProjectBySlug,
        getCategoryBySlug,
        getCareerBySlug,
        getClientBySlug,
        getGalleryBySlug
      }}
    >
      {children}
    </CmsContext.Provider>
  );
};

export const useCms = (): CmsContextType => {
  const context = useContext(CmsContext);
  if (!context) {
    throw new Error('useCms must be used within a CmsProvider');
  }
  return context;
};
