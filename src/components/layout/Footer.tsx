'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FiCode, FiGithub, FiTwitter, FiFacebook, FiInstagram, FiLinkedin,
  FiPhone, FiMail, FiMapPin, FiFolder, FiFolderPlus, FiFile,
  FiTerminal, FiCpu, FiServer, FiDatabase, FiLayers, FiChevronRight,
  FiClock, FiGlobe, FiInfo, FiHeart
} from 'react-icons/fi';
import TerminalText from '../ui/TerminalText';
import Logo from '../ui/Logo';

const Footer: React.FC = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState<'explorer' | 'terminal' | 'output'>('explorer');

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
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

  // Terminal commands for contact info
  const contactCommands = [
    "contact --location='Kireka Kamuli Road, Kampala, Uganda'",
    "contact --email='info@haclab.net'",
    "contact --phone='+256781343882'"
  ];

  // Social media links
  const socialLinks = [
    { icon: <FiGithub size={16} />, url: 'https://github.com/haclab-co', name: 'GitHub' },
    { icon: <FiTwitter size={16} />, url: 'https://twitter.com/HaclabCo', name: 'Twitter' },
    { icon: <FiFacebook size={16} />, url: 'https://web.facebook.com/HytechUg', name: 'Facebook' },
    { icon: <FiInstagram size={16} />, url: 'https://www.instagram.com/haclab_co/', name: 'Instagram' },
    { icon: <FiLinkedin size={16} />, url: 'https://www.linkedin.com/company/hytech-Uganda', name: 'LinkedIn' }
  ];

  // Services links
  const serviceLinks = [
    { path: '/services/software-development', name: 'Software Development', icon: <FiCode size={14} /> },
    { path: '/services/web-development', name: 'Web Development', icon: <FiGlobe size={14} /> },
    { path: '/services/mobile-app-development', name: 'Mobile App Development', icon: <FiCpu size={14} /> },
    { path: '/services/ecommerce-solutions', name: 'E-Commerce Solutions', icon: <FiLayers size={14} /> },
    { path: '/services/database-design', name: 'Database Design', icon: <FiDatabase size={14} /> }
  ];

  // Quick links
  const quickLinks = [
    { path: '/products', name: 'Products', icon: <FiServer size={14} /> },
    { path: '/work', name: 'Our Work', icon: <FiFolder size={14} /> },
    { path: '/about', name: 'About Us', icon: <FiInfo size={14} /> },
    { path: '/contact', name: 'Contact Us', icon: <FiMail size={14} /> }
  ];

  return (
    <footer className="bg-dark-bg text-white relative overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 grid-bg opacity-10"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* IDE-like container */}
        <motion.div
          className="rounded-lg overflow-hidden border border-dark-border shadow-lg my-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* IDE Header with tabs */}
          <div className="bg-dark-surface border-b border-dark-border flex items-center">
            <div className="flex space-x-1.5 px-4 py-2">
              <div className="h-3 w-3 rounded-full bg-haclab-red"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
            </div>

            <div className="flex border-b border-dark-border">
              <button
                className={`px-4 py-2 font-code text-sm flex items-center ${activeTab === 'explorer' ? 'bg-dark-bg text-white border-r border-l border-dark-border' : 'text-gray-400 hover:text-white'}`}
                onClick={() => setActiveTab('explorer')}
              >
                <FiFolder className="mr-2" /> Explorer
              </button>
              <button
                className={`px-4 py-2 font-code text-sm flex items-center ${activeTab === 'terminal' ? 'bg-dark-bg text-white border-r border-l border-dark-border' : 'text-gray-400 hover:text-white'}`}
                onClick={() => setActiveTab('terminal')}
              >
                <FiTerminal className="mr-2" /> Terminal
              </button>
              <button
                className={`px-4 py-2 font-code text-sm flex items-center ${activeTab === 'output' ? 'bg-dark-bg text-white border-r border-l border-dark-border' : 'text-gray-400 hover:text-white'}`}
                onClick={() => setActiveTab('output')}
              >
                <FiServer className="mr-2" /> Output
              </button>
            </div>
          </div>

          {/* IDE Content Area */}
          <div className="bg-dark-bg p-6">
            {/* Explorer Tab */}
            {activeTab === 'explorer' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Company Info */}
                <motion.div variants={itemVariants} className="border-l-2 border-haclab-red pl-4">
                  <div className="flex items-center mb-4">
                    <FiFolder className="text-haclab-red mr-2" />
                    <span className="font-code font-semibold text-white">HACLAB</span>
                  </div>
                  <div className="mb-4 hover:bg-dark-surface p-2 rounded transition-colors">
                    <Logo variant="terminal" size="md" color="light" href="/" />
                  </div>
                  <p className="text-gray-400 mb-6 text-sm font-code pl-6 border-l border-gray-700">
                    <span className="text-code-comment">// Custom software development company</span><br />
                    <span className="text-code-keyword">const</span> <span className="text-code-variable">company</span> = <span className="text-code-string">'Haclab Company Limited'</span>;<br />
                    <span className="text-code-keyword">const</span> <span className="text-code-variable">location</span> = <span className="text-code-string">'Kampala, Uganda'</span>;
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {socialLinks.map((link, index) => (
                      <motion.a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center px-2 py-1 rounded bg-dark-surface text-gray-400 hover:text-haclab-red hover:bg-dark-surface/80 transition-colors text-xs"
                        whileHover={{ scale: 1.05 }}
                      >
                        <span className="mr-1">{link.icon}</span>
                        {link.name}
                      </motion.a>
                    ))}
                  </div>
                </motion.div>

                {/* Services */}
                <motion.div variants={itemVariants} className="border-l-2 border-green-500 pl-4">
                  <div className="flex items-center mb-4">
                    <FiFolderPlus className="text-green-500 mr-2" />
                    <span className="font-code font-semibold text-white">SERVICES</span>
                  </div>
                  <ul className="space-y-2">
                    {serviceLinks.map((link, index) => (
                      <motion.li key={index} whileHover={{ x: 5 }} className="hover:bg-dark-surface rounded transition-colors">
                        <Link href={link.path} className="flex items-center p-2 text-gray-400 hover:text-green-400 transition-colors">
                          {link.icon}
                          <FiChevronRight className="mx-2 text-gray-600" />
                          <span className="font-code">{link.name}</span>
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                {/* Quick Links */}
                <motion.div variants={itemVariants} className="border-l-2 border-blue-500 pl-4">
                  <div className="flex items-center mb-4">
                    <FiFile className="text-blue-500 mr-2" />
                    <span className="font-code font-semibold text-white">NAVIGATION</span>
                  </div>
                  <ul className="space-y-2">
                    {quickLinks.map((link, index) => (
                      <motion.li key={index} whileHover={{ x: 5 }} className="hover:bg-dark-surface rounded transition-colors">
                        <Link href={link.path} className="flex items-center p-2 text-gray-400 hover:text-blue-400 transition-colors">
                          {link.icon}
                          <FiChevronRight className="mx-2 text-gray-600" />
                          <span className="font-code">{link.name}</span>
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                {/* Contact Info */}
                <motion.div variants={itemVariants} className="border-l-2 border-purple-500 pl-4">
                  <div className="flex items-center mb-4">
                    <FiTerminal className="text-purple-500 mr-2" />
                    <span className="font-code font-semibold text-white">CONTACT</span>
                  </div>
                  <div className="bg-dark-surface p-3 rounded-md border border-dark-border">
                    <div className="flex items-center bg-dark-bg px-2 py-1 rounded-t-md border-b border-dark-border mb-2">
                      <div className="h-2 w-2 rounded-full bg-haclab-red mr-1"></div>
                      <div className="h-2 w-2 rounded-full bg-yellow-500 mr-1"></div>
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-1"></div>
                      <span className="text-xs text-gray-400 ml-2 font-code">contact.sh</span>
                    </div>
                    <div className="font-code text-sm">
                      <div className="mb-2">
                        <span className="text-haclab-red mr-2">haclab@dev:~$</span>
                        <TerminalText command={contactCommands[0]} />
                      </div>
                      <div className="mb-2 pl-6 text-gray-400">
                        <FiMapPin className="text-haclab-red inline mr-2" />
                        Kireka Kamuli Road, Kampala, Uganda
                      </div>
                      <div className="mb-2">
                        <span className="text-haclab-red mr-2">haclab@dev:~$</span>
                        <TerminalText command={contactCommands[1]} />
                      </div>
                      <div className="mb-2 pl-6 text-gray-400">
                        <FiMail className="text-haclab-red inline mr-2" />
                        <a href="mailto:info@haclab.net" className="hover:text-haclab-red transition-colors">
                          info@haclab.net
                        </a>
                      </div>
                      <div className="mb-2">
                        <span className="text-haclab-red mr-2">haclab@dev:~$</span>
                        <TerminalText command={contactCommands[2]} />
                      </div>
                      <div className="pl-6 text-gray-400">
                        <FiPhone className="text-haclab-red inline mr-2" />
                        <a href="tel:+256781343882" className="hover:text-haclab-red transition-colors">
                          (+256) 781 343 882
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}

            {/* Terminal Tab */}
            {activeTab === 'terminal' && (
              <motion.div
                variants={itemVariants}
                className="font-code text-sm bg-dark-surface p-4 rounded-md border border-dark-border"
              >
                <div className="mb-2">
                  <span className="text-haclab-red mr-2">haclab@dev:~$</span>
                  <TerminalText command="whoami" />
                </div>
                <div className="mb-2 text-gray-400">
                  Haclab Company Limited - Custom Software Development
                </div>
                <div className="mb-2">
                  <span className="text-haclab-red mr-2">haclab@dev:~$</span>
                  <TerminalText command="ls -la ./services" />
                </div>
                <div className="mb-2 text-gray-400">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {serviceLinks.map((service, index) => (
                      <div key={index} className="flex items-center">
                        <span className="text-blue-400 mr-2">drwxr-xr-x</span>
                        <span className="text-green-400 mr-2">haclab</span>
                        <span className="text-yellow-300">{service.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mb-2">
                  <span className="text-haclab-red mr-2">haclab@dev:~$</span>
                  <TerminalText command="cat ./contact.txt" />
                </div>
                <div className="mb-2 text-gray-400">
                  <div>Email: info@haclab.net</div>
                  <div>Phone: (+256) 781 343 882</div>
                  <div>Address: Kireka Kamuli Road, Kampala, Uganda</div>
                </div>
                <div className="mb-2">
                  <span className="text-haclab-red mr-2">haclab@dev:~$</span>
                  <TerminalText command="echo 'Get in touch with us today!'" />
                </div>
                <div className="text-green-400">
                  Get in touch with us today!
                </div>
              </motion.div>
            )}

            {/* Output Tab */}
            {activeTab === 'output' && (
              <motion.div
                variants={itemVariants}
                className="font-code text-sm bg-dark-surface p-4 rounded-md border border-dark-border"
              >
                <div className="mb-4">
                  <div className="text-blue-400 font-semibold mb-2">[INFO] Company Information</div>
                  <div className="pl-4 text-gray-400">
                    <div className="mb-2">
                    <Logo variant="code" size="sm" color="light" />
                  </div>
                    <div>Type: Custom Software Development</div>
                    <div>Location: Kampala, Uganda</div>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="text-green-400 font-semibold mb-2">[SUCCESS] Services Loaded</div>
                  <div className="pl-4 text-gray-400">
                    <div>- Software Development</div>
                    <div>- Web Development</div>
                    <div>- Mobile App Development</div>
                    <div>- E-Commerce Solutions</div>
                    <div>- Database Design</div>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="text-yellow-400 font-semibold mb-2">[WARNING] Contact Required</div>
                  <div className="pl-4 text-gray-400">
                    <div>For more information, please contact us:</div>
                    <div>Email: info@haclab.net</div>
                    <div>Phone: (+256) 781 343 882</div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* IDE Status Bar */}
          <div className="bg-dark-surface border-t border-dark-border py-2 px-4 flex items-center justify-between text-xs font-code">
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-gray-400">
                <FiHeart className="text-haclab-red mr-1" />
                <span>Made with passion</span>
              </div>
              <div className="flex items-center text-gray-400">
                <FiCode className="mr-1" />
                <span>Haclab</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-gray-400">
                <FiClock className="mr-1" />
                <span>{new Date().getFullYear()}</span>
              </div>
              <div className="text-gray-400">
                © Haclab Co LTD. All Rights Reserved.
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
