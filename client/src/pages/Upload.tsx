/*
 * Design: Apple-style dual theme
 * Upload page: Form to submit a new skill (frontend only, demo)
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
  { num: 1, label: '仓库信息' },
  { num: 2, label: '详细信息' },
  { num: 3, label: '提交审核' },
];

export default function Upload() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success('Skill 已提交审核！');
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 pb-16 flex items-center justify-center">
          <div className="container max-w-lg text-center">
            <div className="glass-panel glass-highlight p-12 animate-fade-in-up relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full blur-[60px]" style={{ background: 'rgba(120,140,93,0.08)' }} />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: 'rgba(120,140,93,0.1)', border: '1px solid rgba(120,140,93,0.2)' }}>
                  <CheckCircle className="w-8 h-8" style={{ color: '#788c5d' }} />
                </div>
                <h1 className="font-display font-bold text-2xl mb-3 tracking-[-0.02em]" style={{ color: 'var(--text-primary)' }}>
                  Skill 提交成功
                </h1>
                <p className="text-sm leading-relaxed mb-8 max-w-sm mx-auto" style={{ color: 'var(--text-muted)' }}>
                  您的 Skill 已提交审核。审核通过后，将在 SkillHub 上展示并通知您。
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Button
                    onClick={() => setSubmitted(false)}
                    className="text-white border-0 rounded-xl px-6 transition-all duration-300"
                    style={{ background: 'linear-gradient(135deg, #d97757, #c86a45)', boxShadow: '0 4px 14px rgba(217,119,87,0.25)' }}
                  >
                    <UploadIcon className="w-4 h-4 mr-2" />
                    继续发布
                  </Button>
                  <Link
                    href="/skills"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
                    style={{ border: '1px solid var(--divider)', color: 'var(--text-secondary)' }}
                  >
                    浏览 Skills
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
              className="inline-flex items-center gap-1.5 text-sm transition-all duration-200 mb-6 group"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#d97757')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              返回 Skills 市场
            </Link>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(217,119,87,0.12)', border: '1px solid rgba(217,119,87,0.2)' }}>
                <Sparkles className="w-5 h-5" style={{ color: '#d97757' }} />
              </div>
              <h1 className="font-display font-bold text-3xl sm:text-4xl tracking-[-0.02em]" style={{ color: 'var(--text-primary)' }}>
                发布 Skill
              </h1>
            </div>
            <p className="mt-2 text-base" style={{ color: 'var(--text-muted)' }}>
              将您的 Skill 分享给社区。开源、版本化、可组合。
            </p>
          </div>

          {/* Step indicator */}
          <div className="flex items-center gap-3 mb-10 animate-fade-in-up" style={{ animationDelay: '50ms' }}>
            {steps.map((step, i) => (
              <div key={step.num} className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-display"
                    style={
                      i === 0
                        ? { background: '#d97757', color: '#fff' }
                        : { background: 'var(--surface-subtle)', color: 'var(--text-faint)', border: '1px solid var(--divider)' }
                    }
                  >
                    {step.num}
                  </div>
                  <span
                    className="text-sm font-medium"
                    style={{ color: i === 0 ? 'var(--text-secondary)' : 'var(--text-faint)' }}
                  >
                    {step.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className="w-8 h-px" style={{ background: 'var(--divider)' }} />
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* GitHub URL */}
            <div className="glass-panel glass-highlight p-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <label className="flex items-center gap-2 text-sm font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
                <Github className="w-4 h-4" style={{ color: 'var(--text-faint)' }} />
                GitHub 仓库地址
              </label>
              <input
                type="url"
                required
                placeholder="https://github.com/username/skill-name"
                className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200"
                style={{ background: 'var(--surface-subtle)', border: '1px solid var(--divider)', color: 'var(--text-primary)' }}
              />
              <p className="text-xs mt-2.5" style={{ color: 'var(--text-faint)' }}>
                仓库根目录必须包含有效的 SKILL.md 文件。
              </p>
            </div>

            {/* Skill Name */}
            <div className="glass-panel glass-highlight p-6 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
              <label className="flex items-center gap-2 text-sm font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
                <FileText className="w-4 h-4" style={{ color: 'var(--text-faint)' }} />
                Skill 名称
              </label>
              <input
                type="text"
                required
                placeholder="my-awesome-skill"
                className="w-full rounded-xl px-4 py-3 text-sm font-mono outline-none transition-all duration-200"
                style={{ background: 'var(--surface-subtle)', border: '1px solid var(--divider)', color: 'var(--text-primary)' }}
              />
            </div>

            {/* Description */}
            <div className="glass-panel glass-highlight p-6 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <label className="flex items-center gap-2 text-sm font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
                简短描述
              </label>
              <textarea
                required
                rows={3}
                placeholder="描述此 Skill 的功能以及智能体应如何使用..."
                className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 resize-none leading-relaxed"
                style={{ background: 'var(--surface-subtle)', border: '1px solid var(--divider)', color: 'var(--text-primary)' }}
              />
            </div>

            {/* Category */}
            <div className="glass-panel glass-highlight p-6 animate-fade-in-up" style={{ animationDelay: '250ms' }}>
              <label className="flex items-center gap-2 text-sm font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
                <FolderOpen className="w-4 h-4" style={{ color: 'var(--text-faint)' }} />
                分类
              </label>
              <select
                required
                className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 appearance-none"
                style={{ background: 'var(--surface-subtle)', border: '1px solid var(--divider)', color: 'var(--text-primary)' }}
              >
                <option value="">选择分类</option>
                <option value="dev-tools">开发工具</option>
                <option value="ai-ml">AI & ML</option>
                <option value="productivity">效率工具</option>
                <option value="search">搜索与数据</option>
                <option value="communication">沟通协作</option>
                <option value="security">安全防护</option>
                <option value="automation">自动化</option>
                <option value="media">媒体与文件</option>
              </select>
            </div>

            {/* Tags */}
            <div className="glass-panel glass-highlight p-6 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <label className="flex items-center gap-2 text-sm font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
                <Tag className="w-4 h-4" style={{ color: 'var(--text-faint)' }} />
                标签
              </label>
              <input
                type="text"
                placeholder="search, api, web（逗号分隔）"
                className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200"
                style={{ background: 'var(--surface-subtle)', border: '1px solid var(--divider)', color: 'var(--text-primary)' }}
              />
              <p className="text-xs mt-2.5" style={{ color: 'var(--text-faint)' }}>
                最多添加 5 个标签，帮助用户发现您的 Skill。
              </p>
            </div>

            {/* Submit */}
            <div className="flex items-center gap-4 pt-4 animate-fade-in-up" style={{ animationDelay: '350ms' }}>
              <Button
                type="submit"
                className="text-white border-0 rounded-xl px-8 py-5 text-sm font-medium hover:scale-[1.01] transition-all duration-300"
                style={{ background: 'linear-gradient(135deg, #d97757, #c86a45)', boxShadow: '0 4px 14px rgba(217,119,87,0.25)' }}
              >
                <UploadIcon className="w-4 h-4 mr-2" />
                提交审核
              </Button>
              <p className="text-xs" style={{ color: 'var(--text-faint)' }}>
                Skills 将在 24 小时内完成审核。
              </p>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
