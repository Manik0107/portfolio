import { useRef } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ResumeSection from '@/components/sections/ResumeSection';
import ContactSection from '@/components/sections/ContactSection';

const Index = () => {
  const projectsRef = useRef<HTMLDivElement>(null);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background neural-grid">
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
