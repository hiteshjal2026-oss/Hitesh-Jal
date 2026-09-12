import { GooglePortal } from '../types';

export const GOOGLE_PORTALS: GooglePortal[] = [
  {
    id: 'scholar',
    name: 'Google Scholar',
    category: 'literature',
    description: 'Peer-reviewed papers, academic citations, doctoral theses, books, and pre-prints across all engineering domains.',
    directUrl: 'https://scholar.google.com',
    queryUrlTemplate: 'https://scholar.google.com/scholar?q={query}',
    badge: 'Core Literature',
    popularQueries: [
      'transformer architecture flash attention benchmark',
      'raft consensus formal verification trela',
      'post-quantum cryptography lattice kyber',
      'solid-state battery electrolyte impedance spectroscopy',
      'neuromorphic computing memristor spiking neural network',
      'low-latency distributed cache lockless queue'
    ],
    icon: 'GraduationCap'
  },
  {
    id: 'patents',
    name: 'Google Patents',
    category: 'patents',
    description: 'Search over 100 million patent documents from 100+ patent offices worldwide with machine translations and CPC classifications.',
    directUrl: 'https://patents.google.com',
    queryUrlTemplate: 'https://patents.google.com/?q={query}',
    badge: 'Prior Art & IP',
    popularQueries: [
      'autonomous driving lidar point cloud compression',
      'high-bandwidth memory silicon interposer TSV',
      'zero-knowledge succinct non-interactive proofs circuit',
      'fpga hardware accelerator matrix multiply systolic array',
      'lithium-ion cathode atomic layer deposition coating'
    ],
    icon: 'FileText'
  },
  {
    id: 'dataset-search',
    name: 'Google Dataset Search',
    category: 'datasets',
    description: 'Discover tens of millions of datasets stored across thousands of research repositories, sensor logs, and open science archives.',
    directUrl: 'https://datasetsearch.research.google.com',
    queryUrlTemplate: 'https://datasetsearch.research.google.com/search?query={query}',
    badge: 'Datasets & Benchmarks',
    popularQueries: [
      'telemetry high-frequency server logs anomaly detection',
      'single-cell RNA sequencing spatial transcriptomics',
      'autonomous vehicle perception camera radar fusion',
      'microgrid renewable solar wind power time series',
      'code completion AST python rust synthetic'
    ],
    icon: 'Database'
  },
  {
    id: 'google-research',
    name: 'Google Research Publications',
    category: 'literature',
    description: 'Official repository of research publications authored by Google Research and Google DeepMind scientists and engineers.',
    directUrl: 'https://research.google/pubs/',
    queryUrlTemplate: 'https://research.google/pubs/?query={query}',
    badge: 'Google DeepMind & Labs',
    popularQueries: [
      'gemini multimodal reasoning architecture',
      'spanner globally distributed database consensus',
      'quantum supremacy willow error correction',
      'borg cluster management large scale scheduling',
      'jax high performance array computing'
    ],
    icon: 'Sparkles'
  },
  {
    id: 'cloud-architecture',
    name: 'Google Cloud Architecture Center',
    category: 'architecture',
    description: 'Reference architectures, enterprise blueprints, whitepapers, design patterns, and engineering implementation guides.',
    directUrl: 'https://cloud.google.com/architecture',
    queryUrlTemplate: 'https://www.google.com/search?q=site:cloud.google.com/architecture+{query}',
    badge: 'Systems Design',
    popularQueries: [
      'disaster recovery multi-region active-active database',
      'zero trust beyondcorp network microsegmentation',
      'event-driven microservices pubsub eventarc cloud run',
      'vertex ai mlops continuous training pipeline architecture',
      'hybrid cloud anthos interconnect low latency'
    ],
    icon: 'Cpu'
  },
  {
    id: 'opensource',
    name: 'Google Open Source Projects',
    category: 'code',
    description: 'Explore Google’s flagship open source repositories, engineering style guides, and community software standards.',
    directUrl: 'https://opensource.google/projects',
    queryUrlTemplate: 'https://www.google.com/search?q=site:opensource.google+OR+site:github.com/google+{query}',
    badge: 'Engineering Standards',
    popularQueries: [
      'google engineering practices code review guidelines',
      'chromium browser engine source documentation',
      'kubernetes container orchestration core primitives',
      'tensorflow distributed training graph compiler',
      'go runtime scheduler goroutine work stealing'
    ],
    icon: 'GitBranch'
  },
  {
    id: 'trends',
    name: 'Google Trends (Tech Explorer)',
    category: 'trends',
    description: 'Real-time and historic global search interest telemetry to analyze programming language, framework, and hardware adoption trends.',
    directUrl: 'https://trends.google.com/trends/',
    queryUrlTemplate: 'https://trends.google.com/trends/explore?q={query}',
    badge: 'Market Telemetry',
    popularQueries: [
      'Rust vs Go vs C++',
      'PyTorch vs TensorFlow vs JAX',
      'PostgreSQL vs MongoDB vs ClickHouse',
      'Kubernetes vs Docker Swarm vs Nomad',
      'Next.js vs Remix vs Astro'
    ],
    icon: 'TrendingUp'
  },
  {
    id: 'web-dev',
    name: 'web.dev & Chrome DevTools Docs',
    category: 'code',
    description: 'Engineering standards for web performance, Core Web Vitals, memory profiling, WebAssembly, and V8 optimization.',
    directUrl: 'https://web.dev',
    queryUrlTemplate: 'https://www.google.com/search?q=site:web.dev+{query}',
    badge: 'Browser Internals',
    popularQueries: [
      'optimizing interaction to next paint INP javascript thread',
      'webassembly simd multi-threading performance',
      'chrome devtools memory heap snapshot allocation instrumentation',
      'service worker cache storage background sync offline'
    ],
    icon: 'Globe'
  },
  {
    id: 'books-ngram',
    name: 'Google Books Ngram Viewer',
    category: 'trends',
    description: 'Chart historical frequencies of scientific and engineering terminology across centuries of published technical literature.',
    directUrl: 'https://books.google.com/ngrams',
    queryUrlTemplate: 'https://books.google.com/ngrams/graph?content={query}&year_start=1950&year_end=2024&corpus=en',
    badge: 'Linguistic Telemetry',
    popularQueries: [
      'artificial intelligence,machine learning,deep learning',
      'quantum computing,superconductor,semiconductor',
      'microservices,monolith,serverless'
    ],
    icon: 'BookOpen'
  }
];
