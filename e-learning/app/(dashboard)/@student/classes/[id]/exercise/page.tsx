import React from "react";
import { FileText, MoreVertical } from "lucide-react";
import Link from "next/link";
interface Exercise {
  id: number;
  title: string;
  dueDate: string;
  status: string;
  points: string;
  createdAt: string;
}

interface ExercisePageProps {
  params: {
    id: string;
  };
}

const ExercisePage = ({ params }: ExercisePageProps) => {
  const exercises: Exercise[] = [
    {
      id: 1,
      title: "Bài tập về động vật",
      dueDate: "2024-01-20",
      status: "Đã nộp",
      points: "10/10",
      createdAt: "2024-01-10",
    },
    {
      id: 2,
      title: "Bài tập về thì hiện tại đơn",
      dueDate: "2024-01-25",
      status: "Chưa nộp",
      points: "-/10",
      createdAt: "2024-01-15",
    },
    {
      id: 3,
      title: "Bài tập về từ vựng Unit 1",
      dueDate: "2024-01-30",
      status: "Chưa nộp",
      points: "-/10",
      createdAt: "2024-01-18",
    },
  ];

  return (
    <div className="container mx-auto max-w-5xl py-24">
      <div className="card bg-base-100 card-bordered">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-6">Bài tập</h2>

          <div className="space-y-4">
            {exercises.map((exercise) => (
              <Link
                href={`/classes/${params.id}/exercise/${exercise.id}`}
                key={exercise.id}
                className="card bg-base-100 border hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="card-body">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <div className="mt-1">
                        <FileText size={24} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg hover:text-primary transition-colors">
                          {exercise.title}
                        </h3>
                        <div className="text-sm text-base-content/70 mt-1 space-y-1">
                          <p>
                            Đăng ngày{" "}
                            {new Date(exercise.createdAt).toLocaleDateString(
                              "vi-VN"
                            )}
                          </p>
                          <p>
                            Hạn nộp:{" "}
                            {new Date(exercise.dueDate).toLocaleDateString(
                              "vi-VN"
                            )}
                          </p>
                          <div className="flex items-center gap-2">
                            <span
                              className={`badge ${
                                exercise.status === "Đã nộp"
                                  ? "badge-success"
                                  : "badge-error"
                              } badge-sm`}
                            >
                              {exercise.status}
                            </span>
                            <span>{exercise.points} điểm</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="dropdown dropdown-end">
                      <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-sm btn-circle"
                      >
                        <MoreVertical size={18} />
                      </div>
                      <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                      >
                        <li>
                          <Link
                            href={`/classes/${params.id}/exercise/${exercise.id}`}
                          >
                            Xem chi tiết
                          </Link>
                        </li>
                        <li>
                          <Link
                            href={`/classes/${params.id}/exercise/${exercise.id}`}
                          >
                            Nộp bài
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExercisePage;
