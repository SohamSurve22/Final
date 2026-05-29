// Exam Interface Component with Timer Logic
import React, { useState, useEffect, useRef } from "react";
import API from "../api";

function ExamInterface({ activeExam, setPage, setLastResult }) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { questionId: "A" }
  const [timeLeft, setTimeLeft] = useState(activeExam ? activeExam.duration * 60 : 0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Store submit function in a ref so useEffect timer can access the latest state of answers/questions
  const submitRef = useRef();

  useEffect(() => {
    const fetchQuestions = async () => {
      if (!activeExam) {
        setPage("exams");
        return;
      }
      try {
        const response = await API.get(`/exams/${activeExam._id}/questions`);
        setQuestions(response.data);
      } catch (err) {
        setError("Failed to fetch questions for this exam.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [activeExam, setPage]);

  // Submit Exam Function
  const handleSubmit = async (isAutoSubmit = false) => {
    if (!isAutoSubmit) {
      const confirmSubmit = window.confirm("Are you sure you want to submit your exam?");
      if (!confirmSubmit) return;
    }

    try {
      const response = await API.post("/results/submit", {
        examId: activeExam._id,
        answers: answers
      });
      // Store result and redirect
      setLastResult(response.data.result);
      setPage("result");
    } catch (err) {
      setError("An error occurred during submission. Please try again.");
    }
  };

  // Keep the submit function reference updated
  useEffect(() => {
    submitRef.current = handleSubmit;
  });

  // Timer Logic
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerInterval);
          // Auto submit exam when timer reaches 0
          console.log("Timer ended. Auto submitting exam...");
          if (submitRef.current) {
            submitRef.current(true);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  const handleOptionChange = (questionId, option) => {
    setAnswers({
      ...answers,
      [questionId]: option
    });
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Format time helper (MM:SS)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  if (!activeExam) return null;

  return (
    <div className="container">
      {/* Exam Header */}
      <div className="row mb-4 align-items-center bg-dark text-white p-3 rounded">
        <div className="col-md-8">
          <h3 className="mb-1">{activeExam.title}</h3>
          <p className="text-secondary mb-0 small">DO NOT refresh or go back during the test.</p>
        </div>
        <div className="col-md-4 text-md-end mt-2 mt-md-0">
          {/* Timer Display */}
          <div className="d-inline-block bg-danger text-white px-4 py-2 rounded fw-bold fs-5">
            Time Remaining: {formatTime(timeLeft)}
          </div>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : questions.length > 0 ? (
        <div className="row justify-content-center">
          <div className="col-lg-8">
            {/* Question Panel */}
            <div className="card shadow-sm border-0 mb-4">
              <div className="card-header bg-primary text-white d-flex justify-content-between">
                <span>Question {currentIndex + 1} of {questions.length}</span>
                <span>Marks: 1.0</span>
              </div>
              <div className="card-body p-4">
                <h5 className="card-title mb-4 fw-bold">
                  {questions[currentIndex].question}
                </h5>

                <div className="options-container">
                  {["A", "B", "C", "D"].map((opt) => {
                    const optKey = `option${opt}`;
                    const optText = questions[currentIndex][optKey];
                    const qId = questions[currentIndex]._id;
                    const isChecked = answers[qId] === opt;

                    return (
                      <div className="form-check mb-3 p-3 border rounded-3 bg-light" key={opt}>
                        <input
                          className="form-check-input ms-0 me-3"
                          type="radio"
                          name={`question-${qId}`}
                          id={`opt-${opt}`}
                          value={opt}
                          checked={isChecked}
                          onChange={() => handleOptionChange(qId, opt)}
                          style={{ scale: "1.2", cursor: "pointer" }}
                        />
                        <label className="form-check-label w-100" htmlFor={`opt-${opt}`} style={{ cursor: "pointer" }}>
                          <strong>{opt}.</strong> {optText}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Question Navigation */}
              <div className="card-footer bg-white d-flex justify-content-between p-3">
                <button
                  className="btn btn-outline-secondary px-4"
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                >
                  Previous
                </button>

                {currentIndex < questions.length - 1 ? (
                  <button
                    className="btn btn-primary px-4"
                    onClick={handleNext}
                  >
                    Next Question
                  </button>
                ) : (
                  <button
                    className="btn btn-success px-4 fw-bold"
                    onClick={() => handleSubmit(false)}
                  >
                    Submit Exam
                  </button>
                )}
              </div>
            </div>

            {/* Quick Question Jump Grid */}
            <div className="card shadow-sm border-0 p-3 mb-4">
              <h6 className="mb-3">Question Palette:</h6>
              <div className="d-flex flex-wrap gap-2">
                {questions.map((q, idx) => {
                  const isAnswered = !!answers[q._id];
                  const isActive = idx === currentIndex;
                  return (
                    <button
                      key={q._id}
                      className={`btn btn-sm px-3 py-2 fw-bold ${
                        isActive 
                          ? "btn-primary" 
                          : isAnswered 
                            ? "btn-success text-white" 
                            : "btn-outline-secondary"
                      }`}
                      onClick={() => setCurrentIndex(idx)}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      ) : (
        <div className="alert alert-warning text-center py-5">
          No questions found for this exam. Please contact the examiner.
        </div>
      )}
    </div>
  );
}

export default ExamInterface;
