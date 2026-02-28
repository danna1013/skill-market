/*
 * Apple HIG Stats — clean counters, no visual noise
 */

import { useEffect, useRef, useState } from 'react';
import { Package, Download, Users, Grid3X3 } from 'lucide-react';

interface StatItem {
  label: string;
  value: number;
  suffix: string;
  icon: React.ReactNode;
}

const stats: StatItem[] = [
  { label: '在线技能', value: 12239, suffix: '+', icon: <Package className="w-5 h-5" /> },
  { label: '累计下载', value: 2800000, suffix: '+', icon: <Download className="w-5 h-5" /> },
  { label: '开发者', value: 4200, suffix: '+', icon: <Users className="w-5 h-5" /> },
  { label: '分类', value: 8, suffix: '', icon: <Grid3X3 className="w-5 h-5" /> },
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

  const count = useCountUp(stat.value, 2400, visible);

  return (
    <div
      ref={ref}
      className={`text-center py-8 ${visible ? 'animate-fade-in-up' : 'opacity-0'}`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div
        className="w-10 h-10 rounded-2xl flex items-center justify-center mx-auto mb-4"
        style={{ background: 'var(--surface-subtle)', color: 'var(--text-faint)' }}
      >
        {stat.icon}
      </div>
      <div
        className="font-display font-bold text-[32px] sm:text-[38px] tracking-[-0.03em] mb-1 tabular-nums"
        style={{ color: 'var(--text-primary)' }}
      >
        {formatStatValue(count)}{stat.suffix}
      </div>
      <div className="text-[13px]" style={{ color: 'var(--text-muted)' }}>{stat.label}</div>
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="py-4 relative">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0" style={{ borderTop: '1px solid var(--divider)', borderBottom: '1px solid var(--divider)' }}>
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={i < stats.length - 1 ? 'lg:border-r' : ''}
              style={{ borderColor: 'var(--divider)' }}
            >
              <StatCard stat={stat} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
