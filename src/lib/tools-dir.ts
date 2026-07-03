import type { ToolConfig } from '../types';

export interface ToolsDirEntry {
  href: string;
  label: string;
  desc: string;
  icon?: string;
  status: 'Live' | 'Soon' | 'Planned';
}

export function mapToolToEntry(
  t: ToolConfig,
  getName: (id: string) => string,
  getDesc: (id: string) => string,
): ToolsDirEntry {
  return {
    href: t.path,
    label: getName(t.id),
    desc: getDesc(t.id),
    icon: t.icon,
    status: t.status === 'live' ? 'Live' as const : t.status === 'coming-soon' ? 'Soon' as const : 'Planned' as const,
  };
}

export function getAllTools(
  compressTools: ToolsDirEntry[],
  tools: ToolConfig[],
  getName: (id: string) => string,
  getDesc: (id: string) => string,
): ToolsDirEntry[] {
  const dynamic = tools.filter((t) => t.id !== 'compressor').map((t) => mapToolToEntry(t, getName, getDesc));
  return [...compressTools, ...dynamic];
}

export function getCompressTools(compressTools: ToolsDirEntry[]): ToolsDirEntry[] {
  return compressTools;
}

export function getToolsByCategory(
  cat: string,
  tools: ToolConfig[],
  getName: (id: string) => string,
  getDesc: (id: string) => string,
): ToolsDirEntry[] {
  return tools.filter((t) => t.id !== 'compressor' && t.category === cat).map((t) => mapToolToEntry(t, getName, getDesc));
}
