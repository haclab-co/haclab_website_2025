import React, { useEffect, useState, useRef, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const HomeTab = lazy(() => import('./tabs/HomeTab'));
const ServicesTab = lazy(() => import('./tabs/ServicesTab'));
const PortfolioTab = lazy(() => import('./tabs/PortfolioTab'));
const AppIndex = lazy(() => import('./tabs/AppIndex'));
const AppDetail = lazy(() => import('./tabs/AppDetail'));
const TeamTab = lazy(() => import('./tabs/TeamTab'));
const BlogTab = lazy(() => import('./tabs/BlogTab'));
const BlogPostPage = lazy(() => import('./tabs/BlogPostPage'));
const ContactTab = lazy(() => import('./tabs/ContactTab'));

import { 
  ArrowRight, 
  ArrowLeft,
  Sparkles, 
  CodeXml, 
  Activity, 
  LayoutGrid, 
  ShieldCheck, 
  Cpu, 
  Workflow, 
  Award,
  Terminal,
  Database,
  Globe,
  Layers,
  Laptop,
  Smartphone,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  Boxes,
  ExternalLink,
  FileText,
  GitBranch,
  ListChecks,
  Package,
  Search,
  Settings,
  ShoppingCart,
  MessageCircle,
  Github,
  Linkedin,
  Send,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import ShareButton from './ShareButton';
import { companyProfile, servicesData, projectsData, teamData, blogPostsData } from '../data/haclabData';
import type { GeneratedAppDefinition } from '../data/appCatalog';
import { updateSEO } from '../utils/seo';
import BreadcrumbSchema from '../components/seo/BreadcrumbSchema';

interface Telemetry {
  status: string;
  latency: string;
  load: string;
  security: string;
  ip: string;
  activeDevelopers: number;
}

const REGIONS_TELEMETRY: Record<string, Telemetry> = {
  Kampala: { status: 'Primary Master Node', latency: '4ms', load: '18%', security: '99.99%', ip: '197.231.14.88', activeDevelopers: 4 },
  Entebbe: { status: 'Secondary Backup Node', latency: '7ms', load: '12%', security: '100%', ip: '197.231.14.90', activeDevelopers: 2 },
  Jinja: { status: 'Industrial Edge Client', latency: '12ms', load: '24%', security: '99.98%', ip: '197.231.15.5', activeDevelopers: 1 },
  Mbarara: { status: 'Western Regional Gateway', latency: '15ms', load: '8%', security: '99.99%', ip: '197.231.16.21', activeDevelopers: 2 },
  Gulu: { status: 'Northern Operations Mesh', latency: '19ms', load: '5%', security: '99.97%', ip: '197.231.18.4', activeDevelopers: 1 }
};

const getAppRoute = () => {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  if (path === '/apps') return { section: 'apps' as const };
  const match = path.match(/^\/apps\/([^/]+)$/);
  if (match) return { section: 'app-detail' as const, slug: decodeURIComponent(match[1]) };
  return { section: 'site' as const };
};

const TAB_PATHS: Record<string, 'home' | 'services' | 'portfolio' | 'apps' | 'team' | 'blog' | 'contact'> = {
  '/services': 'services',
  '/portfolio': 'portfolio',
  '/team': 'team',
  '/blog': 'blog',
  '/contact': 'contact',
};

const getBlogSlugFromPath = (path: string): string | null => {
  const match = path.match(/^\/blog\/([^/]+)$/);
  return match ? decodeURIComponent(match[1]) : null;
};

const TabLoading = () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="flex flex-col items-center gap-3 text-slate-500 font-mono text-sm">
      <div className="w-5 h-5 border-2 border-slate-800 border-t-brand-red rounded-full animate-spin" />
      <span>loading workspace...</span>
    </div>
  </div>
);

export default function PreviewWorkspace() {
  const [route, setRoute] = useState(getAppRoute);
  const [activeTab, setActiveTab] = useState<'home' | 'services' | 'portfolio' | 'apps' | 'team' | 'blog' | 'contact'>(() => {
    const currentRoute = getAppRoute();
    return currentRoute.section === 'site' ? 'home' : 'apps';
  });
  
  const [selectedRegion, setSelectedRegion] = useState<string>('Kampala');
  const [homeRightTab, setHomeRightTab] = useState<'workflow' | 'awards'>('workflow');
  const [selectedServiceId, setSelectedServiceId] = useState<string>('software-dev');
  const [selectedProjectId, setSelectedProjectId] = useState<string>('wion-motors');
  const [selectedPostId, setSelectedPostId] = useState<string>('clean-codebase');
  
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const catalogRef = useRef<{ appCatalog: GeneratedAppDefinition[]; appCatalogBySlug: Record<string, GeneratedAppDefinition> }>({ appCatalog: [], appCatalogBySlug: {} });
  const [catalogReady, setCatalogReady] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const prefetch = () => {
      if (!catalogReady) {
        import('../data/appCatalog').then((mod) => {
          if (!controller.signal.aborted) {
            catalogRef.current = { appCatalog: mod.appCatalog, appCatalogBySlug: mod.appCatalogBySlug };
            setCatalogReady(true);
          }
        });
      }
    };
    if (typeof requestIdleCallback === 'function') {
      const id = requestIdleCallback(prefetch, { timeout: 2000 });
      return () => { cancelIdleCallback(id); controller.abort(); };
    }
    const timer = setTimeout(prefetch, 500);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [catalogReady]);

  useEffect(() => {
    if ((activeTab === 'apps' || route.section !== 'site') && !catalogReady) {
      import('../data/appCatalog').then((mod) => {
        catalogRef.current = { appCatalog: mod.appCatalog, appCatalogBySlug: mod.appCatalogBySlug };
        setCatalogReady(true);
      });
    }
  }, [activeTab, route, catalogReady]);

  useEffect(() => {
    const syncRoute = () => {
      const nextRoute = getAppRoute();
      setRoute(nextRoute);
      if (nextRoute.section !== 'site') {
        setActiveTab('apps');
      } else {
        const path = window.location.pathname.replace(/\/+$/, '') || '/';
        const blogSlug = getBlogSlugFromPath(path);
        if (blogSlug) {
          setActiveTab('blog');
          const post = blogPostsData.find(p => p.slug === blogSlug);
          if (post) {
            setSelectedPostId(post.id);
          }
        } else {
          const tabFromPath = TAB_PATHS[path];
          if (tabFromPath) {
            setActiveTab(tabFromPath);
          } else if (path === '/') {
            setActiveTab('home');
          }
        }
      }
    };

    const handleNavHome = () => {
      setActiveTab('home');
      window.history.pushState({}, '', '/');
      setRoute({ section: 'site' });
    };

    window.addEventListener('popstate', syncRoute);
    window.addEventListener('haclab-nav-home', handleNavHome);
    syncRoute();
    return () => {
      window.removeEventListener('popstate', syncRoute);
      window.removeEventListener('haclab-nav-home', handleNavHome);
    };
  }, []);

  useEffect(() => {
    let title = 'Haclab Portal';
    let description = 'Haclab is a premier software development studio building robust enterprise solutions, web apps, and data systems.';
    let url = window.location.href;
    let schemaData: any = undefined;

    if (route.section === 'app-detail' && 'slug' in route && route.slug) {
      const app = catalogRef.current.appCatalogBySlug[route.slug];
      if (app) {
        title = `${app.name} - Haclab App Catalog`;
        description = app.summary || description;
        schemaData = {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": app.name,
          "operatingSystem": "Web",
          "applicationCategory": "BusinessApplication",
          "description": app.summary,
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          }
        };
      } else {
        title = 'App Not Found - Haclab Portal';
      }
    } else {
      switch (activeTab) {
        case 'home':
          title = 'Overview - Haclab | Software Development Kampala, Uganda';
          description = 'Discover Haclab: Software Synthesis & Design Core building enterprise-grade applications and web solutions in Kampala, Uganda.';
          break;
        case 'services':
          title = 'Services - Haclab | Custom Software, Web & Mobile Development Uganda';
          description = 'Explore our engineering services: custom software development, web apps, mobile apps, database design, and SEO in Kampala, Uganda.';
          schemaData = {
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Software Development",
            "provider": {
              "@type": "Organization",
              "name": "Haclab Company Limited"
            },
            "areaServed": "Uganda"
          };
          break;
        case 'portfolio':
          title = 'Portfolio - Haclab | Client Deployments & Software Projects Uganda';
          description = 'View our successful deployments and projects across Uganda. See how we deliver enterprise-grade software solutions.';
          break;
        case 'apps':
          title = 'App Catalog - Haclab | Enterprise Software Products';
          description = 'Browse the Haclab product inventory of ready-to-deploy enterprise modules and unified workspace tools.';
          break;
        case 'team':
          title = 'Team - Haclab | Software Engineers & Designers in Kampala';
          description = 'Meet the elite team of engineers and designers at Haclab committed to building high-performance systems in Kampala, Uganda.';
          break;
        case 'blog':
          title = 'Tech Log - Haclab | Software Engineering Insights & Articles';
          description = 'Read our technical articles, insights, and engineering logs about modern software architecture and development in Uganda.';
          break;
        case 'contact':
          title = 'Contact - Haclab | Software Development Inquiries Kampala';
          description = 'Get in touch with Haclab for custom software consultations, project inquiries, and enterprise solutions in Kampala, Uganda.';
          break;
      }
    }

    updateSEO({ title, description, url, schemaData });
  }, [activeTab, route]);

  const pushRoute = (path: string) => {
    window.history.pushState({}, '', path);
    const nextRoute = getAppRoute();
    setRoute(nextRoute);
    if (nextRoute.section !== 'site') setActiveTab('apps');
  };

  const handleSelectTab = (tabId: typeof activeTab) => {
    setActiveTab(tabId);
    const path = tabId === 'home' ? '/' : `/${tabId}`;
    window.history.pushState({}, '', path);
    setRoute({ section: 'site' });
  };

  const handleOpenApp = (slug: string) => {
    setActiveTab('apps');
    pushRoute(`/apps/${slug}`);
  };

  const awardsList = [
    { name: 'Top Web Developer', provider: 'AppFutura Cert #1', image: '/assets/images/awards/appfutura1.png', rating: '5.0/5.0' },
    { name: 'Top App Developer', provider: 'AppFutura Cert #2', image: '/assets/images/awards/appfutura2.png', rating: 'Top 10 East Africa' },
    { name: 'Certified Software Partner', provider: 'GoodFirms Authority', image: '/assets/images/awards/goodfirm1.png', rating: 'Validated Vendor' },
    { name: 'Top Web Agency', provider: 'GoodFirms Showcase', image: '/assets/images/awards/goodfirm2.png', rating: 'Best Delivery Track' },
    { name: 'Leading System Builder', provider: 'DesignRush Partner', image: '/assets/images/awards/designrush1.png', rating: '98% Client Score' }
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setContactForm({ name: '', email: '', subject: '', message: '' });
      }, 5000);
    }, 1200);
  };

  const selectedService = servicesData.find(s => s.id === selectedServiceId) || servicesData[0];
  const selectedProject = projectsData.find(p => p.id === selectedProjectId) || projectsData[0];
  const selectedPost = blogPostsData.find(b => b.id === selectedPostId) || blogPostsData[0];
  const telemetry = REGIONS_TELEMETRY[selectedRegion];

  return (
    <main className="w-full h-full flex-1 bg-slate-950 text-slate-100 flex flex-col overflow-hidden select-text font-sans relative">
      
      <BreadcrumbSchema pageName={
        activeTab === 'home' ? 'Home' :
        activeTab === 'services' ? 'Services & Solutions' :
        activeTab === 'portfolio' ? 'Deployments & Portfolio' :
        activeTab === 'apps' ? 'App Catalog' :
        activeTab === 'team' ? 'The Squad' :
        activeTab === 'blog' ? 'Tech Log' :
        activeTab === 'contact' ? 'Contact Us' : ''
      } />

      <div className="bg-slate-950/90 border-b border-slate-900/80 sticky top-0 z-30 shrink-0 select-none backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 flex items-center overflow-x-auto gap-2 sm:gap-3 h-14 scrollbar-none scrollbar-hide">
          {[
            { id: 'home', label: 'OVERVIEW', num: '01' },
            { id: 'services', label: 'SERVICES', num: '02' },
            { id: 'portfolio', label: 'DEPLOYMENTS', num: '03' },
            { id: 'apps', label: 'APPS', num: '04' },
            { id: 'team', label: 'SQUAD', num: '05' },
            { id: 'blog', label: 'TECH LOG', num: '06' },
            { id: 'contact', label: 'CONTACT', num: '07' },
          ].map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <a
                key={tab.id}
                href={tab.id === 'home' ? '/' : `/${tab.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleSelectTab(tab.id as typeof activeTab);
                }}
                className={`relative px-4 py-2 min-h-[48px] text-[12.5px] font-mono tracking-wider font-semibold whitespace-nowrap shrink-0 cursor-pointer transition-all duration-200 rounded-md flex items-center gap-1.5 ${
                  isSelected
                      ? 'text-brand-red-bright'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/30'
                }`}
              >
                <span className={`text-[12px] ${isSelected ? 'text-brand-red-bright/60 font-bold' : 'text-slate-600 font-normal'}`}>
                  {tab.num}.
                </span>
                
                <span>{tab.label}</span>

                {isSelected && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    className="absolute inset-0 bg-brand-red/5 border border-brand-red/20 shadow-[0_0_12px_rgba(255,0,0,0.05)] rounded-md -z-10 animate-fade"
                  />
                )}
                
                {isSelected && (
                  <motion.span
                    layoutId="activeTabDot"
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    className="w-1.5 h-1.5 rounded-full bg-brand-red absolute bottom-1 left-1/2 -translate-x-1/2 shadow-lg"
                  />
                )}
              </a>
            );
          })}
          <div className="ml-auto shrink-0 hidden sm:block">
            <ShareButton
              title={
                activeTab === 'home' ? 'Overview - Haclab Portal' :
                activeTab === 'services' ? 'Services & Solutions - Haclab Portal' :
                activeTab === 'portfolio' ? 'Deployments & Portfolio - Haclab Portal' :
                activeTab === 'team' ? 'The Squad - Haclab Portal' :
                activeTab === 'blog' ? 'Tech Log - Haclab Portal' :
                activeTab === 'contact' ? 'Contact Us - Haclab Portal' :
                'Haclab Portal'
              }
              text="Check out Haclab — software development & enterprise solutions in Kampala, Uganda."
            />
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto md:overflow-hidden p-3 sm:p-5 md:p-6 lg:p-8 flex flex-col justify-start">
        <div className="max-w-7xl mx-auto w-full h-auto md:h-full flex flex-col min-h-0">
          
          <AnimatePresence mode="wait">
            <Suspense fallback={<TabLoading />}>
              {activeTab === 'home' && (
                <HomeTab
                  companyProfile={companyProfile}
                  selectedRegion={selectedRegion}
                  setSelectedRegion={setSelectedRegion}
                  homeRightTab={homeRightTab}
                  setHomeRightTab={setHomeRightTab}
                  awardsList={awardsList}
                  telemetry={telemetry}
                  onNavigate={(tab) => setActiveTab(tab)}
                />
              )}
              {activeTab === 'services' && (
                <ServicesTab
                  servicesData={servicesData}
                  selectedServiceId={selectedServiceId}
                  setSelectedServiceId={setSelectedServiceId}
                  selectedService={selectedService}
                />
              )}
              {activeTab === 'portfolio' && (
                <PortfolioTab
                  projectsData={projectsData}
                  selectedProjectId={selectedProjectId}
                  setSelectedProjectId={setSelectedProjectId}
                  selectedProject={selectedProject}
                />
              )}
              {activeTab === 'apps' && (
                !catalogReady ? (
                  <div className="flex items-center justify-center h-64 text-slate-400 font-mono text-sm">
                    Loading app catalog...
                  </div>
                ) : route.section === 'app-detail' ? (
                  <AppDetail app={catalogRef.current.appCatalogBySlug[route.slug]} onBack={() => pushRoute('/apps')} onRequestDemo={() => handleSelectTab('contact')} />
                ) : (
                  <AppIndex onOpenApp={handleOpenApp} appCatalog={catalogRef.current.appCatalog} />
                )
              )}
              {activeTab === 'team' && <TeamTab teamData={teamData} />}
              {activeTab === 'blog' && (() => {
                const currentPath = window.location.pathname.replace(/\/+$/, '') || '/';
                const slug = getBlogSlugFromPath(currentPath);
                const post = slug ? blogPostsData.find(p => p.slug === slug) : null;
                
                if (slug && post) {
                  return (
                    <BlogPostPage
                      post={post}
                      onBack={() => {
                        handleSelectTab('blog');
                        window.history.pushState({}, '', '/blog');
                      }}
                    />
                  );
                }
                
                return (
                  <BlogTab
                    blogPostsData={blogPostsData}
                    selectedPostId={selectedPostId}
                    setSelectedPostId={(id) => {
                      setSelectedPostId(id);
                      const post = blogPostsData.find(p => p.id === id);
                      if (post) {
                        window.history.pushState({}, '', `/blog/${post.slug}`);
                      }
                    }}
                    selectedPost={selectedPost}
                  />
                );
              })()}
              {activeTab === 'contact' && (
                <ContactTab
                  companyProfile={companyProfile}
                  contactForm={contactForm}
                  setContactForm={setContactForm}
                  formSubmitted={formSubmitted}
                  loading={loading}
                  handleContactSubmit={handleContactSubmit}
                />
              )}
            </Suspense>
          </AnimatePresence>
          
        </div>
      </div>

      <footer className="border-t border-slate-900/60 bg-slate-950 shrink-0 select-none text-center p-2.5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-[13.5px] font-mono text-slate-550">
          <div className="flex items-center gap-1.5">
            <span>© {new Date().getFullYear()} {companyProfile.fullName}.</span>
            <span className="text-brand-red-bright font-bold">Kampala, Uganda.</span>
          </div>
          <div>
            <span>Synthesized in Cloud Container</span>
          </div>
        </div>
      </footer>

      <a
        href={`https://wa.me/${companyProfile.phone.replace(/[^0-9]/g, '')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-[0_4px_12px_rgba(37,211,102,0.4)] hover:bg-[#20bd5a] hover:-translate-y-1 transition-transform duration-300 group"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute right-full mr-4 bg-slate-900 text-white text-[13px] font-mono px-3 py-2 rounded-lg border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl flex items-center">
          Chat with us
          <span className="absolute top-1/2 -right-1.5 -translate-y-1/2 border-[6px] border-transparent border-l-slate-900 border-t-transparent border-b-transparent border-r-0"></span>
        </span>
      </a>
    </main>
  );
}
