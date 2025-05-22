'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiSend, FiCheck, FiAlertCircle } from 'react-icons/fi';
import GlowingButton from '../ui/GlowingButton';
import AnimatedCodeBlock from '../ui/AnimatedCodeBlock';

const ContactFormSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // Simulate form submission
    setTimeout(() => {
      // In a real application, you would send the form data to your backend
      console.log('Form submitted:', formState);
      setFormStatus('success');
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormStatus('idle');
        setFormState({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      }, 3000);
    }, 1500);
  };
  
  const formCode = `// Contact Form Handler
async function handleContactForm(formData) {
  try {
    // Validate form data
    const errors = validateFormData(formData);
    if (errors.length > 0) {
      return { success: false, errors };
    }
    
    // Send email notification
    await sendEmailNotification({
      to: 'info@haclab.net',
      subject: \`New Contact Form: \${formData.subject}\`,
      body: generateEmailBody(formData)
    });
    
    // Store in database
    await storeContactRequest(formData);
    
    // Return success response
    return { 
      success: true, 
      message: 'Thank you for contacting us! We will get back to you soon.' 
    };
  } catch (error) {
    console.error('Error processing contact form:', error);
    return { 
      success: false, 
      message: 'Something went wrong. Please try again later.' 
    };
  }
}`;

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
  
  const formVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7 }
    }
  };
  
  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5
      }
    })
  };

  return (
    <section className="relative py-20 bg-dark-bg text-white overflow-hidden" id="contact-form" ref={ref}>
      {/* Background elements */}
      <div className="absolute inset-0 grid-bg opacity-10"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
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
            Send Us a <span className="text-haclab-red glow-text">Message</span>
          </motion.h2>
          <motion.p
            className="text-gray-300 max-w-2xl mx-auto"
            variants={titleVariants}
          >
            Fill out the form below and we'll get back to you as soon as possible.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div
            variants={formVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <form onSubmit={handleSubmit} className="bg-dark-surface p-8 rounded-lg shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <motion.div custom={0} variants={inputVariants}>
                  <label htmlFor="name" className="block text-sm font-code text-gray-400 mb-2">
                    Name <span className="text-haclab-red">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-dark-bg border border-dark-border rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-haclab-red focus:border-transparent transition-all"
                    placeholder="Your name"
                    disabled={formStatus === 'submitting' || formStatus === 'success'}
                  />
                </motion.div>
                
                <motion.div custom={1} variants={inputVariants}>
                  <label htmlFor="email" className="block text-sm font-code text-gray-400 mb-2">
                    Email <span className="text-haclab-red">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-dark-bg border border-dark-border rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-haclab-red focus:border-transparent transition-all"
                    placeholder="your.email@example.com"
                    disabled={formStatus === 'submitting' || formStatus === 'success'}
                  />
                </motion.div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <motion.div custom={2} variants={inputVariants}>
                  <label htmlFor="phone" className="block text-sm font-code text-gray-400 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formState.phone}
                    onChange={handleChange}
                    className="w-full bg-dark-bg border border-dark-border rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-haclab-red focus:border-transparent transition-all"
                    placeholder="Your phone number"
                    disabled={formStatus === 'submitting' || formStatus === 'success'}
                  />
                </motion.div>
                
                <motion.div custom={3} variants={inputVariants}>
                  <label htmlFor="subject" className="block text-sm font-code text-gray-400 mb-2">
                    Subject <span className="text-haclab-red">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-dark-bg border border-dark-border rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-haclab-red focus:border-transparent transition-all"
                    disabled={formStatus === 'submitting' || formStatus === 'success'}
                  >
                    <option value="" disabled>Select a subject</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Project Discussion">Project Discussion</option>
                    <option value="Partnership Opportunity">Partnership Opportunity</option>
                    <option value="Job Application">Job Application</option>
                    <option value="Other">Other</option>
                  </select>
                </motion.div>
              </div>
              
              <motion.div custom={4} variants={inputVariants} className="mb-6">
                <label htmlFor="message" className="block text-sm font-code text-gray-400 mb-2">
                  Message <span className="text-haclab-red">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full bg-dark-bg border border-dark-border rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-haclab-red focus:border-transparent transition-all"
                  placeholder="Tell us about your project or inquiry..."
                  disabled={formStatus === 'submitting' || formStatus === 'success'}
                ></textarea>
              </motion.div>
              
              <motion.div custom={5} variants={inputVariants}>
                {formStatus === 'idle' && (
                  <GlowingButton
                    type="submit"
                    icon={<FiSend />}
                    iconPosition="right"
                    size="lg"
                    className="w-full"
                  >
                    Send Message
                  </GlowingButton>
                )}
                
                {formStatus === 'submitting' && (
                  <GlowingButton
                    disabled
                    size="lg"
                    className="w-full"
                  >
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  </GlowingButton>
                )}
                
                {formStatus === 'success' && (
                  <GlowingButton
                    variant="secondary"
                    size="lg"
                    className="w-full"
                    icon={<FiCheck />}
                    iconPosition="left"
                  >
                    Message Sent Successfully!
                  </GlowingButton>
                )}
                
                {formStatus === 'error' && (
                  <GlowingButton
                    variant="outline"
                    size="lg"
                    className="w-full"
                    icon={<FiAlertCircle />}
                    iconPosition="left"
                    onClick={() => setFormStatus('idle')}
                  >
                    Error Sending Message. Try Again.
                  </GlowingButton>
                )}
              </motion.div>
            </form>
          </motion.div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <AnimatedCodeBlock
              code={formCode}
              language="javascript"
              title="contact-handler.js"
              className="shadow-glow"
            />
            
            <motion.div 
              className="mt-8 bg-dark-surface p-6 rounded-lg"
              variants={titleVariants}
            >
              <h3 className="text-xl font-display font-semibold mb-4">Why Choose Haclab?</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-haclab-red mr-2">•</span>
                  <span>Expert team of developers with years of experience</span>
                </li>
                <li className="flex items-start">
                  <span className="text-haclab-red mr-2">•</span>
                  <span>Customized solutions tailored to your specific needs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-haclab-red mr-2">•</span>
                  <span>Transparent communication throughout the project</span>
                </li>
                <li className="flex items-start">
                  <span className="text-haclab-red mr-2">•</span>
                  <span>Ongoing support and maintenance after deployment</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;
