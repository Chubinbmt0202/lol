import React from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface AttemptPageProps {
  params: Promise<{
    id: string;
  }>;
}

const AttemptPage = async ({ params }: AttemptPageProps) => {
  const { id } = await params;

  return (
    <div className="container mx-auto p-6 ">
      <div className="mb-8">
        <Link href={`/mock-test/${id}`} className="btn btn-ghost gap-2 mb-4">
          <ArrowLeft size={20} />
          Quay lại
        </Link>
        <h2 className="text-3xl font-bold mb-3">Bài thi thử</h2>
        <p className="text-base-content/70 text-lg">
          Hoàn thành các câu hỏi dưới đây trong thời gian quy định
        </p>
      </div>
      <div className="flex gap-6">
        {/* Main content */}
        <div className="flex-1">
          <div className="space-y-6">
            {/* Question 1 */}
            <div
              id="question-1"
              className="card bg-base-100 border border-base-300"
            >
              <div className="card-body">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-medium">Câu hỏi 1</h3>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="prose max-w-none">
                    <p>
                      Read the following passage and choose the correct answer:
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="form-control">
                      <label className="label cursor-pointer justify-normal gap-4">
                        <input
                          type="radio"
                          name="answer1"
                          className="radio radio-primary"
                        />
                        <span>Answer option 1</span>
                      </label>
                    </div>
                    <div className="form-control">
                      <label className="label cursor-pointer justify-normal gap-4">
                        <input
                          type="radio"
                          name="answer1"
                          className="radio radio-primary"
                        />
                        <span>Answer option 2</span>
                      </label>
                    </div>
                    <div className="form-control">
                      <label className="label cursor-pointer justify-normal gap-4">
                        <input
                          type="radio"
                          name="answer1"
                          className="radio radio-primary"
                        />
                        <span>Answer option 3</span>
                      </label>
                    </div>
                    <div className="form-control">
                      <label className="label cursor-pointer justify-normal gap-4">
                        <input
                          type="radio"
                          name="answer1"
                          className="radio radio-primary"
                        />
                        <span>Answer option 4</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Question 2 */}
            <div
              id="question-2"
              className="card bg-base-100 border border-base-300"
            >
              <div className="card-body">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-medium">Câu hỏi 2</h3>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="prose max-w-none">
                    <p>Choose the word that best completes the sentence:</p>
                    <p>
                      The company's profits _____ significantly over the past
                      year.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="form-control">
                      <label className="label cursor-pointer justify-normal gap-4">
                        <input
                          type="radio"
                          name="answer2"
                          className="radio radio-primary"
                        />
                        <span>have increased</span>
                      </label>
                    </div>
                    <div className="form-control">
                      <label className="label cursor-pointer justify-normal gap-4">
                        <input
                          type="radio"
                          name="answer2"
                          className="radio radio-primary"
                        />
                        <span>has increased</span>
                      </label>
                    </div>
                    <div className="form-control">
                      <label className="label cursor-pointer justify-normal gap-4">
                        <input
                          type="radio"
                          name="answer2"
                          className="radio radio-primary"
                        />
                        <span>had increased</span>
                      </label>
                    </div>
                    <div className="form-control">
                      <label className="label cursor-pointer justify-normal gap-4">
                        <input
                          type="radio"
                          name="answer2"
                          className="radio radio-primary"
                        />
                        <span>was increased</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Question 3 */}
            <div
              id="question-3"
              className="card bg-base-100 border border-base-300"
            >
              <div className="card-body">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-medium">Câu hỏi 3</h3>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="prose max-w-none">
                    <p>Listen to the audio and answer the question:</p>
                    <audio controls className="w-full">
                      <source src="/sample-audio.mp3" type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                    <p>What is the main topic of the conversation?</p>
                  </div>

                  <div className="space-y-4">
                    <div className="form-control">
                      <label className="label cursor-pointer justify-normal gap-4">
                        <input
                          type="radio"
                          name="answer3"
                          className="radio radio-primary"
                        />
                        <span>Travel plans</span>
                      </label>
                    </div>
                    <div className="form-control">
                      <label className="label cursor-pointer justify-normal gap-4">
                        <input
                          type="radio"
                          name="answer3"
                          className="radio radio-primary"
                        />
                        <span>Work schedule</span>
                      </label>
                    </div>
                    <div className="form-control">
                      <label className="label cursor-pointer justify-normal gap-4">
                        <input
                          type="radio"
                          name="answer3"
                          className="radio radio-primary"
                        />
                        <span>Family reunion</span>
                      </label>
                    </div>
                    <div className="form-control">
                      <label className="label cursor-pointer justify-normal gap-4">
                        <input
                          type="radio"
                          name="answer3"
                          className="radio radio-primary"
                        />
                        <span>Shopping list</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-72 sticky top-20 pb-20">
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

export default AttemptPage;
