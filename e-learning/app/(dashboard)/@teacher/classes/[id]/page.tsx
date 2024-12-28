"use client";

import React from "react";
import { useRouter, usePathname, useSearchParams } from 'next/navigation'; // Thêm useSearchParams
import Link from "next/link";
import { useEffect, useState } from "react";

interface Chapter {
  id: number;
  title: string;
  type: 'Phát âm' | 'Từ đồng nghĩa' | 'Từ loại';
  description: string;
}


const ClassesDetailPage = () => {
  const router = useRouter();
  const pathname = usePathname(); // Lấy đường dẫn hiện tại
  const searchParams = useSearchParams(); // Lấy query string từ URL
  const [unitData, setUnitData] = useState<any[]>([]); // Để lưu trữ dữ liệu chương trình học

  // Lấy giá trị của idKhoahoc từ query string
  const idKhoahoc = searchParams.get("idKhoahoc");

  console.log("Course ID (from query string):", idKhoahoc); // In ra giá trị của idKhoahoc từ query string

  // Nếu bạn muốn lấy 'id' từ phần path của URL (ví dụ: "/classes/3")
  const pathId = pathname.split('/')[2]; // Tách lấy id từ path (ví dụ: 3)

  // Log ID từ path
  console.log("Class ID (from path):", pathId); // In ra ID từ path

  const fetchDataUnit = async () =>{
    try {
      const response = await fetch(`http://localhost:5000/api/unit/${idKhoahoc}/${pathId}`);
      const data = await response.json();
      console.log("Dữ liệu chương trình học:", data.data);
      setUnitData(data.data); // Gán dữ liệu chương trình học vào state
    } catch (error) {
      console.error("Lỗi khi fetch dữ liệu chương trình học:", error);
    }
  };

  useEffect(() => {
    fetchDataUnit(); // Gọi API khi component mount
  }, []); // Thêm idKhoahoc vào dependency array

  const handleDetailUnit = (idChapter: number,  idChuong: number, idKhoaHoc: number) => {
    console.log('Detail unit:', idChapter);
    window.location.href = `/classes/${pathId}/chapter/${idChuong}?idChuong=${idChuong}?idKhoaHoc=${idKhoaHoc}`;  // Chuyển hướng đến /chapter/id
  }

  return (
    <div>
      <div className="container mx-auto max-w-7xl">
        <div className="mt-16">
          <div className="p-4">
            {/* Welcome Message */}
            <div className="hero bg-gradient-to-r from-primary/10 to-secondary/10 rounded-box mb-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
              <div className="hero-content flex-col lg:flex-row py-6 gap-6">
                <div className="avatar placeholder relative">
                  <div className="bg-primary text-primary-content rounded-full w-20 h-20 ring ring-primary ring-offset-base-100 ring-offset-2">
                    <span className="text-3xl font-bold">1131</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-2xl font-bold">Chào mừng tới lớp học</h1>
                    <div className="badge badge-primary">2023-2024</div>
                  </div>
                  <p className="py-2 text-base-content/70 flex items-center gap-2">
                    <span>Cùng bắt đầu hành trình học tập của bạn</span>
                  </p>
                  <div className="flex gap-2 mt-2">
                    <div className="badge badge-outline gap-2">
                      <div className="w-2 h-2 rounded-full bg-success"></div>
                      Online
                    </div>
                    <div className="badge badge-outline gap-2">
                      <div className="w-2 h-2 rounded-full bg-warning"></div>
                      5 Chapters
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Chapter Section Title */}
            <h2 className="text-lg font-medium mb-4">Các chương trình có trong lớp học</h2>

            {/* Chapters Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {unitData.map((chapter, index) => (
                <Link key={index} href={"#"} onClick={() => handleDetailUnit(chapter.idLop, chapter.idChuong, chapter.idKhoaHoc)} className="card bg-base-100 card-bordered">
                  <div className="card-body">
                    <h3 className="card-title text-primary">{chapter.tenChuong}</h3>
                    <div className="divider"></div>
                    <p className="text-sm text-base-content/70">{chapter.moTa}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassesDetailPage;
