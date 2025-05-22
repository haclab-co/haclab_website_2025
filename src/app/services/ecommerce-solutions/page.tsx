import React from 'react';
import ServiceHeroSection from '@/components/sections/ServiceHeroSection';
import ServiceFeatures from '@/components/sections/ServiceFeatures';
import ServiceProcess from '@/components/sections/ServiceProcess';
import ServiceShowcase from '@/components/sections/ServiceShowcase';
import CTASection from '@/components/sections/CTASection';
import { FiShoppingCart, FiCreditCard, FiTruck, FiBarChart2, FiSearch, FiShield } from 'react-icons/fi';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'E-Commerce Solutions - Haclab Company Limited',
  description: 'Custom e-commerce solutions to help you sell products and services online. We build scalable, secure, and user-friendly online stores.',
  keywords: 'e-commerce development, online store, e-commerce platform, shopping cart, payment gateway integration, Haclab e-commerce',
};

export default function EcommerceSolutionsPage() {
  // Hero section content
  const heroIcon = <FiShoppingCart size={20} />;
  const heroTitle = "E-Commerce Solutions";
  const heroDescription = "We build custom e-commerce platforms that help you sell products and services globally. Our solutions are designed to provide seamless shopping experiences, secure payment processing, and efficient order management.";
  const heroCode = `// Modern E-Commerce Platform
import { createSlice, configureStore } from '@reduxjs/toolkit';
import { loadStripe } from '@stripe/stripe-js';
import { CartItem, Product, Order } from './types';

// Cart slice with Redux Toolkit
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    subtotal: 0,
    tax: 0,
    shipping: 0,
    total: 0
  },
  reducers: {
    addItem: (state, action) => {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find(item => item.productId === product.id);
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity
        });
      }
      
      // Recalculate totals
      recalculateCart(state);
    },
    removeItem: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter(item => item.productId !== productId);
      
      // Recalculate totals
      recalculateCart(state);
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find(item => item.productId === productId);
      
      if (item) {
        item.quantity = quantity;
      }
      
      // Recalculate totals
      recalculateCart(state);
    },
    clearCart: (state) => {
      state.items = [];
      state.subtotal = 0;
      state.tax = 0;
      state.shipping = 0;
      state.total = 0;
    }
  }
});

// Checkout function with Stripe
async function checkout(cartItems, customerInfo) {
  try {
    // Create order in database
    const order = await createOrder(cartItems, customerInfo);
    
    // Initialize Stripe
    const stripe = await loadStripe(process.env.STRIPE_PUBLIC_KEY);
    
    // Create checkout session
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderId: order.id,
        items: cartItems,
        customerEmail: customerInfo.email
      }),
    });
    
    const session = await response.json();
    
    // Redirect to Stripe checkout
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    
    if (result.error) {
      throw new Error(result.error.message);
    }
    
    return { success: true, orderId: order.id };
  } catch (error) {
    console.error('Checkout error:', error);
    return { success: false, error: error.message };
  }
}`;

  // Features section content
  const featuresTitle = "E-Commerce Features";
  const featuresDescription = "Our e-commerce solutions come with a comprehensive set of features designed to help you sell products online, manage inventory, process payments, and deliver exceptional customer experiences.";
  const features = [
    {
      title: "Custom Online Stores",
      description: "Tailored e-commerce websites designed to showcase your products and reflect your brand identity.",
      icon: <FiShoppingCart size={24} />,
      code: `// Product Catalog Component
function ProductCatalog({ category, filters, sort }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const response = await api.getProducts({
          category,
          filters,
          sort,
          page: 1,
          limit: 20
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchProducts();
  }, [category, filters, sort]);
  
  return (
    <div className="product-grid">
      {loading ? (
        <LoadingSpinner />
      ) : (
        products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))
      )}
    </div>
  );
}`
    },
    {
      title: "Payment Processing",
      description: "Secure integration with popular payment gateways to accept various payment methods.",
      icon: <FiCreditCard size={24} />,
      code: `// Payment Gateway Integration
const paymentGateways = {
  stripe: {
    name: 'Stripe',
    async processPayment(amount, currency, paymentMethod, customer) {
      const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
      
      // Create payment intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100, // Convert to cents
        currency,
        payment_method: paymentMethod,
        customer: customer.stripeId,
        receipt_email: customer.email,
        confirm: true
      });
      
      return {
        success: paymentIntent.status === 'succeeded',
        transactionId: paymentIntent.id,
        status: paymentIntent.status
      };
    }
  },
  paypal: {
    name: 'PayPal',
    async processPayment(amount, currency, customer) {
      const paypal = require('@paypal/checkout-server-sdk');
      
      // Initialize PayPal client
      const environment = new paypal.core.SandboxEnvironment(
        process.env.PAYPAL_CLIENT_ID,
        process.env.PAYPAL_CLIENT_SECRET
      );
      const client = new paypal.core.PayPalHttpClient(environment);
      
      // Create order
      const request = new paypal.orders.OrdersCreateRequest();
      request.prefer('return=representation');
      request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: currency,
            value: amount.toString()
          }
        }],
        application_context: {
          return_url: \`\${process.env.SITE_URL}/checkout/success\`,
          cancel_url: \`\${process.env.SITE_URL}/checkout/cancel\`
        }
      });
      
      const response = await client.execute(request);
      
      return {
        success: true,
        orderId: response.result.id,
        approvalUrl: response.result.links.find(link => link.rel === 'approve').href
      };
    }
  }
};`
    },
    {
      title: "Inventory Management",
      description: "Tools to track stock levels, manage product variants, and automate inventory updates.",
      icon: <FiTruck size={24} />,
      code: `// Inventory Management System
class InventoryManager {
  constructor(database) {
    this.db = database;
  }
  
  async getProductStock(productId) {
    const product = await this.db.products.findById(productId);
    return {
      inStock: product.quantity > 0,
      quantity: product.quantity,
      lowStock: product.quantity < product.lowStockThreshold
    };
  }
  
  async updateStock(productId, change) {
    const product = await this.db.products.findById(productId);
    const newQuantity = product.quantity + change;
    
    if (newQuantity < 0) {
      throw new Error('Insufficient stock');
    }
    
    await this.db.products.updateOne(
      { _id: productId },
      { $set: { quantity: newQuantity } }
    );
    
    // Check if we need to reorder
    if (newQuantity <= product.reorderThreshold) {
      await this.createReorderAlert(product);
    }
    
    return { productId, newQuantity };
  }
  
  async reserveStock(items) {
    const session = await this.db.startSession();
    
    try {
      session.startTransaction();
      
      for (const item of items) {
        await this.updateStock(item.productId, -item.quantity);
      }
      
      await session.commitTransaction();
      return true;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
}`
    },
    {
      title: "Analytics & Reporting",
      description: "Comprehensive analytics to track sales, customer behavior, and business performance.",
      icon: <FiBarChart2 size={24} />,
      code: `// E-commerce Analytics Dashboard
class AnalyticsDashboard {
  constructor(database, dateRange) {
    this.db = database;
    this.dateRange = dateRange;
  }
  
  async getSalesSummary() {
    const { startDate, endDate } = this.dateRange;
    
    const salesData = await this.db.orders.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate },
          status: 'completed'
        }
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: '$total' },
          orderCount: { $sum: 1 },
          averageOrderValue: { $avg: '$total' }
        }
      }
    ]);
    
    return salesData[0] || { totalSales: 0, orderCount: 0, averageOrderValue: 0 };
  }
  
  async getTopProducts() {
    const { startDate, endDate } = this.dateRange;
    
    return this.db.orderItems.aggregate([
      {
        $lookup: {
          from: 'orders',
          localField: 'orderId',
          foreignField: '_id',
          as: 'order'
        }
      },
      { $unwind: '$order' },
      {
        $match: {
          'order.createdAt': { $gte: startDate, $lte: endDate },
          'order.status': 'completed'
        }
      },
      {
        $group: {
          _id: '$productId',
          totalSold: { $sum: '$quantity' },
          revenue: { $sum: { $multiply: ['$price', '$quantity'] } }
        }
      },
      { $sort: { revenue: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'product'
        }
      },
      { $unwind: '$product' }
    ]);
  }
}`
    },
    {
      title: "SEO Optimization",
      description: "Built-in search engine optimization to help your products rank higher in search results.",
      icon: <FiSearch size={24} />,
      code: `// E-commerce SEO Optimization
class EcommerceSEO {
  constructor(product) {
    this.product = product;
  }
  
  generateMetaTags() {
    return {
      title: \`\${this.product.name} | \${this.product.brand} | Your Store\`,
      description: this.truncate(this.product.description, 160),
      keywords: this.generateKeywords(),
      canonical: \`\${process.env.SITE_URL}/products/\${this.product.slug}\`,
      openGraph: {
        title: this.product.name,
        description: this.truncate(this.product.description, 200),
        images: this.product.images.map(img => ({
          url: img.url,
          width: img.width,
          height: img.height,
          alt: img.alt || this.product.name
        })),
        type: 'product',
        product: {
          price: {
            amount: this.product.price,
            currency: 'USD'
          },
          availability: this.product.inStock ? 'in stock' : 'out of stock'
        }
      },
      structuredData: this.generateStructuredData()
    };
  }
  
  generateStructuredData() {
    return {
      '@context': 'https://schema.org/',
      '@type': 'Product',
      name: this.product.name,
      image: this.product.images.map(img => img.url),
      description: this.product.description,
      sku: this.product.sku,
      mpn: this.product.mpn,
      brand: {
        '@type': 'Brand',
        name: this.product.brand
      },
      offers: {
        '@type': 'Offer',
        url: \`\${process.env.SITE_URL}/products/\${this.product.slug}\`,
        price: this.product.price,
        priceCurrency: 'USD',
        availability: this.product.inStock 
          ? 'https://schema.org/InStock' 
          : 'https://schema.org/OutOfStock',
        seller: {
          '@type': 'Organization',
          name: 'Your Store'
        }
      }
    };
  }
}`
    },
    {
      title: "Security & Compliance",
      description: "Robust security measures to protect customer data and ensure compliance with regulations.",
      icon: <FiShield size={24} />,
      code: `// E-commerce Security Implementation
const securityMiddleware = {
  // CSRF Protection
  csrfProtection: csrf({ cookie: true }),
  
  // Content Security Policy
  contentSecurityPolicy: (req, res, next) => {
    res.setHeader(
      'Content-Security-Policy',
      "default-src 'self'; script-src 'self' https://js.stripe.com; frame-src https://js.stripe.com; img-src 'self' data: https://res.cloudinary.com; style-src 'self' 'unsafe-inline';"
    );
    next();
  },
  
  // Rate Limiting
  rateLimiter: rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests, please try again later.'
  }),
  
  // PCI Compliance for Payment Data
  paymentDataHandler: (req, res, next) => {
    // Never log or store full credit card details
    if (req.body.cardNumber) {
      // Only store/log last 4 digits
      req.body.cardNumberLast4 = req.body.cardNumber.slice(-4);
      delete req.body.cardNumber;
      delete req.body.cvv;
    }
    next();
  },
  
  // GDPR Compliance
  gdprCompliance: (req, res, next) => {
    // Add cookie consent check
    if (!req.cookies.cookieConsent && req.method === 'GET') {
      res.locals.showCookieConsent = true;
    }
    next();
  }
};`
    }
  ];

  // Process section content
  const processTitle = "Our E-Commerce Development Process";
  const processDescription = "We follow a structured approach to e-commerce development, ensuring that your online store is designed to attract customers, convert sales, and grow your business.";
  const processSteps = [
    {
      title: "Discovery & Strategy",
      description: "We start by understanding your business, products, target audience, and e-commerce goals.",
      code: `// Phase 1: Discovery & Strategy
function ecommerceDiscovery(client) {
  // Business analysis
  const businessProfile = {
    industry: client.industry,
    products: analyzeProducts(client.productCatalog),
    targetAudience: identifyTargetAudience(client),
    competitors: analyzeCompetitors(client.industry)
  };
  
  // E-commerce requirements
  const ecommerceRequirements = {
    productManagement: assessProductManagementNeeds(businessProfile),
    paymentProcessing: identifyPaymentRequirements(client),
    shippingOptions: determineShippingNeeds(businessProfile),
    taxCalculation: assessTaxRequirements(client),
    inventoryManagement: determineInventoryNeeds(businessProfile)
  };
  
  // Technical requirements
  const technicalRequirements = {
    expectedTraffic: estimateTraffic(businessProfile),
    scalabilityNeeds: assessScalabilityRequirements(businessProfile),
    integrations: identifyIntegrationNeeds(client),
    securityRequirements: determineSecurityNeeds(client)
  };
  
  // E-commerce strategy
  const strategy = {
    platformRecommendation: recommendPlatform(ecommerceRequirements, technicalRequirements),
    marketingApproach: developMarketingStrategy(businessProfile),
    conversionOptimization: planConversionStrategy(businessProfile),
    growthRoadmap: createGrowthRoadmap(businessProfile)
  };
  
  return {
    businessProfile,
    ecommerceRequirements,
    technicalRequirements,
    strategy
  };
}`
    },
    {
      title: "Design & UX",
      description: "We create a user-friendly, conversion-focused design for your online store.",
      code: `// Phase 2: Design & UX
async function ecommerceDesign(discoveryOutput) {
  // User experience research
  const uxResearch = {
    userPersonas: createUserPersonas(discoveryOutput.businessProfile.targetAudience),
    userJourneys: mapUserJourneys(discoveryOutput.businessProfile),
    painPoints: identifyPainPoints(discoveryOutput.businessProfile)
  };
  
  // Information architecture
  const informationArchitecture = {
    productCategories: organizeProductCategories(discoveryOutput.businessProfile.products),
    navigationStructure: designNavigation(uxResearch),
    searchFunctionality: planSearchExperience(discoveryOutput.businessProfile.products)
  };
  
  // Wireframing
  const wireframes = {
    homepage: createHomepageWireframe(informationArchitecture),
    categoryPage: createCategoryPageWireframe(informationArchitecture),
    productPage: createProductPageWireframe(discoveryOutput.businessProfile.products),
    cartPage: createCartPageWireframe(),
    checkoutProcess: createCheckoutWireframes(discoveryOutput.ecommerceRequirements)
  };
  
  // Client feedback and revisions
  const approvedWireframes = await getClientApproval(wireframes);
  
  // Visual design
  const designSystem = createDesignSystem({
    brandGuidelines: discoveryOutput.businessProfile.brandGuidelines,
    colorPalette: defineBrandColors(discoveryOutput.businessProfile),
    typography: defineTypography(),
    components: defineUIComponents()
  });
  
  const visualDesigns = createVisualDesigns(approvedWireframes, designSystem);
  
  // Prototype and testing
  const prototype = createInteractivePrototype(visualDesigns);
  const usabilityResults = conductUsabilityTesting(prototype, uxResearch.userPersonas);
  
  return {
    uxResearch,
    informationArchitecture,
    approvedWireframes,
    designSystem,
    finalDesigns: refineDesigns(visualDesigns, usabilityResults),
    usabilityResults
  };
}`
    },
    {
      title: "Development",
      description: "We build your e-commerce platform with all the features and functionality you need.",
      code: `// Phase 3: Development
async function ecommerceDevelopment(designOutput, discoveryOutput) {
  // Setup development environment
  const devEnvironment = setupDevelopmentEnvironment(discoveryOutput.strategy.platformRecommendation);
  
  // Core e-commerce functionality
  const coreModules = [
    'product-catalog',
    'shopping-cart',
    'user-accounts',
    'checkout-process',
    'order-management'
  ];
  
  for (const module of coreModules) {
    await developModule(module, designOutput);
  }
  
  // Payment integration
  const paymentGateways = discoveryOutput.ecommerceRequirements.paymentProcessing.gateways;
  for (const gateway of paymentGateways) {
    await integratePaymentGateway(gateway);
  }
  
  // Shipping integration
  const shippingProviders = discoveryOutput.ecommerceRequirements.shippingOptions.providers;
  for (const provider of shippingProviders) {
    await integrateShippingProvider(provider);
  }
  
  // Tax calculation
  await implementTaxCalculation(discoveryOutput.ecommerceRequirements.taxCalculation);
  
  // Inventory management
  await implementInventorySystem(discoveryOutput.ecommerceRequirements.inventoryManagement);
  
  // Additional integrations
  const integrations = discoveryOutput.technicalRequirements.integrations;
  for (const integration of integrations) {
    await implementIntegration(integration);
  }
  
  // SEO optimization
  await implementSEO(designOutput.informationArchitecture);
  
  // Analytics setup
  await setupAnalytics();
  
  // Security implementation
  await implementSecurity(discoveryOutput.technicalRequirements.securityRequirements);
  
  // Content population
  await populateStoreContent(discoveryOutput.businessProfile.products);
  
  return {
    codebase: devEnvironment.codebase,
    stagingUrl: devEnvironment.stagingUrl
  };
}`
    },
    {
      title: "Testing & QA",
      description: "Rigorous testing to ensure your e-commerce platform works perfectly and provides a seamless shopping experience.",
      code: `// Phase 4: Testing & QA
async function ecommerceTesting(developmentOutput, discoveryOutput) {
  // Functional testing
  const functionalTests = [
    testProductBrowsing(),
    testProductSearch(),
    testShoppingCart(),
    testUserAccounts(),
    testCheckoutProcess()
  ];
  
  const functionalResults = await Promise.all(functionalTests);
  
  // Payment testing
  const paymentTests = [];
  for (const gateway of discoveryOutput.ecommerceRequirements.paymentProcessing.gateways) {
    paymentTests.push(testPaymentGateway(gateway));
  }
  
  const paymentResults = await Promise.all(paymentTests);
  
  // Shipping calculation testing
  const shippingResults = await testShippingCalculations(
    discoveryOutput.ecommerceRequirements.shippingOptions
  );
  
  // Tax calculation testing
  const taxResults = await testTaxCalculations(
    discoveryOutput.ecommerceRequirements.taxCalculation
  );
  
  // Performance testing
  const performanceTests = {
    loadTime: measurePageLoadTimes(),
    serverResponse: measureServerResponseTimes(),
    databaseQueries: analyzeDatabasePerformance(),
    concurrentUsers: simulateConcurrentUsers(discoveryOutput.technicalRequirements.expectedTraffic)
  };
  
  // Security testing
  const securityTests = {
    vulnerabilityScan: performVulnerabilityScan(),
    penetrationTesting: conductPenetrationTesting(),
    paymentSecurity: verifyPaymentSecurity()
  };
  
  // Cross-browser testing
  const browserResults = testAcrossBrowsers([
    'chrome', 'firefox', 'safari', 'edge'
  ]);
  
  // Mobile testing
  const mobileResults = testOnMobileDevices([
    'iphone', 'android', 'ipad'
  ]);
  
  // Fix issues
  const issues = collectIssues([
    functionalResults, paymentResults, shippingResults, taxResults,
    performanceTests, securityTests, browserResults, mobileResults
  ]);
  
  if (issues.length > 0) {
    await fixIssues(developmentOutput.codebase, issues);
    return ecommerceTesting(developmentOutput, discoveryOutput); // Re-test after fixes
  }
  
  return {
    testResults: {
      functional: functionalResults,
      payment: paymentResults,
      shipping: shippingResults,
      tax: taxResults,
      performance: performanceTests,
      security: securityTests,
      browsers: browserResults,
      mobile: mobileResults
    },
    readyForDeployment: true
  };
}`
    },
    {
      title: "Launch & Growth",
      description: "We deploy your e-commerce platform and provide ongoing support to help your online business grow.",
      code: `// Phase 5: Launch & Growth
async function ecommerceLaunch(developmentOutput, testResults) {
  if (!testResults.readyForDeployment) {
    throw new Error('E-commerce platform not ready for deployment');
  }
  
  // Pre-launch checklist
  const prelaunchChecklist = {
    contentComplete: verifyContentCompletion(),
    legalDocuments: verifyLegalDocuments(),
    paymentGateways: verifyPaymentGatewayLive(),
    analyticsTracking: verifyAnalyticsSetup(),
    backupSystem: verifyBackupSystem()
  };
  
  if (Object.values(prelaunchChecklist).some(item => !item)) {
    throw new Error('Pre-launch checklist incomplete');
  }
  
  // Deploy to production
  const deploymentResult = await deployToProduction(developmentOutput.codebase);
  
  // Post-launch verification
  const verificationResults = await verifyProductionDeployment(deploymentResult.productionUrl);
  
  if (!verificationResults.success) {
    await rollbackDeployment(deploymentResult);
    throw new Error('Production verification failed');
  }
  
  // Launch marketing activities
  const marketingActivities = {
    announcements: sendLaunchAnnouncements(),
    socialMedia: publishSocialMediaPosts(),
    emailCampaign: sendLaunchEmailCampaign()
  };
  
  // Setup monitoring and support
  const ongoingOperations = {
    performanceMonitoring: setupPerformanceMonitoring(deploymentResult.productionUrl),
    errorTracking: setupErrorTracking(),
    customerSupportSystem: setupCustomerSupport(),
    backupSchedule: setupRegularBackups()
  };
  
  // Growth plan implementation
  const growthPlan = {
    seoOptimization: implementOngoingSEO(),
    conversionOptimization: setupABTesting(),
    marketingAutomation: setupMarketingAutomation(),
    analyticsReporting: setupRegularReporting()
  };
  
  return {
    launchStatus: 'success',
    productionUrl: deploymentResult.productionUrl,
    marketingActivities,
    ongoingOperations,
    growthPlan
  };
}`
    }
  ];

  // Showcase section content
  const showcaseTitle = "Our E-Commerce Projects";
  const showcaseDescription = "Explore some of our successful e-commerce projects that have helped businesses sell products online and grow their revenue.";
  const showcaseItems = [
    {
      title: "Fashion Retail Store",
      description: "A custom e-commerce platform for a fashion retailer with advanced product filtering, size guides, and personalized recommendations.",
      image: "/images/projects/fashion-ecommerce.jpg",
      tags: ["E-Commerce", "Fashion", "Personalization", "Mobile-First"],
      link: "/projects/fashion-ecommerce"
    },
    {
      title: "Electronics Marketplace",
      description: "A multi-vendor marketplace for electronics products with vendor management, commission system, and advanced search.",
      image: "/images/projects/electronics-marketplace.jpg",
      tags: ["Marketplace", "Multi-vendor", "Electronics", "Payment Processing"],
      link: "/projects/electronics-marketplace"
    },
    {
      title: "Subscription Box Service",
      description: "A subscription-based e-commerce platform for curated monthly boxes with subscription management and customer portal.",
      image: "/images/projects/subscription-service.jpg",
      tags: ["Subscription", "Recurring Billing", "Customer Portal", "Inventory"],
      link: "/projects/subscription-service"
    }
  ];

  return (
    <>
      <ServiceHeroSection 
        title={heroTitle}
        description={heroDescription}
        icon={heroIcon}
        code={heroCode}
        codeTitle="ecommerce-platform.js"
      />
      <ServiceFeatures 
        title={featuresTitle}
        description={featuresDescription}
        features={features}
      />
      <ServiceProcess 
        title={processTitle}
        description={processDescription}
        steps={processSteps}
      />
      <ServiceShowcase 
        title={showcaseTitle}
        description={showcaseDescription}
        items={showcaseItems}
      />
      <CTASection />
    </>
  );
}
