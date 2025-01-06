"use client";
import React from "react";
import { ArrowUpRight, Folder, Users, Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const defaultBackgrounds = [
  'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1470&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=1474&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1473&auto=format&fit=crop',
];

const getRandomBackground = () => {
  const randomIndex = Math.floor(Math.random() * defaultBackgrounds.length);
  return defaultBackgrounds[randomIndex];
};

const ClassesPage = () => {
  const [classesData, setClassesData] = useState<any[]>([]); // Lưu trữ lớp học
  const [filteredClasses, setFilteredClasses] = useState<any[]>([]); // Lưu trữ lớp học đã lọc
  const [courses, setCourses] = useState<any[]>([]); // Lưu trữ danh sách khóa học
  const [selectedCourse, setSelectedCourse] = useState<string>('all'); // Khóa học được chọn

  const fetchClasses = async () => {
    try {
      const userRoleString = localStorage.getItem('userRole');
      if (!userRoleString) {
        console.error('Không tìm thấy userRole trong localStorage');
        return;
      }

      const userRole = JSON.parse(userRoleString);
      const { idnguoidung } = userRole;
      if (!idnguoidung) {
        console.error('Không có idnguoidung trong userRole');
        return;
      }

      const response = await fetch("http://localhost:5000/api/getClassByIdTeacher", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idnguoidung }),
      });

      const data = await response.json();

      if (data.success) {
        const classes = data.data.data;
        setClassesData(classes);
        setFilteredClasses(classes);
        
        // Tạo danh sách khóa học duy nhất
        const uniqueCourses = Array.from(new Set(classes.map((item: any) => item.tenKhoaHoc)));
        setCourses(uniqueCourses);
      } else {
        console.error("Lỗi khi lấy dữ liệu lớp học:", data.message);
      }
    } catch (error) {
      console.error("Lỗi khi fetch lớp học:", error);
    }
  };

  // Hàm lọc lớp học
  const filterClasses = (courseId: string) => {
    setSelectedCourse(courseId);
    if (courseId === 'all') {
      setFilteredClasses(classesData);
    } else {
      const filtered = classesData.filter(classItem => classItem.tenKhoaHoc === courseId);
      setFilteredClasses(filtered);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  return (
    <div className="container mx-auto px-6">
      <div className="flex flex-row justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-left">Lớp học của tôi</h1>
          <p className="text-base text-base-content/70 mt-1">
            Quản lý và giảng dạy các lớp học của bạn
          </p>
        </div>

        {/* Phần lọc khóa học */}
        <div className="flex items-center gap-4">
          <select 
            className="select select-bordered w-full max-w-xs"
            value={selectedCourse}
            onChange={(e) => filterClasses(e.target.value)}
          >
            <option value="all">Tất cả khóa học</option>
            {courses.map((course, index) => (
              <option key={index} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
        {filteredClasses.map((classItem) => (
          <div
            key={classItem.id}
            className="card bg-base-100 shadow-md overflow-hidden transition-all duration-300 group hover:shadow-xl"
          >
            <div
              className="relative h-48"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url(${classItem.coverImage || getRandomBackground()})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundColor: '#1a365d',
              }}
            >
              <div className="absolute top-6 left-6 right-16">
                <h2 className="text-2xl font-bold text-white truncate mb-2">
                  {classItem.tenLop}
                </h2>
                <p className="text-base text-white/80">
                  Phòng: {classItem.phongHoc}
                </p>
                <p className="text-base text-white/80">
                  Tên khóa học: {classItem.tenKhoaHoc}
                </p>
              </div>
              <div className="absolute top-4 right-4">
                <div className="dropdown dropdown-end">
                  <button className="btn btn-ghost btn-circle text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        stroke="currentColor"
                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                      ></path>
                    </svg>
                  </button>
                  <ul className="dropdown-content z-[1] menu p-3 shadow-lg bg-base-100 rounded-box w-60">
                    <li>
                      <a className="text-base py-3">Xem chi tiết</a>
                    </li>
                    <li>
                      <a className="text-base py-3">Chỉnh sửa</a>
                    </li>
                    <li>
                      <a className="text-base text-error py-3">Xóa lớp học</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-6 border-t">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3 text-base-content/70">
                  <Users className="w-[22px] h-[22px]" />
                  <span className="text-base">{classItem.students}</span>
                </div>
                <div className="flex items-center gap-3 text-base-content/70">
                  <Folder className="w-[22px] h-[22px]" />
                  <span className="text-base">5</span>
                </div>
              </div>
              <Link
                href={`/classes/${classItem.idLop}?idKhoahoc=${classItem.idKhoaHoc}`}
                className="btn btn-ghost gap-2"
              >
                <ArrowUpRight className="w-[22px] h-[22px]" />
                <span className="text-base">Quản lý</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassesPage;