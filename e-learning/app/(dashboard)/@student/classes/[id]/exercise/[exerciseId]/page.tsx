"use client"

// Required imports
import React, { useEffect, useState } from "react";
import { FileText } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";

interface ExerciseDetailPageProps {
  params: Promise<{
    id: string;
    exerciseId: string;
  }>;
}

interface Question {
  idCauHoi: number;
  tenCauHoi: string;
  luaChon: string;
  dapAnDung: string;
  diem: string;
  trangThai: string | null;
  luaChonHocVien: string | null;
}

interface ExerciseResult {
  tenBaiHoc: string;
  questions: Question[];
  ngayNopBai: string;
}

const ExerciseDetailPage = ({ params: paramsPromise }: ExerciseDetailPageProps) => {
  const [params, setParams] = useState<{ id: string; exerciseId: string } | null>(null);
  const [exerciseResult, setExerciseResult] = useState<ExerciseResult[]>([]);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [results, setResults] = useState<{ correct: number; incorrect: number; totalScore: number } | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [dateSubmitted, setDateSubmitted] = useState("");

  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    console.log("Pathname:", pathname);
    console.log("Query Parameters:", Object.fromEntries(searchParams.entries()));
  }, [pathname, searchParams]);

  useEffect(() => {
    // Unwrap the params Promise
    paramsPromise.then(setParams);
  }, [paramsPromise]);

  // Extract path parameters from the pathname
  const pathSegments = pathname.split('/').filter(Boolean);
  const classId = pathSegments[1]; // classes/2
  const exerciseId = pathSegments[3]; // exercise/0
  const exerciseIdNumber = parseInt(exerciseId);
  const realexerciseId = exerciseIdNumber + 1;

  // Extract query parameters, handling multiple '?' in the URL
  const rawChapter = searchParams.get('chapter');
  console.log("Raw Chapter:", rawChapter);
  let baitap: string | null = null;
  let idKhoaHoc: string | null = null;
  if (rawChapter) {
    const params = rawChapter.split('?');
    if (params.length > 1) {
      const queryParams = new URLSearchParams(params[1]);
      baitap = queryParams.get('baitap');
      idKhoaHoc = queryParams.get('idKhoaHoc');
    }
  }

  useEffect(() => {
    const storedData = localStorage.getItem("exercisesResult");
    if (storedData) {
      setExerciseResult(JSON.parse(storedData));
    }
  }, []);

  // Filter the exerciseResult based on the baitap parameter
  const filteredExerciseResult = baitap ? exerciseResult[parseInt(baitap)] : null;

  useEffect(() => {
    if (filteredExerciseResult) {
      const dateNop = filteredExerciseResult.questions;
      const dayNop = dateNop.map((item) => item.ngayNopBai.split('T')[0]);
      console.log("Bài tập >>>>>>>>>", dayNop[0]);
      setDateSubmitted(dayNop[0]);
    }
  }, [filteredExerciseResult]);

  const handleAnswerChange = (questionId: number, answer: string) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = async () => {
    if (window.confirm("Bạn có muốn nộp bài không?")) {
      let correct = 0;
      let incorrect = 0;
      let totalScore = 0;

      if (filteredExerciseResult) {
        filteredExerciseResult.questions.forEach(question => {
          if (userAnswers[question.idCauHoi] === question.dapAnDung) {
            correct++;
            totalScore += parseFloat(question.diem);
          } else {
            incorrect++;
          }
        });
      }

      setResults({ correct, incorrect, totalScore });
      setSubmitted(true);

      // Get the current date and time as the submission time
      const submissionDate = new Date().toISOString();
      const submissionDateOnly = submissionDate.split('T')[0];

      // Retrieve userRole from localStorage
      const userRole = JSON.parse(localStorage.getItem("userRole") || "{}");
      const idClassStorage = JSON.parse(localStorage.getItem("classId") || "{}");
      const idKhoaHocStorage = JSON.parse(localStorage.getItem("idKhoahoc") || "{}");
      const chapterIdStorage = JSON.parse(localStorage.getItem("chapterId") || "{}");

      if (params) {
        const submissionDetails = {
          userId: userRole.idnguoidung,
          classId: idClassStorage,
          courseId: idKhoaHocStorage,
          chapterId: chapterIdStorage,
          exerciseId: realexerciseId,
          submissionDate: submissionDateOnly, // Add submission date to the details
          questions: filteredExerciseResult.questions.map(question => ({
            questionId: question.idCauHoi,
            correctAnswer: question.dapAnDung,
            userAnswer: userAnswers[question.idCauHoi] || "Chưa chọn",
            score: question.diem
          }))
        };

        console.log("Submission Details:", submissionDetails);

        // Gửi yêu cầu POST tới API
        try {
          const response = await fetch('http://localhost:5000/api/submitExercise', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(submissionDetails),
          });

          if (response.ok) {
            console.log('Submission successful');
            setExerciseResult(prevResult => prevResult.map((exercise, index) => {
              if (index === parseInt(baitap!)) {
                return {
                  ...exercise,
                  questions: exercise.questions.map(question => ({
                    ...question,
                    trangThai: "Đã nộp",
                    luaChonHocVien: userAnswers[question.idCauHoi] || null,
                  })),
                };
              }
              return exercise;
            }));
          } else {
            console.error('Submission failed');
          }
        } catch (error) {
          console.error('Error submitting exercise:', error);
        }
      }
    }
  };

  console.log("Log ngày nộp >>>>>>>>>", filteredExerciseResult);

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
                  {filteredExerciseResult ? (
                    <>
                      <h3 className="text-xl font-medium mb-4">
                        {filteredExerciseResult.tenBaiHoc}
                      </h3>
                      {filteredExerciseResult.questions.map((question, questionIndex) => (
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
                                    disabled={question.trangThai === "Đã nộp" || submitted}
                                  />
                                  <span
                                    className={
                                      question.trangThai === "Đã nộp"
                                        ? option === question.dapAnDung
                                          ? "text-green-500"
                                          : option === question.luaChonHocVien
                                          ? "text-red-500"
                                          : ""
                                        : ""
                                    }
                                  >
                                    {option}
                                  </span>
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <p>Không tìm thấy bài tập tương ứng.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="w-72">
              <div className="card bg-base-100 border border-base-300">
                <div className="card-body">
                  <div className="flex">
                    <h3 className="font-medium mr-2">Hạn nộp bài: </h3>
                    <p>{dateSubmitted}</p>
                  </div>
                  <div className="flex">
                    <h3 className="font-medium mr-2">Trạng thái:</h3>
                    <p className={filteredExerciseResult?.questions.some(question => question.trangThai === "Đã nộp") ? "text-green-500" : "text-yellow-500"}>
                      {filteredExerciseResult?.questions.some(question => question.trangThai === "Đã nộp") ? "Đã nộp" : "Chưa nộp"}
                    </p>
                  </div>
                  {submitted && results && (
                    <div className="flex">
                      <h3 className="font-medium mr-2">Số điểm:</h3>
                      <p>{results.totalScore}</p>
                    </div>
                  )}
                  <button className="btn btn-primary mt-4" onClick={handleSubmit} disabled={filteredExerciseResult?.questions.some(question => question.trangThai === "Đã nộp") || submitted}>
                    Nộp bài
                  </button>
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