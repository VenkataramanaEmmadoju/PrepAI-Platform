// src/utils/atsEngine.ts

import { interviewRepository } from '../data/interviewData';

export interface ATSAnalysisResult {
  score: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  evaluationLabel: 'Critical Match Fail' | 'Needs Optimization' | 'Strong Dynamic Match';
}

function cleanText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?\n\r]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Evaluates user input against target keywords. 
 * Completely free and unlocked for all users!
 */
export function analyzeAnswerATS(
  domainKey: 'softwareEngineering' | 'cloudAndInfrastructure',
  questionId: string,
  userAnswer: string
): ATSAnalysisResult {
  const domain = interviewRepository[domainKey];
  const targetQuestion = domain?.questions.find(q => q.id === questionId);

  if (!targetQuestion) {
    throw new Error(`Question ID ${questionId} not found.`);
  }

  const cleanedUserText = cleanText(userAnswer);
  const matchedKeywords: string[] = [];
  const missingKeywords: string[] = [];

  targetQuestion.targetKeywords.forEach(keyword => {
    const standardizedKeyword = keyword.toLowerCase().trim();
    if (cleanedUserText.includes(standardizedKeyword)) {
      matchedKeywords.push(keyword);
    } else {
      missingKeywords.push(keyword);
    }
  });

  const totalKeywords = targetQuestion.targetKeywords.length;
  const score = totalKeywords > 0 ? Math.round((matchedKeywords.length / totalKeywords) * 100) : 0;

  let evaluationLabel: ATSAnalysisResult['evaluationLabel'] = 'Critical Match Fail';
  if (score >= 75) {
    evaluationLabel = 'Strong Dynamic Match';
  } else if (score >= 40) {
    evaluationLabel = 'Needs Optimization';
  }

  return {
    score,
    matchedKeywords,
    missingKeywords,
    evaluationLabel
  };
}