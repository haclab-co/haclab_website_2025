'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  FiArrowRight, FiTerminal, FiCode, FiMaximize2, FiMinimize2,
  FiCopy, FiCheck, FiPlay, FiPause, FiRefreshCw, FiSend
} from 'react-icons/fi';
import GlowingButton from '../ui/GlowingButton';
import TerminalText from '../ui/TerminalText';

const CTASection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isClient, setIsClient] = useState(false);
  const [activeTab, setActiveTab] = useState<'terminal' | 'code'>('terminal');
  const [isRunning, setIsRunning] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [copied, setCopied] = useState(false);

  // Ensure we're running on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Terminal commands for the animation
  const terminalCommands = [
    "npm init haclab-project",
    "cd ./your-project",
    "npm install @haclab/solutions",
    "node ./start-consultation.js"
  ];

  // Terminal outputs
  const terminalOutputs = [
    "Creating a new Haclab project...",
    "Project initialized successfully!",
    "Installing Haclab solutions package...",
    "Starting consultation process...",
    "Ready to discuss your business needs and find the perfect solution!",
    "Connect with our team to get started."
  ];

  // Sample code for the code tab
  const sampleCode = `// Start your journey with Haclab
import { Consultation } from '@haclab/solutions';

async function startConsultation() {
  // Initialize a new consultation
  const consultation = new Consultation({
    business: 'Your Business',
    needs: ['Web Development', 'Mobile App', 'E-commerce'],
    budget: 'Flexible',
    timeline: 'As soon as possible'
  });

  // Connect with our team
  const response = await consultation.connect();

  // Get personalized solutions
  const solutions = await consultation.getSolutions();

  // Start your project
  return consultation.startProject(solutions);
}

// Run this function to begin
startConsultation()
  .then(project => console.log('Project started:', project))
  .catch(error => console.error('Error:', error));`;

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
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  // Handle copy code
  const handleCopy = () => {
    if (isClient) {
      navigator.clipboard.writeText(sampleCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Handle terminal animation
  useEffect(() => {
    if (!isRunning || !isInView) return;

    const timer = setTimeout(() => {
      if (currentStep < terminalCommands.length + terminalOutputs.length) {
        setCurrentStep(prev => prev + 1);
      } else {
        // Reset animation after completion
        setTimeout(() => {
          setCurrentStep(0);
        }, 5000);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [currentStep, isRunning, isInView]);

  return (
    <section className="relative py-20 bg-dark-bg text-white overflow-hidden" ref={ref}>
      {/* Background elements */}
      <div className="absolute inset-0 bg-circuit-pattern bg-cover opacity-5"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          className="max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div
            className="bg-dark-surface rounded-lg overflow-hidden border border-dark-border shadow-glow"
            variants={itemVariants}
          >
            {/* IDE Header */}
            <div className="flex items-center justify-between bg-dark-surface px-4 py-2 border-b border-dark-border">
              <div className="flex items-center">
                <div className="flex space-x-1.5">
                  <div className="h-3 w-3 rounded-full bg-haclab-red"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                <span className="ml-2 font-code text-sm text-gray-300">haclab-consultation.js</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  className="text-gray-400 hover:text-white transition-colors p-1"
                  onClick={() => setIsRunning(!isRunning)}
                >
                  {isRunning ? <FiPause className="h-4 w-4" /> : <FiPlay className="h-4 w-4" />}
                </button>
                <button
                  className="text-gray-400 hover:text-white transition-colors p-1"
                  onClick={() => setCurrentStep(0)}
                >
                  <FiRefreshCw className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* IDE Tabs */}
            <div className="flex border-b border-dark-border">
              <button
                className={`px-4 py-2 font-code text-sm flex items-center ${activeTab === 'terminal' ? 'bg-dark-bg text-white border-r border-l border-dark-border' : 'text-gray-400 hover:text-white'}`}
                onClick={() => setActiveTab('terminal')}
              >
                <FiTerminal className="mr-2" /> Terminal
              </button>
              <button
                className={`px-4 py-2 font-code text-sm flex items-center ${activeTab === 'code' ? 'bg-dark-bg text-white border-r border-l border-dark-border' : 'text-gray-400 hover:text-white'}`}
                onClick={() => setActiveTab('code')}
              >
                <FiCode className="mr-2" /> Code
              </button>
            </div>

            {/* IDE Content */}
            <div className="bg-dark-bg p-6">
              {/* Terminal Tab */}
              {activeTab === 'terminal' && (
                <div className="font-code text-sm bg-dark-surface p-4 rounded-md border border-dark-border min-h-[300px]">
                  {terminalCommands.map((command, index) => {
                    if (currentStep <= index) return null;
                    return (
                      <div key={`cmd-${index}`} className="mb-2">
                        <span className="text-haclab-red mr-2">haclab@dev:~$</span>
                        <TerminalText command={command} />
                      </div>
                    );
                  })}

                  {terminalOutputs.map((output, index) => {
                    if (currentStep <= terminalCommands.length + index) return null;
                    return (
                      <div key={`out-${index}`} className="mb-2 text-gray-400 pl-4">
                        {output}
                      </div>
                    );
                  })}

                  {/* Blinking cursor */}
                  {currentStep < terminalCommands.length + terminalOutputs.length && (
                    <div className="flex">
                      <span className="text-haclab-red mr-2">haclab@dev:~$</span>
                      <motion.span
                        className="inline-block w-2 h-4 bg-code-text ml-0.5"
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Code Tab */}
              {activeTab === 'code' && (
                <div className="font-code text-sm bg-dark-surface p-4 rounded-md border border-dark-border min-h-[300px] relative">
                  <button
                    onClick={handleCopy}
                    className="absolute top-2 right-2 text-gray-400 hover:text-white transition-colors p-1 bg-dark-bg rounded"
                    aria-label="Copy code"
                  >
                    {copied ? <FiCheck className="h-4 w-4" /> : <FiCopy className="h-4 w-4" />}
                  </button>

                  <pre className="language-javascript">
                    <code className="language-javascript">
                      {sampleCode.split('\n').map((line, index) => (
                        <div key={index} className="flex">
                          <span className="select-none mr-4 text-gray-500 w-8 text-right">{index + 1}</span>
                          <span className="flex-1">
                            {line.includes('import') && (
                              <>
                                <span className="text-code-keyword">import</span> {line.substring(7)}
                              </>
                            )}
                            {line.includes('function') && (
                              <>
                                <span className="text-code-keyword">async function</span> <span className="text-code-function">{line.substring(21, line.indexOf('('))}</span>{line.substring(line.indexOf('('))}
                              </>
                            )}
                            {line.includes('const') && (
                              <>
                                <span className="text-code-keyword">const</span> {line.substring(6)}
                              </>
                            )}
                            {line.includes('return') && (
                              <>
                                <span className="text-code-keyword">return</span> {line.substring(7)}
                              </>
                            )}
                            {line.includes('//') && (
                              <span className="text-code-comment">{line}</span>
                            )}
                            {!line.includes('import') && !line.includes('function') && !line.includes('const') && !line.includes('return') && !line.includes('//') && (
                              <span>{line}</span>
                            )}
                          </span>
                        </div>
                      ))}
                    </code>
                  </pre>
                </div>
              )}
            </div>

            {/* CTA Section */}
            <div className="bg-haclab-red p-6 border-t border-dark-border">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-6 md:mb-0 md:mr-6">
                  <h2 className="text-2xl md:text-3xl font-display font-bold mb-2">
                    Ready to Empower Your Business?
                  </h2>
                  <p className="text-white/90">
                    Let's discuss how our custom software solutions can help your business grow and succeed.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <GlowingButton
                    href="/contact"
                    variant="secondary"
                    size="lg"
                    icon={<FiSend />}
                    iconPosition="right"
                    glowIntensity="high"
                    className="px-8 whitespace-nowrap"
                  >
                    Start Consultation
                  </GlowingButton>
                </div>
              </div>
            </div>

            {/* IDE Status Bar */}
            <div className="bg-dark-surface border-t border-dark-border py-2 px-4 flex items-center justify-between text-xs font-code">
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-gray-400">
                  <FiCode className="mr-1" />
                  <span>Haclab Solutions</span>
                </div>
              </div>
              <div className="text-gray-400">
                No commitment, just a conversation
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
