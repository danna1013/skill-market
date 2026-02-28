/*
 * Apple HIG Upload — clean form, generous spacing
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

export default function Upload() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success('已提交，等待审核');
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 pb-16 flex items-center justify-center">
          <div className="container max-w-lg text-center">
            <div className="glass-panel glass-highlight p-14 animate-fade-in-up relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-[#30d158]/6 blur-[80px]" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-[#30d158]/8 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-7 h-7 text-[#30d158]" />
                </div>
                <h1 className="font-display font-bold text-[24px] mb-3 tracking-[-0.02em]" style={{ color: 'var(--text-primary)' }}>
                  Skill Submitted
                </h1>
                <p className="text-[14px] leading-relaxed mb-8 max-w-sm mx-auto" style={{ color: 'var(--text-muted)' }}>
                  收到了，审核通过后会自动上架。
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Button
                    onClick={() => setSubmitted(false)}
                    className="rounded-full px-6 text-[13px] font-medium"
                    style={{ background: 'var(--text-primary)', color: 'var(--background)' }}
                  >
                    <UploadIcon className="w-4 h-4 mr-1.5" />
                    继续发布
                  </Button>
                  <Link
                    href="/skills"
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-[13px] font-medium transition-all duration-200"
                    style={{ border: '1px solid var(--divider)', color: 'var(--text-secondary)' }}
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
          <div className="mb-12 animate-fade-in-up">
            <Link
              href="/skills"
              className="inline-flex items-center gap-1.5 text-[13px] transition-colors mb-8 group hover:text-[var(--text-primary)]"
              style={{ color: 'var(--text-muted)' }}
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              返回
            </Link>
            <h1 className="font-display font-bold text-[28px] sm:text-[36px] tracking-[-0.03em]" style={{ color: 'var(--text-primary)' }}>
              Publish a Skill
            </h1>
            <p className="mt-3 text-[15px]" style={{ color: 'var(--text-muted)' }}>
              把你写的技能分享出来，让更多智能体用上。
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* GitHub URL */}
            <div className="glass-panel glass-highlight p-6 animate-fade-in-up" style={{ animationDelay: '80ms' }}>
              <label className="flex items-center gap-2 text-[14px] font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
                <Github className="w-4 h-4" style={{ color: 'var(--text-faint)' }} />
                GitHub 仓库
              </label>
              <input
                type="url"
                required
                placeholder="https://github.com/username/skill-name"
                className="w-full rounded-xl px-4 py-3 text-[14px] outline-none transition-all duration-200 focus:ring-2 focus:ring-[#0071e3]/20"
                style={{ background: 'var(--surface-subtle)', border: '1px solid var(--divider)', color: 'var(--text-primary)' }}
              />
              <p className="text-[12px] mt-2" style={{ color: 'var(--text-faint)' }}>
                根目录下需要有 SKILL.md 文件
              </p>
            </div>

            {/* Name */}
            <div className="glass-panel glass-highlight p-6 animate-fade-in-up" style={{ animationDelay: '120ms' }}>
              <label className="flex items-center gap-2 text-[14px] font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
                <FileText className="w-4 h-4" style={{ color: 'var(--text-faint)' }} />
                技能名称
              </label>
              <input
                type="text"
                required
                placeholder="my-awesome-skill"
                className="w-full rounded-xl px-4 py-3 text-[14px] font-mono outline-none transition-all duration-200 focus:ring-2 focus:ring-[#0071e3]/20"
                style={{ background: 'var(--surface-subtle)', border: '1px solid var(--divider)', color: 'var(--text-primary)' }}
              />
            </div>

            {/* Description */}
            <div className="glass-panel glass-highlight p-6 animate-fade-in-up" style={{ animationDelay: '160ms' }}>
              <label className="text-[14px] font-medium mb-3 block" style={{ color: 'var(--text-primary)' }}>
                一句话描述
              </label>
              <textarea
                required
                rows={3}
                placeholder="这个技能能做什么？智能体什么时候会用到？"
                className="w-full rounded-xl px-4 py-3 text-[14px] outline-none transition-all duration-200 resize-none leading-relaxed focus:ring-2 focus:ring-[#0071e3]/20"
                style={{ background: 'var(--surface-subtle)', border: '1px solid var(--divider)', color: 'var(--text-primary)' }}
              />
            </div>

            {/* Category */}
            <div className="glass-panel glass-highlight p-6 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <label className="flex items-center gap-2 text-[14px] font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
                <FolderOpen className="w-4 h-4" style={{ color: 'var(--text-faint)' }} />
                分类
              </label>
              <select
                required
                className="w-full rounded-xl px-4 py-3 text-[14px] outline-none transition-all duration-200 appearance-none focus:ring-2 focus:ring-[#0071e3]/20"
                style={{ background: 'var(--surface-subtle)', border: '1px solid var(--divider)', color: 'var(--text-primary)' }}
              >
                <option value="">选一个分类</option>
                <option value="dev-tools">Dev Tools</option>
                <option value="ai-ml">AI & ML</option>
                <option value="productivity">Productivity</option>
                <option value="search">Search & Data</option>
                <option value="communication">Communication</option>
                <option value="security">Security</option>
                <option value="automation">Automation</option>
                <option value="media">Media & Files</option>
              </select>
            </div>

            {/* Tags */}
            <div className="glass-panel glass-highlight p-6 animate-fade-in-up" style={{ animationDelay: '240ms' }}>
              <label className="flex items-center gap-2 text-[14px] font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
                <Tag className="w-4 h-4" style={{ color: 'var(--text-faint)' }} />
                标签
              </label>
              <input
                type="text"
                placeholder="search, api, web（逗号分隔，最多 5 个）"
                className="w-full rounded-xl px-4 py-3 text-[14px] outline-none transition-all duration-200 focus:ring-2 focus:ring-[#0071e3]/20"
                style={{ background: 'var(--surface-subtle)', border: '1px solid var(--divider)', color: 'var(--text-primary)' }}
              />
            </div>

            {/* Submit */}
            <div className="flex items-center gap-4 pt-6 animate-fade-in-up" style={{ animationDelay: '280ms' }}>
              <Button
                type="submit"
                className="rounded-full px-8 py-5 text-[14px] font-medium shadow-md hover:shadow-lg hover:scale-[1.01] transition-all duration-300"
                style={{ background: 'var(--text-primary)', color: 'var(--background)' }}
              >
                <UploadIcon className="w-4 h-4 mr-1.5" />
                提交审核
              </Button>
              <p className="text-[12px]" style={{ color: 'var(--text-faint)' }}>
                一般 24 小时内完成
              </p>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
