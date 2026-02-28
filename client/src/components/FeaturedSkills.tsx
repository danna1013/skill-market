/*
 * Design: Apple Vision Pro Spatial Glass
 * FeaturedSkills: Horizontal scroll carousel of highlighted skills
 * with larger glass cards and category color accents
 */

import { Star, Download, ArrowRight, ShieldCheck } from 'lucide-react';
import { skills, formatNumber } from '@/lib/skillsData';
import { Link } from 'wouter';
import { useRef, useState, useEffect } from 'react';

const featured = skills.filter(s => s.highlighted);

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

export default function FeaturedSkills() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    const el = scrollRef.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);

  return (
    <section className="py-20 relative">
      {/* Section header */}
      <div className="container mb-10">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
              Highlighted Skills
            </h2>
            <p className="text-white/40 mt-2 text-base">
              Curated signal — highlighted for quick trust.
            </p>
          </div>
          <Link
            href="/skills"
            className="hidden sm:flex items-center gap-1.5 text-sm text-[#007AFF] hover:text-[#0071E3] transition-colors font-medium"
          >
            View all
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Horizontal scroll */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto pb-4 px-4 lg:px-[max(1rem,calc((100vw-1280px)/2+2rem))] snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none' }}
      >
        {featured.map((skill, i) => {
          const color = categoryColors[skill.category] || '#007AFF';
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
                  className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[60px] opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                  style={{ background: color }}
                />

                {/* Top row */}
                <div className="flex items-start justify-between relative z-10">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                        style={{ background: `linear-gradient(135deg, ${color}, ${color}80)` }}
                      >
                        {skill.name[0]}
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-white text-base">
                          {skill.name}
                        </h3>
                        <span className="font-mono text-[11px] text-white/25">
                          /{skill.slug}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span
                    className="px-2 py-0.5 rounded-md text-[10px] font-mono font-medium"
                    style={{
                      background: `${color}15`,
                      color: color,
                      border: `1px solid ${color}25`,
                    }}
                  >
                    {skill.currentVersion}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-white/45 leading-relaxed line-clamp-3 flex-1 relative z-10">
                  {skill.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 relative z-10">
                  {skill.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md text-[11px] bg-white/5 text-white/35 border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-white/5 relative z-10">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-semibold text-white"
                      style={{ background: `linear-gradient(135deg, ${color}80, ${color}40)` }}
                    >
                      {skill.author[0].toUpperCase()}
                    </div>
                    <span className="text-xs text-white/35">@{skill.author}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#30D158]/50" />
                    <span className="flex items-center gap-1 text-xs text-white/30">
                      <Star className="w-3 h-3 fill-current text-[#FFD60A]/50" />
                      {formatNumber(skill.stars)}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-white/30">
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

      {/* Mobile view all */}
      <div className="sm:hidden container mt-4">
        <Link
          href="/skills"
          className="flex items-center justify-center gap-1.5 text-sm text-[#007AFF] font-medium"
        >
          View all skills
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
