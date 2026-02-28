/*
 * Apple HIG SkillCard — clean, quiet, confident
 */

import { Star, Download, ShieldCheck, Shield } from 'lucide-react';
import { type Skill, formatNumber } from '@/lib/skillsData';
import { Link } from 'wouter';

interface SkillCardProps {
  skill: Skill;
  index?: number;
}

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

export default function SkillCard({ skill, index = 0 }: SkillCardProps) {
  const color = categoryColors[skill.category] || '#0071e3';

  return (
    <Link
      href={`/skill/${skill.slug}`}
      className="block group"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="skill-card glass-panel glass-highlight p-5 h-full flex flex-col gap-3.5 relative overflow-hidden">
        {/* Hover glow */}
        <div
          className="absolute -top-16 -right-16 w-32 h-32 rounded-full blur-[60px] opacity-0 group-hover:opacity-12 transition-opacity duration-700"
          style={{ background: color }}
        />

        {/* Featured badge */}
        {skill.highlighted && (
          <div className="absolute top-3 right-3 z-20">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-medium" style={{ background: 'var(--surface-subtle)', color: 'var(--text-muted)', border: '1px solid var(--divider)' }}>
              精选
            </span>
          </div>
        )}

        {/* Header */}
        <div className="flex items-start justify-between gap-2 relative z-10">
          <div className="flex items-center gap-2.5 flex-1 min-w-0">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-[13px] font-bold font-display shrink-0 group-hover:scale-105 transition-transform duration-300"
              style={{ background: `linear-gradient(135deg, ${color}, ${color}88)` }}
            >
              {skill.name[0]}
            </div>
            <div className="min-w-0">
              <h3 className="font-display font-semibold text-[15px] truncate" style={{ color: 'var(--text-primary)' }}>
                {skill.name}
              </h3>
              <span className="font-mono text-[11px] block" style={{ color: 'var(--text-faint)' }}>
                /{skill.slug}
              </span>
            </div>
          </div>
          <span
            className="shrink-0 px-2 py-0.5 rounded-md text-[10px] font-mono"
            style={{ background: `${color}10`, color: `${color}CC` }}
          >
            {skill.currentVersion}
          </span>
        </div>

        {/* Description */}
        <p className="text-[13px] leading-relaxed line-clamp-2 flex-1 relative z-10" style={{ color: 'var(--text-muted)' }}>
          {skill.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 relative z-10">
          {skill.tags.slice(0, 3).map(tag => (
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
            {skill.securityStatus === 'benign' && (
              <ShieldCheck className="w-3.5 h-3.5 text-[#30d158]/50" />
            )}
            {skill.securityStatus === 'suspicious' && (
              <Shield className="w-3.5 h-3.5 text-[#ff3b30]/50" />
            )}
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
}
