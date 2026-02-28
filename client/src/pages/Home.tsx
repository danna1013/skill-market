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
                  Popular Skills
                </h2>
                <p className="mt-2 text-base" style={{ color: 'var(--text-muted)' }}>
                  Most downloaded skills this month.
                </p>
              </div>
              <Link
                href="/skills"
                className="hidden sm:flex items-center gap-1.5 text-sm text-[#007AFF] hover:text-[#0071E3] transition-colors font-medium"
              >
                View all
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
              <Link href="/skills" className="text-sm text-[#007AFF] font-medium inline-flex items-center gap-1">
                View all skills <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* OpenClaw & Resources Banner */}
        <section className="py-12 relative">
          <div className="container">
            <div className="glass-panel glass-highlight p-8 sm:p-10 animate-fade-in-up">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#007AFF] to-[#30D158] flex items-center justify-center shadow-lg shadow-[#007AFF]/15">
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
                  <Bot className="w-4 h-4 text-[#30D158] shrink-0" />
                  <div>
                    <div className="text-sm font-medium group-hover:text-[#30D158] transition-colors" style={{ color: 'var(--text-primary)' }}>OpenClaw AI 助手</div>
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
                  <BookOpen className="w-4 h-4 text-[#007AFF] shrink-0" />
                  <div>
                    <div className="text-sm font-medium group-hover:text-[#007AFF] transition-colors" style={{ color: 'var(--text-primary)' }}>教程合集</div>
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
                  <Gift className="w-4 h-4 text-[#FF9500] shrink-0" />
                  <div>
                    <div className="text-sm font-medium group-hover:text-[#FF9500] transition-colors" style={{ color: 'var(--text-primary)' }}>最新活动速递</div>
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
                  <Sparkles className="w-4 h-4 text-[#AF52DE] shrink-0" />
                  <div>
                    <div className="text-sm font-medium group-hover:text-[#AF52DE] transition-colors" style={{ color: 'var(--text-primary)' }}>创意征文赛</div>
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
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#007AFF]/[0.04] blur-[120px]" />
            <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-[#AF52DE]/[0.03] blur-[80px]" />
          </div>

          <div className="container relative z-10 text-center">
            <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-[-0.02em] mb-5 animate-fade-in-up" style={{ color: 'var(--text-primary)' }}>
              Build the skill layer for AI
            </h2>
            <p className="text-lg max-w-xl mx-auto mb-10 animate-fade-in-up" style={{ color: 'var(--text-muted)', animationDelay: '100ms' }}>
              Open source, composable, versioned. Ship your skill today and let agents do the rest.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <Link href="/upload">
                <Button className="bg-gradient-to-r from-[#007AFF] to-[#5856D6] hover:from-[#0071E3] hover:to-[#4F46E5] text-white border-0 rounded-xl px-8 py-5 text-sm font-medium shadow-lg shadow-[#007AFF]/20 hover:shadow-[#007AFF]/35 hover:scale-[1.02] transition-all duration-300">
                  Publish a Skill
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/skills">
                <Button
                  variant="outline"
                  className="bg-transparent rounded-xl px-8 py-5 text-sm transition-all duration-300"
                  style={{ borderColor: 'var(--divider)', color: 'var(--text-secondary)' }}
                >
                  Browse Skills
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
