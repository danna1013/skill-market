/*
 * Design: Apple Vision Pro Spatial Glass
 * Skills page: Full browsing experience with search, filters, sort, view toggle
 * Left sidebar filters (desktop) + top bar (mobile)
 */

import { useState, useMemo, useEffect } from 'react';
import { useLocation, useSearch } from 'wouter';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SkillCard from '@/components/SkillCard';
import CategoryBar from '@/components/CategoryBar';
import {
  skills, sortSkills, filterSkills, sortOptions,
  type SortOption,
} from '@/lib/skillsData';
import {
  Search, Grid3X3, List, SlidersHorizontal, X, ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Skills() {
  const searchString = useSearch();
  const params = new URLSearchParams(searchString);
  const initialQuery = params.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState<SortOption>('downloads');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [showHighlighted, setShowHighlighted] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setQuery(initialQuery);
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
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
              Browse Skills
            </h1>
            <p className="text-white/40 mt-2">
              {filtered.length} skill{filtered.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {/* Search + Controls bar */}
          <div className="flex flex-col gap-4 mb-6">
            {/* Search */}
            <div className="relative search-glow rounded-xl transition-all duration-300">
              <div className="glass-panel flex items-center px-4 py-3 rounded-xl">
                <Search className="w-4.5 h-4.5 text-white/30 shrink-0" />
                <input
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search by name, description, tag, or author..."
                  className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-white/25 ml-3 text-sm"
                />
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    className="p-1 text-white/30 hover:text-white/60 transition-colors"
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
                  <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg glass-panel text-sm text-white/50 hover:text-white/70 transition-colors">
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{sortLabel}</span>
                    <ChevronDown className="w-3 h-3" />
                  </button>
                  <div className="absolute right-0 top-full mt-2 w-48 glass-panel-strong rounded-xl p-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20 shadow-xl shadow-black/30">
                    {sortOptions.map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => setSort(opt.value)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          sort === opt.value
                            ? 'text-white bg-white/10'
                            : 'text-white/50 hover:text-white/70 hover:bg-white/5'
                        }`}
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
                      ? 'bg-[#007AFF]/15 border-[#007AFF]/30 text-[#007AFF]'
                      : 'glass-panel text-white/50 hover:text-white/70'
                  }`}
                >
                  <span className="hidden sm:inline">Highlighted</span>
                  <span className="sm:hidden">★</span>
                </button>

                {/* View toggle */}
                <div className="flex rounded-lg glass-panel overflow-hidden">
                  <button
                    onClick={() => setView('grid')}
                    className={`p-2 transition-colors ${
                      view === 'grid' ? 'bg-white/10 text-white' : 'text-white/30 hover:text-white/50'
                    }`}
                    aria-label="Grid view"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setView('list')}
                    className={`p-2 transition-colors ${
                      view === 'list' ? 'bg-white/10 text-white' : 'text-white/30 hover:text-white/50'
                    }`}
                    aria-label="List view"
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
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <SkillCard skill={skill} />
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-panel p-16 text-center">
              <div className="text-4xl mb-4 opacity-30">
                <Search className="w-12 h-12 mx-auto text-white/20" />
              </div>
              <h3 className="font-display font-semibold text-lg text-white/60 mb-2">
                No skills found
              </h3>
              <p className="text-sm text-white/30 max-w-md mx-auto">
                Try adjusting your search query or filters. You can also browse all categories.
              </p>
              <Button
                onClick={() => { setQuery(''); setCategory('all'); setShowHighlighted(false); }}
                className="mt-6 bg-white/5 hover:bg-white/10 text-white/60 border border-white/10"
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
