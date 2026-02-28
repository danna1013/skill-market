/*
 * Design: Apple Vision Pro Spatial Glass
 * Footer: Minimal dark footer with glass divider
 */

import { Github, Twitter, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 mt-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#007AFF] to-[#AF52DE] flex items-center justify-center">
                <span className="text-white font-bold text-xs font-display">S</span>
              </div>
              <span className="font-display font-semibold text-base text-white">
                Skill<span className="gradient-text">Hub</span>
              </span>
            </div>
            <p className="text-sm text-white/30 leading-relaxed">
              The open marketplace for AI agent skills. Discover, share, and compose.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a href="#" className="text-white/25 hover:text-white/50 transition-colors" aria-label="GitHub">
                <Github className="w-4.5 h-4.5" />
              </a>
              <a href="#" className="text-white/25 hover:text-white/50 transition-colors" aria-label="Twitter">
                <Twitter className="w-4.5 h-4.5" />
              </a>
              <a href="#" className="text-white/25 hover:text-white/50 transition-colors" aria-label="Discord">
                <MessageCircle className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-semibold text-sm text-white/60 mb-4">Product</h4>
            <ul className="space-y-2.5">
              {['Browse Skills', 'Categories', 'Highlighted', 'Upload Skill'].map(item => (
                <li key={item}>
                  <a href="#" className="text-sm text-white/30 hover:text-white/60 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm text-white/60 mb-4">Developers</h4>
            <ul className="space-y-2.5">
              {['Documentation', 'API Reference', 'CLI Guide', 'Skill Spec'].map(item => (
                <li key={item}>
                  <a href="#" className="text-sm text-white/30 hover:text-white/60 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm text-white/60 mb-4">Community</h4>
            <ul className="space-y-2.5">
              {['GitHub', 'Discord', 'Twitter', 'Blog'].map(item => (
                <li key={item}>
                  <a href="#" className="text-sm text-white/30 hover:text-white/60 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20">
            &copy; 2026 SkillHub. Open source under MIT License.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-xs text-white/20 hover:text-white/40 transition-colors">
              Privacy
            </a>
            <a href="#" className="text-xs text-white/20 hover:text-white/40 transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
