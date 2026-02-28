/*
 * Apple HIG Footer — minimal, structured, quiet
 */

import { BookOpen, Gift, Sparkles, Bot } from 'lucide-react';
import { Link } from 'wouter';

export default function Footer() {
  return (
    <footer className="relative mt-8">
      <div className="w-full h-px" style={{ background: 'var(--divider)' }} />

      <div className="py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-14">
            {/* Brand */}
            <div className="md:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-4 group">
                <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#0071e3] to-[#bf5af2] flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <span className="text-white font-bold text-[9px] font-display">S</span>
                </div>
                <span className="font-display font-semibold text-[15px] tracking-[-0.02em]" style={{ color: 'var(--text-primary)' }}>
                  Skill<span className="gradient-text">Hub</span>
                </span>
              </Link>
              <p className="text-[13px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                开放的 AI 智能体技能市场。
              </p>
            </div>

            {/* Explore */}
            <div>
              <h4 className="font-display font-semibold text-[12px] uppercase tracking-wider mb-4" style={{ color: 'var(--text-faint)' }}>探索</h4>
              <ul className="space-y-2.5">
                <li><Link href="/skills" className="text-[13px] transition-colors duration-200 hover:text-[var(--text-primary)]" style={{ color: 'var(--text-muted)' }}>全部技能</Link></li>
                <li><Link href="/skills" className="text-[13px] transition-colors duration-200 hover:text-[var(--text-primary)]" style={{ color: 'var(--text-muted)' }}>精选推荐</Link></li>
                <li><Link href="/upload" className="text-[13px] transition-colors duration-200 hover:text-[var(--text-primary)]" style={{ color: 'var(--text-muted)' }}>发布技能</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-display font-semibold text-[12px] uppercase tracking-wider mb-4" style={{ color: 'var(--text-faint)' }}>资源</h4>
              <ul className="space-y-2.5">
                <li>
                  <a href="https://s.ddnsip.cn/openclaw" target="_blank" rel="noopener noreferrer" className="text-[13px] inline-flex items-center gap-1.5 transition-colors duration-200 hover:text-[var(--text-primary)]" style={{ color: 'var(--text-muted)' }}>
                    <Bot className="w-3 h-3" /> OpenClaw AI
                  </a>
                </li>
                <li>
                  <a href="https://cloud.tencent.com/developer/article/2624973" target="_blank" rel="noopener noreferrer" className="text-[13px] inline-flex items-center gap-1.5 transition-colors duration-200 hover:text-[var(--text-primary)]" style={{ color: 'var(--text-muted)' }}>
                    <BookOpen className="w-3 h-3" /> 教程
                  </a>
                </li>
              </ul>
            </div>

            {/* Community */}
            <div>
              <h4 className="font-display font-semibold text-[12px] uppercase tracking-wider mb-4" style={{ color: 'var(--text-faint)' }}>社区</h4>
              <ul className="space-y-2.5">
                <li>
                  <a href="https://mc.tencent.com/HZjnvIK8" target="_blank" rel="noopener noreferrer" className="text-[13px] inline-flex items-center gap-1.5 transition-colors duration-200 hover:text-[var(--text-primary)]" style={{ color: 'var(--text-muted)' }}>
                    <Gift className="w-3 h-3" /> 活动
                  </a>
                </li>
                <li>
                  <a href="https://mc.tencent.com/qxkewwOs" target="_blank" rel="noopener noreferrer" className="text-[13px] inline-flex items-center gap-1.5 transition-colors duration-200 hover:text-[var(--text-primary)]" style={{ color: 'var(--text-muted)' }}>
                    <Sparkles className="w-3 h-3" /> 征文
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-12 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderTop: '1px solid var(--divider)' }}>
            <p className="text-[11px]" style={{ color: 'var(--text-faint)' }}>
              &copy; {new Date().getFullYear()} SkillHub
            </p>
            <div className="flex items-center gap-4">
              <a href="https://s.ddnsip.cn/openclaw" target="_blank" rel="noopener noreferrer" className="text-[11px] transition-colors duration-200 hover:text-[var(--text-muted)]" style={{ color: 'var(--text-faint)' }}>
                OpenClaw
              </a>
              <a href="https://cloud.tencent.com/developer/article/2624973" target="_blank" rel="noopener noreferrer" className="text-[11px] transition-colors duration-200 hover:text-[var(--text-muted)]" style={{ color: 'var(--text-faint)' }}>
                文档
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
