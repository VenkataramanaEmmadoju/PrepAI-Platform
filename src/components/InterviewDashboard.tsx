import React, { useState } from 'react';
import { interviewRepository } from '../data/interviewData';
// 1. Import your newly built ATS utility engine
import { analyzeAnswerATS, ATSAnalysisResult } from '../utils/atsEngine';

export const InterviewDashboard: React.FC = () => {
  const [activeDomain, setActiveDomain] = useState<'softwareEngineering' | 'cloudAndInfrastructure'>(
    'softwareEngineering'
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  
  // 2. React state hooks to track typing inputs and matching outputs
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<ATSAnalysisResult | null>(null);

  const domainData = interviewRepository[activeDomain];
  const currentQuestion = domainData.questions[currentQuestionIndex];

  // 3. Handle running the real-time scoring logic
  const handleRunEvaluation = () => {
    if (!userAnswer.trim()) return;
    
    const results = analyzeAnswerATS(activeDomain, currentQuestion.id, userAnswer);
    setAnalysisResult(results);
  };

  // Reset text box and feedback reports when shifting between questions
  const handleNavigation = (newIndex: number) => {
    setCurrentQuestionIndex(newIndex);
    setUserAnswer('');
    setAnalysisResult(null);
  };

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto', fontFamily: 'system-ui, sans-serif', color: '#1a1a1a' }}>
      
      {/* Domain Selection Tabs */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
        <button 
          onClick={() => { setActiveDomain('softwareEngineering'); handleNavigation(0); }}
          style={{ padding: '10px 16px', borderRadius: '6px', cursor: 'pointer', border: '1px solid #ccc', fontWeight: activeDomain === 'softwareEngineering' ? 'bold' : 'normal', backgroundColor: activeDomain === 'softwareEngineering' ? '#e0f2fe' : '#fff' }}
        >
          💻 Software Engineering
        </button>
        <button 
          onClick={() => { setActiveDomain('cloudAndInfrastructure'); handleNavigation(0); }}
          style={{ padding: '10px 16px', borderRadius: '6px', cursor: 'pointer', border: '1px solid #ccc', fontWeight: activeDomain === 'cloudAndInfrastructure' ? 'bold' : 'normal', backgroundColor: activeDomain === 'cloudAndInfrastructure' ? '#e0f2fe' : '#fff' }}
        >
          ☁️ Cloud Architecture
        </button>
      </div>

      {/* Active Question Panel */}
      <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: '#0284c7', fontWeight: '600' }}>Question {currentQuestionIndex + 1} of {domainData.questions.length}</span>
          <span style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', backgroundColor: '#e2e8f0' }}>{currentQuestion.difficulty}</span>
        </div>
        <h3 style={{ marginTop: '12px', fontSize: '18px', lineHeight: '1.5' }}>{currentQuestion.question}</h3>
      </div>

      {/* Answer Workspace Text Box */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px' }}>Your Interview Response:</label>
        <textarea
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Type or paste your technical answer here to scan against industry ATS target benchmarks..."
          style={{ width: '100%', height: '140px', padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '15px', boxSizing: 'border-box' }}
        />
        <button
          onClick={handleRunEvaluation}
          disabled={!userAnswer.trim()}
          style={{ marginTop: '12px', padding: '12px 24px', backgroundColor: '#0284c7', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: userAnswer.trim() ? 'pointer' : 'not-allowed', opacity: userAnswer.trim() ? 1 : 0.6 }}
        >
          ⚡ Scan and Score Response
        </button>
      </div>

      {/* --- Dynamic ATS Feedback Metrics Pane --- */}
      {analysisResult && (
        <div style={{ marginTop: '24px', padding: '20px', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: '#fff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>
            <h4 style={{ margin: 0, fontSize: '18px' }}>ATS Metrics Match Report</h4>
            <span style={{ fontSize: '24px', fontWeight: 'bold', color: analysisResult.score >= 75 ? '#16a34a' : analysisResult.score >= 40 ? '#ea580c' : '#dc2626' }}>
              {analysisResult.score}% Match
            </span>
          </div>

          <p style={{ fontWeight: '500', marginTop: '12px' }}>
            Status Evaluation: <span style={{ textDecoration: 'underline' }}>{analysisResult.evaluationLabel}</span>
          </p>

          {/* Matched Keywords Grid */}
          <div style={{ marginTop: '14px' }}>
            <h5 style={{ margin: '0 0 6px 0', color: '#16a34a' }}>✅ Matched Industry Phrases ({analysisResult.matchedKeywords.length}):</h5>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {analysisResult.matchedKeywords.length === 0 ? <em style={{ color: '#64748b' }}>None detected yet.</em> : analysisResult.matchedKeywords.map(kw => (
                <span key={kw} style={{ backgroundColor: '#dcfce7', color: '#166534', padding: '4px 8px', borderRadius: '4px', fontSize: '13px' }}>{kw}</span>
              ))}
            </div>
          </div>

          {/* Missing Keywords Grid */}
          <div style={{ marginTop: '14px' }}>
            <h5 style={{ margin: '0 0 6px 0', color: '#dc2626' }}>❌ Missing Heuristic Gaps ({analysisResult.missingKeywords.length}):</h5>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {analysisResult.missingKeywords.length === 0 ? <em style={{ color: '#16a34a' }}>Perfect structural coverage!</em> : analysisResult.missingKeywords.map(kw => (
                <span key={kw} style={{ backgroundColor: '#fee2e2', color: '#991b1b', padding: '4px 8px', borderRadius: '4px', fontSize: '13px' }}>{kw}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Navigation Controls footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px', borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>
        <button disabled={currentQuestionIndex === 0} onClick={() => handleNavigation(currentQuestionIndex - 1)} style={{ padding: '8px 16px', borderRadius: '4px', border: '1px solid #cbd5e1', cursor: currentQuestionIndex === 0 ? 'not-allowed' : 'pointer' }}>◀ Previous</button>
        <button disabled={currentQuestionIndex === domainData.questions.length - 1} onClick={() => handleNavigation(currentQuestionIndex + 1)} style={{ padding: '8px 16px', borderRadius: '4px', border: '1px solid #cbd5e1', cursor: currentQuestionIndex === domainData.questions.length - 1 ? 'not-allowed' : 'pointer' }}>Next ▶</button>
      </div>

    </div>
  );
};