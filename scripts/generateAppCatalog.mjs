import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const portalRoot = path.resolve(__dirname, '..');
const appsRoot = path.resolve(portalRoot, '../apps');
const appSourceRoot = path.join(appsRoot, 'src/Apps');
const appsJsonPath = path.join(appsRoot, 'apps.json');
const outputPath = path.join(portalRoot, 'src/data/appCatalog.ts');
const internalAppIds = new Set(['mission-control']);

const appMeta = JSON.parse(fs.readFileSync(appsJsonPath, 'utf8'));

const marketingPlaybooks = {
  abacus: {
    targetAudience: 'Retailers, hardware shops, wholesalers, and inventory-heavy stores',
    acquisitionChannel: 'Wholesale markets, trade hubs, and central business districts',
    lowCostTactic: 'Visit stock-heavy shops with a tablet demo focused on stock-out alerts, product pricing, invoices, receipts, and low-stock warnings.',
    pitchHook: 'Keep selling even when internet drops: Abacus runs locally, tracks stock movements, and syncs online when connectivity returns.',
    pilotOffer: '14-day zero-risk desktop pilot with sample stock import from Excel and staff training at the shop.',
    referralAngle: 'Partner with wholesalers, accountants, and stock auditors who already advise retailers.',
  },
  evia: {
    targetAudience: 'Local cafes, food trucks, restaurants, and quick-service outlets',
    acquisitionChannel: 'Restaurant walk-ins, food industry associations, and local hospitality groups',
    lowCostTactic: 'Pitch during quiet hours from 2:00 PM to 4:00 PM with a fast POS billing and menu/order demo.',
    pitchHook: 'Runs offline during service rushes, keeps orders moving, and syncs sales data online after connectivity recovers.',
    pilotOffer: '14-day POS pilot on the restaurant desktop with menu setup, table setup, and cashier walkthrough.',
    referralAngle: 'Partner with food suppliers, restaurant consultants, and POS hardware sellers.',
  },
  homz: {
    targetAudience: 'Boutique hotels, guest houses, B&Bs, apartments, and short-stay operators',
    acquisitionChannel: 'OTA listings, local accommodation directories, and hospitality owner groups',
    lowCostTactic: 'Contact local B&Bs from Booking.com-style directories and show check-in, reservations, invoices, and overbooking control.',
    pitchHook: 'Front desks can check guests in and issue receipts even during internet interruptions.',
    pilotOffer: '14-day front-desk pilot with rooms/apartments configured and staff trained on check-ins and receipts.',
    referralAngle: 'Partner with hotel accountants, travel agents, and hospitality consultants.',
  },
  inncontrol: {
    targetAudience: 'Hotels, guest houses, restaurants inside hotels, event venues, and lodging groups',
    acquisitionChannel: 'Hospitality associations, OTA directories, and hotel operations consultants',
    lowCostTactic: 'Demonstrate combined hotel, restaurant, events, housekeeping, rooms, orders, and receipts workflows to owners.',
    pitchHook: 'A hotel can keep front desk, restaurant, and event operations moving offline, then sync online.',
    pilotOffer: '14-day operations pilot covering rooms, check-ins, restaurant orders, and daily reports.',
    referralAngle: 'Partner with hotel IT installers, accountants, and booking/OTA support consultants.',
  },
  kanify: {
    targetAudience: 'Independent garages, auto mechanics, and service centers',
    acquisitionChannel: 'Garage walk-ins, local map listings, auto-parts hubs, and mechanic institutes',
    lowCostTactic: 'Walk into garages with a tablet demo focused on jobs, job cards, quotations, invoices, vehicles, and tasks.',
    pitchHook: 'Garage teams can open job cards, track work, and invoice customers without depending on internet uptime.',
    pilotOffer: '14-day garage pilot with vehicle/customer import and a live job-card workflow setup.',
    referralAngle: 'Partner with auto-parts distributors, mechanic training institutes, and insurance assessors.',
  },
  kyeyo: {
    targetAudience: 'HR agencies, niche recruiters, labor export firms, and boutique staffing teams',
    acquisitionChannel: 'LinkedIn outreach, HR communities, recruitment groups, and agency owner referrals',
    lowCostTactic: 'Direct-message agency owners with a short demo showing candidates, clients, companies, agents, and receipts.',
    pitchHook: 'Recruitment teams can manage candidate/client records locally while keeping data private and sync-ready.',
    pilotOffer: '14-day recruiter pilot with candidate/client data imported from spreadsheets.',
    referralAngle: 'Partner with HR consultants, training centers, and compliance advisors.',
  },
  lenkit: {
    targetAudience: 'Micro-lenders, SACCOs, Chamas, savings groups, and community credit organizations',
    acquisitionChannel: 'WhatsApp and Telegram groups, SACCO committees, financial forums, and microfinance consultants',
    lowCostTactic: 'Offer free committee presentations focused on loans, repayments, savings, deposits, compliance, and secure offline data storage.',
    pitchHook: 'Loan and savings records stay available locally, private by default, and sync online when connectivity allows.',
    pilotOffer: '14-day committee pilot with member, loan, savings, and repayment templates configured.',
    referralAngle: 'Partner with SACCO setup consultants, accountants, and community finance trainers.',
  },
  prosy: {
    targetAudience: 'Landlords, property managers, real estate agents, and estate administrators',
    acquisitionChannel: 'Real estate groups, Facebook landlord groups, broker networks, and property management referrals',
    lowCostTactic: 'Search social groups for landlord pain points and offer a free trial focused on rent arrears, tenants, units, receipts, and complaints.',
    pitchHook: 'Property teams can receipt rent, track occupancy, and manage tenant issues even when internet is unreliable.',
    pilotOffer: '14-day property pilot with tenants, units, and opening balances imported from Excel.',
    referralAngle: 'Partner with real estate agents who refer landlords they do not manage directly.',
  },
  smart: {
    targetAudience: 'Private schools, daycare centers, school administrators, and headteachers',
    acquisitionChannel: 'Principal associations, headteacher groups, school boards, and education workshops',
    lowCostTactic: 'Run a free workshop on modernizing school records, then demo students, fees, attendance, exams, library, transport, and hostels.',
    pitchHook: 'School records remain available on local machines during outages, with online sync when the school connection returns.',
    pilotOffer: '14-day school records pilot with sample students/classes/fees configured and admin staff trained.',
    referralAngle: 'Partner with school accountants, stationery suppliers, and education consultants.',
  },
  zenwrench: {
    targetAudience: 'Independent garages, auto workshops, parts stores, and vehicle service teams',
    acquisitionChannel: 'In-person garage visits, local map listings, auto-parts distributors, and mechanic communities',
    lowCostTactic: 'Walk into garages with a tablet demo focused on job cards, parts tracking, quotations, receipts, gate passes, and vehicle status.',
    pitchHook: 'Workshop operations keep running offline, from job intake to parts usage and invoicing, then sync online.',
    pilotOffer: '14-day garage pilot with parts/services, customers, vehicles, and first job cards configured.',
    referralAngle: 'Partner with auto-parts distributors, garage equipment sellers, and mechanic trainers.',
  },
};

const stopWords = new Set([
  'management',
  'system',
  'software',
  'module',
  'record',
  'records',
  'tracking',
  'custom',
  'data',
]);

function readIfExists(filePath) {
  if (!filePath) return '';
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '';
}

function listFiles(dir, predicate = () => true) {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return listFiles(entryPath, predicate);
    return predicate(entryPath) ? [entryPath] : [];
  });
}

function stripComments(source) {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/(^|[^:])\/\/.*$/gm, '$1');
}

function findObjectBody(source, marker) {
  const markerIndex = source.indexOf(marker);
  if (markerIndex < 0) return '';
  const braceIndex = source.indexOf('{', markerIndex);
  if (braceIndex < 0) return '';

  let depth = 0;
  let quote = null;
  let escaped = false;

  for (let index = braceIndex; index < source.length; index += 1) {
    const char = source[index];

    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (char === '\\') {
        escaped = true;
      } else if (char === quote) {
        quote = null;
      }
      continue;
    }

    if (char === '"' || char === "'" || char === '`') {
      quote = char;
      continue;
    }

    if (char === '{') depth += 1;
    if (char === '}') {
      depth -= 1;
      if (depth === 0) return source.slice(braceIndex + 1, index);
    }
  }

  return '';
}

function splitTopLevelEntries(body) {
  const entries = [];
  let depth = 0;
  let quote = null;
  let escaped = false;
  let start = 0;

  for (let index = 0; index <= body.length; index += 1) {
    const char = body[index] || ',';

    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (char === '\\') {
        escaped = true;
      } else if (char === quote) {
        quote = null;
      }
      continue;
    }

    if (char === '"' || char === "'" || char === '`') {
      quote = char;
      continue;
    }

    if (char === '{' || char === '[' || char === '(') depth += 1;
    if (char === '}' || char === ']' || char === ')') depth -= 1;

    if (char === ',' && depth === 0) {
      const entry = body.slice(start, index).trim();
      if (entry) entries.push(entry);
      start = index + 1;
    }
  }

  return entries;
}

function parseObjectKeys(source) {
  const cleaned = stripComments(source);
  const marker = cleaned.includes('export const modules')
    ? 'export const modules'
    : cleaned.includes('export default')
      ? 'export default'
      : '{';
  const body = findObjectBody(cleaned, marker);

  return splitTopLevelEntries(body)
    .map((entry) => entry.match(/^([A-Za-z_$][\w$]*)\s*:/)?.[1] || entry.match(/^([A-Za-z_$][\w$]*)$/)?.[1])
    .filter(Boolean);
}

function importedKeys(indexPath) {
  const source = readIfExists(indexPath);
  return [...source.matchAll(/^import\s+([A-Za-z_$][\w$]*)\s+from\s+["']\.\/([^"']+)/gm)].map((match) => match[1]);
}

function titleCase(value) {
  return value
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function firstString(source, key) {
  return source.match(new RegExp(`${key}\\s*:\\s*["'\`]([^"'\`]+)["'\`]`))?.[1];
}

function firstBoolean(source, key) {
  return new RegExp(`${key}\\s*:\\s*true`, 'i').test(source);
}

function extractArrayStrings(source, key) {
  const match = source.match(new RegExp(`${key}\\s*:\\s*\\[([\\s\\S]*?)\\]`));
  if (!match) return [];
  return [...match[1].matchAll(/["'`]([^"'`]+)["'`]/g)].map((item) => item[1]);
}

function extractFields(source) {
  const fields = [];
  const dataIndexMatches = [...source.matchAll(/dataIndex\s*:\s*["'`]([^"'`]+)["'`]/g)];

  for (const match of dataIndexMatches) {
    const start = Math.max(0, match.index - 900);
    const end = Math.min(source.length, match.index + 900);
    const slice = source.slice(start, end);
    const dataIndex = match[1];
    const title = firstString(slice, 'title') || titleCase(dataIndex);
    const valueType = firstString(slice, 'valueType') || firstString(slice, 'type') || 'field';
    fields.push({
      title,
      dataIndex,
      valueType,
      required: /isRequired\s*:\s*true/.test(slice),
      hiddenInTable: /hideInTable\s*:\s*true/.test(slice),
      hiddenInForm: /hideInForm\s*:\s*true/.test(slice),
      linkedCollection: firstString(slice, 'collection'),
    });
  }

  const deduped = new Map();
  for (const field of fields) {
    if (!deduped.has(field.dataIndex)) deduped.set(field.dataIndex, field);
  }
  return [...deduped.values()];
}

function extractActionNames(source) {
  const names = new Set();
  const moreActionsMatch = source.match(/MoreActions\s*:/);
  if (!moreActionsMatch) return [];

  const slice = source.slice(moreActionsMatch.index, moreActionsMatch.index + 12000);
  for (const match of slice.matchAll(/key\s*:\s*["'`]([^"'`]+)["'`]/g)) names.add(match[1]);
  for (const match of slice.matchAll(/title\s*:\s*["'`]([^"'`]+)["'`]/g)) names.add(match[1]);
  for (const match of slice.matchAll(/submitText\s*:\s*["'`]([^"'`]+)["'`]/g)) names.add(match[1]);

  return [...names].filter((name) => !['button', 'actionGroup', 'Save', 'Close'].includes(name)).slice(0, 10);
}

function moduleFilePath(appId, moduleKey, folder) {
  const base = path.join(appSourceRoot, appId, folder);
  const candidates = [
    path.join(base, `${moduleKey}.js`),
    path.join(base, moduleKey, 'index.js'),
  ];
  return candidates.find((candidate) => fs.existsSync(candidate));
}

function summarizeModule(appId, key, isUniversal = false) {
  const modulePath = moduleFilePath(appId, key, 'modules');
  const propertyPath = moduleFilePath(appId, key, 'modulesProperties');
  const moduleSource = readIfExists(modulePath);
  const propertySource = readIfExists(propertyPath);
  const combinedSource = `${moduleSource}\n${propertySource}`;
  const fields = extractFields(combinedSource);
  const valueTypes = [...new Set(fields.map((field) => field.valueType).filter(Boolean))].sort();
  const fuzzySearchFields = extractArrayStrings(combinedSource, 'fuzzySearchFields');
  const actions = extractActionNames(propertySource || moduleSource);
  const hasColumns = /columns\s*:/.test(combinedSource) || fields.length > 0;
  const isGroup = !firstString(combinedSource, 'collection') && fields.length === 0 && hasColumns;
  const capabilities = [];

  if (/CustomView\s*:/.test(combinedSource)) capabilities.push('Dedicated custom workspace');
  if (/statistics\s*:/.test(combinedSource)) capabilities.push('Operational statistics');
  if (/filterOptions\s*:/.test(combinedSource)) capabilities.push('Preset record filters');
  if (/TableFilter\s*:/.test(combinedSource)) capabilities.push('Interactive table filters');
  if (actions.length) capabilities.push('Contextual row actions');
  if (fuzzySearchFields.length) capabilities.push('Fuzzy search');
  if (fields.some((field) => field.linkedCollection)) capabilities.push('Linked records');
  if (firstBoolean(combinedSource, 'multi_Branch') || firstBoolean(combinedSource, 'multiBranch')) capabilities.push('Branch-aware records');

  return {
    id: key,
    name: firstString(combinedSource, 'name') || titleCase(key),
    description: firstString(combinedSource, 'description') || undefined,
    icon: firstString(combinedSource, 'icon') || undefined,
    path: firstString(combinedSource, 'path') || undefined,
    parent: firstString(combinedSource, 'parent') || undefined,
    collection: firstString(combinedSource, 'collection') || undefined,
    singular: firstString(combinedSource, 'singular') || undefined,
    multiBranch: firstBoolean(combinedSource, 'multi_Branch') || firstBoolean(combinedSource, 'multiBranch'),
    fields,
    fieldCount: fields.length,
    requiredFieldCount: fields.filter((field) => field.required).length,
    tableFieldCount: fields.filter((field) => !field.hiddenInTable).length,
    formOnlyFieldCount: fields.filter((field) => field.hiddenInTable && !field.hiddenInForm).length,
    linkedFieldCount: fields.filter((field) => field.linkedCollection).length,
    valueTypes,
    fuzzySearchFields,
    capabilities,
    actions,
    isGroup,
    isUniversal,
  };
}

function integrationSummary(appId) {
  const appProps = readIfExists(path.join(appSourceRoot, appId, 'AppProps.js'));
  const customSettings = [...appProps.matchAll(/name\s*:\s*["'`]([^"'`]*Settings[^"'`]*)["'`]/g)].map((match) => match[1]);

  return {
    hasPOS: /\bPOS\s*:/.test(appProps),
    posType: /\bPOS\s*:/.test(appProps) ? 'Point of Sale workspace' : undefined,
    hasReports: /AppReports\s*:|AppReports,/.test(appProps),
    hasDashboard: /Dashboard\s*:|Dashboard,/.test(appProps),
    enforceBranches: /enforceBranches\s*:\s*true/.test(appProps),
    hasSettings: /settings\s*:|settings,/.test(appProps),
    hasCustomModuleConfigs: /customModuleConfigs\s*:/.test(appProps),
    hasBackgroundTasks: listFiles(path.join(appSourceRoot, appId), (file) => /BackgroundTasks\.js$/.test(file)).length > 0,
    customSettings,
  };
}

function portalLogoPath(appId) {
  const relativePath = `/assets/images/apps/${appId}.png`;
  const absolutePath = path.join(portalRoot, 'public', relativePath);
  return fs.existsSync(absolutePath) ? relativePath : undefined;
}

function collectStats(appId) {
  const files = listFiles(path.join(appSourceRoot, appId, 'modulesProperties'), (file) => file.endsWith('.js'));
  return files
    .filter((file) => /statistics\s*:/.test(readIfExists(file)))
    .map((file) => titleCase(path.basename(file, '.js')));
}

function collectCustomViews(appId) {
  const customViewDir = path.join(appSourceRoot, appId, 'CustomViews');
  if (!fs.existsSync(customViewDir)) return [];
  return fs.readdirSync(customViewDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() || entry.name.endsWith('.js'))
    .map((entry) => titleCase(entry.name.replace(/\.js$/, '')))
    .filter((name, index, all) => all.indexOf(name) === index)
    .sort();
}

function collectModuleKeys(appId) {
  const indexPath = path.join(appSourceRoot, appId, 'modules/index.js');
  const source = readIfExists(indexPath);
  const keys = parseObjectKeys(source);
  if (keys.length) return keys;
  return importedKeys(indexPath);
}

function collectUniversalFeatures() {
  const keys = collectModuleKeys('Universal');
  return keys.map((key) => summarizeModule('Universal', key, true));
}

function topWords(appName, appType, modules) {
  const source = [
    appName,
    appType,
    ...modules.flatMap((module) => [module.name, module.description, ...module.capabilities]),
  ].join(' ');

  const counts = new Map();
  for (const raw of source.toLowerCase().split(/[^a-z0-9]+/)) {
    if (!raw || raw.length < 4 || stopWords.has(raw)) continue;
    counts.set(raw, (counts.get(raw) || 0) + 1);
  }

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([word]) => titleCase(word));
}

function appSummary(meta, modules, integrations) {
  const moduleNames = modules.filter((module) => !module.isGroup).slice(0, 4).map((module) => module.name);
  const integrationBits = [
    integrations.hasDashboard && 'dashboard operations',
    integrations.hasReports && 'reporting',
    integrations.hasPOS && 'point of sale',
    integrations.enforceBranches && 'branch controls',
  ].filter(Boolean);

  return `${meta.name} is a ${meta.type.toLowerCase()} covering ${moduleNames.join(', ')}${moduleNames.length ? ',' : ''} and related operational records. It includes ${integrationBits.length ? integrationBits.join(', ') : 'standard workspace'} capabilities plus universal user, role, accounting, requisition, messaging, and audit features.`;
}

const universalFeatures = collectUniversalFeatures();

const catalog = Object.entries(appMeta).filter(([id]) => !internalAppIds.has(id)).map(([id, meta]) => {
  const keys = collectModuleKeys(id);
  const modules = keys.map((key) => summarizeModule(id, key, false));
  const moduleGroups = modules.filter((module) => module.isGroup || !module.collection);
  const entityModules = modules.filter((module) => module.collection || module.fieldCount || module.capabilities.length || module.actions.length);
  const integrations = integrationSummary(id);
  const actions = [...new Set(entityModules.flatMap((module) => module.actions))].slice(0, 40);
  const statistics = collectStats(id);
  const customViews = collectCustomViews(id);
  const highlights = [
    ...topWords(meta.name, meta.type, entityModules),
    integrations.hasDashboard ? 'Dashboard' : '',
    integrations.hasReports ? 'Reports' : '',
    integrations.hasPOS ? 'POS' : '',
    integrations.enforceBranches ? 'Branches' : '',
  ].filter(Boolean).slice(0, 8);

  return {
    id,
    slug: id,
    name: meta.name,
    type: meta.type,
    version: meta.version,
    color: meta.color,
    iconPath: meta.iconPath,
    logoPath: portalLogoPath(id),
    repository: meta.repository,
    integrations,
    moduleGroups,
    modules: entityModules,
    universalFeatures,
    actions,
    statistics,
    customViews,
    highlights,
    summary: appSummary(meta, entityModules, integrations),
    marketing: marketingPlaybooks[id],
  };
});

const output = `// Auto-generated by scripts/generateAppCatalog.mjs.\n// Do not edit by hand; update the sibling apps source and regenerate.\nimport { AppDefinition } from '../types';\n\nexport const appCatalog = ${JSON.stringify(catalog, null, 2)} satisfies AppDefinition[];\n\nexport type GeneratedAppDefinition = (typeof appCatalog)[number];\n\nexport const appCatalogBySlug = Object.fromEntries(appCatalog.map((app) => [app.slug, app])) as Record<string, GeneratedAppDefinition>;\n`;

fs.writeFileSync(outputPath, output);
console.log(`Generated ${path.relative(portalRoot, outputPath)} with ${catalog.length} apps and ${universalFeatures.length} universal features.`);
