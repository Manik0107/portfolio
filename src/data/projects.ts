export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  features: string[];
  problemStatement: string;
  architecture: string;
  githubUrl: string;
  imageUrl?: string;
  metrics?: string[];
}

export const projects: Project[] = [
  {
    id: '4',
    slug: 'ink',
    title: '.ink',
    description: 'Productivity and note-taking system that synthesizes knowledge into handwritten notes.',
    longDescription: 'A personal knowledge management system that converts typed documents and videos into realistic handwritten notebooks. It features intelligent layout analysis and semantic linking to synthesize insights from your knowledge base.',
    techStack: ['React', 'TypeScript', 'Supabase', 'pgvector', 'TipTap', 'Agno', 'Mermaid.js'],
    features: [
      'Intelligent Content Analysis',
      'Systemic Diagram Generation',
      'Floating Layout Engine',
      'Realistic Handwriting Synthesis',
      'Cross-note insight synthesis',
    ],
    problemStatement: 'Digital note-taking often lacks the cognitive benefits of handwriting, while physical notes lack the searchability and connectivity of digital tools.',
    architecture: 'Uses a multi-agent system (Agno) for content analysis and diagram generation. A custom floating layout engine arranges content into page-sized segments, which are then rendered with realistic handwriting synthesis.',
    githubUrl: 'https://github.com/Manik0107/.ink',
  },
  {
    id: '2',
    slug: 'git2doc',
    title: 'Git2Doc',
    description: 'Developer tool for automated documentation generation and architecture visualization.',
    longDescription: 'An automated documentation generator that analyzes codebases to create comprehensive technical documentation. It parses source code to understand structure and relationships, generating workflow diagrams and professional PDFs.',
    techStack: ['TypeScript', 'Node.js', 'GithubTools', 'Markdown', 'Agentic AI'],
    features: [
      'Intelligent Repository Analysis',
      'Automatic Workflow Diagram Generation',
      'Comprehensive Documentation',
      'Professional PDF Output',
      'Multi-language support',
    ],
    problemStatement: 'Keeping documentation in sync with rapidly evolving codebases is a manual, error-prone process that often leads to outdated or missing information.',
    architecture: 'Scans repositories using GithubTools, analyzes code structure with Tree-sitter, and generates documentation and diagrams through an automated pipeline that produces publication-ready PDFs.',
    githubUrl: 'https://github.com/Manik0107/Git2Doc',
  },
  {
    id: '1',
    slug: 'agentic-market-intelligence',
    title: 'Agentic Market Intelligence',
    description: 'Autonomous, production-grade system for proactive market intelligence.',
    longDescription: 'An autonomous system that moves beyond passive dashboards to verify, reason, and predict outcomes in real time. It addresses the challenge of overwhelming data by providing actionable proactive intelligence.',
    techStack: ['Python', 'LangChain', 'PostgreSQL', 'Redis', 'FastAPI', 'Docker'],
    features: [
      'Multi-agent orchestration with specialized roles',
      'Real-time web scraping and data aggregation',
      'Semantic search across collected intelligence',
      'Automated report generation with citations',
      'Slack/Discord integration for alerts',
    ],
    problemStatement: 'Enterprises face overwhelming, fast-moving market data, while dashboards and SaaS intelligence tools remain passive, slow, and human-dependent. They report past events but fail to verify, reason, or predict outcomes in real time.',
    architecture: 'The system uses a supervisor agent pattern with specialized worker agents for data collection, analysis, and synthesis. A central knowledge graph stores relationships between entities, while vector embeddings enable semantic retrieval.',
    githubUrl: 'https://github.com/Manik0107/Agentic_Market_Intelligence',
  },
  {
    id: '3',
    slug: 'vata',
    title: 'VATA',
    description: 'Education-based automation tool that generates Explanatory animations from documents.',
    longDescription: 'An intelligent system specialized for education that automatically extracts content from PDFs and generates professional animated explanations. It orchestrates code generation and validation to create visual teaching materials.',
    techStack: ['Python', 'DSPy', 'Manim', 'Agno', 'FastAPI'],
    features: [
      'Document-Grounded Learning',
      'Automated Storyboarding',
      'Voiceover Narration',
      'Runtime Validation',
      'Error Prevention System',
    ],
    problemStatement: 'Creating high-quality educational animations is time-consuming and requires specialized coding skills. Converting textbook content into engaging visual explanations is a manual bottleneck.',
    architecture: 'A pipeline architecture including extracting content from PDFs, generating educational storyboards, producing voiceovers, and generating Manim code with a multi-layer validation system.',
    githubUrl: 'https://github.com/Manik0107/VATA',
  },
  {
    id: '5',
    slug: 'hierai',
    title: 'HierAI',
    description: 'HR recruitment automation system for candidate screening and interviews.',
    longDescription: 'A full-stack, automated recruitment system that handles the hiring process from resume screening to final interviews. It employs hierarchical agents to manage different stages of recruitment autonomously.',
    techStack: ['Python', 'FastAPI', 'React', 'Agno', 'Groq', 'Llama 3', 'Qdrant', 'Whisper'],
    features: [
      'AI Resume Screening',
      'OTP-secured rounds',
      'Interactive Skill Assessments',
      'Real-time Speech-to-Speech Interview',
      'Hierarchical agent delegation',
    ],
    problemStatement: 'The recruitment process is often manual, repetitive, and subject to bias. Scaling hiring while maintaining candidate quality and experience is difficult.',
    architecture: 'Uses a tree-structured agent hierarchy where parent agents delegate tasks. The backend manages the recruitment workflow, integrating vector search for candidates and real-time audio processing for interviews.',
    githubUrl: 'https://github.com/Manik0107/HierAI',
  },
];
