"use client"
import React, { useEffect, useState } from "react";
import { FileText } from "lucide-react";

interface ExerciseDetailPageProps {
  params: {
    id: string;
    exerciseId: string;
  };
}

interface Question {
  idCauHoi: number;
  tenCauHoi: string;
  luaChon: string;
  dapAnDung: string;
}

interface ExerciseResult {
  tenBaiHoc: string;
  questions: Question[];
}

const ExerciseDetailPage = ({ params }: ExerciseDetailPageProps) => {
  const [exerciseResult, setExerciseResult] = useState<ExerciseResult[]>([]);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [results, setResults] = useState<{ correct: number; incorrect: number } | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem("exercisesResult");
    if (storedData) {
      setExerciseResult(JSON.parse(storedData));
    }
  }, []);

  const handleAnswerChange = (questionId: number, answer: string) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = () => {
    let correct = 0;
    let incorrect = 0;

    exerciseResult.forEach(exercise => {
      exercise.questions.forEach(question => {
        if (userAnswers[question.idCauHoi] === question.dapAnDung) {
          correct++;
        } else {
          incorrect++;
        }
      });
    });

    setResults({ correct, incorrect });
  };

  return (
    <div className="container mx-auto py-16 max-w-7xl">
      <div>
        <div className="card-body">
          <div className="flex items-center gap-3 mb-6">
            <FileText size={24} className="text-primary" />
            <h2 className="card-title text-2xl">Bài kiểm tra trắc nghiệm</h2>
          </div>

          <div className="flex gap-6">
            {/* Main content */}
            <div className="flex-1">
              <div className="card bg-base-100 border border-base-300">
                <div className="card-body">
                  {exerciseResult.length > 0 && (
                    exerciseResult.map((exercise, exerciseIndex) => (
                      <div key={exerciseIndex} className="mb-8">
                        <h3 className="text-xl font-medium mb-4">
                          {exercise.tenBaiHoc}
                        </h3>
                        {exercise.questions.map((question, questionIndex) => (
                          <div key={question.idCauHoi} className="mb-6">
                            <h4 className="text-lg font-medium mb-2">
                              Câu hỏi {questionIndex + 1}: 
                              <div dangerouslySetInnerHTML={{ __html: question.tenCauHoi }} />
                            </h4>
                            <div className="space-y-2">
                              {JSON.parse(question.luaChon).map((option: string, i: number) => (
                                <div key={i} className="form-control">
                                  <label className="label cursor-pointer justify-normal gap-4">
                                    <input
                                      type="radio"
                                      name={`answer-${question.idCauHoi}`}
                                      className="radio radio-primary"
                                      onChange={() => handleAnswerChange(question.idCauHoi, option)}
                                    />
                                    <span>{option}</span>
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ))
                  )}
                  <button className="btn btn-primary mt-4" onClick={handleSubmit}>
                    Nộp bài
                  </button>
                  {results && (
                    <div className="mt-4">
                      <p>Số câu đúng: {results.correct}</p>
                      <p>Số câu sai: {results.incorrect}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="w-72">
              <div className="card bg-base-100 border border-base-300">
                <div className="card-body">
                  <h3 className="font-medium mb-4">Danh sách câu hỏi</h3>
                  <div className="grid grid-cols-5 gap-2">
                    {exerciseResult.length > 0 &&
                      exerciseResult.flatMap(exercise => exercise.questions).map((_, i) => (
                        <button
                          key={i}
                          className={`btn btn-sm ${
                            i === 0 ? "btn-primary" : "btn-outline"
                          }`}
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