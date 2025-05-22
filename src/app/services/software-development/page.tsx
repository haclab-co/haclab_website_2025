import React from 'react';
import ServiceHeroSection from '@/components/sections/ServiceHeroSection';
import ServiceFeatures from '@/components/sections/ServiceFeatures';
import ServiceProcess from '@/components/sections/ServiceProcess';
import ServiceShowcase from '@/components/sections/ServiceShowcase';
import CTASection from '@/components/sections/CTASection';
import { FiCode, FiDatabase, FiServer, FiLayers, FiShield, FiTrendingUp } from 'react-icons/fi';
import type { Metadata } from 'next';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import ServiceSchema from '@/components/seo/ServiceSchema';

export const metadata: Metadata = {
  title: 'Software Development Services - Haclab Company Limited',
  description: 'Custom software development services tailored to your business needs. We build scalable, secure, and efficient software solutions.',
  keywords: 'custom software development, enterprise applications, software solutions, business software, Haclab software development',
};

export default function SoftwareDevelopmentPage() {
  // Hero section content
  const heroIcon = <FiCode size={20} />;
  const heroTitle = "Custom Software Development";
  const heroDescription = "We build tailored software solutions that perfectly fit your business needs and scale with your growth. Our custom software development services help businesses automate processes, improve efficiency, and gain a competitive edge.";
  const heroCode = `// Custom Software Development Process
import { Project } from '@haclab/core';
import { Client, Requirements } from '@haclab/client';

async function developCustomSoftware(client, requirements) {
  // Initialize project
  const project = new Project({
    client,
    requirements,
    type: 'CUSTOM_SOFTWARE'
  });

  // Phase 1: Discovery & Planning
  const businessAnalysis = await project.conductBusinessAnalysis();
  const technicalRequirements = await project.defineTechnicalRequirements();
  const architecture = await project.designArchitecture();

  // Phase 2: Design & Development
  const ui = await project.designUserInterface();
  const database = await project.setupDatabase();
  const codebase = await project.developCore();

  // Phase 3: Testing & Deployment
  await project.performTesting();
  await project.optimizePerformance();
  await project.deploy();

  return project.deliverSolution();
}`;

  // Features section content
  const featuresTitle = "Software Development Features";
  const featuresDescription = "Our custom software development services are designed to deliver high-quality, scalable, and secure solutions that meet your specific business requirements.";
  const features = [
    {
      title: "Enterprise Applications",
      description: "Robust, scalable applications designed for large-scale business operations and complex workflows.",
      icon: <FiLayers size={24} />,
      code: `// Enterprise Architecture
const enterpriseApp = {
  microservices: true,
  scalability: 'horizontal',
  reliability: '99.99%',
  monitoring: 'real-time'
};`
    },
    {
      title: "Database Solutions",
      description: "Efficient database design and implementation for optimal data storage, retrieval, and management.",
      icon: <FiDatabase size={24} />,
      code: `// Database Design
schema.optimize({
  indexing: true,
  normalization: '3NF',
  caching: 'distributed',
  backups: 'automated'
});`
    },
    {
      title: "API Development",
      description: "Secure and well-documented APIs that enable seamless integration with other systems and services.",
      icon: <FiServer size={24} />,
      code: `// RESTful API
app.createEndpoint({
  method: 'GET',
  path: '/api/v1/resources',
  auth: 'JWT',
  rateLimit: true
});`
    },
    {
      title: "Security Implementation",
      description: "Comprehensive security measures to protect your data and ensure compliance with industry standards.",
      icon: <FiShield size={24} />,
      code: `// Security Layer
security.implement({
  encryption: 'AES-256',
  authentication: '2FA',
  authorization: 'RBAC',
  audit: 'comprehensive'
});`
    },
    {
      title: "Performance Optimization",
      description: "Fine-tuning your software for maximum speed, efficiency, and resource utilization.",
      icon: <FiTrendingUp size={24} />,
      code: `// Performance Tuning
system.optimize({
  caching: true,
  loadBalancing: true,
  asyncProcessing: true,
  resourcePooling: true
});`
    },
    {
      title: "Custom Integrations",
      description: "Seamless integration with existing systems, third-party services, and business processes.",
      icon: <FiCode size={24} />,
      code: `// System Integration
integration.connect({
  erp: 'SAP',
  crm: 'Salesforce',
  payment: ['Stripe', 'PayPal'],
  analytics: 'Google'
});`
    }
  ];

  // Process section content
  const processTitle = "Our Development Process";
  const processDescription = "We follow a structured and collaborative approach to software development, ensuring that every project is delivered on time, within budget, and to the highest standards.";
  const processSteps = [
    {
      title: "Discovery & Analysis",
      description: "We start by understanding your business needs, goals, and challenges to define the project scope.",
      code: `// Phase 1: Discovery & Analysis
async function discoveryPhase(client) {
  const businessAnalysis = await analyzeBusiness(client);
  const stakeholderInterviews = await conductInterviews(client.stakeholders);
  const marketResearch = await researchMarket(client.industry);

  return {
    businessRequirements: businessAnalysis.requirements,
    userPersonas: createPersonas(stakeholderInterviews),
    competitiveAnalysis: marketResearch.competitiveAnalysis,
    opportunityAreas: identifyOpportunities(businessAnalysis, marketResearch)
  };
}`
    },
    {
      title: "Planning & Architecture",
      description: "We design the system architecture, select technologies, and create a detailed project plan.",
      code: `// Phase 2: Planning & Architecture
function planningPhase(discoveryResults) {
  const architecture = designArchitecture({
    requirements: discoveryResults.businessRequirements,
    scale: determineScale(discoveryResults),
    security: assessSecurityNeeds(discoveryResults)
  });

  const technologies = selectTechnologies(architecture);
  const timeline = createTimeline(architecture);
  const resources = allocateResources(timeline);

  return {
    systemArchitecture: architecture,
    techStack: technologies,
    projectPlan: {
      timeline,
      milestones: defineMilestones(timeline),
      resources
    }
  };
}`
    },
    {
      title: "Design & Development",
      description: "Our developers build your solution using agile methodologies, with regular updates and feedback.",
      code: `// Phase 3: Design & Development
async function developmentPhase(plan) {
  // Set up project infrastructure
  const repo = await setupRepository(plan.techStack);
  const cicd = await configureCICD(repo);
  const environments = await createEnvironments(['dev', 'staging', 'prod']);

  // Iterative development
  const sprints = planSprints(plan.projectPlan);

  for (const sprint of sprints) {
    await startSprint(sprint);
    await developFeatures(sprint.features);
    await runTests(sprint.features);
    await sprintReview(sprint);
    await sprintRetrospective(sprint);
  }

  return {
    codebase: repo.latestVersion,
    documentation: generateDocs(repo),
    testResults: collectTestResults(sprints)
  };
}`
    },
    {
      title: "Testing & QA",
      description: "Rigorous testing to ensure your software is bug-free, secure, and performs optimally.",
      code: `// Phase 4: Testing & QA
async function testingPhase(developmentOutput) {
  // Comprehensive testing strategy
  const testSuite = {
    unit: setupUnitTests(developmentOutput.codebase),
    integration: setupIntegrationTests(developmentOutput.codebase),
    system: setupSystemTests(developmentOutput.codebase),
    performance: setupPerformanceTests(developmentOutput.codebase),
    security: setupSecurityTests(developmentOutput.codebase),
    uat: setupUserAcceptanceTests(developmentOutput.codebase)
  };

  // Execute tests
  const testResults = await runAllTests(testSuite);
  const issues = identifyIssues(testResults);

  // Fix and verify
  if (issues.length > 0) {
    await fixIssues(issues);
    await verifyFixes(issues);
  }

  return {
    testCoverage: calculateCoverage(testResults),
    qualityMetrics: generateQualityReport(testResults),
    approvalStatus: issues.length === 0 ? 'APPROVED' : 'PENDING'
  };
}`
    },
    {
      title: "Deployment & Launch",
      description: "Smooth deployment to production, with comprehensive documentation and training.",
      code: `// Phase 5: Deployment & Launch
async function deploymentPhase(software, testResults) {
  // Pre-deployment checks
  const readinessCheck = verifyDeploymentReadiness(software, testResults);

  if (readinessCheck.status === 'READY') {
    // Deployment process
    const deploymentPlan = createDeploymentPlan(software);
    await performBackup();
    await deployToProduction(software, deploymentPlan);

    // Post-deployment
    const healthCheck = await monitorSystemHealth();
    const userTraining = await conductUserTraining();
    const documentation = finalizeDocumentation(software);

    return {
      deploymentStatus: 'SUCCESS',
      productionUrl: software.productionUrl,
      supportPlan: createSupportPlan(),
      maintenanceSchedule: createMaintenanceSchedule()
    };
  } else {
    throw new Error('Deployment not ready: ' + readinessCheck.reasons.join(', '));
  }
}`
    }
  ];

  // Showcase section content
  const showcaseTitle = "Our Software Projects";
  const showcaseDescription = "Explore some of our successful software development projects that have helped businesses transform their operations and achieve their goals.";
  const showcaseItems = [
    {
      title: "Enterprise Resource Planning System",
      description: "A comprehensive ERP solution for a manufacturing company that integrated inventory, production, sales, and finance modules.",
      image: "/images/projects/erp-system.jpg",
      tags: ["ERP", "Manufacturing", "Integration", "Dashboard"],
      link: "/projects/erp-system"
    },
    {
      title: "Healthcare Management Platform",
      description: "A secure platform for healthcare providers to manage patient records, appointments, billing, and compliance.",
      image: "/images/projects/healthcare-platform.jpg",
      tags: ["Healthcare", "HIPAA Compliance", "Patient Portal", "Scheduling"],
      link: "/projects/healthcare-platform"
    },
    {
      title: "Logistics Tracking System",
      description: "Real-time tracking and management system for a logistics company, optimizing routes and improving delivery times.",
      image: "/images/projects/logistics-system.jpg",
      tags: ["Logistics", "GPS Tracking", "Route Optimization", "Analytics"],
      link: "/projects/logistics-system"
    }
  ];

  return (
    <>
      <BreadcrumbSchema pageName="Software Development Services" />
      <ServiceSchema
        name="Software Development Services"
        description="Custom software development services tailored to your business needs. We build scalable, secure, and efficient software solutions."
        url="https://haclab.net/services/software-development"
        serviceType="SoftwareDevelopment"
      />
      <ServiceHeroSection
        title={heroTitle}
        description={heroDescription}
        icon={heroIcon}
        code={heroCode}
        codeTitle="software-development.js"
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
      <CTASection />
    </>
  );
}
