'use client';

export const runtime = 'edge';

import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  FiCode, FiServer, FiDatabase, FiLayers, FiPackage,
  FiCpu, FiGitBranch, FiTerminal, FiShoppingCart,
  FiTruck, FiCalendar, FiUsers, FiCheck, FiDownload,
  FiStar, FiMessageCircle, FiHelpCircle, FiArrowRight,
  FiMonitor, FiSmartphone, FiTablet, FiCreditCard, FiGlobe
} from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import GlowingButton from '@/components/ui/GlowingButton';
import EnhancedTerminal from '@/components/ui/EnhancedTerminal';
import { apps, AppData } from '@/data/apps';
import { generateProductFaqs } from '@/data/productFaqs';

// Metadata is exported from metadata.ts

// Icons mapping for different app types
const getAppIcon = (id: string) => {
  switch (id) {
    case 'abacus': return <FiLayers size={32} className="text-white" />;
    case 'homz':
    case 'inncontrol': return <FiUsers size={32} className="text-white" />;
    case 'kanify':
    case 'zenwrench': return <FiTruck size={32} className="text-white" />;
    case 'lenkit': return <FiDatabase size={32} className="text-white" />;
    case 'smart': return <FiCalendar size={32} className="text-white" />;
    case 'evia': return <FiShoppingCart size={32} className="text-white" />;
    case 'kyeyo': return <FiUsers size={32} className="text-white" />;
    case 'prosy': return <FiServer size={32} className="text-white" />;
    case 'mission-control': return <FiCpu size={32} className="text-white" />;
    default: return <FiPackage size={32} className="text-white" />;
  }
};

// Generate code snippets based on app type
const getCodeSnippet = (app: any) => {
  switch (app.id) {
    case 'abacus':
      return `// Abacus Inventory Management
import { InventoryManager } from '@haclab/abacus-core';
import { BarcodeScanner } from '@haclab/abacus-hardware';

// Initialize inventory manager
const inventoryManager = new InventoryManager({
  database: 'inventory.db',
  autoSync: true,
  backupInterval: 24 * 60 * 60 * 1000 // Daily backup
});

// Scan product barcode
async function scanProduct() {
  try {
    const barcode = await BarcodeScanner.scan();
    const product = await inventoryManager.getProductByBarcode(barcode);

    if (product) {
      await inventoryManager.updateStock({
        productId: product.id,
        quantity: product.quantity - 1,
        location: 'main-warehouse',
        reason: 'sale'
      });
      return { success: true, product };
    }
    return { success: false, message: 'Product not found' };
  } catch (error) {
    return { success: false, error: error.message };
  }
}`;
    case 'homz':
    case 'inncontrol':
      return `// Homz Hotel Management System
import { ReservationManager } from '@haclab/homz-core';
import { RoomService } from '@haclab/homz-services';

// Initialize reservation system
const reservationManager = new ReservationManager({
  hotelId: 'grand-plaza',
  currency: 'USD',
  taxRate: 0.16
});

// Create a new reservation
async function createReservation(guestData, roomDetails) {
  try {
    const reservation = await reservationManager.createReservation({
      guest: guestData,
      roomType: roomDetails.type,
      checkIn: roomDetails.checkIn,
      checkOut: roomDetails.checkOut,
      adults: roomDetails.adults,
      children: roomDetails.children,
      specialRequests: roomDetails.requests
    });

    return { success: true, reservation };
  } catch (error) {
    return { success: false, error: error.message };
  }
}`;
    // Add more cases for other apps
    default:
      return `// ${app.name} - ${app.type}
import { ${app.name}Manager } from '@haclab/${app.id}-core';

// Initialize ${app.id} manager
const manager = new ${app.name}Manager({
  appId: '${app.id}-app',
  version: '${app.version}',
  apiKey: process.env.${app.id.toUpperCase()}_API_KEY
});

// Example function
async function processData(data) {
  try {
    const result = await manager.process(data);
    return { success: true, result };
  } catch (error) {
    return { success: false, error: error.message };
  }
}`;
  }
};

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const app = apps.find(app => app.id === id);

  // If app not found, return 404
  if (!app) {
    notFound();
  }

  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const featuresRef = useRef(null);
  const isFeaturesInView = useInView(featuresRef, { once: true, amount: 0.2 });
  const techRef = useRef(null);
  const isTechInView = useInView(techRef, { once: true, amount: 0.2 });
  const pricingRef = useRef(null);
  const isPricingInView = useInView(pricingRef, { once: true, amount: 0.2 });

  // Import the Enhanced Product Schema component for structured data
  const EnhancedProductSchema = React.lazy(() => import('@/components/seo/EnhancedProductSchema'));

  // Import the UgandaSpecificSection component
  const UgandaSpecificSection = React.lazy(() => import('@/components/sections/UgandaSpecificSection'));

  // Import the ProductSupportSection component
  const ProductSupportSection = React.lazy(() => import('@/components/sections/ProductSupportSection'));

  // Import the FAQSection component
  const FAQSection = React.lazy(() => import('@/components/sections/FAQSection'));

  // Import the TechnicalSpecsSection component
  const TechnicalSpecsSection = React.lazy(() => import('@/components/sections/TechnicalSpecsSection'));

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

  const itemVariants = {
    hidden: (custom: number) => ({
      opacity: 0,
      y: 20 + custom * 10
    }),
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // Generate a lighter shade of the color for the gradient
  const lightenColor = (color: string, percent: number) => {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return `#${(0x1000000 + (R < 255 ? R < 0 ? 0 : R : 255) * 0x10000 +
      (G < 255 ? G < 0 ? 0 : G : 255) * 0x100 +
      (B < 255 ? B < 0 ? 0 : B : 255)).toString(16).slice(1)}`;
  };

  const secondaryColor = lightenColor(app.color, 20);

  // Pricing tiers
  const getPricingTiers = (app: AppData) => {
    // If app has specific pricing, use it
    if (app.pricing) {
      return [
        {
          name: 'Basic',
          price: `$${app.pricing.basic}`,
          period: 'per month',
          description: 'Perfect for small businesses just getting started',
          features: [
            'Up to 5 users',
            'Basic reporting',
            'Standard support',
            '1GB storage',
            'Core features'
          ],
          cta: 'Get Started',
          highlighted: false
        },
        {
          name: 'Professional',
          price: `$${app.pricing.professional}`,
          period: 'per month',
          description: 'Ideal for growing businesses with more advanced needs',
          features: [
            'Up to 20 users',
            'Advanced reporting',
            'Priority support',
            '10GB storage',
            'All core features',
            'API access',
            'Custom branding'
          ],
          cta: 'Try Free for 14 Days',
          highlighted: true
        },
        {
          name: 'Enterprise',
          price: app.pricing.enterprise,
          period: 'contact for pricing',
          description: 'For large organizations with specific requirements',
          features: [
            'Unlimited users',
            'Custom reporting',
            'Dedicated support',
            'Unlimited storage',
            'All features',
            'Advanced security',
            'Custom integrations',
            'On-premise option'
          ],
          cta: 'Contact Sales',
          highlighted: false
        }
      ];
    }

    // Default pricing tiers
    return [
      {
        name: 'Basic',
        price: '$49',
        period: 'per month',
        description: 'Perfect for small businesses just getting started',
        features: [
          'Up to 5 users',
          'Basic reporting',
          'Standard support',
          '1GB storage',
          'Core features'
        ],
        cta: 'Get Started',
        highlighted: false
      },
      {
        name: 'Professional',
        price: '$99',
        period: 'per month',
        description: 'Ideal for growing businesses with more advanced needs',
        features: [
          'Up to 20 users',
          'Advanced reporting',
          'Priority support',
          '10GB storage',
          'All core features',
          'API access',
          'Custom branding'
        ],
        cta: 'Try Free for 14 Days',
        highlighted: true
      },
      {
        name: 'Enterprise',
        price: 'Custom',
        period: 'contact for pricing',
        description: 'For large organizations with specific requirements',
        features: [
          'Unlimited users',
          'Custom reporting',
          'Dedicated support',
          'Unlimited storage',
          'All features',
          'Advanced security',
          'Custom integrations',
          'On-premise option'
        ],
        cta: 'Contact Sales',
        highlighted: false
      }
    ];
  };

  const pricingTiers = getPricingTiers(app);

  // Add state for active screenshot
  const [activeScreenshot, setActiveScreenshot] = useState(0);

  return (
    <div className="min-h-screen bg-dark-bg text-white">
      {/* Add enhanced structured data for SEO */}
      <React.Suspense fallback={null}>
        <EnhancedProductSchema app={app} />
      </React.Suspense>

      {/* Hero Section */}
      <section
        className="relative py-20 overflow-hidden"
        ref={heroRef}
        style={{
          background: `linear-gradient(135deg, ${app.color}, ${secondaryColor})`
        }}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <motion.div
              className="max-w-2xl"
              initial={{ opacity: 0, x: -50 }}
              animate={isHeroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm py-1 px-3 rounded-full font-code mb-4">
                {app.type} for Uganda Businesses
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 text-white flex items-center">
                <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center mr-4 overflow-hidden">
                  <div className="relative w-10 h-10">
                    <Image
                      src={`/images/app-icons/${app.id}.png`}
                      alt={`${app.name} - ${app.type} for businesses in Uganda, Kampala`}
                      fill
                      style={{ objectFit: 'contain' }}
                      onError={(e) => {
                        // Fallback to icon component if image doesn't exist
                        (e.target as HTMLImageElement).style.display = 'none';
                        (e.target as HTMLImageElement).parentElement!.innerHTML = `<div class="flex items-center justify-center w-full h-full">${getAppIcon(app.id)}</div>`;
                      }}
                    />
                  </div>
                </div>
                {app.name}
              </h1>

              <div className="inline-block bg-white/10 backdrop-blur-sm text-white/80 text-xs py-1 px-3 rounded-full font-code mb-4">
                Optimized for Kampala, Entebbe, Jinja, Mbarara & all Uganda
              </div>

              <div
                className="text-sm text-white/90 mb-8"
                dangerouslySetInnerHTML={{
                  __html: (app.longDescription || app.description || '')
                    .replace('</p>', ' Designed specifically for businesses in Uganda and East Africa.</p>')
                }}
              ></div>

              <div className="flex flex-wrap gap-4">
                <GlowingButton
                  href={app.repository}
                  variant="secondary"
                  size="lg"
                  target="_blank"
                  rel="noopener noreferrer"
                  adaptToBackground={true}
                  className="font-bold text-gray-900 ring-2 ring-white/50"
                  glowIntensity="high"
                >
                  <FiDownload className="mr-2" /> Download
                </GlowingButton>

                <GlowingButton
                  href="#features"
                  variant="outline"
                  size="lg"
                  adaptToBackground={true}
                  className="font-semibold"
                >
                  Learn More
                </GlowingButton>
              </div>

              <div className="mt-8">
                <div className="flex items-center mb-2">
                  <div className="flex">
                    {/* Full stars */}
                    {[...Array(4)].map((_, i) => (
                      <FiStar
                        key={`full-${i}`}
                        className="text-yellow-400 fill-yellow-400"
                        size={20}
                      />
                    ))}

                    {/* Partial star - using a custom approach */}
                    <div className="relative">
                      {/* Background star (empty) */}
                      <FiStar
                        className="text-yellow-400/30 fill-yellow-400/30"
                        size={20}
                      />

                      {/* Foreground star (filled) with width clipped to 70% */}
                      <div className="absolute top-0 left-0 overflow-hidden" style={{ width: '70%' }}>
                        <FiStar
                          className="text-yellow-400 fill-yellow-400"
                          size={20}
                        />
                      </div>
                    </div>
                  </div>
                  <span className="ml-2 text-white/90 font-semibold">4.7</span>
                  <span className="ml-1 text-white/70 text-sm">(128 reviews)</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(() => {
                    // Generate app-specific review tags based on app type
                    let tags = ["Reliable", "Great support"];

                    // Add app-specific tags
                    switch (app.type) {
                      case "Inventory Management Software":
                        tags.push("Accurate tracking", "Time-saving");
                        break;
                      case "Hotel Management System":
                        tags.push("Streamlines operations", "User-friendly");
                        break;
                      case "Restaurant Management Software":
                        tags.push("Fast service", "Intuitive UI");
                        break;
                      case "Property Management System":
                        tags.push("Comprehensive", "Easy reporting");
                        break;
                      case "School Management and Resource Tracker":
                        tags.push("Organized", "Feature-rich");
                        break;
                      default:
                        tags.push("Easy to use", "Feature-rich");
                    }

                    return tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs bg-white/10 backdrop-blur-sm px-2 py-1 rounded-full text-white/80"
                      >
                        {tag}
                      </span>
                    ));
                  })()}
                </div>
              </div>
            </motion.div>

            <motion.div
              className="relative w-full max-w-md"
              initial={{ opacity: 0, y: 50 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="bg-dark-bg/80 backdrop-blur-lg p-1 rounded-lg border border-white/10 shadow-xl">
                <div className="bg-dark-surface rounded-lg overflow-hidden">
                  <div className="flex items-center bg-dark-bg/80 px-4 py-2">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="ml-4 text-sm font-code text-white/70">
                      {app.name} v{app.version}
                    </div>
                  </div>

                  <div className="relative w-full h-64 md:h-80">
                    <Image
                      src={`/images/app-screenshots/${app.id}-main.png`}
                      alt={`${app.name} screenshot`}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="rounded-b-lg"
                      onError={(e) => {
                        // Fallback to a generic image if the specific one doesn't exist
                        (e.target as HTMLImageElement).src = '/images/app-screenshots/default-screenshot.png';
                      }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-dark-bg" ref={featuresRef}>
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="text-center mb-16"
            variants={containerVariants}
            initial="hidden"
            animate={isFeaturesInView ? "visible" : "hidden"}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-display font-bold mb-4"
              variants={itemVariants}
              custom={0}
            >
              Powerful <span className="text-haclab-red glow-text">Features</span> for Uganda Businesses
            </motion.h2>
            <motion.p
              className="text-gray-300 max-w-2xl mx-auto"
              variants={itemVariants}
              custom={1}
            >
              Discover how {app.name} can transform your business in Kampala and across Uganda with these powerful capabilities
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={isFeaturesInView ? "visible" : "hidden"}
          >
            {app.features && app.features.map((feature, index) => {
              // Generate a unique icon for each feature
              const getFeatureIcon = () => {
                const icons = [
                  <FiLayers key="layers" size={24} className="text-white" />,
                  <FiDatabase key="database" size={24} className="text-white" />,
                  <FiServer key="server" size={24} className="text-white" />,
                  <FiCode key="code" size={24} className="text-white" />,
                  <FiGitBranch key="git" size={24} className="text-white" />,
                  <FiTerminal key="terminal" size={24} className="text-white" />,
                  <FiCpu key="cpu" size={24} className="text-white" />
                ];
                return icons[index % icons.length];
              };

              return (
                <motion.div
                  key={index}
                  className="bg-dark-surface/80 backdrop-blur-sm p-6 rounded-lg border border-white/10 hover:border-haclab-red/50 transition-all duration-300 group"
                  variants={itemVariants}
                  custom={index}
                  whileHover={{ y: -5, boxShadow: '0 10px 30px -10px rgba(255, 0, 0, 0.2)' }}
                >
                  <div className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center bg-gradient-to-br from-haclab-red/80 to-haclab-red/60 group-hover:from-haclab-red group-hover:to-haclab-red/80 transition-all duration-300 shadow-glow-sm">
                    {getFeatureIcon()}
                  </div>
                  <h3 className="text-xl font-display font-semibold mb-3 group-hover:text-haclab-red transition-colors duration-300">{feature}</h3>
                  <div
                    className="text-gray-400"
                    dangerouslySetInnerHTML={{
                      __html: app.featureDescriptions && app.featureDescriptions[feature]
                        ? app.featureDescriptions[feature]
                        : `Streamline your workflow and boost productivity with our advanced ${feature.toLowerCase()} capabilities.`
                    }}
                  ></div>

                  {/* Code-like detail */}
                  <div className="mt-4 pt-4 border-t border-white/10 font-code text-xs text-gray-500">
                    <div className="flex items-center">
                      <span className="text-haclab-red">import</span>
                      <span className="text-gray-400 ml-2">{`{ ${feature.replace(/\s+/g, '')} }`}</span>
                      <span className="text-haclab-red ml-2">from</span>
                      <span className="text-green-400 ml-2">{`'@haclab/${app.id}'`}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Uganda-specific section */}
      <React.Suspense fallback={null}>
        <UgandaSpecificSection app={app} />
      </React.Suspense>

      {/* Benefits Section - Only show if app has benefits */}
      {app.benefits && app.benefits.length > 0 && (
        <section className="py-20 bg-dark-surface">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Why Choose <span className="text-haclab-red glow-text">{app.name}</span> in Uganda
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Discover the advantages that make {app.name} the preferred choice for businesses in Kampala and across Uganda
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {app.benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="flex items-start"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <div className="w-10 h-10 rounded-full bg-haclab-red/20 flex items-center justify-center text-haclab-red mr-4 mt-1 flex-shrink-0">
                    <FiCheck size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-semibold mb-2">{benefit}</h3>
                    <p className="text-gray-400">
                      {/* Ideally, we would have detailed descriptions for each benefit */}
                      Our customers have experienced significant improvements in efficiency and productivity after implementing {app.name}.
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Use Cases Section - Only show if app has use cases */}
      {app.useCases && app.useCases.length > 0 && (
        <section className="py-20 bg-dark-bg">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Perfect <span className="text-haclab-red glow-text">Use Cases</span> in Uganda
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                {app.name} is designed to solve real-world challenges for businesses in Kampala, Entebbe, Jinja, Mbarara, and across Uganda
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {app.useCases.map((useCase, index) => (
                <motion.div
                  key={index}
                  className="bg-dark-surface/80 backdrop-blur-sm p-6 rounded-lg border border-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <div className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center bg-gradient-to-br from-haclab-red to-haclab-red/70">
                    <FiServer size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-display font-semibold mb-3">{useCase}</h3>
                  <p className="text-gray-400">
                    {app.name} provides tailored solutions for this specific use case, helping businesses optimize their operations and achieve better results.
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Technical Details Section */}
      <section className="py-20 bg-dark-surface" ref={techRef}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Code Snippet */}
            <motion.div
              className="order-2 lg:order-1"
              initial={{ opacity: 0, x: -50 }}
              animate={isTechInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.7 }}
            >
              <EnhancedTerminal
                title={`${app.name} Code Example`}
                initialCommands={[getCodeSnippet(app)]}
                showLineNumbers={true}
                theme="dark"
                maxHeight="500px"
              />
            </motion.div>

            {/* Technical Info */}
            <motion.div
              className="order-1 lg:order-2"
              initial={{ opacity: 0, x: 50 }}
              animate={isTechInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl font-display font-bold mb-6">
                Technical <span className="text-haclab-red glow-text">Excellence</span> for Uganda
              </h2>

              <p className="text-xl text-gray-300 mb-8">
                Built with modern technologies and best practices to ensure reliability, security, and performance, optimized for Uganda's internet infrastructure and business environment.
              </p>

              <div className="bg-dark-bg/50 backdrop-blur-sm p-6 rounded-lg border border-white/10 mb-8">
                <h3 className="text-xl font-display font-semibold mb-4 flex items-center">
                  <FiServer className="text-haclab-red mr-2" /> Technology Stack
                </h3>
                <div className="flex flex-wrap gap-3 mb-6">
                  {app.technologies && app.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="text-sm bg-dark-bg/80 px-3 py-1 rounded-full font-code text-white/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-display font-semibold mb-4 flex items-center">
                  <FiMonitor className="text-haclab-red mr-2" /> Platform Support
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex items-center">
                    <FiMonitor className="text-haclab-red mr-2" />
                    <span>Windows</span>
                  </div>
                  <div className="flex items-center">
                    <FiMonitor className="text-haclab-red mr-2" />
                    <span>macOS</span>
                  </div>
                  <div className="flex items-center">
                    <FiMonitor className="text-haclab-red mr-2" />
                    <span>Linux</span>
                  </div>
                  <div className="flex items-center">
                    <FiSmartphone className="text-haclab-red mr-2" />
                    <span>iOS</span>
                  </div>
                  <div className="flex items-center">
                    <FiSmartphone className="text-haclab-red mr-2" />
                    <span>Android</span>
                  </div>
                  <div className="flex items-center">
                    <FiTablet className="text-haclab-red mr-2" />
                    <span>Web</span>
                  </div>
                </div>

                <h3 className="text-xl font-display font-semibold mt-6 mb-4 flex items-center">
                  <FiGlobe className="text-haclab-red mr-2" /> Uganda Optimization
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <FiCheck className="text-haclab-red mr-2" />
                    <span>Optimized for Uganda internet speeds</span>
                  </div>
                  <div className="flex items-center">
                    <FiCheck className="text-haclab-red mr-2" />
                    <span>Mobile money integration</span>
                  </div>
                  <div className="flex items-center">
                    <FiCheck className="text-haclab-red mr-2" />
                    <span>Local payment methods support</span>
                  </div>
                  <div className="flex items-center">
                    <FiCheck className="text-haclab-red mr-2" />
                    <span>Uganda tax compliance</span>
                  </div>
                </div>
              </div>

              <GlowingButton
                href={app.repository}
                variant="primary"
                size="md"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold"
              >
                View Documentation
              </GlowingButton>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Screenshots Section - Always show, use default screenshots if none provided */}
      {(
        <section className="py-20 bg-dark-bg">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                See {app.name} in <span className="text-haclab-red glow-text">Action</span> in Uganda
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Take a closer look at the intuitive interface and powerful features of {app.name}, designed for businesses in Kampala and across Uganda
              </p>
            </div>

            {/* Interactive Screenshot Showcase */}
            <div className="mb-16">
              {/* Interactive Screenshot Carousel */}
              <div className="relative mx-auto max-w-4xl mb-12">
                {/* Desktop Mockup */}
                <motion.div
                  className="relative mx-auto"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  viewport={{ once: true }}
                >
                  {/* Computer Frame */}
                  <div className="relative w-full max-w-4xl mx-auto">
                    {/* Monitor Frame */}
                    <div className="relative bg-gray-800 rounded-t-lg pt-8 pb-4 px-4 shadow-xl border border-gray-700">
                      {/* Browser Controls */}
                      <div className="absolute top-2 left-4 flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>

                      {/* URL Bar */}
                      <div className="bg-gray-700 rounded-md h-6 mb-4 flex items-center px-4">
                        <div className="flex items-center w-full">
                          <div className="text-xs text-gray-400 font-code mr-2">https://</div>
                          <div className="text-xs text-gray-300 font-code">{app.id}.haclab.co</div>
                          <div className="flex-grow"></div>
                        </div>
                      </div>

                      {/* Screenshot Container */}
                      <div className="relative w-full aspect-video bg-dark-surface overflow-hidden rounded-md border border-gray-700">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={activeScreenshot}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0"
                          >
                            <Image
                              src={app.screenshots && app.screenshots.length > 0
                                ? app.screenshots[activeScreenshot]
                                : `/images/app-screenshots/${app.id}-main.png`}
                              alt={`${app.name} ${app.type} for Uganda businesses - screenshot ${activeScreenshot + 1} showing interface optimized for Kampala and Uganda users`}
                              fill
                              style={{ objectFit: 'cover' }}
                              className="rounded-md"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/images/app-screenshots/default-screenshot.png';
                              }}
                            />
                          </motion.div>
                        </AnimatePresence>

                        {/* Navigation Controls */}
                        <div className="absolute bottom-4 right-4 flex space-x-2">
                          <button
                            className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-haclab-red transition-colors"
                            onClick={() => setActiveScreenshot(prev =>
                              prev === 0
                                ? (app.screenshots?.length || 4) - 1
                                : prev - 1
                            )}
                          >
                            <FiArrowRight className="rotate-180" />
                          </button>
                          <button
                            className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-haclab-red transition-colors"
                            onClick={() => setActiveScreenshot(prev =>
                              (prev + 1) % (app.screenshots?.length || 4)
                            )}
                          >
                            <FiArrowRight />
                          </button>
                        </div>

                        {/* Code Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent opacity-30 pointer-events-none"></div>

                        {/* Animated Cursor */}
                        <div className="absolute bottom-8 right-8 w-6 h-6 rounded-full border-2 border-haclab-red animate-ping opacity-70"></div>
                      </div>
                    </div>

                    {/* Stand */}
                    <div className="h-8 w-32 bg-gray-700 mx-auto rounded-b-lg"></div>
                    <div className="h-4 w-64 bg-gray-800 mx-auto rounded-b-lg"></div>
                  </div>
                </motion.div>
              </div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                {(app.screenshots && app.screenshots.length > 0
                  ? app.screenshots
                  : [
                      `/images/app-screenshots/${app.id}-main.png`,
                      `/images/app-screenshots/default-screenshot.png`,
                      `/images/app-screenshots/default-screenshot.png`,
                      `/images/app-screenshots/default-screenshot.png`
                    ]
                ).map((screenshot, index) => (
                  <motion.div
                    key={index}
                    className={`relative overflow-hidden rounded-md cursor-pointer border ${
                      activeScreenshot === index ? 'border-haclab-red' : 'border-gray-700'
                    } group`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: '0 0 20px rgba(255, 0, 0, 0.3)'
                    }}
                    onClick={() => setActiveScreenshot(index)}
                  >
                    <div className="relative aspect-video">
                      <Image
                        src={screenshot}
                        alt={`${app.name} ${app.type} for Uganda businesses - thumbnail ${index + 1} showing interface optimized for Kampala and Uganda users`}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/app-screenshots/default-screenshot.png';
                        }}
                      />

                      {/* Hover Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent ${
                        activeScreenshot === index ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      } transition-opacity duration-300 flex items-end justify-center p-2`}>
                        <span className="text-white text-xs font-code">View {index === 0 ? 'Dashboard' : `Screen ${index + 1}`}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Split View: Code and App */}
            <div className="bg-dark-surface/80 backdrop-blur-sm rounded-lg border border-white/10 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Code Editor Side */}
                <div className="bg-dark-bg/90 p-4 border-r border-white/10">
                  <div className="flex items-center mb-4">
                    <div className="flex space-x-2 mr-4">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="text-sm font-code text-gray-400">app.js</div>
                  </div>

                  <div className="font-code text-sm text-gray-300 overflow-x-auto">
                    <pre className="language-javascript">
                      <code>
                        <div><span className="text-blue-400">import</span> <span className="text-yellow-300">React</span> <span className="text-blue-400">from</span> <span className="text-green-400">'react'</span>;</div>
                        <div><span className="text-blue-400">import</span> <span className="text-yellow-300">{'{'} {app.name}Core {'}'}</span> <span className="text-blue-400">from</span> <span className="text-green-400">{`'@haclab/${app.id}'`}</span>;</div>
                        <div></div>
                        <div><span className="text-purple-400">function</span> <span className="text-yellow-300">App</span>() {'{'}</div>
                        <div>&nbsp;&nbsp;<span className="text-blue-400">const</span> [<span className="text-yellow-300">data</span>, <span className="text-yellow-300">setData</span>] = <span className="text-yellow-300">React</span>.<span className="text-blue-400">useState</span>({'{}'});</div>
                        <div>&nbsp;&nbsp;<span className="text-blue-400">const</span> <span className="text-yellow-300">core</span> = <span className="text-blue-400">new</span> <span className="text-yellow-300">{app.name}Core</span>({'{'});</div>
                        <div>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-300">apiKey</span>: <span className="text-green-400">'YOUR_API_KEY'</span>,</div>
                        <div>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-300">version</span>: <span className="text-green-400">{`'${app.version}'`}</span></div>
                        <div>&nbsp;&nbsp;{'}'});</div>
                        <div></div>
                        <div>&nbsp;&nbsp;<span className="text-purple-400">React.useEffect</span>(() {'=>'} {'{'}</div>
                        <div>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">async</span> <span className="text-purple-400">function</span> <span className="text-yellow-300">fetchData</span>() {'{'}</div>
                        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">const</span> <span className="text-yellow-300">result</span> = <span className="text-blue-400">await</span> <span className="text-yellow-300">core</span>.<span className="text-blue-400">getData</span>();</div>
                        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-300">setData</span>(<span className="text-yellow-300">result</span>);</div>
                        <div>&nbsp;&nbsp;&nbsp;&nbsp;{'}'}</div>
                        <div>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-300">fetchData</span>();</div>
                        <div>&nbsp;&nbsp;{'}'}, []);</div>
                        <div></div>
                        <div>&nbsp;&nbsp;<span className="text-blue-400">return</span> (</div>
                        <div>&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-yellow-300">div</span> <span className="text-blue-400">className</span>=<span className="text-green-400">"app"</span>&gt;</div>
                        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-yellow-300">h1</span>&gt;{app.name} Dashboard&lt;/<span className="text-yellow-300">h1</span>&gt;</div>
                        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'{'}<span className="text-yellow-300">/* Dashboard components */</span>{'}'}</div>
                        <div>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="text-yellow-300">div</span>&gt;</div>
                        <div>&nbsp;&nbsp;);</div>
                        <div>{'}'}</div>
                      </code>
                    </pre>
                  </div>
                </div>

                {/* App Preview Side */}
                <div className="relative">
                  {/* Mobile Device Mockup */}
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <div className="relative w-64 h-[500px] bg-black rounded-[36px] border-4 border-gray-800 shadow-xl overflow-hidden">
                      {/* Notch */}
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl z-10"></div>

                      {/* Screen */}
                      <div className="relative w-full h-full bg-dark-surface overflow-hidden">
                        {/* App Header */}
                        <div className="bg-gradient-to-r from-haclab-red to-haclab-red/70 text-white p-4">
                          <div className="text-lg font-bold">{app.name}</div>
                          <div className="text-xs opacity-80">v{app.version}</div>
                        </div>

                        {/* App Content */}
                        <div className="p-4">
                          {/* Dashboard Items */}
                          <div className="mb-4">
                            <div className="w-full h-3 bg-white/20 rounded-full mb-2"></div>
                            <div className="w-2/3 h-3 bg-white/20 rounded-full"></div>
                          </div>

                          {/* Stats Cards */}
                          <div className="grid grid-cols-2 gap-2 mb-4">
                            <div className="bg-white/10 p-2 rounded-lg">
                              <div className="w-8 h-8 rounded-full bg-haclab-red/20 mb-2"></div>
                              <div className="w-full h-2 bg-white/20 rounded-full mb-1"></div>
                              <div className="w-2/3 h-2 bg-white/20 rounded-full"></div>
                            </div>
                            <div className="bg-white/10 p-2 rounded-lg">
                              <div className="w-8 h-8 rounded-full bg-haclab-red/20 mb-2"></div>
                              <div className="w-full h-2 bg-white/20 rounded-full mb-1"></div>
                              <div className="w-2/3 h-2 bg-white/20 rounded-full"></div>
                            </div>
                          </div>

                          {/* List Items */}
                          {[1, 2, 3, 4].map((item) => (
                            <div key={item} className="flex items-center mb-3 bg-white/5 p-2 rounded-lg">
                              <div className="w-8 h-8 rounded-full bg-haclab-red/20 mr-2"></div>
                              <div className="flex-1">
                                <div className="w-full h-2 bg-white/20 rounded-full mb-1"></div>
                                <div className="w-2/3 h-2 bg-white/20 rounded-full"></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Home Button/Bar */}
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-600 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section - Only show if app has testimonials */}
      {app.testimonials && app.testimonials.length > 0 && (
        <section className="py-20 bg-dark-surface">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                What Uganda <span className="text-haclab-red glow-text">Businesses Say</span>
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Hear from businesses in Kampala and across Uganda that have transformed their operations with {app.name}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {app.testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="bg-dark-bg/80 backdrop-blur-sm p-6 rounded-lg border border-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-dark-bg">
                      {testimonial.avatar ? (
                        <div className="relative w-full h-full">
                          <Image
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            fill
                            style={{ objectFit: 'cover' }}
                          />
                        </div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-haclab-red/20 text-haclab-red">
                          {testimonial.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-display font-semibold">{testimonial.name}</h3>
                      <p className="text-sm text-gray-400">{testimonial.role}, {testimonial.company}</p>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute -top-2 -left-2 text-4xl text-haclab-red opacity-30">"</div>
                    <p className="relative z-10 text-gray-300 italic">
                      {testimonial.quote}
                    </p>
                    <div className="absolute -bottom-4 -right-2 text-4xl text-haclab-red opacity-30">"</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-dark-bg" ref={pricingRef}>
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="text-center mb-16"
            variants={containerVariants}
            initial="hidden"
            animate={isPricingInView ? "visible" : "hidden"}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-display font-bold mb-4"
              variants={itemVariants}
              custom={0}
            >
              Simple, Transparent <span className="text-haclab-red glow-text">Pricing</span> for Uganda
            </motion.h2>
            <motion.p
              className="text-gray-300 max-w-2xl mx-auto"
              variants={itemVariants}
              custom={1}
            >
              Choose the plan that works best for your business needs in Kampala and across Uganda, with local support included
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={isPricingInView ? "visible" : "hidden"}
          >
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={index}
                className={`bg-dark-surface/80 backdrop-blur-sm rounded-lg border ${
                  tier.highlighted ? 'border-haclab-red shadow-glow-sm' : 'border-white/10'
                } overflow-hidden transition-all duration-300 flex flex-col relative group`}
                variants={itemVariants}
                custom={index}
                whileHover={{ y: -5, boxShadow: tier.highlighted ? '0 10px 30px -10px rgba(255, 0, 0, 0.4)' : '0 10px 30px -10px rgba(255, 0, 0, 0.2)' }}
              >
                {/* Code-like decoration in background */}
                <div className="absolute top-0 right-0 p-4 opacity-10 font-code text-xs">
                  <div>{'{'}</div>
                  <div>&nbsp;&nbsp;"plan": "{tier.name}",</div>
                  <div>&nbsp;&nbsp;"price": "{tier.price}",</div>
                  <div>&nbsp;&nbsp;"billing": "{tier.period}"</div>
                  <div>{'}'}</div>
                </div>

                {tier.highlighted && (
                  <div className="bg-haclab-red text-white text-center py-1 text-sm font-medium">
                    Most Popular
                  </div>
                )}

                <div className="p-6 flex-grow">
                  <h3 className="text-2xl font-display font-bold mb-2 group-hover:text-haclab-red transition-colors">{tier.name}</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">{tier.price}</span>
                    <span className="text-gray-400 ml-1">{tier.period}</span>
                  </div>
                  <p className="text-gray-400 mb-6">{tier.description}</p>

                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        className="flex items-start"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: featureIndex * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <div className={`w-5 h-5 rounded-full ${tier.highlighted ? 'bg-haclab-red/30 text-haclab-red' : 'bg-haclab-red/20 text-haclab-red/80'} flex items-center justify-center mr-3 mt-0.5 group-hover:bg-haclab-red/30 group-hover:text-haclab-red transition-colors`}>
                          <FiCheck size={12} />
                        </div>
                        <span className="text-gray-300">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 pt-0">
                  <GlowingButton
                    href={`/contact?plan=${tier.name.toLowerCase()}&product=${app.id}`}
                    variant={tier.highlighted ? "primary" : "secondary"}
                    size="md"
                    className="w-full"
                    glowIntensity={tier.highlighted ? "high" : "medium"}
                  >
                    {tier.cta}
                  </GlowingButton>
                </div>

                {/* Terminal-like decoration at bottom */}
                {tier.highlighted && (
                  <div className="bg-dark-bg/50 p-2 border-t border-white/10 font-code text-xs text-gray-500 flex items-center">
                    <span className="text-haclab-red mr-1">$</span>
                    <span>subscribe --plan={tier.name.toLowerCase()} --product={app.id}</span>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-dark-surface">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Frequently Asked <span className="text-haclab-red glow-text">Questions</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Find answers to common questions about {app.name}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {app.faq && app.faq.length > 0 ? (
              // Use app-specific FAQs if available
              app.faq.map((faqItem, index) => (
                <div key={index} className="bg-dark-bg/80 backdrop-blur-sm p-6 rounded-lg border border-white/10">
                  <h3 className="text-xl font-display font-semibold mb-3 flex items-center">
                    <FiHelpCircle className="text-haclab-red mr-2" /> {faqItem.question}
                  </h3>
                  <div
                    className="text-gray-400"
                    dangerouslySetInnerHTML={{
                      __html: faqItem.answer
                    }}
                  ></div>
                </div>
              ))
            ) : (
              // Default FAQs if none are specified for the app
              <>
                <div className="bg-dark-bg/80 backdrop-blur-sm p-6 rounded-lg border border-white/10">
                  <h3 className="text-xl font-display font-semibold mb-3 flex items-center">
                    <FiHelpCircle className="text-haclab-red mr-2" /> How does the licensing work?
                  </h3>
                  <p className="text-gray-400">
                    Our licenses are based on the number of users who will access the software. Each plan includes a specific user limit, and you can always upgrade as your team grows.
                  </p>
                </div>

                <div className="bg-dark-bg/80 backdrop-blur-sm p-6 rounded-lg border border-white/10">
                  <h3 className="text-xl font-display font-semibold mb-3 flex items-center">
                    <FiHelpCircle className="text-haclab-red mr-2" /> Is there a free trial available?
                  </h3>
                  <p className="text-gray-400">
                    Yes, we offer a 14-day free trial on our Professional plan with no credit card required. You'll have full access to all features during the trial period.
                  </p>
                </div>

                <div className="bg-dark-bg/80 backdrop-blur-sm p-6 rounded-lg border border-white/10">
                  <h3 className="text-xl font-display font-semibold mb-3 flex items-center">
                    <FiHelpCircle className="text-haclab-red mr-2" /> Do you offer technical support?
                  </h3>
                  <p className="text-gray-400">
                    All plans include technical support. Basic plans include standard support via email, while higher-tier plans include priority support with faster response times.
                  </p>
                </div>

                <div className="bg-dark-bg/80 backdrop-blur-sm p-6 rounded-lg border border-white/10">
                  <h3 className="text-xl font-display font-semibold mb-3 flex items-center">
                    <FiHelpCircle className="text-haclab-red mr-2" /> Can I upgrade or downgrade my plan?
                  </h3>
                  <p className="text-gray-400">
                    Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll be charged the prorated difference. When downgrading, the new rate will apply at the start of your next billing cycle.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Technical Specifications Section */}
      <React.Suspense fallback={null}>
        <TechnicalSpecsSection app={app} />
      </React.Suspense>

      {/* Product Support Section */}
      <React.Suspense fallback={null}>
        <ProductSupportSection app={app} />
      </React.Suspense>

      {/* Product FAQ Section */}
      <React.Suspense fallback={null}>
        <FAQSection
          title={`${app.name} FAQs`}
          description={`Find answers to common questions about ${app.name} and how it can benefit your business in Uganda.`}
          faqs={generateProductFaqs(app)}
        />
      </React.Suspense>

      {/* CTA Section */}
      <section className="py-20 bg-dark-bg relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-cta" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-cta)" />
          </svg>
        </div>

        {/* Animated code particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-haclab-red/20 font-code text-xs"
              initial={{
                x: Math.random() * 100 + "%",
                y: -20,
                opacity: 0.3 + Math.random() * 0.5
              }}
              animate={{
                y: "120%",
                rotate: Math.random() * 360
              }}
              transition={{
                duration: 15 + Math.random() * 20,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {`{code: ${app.id}}`}
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* IDE-like container */}
            <div className="bg-dark-surface/90 backdrop-blur-sm rounded-lg border border-white/10 overflow-hidden shadow-glow-sm">
              {/* IDE header */}
              <div className="bg-dark-bg border-b border-white/10 p-2 flex items-center">
                <div className="flex space-x-2 mr-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-sm font-code text-gray-400">get-started.tsx</div>
              </div>

              {/* Content */}
              <div className="p-8 md:p-12">
                <div className="text-center">
                  <motion.h2
                    className="text-3xl md:text-4xl font-display font-bold mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                  >
                    Ready to transform your business with <span className="text-haclab-red glow-text">{app.name}</span>?
                  </motion.h2>

                  <motion.p
                    className="text-xl text-gray-300 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    Join thousands of satisfied customers who have streamlined their operations and boosted productivity.
                  </motion.p>

                  <motion.div
                    className="flex flex-wrap justify-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <GlowingButton
                      href={app.repository}
                      variant="primary"
                      size="lg"
                      target="_blank"
                      rel="noopener noreferrer"
                      glowIntensity="high"
                    >
                      <FiDownload className="mr-2" /> Download Now
                    </GlowingButton>

                    <GlowingButton
                      href="/contact"
                      variant="secondary"
                      size="lg"
                    >
                      <FiMessageCircle className="mr-2" /> Request Demo
                    </GlowingButton>
                  </motion.div>
                </div>
              </div>

              {/* Code footer */}
              <div className="bg-dark-bg/80 border-t border-white/10 p-3 font-code text-xs text-gray-500">
                <div className="flex items-center">
                  <span className="text-haclab-red mr-1">$</span>
                  <span className="typing-animation">npm install @haclab/{app.id} --save</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-20 bg-dark-surface">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Explore Other <span className="text-haclab-red glow-text">Products</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Discover more powerful solutions from Haclab
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {apps
              .filter(relatedApp => relatedApp.id !== app.id)
              .slice(0, 3)
              .map((relatedApp, index) => (
                <Link
                  key={index}
                  href={`/products/${relatedApp.id}`}
                  className="block h-full"
                >
                  <div
                    className="h-full rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105"
                    style={{
                      background: `linear-gradient(135deg, ${relatedApp.color}, ${lightenColor(relatedApp.color, 20)})`
                    }}
                  >
                    <div className="relative h-full p-6 flex flex-col">
                      {/* Background pattern */}
                      <div className="absolute inset-0 overflow-hidden opacity-30">
                        <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                          <rect x="10" y="10" width="80" height="80" rx="5" fill="white" fillOpacity="0.05" />
                        </svg>
                      </div>

                      {/* Content */}
                      <div className="relative z-10">
                        {/* Category badge */}
                        <div className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs py-1 px-3 rounded-full font-code mb-4">
                          {relatedApp.type}
                        </div>

                        {/* Icon and name */}
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center mr-4 overflow-hidden">
                            <div className="relative w-10 h-10">
                              <Image
                                src={`/images/app-icons/${relatedApp.id}.png`}
                                alt={`${relatedApp.name} icon`}
                                fill
                                style={{ objectFit: 'contain' }}
                              />
                            </div>
                          </div>
                          <h3 className="text-xl font-display font-bold text-white">{relatedApp.name}</h3>
                        </div>

                        {/* Description */}
                        <div
                          className="text-white/80 mb-6"
                          dangerouslySetInnerHTML={{
                            __html: relatedApp.description || ''
                          }}
                        ></div>

                        <div className="mt-auto flex items-center text-white">
                          <span>Learn more</span>
                          <FiArrowRight className="ml-2" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
