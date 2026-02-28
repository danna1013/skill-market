/*
 * Design: Apple-style dual theme
 * Footer: Multi-column footer with OpenClaw & Tencent Cloud resource links
 */

import { ExternalLink, BookOpen, Gift, Sparkles, MessageCircle, Bot } from 'lucide-react';
import { Link } from 'wouter';

export default function Footer() {
  return (
    <footer className="relative mt-8">
      {/* Top gradient divider */}
      <div className="w-full h-px" style={{ background: 'linear-gradient(to right, transparent, var(--divider), transparent)' }} />

      <div className="py-14">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-14">
            {/* Brand */}
            <div className="md:col-span-1">
              <Link href="/" className="flex items-center gap-2.5 mb-5 group">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#007AFF] to-[#AF52DE] flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <span className="text-white font-bold text-xs font-display">S</span>
                </div>
                <span className="font-display font-semibold text-base" style={{ color: 'var(--text-primary)' }}>
                  Skill<span className="gradient-text">Hub</span>
                </span>
              </Link>
              <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>
                The open marketplace for AI agent skills. Discover, share, and compose.
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="https://s.ddnsip.cn/openclaw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg glass-panel transition-all duration-200 hover:bg-[var(--surface-hover)]"
                  style={{ color: 'var(--text-faint)' }}
                  aria-label="OpenClaw AI 助手"
                >
                  <Bot className="w-4 h-4" />
                </a>
                <a
                  href="https://cloud.tencent.com/developer/article/2624973"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg glass-panel transition-all duration-200 hover:bg-[var(--surface-hover)]"
                  style={{ color: 'var(--text-faint)' }}
                  aria-label="教程合集"
                >
                  <BookOpen className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Product links */}
            <div>
              <h4 className="font-display font-semibold text-sm mb-5" style={{ color: 'var(--text-secondary)' }}>产品</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/skills" className="text-sm transition-colors duration-200 hover:text-[#007AFF]" style={{ color: 'var(--text-muted)' }}>
                    Browse Skills
                  </Link>
                </li>
                <li>
                  <Link href="/skills" className="text-sm transition-colors duration-200 hover:text-[#007AFF]" style={{ color: 'var(--text-muted)' }}>
                    Categories
                  </Link>
                </li>
                <li>
                  <Link href="/skills" className="text-sm transition-colors duration-200 hover:text-[#007AFF]" style={{ color: 'var(--text-muted)' }}>
                    Highlighted
                  </Link>
                </li>
                <li>
                  <Link href="/upload" className="text-sm transition-colors duration-200 hover:text-[#007AFF]" style={{ color: 'var(--text-muted)' }}>
                    Upload Skill
                  </Link>
                </li>
              </ul>
            </div>

            {/* OpenClaw & Resources */}
            <div>
              <h4 className="font-display font-semibold text-sm mb-5" style={{ color: 'var(--text-secondary)' }}>OpenClaw</h4>
              <ul className="space-y-3">
                <li>
                  <a href="https://s.ddnsip.cn/openclaw" target="_blank" rel="noopener noreferrer" className="text-sm transition-colors duration-200 hover:text-[#007AFF] inline-flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
                    <Bot className="w-3 h-3" />
                    AI 助手咨询
                  </a>
                </li>
                <li>
                  <a href="https://cloud.tencent.com/developer/article/2624973" target="_blank" rel="noopener noreferrer" className="text-sm transition-colors duration-200 hover:text-[#007AFF] inline-flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
                    <BookOpen className="w-3 h-3" />
                    教程合集
                  </a>
                </li>
              </ul>
            </div>

            {/* Activities */}
            <div>
              <h4 className="font-display font-semibold text-sm mb-5" style={{ color: 'var(--text-secondary)' }}>活动</h4>
              <ul className="space-y-3">
                <li>
                  <a href="https://mc.tencent.com/HZjnvIK8" target="_blank" rel="noopener noreferrer" className="text-sm transition-colors duration-200 hover:text-[#007AFF] inline-flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
                    <Gift className="w-3 h-3" />
                    最新活动速递
                  </a>
                </li>
                <li>
                  <a href="https://mc.tencent.com/qxkewwOs" target="_blank" rel="noopener noreferrer" className="text-sm transition-colors duration-200 hover:text-[#007AFF] inline-flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
                    <Sparkles className="w-3 h-3" />
                    创意征文赛赢大奖
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-14 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid var(--divider)' }}>
            <p className="text-xs" style={{ color: 'var(--text-faint)' }}>
              &copy; {new Date().getFullYear()} SkillHub. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              <a href="https://s.ddnsip.cn/openclaw" target="_blank" rel="noopener noreferrer" className="text-xs transition-colors duration-200 hover:text-[#007AFF]" style={{ color: 'var(--text-faint)' }}>
                OpenClaw
              </a>
              <a href="https://cloud.tencent.com/developer/article/2624973" target="_blank" rel="noopener noreferrer" className="text-xs transition-colors duration-200 hover:text-[#007AFF]" style={{ color: 'var(--text-faint)' }}>
                Docs
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
