/*
 * Design: Apple Vision Pro Spatial Glass
 * SkillCard: Glass panel card with specular highlight, hover depth effect
 * Shows: name, description, author, stars, downloads, tags, security badge
 */

import { Star, Download, Shield, ShieldCheck } from 'lucide-react';
import { type Skill, formatNumber } from '@/lib/skillsData';
import { Link } from 'wouter';

interface SkillCardProps {
  skill: Skill;
  index?: number;
}

export default function SkillCard({ skill, index = 0 }: SkillCardProps) {
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

  const color = categoryColors[skill.category] || '#007AFF';

  return (
    <Link
      href={`/skill/${skill.slug}`}
      className="block"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="skill-card glass-panel glass-highlight p-5 h-full flex flex-col gap-3.5 group">
        {/* Header: Name + Version */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-display font-semibold text-base text-white truncate group-hover:text-white/90 transition-colors">
              {skill.name}
            </h3>
            <span className="font-mono text-xs text-white/30 mt-0.5 block">
              /{skill.slug}
            </span>
          </div>
          <span
            className="shrink-0 px-2 py-0.5 rounded-md text-[10px] font-mono font-medium"
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
        <p className="text-sm text-white/50 leading-relaxed line-clamp-2 flex-1">
          {skill.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {skill.tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md text-[11px] bg-white/5 text-white/40 border border-white/5"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer: Author + Stats */}
        <div className="flex items-center justify-between pt-2 border-t border-white/5">
          <div className="flex items-center gap-2">
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-semibold text-white"
              style={{ background: `linear-gradient(135deg, ${color}80, ${color}40)` }}
            >
              {skill.author[0].toUpperCase()}
            </div>
            <span className="text-xs text-white/40">@{skill.author}</span>
          </div>
          <div className="flex items-center gap-3">
            {skill.securityStatus === 'benign' && (
              <ShieldCheck className="w-3.5 h-3.5 text-[#30D158]/60" />
            )}
            {skill.securityStatus === 'suspicious' && (
              <Shield className="w-3.5 h-3.5 text-[#FF3B30]/60" />
            )}
            <span className="flex items-center gap-1 text-xs text-white/35">
              <Star className="w-3 h-3 fill-current text-[#FFD60A]/60" />
              {formatNumber(skill.stars)}
            </span>
            <span className="flex items-center gap-1 text-xs text-white/35">
              <Download className="w-3 h-3" />
              {formatNumber(skill.downloads)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
