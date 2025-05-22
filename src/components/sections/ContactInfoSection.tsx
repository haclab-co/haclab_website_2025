'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiGithub, FiTwitter, FiFacebook, FiInstagram, FiLinkedin, FiClock, FiMapPin } from 'react-icons/fi';
import ParallaxSection from '../ui/ParallaxSection';
import dynamic from 'next/dynamic';
import LoadingUI from '../ui/LoadingUI';

// Dynamically import the Map component to avoid SSR issues with Leaflet
const MapComponent = dynamic(() => import('../ui/MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="bg-dark-surface rounded-lg overflow-hidden h-64 flex items-center justify-center">
      <LoadingUI
        variant="inline"
        theme="circuit"
        text="Loading map..."
        size="md"
      />
    </div>
  )
});

const ContactInfoSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const socialLinks = [
    {
      name: 'GitHub',
      icon: <FiGithub size={24} />,
      url: 'https://github.com/haclab-co',
      color: '#333'
    },
    {
      name: 'Twitter',
      icon: <FiTwitter size={24} />,
      url: 'https://twitter.com/HaclabCo',
      color: '#1DA1F2'
    },
    {
      name: 'Facebook',
      icon: <FiFacebook size={24} />,
      url: 'https://web.facebook.com/HytechUg',
      color: '#4267B2'
    },
    {
      name: 'Instagram',
      icon: <FiInstagram size={24} />,
      url: 'https://www.instagram.com/haclab_co/',
      color: '#E1306C'
    },
    {
      name: 'LinkedIn',
      icon: <FiLinkedin size={24} />,
      url: 'https://www.linkedin.com/company/hytech-Uganda',
      color: '#0077B5'
    }
  ];

  const businessHours = [
    { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM' },
    { day: 'Saturday', hours: '10:00 AM - 2:00 PM' },
    { day: 'Sunday', hours: 'Closed' }
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5
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
            Connect With <span className="text-haclab-red glow-text">Us</span>
          </motion.h2>
          <motion.p
            className="text-gray-300 max-w-2xl mx-auto"
            variants={titleVariants}
          >
            Follow us on social media and stay updated with our latest projects and announcements.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Social Media Links */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="col-span-1"
          >
            <motion.h3
              className="text-xl font-display font-semibold mb-6 relative inline-block"
              variants={titleVariants}
            >
              Follow Us
              <span className="absolute bottom-[-4px] left-0 w-10 h-0.5 bg-haclab-red"></span>
            </motion.h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 bg-dark-surface rounded-lg hover:bg-dark-surface/80 transition-colors"
                  custom={index}
                  variants={itemVariants}
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mr-4"
                    style={{ backgroundColor: `${link.color}20` }} // 20% opacity of the color
                  >
                    <span style={{ color: link.color }}>{link.icon}</span>
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{link.name}</h4>
                    <p className="text-sm text-gray-400 font-code">@haclab</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Map (Full Width) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="col-span-1 lg:col-span-2 order-first lg:order-last"
          >
            <motion.h3
              className="text-xl font-display font-semibold mb-6 relative inline-block"
              variants={titleVariants}
            >
              Our Location
              <span className="absolute bottom-[-4px] left-0 w-10 h-0.5 bg-haclab-red"></span>
            </motion.h3>

            {/* Interactive Map */}
            <motion.div
              className="rounded-lg overflow-hidden h-96 relative"
              variants={titleVariants}
            >
              {/* Map title overlay */}
              <div className="absolute top-3 left-3 z-10 bg-dark-surface/80 backdrop-blur-sm px-3 py-1 rounded font-code text-xs text-gray-300 border border-dark-border">
                <span className="text-haclab-red mr-1">$</span> locate --address="Haclab Company Limited"
              </div>

              {/* Map container with styling */}
              <div className="rounded-lg overflow-hidden h-full border border-dark-border shadow-glow-sm">
                <MapComponent
                  position={[0.3476, 32.6339]} // Approximate coordinates for Kampala, Uganda
                  zoom={13}
                  markerPosition={[0.3476, 32.6339]}
                  markerPopup="<strong>Haclab Company Limited</strong><br/>Kireka Kamuli Road, Kampala, Uganda"
                />
              </div>

              {/* Get Directions Button */}
              <div className="mt-4 flex justify-end">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=0.3476,32.6339&travelmode=driving"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2 bg-dark-surface text-white font-code text-sm rounded border border-dark-border hover:bg-dark-bg transition-colors group"
                >
                  <span className="text-haclab-red mr-2 group-hover:translate-x-1 transition-transform">
                    <FiMapPin />
                  </span>
                  <span className="mr-1">$</span>
                  <span className="text-gray-400">navigate</span>
                  <span className="text-haclab-red mx-1">--to</span>
                  <span className="text-gray-300">Haclab</span>
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Business Hours */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="order-last lg:order-first"
          >
            <motion.h3
              className="text-xl font-display font-semibold mb-6 relative inline-block"
              variants={titleVariants}
            >
              Business Hours
              <span className="absolute bottom-[-4px] left-0 w-10 h-0.5 bg-haclab-red"></span>
            </motion.h3>

            <motion.div
              className="bg-dark-surface p-6 rounded-lg mb-8"
              variants={titleVariants}
            >
              <ul className="space-y-4">
                {businessHours.map((schedule, index) => (
                  <li key={index} className="flex items-start">
                    <FiClock className="text-haclab-red mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <span className="font-medium">{schedule.day}</span>
                      <p className="text-gray-400">{schedule.hours}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </ParallaxSection>
  );
};

export default ContactInfoSection;
