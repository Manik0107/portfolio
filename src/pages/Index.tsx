import { useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import AnimatedBackground from '@/components/AnimatedBackground';
import CodingBackground from '@/components/CodingBackground';
import SectionReveal from '@/components/SectionReveal';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ResumeSection from '@/components/sections/ResumeSection';
import ContactSection from '@/components/sections/ContactSection';

const Index = () => {
  useEffect(() => {
    // Force scroll to top on mount to show Hero section
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    // Double-ensure after frames in case browser/GSAP tries to restore
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      requestAnimationFrame(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
      });
    });
  }, []);

  const projectsRef = useRef<HTMLDivElement>(null);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background neural-grid">
      {/* Coding animation background */}
      <CodingBackground />

      {/* Animated gradient background */}
      <AnimatedBackground />

      <Navbar />

      <main>
        <HeroSection onViewProjects={scrollToProjects} />
        <SectionReveal>
          <AboutSection />
        </SectionReveal>
        <SectionReveal>
          <ExperienceSection />
        </SectionReveal>
        <SectionReveal>
          <div ref={projectsRef}>
            <ProjectsSection />
          </div>
        </SectionReveal>
        <SectionReveal>
          <SkillsSection />
        </SectionReveal>
        <SectionReveal>
          <ResumeSection />
        </SectionReveal>
        <SectionReveal>
          <ContactSection />
        </SectionReveal>
      </main>
    </div>
  );
};

export default Index;
