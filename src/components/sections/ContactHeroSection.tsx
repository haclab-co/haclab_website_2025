'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowDown, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import GlowingButton from '../ui/GlowingButton';
import AnimatedTerminal from '../ui/AnimatedTerminal';

const ContactHeroSection: React.FC = () => {
  const terminalCommands = [
    "// Contact Haclab Company Limited",
    "const contact = {",
    "  email: 'info@haclab.net',",
    "  phone: '+256 781 343 882',",
    "  address: 'Kireka Kamuli Road, Kampala, Uganda',",
    "  socialMedia: {",
    "    github: 'https://github.com/haclab-co',",
    "    twitter: 'https://twitter.com/HaclabCo',",
    "    facebook: 'https://web.facebook.com/HytechUg',",
    "    linkedin: 'https://www.linkedin.com/company/hytech-Uganda'",
    "  }",
    "};",
    "",
    "// Send us a message",
    "function contactUs(message) {",
    "  return new Promise((resolve) => {",
    "    console.log('Sending your message...');",
    "    setTimeout(() => {",
    "      resolve('Message sent successfully! We will get back to you soon.');",
    "    }, 1000);",
    "  });",
    "}",
    "",
    "// Let's connect!",
    "contactUs('Hello Haclab, I would like to discuss a project...');"
  ];
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  const contactMethods = [
    {
      icon: <FiMail className="text-haclab-red text-xl" />,
      label: 'Email Us',
      value: 'info@haclab.net',
      link: 'mailto:info@haclab.net'
    },
    {
      icon: <FiPhone className="text-haclab-red text-xl" />,
      label: 'Call Us',
      value: '+256 781 343 882',
      link: 'tel:+256781343882'
    },
    {
      icon: <FiMapPin className="text-haclab-red text-xl" />,
      label: 'Visit Us',
      value: 'Kireka Kamuli Road, Kampala, Uganda',
      link: 'https://maps.google.com/?q=Kireka+Kamuli+Road,+Kampala,+Uganda'
    }
  ];

  return (
    <section className="relative min-h-[70vh] flex items-center pt-32 pb-16 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-dark-bg"></div>
      <div className="absolute inset-0 grid-bg opacity-10"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div 
            className="lg:w-1/2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
                Get in <span className="text-haclab-red glow-text">Touch</span>
              </h1>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <p className="text-gray-300 text-lg mb-8 max-w-xl">
                Have a project in mind or want to learn more about our services? We'd love to hear from you. Reach out to us using any of the methods below.
              </p>
            </motion.div>
            
            <motion.div 
              className="space-y-4 mb-8"
              variants={containerVariants}
            >
              {contactMethods.map((method, index) => (
                <motion.a
                  key={index}
                  href={method.link}
                  className="flex items-center p-4 bg-dark-surface rounded-lg hover:bg-dark-surface/80 transition-colors"
                  variants={itemVariants}
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                >
                  <div className="w-10 h-10 rounded-full bg-dark-bg flex items-center justify-center mr-4">
                    {method.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-code text-gray-400">{method.label}</h3>
                    <p className="text-white font-medium">{method.value}</p>
                  </div>
                </motion.a>
              ))}
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <GlowingButton 
                href="#contact-form" 
                size="lg"
                icon={<FiArrowDown />}
                iconPosition="right"
              >
                Send a Message
              </GlowingButton>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6 }}
          >
            <AnimatedTerminal 
              commands={terminalCommands} 
              typingSpeed={50}
              className="w-full max-w-xl mx-auto shadow-glow"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactHeroSection;
