import { projects } from '@/data/projects';
import SectionHeading from '@/components/SectionHeading';
import ProjectCard from '@/components/ProjectCard';

interface ProjectsSectionProps {
  initialProject?: string;
}

export default function ProjectsSection({ initialProject }: ProjectsSectionProps) {
  const featured =
    projects.find((p) => p.slug === 'agentic-market-intelligence') ?? projects[0];
  const rest = projects.filter((p) => p.id !== featured.id);

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="section-container">
        <SectionHeading
          title={
            <>
              Systems I&apos;ve <span className="font-display font-normal">built.</span>
            </>
          }
          description="Selected projects across market intelligence, developer tooling, knowledge management and applied LLM systems."
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ProjectCard
            project={featured}
            featured
            highlight={initialProject === featured.slug}
          />
          {rest.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              highlight={initialProject === project.slug}
            />
          ))}
        </div>

        <a
          href="https://github.com/Manik0107"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 block text-center text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
        >
          More on GitHub
        </a>
      </div>
    </section>
  );
}
