import React from "react";
import { FileText, MoreVertical } from "lucide-react";

const PunishmentWriting = () => {
  const punishments = [
    {
      id: 1,
      title: "Chép phạt về nội quy lớp học",
      dueDate: "2024-01-20",
      status: "Đã nộp",
      times: "10/10",
      createdAt: "2024-01-10",
    },
    {
      id: 2,
      title: "Chép phạt về việc đi học muộn",
      dueDate: "2024-01-25",
      status: "Chưa nộp",
      times: "-/20",
      createdAt: "2024-01-15",
    },
    {
      id: 3,
      title: "Chép phạt về việc không làm bài tập",
      dueDate: "2024-01-30",
      status: "Chưa nộp",
      times: "-/15",
      createdAt: "2024-01-18",
    },
  ];

  return (
    <div className="container mx-auto max-w-5xl py-24">
      <div className="card bg-base-100 card-bordered">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-6">Chép phạt</h2>

          <div className="space-y-4">
            {punishments.map((punishment) => (
              <div
                key={punishment.id}
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
                          {punishment.title}
                        </h3>
                        <div className="text-sm text-base-content/70 mt-1 space-y-1">
                          <p>
                            Đăng ngày{" "}
                            {new Date(punishment.createdAt).toLocaleDateString(
                              "vi-VN"
                            )}
                          </p>
                          <p>
                            Hạn nộp:{" "}
                            {new Date(punishment.dueDate).toLocaleDateString(
                              "vi-VN"
                            )}
                          </p>
                          <div className="flex items-center gap-2">
                            <span
                              className={`badge ${
                                punishment.status === "Đã nộp"
                                  ? "badge-success"
                                  : "badge-error"
                              } badge-sm`}
                            >
                              {punishment.status}
                            </span>
                            <span>{punishment.times} lần</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="dropdown dropdown-end">
                      <label
                        tabIndex={0}
                        className="btn btn-ghost btn-sm btn-circle"
                      >
                        <MoreVertical size={18} />
                      </label>
                      <ul
                        tabIndex={0}
                        className="dropdown-content menu p-2 shadow-lg bg-base-100 rounded-box w-52"
                      >
                        <li>
                          <a className="text-base py-2">Xem chi tiết</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PunishmentWriting;
