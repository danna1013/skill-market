/*
 * Apple HIG-inspired Hero
 * Clean, confident, generous whitespace
 */

import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import { Search, ArrowRight, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';

const HERO_BG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663382927503/dZimuEEnzuoeYBhNrhYQa6/hero-bg-UXLPCcsLjxQTKQoSY7mF8H.webp';
const ORB_1 = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663382927503/dZimuEEnzuoeYBhNrhYQa6/hero-orb-1-4XAB5Ed3oaNNExmEHXqJLZ.webp';
const ORB_2 = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663382927503/dZimuEEnzuoeYBhNrhYQa6/hero-orb-2-mKGJbdNSpa878fNzmaMw8N.webp';

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number; pulse: number }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener('resize', resize);

    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 1.2 + 0.4,
        alpha: Math.random() * 0.3 + 0.05,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    const particleColor = theme === 'dark' ? '100, 140, 255' : '0, 113, 227';

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.015;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
        const currentAlpha = p.alpha * (0.5 + 0.5 * Math.sin(p.pulse));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particleColor}, ${currentAlpha})`;
        ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${particleColor}, ${0.02 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.45 }}
    />
  );
}

export default function HeroSection() {
  const [, navigate] = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'npm' | 'pnpm' | 'bun'>('npm');
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => { setMounted(true); }, []);

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
        {theme === 'dark' && (
          <img src={HERO_BG} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/10 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-background/30" />
        <div className="absolute inset-0" style={{
          background: `radial-gradient(ellipse 70% 60% at 50% 45%, transparent 0%, var(--hero-vignette) 100%)`
        }} />
      </div>

      {/* Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {theme === 'dark' && (
          <>
            <img src={ORB_1} alt="" className="absolute -top-20 -right-20 w-[400px] h-[400px] opacity-15 animate-float-slow blur-sm" />
            <img src={ORB_2} alt="" className="absolute -bottom-32 -left-20 w-[360px] h-[360px] opacity-10 animate-float-slower blur-sm" />
          </>
        )}
        <div className={`absolute top-[22%] left-[18%] w-80 h-80 rounded-full blur-[120px] animate-float-slow ${
          theme === 'dark' ? 'bg-[#0a84ff]/5' : 'bg-[#0071e3]/6'
        }`} />
        <div className={`absolute bottom-[20%] right-[18%] w-64 h-64 rounded-full blur-[100px] animate-float-slower ${
          theme === 'dark' ? 'bg-[#bf5af2]/5' : 'bg-[#bf5af2]/5'
        }`} />
      </div>

      <ParticleField />

      {/* Content */}
      <div className="container relative z-10 pt-32 pb-24">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-panel text-[13px] mb-12 transition-all duration-700 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#30d158] opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#30d158]" />
            </span>
            <span style={{ color: 'var(--text-muted)' }}>12,239 skills and counting</span>
          </div>

          {/* Headline */}
          <h1
            className={`font-display font-bold text-[2.75rem] sm:text-[3.5rem] lg:text-[4.25rem] leading-[1.08] tracking-[-0.035em] mb-6 transition-all duration-700 delay-100 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span style={{ color: 'var(--text-primary)' }}>
              One install away from
            </span>
            <br />
            <span className="gradient-text">
              a smarter agent.
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className={`text-[17px] sm:text-[19px] max-w-lg mx-auto mb-14 leading-[1.65] transition-all duration-700 delay-200 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ color: 'var(--text-muted)', fontWeight: 400 }}
          >
            开源技能，即装即用。让你的智能体做到更多。
          </p>

          {/* Search */}
          <form
            onSubmit={handleSearch}
            className={`transition-all duration-700 delay-300 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="relative max-w-lg mx-auto search-glow rounded-2xl transition-all duration-300">
              <div className="glass-panel-strong glass-highlight rounded-2xl flex items-center px-5 py-4">
                <Search className="w-[18px] h-[18px] shrink-0" style={{ color: 'var(--text-faint)' }} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="搜索技能、标签或作者..."
                  className="flex-1 bg-transparent border-none outline-none ml-3 text-[15px]"
                  style={{ color: 'var(--text-primary)' }}
                />
                <Button
                  type="submit"
                  size="sm"
                  className="shrink-0 rounded-xl px-5 text-[13px] font-medium shadow-md transition-all duration-300"
                  style={{
                    background: 'var(--text-primary)',
                    color: 'var(--background)',
                  }}
                >
                  搜索
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </div>
            </div>
          </form>

          {/* CTA */}
          <div
            className={`flex flex-wrap items-center justify-center gap-3 mt-8 transition-all duration-700 delay-[400ms] ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Button
              onClick={() => navigate('/skills')}
              className="rounded-full px-7 py-5 text-[14px] font-medium shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
              style={{
                background: 'var(--text-primary)',
                color: 'var(--background)',
              }}
            >
              Browse Skills
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/upload')}
              className="rounded-full px-7 py-5 text-[14px] font-medium bg-transparent transition-all duration-300"
              style={{ borderColor: 'var(--divider)', color: 'var(--text-secondary)' }}
            >
              Publish a Skill
            </Button>
          </div>

          {/* Install command */}
          <div
            className={`mt-16 max-w-md mx-auto transition-all duration-700 delay-500 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="glass-panel rounded-2xl overflow-hidden">
              <div className="flex" style={{ borderBottom: '1px solid var(--divider)' }}>
                {(['npm', 'pnpm', 'bun'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 px-4 py-2.5 text-[12px] font-mono font-medium transition-all duration-200 relative ${
                      activeTab === tab ? '' : 'hover:bg-[var(--surface-hover)]'
                    }`}
                    style={{
                      color: activeTab === tab ? 'var(--text-primary)' : 'var(--text-faint)',
                      background: activeTab === tab ? 'var(--surface-active)' : 'transparent',
                    }}
                  >
                    {tab}
                    {activeTab === tab && (
                      <span className="absolute bottom-0 left-1/4 right-1/4 h-[1.5px] rounded-full" style={{ background: 'var(--text-primary)' }} />
                    )}
                  </button>
                ))}
              </div>
              <div className="flex items-center justify-between px-5 py-3.5">
                <code className="font-mono text-[13px]" style={{ color: 'var(--text-tertiary)' }}>
                  {installCommands[activeTab]}
                </code>
                <button
                  onClick={handleCopy}
                  className="p-1.5 rounded-lg hover:bg-[var(--surface-hover)] transition-all duration-200"
                  style={{ color: 'var(--text-faint)' }}
                  aria-label="复制命令"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-[#30d158]" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
