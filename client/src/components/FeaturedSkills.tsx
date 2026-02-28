/*
 * Apple HIG Featured Skills — horizontal carousel, clean cards
 */

import { Star, Download, ArrowRight, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import { skills, formatNumber } from '@/lib/skillsData';
import { Link } from 'wouter';
import { useRef, useState, useEffect, useCallback } from 'react';

const featured = skills.filter(s => s.highlighted);

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
    <section className="py-24 relative">
      <div className="container mb-12">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-display font-bold text-[28px] sm:text-[36px] tracking-[-0.03em]" style={{ color: 'var(--text-primary)' }}>
              Highlighted Skills
            </h2>
            <p className="mt-2 text-[15px]" style={{ color: 'var(--text-muted)' }}>
              编辑精选，品质保证。
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className="p-2 rounded-full transition-all duration-200 disabled:opacity-20 hover:bg-[var(--surface-hover)]"
              style={{ color: 'var(--text-muted)' }}
              aria-label="向左"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className="p-2 rounded-full transition-all duration-200 disabled:opacity-20 hover:bg-[var(--surface-hover)]"
              style={{ color: 'var(--text-muted)' }}
              aria-label="向右"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <Link
              href="/skills"
              className="flex items-center gap-1 text-[13px] font-medium transition-colors ml-2 hover:opacity-70"
              style={{ color: 'var(--text-muted)' }}
            >
              全部
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll area */}
      <div className="relative">
        {canScrollLeft && (
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        )}
        {canScrollRight && (
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        )}

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 px-5 lg:px-[max(1.25rem,calc((100vw-1120px)/2+2.5rem))] snap-x snap-mandatory scrollbar-hide"
        >
          {featured.map((skill, i) => {
            const color = categoryColors[skill.category] || '#0071e3';
            return (
              <Link
                key={skill.id}
                href={`/skill/${skill.slug}`}
                className={`shrink-0 w-[300px] sm:w-[340px] snap-start ${
                  visible ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="skill-card glass-panel glass-highlight p-6 h-full flex flex-col gap-4 group relative overflow-hidden">
                  {/* Glow */}
                  <div
                    className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[80px] opacity-10 group-hover:opacity-20 transition-opacity duration-700"
                    style={{ background: color }}
                  />

                  {/* Header */}
                  <div className="flex items-start justify-between relative z-10">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-[13px] font-bold font-display group-hover:scale-105 transition-transform duration-300"
                        style={{
                          background: `linear-gradient(135deg, ${color}, ${color}88)`,
                        }}
                      >
                        {skill.name[0]}
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-[15px]" style={{ color: 'var(--text-primary)' }}>
                          {skill.name}
                        </h3>
                        <span className="font-mono text-[11px]" style={{ color: 'var(--text-faint)' }}>
                          /{skill.slug}
                        </span>
                      </div>
                    </div>
                    <span
                      className="px-2 py-0.5 rounded-md text-[10px] font-mono"
                      style={{ background: `${color}10`, color: `${color}CC` }}
                    >
                      {skill.currentVersion}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-[13px] leading-relaxed line-clamp-3 flex-1 relative z-10" style={{ color: 'var(--text-muted)' }}>
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
                    <span className="text-[12px]" style={{ color: 'var(--text-faint)' }}>@{skill.author}</span>
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#30d158]/50" />
                      <span className="flex items-center gap-1 text-[11px]" style={{ color: 'var(--text-faint)' }}>
                        <Star className="w-3 h-3 fill-current text-[#FFD60A]/50" />
                        {formatNumber(skill.stars)}
                      </span>
                      <span className="flex items-center gap-1 text-[11px]" style={{ color: 'var(--text-faint)' }}>
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

      <div className="sm:hidden container mt-6">
        <Link
          href="/skills"
          className="flex items-center justify-center gap-1 text-[13px] font-medium"
          style={{ color: 'var(--text-muted)' }}
        >
          查看全部
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </section>
  );
}
