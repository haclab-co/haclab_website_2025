'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import AnimatedCodeBlock from '@/components/ui/AnimatedCodeBlock';
import { FiCode, FiTerminal, FiGithub, FiDatabase } from 'react-icons/fi';

const codeExamples = {
  javascript: `// Haclab Software Development
const createAwesomeProduct = async () => {
  const client = await Client.findById(id);
  
  // Initialize the project with client requirements
  const project = new Project({
    name: client.projectName,
    type: 'web-application',
    technologies: ['React', 'Node.js', 'MongoDB'],
    timeline: '3 months'
  });
  
  // Development process
  await project.planArchitecture();
  await project.developFrontend();
  await project.developBackend();
  await project.testApplication();
  
  // Deploy the application
  const deployment = await project.deploy({
    environment: 'production',
    region: 'East Africa'
  });
  
  return {
    project,
    deployment,
    success: true,
    message: 'Your awesome product is now live!'
  };
};`,
  python: `# Haclab Data Analysis
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

def analyze_business_data(data_path, client_name):
    """
    Analyze business data and generate insights
    """
    # Load the data
    df = pd.read_csv(data_path)
    
    # Clean and preprocess
    df = df.dropna()
    df['date'] = pd.to_datetime(df['date'])
    
    # Calculate key metrics
    revenue = df['sales'].sum()
    growth_rate = (df['sales'].iloc[-1] / df['sales'].iloc[0] - 1) * 100
    
    # Generate visualizations
    plt.figure(figsize=(10, 6))
    plt.plot(df['date'], df['sales'])
    plt.title(f"{client_name}'s Sales Performance")
    plt.savefig(f"{client_name}_sales.png")
    
    return {
        "client": client_name,
        "total_revenue": revenue,
        "growth_rate": f"{growth_rate:.2f}%",
        "visualization": f"{client_name}_sales.png"
    }`,
  typescript: `// Haclab Mobile App Development
import { Platform, Alert } from 'react-native';
import { useEffect, useState } from 'react';

interface AppConfig {
  apiKey: string;
  environment: 'development' | 'production';
  features: string[];
}

export const useAppInitialization = (config: AppConfig) => {
  const [isReady, setIsReady] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Check platform compatibility
        const platform = Platform.OS;
        console.log(\`Initializing on \${platform}...\`);
        
        // Connect to backend services
        await connectToBackend(config.apiKey, config.environment);
        
        // Load user preferences
        const userPrefs = await loadUserPreferences();
        
        // Enable features based on config
        for (const feature of config.features) {
          await enableFeature(feature);
        }
        
        setIsReady(true);
      } catch (err) {
        setError(err.message);
        Alert.alert('Initialization Error', err.message);
      }
    };
    
    initializeApp();
  }, [config]);
  
  return { isReady, error };
};`,
  java: `// Haclab Enterprise Solutions
package com.haclab.enterprise;

import java.util.List;
import java.util.ArrayList;
import java.util.Date;

public class EnterpriseSystem {
    private final String companyName;
    private final List<Department> departments;
    private final Database database;
    
    public EnterpriseSystem(String companyName) {
        this.companyName = companyName;
        this.departments = new ArrayList<>();
        this.database = new Database("jdbc:mysql://localhost:3306/enterprise");
    }
    
    public void addDepartment(String name, Employee manager) {
        Department dept = new Department(name, manager);
        departments.add(dept);
        System.out.println("Added department: " + name);
    }
    
    public Report generateReport(ReportType type, Date startDate, Date endDate) {
        System.out.println("Generating " + type + " report...");
        
        // Query the database
        List<Record> records = database.query(
            "SELECT * FROM transactions WHERE date BETWEEN ? AND ?",
            startDate, endDate
        );
        
        // Process the data
        Report report = new Report(type, startDate, endDate);
        report.processRecords(records);
        
        return report;
    }
}`
};

const CodeShowcaseSection: React.FC = () => {
  const [language, setLanguage] = useState<string>('javascript');
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

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
            Code with <span className="text-haclab-red">Precision</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our development team writes clean, efficient, and maintainable code across multiple languages and platforms.
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
              language === 'javascript' ? 'bg-haclab-red text-white' : 'bg-dark-surface text-gray-300 hover:bg-gray-800'
            } transition-colors`}
            onClick={() => setLanguage('javascript')}
            variants={itemVariants}
          >
            <FiCode className="mr-2" /> JavaScript
          </motion.button>
          <motion.button
            className={`p-4 rounded-lg flex items-center justify-center ${
              language === 'python' ? 'bg-haclab-red text-white' : 'bg-dark-surface text-gray-300 hover:bg-gray-800'
            } transition-colors`}
            onClick={() => setLanguage('python')}
            variants={itemVariants}
          >
            <FiTerminal className="mr-2" /> Python
          </motion.button>
          <motion.button
            className={`p-4 rounded-lg flex items-center justify-center ${
              language === 'typescript' ? 'bg-haclab-red text-white' : 'bg-dark-surface text-gray-300 hover:bg-gray-800'
            } transition-colors`}
            onClick={() => setLanguage('typescript')}
            variants={itemVariants}
          >
            <FiGithub className="mr-2" /> TypeScript
          </motion.button>
          <motion.button
            className={`p-4 rounded-lg flex items-center justify-center ${
              language === 'java' ? 'bg-haclab-red text-white' : 'bg-dark-surface text-gray-300 hover:bg-gray-800'
            } transition-colors`}
            onClick={() => setLanguage('java')}
            variants={itemVariants}
          >
            <FiDatabase className="mr-2" /> Java
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="shadow-glow"
        >
          <AnimatedCodeBlock
            code={codeExamples[language as keyof typeof codeExamples]}
            language={language}
            animate={false}
            showLineNumbers={true}
            highlightLines={language === 'javascript' ? [3, 15, 16, 17, 18] : 
                           language === 'python' ? [10, 11, 12, 13, 14] : 
                           language === 'typescript' ? [12, 13, 14, 15, 16] : 
                           [15, 16, 17, 18, 19]}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default CodeShowcaseSection;
