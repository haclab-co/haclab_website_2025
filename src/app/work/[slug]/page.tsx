'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiArrowLeft, FiExternalLink, FiGitBranch, FiCode, FiCheckCircle } from 'react-icons/fi';
import GlowingButton from '@/components/ui/GlowingButton';
import EnhancedTerminal from '@/components/ui/EnhancedTerminal';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Define projects data (this would typically come from a CMS or API)
const projects = [
  {
    id: 'wion-motors',
    title: 'Wion Motors Limited',
    category: 'web',
    description: 'A professional website for a leading motor company in Uganda.',
    challenge: 'Wion Motors needed a modern website that would showcase their vehicle inventory, services, and company information while providing an intuitive user experience.',
    solution: 'We developed a responsive website with a custom vehicle inventory management system, integrated booking for service appointments, and a content management system for easy updates.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
    features: [
      'Vehicle inventory with advanced filtering',
      'Service booking system',
      'Customer testimonials',
      'Admin dashboard',
      'SEO optimization'
    ],
    image: '/images/work/wion-motors.jpg',
    link: 'https://wionmotors.com',
    codeSnippet: `// Vehicle Filtering Component
import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';

export default function VehicleFilter() {
  const [filters, setFilters] = useState({
    make: '',
    model: '',
    year: '',
    priceRange: [0, 100000],
    bodyType: ''
  });
  
  const { data: vehicles, isLoading } = useQuery(
    ['vehicles', filters],
    () => fetchVehicles(filters)
  );
  
  function handleFilterChange(key, value) {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  }
  
  return (
    <div className="vehicle-filter">
      {/* Filter UI */}
      <div className="filter-controls">
        {/* Make dropdown */}
        {/* Model dropdown */}
        {/* Year slider */}
        {/* Price range slider */}
        {/* Body type checkboxes */}
      </div>
      
      {/* Results */}
      <div className="vehicle-results">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          vehicles.map(vehicle => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))
        )}
      </div>
    </div>
  );
}`
  },
  {
    id: 'kanify',
    title: 'Kanify',
    category: 'software',
    description: 'A comprehensive garage management system for tracking vehicles, jobs, inspections, and more.',
    challenge: 'Auto repair shops needed a centralized system to manage their operations, from customer intake to job tracking, parts inventory, and billing.',
    solution: 'We built a comprehensive garage management system with real-time job tracking, inventory management, customer communication tools, and financial reporting.',
    technologies: ['Vue.js', 'Laravel', 'MySQL', 'Docker'],
    features: [
      'Vehicle service history tracking',
      'Job scheduling and assignment',
      'Parts inventory management',
      'Customer communication portal',
      'Financial reporting and analytics'
    ],
    image: '/images/work/kanify.jpg',
    link: 'https://kanify.app',
    codeSnippet: `// Job Management Module
class JobController extends Controller
{
    public function createJob(Request $request)
    {
        $validated = $request->validate([
            'vehicle_id' => 'required|exists:vehicles,id',
            'customer_id' => 'required|exists:customers,id',
            'description' => 'required|string',
            'estimated_hours' => 'required|numeric',
            'priority' => 'required|in:low,medium,high',
            'scheduled_date' => 'required|date',
            'technician_id' => 'nullable|exists:users,id'
        ]);
        
        // Create the job
        $job = Job::create($validated);
        
        // Create initial job status
        $job->statuses()->create([
            'status' => 'pending',
            'notes' => 'Job created',
            'user_id' => auth()->id()
        ]);
        
        // Notify assigned technician if any
        if ($job->technician_id) {
            $job->technician->notify(new JobAssigned($job));
        }
        
        // Notify customer
        $job->customer->notify(new JobCreated($job));
        
        return response()->json([
            'message' => 'Job created successfully',
            'job' => $job->load('vehicle', 'customer', 'technician')
        ], 201);
    }
}`
  },
  {
    id: 'realesta-pms',
    title: 'Realesta PMS',
    category: 'software',
    description: 'A property management system designed for property managers to solve daily challenges.',
    challenge: 'Property managers needed a centralized system to track properties, tenants, maintenance requests, and financial transactions.',
    solution: 'We developed a comprehensive property management system with tenant portals, maintenance request tracking, automated billing, and financial reporting.',
    technologies: ['React', 'Express', 'PostgreSQL', 'AWS'],
    features: [
      'Property and unit management',
      'Tenant portal for maintenance requests',
      'Automated rent collection',
      'Expense tracking',
      'Financial reporting'
    ],
    image: '/images/work/realesta-pms.jpg',
    link: 'https://realesta.app',
    codeSnippet: `// Maintenance Request Workflow
import { createMachine, assign } from 'xstate';

const maintenanceRequestMachine = createMachine({
  id: 'maintenanceRequest',
  initial: 'submitted',
  context: {
    requestId: null,
    tenantId: null,
    propertyId: null,
    description: '',
    priority: 'medium',
    assignedTo: null,
    estimatedCost: 0,
    actualCost: 0,
    notes: []
  },
  states: {
    submitted: {
      on: {
        REVIEW: 'underReview',
        REJECT: 'rejected'
      }
    },
    underReview: {
      on: {
        APPROVE: 'approved',
        REJECT: 'rejected',
        REQUEST_INFO: 'infoRequested'
      }
    },
    infoRequested: {
      on: {
        PROVIDE_INFO: 'underReview'
      }
    },
    approved: {
      on: {
        ASSIGN: 'assigned'
      }
    },
    assigned: {
      on: {
        START_WORK: 'inProgress'
      }
    },
    inProgress: {
      on: {
        COMPLETE: 'completed',
        NEED_PARTS: 'waitingForParts'
      }
    },
    waitingForParts: {
      on: {
        PARTS_RECEIVED: 'inProgress'
      }
    },
    completed: {
      on: {
        VERIFY: 'verified'
      }
    },
    verified: {
      type: 'final'
    },
    rejected: {
      type: 'final'
    }
  }
});`
  },
  {
    id: 'fashion-ecommerce',
    title: 'Fashion Retail Store',
    category: 'ecommerce',
    description: 'A custom e-commerce platform for a fashion retailer with advanced product filtering, size guides, and personalized recommendations.',
    challenge: 'A fashion retailer needed an online store that would showcase their products effectively while providing a seamless shopping experience.',
    solution: 'We built a custom e-commerce platform with advanced product filtering, size guides, personalized recommendations, and a streamlined checkout process.',
    technologies: ['Next.js', 'Strapi CMS', 'PostgreSQL', 'Stripe'],
    features: [
      'Advanced product filtering',
      'Size guides and recommendations',
      'Personalized product suggestions',
      'Wishlist functionality',
      'Integrated payment processing'
    ],
    image: '/images/work/fashion-ecommerce.jpg',
    link: 'https://fashion-store.com',
    codeSnippet: `// Product Recommendation Engine
import { getSimilarProducts } from '@/lib/recommendations';

export async function getProductRecommendations(req, res) {
  const { productId, userId } = req.query;
  
  try {
    // Get user's purchase history and browsing behavior
    const userProfile = userId 
      ? await getUserProfile(userId)
      : null;
    
    // Get product details
    const product = await getProductById(productId);
    
    // Generate recommendations based on product attributes
    // and user behavior if available
    const recommendations = await getSimilarProducts({
      product,
      userProfile,
      limit: 8,
      excludeIds: [productId]
    });
    
    return res.status(200).json({
      success: true,
      recommendations
    });
  } catch (error) {
    console.error('Failed to get recommendations:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to generate recommendations'
    });
  }
}`
  },
];

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const project = projects.find(p => p.id === slug);
  
  // If project not found, return 404
  if (!project) {
    notFound();
  }
  
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const detailsRef = useRef(null);
  const isDetailsInView = useInView(detailsRef, { once: true, amount: 0.2 });
  const codeRef = useRef(null);
  const isCodeInView = useInView(codeRef, { once: true, amount: 0.2 });
  
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
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center py-16 bg-dark-bg text-white overflow-hidden" ref={heroRef}>
        {/* Background elements */}
        <div className="absolute inset-0 grid-bg opacity-10"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full absolute">
            <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-haclab-red/10 blur-xl"></div>
            <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-haclab-red/5 blur-xl"></div>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <Link href="/work" className="inline-flex items-center text-gray-300 hover:text-white mb-8 transition-colors">
            <FiArrowLeft className="mr-2" /> Back to Projects
          </Link>
          
          <motion.div
            className="max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <motion.div 
              className="inline-flex items-center justify-center p-2 bg-dark-surface rounded-full mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isHeroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <span className="flex items-center px-4 py-1 bg-haclab-red/10 rounded-full text-haclab-red font-code text-sm">
                {project.category.charAt(0).toUpperCase() + project.category.slice(1)} Project
              </span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              {project.title}
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-300 mb-8 max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              {project.description}
            </motion.p>
            
            <motion.div
              className="flex flex-wrap gap-3 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-dark-surface rounded-full text-sm font-code"
                >
                  {tech}
                </span>
              ))}
            </motion.div>
            
            {project.link && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.6, duration: 0.7 }}
              >
                <GlowingButton 
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  icon={<FiExternalLink />}
                  iconPosition="right"
                >
                  Visit Project
                </GlowingButton>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Project Details Section */}
      <section className="py-20 bg-dark-surface text-white" ref={detailsRef}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Project Image Placeholder */}
            <motion.div
              className="h-80 rounded-md bg-dark-bg overflow-hidden relative"
              initial={{ opacity: 0, x: -20 }}
              animate={isDetailsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.7 }}
            >
              <div className="absolute inset-0 flex items-center justify-center text-gray-500 font-code">
                {/* Replace with actual image when available */}
                <span>{project.title} Screenshot</span>
              </div>
            </motion.div>
            
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isDetailsInView ? "visible" : "hidden"}
            >
              <motion.h2 
                className="text-2xl font-display font-bold mb-6"
                variants={itemVariants}
                custom={0}
              >
                Project Overview
              </motion.h2>
              
              <motion.div className="mb-8" variants={itemVariants} custom={1}>
                <h3 className="text-xl font-display font-semibold mb-3">The Challenge</h3>
                <p className="text-gray-300">{project.challenge}</p>
              </motion.div>
              
              <motion.div className="mb-8" variants={itemVariants} custom={2}>
                <h3 className="text-xl font-display font-semibold mb-3">Our Solution</h3>
                <p className="text-gray-300">{project.solution}</p>
              </motion.div>
              
              <motion.div variants={itemVariants} custom={3}>
                <h3 className="text-xl font-display font-semibold mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <FiCheckCircle className="text-haclab-red mt-1 mr-3" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Code Showcase Section */}
      <section className="py-20 bg-dark-bg text-white" ref={codeRef}>
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isCodeInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl font-display font-bold mb-4">
              Technical <span className="text-haclab-red">Implementation</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              A glimpse into the code that powers this solution, showcasing our technical expertise and approach.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isCodeInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <EnhancedTerminal
              title={`${project.title} - Code Example`}
              initialCommands={[project.codeSnippet]}
              showLineNumbers={true}
              theme="dark"
              maxHeight="400px"
            />
          </motion.div>
        </div>
      </section>
    </>
  );
}
