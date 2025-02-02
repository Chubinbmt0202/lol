"use client"

import React, { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { ArrowLeft, FileText, Clock } from "lucide-react";
import Link from "next/link";
import { UploadDocumentButton } from "../../_components/UploadDocumentButton";

interface Exercise {
  id: number;
  tenBaiHoc: string;
  dueDate?: string;
  questions: Question[];
}

interface Question {
  id: number;
  questionText: string;
}

export default function ChapterIdPage() {
  const [classId, setClassId] = useState<string | undefined>(undefined);
  const [chapterId, setChapterId] = useState<string | undefined>(undefined);
  const [idKhoahoc, setIdKhoahoc] = useState<string | undefined>(undefined);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pathParts = pathname.split('/').filter(Boolean);
  const router = useRouter();

  const fetchExercises = async () => {
    if (idKhoahoc && classId && chapterId) {
      const requestData = {
        idKhoaHoc: idKhoahoc,
        idLop: classId,
        idChuong: chapterId,
      };
      console.log("dữ liệu gửi đi", requestData);

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

        const groupedQuestions = dataEx.reduce((acc, question) => {
          const { tenBaiHoc } = question;
          if (!acc[tenBaiHoc]) {
            acc[tenBaiHoc] = [];
          }
          acc[tenBaiHoc].push(question);
          return acc;
        }, {});

        const result = Object.keys(groupedQuestions).map(key => ({
          tenBaiHoc: key,
          questions: groupedQuestions[key]
        }));

        console.log("kết quả là", result);
        setExercises(result);
      } catch (error) {
        console.error('Failed to fetch exercises:', error);
      }
    }
  };

  useEffect(() => {
    const [resource, classId, section, chapterId] = pathParts;
    const idChuong = searchParams.get('idChuong');

    const parts = idChuong?.split("?") || [];
    const mainId = parts[0];
    const queryParams = parts.length > 1 ? parts[1].split("=") : [];
    const idKhoaHoc = queryParams.length > 1 ? queryParams[1] : undefined;

    console.log("Pathname in chapter:", pathname);
    console.log("Resource in chapter:", resource);  // classes
    console.log("Class ID in chapter:", classId);   // 3
    console.log("Chapter ID in chapter:", chapterId); // 3
    console.log("idKhoaHoc in chapter:", idKhoaHoc); // 1

    setClassId(classId);
    setChapterId(chapterId);
    setIdKhoahoc(idKhoaHoc);
  }, [pathname, searchParams]);

  useEffect(() => {
    fetchExercises();
  }, [classId, chapterId, idKhoahoc]);

  return (
    <div className="container mx-auto max-w-7xl p-4 mt-16">
      <div className="mb-8 border border-base-200 px-4 py-6 rounded-lg">
        <Link 
          href={`/classes/${classId}`} 
          className="btn btn-ghost gap-2 pl-0 mb-4"
        >
          <ArrowLeft size={20} />
          Quay lại
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-primary">Chương 1: </h1>
          <div className="flex items-center gap-2 text-sm text-base-content/70 mb-1">
            <span>Chương ID: {chapterId}</span>
            <span>Lớp học ID: {classId}</span>
            <span>Khóa học ID: {idKhoahoc}</span>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Tài liệu</h2>
          <UploadDocumentButton />
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
          <Link
            href={`/classes/${classId}/chapter/${chapterId}/create-exercise?idKhoaHoc=${idKhoahoc}`}
            className="btn btn-outline btn-primary"
          >
            Tạo bài tập
          </Link>
        </div>
        <div className="space-y-3">
          {exercises.map((exercise) => (
            <div 
              key={exercise.id}
              className="card bg-base-100 border hover:shadow-md transition-all"
              onClick={() => router.push(`/classes/${classId}/exercise/${exercise.id}`)}
            >
              <div className="card-body p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <h3 className="font-medium">{exercise.tenBaiHoc}</h3>
                  </div>
                  <div className="flex items-center gap-2 text-base-content/70">
                    <Clock size={16} />
                    <span className="text-sm">Đến hạn: {exercise.dueDate}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}