'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';
import ParallaxSection from '../ui/ParallaxSection';
import AnimatedTerminal from '../ui/AnimatedTerminal';

const TeamSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const teamMembers = [
    {
      name: 'John Doe',
      role: 'CEO & Founder',
      bio: 'Full-stack developer with 10+ years of experience in building enterprise software solutions.',
      skills: ['JavaScript', 'React', 'Node.js', 'AWS'],
      image: '/images/placeholder-team.jpg',
      social: {
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com'
      }
    },
    {
      name: 'Jane Smith',
      role: 'CTO',
      bio: 'Software architect specializing in scalable systems and cloud infrastructure.',
      skills: ['Python', 'DevOps', 'Cloud Architecture', 'System Design'],
      image: '/images/placeholder-team.jpg',
      social: {
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com'
      }
    },
    {
      name: 'Michael Johnson',
      role: 'Lead Developer',
      bio: 'Frontend specialist with a passion for creating beautiful and intuitive user interfaces.',
      skills: ['React', 'Vue.js', 'UI/UX', 'TypeScript'],
      image: '/images/placeholder-team.jpg',
      social: {
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com'
      }
    },
    {
      name: 'Sarah Williams',
      role: 'Backend Developer',
      bio: 'Database expert with experience in designing efficient and scalable data structures.',
      skills: ['Node.js', 'MongoDB', 'PostgreSQL', 'GraphQL'],
      image: '/images/placeholder-team.jpg',
      social: {
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com'
      }
    }
  ];

  const terminalCommands = [
    "// Our team is our greatest asset",
    "const team = [",
    "  'Passionate developers',",
    "  'Creative designers',",
    "  'Innovative thinkers',",
    "  'Problem solvers'",
    "];",
    "",
    "function createAmazingSoftware() {",
    "  return team",
    "    .collaborate()",
    "    .innovate()",
    "    .deliver();",
    "}",
    "",
    "// Join our team!",
    "careers.apply('https://haclab.net/careers');"
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

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
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
      id="team"
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
            Meet Our <span className="text-haclab-red glow-text">Team</span>
          </motion.h2>
          <motion.p
            className="text-gray-300 max-w-2xl mx-auto"
            variants={titleVariants}
          >
            The talented individuals behind Haclab's innovative software solutions.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="bg-dark-surface rounded-lg overflow-hidden shadow-lg"
              variants={cardVariants}
              custom={index}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              {/* Team member image */}
              <div className="h-48 bg-dark-bg relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-gray-500 font-code">
                  {/* Replace with actual image when available */}
                  <span>Team Member Photo</span>
                </div>
                
                {/* Code pattern overlay */}
                <div className="absolute inset-0 bg-code-pattern bg-cover opacity-10"></div>
                
                {/* Role badge */}
                <div className="absolute bottom-3 left-3 bg-haclab-red/90 text-white text-xs py-1 px-2 rounded font-code">
                  {member.role}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-display font-semibold mb-2">{member.name}</h3>
                <p className="text-gray-300 text-sm mb-4">{member.bio}</p>
                
                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {member.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="text-xs bg-dark-bg px-2 py-1 rounded font-code text-gray-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                
                {/* Social links */}
                <div className="flex space-x-3 mt-auto">
                  <a
                    href={member.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-haclab-red transition-colors"
                  >
                    <FiGithub size={18} />
                  </a>
                  <a
                    href={member.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-haclab-red transition-colors"
                  >
                    <FiLinkedin size={18} />
                  </a>
                  <a
                    href={member.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-haclab-red transition-colors"
                  >
                    <FiTwitter size={18} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="max-w-2xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <AnimatedTerminal
            commands={terminalCommands}
            typingSpeed={40}
            className="shadow-glow"
          />
        </motion.div>
      </div>
    </ParallaxSection>
  );
};

export default TeamSection;
