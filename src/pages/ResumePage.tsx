import { useSeo } from '@/hooks/use-seo';
import { SITE_URL } from '@/lib/seo';

export default function ResumePage() {
    useSeo({
        title: 'Résumé | Manik Manavenddra — AI Engineer',
        description: 'Résumé of Manik Manavendra (Manik0107), an AI engineer building production AI systems, agentic workflows and LLM applications.',
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
