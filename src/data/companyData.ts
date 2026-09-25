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

export const PRODUCTS_DATA: Product[] = [
  // 1. OUTDOOR FURNITURE / STREET FURNITURE
  {
    id: 'prod-uhpc-bench',
    slug: 'modula-uhpc-bench',
    name: 'Modula-UHPC Architectural Public Bench',
    category: 'outdoor-furniture',
    categoryName: 'Outdoor Furniture / Street Furniture',
    subcategory: 'Public Realm Seating',
    tagline: 'Ultra-High-Performance Concrete (UHPC) civic bench with FSC-certified teak accents',
    shortDesc: 'Monolithic UHPC architectural bench engineered for high-footfall public realms, offering extreme resistance to coastal salinity and ambient GCC heat up to +55°C.',
    fullDesc: 'Engineered for landmark masterplans, parks, and beachfront promenades, the Modula-UHPC bench combines compressive strength exceeding 120 MPa with smooth cast stone finishes. Designed to integrate LED under-seat lighting and anti-skate studs.',
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1541888946425-d0fbb180c5f5?auto=format&fit=crop&w=1200&q=80'
    ],
    applications: ['Civic Plazas', 'Waterfront Corniches', 'Retail Centers', 'University Campuses'],
    specs: [
      { label: 'Material', value: 'Architectural UHPC Concrete (120+ MPa)' },
      { label: 'Dimensions', value: '2400mm (L) x 600mm (W) x 450mm (H)' },
      { label: 'Finish', value: 'Acid-Etched Hydrophobic Nano-Seal' },
      { label: 'Warranty', value: '10 Years Structural' }
    ],
    materials: ['UHPC Concrete', 'FSC Burmese Teak', 'AISI 316 Stainless Steel Fixings'],
    dimensions: '2400 x 600 x 450 mm',
    certifications: ['ISO 9001:2015', 'Dubai Municipality Approved', 'Estidama Compliant'],
    complianceBadges: ['UHPC 120 MPa', 'UV Stable', 'Anti-Graffiti'],
    finishOptions: ['Natural Sand', 'Graphite Grey', 'Off-White Cast', 'Warm Teak Inlay'],
    featured: true
  },
  {
    id: 'prod-aero-cycle',
    slug: 'aero-cycle-316',
    name: 'Aero-Cycle 316 Stainless Cycle Rack',
    category: 'outdoor-furniture',
    categoryName: 'Outdoor Furniture / Street Furniture',
    subcategory: 'Cycle & Bike Parking',
    tagline: 'Grade 316 marine stainless steel two-point bicycle parking station',
    shortDesc: 'Heavy-gauge austenitic stainless steel cycle stands with sub-surface anchoring, complying with RTA Dubai and municipal micro-mobility masterplans.',
    fullDesc: 'Manufactured from 50mm OD seamless 316 marine-grade stainless steel pipe. Provides secure dual-point locking for commercial office towers, metro stations, and public parks.',
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1000&q=80'
    ],
    applications: ['Metro Stations', 'Commercial Towers', 'Public Parks', 'Residential Communities'],
    specs: [
      { label: 'Grade', value: 'AISI 316 Marine Stainless Steel' },
      { label: 'Mounting', value: 'Sub-Surface Core Cast / Base Flange' },
      { label: 'Pipe OD', value: '50.8mm x 3.2mm Wall Thickness' },
      { label: 'Standards', value: 'RTA Dubai Guideline Compliant' }
    ],
    materials: ['316 Marine Stainless Steel'],
    dimensions: '850mm (W) x 800mm (H)',
    certifications: ['ISO 9001:2015', 'ASTM A276'],
    complianceBadges: ['Marine 316', 'RTA Aligned', 'Anti-Corrosion'],
    finishOptions: ['Satin Brushed 320 Grit', 'Mirror Polished', 'Electropolished Coast-Grade'],
    featured: false
  },
  {
    id: 'prod-terra-sort',
    slug: 'terra-sort-120l',
    name: 'Terra-Sort 120L Segregated Recycling Bin',
    category: 'outdoor-furniture',
    categoryName: 'Outdoor Furniture / Street Furniture',
    subcategory: 'Waste Management & Bins',
    tagline: 'Multi-compartment waste and recyclables segregation station with heavy galvanized liners',
    shortDesc: 'Triple-compartment architectural street waste receptacle featuring powder-coated zinc-rich primer steel and lockable hinged access doors.',
    fullDesc: 'Equipped with laser-cut iconography, internal removable galvanized liners, and integrated stub-out ashtray plates for public boulevard placement.',
    image: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=1000&q=80'
    ],
    applications: ['Public Promenades', 'Hotels & Resorts', 'Shopping Districts', 'Civic Plazas'],
    specs: [
      { label: 'Capacity', value: '3 x 40 Litres (120L Total)' },
      { label: 'Body', value: '2.5mm Galvanized Steel + Zinc Primer' },
      { label: 'Locking', value: 'Triangular Master Key Latch' },
      { label: 'Weight', value: '68 kg' }
    ],
    materials: ['Zinc-Plated Steel', 'EPDM Seals', 'Stainless Hinges'],
    dimensions: '1050mm (L) x 420mm (W) x 900mm (H)',
    certifications: ['ISO 14001:2015', 'Dubai Municipality Aligned'],
    complianceBadges: ['Zinc-Rich Coating', 'Segregated Sorting', 'Tamper-Proof'],
    finishOptions: ['RAL 7016 Anthracite', 'RAL 9005 Jet Black', 'Corten Effect Texture'],
    featured: false
  },
  {
    id: 'prod-cast-planter',
    slug: 'cast-plaza-planter',
    name: 'Cast-Plaza 900 Planter & Tree Grate',
    category: 'outdoor-furniture',
    categoryName: 'Outdoor Furniture / Street Furniture',
    subcategory: 'Planters & Tree Surrounds',
    tagline: 'Heavy architectural cast stone planter with integrated ductile iron tree grille',
    shortDesc: 'Thermal-insulating cast stone tree box designed to protect root systems from high UAE soil temperatures while providing civic street barrier functions.',
    fullDesc: 'Features integrated irrigation drainage channels, forklift slots for installation repositioning, and optional anti-ram vehicle arrest capability.',
    image: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=1000&q=80'
    ],
    applications: ['Streetscapes', 'Corporate Headquarters', 'Boulevards', 'Hotels'],
    specs: [
      { label: 'Dimensions', value: '900mm x 900mm x 800mm' },
      { label: 'Weight', value: '420 kg (Empty)' },
      { label: 'Drainage', value: 'Dual Bottom Siphon Outlets' },
      { label: 'Internal Lining', value: 'Bituminous Moisture Membrane' }
    ],
    materials: ['Reconstituted Granite Cast Stone', 'Ductile Cast Iron Grate'],
    dimensions: '900 x 900 x 800 mm',
    certifications: ['ISO 9001:2015'],
    complianceBadges: ['Heavy Mass', 'Root Protection', 'Drainage Integrated'],
    finishOptions: ['Honed Sandstone', 'Charcoal Basalt', 'Off-White Limestone'],
    featured: false
  },

  // 2. SECURITY SYSTEMS
  {
    id: 'prod-k4-bollards',
    slug: 'k4-bollards',
    name: 'K4 BOLLARDS – High-Security Barrier System',
    category: 'security-systems',
    categoryName: 'Security Systems',
    subcategory: 'Crash-Rated Rising Bollards',
    tagline: 'ASTM M30 / K4 Certified perimeter intrusion defense rising bollards',
    shortDesc: 'K4-rated security bollard installation deployed for critical infrastructure, government headquarters, and VIP entry portals across Dubai and the UAE.',
    fullDesc: 'Engineered to immobilize a 6.8-ton medium-duty truck traveling at 50 km/h (ASTM M30 / DOS K4). Available in automatic hydraulic, electro-mechanical, and fixed shallow-mount configurations with LED perimeter warning ring.',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb180c5f5?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb180c5f5?auto=format&fit=crop&w=1200&q=80'
    ],
    applications: ['Government Facilities', 'Embassies & Consulates', 'VIP Hotels', 'Critical Infrastructure'],
    specs: [
      { label: 'Crash Rating', value: 'ASTM F2656 M30 / DOS K4' },
      { label: 'Cylinder Diameter', value: '275 mm' },
      { label: 'Raised Height', value: '800 mm / 1000 mm' },
      { label: 'Operating Speed', value: 'Raise 3.2s / EFO 1.2s' }
    ],
    materials: ['High-Yield Structural Steel', 'AISI 316 Stainless Sleeve', 'Hydraulic Block'],
    dimensions: '275mm Dia x 800mm Height',
    certifications: ['ASTM F2656-15', 'PAS 68:2013', 'SIRA Dubai Aligned'],
    complianceBadges: ['ASTM M30 / K4', 'SIRA Aligned', 'Emergency Fast Operate'],
    finishOptions: ['AISI 316 Brushed Stainless Steel', 'RAL 7016 Anthracite', 'Custom Architectural Sleeves'],
    featured: true
  },
  {
    id: 'prod-viper-m50',
    slug: 'viper-m50-bollard',
    name: 'Viper-M50 ASTM Crash-Rated Bollard',
    category: 'security-systems',
    categoryName: 'Security Systems',
    subcategory: 'Hostile Vehicle Mitigation (HVM)',
    tagline: 'ASTM F2656 M50 / P1 certified hydraulic rising perimeter defense bollard',
    shortDesc: 'Zero-penetration vehicle arrest barrier capable of stopping a 7.5-tonne truck at 80 km/h (ASTM M50 / PAS 68 V/7500[N3]/80).',
    fullDesc: 'Full-scale physical crash-tested in accredited testing grounds with P1 penetration rating (under 1 meter). Heavy-duty hydraulic power pack with PLC control logic and loop detector interlocks.',
    image: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=1000&q=80'
    ],
    applications: ['Airport Perimeters', 'Financial Hubs', 'Military Bases', 'Palaces & VIP Entrances'],
    specs: [
      { label: 'Impact Rating', value: 'ASTM M50 / P1 (7.5t @ 80 km/h)' },
      { label: 'Cylinder OD', value: '355 mm Heavy Seamless Steel' },
      { label: 'Drive System', value: 'Integrated / Remote Hydraulic Pump' },
      { label: 'Emergency Time', value: 'EFO Accumulator < 1.0 Second' }
    ],
    materials: ['Heavy-Wall Structural Tube', 'Austenitic 316 Sleeve', 'Hardened Pivot Arm'],
    dimensions: '355mm Dia x 1000mm Raised Height',
    certifications: ['ASTM F2656 M50', 'PAS 68', 'IWA 14-1'],
    complianceBadges: ['ASTM M50 / P1', 'Zero Penetration', 'Crash Tested'],
    finishOptions: ['AISI 316 Stainless Steel', 'High-Visibility Yellow Chevrons'],
    featured: true
  },
  {
    id: 'prod-fortress-hb',
    slug: 'fortress-hb-blocker',
    name: 'Fortress-HB 1000 Hydraulic Road Blocker',
    category: 'security-systems',
    categoryName: 'Security Systems',
    subcategory: 'Hydraulic Road Blockers',
    tagline: 'High-security heavy hydraulic wedge road blocker with shallow foundation options',
    shortDesc: 'Heavy-impact wedge barrier engineered to protect dual-lane security gates against unauthorized heavy commercial vehicle intrusion.',
    fullDesc: 'Available in blocking widths from 2.0m to 4.5m with shallow embedment depth of only 400mm, resolving underground utility clash challenges in UAE urban locations.',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb180c5f5?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb180c5f5?auto=format&fit=crop&w=1000&q=80'
    ],
    applications: ['Border Checkpoints', 'Port Terminals', 'Refineries', 'Embassy Compounds'],
    specs: [
      { label: 'Blocker Height', value: '1000 mm Raised' },
      { label: 'Width Options', value: '2000mm to 4500mm' },
      { label: 'Axle Load', value: 'Up to 50 Tonnes Axle Loading' },
      { label: 'Rise Speed', value: 'Normal: 3.5s | EFO: 1.5s' }
    ],
    materials: ['High-Strength Structural Steel Welded Assembly', 'Epoxy Primer Coating'],
    dimensions: '3000mm (W) x 1000mm (H) x 400mm Embedment',
    certifications: ['PAS 68 Certified', 'ASTM F2656 Equivalent'],
    complianceBadges: ['50T Axle Load', 'Shallow Foundation', 'Heavy Duty'],
    finishOptions: ['High-Vis Yellow & Black Warning Stripes', 'Custom Marine Epoxy'],
    featured: false
  },
  {
    id: 'prod-apex-tk',
    slug: 'apex-tk-spikes',
    name: 'Apex-TK 300 Spike Tyre Killer',
    category: 'security-systems',
    categoryName: 'Security Systems',
    subcategory: 'Tyre Killers & Spikes',
    tagline: 'Bi-directional and uni-directional heavy hydraulic tyre deflation spikes',
    shortDesc: 'Spring-loaded and electromechanical spike teeth designed to instantly shred heavy commercial truck tyres in wrong-way ingress attempts.',
    fullDesc: 'Engineered with hardened steel teeth capable of puncturing run-flat and commercial radial tyres, rendering vehicles instantly undrivable.',
    image: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=1000&q=80'
    ],
    applications: ['Toll Plazas', 'Secure Car Parks', 'Customs Depots', 'Military Access Points'],
    specs: [
      { label: 'Spike Height', value: '150mm Above Roadway' },
      { label: 'Axle Rating', value: '40 Tonnes Continuous' },
      { label: 'Operation', value: 'Motorized / Hydraulic / Bi-Directional' },
      { label: 'Duty Cycle', value: '100% Continuous Duty' }
    ],
    materials: ['Hardened Tool Steel Teeth', 'Galvanized Steel Chassis'],
    dimensions: '3000mm (L) x 600mm (W) x 250mm (Depth)',
    certifications: ['CE Certified', 'ISO 9001:2015'],
    complianceBadges: ['Tire Shredding', '40T Axle', 'Dual Direction'],
    finishOptions: ['Traffic Yellow Anti-Slip Coating'],
    featured: false
  },
  {
    id: 'prod-guardian-cg',
    slug: 'guardian-cg-gate',
    name: 'Guardian-CG 800 Cantilever Crash Gate',
    category: 'security-systems',
    categoryName: 'Security Systems',
    subcategory: 'Crash-Rated Sliding Gates',
    tagline: 'Trackless cantilever automated crash barrier gate with integrated impact beam',
    shortDesc: 'Heavy-duty trackless cantilever sliding security gate rated for impact resistance without requiring any surface road track or overhead gantry.',
    fullDesc: 'Eliminates road trenching for tracks, accommodating clear openings up to 10 meters with rapid opening speeds and safety light curtain sensors.',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb180c5f5?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb180c5f5?auto=format&fit=crop&w=1000&q=80'
    ],
    applications: ['Industrial Estates', 'Airport Hangars', 'Logistics Warehouses', 'Data Centers'],
    specs: [
      { label: 'Clear Opening', value: '6m to 10m Single Leaf' },
      { label: 'Gate Height', value: '2.0m to 3.0m' },
      { label: 'Infill', value: 'Anti-Climb 358 Mesh / Heavy Louvers' },
      { label: 'Drive', value: '3-Phase Heavy Inverter Motor' }
    ],
    materials: ['Structural Hollow Section Steel', 'Hot-Dip Galvanized'],
    dimensions: '8000mm (L) x 2400mm (H)',
    certifications: ['BS EN 12453 Safety Certified'],
    complianceBadges: ['Trackless Cantilever', 'Anti-Climb', 'Inverter Driven'],
    finishOptions: ['RAL 7016 Anthracite', 'RAL 9005 Black', 'Hot Dip Galvanized'],
    featured: false
  },

  // 3. LIGHTING
  {
    id: 'prod-luxor-ws',
    slug: 'luxor-ws-sconce',
    name: 'Luxor-WS 18W Architectural Wall Sconce',
    category: 'lighting',
    categoryName: 'Lighting',
    subcategory: 'Interior Architectural Sconces',
    tagline: 'High-CRI 95+ dual-emission indirect architectural wall luminaire',
    shortDesc: 'Solid CNC-machined brass and anodized aluminum architectural wall sconce designed for luxury hotel guest rooms, VIP majlis, and executive offices.',
    fullDesc: 'Features custom optical collimators producing soft, glare-free bi-directional beam distributions with 0-10V / DALI-2 dimming compliance down to 0.1%.',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80'
    ],
    applications: ['Luxury Hotels', 'Executive Boardrooms', 'Residential Palaces', 'High-End Facades'],
    specs: [
      { label: 'Luminous Flux', value: '1,800 Lumens (100 lm/W)' },
      { label: 'Color Rendering', value: 'CRI 95+ (R9 > 85)' },
      { label: 'Color Temp', value: '2700K / 3000K / Dim-to-Warm' },
      { label: 'Ingress Rating', value: 'IP65 Interior / Exterior Rated' }
    ],
    materials: ['Extruded Architectural Aluminum', 'Optical PMMA Lenses'],
    dimensions: '120mm (W) x 80mm (D) x 300mm (H)',
    certifications: ['CE Certified', 'RoHS', 'Dubai Municipality Compliant'],
    complianceBadges: ['CRI 95+', 'DALI-2', 'IP65', 'Zero-Flicker'],
    finishOptions: ['Brushed Champagne Gold', 'Matte Architectural Black', 'Brushed Bronze'],
    featured: true
  },
  {
    id: 'prod-solaris-st',
    slug: 'solaris-st-streetlight',
    name: 'Solaris-ST 120W Smart Municipal Streetlight',
    category: 'lighting',
    categoryName: 'Lighting',
    subcategory: 'Municipal & Highway Streetlights',
    tagline: 'Estidama & Al Sa\'fat compliant high-efficacy roadway luminaire (160 lm/W)',
    shortDesc: 'Aerodynamic die-cast ADC12 aluminum street lighting fixture with tool-less maintenance entry and NEMA / Zhaga smart city IoT socket.',
    fullDesc: 'Equipped with Lumileds 5050 LED engines and customized Type II / Type III roadway optics delivering uniform illuminance in compliance with RTA road lighting specs.',
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80'
    ],
    applications: ['Municipal Highways', 'Urban Arterials', 'Industrial Parks', 'Residential Roads'],
    specs: [
      { label: 'System Efficacy', value: '160 Lumens per Watt' },
      { label: 'Total Output', value: '19,200 Lumens' },
      { label: 'Surge Protection', value: '10kV / 20kV SPD Built-In' },
      { label: 'Ratings', value: 'IP66 / IK09 / 100,000h L80B10' }
    ],
    materials: ['ADC12 Low-Copper Aluminum', 'Toughened Glass 4mm'],
    dimensions: '650mm (L) x 280mm (W) x 120mm (H)',
    certifications: ['Al Sa\'fat Certified', 'Estidama 2-Pearl', 'ENEC', 'CE'],
    complianceBadges: ['160 lm/W', 'IP66 & IK09', 'Zhaga IoT Ready'],
    finishOptions: ['Grey RAL 7040 Powder Coat', 'Black RAL 9005'],
    featured: true
  },
  {
    id: 'prod-helios-360',
    slug: 'helios-360-solar-pole',
    name: 'Helios-360 Off-Grid Solar Streetlight Pole',
    category: 'lighting',
    categoryName: 'Lighting',
    subcategory: 'Solar & Renewable Lighting',
    tagline: '360° cylindrical vertical solar wrapping column with lithium LiFePO4 battery',
    shortDesc: 'Self-sufficient 360-degree solar street lighting column engineered for UAE desert wind loads, eliminating civil cabling and electrical trenching costs.',
    fullDesc: 'Vertical photovoltaic wrapping cells capture omnidirectional sunlight while shedding desert sand naturally. Integrated smart MPPT controller guarantees 5 nights autonomy.',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
    ],
    applications: ['Remote Roads', 'Park Walkways', 'Off-Grid Developments', 'Eco-Resorts'],
    specs: [
      { label: 'Solar Modules', value: 'High-Efficiency SunPower Mono-Crystalline' },
      { label: 'Battery Capacity', value: 'LiFePO4 12.8V 100Ah (2000+ Cycles)' },
      { label: 'Autonomy', value: 'Up to 5 Rainy / Cloudy Days' },
      { label: 'Pole Height', value: '6 Meters / 8 Meters Octagonal' }
    ],
    materials: ['Hot-Dip Galvanized High-Yield Steel', 'Curved PV Modules'],
    dimensions: '6m to 8m Column Height',
    certifications: ['CE Certified', 'TUV Solar Verified', 'ISO 9001:2015'],
    complianceBadges: ['100% Off-Grid', '360° Solar Wrap', 'Zero Cabling'],
    finishOptions: ['Anodized Natural Aluminum', 'Desert Sand RAL 1015', 'Matte Black'],
    featured: true
  },
  {
    id: 'prod-grand-luxe',
    slug: 'grand-luxe-chandelier',
    name: 'Grand-Luxe Bespoke Atrium Chandelier',
    category: 'lighting',
    categoryName: 'Lighting',
    subcategory: 'Bespoke Chandeliers & Features',
    tagline: 'Custom hand-blown crystal and laser-sculpted architectural atrium chandelier',
    shortDesc: 'Showcase statement luminaire engineered for luxury hotel lobbies, convention centers, and multi-story commercial atrium spaces across the GCC.',
    fullDesc: 'Features engineered structural cable rigging, programmable DMX512 dynamic light scenes, and precision-cut optic crystal pendants suspended in cascading arrays.',
    image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1000&q=80'
    ],
    applications: ['Hotel Atriums', 'Convention Centers', 'VIP Majlis', 'Flagship Retail'],
    specs: [
      { label: 'Suspension', value: 'Aircraft Grade Stainless Steel 316 Rigging' },
      { label: 'Optics', value: 'Precision Asfour / Bohemian Lead Crystal' },
      { label: 'Control', value: 'DMX512 / DALI Architectural Gateway' },
      { label: 'Customization', value: 'Fully Bespoke Geometry & Scale' }
    ],
    materials: ['Architectural Brass', 'Optic K9 Crystal', 'Stainless Aircraft Rigging'],
    dimensions: 'Bespoke (Up to 12m Drop Height)',
    certifications: ['CE Certified', 'UL Listed Components'],
    complianceBadges: ['Bespoke Art', 'DMX Dynamic', 'Custom Rigging'],
    finishOptions: ['Polished Gold Brass', 'Satin Nickel', 'Gunmetal Mirror'],
    featured: false
  },
  {
    id: 'prod-linear-pro',
    slug: 'linear-pro-pendant',
    name: 'Linear-Pro 40W Suspended Continuous Pendant',
    category: 'lighting',
    categoryName: 'Lighting',
    subcategory: 'Commercial Interior Lighting',
    tagline: 'Continuous seamless architectural linear luminaire with micro-prismatic optics',
    shortDesc: 'Sleek architectural linear pendant with seamless joint connectors, low-glare UGR < 19 micro-prism diffuser, and integrated emergency battery packs.',
    fullDesc: 'Engineered for open-ceiling commercial offices, design studios, and civic institutions. Delivers direct/indirect illumination distributions for visual comfort.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80'
    ],
    applications: ['Commercial Offices', 'Design Studios', 'Libraries', 'Conference Rooms'],
    specs: [
      { label: 'UGR Rating', value: 'UGR < 19 Low Glare' },
      { label: 'Wattage', value: '40W / 1200mm Module' },
      { label: 'Optics', value: 'Microprismatic Glare Reduction Diffuser' },
      { label: 'Efficacy', value: '130 Lumens per Watt' }
    ],
    materials: ['Extruded Aluminum 6063-T5', 'PMMA Optical Diffuser'],
    dimensions: '1200mm / 2400mm x 50mm x 75mm',
    certifications: ['ENEC', 'CE', 'ISO 9001:2015'],
    complianceBadges: ['UGR < 19', 'Seamless Run', 'Direct/Indirect'],
    finishOptions: ['Matte White RAL 9016', 'Architectural Black RAL 9005', 'Anodized Silver'],
    featured: false
  },
  {
    id: 'prod-astra-dl',
    slug: 'astra-dl-downlight',
    name: 'Astra-DL 25W Architectural Recessed Downlight',
    category: 'lighting',
    categoryName: 'Lighting',
    subcategory: 'Downlights & Spotlights',
    tagline: 'Deep-recessed low-glare architectural spotlight with interchangeable optical reflectors',
    shortDesc: 'High-comfort downlight engineered for luxury hospitality and high-end residential spaces with UGR < 14 and ultra-deep baffle cutoff.',
    fullDesc: 'Incorporates modular twist-lock reflectors (15°, 24°, 38°, 60°) with Ra 97 color fidelity, bringing true vibrant color to stone and wood interior textures.',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80'
    ],
    applications: ['Hotel Guestrooms', 'Fine Dining Restaurants', 'Art Galleries', 'Majlis Spaces'],
    specs: [
      { label: 'Cutoff Angle', value: '45° Deep Shielding Angle' },
      { label: 'Glare Index', value: 'UGR < 14' },
      { label: 'Color Rendering', value: 'CRI 97 (R9 > 90)' },
      { label: 'Beam Angle', value: '15° / 24° / 38° Interchangeable' }
    ],
    materials: ['Die-Cast Cold-Forged Aluminum Heat Sink'],
    dimensions: '110mm Cutout x 135mm Height',
    certifications: ['CE', 'RoHS', 'TUV'],
    complianceBadges: ['CRI 97', 'UGR < 14', 'Deep Cutoff'],
    finishOptions: ['Trimless Plaster-In', 'Flanged Matte White', 'Spec Matte Black'],
    featured: false
  },
  {
    id: 'prod-marina-bl',
    slug: 'marina-bl-bollard',
    name: 'Marina-BL 35W Coastal Architectural Pathway Bollard',
    category: 'lighting',
    categoryName: 'Lighting',
    subcategory: 'Landscape & Pathway Lighting',
    tagline: 'IP67 coastal anti-corrosive architectural illumination column',
    shortDesc: 'Robust 1000mm pathway lighting column with full cutoff optics preventing upward light pollution, Dark-Sky compliant for landscape projects.',
    fullDesc: 'Constructed from die-cast marine alloy with double-layer fluorocarbon powder coating withstands extreme Gulf humidity, sea spray, and direct solar exposure.',
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1000&q=80'
    ],
    applications: ['Waterfront Marinas', 'Hotel Pathways', 'Private Villas', 'Public Boardwalks'],
    specs: [
      { label: 'Ingress Rating', value: 'IP67 Submersible Protection' },
      { label: 'Impact Strength', value: 'IK10 Heavy Vandal Resistance' },
      { label: 'Light Distribution', value: '360° Symmetrical Full Cut-Off' },
      { label: 'Dark Sky', value: 'Zero Upward Light Ratio (ULR 0%)' }
    ],
    materials: ['Corrosion-Resistant Marine Alloy', 'Polycarbonate UV Screen'],
    dimensions: '160mm Dia x 1000mm Height',
    certifications: ['IP67 Certified', 'IK10 Certified', 'Dark Sky Compliant'],
    complianceBadges: ['IP67 & IK10', 'Marine Grade', 'Dark-Sky Compliant'],
    finishOptions: ['Graphite Grey', 'Brushed Marine Silver', 'Warm Corten Bronze'],
    featured: false
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: 'proj-creek-rise',
    slug: 'creek-rise-dubai-creek-harbour',
    title: 'Creek Rise – Dubai Creek Harbour',
    location: 'Dubai Creek Harbour, Dubai',
    country: 'United Arab Emirates',
    category: ['lighting', 'commercial'],
    categoryDisplay: 'Architectural Lighting & Civil Infrastructure',
    shortDesc: 'Consultant-approved architectural lighting and high-specification facade luminaires deployed across waterfront residential towers.',
    fullOverview: 'Collaborated with DAR Consult for comprehensive photometric calculations, sample submittals (MS-CVL-0148 Rev.01), and on-site fixture alignment across waterfront residential podiums and towers.',
    scopeOfWork: [
      'Photometric Lux Simulations & Glare Studies',
      'MAS Submittal Preparation & Consultant Sign-off',
      'Architectural Luminaire Supply & QA/QC',
      'On-Site Commissioning & Handover'
    ],
    client: 'Emaar Properties / Main Contractor',
    consultant: 'Design & Architecture Bureau (DAR Consult)',
    contractor: 'Engineering Contracting Company (ECC)',
    date: '2021 – 2023',
    featured: true,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80'
    ],
    productsSupplied: ['Custom Linear Sconces', 'Landscape Inground Up-Lights', 'Podium Wall Washers'],
    stats: [
      { label: 'Fixtures Deployed', value: '1,450+ Units' },
      { label: 'MAS Reference', value: 'MS-CVL-0148' },
      { label: 'Compliance', value: '100% Approved' }
    ]
  },
  {
    id: 'proj-la-mer',
    slug: 'la-mer-south-development',
    title: 'La Mer South Beachfront & Promenade',
    location: 'Jumeirah 1, Dubai',
    country: 'United Arab Emirates',
    category: ['lighting', 'outdoor-furniture'],
    categoryDisplay: 'Beachfront Promenade & Coastal Infrastructure',
    shortDesc: 'Marine-grade outdoor lighting and coastal furniture fixtures installed along Dubai’s premier beachfront lifestyle development.',
    fullOverview: 'Engineered for high salinity and humid marine atmospheric conditions under SSHIC International Engineering supervision (MI-0002-ARCO-MAR-LAN-00012).',
    scopeOfWork: [
      'Marine Grade C5-M Coating Verification',
      'Pathway Luminaire & Streetscape Integration',
      'Contractor BoQ Take-Off & Delivery Scheduling'
    ],
    client: 'Meraas Development',
    consultant: 'SSH International Engineering Consultants (SSH)',
    contractor: 'Al Futtaim Carillion',
    date: '2022 – 2023',
    featured: true,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'
    ],
    productsSupplied: ['Marine IP67 Pathway Columns', 'Anti-Corrosive Sconces', 'Bespoke Timber Seating'],
    stats: [
      { label: 'Promenade Length', value: '2.5 km' },
      { label: 'Ingress Protection', value: 'IP67 / C5-M' },
      { label: 'Approval Status', value: 'SSH Certified' }
    ]
  },
  {
    id: 'proj-bluewaters',
    slug: 'bluewaters-hospitality-masterplan',
    title: 'Bluewaters Hospitality Masterplan',
    location: 'Bluewaters Island, Dubai',
    country: 'United Arab Emirates',
    category: ['lighting', 'security'],
    categoryDisplay: 'Hospitality Illumination & VIP Perimeter Security',
    shortDesc: 'VIP perimeter security barriers and luxury hospitality lighting deployed across the Bluewaters entertainment and dining district.',
    fullOverview: 'Collaborated with Mirage Leisure and Atkins to provide ASTM M30 crash-rated bollards and custom architectural sconces matching the island’s modern maritime aesthetic.',
    scopeOfWork: [
      'Crash Defense Trenching Engineering & Submittals',
      'Hydraulic Line Layouts & Loop Detector Siting',
      'Bespoke Hospitality Lighting Submittal Package'
    ],
    client: 'Meraas / Dubai Holding',
    consultant: 'Mirage Leisure Development / WSP Atkins',
    contractor: 'Multiplex / ALEC',
    date: '2021 – 2022',
    featured: true,
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb180c5f5?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb180c5f5?auto=format&fit=crop&w=1200&q=80'
    ],
    productsSupplied: ['ASTM M30 Crash Bollards', 'Hydraulic Wedge Blockers', 'Atrium Luminaires'],
    stats: [
      { label: 'Crash Rating', value: 'ASTM M30 / K4' },
      { label: 'Submittal Ref', value: '6002-JLW-2600' },
      { label: 'Warranty', value: '10 Years Structural' }
    ]
  },
  {
    id: 'proj-h-residence',
    slug: 'the-h-residence-al-safa',
    title: 'The H Residence – Al Safa',
    location: 'Al Safa 1, Dubai',
    country: 'United Arab Emirates',
    category: ['lighting', 'commercial'],
    categoryDisplay: 'Luxury Mixed-Use Residential & Streetscape',
    shortDesc: 'Architectural lighting submittal and custom streetscape fittings approved by Dewan Architects + Engineers.',
    fullOverview: 'Provided comprehensive technical submittal D20-12-ASGC-311-MT covering high-CRI recessed architectural spotlights, facade graze fixtures, and public realm seating.',
    scopeOfWork: [
      'Facade Illumination Calculation Studies',
      'Dewan Architectural MAS Approval',
      'Delivery Coordination & Site QA/QC Sign-off'
    ],
    client: 'HMM Real Estate',
    consultant: 'Dewan Architects + Engineers',
    contractor: 'ASGC Construction',
    date: '2023',
    featured: false,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80'
    ],
    productsSupplied: ['Facade Graze Luminaires', 'Deep-Baffle Downlights', 'UHPC Benches'],
    stats: [
      { label: 'Ref Number', value: 'D20-12-ASGC' },
      { label: 'Architectural Score', value: '100% Compliant' },
      { label: 'Delivery', value: 'On-Time Handover' }
    ]
  }
];

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

