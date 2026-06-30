export interface InterviewQuestion {
  id: string;
  difficulty: 'Foundational' | 'Intermediate' | 'Advanced';
  question: string;
  idealAnswerOutline: string;
  targetKeywords: string[];
}

export interface DomainRepository {
  title: string;
  description: string;
  questions: InterviewQuestion[];
}

export const interviewRepository: Record<string, DomainRepository> = {
  softwareEngineering: {
    title: "Core Software Engineering & Architecture",
    description: "High-frequency algorithmic, system design, and framework-level questions modeled after Tier-1 tech assessments.",
    questions: [
      {
        id: "swe-01",
        difficulty: "Foundational",
        question: "Explain the virtual DOM in React and how the reconciliation process works.",
        idealAnswerOutline: "The Virtual DOM is a lightweight, in-memory representation of the real DOM. When state changes, React creates a new virtual tree, compares it with the previous one using a diffing algorithm (reconciliation), and batches the minimum required updates to the real DOM to maximize performance.",
        targetKeywords: ["Virtual DOM", "Reconciliation", "Diffing algorithm", "Batching", "Fiber engine", "State mutation"]
      },
      {
        id: "swe-02",
        difficulty: "Intermediate",
        question: "What is the difference between SQL and NoSQL databases regarding scaling and ACID compliance?",
        idealAnswerOutline: "SQL databases are relational, strictly ACID-compliant, and typically scale vertically (upgrading hardware). NoSQL databases (like MongoDB) utilize flexible schemas (document, key-value), trade strict consistency for horizontal scalability (sharding across nodes) via the CAP theorem.",
        targetKeywords: ["ACID compliance", "Horizontal scaling", "Sharding", "CAP Theorem", "Relational database", "NoSQL", "Foreign keys"]
      },
      {
        id: "swe-03",
        difficulty: "Advanced",
        question: "How would you design a rate-limiting system for a high-traffic public API backend?",
        idealAnswerOutline: "I would implement a distributed rate limiter using Redis to maintain fast token/leaky bucket counters. By intercepting incoming HTTP headers via API Gateway middleware, the system tracks client IP addresses or JWT tokens, returning a 429 Too Many Requests status code when thresholds are crossed.",
        targetKeywords: ["Rate Limiter", "Token Bucket", "Redis", "Middleware", "HTTP 429", "Distributed systems", "Scalability"]
      }
    ]
  },
  cloudAndInfrastructure: {
    title: "Cloud Architecture & IT Ecosystems",
    description: "Production infrastructure operations, deployment automation, and secure DevOps pipeline scaling.",
    questions: [
      {
        id: "cloud-01",
        difficulty: "Foundational",
        question: "What is Continuous Integration and Continuous Deployment (CI/CD), and why is it used?",
        idealAnswerOutline: "CI/CD automates the lifecycle of software delivery. Continuous Integration ensures code changes are automatically linted, built, and tested whenever pushed to a repository. Continuous Deployment automatically ships those validated builds directly to production infrastructure.",
        targetKeywords: ["CI/CD Pipeline", "Automation", "GitHub Actions", "Automated Testing", "Build artifacts", "Regression testing"]
      },
      {
        id: "cloud-02",
        difficulty: "Intermediate",
        question: "Explain the difference between a monolithic architecture and microservices.",
        idealAnswerOutline: "A monolith contains all business logic, routing, and data handling inside a single deployable codebase unit. Microservices break the application into loose, decentralized, independently deployable services that communicate securely via lightweight protocols like REST APIs or gRPC.",
        targetKeywords: ["Microservices", "Monolith", "Loose coupling", "REST API", "gRPC", "Service discovery", "Independent deployment"]
      },
      {
        id: "cloud-03",
        difficulty: "Advanced",
        question: "How do you achieve zero-downtime deployments using container orchestration infrastructure like Kubernetes?",
        idealAnswerOutline: "Zero-downtime is achieved using a Rolling Update strategy. Kubernetes spins up instances of the new container version gradually, running readiness probes on them. It redirects traffic to the new instances only after they pass, systematically decommissioning old instances without dropping active user requests.",
        targetKeywords: ["Kubernetes", "Rolling Update", "Readiness probes", "Container orchestration", "Pod lifecycle", "Load balancing", "Traffic routing"]
      }
    ]
  }
};
