// App data from apps.json
export interface AppData {
  id: string;
  name: string;
  type: string;
  version: string;
  color: string;
  iconPath: string;
  repository: string;
  description?: string;
  features?: string[];
  technologies?: string[];
  demoUrl?: string;
  codeSnippet?: string;

  // Enhanced fields for detailed product pages
  longDescription?: string;
  featureDescriptions?: { [key: string]: string };
  benefits?: string[];
  useCases?: string[];
  testimonials?: {
    name: string;
    company: string;
    role: string;
    quote: string;
    avatar?: string;
  }[];
  faq?: {
    question: string;
    answer: string;
  }[];
  screenshots?: string[];
  pricing?: {
    basic: number;
    professional: number;
    enterprise: string;
  };
}

// App data with additional fields for the website
export const apps: AppData[] = [
  {
    id: 'abacus',
    name: 'Abacus',
    type: 'Inventory Management Software',
    version: '0.0.46',
    color: '#0718c4',
    iconPath: 'icons/abacus',
    repository: 'https://github.com/haclab-co/abacus-releases',
    description: 'Drowning in inventory chaos? Abacus eliminates costly stockouts, prevents capital-draining overstocking, automates tedious purchase orders, and provides real-time visibility across multiple locations to maximize your profits and customer satisfaction.',
    features: [
      'Real-time inventory tracking',
      'Barcode scanning and generation',
      'Purchase order management',
      'Sales and order tracking',
      'Reporting and analytics',
    ],
    technologies: ['Electron', 'React', 'Node.js', 'SQLite'],
    demoUrl: 'https://github.com/haclab-co/abacus-releases',
    codeSnippet: `// Abacus Inventory Management
import { InventoryManager } from '@haclab/abacus-core';
import { BarcodeScanner } from '@haclab/abacus-hardware';

// Initialize inventory manager
const inventoryManager = new InventoryManager({
  database: 'inventory.db',
  autoSync: true,
  backupInterval: 24 * 60 * 60 * 1000 // Daily backup
});`,

    // Enhanced fields for detailed product page
    longDescription: `<p><strong>Stop losing sales to stockouts and wasting capital on excess inventory.</strong> Abacus is the comprehensive inventory management solution that transforms chaos into strategic advantage for businesses of all sizes.</p><br/>
<p>Abacus eliminates the most costly inventory problems through:</p><br/>
<ul>
  <li><strong>Real-time tracking</strong> across all locations with instant visibility into stock levels</li>
  <li><strong>Intelligent forecasting</strong> that predicts demand based on historical data and trends</li>
  <li><strong>Automated purchase orders</strong> that maintain optimal inventory without constant monitoring</li>
  <li><strong>Multi-channel synchronization</strong> that prevents double-selling across online and in-store sales</li>
</ul><br/>

<p>The intuitive interface requires minimal training while offering powerful customization options that adapt to your unique business processes. Whether you're a boutique retailer or multi-warehouse distributor, Abacus transforms inventory challenges into opportunities for growth, efficiency, and increased profitability.</p>`,

    featureDescriptions: {
      'Real-time inventory tracking': 'Monitor stock levels across multiple locations in real-time. Get instant updates when items are received, sold, or transferred, ensuring you always have accurate inventory data.',
      'Barcode scanning and generation': 'Streamline inventory processes with built-in barcode scanning and generation. Compatible with most USB and Bluetooth scanners, or use your device\'s camera for mobile scanning.',
      'Purchase order management': 'Create, track, and manage purchase orders from a single interface. Set reorder points, track vendor performance, and automate purchase order creation based on inventory levels.',
      'Sales and order tracking': 'Track sales and orders from multiple channels in one place. Integrate with your point of sale system or e-commerce platform for seamless order management.',
      'Reporting and analytics': 'Make data-driven decisions with comprehensive reporting and analytics. Generate custom reports on inventory turnover, stock levels, sales performance, and more.'
    },

    benefits: [
      'Reduce inventory costs by optimizing stock levels',
      'Prevent stockouts and lost sales with automated reordering',
      'Improve efficiency with streamlined inventory processes',
      'Enhance accuracy with barcode scanning and real-time tracking',
      'Make better decisions with comprehensive reporting and analytics'
    ],

    useCases: [
      'Retail stores managing product inventory',
      'Warehouses tracking stock across multiple locations',
      'Manufacturing facilities managing parts and materials',
      'E-commerce businesses synchronizing online and physical inventory',
      'Service businesses tracking tools and equipment'
    ],

    testimonials: [
      {
        name: 'Sarah Johnson',
        company: 'Retail Solutions Inc.',
        role: 'Inventory Manager',
        quote: 'Abacus has transformed how we manage inventory. We\'ve reduced stockouts by 75% and improved our inventory turnover ratio significantly.',
        avatar: '/images/testimonials/sarah-j.jpg'
      },
      {
        name: 'Michael Chen',
        company: 'Global Distributors',
        role: 'Operations Director',
        quote: 'The real-time tracking and analytics in Abacus have given us unprecedented visibility into our inventory. It\'s been a game-changer for our multi-warehouse operation.',
        avatar: '/images/testimonials/michael-c.jpg'
      },
      {
        name: 'Jessica Williams',
        company: 'Craft Supplies Direct',
        role: 'Owner',
        quote: 'As a small business owner, I needed an inventory solution that was powerful but easy to use. Abacus fits the bill perfectly and has scaled with us as we\'ve grown.',
        avatar: '/images/testimonials/jessica-w.jpg'
      }
    ],

    faq: [
      {
        question: 'Can Abacus integrate with my existing POS system?',
        answer: 'Yes, Abacus offers integrations with popular POS systems including Square, Shopify, and Lightspeed. We also provide an API for custom integrations with other systems.'
      },
      {
        question: 'Is Abacus suitable for multi-location businesses?',
        answer: 'Absolutely! Abacus is designed to handle multiple locations, allowing you to track inventory across warehouses, stores, or any other locations. You can easily transfer stock between locations and generate reports for specific locations or your entire business.'
      },
      {
        question: 'Does Abacus work offline?',
        answer: 'Yes, Abacus has offline capabilities that allow you to continue working even without an internet connection. Your data will automatically sync when you reconnect.'
      },
      {
        question: 'Can I customize Abacus to fit my specific business needs?',
        answer: 'Yes, Abacus offers extensive customization options. You can create custom fields, design your own workflows, and configure the system to match your business processes.'
      }
    ],

    screenshots: [
      '/images/app-screenshots/abacus-dashboard.png',
      '/images/app-screenshots/abacus-inventory.png',
      '/images/app-screenshots/abacus-barcode.png',
      '/images/app-screenshots/abacus-reports.png'
    ],

    pricing: {
      basic: 49,
      professional: 99,
      enterprise: 'Custom'
    }
  },
  {
    id: 'evia',
    name: 'Evia RMS',
    type: 'Restaurant Management Software',
    version: '0.0.17',
    color: '#722ed1',
    iconPath: 'icons/evia',
    repository: 'https://github.com/haclab-co/evia-releases',
    description: 'Struggling with chaotic restaurant operations? Evia RMS eliminates costly order mix-ups, streamlines kitchen-to-server communication, optimizes table turnover rates, and prevents inventory shortages during peak hours that frustrate customers and damage your reputation.',
    features: [
      'Order management',
      'Table reservations',
      'Kitchen display system',
      'Inventory tracking',
      'Staff management',
    ],
    technologies: ['Electron', 'React', 'Node.js', 'PostgreSQL'],
    demoUrl: 'https://github.com/haclab-co/evia-releases',

    longDescription: `<p><strong>Stop losing customers due to slow service and order mistakes.</strong> Evia RMS transforms chaotic restaurant operations into a streamlined, profitable business that keeps diners coming back.</p><br/>
<p>Evia RMS tackles the most critical restaurant challenges through:</p><br/>
<ul>
  <li><strong>Intelligent order management</strong> that ensures accurate orders with digital tickets instantly transmitted to kitchen</li>
  <li><strong>Interactive kitchen display system</strong> that reduces wait times and improves food quality coordination</li>
  <li><strong>Dynamic table management</strong> that optimizes seating arrangements and maximizes capacity during peak hours</li>
  <li><strong>Real-time inventory tracking</strong> that prevents stockouts and reduces food waste</li>
</ul><br/>

<p>The system works seamlessly across tablets, smartphones, and fixed terminals, requiring minimal training for your staff. Whether you're a small café or multi-location restaurant group, Evia RMS transforms operational challenges into opportunities for improved customer satisfaction, efficiency, and profitability.</p>`
  },
  {
    id: 'homz',
    name: 'Homz',
    type: 'Hotel Management System',
    version: '0.1.26',
    color: '#FF4500',
    iconPath: 'icons/homz',
    repository: 'https://github.com/haclab-co/homz-releases',
    description: 'Tired of double bookings and unhappy guests? Homz prevents costly reservation conflicts, streamlines check-in/check-out processes, optimizes housekeeping operations, and enhances guest relationship management to eliminate negative reviews and maximize revenue per available room.',
    features: [
      'Reservation management',
      'Front desk operations',
      'Housekeeping management',
      'Point of sale integration',
      'Guest relationship management',
    ],
    technologies: ['Electron', 'React', 'Node.js', 'PostgreSQL'],
    demoUrl: 'https://github.com/haclab-co/homz-releases',

    longDescription: `<p><strong>Eliminate double bookings and operational inefficiencies that damage your hotel's reputation.</strong> Homz transforms chaotic hotel operations into seamless guest experiences that generate five-star reviews and maximize revenue per available room.</p><br/>
<p>Homz addresses the most pressing hospitality challenges through:</p><br/>
<ul>
  <li><strong>Synchronized reservation management</strong> that prevents booking conflicts across all channels in real-time</li>
  <li><strong>Streamlined check-in/check-out processes</strong> with digital forms and mobile options that reduce wait times</li>
  <li><strong>Optimized housekeeping management</strong> with real-time room status updates and prioritized assignments</li>
  <li><strong>Integrated guest relationship tools</strong> that track preferences and history to create personalized experiences</li>
</ul><br/>

<p>The intuitive interface works across desktop computers, tablets, and smartphones, requiring minimal training for your staff. Whether you manage a boutique property or full-service hotel, Homz transforms operational challenges into opportunities for exceptional guest experiences and maximized revenue.</p>`
  },
  {
    id: 'inncontrol',
    name: 'InnControl',
    type: 'Hotel Management System',
    version: '0.1.24',
    color: '#eb2f96',
    iconPath: 'icons/inncontrol',
    repository: 'https://github.com/haclab-co/inncontrol-releases',
    description: 'Is your small hotel drowning in administrative chaos? InnControl centralizes multi-channel bookings, prevents revenue leakage through dynamic pricing, automates guest communications, and provides actionable analytics to maximize occupancy rates while you focus on delivering exceptional guest experiences.',
    features: [
      'Property management',
      'Channel management',
      'Booking engine',
      'Revenue management',
      'Guest services',
    ],
    technologies: ['Electron', 'Vue.js', 'Node.js', 'MongoDB'],
    demoUrl: 'https://github.com/haclab-co/inncontrol-releases',

    longDescription: `<p><strong>Stop drowning in administrative tasks while missing revenue opportunities.</strong> InnControl is specifically designed for small to medium-sized properties (5-50 rooms), delivering enterprise-level capabilities without the complexity or cost.</p>
<br/>
<p>InnControl solves the unique challenges of small hotel operators through:</p><br/>
<ul>
  <li><strong>Multi-channel booking engine</strong> that centralizes reservations from all sources into one system</li>
  <li><strong>Dynamic pricing tools</strong> that maximize revenue without requiring a dedicated revenue manager</li>
  <li><strong>Automated guest communications</strong> that deliver personalized messaging throughout the guest journey</li>
  <li><strong>Comprehensive dashboard</strong> providing at-a-glance insights into key performance metrics</li>
</ul><br/>

<p>The system is built for properties where staff wear multiple hats, with an intuitive interface that requires minimal training. Whether you operate a bed and breakfast, boutique hotel, or small inn, InnControl transforms operational challenges into opportunities for increased occupancy, higher rates, and more direct bookings—all while reducing your administrative workload.</p>`
  },
  {
    id: 'kanify',
    name: 'Kanify',
    type: 'Garage Management System',
    version: '0.0.2',
    color: '#FF4500',
    iconPath: 'icons/kanify',
    repository: 'https://github.com/haclab-co/kanify-releases',
    description: 'Is your garage losing money on mismanaged repairs? Kanify digitizes vehicle service histories, streamlines job scheduling, prevents parts inventory stockouts, and enhances customer communication to eliminate repair delays that frustrate customers and drain your profits.',
    features: [
      'Vehicle service history tracking',
      'Job scheduling and assignment',
      'Parts inventory management',
      'Customer communication portal',
      'Financial reporting and analytics',
    ],
    technologies: ['Vue.js', 'Laravel', 'MySQL', 'Docker'],
    demoUrl: 'https://github.com/haclab-co/kanify-releases',

    longDescription: `<p><strong>Stop losing money through disorganized repairs and frustrated customers.</strong> Kanify transforms chaotic garage operations into a streamlined system that delights customers and maximizes your profitability.</p>
<br/>
<p>Kanify solves the biggest challenges facing auto repair shops through:</p><br/>
<ul>
  <li><strong>Digital vehicle service history</strong> that creates complete, searchable records for every vehicle</li>
  <li><strong>Intelligent job scheduling</strong> that optimizes technician workloads and provides accurate completion estimates</li>
  <li><strong>Real-time parts inventory management</strong> that prevents costly delays from missing components</li>
  <li><strong>Customer communication portal</strong> with automated updates and digital approval for additional work</li>
</ul><br/>

<p>The system works seamlessly across desktop computers, tablets, and smartphones, requiring minimal training for your staff. Whether you run a small independent garage or multi-bay service center, Kanify transforms operational challenges into opportunities for increased efficiency, exceptional customer experiences, and improved profitability.</p>`
  },
  {
    id: 'kyeyo',
    name: 'Kyeyo CV',
    type: 'Recruitment Management System',
    version: '0.1.12',
    color: '#391085',
    iconPath: 'icons/kyeyo',
    repository: 'https://github.com/haclab-co/kyeyo-releases',
    description: 'Missing out on top talent due to disorganized recruitment? Kyeyo CV intelligently matches candidates to positions, automates resume screening, streamlines interview scheduling, and accelerates hiring workflows to secure top talent before your competitors.',
    features: [
      'Candidate tracking',
      'Job posting management',
      'Interview scheduling',
      'Resume parsing',
      'Hiring workflow automation',
    ],
    technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
    demoUrl: 'https://github.com/haclab-co/kyeyo-releases',

    longDescription: `<p><strong>Stop letting top talent slip through your fingers.</strong> Kyeyo CV transforms disorganized recruitment into a strategic advantage that consistently secures the best candidates before your competitors.</p>
<br/>
<p>Kyeyo CV addresses the most critical hiring challenges through:</p><br/>
<ul>
  <li><strong>Intelligent candidate matching</strong> that identifies the most promising applicants based on skills, experience, and fit</li>
  <li><strong>Automated resume screening</strong> that reduces initial evaluation time by up to 75%</li>
  <li><strong>Effortless interview scheduling</strong> with automated coordination and integrated video conferencing</li>
  <li><strong>Accelerated hiring workflows</strong> that reduce time-to-hire by 40% with real-time status dashboards</li>
</ul><br/>

<p>The intuitive interface works across desktop computers, tablets, and smartphones, requiring minimal training for your team. Whether you're a growing startup or established enterprise, Kyeyo CV transforms recruitment challenges into opportunities for faster hiring, better candidate quality, and improved ROI on your talent acquisition efforts.</p>`
  },
  {
    id: 'lenkit',
    name: 'Lenkit',
    type: 'Loan and Savings Management System',
    version: '0.0.29',
    color: '#31c48d',
    iconPath: 'icons/lenkit',
    repository: 'https://github.com/haclab-co/lenkit-releases',
    description: 'Is your financial institution losing money through manual errors? Lenkit automates complex interest calculations, streamlines loan approval workflows, ensures regulatory compliance, and provides comprehensive payment tracking to eliminate delinquencies that impact your bottom line.',
    features: [
      'Loan application and approval workflow',
      'Savings account management',
      'Automated interest calculations',
      'Payment tracking and reminders',
      'Financial reporting and analytics',
    ],
    technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
    demoUrl: 'https://github.com/haclab-co/lenkit-releases',

    longDescription: `<p><strong>Stop losing money through manual errors and inefficient loan processing.</strong> Lenkit transforms error-prone financial operations into a streamlined, compliant system that protects your bottom line and enhances customer satisfaction.</p>
<br/>
<p>Lenkit addresses the most critical challenges for financial institutions through:</p><br/>
<ul>
  <li><strong>Automated interest calculation engine</strong> that handles complex structures with perfect accuracy</li>
  <li><strong>Streamlined loan approval workflows</strong> that reduce processing time by 60%</li>
  <li><strong>Built-in regulatory compliance</strong> with automated reporting and complete audit trails</li>
  <li><strong>Proactive payment tracking</strong> that reduces delinquency rates by up to 40%</li>
</ul><br/>

<p>The system integrates seamlessly with payment gateways, mobile money platforms, and banking systems, requiring minimal training for your staff. Whether you're a microfinance organization, credit union, or community bank, Lenkit transforms financial management challenges into opportunities for operational excellence, reduced risk, and improved performance.</p>`
  },
  {
    id: 'mission-control',
    name: 'Mission Control',
    type: 'Haclab Management Software',
    version: '0.0.3',
    color: '#ff0000',
    iconPath: 'icons/mission-control',
    repository: 'https://github.com/haclab-co/mission-control-releases',
    description: 'Is your development team missing deadlines and losing track of priorities? Mission Control visualizes project progress in real-time, automates client updates, tracks billable hours accurately, and provides team performance analytics to prevent scope creep and ensure on-time, on-budget delivery.',
    features: [
      'Project management',
      'Client relationship management',
      'Task tracking',
      'Time tracking',
      'Team performance analytics',
    ],
    technologies: ['React', 'Node.js', 'GraphQL', 'PostgreSQL'],
    demoUrl: 'https://github.com/haclab-co/mission-control-releases',

    longDescription: `<p><strong>Stop missing deadlines and struggling with project visibility.</strong> Mission Control transforms chaotic development processes into a streamlined operation that delivers projects on time, on budget, and exceeds client expectations.</p>
<br/>
<p>Mission Control solves the most critical challenges for development teams through:</p><br/>
<ul>
  <li><strong>Real-time project visualization</strong> with live dashboards that show actual progress versus planned timelines</li>
  <li><strong>Automated client updates</strong> that keep stakeholders informed without consuming developer time</li>
  <li><strong>Accurate billable hours tracking</strong> that increases revenue capture by up to 20%</li>
  <li><strong>Team performance analytics</strong> that optimize resource allocation and prevent burnout</li>
</ul><br/>

<p>The system integrates deeply with development tools like GitHub, GitLab, and CI/CD pipelines, requiring minimal training for your team. Whether you're a small agency or enterprise development department, Mission Control transforms project management challenges into opportunities for improved delivery consistency, enhanced client satisfaction, and increased profitability.</p>`
  },
  {
    id: 'prosy',
    name: 'Prosy',
    type: 'Property Management System',
    version: '0.0.28',
    color: '#151a4b',
    iconPath: 'icons/prosy',
    repository: 'https://github.com/haclab-co/prosy-releases',
    description: 'Are tenant complaints and maintenance issues overwhelming your property business? Prosy automates rent collection and tracking, streamlines tenant screening, digitizes maintenance request workflows, and provides financial analytics to minimize vacancies and maximize your property portfolio profitability.',
    features: [
      'Property listing management',
      'Tenant screening and management',
      'Rent collection and tracking',
      'Maintenance request handling',
      'Financial reporting',
    ],
    technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
    demoUrl: 'https://github.com/haclab-co/prosy-releases',

    longDescription: `<p><strong>Stop letting tenant complaints and maintenance issues overwhelm your business.</strong> Prosy transforms chaotic property management into a streamlined operation that maximizes rental income, minimizes vacancies, and builds long-term wealth.</p>
<br/>
<p>Prosy addresses the most critical challenges for property managers through:</p><br/>
<ul>
  <li><strong>Automated rent collection and tracking</strong> that reduces late payments by 35% and administrative time by 80%</li>
  <li><strong>Effective tenant screening</strong> with integrated background checks and customizable scoring criteria</li>
  <li><strong>Digital maintenance request management</strong> that reduces resolution times by 40%</li>
  <li><strong>Comprehensive financial analytics</strong> for tracking performance across your entire portfolio</li>
</ul><br/>

<p>The system integrates seamlessly with accounting platforms, electronic signature services, and marketing websites, requiring minimal training for your staff. Whether you manage a few units or a large portfolio, Prosy transforms property management challenges into opportunities for increased efficiency, higher tenant satisfaction, and improved investment returns.</p>`
  },
  {
    id: 'zenwrench',
    name: 'NgWrench',
    type: 'Garage Management System',
    version: '0.0.130',
    color: '#722ed1',
    iconPath: 'icons/zenwrench',
    repository: 'https://github.com/haclab-co/zenwrench-releases',
    description: 'Is your auto repair shop hemorrhaging money through inefficiency? NgWrench digitizes work order management, tracks vehicle service histories, optimizes parts inventory, and streamlines invoicing to eliminate billing errors that leave money on the table and customers frustrated.',
    features: [
      'Work order management',
      'Customer database',
      'Vehicle history tracking',
      'Inventory management',
      'Invoicing and payment processing',
    ],
    technologies: ['Angular', 'Node.js', 'MongoDB', 'Express'],
    demoUrl: 'https://github.com/haclab-co/zenwrench-releases',

    longDescription: `<p><strong>Stop hemorrhaging money through inefficient operations and billing errors.</strong> NgWrench transforms chaotic repair processes into a streamlined operation that maximizes revenue, delights customers, and builds a thriving automotive business.</p>
<br/>
<p>NgWrench solves the most critical challenges for auto repair shops through:</p><br/>
<ul>
  <li><strong>Digital work order management</strong> that tracks repairs from estimate to invoice with complete documentation</li>
  <li><strong>Comprehensive vehicle history tracking</strong> that eliminates diagnostic guesswork and builds customer trust</li>
  <li><strong>Real-time parts inventory management</strong> that prevents costly delays and optimizes stock levels</li>
  <li><strong>Streamlined invoicing and payment processing</strong> that eliminates billing errors and accelerates collections</li>
</ul><br/>

<p>The intuitive dashboard provides at-a-glance insights into shop performance metrics, requiring minimal training for your staff. Whether you operate a small independent shop or multi-location service center, NgWrench transforms operational challenges into opportunities for increased revenue, improved customer satisfaction, and sustainable business growth.</p>`
  },
  {
    id: 'smart',
    name: 'SMART',
    type: 'School Management and Resource Tracker',
    version: '0.0.1',
    color: '#0087ff',
    iconPath: 'icons/smart',
    repository: 'https://github.com/haclab-co/smart-releases',
    description: 'Is your school buried under administrative paperwork? SMART centralizes comprehensive student records, automates academic performance tracking, streamlines parent-teacher communication, and optimizes class scheduling to improve educational outcomes and administrative efficiency.',
    features: [
      'Student information management',
      'Attendance tracking',
      'Grade and assessment management',
      'Timetable scheduling',
      'Parent-teacher communication',
    ],
    technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
    demoUrl: 'https://github.com/haclab-co/smart-releases',

    longDescription: `<p><strong>Stop drowning in administrative paperwork while struggling to track student progress.</strong> SMART transforms overwhelming educational administration into a streamlined process that enhances learning outcomes and empowers teachers to focus on teaching.</p>
<br/>
<p>SMART addresses the most critical challenges for educational institutions through:</p><br/>
<ul>
  <li><strong>Comprehensive student records management</strong> that centralizes academic data, attendance, behavior, and contacts</li>
  <li><strong>Advanced academic performance tracking</strong> that identifies learning gaps and enables targeted interventions</li>
  <li><strong>Streamlined parent-teacher communication</strong> with automated translation and conference scheduling</li>
  <li><strong>Intelligent class scheduling optimization</strong> that reduces timetable creation time by 90%</li>
</ul><br/>

<p>The intuitive dashboard provides at-a-glance insights into school performance metrics, requiring minimal training for your staff. Whether you're a small private school or large public institution, SMART transforms administrative challenges into opportunities for improved efficiency, enhanced educational outcomes, and stronger school communities.</p>`
  }
];
