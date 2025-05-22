'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiUsers, FiTrendingUp, FiGlobe, FiCheck } from 'react-icons/fi';
import { AppData } from '@/data/apps';
import Image from 'next/image';

interface UgandaSpecificSectionProps {
  app: AppData;
}

/**
 * Component that displays Uganda-specific content for product pages
 * This helps with SEO by including location-specific keywords and addressing local needs
 */
export default function UgandaSpecificSection({ app }: UgandaSpecificSectionProps) {
  // Generate Uganda-specific use cases based on app type
  const getUgandaUseCases = (app: AppData) => {
    const baseUseCases = [
      {
        title: "Kampala Businesses",
        description: `${app.name} is optimized for businesses in Kampala's unique market conditions, with features designed to address local challenges.`,
        icon: <FiMapPin className="text-haclab-red" size={24} />
      },
      {
        title: "Uganda-wide Operations",
        description: `Scale your operations across Uganda with ${app.name}'s multi-location support and regional customizations.`,
        icon: <FiGlobe className="text-haclab-red" size={24} />
      }
    ];

    // Add app-specific use cases
    switch(app.type) {
      case 'Inventory Management Software':
        return [
          ...baseUseCases,
          {
            title: "Uganda Supply Chain Management",
            description: `Manage local and international suppliers with features designed for Uganda's import/export regulations and customs procedures.`,
            icon: <FiTrendingUp className="text-haclab-red" size={24} />
          },
          {
            title: "Kampala Retail Operations",
            description: `Optimize inventory for Kampala's retail environment with tools designed for local market fluctuations and seasonal demands.`,
            icon: <FiUsers className="text-haclab-red" size={24} />
          }
        ];
      case 'Hotel Management System':
        return [
          ...baseUseCases,
          {
            title: "Uganda Tourism Sector",
            description: `Specially designed for Uganda's growing tourism industry with features for safari bookings, local tour operator integration, and seasonal pricing optimization.`,
            icon: <FiTrendingUp className="text-haclab-red" size={24} />
          },
          {
            title: "Kampala Hospitality Market",
            description: `Tailored for Kampala's competitive hospitality market with tools for local event management, corporate client tracking, and city-specific promotions.`,
            icon: <FiUsers className="text-haclab-red" size={24} />
          }
        ];
      case 'Restaurant Management Software':
        return [
          ...baseUseCases,
          {
            title: "Uganda Food Service Industry",
            description: `Optimized for Uganda's food service sector with support for local payment methods, mobile money integration, and local supplier management.`,
            icon: <FiTrendingUp className="text-haclab-red" size={24} />
          },
          {
            title: "Kampala Dining Scene",
            description: `Designed for Kampala's vibrant dining scene with features for delivery zone management, local menu customization, and peak hour optimization.`,
            icon: <FiUsers className="text-haclab-red" size={24} />
          }
        ];
      default:
        return [
          ...baseUseCases,
          {
            title: "Uganda Business Environment",
            description: `Adapted to Uganda's unique business environment with features that address local regulatory requirements and market conditions.`,
            icon: <FiTrendingUp className="text-haclab-red" size={24} />
          },
          {
            title: "East African Integration",
            description: `Designed for businesses operating across East Africa with multi-currency support, cross-border operations tools, and regional reporting.`,
            icon: <FiUsers className="text-haclab-red" size={24} />
          }
        ];
    }
  };

  const ugandaUseCases = getUgandaUseCases(app);

  return (
    <section className="py-20 bg-dark-surface">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <div className="inline-block bg-haclab-red/10 backdrop-blur-sm text-white/90 text-sm py-1 px-3 rounded-full font-code mb-4">
            Local Expertise & Support
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Optimized for <span className="text-haclab-red glow-text">Uganda</span> Businesses
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            {app.name} is specifically designed to address the unique challenges and opportunities for businesses in Kampala, Entebbe, Jinja, Mbarara, and across Uganda
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {ugandaUseCases.map((useCase, index) => (
            <motion.div
              key={index}
              className="bg-dark-bg/80 backdrop-blur-sm p-6 rounded-lg border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center bg-gradient-to-br from-haclab-red/20 to-haclab-red/10">
                {useCase.icon}
              </div>
              <h3 className="text-xl font-display font-semibold mb-3">{useCase.title}</h3>
              <p className="text-gray-400">
                {useCase.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="bg-dark-bg/50 backdrop-blur-sm p-6 rounded-lg border border-white/10 shadow-glow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-lg bg-haclab-red/20 flex items-center justify-center mr-3">
                  <FiMapPin className="text-haclab-red" size={20} />
                </div>
                <h3 className="text-2xl font-display font-semibold">
                  Uganda-Based Support
                </h3>
              </div>

              <p className="text-gray-300 mb-6 border-l-2 border-haclab-red/30 pl-4 italic">
                With our headquarters in Kampala, we provide unmatched local support and expertise for businesses across Uganda, ensuring you receive timely assistance tailored to local needs.
              </p>

              <ul className="space-y-4 mb-6">
                <li className="flex items-start bg-dark-surface/50 p-3 rounded-lg hover:bg-dark-surface/80 transition-colors duration-300">
                  <FiCheck className="text-haclab-red mt-1 mr-3 flex-shrink-0" size={18} />
                  <div>
                    <span className="font-semibold">Uganda-based technical support</span>
                    <p className="text-sm text-gray-400 mt-1">Available during local business hours with specialists who understand Uganda's unique challenges</p>
                  </div>
                </li>
                <li className="flex items-start bg-dark-surface/50 p-3 rounded-lg hover:bg-dark-surface/80 transition-colors duration-300">
                  <FiCheck className="text-haclab-red mt-1 mr-3 flex-shrink-0" size={18} />
                  <div>
                    <span className="font-semibold">Local implementation specialists</span>
                    <p className="text-sm text-gray-400 mt-1">Experts familiar with Uganda's business environment and regulatory requirements</p>
                  </div>
                </li>
                <li className="flex items-start bg-dark-surface/50 p-3 rounded-lg hover:bg-dark-surface/80 transition-colors duration-300">
                  <FiCheck className="text-haclab-red mt-1 mr-3 flex-shrink-0" size={18} />
                  <div>
                    <span className="font-semibold">On-site training available</span>
                    <p className="text-sm text-gray-400 mt-1">In Kampala, Entebbe, Jinja, Mbarara, and other major Ugandan cities</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="relative h-80 md:h-96 rounded-lg overflow-hidden bg-dark-surface border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/30 to-transparent pointer-events-none z-10"></div>
              <Image
                src="/images/uganda-map.svg"
                alt="Map of Uganda highlighting Haclab service areas in Kampala, Entebbe, Jinja, Mbarara, and Gulu"
                fill
                style={{ objectFit: 'contain' }}
                className="z-0"
                priority
                onError={(e) => {
                  // Fallback if image doesn't exist
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).parentElement!.innerHTML = `
                    <div class="flex items-center justify-center w-full h-full bg-dark-bg/50 rounded-lg">
                      <div class="text-center p-4">
                        <div class="text-haclab-red mb-2"><FiMapPin size={32} /></div>
                        <p class="text-white/80">Serving businesses across Uganda</p>
                        <p class="text-white/60 text-sm mt-2">Kampala • Entebbe • Jinja • Mbarara • Gulu</p>
                      </div>
                    </div>
                  `;
                }}
              />
              <div className="absolute bottom-4 right-4 bg-dark-bg/70 backdrop-blur-sm px-3 py-2 rounded-md text-xs text-white/80 z-20">
                <span className="text-haclab-red font-semibold">Haclab</span> service coverage
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
