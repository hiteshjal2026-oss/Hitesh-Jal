import React, { useState } from 'react';
import { QUERY_PRESETS } from '../../data/queryTemplates';
import { 
  Sparkles, 
  Search, 
  ExternalLink, 
  Copy, 
  Check, 
  RotateCcw, 
  Filter, 
  Code, 
  FileText, 
  Layers,
  GraduationCap
} from 'lucide-react';
import { QueryPreset } from '../../types';

interface QuerySynthesizerAppProps {
  onSaveToNotes?: (title: string, query: string) => void;
}

export const QuerySynthesizerApp: React.FC<QuerySynthesizerAppProps> = ({ onSaveToNotes }) => {
  const [exactPhrase, setExactPhrase] = useState<string>('FlashAttention');
  const [keywords, setKeywords] = useState<string>('benchmark OR latency OR throughput');
  const [selectedDomains, setSelectedDomains] = useState<string[]>(['arxiv.org', 'openreview.net']);
  const [selectedFiletype, setSelectedFiletype] = useState<string>('pdf');
  const [excludeTerms, setExcludeTerms] = useState<string>('sponsored blog');
  const [afterDate, setAfterDate] = useState<string>('2024-01-01');
  const [inTitle, setInTitle] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const availableDomains = [
    { id: 'arxiv.org', label: 'arXiv Preprints' },
    { id: 'openreview.net', label: 'OpenReview (NeurIPS/ICLR)' },
    { id: 'github.com', label: 'GitHub Code/RFC' },
    { id: 'ieee.org', label: 'IEEE Xplore' },
    { id: 'acm.org', label: 'ACM Digital Library' },
    { id: 'usenix.org', label: 'USENIX Systems' },
    { id: 'ietf.org', label: 'IETF RFC Specs' },
    { id: 'nature.com', label: 'Nature Research' },
    { id: 'sciencedirect.com', label: 'ScienceDirect' }
  ];

  const toggleDomain = (domain: string) => {
    if (selectedDomains.includes(domain)) {
      setSelectedDomains(selectedDomains.filter(d => d !== domain));
    } else {
      setSelectedDomains([...selectedDomains, domain]);
    }
  };

  const applyPreset = (preset: QueryPreset) => {
    // If raw query preset is selected
    if (preset.filetype) setSelectedFiletype(preset.filetype);
    if (preset.domains) setSelectedDomains(preset.domains);
    if (preset.timeframe && preset.timeframe.startsWith('after:')) {
      setAfterDate(preset.timeframe.replace('after:', ''));
    }
    setKeywords(preset.title);
    setExactPhrase(preset.category);
  };

  // Build the synthesized query string
  const buildSynthesizedQuery = (): string => {
    const parts: string[] = [];

    if (exactPhrase.trim()) {
      parts.push(`"${exactPhrase.trim()}"`);
    }

    if (keywords.trim()) {
      parts.push(`(${keywords.trim()})`);
    }

    if (inTitle.trim()) {
      parts.push(`intitle:"${inTitle.trim()}"`);
    }

    if (selectedDomains.length > 0) {
      const siteStr = selectedDomains.map(d => `site:${d}`).join(' OR ');
      parts.push(`(${siteStr})`);
    }

    if (selectedFiletype) {
      parts.push(`filetype:${selectedFiletype}`);
    }

    if (afterDate.trim()) {
      parts.push(`after:${afterDate.trim()}`);
    }

    if (excludeTerms.trim()) {
      const excludes = excludeTerms
        .split(' ')
        .filter(t => t.trim().length > 0)
        .map(t => (t.startsWith('-') ? t : `-${t}`))
        .join(' ');
      parts.push(excludes);
    }

    return parts.join(' ');
  };

  const synthesizedQuery = buildSynthesizedQuery();

  const handleCopy = () => {
    navigator.clipboard.writeText(synthesizedQuery);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExecuteGoogle = () => {
    const url = `https://www.google.com/search?q=${encodeURIComponent(synthesizedQuery)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleExecuteScholar = () => {
    const url = `https://scholar.google.com/scholar?q=${encodeURIComponent(synthesizedQuery)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleExecutePatents = () => {
    const url = `https://patents.google.com/?q=${encodeURIComponent(synthesizedQuery)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleReset = () => {
    setExactPhrase('');
    setKeywords('');
    setSelectedDomains([]);
    setSelectedFiletype('');
    setExcludeTerms('sponsored blog');
    setAfterDate('');
    setInTitle('');
  };

  return (
    <div className="flex flex-col h-full bg-[#111319] text-[#e1e2ea] overflow-y-auto">
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-[#272a30] bg-[#191c21]/90 sticky top-0 z-20 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#c0c1ff] animate-pulse"></span>
              <span className="text-[11px] font-mono-code uppercase tracking-wider text-[#c0c1ff]">
                Precision Search Synthesizer
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-0.5">
              Google Research Dork &amp; Query Synthesizer
            </h1>
            <p className="text-xs sm:text-sm text-[#908fa0] mt-0.5">
              Construct high-precision Boolean queries that cut through commercial SEO clutter to surface authoritative engineering papers and specs.
            </p>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1d2025] hover:bg-[#272a30] text-[#908fa0] hover:text-white text-xs transition-colors border border-[#32353b]"
            title="Reset filters"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-6">
        {/* Quick Presets Carousel */}
        <div>
          <span className="text-[11px] font-mono-code uppercase text-[#4cd7f6] block mb-2 font-semibold">
            ⚡ Instant Engineering Research Presets:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {QUERY_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => applyPreset(preset)}
                className="text-left p-3 rounded-xl bg-[#191c21] border border-[#272a30] hover:border-[#4cd7f6]/40 hover:bg-[#1d2025] transition-all group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-white group-hover:text-[#4cd7f6] transition-colors truncate">
                    {preset.title}
                  </span>
                  <span className="text-[10px] font-mono-code px-1.5 py-0.5 rounded bg-[#272a30] text-[#c0c1ff]">
                    {preset.category}
                  </span>
                </div>
                <p className="text-[11px] text-[#908fa0] line-clamp-2 leading-tight">
                  {preset.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Query Builder Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#191c21] border border-[#272a30] rounded-xl p-4 sm:p-5">
          {/* Left Column: Keyword and Exact Phrase */}
          <div className="space-y-3.5">
            <div>
              <label className="text-xs font-medium text-white block mb-1">
                Exact Term / Architecture Phrase <span className="text-[#4cd7f6] font-mono-code">"..."</span>
              </label>
              <input
                type="text"
                placeholder='e.g. FlashAttention, Raft, Kyber'
                value={exactPhrase}
                onChange={(e) => setExactPhrase(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#0b0e13] border border-[#272a30] rounded-lg text-white font-mono-code focus:outline-none focus:border-[#4cd7f6]"
              />
              <span className="text-[10px] text-[#908fa0] mt-0.5 block">
                Enclosed in exact double quotes on Google.
              </span>
            </div>

            <div>
              <label className="text-xs font-medium text-white block mb-1">
                Engineering Topic &amp; Synonyms <span className="text-[#c0c1ff] font-mono-code">(OR / AND)</span>
              </label>
              <input
                type="text"
                placeholder='e.g. benchmark OR latency OR throughput'
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#0b0e13] border border-[#272a30] rounded-lg text-white font-mono-code focus:outline-none focus:border-[#4cd7f6]"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-white block mb-1">
                Title Restriction <span className="text-[#4edea3] font-mono-code">intitle:</span>
              </label>
              <input
                type="text"
                placeholder='e.g. formal verification, evaluation'
                value={inTitle}
                onChange={(e) => setInTitle(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#0b0e13] border border-[#272a30] rounded-lg text-white font-mono-code focus:outline-none focus:border-[#4cd7f6]"
              />
            </div>
          </div>

          {/* Right Column: Domains, Filetypes, Exclusions */}
          <div className="space-y-3.5">
            <div>
              <label className="text-xs font-medium text-white block mb-1.5">
                Target Research Repositories <span className="text-[#4cd7f6] font-mono-code">site:...</span>
              </label>
              <div className="flex flex-wrap gap-1.5 max-h-[120px] overflow-y-auto">
                {availableDomains.map((domain) => {
                  const isChecked = selectedDomains.includes(domain.id);
                  return (
                    <button
                      key={domain.id}
                      type="button"
                      onClick={() => toggleDomain(domain.id)}
                      className={`px-2 py-1 rounded-md text-[11px] font-mono-code transition-all ${
                        isChecked
                          ? 'bg-[#4cd7f6]/20 text-[#4cd7f6] border border-[#4cd7f6]'
                          : 'bg-[#1d2025] text-[#908fa0] border border-[#272a30] hover:text-white'
                      }`}
                    >
                      {isChecked ? '✓ ' : '+ '}
                      {domain.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-white block mb-1">
                  File Format <span className="text-[#c0c1ff] font-mono-code">filetype:</span>
                </label>
                <select
                  value={selectedFiletype}
                  onChange={(e) => setSelectedFiletype(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-[#0b0e13] border border-[#272a30] rounded-lg text-white font-mono-code focus:outline-none focus:border-[#4cd7f6]"
                >
                  <option value="">Any format</option>
                  <option value="pdf">PDF (Papers/Specs)</option>
                  <option value="ipynb">Jupyter Notebooks</option>
                  <option value="py">Python code</option>
                  <option value="tex">LaTeX Source</option>
                  <option value="pptx">Conference Slides</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-white block mb-1">
                  Date Cutoff <span className="text-[#4edea3] font-mono-code">after:</span>
                </label>
                <input
                  type="text"
                  placeholder="2024-01-01"
                  value={afterDate}
                  onChange={(e) => setAfterDate(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-[#0b0e13] border border-[#272a30] rounded-lg text-white font-mono-code focus:outline-none focus:border-[#4cd7f6]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-white block mb-1">
                Noise &amp; SEO Exclusion <span className="text-[#ffb4ab] font-mono-code">-term</span>
              </label>
              <input
                type="text"
                placeholder="e.g. sponsored medium ads"
                value={excludeTerms}
                onChange={(e) => setExcludeTerms(e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-[#0b0e13] border border-[#272a30] rounded-lg text-white font-mono-code focus:outline-none focus:border-[#4cd7f6]"
              />
            </div>
          </div>
        </div>

        {/* Synthesized Live Output & Launch Deck */}
        <div className="bg-[#191c21] border-2 border-[#4cd7f6]/40 rounded-xl p-4 sm:p-5 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#4cd7f6]" />
              <span className="text-xs font-bold uppercase tracking-wider text-white">
                Synthesized Direct Google Query
              </span>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#1d2025] hover:bg-[#272a30] text-xs text-[#4cd7f6] font-mono-code border border-[#32353b] transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#4edea3]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Query'}</span>
            </button>
          </div>

          <div className="p-3 bg-[#0b0e13] border border-[#272a30] rounded-lg font-mono-code text-xs sm:text-sm text-[#4edea3] break-all select-all leading-relaxed">
            {synthesizedQuery || '(No query parameters entered)'}
          </div>

          {/* Launch Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
            <button
              onClick={handleExecuteGoogle}
              className="h-11 px-4 rounded-xl bg-[#03b5d3] hover:bg-[#4cd7f6] text-[#003640] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
            >
              <Search className="w-4 h-4" />
              <span>Search Google</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleExecuteScholar}
              className="h-11 px-4 rounded-xl bg-[#c0c1ff] hover:bg-[#e1e0ff] text-[#1000a9] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Search Google Scholar</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleExecutePatents}
              className="h-11 px-4 rounded-xl bg-[#1d2025] hover:bg-[#272a30] text-white border border-[#32353b] font-medium text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
            >
              <FileText className="w-4 h-4 text-[#4edea3]" />
              <span>Search Google Patents</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
