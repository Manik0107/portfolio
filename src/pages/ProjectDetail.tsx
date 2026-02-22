import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Github, ExternalLink, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { projects } from '@/data/projects';
import AnimatedBackground from '@/components/AnimatedBackground';

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
          <Button asChild>
            <Link to="/" state={{ target: 'projects' }}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="section-container">
          <div className="flex items-center justify-between h-16">
            <Link
              to="/"
              state={{ target: 'projects', previousProject: project.slug }}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to Projects</span>
            </Link>
            <Button size="sm" asChild>
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                View Code
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="relative pt-28">
        <div className="section-container relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12 animate-fade-in-up">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-gradient-primary">{project.title}</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {project.longDescription}
              </p>
            </div>

            <div className="mb-12 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <h2 className="text-sm font-semibold text-accent uppercase tracking-wider mb-4">
                Tech Stack
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-secondary/50 border border-border/50 rounded-lg text-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="glass-card p-8 mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gold" />
                Problem Statement
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {project.problemStatement}
              </p>
            </div>

            <div className="glass-card p-8 mb-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Architecture Overview
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {project.architecture}
              </p>
            </div>

            <div className="glass-card p-8 mb-12 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                Core Features
              </h2>
              <ul className="space-y-4">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground glow-primary"
                asChild
              >
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-5 w-5" />
                  View on GitHub
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border/50 bg-background/50"
                asChild
              >
                <Link to="/#projects">
                  <ExternalLink className="mr-2 h-5 w-5" />
                  View All Projects
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <footer className="border-t border-border/50 py-8">
        <div className="section-container text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} AI Developer. Built with precision.</p>
        </div>
      </footer>
    </div>
  );
}
