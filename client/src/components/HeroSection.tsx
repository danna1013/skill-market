/*
 * Design: Apple-style dual theme
 * Hero: Immersive background with floating ambient orbs,
 * large gradient text headline, glass search capsule, install command
 * Light: soft pastel orbs on white; Dark: deep spatial orbs
 */

import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import { Search, ArrowRight, Copy, Check, Sparkles } from 'lucide-react';
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
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.4 + 0.1,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    const particleColor = theme === 'dark' ? '120, 160, 255' : '0, 122, 255';

    const animate = () => {
      ctx.clearRect(0, 0, w, h);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.02;

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
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${particleColor}, ${0.03 * (1 - dist / 120)})`;
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
      style={{ opacity: 0.6 }}
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

  useEffect(() => {
    setMounted(true);
  }, []);

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
    <section className="relative min-h-[94vh] flex items-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0">
        {/* Dark mode: show image bg; Light mode: subtle gradient */}
        {theme === 'dark' && (
          <img
            src={HERO_BG}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-35"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/20 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-background/40" />
        <div className="absolute inset-0" style={{
          background: `radial-gradient(ellipse 70% 60% at 50% 45%, transparent 0%, var(--hero-vignette) 100%)`
        }} />
      </div>

      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {theme === 'dark' && (
          <>
            <img src={ORB_1} alt="" className="absolute -top-20 -right-20 w-[420px] h-[420px] opacity-18 animate-float-slow blur-sm" />
            <img src={ORB_2} alt="" className="absolute -bottom-32 -left-20 w-[380px] h-[380px] opacity-12 animate-float-slower blur-sm" />
          </>
        )}
        <div className={`absolute top-[20%] left-[20%] w-72 h-72 rounded-full blur-[100px] animate-float-slow ${
          theme === 'dark' ? 'bg-[#007AFF]/6' : 'bg-[#007AFF]/8'
        }`} />
        <div className={`absolute bottom-[25%] right-[20%] w-56 h-56 rounded-full blur-[80px] animate-float-slower ${
          theme === 'dark' ? 'bg-[#AF52DE]/6' : 'bg-[#AF52DE]/8'
        }`} />
        <div className={`absolute top-[60%] left-[55%] w-40 h-40 rounded-full blur-[60px] animate-float-slow ${
          theme === 'dark' ? 'bg-[#5856D6]/5' : 'bg-[#5856D6]/6'
        }`} />
      </div>

      <ParticleField />

      {/* Content */}
      <div className="container relative z-10 pt-28 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2.5 px-5 py-2 rounded-full glass-panel text-sm mb-10 transition-all duration-700 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#30D158] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#30D158]" />
            </span>
            <span style={{ color: 'var(--text-tertiary)' }} className="font-medium">12,000+ skills available</span>
          </div>

          {/* Headline */}
          <h1
            className={`font-display font-bold text-5xl sm:text-6xl lg:text-[4.5rem] leading-[1.05] tracking-[-0.03em] mb-7 transition-all duration-700 delay-100 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span style={{ color: 'var(--text-primary)' }}>The skill dock for</span>
            <br className="sm:hidden" />
            {' '}
            <span className="gradient-text relative">
              sharp agents
              <Sparkles className="absolute -top-2 -right-6 w-5 h-5 text-[#FFD60A]/40 animate-pulse" />
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className={`text-lg sm:text-xl max-w-2xl mx-auto mb-12 leading-[1.7] font-light transition-all duration-700 delay-200 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ color: 'var(--text-muted)' }}
          >
            Discover, install, and share AI agent skills. Versioned like npm,
            searchable with vectors. No gatekeeping, just signal.
          </p>

          {/* Search bar */}
          <form
            onSubmit={handleSearch}
            className={`transition-all duration-700 delay-300 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="relative max-w-xl mx-auto search-glow rounded-2xl transition-all duration-300">
              <div className="glass-panel-strong glass-highlight rounded-2xl flex items-center px-5 py-4">
                <Search className="w-5 h-5 shrink-0" style={{ color: 'var(--text-faint)' }} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search skills by name, description, or tag..."
                  className="flex-1 bg-transparent border-none outline-none ml-3 text-sm"
                  style={{ color: 'var(--text-primary)', '--tw-placeholder-color': 'var(--text-faint)' } as any}
                />
                <Button
                  type="submit"
                  size="sm"
                  className="shrink-0 bg-gradient-to-r from-[#007AFF] to-[#5856D6] hover:from-[#0071E3] hover:to-[#4F46E5] text-white border-0 rounded-xl px-5 shadow-lg shadow-[#007AFF]/25 hover:shadow-[#007AFF]/40 transition-all duration-300"
                >
                  Search
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </div>
            </div>
          </form>

          {/* CTA buttons */}
          <div
            className={`flex flex-wrap items-center justify-center gap-4 mt-8 transition-all duration-700 delay-[400ms] ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Button
              onClick={() => navigate('/skills')}
              className="bg-gradient-to-r from-[#007AFF] to-[#5856D6] hover:from-[#0071E3] hover:to-[#4F46E5] text-white border-0 rounded-xl px-7 py-5 text-sm font-medium shadow-lg shadow-[#007AFF]/20 hover:shadow-[#007AFF]/35 hover:scale-[1.02] transition-all duration-300"
            >
              Browse Skills
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/upload')}
              className="bg-transparent rounded-xl px-7 py-5 text-sm transition-all duration-300"
              style={{ borderColor: 'var(--divider)', color: 'var(--text-secondary)' }}
            >
              Publish a Skill
            </Button>
          </div>

          {/* Install command */}
          <div
            className={`mt-14 max-w-md mx-auto transition-all duration-700 delay-500 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="glass-panel rounded-xl overflow-hidden">
              <div className="flex" style={{ borderBottom: '1px solid var(--divider)' }}>
                {(['npm', 'pnpm', 'bun'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 px-4 py-2.5 text-xs font-mono font-medium transition-all duration-200 relative ${
                      activeTab === tab
                        ? 'bg-[var(--surface-active)]'
                        : 'hover:bg-[var(--surface-hover)]'
                    }`}
                    style={{ color: activeTab === tab ? 'var(--text-primary)' : 'var(--text-faint)' }}
                  >
                    {tab}
                    {activeTab === tab && (
                      <span className="absolute bottom-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-[#007AFF]/50 to-transparent" />
                    )}
                  </button>
                ))}
              </div>
              <div className="flex items-center justify-between px-4 py-3.5">
                <code className="font-mono text-sm" style={{ color: 'var(--text-tertiary)' }}>
                  {installCommands[activeTab]}
                </code>
                <button
                  onClick={handleCopy}
                  className="p-1.5 rounded-md hover:bg-[var(--surface-hover)] transition-all duration-200"
                  style={{ color: 'var(--text-faint)' }}
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

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
