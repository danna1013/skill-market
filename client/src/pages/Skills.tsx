/*
 * Design: Apple-style dual theme
 * Skills page: Full browsing experience with search, filters, sort, view toggle
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
  'dev-tools': '#6a9bcc',
  'ai-ml': '#d97757',
  'productivity': '#b0aea5',
  'search': '#788c5d',
  'communication': '#d97757',
  'security': '#c86a45',
  'automation': '#6a9bcc',
  'media': '#b0aea5',
};

function SkillListItem({ skill }: { skill: Skill }) {
  const color = categoryColors[skill.category] || '#d97757';
  return (
    <Link href={`/skill/${skill.slug}`} className="block group">
      <div className="skill-card glass-panel glass-highlight p-4 sm:p-5 flex items-center gap-4 relative overflow-hidden">
        {/* Hover glow */}
        <div
          className="absolute -top-12 -left-12 w-24 h-24 rounded-full blur-[40px] opacity-0 group-hover:opacity-15 transition-opacity duration-500"
          style={{ background: color }}
        />

        {/* Icon */}
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold font-display shrink-0 shadow-md group-hover:scale-105 transition-transform duration-300"
          style={{
            background: `linear-gradient(135deg, ${color}, ${color}80)`,
            boxShadow: `0 4px 12px ${color}20`,
          }}
        >
          {skill.name[0]}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h3 className="font-display font-semibold text-sm truncate" style={{ color: 'var(--text-primary)' }}>
              {skill.name}
            </h3>
            <span className="font-mono text-[10px]" style={{ color: 'var(--text-faint)' }}>
              {skill.currentVersion}
            </span>
            {skill.highlighted && (
              <span className="px-1.5 py-0.5 rounded text-[9px] font-medium" style={{ background: 'rgba(217,119,87,0.12)', color: '#d97757' }}>
                精选
              </span>
            )}
          </div>
          <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>
            {skill.description}
          </p>
        </div>

        {/* Stats */}
        <div className="hidden sm:flex items-center gap-4 shrink-0">
          <span className="text-xs flex items-center gap-1" style={{ color: 'var(--text-faint)' }}>
            @{skill.author}
          </span>
          {skill.securityStatus === 'benign' && (
            <ShieldCheck className="w-3.5 h-3.5" style={{ color: 'rgba(120,140,93,0.6)' }} />
          )}
          <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-faint)' }}>
            <Star className="w-3 h-3 fill-current" style={{ color: 'rgba(217,119,87,0.6)' }} />
            {formatNumber(skill.stars)}
          </span>
          <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-faint)' }}>
            <Download className="w-3 h-3" />
            {formatNumber(skill.downloads)}
          </span>
          <ArrowRight className="w-3.5 h-3.5 transition-colors" style={{ color: 'var(--text-faint)' }} />
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
    if (initialQuery && inputRef.current) {
      inputRef.current.focus();
    }
  }, [initialQuery]);

  const filtered = useMemo(() => {
    const result = filterSkills(skills, query, category, showHighlighted);
    return sortSkills(result, sort);
  }, [query, category, sort, showHighlighted]);

  const sortLabel = sortOptions.find(o => o.value === sort)?.label || 'Downloads';

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <div className="container">
          {/* Page header */}
          <div className="mb-8">
            <h1 className="font-display font-bold text-3xl sm:text-4xl tracking-[-0.02em]" style={{ color: 'var(--text-primary)' }}>
              Skills 市场
            </h1>
            <p className="mt-2" style={{ color: 'var(--text-muted)' }}>
              找到 <span className="font-medium" style={{ color: 'var(--text-secondary)' }}>{filtered.length}</span> 个 Skills
              {query && (
                <span style={{ color: 'var(--text-faint)' }}>，搜索“<span style={{ color: 'var(--text-secondary)' }}>{query}</span>”</span>
              )}
            </p>
          </div>

          {/* Search + Controls bar */}
          <div className="flex flex-col gap-4 mb-8">
            {/* Search */}
            <div className="relative search-glow rounded-xl transition-all duration-300">
              <div className="glass-panel glass-highlight flex items-center px-4 py-3.5 rounded-xl">
                <Search className="w-4.5 h-4.5 shrink-0" style={{ color: 'var(--text-faint)' }} />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="按名称、描述、标签或作者搜索..."
                  className="flex-1 bg-transparent border-none outline-none ml-3 text-sm"
                  style={{ color: 'var(--text-primary)' }}
                />
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    className="p-1.5 rounded-md transition-all duration-200 hover:bg-[var(--surface-hover)]"
                    style={{ color: 'var(--text-faint)' }}
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Controls row */}
            <div className="flex items-center justify-between gap-3">
              {/* Category bar */}
              <div className="flex-1 min-w-0 overflow-hidden">
                <CategoryBar activeCategory={category} onCategoryChange={setCategory} />
              </div>

              {/* Right controls */}
              <div className="shrink-0 flex items-center gap-2">
                {/* Sort dropdown */}
                <div className="relative group">
                  <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg glass-panel text-sm transition-colors" style={{ color: 'var(--text-muted)' }}>
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{sortLabel}</span>
                    <ChevronDown className="w-3 h-3" />
                  </button>
                  <div className="absolute right-0 top-full mt-2 w-48 glass-panel-strong rounded-xl p-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20 shadow-xl">
                    {sortOptions.map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => setSort(opt.value)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          sort === opt.value
                            ? 'font-medium'
                            : ''
                        }`}
                        style={
                          sort === opt.value
                            ? { background: 'var(--surface-hover)', color: '#d97757' }
                            : { color: 'var(--text-muted)' }
                        }
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Highlighted toggle */}
                <button
                  onClick={() => setShowHighlighted(!showHighlighted)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
                    showHighlighted
                      ? 'border-[#d97757]/30'
                      : 'glass-panel'
                  }`}
                  style={showHighlighted ? { background: 'rgba(217,119,87,0.12)', color: '#d97757' } : { color: 'var(--text-muted)' }}
                >
                  <span className="hidden sm:inline">精选</span>
                  <span className="sm:hidden">★</span>
                </button>

                {/* View toggle */}
                <div className="flex rounded-lg glass-panel overflow-hidden">
                  <button
                    onClick={() => setView('grid')}
                    className="p-2 transition-colors"
                    style={
                      view === 'grid'
                        ? { background: 'var(--surface-hover)', color: '#d97757' }
                        : { color: 'var(--text-faint)' }
                    }
                    aria-label="网格视图"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setView('list')}
                    className="p-2 transition-colors"
                    style={
                      view === 'list'
                        ? { background: 'var(--surface-hover)', color: '#d97757' }
                        : { color: 'var(--text-faint)' }
                    }
                    aria-label="列表视图"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Skills grid / list */}
          {filtered.length > 0 ? (
            <div
              className={
                view === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
                  : 'flex flex-col gap-3'
              }
            >
              {filtered.map((skill, i) => (
                <div
                  key={skill.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${Math.min(i * 40, 400)}ms` }}
                >
                  {view === 'grid' ? (
                    <SkillCard skill={skill} />
                  ) : (
                    <SkillListItem skill={skill} />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-panel glass-highlight p-16 text-center animate-fade-in-up">
              <Search className="w-12 h-12 mx-auto mb-5" style={{ color: 'var(--text-faint)' }} />
              <h3 className="font-display font-semibold text-lg mb-2" style={{ color: 'var(--text-secondary)' }}>
                未找到匹配的 Skills
              </h3>
              <p className="text-sm max-w-md mx-auto mb-6" style={{ color: 'var(--text-muted)' }}>
                请尝试调整搜索关键词或筛选条件，或浏览全部分类。
              </p>
              <Button
                onClick={() => { setQuery(''); setCategory('all'); setShowHighlighted(false); }}
                className="rounded-xl"
                style={{ background: 'var(--surface-hover)', color: 'var(--text-secondary)', border: '1px solid var(--divider)' }}
              >
                清除全部筛选
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
