import React, { useState } from 'react';
import { GOOGLE_PORTALS } from '../../data/googlePortals';
import { 
  GraduationCap, 
  FileText, 
  Database, 
  Sparkles, 
  Cpu, 
  GitBranch, 
  TrendingUp, 
  Globe, 
  BookOpen, 
  ExternalLink, 
  Copy, 
  Check, 
  Search, 
  ArrowRight, 
  Bookmark,
  Share2
} from 'lucide-react';
import { GooglePortal } from '../../types';

interface GoogleNavigatorAppProps {
  onOpenQuerySynthesizer?: () => void;
  onSendToNotes?: (title: string, url: string) => void;
}

export const GoogleNavigatorApp: React.FC<GoogleNavigatorAppProps> = ({
  onOpenQuerySynthesizer,
  onSendToNotes
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [activePortalQuery, setActivePortalQuery] = useState<{ [portalId: string]: string }>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const getPortalIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap': return <GraduationCap className="w-5 h-5" />;
      case 'FileText': return <FileText className="w-5 h-5" />;
      case 'Database': return <Database className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      case 'Cpu': return <Cpu className="w-5 h-5" />;
      case 'GitBranch': return <GitBranch className="w-5 h-5" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5" />;
      case 'Globe': return <Globe className="w-5 h-5" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5" />;
      default: return <Globe className="w-5 h-5" />;
    }
  };

  const filteredPortals = GOOGLE_PORTALS.filter((portal) => {
    const matchesCategory = selectedCategory === 'all' || portal.category === selectedCategory;
    const matchesSearch = 
      portal.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      portal.description.toLowerCase().includes(searchFilter.toLowerCase()) ||
      portal.badge.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopyLink = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const handleExecuteQuery = (portal: GooglePortal, queryText?: string) => {
    const query = queryText || activePortalQuery[portal.id];
    if (!query || !query.trim()) {
      window.open(portal.directUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    const finalUrl = portal.queryUrlTemplate.replace('{query}', encodeURIComponent(query.trim()));
    window.open(finalUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex flex-col h-full bg-[#111319] text-[#e1e2ea] overflow-y-auto">
      {/* Header Banner */}
      <div className="p-4 sm:p-6 border-b border-[#272a30] bg-[#191c21]/90 sticky top-0 z-20 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse"></span>
              <span className="text-[11px] font-mono-code uppercase tracking-wider text-[#4edea3]">
                Direct Google Research Gateway
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-0.5">
              Google Engineering Research Portals
            </h1>
            <p className="text-xs sm:text-sm text-[#908fa0] mt-0.5">
              Zero-latency direct access to Google Scholar, Patents, Datasets, Architecture Center, and DeepMind publications.
            </p>
          </div>

          {onOpenQuerySynthesizer && (
            <button
              onClick={onOpenQuerySynthesizer}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#c0c1ff] text-[#1000a9] font-medium text-xs hover:opacity-90 active:scale-95 transition-all shadow-md self-start sm:self-auto shrink-0"
            >
              <Sparkles className="w-4 h-4" />
              <span>Launch Boolean Dork Builder</span>
            </button>
          )}
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 mt-4 pt-3 border-t border-[#272a30]/80">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {[
              { id: 'all', label: 'All Portals' },
              { id: 'literature', label: 'Literature & Scholar' },
              { id: 'patents', label: 'Patents' },
              { id: 'datasets', label: 'Datasets' },
              { id: 'architecture', label: 'Architecture' },
              { id: 'code', label: 'Open Source' },
              { id: 'trends', label: 'Trends' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-[#4cd7f6]/20 text-[#4cd7f6] border border-[#4cd7f6]/40'
                    : 'bg-[#1d2025] text-[#908fa0] hover:text-[#e1e2ea] border border-transparent'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative min-w-[220px]">
            <Search className="w-3.5 h-3.5 text-[#908fa0] absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter Google services..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#1d2025] border border-[#32353b] rounded-lg text-[#e1e2ea] placeholder:text-[#908fa0] focus:outline-none focus:border-[#4cd7f6]"
            />
          </div>
        </div>
      </div>

      {/* Grid of Portals */}
      <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPortals.map((portal) => (
          <div
            key={portal.id}
            className="flex flex-col justify-between rounded-xl bg-[#191c21] border border-[#272a30] hover:border-[#464554] p-4 shadow-sm hover:shadow-md transition-all group"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#1d2025] border border-[#32353b] text-[#4cd7f6] flex items-center justify-center shrink-0 group-hover:border-[#4cd7f6]/40 transition-colors">
                    {getPortalIcon(portal.icon)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-white">
                        {portal.name}
                      </h3>
                      <span className="text-[10px] font-mono-code px-2 py-0.5 rounded-full bg-[#1d2025] text-[#c0c1ff] border border-[#32353b]">
                        {portal.badge}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono-code text-[#4cd7f6] truncate block">
                      {portal.directUrl}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => handleCopyLink(portal.directUrl, portal.id)}
                    title="Copy direct Google link"
                    className="p-1.5 rounded-lg bg-[#1d2025] hover:bg-[#272a30] text-[#908fa0] hover:text-white transition-colors"
                  >
                    {copiedId === portal.id ? (
                      <Check className="w-3.5 h-3.5 text-[#4edea3]" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>

                  <a
                    href={portal.directUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Open directly on Google"
                    className="p-1.5 rounded-lg bg-[#1d2025] hover:bg-[#272a30] text-[#4cd7f6] hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-[#908fa0] mt-2.5 line-clamp-2 leading-relaxed">
                {portal.description}
              </p>

              {/* Quick Direct Query Box */}
              <div className="mt-3.5 pt-3 border-t border-[#272a30]/60">
                <label className="text-[10px] font-mono-code uppercase text-[#908fa0] block mb-1">
                  Instant Research Query:
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    placeholder={`Search ${portal.name}...`}
                    value={activePortalQuery[portal.id] || ''}
                    onChange={(e) =>
                      setActivePortalQuery({
                        ...activePortalQuery,
                        [portal.id]: e.target.value,
                      })
                    }
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleExecuteQuery(portal);
                      }
                    }}
                    className="flex-1 px-2.5 py-1.5 text-xs bg-[#0b0e13] border border-[#272a30] rounded-lg text-[#e1e2ea] placeholder:text-[#464554] focus:outline-none focus:border-[#4cd7f6] font-mono-code"
                  />
                  <button
                    onClick={() => handleExecuteQuery(portal)}
                    className="px-2.5 py-1.5 rounded-lg bg-[#03b5d3] hover:bg-[#4cd7f6] text-[#003640] font-semibold text-xs flex items-center gap-1 transition-colors shrink-0"
                    title="Execute query on Google"
                  >
                    <span>Go</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Popular engineering research queries */}
              <div className="mt-3">
                <span className="text-[10px] font-mono-code uppercase text-[#908fa0] block mb-1.5">
                  Frequent Engineering Queries:
                </span>
                <div className="flex flex-wrap gap-1">
                  {portal.popularQueries.slice(0, 3).map((query, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleExecuteQuery(portal, query)}
                      className="text-[11px] px-2 py-0.5 rounded bg-[#1d2025] hover:bg-[#272a30] text-[#c7c4d7] hover:text-[#4cd7f6] font-mono-code truncate max-w-[280px] text-left transition-colors border border-transparent hover:border-[#32353b]"
                      title={`Search: "${query}"`}
                    >
                      • {query}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer row */}
            <div className="flex items-center justify-between mt-4 pt-2.5 border-t border-[#272a30]/80">
              <a
                href={portal.directUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-medium text-[#4cd7f6] hover:underline flex items-center gap-1"
              >
                <span>Direct Page: {new URL(portal.directUrl).hostname}</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              {onSendToNotes && (
                <button
                  onClick={() => onSendToNotes(portal.name, portal.directUrl)}
                  className="text-[11px] text-[#908fa0] hover:text-[#c0c1ff] flex items-center gap-1 transition-colors"
                >
                  <Bookmark className="w-3 h-3" />
                  <span>Pin to Scratchpad</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
