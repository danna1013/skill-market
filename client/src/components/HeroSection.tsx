/*
 * Design: Apple Vision Pro Spatial Glass
 * Hero: Dark immersive background with floating ambient orbs,
 * large gradient text headline, glass search capsule, install command
 */

import { useState } from 'react';
import { useLocation } from 'wouter';
import { Search, ArrowRight, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HERO_BG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663382927503/dZimuEEnzuoeYBhNrhYQa6/hero-bg-UXLPCcsLjxQTKQoSY7mF8H.webp';
const ORB_1 = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663382927503/dZimuEEnzuoeYBhNrhYQa6/hero-orb-1-4XAB5Ed3oaNNExmEHXqJLZ.webp';
const ORB_2 = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663382927503/dZimuEEnzuoeYBhNrhYQa6/hero-orb-2-mKGJbdNSpa878fNzmaMw8N.webp';

export default function HeroSection() {
  const [, navigate] = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'npm' | 'pnpm' | 'bun'>('npm');

  const installCommands = {
    npm: 'npx skillhub@latest install',
    pnpm: 'pnpm dlx skillhub@latest install',
    bun: 'bunx skillhub@latest install',
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/skills?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/skills');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(installCommands[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={HERO_BG}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background" />
      </div>

      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          src={ORB_1}
          alt=""
          className="absolute -top-20 -right-20 w-[400px] h-[400px] opacity-20 animate-float-slow blur-sm"
        />
        <img
          src={ORB_2}
          alt=""
          className="absolute -bottom-32 -left-20 w-[350px] h-[350px] opacity-15 animate-float-slower blur-sm"
        />
        {/* CSS orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#007AFF]/8 blur-[80px] animate-float-slow" />
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full bg-[#AF52DE]/8 blur-[60px] animate-float-slower" />
      </div>

      {/* Content */}
      <div className="container relative z-10 pt-24 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel text-sm mb-8 animate-fade-in-up"
          >
            <span className="w-2 h-2 rounded-full bg-[#30D158] animate-pulse" />
            <span className="text-white/60">12,000+ skills available</span>
          </div>

          {/* Headline */}
          <h1
            className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight mb-6 animate-fade-in-up"
            style={{ animationDelay: '100ms' }}
          >
            The skill dock for{' '}
            <span className="gradient-text">sharp agents</span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-lg sm:text-xl text-white/45 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up"
            style={{ animationDelay: '200ms' }}
          >
            Discover, install, and share AI agent skills. Versioned like npm,
            searchable with vectors. No gatekeeping, just signal.
          </p>

          {/* Search bar */}
          <form
            onSubmit={handleSearch}
            className="animate-fade-in-up"
            style={{ animationDelay: '300ms' }}
          >
            <div className="relative max-w-xl mx-auto search-glow rounded-2xl transition-all duration-300">
              <div className="glass-panel-strong glass-highlight rounded-2xl flex items-center px-5 py-3.5">
                <Search className="w-5 h-5 text-white/30 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search skills by name, description, or tag..."
                  className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-white/25 ml-3 text-sm"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="shrink-0 bg-gradient-to-r from-[#007AFF] to-[#5856D6] hover:from-[#0071E3] hover:to-[#4F46E5] text-white border-0 rounded-xl px-5 shadow-lg shadow-[#007AFF]/20"
                >
                  Search
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </div>
            </div>
          </form>

          {/* CTA buttons */}
          <div
            className="flex flex-wrap items-center justify-center gap-4 mt-8 animate-fade-in-up"
            style={{ animationDelay: '400ms' }}
          >
            <Button
              onClick={() => navigate('/skills')}
              className="bg-gradient-to-r from-[#007AFF] to-[#5856D6] hover:from-[#0071E3] hover:to-[#4F46E5] text-white border-0 rounded-xl px-6 py-5 text-sm font-medium shadow-lg shadow-[#007AFF]/20 hover:shadow-[#007AFF]/30 transition-all duration-300"
            >
              Browse Skills
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                import('sonner').then(({ toast }) => toast('Upload feature coming soon'));
              }}
              className="bg-transparent border-white/10 text-white/70 hover:bg-white/5 hover:text-white hover:border-white/20 rounded-xl px-6 py-5 text-sm"
            >
              Publish a Skill
            </Button>
          </div>

          {/* Install command */}
          <div
            className="mt-12 max-w-md mx-auto animate-fade-in-up"
            style={{ animationDelay: '500ms' }}
          >
            <div className="glass-panel rounded-xl overflow-hidden">
              {/* Tabs */}
              <div className="flex border-b border-white/5">
                {(['npm', 'pnpm', 'bun'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 px-4 py-2 text-xs font-mono font-medium transition-colors ${
                      activeTab === tab
                        ? 'text-white bg-white/5'
                        : 'text-white/30 hover:text-white/50'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              {/* Command */}
              <div className="flex items-center justify-between px-4 py-3">
                <code className="font-mono text-sm text-white/60">
                  {installCommands[activeTab]}
                </code>
                <button
                  onClick={handleCopy}
                  className="p-1.5 rounded-md hover:bg-white/5 text-white/30 hover:text-white/60 transition-colors"
                  aria-label="Copy command"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-[#30D158]" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
