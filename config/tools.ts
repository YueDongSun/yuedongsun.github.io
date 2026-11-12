export type Tool_accent = 'peach' | 'lavender' | 'mint';

export interface Tool_capability {
  title: string;
  description: string;
}

export interface Tool_product {
  id: string;
  name: string;
  category: string;
  layer: string;
  status: string;
  accent: Tool_accent;
  short_code: string;
  description: string;
  tags: string[];
  headline: string;
  detail: string;
  audience: string;
  capabilities: Tool_capability[];
  caveat: string;
  repository_url: string | null;
}

export interface Tool_question {
  question: string;
  answer: string;
}

export interface Tool_principle {
  number: string;
  title: string;
  description: string;
}

export const tools_catalog: Tool_product[] = [
  {
    id: 'tailnet_mesh',
    name: 'tailnet-mesh',
    category: 'CONNECT YOUR MACHINES',
    layer: 'INFRASTRUCTURE',
    status: 'Self-hosted',
    accent: 'peach',
    short_code: 'NET',
    description:
      'Turn your Tailscale-connected machines into a coordinated workspace for computing, collaboration, and shared services.',
    tags: ['Mesh networking', 'Distributed compute', 'Operations console'],
    headline: 'Your machines, working together.',
    detail:
      'A unified Python toolkit for the machines on your tailnet. Manage nodes from a terminal or web console, distribute compute tasks, and bring shared services into one operational view.',
    audience: 'For developers and researchers managing their own multi-machine environment.',
    capabilities: [
      {
        title: 'See the whole fleet',
        description:
          'A unified terminal and web operations console for nodes, jobs, runtimes, storage, and network services.',
      },
      {
        title: 'Put spare compute to work',
        description:
          'SSH-based task distribution across Windows, Linux, and macOS, with resource-aware placement.',
      },
      {
        title: 'Share services on your terms',
        description:
          'Self-hosted Git, file sharing, collaboration, and reviewed operational workflows over Tailscale.',
      },
    ],
    caveat:
      'Self-hosted on your own Tailscale network. Setup and platform checks are described in the project documentation.',
    repository_url: null,
  },
  {
    id: 'cc',
    name: 'AI Agent Gateway',
    category: 'CONNECT YOUR AI TOOLS',
    layer: 'INTELLIGENCE',
    status: 'Desktop preview',
    accent: 'lavender',
    short_code: 'ROUTE',
    description:
      'A local AI gateway and configuration manager. Bring coding tools and model providers together with explicit routing and fallback.',
    tags: ['AI Agent Gateway', 'Provider routing', 'Local configuration'],
    headline: 'One local gateway. More choice.',
    detail:
      'Also called AI Agent Gateway (AAG), cc helps you manage providers, connect AI coding tools, and configure ordered fallback routes through a local gateway.',
    audience: 'For developers working with multiple coding tools and model providers.',
    capabilities: [
      {
        title: 'Connect compatible tools',
        description:
          'OpenAI- and Anthropic-compatible endpoints, with Responses API support in the desktop Rust proxy.',
      },
      {
        title: 'Keep routing explicit',
        description:
          'Ordered provider fallback for retriable failures, with per-provider circuit breakers.',
      },
      {
        title: 'Manage configuration locally',
        description:
          'A desktop interface for providers, routes, integrations, backups, and configuration; a headless Node gateway can run independently.',
      },
    ],
    caveat:
      'Desktop v0.2.0 preview, with an independently runnable Node gateway. See the public repository for setup and release notes.',
    repository_url: 'https://github.com/YueDongSun/ai-agent-gateway',
  },
  {
    id: 'vibemux',
    name: 'vibemux',
    category: 'COORDINATE YOUR WORK',
    layer: 'WORKSPACE',
    status: 'Pre-alpha',
    accent: 'mint',
    short_code: 'TERM',
    description:
      'A Windows-first environment being built for coding-agent workflows, isolated Git worktrees, and an auditable record of what happened.',
    tags: ['Agent workflows', 'Git worktrees', 'Local-first'],
    headline: 'Give agent work a place to live.',
    detail:
      'VibeMux is a developing, local-first coordination environment. It explores how worktrees, a Rust daemon, and explicit review can make coding-agent workflows easier to inspect.',
    audience: 'For developers exploring local, inspectable agent coordination.',
    capabilities: [
      {
        title: 'Separate changes by worktree',
        description:
          'A separate Git worktree for each run, with reviewable diffs and deliberate cleanup.',
      },
      {
        title: 'Keep a durable record',
        description:
          'A local Rust daemon with authenticated control, lifecycle inspection, state, events, and explicit recovery.',
      },
      {
        title: 'Build review into the loop',
        description:
          'Bounded local planner, worker, and reviewer workflows, with independent review and local verification required for completion.',
      },
    ],
    caveat:
      'Pre-alpha. Native multi-harness integration is the next development focus; local workflows and the Rust daemon form the current foundation.',
    repository_url: 'https://github.com/YueDongSun/vibemux',
  },
];

export const tool_principles: Tool_principle[] = [
  {
    number: '01',
    title: 'Independent by design',
    description: 'Each project keeps its own purpose, setup, and development path.',
  },
  {
    number: '02',
    title: 'Control stays explicit',
    description: 'Providers, machines, credentials, and execution need deliberate configuration.',
  },
  {
    number: '03',
    title: 'Progress you can inspect',
    description: 'Readable source, reproducible checks, and a clear account of the current development stage.',
  },
];

export const tool_questions: Tool_question[] = [
  {
    question: 'How do the projects fit together?',
    answer:
      'Tailnet Mesh coordinates machines, AI Agent Gateway routes model requests, and VibeMux organises coding work. Each project has its own setup and can be explored independently.',
  },
  {
    question: 'What is ready to use today?',
    answer:
      'AI Agent Gateway provides a desktop preview and a standalone Node gateway. VibeMux is in pre-alpha. Tailnet Mesh is a self-hosted toolkit for a configured Tailscale network. The repository pages contain current setup instructions.',
  },
  {
    question: 'Where do model requests run?',
    answer:
      'Routing is configured locally. Requests go to the model providers and endpoints you choose, while Tailnet Mesh coordinates the machines on your own network.',
  },
  {
    question: 'Where can I get started?',
    answer:
      'Open the public GitHub repositories for installation instructions, source code, and development notes. For Tailnet Mesh, contact me to discuss the project and its deployment model.',
  },
];
