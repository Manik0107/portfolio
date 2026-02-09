import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Brain, Workflow, Server } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  {
    icon: Brain,
    title: 'AI Systems',
    description: 'LLM integrations, RAG pipelines, and intelligent agents',
  },
  {
    icon: Workflow,
    title: 'Agentic Workflows',
    description: 'Multi-agent orchestration and autonomous task execution',
  },
  {
    icon: Server,
    title: 'Production Scale',
    description: 'Deployment-ready systems with monitoring and optimization',
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 30%',
          scrub: 1,
        },
        y: 60,
        opacity: 0,
      });

      gsap.from('.highlight-card', {
        scrollTrigger: {
          trigger: '.highlights-grid',
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-12 pb-4 relative"
    >
      <div className="section-container">
        <div ref={contentRef} className="flex flex-col lg:flex-row items-center gap-12 mb-16">
          {/* Profile Picture Placeholder */}
          <div className="profile-picture flex-shrink-0">
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full border-4 border-primary/30 bg-secondary/50 flex items-center justify-center overflow-hidden group relative">
              {/* Replace this with your actual image */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
              <span className="text-muted-foreground text-sm z-10">Your Photo</span>
              {/* When you have an image, use: */}
              {/* <img src="/your-photo.jpg" alt="Profile" className="w-full h-full object-cover" /> */}
            </div>
          </div>

          {/* About Text */}
          <div className="text-center lg:text-left flex-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="text-gradient-primary">About</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I architect and build AI systems that work in the real world. 
              From prototype to production, I focus on creating intelligent solutions 
              that are reliable, scalable, and genuinely useful. My work spans 
              autonomous agents, custom LLM applications, and end-to-end ML pipelines—always 
              with a production mindset.
            </p>
          </div>
        </div>

        {/* Highlights Grid */}
        <div className="highlights-grid grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlights.map((item, index) => (
            <div
              key={index}
              className="highlight-card glass-card p-8 text-center hover-lift"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary mb-6">
                <item.icon className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
