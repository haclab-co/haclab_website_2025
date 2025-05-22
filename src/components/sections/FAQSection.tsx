'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiHelpCircle } from 'react-icons/fi';
import FAQSchema from '@/components/seo/FAQSchema';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title?: string;
  description?: string;
  faqs: FAQItem[];
  className?: string;
}

/**
 * FAQ Section component with structured data for SEO
 * This component displays FAQs and adds schema markup for rich results
 */
export default function FAQSection({
  title = "Frequently Asked Questions",
  description = "Find answers to common questions about our services and solutions.",
  faqs,
  className = '',
}: FAQSectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className={`py-20 bg-dark-surface ${className}`}>
      <div className="container mx-auto px-4 md:px-6">
        {/* Add FAQ Schema for SEO */}
        <FAQSchema faqs={faqs} />
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center bg-dark-bg/50 text-haclab-red text-sm py-1 px-3 rounded-full font-code mb-4">
            <FiHelpCircle className="mr-2" />
            <span>FAQ</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            {title}
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="mb-4 border border-dark-border rounded-lg overflow-hidden bg-dark-bg"
            >
              <button
                className="w-full flex items-center justify-between p-4 text-left focus:outline-none"
                onClick={() => toggleFAQ(index)}
                aria-expanded={activeIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="font-semibold text-white">{faq.question}</span>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FiChevronDown className="text-haclab-red" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    id={`faq-answer-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 pt-0 text-gray-300 border-t border-dark-border">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
