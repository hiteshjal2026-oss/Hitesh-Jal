import React, { useState } from 'react';
import { 
  Compass, 
  Sparkles, 
  Terminal, 
  Bookmark, 
  Sliders, 
  Search, 
  ExternalLink, 
  GraduationCap, 
  FileText, 
  Database, 
  Cpu, 
  GitBranch, 
  TrendingUp, 
  Power, 
  Lock, 
  RotateCcw,
  Globe
} from 'lucide-react';
import { AppId } from '../types';
import { GOOGLE_PORTALS } from '../data/googlePortals';

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenApp: (id: AppId) => void;
  onOpenDirectUrl: (url: string) => void;
}

export const StartMenu: React.FC<StartMenuProps> = ({
  isOpen,
  onClose,
  onOpenApp,
  onOpenDirectUrl
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  if (!isOpen) return null;

  const pinnedApps: { id: AppId; name: string; icon: React.ReactNode; desc: string }[] = [
    { id: 'google-navigator', name: 'Google Navigator', icon: <Compass className="w-5 h-5 text-[#4cd7f6]" />, desc: 'Direct Google research portals' },
    { id: 'query-synthesizer', name: 'Query Synthesizer', icon: <Sparkles className="w-5 h-5 text-[#c0c1ff]" />, desc: 'Bypass SEO with Boolean dorks' },
    { id: 'context-switch', name: 'ContextSwitch Hub', icon: <span className="material-symbols-outlined text-lg text-[#4edea3]">swap_horiz</span>, desc: 'Workspaces & cognitive shield' },
    { id: 'research-notes', name: 'Research Scratchpad', icon: <Bookmark className="w-5 h-5 text-[#c0c1ff]" />, desc: 'BibTeX citations & notes' },
    { id: 'terminal', name: 'Engineer Terminal', icon: <Terminal className="w-5 h-5 text-[#4cd7f6]" />, desc: 'Command-line research launcher' },
    { id: 'settings', name: 'System Settings', icon: <Sliders className="w-5 h-5 text-[#e1e2ea]" />, desc: 'Wallpapers & preferences' },
  ];

  const filteredPortals = GOOGLE_PORTALS.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="fixed bottom-14 left-1/2 -translate-x-1/2 w-[92vw] max-w-[620px] max-h-[82vh] menu-glass rounded-2xl p-5 z-50 flex flex-col shadow-[0_24px_64px_rgba(0,0,0,0.85)] border border-[#32353b] text-[#e1e2ea] overflow-hidden"
    >
      {/* Search Header */}
      <div className="relative mb-4">
        <Search className="w-4 h-4 text-[#908fa0] absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search research tools, direct Google links, or papers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          autoFocus
          className="w-full pl-9 pr-4 py-2.5 bg-[#111319] border border-[#272a30] rounded-xl text-xs sm:text-sm text-white placeholder:text-[#908fa0] focus:outline-none focus:border-[#4cd7f6] font-mono-code"
        />
      </div>

      <div className="flex-1 overflow-y-auto space-y-5 pr-1 scrollbar-thin">
        {/* Pinned Applications */}
        <div>
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-white font-mono-code">
              Pinned Engineering Cockpit
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {pinnedApps.map((app) => (
              <button
                key={app.id}
                onClick={() => {
                  onOpenApp(app.id);
                  onClose();
                }}
                className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#191c21] hover:bg-[#272a30] border border-[#272a30] hover:border-[#464554] text-left transition-all group"
              >
                <div className="w-9 h-9 rounded-lg bg-[#111319] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  {app.icon}
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-semibold text-white truncate">{app.name}</h4>
                  <p className="text-[10px] text-[#908fa0] truncate">{app.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Direct Google Research Webpages */}
        <div>
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#4cd7f6] font-mono-code">
              Direct Google Webpage Links
            </span>
            <span className="text-[10px] font-mono-code text-[#908fa0]">One-Click Launch</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {filteredPortals.slice(0, 6).map((portal) => (
              <button
                key={portal.id}
                onClick={() => {
                  onOpenDirectUrl(portal.directUrl);
                  onClose();
                }}
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#191c21] hover:bg-[#272a30] border border-[#272a30] hover:border-[#4cd7f6]/40 text-left transition-all group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-[#0b0e13] flex items-center justify-center text-[#4cd7f6] shrink-0">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-medium text-white group-hover:text-[#4cd7f6] transition-colors truncate block">
                      {portal.name}
                    </span>
                    <span className="text-[10px] font-mono-code text-[#908fa0] truncate block">
                      {new URL(portal.directUrl).hostname}
                    </span>
                  </div>
                </div>
                <span className="text-[9px] font-mono-code px-1.5 py-0.5 rounded bg-[#272a30] text-[#c0c1ff] shrink-0">
                  {portal.badge}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Recommended & Recent Stashes */}
        <div>
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-white font-mono-code">
              Recent Research Checkpoints
            </span>
          </div>

          <div className="space-y-1.5">
            {[
              {
                title: 'FlashAttention-3 Microarchitecture Notes',
                meta: 'auth-v2-microservice • 26m ago',
                app: 'research-notes' as AppId
              },
              {
                title: 'Prior Art: High Throughput Raft Compaction',
                meta: 'Google Patents US20210342381A1 • Yesterday',
                app: 'research-notes' as AppId
              }
            ].map((rec, idx) => (
              <button
                key={idx}
                onClick={() => {
                  onOpenApp(rec.app);
                  onClose();
                }}
                className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-[#191c21] text-left transition-colors"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Bookmark className="w-4 h-4 text-[#c0c1ff] shrink-0" />
                  <div className="min-w-0">
                    <div className="text-xs font-medium text-white truncate">{rec.title}</div>
                    <div className="text-[10px] font-mono-code text-[#908fa0] truncate">{rec.meta}</div>
                  </div>
                </div>
                <span className="text-[10px] font-mono-code text-[#4cd7f6]">Open</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Profile & System Controls */}
      <div className="mt-4 pt-3 border-t border-[#272a30] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOfobIEVID7O_3wUteUVPY4KMpAChZJk0gLxnPA-QitUthVjW51LfxwdKTMyq5LOKPz5fKllhhfQO-uHdV4yUkukBqyCYjz_SNsFIlijocd4pbgj2ecxszCvymn8MAEo7p_wiewMZeeJNfXUXdcnSSHoPWj_l7bdV9PaR0ubR7klaTCmZhbC8JquUKLDApSEyY36GhgSKXSGEiWTD39e5u-y22x-qFX89MtuO7Q29DfqQcUamcCQpWCA"
            alt="Engineer Profile"
            className="w-8 h-8 rounded-full object-cover border border-[#4cd7f6]/40"
          />
          <div>
            <div className="text-xs font-semibold text-white">Hitesh J.</div>
            <div className="text-[10px] font-mono-code text-[#4edea3]">Staff Systems Engineer</div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => alert('Workstation Locked. Press any key to resume.')}
            className="p-2 rounded-lg hover:bg-white/10 text-[#908fa0] hover:text-white transition-colors"
            title="Lock Session"
          >
            <Lock className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              if (confirm('Reboot Engineer OS session?')) {
                window.location.reload();
              }
            }}
            className="p-2 rounded-lg hover:bg-white/10 text-[#908fa0] hover:text-white transition-colors"
            title="Restart OS"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-[#93000a] text-[#908fa0] hover:text-white transition-colors"
            title="Close Start Menu"
          >
            <Power className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
