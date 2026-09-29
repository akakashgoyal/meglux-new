import { 
  Product, 
  Project, 
  DocumentItem, 
  GalleryItem, 
  SolutionCard, 
  QualityPrinciple, 
  HSECommitment, 
  CorporateObjective,
  JobOpening
} from '../types';
import securitySolutionsImage from '../assets/images/regenerated_image_1787815892790.png';

export const COMPANY_DETAILS = {
  name: 'Mega Lux International',
  legalName: 'MEGA LUX INTERNATIONAL SECURITY SYSTEMS L.L.C',
  arabicLegalName: 'ميجا لوكس انترناشيونال للمعدات الأمنية ذ.م.م',
  tagline: 'Outdoor Furniture, Security Systems & Lighting Solutions',
  location: 'Dubai, UAE',
  address: 'Bldg No. 26 - 26 6A Street - Al Qouz Ind.third - Al Quoz - Dubai - United Arab Emirates',
  warehouseAddress: 'Warehouse No. S02, Dubai Real Estate Corp property, Bur Dubai, Al Quoz Industrial Area 3, Parcel ID: 368-611',
  phone: '+971 4 5803082',
  altPhone: '+971 44 429495',
  fax: '+971 44 2277636',
  mobile: '+971 50 3556932',
  operationsMobile: '+971 55 8695884',
  email: 'sales@megaluxintl.com',
  infoEmail: 'info@megaluxintl.com',
  website: 'www.megaluxintl.com',
  hours: 'Monday – Friday: 8:00 AM – 6:00 PM (GST)',
  city: 'Dubai',
  country: 'United Arab Emirates',
  aboutBrief: 'Megalux International is a leading Dubai-based engineering supplier delivering premium Outdoor Furniture / Street Furniture, high-security Perimeter Intrusion Prevention Systems, and architectural Lighting across the Middle East. Headquartered in Al Quoz, Dubai, we serve iconic commercial, hospitality, residential, and civic developments with consultant-grade submittals.',
  profileCopy: 'Our comprehensive portfolio spans three core disciplines with equal priority: Outdoor Furniture / Street Furniture, Security Systems, and Lighting. We believe that true project value comes from turnkey integration—combining architectural design, durable materials, and engineering rigor to provide consultants and contractors with cost-effective, high-performance solutions across the GCC.',
  missionCopy: 'Why the management of Megalux is so determining to subject the performance of the company to meet the standard requirement. To achieve this target, we have designed a Quality management system such as to: Encourage continuous development and enhance of the capabilities of the staff; Be easily understood and conveyed efficiently to all employee of the company; Encourage the supplier and sub-contractor to elevate the level of service rendered by them to our company; Ensure strict follow up and periodic reporting on the status of quality in all our sites.',
  visionCopy: 'Our effort is to use Our Products as a tool for enhancing the architectural beauty and its surroundings. To achieve this, we offer a distinctive collection from across the world with modern shapes and selected designs underscoring the requirements of different projects. We ensure that every single product supplied by us is of international quality standards. In fact, we associate with only those manufacturers that conform to the highest standards across the production and distribution cycle. So, with us, you can be rest assured that the quality promised is the quality delivered.',
  keyPersonnel: [
    { role: 'Managing Director (MD)', name: 'Sultan Majid Hamad Binsaqar Alqasemi' },
    { role: 'Executive Director (ED)', name: 'Rawoof Ali Mohamed Farook' },
    { role: 'Manager & Operations Head', name: 'Satish Kumar Singh Jai Singh', email: 'satish@megaluxintl.com', phone: '+971 55 8695884' },
    { role: 'Business Development Manager', name: 'Brett Jordan', phone: '054 792 0384' },
    { role: 'Project Engineer / Sales', name: 'Syed Azeem', email: 'azeem@megaluxintl.com', phone: '052 601 3093' },
    { role: 'Project Co-Ordinator & Estimation', name: 'Praveen Kumar', email: 'sales@megaluxintl.com' },
    { role: 'Admin / Estimation', name: 'Rushali A. Salian', email: 'info@megaluxintl.com' },
    { role: 'Senior Sales Executive (Abu Dhabi)', name: 'Deepthi Amin', email: 'sales.auh@megaluxintl.com' },
    { role: 'Sales Engineer', name: 'Nitesh Kumar', email: 'sales01@megaluxintl.com' },
    { role: 'Estimator (Outdoor Furniture)', name: 'Chaithra S. Jayan', email: 'bdm@megaluxintl.com' },
    { role: 'Design & Execution Engineer', name: 'M.D. Wajahath', email: 'drafting@megaluxintl.com' },
    { role: 'Safety Officer', name: 'Prabin Sundar' },
    { role: 'Assistant Manager (Accounts)', name: 'Haja Husain' },
    { role: 'Accounts Executive', name: 'Imran' }
  ],
  executionTeam: [
    { role: 'Senior Supervisor', name: 'Imran Khan' },
    { role: 'Senior Technician', name: 'Saddam Ali' },
    { role: 'Plumber / Technician', name: 'Jagdish Kumar' },
    { role: 'Technician', name: 'Bhuwan Singh' },
    { role: 'Driver / Technician', name: 'Umar Islam' }
  ]
};

export const SOLUTIONS_DATA: SolutionCard[] = [
  {
    id: 'outdoor-furniture-solutions',
    title: 'Outdoor Furniture / Street Furniture',
    subtitle: 'Urban Amenities & Streetscape Furniture',
    description: 'Contemporary street furniture, architectural concrete seating, ergonomic timber benches, stainless cycle racks, waste sorting receptacles, and custom shaded pergolas engineered for public open spaces.',
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80',
    points: [
      'Architectural UHPC & treated timber public benches',
      'Modern stainless steel 2-point bike parking racks',
      'Multi-compartment waste & recycling street bins',
      'Custom tree grates, planters & shaded urban structures'
    ],
    targetCategory: 'outdoor-furniture'
  },
  {
    id: 'security-systems-solutions',
    title: 'Security Systems',
    subtitle: 'Perimeter Intrusion Prevention & HVM',
    description: 'Crash-rated physical perimeter defense systems engineered to safeguard critical infrastructure, government assets, commercial hubs, VIP driveways, and pedestrian zones across the Middle East.',
    image: securitySolutionsImage,
    points: [
      'ASTM M50 & PAS 68 crash-tested embedded bollards',
      'Automatic hydraulic rising & retractable bollards',
      'Heavy-duty hydraulic wedge road blockers & tyre killers',
      'Automated cantilever sliding crash gates & boom barriers'
    ],
    targetCategory: 'security-systems'
  },
  {
    id: 'lighting-solutions',
    title: 'Lighting',
    subtitle: 'Architectural, Indoor & Outdoor Lighting',
    description: 'Comprehensive architectural illumination encompassing luxury interior sconces, suspended linear fixtures, grand bespoke chandeliers, smart roadway luminaires, and 360° off-grid solar light columns.',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    points: [
      'Architectural interior wall sconces & linear pendants',
      'Bespoke grand chandeliers for atriums & majlis spaces',
      'Smart municipal & highway streetlighting systems',
      'Off-grid cylindrical solar poles & DIALux photometrics'
    ],
    targetCategory: 'lighting'
  }
];

export const WHY_CHOOSE_MEGALUX = [
  {
    id: 'quality',
    title: 'International Quality Products',
    desc: 'Every fixture and security system is engineered according to international standards, utilizing premium alloys, optics, and hydraulic components.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    metric: 'ISO 9001:2015'
  },
  {
    id: 'expertise',
    title: 'Technical Expertise',
    desc: 'Our Dubai engineering team provides in-depth lighting calculations, structural foundation reviews, and security threat-level matching.',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80',
    metric: 'DIALux & BIM'
  },
  {
    id: 'customization',
    title: 'Customized Project Solutions',
    desc: 'Tailored dimensions, bespoke RAL finishes, and specific lumen packages adapted directly to individual architectural requirements.',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
    metric: 'Custom RAL'
  },
  {
    id: 'energy',
    title: 'Energy-Efficient Solutions',
    desc: 'High-efficacy LED engines, smart DALI/0-10V dimming integration, and sustainable solar-powered outdoor illumination.',
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    metric: '160 lm/W'
  },
  {
    id: 'consultant',
    title: 'Consultant & Architect Support',
    desc: 'Full documentation support including DIALux simulations, photometric IES files, CAD drawings, and compliance datasheets.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    metric: 'MAS Submittals'
  },
  {
    id: 'installation',
    title: 'Installation & Commissioning Support',
    desc: 'Supervision by qualified engineers ensuring correct installation, hydraulic pressure calibration, and photometric aiming.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    metric: 'On-Site QA/QC'
  }
];

export const PROJECT_PROCESS_STEPS = [
  {
    step: '01',
    title: 'Share Your Project',
    subtitle: 'Initial Enquiry & Plans',
    desc: 'Clients provide project intention, geographical location, estimated quantities, architectural layouts, or tender plan drawings.',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80'
  },
  {
    step: '02',
    title: 'Specialist Review',
    subtitle: 'Engineering Evaluation',
    desc: 'Our technical specialists review the enquiry, perform illumination/threat assessments, and identify the most suitable systems.',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80'
  },
  {
    step: '03',
    title: 'Best Solution',
    subtitle: 'Specification & Proposal',
    desc: 'We present fully compliant product selections, comprehensive technical specifications, lighting studies, and competitive commercial quotations.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
  },
  {
    step: '04',
    title: 'Installation & Support',
    subtitle: 'Supervision & Commissioning',
    desc: 'Upon confirmation, our Dubai team provides on-site installation supervision, testing, commissioning, and operational handover.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80'
  }
];

export const PRODUCTS_DATA: Product[] = [];

export const PROJECTS_DATA: Project[] = [];

export const APPROVALS_CERTIFICATIONS_DATA: DocumentItem[] = [
  {
    id: 'doc-creek-rise-dar',
    title: 'Creek Rise – Dubai Creek Harbour Approval',
    category: 'Consultant Approvals',
    issuingOrg: 'Design & Architecture Bureau (DAR Consult)',
    date: '2020 – 2023',
    productCategory: 'Architectural Lighting & Fixtures',
    refNumber: 'MS-CVL-0148 Rev.01',
    summary: 'Consultant approval and verification for project lighting fixtures and architectural fittings.',
    fileSize: '1.8 MB',
    fileType: 'PDF',
    isPlaceholder: false
  },
  {
    id: 'doc-la-mer-ssh',
    title: 'La Mer South Development Approval',
    category: 'Consultant Approvals',
    issuingOrg: 'SSHIC International Engineering Consultants (SSH)',
    date: '2023',
    productCategory: 'Wall Fixtures & Fittings',
    refNumber: 'MI-0002-ARCO-MAR-LAN-00012',
    summary: 'Material submittal approval for architectural installations and exterior wall fixtures.',
    fileSize: '1.9 MB',
    fileType: 'PDF',
    isPlaceholder: false
  },
  {
    id: 'doc-bluewaters-mirage',
    title: 'Bluewaters Hospitality Masterplan Approval',
    category: 'Consultant Approvals',
    issuingOrg: 'Mirage Leisure Development / Atkins',
    date: '2022',
    productCategory: 'Architectural Lighting & Sconces',
    refNumber: '6002-0000-JLW-2600-SM',
    summary: 'Architectural sample submittal and fixture approval for hospitality development.',
    fileSize: '2.1 MB',
    fileType: 'PDF',
    isPlaceholder: false
  },
  {
    id: 'doc-h-residence-dewan',
    title: 'The H Residence Al Safa Approval',
    category: 'Consultant Approvals',
    issuingOrg: 'Dewan Architects + Engineers',
    date: '2023',
    productCategory: 'Lighting & Architectural Fixtures',
    refNumber: 'D20-12-ASGC-311-MT',
    summary: 'Consultant and architectural approval for mixed-use residential project fixtures.',
    fileSize: '1.6 MB',
    fileType: 'PDF',
    isPlaceholder: false
  },
  {
    id: 'doc-iso-9001',
    title: 'ISO 9001:2015 Quality Management Certificate',
    category: 'Manufacturer Certifications',
    issuingOrg: 'URS / UKAS Management Systems',
    date: 'Active through 2027',
    productCategory: 'Quality Management',
    refNumber: '117589/A/0001/UK/En',
    summary: 'Certified Quality Management System covering supply and trading of light fittings and fixtures.',
    fileSize: '1.2 MB',
    fileType: 'PDF',
    isPlaceholder: false
  },
  {
    id: 'doc-ce-rohs-cert',
    title: 'CE & RoHS Directives Compliance Statement',
    category: 'Compliance Documents',
    issuingOrg: 'European Conformity & Certification Body',
    date: 'Current Validity',
    productCategory: 'Lighting Compliance',
    refNumber: 'CE/RoHS-DXB-2024',
    summary: 'Declaration of conformity with CE electrical safety and RoHS environmental directives.',
    fileSize: '1.1 MB',
    fileType: 'PDF',
    isPlaceholder: false
  }
];

export const GALLERY_DATA: GalleryItem[] = [];

export const QUALITY_POLICY_PRINCIPLES: QualityPrinciple[] = [
  {
    id: 'qp-1',
    title: 'Continuous Improvement',
    description: 'Systematic reviews of design, material selection, supply chains, and commissioning protocols to elevate reliability and client value.',
    iconName: 'TrendingUp',
    metric: '100% Iterative Audits'
  },
  {
    id: 'qp-2',
    title: 'Staff Development & Training',
    description: 'Empowering engineering and field staff with ongoing training in illumination standards, crash ratings, safety codes, and advanced optics.',
    iconName: 'GraduationCap',
    metric: 'Certified Technical Team'
  },
  {
    id: 'qp-3',
    title: 'Quality Awareness & Culture',
    description: 'Instilling quality ownership across every department from proposal generation to final on-site testing and customer handover.',
    iconName: 'ShieldCheck',
    metric: 'Total Quality Culture'
  },
  {
    id: 'qp-4',
    title: 'Supplier & Subcontractor Performance',
    description: 'Rigorous vendor pre-qualification and periodic auditing of manufacturing partners against ISO, CE, and international impact standards.',
    iconName: 'Users',
    metric: 'Audited Global Partners'
  },
  {
    id: 'qp-5',
    title: 'Site Quality Monitoring & QA/QC',
    description: 'Comprehensive on-site inspection protocols, torque checks, optical aiming, and hydraulic pressure testing during installation.',
    iconName: 'ClipboardCheck',
    metric: 'Multi-Stage Site Signoffs'
  },
  {
    id: 'qp-6',
    title: 'Periodic Quality Reporting',
    description: 'Detailed compliance documentation, photometrics, factory test reports, and transparent project milestone summaries.',
    iconName: 'FileText',
    metric: 'Traceable Documentation'
  },
  {
    id: 'qp-7',
    title: 'Customer Satisfaction',
    description: 'Delivering tailored engineering solutions on schedule with proactive post-handover technical support and warranty management.',
    iconName: 'Award',
    metric: '98%+ Client Recommendation'
  },
  {
    id: 'qp-8',
    title: 'Compliance With Applicable Requirements',
    description: 'Strict adherence to UAE local authority regulations, civil defense guidelines, municipality lighting codes, and international standards.',
    iconName: 'CheckCircle2',
    metric: 'Full Statutory Compliance'
  }
];

export const HSE_COMMITMENTS: HSECommitment[] = [
  {
    id: 'hse-1',
    title: 'Health & Safety Commitment',
    description: 'Zero-harm policy across all site operations, factory visits, and client installations. Protecting workers, contractors, and public safety.',
    iconName: 'HeartPulse',
    keyPractices: ['Daily toolbox talks', 'Mandatory PPE compliance', 'Certified rigging & electrical protocols']
  },
  {
    id: 'hse-2',
    title: 'Safe Working Practices',
    description: 'Structured Method Statements and Risk Assessments (RAMS) executed prior to any physical installation or heavy machinery lifting.',
    iconName: 'ShieldAlert',
    keyPractices: ['Method statements for civil trenching', 'Hydraulic isolation lockouts', 'Working at height fall protection']
  },
  {
    id: 'hse-3',
    title: 'Environmental Responsibility',
    description: 'Promoting energy-efficient LED technologies, solar-powered systems, recyclable aluminum components, and minimal carbon footprint.',
    iconName: 'Leaf',
    keyPractices: ['RoHS hazardous substance elimination', 'Dark-Sky light pollution prevention', 'Waste segregation & recycling']
  },
  {
    id: 'hse-4',
    title: 'Risk Management & Hazard Identification',
    description: 'Proactive identification of electrical, civil, hydraulic, and traffic hazards during site execution and commissioning.',
    iconName: 'AlertTriangle',
    keyPractices: ['Job safety hazard analysis (JSHA)', 'Traffic management around roadway barriers', 'Emergency shutdown drills']
  },
  {
    id: 'hse-5',
    title: 'Employee Awareness & Competency',
    description: 'Continuous training on first aid, fire safety, electrical safety (NFPA 70E / DEWA regulations), and heavy equipment handling.',
    iconName: 'Users',
    keyPractices: ['First aid certified supervisors', 'Defensive driving & forklift licenses', 'Environmental compliance refresher']
  },
  {
    id: 'hse-6',
    title: 'Continuous HSE Improvement & Compliance',
    description: 'Periodic audits and transparent incident reporting to maintain statutory compliance with UAE Ministry of Human Resources and Dubai Municipality HSE standards.',
    iconName: 'FileCheck',
    keyPractices: ['Monthly HSE KPI reporting', 'Statutory regulatory alignment', 'Third-party safety audits']
  }
];

export const OBJECTIVES_DATA: CorporateObjective[] = [
  {
    id: 'obj-1',
    title: 'Customer Satisfaction',
    subtitle: 'Client-Centric Excellence',
    description: 'Consistently exceed expectations of architects, consultants, and contractors with responsive technical turnaround and bespoke engineering.',
    targetMetric: '> 98% On-Time Satisfaction',
    iconName: 'Smile'
  },
  {
    id: 'obj-2',
    title: 'Quality Improvement',
    subtitle: 'Zero Defect Philosophy',
    description: 'Maintain strict QA/QC across all product batches and on-site testing procedures to achieve near-zero site failure rates.',
    targetMetric: '< 0.05% RMA Rate',
    iconName: 'CheckCircle'
  },
  {
    id: 'obj-3',
    title: 'Technical Excellence',
    subtitle: 'Pioneering Engineering',
    description: 'Lead the region in high-efficacy optics, smart DALI-2/IoT controls, and crash-rated anti-ram perimeter barrier engineering.',
    targetMetric: '100% Certified Submittals',
    iconName: 'Cpu'
  },
  {
    id: 'obj-4',
    title: 'Cost Efficiency',
    subtitle: 'Intelligent Value Engineering',
    description: 'Provide optimized bill-of-quantities (BoQ) and lifecycle cost models that lower total cost of ownership without sacrificing specifications.',
    targetMetric: '15-25% Lifecycle Savings',
    iconName: 'DollarSign'
  },
  {
    id: 'obj-5',
    title: 'Energy Efficiency',
    subtitle: 'Sustainable Illumination',
    description: 'Deliver lighting solutions that surpass regional green building mandates (Al Sa\'fat / Estidama / LEED) with up to 160 lm/W.',
    targetMetric: 'Up to 60% Energy Reduction',
    iconName: 'Zap'
  },
  {
    id: 'obj-6',
    title: 'Employee Development',
    subtitle: 'Continuous Skill Growth',
    description: 'Foster professional development through continuous engineering accreditations, lighting design certifications, and safety mastery.',
    targetMetric: '40+ Hours Training / Employee',
    iconName: 'UserCheck'
  },
  {
    id: 'obj-7',
    title: 'Supplier Improvement',
    subtitle: 'Global Partner Alignment',
    description: 'Collaborate with top-tier global manufacturers that adhere to verified environmental and social governance standards.',
    targetMetric: '100% Audited Supply Chain',
    iconName: 'Layers'
  },
  {
    id: 'obj-8',
    title: 'Project Excellence',
    subtitle: 'Flawless Execution',
    description: 'Seamless handover from initial design reviews through installation supervision, commissioning, and prompt documentation delivery.',
    targetMetric: 'On-Schedule Commissioning',
    iconName: 'Target'
  },
  {
    id: 'obj-9',
    title: 'Continual Improvement',
    subtitle: 'Adaptive Evolution',
    description: 'Constantly evolve product portfolios and internal workflows to embrace breakthrough architectural trends and physical security technologies.',
    targetMetric: 'Annual Innovation Review',
    iconName: 'RefreshCw'
  }
];

export const TRADE_LICENCE_DATA = {
  companyName: 'MEGA LUX INTERNATIONAL SECURITY SYSTEMS L.L.C',
  arabicCompanyName: 'ميجا لوكس انترناشيونال للمعدات الأمنية ذ.م.م',
  legalForm: 'Limited Liability Company (LLC)',
  legalType: 'Limited Liability Company(LLC) / ذات مسئولية محدودة',
  jurisdiction: 'Dubai, United Arab Emirates',
  licenceNo: '788165',
  licenceNumber: '788165',
  mainLicenceNo: '788165',
  commercialRegisterNo: '1299813',
  commercialRegister: '1299813',
  chamberOfCommerceNo: '292834',
  dcciNo: '292834',
  issueDate: '09/08/2017',
  expiryDate: '08/08/2026',
  siraLicenceNo: '788165',
  siraCertificateNo: 'SSP20220811 7101',
  siraIssueDate: '09/08/2017',
  siraExpiryDate: '08/08/2026',
  managerName: 'SATISH KUMAR SINGH JAI SINGH (No. 421905)',
  managerNationality: 'India / الهند',
  registeredAddress: 'Building No. 26, 6A Street, Al Quoz Industrial Area 3, Dubai, UAE',
  warehouseLocation: 'Warehouse No. S02, Dubai Real Estate Corp property, Bur Dubai, Al Quoz Industrial Area 3, Parcel ID: 368-611',
  authority: 'Department of Economy and Tourism (DET), Government of Dubai',
  issuingAuthority: 'Department of Economy and Tourism (DET) / Dubai Chamber of Commerce / SIRA',
  isoCertifications: [
    { standard: 'ISO 9001:2015', name: 'Quality Management System', certNo: '117589/A/0001/UK/En', issue: '11 Oct 2024', expiry: '17 Sep 2027', body: 'URS / UKAS / IAF' },
    { standard: 'ISO 14001:2015', name: 'Environmental Management System', certNo: '117589/C/0001/UK/En', issue: '12 Oct 2024', expiry: '11 Oct 2027', body: 'URS / UKAS / IAF' },
    { standard: 'ISO 45001:2018', name: 'Occupational Health and Safety Management System', certNo: '117589/B/0001/UK/En', issue: '28 Dec 2024', expiry: '27 Dec 2027', body: 'URS / UKAS / IAF' }
  ],
  permittedActivities: [
    'Light Fittings & Fixtures Trading (تجارة ادوات الانارة ولوازمها)',
    'Measuring & Control Systems Trading (تجارة معدات واجهزة القياس والتحكم)',
    'Environment Protection Equipment Trading (تجارة معدات حماية البيئة)',
    'Automatic Gates & Barriers & Components Trading (تجارة البوابات والحواجز الآلية ومكوناتها)',
    'City Cleaning Equipment Trading (تجارة معدات تنظيف المدن)',
    'Security Equipment Installation & Maintenance (تركيب الأجهزة والمعدات الأمنية وصيانتها)',
    'Garden Equipment Trading (تجارة معدات الحدائق)',
    'Security Systems & Equipment Trading (تجارة الأجهزة والمعدات الأمنية)'
  ],
  licensedActivities: [
    'Light Fittings & Fixtures Trading',
    'Measuring & Control Systems Trading',
    'Environment Protection Equipment Trading',
    'Automatic Gates & Barriers & Components Trading',
    'City Cleaning Equipment Trading',
    'Security Equipment Installation & Maintenance',
    'Garden Equipment Trading',
    'Security Systems & Equipment Trading'
  ],
  validityNote: 'Certified electronic document issued by Dubai Department of Economy and Tourism, Dubai Chamber, and Security Industry Regulatory Agency (SIRA). Valid through 08/08/2026.',
  status: 'Active / فعال',
  establishmentDate: '09/08/2017'
};

export const PRODUCT_CATEGORIES = [
  { id: 'all', label: 'All Products', count: 18 },
  { id: 'outdoor-furniture', label: 'Outdoor Furniture / Street Furniture', count: 5 },
  { id: 'security-systems', label: 'Security Systems', count: 6 },
  { id: 'lighting', label: 'Lighting', count: 7 }
];

export const JOB_OPENINGS_DATA: JobOpening[] = [];

export const PROJECT_CATEGORIES = [
  { id: 'all', label: 'All Disciplines & Sectors' },
  { id: 'outdoor-furniture', label: 'Outdoor Furniture / Street Furniture' },
  { id: 'security-systems', label: 'Security Systems' },
  { id: 'lighting', label: 'Lighting' },
  { id: 'commercial', label: 'Commercial & Retail' },
  { id: 'hospitality', label: 'Hospitality & Resorts' },
  { id: 'residential', label: 'Residential Towers' }
];

export const APPROVAL_CATEGORIES = [
  { id: 'all', label: 'All Documents' },
  { id: 'Consultant Approvals', label: 'Consultant Approvals' },
  { id: 'Architectural Approvals', label: 'Architectural Approvals' },
  { id: 'Product Certifications', label: 'Crash & Impact Tests' },
  { id: 'Manufacturer Certifications', label: 'ISO / Factory QA' },
  { id: 'Compliance Documents', label: 'CE & RoHS Directives' }
];

export const APPROVALS_DOCUMENTS = APPROVALS_CERTIFICATIONS_DATA;

export const GALLERY_CATEGORIES = [
  { id: 'all', label: 'All Visuals' },
  { id: 'lighting', label: 'Architectural Lighting' },
  { id: 'security', label: 'Security & Access' },
  { id: 'completed', label: 'Completed Projects' },
  { id: 'installations', label: 'On-Site Testing' },
  { id: 'products', label: 'Product Details' }
];

export const GALLERY_ITEMS = GALLERY_DATA;

export const QUALITY_POLICY = {
  statement: 'Megalux International is committed to delivering lighting and high-security solutions that consistently satisfy customer, consultant, statutory, and regulatory requirements through structured quality management systems.',
  pillars: [
    {
      title: 'Procurement & Component Rigor',
      description: 'Strict vendor evaluation and auditing of raw materials, Nichia/Cree LED chips, Tridonic/Philips drivers, and high-tensile structural steel.'
    },
    {
      title: 'Traceability & QA Documentation',
      description: 'Complete mill test certificates, photometrics, batch inspection records, and consultant submittal binders for every delivery.'
    },
    {
      title: 'Testing & Physical Validation',
      description: 'Accredited third-party laboratory verification for ASTM M50 vehicle impact, IP68 waterproofing, and 1,000-hour salt-spray resistance.'
    },
    {
      title: 'Continuous Process Improvement',
      description: 'Adherence to ISO 9001:2015 frameworks with ongoing staff development, client feedback loops, and root-cause calibration.'
    }
  ]
};

export const HSE_POLICY = {
  statement: 'Megalux International is committed to conducting all business operations in a manner that protects the health, safety, and well-being of employees, contractors, clients, and the community, while actively safeguarding the environment.',
  pillars: [
    {
      title: 'Workplace & Site Safety',
      description: 'Zero-harm policy enforced via daily toolbox talks, comprehensive RAMS (Risk Assessments and Method Statements), and certified site PPE.'
    },
    {
      title: 'Environmental Stewardship',
      description: 'Surpassing regional green building mandates (Al Sa\'fat / Estidama / LEED) through high-efficiency LEDs, recyclable alloys, and solar energy.'
    },
    {
      title: 'Operational Regulatory Compliance',
      description: 'Full statutory compliance with UAE Ministry of Human Resources, Dubai Municipality, and Civil Defense safety codes.'
    },
    {
      title: 'Hazard & Risk Management',
      description: 'Systematic hazard mitigation for high-voltage testing, hydraulic power units, civil excavation, and heavy machinery rigging.'
    }
  ]
};

export const CORPORATE_OBJECTIVES = [
  {
    id: 'obj-client-satisfaction',
    title: 'Client & Consultant Satisfaction',
    description: 'Provide rapid technical turnaround, custom photometric simulations, and dedicated engineering submittals for every project.',
    target: '> 98% On-Time Specification Signoff'
  },
  {
    id: 'obj-energy-efficiency',
    title: 'Sustainable Illumination & Solar Leadership',
    description: 'Advance regional adoption of high-efficacy optics (up to 160 lm/W) and off-grid 360° solar streetlights.',
    target: 'Up to 60% Energy & Trenching Reductions'
  },
  {
    id: 'obj-security-engineering',
    title: 'Perimeter Defense & Physical Security Excellence',
    description: 'Deliver certified ASTM M50 / PAS 68 crash-tested barriers protecting critical state and commercial assets.',
    target: '100% Impact Test Verified Deployments'
  },
  {
    id: 'obj-supply-chain',
    title: 'Global Supply Chain & Material Traceability',
    description: 'Maintain verified partnerships with internationally accredited component manufacturers under ISO 9001 standards.',
    target: '100% Audited Tier-1 Sourcing'
  },
  {
    id: 'obj-regional-expansion',
    title: 'Middle East Regional Market Presence',
    description: 'Expand our project delivery network across iconic masterdevelopments in the UAE, Saudi Arabia, and GCC.',
    target: 'Active Deliveries in 6 Regional Metros'
  }
];

