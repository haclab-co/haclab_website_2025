'use client';

import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiCode, FiSmartphone, FiGlobe, FiDatabase, FiShoppingCart, FiSearch } from 'react-icons/fi';
import GlowingCard from '../ui/GlowingCard';
import AnimatedCodeBlock from '../ui/AnimatedCodeBlock';

const ServicesSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isClient, setIsClient] = useState(false);

  // This ensures we only render complex components on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  const services = [
    {
      icon: <FiCode size={24} />,
      title: 'Software Development',
      description: 'Custom software solutions that perfectly fit your business needs and scale with your growth.',
      href: '/services/software-development',
      code: `// Custom Software Development
function createSolution(requirements) {
  const solution = new CustomSoftware({
    client: requirements.client,
    industry: requirements.industry,
    goals: requirements.businessGoals
  });

  return solution
    .design()
    .develop()
    .test()
    .deploy();
}`
    },
    {
      icon: <FiGlobe size={24} />,
      title: 'Web Development',
      description: 'Professional websites that help you overcome geographical limitations and increase exposure.',
      href: '/services/web-development',
      code: `// Web Development
const website = new WebApplication({
  frontend: ['React', 'Next.js', 'TailwindCSS'],
  backend: ['Node.js', 'Express', 'MongoDB'],
  features: [
    'Responsive Design',
    'SEO Optimization',
    'Content Management',
    'User Authentication'
  ]
});

website.deploy();`
    },
    {
      icon: <FiSmartphone size={24} />,
      title: 'Mobile App Development',
      description: 'Well-crafted mobile applications that bring your products and services to life.',
      href: '/services/mobile-app-development',
      code: `// Mobile App Development
class MobileApp extends Application {
  constructor(config) {
    super(config);
    this.platforms = ['iOS', 'Android'];
    this.framework = 'React Native';
  }

  buildFeatures() {
    return [
      new UserInterface(),
      new Authentication(),
      new DataStorage(),
      new APIIntegration()
    ];
  }
}`
    },
    {
      icon: <FiDatabase size={24} />,
      title: 'Database Design',
      description: 'Efficient database solutions for storing, managing, and retrieving your valuable data.',
      href: '/services/database-design',
      code: `// Database Design
const schema = new DatabaseSchema({
  tables: [
    {
      name: 'users',
      columns: [
        { name: 'id', type: 'UUID', primaryKey: true },
        { name: 'name', type: 'VARCHAR' },
        { name: 'email', type: 'VARCHAR', unique: true },
        { name: 'created_at', type: 'TIMESTAMP' }
      ]
    },
    // More tables...
  ]
});`
    },
    {
      icon: <FiShoppingCart size={24} />,
      title: 'E-Commerce Solutions',
      description: 'Online shopping platforms that help you sell products and services globally.',
      href: '/services/ecommerce-solutions',
      code: `// E-Commerce Solution
const store = new EcommerceStore({
  products: database.collection('products'),
  payment: [
    new PaymentGateway('stripe'),
    new PaymentGateway('paypal')
  ],
  shipping: new ShippingCalculator(),
  tax: new TaxCalculator()
});

store.initialize();`
    },
    {
      icon: <FiSearch size={24} />,
      title: 'SEO & Performance',
      description: 'Optimization services to improve your online visibility and website performance.',
      href: '/services/seo-optimization',
      code: `// SEO & Performance Optimization
async function optimizeWebsite(url) {
  const site = await analyze(url);

  await Promise.all([
    optimizeImages(site),
    improvePageSpeed(site),
    enhanceMetadata(site),
    buildBacklinks(site),
    createSitemap(site)
  ]);

  return monitorRankings(site);
}`
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

  return (
    <section className="relative py-20 bg-dark-bg text-white overflow-hidden" ref={ref}>
      {/* Background elements */}
      <div className="absolute inset-0 bg-code-pattern bg-no-repeat bg-cover opacity-5"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
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
            Our <span className="text-haclab-red glow-text">Services</span>
          </motion.h2>
          <motion.p
            className="text-gray-300 max-w-2xl mx-auto"
            variants={titleVariants}
          >
            We provide a wide range of IT solutions to help businesses grow and succeed in the digital age.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <GlowingCard
              key={index}
              href={service.href}
              className="h-full"
              glowIntensity="low"
              delay={index}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-haclab-red/20 flex items-center justify-center text-haclab-red mr-4">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-display font-semibold">{service.title}</h3>
                </div>

                <p className="text-gray-300 mb-6">{service.description}</p>

                <div className="mt-auto">
                  {isClient ? (
                    <AnimatedCodeBlock
                      code={service.code}
                      title={`${service.title.toLowerCase().replace(/\s+/g, '-')}.js`}
                      className="text-xs"
                      animate={false}
                    />
                  ) : (
                    <div className="rounded-lg p-4 text-xs font-code text-gray-400 border border-dark-border">
                      Loading code example...
                    </div>
                  )}
                </div>
              </div>
            </GlowingCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
