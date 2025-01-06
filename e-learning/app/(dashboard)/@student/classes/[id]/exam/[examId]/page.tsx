"use client";

import React, { useEffect, useState } from "react";
import { FileText } from "lucide-react";

interface ExerciseDetailPageProps {
  params: {
    id: string;
    examId: string;
  };
}

const ExerciseDetailPage = ({ params }: ExerciseDetailPageProps) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const savedSubmitted = localStorage.getItem(`submitted-${params.examId}`);
    if (savedSubmitted) {
      setSubmitted(true);
    }
  }, [params.examId]);

  const layCauhoi = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/laycauhoi/${params.examId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const parsedData = data.map(question => ({
        ...question,
        luaChon: JSON.parse(question.luaChon),
        dapAnDung: JSON.parse(question.dapAnDung)
      }));

      setQuestions(parsedData);
      console.log("Loaded questions:", parsedData);
    } catch (error) {
      console.error("Lỗi lấy câu hỏi:", error);
    }
  };

  useEffect(() => {
    layCauhoi();
  }, [params.examId]);

  useEffect(() => {
    if (questions.length > 0) {
      setRemainingTime(questions[currentQuestionIndex].thoiGianLamBai * 60);
    }
  }, [currentQuestionIndex, questions]);

  useEffect(() => {
    if (submitted) return;

    const timer = setInterval(() => {
      setRemainingTime(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [submitted]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleAnswerChange = (optionIndex) => {
    if (submitted) return;

    setSelectedAnswers(prevSelectedAnswers => {
      const updatedAnswers = { ...prevSelectedAnswers };
      const currentAnswers = updatedAnswers[currentQuestionIndex] || [];

      if (currentQuestion.loaiCauHoi === "Nhiều đáp án") {
        if (currentAnswers.includes(optionIndex)) {
          updatedAnswers[currentQuestionIndex] = currentAnswers.filter(index => index !== optionIndex);
        } else {
          updatedAnswers[currentQuestionIndex] = [...currentAnswers, optionIndex];
        }
      } else {
        updatedAnswers[currentQuestionIndex] = [optionIndex];
      }

      return updatedAnswers;
    });
  };

  const handleSubmit = () => {
    setSubmitted(true);
    localStorage.setItem(`submitted-${params.examId}`, 'true');

    let totalScore = 0;

    questions.forEach((question, index) => {
      const correctAnswers = question.dapAnDung;
      const userAnswers = selectedAnswers[index]?.map(i => question.luaChon[i]) || [];

      const isCorrect = correctAnswers.length === userAnswers.length &&
                        correctAnswers.every(answer => userAnswers.includes(answer));

      if (isCorrect) {
        totalScore += parseFloat(question.diem);
      }
    });

    setScore(totalScore);

    // Log the selected answers to debug
    console.log("Selected Answers:", selectedAnswers);
  };

  return (
    <div className="container mx-auto py-16 max-w-7xl">
      <div>
        <div className="card-body">
          <div className="flex items-center gap-3 mb-6">
            <FileText size={24} className="text-primary" />
            <h2 className="card-title text-2xl">{currentQuestion?.tieuDeBaiKiemTra || "Bài kiểm tra trắc nghiệm"}</h2>
          </div>

          <div className="flex gap-6">
            {/* Main content */}
            <div className="flex-1">
              <div className="card bg-base-100 border border-base-300">
                <div className="card-body">
                  {!submitted && currentQuestion && (
                    <>
                      <div className="space-y-6">
                        <div className="prose max-w-none">
                          <p>{currentQuestion.tenCauHoi}</p>
                          {currentQuestion.imageCauHoi && <img src={currentQuestion.imageCauHoi} alt="question image" />}
                          {currentQuestion.audio && <audio controls src={currentQuestion.audio}></audio>}
                        </div>

                        <div className="space-y-4">
                          {currentQuestion.luaChon.map((option, i) => (
                            <div className="form-control" key={i}>
                              <label className="label cursor-pointer justify-normal gap-4">
                                <input
                                  type={currentQuestion.loaiCauHoi === "Nhiều đáp án" ? "checkbox" : "radio"}
                                  name="answer"
                                  className="radio radio-primary"
                                  checked={selectedAnswers[currentQuestionIndex]?.includes(i) || false}
                                  onChange={() => handleAnswerChange(i)}
                                  disabled={submitted}
                                />
                                <span>{option}</span>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-between mt-8">
                        <button className="btn btn-outline" onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
                          Câu trước
                        </button>
                        <button className="btn btn-primary" onClick={handleNextQuestion} disabled={currentQuestionIndex === questions.length - 1}>
                          Câu tiếp theo
                        </button>
                      </div>
                    </>
                  )}
                  {submitted && (
                    <div className="prose max-w-none">
                      <h3>Kết quả</h3>
                      <p>Số điểm: {score.toFixed(2)}</p>
                      <p className="text-green-500 font-bold">Đã nộp bài</p>

                      {questions.map((question, index) => (
                        <div key={index} className="mt-4">
                          <h4 className="text-lg font-medium">Câu {index + 1}: {question.tenCauHoi}</h4>
                          <div className="space-y-2">
                            {question.luaChon.map((option, i) => (
                              <div
                                key={i}
                                className={`p-2 ${
                                  question.dapAnDung.includes(option)
                                    ? 'bg-green-200' 
                                    : selectedAnswers[index]?.map(i => question.luaChon[i]).includes(option)
                                      ? 'bg-red-200' 
                                      : ''
                                }`}
                              >
                                {option}
                              </div>
                            ))}
                            <div className="text-sm text-gray-700">
                              Bạn đã chọn: {selectedAnswers[index]?.map(i => question.luaChon[i]).join(', ') || "Không chọn"}
                            </div>
                            <div className="text-sm text-gray-700">
                              Đáp án đúng: {question.dapAnDung.join(', ')}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="w-72">
              <div className="card bg-base-100 border border-base-300">
                <div className="card-body">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-base-content/70">
                        Thời gian còn lại: {Math.floor(remainingTime / 60)}:{remainingTime % 60 < 10 ? '0' : ''}{remainingTime % 60} phút
                      </p>
                    </div>
                    {!submitted && (
                      <button className="btn btn-primary" onClick={handleSubmit}>Nộp bài</button>
                    )}
                  </div>
                  <h3 className="font-medium mb-4">Danh sách câu hỏi</h3>
                  <div className="grid grid-cols-5 gap-2">
                    {questions.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentQuestionIndex(i)}
                        className={`btn btn-sm ${i === currentQuestionIndex ? "btn-primary" : "btn-outline"}`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseDetailPage;