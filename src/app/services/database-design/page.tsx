import React from 'react';
import ServiceHeroSection from '@/components/sections/ServiceHeroSection';
import ServiceFeatures from '@/components/sections/ServiceFeatures';
import ServiceProcess from '@/components/sections/ServiceProcess';
import ServiceShowcase from '@/components/sections/ServiceShowcase';
import CTASection from '@/components/sections/CTASection';
import { FiDatabase, FiServer, FiLayers, FiShield, FiZap, FiRefreshCw } from 'react-icons/fi';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Database Design Services - Haclab Company Limited',
  description: 'Professional database design and development services. We create efficient, scalable, and secure database solutions for your business needs.',
  keywords: 'database design, database development, SQL databases, NoSQL databases, data modeling, database optimization, Haclab database services',
};

export default function DatabaseDesignPage() {
  // Hero section content
  const heroIcon = <FiDatabase size={20} />;
  const heroTitle = "Database Design & Development";
  const heroDescription = "We design and implement efficient, scalable, and secure database solutions that help you store, manage, and retrieve your valuable data. Our database services ensure your data is organized, accessible, and protected.";
  const heroCode = `-- Database Schema Design Example
CREATE TABLE users (
  user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  role VARCHAR(20) NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$')
);

CREATE TABLE products (
  product_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
  stock_quantity INTEGER NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
  category_id UUID REFERENCES categories(category_id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  is_active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE orders (
  order_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(user_id),
  order_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  status VARCHAR(20) NOT NULL DEFAULT 'pending',
  total_amount DECIMAL(12, 2) NOT NULL CHECK (total_amount >= 0),
  shipping_address TEXT NOT NULL,
  billing_address TEXT NOT NULL,
  payment_method VARCHAR(50) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE order_items (
  order_item_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(order_id),
  product_id UUID NOT NULL REFERENCES products(product_id),
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price DECIMAL(10, 2) NOT NULL CHECK (unit_price >= 0),
  UNIQUE(order_id, product_id)
);

-- Indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_order_items_product ON order_items(product_id);

-- Trigger for updating timestamps
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_timestamp
BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION update_timestamp();`;

  // Features section content
  const featuresTitle = "Database Design Features";
  const featuresDescription = "Our database design services cover everything from conceptual modeling to implementation and optimization, ensuring your data is structured for optimal performance and scalability.";
  const features = [
    {
      title: "Data Modeling",
      description: "Comprehensive data modeling to create a logical structure that accurately represents your business entities and relationships.",
      icon: <FiLayers size={24} />,
      code: `// Entity-Relationship Diagram (ERD)
const dataModel = {
  entities: [
    {
      name: 'Customer',
      attributes: [
        { name: 'customer_id', type: 'UUID', primaryKey: true },
        { name: 'name', type: 'VARCHAR' },
        { name: 'email', type: 'VARCHAR', unique: true },
        { name: 'phone', type: 'VARCHAR' }
      ]
    },
    {
      name: 'Order',
      attributes: [
        { name: 'order_id', type: 'UUID', primaryKey: true },
        { name: 'customer_id', type: 'UUID', foreignKey: 'Customer' },
        { name: 'order_date', type: 'TIMESTAMP' },
        { name: 'total_amount', type: 'DECIMAL' }
      ]
    }
  ],
  relationships: [
    {
      type: 'one-to-many',
      entities: ['Customer', 'Order'],
      cardinality: '1:N'
    }
  ]
};`
    },
    {
      title: "SQL Databases",
      description: "Design and implementation of relational databases using PostgreSQL, MySQL, SQL Server, or Oracle.",
      icon: <FiDatabase size={24} />,
      code: `-- SQL Database Implementation
-- Create a table with constraints
CREATE TABLE employees (
  employee_id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  department_id INTEGER REFERENCES departments(department_id),
  salary NUMERIC(10, 2) CHECK (salary > 0),
  hire_date DATE NOT NULL,
  CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$')
);

-- Create a view for reporting
CREATE VIEW employee_department_view AS
SELECT 
  e.employee_id,
  e.first_name,
  e.last_name,
  e.email,
  d.department_name,
  e.salary
FROM 
  employees e
JOIN 
  departments d ON e.department_id = d.department_id;`
    },
    {
      title: "NoSQL Databases",
      description: "Design and implementation of NoSQL databases for flexible, scalable data storage using MongoDB, Cassandra, or DynamoDB.",
      icon: <FiServer size={24} />,
      code: `// MongoDB Schema Design
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(v) {
        return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(v);
      },
      message: props => \`\${props.value} is not a valid email!\`
    }
  },
  profile: {
    firstName: String,
    lastName: String,
    avatar: String,
    bio: String
  },
  preferences: {
    theme: { type: String, default: 'light' },
    notifications: { type: Boolean, default: true }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});`
    },
    {
      title: "Database Security",
      description: "Implementation of robust security measures to protect your data from unauthorized access and breaches.",
      icon: <FiShield size={24} />,
      code: `-- Database Security Implementation
-- Create roles with specific permissions
CREATE ROLE app_readonly;
CREATE ROLE app_readwrite;
CREATE ROLE app_admin;

-- Grant permissions
GRANT SELECT ON ALL TABLES IN SCHEMA public TO app_readonly;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_readwrite;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO app_admin;

-- Row-level security
ALTER TABLE customer_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY customer_data_isolation ON customer_data
  USING (tenant_id = current_setting('app.tenant_id')::uuid);

-- Data encryption
CREATE EXTENSION pgcrypto;

-- Encrypt sensitive data
UPDATE users 
SET credit_card = pgp_sym_encrypt(credit_card, 'encryption_key');`
    },
    {
      title: "Performance Optimization",
      description: "Fine-tuning your database for maximum speed, efficiency, and resource utilization.",
      icon: <FiZap size={24} />,
      code: `-- Database Performance Optimization
-- Create indexes for frequently queried columns
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_date ON transactions(transaction_date);

-- Composite index for common query patterns
CREATE INDEX idx_products_category_price ON products(category_id, price);

-- Partial index for filtered queries
CREATE INDEX idx_orders_pending ON orders(order_date)
WHERE status = 'pending';

-- Optimize query with EXPLAIN ANALYZE
EXPLAIN ANALYZE
SELECT c.customer_name, SUM(o.total_amount) as total_spent
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
WHERE o.order_date >= '2023-01-01'
GROUP BY c.customer_name
ORDER BY total_spent DESC
LIMIT 10;`
    },
    {
      title: "Data Migration & Integration",
      description: "Seamless migration of existing data and integration with other systems and applications.",
      icon: <FiRefreshCw size={24} />,
      code: `// Data Migration Process
async function migrateData(sourceDb, targetDb) {
  // 1. Extract data from source
  const sourceData = await extractData(sourceDb);
  
  // 2. Transform data to match new schema
  const transformedData = transformData(sourceData);
  
  // 3. Validate transformed data
  const validationResults = validateData(transformedData);
  if (!validationResults.valid) {
    throw new Error(\`Data validation failed: \${validationResults.errors.join(', ')}\`);
  }
  
  // 4. Load data into target database
  const migrationResults = await loadData(targetDb, transformedData);
  
  // 5. Verify migration
  const verificationResults = await verifyMigration(sourceDb, targetDb);
  
  return {
    status: verificationResults.success ? 'SUCCESS' : 'FAILED',
    recordsMigrated: migrationResults.count,
    errors: verificationResults.errors
  };
}`
    }
  ];

  // Process section content
  const processTitle = "Our Database Design Process";
  const processDescription = "We follow a structured approach to database design and development, ensuring that your database solution meets your specific business requirements and performance needs.";
  const processSteps = [
    {
      title: "Requirements Analysis",
      description: "We start by understanding your data storage needs, business processes, and performance requirements.",
      code: `// Phase 1: Requirements Analysis
function requirementsAnalysis(client) {
  // Business process analysis
  const businessProcesses = identifyBusinessProcesses(client);
  const dataRequirements = extractDataRequirements(businessProcesses);
  
  // Data volume and growth projections
  const dataVolume = estimateDataVolume(dataRequirements);
  const growthProjections = projectDataGrowth(dataVolume, 5); // 5-year projection
  
  // Performance requirements
  const performanceRequirements = {
    throughput: defineTransactionsPerSecond(businessProcesses),
    responseTime: defineResponseTimeRequirements(businessProcesses),
    availability: defineAvailabilityRequirements(client.industry),
    concurrency: defineConcurrencyRequirements(businessProcesses)
  };
  
  // Compliance and security requirements
  const complianceRequirements = identifyComplianceRequirements(client.industry);
  const securityRequirements = defineSecurityRequirements(dataRequirements, complianceRequirements);
  
  return {
    dataRequirements,
    volumeProjections: growthProjections,
    performanceRequirements,
    securityRequirements,
    complianceRequirements
  };
}`
    },
    {
      title: "Conceptual Design",
      description: "We create a high-level model of your data entities, attributes, and relationships.",
      code: `// Phase 2: Conceptual Design
function conceptualDesign(requirements) {
  // Identify entities and relationships
  const entities = identifyEntities(requirements.dataRequirements);
  const relationships = identifyRelationships(entities, requirements.dataRequirements);
  
  // Create entity-relationship diagram
  const erd = createEntityRelationshipDiagram(entities, relationships);
  
  // Define high-level attributes
  for (const entity of entities) {
    entity.attributes = identifyAttributes(entity, requirements.dataRequirements);
    entity.primaryKey = identifyPrimaryKey(entity);
  }
  
  // Validate conceptual model
  const validationResults = validateConceptualModel(erd, requirements);
  
  return {
    entities,
    relationships,
    erd,
    validationResults
  };
}`
    },
    {
      title: "Logical Design",
      description: "We transform the conceptual model into a logical database schema with tables, columns, and constraints.",
      code: `// Phase 3: Logical Design
function logicalDesign(conceptualModel, requirements) {
  // Choose database model based on requirements
  const databaseModel = selectDatabaseModel(requirements);
  
  // Transform conceptual model to logical model
  let logicalModel;
  
  if (databaseModel === 'relational') {
    // Normalize data
    const normalizedEntities = normalizeEntities(conceptualModel.entities);
    
    // Define tables, columns, and constraints
    const tables = createTables(normalizedEntities);
    defineForeignKeys(tables, conceptualModel.relationships);
    defineConstraints(tables, requirements);
    
    logicalModel = {
      tables,
      relationships: mapRelationshipsToForeignKeys(conceptualModel.relationships, tables)
    };
  } else if (databaseModel === 'document') {
    // Design document collections
    const collections = designDocumentCollections(conceptualModel.entities, conceptualModel.relationships);
    defineDocumentStructure(collections);
    defineIndexes(collections, requirements);
    
    logicalModel = { collections };
  }
  
  // Validate logical model
  const validationResults = validateLogicalModel(logicalModel, requirements);
  
  return {
    databaseModel,
    logicalModel,
    validationResults
  };
}`
    },
    {
      title: "Physical Design",
      description: "We implement the logical schema in your chosen database system, optimizing for performance and scalability.",
      code: `// Phase 4: Physical Design
function physicalDesign(logicalModel, requirements) {
  // Select database system
  const databaseSystem = selectDatabaseSystem(logicalModel.databaseModel, requirements);
  
  // Storage design
  const storageDesign = {
    tablespaces: designTablespaces(logicalModel, requirements.volumeProjections),
    partitioning: designPartitioning(logicalModel, requirements),
    fileGroups: designFileGroups(databaseSystem, requirements)
  };
  
  // Index design
  const indexes = designIndexes(logicalModel, requirements.performanceRequirements);
  
  // Query optimization
  const queryPatterns = identifyQueryPatterns(requirements.dataRequirements);
  const optimizedQueries = optimizeQueries(queryPatterns, logicalModel, indexes);
  
  // Security implementation
  const securityImplementation = implementSecurity(logicalModel, requirements.securityRequirements, databaseSystem);
  
  // Generate physical schema
  const physicalSchema = generatePhysicalSchema(logicalModel, databaseSystem, {
    storageDesign,
    indexes,
    securityImplementation
  });
  
  return {
    databaseSystem,
    physicalSchema,
    storageDesign,
    indexes,
    securityImplementation
  };
}`
    },
    {
      title: "Implementation & Testing",
      description: "We implement the database, load initial data, and perform thorough testing to ensure it meets all requirements.",
      code: `// Phase 5: Implementation & Testing
async function implementationPhase(physicalDesign, requirements) {
  // Setup database environment
  const dbEnvironment = await setupDatabaseEnvironment(physicalDesign.databaseSystem);
  
  // Create database objects
  await executeSchema(dbEnvironment, physicalDesign.physicalSchema);
  
  // Data migration (if applicable)
  if (requirements.existingData) {
    await migrateData(requirements.existingData, dbEnvironment);
  }
  
  // Generate test data
  const testData = generateTestData(physicalDesign.physicalSchema, requirements);
  await loadTestData(dbEnvironment, testData);
  
  // Performance testing
  const performanceTests = [
    testThroughput(dbEnvironment, requirements.performanceRequirements),
    testResponseTime(dbEnvironment, requirements.performanceRequirements),
    testConcurrency(dbEnvironment, requirements.performanceRequirements)
  ];
  
  const performanceResults = await Promise.all(performanceTests);
  
  // Functional testing
  const functionalTests = testDatabaseFunctionality(dbEnvironment, requirements.dataRequirements);
  
  // Security testing
  const securityTests = testDatabaseSecurity(dbEnvironment, requirements.securityRequirements);
  
  // Generate test report
  const testReport = generateTestReport({
    performance: performanceResults,
    functional: functionalTests,
    security: securityTests
  });
  
  return {
    dbEnvironment,
    testReport,
    implementationSuccessful: evaluateTestResults(testReport)
  };
}`
    }
  ];

  // Showcase section content
  const showcaseTitle = "Our Database Projects";
  const showcaseDescription = "Explore some of our successful database design and implementation projects that have helped businesses manage their data effectively.";
  const showcaseItems = [
    {
      title: "E-Commerce Database System",
      description: "A scalable database solution for a large e-commerce platform handling millions of products and transactions.",
      image: "/images/projects/ecommerce-database.jpg",
      tags: ["PostgreSQL", "Sharding", "High Availability", "Performance Tuning"],
      link: "/projects/ecommerce-database"
    },
    {
      title: "Healthcare Data Platform",
      description: "A secure, HIPAA-compliant database system for storing and managing sensitive patient data.",
      image: "/images/projects/healthcare-database.jpg",
      tags: ["SQL Server", "Data Encryption", "Audit Logging", "Compliance"],
      link: "/projects/healthcare-database"
    },
    {
      title: "Real-time Analytics Database",
      description: "A high-performance NoSQL database solution for collecting and analyzing real-time data from IoT devices.",
      image: "/images/projects/analytics-database.jpg",
      tags: ["MongoDB", "Time Series", "Aggregation Pipeline", "Scalability"],
      link: "/projects/analytics-database"
    }
  ];

  return (
    <>
      <ServiceHeroSection 
        title={heroTitle}
        description={heroDescription}
        icon={heroIcon}
        code={heroCode}
        codeTitle="database-schema.sql"
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
