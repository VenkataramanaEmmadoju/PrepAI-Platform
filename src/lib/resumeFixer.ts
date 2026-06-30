/**
 * Resume Fixer engine.
 *
 * Takes a raw resume and an ATS scan result (from the matching engine) and
 * produces a line-by-line rewrite plan: weak phrases replaced with impact
 * verbs, missing high-signal keywords injected into the skills section, and
 * bullets rewritten to a strong action-verb + quantified-result structure.
 */

import type { AtsResult } from './ats';

export type FixType = 'rewrite' | 'inject' | 'add-section' | 'keep';

export interface FixAction {
  type: FixType;
  reason: string;
}

export interface ResumeFix {
  lineNumber: number;
  original: string;
  rewritten: string;
  actions: FixAction[];
}

export interface ResumeFixResult {
  fixes: ResumeFix[];
  injectedSkills: string[];
  newSkillsSection: string | null;
  beforeScore: number;
  estimatedAfterScore: number;
  summary: string;
}

// Map weak phrases to a suggested strong verb opener.
const WEAK_TO_VERB: Record<string, string> = {
  'responsible for': 'Owned',
  'worked on': 'Built',
  'helped with': 'Drove',
  'in charge of': 'Led',
  'duties included': 'Delivered',
  'participated in': 'Contributed to',
  'involved in': 'Drove',
  'assisted with': 'Partnered on',
  'team player': 'Collaborative',
  'hard worker': 'Dedicated',
  'go-getter': 'Proactive',
};

const WEAK_PHRASES = Object.keys(WEAK_TO_VERB);

// Heuristic quantification suffixes to suggest when a bullet lacks metrics.
const METRIC_HINTS = [
  'reducing latency by 30%',
  'serving 1M+ users',
  'cutting deploy time by 40%',
  'improving throughput by 25%',
  'across a team of 5',
];

/**
 * Detect whether a line looks like a bullet point (starts with - or •).
 */
function isBullet(line: string): boolean {
  const trimmed = line.trimStart();
  return trimmed.startsWith('-') || trimmed.startsWith('•');
}

/**
 * Detect whether a line is a section header (all-caps short line, or ends with
 * a colon and is short).
 */
function isSectionHeader(line: string): boolean {
  const trimmed = line.trim();
  if (trimmed.length === 0 || trimmed.length > 40) return false;
  if (trimmed === trimmed.toUpperCase() && /[A-Z]/.test(trimmed)) return true;
  if (trimmed.endsWith(':') && trimmed.split(' ').length <= 4) return true;
  return false;
}

/**
 * Detect the skills section header.
 */
function isSkillsHeader(line: string): boolean {
  return /skills|technical skills|core competencies/i.test(line) && isSectionHeader(line);
}

/**
 * Replace the first weak phrase in a line with a strong verb, preserving the
 * rest of the line.
 */
function replaceWeakPhrase(line: string): { text: string; replaced: string } | null {
  const lower = line.toLowerCase();
  for (const phrase of WEAK_PHRASES) {
    const idx = lower.indexOf(phrase);
    if (idx !== -1) {
      const verb = WEAK_TO_VERB[phrase];
      // Replace the phrase (case-insensitive) with the verb.
      const before = line.slice(0, idx);
      const after = line.slice(idx + phrase.length);
      const text = `${before}${verb}${after.charAt(0).toUpperCase()}${after.slice(1)}`;
      return { text, replaced: phrase };
    }
  }
  return null;
}

/**
 * Suggest a quantification if a bullet has no digits.
 */
function suggestQuantification(line: string): string | null {
  if (/\d/.test(line)) return null;
  // Pick a deterministic hint based on line length so it's stable across renders.
  const hint = METRIC_HINTS[line.length % METRIC_HINTS.length];
  // Append before the trailing period if present, else at the end.
  const trimmed = line.trimEnd();
  if (trimmed.endsWith('.')) {
    return `${trimmed.slice(0, -1)}, ${hint}.`;
  }
  return `${trimmed}, ${hint}`;
}

/**
 * Capitalize the first alphabetic character of a bullet body.
 */
function capitalizeFirst(text: string): string {
  const match = text.match(/^(\s*[-•]\s*)([a-z])/);
  if (match) {
    const idx = match[0].length - 1;
    return text.slice(0, idx) + text[idx].toUpperCase() + text.slice(idx + 1);
  }
  return text;
}

/**
 * Main entry point. Produces a list of line-by-line fixes plus an injected
 * skills section if high-signal keywords are missing.
 */
export function fixResume(
  resume: string,
  ats: AtsResult,
): ResumeFixResult {
  const lines = resume.split('\n');
  const fixes: ResumeFix[] = [];
  let skillsLineIndex = -1;
  let skillsContentIndex = -1;

  lines.forEach((line, i) => {
    if (isSkillsHeader(line)) {
      skillsLineIndex = i;
      // The skills content is usually the next non-empty line.
      if (i + 1 < lines.length && lines[i + 1].trim().length > 0) {
        skillsContentIndex = i + 1;
      }
    }
  });

  lines.forEach((line, i) => {
    if (line.trim().length === 0) return;
    if (i === skillsContentIndex) return; // handled separately

    const actions: FixAction[] = [];
    let rewritten = line;

    // Section headers: keep as-is.
    if (isSectionHeader(line)) {
      return;
    }

    // Bullets: apply weak-phrase replacement + quantification.
    if (isBullet(line)) {
      const weak = replaceWeakPhrase(line);
      if (weak) {
        rewritten = weak.text;
        actions.push({
          type: 'rewrite',
          reason: `Replaced passive phrase "${weak.replaced}" with strong impact verb "${WEAK_TO_VERB[weak.replaced]}".`,
        });
      }

      // Capitalize first letter of the bullet body.
      const capitalized = capitalizeFirst(rewritten);
      if (capitalized !== rewritten) {
        rewritten = capitalized;
        if (!actions.some((a) => a.type === 'rewrite')) {
          actions.push({
            type: 'rewrite',
            reason: 'Capitalized the first letter of the bullet for a stronger opener.',
          });
        }
      }

      // Suggest quantification if no metrics present.
      const quantified = suggestQuantification(rewritten);
      if (quantified) {
        rewritten = quantified;
        actions.push({
          type: 'rewrite',
          reason: 'Added a quantified outcome — bullets with metrics score higher in ATS and recruiter review.',
        });
      }

      if (actions.length > 0) {
        fixes.push({ lineNumber: i, original: line, rewritten, actions });
      }
      return;
    }

    // Non-bullet, non-header lines: check for weak phrases only.
    const weak = replaceWeakPhrase(line);
    if (weak) {
      actions.push({
        type: 'rewrite',
        reason: `Replaced passive phrase "${weak.replaced}" with strong impact verb "${WEAK_TO_VERB[weak.replaced]}".`,
      });
      fixes.push({ lineNumber: i, original: line, rewritten: weak.text, actions });
    }
  });

  // Inject missing high-signal keywords into the skills section.
  const highSignalMissing = ats.missingKeywords.filter((k) =>
    [
      'kubernetes', 'microservices', 'graphql', 'redis', 'system design',
      'distributed systems', 'terraform', 'next.js', 'ci/cd', 'docker',
      'aws', 'observability', 'caching', 'sharding',
    ].includes(k),
  );

  let newSkillsSection: string | null = null;
  const injectedSkills: string[] = [];

  if (highSignalMissing.length > 0) {
    if (skillsContentIndex >= 0) {
      const existing = lines[skillsContentIndex];
      const existingSkills = existing
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
      const merged = [...existingSkills, ...highSignalMissing];
      newSkillsSection = merged.join(', ');
      injectedSkills.push(...highSignalMissing);
    } else if (skillsLineIndex >= 0) {
      // Skills header exists but no content line — create one.
      newSkillsSection = highSignalMissing.join(', ');
      injectedSkills.push(...highSignalMissing);
    } else {
      // No skills section at all — we'll flag an add-section fix.
      newSkillsSection = highSignalMissing.join(', ');
      injectedSkills.push(...highSignalMissing);
    }
  }

  // Estimate the after-score: each injected high-signal keyword raises the
  // match ratio, capped at 100.
  const totalJd = Math.max(ats.jdSkillCount, 1);
  const matchedAfter = ats.matchedKeywords.length + injectedSkills.length;
  const rawAfter = (matchedAfter / totalJd) * 100;
  const verbBonus = Math.min(8, 8); // assume full verb bonus after rewrite
  const estimatedAfterScore = Math.min(100, Math.round(rawAfter + verbBonus));

  let summary: string;
  const rewriteCount = fixes.length;
  const injectCount = injectedSkills.length;
  if (rewriteCount === 0 && injectCount === 0) {
    summary =
      'Your resume is already in strong shape — no weak phrasing or high-signal keyword gaps detected.';
  } else {
    const parts: string[] = [];
    if (rewriteCount > 0) {
      parts.push(`${rewriteCount} bullet${rewriteCount > 1 ? 's' : ''} rewritten with impact verbs and quantified outcomes`);
    }
    if (injectCount > 0) {
      parts.push(`${injectCount} missing high-signal keyword${injectCount > 1 ? 's' : ''} injected into your skills section`);
    }
    summary = `Applied ${parts.join(' and ')}. Estimated ATS score improvement: ${ats.score}% → ${estimatedAfterScore}%.`;
  }

  return {
    fixes,
    injectedSkills,
    newSkillsSection,
    beforeScore: ats.score,
    estimatedAfterScore,
    summary,
  };
}

/**
 * Build the full rewritten resume text by applying all fixes and the new
 * skills section to the original text.
 */
export function applyFixes(
  resume: string,
  fixResult: ResumeFixResult,
): string {
  const lines = resume.split('\n');
  const fixMap = new Map(fixResult.fixes.map((f) => [f.lineNumber, f.rewritten]));

  // Find skills content line index again.
  let skillsContentIndex = -1;
  lines.forEach((line, i) => {
    if (/skills|technical skills|core competencies/i.test(line) && line.trim().length <= 40 && (line === line.toUpperCase() || line.endsWith(':'))) {
      if (i + 1 < lines.length && lines[i + 1].trim().length > 0) {
        skillsContentIndex = i + 1;
      }
    }
  });

  const result = lines.map((line, i) => {
    if (fixMap.has(i)) return fixMap.get(i)!;
    if (i === skillsContentIndex && fixResult.newSkillsSection) {
      return fixResult.newSkillsSection;
    }
    return line;
  });

  // If no skills section existed at all, append one.
  if (fixResult.newSkillsSection && skillsContentIndex === -1) {
    result.push('');
    result.push('SKILLS');
    result.push(fixResult.newSkillsSection);
  }

  return result.join('\n');
}
