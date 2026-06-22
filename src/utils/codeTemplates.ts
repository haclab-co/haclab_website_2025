import { companyProfile } from '../data/haclabData';

export const getCodeTemplate = (fileName: string): string => {
  switch (fileName) {
    case 'Home.tsx':
      return `/**
 * @file Home.tsx
 * @description Primary entry-point for Haclab digital agency portal.
 * @license SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Terminal } from 'lucide-react';

export default function HaclabHome() {
  const profile = {
    name: "${companyProfile.name}",
    fullName: "${companyProfile.fullName}",
    tagline: "${companyProfile.tagline}"
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-12 text-slate-300 font-sans">
      {/* Editorial Announcement Banner */}
      <motion.div 
         initial={{ opacity: 0, y: -10 }}
         animate={{ opacity: 1, y: 0 }}
         className="inline-flex items-center gap-2 px-3 py-1 text-xs font-mono tracking-tight bg-brand-red/10 border border-brand-red/20 text-brand-red rounded-full animate-pulse"
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span>Haclab Studio v3.0 Core Engine is active (Primary color: #ff0000)</span>
      </motion.div>

      {/* Main Branding Focus */}
      <section className="space-y-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white font-sans sm:leading-tight">
          Custom Software Development with <span className="bg-gradient-to-r from-brand-red via-red-500 to-rose-600 bg-clip-text text-transparent">Precision</span>.
        </h1>
        <p className="text-base sm:text-lg text-slate-400 font-light max-w-2xl leading-relaxed">
          {profile.tagline}. Based in Kampala, Uganda, we bridge high-integrity backend computations with beautiful, Swiss-inspired frontend user experiences.
        </p>
      </section>

      {/* Embedded Terminal Greeting Card */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-lg overflow-hidden backdrop-blur-md">
        <div className="flex items-center justify-between px-4 py-2 bg-slate-950/80 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-brand-red" />
            <span className="w-3 h-3 rounded-full bg-amber-500" />
            <span className="w-3 h-3 rounded-full bg-slate-700" />
          </div>
          <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">system_greetings.sh</span>
        </div>
        <div className="p-6 font-mono text-xs sm:text-sm space-y-3 leading-relaxed text-brand-red">
          <p><span className="text-slate-500">$</span> npx haclab init --host="0.0.0.0"</p>
          <p className="text-slate-400">» Booting engineering client interface...</p>
          <div className="p-4 bg-slate-950/40 rounded border border-slate-850 text-slate-300 font-sans space-y-2">
            <h4 className="text-brand-red font-semibold font-mono text-xs uppercase tracking-wide">Agency Fundamentals</h4>
            <p className="text-xs leading-relaxed text-slate-400">
              We treat code not as disposable commodity, but as infrastructure. Every line we author is optimized for low CPU footprints, fast cache retention, and strict transactional security.
            </p>
          </div>
          <p className="text-slate-400 animate-pulse">» System status: 100% stable. Click "Web Preview" to experience the live application render.</p>
        </div>
      </div>
    </div>
  );
}`;

    case 'Services.json':
      return `{
  "portal": "Haclab.net",
  "founder": "Douglas Were",
  "location": "Kampala, Uganda",
  "brand_color": "#ff0000",
  "core_services": [
    {
      "uid": "software-dev",
      "specialty": "Software Development",
      "description": "Robust, custom, secure standalone software tailored to complex enterprise logic and requirements.",
      "technologies": ["Golang", "Node.js", "TypeScript", "Docker", "RESTful APIs"]
    },
    {
      "uid": "web-dev",
      "specialty": "Web Development",
      "description": "Professional websites that help you overcome geographical limitations and increase exposure.",
      "technologies": ["React/Vite", "Next.js", "Tailwind CSS", "TypeScript", "SEO Best Practices"]
    },
    {
      "uid": "mobile-app",
      "specialty": "Mobile App Development",
      "description": "Well-crafted mobile applications that bring your products and services to life.",
      "technologies": ["React Native", "Flutter", "iOS / Android SDKs", "Push Notifications"]
    },
    {
      "uid": "database-design",
      "specialty": "Database Design",
      "description": "Efficient database solutions for storing, managing, and retrieving your valuable data.",
      "technologies": ["PostgreSQL", "MySQL", "MongoDB", "Redis Caching", "Schema Indexing"]
    },
    {
      "uid": "ecommerce-solutions",
      "specialty": "E-Commerce Solutions",
      "description": "Online shopping platforms that help you sell products and services globally.",
      "technologies": ["Custom Payment APIs", "Mobile Money API", "Shopify Ecosystem", "Inventory Management"]
    },
    {
      "uid": "seo-performance",
      "specialty": "SEO & Performance",
      "description": "Optimal performance, speed, and search visibility so that users find and use your platform.",
      "technologies": ["Lighthouse Auditing", "Server-Side Rendering (SSR)", "Semantic HTML", "Cache Headers"]
    }
  ],
  "philosophy": {
    "principle_1": "Draft simple schema relationships before writing code.",
    "principle_2": "Eliminate redundant external web imports.",
    "principle_3": "Prioritize offline resiliency & graceful failure states under local East African spotty networks."
  }
}`;

    case 'Projects.yaml':
      return `---
# Haclab Custom Software Engineering Portfolio
# Chronological case studies of robust client deployments in Uganda.

agency: "${companyProfile.fullName}"
headquarters: "${companyProfile.location}"
primary_color: "#ff0000"

active_deployments:
  - id: "wion-motors"
    title: "Wion Motors Limited"
    niche: "Company Website"
    year: "2024"
    impact: "A professional design and listing display platform for a leading motor company in Uganda"
    stack:
      - "React"
      - "Node.js"
      - "MongoDB"
      - "Tailwind CSS"
    summary: >
      Haclab engineered a premium web catalog for Wion Motors, Uganda's leading corporate auto importer.
      It features rapid imagery loading, smooth categorization filters, and direct consultant connection hooks.

  - id: "kanify"
    title: "Kanify"
    niche: "Garage Management System"
    year: "2023"
    impact: "A comprehensive workspace coordinating incoming mechanic slots, telemetry logs and invoices"
    stack:
      - "Vue.js"
      - "Laravel"
      - "MySQL"
      - "REST APIs"
    summary: >
      Kanify serves as an online command station for auto service centers. It handles vehicle check-ins,
      schedules technician task blocks, prints diagnostic worksheets, and manages custom billing logs.

  - id: "realesta-pms"
    title: "Realesta PMS"
    niche: "Property Management System"
    year: "2025"
    impact: "A robust SaaS designed for property managers to solve tenancy registers and tickets digitally"
    stack:
      - "React"
      - "Express"
      - "PostgreSQL"
      - "Tailwind"
    summary: >
      Streamlines residential and commercial property management. Realesta registers lease terms, tracks payment
      indices, automatically shoots reminders, and registers site maintenance records.
`;

    case 'Team_Core.md':
      return `# Team Core : Haclab Company Limited

Operational from Kampala, Uganda, we have structured a lean multi-disciplinary engineering squad.

## 🧑‍💻 Technical Leadership

### **Douglas Were**
* **Role**: Founder / Principal Systems Architect
* **Profile**: Nearly a decade of production programming and fractional CTO advisory across East Africa.
* **Fields**: Relational Database Schemas, High-availability APIs, Infrastructure Engineering.
* **Mantra**: *"A beautifully designed system is mathematically readable first, elegant second."*

---

## 🎨 Interactive User Design

### **Prossy Namakula**
* **Role**: Senior Frontend Engineer & Designer
* **Profile**: Expert in responsive ergonomics and custom CSS structural layers.
* **Design Pillars**: Modern minimalist layouts, high-contrast readability, typography-driven grids.
`;

    case 'Contact_Config.sh':
      return `#!/bin/bash
# Haclab Client Interaction Config
# Execute this shell file to stream get-in-touch vectors.

export HACLAB_EMAIL="${companyProfile.email}"
export HACLAB_LOCATION="${companyProfile.location}"
export HACLAB_TEL="${companyProfile.phone}"

echo "============================================="
echo "   HACLAB INTERACTIVE REGISTRATION SYSTEM"
echo "============================================="
echo "» Primary color: #ff0000"
echo "» Host address: \${HACLAB_LOCATION}"
echo "» Direct correspondence: \${HACLAB_EMAIL}"
echo "» Inquiries stream: \${HACLAB_TEL}"
echo "============================================="
echo "» Submitting a client inquiry from shell context..."
echo "» [INPUT REQUIRED]"
echo "Please enter your name, email, and proposal scope..."
`;

    default:
      return ``;
  }
};
