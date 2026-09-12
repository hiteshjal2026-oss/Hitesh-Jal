/**
 * WinEngineer Research OS
 * Desktop workspace for engineers to accelerate research with instant Google Scholar, Patents, Datasets, and advanced query synthesis.
 */

import React, { useState, useEffect } from 'react';
import { AppId, WindowState } from './types';
import { Desktop } from './components/Desktop';
import { Taskbar } from './components/Taskbar';
import { StartMenu } from './components/StartMenu';
import { SearchFlyout } from './components/SearchFlyout';
import { WindowFrame } from './components/WindowFrame';

// Apps
import { GoogleNavigatorApp } from './components/apps/GoogleNavigatorApp';
import { QuerySynthesizerApp } from './components/apps/QuerySynthesizerApp';
import { ContextSwitchApp } from './components/apps/ContextSwitchApp';
import { ResearchNotesApp } from './components/apps/ResearchNotesApp';
import { TerminalApp } from './components/apps/TerminalApp';
import { SettingsApp } from './components/apps/SettingsApp';

export default function App() {
  const [wallpaper, setWallpaper] = useState<string>('obsidian-cyber');
  const [isStartOpen, setIsStartOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [openLinksInNewTab, setOpenLinksInNewTab] = useState<boolean>(true);
  const [activeWindowId, setActiveWindowId] = useState<AppId | null>('google-navigator');
  const [pinnedNotesLinks, setPinnedNotesLinks] = useState<{ name: string; url: string }[]>([
    { name: 'Google Scholar', url: 'https://scholar.google.com' },
    { name: 'Google Patents', url: 'https://patents.google.com' }
  ]);

  // Initial Window States
  const [windows, setWindows] = useState<WindowState[]>([
    {
      id: 'google-navigator',
      title: 'Google Research Navigator — Direct Portals',
      iconName: 'Compass',
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      position: { x: 40, y: 30 },
      size: { width: 880, height: 580 },
      zIndex: 10
    },
    {
      id: 'query-synthesizer',
      title: 'Google Dork & Boolean Query Synthesizer',
      iconName: 'Sparkles',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      position: { x: 120, y: 60 },
      size: { width: 860, height: 580 },
      zIndex: 11
    },
    {
      id: 'context-switch',
      title: 'ContextSwitch — Cognitive Focus & Session Hub',
      iconName: 'swap_horiz',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      position: { x: 80, y: 40 },
      size: { width: 780, height: 560 },
      zIndex: 12
    },
    {
      id: 'research-notes',
      title: 'Research Scratchpad & BibTeX Records',
      iconName: 'Bookmark',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      position: { x: 160, y: 70 },
      size: { width: 800, height: 540 },
      zIndex: 13
    },
    {
      id: 'terminal',
      title: 'Engineer Research Terminal',
      iconName: 'Terminal',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      position: { x: 200, y: 90 },
      size: { width: 680, height: 440 },
      zIndex: 14
    },
    {
      id: 'settings',
      title: 'System Settings',
      iconName: 'Sliders',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      position: { x: 240, y: 80 },
      size: { width: 620, height: 480 },
      zIndex: 15
    }
  ]);

  // Handle Global Hotkeys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+K or Win+S -> Search
      if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 's')) {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
        setIsStartOpen(false);
      }
      // Escape -> close flyouts
      if (e.key === 'Escape') {
        setIsStartOpen(false);
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Bring window to front
  const bringToFront = (id: AppId) => {
    setActiveWindowId(id);
    setWindows((prev) => {
      const maxZ = Math.max(...prev.map((w) => w.zIndex), 10);
      return prev.map((w) =>
        w.id === id ? { ...w, zIndex: maxZ + 1, isMinimized: false } : w
      );
    });
  };

  // Open App
  const openApp = (id: AppId) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id
          ? {
              ...w,
              isOpen: true,
              isMinimized: false,
              zIndex: Math.max(...prev.map((x) => x.zIndex), 10) + 1
            }
          : w
      )
    );
    setActiveWindowId(id);
    setIsStartOpen(false);
    setIsSearchOpen(false);
  };

  // Toggle Window Minimize or Open
  const handleTaskbarAppClick = (id: AppId) => {
    const win = windows.find((w) => w.id === id);
    if (!win) return;

    if (!win.isOpen) {
      openApp(id);
    } else if (win.isMinimized) {
      bringToFront(id);
    } else if (activeWindowId === id) {
      // Minimize if currently focused
      setWindows((prev) =>
        prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))
      );
      const remaining = windows.filter((w) => w.isOpen && !w.isMinimized && w.id !== id);
      setActiveWindowId(remaining.length > 0 ? remaining[0].id : null);
    } else {
      bringToFront(id);
    }
  };

  // Window operations
  const closeWindow = (id: AppId) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isOpen: false, isMinimized: false } : w))
    );
    if (activeWindowId === id) {
      const remaining = windows.filter((w) => w.isOpen && w.id !== id && !w.isMinimized);
      setActiveWindowId(remaining.length > 0 ? remaining[0].id : null);
    }
  };

  const minimizeWindow = (id: AppId) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))
    );
    if (activeWindowId === id) {
      const remaining = windows.filter((w) => w.isOpen && !w.isMinimized && w.id !== id);
      setActiveWindowId(remaining.length > 0 ? remaining[0].id : null);
    }
  };

  const toggleMaximizeWindow = (id: AppId) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMaximized: !w.isMaximized } : w))
    );
  };

  const updateWindowPosition = (id: AppId, x: number, y: number) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, position: { x, y } } : w))
    );
  };

  const updateWindowSize = (id: AppId, width: number, height: number) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, size: { width, height } } : w))
    );
  };

  const snapWindow = (id: AppId, snapPos: 'left' | 'right' | 'full') => {
    const screenW = window.innerWidth;
    const screenH = window.innerHeight - 48; // taskbar
    if (snapPos === 'full') {
      setWindows((prev) =>
        prev.map((w) => (w.id === id ? { ...w, isMaximized: true } : w))
      );
    } else if (snapPos === 'left') {
      setWindows((prev) =>
        prev.map((w) =>
          w.id === id
            ? {
                ...w,
                isMaximized: false,
                position: { x: 0, y: 0 },
                size: { width: Math.floor(screenW / 2), height: screenH }
              }
            : w
        )
      );
    } else if (snapPos === 'right') {
      setWindows((prev) =>
        prev.map((w) =>
          w.id === id
            ? {
                ...w,
                isMaximized: false,
                position: { x: Math.floor(screenW / 2), y: 0 },
                size: { width: Math.floor(screenW / 2), height: screenH }
              }
            : w
        )
      );
    }
    bringToFront(id);
  };

  const handleOpenDirectUrl = (url: string) => {
    window.open(url, openLinksInNewTab ? '_blank' : '_self');
  };

  const handleSendToNotes = (title: string, url: string) => {
    setPinnedNotesLinks((prev) => [{ name: title, url }, ...prev]);
    openApp('research-notes');
  };

  const handleNextWallpaper = () => {
    const list = ['obsidian-cyber', 'windows-aurora', 'deep-space', 'quantum-grid'];
    const curIdx = list.indexOf(wallpaper);
    const nextWp = list[(curIdx + 1) % list.length];
    setWallpaper(nextWp);
  };

  const handleResetLayout = () => {
    setWindows((prev) =>
      prev.map((w, idx) => ({
        ...w,
        isOpen: idx < 2,
        isMinimized: false,
        isMaximized: false,
        position: { x: 40 + idx * 30, y: 30 + idx * 30 }
      }))
    );
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden select-none bg-[#0b0e13]">
      {/* Windows Desktop Canvas */}
      <Desktop
        wallpaper={wallpaper}
        onOpenApp={openApp}
        onOpenDirectUrl={handleOpenDirectUrl}
        onOpenNewNote={() => openApp('research-notes')}
        onChangeWallpaper={handleNextWallpaper}
        onResetLayout={handleResetLayout}
      />

      {/* Render All Open Windows */}
      {windows.map((win) => {
        const isActive = activeWindowId === win.id;

        return (
          <WindowFrame
            key={win.id}
            window={win}
            isActive={isActive}
            onFocus={() => bringToFront(win.id)}
            onClose={() => closeWindow(win.id)}
            onMinimize={() => minimizeWindow(win.id)}
            onToggleMaximize={() => toggleMaximizeWindow(win.id)}
            onUpdatePosition={(x, y) => updateWindowPosition(win.id, x, y)}
            onUpdateSize={(w, h) => updateWindowSize(win.id, w, h)}
            onSnap={(snapPos) => snapWindow(win.id, snapPos)}
          >
            {win.id === 'google-navigator' && (
              <GoogleNavigatorApp
                onOpenQuerySynthesizer={() => openApp('query-synthesizer')}
                onSendToNotes={handleSendToNotes}
              />
            )}
            {win.id === 'query-synthesizer' && (
              <QuerySynthesizerApp
                onSaveToNotes={(title, query) => handleSendToNotes(title, `https://www.google.com/search?q=${encodeURIComponent(query)}`)}
              />
            )}
            {win.id === 'context-switch' && <ContextSwitchApp />}
            {win.id === 'research-notes' && (
              <ResearchNotesApp pinnedLinks={pinnedNotesLinks} />
            )}
            {win.id === 'terminal' && (
              <TerminalApp onOpenApp={openApp} />
            )}
            {win.id === 'settings' && (
              <SettingsApp
                currentWallpaper={wallpaper}
                onSelectWallpaper={setWallpaper}
                openLinksInNewTab={openLinksInNewTab}
                onToggleLinksInNewTab={setOpenLinksInNewTab}
              />
            )}
          </WindowFrame>
        );
      })}

      {/* Start Menu Popup */}
      <StartMenu
        isOpen={isStartOpen}
        onClose={() => setIsStartOpen(false)}
        onOpenApp={openApp}
        onOpenDirectUrl={handleOpenDirectUrl}
      />

      {/* Search / Run Flyout Popup */}
      <SearchFlyout
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onOpenApp={openApp}
      />

      {/* Windows 11 Taskbar */}
      <Taskbar
        windows={windows}
        activeWindowId={activeWindowId}
        isStartOpen={isStartOpen}
        isSearchOpen={isSearchOpen}
        onToggleStart={() => {
          setIsStartOpen((prev) => !prev);
          setIsSearchOpen(false);
        }}
        onToggleSearch={() => {
          setIsSearchOpen((prev) => !prev);
          setIsStartOpen(false);
        }}
        onAppClick={handleTaskbarAppClick}
        onOpenQuickScholar={() => handleOpenDirectUrl('https://scholar.google.com')}
      />
    </div>
  );
}
