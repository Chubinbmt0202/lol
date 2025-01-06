'use client';

import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { ArrowLeft, Plus, FileText, Clock } from "lucide-react";
import Link from "next/link";

interface Exercise {
  id: number;
  tenBaiHoc: string;
  ngayNopBai: string;
  trangThai: string;
}

export default function ChapterIdPage() {
  const params = useParams();
  const [classId, setClassId] = useState<string | undefined>(undefined);
  const [chapterId, setChapterId] = useState<string | undefined>(undefined);
  const [idKhoahoc, setIdKhoahoc] = useState<string | undefined>(undefined);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pathParts = pathname.split('/').filter(Boolean);

  //lấy thông tin người dùng trong local storage
  const userRole = JSON.parse(localStorage.getItem("userRole") || "{}");
  const userID = userRole.idnguoidung
  console.log("userID", userID);

  const fetchExercises = async () => {
    if (idKhoahoc && classId && chapterId) {
      const requestData = {
        idKhoaHoc: idKhoahoc,
        idLop: classId,
        idChuong: chapterId,
      };
      console.log("dữ liệu gửi đi student", requestData);

      try {
        const response = await fetch(`http://localhost:5000/api/getAllExcercise`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const dataEx = data.data;
        console.log("dataEx", dataEx);

        const groupedQuestions = dataEx.reduce((acc, question) => {
          const { tenBaiHoc, ngayNopBai } = question;
          if (!acc[tenBaiHoc]) {
            acc[tenBaiHoc] = [];
          }
          const formattedDate = new Date(ngayNopBai).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          });
          acc[tenBaiHoc].push({ ...question, ngayNopBai: formattedDate });
          return acc;
        }, {});

        const result = Object.keys(groupedQuestions).map(key => ({
          tenBaiHoc: key,
          ngayNopBai: groupedQuestions[key][0].ngayNopBai,
          questions: groupedQuestions[key]
        }));

        console.log("kết quả là", result);
        // setExercises(result);
        localStorage.setItem('exercisesResult', JSON.stringify(result));
      } catch (error) {
        console.error('Failed to fetch exercises:', error);
      }

      //sd/////////////////////////////////////

      try {
        const responseSubmitdata = await fetch('http://localhost:5000/api/getAllExcerciseSubmited', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ idChuong: chapterId, idNguoiDung: userID, idKhoaHoc: idKhoahoc, idLop: classId }), // Đảm bảo userID là một số
        });
    
        if (!responseSubmitdata.ok) {
            throw new Error(`Server error: ${responseSubmitdata.status} ${responseSubmitdata.statusText}`);
        }
    
        const submissions = await responseSubmitdata.json();
        console.log('Exercise submissions:', submissions);
        setExercises(submissions.data);
    } catch (error) {
        console.error('Failed to fetch exercises submit:', error);
    }
    }
  };

  useEffect(() => {
    const [resource, classId, section, chapterId] = pathParts;
    const idChuong = searchParams.get('idKhoaHoc');
    console.log("Path parts in chapter student:", idChuong);

    const parts = idChuong?.split("?") || [];
    const mainId = parts[0];
    const queryParams = parts.length > 1 ? parts[1].split("=") : [];
    const idKhoaHoc = queryParams.length > 1 ? queryParams[1] : undefined;

    console.log("Pathname in chapter atudent:", idChuong);
    console.log("Resource in chapter student:", resource);  // classes
    console.log("Class ID in chapter student:", classId);   // 3
    console.log("Chapter ID in chapter student:", chapterId); // 3
    console.log("idKhoaHoc in chapter student:", idKhoaHoc); // 1

    setClassId(classId);
    setChapterId(chapterId);
    setIdKhoahoc(idChuong);

    // Store values in localStorage
    localStorage.setItem('classId', classId || '');
    localStorage.setItem('chapterId', chapterId || '');
    localStorage.setItem('idKhoahoc', idChuong || '');

  }, [pathname, searchParams]);

  useEffect(() => {
    fetchExercises();
  }, [classId, chapterId, idKhoahoc]);

  return (
    <div className="container mx-auto max-w-7xl p-4 mt-16">
      <div className="mb-8 border border-base-200 px-4 py-6 rounded-lg">
        <Link 
          href={`/classes/${params.id}`} 
          className="btn btn-ghost gap-2 pl-0 mb-4"
        >
          <ArrowLeft size={20} />
          Quay lại
        </Link>
        <div>
        <h1 className="text-2xl font-bold text-primary">Chương 1: Phát âm</h1>
          <div className="flex items-center gap-2 text-sm text-base-content/70 mb-1">
            <span>Chào mừng tới lớp : 1131</span>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Tài liệu</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="card bg-base-100 border hover:shadow-md transition-all">
              <div className="card-body p-4">
                <FileText className="w-8 h-8 text-primary mb-2" />
                <h3 className="font-medium">Tài liệu {item}</h3>
                <p className="text-sm text-base-content/70">PDF • 2.5MB</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Bài tập đã giao</h2>
        </div>
        <div className="space-y-3">
          {exercises.map((exercise, index) => (
            <Link key={index} href={`/classes/${classId}/exercise/${index}?chapter=${chapterId}?baitap=${index}?idKhoaHoc=${idKhoahoc}`}>
              <div className="card bg-base-100 border hover:shadow-md transition-all">
                <div className="card-body p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <h3 className="font-medium">{exercise.tenBaiHoc}</h3>
                    </div>
                    <div className="flex items-center gap-2 text-base-content/70">
                      <Clock size={16} />
                      <span className="text-sm">Đến hạn: {exercise.ngayNopBai} ||</span>

                      {
                        exercise.trangThai === "Chưa nộp" ? (
                          <span className="text-sm text-red-500">Chưa nộp</span>
                        ) : (
                          <span className="text-sm text-green-500">Đã nộp</span>
                        )
                      }
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}