import React, { useState, useEffect, useRef } from 'react';
import { soundSynthesizer } from '../../services/soundSynthesizer';
import { 
  Terminal, 
  History, 
  Bot, 
  LineChart, 
  Shield, 
  Play, 
  Pause, 
  Sliders, 
  Check, 
  CheckCircle, 
  Copy, 
  FolderGit2, 
  Cpu, 
  Calendar, 
  GitFork, 
  Clock, 
  Mic, 
  Sparkles, 
  ExternalLink,
  Volume2,
  VolumeX,
  Plus
} from 'lucide-react';

export const ContextSwitchApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'workspaces' | 'restore' | 'automate' | 'analytics'>('workspaces');
  
  // Workspaces state
  const [isShieldActive, setIsShieldActive] = useState<boolean>(true);
  const [isStashed, setIsStashed] = useState<boolean>(false);
  const [commandInput, setCommandInput] = useState<string>('');
  const [commandFeedback, setCommandFeedback] = useState<string | null>(null);

  // Sound Synthesizer state
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(soundSynthesizer.getIsPlaying());
  const [volume, setVolume] = useState<number>(60);
  const [spectrumHeights, setSpectrumHeights] = useState<number[]>([15, 35, 60, 85, 50, 30, 70, 40]);

  // Restore state
  const [autoStashOnQuit, setAutoStashOnQuit] = useState<boolean>(true);
  const [quickNote, setQuickNote] = useState<string>('');
  const [restoreStatus, setRestoreStatus] = useState<string | null>(null);
  const [exportCopied, setExportCopied] = useState<boolean>(false);

  // Automate state
  const [recipes, setRecipes] = useState<{ [id: string]: boolean }>({
    backendSwitch: true,
    calendarStash: true,
    branchSwap: true,
    flowBreak: false
  });
  const [selectedTrigger, setSelectedTrigger] = useState<string>('ctx:switched');

  // Analytics state
  const [shieldScheduled, setShieldScheduled] = useState<boolean>(false);
  const [dismissedInsight, setDismissedInsight] = useState<boolean>(false);

  // Spectrum animation loop for visualizer
  useEffect(() => {
    let animationFrameId: number;
    const updateSpectrum = () => {
      if (isPlayingAudio) {
        setSpectrumHeights([
          15 + Math.random() * 25,
          30 + Math.random() * 45,
          50 + Math.random() * 45,
          70 + Math.random() * 30,
          45 + Math.random() * 40,
          25 + Math.random() * 35,
          65 + Math.random() * 35,
          35 + Math.random() * 30
        ]);
      } else {
        setSpectrumHeights([10, 15, 20, 25, 20, 15, 20, 15]);
      }
      animationFrameId = requestAnimationFrame(updateSpectrum);
    };
    animationFrameId = requestAnimationFrame(updateSpectrum);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPlayingAudio]);

  const toggleSound = () => {
    const newState = soundSynthesizer.toggle();
    setIsPlayingAudio(newState);
  };

  const handleVolumeChange = (newVal: number) => {
    setVolume(newVal);
    soundSynthesizer.setVolume(newVal / 100);
  };

  const handleStash = () => {
    setIsStashed(true);
    setTimeout(() => setIsStashed(false), 2400);
  };

  const handleRestore = () => {
    setRestoreStatus('reconstituting');
    setTimeout(() => {
      setRestoreStatus('restored');
      setTimeout(() => setRestoreStatus(null), 2500);
    }, 1800);
  };

  const handleExport = () => {
    const text = `# Context Snapshot: auth-v2-microservice
Timestamp: 11:30 AM
Heap: 480MB
Branch: feat/oauth2-pkce
Tabs:
- GitHub PR #412
- RFC 7636 PKCE spec
- Internal Auth Docs
- Linear CS-89
Terminals:
- cargo watch -x run (PID: 40912)
- redis-cli monitor
Memo: Left off debugging token exchange 401 error.`;
    navigator.clipboard.writeText(text);
    setExportCopied(true);
    setTimeout(() => setExportCopied(false), 2000);
  };

  const handleRunCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commandInput.trim()) return;
    const cmd = commandInput.trim();
    if (cmd.startsWith('/stash')) {
      handleStash();
      setCommandFeedback('Context stashed into time-lock buffer.');
    } else if (cmd.includes('switch')) {
      setCommandFeedback(`Switched context to: ${cmd.replace('switch', '').trim() || 'default'}`);
    } else {
      setCommandFeedback(`Executed context trigger: ${cmd}`);
    }
    setCommandInput('');
    setTimeout(() => setCommandFeedback(null), 3000);
  };

  return (
    <div className="flex flex-col h-full bg-[#111319] text-[#e1e2ea] overflow-hidden">
      {/* Top Header */}
      <div className="h-14 px-4 bg-[#111319]/90 border-b border-[#272a30] flex items-center justify-between shrink-0 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#191c21] border border-[#272a30] flex items-center justify-center text-[#4cd7f6] font-bold text-sm">
            <span className="material-symbols-outlined text-lg">swap_horiz</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-white">ContextSwitch</span>
              <span className="text-[10px] font-mono-code px-1.5 py-0.5 rounded bg-[#272a30] text-[#c0c1ff] uppercase">
                {activeTab}
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-pulse"></span>
              <span className="text-[10px] font-mono-code text-[#4edea3] uppercase">
                auth-microservice
              </span>
            </div>
          </div>
        </div>

        {/* Tab Navigation Pill Bar */}
        <div className="flex items-center bg-[#191c21] p-1 rounded-xl border border-[#272a30]">
          <button
            onClick={() => setActiveTab('workspaces')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'workspaces'
                ? 'bg-[#c0c1ff] text-[#1000a9] shadow-sm font-semibold'
                : 'text-[#908fa0] hover:text-white'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Workspaces</span>
          </button>

          <button
            onClick={() => setActiveTab('restore')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'restore'
                ? 'bg-[#c0c1ff] text-[#1000a9] shadow-sm font-semibold'
                : 'text-[#908fa0] hover:text-white'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Restore</span>
          </button>

          <button
            onClick={() => setActiveTab('automate')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'automate'
                ? 'bg-[#c0c1ff] text-[#1000a9] shadow-sm font-semibold'
                : 'text-[#908fa0] hover:text-white'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Automate</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'analytics'
                ? 'bg-[#c0c1ff] text-[#1000a9] shadow-sm font-semibold'
                : 'text-[#908fa0] hover:text-white'
            }`}
          >
            <LineChart className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Analytics</span>
          </button>
        </div>
      </div>

      {/* Main Body per Tab */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        {/* TAB 1: WORKSPACES */}
        {activeTab === 'workspaces' && (
          <div className="max-w-4xl mx-auto space-y-5 select-none">
            {/* Active Focus Deck (Hero Card) */}
            <div className="relative overflow-hidden rounded-xl bg-[#272a30] text-[#e1e2ea] shadow-xl p-4 sm:p-5 flex flex-col gap-4 border border-[#32353b]">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#00885d]/30 text-[#4edea3] text-[10px] font-mono-code uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-pulse"></span>
                    Live Context
                  </span>
                  <span className="text-[11px] font-mono-code text-[#908fa0]">pid: 29401</span>
                </div>
                <div className="flex items-center gap-1.5 bg-[#0b0e13] px-2.5 py-1 rounded-lg border border-[#32353b]">
                  <span className="material-symbols-outlined text-[#4edea3] text-[15px]">psychology</span>
                  <span className="text-[11px] font-mono-code text-[#4edea3] font-semibold">FLOW: 94%</span>
                </div>
              </div>

              <div>
                <div className="flex items-baseline justify-between gap-2">
                  <h1 className="text-lg sm:text-xl font-bold text-[#c0c1ff] tracking-tight">
                    auth-v2-microservice
                  </h1>
                  <span className="text-xs font-mono-code text-[#4cd7f6] font-medium">
                    1h 42m deep focus
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#c7c4d7] mt-1 font-mono-code">
                  <span className="text-[#4cd7f6]">feat/oauth2-pkce</span>
                  <span className="text-[#464554]">•</span>
                  <span className="text-[#4edea3]">docker: running</span>
                </div>
              </div>

              {/* Cognitive load equilibrium */}
              <div className="flex flex-col gap-1.5 bg-[#0b0e13]/80 p-2.5 rounded-lg border border-[#272a30]">
                <div className="flex justify-between items-center text-[10px] font-mono-code">
                  <span className="text-[#908fa0]">COGNITIVE LOAD EQUILIBRIUM</span>
                  <span className="text-[#4edea3] font-medium">OPTIMAL BRAIN STATE</span>
                </div>
                <div className="h-1.5 w-full bg-[#1d2025] rounded-full overflow-hidden flex gap-0.5">
                  <div className="h-full bg-[#4cd7f6] w-2/5 rounded-full"></div>
                  <div className="h-full bg-[#4edea3] w-2/5 rounded-full"></div>
                  <div className="h-full bg-[#03b5d3] w-1/5 rounded-full opacity-60"></div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center gap-3 pt-1">
                <button
                  onClick={handleStash}
                  className={`flex-1 h-10 px-4 rounded-lg font-medium text-xs sm:text-sm flex items-center justify-center gap-2 active:scale-95 transition-all shadow-md ${
                    isStashed
                      ? 'bg-[#4edea3] text-[#003824]'
                      : 'bg-[#c0c1ff] hover:bg-[#e1e0ff] text-[#1000a9]'
                  }`}
                >
                  {isStashed ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Context Stashed!</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-base">move_to_inbox</span>
                      <span>Stash &amp; Switch</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setIsShieldActive(!isShieldActive)}
                  className="h-10 px-3.5 rounded-lg bg-[#0b0e13] border border-[#32353b] text-[#4cd7f6] flex items-center gap-2 active:bg-[#1d2025] transition-colors"
                >
                  <Shield className={`w-4 h-4 ${isShieldActive ? 'text-[#4edea3]' : 'text-[#908fa0]'}`} />
                  <div className="flex flex-col text-left">
                    <span className="text-[9px] font-mono-code text-white uppercase leading-none">SHIELD</span>
                    <span className={`text-[10px] font-mono-code font-bold leading-tight ${isShieldActive ? 'text-[#4edea3]' : 'text-[#908fa0]'}`}>
                      {isShieldActive ? 'ACTIVE' : 'PAUSED'}
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-2.5">
              <div className="p-3 rounded-xl bg-[#191c21] border border-[#272a30]">
                <span className="text-[10px] font-mono-code uppercase text-[#908fa0] block">Active</span>
                <span className="text-xl font-bold text-white block mt-0.5">4</span>
                <span className="text-[10px] font-mono-code text-[#4cd7f6]">workspaces</span>
              </div>
              <div className="p-3 rounded-xl bg-[#191c21] border border-[#272a30]">
                <span className="text-[10px] font-mono-code uppercase text-[#908fa0] block">Stashed</span>
                <span className="text-xl font-bold text-white block mt-0.5">18</span>
                <span className="text-[10px] font-mono-code text-[#c0c1ff]">tabs / PRs</span>
              </div>
              <div className="p-3 rounded-xl bg-[#191c21] border border-[#272a30]">
                <span className="text-[10px] font-mono-code uppercase text-[#908fa0] block">Shielded</span>
                <span className="text-xl font-bold text-[#4edea3] block mt-0.5">0</span>
                <span className="text-[10px] font-mono-code text-[#4edea3]">interrupts</span>
              </div>
            </div>

            {/* Active & Pinned Hub */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-mono-code uppercase text-white font-semibold">
                  <FolderGit2 className="w-4 h-4 text-[#c0c1ff]" />
                  <span>Active &amp; Pinned Hub</span>
                </div>
                <span className="text-[10px] font-mono-code text-[#908fa0]">SORT: PRIORITY</span>
              </div>

              {/* Workspace Item 1: Current */}
              <div className="p-4 rounded-xl bg-[#1d2025] border border-[#32353b] space-y-3 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#4edea3]"></span>
                      <h3 className="text-sm font-bold text-white">auth-v2-microservice</h3>
                    </div>
                    <span className="text-[11px] font-mono-code text-[#4cd7f6] mt-0.5 block">
                      git::(feat/oauth2-pkce)
                    </span>
                  </div>
                  <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-[#00885d]/30 text-[#4edea3]">
                    CURRENT
                  </span>
                </div>

                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-[#32353b] text-[#c0c1ff]">#backend</span>
                  <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-[#32353b] text-[#4cd7f6]">#security</span>
                  <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-[#32353b] text-[#4edea3]">#rust</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-[#0b0e13]/60 p-2.5 rounded-lg text-[11px] font-mono-code text-[#c7c4d7]">
                  <div>6 Open Files</div>
                  <div>2 Shells (Active)</div>
                  <div>docker-compose UP</div>
                  <div>4 Linked Specs</div>
                </div>
              </div>

              {/* Workspace Item 2: Mobile Checkout */}
              <div className="p-4 rounded-xl bg-[#191c21] border border-[#272a30] space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#908fa0]"></span>
                      <h3 className="text-sm font-semibold text-white">mobile-checkout-redesign</h3>
                    </div>
                    <span className="text-[11px] font-mono-code text-[#908fa0] mt-0.5 block">Paused 3h ago</span>
                  </div>
                  <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-[#272a30] text-[#908fa0]">
                    STASHED
                  </span>
                </div>
                <div className="bg-[#0b0e13]/40 p-2.5 rounded-lg flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] font-mono-code text-[#908fa0] uppercase block">LAST MENTAL CHECKPOINT</span>
                    <span className="text-white text-xs">"Handling 3D secure fallback flow"</span>
                  </div>
                  <span className="text-xs font-mono-code text-[#4cd7f6]">14 Tabs • 3 PRs</span>
                </div>
              </div>
            </div>

            {/* Terminal Command Injection Bar */}
            <form onSubmit={handleRunCommand} className="flex items-center gap-2 p-2.5 bg-[#0b0e13] border border-[#272a30] rounded-xl">
              <span className="font-mono-code text-sm text-[#4cd7f6] font-bold pl-1">&gt;</span>
              <input
                type="text"
                value={commandInput}
                onChange={(e) => setCommandInput(e.target.value)}
                placeholder="switch ctx:branch-name or /stash"
                className="bg-transparent flex-1 text-xs font-mono-code text-white placeholder:text-[#464554] focus:outline-none"
              />
              <span className="px-1.5 py-0.5 rounded bg-[#1d2025] text-[#908fa0] text-[10px] font-mono-code">
                Enter
              </span>
            </form>
            {commandFeedback && (
              <div className="text-xs font-mono-code text-[#4edea3] px-2">
                ✓ {commandFeedback}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: RESTORE (Session Reconstitution Engine) */}
        {activeTab === 'restore' && (
          <div className="max-w-4xl mx-auto space-y-5 select-none">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4cd7f6] text-lg">restore_page</span>
                <h2 className="text-sm font-mono-code uppercase tracking-wider text-[#4cd7f6] font-semibold">
                  Session Reconstitution Engine
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono-code text-[#908fa0]">Auto-stash on quit</span>
                <button
                  type="button"
                  onClick={() => setAutoStashOnQuit(!autoStashOnQuit)}
                  className={`w-8 h-4 rounded-full p-0.5 transition-colors flex items-center ${
                    autoStashOnQuit ? 'bg-[#00885d] justify-end' : 'bg-[#32353b] justify-start'
                  }`}
                >
                  <span className="w-3 h-3 rounded-full bg-white shadow-sm"></span>
                </button>
              </div>
            </div>

            {/* Quick State Recorder Bar */}
            <div className="flex items-center gap-2 bg-[#191c21] p-2 rounded-xl border border-[#272a30]">
              <span className="font-mono-code text-[#c0c1ff] pl-2">&gt;</span>
              <input
                type="text"
                placeholder="Capture current state note..."
                value={quickNote}
                onChange={(e) => setQuickNote(e.target.value)}
                className="flex-1 bg-transparent text-xs text-white placeholder:text-[#464554] focus:outline-none"
              />
              <button
                onClick={() => {
                  if (quickNote) {
                    alert(`State note pinned: "${quickNote}"`);
                    setQuickNote('');
                  }
                }}
                className="px-3 py-1.5 rounded-lg bg-[#c0c1ff] text-[#1000a9] text-xs font-medium active:scale-95 transition-all"
              >
                Snapshot Now
              </button>
            </div>

            {/* Active Spotlight */}
            <div className="bg-[#272a30] rounded-xl p-5 border border-[#32353b] space-y-4 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold text-white">Pre-Meeting Auto-Snapshot</h3>
                  <div className="text-xs font-mono-code text-[#908fa0] flex items-center gap-2 mt-0.5">
                    <span className="text-[#4edea3]">auth-v2-microservice</span>
                    <span>•</span>
                    <span>Captured 11:30 AM (26m ago)</span>
                  </div>
                </div>
                <span className="text-xs font-mono-code px-2 py-1 rounded bg-[#0b0e13] text-white border border-[#32353b] self-start sm:self-auto">
                  Heap: 480MB
                </span>
              </div>

              {/* Tabs list */}
              <div className="bg-[#191c21] p-3 rounded-lg border border-[#272a30] space-y-2">
                <span className="text-[10px] font-mono-code uppercase text-[#908fa0] block">
                  6 Browser Tabs Stashed:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'GitHub PR #412',
                    'RFC 7636 PKCE spec',
                    'Internal Auth Docs',
                    'Linear CS-89',
                    '+2 more'
                  ].map((tab, idx) => (
                    <span key={idx} className="text-xs px-2 py-1 rounded bg-[#1d2025] text-white font-mono-code border border-[#272a30]">
                      {tab}
                    </span>
                  ))}
                </div>
              </div>

              {/* Terminals preserved */}
              <div className="bg-[#191c21] p-3 rounded-lg border border-[#272a30] space-y-2">
                <span className="text-[10px] font-mono-code uppercase text-[#908fa0] block">
                  2 IDE Terminals Preserved:
                </span>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono-code bg-[#0b0e13] p-2 rounded">
                    <span className="text-[#4edea3]">● cargo watch -x run</span>
                    <span className="text-[#908fa0]">PID: 40912</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono-code bg-[#0b0e13] p-2 rounded">
                    <span className="text-[#4cd7f6]">● redis-cli monitor</span>
                    <span className="text-[#908fa0]">Subscribed</span>
                  </div>
                </div>
              </div>

              {/* Pinned Memo */}
              <div className="bg-[#0b0e13] p-3 rounded-lg border border-[#272a30] flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[#c0c1ff] text-base mt-0.5">sticky_note_2</span>
                <div>
                  <span className="text-[10px] font-mono-code uppercase text-[#c0c1ff] block">Pinned Mental Cache:</span>
                  <p className="text-xs text-white italic mt-0.5">
                    “Left off debugging token exchange 401 error. Need to check clock skew leeway.”
                  </p>
                </div>
              </div>

              {/* Restore Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={handleRestore}
                  disabled={restoreStatus !== null}
                  className={`flex-1 h-11 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 ${
                    restoreStatus === 'restored'
                      ? 'bg-[#4edea3] text-[#003824]'
                      : 'bg-[#c0c1ff] hover:bg-[#e1e0ff] text-[#1000a9]'
                  }`}
                >
                  {restoreStatus === 'reconstituting' ? (
                    <>
                      <span className="material-symbols-outlined text-base animate-spin">sync</span>
                      <span>Reconstituting Workspace...</span>
                    </>
                  ) : restoreStatus === 'restored' ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>Workspace Restored (1.8s)</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      <span>Instant Restore Environment</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleExport}
                  className="h-11 px-4 rounded-xl bg-[#1d2025] hover:bg-[#32353b] text-white text-xs font-medium flex items-center justify-center gap-2 border border-[#32353b] transition-colors"
                >
                  {exportCopied ? <Check className="w-4 h-4 text-[#4edea3]" /> : <Copy className="w-4 h-4 text-[#4cd7f6]" />}
                  <span>{exportCopied ? 'Copied to Clipboard!' : 'Export Markdown / Raycast'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: AUTOMATE (Sensory & Cognitive Armor) */}
        {activeTab === 'automate' && (
          <div className="max-w-4xl mx-auto space-y-5 select-none">
            {/* Ambient Sound Deck */}
            <div className="p-5 rounded-xl bg-[#191c21] border border-[#272a30] space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleSound}
                    className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md active:scale-95 transition-all ${
                      isPlayingAudio ? 'bg-[#03b5d3] text-[#003640]' : 'bg-[#272a30] text-white'
                    }`}
                  >
                    {isPlayingAudio ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                  </button>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-white">Cyber Rain &amp; Brown Noise</h3>
                      {isPlayingAudio && <span className="w-2 h-2 rounded-full bg-[#4cd7f6] animate-ping"></span>}
                    </div>
                    <span className="text-[11px] font-mono-code text-[#4cd7f6]">
                      432Hz Binaural Harmonic Focus Lock
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono-code text-[#4cd7f6] font-bold">{volume}%</span>
              </div>

              {/* Dynamic Visualizer Spectrum Bars */}
              <div className="flex items-end gap-1.5 h-8 w-full px-1 bg-[#0b0e13] rounded-lg p-1.5">
                {spectrumHeights.map((h, idx) => (
                  <div
                    key={idx}
                    className="flex-1 bg-[#4cd7f6] rounded-t transition-all duration-100"
                    style={{ height: `${h}%`, opacity: isPlayingAudio ? 0.9 : 0.3 }}
                  ></div>
                ))}
              </div>

              {/* Volume Slider */}
              <div className="flex items-center gap-3">
                <Volume2 className="w-4 h-4 text-[#908fa0]" />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => handleVolumeChange(Number(e.target.value))}
                  className="flex-1 h-1.5 bg-[#272a30] rounded-lg appearance-none cursor-pointer accent-[#4cd7f6]"
                />
              </div>
            </div>

            {/* Trigger Recipes */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-mono-code uppercase text-white font-semibold">
                  Active Trigger Recipes (Auto-Enforced)
                </h3>
              </div>

              {[
                {
                  id: 'backendSwitch',
                  title: 'On Switching to Backend Workspace',
                  trigger: 'Workspace switch → auth-microservice',
                  actions: [
                    'Spin up local Docker Postgres & Redis',
                    'Open VS Code workspace & checkout auth PR',
                    'Set Slack: “Auth overhaul deep dive”',
                    'Block social & news domains (DNS Shield)'
                  ]
                },
                {
                  id: 'calendarStash',
                  title: 'Auto-Stash on Calendar Meeting',
                  trigger: 'T-minus 2m before Google Calendar event',
                  actions: [
                    'Snapshot complete IDE session memory & open tabs',
                    'Gracefully sleep IDE and launch Meet URL'
                  ]
                },
                {
                  id: 'branchSwap',
                  title: 'Branch Context Swapping',
                  trigger: 'git checkout [any-branch]',
                  actions: [
                    'Auto-switch pinned Chrome tab group',
                    'Align Linear ticket view to current issue ID'
                  ]
                },
                {
                  id: 'flowBreak',
                  title: 'Flow-Break Interceptor',
                  trigger: '>3 app switches within 10 minutes',
                  actions: [
                    'Display 2-minute breath prompt before allowing switch'
                  ]
                }
              ].map((recipe) => (
                <div
                  key={recipe.id}
                  className="p-4 rounded-xl bg-[#191c21] border border-[#272a30] space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-white">{recipe.title}</h4>
                      <span className="text-[11px] font-mono-code text-[#4edea3]">
                        Trigger: {recipe.trigger}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setRecipes({ ...recipes, [recipe.id]: !recipes[recipe.id] })
                      }
                      className={`w-10 h-6 p-0.5 rounded-full transition-colors flex items-center ${
                        recipes[recipe.id]
                          ? 'bg-[#4cd7f6] justify-end'
                          : 'bg-[#32353b] justify-start'
                      }`}
                    >
                      <span className="w-5 h-5 rounded-full bg-[#0b0e13] shadow-sm"></span>
                    </button>
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#0b0e13]/60 space-y-1">
                    {recipe.actions.map((act, idx) => (
                      <div key={idx} className="text-xs font-mono-code text-[#c7c4d7] flex items-center gap-2">
                        <span className="text-[#c0c1ff]">›</span>
                        <span>{act}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Context Rule Constructor */}
            <div className="p-4 rounded-xl bg-[#191c21] border border-[#272a30] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono-code uppercase text-white font-bold">
                  Context Rule Constructor
                </span>
                <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-[#c0c1ff]/10 text-[#c0c1ff]">
                  v2 Builder
                </span>
              </div>

              <div className="space-y-2">
                <div className="p-2.5 bg-[#0b0e13] rounded-lg">
                  <span className="text-[10px] font-mono-code uppercase text-[#4cd7f6] block mb-1.5 font-bold">
                    IF (Trigger condition)
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {['ctx:switched', 'cron:scheduled', 'app:focus_lost'].map((t) => (
                      <button
                        key={t}
                        onClick={() => setSelectedTrigger(t)}
                        className={`py-1.5 px-2 rounded text-xs font-mono-code truncate transition-colors ${
                          selectedTrigger === t
                            ? 'bg-[#1d2025] text-[#4cd7f6] border border-[#4cd7f6]'
                            : 'bg-[#191c21] text-white border border-[#272a30]'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-2.5 bg-[#0b0e13] rounded-lg">
                  <span className="text-[10px] font-mono-code uppercase text-[#4edea3] block mb-1 font-bold">
                    THEN EXECUTE (Shield or Orchestrate)
                  </span>
                  <div className="text-xs font-mono-code text-white bg-[#191c21] p-2 rounded flex items-center justify-between">
                    <span>docker compose up -d &amp;&amp; lock_dnd</span>
                    <span className="text-[#4edea3]">Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: ANALYTICS (Cognitive Health Telemetry) */}
        {activeTab === 'analytics' && (
          <div className="max-w-4xl mx-auto space-y-5 select-none">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-white">Context &amp; Cognitive Health</h2>
                <p className="text-xs text-[#908fa0]">
                  Real-time telemetry on cognitive fragmentation, state latency, and flow stamina.
                </p>
              </div>
              <span className="text-[10px] font-mono-code px-2.5 py-1 rounded-full bg-[#191c21] text-white border border-[#272a30]">
                Today • Live
              </span>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-[#191c21] border border-[#272a30]">
                <span className="text-[10px] font-mono-code uppercase text-[#908fa0]">Focus Score</span>
                <div className="text-2xl font-bold text-white mt-1">88<span className="text-xs text-[#908fa0]">/100</span></div>
                <span className="text-[10px] font-mono-code text-[#4edea3] mt-0.5 block">+12% Optimal</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#191c21] border border-[#272a30]">
                <span className="text-[10px] font-mono-code uppercase text-[#908fa0]">Switches</span>
                <div className="text-2xl font-bold text-[#4cd7f6] mt-1">7<span className="text-xs text-[#908fa0]">/10</span></div>
                <span className="text-[10px] font-mono-code text-[#4cd7f6] mt-0.5 block">Saved 1h 45m</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#191c21] border border-[#272a30]">
                <span className="text-[10px] font-mono-code uppercase text-[#908fa0]">Deep Work</span>
                <div className="text-2xl font-bold text-[#c0c1ff] mt-1">4h 38m</div>
                <span className="text-[10px] font-mono-code text-[#c0c1ff] mt-0.5 block">3 high-focus blocks</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#191c21] border border-[#272a30]">
                <span className="text-[10px] font-mono-code uppercase text-[#908fa0]">Recovery</span>
                <div className="text-2xl font-bold text-[#4edea3] mt-1">2.4<span className="text-xs text-[#908fa0]">min</span></div>
                <span className="text-[10px] font-mono-code text-[#4edea3] mt-0.5 block">down from 15m</span>
              </div>
            </div>

            {/* Cognitive Fragmentation Bar */}
            <div className="p-4 rounded-xl bg-[#191c21] border border-[#272a30] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono-code uppercase text-white font-semibold">
                  Cognitive Fragmentation Timeline (09:00 — 18:00)
                </span>
              </div>

              <div className="h-7 w-full bg-[#0b0e13] rounded-lg flex overflow-hidden p-0.5 gap-0.5">
                <div className="h-full bg-[#8083ff] rounded-sm" style={{ width: '28%' }} title="auth-v2-microservice"></div>
                <div className="h-full bg-[#32353b] rounded-sm" style={{ width: '6%' }} title="Standup"></div>
                <div className="h-full bg-[#111319] rounded-sm" style={{ width: '6%' }} title="Buffer"></div>
                <div className="h-full bg-[#4cd7f6] rounded-sm" style={{ width: '31%' }} title="payments-worker"></div>
                <div className="h-full bg-[#93000a] rounded-sm animate-pulse" style={{ width: '3%' }} title="Context Switch Friction"></div>
                <div className="h-full bg-[#4edea3] rounded-sm" style={{ width: '17%' }} title="Code Review"></div>
                <div className="h-full bg-[#272a30] rounded-sm" style={{ width: '9%' }} title="Wrap up"></div>
              </div>

              <div className="flex justify-between text-[10px] font-mono-code text-[#908fa0]">
                <span>09:00</span>
                <span>11:00</span>
                <span>13:00</span>
                <span>15:00</span>
                <span>17:00</span>
                <span>18:00</span>
              </div>
            </div>

            {/* Cognitive Engine Insight */}
            {!dismissedInsight && (
              <div className="p-4 rounded-xl bg-[#272a30] border border-[#32353b] space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#03b5d3] text-[#003640] flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono-code uppercase text-[#4cd7f6] font-bold">
                      Cognitive Engine Insight
                    </span>
                    <p className="text-xs text-white mt-1 leading-relaxed">
                      Your switches peak between <strong className="text-[#4cd7f6]">2:00 PM – 3:00 PM</strong>. Batching PR reviews to <strong className="text-[#4edea3]">4:00 PM</strong> could preserve <strong className="text-[#c0c1ff]">40m</strong> of uninterrupted afternoon deep focus.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    onClick={() => setDismissedInsight(true)}
                    className="px-3 py-1.5 rounded-lg text-xs text-[#908fa0] hover:text-white"
                  >
                    Dismiss
                  </button>
                  <button
                    onClick={() => setShieldScheduled(true)}
                    disabled={shieldScheduled}
                    className="px-3.5 py-1.5 rounded-lg bg-[#c0c1ff] hover:bg-[#e1e0ff] text-[#1000a9] font-semibold text-xs transition-colors"
                  >
                    {shieldScheduled ? 'Shield Schedule Active' : 'Apply Shield Schedule'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
