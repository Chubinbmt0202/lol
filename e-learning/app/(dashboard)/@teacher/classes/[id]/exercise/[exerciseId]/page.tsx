import React from "react";
import { FileText, Volume2 } from "lucide-react";

interface ExerciseDetailPageProps {
  params: {
    id: string;
    exerciseId: string;
  };
}

const ExerciseDetailPage = ({ params }: ExerciseDetailPageProps) => {
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
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-medium">Câu hỏi 1/15</h3>
                      <p className="text-base-content/70">
                        Thời gian còn lại: 19:45
                      </p>
                    </div>
                    <button className="btn btn-primary">Nộp bài</button>
                  </div>

                  <div className="space-y-6">
                    <div className="prose max-w-none">
                      <p>
                        Read the following passage and choose the correct
                        answer:
                      </p>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="form-control">
                        <label className="label cursor-pointer justify-normal gap-4">
                          <input
                            type="radio"
                            name="answer"
                            className="radio radio-primary"
                          />
                          <span>Answer option 1</span>
                        </label>
                      </div>
                      <div className="form-control">
                        <label className="label cursor-pointer justify-normal gap-4">
                          <input
                            type="radio"
                            name="answer"
                            className="radio radio-primary"
                          />
                          <span>Answer option 2</span>
                        </label>
                      </div>
                      <div className="form-control">
                        <label className="label cursor-pointer justify-normal gap-4">
                          <input
                            type="radio"
                            name="answer"
                            className="radio radio-primary"
                          />
                          <span>Answer option 3</span>
                        </label>
                      </div>
                      <div className="form-control">
                        <label className="label cursor-pointer justify-normal gap-4">
                          <input
                            type="radio"
                            name="answer"
                            className="radio radio-primary"
                          />
                          <span>Answer option 4</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between mt-8">
                    <button className="btn btn-outline" disabled>
                      Câu trước
                    </button>
                    <button className="btn btn-primary">Câu tiếp theo</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="w-72">
              <div className="card bg-base-100 border border-base-300">
                <div className="card-body">
                  <h3 className="font-medium mb-4">Danh sách câu hỏi</h3>
                  <div className="grid grid-cols-5 gap-2">
                    {Array.from({ length: 15 }).map((_, i) => (
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
