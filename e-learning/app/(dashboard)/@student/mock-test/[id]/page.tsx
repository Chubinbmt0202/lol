import React from "react";
import { BookOpen, Headphones, Book, FileText, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface MockTestPageProps {
  params: Promise<{
    id: string;
  }>;
}

const MockTestPage = async ({ params }: MockTestPageProps) => {
  const { id } = await params;
  // Giả lập dữ liệu bài thi dựa trên id
  const mockTest = {
    id: id,
    title: `TOEIC Practice Test ${id}`,
    description: "Đề thi thử TOEIC đầy đủ 2 phần Listening và Reading",
    duration: "120 phút",
    questions: 200,
    icon: <BookOpen size={72} className="text-primary" />,
    difficulty: "Trung bình",
    sections: [
      {
        name: "Listening",
        parts: ["Photographs", "Question-Response", "Conversations", "Talks"],
        questions: 100,
        duration: "45 phút",
      },
      {
        name: "Reading",
        parts: [
          "Incomplete Sentences",
          "Text Completion",
          "Reading Comprehension",
        ],
        questions: 100,
        duration: "75 phút",
      },
    ],
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-4">
        <Link href="/mock-test">
          <button className="btn btn-ghost gap-2">
            <ArrowLeft size={20} /> Quay lại
          </button>
        </Link>
      </div>

      <div className="card bg-base-100">
        <div className="card-body">
          <div className="flex items-center gap-6 mb-6">
            <div className="bg-gradient-to-br from-primary/20 to-secondary/20 p-6 rounded-xl">
              {mockTest.icon}
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">{mockTest.title}</h1>
              <p className="text-base-content/70 text-lg">
                {mockTest.description}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="stat bg-base-200 rounded-box p-4">
              <div className="stat-title">Thời gian</div>
              <div className="stat-value text-2xl">{mockTest.duration}</div>
            </div>
            <div className="stat bg-base-200 rounded-box p-4">
              <div className="stat-title">Số câu hỏi</div>
              <div className="stat-value text-2xl">
                {mockTest.questions} câu
              </div>
            </div>
            <div className="stat bg-base-200 rounded-box p-4">
              <div className="stat-title">Độ khó</div>
              <div className="stat-value text-2xl">{mockTest.difficulty}</div>
            </div>
          </div>

          <div className="space-y-6">
            {mockTest.sections.map((section) => (
              <div key={section.name} className="card bg-base-200">
                <div className="card-body">
                  <h3 className="card-title text-xl">
                    {section.name}
                    <div className="badge badge-primary">
                      {section.duration}
                    </div>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {section.parts.map((part) => (
                      <span key={part} className="badge badge-outline">
                        {part}
                      </span>
                    ))}
                  </div>
                  <p className="text-base-content/70">
                    {section.questions} câu hỏi
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="card-actions justify-end mt-8">
            <Link href={`/mock-test/${id}/attempt`}>
              <button className="btn btn-primary btn-lg">
                Bắt đầu làm bài
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockTestPage;
