import React, { useState } from 'react';
import { 
  Compass, 
  Sparkles, 
  Terminal, 
  Bookmark, 
  Sliders, 
  ExternalLink, 
  GraduationCap, 
  FileText, 
  Database,
  Layers,
  Maximize2
} from 'lucide-react';
import { AppId } from '../types';

interface DesktopProps {
  wallpaper: string;
  onOpenApp: (id: AppId) => void;
  onOpenDirectUrl: (url: string) => void;
  onOpenNewNote: () => void;
  onChangeWallpaper: () => void;
  onResetLayout: () => void;
}

export const Desktop: React.FC<DesktopProps> = ({
  wallpaper,
  onOpenApp,
  onOpenDirectUrl,
  onOpenNewNote,
  onChangeWallpaper,
  onResetLayout
}) => {
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);

  const getWallpaperBackground = (wp: string) => {
    switch (wp) {
      case 'obsidian-cyber':
        return 'linear-gradient(135deg, #0b0e13 0%, #111319 50%, #191c21 100%)';
      case 'windows-aurora':
        return 'radial-gradient(ellipse at top left, #1d2025 0%, #0b0e13 70%, #000 100%)';
      case 'deep-space':
        return 'linear-gradient(to bottom, #090a0f 0%, #12151f 50%, #08090d 100%)';
      case 'quantum-grid':
        return 'radial-gradient(circle at 50% 50%, #1a1d24 0%, #0d0f14 100%)';
      default:
        return 'linear-gradient(135deg, #0b0e13 0%, #111319 50%, #191c21 100%)';
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const desktopIcons = [
    {
      id: 'google-navigator' as AppId,
      name: 'Google Navigator',
      icon: <Compass className="w-7 h-7 text-[#4cd7f6]" />,
      action: () => onOpenApp('google-navigator')
    },
    {
      id: 'query-synthesizer' as AppId,
      name: 'Query Synthesizer',
      icon: <Sparkles className="w-7 h-7 text-[#c0c1ff]" />,
      action: () => onOpenApp('query-synthesizer')
    },
    {
      id: 'context-switch' as AppId,
      name: 'ContextSwitch',
      icon: <span className="material-symbols-outlined text-3xl text-[#4edea3]">swap_horiz</span>,
      action: () => onOpenApp('context-switch')
    },
    {
      id: 'research-notes' as AppId,
      name: 'Research Scratchpad',
      icon: <Bookmark className="w-7 h-7 text-[#c0c1ff]" />,
      action: () => onOpenApp('research-notes')
    },
    {
      id: 'terminal' as AppId,
      name: 'Engineer Terminal',
      icon: <Terminal className="w-7 h-7 text-[#4cd7f6]" />,
      action: () => onOpenApp('terminal')
    },
    {
      id: 'scholar-direct',
      name: 'Google Scholar',
      badge: 'Direct',
      icon: <GraduationCap className="w-7 h-7 text-[#4cd7f6]" />,
      action: () => onOpenDirectUrl('https://scholar.google.com')
    },
    {
      id: 'patents-direct',
      name: 'Google Patents',
      badge: 'Direct',
      icon: <FileText className="w-7 h-7 text-[#4edea3]" />,
      action: () => onOpenDirectUrl('https://patents.google.com')
    },
    {
      id: 'dataset-direct',
      name: 'Dataset Search',
      badge: 'Direct',
      icon: <Database className="w-7 h-7 text-[#c0c1ff]" />,
      action: () => onOpenDirectUrl('https://datasetsearch.research.google.com')
    },
    {
      id: 'settings' as AppId,
      name: 'Settings',
      icon: <Sliders className="w-7 h-7 text-[#e1e2ea]" />,
      action: () => onOpenApp('settings')
    }
  ];

  return (
    <div
      onContextMenu={handleContextMenu}
      onClick={() => setContextMenu(null)}
      style={{ background: getWallpaperBackground(wallpaper) }}
      className="absolute inset-0 pb-12 overflow-hidden select-none"
    >
      {/* Subtle Engineering Grid Backdrop */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }}
      />

      {/* Atmospheric Aurora Soft Glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#4cd7f6]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-[#8083ff]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-12 left-1/3 w-80 h-80 bg-[#4edea3]/8 rounded-full blur-3xl pointer-events-none" />

      {/* Top Left Engineering Watermark / Header HUD */}
      <div className="absolute top-4 left-6 pointer-events-none opacity-40 hidden sm:flex flex-col">
        <span className="text-[11px] font-mono-code text-[#4cd7f6] uppercase tracking-widest font-semibold">
          WinEngineer OS v11.4 • High-Yield Research Workstation
        </span>
        <span className="text-[10px] font-mono-code text-[#908fa0]">
          Integrated Google Research Engine &amp; Cognitive Armor
        </span>
      </div>

      {/* Desktop Grid of Icons */}
      <div className="p-4 sm:p-6 grid grid-flow-col grid-rows-6 sm:grid-rows-5 gap-3 w-fit z-10 relative">
        {desktopIcons.map((icon) => (
          <button
            key={icon.id}
            onClick={icon.action}
            onDoubleClick={icon.action}
            className="w-24 h-24 rounded-xl flex flex-col items-center justify-center gap-1.5 p-2 text-center hover:bg-white/10 hover:backdrop-blur-sm border border-transparent hover:border-white/15 active:bg-white/15 transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-[#191c21]/80 border border-[#32353b]/80 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:border-[#4cd7f6]/50 transition-all relative">
              {icon.icon}
              {icon.badge && (
                <span className="absolute -bottom-1 -right-1 text-[8px] font-mono-code bg-[#03b5d3] text-[#003640] px-1 rounded-sm font-bold">
                  {icon.badge}
                </span>
              )}
            </div>
            <span className="text-[11px] font-medium text-[#e1e2ea] group-hover:text-white leading-tight drop-shadow-md truncate w-full">
              {icon.name}
            </span>
          </button>
        ))}
      </div>

      {/* Context Menu on Right Click */}
      {contextMenu && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            top: `${Math.min(contextMenu.y, globalThis.innerHeight - 260)}px`,
            left: `${Math.min(contextMenu.x, globalThis.innerWidth - 220)}px`
          }}
          className="fixed w-52 bg-[#1d2025]/95 backdrop-blur-xl border border-[#32353b] rounded-xl p-1.5 shadow-2xl z-50 text-xs font-mono-code text-[#e1e2ea] space-y-1"
        >
          <button
            onClick={() => {
              onOpenApp('google-navigator');
              setContextMenu(null);
            }}
            className="w-full flex items-center gap-2 p-1.5 rounded-lg hover:bg-[#272a30] text-left text-white"
          >
            <Compass className="w-3.5 h-3.5 text-[#4cd7f6]" />
            <span>Google Navigator</span>
          </button>

          <button
            onClick={() => {
              onOpenApp('query-synthesizer');
              setContextMenu(null);
            }}
            className="w-full flex items-center gap-2 p-1.5 rounded-lg hover:bg-[#272a30] text-left text-white"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#c0c1ff]" />
            <span>Synthesize Dork Query</span>
          </button>

          <button
            onClick={() => {
              onOpenDirectUrl('https://scholar.google.com');
              setContextMenu(null);
            }}
            className="w-full flex items-center gap-2 p-1.5 rounded-lg hover:bg-[#272a30] text-left text-white"
          >
            <GraduationCap className="w-3.5 h-3.5 text-[#4cd7f6]" />
            <span>Launch Google Scholar</span>
          </button>

          <button
            onClick={() => {
              onOpenDirectUrl('https://patents.google.com');
              setContextMenu(null);
            }}
            className="w-full flex items-center gap-2 p-1.5 rounded-lg hover:bg-[#272a30] text-left text-white"
          >
            <FileText className="w-3.5 h-3.5 text-[#4edea3]" />
            <span>Launch Google Patents</span>
          </button>

          <div className="h-px bg-[#272a30] my-1" />

          <button
            onClick={() => {
              onOpenNewNote();
              setContextMenu(null);
            }}
            className="w-full flex items-center gap-2 p-1.5 rounded-lg hover:bg-[#272a30] text-left text-white"
          >
            <Bookmark className="w-3.5 h-3.5 text-[#c0c1ff]" />
            <span>New Research Note</span>
          </button>

          <button
            onClick={() => {
              onOpenApp('terminal');
              setContextMenu(null);
            }}
            className="w-full flex items-center gap-2 p-1.5 rounded-lg hover:bg-[#272a30] text-left text-white"
          >
            <Terminal className="w-3.5 h-3.5 text-[#4cd7f6]" />
            <span>Open Terminal</span>
          </button>

          <div className="h-px bg-[#272a30] my-1" />

          <button
            onClick={() => {
              onChangeWallpaper();
              setContextMenu(null);
            }}
            className="w-full flex items-center gap-2 p-1.5 rounded-lg hover:bg-[#272a30] text-left text-white"
          >
            <Sliders className="w-3.5 h-3.5 text-[#908fa0]" />
            <span>Next Wallpaper</span>
          </button>

          <button
            onClick={() => {
              onResetLayout();
              setContextMenu(null);
            }}
            className="w-full flex items-center gap-2 p-1.5 rounded-lg hover:bg-[#272a30] text-left text-white"
          >
            <Maximize2 className="w-3.5 h-3.5 text-[#908fa0]" />
            <span>Cascade Windows</span>
          </button>
        </div>
      )}
    </div>
  );
};
