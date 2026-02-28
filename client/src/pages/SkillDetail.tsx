/*
 * Design: Apple Vision Pro Spatial Glass
 * SkillDetail: Full detail page for a single skill
 * Sections: Header, Install, Description, Versions, Author, Related
 */

import { useState, useMemo } from 'react';
import { useParams, Link } from 'wouter';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SkillCard from '@/components/SkillCard';
import { skills, formatNumber } from '@/lib/skillsData';
import {
  ArrowLeft, Star, Download, Shield, ShieldCheck,
  Copy, Check, ExternalLink, Calendar, GitBranch,
  Tag, User, Clock, Package,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const categoryColors: Record<string, string> = {
  'dev-tools': '#007AFF',
  'ai-ml': '#AF52DE',
  'productivity': '#FF9500',
  'search': '#30D158',
  'communication': '#FF2D55',
  'security': '#FF3B30',
  'automation': '#5856D6',
  'media': '#FF9500',
};

const categoryNames: Record<string, string> = {
  'dev-tools': 'Dev Tools',
  'ai-ml': 'AI & ML',
  'productivity': 'Productivity',
  'search': 'Search & Data',
  'communication': 'Communication',
  'security': 'Security',
  'automation': 'Automation',
  'media': 'Media & Files',
};

export default function SkillDetail() {
  const params = useParams<{ slug: string }>();
  const skill = skills.find(s => s.slug === params.slug);
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'versions' | 'security'>('overview');

  const related = useMemo(() => {
    if (!skill) return [];
    return skills
      .filter(s => s.id !== skill.id && s.category === skill.category)
      .slice(0, 3);
  }, [skill]);

  if (!skill) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 pb-16">
          <div className="container text-center py-20">
            <h1 className="font-display font-bold text-2xl text-white/60 mb-4">
              Skill not found
            </h1>
            <Link
              href="/skills"
              className="text-[#007AFF] hover:text-[#0071E3] text-sm font-medium"
            >
              &larr; Back to skills
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const color = categoryColors[skill.category] || '#007AFF';

  const installCommands = [
    { label: 'CLI', cmd: `skillhub install ${skill.slug}` },
    { label: 'npm', cmd: `npx skillhub@latest add ${skill.slug}` },
    { label: 'URL', cmd: `https://skillhub.dev/skill/${skill.slug}` },
  ];

  const handleCopy = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <div className="container">
          {/* Back link */}
          <Link
            href="/skills"
            className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-white/60 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to skills
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header card */}
              <div className="glass-panel glass-highlight p-6 sm:p-8 relative overflow-hidden animate-fade-in-up">
                {/* Glow */}
                <div
                  className="absolute -top-32 -right-32 w-64 h-64 rounded-full blur-[80px] opacity-15"
                  style={{ background: color }}
                />

                <div className="relative z-10">
                  {/* Top row */}
                  <div className="flex items-start gap-4 mb-6">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl font-bold font-display shrink-0 shadow-lg"
                      style={{ background: `linear-gradient(135deg, ${color}, ${color}80)`, boxShadow: `0 8px 24px ${color}30` }}
                    >
                      {skill.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h1 className="font-display font-bold text-2xl sm:text-3xl text-white">
                          {skill.name}
                        </h1>
                        <span
                          className="px-2.5 py-1 rounded-lg text-xs font-mono font-medium"
                          style={{
                            background: `${color}15`,
                            color: color,
                            border: `1px solid ${color}25`,
                          }}
                        >
                          {skill.currentVersion}
                        </span>
                        {skill.highlighted && (
                          <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[#FFD60A]/10 text-[#FFD60A] border border-[#FFD60A]/20">
                            Highlighted
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-mono text-sm text-white/30">/{skill.slug}</span>
                        <span className="text-white/10">·</span>
                        <span
                          className="text-xs font-medium px-2 py-0.5 rounded-md"
                          style={{ background: `${color}10`, color: `${color}CC` }}
                        >
                          {categoryNames[skill.category]}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-white/55 leading-relaxed mb-6">
                    {skill.description}
                  </p>

                  {/* Stats row */}
                  <div className="flex flex-wrap items-center gap-5">
                    <div className="flex items-center gap-1.5">
                      <Star className="w-4 h-4 fill-current text-[#FFD60A]/60" />
                      <span className="text-sm text-white/50 font-medium">{formatNumber(skill.stars)} stars</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Download className="w-4 h-4 text-white/40" />
                      <span className="text-sm text-white/50 font-medium">{formatNumber(skill.downloads)} downloads</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Package className="w-4 h-4 text-white/40" />
                      <span className="text-sm text-white/50 font-medium">{skill.installs} installs</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {skill.securityStatus === 'benign' ? (
                        <ShieldCheck className="w-4 h-4 text-[#30D158]/60" />
                      ) : (
                        <Shield className="w-4 h-4 text-[#FF3B30]/60" />
                      )}
                      <span className="text-sm text-white/50 font-medium capitalize">
                        {skill.securityStatus}
                      </span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-5">
                    {skill.tags.map(tag => (
                      <span
                        key={tag}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs bg-white/5 text-white/40 border border-white/5"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="glass-panel rounded-xl overflow-hidden animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                <div className="flex border-b border-white/5">
                  {(['overview', 'versions', 'security'] as const).map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-5 py-3 text-sm font-medium capitalize transition-colors ${
                        activeTab === tab
                          ? 'text-white border-b-2 border-[#007AFF] bg-white/5'
                          : 'text-white/40 hover:text-white/60'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="p-6">
                  {activeTab === 'overview' && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-display font-semibold text-white mb-3">About</h3>
                        <p className="text-sm text-white/45 leading-relaxed">
                          {skill.description} This skill provides a comprehensive set of tools
                          and capabilities for AI agents. It follows the SkillHub specification
                          and is compatible with all major agent frameworks.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-white mb-3">Usage</h3>
                        <div className="glass-panel rounded-lg p-4">
                          <code className="font-mono text-sm text-white/60">
                            <span className="text-[#007AFF]">import</span>{' '}
                            <span className="text-[#FF9500]">{'{ '}{skill.name.replace(/\s+/g, '')}{' }'}</span>{' '}
                            <span className="text-[#007AFF]">from</span>{' '}
                            <span className="text-[#30D158]">'skillhub/{skill.slug}'</span>;
                            <br /><br />
                            <span className="text-white/30">// Initialize the skill</span>
                            <br />
                            <span className="text-[#007AFF]">const</span>{' '}
                            <span className="text-white/70">skill</span>{' '}
                            = <span className="text-[#007AFF]">new</span>{' '}
                            <span className="text-[#FF9500]">{skill.name.replace(/\s+/g, '')}</span>();
                            <br />
                            <span className="text-[#007AFF]">await</span>{' '}
                            skill.<span className="text-[#AF52DE]">initialize</span>();
                          </code>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'versions' && (
                    <div className="space-y-3">
                      {Array.from({ length: Math.min(skill.versions, 5) }, (_, i) => {
                        const major = parseInt(skill.currentVersion.replace('v', ''));
                        const ver = `v${Math.max(1, major - i)}.${i === 0 ? skill.currentVersion.split('.')[1] : '0'}.0`;
                        return (
                          <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                            <div className="flex items-center gap-3">
                              <GitBranch className="w-4 h-4 text-white/25" />
                              <span className="font-mono text-sm text-white/60">{i === 0 ? skill.currentVersion : ver}</span>
                              {i === 0 && (
                                <span className="px-2 py-0.5 rounded text-[10px] bg-[#30D158]/10 text-[#30D158] font-medium">
                                  latest
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-white/25">
                              {i === 0 ? skill.updatedAt : `2025-${String(12 - i).padStart(2, '0')}-01`}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {activeTab === 'security' && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-4 rounded-xl bg-[#30D158]/5 border border-[#30D158]/10">
                        <ShieldCheck className="w-6 h-6 text-[#30D158]" />
                        <div>
                          <h4 className="text-sm font-medium text-white">Security Status: {skill.securityStatus}</h4>
                          <p className="text-xs text-white/40 mt-0.5">
                            This skill has been scanned and verified. No known vulnerabilities detected.
                          </p>
                        </div>
                      </div>
                      <div className="text-sm text-white/40 space-y-2">
                        <p>Last scanned: {skill.updatedAt}</p>
                        <p>License: MIT</p>
                        <p>Dependencies: 3 (all verified)</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* Install card */}
              <div className="glass-panel glass-highlight p-5 space-y-4 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
                <h3 className="font-display font-semibold text-white text-sm">Install</h3>
                {installCommands.map(({ label, cmd }) => (
                  <div key={label}>
                    <label className="text-[11px] text-white/25 uppercase tracking-wider mb-1.5 block">
                      {label}
                    </label>
                    <div className="flex items-center gap-2 glass-panel rounded-lg px-3 py-2">
                      <code className="flex-1 font-mono text-xs text-white/50 truncate">
                        {cmd}
                      </code>
                      <button
                        onClick={() => handleCopy(cmd)}
                        className="shrink-0 p-1 text-white/25 hover:text-white/50 transition-colors"
                        aria-label={`Copy ${label} command`}
                      >
                        {copiedCmd === cmd ? (
                          <Check className="w-3.5 h-3.5 text-[#30D158]" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
                <Button
                  className="w-full bg-gradient-to-r from-[#007AFF] to-[#5856D6] hover:from-[#0071E3] hover:to-[#4F46E5] text-white border-0 rounded-xl shadow-lg shadow-[#007AFF]/20"
                  onClick={() => {
                    import('sonner').then(({ toast }) => toast.success(`${skill.name} install command copied!`));
                    handleCopy(installCommands[0].cmd);
                  }}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Install Skill
                </Button>
              </div>

              {/* Author card */}
              <div className="glass-panel glass-highlight p-5 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                <h3 className="font-display font-semibold text-white text-sm mb-4">Author</h3>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    style={{ background: `linear-gradient(135deg, ${color}80, ${color}40)` }}
                  >
                    {skill.author[0].toUpperCase()}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">@{skill.author}</div>
                    <div className="text-xs text-white/30">Skill Author</div>
                  </div>
                </div>
                <a
                  href={`https://github.com/${skill.author}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center gap-2 text-xs text-[#007AFF] hover:text-[#0071E3] transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  View on GitHub
                </a>
              </div>

              {/* Meta card */}
              <div className="glass-panel glass-highlight p-5 space-y-3 animate-fade-in-up" style={{ animationDelay: '250ms' }}>
                <h3 className="font-display font-semibold text-white text-sm mb-4">Details</h3>
                <div className="flex items-center gap-2.5 text-sm">
                  <Calendar className="w-4 h-4 text-white/25" />
                  <span className="text-white/35">Created</span>
                  <span className="ml-auto text-white/50 font-mono text-xs">{skill.createdAt}</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm">
                  <Clock className="w-4 h-4 text-white/25" />
                  <span className="text-white/35">Updated</span>
                  <span className="ml-auto text-white/50 font-mono text-xs">{skill.updatedAt}</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm">
                  <GitBranch className="w-4 h-4 text-white/25" />
                  <span className="text-white/35">Versions</span>
                  <span className="ml-auto text-white/50 font-mono text-xs">{skill.versions}</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm">
                  <User className="w-4 h-4 text-white/25" />
                  <span className="text-white/35">Installs</span>
                  <span className="ml-auto text-white/50 font-mono text-xs">{formatNumber(skill.installs)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Related skills */}
          {related.length > 0 && (
            <section className="mt-16">
              <h2 className="font-display font-bold text-2xl text-white tracking-tight mb-6">
                Related Skills
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {related.map(s => (
                  <SkillCard key={s.id} skill={s} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
