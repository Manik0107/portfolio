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
    id: '1',
    slug: 'agentic-market-intelligence',
    title: 'Agentic Market Intelligence',
    description: 'Autonomous multi-agent system for real-time market analysis and competitive intelligence.',
    longDescription: 'A production-grade AI system that deploys autonomous agents to continuously monitor, analyze, and synthesize market intelligence from diverse data sources. Features multi-agent orchestration, real-time data pipelines, and actionable insight generation.',
    techStack: ['Python', 'LangChain', 'GPT-4', 'PostgreSQL', 'Redis', 'FastAPI', 'Docker'],
    features: [
      'Multi-agent orchestration with specialized roles',
      'Real-time web scraping and data aggregation',
      'Semantic search across collected intelligence',
      'Automated report generation with citations',
      'Slack/Discord integration for alerts',
    ],
    problemStatement: 'Traditional market research is slow, expensive, and often outdated by the time it reaches decision-makers. Manual monitoring of competitors, trends, and market shifts cannot scale.',
    architecture: 'The system uses a supervisor agent pattern with specialized worker agents for data collection, analysis, and synthesis. A central knowledge graph stores relationships between entities, while vector embeddings enable semantic retrieval.',
    githubUrl: 'https://github.com',
  },
  {
    id: '2',
    slug: 'git2doc',
    title: 'Git2Doc',
    description: 'Automated documentation generator that transforms codebases into comprehensive technical docs.',
    longDescription: 'An intelligent tool that analyzes entire code repositories and generates well-structured documentation including architecture overviews, API references, and usage guides using LLM understanding.',
    techStack: ['TypeScript', 'Node.js', 'OpenAI', 'Tree-sitter', 'Markdown', 'CLI'],
    features: [
      'Full repository parsing and AST analysis',
      'Intelligent code structure understanding',
      'Customizable documentation templates',
      'Multi-language support',
      'CI/CD integration ready',
    ],
    problemStatement: 'Developers spend countless hours writing and maintaining documentation. Code changes frequently outpace documentation updates, leading to outdated and unreliable docs.',
    architecture: 'Uses Tree-sitter for robust multi-language parsing, builds an intermediate representation of the codebase, then leverages LLMs to generate human-readable documentation with context awareness.',
    githubUrl: 'https://github.com',
  },
  {
    id: '3',
    slug: 'vata',
    title: 'VATA',
    description: 'Voice-Activated Task Automation system with natural language command processing.',
    longDescription: 'A comprehensive voice-first automation platform that understands complex natural language commands and executes multi-step workflows across integrated services and local applications.',
    techStack: ['Python', 'Whisper', 'LangChain', 'FastAPI', 'WebSocket', 'React'],
    features: [
      'Real-time voice transcription with Whisper',
      'Intent classification and entity extraction',
      'Multi-step workflow execution',
      'Plugin architecture for extensibility',
      'Local and cloud execution modes',
    ],
    problemStatement: 'Current voice assistants are limited to simple commands and predefined actions. Complex task automation still requires manual scripting or GUI interaction.',
    architecture: 'Pipeline architecture with streaming audio processing, real-time transcription, LLM-based intent parsing, and a modular action executor that interfaces with external services via adapters.',
    githubUrl: 'https://github.com',
  },
  {
    id: '4',
    slug: 'ink',
    title: '.ink',
    description: 'Intelligent note-taking system with semantic linking and AI-powered knowledge synthesis.',
    longDescription: 'A next-generation note-taking application that automatically discovers relationships between notes, suggests connections, and synthesizes insights from your personal knowledge base.',
    techStack: ['React', 'TypeScript', 'Supabase', 'OpenAI', 'pgvector', 'TipTap'],
    features: [
      'Automatic semantic linking between notes',
      'AI-powered Q&A over your notes',
      'Knowledge graph visualization',
      'Smart tagging and categorization',
      'Cross-note insight synthesis',
    ],
    problemStatement: 'Traditional note-taking creates isolated information silos. Valuable connections between ideas remain hidden, and retrieval depends on remembering exact keywords.',
    architecture: 'Notes are embedded into a vector space using OpenAI embeddings stored in pgvector. A background process continuously analyzes for potential links, while the LLM layer enables conversational retrieval.',
    githubUrl: 'https://github.com',
  },
  {
    id: '5',
    slug: 'hierai',
    title: 'HierAI',
    description: 'Hierarchical AI agent framework for complex task decomposition and execution.',
    longDescription: 'A framework for building hierarchical multi-agent systems where complex goals are automatically decomposed into subtasks, delegated to specialized agents, and results are synthesized back up the chain.',
    techStack: ['Python', 'LangGraph', 'GPT-4', 'Redis', 'Celery', 'FastAPI'],
    features: [
      'Automatic task decomposition',
      'Hierarchical agent delegation',
      'Result aggregation and synthesis',
      'Failure recovery and retry logic',
      'Observability and tracing built-in',
    ],
    problemStatement: 'Single-agent LLM systems struggle with complex, multi-faceted tasks. Manual orchestration of multiple agents is error-prone and hard to scale.',
    architecture: 'Tree-structured agent hierarchy where parent agents decompose tasks and delegate to children. Uses a message-passing protocol with Redis for coordination and Celery for distributed execution.',
    githubUrl: 'https://github.com',
  },
];
