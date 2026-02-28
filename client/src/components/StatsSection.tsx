/*
 * Design: Apple Vision Pro Spatial Glass
 * StatsSection: Animated counters in glass panels
 */

import { useEffect, useRef, useState } from 'react';

interface StatItem {
  label: string;
  value: number;
  suffix: string;
  color: string;
}

const stats: StatItem[] = [
  { label: 'Total Skills', value: 12135, suffix: '+', color: '#007AFF' },
  { label: 'Downloads', value: 2400000, suffix: '+', color: '#AF52DE' },
  { label: 'Contributors', value: 3800, suffix: '+', color: '#FF9500' },
  { label: 'Categories', value: 8, suffix: '', color: '#30D158' },
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
      const eased = 1 - Math.pow(1 - progress, 3);
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

  const count = useCountUp(stat.value, 2000, visible);

  return (
    <div
      ref={ref}
      className={`glass-panel glass-highlight p-6 text-center ${
        visible ? 'animate-fade-in-up' : 'opacity-0'
      }`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div
        className="font-display font-bold text-3xl sm:text-4xl mb-2"
        style={{ color: stat.color }}
      >
        {formatStatValue(count)}{stat.suffix}
      </div>
      <div className="text-sm text-white/40">{stat.label}</div>
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="py-16">
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
