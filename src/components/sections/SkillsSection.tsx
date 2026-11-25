import SectionHeading from '@/components/SectionHeading';

const skillCategories = [
  {
    title: 'Languages',
    skills: ['Python', 'SQL', 'Rust'],
  },
  {
    title: 'Frameworks',
    skills: ['PyTorch', 'LangChain', 'Agno', 'FastAPI'],
  },
  {
    title: 'NLP & LLMs',
    skills: ['Transformers', 'Multimodal LLMs', 'Diffusion Models', 'TTS & STT', 'text2sql'],
  },
  {
    title: 'Databases & Vector Search',
    skills: ['Qdrant', 'PGVector', 'Redis', 'PostgreSQL'],
  },
  {
    title: 'Model Optimization',
    skills: ['Quantization', 'QLoRA', 'KV Caching', 'Distillation'],
  },
  {
    title: 'MLOps & Tools',
    skills: ['Docker', 'ONNX Runtime', 'CI/CD (GitHub Actions)'],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div className="section-container">
        <SectionHeading
          title={
            <>
              The stack behind the <span className="font-display font-normal">systems.</span>
            </>
          }
          description="The tools I use to take a model from experimentation to a reliable production service."
        />

        <div className="border-t border-white/10">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="grid grid-cols-1 gap-2 border-b border-white/10 py-6 sm:grid-cols-12 sm:gap-6"
            >
              <h3 className="text-sm font-medium text-muted-foreground sm:col-span-3">
                {category.title}
              </h3>
              <p className="text-base leading-relaxed text-foreground/90 sm:col-span-9">
                {category.skills.join(', ')}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          Currently exploring WebGPU, Rust, diffusion models and new agent frameworks.
        </p>
      </div>
    </section>
  );
}
