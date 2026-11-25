import SectionHeading from '@/components/SectionHeading';

const experiences = [
  {
    company: 'Ascentium',
    role: 'AI Developer',
    period: 'Jun 2026 — Present',
    current: true,
    description:
      'Building enterprise AI for document processing, classification and semantic analysis, from architecture through deployment.',
    highlights: ['Python', 'PyTorch', 'LangChain', 'LlamaIndex', 'OCR', 'Hugging Face', 'FastAPI', 'Docker', 'Azure'],
  },
  {
    company: 'PhobosQ',
    role: 'Agentic AI Intern, Call Analytics',
    period: 'Dec 2025 — Mar 2026',
    current: false,
    description:
      'Built real-time call analytics across 12+ Indic languages, combining stream processing, speech recognition and NLP.',
    highlights: ['VoIP', 'PBX', 'Speech to Text', 'Kafka', 'TensorFlow', 'PostgreSQL', 'FastAPI', 'Docker'],
  },
  {
    company: 'RD Technology',
    role: 'Machine Learning Intern',
    period: 'Dec 2024 — Jan 2025',
    current: false,
    description:
      'Trained and optimized classification and regression models, then shipped them as FastAPI services.',
    highlights: ['Python', 'TensorFlow', 'Keras', 'Scikit-learn', 'Pandas', 'NumPy', 'SQL', 'FastAPI', 'Git', 'Docker'],
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <div className="section-container">
        <SectionHeading
          title="Where I've worked."
          description="Production AI work across startup and enterprise teams."
        />

        <div className="border-t border-white/10">
          {experiences.map((exp) => (
            <div
              key={exp.company}
              className="group grid grid-cols-1 gap-4 border-b border-white/10 py-8 transition-colors duration-300 hover:bg-white/[0.015] md:grid-cols-12 md:gap-8 md:py-10"
            >
              <div className="md:col-span-3">
                <div className="font-mono text-xs text-muted-foreground">{exp.period}</div>
                {exp.current && <div className="mt-1 text-xs text-primary">Current</div>}
              </div>

              <div className="md:col-span-9">
                <h3 className="text-2xl font-semibold tracking-tight transition-colors duration-300 group-hover:text-primary sm:text-3xl">
                  {exp.company}
                </h3>
                <p className="mt-1 text-sm font-medium text-accent">{exp.role}</p>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {exp.description}
                </p>
                <p className="mt-4 font-mono text-[0.7rem] leading-relaxed text-muted-foreground">
                  {exp.highlights.join(', ')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
