/*
 * Design: Apple Vision Pro Spatial Glass
 * Home page: Hero → Stats → Featured Skills → Recent Skills Grid → Footer
 */

import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import FeaturedSkills from '@/components/FeaturedSkills';
import Footer from '@/components/Footer';
import SkillCard from '@/components/SkillCard';
import { skills, sortSkills } from '@/lib/skillsData';
import { ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const recentSkills = sortSkills(skills, 'downloads').slice(0, 6);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    const el = sectionRef.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <FeaturedSkills />

      {/* Recent / Popular Skills Grid */}
      <section className="py-16" ref={sectionRef}>
        <div className="container">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
                Popular Skills
              </h2>
              <p className="text-white/40 mt-2 text-base">
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
                style={{ animationDelay: `${i * 60}ms` }}
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
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#007AFF]/5 blur-[120px]" />
          <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-[#AF52DE]/5 blur-[80px]" />
        </div>
        <div className="container relative z-10">
          <div className="glass-panel glass-highlight max-w-3xl mx-auto p-10 sm:p-14 text-center">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight mb-4">
              Build the skill ecosystem
            </h2>
            <p className="text-white/40 text-base sm:text-lg max-w-lg mx-auto mb-8 leading-relaxed">
              Share your skills with thousands of AI agents. Open source, versioned, and composable.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/skills"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#007AFF] to-[#5856D6] text-white text-sm font-medium shadow-lg shadow-[#007AFF]/20 hover:shadow-[#007AFF]/30 transition-all duration-300"
              >
                Explore Skills
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-white/60 text-sm font-medium hover:bg-white/5 hover:text-white/80 transition-all duration-200"
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
