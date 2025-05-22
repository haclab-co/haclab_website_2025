'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import AnimatedCodeBlock from '../ui/AnimatedCodeBlock';
import MobileDevicePreview from '../ui/MobileDevicePreview';
import ParallaxSection from '../ui/ParallaxSection';
import { FiSmartphone, FiCode, FiLayers, FiHome, FiSettings, FiUser, FiInfo } from 'react-icons/fi';

const ProcessSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeStep, setActiveStep] = useState(0);

  const codeExamples = [
    // Step 1: Idea Discussion
    `// Haclab Development Process - Step 1: Idea Discussion
import { Client } from '@haclab/core';
import { Requirements } from '@haclab/client';

async function gatherRequirements(clientInfo) {
  // Initialize client
  const client = new Client(clientInfo);

  // Schedule discovery meeting
  const meeting = await client.scheduleMeeting({
    type: 'discovery',
    duration: '60min'
  });

  // Gather requirements during meeting
  const requirements = await Requirements.gather(client, {
    businessGoals: true,
    targetAudience: true,
    featureRequests: true,
    timeline: true,
    budget: true
  });

  // Analyze requirements
  const analysis = Requirements.analyze(requirements);

  // Generate initial proposal
  const proposal = await Requirements.generateProposal(analysis);

  return {
    client,
    requirements,
    analysis,
    proposal
  };
}`,

    // Step 2: Concepts & Initiatives
    `// Haclab Development Process - Step 2: Concepts & Initiatives
import { Project, Design } from '@haclab/core';
import { Wireframes, Mockups, Prototype } from '@haclab/design';

async function createDesignConcepts(requirements) {
  // Initialize project
  const project = new Project({
    requirements,
    timeline: requirements.estimateTimeline(),
    budget: requirements.estimateBudget()
  });

  // Create design concepts
  const design = new Design(project);

  // Generate wireframes
  const wireframes = await Wireframes.create({
    screens: requirements.getScreens(),
    userFlows: requirements.getUserFlows()
  });

  // Create visual mockups
  const mockups = await Mockups.create(wireframes, {
    branding: requirements.getBranding(),
    colorScheme: requirements.getColorScheme(),
    typography: requirements.getTypography()
  });

  // Build interactive prototype
  const prototype = await Prototype.build(mockups);

  // Present to client for feedback
  const feedback = await project.client.review(prototype);

  // Refine based on feedback
  const refinedDesign = await design.refine(feedback);

  return {
    project,
    design: refinedDesign,
    deliverables: {
      wireframes,
      mockups,
      prototype
    }
  };
}`,

    // Step 3: Coding & Testing
    `// Haclab Development Process - Step 3: Coding & Testing
import { Development, Testing } from '@haclab/process';
import { CodeRepository, CI } from '@haclab/tools';

async function developAndTest(designOutput) {
  // Set up code repository
  const repo = await CodeRepository.initialize({
    name: designOutput.project.name,
    private: true
  });

  // Set up development environment
  const development = new Development(designOutput);
  await development.setupEnvironment();

  // Set up CI/CD pipeline
  const ci = new CI.Pipeline({
    repository: repo,
    steps: ['build', 'test', 'deploy']
  });

  // Implement core architecture
  const architecture = await development.implementArchitecture();

  // Develop features
  for (const feature of designOutput.requirements.features) {
    await development.implementFeature(feature);

    // Unit testing
    const unitTests = await Testing.createUnitTests(feature);
    const unitTestResults = await Testing.runTests(unitTests);

    if (!unitTestResults.passed) {
      await development.fixIssues(unitTestResults.issues);
    }
  }

  // Integration testing
  const integrationTests = await Testing.createIntegrationTests();
  const integrationResults = await Testing.runTests(integrationTests);

  // UI/UX testing
  const uiTests = await Testing.createUITests();
  const uiTestResults = await Testing.runTests(uiTests);

  // Fix any remaining issues
  const allIssues = [...integrationResults.issues, ...uiTestResults.issues];
  if (allIssues.length > 0) {
    await development.fixIssues(allIssues);
  }

  return {
    codebase: repo,
    testResults: {
      unit: unitTestResults,
      integration: integrationResults,
      ui: uiTestResults
    }
  };
}`,

    // Step 4: Production & Support
    `// Haclab Development Process - Step 4: Production & Support
import { Deployment, Monitoring, Support } from '@haclab/process';
import { Environment } from '@haclab/infrastructure';

async function deployAndSupport(developmentOutput) {
  // Prepare production environment
  const prodEnv = await Environment.provision({
    type: 'production',
    resources: developmentOutput.project.getResourceRequirements()
  });

  // Deploy to production
  const deployment = new Deployment(developmentOutput.codebase);
  const deployedApp = await deployment.toEnvironment(prodEnv);

  // Set up monitoring
  const monitoring = new Monitoring(deployedApp);
  await monitoring.setupAlerts({
    performance: true,
    errors: true,
    security: true
  });

  // Create documentation
  const docs = await deployment.generateDocumentation();

  // Set up support plan
  const supportPlan = new Support.Plan({
    level: developmentOutput.project.getSupportLevel(),
    responseTime: '4h',
    availability: '24/7'
  });

  // Train client team if needed
  if (developmentOutput.project.requiresTraining()) {
    await Support.scheduleTraining(deployedApp, developmentOutput.project.client);
  }

  // Schedule maintenance
  const maintenancePlan = Support.createMaintenancePlan({
    frequency: 'monthly',
    updates: true,
    backups: true,
    securityPatches: true
  });

  return {
    deployedApp,
    monitoring,
    documentation: docs,
    support: supportPlan,
    maintenance: maintenancePlan
  };
}`
  ];

  const steps = [
    {
      number: '01',
      title: 'Idea Discussion',
      description: 'We meet customers and discuss the details about needs and demands before proposing a plan.',
      mobileContent: [
        {
          type: 'screen',
          title: 'Project Requirements',
          content: (
            <div className="p-4 space-y-4">
              <div className="bg-gray-800 rounded-lg p-4 shadow-md">
                <h3 className="text-lg font-semibold text-haclab-red mb-2">Project Overview</h3>
                <p className="text-sm text-gray-300">E-commerce platform for a retail business</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-4 shadow-md">
                <h3 className="text-lg font-semibold text-haclab-red mb-2">Business Goals</h3>
                <ul className="text-sm text-gray-300 list-disc pl-5 space-y-1">
                  <li>Increase online sales by 30%</li>
                  <li>Improve customer retention</li>
                  <li>Streamline inventory management</li>
                </ul>
              </div>

              <div className="bg-gray-800 rounded-lg p-4 shadow-md">
                <h3 className="text-lg font-semibold text-haclab-red mb-2">Target Audience</h3>
                <ul className="text-sm text-gray-300 list-disc pl-5 space-y-1">
                  <li>Age: 25-45</li>
                  <li>Tech-savvy shoppers</li>
                  <li>Value convenience and quality</li>
                </ul>
              </div>

              <div className="bg-gray-800 rounded-lg p-4 shadow-md">
                <h3 className="text-lg font-semibold text-haclab-red mb-2">Timeline & Budget</h3>
                <p className="text-sm text-gray-300">3 months development, $30,000 budget</p>
              </div>
            </div>
          )
        }
      ]
    },
    {
      number: '02',
      title: 'Concepts & Initiatives',
      description: 'Our experts come up with ideas and initiatives for delivering the best solutions.',
      mobileContent: [
        {
          type: 'screen',
          title: 'Design Concepts',
          content: (
            <div className="p-4 space-y-4">
              <div className="bg-gray-800 rounded-lg p-4 shadow-md">
                <h3 className="text-lg font-semibold text-haclab-red mb-2">Wireframes</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-gray-700 rounded p-2 aspect-[9/16] flex flex-col">
                    <div className="h-2 w-10 bg-gray-500 rounded mb-1"></div>
                    <div className="h-4 w-full bg-gray-600 rounded mb-2"></div>
                    <div className="grid grid-cols-2 gap-1 flex-grow">
                      <div className="bg-gray-600 rounded"></div>
                      <div className="bg-gray-600 rounded"></div>
                      <div className="bg-gray-600 rounded"></div>
                      <div className="bg-gray-600 rounded"></div>
                    </div>
                  </div>
                  <div className="bg-gray-700 rounded p-2 aspect-[9/16] flex flex-col">
                    <div className="h-2 w-10 bg-gray-500 rounded mb-1"></div>
                    <div className="h-4 w-full bg-gray-600 rounded mb-2"></div>
                    <div className="h-24 bg-gray-600 rounded mb-2"></div>
                    <div className="h-4 bg-gray-600 rounded mb-1"></div>
                    <div className="h-4 bg-gray-600 rounded mb-1"></div>
                    <div className="h-4 bg-gray-600 rounded"></div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-4 shadow-md">
                <h3 className="text-lg font-semibold text-haclab-red mb-2">Color Scheme</h3>
                <div className="flex space-x-2">
                  <div className="w-8 h-8 rounded-full bg-blue-600"></div>
                  <div className="w-8 h-8 rounded-full bg-gray-100"></div>
                  <div className="w-8 h-8 rounded-full bg-gray-800"></div>
                  <div className="w-8 h-8 rounded-full bg-yellow-500"></div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-4 shadow-md">
                <h3 className="text-lg font-semibold text-haclab-red mb-2">User Flow</h3>
                <div className="flex items-center justify-between text-xs text-gray-300">
                  <div className="bg-gray-700 rounded p-1 text-center">Browse</div>
                  <div className="text-gray-500">→</div>
                  <div className="bg-gray-700 rounded p-1 text-center">Product</div>
                  <div className="text-gray-500">→</div>
                  <div className="bg-gray-700 rounded p-1 text-center">Cart</div>
                  <div className="text-gray-500">→</div>
                  <div className="bg-gray-700 rounded p-1 text-center">Checkout</div>
                </div>
              </div>
            </div>
          )
        }
      ]
    },
    {
      number: '03',
      title: 'Coding & Testing',
      description: 'After agreeing on the ideas and plans, we design, develop, and test the proposed solution.',
      mobileContent: [
        {
          type: 'screen',
          title: 'Development Progress',
          content: (
            <div className="p-4 space-y-4">
              <div className="bg-gray-800 rounded-lg p-4 shadow-md">
                <h3 className="text-lg font-semibold text-haclab-red mb-2">Sprint Progress</h3>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-xs text-gray-300 mb-1">
                      <span>Frontend Development</span>
                      <span>80%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-haclab-red h-2 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-gray-300 mb-1">
                      <span>Backend API</span>
                      <span>90%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-haclab-red h-2 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-gray-300 mb-1">
                      <span>Database Setup</span>
                      <span>100%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-haclab-red h-2 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-gray-300 mb-1">
                      <span>Testing</span>
                      <span>65%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-haclab-red h-2 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-4 shadow-md">
                <h3 className="text-lg font-semibold text-haclab-red mb-2">Test Results</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-gray-300">Unit Tests: 42/45 passing</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                    <span className="text-gray-300">Integration Tests: 18/22 passing</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    <span className="text-gray-300">Performance: 2 issues found</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-4 shadow-md">
                <h3 className="text-lg font-semibold text-haclab-red mb-2">Recent Commits</h3>
                <div className="space-y-2 text-xs text-gray-300">
                  <div className="border-l-2 border-haclab-red pl-2">
                    <div className="font-semibold">Fix cart calculation bug</div>
                    <div className="text-gray-400">2 hours ago</div>
                  </div>
                  <div className="border-l-2 border-haclab-red pl-2">
                    <div className="font-semibold">Add product filtering</div>
                    <div className="text-gray-400">5 hours ago</div>
                  </div>
                  <div className="border-l-2 border-haclab-red pl-2">
                    <div className="font-semibold">Optimize image loading</div>
                    <div className="text-gray-400">Yesterday</div>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      ]
    },
    {
      number: '04',
      title: 'Production & Support',
      description: 'Once the final solution is ready, we put it in production and offer support & maintenance.',
      mobileContent: [
        {
          type: 'screen',
          title: 'Deployment Status',
          content: (
            <div className="p-4 space-y-4">
              <div className="bg-gray-800 rounded-lg p-4 shadow-md">
                <h3 className="text-lg font-semibold text-haclab-red mb-2">System Status</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Web Server</span>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                      <span className="text-gray-300">Online</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Database</span>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                      <span className="text-gray-300">Online</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">API Services</span>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                      <span className="text-gray-300">Online</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">CDN</span>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                      <span className="text-gray-300">Online</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-4 shadow-md">
                <h3 className="text-lg font-semibold text-haclab-red mb-2">Performance</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs text-gray-300 mb-1">
                      <span>Server Response</span>
                      <span>120ms</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-gray-300 mb-1">
                      <span>Page Load Time</span>
                      <span>1.8s</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-gray-300 mb-1">
                      <span>Uptime</span>
                      <span>99.98%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '99.98%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-4 shadow-md">
                <h3 className="text-lg font-semibold text-haclab-red mb-2">Support Plan</h3>
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex items-center">
                    <FiInfo className="text-haclab-red mr-2" />
                    <span>24/7 Technical Support</span>
                  </div>
                  <div className="flex items-center">
                    <FiInfo className="text-haclab-red mr-2" />
                    <span>Monthly Maintenance</span>
                  </div>
                  <div className="flex items-center">
                    <FiInfo className="text-haclab-red mr-2" />
                    <span>Security Updates</span>
                  </div>
                  <div className="flex items-center">
                    <FiInfo className="text-haclab-red mr-2" />
                    <span>Performance Monitoring</span>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      ]
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  const stepVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.3 + (i * 0.1)
      }
    })
  };

  return (
    <ParallaxSection
      className="py-20 text-white"
      bgColor="#121212"
      direction="up"
      speed={0.3}
    >
      <div className="container mx-auto px-4 md:px-6 relative z-10" ref={ref}>
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-display font-bold mb-4"
            variants={titleVariants}
          >
            How We <span className="text-haclab-red glow-text">Work</span>
          </motion.h2>
          <motion.p
            className="text-gray-300 max-w-2xl mx-auto"
            variants={titleVariants}
          >
            Our proven development process ensures high-quality results and client satisfaction.
          </motion.p>
        </motion.div>

        {/* Process steps navigation */}
        <div className="relative mb-12">
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-haclab-red/30"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className={`flex flex-col items-center text-center relative z-10 cursor-pointer transition-all duration-300 ${
                  activeStep === index ? 'scale-105' : 'opacity-70 hover:opacity-100'
                }`}
                custom={index}
                variants={stepVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                onClick={() => setActiveStep(index)}
              >
                <div className={`w-16 h-16 rounded-full text-white flex items-center justify-center font-display text-xl font-bold mb-6 transition-all duration-300 ${
                  activeStep === index ? 'bg-haclab-red shadow-glow scale-110' : 'bg-gray-700 hover:bg-haclab-red/70'
                }`}>
                  {step.number}
                </div>
                <h3 className="text-xl font-display font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-300 max-w-xs">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Split screen view: Code IDE on left, Mobile preview on right */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
          key={activeStep} // Re-render when active step changes
        >
          {/* Left side: Code IDE */}
          <div className="order-2 lg:order-1">
            <AnimatedCodeBlock
              code={codeExamples[activeStep]}
              language="javascript"
              title={`step-${activeStep + 1}-${steps[activeStep].title.toLowerCase().replace(/\s+/g, '-')}.js`}
              animate={false}
              typingEffect={true}
              typingSpeed={20}
              className="shadow-glow"
            />
          </div>

          {/* Right side: Mobile preview */}
          <div className="order-1 lg:order-2 flex justify-center">
            <MobileDevicePreview
              title={steps[activeStep].mobileContent[0].title}
              deviceColor="gray"
              className="max-w-xs w-full"
            >
              {steps[activeStep].mobileContent[0].content}
            </MobileDevicePreview>
          </div>
        </motion.div>
      </div>
    </ParallaxSection>
  );
};

export default ProcessSection;
