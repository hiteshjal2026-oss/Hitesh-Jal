import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Trash2, 
  Copy, 
  Check, 
  ExternalLink, 
  Bookmark, 
  Share2, 
  Code
} from 'lucide-react';
import { ResearchNote } from '../../types';

interface ResearchNotesAppProps {
  pinnedLinks?: { name: string; url: string }[];
}

export const ResearchNotesApp: React.FC<ResearchNotesAppProps> = ({ pinnedLinks = [] }) => {
  const [notes, setNotes] = useState<ResearchNote[]>([
    {
      id: 'note-1',
      title: 'FlashAttention-3 Microarchitecture Notes',
      category: 'Paper Review',
      content: `### FlashAttention-3: Fast and Accurate Attention with Asynchrony
- **Core Mechanism**: Exploits NVIDIA Hopper H100 Tensor Memory Accelerator (TMA) and Warp Group Matrix Multiply and Accumulate (WGMMA).
- **Ping-pong buffering**: Interleaves GEMM and Softmax across warps to hide memory latency.
- **FP8 Precision**: Hardware support for FP8 accumulation without accuracy degradation in attention scores.

**Next Steps**:
1. Check Triton implementation in vLLM repo.
2. Benchmark kernel latency on 8x H100 SXM5 cluster.`,
      bibtex: `@article{dao2024flashattention3,
  title={FlashAttention-3: Fast and Accurate Attention with Asynchrony and Low-Precision},
  author={Dao, Tri and Gu, Albert},
  journal={arXiv preprint arXiv:2407.08608},
  year={2024}
}`,
      googleLinks: [
        { name: 'Google Scholar (FlashAttention-3)', url: 'https://scholar.google.com/scholar?q=FlashAttention-3' },
        { name: 'ArXiv PDF', url: 'https://arxiv.org/abs/2407.08608' }
      ],
      updatedAt: 'Today, 10:45 AM'
    },
    {
      id: 'note-2',
      title: 'Prior Art: High Throughput Raft Log Compaction',
      category: 'Patent & Spec',
      content: `### Distributed Log Compaction & Zero-Copy Snapshots
- Comparing Apache Kafka tiered storage vs Apache Pulsar BookKeeper ledgers.
- Raft paper Section 7: Log compaction via chunked LSM snapshot trees.
- Patent search US20210342381A1: Non-blocking distributed log truncation under high write concurrency.`,
      bibtex: `@patent{us20210342381a1,
  title={System and method for asynchronous log compaction in consensus clusters},
  year={2021},
  nationality={United States}
}`,
      googleLinks: [
        { name: 'Google Patents Search', url: 'https://patents.google.com/?q=raft+log+compaction+distributed' }
      ],
      updatedAt: 'Yesterday, 16:20'
    }
  ]);

  const [activeNoteId, setActiveNoteId] = useState<string>(notes[0]?.id || '');
  const [copiedBibtex, setCopiedBibtex] = useState<boolean>(false);
  const [copiedNote, setCopiedNote] = useState<boolean>(false);

  const activeNote = notes.find((n) => n.id === activeNoteId) || notes[0];

  const handleCreateNote = () => {
    const newNote: ResearchNote = {
      id: `note-${Date.now()}`,
      title: 'New Research Hypothesis',
      category: 'General',
      content: '### Research Objective:\n\n- Key problem statement:\n- Methodology:\n- Primary Google Scholar citations to review:',
      bibtex: '',
      googleLinks: pinnedLinks.length > 0 ? [...pinnedLinks] : [],
      updatedAt: 'Just now'
    };
    setNotes([newNote, ...notes]);
    setActiveNoteId(newNote.id);
  };

  const handleDeleteNote = (id: string) => {
    if (notes.length <= 1) return;
    const remaining = notes.filter((n) => n.id !== id);
    setNotes(remaining);
    setActiveNoteId(remaining[0].id);
  };

  const handleUpdateActiveNote = (fields: Partial<ResearchNote>) => {
    setNotes(
      notes.map((n) => (n.id === activeNoteId ? { ...n, ...fields, updatedAt: 'Just now' } : n))
    );
  };

  const handleCopyBibtex = () => {
    if (!activeNote?.bibtex) return;
    navigator.clipboard.writeText(activeNote.bibtex);
    setCopiedBibtex(true);
    setTimeout(() => setCopiedBibtex(false), 2000);
  };

  const handleCopyNote = () => {
    if (!activeNote) return;
    const fullText = `# ${activeNote.title}\nCategory: ${activeNote.category}\n\n${activeNote.content}\n\n${activeNote.bibtex ? '### BibTeX:\n```bibtex\n' + activeNote.bibtex + '\n```' : ''}`;
    navigator.clipboard.writeText(fullText);
    setCopiedNote(true);
    setTimeout(() => setCopiedNote(false), 2000);
  };

  return (
    <div className="flex h-full bg-[#111319] text-[#e1e2ea]">
      {/* Sidebar: Notes List */}
      <div className="w-64 sm:w-72 bg-[#191c21] border-r border-[#272a30] flex flex-col shrink-0">
        <div className="p-3 border-b border-[#272a30] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-[#c0c1ff]" />
            <span className="text-xs font-bold text-white uppercase font-mono-code">
              Research Scratchpad
            </span>
          </div>
          <button
            onClick={handleCreateNote}
            className="p-1 rounded-lg bg-[#c0c1ff] text-[#1000a9] hover:opacity-90 transition-opacity"
            title="Create new note"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
          {notes.map((note) => (
            <button
              key={note.id}
              onClick={() => setActiveNoteId(note.id)}
              className={`w-full text-left p-2.5 rounded-lg transition-all ${
                activeNoteId === note.id
                  ? 'bg-[#1d2025] border border-[#4cd7f6]/40 text-white'
                  : 'text-[#908fa0] hover:bg-[#1d2025]/60 hover:text-white border border-transparent'
              }`}
            >
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-[10px] font-mono-code uppercase text-[#4cd7f6]">
                  {note.category}
                </span>
                <span className="text-[9px] font-mono-code text-[#464554]">
                  {note.updatedAt}
                </span>
              </div>
              <h4 className="text-xs font-semibold truncate text-white">{note.title}</h4>
              <p className="text-[11px] text-[#908fa0] line-clamp-1 mt-0.5">
                {note.content.replace(/[#*`-]/g, '')}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Editor Body */}
      {activeNote ? (
        <div className="flex-1 flex flex-col overflow-y-auto bg-[#111319]">
          {/* Note Top Bar */}
          <div className="p-3 sm:p-4 border-b border-[#272a30] bg-[#191c21]/80 backdrop-blur-md flex items-center justify-between gap-2">
            <div className="flex-1 min-w-0">
              <input
                type="text"
                value={activeNote.title}
                onChange={(e) => handleUpdateActiveNote({ title: e.target.value })}
                className="w-full bg-transparent text-sm sm:text-base font-bold text-white focus:outline-none focus:border-b border-[#4cd7f6]"
              />
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="text"
                  value={activeNote.category}
                  onChange={(e) => handleUpdateActiveNote({ category: e.target.value })}
                  placeholder="Category..."
                  className="text-[11px] font-mono-code px-2 py-0.5 rounded bg-[#0b0e13] border border-[#272a30] text-[#c0c1ff] focus:outline-none"
                />
                <span className="text-[10px] font-mono-code text-[#908fa0]">
                  Last synced: {activeNote.updatedAt}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={handleCopyNote}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#1d2025] hover:bg-[#272a30] text-xs text-[#4cd7f6] border border-[#32353b]"
                title="Copy entire note as Markdown"
              >
                {copiedNote ? <Check className="w-3.5 h-3.5 text-[#4edea3]" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{copiedNote ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                onClick={() => handleDeleteNote(activeNote.id)}
                disabled={notes.length <= 1}
                className="p-1.5 rounded-lg bg-[#1d2025] hover:bg-[#93000a]/30 text-[#908fa0] hover:text-[#ffb4ab] border border-[#32353b] disabled:opacity-40"
                title="Delete note"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="p-4 sm:p-6 space-y-5 flex-1">
            {/* Markdown Content Area */}
            <div>
              <label className="text-[10px] font-mono-code uppercase text-[#908fa0] block mb-1">
                Research Notes &amp; Findings (Markdown):
              </label>
              <textarea
                value={activeNote.content}
                onChange={(e) => handleUpdateActiveNote({ content: e.target.value })}
                rows={10}
                className="w-full p-3 text-xs sm:text-sm bg-[#0b0e13] border border-[#272a30] rounded-xl text-white font-mono-code leading-relaxed focus:outline-none focus:border-[#4cd7f6] resize-y"
                placeholder="Write your research notes, formulas, and findings here..."
              />
            </div>

            {/* BibTeX Citation Block */}
            <div className="p-3 bg-[#191c21] border border-[#272a30] rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-mono-code text-[#c0c1ff]">
                  <Code className="w-3.5 h-3.5" />
                  <span>BibTeX Citation Record</span>
                </div>
                {activeNote.bibtex && (
                  <button
                    onClick={handleCopyBibtex}
                    className="flex items-center gap-1 text-[11px] font-mono-code text-[#4edea3] hover:underline"
                  >
                    {copiedBibtex ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedBibtex ? 'Copied BibTeX' : 'Copy BibTeX'}</span>
                  </button>
                )}
              </div>
              <textarea
                value={activeNote.bibtex}
                onChange={(e) => handleUpdateActiveNote({ bibtex: e.target.value })}
                rows={4}
                className="w-full p-2 text-xs bg-[#0b0e13] border border-[#272a30] rounded-lg text-[#4edea3] font-mono-code focus:outline-none focus:border-[#4cd7f6]"
                placeholder="@article{author2024title, ...}"
              />
            </div>

            {/* Linked Google Research Portals */}
            <div>
              <span className="text-[10px] font-mono-code uppercase text-[#908fa0] block mb-2">
                Attached Google Webpage References:
              </span>
              <div className="flex flex-wrap gap-2">
                {activeNote.googleLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#191c21] hover:bg-[#272a30] text-xs font-mono-code text-[#4cd7f6] border border-[#272a30] transition-colors"
                  >
                    <span>{link.name}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-xs text-[#908fa0]">
          No note selected
        </div>
      )}
    </div>
  );
};
