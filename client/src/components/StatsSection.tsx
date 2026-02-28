/*
 * Design: Apple-style dual theme
 * StatsSection: Animated counters in glass panels with icons and glow accents
 */

import { useEffect, useRef, useState } from 'react';
import { Package, Download, Users, Grid3X3 } from 'lucide-react';

interface StatItem {
  label: string;
  value: number;
  suffix: string;
  color: string;
  icon: React.ReactNode;
}

const stats: StatItem[] = [
  { label: 'Skills 总数', value: 12135, suffix: '+', color: '#d97757', icon: <Package className="w-5 h-5" /> },
  { label: '总下载量', value: 2400000, suffix: '+', color: '#6a9bcc', icon: <Download className="w-5 h-5" /> },
  { label: '贡献者', value: 3800, suffix: '+', color: '#b0aea5', icon: <Users className="w-5 h-5" /> },
  { label: '分类数量', value: 8, suffix: '', color: '#788c5d', icon: <Grid3X3 className="w-5 h-5" /> },
];

function formatStatValue(value: number): string {
  if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M';
  if (value >= 1000) return (value / 1000).toFixed(1) + 'k';
  return value.toString();
}

function useCountUp(end: number, duration: number, start: boolean) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number;
    let frame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCurrent(Math.floor(eased * end));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [end, duration, start]);

  return current;
}

function StatCard({ stat, index }: { stat: StatItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    const el = ref.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);

  const count = useCountUp(stat.value, 2200, visible);

  return (
    <div
      ref={ref}
      className={`glass-panel glass-highlight p-6 sm:p-7 text-center relative overflow-hidden group ${
        visible ? 'animate-fade-in-up' : 'opacity-0'
      }`}
      style={{ animationDelay: `${index * 120}ms` }}
    >
      {/* Background glow */}
      <div
        className="absolute -top-12 -right-12 w-28 h-28 rounded-full blur-[50px] opacity-0 group-hover:opacity-20 transition-opacity duration-700"
        style={{ background: stat.color }}
      />

      {/* Icon */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110"
        style={{
          background: `${stat.color}12`,
          color: stat.color,
          border: `1px solid ${stat.color}20`,
        }}
      >
        {stat.icon}
      </div>

      {/* Number */}
      <div
        className="font-display font-bold text-3xl sm:text-4xl mb-1.5 tabular-nums"
        style={{ color: stat.color }}
      >
        {formatStatValue(count)}{stat.suffix}
      </div>

      {/* Label */}
      <div className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>{stat.label}</div>
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="py-6 relative">
      {/* Subtle divider glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px" style={{ background: 'linear-gradient(to right, transparent, var(--divider), transparent)' }} />
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
