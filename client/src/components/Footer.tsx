/*
 * Design: Apple Vision Pro Spatial Glass
 * Footer: Minimal dark footer with glass divider, refined spacing
 */

import { Github, Twitter, MessageCircle } from 'lucide-react';
import { Link } from 'wouter';

const productLinks = [
  { label: 'Browse Skills', href: '/skills' },
  { label: 'Categories', href: '/skills' },
  { label: 'Highlighted', href: '/skills' },
  { label: 'Upload Skill', href: '/upload' },
];

const devLinks = [
  { label: 'Documentation', href: '#' },
  { label: 'API Reference', href: '#' },
  { label: 'CLI Guide', href: '#' },
  { label: 'Skill Spec', href: '#' },
];

const communityLinks = [
  { label: 'GitHub', href: '#' },
  { label: 'Discord', href: '#' },
  { label: 'Twitter', href: '#' },
  { label: 'Blog', href: '#' },
];

export default function Footer() {
  return (
    <footer className="relative mt-8">
      {/* Top gradient divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div className="py-14">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-14">
            {/* Brand */}
            <div className="md:col-span-1">
              <Link href="/" className="flex items-center gap-2.5 mb-5 group">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#007AFF] to-[#AF52DE] flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <span className="text-white font-bold text-xs font-display">S</span>
                </div>
                <span className="font-display font-semibold text-base text-white">
                  Skill<span className="gradient-text">Hub</span>
                </span>
              </Link>
              <p className="text-sm text-white/25 leading-relaxed mb-6">
                The open marketplace for AI agent skills. Discover, share, and compose.
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="#"
                  className="p-2 rounded-lg glass-panel text-white/25 hover:text-white/55 hover:bg-white/[6%] transition-all duration-200"
                  aria-label="GitHub"
                  onClick={(e) => { e.preventDefault(); import('sonner').then(({ toast }) => toast('GitHub link coming soon')); }}
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="p-2 rounded-lg glass-panel text-white/25 hover:text-white/55 hover:bg-white/[6%] transition-all duration-200"
                  aria-label="Twitter"
                  onClick={(e) => { e.preventDefault(); import('sonner').then(({ toast }) => toast('Twitter link coming soon')); }}
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="p-2 rounded-lg glass-panel text-white/25 hover:text-white/55 hover:bg-white/[6%] transition-all duration-200"
                  aria-label="Discord"
                  onClick={(e) => { e.preventDefault(); import('sonner').then(({ toast }) => toast('Discord link coming soon')); }}
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Product links */}
            <div>
              <h4 className="font-display font-semibold text-sm text-white/50 mb-5">Product</h4>
              <ul className="space-y-3">
                {productLinks.map(item => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-white/25 hover:text-white/55 transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Developer links */}
            <div>
              <h4 className="font-display font-semibold text-sm text-white/50 mb-5">Developers</h4>
              <ul className="space-y-3">
                {devLinks.map(item => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-sm text-white/25 hover:text-white/55 transition-colors duration-200"
                      onClick={(e) => { e.preventDefault(); import('sonner').then(({ toast }) => toast('Feature coming soon')); }}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Community links */}
            <div>
              <h4 className="font-display font-semibold text-sm text-white/50 mb-5">Community</h4>
              <ul className="space-y-3">
                {communityLinks.map(item => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-sm text-white/25 hover:text-white/55 transition-colors duration-200"
                      onClick={(e) => { e.preventDefault(); import('sonner').then(({ toast }) => toast('Feature coming soon')); }}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-14 pt-6 border-t border-white/[4%] flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/18">
              &copy; 2026 SkillHub. Open source under MIT License.
            </p>
            <div className="flex items-center gap-5">
              <a
                href="#"
                className="text-xs text-white/18 hover:text-white/35 transition-colors duration-200"
                onClick={(e) => { e.preventDefault(); import('sonner').then(({ toast }) => toast('Feature coming soon')); }}
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-xs text-white/18 hover:text-white/35 transition-colors duration-200"
                onClick={(e) => { e.preventDefault(); import('sonner').then(({ toast }) => toast('Feature coming soon')); }}
              >
                Terms
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
