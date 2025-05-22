'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FiSearch, FiArrowRight, FiCode, FiPackage, FiFolder, FiInfo, FiMail } from 'react-icons/fi';
import { motion } from 'framer-motion';

// Define main sections for search
const mainSections = [
  { name: 'Services', path: '/services', icon: <FiCode size={20} /> },
  { name: 'Products', path: '/products', icon: <FiPackage size={20} /> },
  { name: 'Work', path: '/work', icon: <FiFolder size={20} /> },
  { name: 'About', path: '/about', icon: <FiInfo size={20} /> },
  { name: 'Contact', path: '/contact', icon: <FiMail size={20} /> },
];

// Define services for search
const services = [
  { name: 'Web Development', path: '/services/web-development' },
  { name: 'Mobile App Development', path: '/services/mobile-app-development' },
  { name: 'Custom Software Development', path: '/services/custom-software' },
  { name: 'E-Commerce Solutions', path: '/services/ecommerce-solutions' },
  { name: 'UI/UX Design', path: '/services/ui-ux-design' },
  { name: 'SEO Optimization', path: '/services/seo-optimization' },
  { name: 'Database Design', path: '/services/database-design' },
];

export default function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate search functionality
    if (query) {
      setIsLoading(true);
      
      // Simple search implementation
      const results = [
        // Search in main sections
        ...mainSections.filter(section => 
          section.name.toLowerCase().includes(query.toLowerCase())
        ).map(section => ({
          type: 'section',
          ...section
        })),
        
        // Search in services
        ...services.filter(service => 
          service.name.toLowerCase().includes(query.toLowerCase())
        ).map(service => ({
          type: 'service',
          ...service,
          icon: <FiCode size={20} />
        })),
      ];
      
      // Simulate API delay
      setTimeout(() => {
        setSearchResults(results);
        setIsLoading(false);
      }, 500);
    } else {
      setSearchResults([]);
      setIsLoading(false);
    }
  }, [query]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-24 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-8 text-white">
          Search Results {query && <span>for "{query}"</span>}
        </h1>
        
        {/* Search form */}
        <div className="bg-dark-surface border border-white/10 rounded-lg p-4 mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              defaultValue={query}
              placeholder="Search Haclab..."
              className="w-full pl-10 pr-4 py-3 bg-dark-bg border border-white/10 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-haclab-red focus:border-transparent"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const input = e.target as HTMLInputElement;
                  window.location.href = `/search?q=${encodeURIComponent(input.value)}`;
                }
              }}
            />
          </div>
        </div>
        
        {/* Loading state */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-haclab-red"></div>
          </div>
        ) : (
          <>
            {/* Results */}
            {searchResults.length > 0 ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid gap-4"
              >
                {searchResults.map((result, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="bg-dark-surface border border-white/10 rounded-lg p-4 hover:bg-dark-surface/80 transition-colors"
                  >
                    <Link href={result.path} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="mr-4 text-haclab-red">
                          {result.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-white">{result.name}</h3>
                          <p className="text-sm text-gray-400">
                            {result.type === 'section' ? 'Main Section' : 'Service'}
                          </p>
                        </div>
                      </div>
                      <FiArrowRight className="text-gray-400" />
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            ) : query ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-400 mb-4">No results found for "{query}"</p>
                <p className="text-gray-500">Try different keywords or browse our main sections below</p>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-xl text-gray-400 mb-4">Enter a search term to find content</p>
              </div>
            )}
            
            {/* Main sections */}
            {(query === '' || searchResults.length === 0) && (
              <div className="mt-12">
                <h2 className="text-xl font-display font-bold mb-6 text-white">Browse Main Sections</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mainSections.map((section, index) => (
                    <Link
                      key={index}
                      href={section.path}
                      className="bg-dark-surface border border-white/10 rounded-lg p-6 hover:bg-dark-surface/80 transition-colors flex items-center"
                    >
                      <div className="mr-4 text-haclab-red">
                        {section.icon}
                      </div>
                      <h3 className="text-lg font-medium text-white">{section.name}</h3>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
