/*
 * Design: Apple-style dual theme (Light default / Dark spatial glass)
 * Navbar: Frosted glass floating navbar with theme toggle and OpenClaw entry
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

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const navLinks = [
    { href: '/', label: '首页' },
    { href: '/skills', label: 'Skills' },
    { href: '/upload', label: '上传' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass-panel-strong shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#007AFF] to-[#AF52DE] flex items-center justify-center shadow-lg shadow-[#007AFF]/20 group-hover:shadow-[#007AFF]/40 group-hover:scale-105 transition-all duration-300">
              <span className="text-white font-bold text-sm font-display">S</span>
            </div>
            <span className="font-display font-semibold text-lg tracking-tight" style={{ color: 'var(--text-primary)' }}>
              Skill<span className="gradient-text">Hub</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map(link => {
              const isActive = location === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-[var(--surface-active)]'
                      : 'hover:bg-[var(--surface-hover)]'
                  }`}
                  style={{ color: isActive ? 'var(--text-primary)' : 'var(--text-tertiary)' }}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0.5 left-1/3 right-1/3 h-px bg-gradient-to-r from-transparent via-[#007AFF] to-transparent" />
                  )}
                </Link>
              );
            })}
            {/* OpenClaw AI link */}
            <a
              href="https://s.ddnsip.cn/openclaw"
              target="_blank"
              rel="noopener noreferrer"
              className="relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-[var(--surface-hover)]"
              style={{ color: 'var(--text-tertiary)' }}
            >
              <span className="flex items-center gap-1.5">
                <Bot className="w-3.5 h-3.5" />
                OpenClaw
              </span>
            </a>
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-2.5">
            <Link
              href="/skills"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel text-sm transition-all duration-200 hover:border-[var(--glass-border-strong)]"
              style={{ color: 'var(--text-muted)' }}
            >
              <Search className="w-3.5 h-3.5" />
              <span>搜索 skills...</span>
              <kbd className="ml-4 px-1.5 py-0.5 rounded text-[10px] font-mono" style={{ background: 'var(--surface-subtle)', color: 'var(--text-faint)', border: '1px solid var(--divider)' }}>
                /
              </kbd>
            </Link>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg glass-panel transition-all duration-200 hover:bg-[var(--surface-hover)]"
              style={{ color: 'var(--text-tertiary)' }}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <Button
              variant="outline"
              size="sm"
              className="gap-2 bg-transparent transition-all duration-200"
              style={{ borderColor: 'var(--divider)', color: 'var(--text-secondary)' }}
              onClick={() => {
                import('sonner').then(({ toast }) => toast('GitHub 登录即将上线'));
              }}
            >
              <Github className="w-4 h-4" />
              登录
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg transition-colors"
              style={{ color: 'var(--text-tertiary)' }}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              className="p-2 transition-colors"
              style={{ color: 'var(--text-secondary)' }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
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
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  location === link.href
                    ? 'bg-[var(--surface-active)]'
                    : 'hover:bg-[var(--surface-hover)]'
                }`}
                style={{ color: location === link.href ? 'var(--text-primary)' : 'var(--text-tertiary)' }}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://s.ddnsip.cn/openclaw"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-[var(--surface-hover)]"
              style={{ color: 'var(--text-tertiary)' }}
            >
              <Bot className="w-4 h-4" />
              OpenClaw AI 助手
            </a>
            <a
              href="https://cloud.tencent.com/developer/article/2624973"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-[var(--surface-hover)]"
              style={{ color: 'var(--text-tertiary)' }}
            >
              📚 教程合集
            </a>
            <div className="pt-3" style={{ borderTop: '1px solid var(--divider)' }}>
              <Button
                variant="outline"
                className="w-full gap-2 bg-transparent"
                style={{ borderColor: 'var(--divider)', color: 'var(--text-secondary)' }}
                onClick={() => {
                  import('sonner').then(({ toast }) => toast('GitHub 登录即将上线'));
                }}
              >
                <Github className="w-4 h-4" />
                使用 GitHub 登录
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
