/*
 * Apple HIG Home — generous whitespace, clear hierarchy, confident tone
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

        {/* Popular Skills */}
        <section className="py-24 relative">
          <div className="container">
            <div className="flex items-end justify-between mb-12 animate-fade-in-up">
              <div>
                <h2 className="font-display font-bold text-[28px] sm:text-[36px] tracking-[-0.03em]" style={{ color: 'var(--text-primary)' }}>
                  Popular Skills
                </h2>
                <p className="mt-2 text-[15px]" style={{ color: 'var(--text-muted)' }}>
                  社区里大家都在用的技能。
                </p>
              </div>
              <Link
                href="/skills"
                className="hidden sm:flex items-center gap-1 text-[13px] font-medium transition-colors hover:opacity-70"
                style={{ color: 'var(--text-muted)' }}
              >
                全部
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {popularSkills.map((skill, i) => (
                <div key={skill.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
                  <SkillCard skill={skill} index={i} />
                </div>
              ))}
            </div>

            <div className="sm:hidden mt-8 text-center">
              <Link href="/skills" className="text-[13px] font-medium inline-flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
                查看全部 <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* OpenClaw & Resources */}
        <section className="py-12 relative">
          <div className="container">
            <div className="glass-panel glass-highlight p-8 sm:p-10 animate-fade-in-up">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#0071e3] to-[#30d158] flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-[17px]" style={{ color: 'var(--text-primary)' }}>
                    OpenClaw
                  </h3>
                  <p className="text-[12px]" style={{ color: 'var(--text-muted)' }}>
                    你的 AI 搭子
                  </p>
                </div>
              </div>
              <p className="text-[14px] mb-7 max-w-xl leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                不知道用什么技能？让 OpenClaw 帮你挑。也可以看看教程和社区动态。
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { href: 'https://s.ddnsip.cn/openclaw', icon: <Bot className="w-4 h-4 text-[#30d158]" />, title: 'OpenClaw AI', desc: '有问题，直接问', color: '#30d158' },
                  { href: 'https://cloud.tencent.com/developer/article/2624973', icon: <BookOpen className="w-4 h-4 text-[#0071e3]" />, title: '上手教程', desc: '五分钟快速入门', color: '#0071e3' },
                  { href: 'https://mc.tencent.com/HZjnvIK8', icon: <Gift className="w-4 h-4 text-[#ff9500]" />, title: '近期活动', desc: '福利和优惠', color: '#ff9500' },
                  { href: 'https://mc.tencent.com/qxkewwOs', icon: <Sparkles className="w-4 h-4 text-[#bf5af2]" />, title: '创意征文', desc: '写文章，赢奖品', color: '#bf5af2' },
                ].map(item => (
                  <a
                    key={item.title}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-2xl transition-all duration-200 hover:bg-[var(--surface-hover)] group"
                    style={{ border: '1px solid var(--divider)' }}
                  >
                    <span className="shrink-0">{item.icon}</span>
                    <div>
                      <div className="text-[13px] font-medium transition-colors" style={{ color: 'var(--text-primary)' }}>{item.title}</div>
                      <div className="text-[11px]" style={{ color: 'var(--text-faint)' }}>{item.desc}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-28 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#0071e3]/[0.03] blur-[150px]" />
          </div>

          <div className="container relative z-10 text-center">
            <h2 className="font-display font-bold text-[28px] sm:text-[44px] tracking-[-0.035em] mb-5 animate-fade-in-up" style={{ color: 'var(--text-primary)' }}>
              Build the skill layer for AI.
            </h2>
            <p className="text-[16px] sm:text-[17px] max-w-md mx-auto mb-12 animate-fade-in-up leading-relaxed" style={{ color: 'var(--text-muted)', animationDelay: '100ms' }}>
              开源、可组合、版本化。<br className="sm:hidden" />
              发布你的能力，让智能体替你完成剩下的事。
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <Link href="/upload">
                <Button
                  className="rounded-full px-8 py-5 text-[14px] font-medium shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                  style={{ background: 'var(--text-primary)', color: 'var(--background)' }}
                >
                  Publish a Skill
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </Link>
              <Link href="/skills">
                <Button
                  variant="outline"
                  className="bg-transparent rounded-full px-8 py-5 text-[14px] font-medium transition-all duration-300"
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
