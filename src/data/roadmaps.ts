export interface RoadmapSkill {
  name: string;
  resource: string;
}

export interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  skills: RoadmapSkill[];
  estHours: string;
}

export interface RoadmapLevel {
  id: string;
  label: string;
  subtitle: string;
  steps: RoadmapStep[];
}

export interface Role {
  id: string;
  name: string;
  tagline: string;
  icon: string;
  demand: string;
  avgSalary: string;
  roadmap: RoadmapLevel[];
}

export interface Domain {
  id: string;
  name: string;
  description: string;
  icon: string;
  accent: 'cyan' | 'emerald';
  roles: Role[];
}

export const DOMAINS: Domain[] = [
  {
    id: 'core-engineering',
    name: 'Core Engineering',
    description:
      'Hardware, embedded, and systems-level engineering roles spanning silicon to firmware.',
    icon: 'Cpu',
    accent: 'cyan',
    roles: [
      {
        id: 'full-stack-developer',
        name: 'Full Stack Developer',
        tagline: 'End-to-end web application engineering',
        icon: 'Layers',
        demand: 'Very High',
        avgSalary: '$135k',
        roadmap: [
          {
            id: 'foundational',
            label: 'Foundational',
            subtitle: 'Core web fundamentals',
            steps: [
              {
                id: 'fs-f1',
                title: 'HTML, CSS & JavaScript Essentials',
                description:
                  'Semantic markup, modern CSS (Flexbox/Grid), ES2020+ syntax, async patterns.',
                skills: [
                  { name: 'Semantic HTML & accessibility', resource: 'MDN Web Docs' },
                  { name: 'CSS Grid & Flexbox layout', resource: 'web.dev/learn/css' },
                  { name: 'ES modules & async/await', resource: 'javascript.info' },
                ],
                estHours: '40h',
              },
              {
                id: 'fs-f2',
                title: 'Git & Collaboration Workflows',
                description:
                  'Branching strategies, rebasing, conflict resolution, pull request etiquette.',
                skills: [
                  { name: 'Branching & merging', resource: 'Atlassian Git Tutorial' },
                  { name: 'Rebase & cherry-pick', resource: 'Git Pro Book' },
                ],
                estHours: '12h',
              },
              {
                id: 'fs-f3',
                title: 'REST & HTTP Fundamentals',
                description:
                  'HTTP semantics, status codes, idempotency, content negotiation, caching.',
                skills: [
                  { name: 'REST design principles', resource: 'REST API Tutorial' },
                  { name: 'HTTP caching headers', resource: 'MDN HTTP' },
                ],
                estHours: '16h',
              },
            ],
          },
          {
            id: 'intermediate',
            label: 'Intermediate',
            subtitle: 'Frameworks & APIs',
            steps: [
              {
                id: 'fs-i1',
                title: 'React & Component Architecture',
                description:
                  'Hooks, composition, state management, suspense, server components.',
                skills: [
                  { name: 'Hooks & custom hooks', resource: 'react.dev/learn' },
                  { name: 'State management (Zustand/Redux)', resource: 'Zustand Docs' },
                  { name: 'Server Components', resource: 'react.dev/reference' },
                ],
                estHours: '50h',
              },
              {
                id: 'fs-i2',
                title: 'Backend with Node.js & TypeScript',
                description:
                  'Express/Fastify, typed APIs, ORM integration, auth middleware.',
                skills: [
                  { name: 'Express / Fastify routing', resource: 'Fastify Docs' },
                  { name: 'TypeScript generics', resource: 'TS Handbook' },
                  { name: 'JWT & session auth', resource: 'OWASP Auth Cheatsheet' },
                ],
                estHours: '45h',
              },
              {
                id: 'fs-i3',
                title: 'Databases & ORMs',
                description:
                  'Relational modeling, indexing, Postgres, Prisma/Drizzle, query tuning.',
                skills: [
                  { name: 'SQL & normalization', resource: 'PostgreSQL Tutorial' },
                  { name: 'Prisma ORM', resource: 'prisma.io/docs' },
                ],
                estHours: '30h',
              },
            ],
          },
          {
            id: 'advanced',
            label: 'Advanced',
            subtitle: 'Scale, infra & systems',
            steps: [
              {
                id: 'fs-a1',
                title: 'System Design & Scalability',
                description:
                  'Load balancing, caching layers, sharding, message queues, eventual consistency.',
                skills: [
                  { name: 'Caching & CDN strategy', resource: 'System Design Primer' },
                  { name: 'Sharding & replication', resource: 'Designing Data-Intensive Apps' },
                ],
                estHours: '40h',
              },
              {
                id: 'fs-a2',
                title: 'CI/CD & Cloud Deployment',
                description:
                  'Docker, Kubernetes basics, GitHub Actions, observability, zero-downtime deploys.',
                skills: [
                  { name: 'Docker & compose', resource: 'Docker Docs' },
                  { name: 'GitHub Actions pipelines', resource: 'GH Actions Docs' },
                ],
                estHours: '28h',
              },
            ],
          },
        ],
      },
      {
        id: 'embedded-systems-engineer',
        name: 'Embedded Systems Engineer',
        tagline: 'Firmware, RTOS, and hardware-software integration',
        icon: 'CircuitBoard',
        demand: 'High',
        avgSalary: '$128k',
        roadmap: [
          {
            id: 'foundational',
            label: 'Foundational',
            subtitle: 'Electronics & C',
            steps: [
              {
                id: 'em-f1',
                title: 'C Programming for Embedded',
                description:
                  'Pointers, memory layout, bit manipulation, volatile keyword, ISR patterns.',
                skills: [
                  { name: 'Pointers & memory', resource: 'Learn-C.org' },
                  { name: 'Bit manipulation & registers', resource: 'Embedded C Book' },
                ],
                estHours: '45h',
              },
              {
                id: 'em-f2',
                title: 'Digital Electronics & Microcontrollers',
                description:
                  'GPIO, timers, ADC, interrupts, datasheet reading, clock domains.',
                skills: [
                  { name: 'GPIO & interrupts', resource: 'STM32 Reference' },
                  { name: 'Reading datasheets', resource: 'All About Circuits' },
                ],
                estHours: '35h',
              },
            ],
          },
          {
            id: 'intermediate',
            label: 'Intermediate',
            subtitle: 'RTOS & peripherals',
            steps: [
              {
                id: 'em-i1',
                title: 'Real-Time Operating Systems',
                description:
                  'FreeRTOS tasks, semaphores, queues, priority inversion, scheduling.',
                skills: [
                  { name: 'FreeRTOS tasks & queues', resource: 'FreeRTOS Docs' },
                  { name: 'Priority inversion', resource: 'RTOS Concepts' },
                ],
                estHours: '40h',
              },
              {
                id: 'em-i2',
                title: 'Communication Protocols',
                description: 'I2C, SPI, UART, CAN, debugging with logic analyzers.',
                skills: [
                  { name: 'I2C & SPI', resource: 'SparkFun Tutorial' },
                  { name: 'CAN bus', resource: 'CSS Electronics' },
                ],
                estHours: '24h',
              },
            ],
          },
          {
            id: 'advanced',
            label: 'Advanced',
            subtitle: 'Optimization & Linux',
            steps: [
              {
                id: 'em-a1',
                title: 'Embedded Linux & Device Trees',
                description:
                  'Buildroot, Yocto, kernel modules, device tree overlays, bootloaders.',
                skills: [
                  { name: 'Yocto / Buildroot', resource: 'Yocto Project' },
                  { name: 'Device trees', resource: 'elinux.org' },
                ],
                estHours: '50h',
              },
              {
                id: 'em-a2',
                title: 'Low-Power & Safety-Critical Design',
                description:
                  'Sleep modes, MISRA-C, static analysis, functional safety (ISO 26262).',
                skills: [
                  { name: 'MISRA-C compliance', resource: 'MISRA Guidelines' },
                  { name: 'Low-power modes', resource: 'Low Power RF Guide' },
                ],
                estHours: '32h',
              },
            ],
          },
        ],
      },
      {
        id: 'devops-engineer',
        name: 'DevOps Engineer',
        tagline: 'Infrastructure, automation, and reliability',
        icon: 'Server',
        demand: 'Very High',
        avgSalary: '$142k',
        roadmap: [
          {
            id: 'foundational',
            label: 'Foundational',
            subtitle: 'Linux & networking',
            steps: [
              {
                id: 'do-f1',
                title: 'Linux & Shell Scripting',
                description: 'Filesystem, processes, systemd, bash, text processing.',
                skills: [
                  { name: 'Bash scripting', resource: 'Linux Command' },
                  { name: 'systemd services', resource: 'DigitalOcean' },
                ],
                estHours: '30h',
              },
              {
                id: 'do-f2',
                title: 'Networking Fundamentals',
                description: 'TCP/IP, DNS, load balancing, firewalls, VPNs.',
                skills: [
                  { name: 'TCP/IP & DNS', resource: 'NetworkChuck' },
                  { name: 'Load balancing', resource: 'NGINX Docs' },
                ],
                estHours: '24h',
              },
            ],
          },
          {
            id: 'intermediate',
            label: 'Intermediate',
            subtitle: 'Containers & IaC',
            steps: [
              {
                id: 'do-i1',
                title: 'Docker & Container Orchestration',
                description: 'Images, multi-stage builds, Kubernetes pods, deployments, Helm.',
                skills: [
                  { name: 'Docker multi-stage', resource: 'Docker Docs' },
                  { name: 'Kubernetes & Helm', resource: 'K8s Docs' },
                ],
                estHours: '50h',
              },
              {
                id: 'do-i2',
                title: 'Infrastructure as Code',
                description: 'Terraform modules, state management, Ansible playbooks.',
                skills: [
                  { name: 'Terraform', resource: 'Terraform Learn' },
                  { name: 'Ansible', resource: 'Ansible Docs' },
                ],
                estHours: '32h',
              },
            ],
          },
          {
            id: 'advanced',
            label: 'Advanced',
            subtitle: 'SRE & observability',
            steps: [
              {
                id: 'do-a1',
                title: 'Observability & SRE Practices',
                description: 'Prometheus, Grafana, OpenTelemetry, SLOs, incident response.',
                skills: [
                  { name: 'Prometheus & Grafana', resource: 'Prometheus Docs' },
                  { name: 'SLO/SLI design', resource: 'Google SRE Book' },
                ],
                estHours: '36h',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'it-software',
    name: 'IT / Software',
    description:
      'Application software, data, and cloud roles across product and platform teams.',
    icon: 'Code2',
    accent: 'emerald',
    roles: [
      {
        id: 'frontend-engineer',
        name: 'Frontend Engineer',
        tagline: 'Pixel-perfect, performant UI engineering',
        icon: 'MonitorSmartphone',
        demand: 'High',
        avgSalary: '$122k',
        roadmap: [
          {
            id: 'foundational',
            label: 'Foundational',
            subtitle: 'Markup, style, JS',
            steps: [
              {
                id: 'fe-f1',
                title: 'Modern CSS & Animation',
                description: 'Grid, container queries, view transitions, motion design.',
                skills: [
                  { name: 'Container queries', resource: 'web.dev' },
                  { name: 'View transitions', resource: 'Chrome DevRel' },
                ],
                estHours: '28h',
              },
              {
                id: 'fe-f2',
                title: 'TypeScript Deep Dive',
                description: 'Generics, conditional types, inference, module resolution.',
                skills: [
                  { name: 'Conditional types', resource: 'TS Handbook' },
                  { name: 'Module resolution', resource: 'TS Wiki' },
                ],
                estHours: '30h',
              },
            ],
          },
          {
            id: 'intermediate',
            label: 'Intermediate',
            subtitle: 'Frameworks & perf',
            steps: [
              {
                id: 'fe-i1',
                title: 'React Performance Patterns',
                description: 'Memoization, virtualization, concurrent features, profiling.',
                skills: [
                  { name: 'React Profiler', resource: 'react.dev' },
                  { name: 'Virtualization', resource: 'TanStack Virtual' },
                ],
                estHours: '34h',
              },
              {
                id: 'fe-i2',
                title: 'Accessibility & Testing',
                description: 'WCAG, ARIA, Playwright, component testing, visual regression.',
                skills: [
                  { name: 'WCAG & ARIA', resource: 'a11y project' },
                  { name: 'Playwright', resource: 'Playwright Docs' },
                ],
                estHours: '26h',
              },
            ],
          },
          {
            id: 'advanced',
            label: 'Advanced',
            subtitle: 'Architecture',
            steps: [
              {
                id: 'fe-a1',
                title: 'Micro-Frontends & Edge Rendering',
                description: 'Module federation, SSR/ISR, edge functions, streaming.',
                skills: [
                  { name: 'Module federation', resource: 'Webpack Docs' },
                  { name: 'Edge rendering', resource: 'Next.js Docs' },
                ],
                estHours: '40h',
              },
            ],
          },
        ],
      },
      {
        id: 'data-engineer',
        name: 'Data Engineer',
        tagline: 'Pipelines, warehouses, and data platforms',
        icon: 'Database',
        demand: 'Very High',
        avgSalary: '$138k',
        roadmap: [
          {
            id: 'foundational',
            label: 'Foundational',
            subtitle: 'SQL & Python',
            steps: [
              {
                id: 'de-f1',
                title: 'Advanced SQL & Data Modeling',
                description: 'Window functions, CTEs, star/snowflake schemas, normalization.',
                skills: [
                  { name: 'Window functions', resource: 'Mode SQL Tutorial' },
                  { name: 'Dimensional modeling', resource: 'Kimball Group' },
                ],
                estHours: '32h',
              },
              {
                id: 'de-f2',
                title: 'Python for Data Engineering',
                description: 'Pandas, PyArrow, ETL scripting, Airflow basics.',
                skills: [
                  { name: 'Pandas & PyArrow', resource: 'Pandas Docs' },
                  { name: 'Airflow DAGs', resource: 'Airflow Docs' },
                ],
                estHours: '36h',
              },
            ],
          },
          {
            id: 'intermediate',
            label: 'Intermediate',
            subtitle: 'Warehouses & streaming',
            steps: [
              {
                id: 'de-i1',
                title: 'Cloud Data Warehouses',
                description: 'Snowflake, BigQuery, Redshift, partitioning, clustering.',
                skills: [
                  { name: 'Snowflake', resource: 'Snowflake Docs' },
                  { name: 'BigQuery optimization', resource: 'GCP Docs' },
                ],
                estHours: '40h',
              },
              {
                id: 'de-i2',
                title: 'Stream Processing',
                description: 'Kafka, Spark Structured Streaming, exactly-once semantics.',
                skills: [
                  { name: 'Kafka', resource: 'Confluent Docs' },
                  { name: 'Spark Streaming', resource: 'Spark Docs' },
                ],
                estHours: '38h',
              },
            ],
          },
          {
            id: 'advanced',
            label: 'Advanced',
            subtitle: 'Platform & governance',
            steps: [
              {
                id: 'de-a1',
                title: 'Data Platform & Governance',
                description: 'Data mesh, contracts, lineage, dbt, Great Expectations.',
                skills: [
                  { name: 'dbt modeling', resource: 'dbt Docs' },
                  { name: 'Data contracts', resource: 'Data Mesh Book' },
                ],
                estHours: '44h',
              },
            ],
          },
        ],
      },
      {
        id: 'ml-engineer',
        name: 'ML Engineer',
        tagline: 'Model training, MLOps, and deployment',
        icon: 'BrainCircuit',
        demand: 'Very High',
        avgSalary: '$158k',
        roadmap: [
          {
            id: 'foundational',
            label: 'Foundational',
            subtitle: 'Math & ML basics',
            steps: [
              {
                id: 'ml-f1',
                title: 'Linear Algebra & Statistics',
                description: 'Vectors, matrices, probability, distributions, MLE.',
                skills: [
                  { name: 'Linear algebra', resource: '3Blue1Brown' },
                  { name: 'Probability', resource: 'Seeing Theory' },
                ],
                estHours: '40h',
              },
              {
                id: 'ml-f2',
                title: 'Classical ML Algorithms',
                description: 'Regression, trees, SVMs, clustering, evaluation metrics.',
                skills: [
                  { name: 'Scikit-learn', resource: 'sklearn Docs' },
                  { name: 'Model evaluation', resource: 'Hands-On ML' },
                ],
                estHours: '45h',
              },
            ],
          },
          {
            id: 'intermediate',
            label: 'Intermediate',
            subtitle: 'Deep learning',
            steps: [
              {
                id: 'ml-i1',
                title: 'Deep Learning with PyTorch',
                description: 'Tensors, autograd, CNNs, RNNs, transfer learning.',
                skills: [
                  { name: 'PyTorch', resource: 'PyTorch Tutorials' },
                  { name: 'Transfer learning', resource: 'fast.ai' },
                ],
                estHours: '50h',
              },
              {
                id: 'ml-i2',
                title: 'Transformers & LLMs',
                description: 'Attention, fine-tuning, LoRA, prompt engineering, RAG.',
                skills: [
                  { name: 'Transformers', resource: 'Hugging Face Course' },
                  { name: 'RAG pipelines', resource: 'LangChain Docs' },
                ],
                estHours: '42h',
              },
            ],
          },
          {
            id: 'advanced',
            label: 'Advanced',
            subtitle: 'MLOps & scale',
            steps: [
              {
                id: 'ml-a1',
                title: 'MLOps & Model Serving',
                description: 'MLflow, feature stores, model registry, serving, monitoring.',
                skills: [
                  { name: 'MLflow', resource: 'MLflow Docs' },
                  { name: 'Feature stores', resource: 'Feast Docs' },
                ],
                estHours: '38h',
              },
            ],
          },
        ],
      },
    ],
  },
];
