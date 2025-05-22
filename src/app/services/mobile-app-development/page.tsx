import React from 'react';
import ServiceHeroSection from '@/components/sections/ServiceHeroSection';
import ServiceFeatures from '@/components/sections/ServiceFeatures';
import ServiceProcess from '@/components/sections/ServiceProcess';
import ServiceShowcase from '@/components/sections/ServiceShowcase';
import CTASection from '@/components/sections/CTASection';
import { FiSmartphone, FiLayers, FiZap, FiGlobe, FiShield, FiRefreshCw } from 'react-icons/fi';
import type { Metadata } from 'next';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import ServiceSchema from '@/components/seo/ServiceSchema';

export const metadata: Metadata = {
  title: 'Mobile App Development Services - Haclab Company Limited',
  description: 'Custom mobile app development for iOS and Android. We build native and cross-platform mobile applications that engage users and drive business growth.',
  keywords: 'mobile app development, iOS app development, Android app development, cross-platform apps, React Native, Flutter, Haclab mobile apps',
};

export default function MobileAppDevelopmentPage() {
  // Hero section content
  const heroIcon = <FiSmartphone size={20} />;
  const heroTitle = "Mobile App Development";
  const heroDescription = "We create innovative, user-friendly mobile applications for iOS and Android that help businesses connect with their customers, streamline operations, and increase revenue.";
  const heroCode = `// React Native Mobile App
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as StoreProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import messaging from '@react-native-firebase/messaging';

// Initialize Firebase services
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

// App entry point
export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Register for push notifications
  useEffect(() => {
    registerForPushNotifications();
  }, []);

  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          {!user ? <AuthStack /> : <MainApp />}
        </NavigationContainer>
      </PersistGate>
    </StoreProvider>
  );
}`;

  // Features section content
  const featuresTitle = "Mobile App Development Features";
  const featuresDescription = "Our mobile app development services cover everything from concept to deployment, ensuring your app stands out in the crowded marketplace.";
  const features = [
    {
      title: "Native iOS & Android",
      description: "High-performance native apps built specifically for iOS and Android platforms.",
      icon: <FiSmartphone size={24} />,
      code: `// Native iOS Development (Swift)
class HomeViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        setupUI()
        fetchData()
    }

    private func setupUI() {
        view.backgroundColor = .systemBackground
        navigationItem.title = "Home"
        // Add UI components
    }

    private func fetchData() {
        NetworkManager.shared.fetchData { [weak self] result in
            switch result {
            case .success(let data):
                self?.updateUI(with: data)
            case .failure(let error):
                self?.showError(error)
            }
        }
    }
}`
    },
    {
      title: "Cross-Platform Apps",
      description: "Cost-effective solutions that work seamlessly across multiple platforms.",
      icon: <FiLayers size={24} />,
      code: `// React Native (Cross-Platform)
function ProductScreen({ route, navigation }) {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct(productId)
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, [productId]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!product) {
    return <Text>Product not found</Text>;
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: product.image }}
        style={styles.image}
      />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>{"$" + product.price}</Text>
      <Button
        title="Add to Cart"
        onPress={() => addToCart(product)}
      />
    </View>
  );
}`
    },
    {
      title: "UI/UX Design",
      description: "Intuitive, engaging user interfaces that provide exceptional user experiences.",
      icon: <FiZap size={24} />,
      code: `// UI Animation with Reanimated
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming
} from 'react-native-reanimated';

function AnimatedButton({ onPress, children }) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }]
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <Animated.View style={[styles.button, animatedStyle]}>
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        style={styles.touchable}
      >
        {children}
      </TouchableOpacity>
    </Animated.View>
  );
}`
    },
    {
      title: "Offline Functionality",
      description: "Apps that work seamlessly even when users are offline or have poor connectivity.",
      icon: <FiGlobe size={24} />,
      code: `// Offline Data Sync
import NetInfo from '@react-native-community/netinfo';
import { syncQueue } from './database';

// Monitor network status
NetInfo.addEventListener(state => {
  if (state.isConnected && state.isInternetReachable) {
    console.log('Back online, syncing data...');
    syncOfflineChanges();
  } else {
    console.log('Offline mode activated');
    enableOfflineMode();
  }
});

// Sync offline changes when back online
async function syncOfflineChanges() {
  const pendingChanges = await syncQueue.getPendingChanges();

  for (const change of pendingChanges) {
    try {
      await apiClient.sync(change);
      await syncQueue.markAsSynced(change.id);
    } catch (error) {
      console.error('Sync failed for item', change.id, error);
    }
  }
}`
    },
    {
      title: "App Security",
      description: "Robust security measures to protect user data and ensure compliance with regulations.",
      icon: <FiShield size={24} />,
      code: `// App Security Implementation
// Secure storage for sensitive data
import EncryptedStorage from 'react-native-encrypted-storage';

async function storeUserSession(token, userData) {
  try {
    await EncryptedStorage.setItem(
      "user_session",
      JSON.stringify({
        token,
        userData,
        timestamp: Date.now()
      })
    );
  } catch (error) {
    console.error('Failed to store session', error);
  }
}

// Certificate pinning for API requests
const config = {
  baseURL: API_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
  sslPinning: {
    certs: ['cert1', 'cert2']
  }
};

const secureApiClient = axios.create(config);`
    },
    {
      title: "Continuous Updates",
      description: "Ongoing maintenance and updates to keep your app running smoothly and securely.",
      icon: <FiRefreshCw size={24} />,
      code: `// Over-the-air updates with CodePush
import codePush from 'react-native-code-push';

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
  installMode: codePush.InstallMode.ON_NEXT_RESTART,
  mandatoryInstallMode: codePush.InstallMode.IMMEDIATE,
  updateDialog: {
    appendReleaseDescription: true,
    title: 'A new update is available!',
    mandatoryUpdateMessage: 'An update is required to continue using the app.',
    mandatoryContinueButtonLabel: 'Update Now'
  }
};

// Wrap your app with CodePush HOC
export default codePush(codePushOptions)(App);`
    }
  ];

  // Process section content
  const processTitle = "Our Mobile App Development Process";
  const processDescription = "We follow a structured approach to mobile app development, ensuring that every app we build is high-quality, user-friendly, and aligned with your business goals.";
  const processSteps = [
    {
      title: "Discovery & Strategy",
      description: "We start by understanding your business goals, target audience, and app requirements.",
      code: `// Phase 1: Discovery & Strategy
function discoveryPhase(client) {
  // Business analysis
  const businessGoals = identifyBusinessGoals(client);
  const targetAudience = analyzeTargetAudience(client);
  const marketAnalysis = analyzeMarket(client.industry);

  // App strategy
  const appStrategy = {
    platforms: determinePlatforms(targetAudience),
    monetization: defineMonetizationStrategy(businessGoals),
    keyFeatures: identifyKeyFeatures(businessGoals, targetAudience),
    competitiveAdvantage: findCompetitiveAdvantage(marketAnalysis)
  };

  // Technical feasibility
  const technicalAssessment = assessTechnicalFeasibility(appStrategy);

  return {
    appConcept: createAppConcept(businessGoals, appStrategy),
    roadmap: createRoadmap(appStrategy),
    budget: estimateBudget(appStrategy),
    timeline: estimateTimeline(appStrategy)
  };
}`
    },
    {
      title: "UI/UX Design",
      description: "We create wireframes and design mockups to visualize the app's interface and user experience.",
      code: `// Phase 2: UI/UX Design
async function designPhase(discoveryOutput) {
  // User research
  const userPersonas = createUserPersonas(discoveryOutput.targetAudience);
  const userJourneys = mapUserJourneys(userPersonas, discoveryOutput.appConcept);

  // Information architecture
  const appStructure = createAppStructure(userJourneys);

  // Wireframing
  const wireframes = {
    lowFidelity: createLowFiWireframes(appStructure),
    userFlows: mapUserFlows(appStructure)
  };

  // Client feedback and revisions
  const approvedWireframes = await getClientApproval(wireframes);

  // Visual design
  const designSystem = createDesignSystem({
    colors: defineColorPalette(),
    typography: defineTypography(),
    components: defineUIComponents()
  });

  const mockups = createVisualDesigns(approvedWireframes, designSystem);
  const prototype = createInteractivePrototype(mockups);

  // Usability testing
  const usabilityResults = conductUsabilityTesting(prototype, userPersonas);
  const refinedDesigns = refineDesigns(mockups, usabilityResults);

  return {
    finalDesigns: refinedDesigns,
    designSystem: designSystem,
    prototype: updatePrototype(prototype, refinedDesigns)
  };
}`
    },
    {
      title: "Development",
      description: "Our developers build your app using the latest technologies and best practices.",
      code: `// Phase 3: Development
async function developmentPhase(designOutput) {
  // Setup development environment
  const repo = initializeRepository();
  const cicd = setupCICD(repo);

  // Architecture setup
  const architecture = createAppArchitecture();

  // Core development
  const coreModules = [
    'authentication',
    'networking',
    'storage',
    'navigation',
    'state-management'
  ];

  for (const module of coreModules) {
    await developModule(module, architecture);
  }

  // Feature development
  const features = designOutput.appConcept.keyFeatures;

  for (const feature of features) {
    await developFeature(feature, architecture);
    await unitTestFeature(feature);
    await integrateFeature(feature, architecture);
  }

  // Integrations
  const integrations = implementIntegrations(designOutput.appConcept.integrations);

  // Build app
  const devBuild = buildApp({
    platform: 'all',
    environment: 'development'
  });

  return {
    codebase: repo,
    devBuild: devBuild
  };
}`
    },
    {
      title: "Testing & QA",
      description: "Rigorous testing to ensure your app works perfectly across all devices and operating systems.",
      code: `// Phase 4: Testing & QA
async function testingPhase(app) {
  // Functional testing
  const functionalTests = runFunctionalTests(app);

  // UI/UX testing
  const uiTests = testUserInterface(app);

  // Performance testing
  const performanceTests = {
    startup: measureStartupTime(app),
    memory: analyzeMemoryUsage(app),
    battery: measureBatteryConsumption(app),
    network: analyzeNetworkUsage(app)
  };

  // Compatibility testing
  const compatibilityTests = testOnDevices(app, [
    // iOS devices
    { name: 'iPhone 13 Pro', os: 'iOS 15.4' },
    { name: 'iPhone SE', os: 'iOS 14.8' },
    { name: 'iPad Pro', os: 'iOS 15.4' },
    // Android devices
    { name: 'Samsung Galaxy S22', os: 'Android 12' },
    { name: 'Google Pixel 6', os: 'Android 12' },
    { name: 'OnePlus 9', os: 'Android 11' }
  ]);

  // Security testing
  const securityTests = performSecurityAudit(app);

  // Beta testing
  const betaTestingResults = await conductBetaTesting(app);

  // Fix issues
  const issues = collectIssues([
    functionalTests, uiTests, performanceTests,
    compatibilityTests, securityTests, betaTestingResults
  ]);

  if (issues.length > 0) {
    await fixIssues(app, issues);
    return testingPhase(app); // Re-test after fixes
  }

  return {
    testResults: {
      functional: functionalTests,
      ui: uiTests,
      performance: performanceTests,
      compatibility: compatibilityTests,
      security: securityTests,
      beta: betaTestingResults
    },
    readyForDeployment: true
  };
}`
    },
    {
      title: "Deployment & Launch",
      description: "We deploy your app to the App Store and Google Play Store, and help you promote it to your target audience.",
      code: `// Phase 5: Deployment & Launch
async function deploymentPhase(app, testResults) {
  if (!testResults.readyForDeployment) {
    throw new Error('App not ready for deployment');
  }

  // Prepare for app stores
  const appStoreAssets = {
    ios: prepareAppStoreAssets('ios'),
    android: prepareAppStoreAssets('android')
  };

  // Build production versions
  const productionBuilds = {
    ios: buildApp({ platform: 'ios', environment: 'production' }),
    android: buildApp({ platform: 'android', environment: 'production' })
  };

  // Submit to app stores
  const submissions = {
    ios: await submitToAppStore(productionBuilds.ios, appStoreAssets.ios),
    android: await submitToPlayStore(productionBuilds.android, appStoreAssets.android)
  };

  // Setup analytics and monitoring
  await setupAnalytics(app);
  await setupCrashReporting(app);
  await setupPerformanceMonitoring(app);

  // Launch marketing activities
  const marketingActivities = launchMarketingCampaign(app);

  return {
    appStoreUrls: {
      ios: submissions.ios.appStoreUrl,
      android: submissions.android.playStoreUrl
    },
    launchDate: new Date(),
    analytics: setupAnalyticsDashboard()
  };
}`
    }
  ];

  // Showcase section content
  const showcaseTitle = "Our Mobile App Projects";
  const showcaseDescription = "Explore some of our successful mobile app development projects that have helped businesses engage users and achieve their goals.";
  const showcaseItems = [
    {
      title: "Food Delivery App",
      description: "A comprehensive food delivery platform with real-time order tracking, payment processing, and restaurant management.",
      image: "/images/projects/food-delivery-app.jpg",
      tags: ["iOS", "Android", "React Native", "Firebase", "Maps API"],
      link: "/projects/food-delivery-app"
    },
    {
      title: "Fitness Tracking App",
      description: "A feature-rich fitness app with workout plans, progress tracking, social sharing, and wearable device integration.",
      image: "/images/projects/fitness-app.jpg",
      tags: ["iOS", "Swift", "HealthKit", "CoreML", "CloudKit"],
      link: "/projects/fitness-app"
    },
    {
      title: "Field Service Management",
      description: "A mobile solution for field service technicians with job scheduling, digital forms, and offline capabilities.",
      image: "/images/projects/field-service-app.jpg",
      tags: ["Android", "Kotlin", "Room Database", "WorkManager", "Maps"],
      link: "/projects/field-service-app"
    }
  ];

  return (
    <>
      <BreadcrumbSchema pageName="Mobile App Development Services" />
      <ServiceSchema
        name="Mobile App Development Services"
        description="Custom mobile app development for iOS and Android. We build native and cross-platform mobile applications that engage users and drive business growth."
        url="https://haclab.co/services/mobile-app-development"
        serviceType="MobileAppDevelopment"
      />
      <ServiceHeroSection
        title={heroTitle}
        description={heroDescription}
        icon={heroIcon}
        code={heroCode}
        codeTitle="mobile-app.js"
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
