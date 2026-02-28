/*
 * Design: Apple Vision Pro Spatial Glass
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
            className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border ${
              isActive
                ? 'bg-white/10 border-white/15 text-white shadow-lg'
                : 'bg-white/[3%] border-white/5 text-white/45 hover:bg-white/[6%] hover:text-white/65 hover:border-white/10'
            }`}
            style={isActive ? { boxShadow: `0 0 20px ${cat.color}15` } : undefined}
          >
            <span style={{ color: isActive ? cat.color : undefined }}>
              {iconMap[cat.icon]}
            </span>
            <span>{cat.name}</span>
            <span className={`text-xs ${isActive ? 'text-white/40' : 'text-white/20'}`}>
              {cat.count.toLocaleString()}
            </span>
          </button>
        );
      })}
    </div>
  );
}
