import React from "react";
import { Users } from "lucide-react";

const Member = () => {
  const teachers = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      email: "teacher1@example.com",
      role: "Giáo viên",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
    },
  ];

  const students = [
    {
      id: 1,
      name: "Học sinh 1",
      email: "student1@example.com",
      role: "Học sinh",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Molly",
    },
    {
      id: 2,
      name: "Học sinh 2",
      email: "student2@example.com",
      role: "Học sinh",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Max",
    },
    {
      id: 3,
      name: "Học sinh 3",
      email: "student3@example.com",
      role: "Học sinh",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucy",
    },
  ];

  return (
    <div className="container mx-auto max-w-5xl py-24">
      <div className="card bg-base-100 card-bordered">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-6">Thành viên</h2>

          {/* Giáo viên */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Users size={20} className="text-primary" />
              <h3 className="text-lg font-medium">Giáo viên</h3>
            </div>

            <div className="divide-y">
              {teachers.map((teacher) => (
                <div
                  key={teacher.id}
                  className="py-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="avatar">
                      <div className="w-10 rounded-full">
                        <img src={teacher.avatar} alt={teacher.name} />
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">{teacher.name}</p>
                      <p className="text-sm text-base-content/70">
                        {teacher.email}
                      </p>
                    </div>
                  </div>
                  <span className="badge badge-primary">{teacher.role}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Học sinh */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Users size={20} className="text-primary" />
              <h3 className="text-lg font-medium">Học sinh</h3>
              <span className="badge badge-neutral">
                {students.length} học sinh
              </span>
            </div>

            <div className="divide-y">
              {students.map((student) => (
                <div
                  key={student.id}
                  className="py-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="avatar">
                      <div className="w-10 rounded-full">
                        <img src={student.avatar} alt={student.name} />
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-base-content/70">
                        {student.email}
                      </p>
                    </div>
                  </div>
                  <span className="badge">{student.role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Member;
