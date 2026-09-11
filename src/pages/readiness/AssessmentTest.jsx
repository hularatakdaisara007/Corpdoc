import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useJobs } from '../../context/JobContext';
import { useAssessment } from '../../context/AssessmentContext';
import { mockQuestionsByJob } from '../../data/mockQuestions';
import { AssessmentQuestion } from '../../components/assessment/AssessmentQuestion';
import { AssessmentProgress } from '../../components/assessment/AssessmentProgress';
import { Timer } from '../../components/assessment/Timer';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import {
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles
} from 'lucide-react';

export const AssessmentTest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getJobById } = useJobs();
  const { evaluateAssessment } = useAssessment();

  const job = getJobById(id);
  const questions = mockQuestionsByJob[id] || mockQuestionsByJob["job-1"];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [validationError, setValidationError] = useState(false);

  const currentQuestion = questions[currentIndex];
  const answeredCount = Object.keys(answers).length;
  const isFinalQuestion = currentIndex === questions.length - 1;
  const currentAnswerSelected = answers[currentQuestion.id] !== undefined;

  const handleSelectOption = (optionId) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId
    }));
    setValidationError(false);
  };

  const handleNext = () => {
    if (!currentAnswerSelected) {
      setValidationError(true);
      return;
    }
    setValidationError(false);
    if (!isFinalQuestion) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setShowConfirmModal(true);
    }
  };

  const handlePrev = () => {
    setValidationError(false);
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleSubmitFinal = () => {
    setSubmitting(true);
    setTimeout(() => {
      evaluateAssessment(job, answers);
      setSubmitting(false);
      setShowConfirmModal(false);
      navigate(`/jobs/${job.id}/readiness/result`);
    }, 600);
  };

  if (!job) {
    return <div>Job not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in py-2">
      {/* Top Bar: Title + Timer + 75% Gate Flag */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
            Active Readiness Assessment
          </span>
          <h2 className="text-base sm:text-lg font-extrabold text-slate-900 mt-1">
            {job.title} Test
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Pass Threshold: 75%</span>
          </div>
          <Timer initialSeconds={600} onTimeUp={() => setShowConfirmModal(true)} />
        </div>
      </div>

      {/* Question Progress Counter & Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs">
        <AssessmentProgress
          currentIndex={currentIndex}
          totalQuestions={questions.length}
          answeredCount={answeredCount}
        />
      </div>

      {/* Main Question Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-8">
        <AssessmentQuestion
          question={currentQuestion}
          selectedAnswer={answers[currentQuestion.id]}
          onSelectOption={handleSelectOption}
        />

        {/* Validation Warning if attempted to click next without selecting answer */}
        {validationError && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs font-semibold flex items-center gap-2 animate-fade-in">
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
            <span>Please select an answer before proceeding to the next question.</span>
          </div>
        )}

        {/* Navigation CTAs */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <Button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            variant="secondary"
            size="md"
            icon={ArrowLeft}
          >
            Previous
          </Button>

          {isFinalQuestion ? (
            <Button
              onClick={handleNext}
              variant="glow"
              size="lg"
              className="font-extrabold px-8 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-emerald-500/20"
            >
              Submit Assessment
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              variant="primary"
              size="md"
              icon={ArrowRight}
              iconPosition="right"
              className="font-bold px-6"
            >
              Next Question
            </Button>
          )}
        </div>
      </div>

      {/* Submission Confirmation Modal */}
      <Modal
        isOpen={showConfirmModal}
        onClose={() => !submitting && setShowConfirmModal(false)}
        title="Submit Assessment?"
        subtitle="Final verification before 75% Gate Evaluation"
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-600 leading-relaxed">
            You have answered <strong>{answeredCount} of {questions.length}</strong> questions.
            Once submitted, your answers will be evaluated against the <strong>75% Job Readiness Gate</strong>.
          </p>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
            <div className="flex justify-between text-slate-700">
              <span>Score &gt;= 75%:</span>
              <strong className="text-emerald-600">✅ Unlocks Instant "Apply Now"</strong>
            </div>
            <div className="flex justify-between text-slate-700">
              <span>Score &lt; 75%:</span>
              <strong className="text-rose-600">❌ Skill Gap Analysis & Unlimited Retakes</strong>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
            <Button
              onClick={() => setShowConfirmModal(false)}
              variant="secondary"
              size="md"
              disabled={submitting}
            >
              Cancel
            </Button>

            <Button
              onClick={handleSubmitFinal}
              loading={submitting}
              variant="glow"
              size="md"
              className="font-bold bg-gradient-to-r from-emerald-600 to-teal-600"
            >
              Submit Now
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
