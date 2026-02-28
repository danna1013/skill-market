/*
 * Apple HIG SkillDetail — clean detail page, quiet sidebar
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
  'dev-tools': '#0071e3',
  'ai-ml': '#bf5af2',
  'productivity': '#ff9500',
  'search': '#30d158',
  'communication': '#ff2d55',
  'security': '#ff3b30',
  'automation': '#5856d6',
  'media': '#ff9500',
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

const tabLabels: Record<string, string> = {
  overview: '概览',
  versions: '版本',
  security: '安全',
};

export default function SkillDetail() {
  const params = useParams<{ slug: string }>();
  const skill = skills.find(s => s.slug === params.slug);
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'versions' | 'security'>('overview');

  const related = useMemo(() => {
    if (!skill) return [];
    return skills.filter(s => s.id !== skill.id && s.category === skill.category).slice(0, 3);
  }, [skill]);

  if (!skill) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 pb-16">
          <div className="container text-center py-24">
            <div className="glass-panel glass-highlight inline-block p-14 rounded-2xl">
              <Package className="w-10 h-10 mx-auto mb-4" style={{ color: 'var(--text-faint)' }} />
              <h1 className="font-display font-bold text-[22px] mb-3" style={{ color: 'var(--text-secondary)' }}>
                Skill Not Found
              </h1>
              <p className="text-[14px] mb-6" style={{ color: 'var(--text-muted)' }}>
                这个技能不存在或已下架。
              </p>
              <Link
                href="/skills"
                className="inline-flex items-center gap-1.5 text-[13px] font-medium transition-colors hover:opacity-70"
                style={{ color: 'var(--text-muted)' }}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                返回列表
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const color = categoryColors[skill.category] || '#0071e3';

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
          <Link
            href="/skills"
            className="inline-flex items-center gap-1.5 text-[13px] transition-colors mb-10 group hover:text-[var(--text-primary)]"
            style={{ color: 'var(--text-muted)' }}
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            返回
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header */}
              <div className="glass-panel glass-highlight p-7 sm:p-8 relative overflow-hidden animate-fade-in-up">
                <div
                  className="absolute -top-32 -right-32 w-64 h-64 rounded-full blur-[100px] opacity-[0.06]"
                  style={{ background: color }}
                />

                <div className="relative z-10">
                  <div className="flex items-start gap-4 mb-6">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-[20px] font-bold font-display shrink-0"
                      style={{ background: `linear-gradient(135deg, ${color}, ${color}88)` }}
                    >
                      {skill.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h1 className="font-display font-bold text-[24px] sm:text-[28px] tracking-[-0.03em]" style={{ color: 'var(--text-primary)' }}>
                          {skill.name}
                        </h1>
                        <span className="px-2 py-0.5 rounded-md text-[11px] font-mono" style={{ background: `${color}10`, color: `${color}CC` }}>
                          {skill.currentVersion}
                        </span>
                        {skill.highlighted && (
                          <span className="px-2 py-0.5 rounded-md text-[11px] font-medium" style={{ background: 'var(--surface-subtle)', color: 'var(--text-muted)', border: '1px solid var(--divider)' }}>
                            精选
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="font-mono text-[13px]" style={{ color: 'var(--text-faint)' }}>/{skill.slug}</span>
                        <span style={{ color: 'var(--divider)' }}>·</span>
                        <span className="text-[12px]" style={{ color: `${color}CC` }}>
                          {categoryNames[skill.category]}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="leading-relaxed mb-6 text-[15px]" style={{ color: 'var(--text-muted)' }}>
                    {skill.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-5">
                    <div className="flex items-center gap-1.5">
                      <Star className="w-4 h-4 fill-current text-[#FFD60A]/50" />
                      <span className="text-[13px]" style={{ color: 'var(--text-tertiary)' }}>{formatNumber(skill.stars)}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Download className="w-4 h-4" style={{ color: 'var(--text-faint)' }} />
                      <span className="text-[13px]" style={{ color: 'var(--text-tertiary)' }}>{formatNumber(skill.downloads)} 下载</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Package className="w-4 h-4" style={{ color: 'var(--text-faint)' }} />
                      <span className="text-[13px]" style={{ color: 'var(--text-tertiary)' }}>{skill.installs} 安装</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {skill.securityStatus === 'benign' ? (
                        <ShieldCheck className="w-4 h-4 text-[#30d158]/60" />
                      ) : (
                        <Shield className="w-4 h-4 text-[#ff3b30]/60" />
                      )}
                      <span className="text-[13px]" style={{ color: 'var(--text-tertiary)' }}>
                        {skill.securityStatus === 'benign' ? '已验证' : '待审查'}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-5">
                    {skill.tags.map(tag => (
                      <span
                        key={tag}
                        className="flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px]"
                        style={{ background: 'var(--surface-subtle)', color: 'var(--text-faint)', border: '1px solid var(--divider)' }}
                      >
                        <Tag className="w-2.5 h-2.5" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="glass-panel glass-highlight rounded-2xl overflow-hidden animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                <div className="flex" style={{ borderBottom: '1px solid var(--divider)' }}>
                  {(['overview', 'versions', 'security'] as const).map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className="relative px-5 py-3.5 text-[13px] font-medium transition-all duration-200"
                      style={{
                        color: activeTab === tab ? 'var(--text-primary)' : 'var(--text-faint)',
                        background: activeTab === tab ? 'var(--surface-subtle)' : 'transparent',
                      }}
                    >
                      {tabLabels[tab]}
                      {activeTab === tab && (
                        <span className="absolute bottom-0 left-1/4 right-1/4 h-[1.5px] rounded-full" style={{ background: 'var(--text-primary)' }} />
                      )}
                    </button>
                  ))}
                </div>

                <div className="p-6">
                  {activeTab === 'overview' && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-display font-semibold text-[15px] mb-3" style={{ color: 'var(--text-primary)' }}>关于</h3>
                        <p className="text-[14px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                          {skill.description} 遵循 SkillHub 规范，兼容主流智能体框架。
                        </p>
                      </div>

                      <div>
                        <h3 className="font-display font-semibold text-[15px] mb-3" style={{ color: 'var(--text-primary)' }}>Quick Start</h3>
                        <div className="glass-panel rounded-xl p-5 relative group">
                          <button
                            onClick={() => handleCopy(`import { ${skill.name.replace(/\s+/g, '')} } from 'skillhub/${skill.slug}';`)}
                            className="absolute top-3 right-3 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200"
                            style={{ color: 'var(--text-faint)' }}
                            aria-label="复制"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                          <code className="font-mono text-[13px] leading-relaxed">
                            <span className="text-[#0071e3]">import</span>{' '}
                            <span className="text-[#ff9500]">{'{ '}{skill.name.replace(/\s+/g, '')}{' }'}</span>{' '}
                            <span className="text-[#0071e3]">from</span>{' '}
                            <span className="text-[#30d158]">'skillhub/{skill.slug}'</span>;
                            <br /><br />
                            <span style={{ color: 'var(--text-faint)' }}>// Initialize</span>
                            <br />
                            <span className="text-[#0071e3]">const</span>{' '}
                            <span style={{ color: 'var(--text-secondary)' }}>skill</span>{' '}
                            = <span className="text-[#0071e3]">new</span>{' '}
                            <span className="text-[#ff9500]">{skill.name.replace(/\s+/g, '')}</span>();
                            <br />
                            <span className="text-[#0071e3]">await</span>{' '}
                            <span style={{ color: 'var(--text-secondary)' }}>skill</span>.<span className="text-[#bf5af2]">initialize</span>();
                          </code>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'versions' && (
                    <div className="space-y-0">
                      {Array.from({ length: Math.min(skill.versions, 5) }, (_, i) => {
                        const major = parseInt(skill.currentVersion.replace('v', ''));
                        const ver = `v${Math.max(1, major - i)}.${i === 0 ? skill.currentVersion.split('.')[1] : '0'}.0`;
                        return (
                          <div key={i} className="flex items-center justify-between py-3.5 last:border-0" style={{ borderBottom: '1px solid var(--divider)' }}>
                            <div className="flex items-center gap-3">
                              <GitBranch className="w-3.5 h-3.5" style={{ color: 'var(--text-faint)' }} />
                              <span className="font-mono text-[13px]" style={{ color: 'var(--text-secondary)' }}>{i === 0 ? skill.currentVersion : ver}</span>
                              {i === 0 && (
                                <span className="px-1.5 py-0.5 rounded-md text-[10px] font-mono text-[#30d158] bg-[#30d158]/8">
                                  latest
                                </span>
                              )}
                            </div>
                            <span className="text-[12px] font-mono" style={{ color: 'var(--text-faint)' }}>
                              {i === 0 ? skill.updatedAt : `2025-${String(12 - i).padStart(2, '0')}-01`}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {activeTab === 'security' && (
                    <div className="space-y-5">
                      <div className="flex items-center gap-3 p-5 rounded-xl bg-[#30d158]/[0.04]" style={{ border: '1px solid rgba(48,209,88,0.1)' }}>
                        <div className="w-10 h-10 rounded-xl bg-[#30d158]/8 flex items-center justify-center shrink-0">
                          <ShieldCheck className="w-5 h-5 text-[#30d158]" />
                        </div>
                        <div>
                          <h4 className="text-[14px] font-medium" style={{ color: 'var(--text-primary)' }}>
                            {skill.securityStatus === 'benign' ? '安全扫描通过' : '待审查'}
                          </h4>
                          <p className="text-[12px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
                            未发现已知漏洞或恶意代码。
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="glass-panel rounded-xl p-4 text-center">
                          <div className="text-[11px] mb-1" style={{ color: 'var(--text-faint)' }}>上次扫描</div>
                          <div className="text-[13px] font-mono" style={{ color: 'var(--text-secondary)' }}>{skill.updatedAt}</div>
                        </div>
                        <div className="glass-panel rounded-xl p-4 text-center">
                          <div className="text-[11px] mb-1" style={{ color: 'var(--text-faint)' }}>许可证</div>
                          <div className="text-[13px] font-medium" style={{ color: 'var(--text-secondary)' }}>MIT</div>
                        </div>
                        <div className="glass-panel rounded-xl p-4 text-center">
                          <div className="text-[11px] mb-1" style={{ color: 'var(--text-faint)' }}>依赖</div>
                          <div className="text-[13px] font-medium" style={{ color: 'var(--text-secondary)' }}>3 个，均安全</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* Install */}
              <div className="glass-panel glass-highlight p-5 space-y-4 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
                <h3 className="font-display font-semibold text-[14px] flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                  <Terminal className="w-4 h-4" style={{ color: 'var(--text-faint)' }} />
                  安装
                </h3>
                {installCommands.map(({ label, cmd, icon }) => (
                  <div key={label}>
                    <label className="text-[10px] uppercase tracking-wider mb-1.5 block font-medium flex items-center gap-1.5" style={{ color: 'var(--text-faint)' }}>
                      {icon} {label}
                    </label>
                    <div className="flex items-center gap-2 glass-panel rounded-xl px-3 py-2.5 group/cmd">
                      <code className="flex-1 font-mono text-[12px] truncate" style={{ color: 'var(--text-tertiary)' }}>
                        {cmd}
                      </code>
                      <button
                        onClick={() => handleCopy(cmd)}
                        className="shrink-0 p-1 opacity-0 group-hover/cmd:opacity-100 transition-all duration-200"
                        style={{ color: 'var(--text-faint)' }}
                        aria-label={`复制 ${label}`}
                      >
                        {copiedCmd === cmd ? <Check className="w-3.5 h-3.5 text-[#30d158]" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                ))}
                <Button
                  className="w-full rounded-full text-[13px] font-medium shadow-md transition-all duration-300"
                  style={{ background: 'var(--text-primary)', color: 'var(--background)' }}
                  onClick={() => {
                    import('sonner').then(({ toast }) => toast.success(`${skill.name} 安装命令已复制`));
                    handleCopy(installCommands[0].cmd);
                  }}
                >
                  <Download className="w-4 h-4 mr-1.5" />
                  Install Skill
                </Button>
              </div>

              {/* Author */}
              <div className="glass-panel glass-highlight p-5 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                <h3 className="font-display font-semibold text-[14px] mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                  <User className="w-4 h-4" style={{ color: 'var(--text-faint)' }} />
                  开发者
                </h3>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-[13px]"
                    style={{ background: `linear-gradient(135deg, ${color}88, ${color}44)` }}
                  >
                    {skill.author[0].toUpperCase()}
                  </div>
                  <div>
                    <div className="text-[14px] font-medium" style={{ color: 'var(--text-primary)' }}>@{skill.author}</div>
                  </div>
                </div>
                <a
                  href={`https://github.com/${skill.author}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center gap-1.5 text-[12px] transition-colors hover:text-[var(--text-primary)]"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <Github className="w-3.5 h-3.5" />
                  GitHub Profile
                  <ExternalLink className="w-3 h-3 opacity-50" />
                </a>
              </div>

              {/* Meta */}
              <div className="glass-panel glass-highlight p-5 space-y-3 animate-fade-in-up" style={{ animationDelay: '250ms' }}>
                <h3 className="font-display font-semibold text-[14px] mb-4" style={{ color: 'var(--text-primary)' }}>详情</h3>
                {[
                  { icon: <Calendar className="w-3.5 h-3.5" />, label: '首次发布', value: skill.createdAt },
                  { icon: <Clock className="w-3.5 h-3.5" />, label: '最近更新', value: skill.updatedAt },
                  { icon: <GitBranch className="w-3.5 h-3.5" />, label: '版本数', value: String(skill.versions) },
                  { icon: <Download className="w-3.5 h-3.5" />, label: '下载', value: formatNumber(skill.downloads) },
                  { icon: <User className="w-3.5 h-3.5" />, label: '安装', value: formatNumber(skill.installs) },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-2.5 text-[13px] py-0.5">
                    <span style={{ color: 'var(--text-faint)' }}>{item.icon}</span>
                    <span style={{ color: 'var(--text-muted)' }}>{item.label}</span>
                    <span className="ml-auto font-mono text-[12px]" style={{ color: 'var(--text-secondary)' }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <section className="mt-20">
              <div className="w-full h-px mb-12" style={{ background: 'var(--divider)' }} />
              <h2 className="font-display font-bold text-[22px] tracking-[-0.02em] mb-6" style={{ color: 'var(--text-primary)' }}>
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
