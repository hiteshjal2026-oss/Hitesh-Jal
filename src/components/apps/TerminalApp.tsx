import React, { useState, useRef, useEffect } from 'react';
import { GOOGLE_PORTALS } from '../../data/googlePortals';
import { AppId } from '../../types';

interface TerminalAppProps {
  onOpenApp?: (id: AppId) => void;
}

interface CommandLog {
  id: string;
  type: 'input' | 'output' | 'error' | 'success';
  text: string;
}

export const TerminalApp: React.FC<TerminalAppProps> = ({ onOpenApp }) => {
  const [logs, setLogs] = useState<CommandLog[]>([
    { id: '1', type: 'output', text: 'WinEngineer Research Terminal [Version 11.0.22631.4317]' },
    { id: '2', type: 'output', text: '(c) Google DeepMind Engineering Workspace. All rights reserved.' },
    { id: '3', type: 'output', text: 'Type "help" to see research commands and direct Google launchers.\n' }
  ]);
  const [currentInput, setCurrentInput] = useState<string>('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    setHistory((prev) => [trimmed, ...prev]);
    setHistoryIndex(-1);

    const newLogs: CommandLog[] = [
      ...logs,
      { id: String(Date.now()), type: 'input', text: `engineer@os:~$ ${trimmed}` }
    ];

    const parts = trimmed.split(' ');
    const action = parts[0].toLowerCase();
    const args = parts.slice(1).join(' ');

    switch (action) {
      case 'help':
        newLogs.push({
          id: String(Date.now() + 1),
          type: 'output',
          text: `Available Engineering Commands:
  scholar <query>   - Directly search Google Scholar for academic papers
  patents <query>   - Directly search Google Patents for prior art
  dataset <query>   - Search Google Dataset Search for benchmark data
  cloud <query>     - Search Google Cloud Architecture Center
  trends <query>    - Analyze adoption curves on Google Trends
  dork <keyword>    - Synthesize a high-precision Boolean Google query
  list              - List all direct Google research portals
  open <app>        - Launch window: navigator | dork | context | notes | settings
  stash             - Trigger instant ContextSwitch memory stash
  clear             - Clear terminal screen`
        });
        break;

      case 'clear':
        setLogs([]);
        return;

      case 'list': {
        const portalLines = GOOGLE_PORTALS.map(
          (p) => `  • ${p.name.padEnd(25)} -> ${p.directUrl}`
        ).join('\n');
        newLogs.push({
          id: String(Date.now() + 1),
          type: 'output',
          text: `Registered Direct Google Portals:\n${portalLines}`
        });
        break;
      }

      case 'scholar': {
        if (!args) {
          window.open('https://scholar.google.com', '_blank');
          newLogs.push({ id: String(Date.now() + 1), type: 'success', text: 'Opened Google Scholar.' });
        } else {
          const url = `https://scholar.google.com/scholar?q=${encodeURIComponent(args)}`;
          window.open(url, '_blank');
          newLogs.push({ id: String(Date.now() + 1), type: 'success', text: `Launched Scholar query: "${args}" -> ${url}` });
        }
        break;
      }

      case 'patents': {
        if (!args) {
          window.open('https://patents.google.com', '_blank');
          newLogs.push({ id: String(Date.now() + 1), type: 'success', text: 'Opened Google Patents.' });
        } else {
          const url = `https://patents.google.com/?q=${encodeURIComponent(args)}`;
          window.open(url, '_blank');
          newLogs.push({ id: String(Date.now() + 1), type: 'success', text: `Launched Patents query: "${args}" -> ${url}` });
        }
        break;
      }

      case 'dataset': {
        const url = args
          ? `https://datasetsearch.research.google.com/search?query=${encodeURIComponent(args)}`
          : 'https://datasetsearch.research.google.com';
        window.open(url, '_blank');
        newLogs.push({ id: String(Date.now() + 1), type: 'success', text: `Launched Dataset query: "${args}" -> ${url}` });
        break;
      }

      case 'cloud': {
        const url = args
          ? `https://www.google.com/search?q=site:cloud.google.com/architecture+${encodeURIComponent(args)}`
          : 'https://cloud.google.com/architecture';
        window.open(url, '_blank');
        newLogs.push({ id: String(Date.now() + 1), type: 'success', text: `Launched Architecture query: "${args}" -> ${url}` });
        break;
      }

      case 'trends': {
        const url = args
          ? `https://trends.google.com/trends/explore?q=${encodeURIComponent(args)}`
          : 'https://trends.google.com/trends/';
        window.open(url, '_blank');
        newLogs.push({ id: String(Date.now() + 1), type: 'success', text: `Launched Trends query: "${args}" -> ${url}` });
        break;
      }

      case 'dork': {
        const synthesized = `"${args || 'system architecture'}" (benchmark OR evaluation) filetype:pdf (site:arxiv.org OR site:openreview.net) -sponsored`;
        const url = `https://www.google.com/search?q=${encodeURIComponent(synthesized)}`;
        window.open(url, '_blank');
        newLogs.push({
          id: String(Date.now() + 1),
          type: 'output',
          text: `Synthesized Dork: ${synthesized}\nLaunched query in browser.`
        });
        break;
      }

      case 'stash': {
        newLogs.push({
          id: String(Date.now() + 1),
          type: 'success',
          text: '✓ Captured state: 18 open tabs, active branch (feat/oauth2-pkce), Heap 480MB stashed to time-lock cache.'
        });
        break;
      }

      case 'open': {
        const target = args.toLowerCase();
        if (target === 'navigator' || target === 'google') {
          onOpenApp?.('google-navigator');
          newLogs.push({ id: String(Date.now() + 1), type: 'success', text: 'Opened Google Navigator.' });
        } else if (target === 'dork' || target === 'synthesizer') {
          onOpenApp?.('query-synthesizer');
          newLogs.push({ id: String(Date.now() + 1), type: 'success', text: 'Opened Query Synthesizer.' });
        } else if (target === 'context' || target === 'switch') {
          onOpenApp?.('context-switch');
          newLogs.push({ id: String(Date.now() + 1), type: 'success', text: 'Opened ContextSwitch.' });
        } else if (target === 'notes') {
          onOpenApp?.('research-notes');
          newLogs.push({ id: String(Date.now() + 1), type: 'success', text: 'Opened Research Scratchpad.' });
        } else if (target === 'settings') {
          onOpenApp?.('settings');
          newLogs.push({ id: String(Date.now() + 1), type: 'success', text: 'Opened Settings.' });
        } else {
          newLogs.push({ id: String(Date.now() + 1), type: 'error', text: `Unknown app: "${args}". Choose: navigator, dork, context, notes, settings.` });
        }
        break;
      }

      default:
        newLogs.push({
          id: String(Date.now() + 1),
          type: 'error',
          text: `Command not found: "${trimmed}". Type "help" for a list of commands.`
        });
        break;
    }

    setLogs(newLogs);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(currentInput);
      setCurrentInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0 && historyIndex < history.length - 1) {
        const nextIdx = historyIndex + 1;
        setHistoryIndex(nextIdx);
        setCurrentInput(history[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setCurrentInput(history[nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentInput('');
      }
    }
  };

  return (
    <div 
      className="flex flex-col h-full bg-[#0b0e13] text-[#e1e2ea] p-4 font-mono-code text-xs sm:text-sm overflow-hidden"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex-1 overflow-y-auto space-y-1.5 scrollbar-thin">
        {logs.map((log) => (
          <div
            key={log.id}
            className={`whitespace-pre-wrap leading-relaxed ${
              log.type === 'input'
                ? 'text-[#c0c1ff] font-semibold'
                : log.type === 'error'
                ? 'text-[#ffb4ab]'
                : log.type === 'success'
                ? 'text-[#4edea3]'
                : 'text-[#e1e2ea]'
            }`}
          >
            {log.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="flex items-center gap-2 pt-2 border-t border-[#272a30]">
        <span className="text-[#4cd7f6] font-bold">engineer@os:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          className="flex-1 bg-transparent text-white font-mono-code focus:outline-none"
          placeholder="type 'help' or 'scholar <query>'..."
        />
      </div>
    </div>
  );
};
