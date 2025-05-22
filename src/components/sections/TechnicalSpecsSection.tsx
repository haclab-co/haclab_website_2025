'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiCpu, FiServer, FiDatabase, FiLayers, FiGlobe, FiShield, FiUsers, FiMonitor } from 'react-icons/fi';
import { AppData } from '@/data/apps';

interface TechnicalSpecsSectionProps {
  app: AppData;
  className?: string;
}

/**
 * Component that displays technical specifications for a product
 * This helps with SEO by providing structured technical content that matches the schema markup
 */
export default function TechnicalSpecsSection({ app, className = '' }: TechnicalSpecsSectionProps) {
  // Generate technical specifications based on app type
  const getTechnicalSpecs = (app: AppData) => {
    // Common specs for all apps
    const commonSpecs = [
      {
        icon: <FiCpu className="text-haclab-red" size={24} />,
        title: "System Requirements",
        specs: [
          "Operating System: Windows 10/11, macOS 10.15+, Ubuntu 20.04+",
          "Processor: Intel Core i3 or equivalent (i5 recommended)",
          "Memory: 4GB RAM minimum (8GB recommended)",
          "Storage: 500MB available space",
          "Display: 1366x768 resolution or higher"
        ]
      },
      {
        icon: <FiServer className="text-haclab-red" size={24} />,
        title: "Server Requirements",
        specs: [
          "Server OS: Ubuntu Server 20.04 LTS, Windows Server 2019+",
          "Processor: 2+ CPU cores",
          "Memory: 4GB RAM minimum (8GB recommended)",
          "Storage: 20GB available space (SSD recommended)",
          "Network: Stable internet connection"
        ]
      },
      {
        icon: <FiGlobe className="text-haclab-red" size={24} />,
        title: "Connectivity",
        specs: [
          "Internet: Required for cloud features, optional for on-premise",
          "Bandwidth: 1Mbps minimum (5Mbps+ recommended)",
          "Offline capability: Available for essential functions",
          "Mobile data optimization: Compressed data transfer",
          "Local network: Required for multi-user setup"
        ]
      },
      {
        icon: <FiShield className="text-haclab-red" size={24} />,
        title: "Security",
        specs: [
          "Data encryption: AES-256 for stored data",
          "Authentication: Multi-factor authentication support",
          "Access control: Role-based permissions system",
          "Backup: Automated daily backups",
          "Compliance: GDPR-ready data handling"
        ]
      }
    ];

    // App-specific specs
    const specificSpecs = [];
    
    switch (app.type) {
      case 'Inventory Management Software':
        specificSpecs.push({
          icon: <FiDatabase className="text-haclab-red" size={24} />,
          title: "Data Management",
          specs: [
            "Database: SQLite (single-user), PostgreSQL (multi-user)",
            "Max products: Unlimited (performance optimized up to 100,000)",
            "Barcode support: 1D and 2D barcode formats",
            "Import/Export: CSV, Excel, JSON formats",
            "Data validation: Built-in validation rules"
          ]
        });
        break;
      case 'Hotel Management System':
        specificSpecs.push({
          icon: <FiUsers className="text-haclab-red" size={24} />,
          title: "Capacity",
          specs: [
            "Max rooms: Unlimited (optimized for up to 500)",
            "Concurrent users: Up to 50 simultaneous users",
            "Booking channels: Direct, OTA, phone, walk-in",
            "Payment processing: Credit card, mobile money, cash",
            "Reporting: Real-time and scheduled reports"
          ]
        });
        break;
      case 'School Management and Resource Tracker':
        specificSpecs.push({
          icon: <FiMonitor className="text-haclab-red" size={24} />,
          title: "Capacity",
          specs: [
            "Max students: Unlimited (optimized for up to 5,000)",
            "Max classes: Unlimited (optimized for up to 100)",
            "Concurrent users: Up to 100 simultaneous users",
            "Report cards: Customizable templates",
            "SMS notifications: Integration with local providers"
          ]
        });
        break;
      default:
        specificSpecs.push({
          icon: <FiLayers className="text-haclab-red" size={24} />,
          title: "Integration",
          specs: [
            "API: RESTful API for third-party integration",
            "Authentication: OAuth 2.0, API keys",
            "Webhooks: Real-time event notifications",
            "File formats: JSON, XML, CSV support",
            "Mobile apps: Android and iOS companion apps"
          ]
        });
    }

    return [...commonSpecs, ...specificSpecs];
  };

  const specs = getTechnicalSpecs(app);

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
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className={`py-20 bg-dark-bg ${className}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center bg-dark-surface/50 text-haclab-red text-sm py-1 px-3 rounded-full font-code mb-4">
            <FiCpu className="mr-2" />
            <span>Technical Specifications</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            {app.name} System Requirements
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Technical details and requirements for deploying {app.name} in your business environment in Uganda.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {specs.map((spec, index) => (
            <motion.div
              key={index}
              className="bg-dark-surface p-6 rounded-lg border border-dark-border"
              variants={itemVariants}
            >
              <div className="flex items-start mb-4">
                <div className="bg-dark-bg p-3 rounded-lg mr-4">
                  {spec.icon}
                </div>
                <h3 className="text-xl font-semibold pt-2">{spec.title}</h3>
              </div>
              <ul className="space-y-2">
                {spec.specs.map((item, i) => (
                  <li key={i} className="text-gray-300 flex items-start">
                    <span className="text-haclab-red mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
