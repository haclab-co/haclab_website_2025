'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import ParallaxSection from '../ui/ParallaxSection';
import GlowingCard from '../ui/GlowingCard';
import AwardsSchema from '../seo/AwardsSchema';

const AwardsSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const awards = [
    {
      image: '/assets/images/awards/appfutura1.png',
      title: 'Top Web Developer in Uganda',
      organization: 'AppFutura',
      link: 'https://www.appfutura.com/web-developers/uganda'
    },
    {
      image: '/assets/images/awards/appfutura2.png',
      title: 'Top App Developer in Uganda',
      organization: 'AppFutura',
      link: 'https://www.appfutura.com/app-developers/uganda'
    },
    {
      image: '/assets/images/awards/appfutura3.png',
      title: 'Top Software Development Company in Uganda',
      organization: 'AppFutura',
      link: 'https://www.appfutura.com/software-development-companies/uganda'
    },
    {
      image: '/assets/images/awards/appfutura4.png',
      title: 'Certified Development Company',
      organization: 'AppFutura',
      link: 'https://www.appfutura.com/companies/haclab-company-limited'
    },
    {
      image: '/assets/images/awards/goodfirm1.png',
      title: 'Top Software Development Company',
      organization: 'GoodFirms',
      link: 'https://www.goodfirms.co/company/haclab-company-limited'
    },
    {
      image: '/assets/images/awards/goodfirm2.png',
      title: 'Top Web Development Company',
      organization: 'GoodFirms',
      link: 'https://www.goodfirms.co/company/haclab-company-limited'
    },
    {
      image: '/assets/images/awards/goodfirm3.png',
      title: 'Top Mobile App Development Company',
      organization: 'GoodFirms',
      link: 'https://www.goodfirms.co/company/haclab-company-limited'
    },
    {
      image: '/assets/images/awards/goodfirm4.png',
      title: 'Top IT Services Company',
      organization: 'GoodFirms',
      link: 'https://www.goodfirms.co/company/haclab-company-limited'
    },
    {
      image: '/assets/images/awards/designrush1.png',
      title: 'Top Nearshore Software Development Company',
      organization: 'DesignRush',
      link: 'https://www.designrush.com/agency/software-development/nearshore'
    },
    {
      image: '/assets/images/awards/designrush2.png',
      title: 'Top Software Development Company',
      organization: 'DesignRush',
      link: 'https://www.designrush.com/agency/profile/haclab-company-limited'
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

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const awardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: i * 0.1
      }
    })
  };

  return (
    <ParallaxSection
      className="py-20 text-white"
      bgColor="#0A0A0A"
      direction="up"
      speed={0.3}
    >
      <AwardsSchema />
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
            Our <span className="text-haclab-red glow-text">Awards</span> & Recognitions
          </motion.h2>
          <motion.p
            className="text-gray-300 max-w-2xl mx-auto"
            variants={titleVariants}
          >
            We are proud to showcase our awards and accolades in the IT industry for software, Web and Mobile App Development.
            Our accomplishments are proof of our excellent services and innovative solutions.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {awards.map((award, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={awardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              <Link href={award.link} target="_blank" rel="noopener noreferrer" className="block h-full">
                <GlowingCard
                  className="h-full flex flex-col items-center justify-center p-4 text-center"
                  glowIntensity="low"
                  hoverEffect={true}
                >
                  <div className="relative w-full h-32 mb-4">
                    <Image
                      src={award.image}
                      alt={`${award.title} - ${award.organization}`}
                      fill
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                  <h3 className="text-sm font-semibold mb-1">{award.title}</h3>
                  <p className="text-xs text-gray-400">{award.organization}</p>
                </GlowingCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </ParallaxSection>
  );
};

export default AwardsSection;
