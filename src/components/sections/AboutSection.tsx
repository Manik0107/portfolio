import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TypingEffect = ({ text, startTyping }: { text: string[]; startTyping: boolean }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (startTyping && !hasStarted) {
      setHasStarted(true);
      setCurrentText('');
      setCurrentIndex(0);
      setTextIndex(0);
      setIsDeleting(false);
    }
  }, [startTyping]);

  useEffect(() => {
    if (!hasStarted) return;

    const typeSpeed = isDeleting ? 50 : 100;
    const pauseTime = 2000;

    const type = () => {
      const fullText = text[textIndex % text.length];

      if (isDeleting) {
        setCurrentText(fullText.substring(0, currentIndex - 1));
        setCurrentIndex(prev => prev - 1);
      } else {
        setCurrentText(fullText.substring(0, currentIndex + 1));
        setCurrentIndex(prev => prev + 1);
      }

      if (!isDeleting && currentIndex === fullText.length) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && currentIndex === 0) {
        setIsDeleting(false);
        setTextIndex(prev => prev + 1);
      }
    };

    const timer = setTimeout(type, typeSpeed);
    return () => clearTimeout(timer);
  }, [currentIndex, isDeleting, text, textIndex, hasStarted]);

  return (
    <h2 className="text-2xl md:text-4xl font-bold font-mono text-center">
      <span className="text-gradient-primary">{currentText}</span>
      <span className="animate-pulse text-primary">|</span>
    </h2>
  );
};

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        onEnter: () => setIsInView(true),
      });

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
          <motion.div
            className="profile-picture flex-shrink-0"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.div
              className="w-72 h-96 md:w-80 md:h-[28rem] rounded-2xl border-4 border-primary/30 bg-secondary/50 overflow-hidden group relative hover:border-primary/50 transition-all duration-300 shadow-2xl hover:shadow-primary/20"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              whileHover={{
                scale: 1.03,
                rotateY: 2,
              }}
            >
              <img src="/Manik.jpeg" alt="Manik - AI Developer" className="w-full h-full object-cover object-center" />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />

              <motion.div
                className="absolute inset-0 rounded-2xl"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(59, 130, 246, 0.3)',
                    '0 0 40px rgba(45, 212, 191, 0.3)',
                    '0 0 20px rgba(59, 130, 246, 0.3)',
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </motion.div>
          </motion.div>

          <div className="text-center lg:text-left flex-1">
            <div className="mb-6 h-[40px] flex items-center justify-center">
              <TypingEffect
                startTyping={isInView}
                text={[
                  "Hi, I'm Manik Manavenddra M",
                  "AI Engineer",
                  "Building Production-Ready AI Systems"
                ]}
              />
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I architect and build AI systems that work in the real world.
              From prototype to production, I focus on creating intelligent solutions
              that are reliable, scalable, and genuinely useful. My work spans
              autonomous agents, custom LLM applications, and end-to-end ML pipelines—always
              with a production mindset.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
