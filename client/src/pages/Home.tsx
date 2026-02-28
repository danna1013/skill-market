/*
 * Design: Apple Vision Pro Spatial Glass
 * Home page: Hero → Stats → Featured Skills → Popular Skills Grid → CTA → Footer
 * Enhanced: Better section rhythm, refined CTA, scroll-triggered animations
 */

import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import FeaturedSkills from '@/components/FeaturedSkills';
import Footer from '@/components/Footer';
import SkillCard from '@/components/SkillCard';
import { skills, sortSkills } from '@/lib/skillsData';
import { ArrowRight, Zap } from 'lucide-react';
import { Link } from 'wouter';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const recentSkills = sortSkills(skills, 'downloads').slice(0, 6);
  const sectionRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    const el = sectionRef.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setCtaVisible(true); },
      { threshold: 0.2 }
    );
    const el = ctaRef.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <FeaturedSkills />

      {/* Popular Skills Grid */}
      <section className="py-20" ref={sectionRef}>
        <div className="container">
          {/* Section divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/8 to-transparent mb-16" />

          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-[-0.02em]">
                Popular Skills
              </h2>
              <p className="text-white/35 mt-2 text-base">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentSkills.map((skill, i) => (
              <div
                key={skill.id}
                className={visible ? 'animate-fade-in-up' : 'opacity-0'}
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <SkillCard skill={skill} />
              </div>
            ))}
          </div>

          {/* Mobile view all */}
          <div className="sm:hidden mt-6 text-center">
            <Link
              href="/skills"
              className="inline-flex items-center gap-1.5 text-sm text-[#007AFF] font-medium"
            >
              View all skills
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden" ref={ctaRef}>
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#007AFF]/4 blur-[140px]" />
          <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] rounded-full bg-[#AF52DE]/4 blur-[100px]" />
          <div className="absolute bottom-1/4 left-1/3 w-[250px] h-[250px] rounded-full bg-[#5856D6]/3 blur-[80px]" />
        </div>

        <div className="container relative z-10">
          <div
            className={`glass-panel glass-highlight max-w-3xl mx-auto p-10 sm:p-16 text-center relative overflow-hidden transition-all duration-700 ${
              ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Inner glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-[#007AFF]/30 to-transparent" />

            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#007AFF]/20 to-[#AF52DE]/20 flex items-center justify-center border border-white/10">
                <Zap className="w-5 h-5 text-[#007AFF]" />
              </div>
            </div>

            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-[-0.02em] mb-4">
              Build the skill ecosystem
            </h2>
            <p className="text-white/35 text-base sm:text-lg max-w-lg mx-auto mb-10 leading-relaxed">
              Share your skills with thousands of AI agents. Open source, versioned, and composable.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/skills"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#007AFF] to-[#5856D6] text-white text-sm font-medium shadow-lg shadow-[#007AFF]/20 hover:shadow-[#007AFF]/35 hover:scale-[1.02] transition-all duration-300"
              >
                Explore Skills
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/10 text-white/55 text-sm font-medium hover:bg-white/5 hover:text-white/75 hover:border-white/15 transition-all duration-200"
                onClick={(e) => {
                  e.preventDefault();
                  import('sonner').then(({ toast }) => toast('Documentation coming soon'));
                }}
              >
                Read the Docs
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
