import { useSeo } from '@/hooks/use-seo';
import { SITE_URL } from '@/lib/seo';

export default function ResumePage() {
    useSeo({
        title: 'Resume | Manik Manavenddra',
        description: 'Resume of Manik Manavenddra - AI Developer specializing in production-grade AI systems, agentic workflows, and intelligent automation.',
        canonical: `${SITE_URL}/resume`,
        image: `${SITE_URL}/Manik.jpeg`,
    });

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <iframe
                src="/resume.pdf?v=1"
                className="flex-1 w-full border-none"
                style={{ height: '100vh' }}
                title="Resume"
            />
        </div>
    );
}
