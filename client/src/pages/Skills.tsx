/*
 * Apple HIG Skills Browse — clean search, quiet controls
 */

import { useState, useMemo, useEffect, useRef } from 'react';
import { useSearch } from 'wouter';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SkillCard from '@/components/SkillCard';
import CategoryBar from '@/components/CategoryBar';
import {
  skills, sortSkills, filterSkills, sortOptions, formatNumber,
  type SortOption, type Skill,
} from '@/lib/skillsData';
import {
  Search, Grid3X3, List, SlidersHorizontal, X, ChevronDown,
  Star, Download, ShieldCheck, ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

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

function SkillListItem({ skill }: { skill: Skill }) {
  const color = categoryColors[skill.category] || '#0071e3';
  return (
    <Link href={`/skill/${skill.slug}`} className="block group">
      <div className="skill-card glass-panel glass-highlight p-4 sm:p-5 flex items-center gap-4 relative overflow-hidden">
        <div
          className="absolute -top-12 -left-12 w-24 h-24 rounded-full blur-[40px] opacity-0 group-hover:opacity-12 transition-opacity duration-700"
          style={{ background: color }}
        />
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-[13px] font-bold font-display shrink-0 group-hover:scale-105 transition-transform duration-300"
          style={{ background: `linear-gradient(135deg, ${color}, ${color}88)` }}
        >
          {skill.name[0]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h3 className="font-display font-semibold text-[14px] truncate" style={{ color: 'var(--text-primary)' }}>
              {skill.name}
            </h3>
            <span className="font-mono text-[10px]" style={{ color: 'var(--text-faint)' }}>
              {skill.currentVersion}
            </span>
            {skill.highlighted && (
              <span className="px-1.5 py-0.5 rounded-full text-[9px] font-medium" style={{ background: 'var(--surface-subtle)', color: 'var(--text-muted)', border: '1px solid var(--divider)' }}>
                精选
              </span>
            )}
          </div>
          <p className="text-[12px] truncate" style={{ color: 'var(--text-muted)' }}>
            {skill.description}
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-4 shrink-0">
          <span className="text-[12px]" style={{ color: 'var(--text-faint)' }}>@{skill.author}</span>
          {skill.securityStatus === 'benign' && <ShieldCheck className="w-3.5 h-3.5 text-[#30d158]/50" />}
          <span className="flex items-center gap-1 text-[11px]" style={{ color: 'var(--text-faint)' }}>
            <Star className="w-3 h-3 fill-current text-[#FFD60A]/50" />
            {formatNumber(skill.stars)}
          </span>
          <span className="flex items-center gap-1 text-[11px]" style={{ color: 'var(--text-faint)' }}>
            <Download className="w-3 h-3" />
            {formatNumber(skill.downloads)}
          </span>
          <ArrowRight className="w-3.5 h-3.5" style={{ color: 'var(--text-faint)' }} />
        </div>
      </div>
    </Link>
  );
}

export default function Skills() {
  const searchString = useSearch();
  const params = new URLSearchParams(searchString);
  const initialQuery = params.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState<SortOption>('downloads');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [showHighlighted, setShowHighlighted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setQuery(initialQuery);
    if (initialQuery && inputRef.current) inputRef.current.focus();
  }, [initialQuery]);

  const filtered = useMemo(() => {
    const result = filterSkills(skills, query, category, showHighlighted);
    return sortSkills(result, sort);
  }, [query, category, sort, showHighlighted]);

  const sortLabel = sortOptions.find(o => o.value === sort)?.label || '下载量';

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <div className="container">
          {/* Header */}
          <div className="mb-10">
            <h1 className="font-display font-bold text-[28px] sm:text-[36px] tracking-[-0.03em]" style={{ color: 'var(--text-primary)' }}>
              Browse Skills
            </h1>
            <p className="mt-2 text-[15px]" style={{ color: 'var(--text-muted)' }}>
              共 <span className="font-medium" style={{ color: 'var(--text-secondary)' }}>{filtered.length}</span> 个技能
              {query && (
                <span style={{ color: 'var(--text-faint)' }}> · 关于「{query}」</span>
              )}
            </p>
          </div>

          {/* Search + Controls */}
          <div className="flex flex-col gap-4 mb-10">
            <div className="relative search-glow rounded-2xl transition-all duration-300">
              <div className="glass-panel glass-highlight flex items-center px-5 py-3.5 rounded-2xl">
                <Search className="w-[18px] h-[18px] shrink-0" style={{ color: 'var(--text-faint)' }} />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="搜索技能、标签、作者..."
                  className="flex-1 bg-transparent border-none outline-none ml-3 text-[14px]"
                  style={{ color: 'var(--text-primary)' }}
                />
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    className="p-1.5 rounded-lg transition-all duration-200 hover:bg-[var(--surface-hover)]"
                    style={{ color: 'var(--text-faint)' }}
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="flex-1 min-w-0 overflow-hidden">
                <CategoryBar activeCategory={category} onCategoryChange={setCategory} />
              </div>

              <div className="shrink-0 flex items-center gap-2">
                {/* Sort */}
                <div className="relative group">
                  <button className="flex items-center gap-1.5 px-3 py-2 rounded-full glass-panel text-[13px] transition-colors" style={{ color: 'var(--text-muted)' }}>
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{sortLabel}</span>
                    <ChevronDown className="w-3 h-3" />
                  </button>
                  <div className="absolute right-0 top-full mt-2 w-44 glass-panel-strong rounded-2xl p-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20 shadow-xl">
                    {sortOptions.map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => setSort(opt.value)}
                        className={`w-full text-left px-3 py-2 rounded-xl text-[13px] transition-colors ${
                          sort === opt.value ? 'font-medium' : ''
                        }`}
                        style={
                          sort === opt.value
                            ? { background: 'var(--surface-hover)', color: 'var(--text-primary)' }
                            : { color: 'var(--text-muted)' }
                        }
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Highlighted */}
                <button
                  onClick={() => setShowHighlighted(!showHighlighted)}
                  className={`px-3 py-2 rounded-full text-[13px] font-medium transition-all duration-200 ${
                    showHighlighted
                      ? 'bg-[var(--text-primary)] text-[var(--background)]'
                      : 'glass-panel'
                  }`}
                  style={!showHighlighted ? { color: 'var(--text-muted)' } : undefined}
                >
                  <span className="hidden sm:inline">精选</span>
                  <span className="sm:hidden">★</span>
                </button>

                {/* View toggle */}
                <div className="flex rounded-full glass-panel overflow-hidden">
                  <button
                    onClick={() => setView('grid')}
                    className="p-2 transition-colors"
                    style={view === 'grid' ? { background: 'var(--surface-hover)', color: 'var(--text-primary)' } : { color: 'var(--text-faint)' }}
                    aria-label="网格"
                  >
                    <Grid3X3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setView('list')}
                    className="p-2 transition-colors"
                    style={view === 'list' ? { background: 'var(--surface-hover)', color: 'var(--text-primary)' } : { color: 'var(--text-faint)' }}
                    aria-label="列表"
                  >
                    <List className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          {filtered.length > 0 ? (
            <div className={view === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4' : 'flex flex-col gap-3'}>
              {filtered.map((skill, i) => (
                <div key={skill.id} className="animate-fade-in-up" style={{ animationDelay: `${Math.min(i * 40, 400)}ms` }}>
                  {view === 'grid' ? <SkillCard skill={skill} /> : <SkillListItem skill={skill} />}
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-panel glass-highlight p-20 text-center animate-fade-in-up">
              <Search className="w-10 h-10 mx-auto mb-5" style={{ color: 'var(--text-faint)' }} />
              <h3 className="font-display font-semibold text-[17px] mb-2" style={{ color: 'var(--text-secondary)' }}>
                没有找到
              </h3>
              <p className="text-[14px] max-w-sm mx-auto mb-6" style={{ color: 'var(--text-muted)' }}>
                试试别的关键词，或者清除筛选看看全部。
              </p>
              <Button
                onClick={() => { setQuery(''); setCategory('all'); setShowHighlighted(false); }}
                className="rounded-full"
                style={{ background: 'var(--surface-hover)', color: 'var(--text-secondary)', border: '1px solid var(--divider)' }}
              >
                清除筛选
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
