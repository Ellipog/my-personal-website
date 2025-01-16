"use client";

import { useState, useEffect } from "react";
import { Press_Start_2P } from "next/font/google";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

interface Question {
  _id: string;
  name: string;
  question: string;
  answer?: string;
  isAnswered: boolean;
  createdAt: string;
}

export default function Questions({
  setCurrentPage,
}: {
  setCurrentPage: (page: "home" | "blog" | "guestbook" | "questions") => void;
}) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    question: "",
  });
  const [adminMode, setAdminMode] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [answer, setAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  console.log(error);

  const fetchQuestions = async () => {
    try {
      const response = await fetch("/api/questions");
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error("Failed to fetch questions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleSubmitQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to submit question");

      setFormData({ name: "", question: "" });
      await fetchQuestions();
    } catch (error) {
      setError("Failed to submit question");
      console.error("Failed to submit question:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedQuestion) return;
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": adminPassword,
        },
        body: JSON.stringify({
          questionId: selectedQuestion,
          answer,
        }),
      });

      if (!response.ok) throw new Error("Failed to submit answer");

      setAnswer("");
      setSelectedQuestion(null);
      await fetchQuestions();
    } catch (error) {
      console.error("Failed to submit answer:", error);
      setError("Failed to submit answer");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen p-8 ${pressStart2P}`}
    >
      <button
        onClick={() => setCurrentPage("home")}
        className="nav-button mb-4"
      >
        🏠 Back to Home
      </button>
      <div className="w-full max-w-4xl">
        <div className="questions-container">
          <h2 className="glitter-text text-center mb-4 text-3xl">
            ❓ Ask Me Anything! ❓
          </h2>

          <form onSubmit={handleSubmitQuestion} className="question-form mb-8">
            <div className="form-group">
              <label>Your Name:</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                maxLength={50}
                className="w-full mb-4"
              />
            </div>
            <div className="form-group">
              <label>Your Question:</label>
              <textarea
                required
                value={formData.question}
                onChange={(e) =>
                  setFormData({ ...formData, question: e.target.value })
                }
                maxLength={1000}
                className="w-full mb-4"
                rows={4}
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="submit-button w-full"
            >
              {isSubmitting ? "Submitting..." : "Ask Question"}
            </button>
          </form>

          <div className="admin-section mb-8">
            <button
              onClick={() => setAdminMode(!adminMode)}
              className="nav-button mb-4"
            >
              {adminMode ? "Close Admin Panel" : "Open Admin Panel"}
            </button>
            {adminMode && (
              <div className="admin-panel">
                <input
                  type="password"
                  placeholder="Admin Password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full mb-4"
                />
              </div>
            )}
          </div>

          <div className="questions-list">
            <h3 className="glitter-text text-center mb-4">📝 Questions 📝</h3>
            {isLoading ? (
              <div className="loading">Loading questions...</div>
            ) : (
              questions.map((q) => (
                <div key={q._id} className="question-entry">
                  <div className="question-header">
                    <strong>{q.name}</strong>
                    <span className="question-date">
                      {new Date(q.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="question-text">{q.question}</p>
                  {q.answer && (
                    <div className="answer-section">
                      <strong>Answer:</strong>
                      <p>{q.answer}</p>
                    </div>
                  )}
                  {adminMode && !q.isAnswered && (
                    <div className="answer-form">
                      {selectedQuestion === q._id ? (
                        <form onSubmit={handleSubmitAnswer}>
                          <textarea
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            className="w-full mb-2"
                            rows={3}
                            required
                          />
                          <div className="flex gap-2">
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className="submit-button"
                            >
                              Submit Answer
                            </button>
                            <button
                              type="button"
                              onClick={() => setSelectedQuestion(null)}
                              className="cancel-button"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      ) : (
                        <button
                          onClick={() => setSelectedQuestion(q._id)}
                          className="answer-button"
                        >
                          Answer This Question
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
