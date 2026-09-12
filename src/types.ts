/**
 * Type definitions for WinEngineer Research OS
 */

export type AppId = 
  | 'google-navigator'
  | 'query-synthesizer'
  | 'context-switch'
  | 'research-notes'
  | 'terminal'
  | 'settings';

export interface WindowState {
  id: AppId;
  title: string;
  iconName: string; // Lucide icon or Material icon identifier
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
}

export interface GooglePortal {
  id: string;
  name: string;
  category: 'literature' | 'patents' | 'datasets' | 'architecture' | 'code' | 'trends';
  description: string;
  directUrl: string;
  queryUrlTemplate: string; // e.g. "https://scholar.google.com/scholar?q={query}"
  badge: string;
  popularQueries: string[];
  icon: string;
}

export interface QueryPreset {
  id: string;
  title: string;
  category: string;
  description: string;
  rawQuery: string;
  domains: string[];
  filetype?: string;
  timeframe?: string;
}

export interface ResearchNote {
  id: string;
  title: string;
  category: string;
  content: string;
  bibtex: string;
  googleLinks: { name: string; url: string }[];
  updatedAt: string;
}

export interface WorkspaceContext {
  id: string;
  name: string;
  branch: string;
  tags: string[];
  status: 'CURRENT' | 'STASHED';
  openFilesCount: number;
  activeShellsCount: number;
  dockerStatus: string;
  linkedSpecsCount: number;
  lastMentalCheckpoint: string;
  tabsCount: number;
  prsCount: number;
  blocker?: string;
}

export interface SessionSnapshot {
  id: string;
  title: string;
  workspace: string;
  timestamp: string;
  heapUsage: string;
  browserTabs: { title: string; url: string; category: string }[];
  ideTerminals: { command: string; pid: string; status: string }[];
  pinnedMemo: string;
  tag: string;
}
