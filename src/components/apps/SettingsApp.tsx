import React from 'react';
import { Sliders, Monitor, Volume2, ShieldCheck, Sparkles } from 'lucide-react';

interface SettingsAppProps {
  currentWallpaper: string;
  onSelectWallpaper: (wp: string) => void;
  openLinksInNewTab: boolean;
  onToggleLinksInNewTab: (val: boolean) => void;
}

export const SettingsApp: React.FC<SettingsAppProps> = ({
  currentWallpaper,
  onSelectWallpaper,
  openLinksInNewTab,
  onToggleLinksInNewTab
}) => {
  const wallpapers = [
    {
      id: 'obsidian-cyber',
      name: 'Obsidian Cyber Circuit',
      gradient: 'linear-gradient(135deg, #0b0e13 0%, #111319 50%, #191c21 100%)',
      previewBorder: '#4cd7f6'
    },
    {
      id: 'windows-aurora',
      name: 'Windows Midnight Aurora',
      gradient: 'radial-gradient(ellipse at top left, #1d2025 0%, #0b0e13 70%, #000 100%)',
      previewBorder: '#c0c1ff'
    },
    {
      id: 'deep-space',
      name: 'Deep Nebula Matrix',
      gradient: 'linear-gradient(to bottom, #090a0f 0%, #12151f 50%, #08090d 100%)',
      previewBorder: '#4edea3'
    },
    {
      id: 'quantum-grid',
      name: 'Quantum High-Contrast Grid',
      gradient: 'radial-gradient(circle at 50% 50%, #1a1d24 0%, #0d0f14 100%)',
      previewBorder: '#8083ff'
    }
  ];

  return (
    <div className="flex flex-col h-full bg-[#111319] text-[#e1e2ea] p-4 sm:p-6 overflow-y-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white">System &amp; Research Settings</h1>
        <p className="text-xs text-[#908fa0] mt-0.5">
          Configure engineer desktop aesthetics, Google link behavior, and audio focus triggers.
        </p>
      </div>

      {/* Wallpapers Section */}
      <div className="p-4 rounded-xl bg-[#191c21] border border-[#272a30] space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase text-[#4cd7f6] font-mono-code">
          <Monitor className="w-4 h-4" />
          <span>Desktop Theme &amp; Atmosphere</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {wallpapers.map((wp) => (
            <button
              key={wp.id}
              onClick={() => onSelectWallpaper(wp.id)}
              className={`flex flex-col p-2 rounded-xl border text-left transition-all ${
                currentWallpaper === wp.id
                  ? 'border-[#4cd7f6] bg-[#1d2025] shadow-md'
                  : 'border-[#272a30] hover:border-[#464554] bg-[#0b0e13]'
              }`}
            >
              <div
                className="w-full h-16 rounded-lg mb-2 border border-white/5 relative overflow-hidden"
                style={{ background: wp.gradient }}
              >
                {currentWallpaper === wp.id && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#4cd7f6]"></span>
                )}
              </div>
              <span className="text-xs font-medium text-white truncate">{wp.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Link Behavior */}
      <div className="p-4 rounded-xl bg-[#191c21] border border-[#272a30] space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase text-[#c0c1ff] font-mono-code">
          <Sparkles className="w-4 h-4" />
          <span>Research Workflow Preferences</span>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-[#0b0e13] border border-[#272a30]">
            <div>
              <span className="text-xs font-medium text-white block">Open Google Portals in New Browser Tabs</span>
              <span className="text-[11px] text-[#908fa0]">Ensures full Google search features, bibtex downloads, and PDF previews.</span>
            </div>
            <button
              type="button"
              onClick={() => onToggleLinksInNewTab(!openLinksInNewTab)}
              className={`w-10 h-6 p-0.5 rounded-full transition-colors flex items-center ${
                openLinksInNewTab ? 'bg-[#4cd7f6] justify-end' : 'bg-[#32353b] justify-start'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-[#0b0e13] shadow-sm"></span>
            </button>
          </div>
        </div>
      </div>

      {/* About Box */}
      <div className="p-4 rounded-xl bg-[#191c21] border border-[#272a30] space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono-code text-white">
          <ShieldCheck className="w-4 h-4 text-[#4edea3]" />
          <span>WinEngineer Research OS 11.4 Enterprise</span>
        </div>
        <p className="text-xs text-[#908fa0] leading-relaxed">
          Engineered for developers and researchers to minimize cognitive distraction and obtain instant direct links to Google Scholar, Google Patents, Google Dataset Search, and Cloud Architecture documents.
        </p>
      </div>
    </div>
  );
};
