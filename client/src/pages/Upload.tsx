/*
 * Design: Apple Vision Pro Spatial Glass
 * Upload page: Form to submit a new skill (frontend only, demo)
 */

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Upload as UploadIcon, Github, Link as LinkIcon, ArrowRight, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function Upload() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success('Skill submitted for review!');
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 pb-16 flex items-center justify-center">
          <div className="container max-w-lg text-center animate-fade-in-up">
            <div className="glass-panel glass-highlight p-10">
              <CheckCircle className="w-16 h-16 text-[#30D158] mx-auto mb-6" />
              <h1 className="font-display font-bold text-2xl text-white mb-3">
                Skill Submitted
              </h1>
              <p className="text-white/45 text-sm leading-relaxed mb-6">
                Your skill has been submitted for review. We'll notify you once it's approved and listed on SkillHub.
              </p>
              <Button
                onClick={() => setSubmitted(false)}
                className="bg-gradient-to-r from-[#007AFF] to-[#5856D6] text-white border-0 rounded-xl"
              >
                Submit Another
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <div className="container max-w-2xl">
          <div className="mb-8 animate-fade-in-up">
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
              Publish a Skill
            </h1>
            <p className="text-white/40 mt-2">
              Share your skill with the community. Open source, versioned, composable.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* GitHub URL */}
            <div className="glass-panel glass-highlight p-6 animate-fade-in-up" style={{ animationDelay: '50ms' }}>
              <label className="block text-sm font-medium text-white mb-3">
                <Github className="w-4 h-4 inline mr-2 text-white/40" />
                GitHub Repository URL
              </label>
              <input
                type="url"
                required
                placeholder="https://github.com/username/skill-name"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#007AFF]/40 focus:ring-1 focus:ring-[#007AFF]/20 transition-all"
              />
              <p className="text-xs text-white/25 mt-2">
                Must contain a valid SKILL.md file in the repository root.
              </p>
            </div>

            {/* Skill Name */}
            <div className="glass-panel glass-highlight p-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <label className="block text-sm font-medium text-white mb-3">
                Skill Name
              </label>
              <input
                type="text"
                required
                placeholder="my-awesome-skill"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#007AFF]/40 focus:ring-1 focus:ring-[#007AFF]/20 transition-all"
              />
            </div>

            {/* Description */}
            <div className="glass-panel glass-highlight p-6 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
              <label className="block text-sm font-medium text-white mb-3">
                Short Description
              </label>
              <textarea
                required
                rows={3}
                placeholder="Describe what your skill does and when agents should use it..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#007AFF]/40 focus:ring-1 focus:ring-[#007AFF]/20 transition-all resize-none"
              />
            </div>

            {/* Category */}
            <div className="glass-panel glass-highlight p-6 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <label className="block text-sm font-medium text-white mb-3">
                Category
              </label>
              <select
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#007AFF]/40 focus:ring-1 focus:ring-[#007AFF]/20 transition-all appearance-none"
              >
                <option value="" className="bg-[#1a1a2e]">Select a category</option>
                <option value="dev-tools" className="bg-[#1a1a2e]">Dev Tools</option>
                <option value="ai-ml" className="bg-[#1a1a2e]">AI & ML</option>
                <option value="productivity" className="bg-[#1a1a2e]">Productivity</option>
                <option value="search" className="bg-[#1a1a2e]">Search & Data</option>
                <option value="communication" className="bg-[#1a1a2e]">Communication</option>
                <option value="security" className="bg-[#1a1a2e]">Security</option>
                <option value="automation" className="bg-[#1a1a2e]">Automation</option>
                <option value="media" className="bg-[#1a1a2e]">Media & Files</option>
              </select>
            </div>

            {/* Tags */}
            <div className="glass-panel glass-highlight p-6 animate-fade-in-up" style={{ animationDelay: '250ms' }}>
              <label className="block text-sm font-medium text-white mb-3">
                Tags
              </label>
              <input
                type="text"
                placeholder="search, api, web (comma separated)"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#007AFF]/40 focus:ring-1 focus:ring-[#007AFF]/20 transition-all"
              />
            </div>

            {/* Submit */}
            <div className="flex items-center gap-4 pt-2 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <Button
                type="submit"
                className="bg-gradient-to-r from-[#007AFF] to-[#5856D6] hover:from-[#0071E3] hover:to-[#4F46E5] text-white border-0 rounded-xl px-8 py-5 text-sm font-medium shadow-lg shadow-[#007AFF]/20"
              >
                <UploadIcon className="w-4 h-4 mr-2" />
                Submit for Review
              </Button>
              <p className="text-xs text-white/25">
                Skills are reviewed within 24 hours.
              </p>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
