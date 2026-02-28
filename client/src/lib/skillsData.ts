export interface Skill {
  id: string;
  name: string;
  slug: string;
  description: string;
  author: string;
  authorAvatar?: string;
  stars: number;
  downloads: number;
  installs: number;
  versions: number;
  currentVersion: string;
  category: string;
  tags: string[];
  highlighted?: boolean;
  securityStatus: 'benign' | 'suspicious' | 'unknown';
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  count: number;
}

export const categories: Category[] = [
  { id: 'all', name: 'All Skills', icon: 'Layers', color: '#007AFF', count: 12135 },
  { id: 'dev-tools', name: 'Dev Tools', icon: 'Code', color: '#007AFF', count: 3240 },
  { id: 'ai-ml', name: 'AI & ML', icon: 'Brain', color: '#AF52DE', count: 2180 },
  { id: 'productivity', name: 'Productivity', icon: 'Zap', color: '#FF9500', count: 1850 },
  { id: 'search', name: 'Search & Data', icon: 'Search', color: '#30D158', count: 1420 },
  { id: 'communication', name: 'Communication', icon: 'MessageSquare', color: '#FF2D55', count: 980 },
  { id: 'security', name: 'Security', icon: 'Shield', color: '#FF3B30', count: 760 },
  { id: 'automation', name: 'Automation', icon: 'Bot', color: '#5856D6', count: 890 },
  { id: 'media', name: 'Media & Files', icon: 'Image', color: '#FF9500', count: 815 },
];

export const skills: Skill[] = [
  {
    id: '1',
    name: 'Ontology',
    slug: 'ontology',
    description: 'Typed knowledge graph for structured agent memory and composable skills. Use when creating/querying entities (Person, Project, Task, Event, Document), linking related objects, enforcing constraints.',
    author: 'oswalpalash',
    stars: 172,
    downloads: 83800,
    installs: 1240,
    versions: 3,
    currentVersion: 'v2.1.0',
    category: 'ai-ml',
    tags: ['knowledge-graph', 'memory', 'entities'],
    highlighted: true,
    securityStatus: 'benign',
    createdAt: '2025-11-15',
    updatedAt: '2026-02-20',
  },
  {
    id: '2',
    name: 'Self-Improving Agent',
    slug: 'self-improving-agent',
    description: 'Captures learnings, errors, and corrections to enable continuous improvement. Use when a command fails unexpectedly or user corrects behavior.',
    author: 'pskoett',
    stars: 900,
    downloads: 75800,
    installs: 1180,
    versions: 12,
    currentVersion: 'v3.4.0',
    category: 'ai-ml',
    tags: ['self-improvement', 'learning', 'error-correction'],
    highlighted: true,
    securityStatus: 'benign',
    createdAt: '2025-10-20',
    updatedAt: '2026-02-25',
  },
  {
    id: '3',
    name: 'Gog',
    slug: 'gog',
    description: 'Google Workspace CLI for Gmail, Calendar, Drive, Contacts, Sheets, and Docs. Full integration with all Google services.',
    author: 'steipete',
    stars: 579,
    downloads: 73300,
    installs: 980,
    versions: 1,
    currentVersion: 'v1.0.0',
    category: 'productivity',
    tags: ['google', 'workspace', 'gmail', 'calendar'],
    securityStatus: 'benign',
    createdAt: '2025-12-01',
    updatedAt: '2026-01-15',
  },
  {
    id: '4',
    name: 'Tavily Web Search',
    slug: 'tavily-search',
    description: 'AI-optimized web search via Tavily API. Returns concise, relevant results for AI agents with deep search capabilities.',
    author: 'arun-8687',
    stars: 300,
    downloads: 67300,
    installs: 601,
    versions: 1,
    currentVersion: 'v1.0.0',
    category: 'search',
    tags: ['search', 'web', 'tavily', 'api'],
    securityStatus: 'benign',
    createdAt: '2025-11-10',
    updatedAt: '2026-01-20',
  },
  {
    id: '5',
    name: 'Find Skills',
    slug: 'find-skills',
    description: 'Helps users discover and install agent skills when they ask questions like "how do I do X", "find a skill for X", or express interest in extending capabilities.',
    author: 'JimLiuxinghai',
    stars: 248,
    downloads: 61000,
    installs: 850,
    versions: 1,
    currentVersion: 'v1.0.0',
    category: 'dev-tools',
    tags: ['discovery', 'install', 'search'],
    securityStatus: 'benign',
    createdAt: '2025-12-05',
    updatedAt: '2026-02-10',
  },
  {
    id: '6',
    name: 'Summarize',
    slug: 'summarize',
    description: 'Summarize URLs or files with the summarize CLI (web, PDFs, images, audio, YouTube). Supports multiple formats and output styles.',
    author: 'steipete',
    stars: 276,
    downloads: 58900,
    installs: 720,
    versions: 1,
    currentVersion: 'v1.0.0',
    category: 'productivity',
    tags: ['summarize', 'pdf', 'youtube', 'web'],
    securityStatus: 'benign',
    createdAt: '2025-11-25',
    updatedAt: '2026-01-30',
  },
  {
    id: '7',
    name: 'Agent Browser',
    slug: 'agent-browser',
    description: 'A fast Rust-based headless browser automation CLI with Node.js fallback that enables AI agents to navigate, click, type, and snapshot pages.',
    author: 'TheSethRose',
    stars: 290,
    downloads: 56100,
    installs: 680,
    versions: 2,
    currentVersion: 'v1.2.0',
    category: 'dev-tools',
    tags: ['browser', 'automation', 'headless', 'rust'],
    highlighted: true,
    securityStatus: 'benign',
    createdAt: '2025-10-15',
    updatedAt: '2026-02-18',
  },
  {
    id: '8',
    name: 'Github',
    slug: 'github',
    description: 'Interact with GitHub using the gh CLI. Use gh issue, gh pr, gh run, and gh api for issues, PRs, CI runs, and advanced queries.',
    author: 'steipete',
    stars: 184,
    downloads: 55600,
    installs: 920,
    versions: 1,
    currentVersion: 'v1.0.0',
    category: 'dev-tools',
    tags: ['github', 'git', 'ci', 'pr'],
    securityStatus: 'benign',
    createdAt: '2025-11-01',
    updatedAt: '2026-01-10',
  },
  {
    id: '9',
    name: 'Weather',
    slug: 'weather',
    description: 'Get current weather and forecasts (no API key required). Simple and reliable weather data for any location worldwide.',
    author: 'steipete',
    stars: 163,
    downloads: 46900,
    installs: 540,
    versions: 1,
    currentVersion: 'v1.0.0',
    category: 'search',
    tags: ['weather', 'forecast', 'no-api-key'],
    securityStatus: 'benign',
    createdAt: '2025-12-10',
    updatedAt: '2026-01-05',
  },
  {
    id: '10',
    name: 'Polymarket',
    slug: 'polymarketodds',
    description: 'Query Polymarket prediction markets - check odds, trending markets, search events, track prices and momentum with watchlist alerts.',
    author: 'joelchance',
    stars: 101,
    downloads: 44600,
    installs: 380,
    versions: 2,
    currentVersion: 'v1.1.0',
    category: 'search',
    tags: ['prediction', 'markets', 'polymarket', 'odds'],
    securityStatus: 'benign',
    createdAt: '2025-11-20',
    updatedAt: '2026-02-15',
  },
  {
    id: '11',
    name: 'Proactive Agent',
    slug: 'proactive-agent',
    description: 'Transform AI agents from task-followers into proactive partners that anticipate needs and continuously improve. WAL Protocol, Working Buffer, Autonomous Crons.',
    author: 'halthelobster',
    stars: 282,
    downloads: 44300,
    installs: 620,
    versions: 11,
    currentVersion: 'v4.2.0',
    category: 'ai-ml',
    tags: ['proactive', 'autonomous', 'crons', 'improvement'],
    highlighted: true,
    securityStatus: 'benign',
    createdAt: '2025-09-30',
    updatedAt: '2026-02-22',
  },
  {
    id: '12',
    name: 'Notion',
    slug: 'notion',
    description: 'Notion API for creating and managing pages, databases, and blocks. Full CRUD operations with rich content support.',
    author: 'steipete',
    stars: 119,
    downloads: 31800,
    installs: 450,
    versions: 1,
    currentVersion: 'v1.0.0',
    category: 'productivity',
    tags: ['notion', 'api', 'database', 'pages'],
    securityStatus: 'benign',
    createdAt: '2025-12-15',
    updatedAt: '2026-01-25',
  },
  {
    id: '13',
    name: 'Nano Banana Pro',
    slug: 'nano-banana-pro',
    description: 'Generate/edit images with Nano Banana Pro (Gemini 3 Pro Image). Use for image create/modify requests including edits. Supports text-to-image and image-to-image.',
    author: 'steipete',
    stars: 127,
    downloads: 29600,
    installs: 410,
    versions: 2,
    currentVersion: 'v1.1.0',
    category: 'media',
    tags: ['image', 'generation', 'gemini', 'ai'],
    securityStatus: 'benign',
    createdAt: '2025-11-05',
    updatedAt: '2026-02-12',
  },
  {
    id: '14',
    name: 'API Gateway',
    slug: 'api-gateway',
    description: 'Connect to 100+ APIs (Google Workspace, Microsoft 365, GitHub, Notion, Slack, Airtable, HubSpot, etc.) with managed OAuth authentication.',
    author: 'byungkyu',
    stars: 133,
    downloads: 29500,
    installs: 520,
    versions: 55,
    currentVersion: 'v8.3.0',
    category: 'dev-tools',
    tags: ['api', 'oauth', 'integration', 'gateway'],
    securityStatus: 'benign',
    createdAt: '2025-08-20',
    updatedAt: '2026-02-24',
  },
  {
    id: '15',
    name: 'Obsidian',
    slug: 'obsidian',
    description: 'Work with Obsidian vaults (plain Markdown notes) and automate via obsidian-cli. Full vault management and note creation.',
    author: 'steipete',
    stars: 108,
    downloads: 27200,
    installs: 380,
    versions: 1,
    currentVersion: 'v1.0.0',
    category: 'productivity',
    tags: ['obsidian', 'markdown', 'notes', 'vault'],
    securityStatus: 'benign',
    createdAt: '2025-12-20',
    updatedAt: '2026-01-18',
  },
  {
    id: '16',
    name: 'Brave Search',
    slug: 'brave-search',
    description: 'Web search and content extraction via Brave Search API. Use for searching documentation, facts, or any web content. Lightweight, no browser required.',
    author: 'steipete',
    stars: 98,
    downloads: 22900,
    installs: 320,
    versions: 1,
    currentVersion: 'v1.0.0',
    category: 'search',
    tags: ['search', 'brave', 'web', 'api'],
    securityStatus: 'benign',
    createdAt: '2025-11-30',
    updatedAt: '2026-01-22',
  },
  {
    id: '17',
    name: 'Humanizer',
    slug: 'humanizer',
    description: 'Remove signs of AI-generated writing from text. Detects and fixes patterns including inflated symbolism, promotional language, em dash overuse, and AI vocabulary.',
    author: 'biostartechnology',
    stars: 237,
    downloads: 25900,
    installs: 480,
    versions: 1,
    currentVersion: 'v1.0.0',
    category: 'ai-ml',
    tags: ['humanize', 'writing', 'ai-detection', 'text'],
    securityStatus: 'benign',
    createdAt: '2025-10-25',
    updatedAt: '2026-02-05',
  },
  {
    id: '18',
    name: 'Auto-Updater',
    slug: 'auto-updater',
    description: 'Automatically update Claude and all installed skills once daily. Runs via cron, checks for updates, applies them, and messages with a summary.',
    author: 'maximeprades',
    stars: 150,
    downloads: 21800,
    installs: 340,
    versions: 1,
    currentVersion: 'v1.0.0',
    category: 'automation',
    tags: ['auto-update', 'cron', 'maintenance'],
    securityStatus: 'benign',
    createdAt: '2025-12-08',
    updatedAt: '2026-02-01',
  },
];

export const sortOptions = [
  { value: 'downloads', label: 'Downloads' },
  { value: 'stars', label: 'Stars' },
  { value: 'newest', label: 'Newest' },
  { value: 'updated', label: 'Recently Updated' },
  { value: 'installs', label: 'Installs' },
] as const;

export type SortOption = typeof sortOptions[number]['value'];

export function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
  return num.toString();
}

export function sortSkills(skills: Skill[], sort: SortOption): Skill[] {
  return [...skills].sort((a, b) => {
    switch (sort) {
      case 'downloads': return b.downloads - a.downloads;
      case 'stars': return b.stars - a.stars;
      case 'newest': return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'updated': return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      case 'installs': return b.installs - a.installs;
      default: return 0;
    }
  });
}

export function filterSkills(
  skills: Skill[],
  query: string,
  category: string,
  showHighlighted: boolean,
): Skill[] {
  return skills.filter(skill => {
    const matchesQuery = !query || 
      skill.name.toLowerCase().includes(query.toLowerCase()) ||
      skill.slug.toLowerCase().includes(query.toLowerCase()) ||
      skill.description.toLowerCase().includes(query.toLowerCase()) ||
      skill.tags.some(t => t.toLowerCase().includes(query.toLowerCase())) ||
      skill.author.toLowerCase().includes(query.toLowerCase());
    
    const matchesCategory = category === 'all' || skill.category === category;
    const matchesHighlighted = !showHighlighted || skill.highlighted;
    
    return matchesQuery && matchesCategory && matchesHighlighted;
  });
}
