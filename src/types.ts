export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  fullDetails: string;
  techStack: string[];
  role: string;
  year: string;
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
}

export interface Service {
  id: string;
  title: string;
  iconName: string;
  shortDescription: string;
  longDescription: string;
  technologies: string[];
  useCase: string;
}

export interface TeamMember {
  name: string;
  role: string;
  avatar: string;
  bio: string;
  skills: string[];
  github?: string;
  linkedin?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  author: string;
  readTime: string;
  summary: string;
  content: string;
  tags: string[];
}

export type ViewMode = 'ide' | 'preview';
export type FileExtension = 'tsx' | 'json' | 'yaml' | 'sh' | 'md';

export interface FileItem {
  id: string;
  name: string;
  icon: string;
  extension: FileExtension;
  category: 'core' | 'services' | 'portfolio' | 'team' | 'contact';
}

export interface ModuleColumn {
  title?: string;
  dataIndex?: string;
  valueType?: string;
  isRequired?: boolean;
  hideInTable?: boolean;
  hideInForm?: boolean;
  type?: string;
}

export interface FieldSummary {
  title: string;
  dataIndex: string;
  valueType: string;
  required: boolean;
  hiddenInTable: boolean;
  hiddenInForm: boolean;
  linkedCollection?: string;
}

export interface ModuleDefinition {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  path?: string;
  parent?: string;
  collection?: string;
  singular?: string;
  multiBranch?: boolean;
  columns?: ModuleColumn[];
  fields?: FieldSummary[];
  fieldCount?: number;
  requiredFieldCount?: number;
  tableFieldCount?: number;
  formOnlyFieldCount?: number;
  linkedFieldCount?: number;
  valueTypes?: string[];
  fuzzySearchFields?: string[];
  capabilities?: string[];
  actions?: string[];
  moreActions?: string[];
  isGroup?: boolean;
  isUniversal?: boolean;
}

export interface AppIntegrations {
  hasPOS: boolean;
  posType?: string;
  hasReports: boolean;
  hasDashboard: boolean;
  enforceBranches: boolean;
  hasSettings?: boolean;
  hasCustomModuleConfigs?: boolean;
  hasBackgroundTasks?: boolean;
  customSettings: string[];
}

export interface AppMarketing {
  targetAudience: string;
  acquisitionChannel: string;
  lowCostTactic: string;
  pitchHook: string;
  pilotOffer: string;
  referralAngle: string;
}

export interface AppDefinition {
  id: string;
  slug?: string;
  name: string;
  type: string;
  version: string;
  color: string;
  iconPath: string;
  logoPath?: string;
  repository: string;
  integrations: AppIntegrations;
  moduleGroups?: ModuleDefinition[];
  modules: ModuleDefinition[];
  universalFeatures?: ModuleDefinition[];
  actions?: string[];
  statistics?: string[];
  customViews?: string[];
  highlights?: string[];
  summary?: string;
  marketing?: AppMarketing;
}
