/*
 * Apple HIG Navbar — frosted glass, minimal, confident
 */

import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'wouter';
import { Search, Menu, X, Github, Sun, Moon, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location, navigate] = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
      e.preventDefault();
      navigate('/skills');
    }
  }, [navigate]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => { setMobileOpen(false); }, [location]);

  const navLinks = [
    { href: '/', label: '首页' },
    { href: '/skills', label: 'Skills' },
    { href: '/upload', label: '发布' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-panel-strong shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container">
        <nav className="flex items-center justify-between h-[52px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#0071e3] to-[#bf5af2] flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <span className="text-white font-bold text-[11px] font-display">S</span>
            </div>
            <span className="font-display font-semibold text-[17px] tracking-[-0.02em]" style={{ color: 'var(--text-primary)' }}>
              Skill<span className="gradient-text">Hub</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => {
              const isActive = location === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-all duration-200 hover:bg-[var(--surface-hover)]"
                  style={{ color: isActive ? 'var(--text-primary)' : 'var(--text-muted)' }}
                >
                  {link.label}
                </Link>
              );
            })}
            <a
              href="https://s.ddnsip.cn/openclaw"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-all duration-200 hover:bg-[var(--surface-hover)]"
              style={{ color: 'var(--text-muted)' }}
            >
              <Bot className="w-3.5 h-3.5" />
              OpenClaw
            </a>
          </div>

          {/* Right */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/skills"
              className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel text-[13px] transition-all duration-200 hover:border-[var(--glass-border-strong)]"
              style={{ color: 'var(--text-muted)' }}
            >
              <Search className="w-3.5 h-3.5" />
              <span>搜索</span>
              <kbd className="ml-3 px-1.5 py-0.5 rounded text-[10px] font-mono" style={{ background: 'var(--surface-subtle)', color: 'var(--text-faint)', border: '1px solid var(--divider)' }}>
                /
              </kbd>
            </Link>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full transition-all duration-200 hover:bg-[var(--surface-hover)]"
              style={{ color: 'var(--text-muted)' }}
              aria-label="切换主题"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 bg-transparent rounded-full text-[13px] transition-all duration-200"
              style={{ borderColor: 'var(--divider)', color: 'var(--text-secondary)' }}
              onClick={() => {
                import('sonner').then(({ toast }) => toast('GitHub 登录即将上线'));
              }}
            >
              <Github className="w-3.5 h-3.5" />
              登录
            </Button>
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center gap-1.5">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full transition-colors"
              style={{ color: 'var(--text-muted)' }}
              aria-label="切换主题"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              className="p-2 rounded-full transition-colors"
              style={{ color: 'var(--text-secondary)' }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="菜单"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden glass-panel-strong animate-fade-in-up" style={{ borderTop: '1px solid var(--divider)' }}>
          <div className="container py-4 space-y-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-3 rounded-xl text-[14px] font-medium transition-colors hover:bg-[var(--surface-hover)]"
                style={{ color: location === link.href ? 'var(--text-primary)' : 'var(--text-muted)' }}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://s.ddnsip.cn/openclaw"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-3 rounded-xl text-[14px] font-medium transition-colors hover:bg-[var(--surface-hover)]"
              style={{ color: 'var(--text-muted)' }}
            >
              <Bot className="w-4 h-4" />
              OpenClaw AI
            </a>
            <div className="pt-3" style={{ borderTop: '1px solid var(--divider)' }}>
              <Button
                variant="outline"
                className="w-full gap-2 bg-transparent rounded-xl"
                style={{ borderColor: 'var(--divider)', color: 'var(--text-secondary)' }}
                onClick={() => {
                  import('sonner').then(({ toast }) => toast('GitHub 登录即将上线'));
                }}
              >
                <Github className="w-4 h-4" />
                用 GitHub 登录
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
