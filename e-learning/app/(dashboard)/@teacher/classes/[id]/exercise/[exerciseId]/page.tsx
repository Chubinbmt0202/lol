"use client"

import React, { useEffect, useState } from "react";
import { FileText } from "lucide-react";
import { useParams } from "next/navigation";

const ExerciseDetailPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");

  const params = useParams();
  const { classId, exerciseId } = params;
  console.log("Exercise ID:", exerciseId);

  const isValidJSON = (str) => {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  };

  const layCauhoi = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/laycauhoi/${exerciseId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Câu hỏi:", data);
      const parsedData = data.map(question => ({
        ...question,
        luaChon: isValidJSON(question.luaChon)
          ? JSON.parse(question.luaChon)
          : (typeof question.luaChon === 'string' && question.luaChon ? question.luaChon.split(",") : []),
        dapAnDung: isValidJSON(question.dapAnDung)
          ? JSON.parse(question.dapAnDung)
          : [question.dapAnDung],
        cauHoiCon: question.cauHoiCon ? question.cauHoiCon.map(c => ({
          ...c,
          LuaChon: Array.isArray(c.LuaChon) ? c.LuaChon : (c.LuaChon ? c.LuaChon.split(",") : []),
        })) : []
      }));
      setQuestions(parsedData);
      console.log("Parsed Data:", parsedData);
      setTitle(parsedData[0].QuestionSetTitle); // Assuming the title is the same for all questions
      setLoading(false);
    } catch (error) {
      console.error("Lỗi lấy câu hỏi:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    layCauhoi();
  }, [exerciseId]);

  const handleSelectAnswer = (questionIndex, subQuestionIndex, answer) => {
    const key = subQuestionIndex !== null ? `${questionIndex}-${subQuestionIndex}` : `${questionIndex}`;
    setSelectedAnswers(prev => ({
      ...prev,
      [key]: answer
    }));
  };

  const groupedQuestions = questions.reduce((acc, question) => {
    const section = question.phan || "Khác";
    if (!acc[section]) acc[section] = [];
    acc[section].push(question);
    return acc;
  }, {});

  const layChiTietCauHoi = (questionIndex) => {
    const question = questions[questionIndex];
    if (question) {
      setCurrentQuestionIndex(questionIndex);
      if (question.phan) {
        console.log(`Câu hỏi ${question.phan}:`, question);
      } else {
        console.error('Không tìm thấy phần câu hỏi:', questionIndex);
      }
    }
  };

  useEffect(() => {
    if (!loading && questions.length > 0) {
      layChiTietCauHoi(currentQuestionIndex);
    }
  }, [currentQuestionIndex, loading]);

  const buttonClass = (isCurrent, isAnswered) =>
    `w-10 h-10 flex items-center justify-center border rounded-lg cursor-pointer transition duration-300 ${
      isCurrent ? 'bg-primary text-white' : isAnswered ? 'bg-green-500 text-white' : 'bg-white hover:bg-gray-200'
    }`;

  const answerButtonClass = (isSelected) =>
    `px-4 py-2 border rounded-lg cursor-pointer transition duration-300 ${
      isSelected ? 'bg-primary text-white' : 'bg-white hover:bg-gray-200'
    }`;

  const isQuestionAnswered = (questionIndex) => {
    const questionKey = `${questionIndex}`;
    if (selectedAnswers.hasOwnProperty(questionKey)) {
      return true;
    }
    const subQuestionsKeys = questions[questionIndex].cauHoiCon.map((_, subIndex) => `${questionIndex}-${subIndex}`);
    return subQuestionsKeys.some(key => selectedAnswers.hasOwnProperty(key));
  };

  return (
    <div className="container mx-auto py-16 max-w-7xl">
      <div>
        <div className="card-body">
          <h1>Xem chi tiết bài kiểm tra</h1>
          <div className="flex items-center gap-3 mb-6">
            <FileText size={24} className="text-primary" />
            <h2 className="card-title text-2xl">{title}</h2>
          </div>

          <div className="flex gap-6">
            <div className="flex-1">
              {loading ? (
                <div>Đang tải dữ liệu...</div>
              ) : (
                questions.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold">{questions[currentQuestionIndex].tenCauHoi}</h3>

                    {questions[currentQuestionIndex].phan === "Mô tả tranh" && (
                      <div>
                        {questions[currentQuestionIndex].imageCauHoi && (
                          <div>
                            <img src={questions[currentQuestionIndex].imageCauHoi} alt="Question Image" className="w-1/2 h-auto" />
                            <ul className="space-y-2">
                              {questions[currentQuestionIndex].luaChon.map((answer, index) => (
                                <button
                                  key={index}
                                  className={answerButtonClass(selectedAnswers[`${currentQuestionIndex}`] === answer)}
                                  onClick={() => handleSelectAnswer(currentQuestionIndex, null, answer)}
                                >
                                  {answer}
                                </button>
                              ))}
                              <p>Đáp án đúng:</p>
                              {questions[currentQuestionIndex].dapAnDung.map((answer, index) => (
                                <li key={index}>{answer}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                    {questions[currentQuestionIndex].phan === "Đọc hiểu" && (
                      <div>
                        {questions[currentQuestionIndex].cauHoiCon.map((subQuestion, subIndex) => (
                          <div key={subIndex}>
                            <p>Câu hỏi: {subQuestion.TenCauHoiCon}</p>
                            <ul className="space-y-2">
                              {subQuestion.LuaChon.map((choice, choiceIndex) => (
                                <button
                                  key={choiceIndex}
                                  className={answerButtonClass(selectedAnswers[`${currentQuestionIndex}-${subIndex}`] === choice)}
                                  onClick={() => handleSelectAnswer(currentQuestionIndex, subIndex, choice)}
                                >
                                  {choice}
                                </button>
                              ))}
                            </ul>
                            <p>Đáp án đúng: {subQuestion.DapAnDung}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {questions[currentQuestionIndex].phan === "Hỏi đáp" && (
                      <div>
                        <p>{questions[currentQuestionIndex].deBai}</p>
                        {questions[currentQuestionIndex].audio && (
                          <div>
                            <audio controls>
                              <source src={questions[currentQuestionIndex].audio} type="audio/mp3" />
                              Your browser does not support the audio element.
                            </audio>
                            <ul className="space-y-2">
                              {questions[currentQuestionIndex].luaChon.map((answer, index) => (
                                <button
                                  key={index}
                                  className={answerButtonClass(selectedAnswers[`${currentQuestionIndex}`] === answer)}
                                  onClick={() => handleSelectAnswer(currentQuestionIndex, null, answer)}
                                >
                                  {answer}
                                </button>
                              ))}
                              <p>Đáp án đúng:</p>
                              {questions[currentQuestionIndex].dapAnDung.map((answer, index) => (
                                <li key={index}>{answer}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                    {questions[currentQuestionIndex].phan === "Hội thoại ngắn" && (
                      <div>
                        {questions[currentQuestionIndex].audio && (
                          <div>
                            <audio controls>
                              <source src={questions[currentQuestionIndex].audio} type="audio/mp3" />
                              Your browser does not support the audio element.
                            </audio>
                            <div>
                              {questions[currentQuestionIndex].cauHoiCon.map((subQuestion, subIndex) => (
                                <div key={subIndex}>
                                  <h4>{subQuestion.content}</h4>
                                  <ul className="space-y-2">
                                    {subQuestion.answers.map((choice, choiceIndex) => (
                                      <button
                                        key={choiceIndex}
                                        className={answerButtonClass(selectedAnswers[`${currentQuestionIndex}-${subIndex}`] === choice)}
                                        onClick={() => handleSelectAnswer(currentQuestionIndex, subIndex, choice)}
                                      >
                                        {choice}
                                      </button>
                                    ))}
                                    <p>Đáp án đúng: {subQuestion.correctAnswer}</p>
                                  </ul>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {questions[currentQuestionIndex].phan === "Điền vào đoạn" && (
                      <div>
                        {questions[currentQuestionIndex].cauHoiCon.map((subQuestion, subIndex) => (
                          <div key={subIndex}>
                            <p>Câu hỏi: {subQuestion.TenCauHoiCon}</p>
                            <ul className="space-y-2">
                              {subQuestion.LuaChon.map((choice, choiceIndex) => (
                                <button
                                  key={choiceIndex}
                                  className={answerButtonClass(selectedAnswers[`${currentQuestionIndex}-${subIndex}`] === choice)}
                                  onClick={() => handleSelectAnswer(currentQuestionIndex, subIndex, choice)}
                                >
                                  {choice}
                                </button>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}

                    {questions[currentQuestionIndex].phan === "Điền vào câu" && (
                      <div>
                        <p>{questions[currentQuestionIndex].deBai}</p>
                        <ul className="space-y-2">
                          {questions[currentQuestionIndex].luaChon.map((answer, index) => (
                            <button
                              key={index}
                              className={answerButtonClass(selectedAnswers[`${currentQuestionIndex}`] === answer)}
                              onClick={() => handleSelectAnswer(currentQuestionIndex, null, answer)}
                            >
                              {answer}
                            </button>
                          ))}
                          <p>Đáp án đúng:</p>
                          {questions[currentQuestionIndex].dapAnDung.map((answer, index) => (
                            <li key={index}>{answer}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {questions[currentQuestionIndex].phan === "Chuyện ngắn" && (
                      <div>
                        {questions[currentQuestionIndex].audio && (
                          <div>
                            <audio controls>
                              <source src={questions[currentQuestionIndex].audio} type="audio/mp3" />
                              Your browser does not support the audio element.
                            </audio>
                            {questions[currentQuestionIndex].cauHoiCon.map((subQuestion, subIndex) => (
                              <div key={subIndex}>
                                <h4>{subQuestion.content}</h4>
                                <ul className="space-y-2">
                                  {subQuestion.answers.map((choice, choiceIndex) => (
                                    <button
                                      key={choiceIndex}
                                      className={answerButtonClass(selectedAnswers[`${currentQuestionIndex}-${subIndex}`] === choice)}
                                      onClick={() => handleSelectAnswer(currentQuestionIndex, subIndex, choice)}
                                    >
                                      {choice}
                                    </button>
                                  ))}
                                  <p>Đáp án đúng: {subQuestion.correctAnswer}</p>
                                </ul>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )
              )}
            </div>

            <div className="w-72">
              <div className="card bg-base-100 border border-base-300">
                <div className="card-body">
                  <div className="flex items-center justify-between mb-6">
                    <button className="btn">Báo cáo bộ đề</button>
                  </div>
                  <h3 className="font-medium mb-4">Danh sách câu hỏi</h3>
                  <div className="space-y-4">
                    {Object.keys(groupedQuestions).map((section, sectionIndex) => (
                      <div key={sectionIndex}>
                        <p>{section}</p>
                        <div className="grid grid-cols-5 gap-2">
                          {groupedQuestions[section].map((question, index) => (
                            <div
                              key={index}
                              className={buttonClass(currentQuestionIndex === questions.indexOf(question), isQuestionAnswered(questions.indexOf(question)))}
                              onClick={() => layChiTietCauHoi(questions.indexOf(question))}
                            >
                              {questions.indexOf(question) + 1}
                            </div>
                          ))}
                        </div>
                      </div>
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