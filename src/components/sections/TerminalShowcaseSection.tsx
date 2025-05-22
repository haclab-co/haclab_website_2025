'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import EnhancedTerminal from '@/components/ui/EnhancedTerminal';
import AnimatedTerminal from '@/components/ui/AnimatedTerminal';
import { FiTerminal, FiCode, FiServer, FiDatabase } from 'react-icons/fi';

const TerminalShowcaseSection: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const [terminalType, setTerminalType] = useState<string>('bash');

  // Create a fixed timestamp for all terminal history items to avoid hydration errors
  const fixedTimestamp = new Date(2023, 0, 1, 12, 0, 0); // Fixed date: Jan 1, 2023, 12:00:00

  // Sample terminal history for different terminal types
  const terminalData = {
    bash: {
      title: "Bash Terminal",
      initialCommands: [
        "ls -la",
        "cd projects/haclab-website",
        "git status",
        "npm install",
        "npm run dev"
      ],
      history: [
        { type: 'command', content: 'ls -la', timestamp: fixedTimestamp },
        { type: 'output', content: 'total 32\ndrwxr-xr-x  5 user  staff   160 Jul 10 14:22 .\ndrwxr-xr-x  3 user  staff    96 Jul 10 14:22 ..\n-rw-r--r--  1 user  staff   222 Jul 10 14:22 .gitignore\n-rw-r--r--  1 user  staff  1062 Jul 10 14:22 package.json\ndrwxr-xr-x 12 user  staff   384 Jul 10 14:22 src', timestamp: fixedTimestamp },
      ],
      prompt: "haclab@dev:~$"
    },
    database: {
      title: "Database CLI",
      initialCommands: [
        "SHOW DATABASES;",
        "USE haclab_db;",
        "SHOW TABLES;",
        "SELECT * FROM projects LIMIT 5;",
        "CREATE TABLE new_clients (id INT, name VARCHAR(255), email VARCHAR(255));"
      ],
      history: [],
      prompt: "mysql>"
    },
    docker: {
      title: "Docker CLI",
      initialCommands: [
        "docker ps",
        "docker images",
        "docker-compose up -d",
        "docker logs haclab-web",
        "docker exec -it haclab-db bash"
      ],
      history: [],
      prompt: "haclab@server:~$"
    },
    npm: {
      title: "NPM Scripts",
      initialCommands: [
        "npm init -y",
        "npm install react next tailwindcss",
        "npm run build",
        "npm run start",
        "npm run test"
      ],
      history: [],
      prompt: "haclab@dev:~/project$"
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <section className="py-20 bg-dark-bg" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Terminal <span className="text-haclab-red">Experience</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our development environment features powerful terminal tools for efficient workflow and project management.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.button
            className={`p-4 rounded-lg flex items-center justify-center ${
              terminalType === 'bash' ? 'bg-haclab-red text-white' : 'bg-dark-surface text-gray-300 hover:bg-gray-800'
            } transition-colors`}
            onClick={() => setTerminalType('bash')}
            variants={itemVariants}
          >
            <FiTerminal className="mr-2" /> Bash
          </motion.button>
          <motion.button
            className={`p-4 rounded-lg flex items-center justify-center ${
              terminalType === 'database' ? 'bg-haclab-red text-white' : 'bg-dark-surface text-gray-300 hover:bg-gray-800'
            } transition-colors`}
            onClick={() => setTerminalType('database')}
            variants={itemVariants}
          >
            <FiDatabase className="mr-2" /> Database
          </motion.button>
          <motion.button
            className={`p-4 rounded-lg flex items-center justify-center ${
              terminalType === 'docker' ? 'bg-haclab-red text-white' : 'bg-dark-surface text-gray-300 hover:bg-gray-800'
            } transition-colors`}
            onClick={() => setTerminalType('docker')}
            variants={itemVariants}
          >
            <FiServer className="mr-2" /> Docker
          </motion.button>
          <motion.button
            className={`p-4 rounded-lg flex items-center justify-center ${
              terminalType === 'npm' ? 'bg-haclab-red text-white' : 'bg-dark-surface text-gray-300 hover:bg-gray-800'
            } transition-colors`}
            onClick={() => setTerminalType('npm')}
            variants={itemVariants}
          >
            <FiCode className="mr-2" /> NPM
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="shadow-glow"
          >
            <h3 className="text-xl font-display font-semibold mb-4 text-center">Enhanced Terminal</h3>
            <EnhancedTerminal
              initialCommands={terminalData[terminalType as keyof typeof terminalData].initialCommands}
              history={terminalData[terminalType as keyof typeof terminalData].history}
              prompt={terminalData[terminalType as keyof typeof terminalData].prompt}
              title={terminalData[terminalType as keyof typeof terminalData].title}
              showTimestamps={true}
              showLineNumbers={true}
              theme="transparent"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="shadow-glow"
          >
            <h3 className="text-xl font-display font-semibold mb-4 text-center">Standard Terminal</h3>
            <AnimatedTerminal
              commands={terminalData[terminalType as keyof typeof terminalData].initialCommands}
              prompt={terminalData[terminalType as keyof typeof terminalData].prompt}
              typingSpeed={70}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TerminalShowcaseSection;
