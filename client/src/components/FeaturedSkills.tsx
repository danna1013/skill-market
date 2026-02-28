/*
 * Design: Apple-style dual theme
 * FeaturedSkills: Horizontal scroll carousel of highlighted skills
 * with larger glass cards, category color accents, scroll indicators
 */

import { Star, Download, ArrowRight, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import { skills, formatNumber } from '@/lib/skillsData';
import { Link } from 'wouter';
import { useRef, useState, useEffect, useCallback } from 'react';

const featured = skills.filter(s => s.highlighted);

const categoryColors: Record<string, string> = {
  'dev-tools': '#6a9bcc',
  'ai-ml': '#d97757',
  'productivity': '#b0aea5',
  'search': '#788c5d',
  'communication': '#d97757',
  'security': '#c86a45',
  'automation': '#6a9bcc',
  'media': '#b0aea5',
};

export default function FeaturedSkills() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    const el = scrollRef.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateScrollState, { passive: true });
    updateScrollState();
    return () => el.removeEventListener('scroll', updateScrollState);
  }, [updateScrollState]);

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === 'left' ? -380 : 380, behavior: 'smooth' });
  };

  return (
    <section className="py-20 relative">
      {/* Section header */}
      <div className="container mb-10">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-[-0.02em]" style={{ color: 'var(--text-primary)' }}>
              精选 Skills
            </h2>
            <p className="mt-2 text-base" style={{ color: 'var(--text-muted)' }}>
              由社区精心筛选，值得信赖的高质量技能。
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className="p-2 rounded-xl glass-panel transition-all duration-200 disabled:opacity-30"
              style={{ color: 'var(--text-secondary)' }}
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className="p-2 rounded-xl glass-panel transition-all duration-200 disabled:opacity-30"
              style={{ color: 'var(--text-secondary)' }}
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <Link
              href="/skills"
              className="flex items-center gap-1.5 text-sm font-medium ml-2 transition-colors"
              style={{ color: '#d97757' }}
            >
              查看全部
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll fade edges */}
      <div className="relative">
        {canScrollLeft && (
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        )}
        {canScrollRight && (
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        )}

        {/* Horizontal scroll */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 px-4 lg:px-[max(1rem,calc((100vw-1280px)/2+2rem))] snap-x snap-mandatory scrollbar-hide"
        >
          {featured.map((skill, i) => {
            const color = categoryColors[skill.category] || '#d97757';
            return (
              <Link
                key={skill.id}
                href={`/skill/${skill.slug}`}
                className={`shrink-0 w-[320px] sm:w-[360px] snap-start ${
                  visible ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="skill-card glass-panel glass-highlight p-6 h-full flex flex-col gap-4 group relative overflow-hidden">
                  {/* Glow accent */}
                  <div
                    className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[60px] opacity-15 group-hover:opacity-25 transition-opacity duration-500"
                    style={{ background: color }}
                  />

                  {/* Top row */}
                  <div className="flex items-start justify-between relative z-10">
                    <div>
                      <div className="flex items-center gap-2.5 mb-1">
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold font-display shadow-md group-hover:scale-105 transition-transform duration-300"
                          style={{
                            background: `linear-gradient(135deg, ${color}, ${color}80)`,
                            boxShadow: `0 4px 12px ${color}25`,
                          }}
                        >
                          {skill.name[0]}
                        </div>
                        <div>
                          <h3 className="font-display font-semibold text-base" style={{ color: 'var(--text-primary)' }}>
                            {skill.name}
                          </h3>
                          <span className="font-mono text-[11px]" style={{ color: 'var(--text-faint)' }}>
                            /{skill.slug}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span
                      className="px-2 py-0.5 rounded-md text-[10px] font-mono font-medium"
                      style={{
                        background: `${color}12`,
                        color: color,
                        border: `1px solid ${color}20`,
                      }}
                    >
                      {skill.currentVersion}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm leading-relaxed line-clamp-3 flex-1 relative z-10" style={{ color: 'var(--text-muted)' }}>
                    {skill.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 relative z-10">
                    {skill.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md text-[11px]"
                        style={{ background: 'var(--surface-subtle)', color: 'var(--text-faint)', border: '1px solid var(--divider)' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 relative z-10" style={{ borderTop: '1px solid var(--divider)' }}>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-semibold text-white"
                        style={{ background: `linear-gradient(135deg, ${color}80, ${color}40)` }}
                      >
                        {skill.author[0].toUpperCase()}
                      </div>
                      <span className="text-xs" style={{ color: 'var(--text-faint)' }}>@{skill.author}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="w-3.5 h-3.5" style={{ color: 'rgba(120,140,93,0.6)' }} />
                      <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-faint)' }}>
                        <Star className="w-3 h-3 fill-current text-[#FFD60A]/55" />
                        {formatNumber(skill.stars)}
                      </span>
                      <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-faint)' }}>
                        <Download className="w-3 h-3" />
                        {formatNumber(skill.downloads)}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Mobile view all */}
      <div className="sm:hidden container mt-4">
        <Link
          href="/skills"
          className="flex items-center justify-center gap-1.5 text-sm font-medium"
          style={{ color: '#d97757' }}
        >
          查看全部 Skills
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
