/*
 * Design: Apple Vision Pro Spatial Glass
 * Upload page: Form to submit a new skill (frontend only, demo)
 * Enhanced: Step indicator, better form fields, refined success state
 */

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import {
  Upload as UploadIcon, Github, Tag, FolderOpen,
  FileText, ArrowRight, CheckCircle, Sparkles, ArrowLeft,
} from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'wouter';

const steps = [
  { num: 1, label: 'Repository' },
  { num: 2, label: 'Details' },
  { num: 3, label: 'Submit' },
];

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
          <div className="container max-w-lg text-center">
            <div className="glass-panel glass-highlight p-12 animate-fade-in-up relative overflow-hidden">
              {/* Success glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-[#30D158]/8 blur-[60px]" />

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-[#30D158]/10 border border-[#30D158]/20 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-[#30D158]" />
                </div>
                <h1 className="font-display font-bold text-2xl text-white mb-3 tracking-[-0.02em]">
                  Skill Submitted
                </h1>
                <p className="text-white/40 text-sm leading-relaxed mb-8 max-w-sm mx-auto">
                  Your skill has been submitted for review. We'll notify you once it's approved and listed on SkillHub.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Button
                    onClick={() => setSubmitted(false)}
                    className="bg-gradient-to-r from-[#007AFF] to-[#5856D6] text-white border-0 rounded-xl px-6 shadow-lg shadow-[#007AFF]/20"
                  >
                    <UploadIcon className="w-4 h-4 mr-2" />
                    Submit Another
                  </Button>
                  <Link
                    href="/skills"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 text-white/55 text-sm font-medium hover:bg-white/5 hover:text-white/75 transition-all duration-200"
                  >
                    Browse Skills
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
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
          {/* Header */}
          <div className="mb-10 animate-fade-in-up">
            <Link
              href="/skills"
              className="inline-flex items-center gap-1.5 text-sm text-white/30 hover:text-white/50 transition-colors mb-6 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              Back to skills
            </Link>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#007AFF]/20 to-[#AF52DE]/20 flex items-center justify-center border border-white/10">
                <Sparkles className="w-5 h-5 text-[#007AFF]" />
              </div>
              <h1 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-[-0.02em]">
                Publish a Skill
              </h1>
            </div>
            <p className="text-white/35 mt-2 text-base">
              Share your skill with the community. Open source, versioned, composable.
            </p>
          </div>

          {/* Step indicator */}
          <div className="flex items-center gap-3 mb-10 animate-fade-in-up" style={{ animationDelay: '50ms' }}>
            {steps.map((step, i) => (
              <div key={step.num} className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-display ${
                    i === 0
                      ? 'bg-[#007AFF] text-white'
                      : 'bg-white/[6%] text-white/30 border border-white/[8%]'
                  }`}>
                    {step.num}
                  </div>
                  <span className={`text-sm font-medium ${i === 0 ? 'text-white/70' : 'text-white/25'}`}>
                    {step.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className="w-8 h-px bg-white/8" />
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* GitHub URL */}
            <div className="glass-panel glass-highlight p-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <label className="flex items-center gap-2 text-sm font-medium text-white mb-3">
                <Github className="w-4 h-4 text-white/35" />
                GitHub Repository URL
              </label>
              <input
                type="url"
                required
                placeholder="https://github.com/username/skill-name"
                className="w-full bg-white/[4%] border border-white/[8%] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/18 outline-none focus:border-[#007AFF]/40 focus:ring-1 focus:ring-[#007AFF]/20 transition-all duration-200"
              />
              <p className="text-xs text-white/20 mt-2.5">
                Must contain a valid SKILL.md file in the repository root.
              </p>
            </div>

            {/* Skill Name */}
            <div className="glass-panel glass-highlight p-6 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
              <label className="flex items-center gap-2 text-sm font-medium text-white mb-3">
                <FileText className="w-4 h-4 text-white/35" />
                Skill Name
              </label>
              <input
                type="text"
                required
                placeholder="my-awesome-skill"
                className="w-full bg-white/[4%] border border-white/[8%] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/18 outline-none focus:border-[#007AFF]/40 focus:ring-1 focus:ring-[#007AFF]/20 transition-all duration-200 font-mono"
              />
            </div>

            {/* Description */}
            <div className="glass-panel glass-highlight p-6 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <label className="flex items-center gap-2 text-sm font-medium text-white mb-3">
                Short Description
              </label>
              <textarea
                required
                rows={3}
                placeholder="Describe what your skill does and when agents should use it..."
                className="w-full bg-white/[4%] border border-white/[8%] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/18 outline-none focus:border-[#007AFF]/40 focus:ring-1 focus:ring-[#007AFF]/20 transition-all duration-200 resize-none leading-relaxed"
              />
            </div>

            {/* Category */}
            <div className="glass-panel glass-highlight p-6 animate-fade-in-up" style={{ animationDelay: '250ms' }}>
              <label className="flex items-center gap-2 text-sm font-medium text-white mb-3">
                <FolderOpen className="w-4 h-4 text-white/35" />
                Category
              </label>
              <select
                required
                className="w-full bg-white/[4%] border border-white/[8%] rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#007AFF]/40 focus:ring-1 focus:ring-[#007AFF]/20 transition-all duration-200 appearance-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.3)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center' }}
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
            <div className="glass-panel glass-highlight p-6 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <label className="flex items-center gap-2 text-sm font-medium text-white mb-3">
                <Tag className="w-4 h-4 text-white/35" />
                Tags
              </label>
              <input
                type="text"
                placeholder="search, api, web (comma separated)"
                className="w-full bg-white/[4%] border border-white/[8%] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/18 outline-none focus:border-[#007AFF]/40 focus:ring-1 focus:ring-[#007AFF]/20 transition-all duration-200"
              />
              <p className="text-xs text-white/20 mt-2.5">
                Add up to 5 tags to help users discover your skill.
              </p>
            </div>

            {/* Submit */}
            <div className="flex items-center gap-4 pt-4 animate-fade-in-up" style={{ animationDelay: '350ms' }}>
              <Button
                type="submit"
                className="bg-gradient-to-r from-[#007AFF] to-[#5856D6] hover:from-[#0071E3] hover:to-[#4F46E5] text-white border-0 rounded-xl px-8 py-5 text-sm font-medium shadow-lg shadow-[#007AFF]/20 hover:shadow-[#007AFF]/35 hover:scale-[1.01] transition-all duration-300"
              >
                <UploadIcon className="w-4 h-4 mr-2" />
                Submit for Review
              </Button>
              <p className="text-xs text-white/20">
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
