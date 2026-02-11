import { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
  const location = useLocation();

  useEffect(() => {
    // Handle navigation state scrolling (e.g. Back from Project Detail)
    if (location.state?.target === 'projects') {
      const projectsElement = document.getElementById('projects');
      if (projectsElement) {
        // Instant jump to projects
        setTimeout(() => {
          projectsElement.scrollIntoView({ behavior: 'instant', block: 'start' });
          // Clear state so refresh goes to top
          window.history.replaceState({}, document.title);
        }, 0);
      }
    } else {
      // Normal load / Refresh -> Always Hero
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
    }
  }, [location]);

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
            <ProjectsSection initialProject={location.state?.previousProject} />
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
