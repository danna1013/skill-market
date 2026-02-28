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
  'dev-tools': '#6a9bcc',
  'ai-ml': '#d97757',
  'productivity': '#b0aea5',
  'search': '#788c5d',
  'communication': '#d97757',
  'security': '#c86a45',
  'automation': '#6a9bcc',
  'media': '#b0aea5',
};

export default function SkillCard({ skill, index = 0 }: SkillCardProps) {
  const color = categoryColors[skill.category] || '#d97757';

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
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: 'rgba(217,119,87,0.12)', color: '#d97757', border: '1px solid rgba(217,119,87,0.22)' }}>
              精选
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
              <h3 className="font-display font-semibold text-[15px] truncate transition-all duration-200 group-hover:opacity-80" style={{ color: 'var(--text-primary)' }}>
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
              <ShieldCheck className="w-3.5 h-3.5" style={{ color: 'rgba(120,140,93,0.65)' }} />
            )}
            {skill.securityStatus === 'suspicious' && (
              <Shield className="w-3.5 h-3.5" style={{ color: 'rgba(200,106,69,0.65)' }} />
            )}
            <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-faint)' }}>
              <Star className="w-3 h-3 fill-current" style={{ color: 'rgba(217,119,87,0.6)' }} />
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
