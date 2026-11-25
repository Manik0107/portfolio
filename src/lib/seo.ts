import type { Project } from '@/data/projects';

export const SITE_URL = 'https://manik0107.me';
export const AUTHOR = 'Manik Manavenddra';
export const AUTHOR_EMAIL = 'manikmanavenddra@gmail.com';
export const GITHUB_URL = 'https://github.com/Manik0107';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/manik-manavenddra/';

export const HOME_DESCRIPTION =
  'Manik Manavenddra (Manik0107) is an AI engineer in India building production AI systems: autonomous agents, LLM applications, retrieval pipelines and intelligent automation.';

export const pageUrl = (path = '/') => new URL(path, SITE_URL).toString();

export const absoluteImage = (src: string) => (src.startsWith('http') ? src : `${SITE_URL}${src}`);

const SKILLS = [
  'Python', 'SQL', 'Rust', 'PyTorch', 'LangChain', 'LlamaIndex', 'Agno', 'FastAPI',
  'Transformers', 'Multimodal LLMs', 'Retrieval Augmented Generation', 'Qdrant', 'PGVector',
  'Redis', 'PostgreSQL', 'Docker', 'ONNX Runtime', 'GitHub Actions', 'MLOps', 'Agentic AI',
];

export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: AUTHOR,
    givenName: 'Manik',
    familyName: 'Manavenddra',
    additionalName: 'M',
    alternateName: ['Manik', 'Manik Manavenddra M', 'Manik0107', 'manik0107'],
    url: SITE_URL,
    mainEntityOfPage: SITE_URL,
    image: `${SITE_URL}/Manik.jpeg`,
    email: AUTHOR_EMAIL,
    jobTitle: 'AI Engineer',
    description: HOME_DESCRIPTION,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
    },
    knowsLanguage: [{ '@type': 'Language', name: 'English' }],
    knowsAbout: SKILLS,
    worksFor: [
      {
        '@type': 'Organization',
        name: 'Ascentium',
        jobTitle: 'AI Developer',
        startDate: '2026-06',
      },
      {
        '@type': 'Organization',
        name: 'PhobosQ',
        jobTitle: 'Agentic AI Intern (Call Analytics)',
        startDate: '2025-12',
        endDate: '2026-03',
      },
      {
        '@type': 'Organization',
        name: 'RD Technology',
        jobTitle: 'Machine Learning Intern',
        startDate: '2024-12',
        endDate: '2025-01',
      },
    ],
    sameAs: [GITHUB_URL, LINKEDIN_URL],
  };
}

export function profilePageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${SITE_URL}/#profile`,
    url: SITE_URL,
    name: 'Manik Manavenddra — AI Engineer',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    mainEntity: { '@id': `${SITE_URL}/#person` },
    about: { '@id': `${SITE_URL}/#person` },
  };
}

export function webSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: 'Manik Manavenddra — AI Engineer',
    alternateName: ['Manik Manavenddra Portfolio', 'Manik0107'],
    url: SITE_URL,
    author: { '@id': `${SITE_URL}/#person` },
    publisher: { '@id': `${SITE_URL}/#person` },
  };
}

export function softwareSourceCodeJsonLd(project: Project) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: project.title,
    description: project.longDescription,
    url: pageUrl(`/project/${project.slug}`),
    image: project.imageUrl ? absoluteImage(project.imageUrl) : undefined,
    codeRepository: project.githubUrl,
    programmingLanguage: project.techStack,
    keywords: project.techStack,
    author: { '@id': `${SITE_URL}/#person` },
  };
}

export function breadcrumbJsonLd(slug: string, title: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Projects', item: `${SITE_URL}/#projects` },
      { '@type': 'ListItem', position: 3, name: title, item: pageUrl(`/project/${slug}`) },
    ],
  };
}
