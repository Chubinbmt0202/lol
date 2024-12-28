import React from "react";
import {
  BookOpen,
  Brain,
  Lightbulb,
  Headphones,
  Pencil,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

interface ListPracticeProps {
  params: Promise<{
    type: string;
  }>;
}

const ListPractice = async ({ params }: ListPracticeProps) => {
  const { type } = await params;

  const exercises = [
    {
      id: 1,
      title:
        type === "vocabulary"
          ? "Basic Vocabulary"
          : type === "grammar"
          ? "Present Simple"
          : type === "reading"
          ? "Reading Comprehension Level 1"
          : type === "listening"
          ? "Listening Practice 1"
          : "Writing Task 1",
      description: "Bài tập cơ bản cho người mới bắt đầu",
      duration: "15 phút",
      questions: 10,
      difficulty: "Dễ",
      icon:
        type === "vocabulary" ? (
          <Lightbulb className="w-6 h-6" />
        ) : type === "grammar" ? (
          <Brain className="w-6 h-6" />
        ) : type === "reading" ? (
          <BookOpen className="w-6 h-6" />
        ) : type === "listening" ? (
          <Headphones className="w-6 h-6" />
        ) : (
          <Pencil className="w-6 h-6" />
        ),
    },
    {
      id: 2,
      title:
        type === "vocabulary"
          ? "Intermediate Vocabulary"
          : type === "grammar"
          ? "Past Tenses"
          : type === "reading"
          ? "Reading Comprehension Level 2"
          : type === "listening"
          ? "Listening Practice 2"
          : "Writing Task 2",
      description:
        "Bài tập trung bình phù hợp cho học viên đã có kiến thức nền tảng",
      duration: "20 phút",
      questions: 15,
      difficulty: "Trung bình",
      icon:
        type === "vocabulary" ? (
          <Lightbulb className="w-6 h-6" />
        ) : type === "grammar" ? (
          <Brain className="w-6 h-6" />
        ) : type === "reading" ? (
          <BookOpen className="w-6 h-6" />
        ) : type === "listening" ? (
          <Headphones className="w-6 h-6" />
        ) : (
          <Pencil className="w-6 h-6" />
        ),
    },
    {
      id: 3,
      title:
        type === "vocabulary"
          ? "Advanced Vocabulary"
          : type === "grammar"
          ? "Complex Structures"
          : type === "reading"
          ? "Reading Comprehension Level 3"
          : type === "listening"
          ? "Listening Practice 3"
          : "Writing Task 3",
      description: "Bài tập nâng cao dành cho học viên muốn thử thách",
      duration: "30 phút",
      questions: 20,
      difficulty: "Khó",
      icon:
        type === "vocabulary" ? (
          <Lightbulb className="w-6 h-6" />
        ) : type === "grammar" ? (
          <Brain className="w-6 h-6" />
        ) : type === "reading" ? (
          <BookOpen className="w-6 h-6" />
        ) : type === "listening" ? (
          <Headphones className="w-6 h-6" />
        ) : (
          <Pencil className="w-6 h-6" />
        ),
    },
  ];

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <Link href="/practice" className="btn btn-ghost gap-2 mb-4">
          <ArrowLeft size={20} />
          Quay lại
        </Link>
        <h2 className="text-3xl font-bold mb-3">Danh sách bài tập {type}</h2>
        <p className="text-base-content/70 text-lg">
          Chọn một bài tập phù hợp với trình độ của bạn
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {exercises.map((exercise) => (
          <Link
            href={`/practice/${type}/${exercise.id}`}
            key={exercise.id}
            className="relative h-[300px] rounded-lg border border-base-300 bg-base-100 hover:shadow-md transition-shadow overflow-hidden group"
          >
            <div className="h-28 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <div className="p-4 bg-base-100 rounded-full">
                {exercise.icon}
              </div>
            </div>

            <div className="p-6">
              <h3 className="font-medium text-lg mb-2 group-hover:text-primary transition-colors">
                {exercise.title}
              </h3>
              <p className="text-base-content/70 text-sm mb-4">
                {exercise.description}
              </p>

              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  <div className="text-xs text-base-content/70">
                    <span className="font-medium">{exercise.duration}</span>
                  </div>
                  <div className="text-xs text-base-content/70">•</div>
                  <div className="text-xs text-base-content/70">
                    <span className="font-medium">
                      {exercise.questions} câu hỏi
                    </span>
                  </div>
                  <div className="text-xs text-base-content/70">•</div>
                  <div className="text-xs text-base-content/70">
                    <span className="font-medium">
                      Độ khó: {exercise.difficulty}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ListPractice;
