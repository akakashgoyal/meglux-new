/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './views/HomeView';
import { ProductsView } from './views/ProductsView';
import { ProjectsView } from './views/ProjectsView';
import { ApprovalsView } from './views/ApprovalsView';
import { ObjectivesView } from './views/ObjectivesView';
import { TradeLicenceView } from './views/TradeLicenceView';
import { ContactView } from './views/ContactView';
import { CareersView } from './views/CareersView';

import { ProductDetailModal } from './components/ProductDetailModal';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { DocumentViewerModal } from './components/DocumentViewerModal';
import { SpecSheetGeneratorModal } from './components/SpecSheetGeneratorModal';
import { ConsultationModal } from './components/ConsultationModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { RFQDrawer } from './components/RFQDrawer';
import { PrivacyTermsModal } from './views/PrivacyTermsModal';

import { 
  APPROVALS_DOCUMENTS 
} from './data/companyData';
import { useCms } from './context/CmsContext';
import { Product, Project, DocumentItem } from './types';

export default function App() {
  const { products: cmsProducts, projects: cmsProjects } = useCms();
  const allProducts = cmsProducts;
  const allProjects = cmsProjects;

  // Navigation State
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [initialProductCategory, setInitialProductCategory] = useState<string>('all');


  // Modals & Interactive States
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<DocumentItem | null>(null);
  const [specSheetProduct, setSpecSheetProduct] = useState<Product | null>(null);
  
  const [consultationOpen, setConsultationOpen] = useState<boolean>(false);
  const [consultationInitialCategory, setConsultationInitialCategory] = useState<string>('all');
  const [consultationInitialProject, setConsultationInitialProject] = useState<string | undefined>(undefined);

  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);
  const [rfqDrawerOpen, setRfqDrawerOpen] = useState<boolean>(false);
  const [rfqItemIds, setRfqItemIds] = useState<string[]>([]);
  const [privacyTermsType, setPrivacyTermsType] = useState<'privacy' | 'terms' | null>(null);

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentTab]);

  // Clean URL synchronization & Deep Linking (No '#' hashes)
  useEffect(() => {
    const syncRouteFromUrl = () => {
      // If a hash exists from an earlier session, seamlessly migrate it to clean pathname
      if (window.location.hash) {
        const rawHash = window.location.hash.replace(/^#\/?/, '').trim();
        if (rawHash) {
          const [hPath, hQuery] = rawHash.split('?');
          const cleanTarget = hPath === 'home' ? '/' : `/${hPath}${hQuery ? `?${hQuery}` : ''}`;
          window.history.replaceState(null, '', cleanTarget);
        } else {
          window.history.replaceState(null, '', window.location.pathname || '/');
        }
      }

      const pathname = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
      const searchParams = new URLSearchParams(window.location.search);
      const categoryParam = searchParams.get('category');

      if (!pathname || pathname === 'home') {
        setCurrentTab('home');
      } else if (pathname === 'products') {
        setCurrentTab('products');
        if (categoryParam) {
          setInitialProductCategory(categoryParam);
        }
      } else if (pathname === 'projects' || pathname === 'gallery') {
        setCurrentTab('projects');
      } else if (pathname === 'careers' || pathname === 'jobs') {
        setCurrentTab('careers');
      } else if (pathname === 'contact' || pathname === 'location') {
        setCurrentTab('contact');
      } else if (pathname === 'trade-licence' || pathname === 'license' || pathname === 'licence') {
        setCurrentTab('trade-licence');
      } else if (pathname === 'objectives' || pathname === 'quality') {
        setCurrentTab('objectives');
      } else if (pathname === 'approvals') {
        setCurrentTab('approvals');
      } else if (pathname === 'privacy-policy' || pathname === 'privacy') {
        setPrivacyTermsType('privacy');
      } else if (pathname === 'terms-conditions' || pathname === 'terms') {
        setPrivacyTermsType('terms');
      }
    };

    // Run on initial mount
    syncRouteFromUrl();

    window.addEventListener('popstate', syncRouteFromUrl);

    return () => {
      window.removeEventListener('popstate', syncRouteFromUrl);
    };
  }, []);

  // Handle Tab Switch with clean URL
  const handleSelectTab = (tab: string, subCategory?: string) => {
    setCurrentTab(tab);
    let targetPath = tab === 'home' ? '/' : `/${tab}`;
    if (tab === 'products' && subCategory) {
      setInitialProductCategory(subCategory);
      targetPath = `/products?category=${encodeURIComponent(subCategory)}`;
    }

    const currentFull = window.location.pathname + window.location.search;
    if (currentFull !== targetPath) {
      window.history.pushState({ tab, subCategory }, '', targetPath);
    }
  };

  // RFQ Cart Toggle
  const handleToggleRFQ = (product: Product) => {
    setRfqItemIds((prev) => 
      prev.includes(product.id)
        ? prev.filter((id) => id !== product.id)
        : [...prev, product.id]
    );
  };

  const handleRemoveRFQItem = (productId: string) => {
    setRfqItemIds((prev) => prev.filter((id) => id !== productId));
  };

  const handleClearAllRFQ = () => {
    setRfqItemIds([]);
  };

  const rfqProducts = allProducts.filter((p) => rfqItemIds.includes(p.id));

  // Consultation open triggers
  const handleOpenConsultation = (initialCat?: string, projectTitle?: string) => {
    setConsultationInitialCategory(initialCat || 'all');
    setConsultationInitialProject(projectTitle);
    setConsultationOpen(true);
  };

  // Quote on specific product
  const handleRequestQuote = (product: Product) => {
    handleOpenConsultation(product.category, `Equipment: ${product.name}`);
  };

  // Document download handler (creates genuine PDF text submittal file download)
  const handleDownloadDocument = (doc: DocumentItem) => {
    const textContent = `
================================================================================
MEGALUX INTERNATIONAL — TECHNICAL & COMPLIANCE SUBMITTAL
Dubai, United Arab Emirates | Tel: +971 44 429495 | sales@megaluxintl.com
================================================================================

DOCUMENT TITLE: ${doc.title}
DOCUMENT ID / REF: ${doc.refNumber}
CATEGORY: ${doc.category}
ISSUING AUTHORITY: ${doc.issuingOrg}
REGISTRATION DATE: ${doc.date}
APPLICABLE SCOPE: ${doc.productCategory}

SUMMARY STATEMENT:
${doc.summary}

VERIFICATION RECORD:
- Full-scale physical and laboratory validation verified under accredited testing protocols.
- Middle East climatic endurance rating: Operational up to +55°C ambient temperature.
- Ingress Protection: Verified IP66 / IP67 / IP68 as applicable.
- Crash Impact standard: ASTM F2656 / PAS 68 impact foundation engineering approved.

Generated for Consultant & Contractor Submittal Review.
Megalux International Technical Office, Dubai, UAE.
www.megaluxintl.com
================================================================================
`;
    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `MEGALUX_${doc.refNumber.replace(/[^a-zA-Z0-9_-]/g, '_')}_SUBMITTAL.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-[#FFE500] selection:text-black flex flex-col justify-between">
      {/* 1. Header & Navigation */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        onRequestConsultation={() => handleOpenConsultation()}
        onOpenSearch={() => setSearchModalOpen(true)}
        rfqCount={rfqItemIds.length}
        onOpenRFQDrawer={() => setRfqDrawerOpen(true)}
      />

      {/* 2. Main View Body */}
      <main className="flex-1 w-full">
        {(currentTab === 'home' || currentTab === 'about') && (
          <HomeView
            onSelectTab={handleSelectTab}
            onRequestConsultation={handleOpenConsultation}
            onViewProductDetails={(p) => setSelectedProduct(p)}
            onViewProjectDetails={(proj) => setSelectedProject(proj)}
            rfqItemIds={rfqItemIds}
            onToggleRFQ={handleToggleRFQ}
          />
        )}

        {currentTab === 'products' && (
          <ProductsView
            initialCategory={initialProductCategory}
            onViewProductDetails={(p) => setSelectedProduct(p)}
            onRequestQuote={handleRequestQuote}
            rfqItemIds={rfqItemIds}
            onToggleRFQ={handleToggleRFQ}
            onOpenRFQDrawer={() => setRfqDrawerOpen(true)}
          />
        )}

        {(currentTab === 'projects' || currentTab === 'gallery') && (
          <ProjectsView
            onViewProjectDetails={(proj) => setSelectedProject(proj)}
            onRequestConsultation={(title) => handleOpenConsultation('all', title)}
          />
        )}

        {currentTab === 'careers' && (
          <CareersView
            onRequestConsultation={() => handleOpenConsultation()}
          />
        )}

        {currentTab === 'approvals' && (
          <ApprovalsView
            onPreviewDocument={(doc) => setSelectedDocument(doc)}
            onDownloadDocument={handleDownloadDocument}
            onRequestConsultation={() => handleOpenConsultation()}
          />
        )}

        {currentTab === 'objectives' && (
          <ObjectivesView
            onSelectTab={handleSelectTab}
            onRequestConsultation={() => handleOpenConsultation()}
          />
        )}

        {currentTab === 'trade-licence' && (
          <TradeLicenceView
            onRequestConsultation={() => handleOpenConsultation()}
          />
        )}

        {currentTab === 'contact' && <ContactView />}
      </main>

      {/* 3. Global Footer */}
      <Footer
        onSelectTab={handleSelectTab}
        onRequestConsultation={() => handleOpenConsultation()}
        onOpenPrivacy={() => setPrivacyTermsType('privacy')}
        onOpenTerms={() => setPrivacyTermsType('terms')}
      />

      {/* 4. Modals & Drawers */}
      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onEnquire={(p) => {
          setSelectedProduct(null);
          handleRequestQuote(p);
        }}
        onGenerateSpecSheet={(p) => {
          setSpecSheetProduct(p);
        }}
        isInRFQ={selectedProduct ? rfqItemIds.includes(selectedProduct.id) : false}
        onToggleRFQ={handleToggleRFQ}
        onSelectRelatedProduct={(p) => setSelectedProduct(p)}
        allProducts={allProducts}
      />

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onRequestConsultation={(title) => handleOpenConsultation('all', title)}
      />

      {/* Document Viewer Modal */}
      <DocumentViewerModal
        doc={selectedDocument}
        onClose={() => setSelectedDocument(null)}
        onDownload={handleDownloadDocument}
      />

      {/* Printable Spec Sheet Generator Modal */}
      <SpecSheetGeneratorModal
        product={specSheetProduct}
        onClose={() => setSpecSheetProduct(null)}
      />

      {/* Consultation & RFQ Modal */}
      <ConsultationModal
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
        initialProductCategory={consultationInitialCategory}
        initialProjectTitle={consultationInitialProject}
        rfqProducts={rfqProducts.map((p) => p.name)}
      />

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        products={allProducts}
        projects={allProjects}
        documents={APPROVALS_DOCUMENTS}
        onSelectProduct={(p) => setSelectedProduct(p)}
        onSelectProject={(p) => setSelectedProject(p)}
        onSelectDocument={(d) => setSelectedDocument(d)}
      />

      {/* RFQ Specification List Drawer */}
      <RFQDrawer
        isOpen={rfqDrawerOpen}
        onClose={() => setRfqDrawerOpen(false)}
        items={rfqProducts}
        onRemoveItem={handleRemoveRFQItem}
        onClearAll={handleClearAllRFQ}
        onProceedToConsultation={() => handleOpenConsultation('all', 'Batch RFQ Package Enquiry')}
      />

      {/* Privacy & Terms Modal */}
      <PrivacyTermsModal
        type={privacyTermsType}
        onClose={() => setPrivacyTermsType(null)}
      />
    </div>
  );
}
