import React from "react";
import { FileText, MoreVertical, Plus } from "lucide-react";
import Link from "next/link";

interface PunishmentWritingProps {
  params: {
    id: string;
  };
}

const PunishmentWriting = ({ params }: PunishmentWritingProps) => {
  const punishments = [
    {
      id: 1,
      title: "Chép phạt về nội quy lớp học",
      dueDate: "2024-01-20",
      submissions: 18,
      totalStudents: 24,
      createdAt: "2024-01-10",
    },
    {
      id: 2,
      title: "Chép phạt về việc đi học muộn",
      dueDate: "2024-01-25",
      submissions: 0,
      totalStudents: 24,
      createdAt: "2024-01-15",
    },
    {
      id: 3,
      title: "Chép phạt về việc không làm bài tập",
      dueDate: "2024-01-30",
      submissions: 5,
      totalStudents: 24,
      createdAt: "2024-01-18",
    },
  ];

  return (
    <div className="container mx-auto max-w-5xl py-24">
      <div className="card bg-base-100 card-bordered">
        <div className="card-body">
          <div className="flex items-center justify-between mb-6">
            <h2 className="card-title text-2xl">Chép phạt</h2>
            <Link
              href={`/classes/${params.id}/punishment-writing/create`}
              className="btn btn-primary"
            >
              <Plus size={20} />
              Tạo bài chép phạt mới
            </Link>
          </div>

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
                            <span>
                              Đã nộp: {punishment.submissions}/
                              {punishment.totalStudents}
                            </span>
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
                          <Link
                            href={`/classes/${params.id}/punishment-writing/${punishment.id}`}
                          >
                            Xem chi tiết
                          </Link>
                        </li>
                        <li>
                          <a>Chỉnh sửa</a>
                        </li>
                        <li>
                          <a className="text-error">Xóa</a>
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
