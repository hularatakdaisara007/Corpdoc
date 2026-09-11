import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { mockResourcesBySkill } from '../../data/mockResources';
import { BookOpen, CheckCircle2, XCircle, ArrowRight, Zap, Lightbulb, Clock } from 'lucide-react';

export const PracticeModal = ({ isOpen, onClose, skillName }) => {
  const resource = mockResourcesBySkill[skillName] || mockResourcesBySkill["REST API"];
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  const handleSelectQuizOption = (qIdx, optIdx) => {
    if (submittedQuiz) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [qIdx]: optIdx
    }));
  };

  const calculateQuizScore = () => {
    if (!resource.quickQuiz) return 100;
    let correct = 0;
    resource.quickQuiz.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.answer) correct += 1;
    });
    return Math.round((correct / resource.quickQuiz.length) * 100);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Improve Skill: ${skillName}`}
      subtitle={resource.title}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-6 max-h-[75vh] overflow-y-auto pr-1">
        {/* Resource Meta Header */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-brand-500" />
            <span>Est. Study: {resource.estimatedTime}</span>
          </div>
          <span className="text-slate-300">•</span>
          <div className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-500" />
            <span>Difficulty: {resource.difficulty}</span>
          </div>
        </div>

        {/* Overview */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
            Skill Overview
          </h4>
          <p className="text-sm text-slate-700 leading-relaxed">
            {resource.description}
          </p>
        </div>

        {/* Core Topics Checklist */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Recommended Revision Topics
          </h4>
          <div className="space-y-2">
            {resource.topics.map((topic, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-800"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-brand-50 text-brand-600 font-bold flex items-center justify-center text-[10px]">
                    {idx + 1}
                  </span>
                  <span>{topic.name}</span>
                </div>
                <span className="text-slate-400 text-[11px] font-mono">{topic.duration}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Exercises */}
        {resource.recommendedExercises && (
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Practical Coding Exercises
            </h4>
            <ul className="space-y-2 text-xs text-slate-700">
              {resource.recommendedExercises.map((ex, i) => (
                <li key={i} className="flex items-start gap-2 bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100">
                  <Lightbulb className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>{ex}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Quick Diagnostic Quiz */}
        {resource.quickQuiz && (
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                Quick Practice Check
              </h4>
              {submittedQuiz && (
                <span className="text-xs font-bold text-emerald-600">
                  Practice Score: {calculateQuizScore()}%
                </span>
              )}
            </div>

            <div className="space-y-4">
              {resource.quickQuiz.map((q, qIdx) => (
                <div key={qIdx} className="space-y-2">
                  <p className="text-xs font-bold text-slate-800">{qIdx + 1}. {q.question}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.options.map((opt, oIdx) => {
                      const isSelected = selectedAnswers[qIdx] === oIdx;
                      const isCorrect = q.answer === oIdx;

                      let btnStyle = "border-slate-200 bg-white text-slate-700 hover:bg-slate-100";
                      if (submittedQuiz) {
                        if (isCorrect) btnStyle = "border-emerald-500 bg-emerald-50 text-emerald-900 font-bold";
                        else if (isSelected && !isCorrect) btnStyle = "border-rose-500 bg-rose-50 text-rose-900";
                      } else if (isSelected) {
                        btnStyle = "border-brand-600 bg-brand-50 text-brand-900 font-semibold";
                      }

                      return (
                        <button
                          key={oIdx}
                          type="button"
                          onClick={() => handleSelectQuizOption(qIdx, oIdx)}
                          className={`p-2.5 rounded-xl border text-xs text-left transition-all ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {!submittedQuiz ? (
              <Button
                onClick={() => setSubmittedQuiz(true)}
                variant="secondary"
                size="sm"
                className="w-full justify-center"
              >
                Check Practice Answers
              </Button>
            ) : (
              <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-semibold text-center">
                Great job! You're ready to retake the job assessment.
              </div>
            )}
          </div>
        )}

        {/* Modal Actions */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
          <Button onClick={onClose} variant="primary" size="md">
            Done & Ready to Retake
          </Button>
        </div>
      </div>
    </Modal>
  );
};
