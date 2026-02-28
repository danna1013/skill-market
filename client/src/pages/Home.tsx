/*
 * Design: Apple-style dual theme
 * Home page: Hero + Stats + Featured + Popular Grid + OpenClaw Resources + CTA + Footer
 */

import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import FeaturedSkills from '@/components/FeaturedSkills';
import Footer from '@/components/Footer';
import SkillCard from '@/components/SkillCard';
import { skills, sortSkills } from '@/lib/skillsData';
import { Link } from 'wouter';
import { ArrowRight, Bot, BookOpen, Gift, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const popularSkills = sortSkills(skills, 'downloads').slice(0, 6);

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <HeroSection />
        <StatsSection />
        <FeaturedSkills />

        {/* Popular Skills Grid */}
        <section className="py-20 relative">
          <div className="container">
            <div className="flex items-end justify-between mb-10 animate-fade-in-up">
              <div>
                <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-[-0.02em]" style={{ color: 'var(--text-primary)' }}>
                  热门 Skills
                </h2>
                <p className="mt-2 text-base" style={{ color: 'var(--text-muted)' }}>
                  本月下载量最高的 Skills。
                </p>
              </div>
              <Link
                href="/skills"
                className="hidden sm:flex items-center gap-1.5 text-sm font-medium transition-colors"
                style={{ color: '#d97757' }}
              >
                查看全部
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {popularSkills.map((skill, i) => (
                <div key={skill.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
                  <SkillCard skill={skill} index={i} />
                </div>
              ))}
            </div>

            <div className="sm:hidden mt-6 text-center">
              <Link href="/skills" className="text-sm font-medium inline-flex items-center gap-1" style={{ color: '#d97757' }}>
                查看全部 Skills <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* OpenClaw & Resources Banner */}
        <section className="py-12 relative">
          <div className="container">
            <div className="glass-panel glass-highlight p-8 sm:p-10 animate-fade-in-up">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #d97757, #788c5d)', boxShadow: '0 4px 12px rgba(217,119,87,0.2)' }}>
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>
                    OpenClaw
                  </h3>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    你的 AI 开发助手
                  </p>
                </div>
              </div>
              <p className="text-sm mb-6 max-w-2xl" style={{ color: 'var(--text-muted)' }}>
                遇到问题？咨询 OpenClaw AI 助手。探索教程、参与活动、赢取大奖。
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <a
                  href="https://s.ddnsip.cn/openclaw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3.5 rounded-xl transition-all duration-200 hover:bg-[var(--surface-hover)] hover:scale-[1.01] group"
                  style={{ border: '1px solid var(--divider)' }}
                >
                  <Bot className="w-4 h-4 shrink-0" style={{ color: '#788c5d' }} />
                  <div>
                    <div className="text-sm font-medium transition-colors" style={{ color: 'var(--text-primary)' }}>OpenClaw AI 助手</div>
                    <div className="text-xs" style={{ color: 'var(--text-faint)' }}>遇到问题？问 AI</div>
                  </div>
                </a>
                <a
                  href="https://cloud.tencent.com/developer/article/2624973"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3.5 rounded-xl transition-all duration-200 hover:bg-[var(--surface-hover)] hover:scale-[1.01] group"
                  style={{ border: '1px solid var(--divider)' }}
                >
                  <BookOpen className="w-4 h-4 shrink-0" style={{ color: '#6a9bcc' }} />
                  <div>
                    <div className="text-sm font-medium transition-colors" style={{ color: 'var(--text-primary)' }}>教程合集</div>
                    <div className="text-xs" style={{ color: 'var(--text-faint)' }}>完整开发指南</div>
                  </div>
                </a>
                <a
                  href="https://mc.tencent.com/HZjnvIK8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3.5 rounded-xl transition-all duration-200 hover:bg-[var(--surface-hover)] hover:scale-[1.01] group"
                  style={{ border: '1px solid var(--divider)' }}
                >
                  <Gift className="w-4 h-4 shrink-0" style={{ color: '#d97757' }} />
                  <div>
                    <div className="text-sm font-medium transition-colors" style={{ color: 'var(--text-primary)' }}>最新活动速递</div>
                    <div className="text-xs" style={{ color: 'var(--text-faint)' }}>优惠与福利</div>
                  </div>
                </a>
                <a
                  href="https://mc.tencent.com/qxkewwOs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3.5 rounded-xl transition-all duration-200 hover:bg-[var(--surface-hover)] hover:scale-[1.01] group"
                  style={{ border: '1px solid var(--divider)' }}
                >
                  <Sparkles className="w-4 h-4 shrink-0" style={{ color: '#b0aea5' }} />
                  <div>
                    <div className="text-sm font-medium transition-colors" style={{ color: 'var(--text-primary)' }}>创意征文赛</div>
                    <div className="text-xs" style={{ color: 'var(--text-faint)' }}>参赛赢大奖</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[120px]" style={{ background: 'rgba(217,119,87,0.04)' }} />
            <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full blur-[80px]" style={{ background: 'rgba(106,155,204,0.03)' }} />
          </div>

          <div className="container relative z-10 text-center">
            <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-[-0.02em] mb-5 animate-fade-in-up" style={{ color: 'var(--text-primary)' }}>
              为 AI 构建技能层
            </h2>
            <p className="text-lg max-w-xl mx-auto mb-10 animate-fade-in-up" style={{ color: 'var(--text-muted)', animationDelay: '100ms' }}>
              开源、可组合、版本化。今天就发布您的 Skill，让智能体完成剩下的工作。
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <Link href="/upload">
                <Button className="text-white border-0 rounded-xl px-8 py-5 text-sm font-medium hover:scale-[1.02] transition-all duration-300" style={{ background: 'linear-gradient(135deg, #d97757, #c86a45)', boxShadow: '0 4px 14px rgba(217,119,87,0.25)' }}>
                  发布 Skill
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/skills">
                <Button
                  variant="outline"
                  className="bg-transparent rounded-xl px-8 py-5 text-sm transition-all duration-300"
                  style={{ borderColor: 'var(--divider)', color: 'var(--text-secondary)' }}
                >
                  浏览 Skills
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
