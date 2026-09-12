import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  Sparkles, 
  Terminal, 
  Bookmark, 
  Sliders, 
  Search, 
  Shield, 
  Volume2, 
  VolumeX, 
  Wifi, 
  Calendar as CalendarIcon, 
  ExternalLink,
  Layers,
  GraduationCap
} from 'lucide-react';
import { AppId, WindowState } from '../types';
import { soundSynthesizer } from '../services/soundSynthesizer';

interface TaskbarProps {
  windows: WindowState[];
  activeWindowId: AppId | null;
  isStartOpen: boolean;
  isSearchOpen: boolean;
  onToggleStart: () => void;
  onToggleSearch: () => void;
  onAppClick: (id: AppId) => void;
  onOpenQuickScholar: () => void;
}

export const Taskbar: React.FC<TaskbarProps> = ({
  windows,
  activeWindowId,
  isStartOpen,
  isSearchOpen,
  onToggleStart,
  onToggleSearch,
  onAppClick,
  onOpenQuickScholar
}) => {
  const [timeStr, setTimeStr] = useState<string>('');
  const [dateStr, setDateStr] = useState<string>('');
  const [isPlayingSound, setIsPlayingSound] = useState<boolean>(soundSynthesizer.getIsPlaying());
  const [showCalendarFlyout, setShowCalendarFlyout] = useState<boolean>(false);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      );
      setDateStr(
        now.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })
      );
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleToggleSound = () => {
    const state = soundSynthesizer.toggle();
    setIsPlayingSound(state);
  };

  const appsList: { id: AppId; name: string; icon: React.ReactNode }[] = [
    { id: 'google-navigator', name: 'Google Research Navigator', icon: <Compass className="w-5 h-5 text-[#4cd7f6]" /> },
    { id: 'query-synthesizer', name: 'Google Dork Synthesizer', icon: <Sparkles className="w-5 h-5 text-[#c0c1ff]" /> },
    { id: 'context-switch', name: 'ContextSwitch Cognitive Hub', icon: <span className="material-symbols-outlined text-xl text-[#4edea3]">swap_horiz</span> },
    { id: 'research-notes', name: 'Research Scratchpad', icon: <Bookmark className="w-5 h-5 text-[#c0c1ff]" /> },
    { id: 'terminal', name: 'Engineer Terminal', icon: <Terminal className="w-5 h-5 text-[#4cd7f6]" /> },
    { id: 'settings', name: 'System Settings', icon: <Sliders className="w-5 h-5 text-[#e1e2ea]" /> }
  ];

  return (
    <div className="fixed bottom-0 inset-x-0 h-12 z-50 taskbar-glass flex items-center justify-between px-3 select-none">
      {/* Left Section: Quick Widgets / Direct Google Scholar Pill */}
      <div className="flex items-center gap-2 min-w-[120px]">
        <button
          onClick={onOpenQuickScholar}
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#1d2025] hover:bg-[#272a30] text-[#c0c1ff] border border-[#32353b] text-xs font-mono-code transition-colors"
          title="Direct Google Scholar Search"
        >
          <GraduationCap className="w-3.5 h-3.5 text-[#4cd7f6]" />
          <span>Scholar Direct</span>
          <ExternalLink className="w-3 h-3 text-[#908fa0]" />
        </button>
      </div>

      {/* Center Section: Windows 11 Centered App Icons */}
      <div className="flex items-center gap-1 sm:gap-1.5">
        {/* Windows Start Button */}
        <button
          onClick={onToggleStart}
          className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
            isStartOpen
              ? 'bg-[#4cd7f6]/25 shadow-inner'
              : 'hover:bg-white/10 active:scale-95'
          }`}
          title="Start"
        >
          {/* Windows 11 Logo SVG */}
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="8.5" height="8.5" rx="1" fill="#4cd7f6" />
            <rect x="12.5" y="3" width="8.5" height="8.5" rx="1" fill="#03b5d3" />
            <rect x="3" y="12.5" width="8.5" height="8.5" rx="1" fill="#c0c1ff" />
            <rect x="12.5" y="12.5" width="8.5" height="8.5" rx="1" fill="#8083ff" />
          </svg>
        </button>

        {/* Windows Search Bar Button */}
        <button
          onClick={onToggleSearch}
          className={`h-9 px-3 rounded-lg flex items-center gap-2 text-xs text-[#908fa0] bg-[#1d2025]/80 hover:bg-[#272a30] border border-[#32353b] transition-all ${
            isSearchOpen ? 'border-[#4cd7f6] text-white' : ''
          }`}
          title="Search Google & Apps (Win + S)"
        >
          <Search className="w-3.5 h-3.5 text-[#4cd7f6]" />
          <span className="hidden md:inline font-mono-code text-[11px]">Search Google research...</span>
        </button>

        {/* App Icons */}
        {appsList.map((app) => {
          const win = windows.find((w) => w.id === app.id);
          const isOpen = win?.isOpen;
          const isActive = activeWindowId === app.id && isOpen && !win.isMinimized;

          return (
            <button
              key={app.id}
              onClick={() => onAppClick(app.id)}
              className={`relative w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                isActive
                  ? 'bg-white/15 shadow-sm'
                  : isOpen
                  ? 'bg-white/5 hover:bg-white/10'
                  : 'hover:bg-white/10'
              } active:scale-95`}
              title={app.name}
            >
              {app.icon}

              {/* Running indicator dot / line */}
              {isOpen && (
                <span
                  className={`absolute bottom-0.5 rounded-full transition-all ${
                    isActive
                      ? 'w-4 h-1 bg-[#4cd7f6]'
                      : 'w-1.5 h-1 bg-[#908fa0]'
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Right Section: System Tray & Clock */}
      <div className="flex items-center gap-1.5 text-xs text-[#e1e2ea] min-w-[120px] justify-end">
        {/* Cognitive Shield Indicator */}
        <div
          className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-lg bg-[#191c21] border border-[#272a30] text-[10px] font-mono-code text-[#4edea3]"
          title="Cognitive Shield Active (DND + Distraction Blocker)"
        >
          <Shield className="w-3 h-3" />
          <span className="hidden lg:inline">SHIELD</span>
        </div>

        {/* Focus Noise Player button */}
        <button
          onClick={handleToggleSound}
          className={`p-1.5 rounded-lg flex items-center gap-1 transition-colors ${
            isPlayingSound ? 'bg-[#03b5d3]/20 text-[#4cd7f6] border border-[#4cd7f6]/40' : 'hover:bg-white/10 text-[#908fa0]'
          }`}
          title={isPlayingSound ? 'Brown noise playing (Click to pause)' : 'Play 432Hz Brown noise'}
        >
          {isPlayingSound ? (
            <>
              <Volume2 className="w-3.5 h-3.5" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#4cd7f6] animate-ping hidden md:inline"></span>
            </>
          ) : (
            <VolumeX className="w-3.5 h-3.5" />
          )}
        </button>

        {/* Network */}
        <div className="p-1.5 text-[#908fa0] hidden sm:block" title="Connected to Google Research Network">
          <Wifi className="w-3.5 h-3.5" />
        </div>

        {/* Clock & Calendar Trigger */}
        <button
          onClick={() => setShowCalendarFlyout(!showCalendarFlyout)}
          className="flex flex-col items-end px-2 py-1 rounded-lg hover:bg-white/10 text-right leading-none transition-colors"
        >
          <span className="font-mono-code text-xs text-white font-medium">{timeStr || '11:42 AM'}</span>
          <span className="font-mono-code text-[10px] text-[#908fa0] mt-0.5">{dateStr || 'Oct 24, 2026'}</span>
        </button>

        {/* Show Desktop Sliver */}
        <div
          onClick={() => {
            // minimize all or focus
            windows.forEach((w) => {
              if (w.isOpen) onAppClick(w.id);
            });
          }}
          className="w-1 h-8 ml-1 rounded-xs hover:bg-[#4cd7f6]/50 cursor-pointer transition-colors"
          title="Show Desktop"
        />
      </div>

      {/* Calendar Flyout Modal */}
      {showCalendarFlyout && (
        <div className="absolute right-2 bottom-14 w-64 bg-[#1d2025] border border-[#32353b] rounded-xl p-4 shadow-2xl z-50 space-y-3 font-mono-code">
          <div className="flex items-center justify-between border-b border-[#272a30] pb-2">
            <span className="text-sm font-bold text-white">{timeStr}</span>
            <span className="text-xs text-[#4cd7f6]">{dateStr}</span>
          </div>
          <div className="space-y-1.5 text-xs">
            <div className="text-[#908fa0]">Scheduled Deep Work Blocks:</div>
            <div className="p-2 rounded bg-[#0b0e13] border border-[#272a30] space-y-1">
              <div className="text-[#4edea3] font-semibold">09:00 - 11:30: auth-v2 microservice</div>
              <div className="text-[#908fa0]">11:30 - 12:00: Team Standup</div>
              <div className="text-[#4cd7f6] font-semibold">12:30 - 15:15: Deep Research (Scholar)</div>
            </div>
          </div>
          <button
            onClick={() => setShowCalendarFlyout(false)}
            className="w-full py-1 text-center text-xs text-[#908fa0] hover:text-white"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};
