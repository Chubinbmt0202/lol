import React from "react";
import { BookOpen, Headphones, Book, FileText } from "lucide-react";
import Link from "next/link";

interface MockTestPageProps {
  searchParams: Promise<{
    year: string;
  }>;
}

const MockTestPage = async ({ searchParams }: MockTestPageProps) => {
  let { year } = await searchParams;

  if (!year) {
    year = "2024";
  }
  const listYears = [2024, 2023, 2022, 2021, 2020];

  console.log(year);
  const mockTests = [
    {
      id: 1,
      title: "TOEIC Practice Test 1",
      description: "Đề thi thử TOEIC đầy đủ 2 phần Listening và Reading",
      duration: "120 phút",
      questions: 200,
      icon: <BookOpen size={48} className="text-primary" />,
      difficulty: "Trung bình",
    },
    {
      id: 2,
      title: "TOEIC Practice Test 2",
      description: "Đề thi thử TOEIC theo cấu trúc mới nhất",
      duration: "120 phút",
      questions: 200,
      icon: <Book size={48} className="text-primary" />,
      difficulty: "Khó",
    },
    {
      id: 3,
      title: "Mini Test - Listening",
      description: "Đề thi thử rút gọn phần Listening",
      duration: "45 phút",
      questions: 100,
      icon: <Headphones size={48} className="text-primary" />,
      difficulty: "Dễ",
    },
    {
      id: 4,
      title: "Mini Test - Reading",
      description: "Đề thi thử rút gọn phần Reading",
      duration: "45 phút",
      questions: 100,
      icon: <FileText size={48} className="text-primary" />,
      difficulty: "Dễ",
    },
  ];

  return (
    <div className="container mx-auto px-6 max-w-7xl">
      <div className="mb-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-3">Thi thử TOEIC</h2>
          <p className="text-base-content/70 text-lg max-w-2xl">
            Làm quen với cấu trúc đề thi và đánh giá năng lực hiện tại của bạn
            thông qua các bài thi thử
          </p>
        </div>
        <div className="flex flex-wrap gap-2 mb-8">
          {listYears.map((y) => (
            <Link
              key={y}
              href={y ? `/mock-test?year=${y}` : "/mock-test"}
              className={`border-[1px]  px-6 py-3 rounded-md ${
                y === +year ? "bg-blue-100  border-blue-400" : "bg-base-100"
              }`}
            >
              {y}
            </Link>
          ))}
        </div>
        {/* Mock test cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
          {mockTests.map((test) => (
            <div
              key={test.id}
              className="card card-side card-bordered card-compact bg-base-100  transition-shadow"
            >
              <figure className="w-48">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  {test.icon}
                </div>
              </figure>
              <div className="card-body">
                <h3 className="card-title text-xl">{test.title}</h3>
                <p className="text-base-content/70">{test.description}</p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-base-content/70">
                    <span>⏱️ Thời gian:</span>
                    <span className="font-medium">{test.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-base-content/70">
                    <span>📝 Số câu hỏi:</span>
                    <span className="font-medium">{test.questions} câu</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-base-content/70">
                    <span>📊 Độ khó:</span>
                    <span className="font-medium">{test.difficulty}</span>
                  </div>
                </div>
                <Link
                  href={`/mock-test/${test.id}`}
                  className="card-actions justify-end mt-4"
                >
                  <button className="btn btn-primary btn-sm">
                    Xem chi tiết
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MockTestPage;
