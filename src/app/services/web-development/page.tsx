import React from 'react';
import ServiceHeroSection from '@/components/sections/ServiceHeroSection';
import ServiceFeatures from '@/components/sections/ServiceFeatures';
import ServiceProcess from '@/components/sections/ServiceProcess';
import ServiceShowcase from '@/components/sections/ServiceShowcase';
import CTASection from '@/components/sections/CTASection';
import FAQSection from '@/components/sections/FAQSection';
import UgandaLocationsSection from '@/components/sections/UgandaLocationsSection';
import { FiGlobe, FiLayout, FiSmartphone, FiShoppingCart, FiSearch, FiShield, FiZap } from 'react-icons/fi';
import type { Metadata } from 'next';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import ServiceSchema from '@/components/seo/ServiceSchema';
import { webDevelopmentFaqs } from '@/data/faqs';

export const metadata: Metadata = {
  title: 'Web Development Services in Uganda - Haclab Company Limited',
  description: 'Professional web development services in Kampala, Uganda. We create responsive websites, web applications, e-commerce solutions, and content management systems optimized for Ugandan businesses and the East African market.',
  keywords: 'web development Uganda, website design Kampala, responsive websites Uganda, web applications Kampala, e-commerce websites Uganda, CMS development Kampala, Haclab web development, website services Entebbe, web design Jinja, website company Mukono, web developer Wakiso',
  openGraph: {
    title: 'Web Development Services in Uganda - Haclab Company Limited',
    description: 'Professional web development services for businesses in Kampala and across Uganda. Responsive websites, web applications, and e-commerce solutions.',
    url: 'https://haclab.net/services/web-development',
    type: 'website',
  },
};

export default function WebDevelopmentPage() {
  // Hero section content
  const heroIcon = <FiGlobe size={20} />;
  const heroTitle = "Web Development";
  const heroDescription = "We create professional, responsive websites and web applications that help you overcome geographical limitations and increase your online presence. Our web solutions are designed to engage your audience and drive business growth.";
  const heroCode = `// Modern Web Development Stack
import React from 'react';
import { motion } from 'framer-motion';
import { createClient } from '@sanity/client';

// Initialize headless CMS
const cmsClient = createClient({
  projectId: 'your-project-id',
  dataset: 'production',
  useCdn: true
});

// Fetch data from CMS
export async function getStaticProps() {
  const pageData = await cmsClient.fetch(\`
    *[_type == "page" && slug.current == "home"]{
      title,
      description,
      sections[]{
        ...,
        content[]{...}
      }
    }[0]
  \`);

  return {
    props: { pageData },
    revalidate: 60 // ISR - revalidate every minute
  };
}

// React component with animations
export default function HomePage({ pageData }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1>{pageData.title}</h1>
      <p>{pageData.description}</p>
      {/* Render dynamic sections */}
    </motion.div>
  );
}`;

  // Features section content
  const featuresTitle = "Web Development Features";
  const featuresDescription = "Our web development services cover everything from simple websites to complex web applications, all built with the latest technologies and best practices.";
  const features = [
    {
      title: "Responsive Design",
      description: "Websites that look and function perfectly on all devices, from desktops to smartphones.",
      icon: <FiSmartphone size={24} />,
      code: `// Responsive Design
const responsiveStyles = css\`
  @media (max-width: 768px) {
    .container {
      flex-direction: column;
      padding: 1rem;
    }
  }

  @media (max-width: 480px) {
    .heading {
      font-size: 1.5rem;
    }
  }
\`;`
    },
    {
      title: "Modern UI/UX",
      description: "Intuitive user interfaces and engaging user experiences that keep visitors coming back.",
      icon: <FiLayout size={24} />,
      code: `// Modern UI Components
function HeroSection() {
  return (
    <section className="hero">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Welcome to the Future
      </motion.h1>
      <GlassCard>
        <p>Discover our services</p>
      </GlassCard>
    </section>
  );
}`
    },
    {
      title: "E-Commerce Solutions",
      description: "Online stores with secure payment processing, inventory management, and customer accounts.",
      icon: <FiShoppingCart size={24} />,
      code: `// E-Commerce Integration
const store = new CommerceStore({
  products: fetchProducts(),
  checkout: {
    paymentGateways: ['stripe', 'paypal'],
    shipping: calculateShipping,
    tax: calculateTax
  },
  inventory: syncWithWarehouse
});`
    },
    {
      title: "Content Management",
      description: "Easy-to-use CMS solutions that allow you to update your website content without technical knowledge.",
      icon: <FiGlobe size={24} />,
      code: `// CMS Integration
const contentTypes = [
  {
    name: 'blogPost',
    fields: [
      { name: 'title', type: 'string', required: true },
      { name: 'content', type: 'richText' },
      { name: 'author', type: 'reference', to: 'author' },
      { name: 'categories', type: 'array', of: 'category' }
    ]
  }
];`
    },
    {
      title: "SEO Optimization",
      description: "Built-in search engine optimization to help your website rank higher in search results.",
      icon: <FiSearch size={24} />,
      code: `// SEO Optimization
export function SEOHead({ title, description, url, image }) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <link rel="canonical" href={url} />
    </Head>
  );
}`
    },
    {
      title: "Performance Optimization",
      description: "Fast-loading websites optimized for performance, with caching and code splitting.",
      icon: <FiZap size={24} />,
      code: `// Performance Optimization
module.exports = {
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  experimental: {
    optimizeCss: true,
    optimizeImages: true,
  },
  webpack: (config) => {
    // Add bundle analyzer in production
    if (process.env.ANALYZE) {
      config.plugins.push(new BundleAnalyzerPlugin());
    }
    return config;
  },
};`
    }
  ];

  // Process section content
  const processTitle = "Our Web Development Process";
  const processDescription = "We follow a structured approach to web development, ensuring that every project is delivered on time, within budget, and meets your business objectives.";
  const processSteps = [
    {
      title: "Discovery & Planning",
      description: "We start by understanding your business, target audience, and goals to create a detailed project plan.",
      code: `// Phase 1: Discovery & Planning
function discoveryPhase(client) {
  // Gather requirements
  const businessGoals = identifyBusinessGoals(client);
  const targetAudience = analyzeTargetAudience(client);
  const competitorAnalysis = analyzeCompetitors(client.industry);

  // Define project scope
  const projectScope = {
    pages: definePages(businessGoals),
    features: identifyFeatures(businessGoals, targetAudience),
    contentRequirements: planContent(businessGoals),
    technicalRequirements: determineTechStack(projectScope)
  };

  return {
    projectBrief: createBrief(businessGoals, targetAudience),
    sitemap: createSitemap(projectScope.pages),
    timeline: estimateTimeline(projectScope),
    budget: calculateBudget(projectScope)
  };
}`
    },
    {
      title: "Design & Wireframing",
      description: "We create wireframes and design mockups to visualize the website structure and appearance.",
      code: `// Phase 2: Design & Wireframing
async function designPhase(discoveryOutput) {
  // Create wireframes
  const wireframes = {
    mobile: createMobileWireframes(discoveryOutput.sitemap),
    tablet: createTabletWireframes(discoveryOutput.sitemap),
    desktop: createDesktopWireframes(discoveryOutput.sitemap)
  };

  // Client feedback and revisions
  const approvedWireframes = await getClientApproval(wireframes);

  // Visual design
  const designSystem = createDesignSystem({
    colors: defineColorPalette(),
    typography: defineTypography(),
    components: defineUIComponents()
  });

  const designs = {
    mobile: createMobileDesigns(approvedWireframes.mobile, designSystem),
    tablet: createTabletDesigns(approvedWireframes.tablet, designSystem),
    desktop: createDesktopDesigns(approvedWireframes.desktop, designSystem)
  };

  // Client feedback and revisions
  return await getClientApproval(designs);
}`
    },
    {
      title: "Development",
      description: "Our developers build your website using the latest technologies and best practices.",
      code: `// Phase 3: Development
async function developmentPhase(designOutput) {
  // Setup development environment
  const repo = initializeRepository();
  const devEnvironment = setupDevEnvironment();

  // Frontend development
  const components = buildUIComponents(designOutput.designSystem);
  const pages = buildPages(designOutput.designs, components);

  // Backend development (if needed)
  const api = designOutput.requiresBackend
    ? buildBackendAPI()
    : null;

  const cms = designOutput.requiresCMS
    ? setupCMS()
    : null;

  // Integrations
  const integrations = implementIntegrations(designOutput.integrations);

  // Assemble website
  const website = {
    frontend: assembleWebsite(pages, components),
    backend: api,
    cms: cms,
    integrations: integrations
  };

  return website;
}`
    },
    {
      title: "Testing & QA",
      description: "Rigorous testing to ensure your website works perfectly across all devices and browsers.",
      code: `// Phase 4: Testing & QA
async function testingPhase(website) {
  // Functional testing
  const functionalTests = runFunctionalTests(website);

  // Responsive testing
  const responsiveTests = testResponsiveness(website, [
    'mobile', 'tablet', 'desktop', 'large-desktop'
  ]);

  // Browser compatibility
  const browserTests = testBrowsers(website, [
    'chrome', 'firefox', 'safari', 'edge'
  ]);

  // Performance testing
  const performanceTests = {
    lighthouse: runLighthouseAudit(website),
    webVitals: measureWebVitals(website),
    loadTesting: simulateLoad(website)
  };

  // Accessibility testing
  const a11yTests = testAccessibility(website);

  // Security testing
  const securityTests = testSecurity(website);

  // Fix issues
  const issues = collectIssues([
    functionalTests, responsiveTests, browserTests,
    performanceTests, a11yTests, securityTests
  ]);

  if (issues.length > 0) {
    await fixIssues(website, issues);
    return testingPhase(website); // Re-test after fixes
  }

  return {
    testResults: {
      functional: functionalTests,
      responsive: responsiveTests,
      browsers: browserTests,
      performance: performanceTests,
      accessibility: a11yTests,
      security: securityTests
    },
    readyForDeployment: true
  };
}`
    },
    {
      title: "Deployment & Launch",
      description: "We deploy your website to production and ensure everything is working perfectly.",
      code: `// Phase 5: Deployment & Launch
async function deploymentPhase(website, testResults) {
  if (!testResults.readyForDeployment) {
    throw new Error('Website not ready for deployment');
  }

  // Pre-deployment checklist
  const preDeploymentChecks = runPreDeploymentChecks(website);

  if (preDeploymentChecks.passed) {
    // Setup production environment
    const productionEnv = setupProductionEnvironment();

    // Deploy website
    await backupExistingWebsite();
    const deployment = await deployWebsite(website, productionEnv);

    // Post-deployment checks
    const healthChecks = runHealthChecks(deployment);

    if (healthChecks.passed) {
      // Launch activities
      await configureCDN(deployment);
      await setupMonitoring(deployment);
      await submitSitemapToSearchEngines(deployment);

      return {
        url: deployment.url,
        deploymentDate: new Date(),
        status: 'LIVE'
      };
    } else {
      await rollbackDeployment(deployment);
      throw new Error('Health checks failed: ' + healthChecks.errors.join(', '));
    }
  } else {
    throw new Error('Pre-deployment checks failed: ' + preDeploymentChecks.errors.join(', '));
  }
}`
    }
  ];

  // Showcase section content
  const showcaseTitle = "Our Web Projects";
  const showcaseDescription = "Explore some of our successful web development projects that have helped businesses establish a strong online presence and achieve their goals.";
  const showcaseItems = [
    {
      title: "E-Commerce Platform",
      description: "A fully-featured online store for a fashion retailer with custom product filtering, user accounts, and secure checkout.",
      image: "/images/projects/ecommerce-website.jpg",
      tags: ["E-Commerce", "React", "Node.js", "Stripe", "Responsive"],
      link: "/projects/ecommerce-platform"
    },
    {
      title: "Corporate Website",
      description: "A professional website for a financial services company with interactive tools, blog, and client portal.",
      image: "/images/projects/corporate-website.jpg",
      tags: ["Corporate", "Next.js", "CMS", "Authentication", "SEO"],
      link: "/projects/corporate-website"
    },
    {
      title: "Educational Platform",
      description: "An interactive learning platform with course management, student progress tracking, and video content delivery.",
      image: "/images/projects/educational-platform.jpg",
      tags: ["Education", "LMS", "Video Streaming", "User Management"],
      link: "/projects/educational-platform"
    }
  ];

  return (
    <>
      <BreadcrumbSchema pageName="Web Development Services" />
      <ServiceSchema
        name="Web Development Services"
        description="Professional web development services in Kampala, Uganda. We create responsive websites, web applications, e-commerce solutions, and content management systems optimized for Ugandan businesses."
        url="https://haclab.net/services/web-development"
        serviceType="WebDevelopment"
      />
      <ServiceHeroSection
        title={heroTitle}
        description={heroDescription}
        icon={heroIcon}
        code={heroCode}
        codeTitle="web-development.js"
      />
      <ServiceFeatures
        title={featuresTitle}
        description={featuresDescription}
        features={features}
      />
      <ServiceProcess
        title={processTitle}
        description={processDescription}
        steps={processSteps}
      />
      <ServiceShowcase
        title={showcaseTitle}
        description={showcaseDescription}
        items={showcaseItems}
      />
      <UgandaLocationsSection
        title="Web Development Services Across Uganda"
        description="We provide professional web development services to businesses throughout Uganda, with expertise in creating websites optimized for local markets and audiences."
      />
      <FAQSection
        title="Web Development FAQs"
        description="Find answers to common questions about our web development services for businesses in Uganda."
        faqs={webDevelopmentFaqs}
      />
      <CTASection />
    </>
  );
}
