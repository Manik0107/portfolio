import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ResumeSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.resume-content', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const resumePath = '/resume.pdf';

  return (
    <section
      ref={sectionRef}
      id="resume"
      className="py-20 relative"
    >
      <div className="section-container">
        <div className="resume-content max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                M
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="text-gradient-primary">Resume</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Years Experience', value: '2' },
              { label: 'Projects Shipped', value: '5+' },
              { label: 'AI Systems Built', value: '15+' },
              { label: 'Languages', value: '6+' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="glass-card p-4 text-center"
              >
                <div className="text-2xl font-bold text-gradient-gold">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
