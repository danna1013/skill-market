/*
 * Design: Apple-style dual theme
 * SkillCard: Glass card with gradient border hover, category color accent
 */

import { Star, Download, Shield, ShieldCheck } from 'lucide-react';
import { type Skill, formatNumber } from '@/lib/skillsData';
import { Link } from 'wouter';

interface SkillCardProps {
  skill: Skill;
  index?: number;
}

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

export default function SkillCard({ skill, index = 0 }: SkillCardProps) {
  const color = categoryColors[skill.category] || '#007AFF';

  return (
    <Link
      href={`/skill/${skill.slug}`}
      className="block group"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="skill-card glass-panel glass-highlight p-5 h-full flex flex-col gap-3.5 relative overflow-hidden">
        {/* Hover glow accent */}
        <div
          className="absolute -top-16 -right-16 w-32 h-32 rounded-full blur-[50px] opacity-0 group-hover:opacity-15 transition-opacity duration-500"
          style={{ background: color }}
        />

        {/* Highlighted badge */}
        {skill.highlighted && (
          <div className="absolute top-3 right-3 z-20">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gradient-to-r from-[#FFD60A]/15 to-[#FF9500]/15 text-[#FF9500]" style={{ border: '1px solid rgba(255,149,0,0.2)' }}>
              Featured
            </span>
          </div>
        )}

        {/* Header: Icon + Name + Version */}
        <div className="flex items-start justify-between gap-2 relative z-10">
          <div className="flex items-center gap-2.5 flex-1 min-w-0">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold font-display shrink-0 shadow-md transition-transform duration-300 group-hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${color}, ${color}80)`,
                boxShadow: `0 4px 12px ${color}25`,
              }}
            >
              {skill.name[0]}
            </div>
            <div className="min-w-0">
              <h3 className="font-display font-semibold text-[15px] truncate transition-colors group-hover:text-[#007AFF]" style={{ color: 'var(--text-primary)' }}>
                {skill.name}
              </h3>
              <span className="font-mono text-[11px] block" style={{ color: 'var(--text-faint)' }}>
                /{skill.slug}
              </span>
            </div>
          </div>
          <span
            className="shrink-0 px-2 py-0.5 rounded-md text-[10px] font-mono font-medium"
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
        <p className="text-sm leading-relaxed line-clamp-2 flex-1 relative z-10" style={{ color: 'var(--text-muted)' }}>
          {skill.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 relative z-10">
          {skill.tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md text-[11px] transition-colors"
              style={{ background: 'var(--surface-subtle)', color: 'var(--text-faint)', border: '1px solid var(--divider)' }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer: Author + Stats */}
        <div className="flex items-center justify-between pt-2.5 relative z-10" style={{ borderTop: '1px solid var(--divider)' }}>
          <div className="flex items-center gap-2">
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-semibold text-white"
              style={{ background: `linear-gradient(135deg, ${color}80, ${color}40)` }}
            >
              {skill.author[0].toUpperCase()}
            </div>
            <span className="text-xs font-medium" style={{ color: 'var(--text-faint)' }}>@{skill.author}</span>
          </div>
          <div className="flex items-center gap-3">
            {skill.securityStatus === 'benign' && (
              <ShieldCheck className="w-3.5 h-3.5 text-[#30D158]/60" />
            )}
            {skill.securityStatus === 'suspicious' && (
              <Shield className="w-3.5 h-3.5 text-[#FF3B30]/60" />
            )}
            <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-faint)' }}>
              <Star className="w-3 h-3 fill-current text-[#FFD60A]/60" />
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
}
