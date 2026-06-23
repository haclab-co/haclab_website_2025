import { Project, Service, TeamMember, BlogPost, FileItem } from '../types';

export const companyProfile = {
  name: 'Haclab',
  fullName: 'Haclab Company Limited',
  founder: 'Douglas Were',
  foundedYear: '2020',
  location: 'Kampala, Uganda',
  email: 'info@haclab.net',
  phone: '+256 708 183 272',
  tagline: 'Custom Software Development for Your Business',
  summary: 'Haclab Company Limited is a premier digital engineering studio based in Kampala, Uganda. We operate at the intersection of robust backend computations, elegant functional user experiences, and rigorous technical guidelines. We meet customers, discuss needs, and construct custom high-precision standalone software, web systems, and mobile applications.',
  vision: 'To establish a standard of software production where reliability, clean mechanics, and computational efficiency are priority #1.',
  mission: 'Empowering enterprises, logistics giants, and ambitious tech founders with software systems that are mathematically stable, beautifully designed, and built to endure.'
};

export const filesList: FileItem[] = [
  { id: '1', name: 'Home.tsx', icon: 'FileCode', extension: 'tsx', category: 'core' },
  { id: '2', name: 'Services.json', icon: 'FileJson', extension: 'json', category: 'services' },
  { id: '3', name: 'Projects.yaml', icon: 'FileText', extension: 'yaml', category: 'portfolio' },
  { id: '4', name: 'Team_Core.md', icon: 'FileEdit', extension: 'md', category: 'team' },
  { id: '5', name: 'Contact_Config.sh', icon: 'Terminal', extension: 'sh', category: 'contact' }
];

export const servicesData: Service[] = [
  {
    id: 'software-dev',
    title: 'Software Development',
    iconName: 'CodeXml',
    shortDescription: 'Robust, custom, and secure standalone software tailored to complex enterprise logic and requirements.',
    longDescription: 'We build end-to-end custom software solutions with deep architectural precision. From designing reliable relational structures to provisioning high-performance backend pipelines, we deliver tailored systems built to survive heavy production workloads.',
    technologies: ['Golang', 'Node.js', 'TypeScript', 'Docker', 'RESTful APIs'],
    useCase: 'Deploying highly available administrative processes, secure middleware, and automated transaction lines.'
  },
  {
    id: 'web-dev',
    title: 'Web Development',
    iconName: 'LayoutGrid',
    shortDescription: 'Professional websites that help you overcome geographical limitations and increase exposure.',
    longDescription: 'We construct fast, SEO-optimized, and beautiful web experiences centering polished Swiss layouts, responsive styling, and fast interactive modules so your brand stands out.',
    technologies: ['React/Vite', 'Next.js', 'Tailwind CSS', 'TypeScript', 'SEO Best Practices'],
    useCase: 'High-speed business landing platforms, administrative dashboards, and customer-facing web apps.'
  },
  {
    id: 'mobile-app',
    title: 'Mobile App Development',
    iconName: 'Activity',
    shortDescription: 'Well-crafted mobile applications that bring your products and services to life.',
    longDescription: 'Designing fluid cross-platform android & iOS mobile apps that perform natively, ensuring robust communication lines with master systems even under weak remote networks.',
    technologies: ['React Native', 'Flutter', 'iOS / Android SDKs', 'Push Notifications'],
    useCase: 'On-the-go utility apps, customer booking engines, and logistics tracking tools.'
  },
  {
    id: 'database-design',
    title: 'Database Design',
    iconName: 'ShieldCheck',
    shortDescription: 'Efficient database solutions for storing, managing, and retrieving your valuable data.',
    longDescription: 'We build durable, transactional-safe data layer schemas with optimal indexing, strict relational locks, and automated backup routines to keep user information safe.',
    technologies: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis Caching', 'Schema Indexing'],
    useCase: 'Optimizing and securing core records, distributed ledger systems, and active caches.'
  },
  {
    id: 'ecommerce-solutions',
    title: 'E-Commerce Solutions',
    iconName: 'Cpu',
    shortDescription: 'Online shopping platforms that help you sell products and services globally.',
    longDescription: 'Creating friction-free consumer pathways complete with automated shopping grids, quick payment integration, and intuitive inventories for instant scaling.',
    technologies: ['Custom Payment APIs', 'Mobile Money', 'Shopify Ecosystem', 'Inventory Management'],
    useCase: 'Building custom multi-carrier storefronts, merchant invoice trackers, and digital marketplaces.'
  },
  {
    id: 'seo-performance',
    title: 'SEO & Performance',
    iconName: 'Workflow',
    shortDescription: 'Optimal performance, speed, and search visibility so that users find and use your platform.',
    longDescription: 'Maxing out Lighthouse performance indexes, structuring clear schema graphs, and organizing server-side rendering routes to ensure peak search result visibility.',
    technologies: ['Lighthouse Auditing', 'Server-Side Rendering (SSR)', 'Semantic HTML', 'Cache Headers'],
    useCase: 'Increasing organic lead traffic, improving page loading speeds, and optimizing conversion funnels.'
  }
];

export const projectsData: Project[] = [
  {
    id: 'nagoa',
    title: 'NAGOA - National Auto Garage Owners Association',
    category: 'Association Platform',
    description: "A professional platform for Uganda's leading auto garage owners association.",
    fullDetails: 'NAGOA is an independent, nonprofit organization dedicated to elevating the vehicle repair trade into a more respectable and professional business. The platform features a garage locator, membership management, training resources, advocacy information, and a showcase of Uganda\'s automotive community.',
    techStack: ['React', 'Node.js', 'TypeScript', 'Tailwind CSS'],
    role: 'Full-Stack Development & Design',
    year: '2025',
    liveUrl: 'https://nagoa.org/',
    imageUrl: '/assets/images/projects/nagoa.png'
  },
  {
    id: 'shamwa-engineering',
    title: 'Shamwa Engineering & Investments Ltd',
    category: 'Corporate Website',
    description: 'A modern web platform for a leading engineering and construction firm in Uganda.',
    fullDetails: 'Haclab built a robust online presence for Shamwa Engineering & Investments Ltd, a premier provider of comprehensive engineering, construction, and plumbing services located in Kampala. The platform features a responsive design showcasing their portfolio, services, and expertise.',
    techStack: ['React', 'Next.js', 'Tailwind CSS'],
    role: 'Full-Stack Development',
    year: '2026',
    liveUrl: 'https://www.shamwaengineering.com/',
    imageUrl: '/assets/images/projects/shamwa.png'
  },
  {
    id: 'duke-car-technology',
    title: 'Duke Car Technology Ltd',
    category: 'Automotive Service Platform',
    description: "A comprehensive website for Uganda's leading automotive workshop and garage.",
    fullDetails: "Designed and developed for Duke's Garage in Naalya, Kampala, led by renowned automotive expert Paul Duke Kaganzi. This platform serves as a digital forefront for their top-tier auto repair, maintenance, and interior design services, integrating contact forms and service catalogs.",
    techStack: ['React', 'Node.js', 'Vite', 'Tailwind CSS'],
    role: 'Web Development & UI/UX Design',
    year: '2026',
    liveUrl: 'https://dukecartechnology.com/',
    imageUrl: '/assets/images/projects/dukecar.png'
  }
];

export const teamData: TeamMember[] = [
  {
    name: 'Mudali Derick',
    role: 'Software Engineer',
    avatar: '/assets/images/team/mudali.jpg',
    bio: 'A dedicated engineer focused on constructing robust backend pipelines and elegant frontend architectures. Committed to high-precision software delivery and scalable system design.',
    skills: ['Software Architecture', 'Full-Stack Development', 'System Design', 'React', 'Node.js'],
    github: 'https://github.com/therickm',
    linkedin: 'https://www.linkedin.com/in/mudali-derick/'
  }
];

export const blogPostsData: BlogPost[] = [
  {
    id: 'clean-codebase',
    slug: 'competitive-edge-high-precision-software-east-africa',
    title: 'The Competitive Edge of High-Precision Software Development in East Africa',
    date: 'June 18, 2026',
    author: 'Douglas Were',
    readTime: '5 min read',
    summary: 'How focusing on low dependency footprint, precise database schemas, and clean architectures elevates software lifetime value.',
    content: `<p>When we talk about high-quality software, the metric isn't how many trendy frameworks are loaded into package.json. High-precision engineering is about creating software that does exactly what it was built for—efficiently, securely, and with zero waste.</p>

<h2>Our Core Engineering Principles</h2>
<p>At Haclab, our process follows these clear rules:</p>
<ul>
  <li><strong>Never mock what can be engineered elegantly:</strong> Robust system behaviors require actual relational integrity, deterministic code flow, and responsive error handling.</li>
  <li><strong>Design mobile money links with strict idempotency:</strong> Mobile Money carriage over unstable USSD or REST endpoints is notoriously prone to connection timeouts. By utilizing redis-based session locking and unique payload keys, we eliminate all duplicate transactions.</li>
  <li><strong>Optimistic client states on slow connections:</strong> Rather than freezing screens with infinite loadings under high mobile packet loss, we load structural frames instantaneously and commit optimistic database state updates locally.</li>
</ul>
<p>The result is software that your team can rely on, your customers can trust, and your business can scale without accumulating technical debt that erodes value over time.</p>`,
    tags: ['Architecture', 'Performance', 'Clean Code'],
    imageUrl: '/assets/images/blog/competitive-edge-high-precision-software-east-africa-hero.webp',
    seoTitle: 'High-Precision Software Development in East Africa | Haclab',
    seoDescription: 'Discover how East African businesses benefit from high-precision engineering — clean architectures, idempotent mobile money integrations, and optimistic UI states.'
  }
];
