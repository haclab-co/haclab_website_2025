'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiHeadphones, FiClock, FiMail, FiPhone, FiMessageSquare, FiFileText, FiVideo } from 'react-icons/fi';
import { AppData } from '@/data/apps';

interface ProductSupportSectionProps {
  app: AppData;
  className?: string;
}

/**
 * Component that displays product support information
 * This helps with SEO by providing structured support content that matches the schema markup
 */
export default function ProductSupportSection({ app, className = '' }: ProductSupportSectionProps) {
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

  // Support channels
  const supportChannels = [
    {
      icon: <FiPhone className="text-haclab-red" size={24} />,
      title: "Phone Support",
      description: "Speak directly with our technical support team based in Kampala",
      contact: "+256-781-343882",
      hours: "Monday-Friday, 9am-5pm EAT"
    },
    {
      icon: <FiMail className="text-haclab-red" size={24} />,
      title: "Email Support",
      description: "Send us your questions or issues and receive a response within 24 hours",
      contact: "support@haclab.net",
      hours: "24/7 - monitored during business hours"
    },
    {
      icon: <FiMessageSquare className="text-haclab-red" size={24} />,
      title: "Live Chat",
      description: "Chat with our support team in real-time for immediate assistance",
      contact: "Available on our website",
      hours: "Monday-Friday, 9am-5pm EAT"
    },
    {
      icon: <FiFileText className="text-haclab-red" size={24} />,
      title: "Documentation",
      description: "Access comprehensive guides and documentation for self-service support",
      contact: `docs.haclab.co/${app.id}`,
      hours: "Available 24/7"
    },
    {
      icon: <FiVideo className="text-haclab-red" size={24} />,
      title: "Remote Sessions",
      description: "Schedule a remote support session with our technical team",
      contact: "Book through our support portal",
      hours: "By appointment"
    }
  ];

  return (
    <section className={`py-20 bg-dark-surface ${className}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center bg-dark-bg/50 text-haclab-red text-sm py-1 px-3 rounded-full font-code mb-4">
            <FiHeadphones className="mr-2" />
            <span>Support</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            {app.name} Support Services
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            We provide comprehensive support for {app.name} users throughout Uganda and East Africa, with local expertise and personalized assistance.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {supportChannels.map((channel, index) => (
            <motion.div
              key={index}
              className="bg-dark-bg p-6 rounded-lg border border-dark-border hover:border-haclab-red/30 transition-colors"
              variants={itemVariants}
            >
              <div className="flex items-start mb-4">
                <div className="bg-haclab-red/10 p-3 rounded-lg mr-4">
                  {channel.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{channel.title}</h3>
                  <div className="flex items-center text-xs text-gray-400 mt-1">
                    <FiClock className="mr-1" />
                    <span>{channel.hours}</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-300 mb-4">{channel.description}</p>
              <div className="font-code text-sm bg-dark-surface p-2 rounded border border-dark-border">
                {channel.contact}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 bg-dark-bg p-6 rounded-lg border border-dark-border">
          <h3 className="text-xl font-semibold mb-4">Local Support in Uganda</h3>
          <p className="text-gray-300 mb-4">
            As a Ugandan company based in Kampala, we provide localized support that understands the unique challenges and requirements of businesses in Uganda and East Africa. Our support team speaks English, Luganda, and Swahili to ensure clear communication.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="bg-dark-surface p-4 rounded border border-dark-border">
              <h4 className="font-semibold mb-2">On-site Support</h4>
              <p className="text-gray-300 text-sm">
                Available for businesses in Kampala, Entebbe, Jinja, Mukono, and Wakiso. Our technical team can visit your premises to provide hands-on assistance and training.
              </p>
            </div>
            <div className="bg-dark-surface p-4 rounded border border-dark-border">
              <h4 className="font-semibold mb-2">Training Programs</h4>
              <p className="text-gray-300 text-sm">
                We offer customized training programs for your team, either at our Kampala office or at your location. Remote training options are available for clients outside Kampala.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
