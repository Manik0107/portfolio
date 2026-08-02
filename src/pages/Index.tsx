import { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSeo } from '@/hooks/use-seo';
import { SITE_URL, HOME_DESCRIPTION, personJsonLd, webSiteJsonLd } from '@/lib/seo';
import Navbar from '@/components/Navbar';
import AnimatedBackground from '@/components/AnimatedBackground';
import SectionReveal from '@/components/SectionReveal';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ResumeSection from '@/components/sections/ResumeSection';

const Index = () => {
  const location = useLocation();

  useSeo({
    title: 'Manik Manavenddra | AI Developer Portfolio',
    description: HOME_DESCRIPTION,
    canonical: `${SITE_URL}/`,
    image: `${SITE_URL}/Manik.jpeg`,
    jsonLd: [personJsonLd(), webSiteJsonLd()],
  });

  useEffect(() => {
    if (location.state?.target === 'projects') {
      const projectsElement = document.getElementById('projects');
      if (projectsElement) {
        setTimeout(() => {
          projectsElement.scrollIntoView({ behavior: 'instant', block: 'start' });
          window.history.replaceState({}, document.title);
        }, 0);
      }
    } else {
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
    <div className="min-h-screen">
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

        <footer className="mt-32 border-t border-border/50 pt-8 pb-12">
          <div className="section-container text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Manik Manavenddra. Built with precision.</p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
