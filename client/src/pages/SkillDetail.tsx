/*
 * Design: Apple Vision Pro Spatial Glass
 * SkillDetail: Full detail page for a single skill
 * Enhanced: Refined header, better code blocks, smoother animations
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
  Tag, User, Clock, Package, Github, Terminal,
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
            <div className="glass-panel glass-highlight inline-block p-12 rounded-2xl">
              <Package className="w-12 h-12 text-white/15 mx-auto mb-4" />
              <h1 className="font-display font-bold text-2xl text-white/55 mb-3">
                Skill not found
              </h1>
              <p className="text-sm text-white/30 mb-6">
                The skill you're looking for doesn't exist or has been removed.
              </p>
              <Link
                href="/skills"
                className="inline-flex items-center gap-1.5 text-[#007AFF] hover:text-[#0071E3] text-sm font-medium transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to skills
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const color = categoryColors[skill.category] || '#007AFF';

  const installCommands = [
    { label: 'CLI', cmd: `skillhub install ${skill.slug}`, icon: <Terminal className="w-3 h-3" /> },
    { label: 'npm', cmd: `npx skillhub@latest add ${skill.slug}`, icon: <Package className="w-3 h-3" /> },
    { label: 'URL', cmd: `https://skillhub.dev/skill/${skill.slug}`, icon: <ExternalLink className="w-3 h-3" /> },
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
            className="inline-flex items-center gap-1.5 text-sm text-white/35 hover:text-white/55 transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to skills
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header card */}
              <div className="glass-panel glass-highlight p-6 sm:p-8 relative overflow-hidden animate-fade-in-up">
                {/* Glow */}
                <div
                  className="absolute -top-32 -right-32 w-64 h-64 rounded-full blur-[80px] opacity-12"
                  style={{ background: color }}
                />
                <div
                  className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full blur-[60px] opacity-6"
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
                        <h1 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-[-0.02em]">
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
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="font-mono text-sm text-white/25">/{skill.slug}</span>
                        <span className="text-white/8">·</span>
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
                  <p className="text-white/50 leading-relaxed mb-6 text-[15px]">
                    {skill.description}
                  </p>

                  {/* Stats row */}
                  <div className="flex flex-wrap items-center gap-5">
                    <div className="flex items-center gap-1.5">
                      <Star className="w-4 h-4 fill-current text-[#FFD60A]/55" />
                      <span className="text-sm text-white/45 font-medium">{formatNumber(skill.stars)} stars</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Download className="w-4 h-4 text-white/35" />
                      <span className="text-sm text-white/45 font-medium">{formatNumber(skill.downloads)} downloads</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Package className="w-4 h-4 text-white/35" />
                      <span className="text-sm text-white/45 font-medium">{skill.installs} installs</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {skill.securityStatus === 'benign' ? (
                        <ShieldCheck className="w-4 h-4 text-[#30D158]/55" />
                      ) : (
                        <Shield className="w-4 h-4 text-[#FF3B30]/55" />
                      )}
                      <span className="text-sm text-white/45 font-medium capitalize">
                        {skill.securityStatus}
                      </span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-5">
                    {skill.tags.map(tag => (
                      <span
                        key={tag}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs bg-white/[4%] text-white/35 border border-white/[5%] hover:bg-white/[6%] hover:text-white/45 transition-colors"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="glass-panel glass-highlight rounded-xl overflow-hidden animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                <div className="flex border-b border-white/[5%]">
                  {(['overview', 'versions', 'security'] as const).map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`relative px-5 py-3.5 text-sm font-medium capitalize transition-all duration-200 ${
                        activeTab === tab
                          ? 'text-white bg-white/[4%]'
                          : 'text-white/35 hover:text-white/55'
                      }`}
                    >
                      {tab}
                      {activeTab === tab && (
                        <span className="absolute bottom-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-[#007AFF] to-[#5856D6] rounded-full" />
                      )}
                    </button>
                  ))}
                </div>

                <div className="p-6">
                  {activeTab === 'overview' && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-display font-semibold text-white mb-3">About</h3>
                        <p className="text-sm text-white/40 leading-relaxed">
                          {skill.description} This skill provides a comprehensive set of tools
                          and capabilities for AI agents. It follows the SkillHub specification
                          and is compatible with all major agent frameworks.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-white mb-3">Usage</h3>
                        <div className="glass-panel rounded-xl p-5 relative group">
                          <button
                            onClick={() => handleCopy(`import { ${skill.name.replace(/\s+/g, '')} } from 'skillhub/${skill.slug}';`)}
                            className="absolute top-3 right-3 p-1.5 rounded-md opacity-0 group-hover:opacity-100 hover:bg-white/5 text-white/25 hover:text-white/50 transition-all duration-200"
                            aria-label="Copy code"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                          <code className="font-mono text-sm leading-relaxed">
                            <span className="text-[#007AFF]">import</span>{' '}
                            <span className="text-[#FF9500]">{'{ '}{skill.name.replace(/\s+/g, '')}{' }'}</span>{' '}
                            <span className="text-[#007AFF]">from</span>{' '}
                            <span className="text-[#30D158]">'skillhub/{skill.slug}'</span>;
                            <br /><br />
                            <span className="text-white/20">// Initialize the skill</span>
                            <br />
                            <span className="text-[#007AFF]">const</span>{' '}
                            <span className="text-white/65">skill</span>{' '}
                            = <span className="text-[#007AFF]">new</span>{' '}
                            <span className="text-[#FF9500]">{skill.name.replace(/\s+/g, '')}</span>();
                            <br />
                            <span className="text-[#007AFF]">await</span>{' '}
                            <span className="text-white/65">skill</span>.<span className="text-[#AF52DE]">initialize</span>();
                          </code>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'versions' && (
                    <div className="space-y-1">
                      {Array.from({ length: Math.min(skill.versions, 5) }, (_, i) => {
                        const major = parseInt(skill.currentVersion.replace('v', ''));
                        const ver = `v${Math.max(1, major - i)}.${i === 0 ? skill.currentVersion.split('.')[1] : '0'}.0`;
                        return (
                          <div key={i} className="flex items-center justify-between py-3.5 border-b border-white/[4%] last:border-0">
                            <div className="flex items-center gap-3">
                              <div className="w-7 h-7 rounded-lg bg-white/[4%] flex items-center justify-center">
                                <GitBranch className="w-3.5 h-3.5 text-white/25" />
                              </div>
                              <span className="font-mono text-sm text-white/55">{i === 0 ? skill.currentVersion : ver}</span>
                              {i === 0 && (
                                <span className="px-2 py-0.5 rounded-md text-[10px] bg-[#30D158]/10 text-[#30D158] font-medium border border-[#30D158]/15">
                                  latest
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-white/20 font-mono">
                              {i === 0 ? skill.updatedAt : `2025-${String(12 - i).padStart(2, '0')}-01`}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {activeTab === 'security' && (
                    <div className="space-y-5">
                      <div className="flex items-center gap-3 p-5 rounded-xl bg-[#30D158]/[4%] border border-[#30D158]/10">
                        <div className="w-10 h-10 rounded-xl bg-[#30D158]/10 flex items-center justify-center shrink-0">
                          <ShieldCheck className="w-5 h-5 text-[#30D158]" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-white">Security Status: <span className="capitalize">{skill.securityStatus}</span></h4>
                          <p className="text-xs text-white/35 mt-0.5">
                            This skill has been scanned and verified. No known vulnerabilities detected.
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="glass-panel rounded-xl p-4 text-center">
                          <div className="text-xs text-white/25 mb-1">Last Scanned</div>
                          <div className="text-sm text-white/55 font-mono">{skill.updatedAt}</div>
                        </div>
                        <div className="glass-panel rounded-xl p-4 text-center">
                          <div className="text-xs text-white/25 mb-1">License</div>
                          <div className="text-sm text-white/55 font-medium">MIT</div>
                        </div>
                        <div className="glass-panel rounded-xl p-4 text-center">
                          <div className="text-xs text-white/25 mb-1">Dependencies</div>
                          <div className="text-sm text-white/55 font-medium">3 verified</div>
                        </div>
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
                <h3 className="font-display font-semibold text-white text-sm flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-white/35" />
                  Install
                </h3>
                {installCommands.map(({ label, cmd, icon }) => (
                  <div key={label}>
                    <label className="text-[11px] text-white/20 uppercase tracking-wider mb-1.5 block font-medium flex items-center gap-1.5">
                      {icon}
                      {label}
                    </label>
                    <div className="flex items-center gap-2 glass-panel rounded-lg px-3 py-2.5 group/cmd">
                      <code className="flex-1 font-mono text-xs text-white/45 truncate">
                        {cmd}
                      </code>
                      <button
                        onClick={() => handleCopy(cmd)}
                        className="shrink-0 p-1 text-white/20 hover:text-white/45 opacity-0 group-hover/cmd:opacity-100 transition-all duration-200"
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
                  className="w-full bg-gradient-to-r from-[#007AFF] to-[#5856D6] hover:from-[#0071E3] hover:to-[#4F46E5] text-white border-0 rounded-xl shadow-lg shadow-[#007AFF]/20 hover:shadow-[#007AFF]/35 transition-all duration-300"
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
                <h3 className="font-display font-semibold text-white text-sm mb-4 flex items-center gap-2">
                  <User className="w-4 h-4 text-white/35" />
                  Author
                </h3>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    style={{ background: `linear-gradient(135deg, ${color}80, ${color}40)` }}
                  >
                    {skill.author[0].toUpperCase()}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">@{skill.author}</div>
                    <div className="text-xs text-white/25">Skill Author</div>
                  </div>
                </div>
                <a
                  href={`https://github.com/${skill.author}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center gap-2 text-xs text-[#007AFF] hover:text-[#0071E3] transition-colors group/link"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span className="group-hover/link:underline">View on GitHub</span>
                  <ExternalLink className="w-3 h-3 opacity-50" />
                </a>
              </div>

              {/* Meta card */}
              <div className="glass-panel glass-highlight p-5 space-y-3 animate-fade-in-up" style={{ animationDelay: '250ms' }}>
                <h3 className="font-display font-semibold text-white text-sm mb-4">Details</h3>
                {[
                  { icon: <Calendar className="w-4 h-4" />, label: 'Created', value: skill.createdAt },
                  { icon: <Clock className="w-4 h-4" />, label: 'Updated', value: skill.updatedAt },
                  { icon: <GitBranch className="w-4 h-4" />, label: 'Versions', value: String(skill.versions) },
                  { icon: <Download className="w-4 h-4" />, label: 'Downloads', value: formatNumber(skill.downloads) },
                  { icon: <User className="w-4 h-4" />, label: 'Installs', value: formatNumber(skill.installs) },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-2.5 text-sm py-0.5">
                    <span className="text-white/20">{item.icon}</span>
                    <span className="text-white/30">{item.label}</span>
                    <span className="ml-auto text-white/50 font-mono text-xs">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Related skills */}
          {related.length > 0 && (
            <section className="mt-16">
              <div className="w-full h-px bg-gradient-to-r from-transparent via-white/8 to-transparent mb-10" />
              <h2 className="font-display font-bold text-2xl text-white tracking-[-0.02em] mb-6">
                Related Skills
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {related.map((s, i) => (
                  <div key={s.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
                    <SkillCard skill={s} />
                  </div>
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
