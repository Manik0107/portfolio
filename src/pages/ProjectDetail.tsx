import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projects } from '@/data/projects';
import AnimatedBackground from '@/components/AnimatedBackground';
import DeferredScene from '@/components/DeferredScene';
import { useSeo } from '@/hooks/use-seo';
import {
  absoluteImage,
  breadcrumbJsonLd,
  pageUrl,
  softwareSourceCodeJsonLd,
} from '@/lib/seo';

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);

  useSeo({
    title: project
      ? `${project.title} | Manik Manavenddra`
      : 'Project Not Found | Manik Manavenddra',
    description: project
      ? project.longDescription
      : 'This project could not be found on Manik Manavenddra\'s portfolio.',
    canonical: pageUrl(project ? `/project/${project.slug}` : '/'),
    image: project?.imageUrl ? absoluteImage(project.imageUrl) : undefined,
    type: 'article',
    noindex: !project,
    jsonLd: project
      ? [softwareSourceCodeJsonLd(project), breadcrumbJsonLd(project.slug, project.title)]
      : [],
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  if (!project) {
    return (
      <div className="relative min-h-screen">
        <AnimatedBackground />
        <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">404</p>
            <h1 className="mt-3 text-3xl font-semibold">Project not found</h1>
            <Link
              to="/"
              state={{ target: 'projects' }}
              className="mt-6 inline-block rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
            >
              Back to projects
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      <DeferredScene />

      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-md">
        <div className="section-container flex h-16 items-center justify-between">
          <Link
            to="/"
            state={{ target: 'projects', previousProject: project.slug }}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Back to projects
          </Link>
          <div className="flex items-center gap-5 text-sm">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Code
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Live
              </a>
            )}
          </div>
        </div>
      </header>

      <main className="relative z-10 pb-24 pt-28 sm:pt-32">
        <div className="section-container">
          <div className="mx-auto max-w-5xl">
            <h1 className="text-[clamp(2.5rem,7vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.03em]">
              {project.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              {project.longDescription}
            </p>

            <p className="mt-6 font-mono text-xs leading-relaxed text-muted-foreground">
              {project.techStack.join(', ')}
            </p>

            <div
              className="relative mt-12 overflow-hidden rounded-2xl border border-white/10"
              style={{ background: project.imagePlaceholder || 'linear-gradient(135deg, #1a1a2e, #16213e)' }}
            >
              {project.imageUrl ? (
                <img
                  src={project.imageUrl}
                  alt={`${project.title} preview`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="grid aspect-[16/8] place-items-center">
                  <span className="font-display text-6xl text-white/10">{project.title}</span>
                </div>
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="panel p-6 sm:p-8">
                <h2 className="text-sm font-medium text-foreground">Problem</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {project.problemStatement}
                </p>
              </div>

              <div className="panel p-6 sm:p-8">
                <h2 className="text-sm font-medium text-foreground">Architecture</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {project.architecture}
                </p>
              </div>
            </div>

            <div className="panel mt-4 p-6 sm:p-8">
              <h2 className="text-sm font-medium text-foreground">Core features</h2>
              <ul className="mt-4 grid grid-cols-1 gap-3 pl-5 text-sm text-muted-foreground marker:text-primary sm:grid-cols-2 sm:text-base">
                {project.features.map((feature, index) => (
                  <li key={index} className="list-disc leading-relaxed">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {project.metrics && project.metrics.length > 0 && (
              <div className="panel mt-4 p-6 sm:p-8">
                <h2 className="text-sm font-medium text-foreground">Impact</h2>
                <ul className="mt-4 space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground marker:text-primary sm:text-base">
                  {project.metrics.map((metric, index) => (
                    <li key={index} className="list-disc">
                      {metric}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-lg bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 sm:w-auto"
                >
                  View on GitHub
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-lg border border-white/12 px-6 py-3.5 text-sm font-medium text-foreground transition-colors hover:border-white/25 sm:w-auto"
                >
                  View live
                </a>
              )}
              <Link
                to="/"
                state={{ target: 'projects' }}
                className="inline-flex w-full items-center justify-center rounded-lg border border-white/12 px-6 py-3.5 text-sm font-medium text-foreground transition-colors hover:border-white/25 sm:w-auto"
              >
                All projects
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="relative z-10 border-t border-white/10 py-8">
        <div className="section-container text-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Manik Manavenddra · Manik0107</p>
        </div>
      </footer>
    </div>
  );
}
