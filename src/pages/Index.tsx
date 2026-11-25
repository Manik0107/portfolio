import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSeo } from '@/hooks/use-seo';
import { SITE_URL, HOME_DESCRIPTION, personJsonLd, profilePageJsonLd, webSiteJsonLd } from '@/lib/seo';
import Navbar from '@/components/Navbar';
import AnimatedBackground from '@/components/AnimatedBackground';
import DeferredScene from '@/components/DeferredScene';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ResumeSection from '@/components/sections/ResumeSection';
import Footer from '@/components/Footer';

const Index = () => {
  const location = useLocation();

  useSeo({
    title: 'Manik Manavenddra — AI Engineer | Manik0107',
    description: HOME_DESCRIPTION,
    canonical: `${SITE_URL}/`,
    image: `${SITE_URL}/Manik.jpeg`,
    jsonLd: [personJsonLd(), profilePageJsonLd(), webSiteJsonLd()],
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

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      <DeferredScene />
      <Navbar />

      <main className="relative z-10">
        <HeroSection onViewProjects={scrollToProjects} />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection initialProject={location.state?.previousProject} />
        <SkillsSection />
        <ResumeSection />
        <Footer />
      </main>
    </div>
  );
};

export default Index;
