export interface InterviewQuestion {
  id: string;
  prompt: string;
  category: 'Behavioral' | 'Technical' | 'System Design';
  followUp?: string;
}

export const INTERVIEW_SEQUENCE: InterviewQuestion[] = [
  {
    id: 'iv-1',
    prompt:
      "Welcome. To start, could you walk me through your background and what interests you about this Senior Full Stack role?",
    category: 'Behavioral',
  },
  {
    id: 'iv-2',
    prompt:
      'Describe a production incident you were part of. How did you triage and resolve it?',
    category: 'Behavioral',
    followUp: 'What would you change about your monitoring after that incident?',
  },
  {
    id: 'iv-3',
    prompt:
      'Explain how you would design the data model and API for a multi-tenant SaaS billing system.',
    category: 'System Design',
    followUp: 'How would you handle idempotent payment retries?',
  },
  {
    id: 'iv-4',
    prompt:
      'How do you ensure type safety across a React + Node.js + PostgreSQL stack end to end?',
    category: 'Technical',
    followUp: 'Where would you draw the validation boundary and why?',
  },
  {
    id: 'iv-5',
    prompt:
      'Tell me about a time you mentored a junior engineer. What was the outcome?',
    category: 'Behavioral',
  },
];

export interface FeedbackCriterion {
  label: string;
  score: number;
  summary: string;
  improvements: string[];
}

export interface FeedbackReport {
  id: string;
  date: string;
  role: string;
  overallScore: number;
  duration: string;
  criteria: FeedbackCriterion[];
  highlights: string[];
  nextSteps: string[];
}

export const FEEDBACK_REPORTS: FeedbackReport[] = [
  {
    id: 'fb-1',
    date: 'Jun 28, 2025',
    role: 'Senior Full Stack Engineer',
    overallScore: 82,
    duration: '34 min',
    criteria: [
      {
        label: 'Communication',
        score: 88,
        summary:
          'Clear, structured responses with strong use of the STAR method for behavioral questions.',
        improvements: [
          'Tighten answers to under 90 seconds — a few responses ran long.',
          'Pause briefly after each question to structure your thoughts before answering.',
        ],
      },
      {
        label: 'Technical Accuracy',
        score: 79,
        summary:
          'Solid grasp of React and Node.js fundamentals; system design reasoning was sound but light on tradeoffs.',
        improvements: [
          'Explicitly state tradeoffs (latency vs. consistency) when proposing a design.',
          'Quantify assumptions — e.g., estimate QPS and storage before choosing a cache layer.',
        ],
      },
      {
        label: 'Problem Solving',
        score: 80,
        summary:
          'Methodical approach to the incident question; good at identifying root cause.',
        improvements: [
          'Ask clarifying questions before diving into a solution.',
          'Narrate your thought process out loud so the interviewer can follow your reasoning.',
        ],
      },
    ],
    highlights: [
      'Excellent handling of the production incident question — owned the timeline clearly.',
      'Strong command of TypeScript generics in the technical round.',
    ],
    nextSteps: [
      'Practice 5 system design questions with explicit tradeoff framing.',
      'Record yourself answering behavioral questions and review for length.',
      'Review the "System Design Primer" resource in your roadmap.',
    ],
  },
  {
    id: 'fb-2',
    date: 'Jun 24, 2025',
    role: 'Senior Full Stack Engineer',
    overallScore: 76,
    duration: '29 min',
    criteria: [
      {
        label: 'Communication',
        score: 72,
        summary:
          'Answers were correct but sometimes jumped into detail without framing the structure first.',
        improvements: [
          'Start each answer with a one-sentence thesis before expanding.',
          'Use signposting ("First…", "The key tradeoff is…") to guide the listener.',
        ],
      },
      {
        label: 'Technical Accuracy',
        score: 81,
        summary:
          'Strong on backend and database topics; slightly shaky on frontend performance.',
        improvements: [
          'Review React concurrent features and the Profiler API.',
          'Be ready to explain when memoization helps and when it does not.',
        ],
      },
      {
        label: 'Problem Solving',
        score: 75,
        summary:
          'Good instincts, but tended to commit to a solution before exploring alternatives.',
        improvements: [
          'Spend the first 60 seconds listing 2-3 possible approaches.',
          'State which you would choose and why before implementing.',
        ],
      },
    ],
    highlights: [
      'Confident explanation of idempotent API design.',
      'Good use of concrete examples from past projects.',
    ],
    nextSteps: [
      'Do 3 timed mock interviews focusing on structure-first answers.',
      'Revisit the React performance module in your roadmap.',
    ],
  },
  {
    id: 'fb-3',
    date: 'Jun 19, 2025',
    role: 'Senior Full Stack Engineer',
    overallScore: 71,
    duration: '26 min',
    criteria: [
      {
        label: 'Communication',
        score: 70,
        summary:
          'Content was strong but delivery felt rushed; some answers lacked a clear ending.',
        improvements: [
          'End each answer with a one-line summary of the outcome.',
          'Slow your pace by ~15% to sound more deliberate.',
        ],
      },
      {
        label: 'Technical Accuracy',
        score: 74,
        summary:
          'Correct on fundamentals; missed a question on database indexing strategy.',
        improvements: [
          'Review B-tree vs. hash indexes and when to use composite indexes.',
          'Practice explaining EXPLAIN ANALYZE output.',
        ],
      },
      {
        label: 'Problem Solving',
        score: 69,
        summary:
          'Reached correct solutions but took longer than ideal to get there.',
        improvements: [
          'Practice talking through the approach before writing code.',
          'Time-box each problem to 25 minutes.',
        ],
      },
    ],
    highlights: [
      'Recovered well after a tricky follow-up on caching.',
      'Showed good self-awareness about areas to improve.',
    ],
    nextSteps: [
      'Complete the "Databases & ORMs" roadmap module.',
      'Run 2 more mock interviews and track pacing.',
    ],
  },
];
