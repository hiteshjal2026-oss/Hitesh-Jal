import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  ExternalLink, 
  Sparkles, 
  GraduationCap, 
  FileText, 
  Compass, 
  ArrowRight,
  Database,
  X
} from 'lucide-react';
import { AppId } from '../types';
import { GOOGLE_PORTALS } from '../data/googlePortals';
import { QUERY_PRESETS } from '../data/queryTemplates';

interface SearchFlyoutProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenApp: (id: AppId) => void;
}

export const SearchFlyout: React.FC<SearchFlyoutProps> = ({
  isOpen,
  onClose,
  onOpenApp
}) => {
  const [query, setQuery] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredPortals = GOOGLE_PORTALS.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.description.toLowerCase().includes(query.toLowerCase())
  );

  const filteredPresets = QUERY_PRESETS.filter(p => 
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleGoogleSearch = () => {
    if (!query.trim()) return;
    window.open(`https://www.google.com/search?q=${encodeURIComponent(query.trim())}`, '_blank');
    onClose();
  };

  const handleScholarSearch = () => {
    if (!query.trim()) return;
    window.open(`https://scholar.google.com/scholar?q=${encodeURIComponent(query.trim())}`, '_blank');
    onClose();
  };

  const handlePatentsSearch = () => {
    if (!query.trim()) return;
    window.open(`https://patents.google.com/?q=${encodeURIComponent(query.trim())}`, '_blank');
    onClose();
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="fixed bottom-14 left-1/2 -translate-x-1/2 w-[92vw] max-w-[600px] max-h-[75vh] menu-glass rounded-2xl p-4 z-50 flex flex-col shadow-[0_24px_64px_rgba(0,0,0,0.85)] border border-[#32353b] text-[#e1e2ea]"
    >
      <div className="flex items-center gap-2 p-2 bg-[#111319] rounded-xl border border-[#272a30]">
        <Search className="w-4 h-4 text-[#4cd7f6] shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleGoogleSearch();
            if (e.key === 'Escape') onClose();
          }}
          placeholder="Type query to launch directly on Google, Scholar, or open app..."
          className="w-full bg-transparent text-xs sm:text-sm text-white focus:outline-none font-mono-code"
        />
        <button
          onClick={onClose}
          className="p-1 text-[#908fa0] hover:text-white rounded"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto mt-3 space-y-3 pr-1 scrollbar-thin">
        {/* Quick Launch Google Action Buttons if user has typed something */}
        {query.trim() && (
          <div className="p-2.5 rounded-xl bg-[#191c21] border border-[#272a30] space-y-2">
            <span className="text-[10px] font-mono-code uppercase text-[#4cd7f6] font-bold block">
              Direct Google Query Launchers:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                onClick={handleGoogleSearch}
                className="flex items-center justify-between p-2 rounded-lg bg-[#111319] hover:bg-[#272a30] text-xs font-mono-code text-white transition-colors border border-[#32353b]"
              >
                <div className="flex items-center gap-1.5 truncate">
                  <Search className="w-3.5 h-3.5 text-[#4cd7f6]" />
                  <span className="truncate">Google Search</span>
                </div>
                <ArrowRight className="w-3 h-3 text-[#908fa0]" />
              </button>

              <button
                onClick={handleScholarSearch}
                className="flex items-center justify-between p-2 rounded-lg bg-[#111319] hover:bg-[#272a30] text-xs font-mono-code text-[#c0c1ff] transition-colors border border-[#32353b]"
              >
                <div className="flex items-center gap-1.5 truncate">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span className="truncate">Google Scholar</span>
                </div>
                <ArrowRight className="w-3 h-3 text-[#908fa0]" />
              </button>

              <button
                onClick={handlePatentsSearch}
                className="flex items-center justify-between p-2 rounded-lg bg-[#111319] hover:bg-[#272a30] text-xs font-mono-code text-[#4edea3] transition-colors border border-[#32353b]"
              >
                <div className="flex items-center gap-1.5 truncate">
                  <FileText className="w-3.5 h-3.5" />
                  <span className="truncate">Google Patents</span>
                </div>
                <ArrowRight className="w-3 h-3 text-[#908fa0]" />
              </button>
            </div>
          </div>
        )}

        {/* Matching Google Portals */}
        <div>
          <span className="text-[10px] font-mono-code uppercase text-[#908fa0] px-1 block mb-1.5">
            Matching Google Research Portals:
          </span>
          <div className="space-y-1">
            {filteredPortals.slice(0, 4).map((portal) => (
              <button
                key={portal.id}
                onClick={() => {
                  window.open(portal.directUrl, '_blank');
                  onClose();
                }}
                className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-[#191c21] text-left transition-colors"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-6 h-6 rounded bg-[#111319] flex items-center justify-center text-[#4cd7f6] shrink-0">
                    <ExternalLink className="w-3 h-3" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-medium text-white truncate">{portal.name}</div>
                    <div className="text-[10px] text-[#908fa0] truncate">{portal.description}</div>
                  </div>
                </div>
                <span className="text-[10px] font-mono-code text-[#4cd7f6] shrink-0">Direct Link ↗</span>
              </button>
            ))}
          </div>
        </div>

        {/* Research Apps */}
        <div>
          <span className="text-[10px] font-mono-code uppercase text-[#908fa0] px-1 block mb-1.5">
            Engineering Tools:
          </span>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'google-navigator' as AppId, name: 'Google Navigator' },
              { id: 'query-synthesizer' as AppId, name: 'Query Synthesizer' },
              { id: 'context-switch' as AppId, name: 'ContextSwitch' },
              { id: 'research-notes' as AppId, name: 'Scratchpad' },
              { id: 'terminal' as AppId, name: 'Terminal' }
            ].map((app) => (
              <button
                key={app.id}
                onClick={() => {
                  onOpenApp(app.id);
                  onClose();
                }}
                className="p-2 rounded-lg bg-[#191c21] hover:bg-[#272a30] text-xs font-medium text-white text-left transition-colors"
              >
                Launch {app.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
