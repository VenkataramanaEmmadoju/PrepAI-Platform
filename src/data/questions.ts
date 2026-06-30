export type QuestionDifficulty = 'Behavioral' | 'Technical' | 'System Design';

export interface IdealAnswer {
  summary: string;
  points: string[];
}

export interface Question {
  id: string;
  role: string;
  difficulty: QuestionDifficulty;
  question: string;
  company: string;
  idealAnswer: IdealAnswer;
  tags: string[];
}

export const QA_ROLES = [
  'Full Stack Developer',
  'Frontend Engineer',
  'Backend Engineer',
  'Data Engineer',
  'ML Engineer',
  'DevOps Engineer',
];

export const QA_DIFFICULTIES: QuestionDifficulty[] = [
  'Behavioral',
  'Technical',
  'System Design',
];

export const QA_COMPANIES = [
  'Google',
  'Meta',
  'Amazon',
  'Microsoft',
  'Apple',
  'Netflix',
  'Tesla',
  'Intel',
  'McKinsey',
];

export const QUESTIONS: Question[] = [
  // ===== Full Stack Developer =====
  {
    id: 'fs-b1',
    role: 'Full Stack Developer',
    difficulty: 'Behavioral',
    question:
      'Tell me about a time you had to deliver a critical feature under a tight deadline. How did you manage scope and quality?',
    company: 'Amazon',
    idealAnswer: {
      summary:
        'Use STAR. Show scope negotiation, prioritization, and a quality safeguard — Amazon values "Deliver Results" and "Bias for Action".',
      points: [
        'Situation: A key customer-facing feature had to ship before a quarterly business review, with only one sprint left.',
        'Task: I owned the full-stack delivery and had to balance speed against a regression risk in the payments flow.',
        'Action: I broke the feature into must-have and nice-to-have slices, negotiated the scope down to the critical path with the PM, and added automated tests only around the riskiest payment paths.',
        'Action: I set up a feature flag so we could dark-launch and roll back instantly if metrics degraded.',
        'Result: We shipped on time with zero payment incidents; the nice-to-have slice followed in the next sprint.',
      ],
    },
    tags: ['delivery', 'scope', 'bias-for-action'],
  },
  {
    id: 'fs-b2',
    role: 'Full Stack Developer',
    difficulty: 'Behavioral',
    question:
      'Describe a time you disagreed with a senior engineer on an architecture decision. How did you resolve it?',
    company: 'Google',
    idealAnswer: {
      summary:
        'Show "Earn Trust" and data-driven disagreement — Google values consensus built on evidence, not seniority.',
      points: [
        'Situation: A staff engineer proposed a monolithic service; I believed a modular split would reduce blast radius.',
        'Task: I needed to either convince the team or commit to their direction once decided.',
        'Action: I built a small spike benchmarking deploy time and failure isolation for both approaches, and shared a one-page doc.',
        'Action: I invited the staff engineer to review the data together rather than arguing in the meeting.',
        'Result: We adopted a hybrid — modular internally, single deployable — and I learned to lead with evidence first.',
      ],
    },
    tags: ['disagreement', 'architecture', 'trust'],
  },
  {
    id: 'fs-t1',
    role: 'Full Stack Developer',
    difficulty: 'Technical',
    question:
      'Explain how you would implement optimistic UI updates in a React app and handle a failed mutation.',
    company: 'Meta',
    idealAnswer: {
      summary:
        'Update the UI immediately, roll back on failure, and reconcile with the server response — Meta cares about perceived performance.',
      points: [
        'Update the local cache/state immediately so the user sees instant feedback.',
        'Fire the mutation; on success, reconcile with the authoritative server response (server is source of truth).',
        'On failure, roll back the optimistic update and surface a retry/error state to the user.',
        'Use libraries like React Query or Apollo — they support `onMutate` for optimistic updates and rollback on error.',
        'Guard against race conditions: use mutation IDs or sequence numbers so stale responses do not overwrite newer state.',
      ],
    },
    tags: ['react', 'optimistic-ui', 'performance'],
  },
  {
    id: 'fs-t2',
    role: 'Full Stack Developer',
    difficulty: 'Technical',
    question:
      'How would you secure a JWT-based auth flow in a full stack app end to end?',
    company: 'Microsoft',
    idealAnswer: {
      summary:
        'Cover token storage, transport, expiry, rotation, and revocation — Microsoft expects defense-in-depth thinking.',
      points: [
        'Store access tokens in memory (JS) and refresh tokens in HttpOnly, Secure, SameSite=Strict cookies — never localStorage.',
        'Use short-lived access tokens (5-15 min) and rotate refresh tokens on each use.',
        'Enforce HTTPS everywhere; add CSRF protection on cookie-based endpoints (SameSite + double-submit token).',
        'Implement a revocation list / denylist for refresh tokens so logout and breach response work.',
        'Validate signatures, expiry, and issuer/audience claims server-side on every request.',
      ],
    },
    tags: ['security', 'auth', 'jwt'],
  },
  {
    id: 'fs-s1',
    role: 'Full Stack Developer',
    difficulty: 'System Design',
    question:
      'Design a real-time collaborative document editor (like Google Docs) supporting concurrent edits by multiple users.',
    company: 'Google',
    idealAnswer: {
      summary:
        'Use Operational Transformation or CRDTs for conflict resolution, with a presence layer and persistent storage.',
      points: [
        'Functional: multiple users edit the same doc concurrently with sub-second sync and no data loss.',
        'Non-functional: low latency, offline-tolerant, eventual consistency.',
        'Conflict resolution: OT (central server transforms ops) or CRDTs (merge without central authority) — CRDTs scale better offline.',
        'Sync: WebSocket connection per user; ops sent to server, broadcast to other active sessions.',
        'Presence: broadcast cursor positions and selections on a separate low-frequency channel.',
        'Storage: persist doc snapshots + op log; reconstruct state by replaying ops from last snapshot.',
        'Scale: shard docs by ID; a single doc is served by one coordinator to serialize ops.',
      ],
    },
    tags: ['system-design', 'realtime', 'crdt'],
  },

  // ===== Frontend Engineer =====
  {
    id: 'fe-b1',
    role: 'Frontend Engineer',
    difficulty: 'Behavioral',
    question:
      'Tell me about a time you improved the performance of a user-facing page. What was the impact?',
    company: 'Netflix',
    idealAnswer: {
      summary:
        'Netflix is obsessed with load time and engagement. Quantify the metric and the business outcome.',
      points: [
        'Situation: The browse page had a 4.2s LCP on 3G, causing drop-off in emerging markets.',
        'Task: I was asked to bring LCP under 2.5s without removing features.',
        'Action: I code-split the below-the-fold modules, deferred non-critical JS, and introduced image lazy-loading with srcset.',
        'Action: I moved the hero image to a CDN with priority hints and preloaded the critical font.',
        'Result: LCP dropped to 1.9s; sign-up conversion in target markets rose 7%.',
      ],
    },
    tags: ['performance', 'impact', 'core-web-vitals'],
  },
  {
    id: 'fe-t1',
    role: 'Frontend Engineer',
    difficulty: 'Technical',
    question:
      'Explain the React fiber architecture and how concurrent rendering changes scheduling.',
    company: 'Meta',
    idealAnswer: {
      summary:
        'Fibers are units of work that enable interruptible rendering; concurrent mode yields to the browser between units.',
      points: [
        'A fiber is a linked-list node representing a component instance and its work — React traverses the fiber tree instead of a recursive call stack.',
        'Interruptible: React can pause, yield to the browser, and resume work, keeping the main thread responsive.',
        'Concurrent rendering: `useTransition` and `useDeferredValue` mark updates as non-urgent so urgent work (typing) is not blocked.',
        'Lanes: a priority system that lets React batch and reorder updates by urgency.',
        'Suspense integrates with this — deferred children render without blocking the parent.',
      ],
    },
    tags: ['react', 'fiber', 'concurrent'],
  },
  {
    id: 'fe-t2',
    role: 'Frontend Engineer',
    difficulty: 'Technical',
    question:
      'How would you make a complex form accessible (WCAG 2.1 AA) without sacrificing UX?',
    company: 'Apple',
    idealAnswer: {
      summary:
        'Apple expects accessibility treated as a first-class requirement, not an add-on.',
      points: [
        'Associate every input with a `<label>` (or `aria-label`); never rely on placeholder alone.',
        'Use semantic elements (`<fieldset>`, `<legend>`) to group related fields.',
        'Manage focus visibly: never remove `:focus-visible` outlines; provide a custom high-contrast ring instead.',
        'Expose errors with `aria-describedby` linking to an error message with `role="alert"`.',
        'Ensure 4.5:1 contrast for text and 3:1 for UI components; test with a keyboard and a screen reader.',
      ],
    },
    tags: ['accessibility', 'wcag', 'forms'],
  },
  {
    id: 'fe-s1',
    role: 'Frontend Engineer',
    difficulty: 'System Design',
    question:
      'Design the frontend architecture for a large-scale e-commerce storefront serving 50M users with personalized content.',
    company: 'Amazon',
    idealAnswer: {
      summary:
        'Edge rendering, incremental hydration, and a component-driven design system with feature flags.',
      points: [
        'Render: SSR/ISR at the edge for product pages (cacheable, fast TTFB); hydrate interactively only where needed.',
        'Personalization: stream personalized slots (recommendations, pricing) via client-side fetch after hydration to keep the shell cacheable.',
        'State: keep global state minimal (cart, auth); use server state libraries (React Query/SWR) for data.',
        'Design system: a shared component library with tokens, consumed via a package, ensuring consistency across teams.',
        'Performance: code-split per route, lazy-load below-the-fold, image CDN with responsive srcset.',
        'Resilience: feature flags + graceful degradation — if the recs service fails, render a static fallback.',
      ],
    },
    tags: ['system-design', 'frontend', 'edge'],
  },

  // ===== Backend Engineer =====
  {
    id: 'be-b1',
    role: 'Backend Engineer',
    difficulty: 'Behavioral',
    question:
      'Tell me about a time a service you owned had a production outage. What was your role in the response?',
    company: 'Amazon',
    idealAnswer: {
      summary:
        'Amazon values "Dive Deep" and ownership during incidents. Show calm triage, root cause, and a follow-up action plan.',
      points: [
        'Situation: A checkout service began returning 500s for 3% of requests during a flash sale.',
        'Task: I was the on-call owner; I needed to mitigate first, then find root cause.',
        'Action: I rolled back the last deploy to stop the bleeding within 5 minutes, restoring service.',
        'Action: I dug into logs and found a null-pointer from an upstream API contract change; I added a contract test and a guard.',
        'Result: We added the test to CI and a runbook; no recurrence in the next two sales events.',
      ],
    },
    tags: ['incident', 'ownership', 'reliability'],
  },
  {
    id: 'be-t1',
    role: 'Backend Engineer',
    difficulty: 'Technical',
    question:
      'How do you design an idempotent API for payment processing, and why does it matter?',
    company: 'Stripe',
    idealAnswer: {
      summary:
        'Idempotency keys prevent duplicate charges on retries; the server stores request+response keyed by the idempotency key.',
      points: [
        'Client sends an `Idempotency-Key` header (UUID) with the payment request.',
        'Server stores the key + request fingerprint + response; on a retry with the same key, it returns the stored response instead of re-charging.',
        'Keys must be scoped to the resource and have a TTL (e.g., 24h) to bound storage.',
        'If the original request is still in flight, the retry waits for the original to complete.',
        'Matters because networks retry: a timeout does not mean failure, and double-charging destroys trust.',
      ],
    },
    tags: ['api-design', 'idempotency', 'payments'],
  },
  {
    id: 'be-t2',
    role: 'Backend Engineer',
    difficulty: 'Technical',
    question:
      'Explain the difference between optimistic and pessimistic concurrency control, and when you would use each.',
    company: 'Microsoft',
    idealAnswer: {
      summary:
        'Pessimistic locks early; optimistic validates at commit. Choose by contention level.',
      points: [
        'Pessimistic: acquire a lock before reading/writing — safe under high contention but reduces throughput.',
        'Optimistic: read without locking, validate the row version at commit; retry on conflict.',
        'Use pessimistic when conflicts are frequent and the cost of retry is high (e.g., financial ledger).',
        'Use optimistic when conflicts are rare (e.g., user profile edits) — higher throughput, no lock overhead.',
        'Databases implement optimistic via version columns / row version checks; pessimistic via SELECT FOR UPDATE.',
      ],
    },
    tags: ['concurrency', 'database', 'transactions'],
  },
  {
    id: 'be-s1',
    role: 'Backend Engineer',
    difficulty: 'System Design',
    question:
      'Design a rate limiter that works across a distributed cluster of API servers.',
    company: 'Google',
    idealAnswer: {
      summary:
        'Use a shared token-bucket in Redis with atomic Lua scripts; fall back to local limits for resilience.',
      points: [
        'Functional: limit requests per user/API key to N per second across all servers.',
        'Algorithm: token bucket — refill tokens at a rate, consume one per request, reject when empty.',
        'Distributed: store the bucket in Redis; use a Lua script so refill+consume is atomic across the cluster.',
        'Hot keys: shard a single user bucket across multiple Redis slots and combine counts to avoid hotspots.',
        'Resilience: if Redis is down, fall back to a local in-memory limit (less accurate but keeps the service up).',
        'Headers: return `X-RateLimit-Remaining` and `Retry-After` for good client behavior.',
      ],
    },
    tags: ['system-design', 'rate-limiting', 'redis'],
  },

  // ===== Data Engineer =====
  {
    id: 'de-b1',
    role: 'Data Engineer',
    difficulty: 'Behavioral',
    question:
      'Tell me about a time you improved data quality or reliability in a pipeline you owned.',
    company: 'Netflix',
    idealAnswer: {
      summary:
        'Netflix relies on data for recommendations; show you treat data quality as a product.',
      points: [
        'Situation: A nightly ETL had silent null fields that corrupted downstream dashboards.',
        'Task: I owned the pipeline and needed to prevent bad data from reaching analysts.',
        'Action: I added schema validation and Great Expectations checks at the transform step, failing the job on contract violations.',
        'Action: I set up alerts on row-count anomalies and a quarantine table for rejected records.',
        'Result: Downstream incidents dropped to zero; analysts trusted the warehouse again.',
      ],
    },
    tags: ['data-quality', 'reliability', 'etl'],
  },
  {
    id: 'de-t1',
    role: 'Data Engineer',
    difficulty: 'Technical',
    question:
      'Explain the difference between OLTP and OLAP, and why it matters for warehouse design.',
    company: 'Amazon',
    idealAnswer: {
      summary:
        'OLTP handles fast transactional writes; OLAP handles analytical reads over large datasets. Warehouses are optimized for OLAP.',
      points: [
        'OLTP: normalized schema, short transactions, high write throughput (e.g., app database).',
        'OLAP: denormalized/star schema, large scans, aggregations (e.g., Snowflake, BigQuery).',
        'Mixing them on one system causes lock contention and poor query performance.',
        'ETL/ELT bridges the two: extract from OLTP, transform, load into OLAP.',
        'Columnar storage in OLAP warehouses accelerates analytical scans over wide tables.',
      ],
    },
    tags: ['data', 'warehousing', 'olap'],
  },
  {
    id: 'de-s1',
    role: 'Data Engineer',
    difficulty: 'System Design',
    question:
      'Design a streaming pipeline that ingests 1M events/sec with exactly-once semantics.',
    company: 'Meta',
    idealAnswer: {
      summary:
        'Kafka for ingestion, Flink/Spark for processing, idempotent sinks for exactly-once.',
      points: [
        'Producers: Kafka with acks=all and idempotent producer enabled.',
        'Partitioning by event key for parallelism and ordering within a key.',
        'Processing: Flink or Spark Structured Streaming with checkpointing.',
        'Exactly-once requires transactional sinks (e.g., Kafka transactions, JDBC batch with commit).',
        'Late events: watermarks + allowed lateness; side-output for too-late data.',
        'Monitoring: lag, throughput, checkpoint duration, backpressure.',
        'Replay: retain Kafka data to reprocess when logic changes.',
      ],
    },
    tags: ['system-design', 'streaming', 'kafka'],
  },

  // ===== ML Engineer =====
  {
    id: 'ml-b1',
    role: 'ML Engineer',
    difficulty: 'Behavioral',
    question:
      'Tell me about a time a model you deployed degraded in production. How did you detect and fix it?',
    company: 'Meta',
    idealAnswer: {
      summary:
        'Show monitoring, root-cause discipline, and a feedback loop — Meta values models that stay healthy in production.',
      points: [
        'Situation: A recommendation CTR model\'s accuracy drifted after a product launch changed the input distribution.',
        'Task: I owned the model and needed to restore performance without a full retrain cycle.',
        'Action: I detected drift via a monitoring dashboard tracking prediction distribution and feature stats.',
        'Action: I rolled back to the previous model version as a hotfix, then scheduled a retrain with the new data.',
        'Result: CTR recovered within 24h; I added an automated drift alert to catch it earlier next time.',
      ],
    },
    tags: ['mlops', 'drift', 'monitoring'],
  },
  {
    id: 'ml-t1',
    role: 'ML Engineer',
    difficulty: 'Technical',
    question:
      'Explain the bias-variance tradeoff and how you would diagnose it in practice.',
    company: 'Google',
    idealAnswer: {
      summary:
        'High bias underfits; high variance overfits. Diagnose via train vs. validation error gap.',
      points: [
        'High bias: training and validation error are both high → model is too simple.',
        'High variance: training error low, validation error high → model is overfitting.',
        'Fix bias: add capacity, richer features, reduce regularization.',
        'Fix variance: more data, regularization, dropout, simpler model, early stopping.',
        'Use learning curves to visualize the gap between the two errors.',
      ],
    },
    tags: ['ml', 'fundamentals', 'bias-variance'],
  },
  {
    id: 'ml-s1',
    role: 'ML Engineer',
    difficulty: 'System Design',
    question:
      'Design a real-time recommendation system for an e-commerce platform with 10M users.',
    company: 'Amazon',
    idealAnswer: {
      summary:
        'Combine candidate generation (embedding retrieval) with a ranking model, served with low-latency infra.',
      points: [
        'Two-stage: retrieval (candidates) → ranking (final order).',
        'Retrieval: collaborative filtering or item/user embeddings via ANN (FAISS).',
        'Ranking: GBDT or DNN with features: clicks, dwell time, recency, context.',
        'Serving: precompute top-K per user nightly; cache in Redis for <50ms reads.',
        'Cold start: content-based fallback using item metadata.',
        'Feedback loop: log impressions/clicks to retrain daily with fresh data.',
        'Metrics: CTR, coverage, diversity; guard against filter bubbles.',
      ],
    },
    tags: ['system-design', 'ml', 'recommendations'],
  },

  // ===== DevOps Engineer =====
  {
    id: 'do-b1',
    role: 'DevOps Engineer',
    difficulty: 'Behavioral',
    question:
      'Tell me about a time you improved deployment safety or reduced deployment-related incidents.',
    company: 'Netflix',
    idealAnswer: {
      summary:
        'Netflix pioneered chaos engineering; show you build safety into the deploy pipeline itself.',
      points: [
        'Situation: Deploys caused 2-3 incidents per month due to untested config changes.',
        'Task: I owned the deploy pipeline and needed to reduce deploy-related incidents.',
        'Action: I introduced canary deployments with automated rollback on error-rate spikes.',
        'Action: I added pre-deploy config validation and a staging environment that mirrored production traffic.',
        'Result: Deploy-related incidents dropped to near zero; the team shipped daily without fear.',
      ],
    },
    tags: ['devops', 'deploy-safety', 'canary'],
  },
  {
    id: 'do-t1',
    role: 'DevOps Engineer',
    difficulty: 'Technical',
    question:
      'Walk through how you would design a zero-downtime deployment strategy for a stateless web service.',
    company: 'Amazon',
    idealAnswer: {
      summary:
        'Use blue/green or rolling deployments behind a load balancer with health checks.',
      points: [
        'Run the new version alongside the old (blue/green) or roll pods gradually (rolling).',
        'Health checks gate traffic — only healthy instances receive traffic.',
        'Drain old instances: stop sending new requests, let in-flight requests finish.',
        'Keep a rollback path: if error rate spikes, switch back instantly.',
        'For stateful services, add backward-compatible DB migrations before deploy.',
      ],
    },
    tags: ['devops', 'deployment', 'zero-downtime'],
  },
  {
    id: 'do-s1',
    role: 'DevOps Engineer',
    difficulty: 'System Design',
    question:
      'Design a multi-region, highly available infrastructure for a global SaaS application.',
    company: 'Google',
    idealAnswer: {
      summary:
        'Active-active across regions with geo-routing, regional data replication, and graceful degradation.',
      points: [
        'Run the app in 2+ regions (active-active) behind a global load balancer with geo + health routing.',
        'Data: replicate via async multi-master or a globally distributed DB (Spanner, CockroachDB); accept eventual consistency for non-critical data.',
        'Stateless services scale per region; session affinity via regional cookies or tokens.',
        'Failover: if a region goes unhealthy, traffic shifts to the healthy region automatically.',
        'Observability: unified dashboards across regions; alert on per-region error rate and latency.',
        'Cost: use spot/preemptible for batch workloads; keep stateful tier on reserved capacity.',
      ],
    },
    tags: ['system-design', 'multi-region', 'ha'],
  },

  // ===== Core Engineering (Tesla / Intel / McKinsey) =====
  {
    id: 'ce-b1',
    role: 'Full Stack Developer',
    difficulty: 'Behavioral',
    question:
      'Tell me about a time you had to ship a feature with incomplete requirements. How did you decide what to build?',
    company: 'Tesla',
    idealAnswer: {
      summary:
        'Tesla moves fast and values first-principles thinking. Show you can make sound calls with ambiguity.',
      points: [
        'Situation: A factory dashboard feature had conflicting stakeholder requirements and a hard demo date.',
        'Task: I had to decide the minimum viable scope without blocking the demo.',
        'Action: I identified the single metric the demo needed to show (line throughput) and cut everything else.',
        'Action: I confirmed the cut with the plant lead in a 10-minute conversation rather than waiting for a full meeting.',
        'Result: The demo landed; the deferred features were prioritized from real user feedback afterward.',
      ],
    },
    tags: ['ambiguity', 'first-principles', 'delivery'],
  },
  {
    id: 'ce-t1',
    role: 'Backend Engineer',
    difficulty: 'Technical',
    question:
      'How would you design the data ingestion backend for a fleet of 100,000 vehicles streaming telemetry at 10Hz?',
    company: 'Tesla',
    idealAnswer: {
      summary:
        'High-throughput, lossy-tolerant ingestion with backpressure and per-vehicle partitioning.',
      points: [
        'Ingest: MQTT or Kafka with per-vehicle partition keys for ordering and parallelism.',
        'Backpressure: vehicles buffer locally and drop low-priority samples when the uplink is saturated.',
        'Storage: time-series DB (InfluxDB/TimescaleDB) with downsampling for long-term retention.',
        'Processing: stream processor computes aggregates (per-minute averages) and flags anomalies in real time.',
        'Scale: shard by vehicle ID; horizontally scale brokers; use a schema registry for evolving payloads.',
      ],
    },
    tags: ['telemetry', 'streaming', 'iot'],
  },
  {
    id: 'ce-s1',
    role: 'Backend Engineer',
    difficulty: 'System Design',
    question:
      'Design a firmware OTA update system for a fleet of 1M embedded devices with safety constraints.',
    company: 'Intel',
    idealAnswer: {
      summary:
        'Staged rollouts, cryptographic signing, rollback, and device-side safety checks.',
      points: [
        'Functional: deliver signed firmware to devices, with staged rollout and rollback.',
        'Signing: sign images with a key the device verifies in its bootloader; reject unsigned images.',
        'Staging: rollout in waves (1% → 10% → 100%) gated on health metrics (crash rate, telemetry).',
        'Rollback: devices keep the previous image; if the new image fails a health check on boot, they revert automatically.',
        'Delivery: CDN for image bytes; a control plane tells each device which version it should run.',
        'Safety: devices only apply updates when parked/charging and with sufficient battery; never brick a device.',
      ],
    },
    tags: ['system-design', 'ota', 'embedded', 'safety'],
  },
  {
    id: 'mc-b1',
    role: 'Data Engineer',
    difficulty: 'Behavioral',
    question:
      'Tell me about a time you had to synthesize a complex dataset into a recommendation for a non-technical stakeholder.',
    company: 'McKinsey',
    idealAnswer: {
      summary:
        'McKinsey values structured communication (Pyramid Principle) and actionable recommendations.',
      points: [
        'Situation: A client needed to decide whether to enter a new market based on messy public data.',
        'Task: I had to turn the analysis into a clear go/no-go recommendation.',
        'Action: I structured the answer top-down: recommendation first, then 3 supporting reasons, then data.',
        'Action: I used a single summary chart with the key driver, and kept the detail in an appendix.',
        'Result: The client reached a decision in one meeting; the structure made the tradeoff explicit.',
      ],
    },
    tags: ['communication', 'structured-thinking', 'stakeholders'],
  },
];
