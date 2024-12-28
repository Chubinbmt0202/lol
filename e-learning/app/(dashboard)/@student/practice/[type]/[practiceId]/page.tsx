import React from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface PracticePageProps {
  params: Promise<{
    practiceId: string;
    type: string;
  }>;
}

const PracticePage = async ({ params }: PracticePageProps) => {
  const { practiceId, type } = await params;

  return (
    <div className="container mx-auto p-6 ">
      <div className="mb-8">
        <Link href={`/practice/${type}`} className="btn btn-ghost gap-2 mb-4">
          <ArrowLeft size={20} />
          Quay lại
        </Link>
        <h2 className="text-3xl font-bold mb-3">Bài tập {type}</h2>
        <p className="text-base-content/70 text-lg">
          Hoàn thành các câu hỏi dưới đây trong thời gian quy định
        </p>
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
                    Read the following passage and choose the correct answer:
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
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
              <div className="text-xl font-medium mb-4">
                Thời gian còn lại:
                <div className="text-2xl font-bold">119:53</div>
              </div>

              <button className="btn btn-outline w-full mb-2">NỘP BÀI</button>
              <div className="text-red-500 mb-4">
                <a href="#" className="text-sm">
                  Khôi phục/lưu bài làm ›
                </a>
              </div>

              <div className="text-amber-500 text-sm mb-4">
                Chú ý: bạn có thể click vào số thứ tự câu hỏi trong bài để đánh
                dấu review
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Part 1</h3>
                  <div className="grid grid-cols-5 gap-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <button key={i} className="btn btn-sm btn-outline">
                        {i + 1}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Part 2</h3>
                  <div className="grid grid-cols-5 gap-2">
                    {Array.from({ length: 25 }).map((_, i) => (
                      <button key={i} className="btn btn-sm btn-outline">
                        {i + 7}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Part 3</h3>
                  <div className="grid grid-cols-5 gap-2">
                    {Array.from({ length: 30 }).map((_, i) => (
                      <button key={i} className="btn btn-sm btn-outline">
                        {i + 32}
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

export default PracticePage;
