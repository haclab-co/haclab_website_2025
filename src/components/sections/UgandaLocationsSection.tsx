'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiMap } from 'react-icons/fi';

interface LocationItem {
  name: string;
  description: string;
}

interface UgandaLocationsSectionProps {
  title?: string;
  description?: string;
  className?: string;
}

/**
 * Component that displays Uganda-specific location content
 * This helps with local SEO by mentioning key locations in Uganda
 */
export default function UgandaLocationsSection({
  title = "Serving Businesses Across Uganda",
  description = "Haclab provides software development services to businesses throughout Uganda, with a focus on delivering local expertise and support.",
  className = '',
}: UgandaLocationsSectionProps) {
  // List of key locations in Uganda with service descriptions
  const locations: LocationItem[] = [
    {
      name: "Kampala",
      description: "Our headquarters in Kampala allows us to provide hands-on support and personalized service to businesses in Uganda's capital city. We understand the unique challenges and opportunities of the Kampala business environment."
    },
    {
      name: "Entebbe",
      description: "We serve businesses in Entebbe with custom software solutions tailored to the local tourism and hospitality industry, helping them leverage technology to attract international visitors."
    },
    {
      name: "Jinja",
      description: "Our services extend to Jinja, where we help local businesses in manufacturing and tourism sectors implement digital solutions that improve efficiency and customer experience."
    },
    {
      name: "Mukono",
      description: "Businesses in Mukono benefit from our expertise in developing custom software solutions that address the specific needs of the agricultural and educational sectors in the region."
    },
    {
      name: "Wakiso",
      description: "We provide technology solutions to businesses in Wakiso, helping them establish a strong online presence and implement efficient digital systems for growth."
    },
    {
      name: "Mbarara",
      description: "Our services reach businesses in Mbarara, where we help local enterprises in the dairy industry and retail sector implement custom software solutions for improved operations."
    },
    {
      name: "Gulu",
      description: "We support businesses in Gulu with tailored software solutions that address the unique challenges of northern Uganda, helping them connect with customers across the country."
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
            <FiMap className="mr-2" />
            <span>Local Presence</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            {title}
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {locations.map((location, index) => (
            <motion.div
              key={index}
              className="bg-dark-surface p-6 rounded-lg border border-dark-border hover:border-haclab-red/30 transition-colors"
              variants={itemVariants}
            >
              <div className="flex items-start mb-4">
                <div className="bg-haclab-red/10 p-2 rounded-lg mr-4">
                  <FiMapPin className="text-haclab-red text-xl" />
                </div>
                <h3 className="text-xl font-semibold">{location.name}</h3>
              </div>
              <p className="text-gray-300">{location.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
