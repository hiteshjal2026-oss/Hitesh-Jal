import { QueryPreset } from '../types';

export const QUERY_PRESETS: QueryPreset[] = [
  {
    id: 'sota-benchmarks',
    title: 'SOTA ML Benchmark & Ablations',
    category: 'AI & ML',
    description: 'Bypasses marketing blog posts to surface pure academic PDF benchmarks and empirical comparison papers.',
    rawQuery: '("state of the art" OR benchmark OR ablation) (accuracy OR latency OR "FLOPs") filetype:pdf (site:arxiv.org OR site:openreview.net)',
    domains: ['arxiv.org', 'openreview.net', 'paperswithcode.com'],
    filetype: 'pdf',
    timeframe: 'after:2024-01-01'
  },
  {
    id: 'system-design-rfc',
    title: 'Distributed Systems Formal Spec & RFC',
    category: 'Systems',
    description: 'Finds technical design docs, consensus algorithm specs, and TLA+ formal verification models.',
    rawQuery: '("formal specification" OR "TLA+" OR "consensus protocol" OR "design RFC") (site:github.com OR site:ietf.org OR site:usenix.org) -sponsored',
    domains: ['github.com', 'ietf.org', 'usenix.org'],
    timeframe: 'after:2023-01-01'
  },
  {
    id: 'verilog-asic-architecture',
    title: 'Hardware Architecture & RTL Verilog',
    category: 'Hardware',
    description: 'Surfaces chip architecture diagrams, systolic arrays, and synthesizable RTL modules.',
    rawQuery: '("synthesizable" OR "RTL" OR "Verilog" OR "Chisel" OR "systolic array") (microarchitecture OR throughput) filetype:pdf (site:ieee.org OR site:arxiv.org OR site:vlsi.org)',
    domains: ['ieee.org', 'arxiv.org', 'vlsi.org'],
    filetype: 'pdf'
  },
  {
    id: 'compiler-optimization',
    title: 'LLVM / JIT Compiler Optimization Passes',
    category: 'Compilers',
    description: 'Finds internal documentation, intermediate representations (IR), and vectorization passes.',
    rawQuery: '("LLVM IR" OR "polyhedral compilation" OR "vectorization pass" OR "escape analysis") (site:llvm.org OR site:cgo-conference.org OR site:sigplan.org)',
    domains: ['llvm.org', 'sigplan.org', 'cgo-conference.org']
  },
  {
    id: 'crypto-zkp',
    title: 'Zero-Knowledge Proofs & Cryptographic Primitives',
    category: 'Cryptography',
    description: 'Targets mathematical papers on SNARKs, STARKs, elliptic curve pairings, and polynomial commitments.',
    rawQuery: '("polynomial commitment" OR "KZG" OR "Plonk" OR "Groth16" OR "lattice-based") filetype:pdf (site:eprint.iacr.org OR site:iacr.org)',
    domains: ['eprint.iacr.org', 'iacr.org'],
    filetype: 'pdf',
    timeframe: 'after:2024-01-01'
  },
  {
    id: 'battery-energy-materials',
    title: 'Battery Solid Electrolyte & SEI Layer',
    category: 'Materials',
    description: 'Direct queries into chemical impedance, solid electrolyte interphase, and degradation kinetics.',
    rawQuery: '("solid electrolyte interphase" OR "electrochemical impedance spectroscopy" OR "dendrite suppression") filetype:pdf (site:nature.com OR site:sciencedirect.com OR site:rsc.org)',
    domains: ['nature.com', 'sciencedirect.com', 'rsc.org'],
    filetype: 'pdf'
  }
];
