import { useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import AnimatedBackground from '@/components/AnimatedBackground';
import CodingBackground from '@/components/CodingBackground';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
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
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    // Double-ensure after a frame in case browser tries to restore
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
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
        <AboutSection />
        <div ref={projectsRef}>
          <ProjectsSection />
        </div>
        <SkillsSection />
        <ResumeSection />
        <ContactSection />
      </main>
    </div>
  );
};

export default Index;
