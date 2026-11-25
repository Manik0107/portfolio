import SectionHeading from '@/components/SectionHeading';

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="section-container">
        <SectionHeading
          title={
            <>
              From prototype to{' '}
              <span className="font-display font-normal">production.</span>
            </>
          }
        />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="space-y-6 text-lg leading-relaxed text-muted-foreground sm:text-xl">
              <p>
                I&apos;m an AI engineer focused on the distance between a working
                prototype and a dependable product. My work spans multi-agent
                architectures, retrieval pipelines, fine-tuned models and the
                deployment work that makes them usable.
              </p>
              <p>
                I work across generative and agentic AI, retrieval-augmented
                generation, custom LLMs and vision-language applications, with the
                MLOps needed to keep them observable and reliable.
              </p>
            </div>

            <blockquote className="mt-8 border-l-2 border-primary pl-5 text-lg font-medium leading-relaxed text-foreground">
              The measure of the work is simple: does it make someone&apos;s job
              easier, and does it keep working when it matters?
            </blockquote>

            <div className="mt-8">
              <h3 className="text-sm font-medium text-foreground">Focus areas</h3>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                Generative AI, agentic systems, retrieval-augmented generation,
                MLOps, multimodal models and model optimization.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <figure className="mx-auto max-w-sm">
              <div className="overflow-hidden rounded-2xl border border-white/10">
                <img
                  src="/Manik.jpeg"
                  alt="Manik Manavenddra, AI Engineer"
                  className="aspect-[4/5] w-full object-cover object-center"
                />
              </div>
              <figcaption className="mt-3 text-sm text-muted-foreground">
                Manik Manavenddra · India
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
