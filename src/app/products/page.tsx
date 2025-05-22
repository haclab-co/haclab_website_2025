'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FiCode, FiServer, FiDatabase, FiLayers, FiPackage, FiCpu, FiGitBranch, FiShoppingCart, FiTruck, FiCalendar, FiUsers } from 'react-icons/fi';
import GlowingButton from '@/components/ui/GlowingButton';
import AppCard from '@/components/ui/AppCard';
import { apps } from '@/data/apps';
import EnhancedTerminal from '@/components/ui/EnhancedTerminal';
import { useRouter } from 'next/navigation';



export default function ProductsPage() {
  const [activeProduct, setActiveProduct] = useState('abacus');
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const productsRef = useRef(null);
  const isProductsInView = useInView(productsRef, { once: true, amount: 0.2 });
  const router = useRouter();

  // Use the apps data imported from src/data/apps.ts
  const filteredProducts = apps;

  // Get active product details
  const selectedProduct = apps.find(p => p.id === activeProduct) || apps[0];

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
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center py-20 bg-dark-bg text-white overflow-hidden" ref={heroRef}>
        {/* Background elements */}
        <div className="absolute inset-0 grid-bg opacity-10"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full absolute">
            <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-haclab-red/10 blur-xl"></div>
            <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-haclab-red/5 blur-xl"></div>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <motion.div
              className="inline-flex items-center justify-center p-2 bg-dark-surface rounded-full mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isHeroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <span className="flex items-center px-4 py-1 bg-haclab-red/10 rounded-full text-haclab-red font-code text-sm">
                <FiPackage className="mr-2" /> Software Products
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              Powerful <span className="text-haclab-red glow-text">Software Products</span> <br />
              Built for Modern Businesses
            </motion.h1>

            <motion.p
              className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              Explore our suite of innovative software products designed to help businesses
              streamline operations, enhance customer experiences, and drive growth.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              <GlowingButton
                href="#products"
                size="lg"
                glowIntensity="high"
              >
                Explore Products
              </GlowingButton>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Products Showcase Section */}
      <section id="products" className="py-20 bg-dark-bg text-white" ref={productsRef}>
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="text-center mb-16"
            variants={containerVariants}
            initial="hidden"
            animate={isProductsInView ? "visible" : "hidden"}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-display font-bold mb-4"
              variants={itemVariants}
              custom={0}
            >
              Our <span className="text-haclab-red glow-text">Software Products</span>
            </motion.h2>
            <motion.p
              className="text-gray-300 max-w-2xl mx-auto"
              variants={itemVariants}
              custom={1}
            >
              Explore our suite of innovative software solutions designed to help businesses streamline operations and drive growth.
            </motion.p>
          </motion.div>

          {/* Products Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
            variants={containerVariants}
            initial="hidden"
            animate={isProductsInView ? "visible" : "hidden"}
          >
            <AnimatePresence mode="wait">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <AppCard
                    id={product.id}
                    name={product.name}
                    type={product.type}
                    description={product.description}
                    color={product.color}
                    isActive={activeProduct === product.id}
                    onClick={() => setActiveProduct(product.id)}
                    technologies={product.technologies || []}
                    onMoreClick={(e) => {
                      e.preventDefault();
                      // Navigate to the product detail page
                      router.push(`/products/${product.id}`);
                    }}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Product Details Section */}
      <section className="py-20 bg-dark-surface text-white">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedProduct.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12"
            >
              {/* Product Info */}
              <div className="relative">
                {/* Background pattern based on product */}
                <div className="absolute inset-0 opacity-10 z-0">
                  <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    {selectedProduct.id === 'abacus' && (
                      <>
                        <circle cx="20" cy="20" r="5" fill="white" />
                        <circle cx="50" cy="20" r="5" fill="white" />
                        <circle cx="80" cy="20" r="5" fill="white" />
                        <circle cx="20" cy="50" r="5" fill="white" />
                        <circle cx="50" cy="50" r="5" fill="white" />
                        <circle cx="80" cy="50" r="5" fill="white" />
                        <circle cx="20" cy="80" r="5" fill="white" />
                        <circle cx="50" cy="80" r="5" fill="white" />
                        <circle cx="80" cy="80" r="5" fill="white" />
                      </>
                    )}
                    {selectedProduct.id === 'homz' && (
                      <>
                        <rect x="10" y="10" width="20" height="20" rx="2" fill="white" />
                        <rect x="40" y="10" width="20" height="20" rx="2" fill="white" />
                        <rect x="70" y="10" width="20" height="20" rx="2" fill="white" />
                        <rect x="10" y="40" width="20" height="20" rx="2" fill="white" />
                        <rect x="40" y="40" width="20" height="20" rx="2" fill="white" />
                        <rect x="70" y="40" width="20" height="20" rx="2" fill="white" />
                        <rect x="10" y="70" width="20" height="20" rx="2" fill="white" />
                        <rect x="40" y="70" width="20" height="20" rx="2" fill="white" />
                        <rect x="70" y="70" width="20" height="20" rx="2" fill="white" />
                      </>
                    )}
                    {selectedProduct.id === 'kanify' && (
                      <>
                        <path d="M20,20 L30,30 L20,40 L30,50 L20,60 L30,70 L20,80" stroke="white" strokeWidth="2" fill="none" />
                        <path d="M50,20 L60,30 L50,40 L60,50 L50,60 L60,70 L50,80" stroke="white" strokeWidth="2" fill="none" />
                        <path d="M80,20 L90,30 L80,40 L90,50 L80,60 L90,70 L80,80" stroke="white" strokeWidth="2" fill="none" />
                      </>
                    )}
                    {selectedProduct.id === 'lenkit' && (
                      <>
                        <path d="M10,10 L90,10 L90,30 L10,30 Z" fill="white" />
                        <path d="M10,40 L90,40 L90,60 L10,60 Z" fill="white" />
                        <path d="M10,70 L90,70 L90,90 L10,90 Z" fill="white" />
                      </>
                    )}
                    {selectedProduct.id === 'smart' && (
                      <>
                        <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" fill="white" />
                        <polygon points="50,30 70,40 70,60 50,70 30,60 30,40" fill="white" fillOpacity="0.5" />
                      </>
                    )}
                  </svg>
                </div>

                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 rounded-lg mr-4 flex items-center justify-center bg-gradient-to-br from-haclab-red to-haclab-red/70">
                      {selectedProduct.id === 'abacus' && <FiLayers size={32} className="text-white" />}
                      {selectedProduct.id === 'homz' && <FiUsers size={32} className="text-white" />}
                      {selectedProduct.id === 'kanify' && <FiTruck size={32} className="text-white" />}
                      {selectedProduct.id === 'lenkit' && <FiDatabase size={32} className="text-white" />}
                      {selectedProduct.id === 'smart' && <FiCalendar size={32} className="text-white" />}
                      {selectedProduct.id === 'ecommerce' && <FiShoppingCart size={32} className="text-white" />}
                      {selectedProduct.id === 'crm' && <FiUsers size={32} className="text-white" />}
                      {selectedProduct.id === 'iot' && <FiCpu size={32} className="text-white" />}
                      {selectedProduct.id === 'analytics' && <FiServer size={32} className="text-white" />}
                    </div>
                    <h2 className="text-3xl font-display font-bold">{selectedProduct.name}</h2>
                  </div>

                  <p className="text-xl text-gray-300 mb-8">{selectedProduct.description}</p>

                  {selectedProduct.features && (
                    <div className="bg-dark-bg/50 backdrop-blur-sm p-6 rounded-lg border border-white/10 mb-8">
                      <h3 className="text-xl font-display font-semibold mb-4 flex items-center">
                        <FiGitBranch className="text-haclab-red mr-2" /> Key Features
                      </h3>
                      <ul className="space-y-3 mb-0">
                        {selectedProduct.features.map((feature, index) => (
                          <motion.li
                            key={index}
                            className="flex items-start"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <div className="w-6 h-6 rounded-full bg-haclab-red/20 flex items-center justify-center text-haclab-red mr-3 mt-0.5">
                              <FiGitBranch size={14} />
                            </div>
                            <span>{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedProduct.technologies && selectedProduct.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-3 mb-8">
                      {selectedProduct.technologies.map((tech, index) => (
                        <motion.span
                          key={index}
                          className="px-3 py-1 bg-dark-bg/50 backdrop-blur-sm border border-white/10 rounded-full text-sm font-code"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-3">
                    <GlowingButton
                      href={selectedProduct.repository}
                      variant="primary"
                      size="md"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View on GitHub
                    </GlowingButton>

                    <GlowingButton
                      href={`/products/${selectedProduct.id}`}
                      variant="secondary"
                      size="md"
                    >
                      Learn More
                    </GlowingButton>
                  </div>
                </div>
              </div>

              {/* Code Snippet */}
              <div className="relative">
                {selectedProduct.codeSnippet ? (
                  <EnhancedTerminal
                    title={`${selectedProduct.name} Code Example`}
                    initialCommands={[selectedProduct.codeSnippet]}
                    showLineNumbers={true}
                    theme="dark"
                    maxHeight="400px"
                  />
                ) : (
                  <div className="h-full flex items-center justify-center bg-dark-bg/50 backdrop-blur-sm p-6 rounded-lg border border-white/10">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-haclab-red/20 flex items-center justify-center">
                        <FiCode className="text-haclab-red" size={32} />
                      </div>
                      <h3 className="text-xl font-display font-semibold mb-2">Code Example Coming Soon</h3>
                      <p className="text-gray-400">
                        We're working on adding code examples for {selectedProduct.name}.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
