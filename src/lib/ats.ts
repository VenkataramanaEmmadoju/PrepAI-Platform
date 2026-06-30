/**
 * Client-side ATS keyword matching engine.
 *
 * Simulates how an enterprise applicant tracking system performs text
 * extraction and token indexing: it cleans raw text, extracts hard skills
 * from both the job description and the resume, then computes an exact
 * match score ratio.
 */

// Canonical hard-skill dictionary. Multi-word terms are stored with their
// normalized form so we can detect them even when punctuation separates them.
const SKILL_DICTIONARY: string[] = [
  // Languages
  'javascript', 'typescript', 'python', 'java', 'go', 'golang', 'rust', 'c++',
  'c#', 'ruby', 'php', 'kotlin', 'swift', 'scala', 'sql', 'bash', 'shell',
  // Frontend
  'react', 'reactjs', 'next.js', 'nextjs', 'vue', 'vue.js', 'angular', 'svelte',
  'sveltekit', 'redux', 'tailwind', 'css', 'html', 'sass', 'less', 'webpack',
  'vite', 'graphql', 'apollo',
  // Backend
  'node.js', 'nodejs', 'express', 'fastify', 'nestjs', 'django', 'flask',
  'fastapi', 'spring', 'spring boot', 'rails', 'laravel', 'asp.net', '.net',
  'rest', 'rest api', 'grpc', 'websocket', 'microservices', 'serverless',
  // Databases
  'postgresql', 'postgres', 'mysql', 'mongodb', 'redis', 'dynamodb',
  'cassandra', 'elasticsearch', 'sqlite', 'supabase', 'firebase', 'prisma',
  'drizzle', 'typeorm', 'sequelize',
  // Cloud / DevOps
  'aws', 'gcp', 'azure', 'docker', 'kubernetes', 'k8s', 'terraform',
  'ansible', 'helm', 'ci/cd', 'github actions', 'jenkins', 'circleci',
  'gitlab ci', 'prometheus', 'grafana', 'datadog', 'opentelemetry',
  'nginx', 'cloudflare', 'vercel', 'netlify',
  // Data / ML
  'pandas', 'numpy', 'scikit-learn', 'tensorflow', 'pytorch', 'keras',
  'xgboost', 'spark', 'kafka', 'airflow', 'dbt', 'snowflake', 'bigquery',
  'redshift', 'hadoop', 'tableau', 'power bi', 'looker', 'etl', 'elt',
  'data modeling', 'data pipeline', 'machine learning', 'deep learning',
  'nlp', 'llm', 'rag', 'transformers', 'hugging face',
  // Practices / concepts
  'agile', 'scrum', 'kanban', 'tdd', 'bdd', 'ci/cd', 'system design',
  'distributed systems', 'object-oriented', 'functional programming',
  'design patterns', 'unit testing', 'integration testing', 'e2e testing',
  'accessibility', 'wcag', 'performance optimization', 'caching',
  'sharding', 'replication', 'load balancing', 'high availability',
  'observability', 'sre', 'devops', 'code review', 'mentorship',
  // Tools
  'git', 'github', 'gitlab', 'bitbucket', 'jira', 'confluence', 'figma',
  'postman', 'linear', 'notion', 'slack',
];

// Impact / action verbs that strong resumes use to describe achievements.
const IMPACT_VERBS: string[] = [
  'led', 'built', 'designed', 'architected', 'launched', 'shipped',
  'optimized', 'reduced', 'increased', 'improved', 'scaled', 'migrated',
  'automated', 'spearheaded', 'drove', 'delivered', 'implemented',
  'engineered', 'refactored', 'mentored', 'owned', 'accelerated',
  'streamlined', 'overhauled', 'orchestrated', 'championed',
];

// Weak / passive phrasing that weakens a resume.
const WEAK_PHRASES: string[] = [
  'responsible for', 'worked on', 'helped with', 'in charge of',
  'duties included', 'participated in', 'involved in', 'assisted with',
  'team player', 'hard worker', 'go-getter',
];

export interface AtsKeyword {
  keyword: string;
  count: number;
}

export interface AtsResult {
  score: number;
  matchedKeywords: AtsKeyword[];
  missingKeywords: string[];
  formattingSuggestions: string[];
  impactVerbSuggestions: string[];
  summary: string;
  jdSkillCount: number;
  resumeSkillCount: number;
}

/**
 * Normalize raw text: lowercase, collapse whitespace, and strip common
 * punctuation while preserving the + in C++ and the # in C#.
 */
function cleanText(input: string): string {
  return input
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, ' ')
    .replace(/\+/g, 'plus')
    .replace(/#/g, 'sharp')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Count occurrences of a skill token within cleaned text. Handles both
 * single-word and multi-word skills via boundary matching.
 */
function countOccurrences(haystack: string, skill: string): number {
  const normalized = skill
    .replace(/\+/g, 'plus')
    .replace(/#/g, 'sharp')
    .toLowerCase();
  const tokens = normalized.split(' ').filter(Boolean);
  if (tokens.length === 0) return 0;

  let count = 0;
  let idx = 0;
  while (idx !== -1) {
    idx = haystack.indexOf(normalized, idx);
    if (idx === -1) break;
    // Verify word boundary on both sides to avoid substring false positives.
    const before = idx === 0 ? ' ' : haystack[idx - 1];
    const afterIdx = idx + normalized.length;
    const after = afterIdx >= haystack.length ? ' ' : haystack[afterIdx];
    if (isBoundary(before) && isBoundary(after)) {
      count++;
    }
    idx += normalized.length;
  }
  return count;
}

function isBoundary(ch: string): boolean {
  return ch === ' ' || ch === '\n' || ch === '\t' || ch === '';
}

/**
 * Extract the set of dictionary skills present in a text, with counts.
 */
function extractSkills(text: string): Map<string, number> {
  const cleaned = cleanText(text);
  const found = new Map<string, number>();
  for (const skill of SKILL_DICTIONARY) {
    const count = countOccurrences(cleaned, skill);
    if (count > 0) {
      // Use the canonical display form (original casing from dictionary).
      found.set(skill, count);
    }
  }
  return found;
}

/**
 * Detect which impact verbs appear in the resume.
 */
function detectImpactVerbs(resumeText: string): string[] {
  const cleaned = cleanText(resumeText);
  return IMPACT_VERBS.filter((v) => {
    const idx = cleaned.indexOf(v);
    if (idx === -1) return false;
    const before = idx === 0 ? ' ' : cleaned[idx - 1];
    const afterIdx = idx + v.length;
    const after = afterIdx >= cleaned.length ? ' ' : cleaned[afterIdx];
    return isBoundary(before) && isBoundary(after);
  });
}

/**
 * Detect weak phrases that should be replaced with impact verbs.
 */
function detectWeakPhrases(resumeText: string): string[] {
  const cleaned = cleanText(resumeText);
  return WEAK_PHRASES.filter((p) => cleaned.includes(p));
}

/**
 * Generate formatting suggestions based on heuristics in the resume text.
 */
function generateFormattingSuggestions(
  resumeText: string,
  weakPhrases: string[],
  impactVerbs: string[],
): string[] {
  const suggestions: string[] = [];

  if (weakPhrases.length > 0) {
    suggestions.push(
      `Replace passive phrasing (${weakPhrases.slice(0, 3).join('", "')}") with strong impact verbs like "Led", "Architected", or "Optimized".`,
    );
  }

  if (impactVerbs.length < 3) {
    suggestions.push(
      'Start each bullet with a strong action verb (Led, Built, Shipped, Optimized) — only a few impact verbs were detected.',
    );
  }

  if (!/\d/.test(resumeText)) {
    suggestions.push(
      'Quantify achievements with metrics (e.g., "reduced latency by 40%", "served 2M users"). No numbers were detected.',
    );
  }

  const lines = resumeText.split('\n').filter((l) => l.trim().length > 0);
  const avgLineLength =
    lines.reduce((n, l) => n + l.length, 0) / Math.max(lines.length, 1);
  if (avgLineLength > 160) {
    suggestions.push(
      'Shorten bullet points — average line length is very long. Aim for one-line bullets under 120 characters for ATS readability.',
    );
  }

  const skillSectionMatch = /skills|technical skills|core competencies/i.test(
    resumeText,
  );
  if (!skillSectionMatch) {
    suggestions.push(
      'Add a dedicated "Technical Skills" section with a flat keyword list — this is where ATS parsers look for highest match density.',
    );
  }

  if (!/experience|work history|employment/i.test(resumeText)) {
    suggestions.push(
      'Use a standard "Experience" section header — creative headers like "Journey" or "Where I\'ve Been" can confuse ATS parsers.',
    );
  }

  if (suggestions.length === 0) {
    suggestions.push(
      'Formatting looks solid — strong verbs, quantified metrics, and standard section headers all detected.',
    );
  }

  return suggestions;
}

/**
 * Main entry point. Compares a job description against a resume and returns
 * a full ATS analysis result with a computed match score.
 */
export function scanResume(jobDescription: string, resume: string): AtsResult {
  const jdSkills = extractSkills(jobDescription);
  const resumeSkills = extractSkills(resume);

  const matchedKeywords: AtsKeyword[] = [];
  const missingKeywords: string[] = [];

  for (const skill of jdSkills.keys()) {
    const resumeCount = resumeSkills.get(skill) ?? 0;
    if (resumeCount > 0) {
      matchedKeywords.push({ keyword: skill, count: resumeCount });
    } else {
      missingKeywords.push(skill);
    }
  }

  // Score = matched JD skills / total JD skills, expressed as a percentage.
  const totalJdSkills = jdSkills.size;
  const matchedCount = matchedKeywords.length;
  const rawScore = totalJdSkills === 0 ? 0 : (matchedCount / totalJdSkills) * 100;

  // Apply a small bonus for impact-verb density (capped) so well-written
  // resumes score slightly higher, mirroring real ATS weighting.
  const impactVerbs = detectImpactVerbs(resume);
  const verbBonus = Math.min(impactVerbs.length * 1.5, 8);
  const score = Math.min(100, Math.round(rawScore + verbBonus));

  const weakPhrases = detectWeakPhrases(resume);
  const formattingSuggestions = generateFormattingSuggestions(
    resume,
    weakPhrases,
    impactVerbs,
  );

  const impactVerbSuggestions: string[] = [];
  if (weakPhrases.length > 0) {
    impactVerbSuggestions.push(
      `Found passive phrasing to replace: ${weakPhrases.map((p) => `"${p}"`).join(', ')}.`,
    );
  }
  if (impactVerbs.length > 0) {
    impactVerbSuggestions.push(
      `Strong impact verbs detected: ${impactVerbs.slice(0, 8).join(', ')}. Keep using these.`,
    );
  } else {
    impactVerbSuggestions.push(
      'No impact verbs found. Rewrite bullets to start with action verbs (Led, Built, Shipped, Optimized).',
    );
  }
  const missingHighSignal = missingKeywords.filter((k) =>
    ['kubernetes', 'microservices', 'graphql', 'redis', 'system design', 'distributed systems', 'terraform', 'next.js'].includes(k),
  );
  if (missingHighSignal.length > 0) {
    impactVerbSuggestions.push(
      `High-signal gaps: add ${missingHighSignal.slice(0, 5).join(', ')} to your skills section if you have any exposure.`,
    );
  }

  let summary: string;
  if (score >= 85) {
    summary = `Excellent alignment — your resume covers ${matchedCount} of ${totalJdSkills} required skills with strong, quantified impact language.`;
  } else if (score >= 70) {
    summary = `Good match — ${matchedCount} of ${totalJdSkills} required skills present. Close the gap on the ${missingKeywords.length} missing keywords to push past 85%.`;
  } else if (score >= 50) {
    summary = `Moderate match — ${matchedCount} of ${totalJdSkills} required skills found. ${missingKeywords.length} keywords are missing; prioritize adding the high-signal ones.`;
  } else {
    summary = `Low match — only ${matchedCount} of ${totalJdSkills} required skills detected. Tailor your resume to this JD before applying.`;
  }

  return {
    score,
    matchedKeywords: matchedKeywords.sort((a, b) => b.count - a.count),
    missingKeywords,
    formattingSuggestions,
    impactVerbSuggestions,
    summary,
    jdSkillCount: totalJdSkills,
    resumeSkillCount: resumeSkills.size,
  };
}
