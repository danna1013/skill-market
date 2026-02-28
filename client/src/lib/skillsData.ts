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
  { id: 'all', name: 'All Skills', icon: 'Layers', color: '#007AFF', count: 12239 },
  { id: 'dev-tools', name: 'Dev Tools', icon: 'Code', color: '#007AFF', count: 3420 },
  { id: 'ai-ml', name: 'AI & ML', icon: 'Brain', color: '#AF52DE', count: 2360 },
  { id: 'productivity', name: 'Productivity', icon: 'Zap', color: '#FF9500', count: 1980 },
  { id: 'search', name: 'Search & Data', icon: 'Search', color: '#30D158', count: 1520 },
  { id: 'communication', name: 'Communication', icon: 'MessageSquare', color: '#FF2D55', count: 1050 },
  { id: 'security', name: 'Security', icon: 'Shield', color: '#FF3B30', count: 810 },
  { id: 'automation', name: 'Automation', icon: 'Bot', color: '#5856D6', count: 960 },
  { id: 'media', name: 'Media & Files', icon: 'Image', color: '#FF9500', count: 890 },
];

export const skills: Skill[] = [
  {
    id: '1',
    name: 'Ontology',
    slug: 'ontology',
    description: 'Typed knowledge graph for structured agent memory and composable skills. Use when creating/querying entities (Person, Project, Task, Event, Document), linking related objects, enforcing constraints.',
    author: 'oswalpalash',
    stars: 178,
    downloads: 85500,
    installs: 1320,
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
    stars: 907,
    downloads: 76300,
    installs: 1280,
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
    downloads: 73500,
    installs: 1020,
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
    stars: 302,
    downloads: 67800,
    installs: 640,
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
    stars: 251,
    downloads: 61700,
    installs: 890,
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
    stars: 280,
    downloads: 59300,
    installs: 760,
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
    name: 'Github',
    slug: 'github',
    description: 'Interact with GitHub using the gh CLI. Use gh issue, gh pr, gh run, and gh api for issues, PRs, CI runs, and advanced queries.',
    author: 'steipete',
    stars: 187,
    downloads: 56000,
    installs: 950,
    versions: 1,
    currentVersion: 'v1.0.0',
    category: 'dev-tools',
    tags: ['github', 'git', 'ci', 'pr'],
    securityStatus: 'benign',
    createdAt: '2025-11-01',
    updatedAt: '2026-01-10',
  },
  {
    id: '8',
    name: 'Weather',
    slug: 'weather',
    description: 'Get current weather and forecasts (no API key required). Simple and reliable weather data for any location worldwide.',
    author: 'steipete',
    stars: 163,
    downloads: 47200,
    installs: 560,
    versions: 1,
    currentVersion: 'v1.0.0',
    category: 'search',
    tags: ['weather', 'forecast', 'no-api-key'],
    securityStatus: 'benign',
    createdAt: '2025-12-10',
    updatedAt: '2026-01-05',
  },
  {
    id: '9',
    name: 'Polymarket',
    slug: 'polymarketodds',
    description: 'Query Polymarket prediction markets — check odds, trending markets, search events, track prices and momentum with watchlist alerts.',
    author: 'joelchance',
    stars: 102,
    downloads: 44900,
    installs: 400,
    versions: 2,
    currentVersion: 'v1.1.0',
    category: 'search',
    tags: ['prediction', 'markets', 'polymarket', 'odds'],
    securityStatus: 'benign',
    createdAt: '2025-11-20',
    updatedAt: '2026-02-15',
  },
  {
    id: '10',
    name: 'Proactive Agent',
    slug: 'proactive-agent',
    description: 'Transform AI agents from task-followers into proactive partners that anticipate needs and continuously improve. WAL Protocol, Working Buffer, Autonomous Crons.',
    author: 'halthelobster',
    stars: 284,
    downloads: 44500,
    installs: 650,
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
    id: '11',
    name: 'Notion',
    slug: 'notion',
    description: 'Notion API for creating and managing pages, databases, and blocks. Full CRUD operations with rich content support.',
    author: 'steipete',
    stars: 120,
    downloads: 32000,
    installs: 470,
    versions: 1,
    currentVersion: 'v1.0.0',
    category: 'productivity',
    tags: ['notion', 'api', 'database', 'pages'],
    securityStatus: 'benign',
    createdAt: '2025-12-15',
    updatedAt: '2026-01-25',
  },
  {
    id: '12',
    name: 'Nano Pdf',
    slug: 'nano-pdf',
    description: 'Edit PDFs with natural-language instructions using the nano-pdf CLI. Merge, split, extract, and annotate — all from the command line.',
    author: 'steipete',
    stars: 74,
    downloads: 30300,
    installs: 420,
    versions: 1,
    currentVersion: 'v1.0.0',
    category: 'media',
    tags: ['pdf', 'editor', 'cli', 'natural-language'],
    securityStatus: 'benign',
    createdAt: '2025-11-08',
    updatedAt: '2026-02-08',
  },
  {
    id: '13',
    name: 'Nano Banana Pro',
    slug: 'nano-banana-pro',
    description: 'Generate/edit images with Nano Banana Pro (Gemini 3 Pro Image). Use for image create/modify requests including edits. Supports text-to-image and image-to-image.',
    author: 'steipete',
    stars: 129,
    downloads: 29700,
    installs: 430,
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
    stars: 135,
    downloads: 29600,
    installs: 540,
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
    stars: 112,
    downloads: 27400,
    installs: 390,
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
    name: 'Openai Whisper',
    slug: 'openai-whisper',
    description: 'Local speech-to-text with the Whisper CLI (no API key). Fast, accurate transcription for meetings, interviews, and voice notes.',
    author: 'steipete',
    stars: 138,
    downloads: 26200,
    installs: 360,
    versions: 1,
    currentVersion: 'v1.0.0',
    category: 'media',
    tags: ['speech-to-text', 'whisper', 'transcription', 'audio'],
    securityStatus: 'benign',
    createdAt: '2025-11-18',
    updatedAt: '2026-01-28',
  },
  {
    id: '17',
    name: 'Humanizer',
    slug: 'humanizer',
    description: 'Remove signs of AI-generated writing from text. Detects and fixes patterns including inflated symbolism, promotional language, em dash overuse, and AI vocabulary.',
    author: 'biostartechnology',
    stars: 240,
    downloads: 26000,
    installs: 500,
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
    name: 'Free Ride',
    slug: 'free-ride',
    description: 'Manages free AI models from OpenRouter. Automatically ranks models by quality, configures fallbacks for rate-limit handling, and keeps everything up to date.',
    author: 'Shaivpidadi',
    stars: 176,
    downloads: 25000,
    installs: 460,
    versions: 4,
    currentVersion: 'v2.0.0',
    category: 'ai-ml',
    tags: ['free-ai', 'openrouter', 'models', 'fallback'],
    securityStatus: 'benign',
    createdAt: '2025-10-10',
    updatedAt: '2026-02-18',
  },
  {
    id: '19',
    name: 'Mcporter',
    slug: 'mcporter',
    description: 'Use the mcporter CLI to list, configure, auth, and call MCP servers/tools directly (HTTP or stdio), including ad-hoc servers, config edits, and CLI/type generation.',
    author: 'steipete',
    stars: 71,
    downloads: 24900,
    installs: 350,
    versions: 1,
    currentVersion: 'v1.0.0',
    category: 'dev-tools',
    tags: ['mcp', 'cli', 'servers', 'tools'],
    securityStatus: 'benign',
    createdAt: '2025-12-02',
    updatedAt: '2026-02-14',
  },
  {
    id: '20',
    name: 'Brave Search',
    slug: 'brave-search',
    description: 'Web search and content extraction via Brave Search API. Use for searching documentation, facts, or any web content. Lightweight, no browser required.',
    author: 'steipete',
    stars: 99,
    downloads: 23000,
    installs: 340,
    versions: 2,
    currentVersion: 'v1.1.0',
    category: 'search',
    tags: ['search', 'brave', 'web', 'api'],
    securityStatus: 'benign',
    createdAt: '2025-11-30',
    updatedAt: '2026-01-22',
  },
  {
    id: '21',
    name: 'Auto-Updater',
    slug: 'auto-updater',
    description: 'Automatically update all installed skills once daily. Runs via cron, checks for updates, applies them, and messages with a summary of what changed.',
    author: 'maximeprades',
    stars: 152,
    downloads: 21900,
    installs: 360,
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
  { value: 'downloads', label: '最多下载' },
  { value: 'stars', label: '最多收藏' },
  { value: 'newest', label: '最新上架' },
  { value: 'updated', label: '最近更新' },
  { value: 'installs', label: '最多安装' },
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
