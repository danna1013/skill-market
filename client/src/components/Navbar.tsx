/*
 * Design: Apple Vision Pro Spatial Glass
 * Navbar: Frosted glass floating navbar with specular highlight
 * Enhanced: Keyboard shortcut, refined transitions, active indicator
 */

import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'wouter';
import { Search, Menu, X, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location, navigate] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut: "/" to focus search
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

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/skills', label: 'Skills' },
    { href: '/upload', label: 'Upload' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass-panel-strong shadow-lg shadow-black/20'
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
            <span className="font-display font-semibold text-lg tracking-tight text-foreground">
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
                      ? 'text-white bg-white/10'
                      : 'text-white/55 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0.5 left-1/3 right-1/3 h-px bg-gradient-to-r from-transparent via-[#007AFF] to-transparent" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/skills"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel text-sm text-white/45 hover:text-white/75 transition-all duration-200 hover:border-white/15 hover:bg-white/[6%]"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search skills...</span>
              <kbd className="ml-4 px-1.5 py-0.5 rounded text-[10px] bg-white/5 text-white/25 border border-white/8 font-mono">
                /
              </kbd>
            </Link>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 bg-transparent border-white/10 text-white/75 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all duration-200"
              onClick={() => {
                import('sonner').then(({ toast }) => toast('GitHub sign-in coming soon'));
              }}
            >
              <Github className="w-4 h-4" />
              Sign in
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 text-white/65 hover:text-white transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden glass-panel-strong border-t border-white/5 animate-fade-in-up">
          <div className="container py-4 space-y-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  location === link.href
                    ? 'text-white bg-white/10'
                    : 'text-white/55 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-white/5">
              <Button
                variant="outline"
                className="w-full gap-2 bg-transparent border-white/10 text-white/75"
                onClick={() => {
                  import('sonner').then(({ toast }) => toast('GitHub sign-in coming soon'));
                }}
              >
                <Github className="w-4 h-4" />
                Sign in with GitHub
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
