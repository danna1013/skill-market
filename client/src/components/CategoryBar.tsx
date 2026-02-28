/*
 * Design: Apple-style dual theme
 * CategoryBar: Horizontal scrolling category pills with icon + count
 */

import {
  Layers, Code, Brain, Zap, Search, MessageSquare,
  Shield, Bot, Image,
} from 'lucide-react';
import { categories } from '@/lib/skillsData';

const iconMap: Record<string, React.ReactNode> = {
  Layers: <Layers className="w-3.5 h-3.5" />,
  Code: <Code className="w-3.5 h-3.5" />,
  Brain: <Brain className="w-3.5 h-3.5" />,
  Zap: <Zap className="w-3.5 h-3.5" />,
  Search: <Search className="w-3.5 h-3.5" />,
  MessageSquare: <MessageSquare className="w-3.5 h-3.5" />,
  Shield: <Shield className="w-3.5 h-3.5" />,
  Bot: <Bot className="w-3.5 h-3.5" />,
  Image: <Image className="w-3.5 h-3.5" />,
};

interface CategoryBarProps {
  activeCategory: string;
  onCategoryChange: (id: string) => void;
}

export default function CategoryBar({ activeCategory, onCategoryChange }: CategoryBarProps) {
  return (
    <div
      className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
      style={{ scrollbarWidth: 'none' }}
    >
      {categories.map(cat => {
        const isActive = activeCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              isActive
                ? 'shadow-lg'
                : 'glass-panel hover:scale-[1.02]'
            }`}
            style={
              isActive
                ? {
                    background: `linear-gradient(135deg, ${cat.color}, ${cat.color}cc)`,
                    color: '#fff',
                    boxShadow: `0 4px 12px ${cat.color}30`,
                    border: 'none',
                  }
                : {
                    color: 'var(--text-tertiary)',
                  }
            }
          >
            <span style={{ color: isActive ? '#fff' : cat.color }}>
              {iconMap[cat.icon]}
            </span>
            <span>{cat.name}</span>
            <span
              className="text-xs"
              style={
                isActive
                  ? { color: 'rgba(255,255,255,0.7)' }
                  : { color: 'var(--text-faint)' }
              }
            >
              {cat.count.toLocaleString()}
            </span>
          </button>
        );
      })}
    </div>
  );
}
