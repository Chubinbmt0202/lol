"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from 'next/navigation'; 
import Link from "next/link";

interface Chapter {
  id: number;
  title: string;
  type: 'Phát âm' | 'Từ đồng nghĩa' | 'Từ loại';
  description: string;
}

interface Exam {
  id: number;
  title: string;
  duration: number; // Duration in minutes
  idKhoahoc: number; // Add idKhoahoc to Exam interface
}

const ClassesDetailPage = () => {
  const router = useRouter();
  const pathname = usePathname(); 
  const searchParams = useSearchParams(); 
  const [unitData, setUnitData] = useState<Chapter[]>([]); 
  const [examData, setExamData] = useState<Exam[]>([]); // State to store exam data
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null); // State to store selected exam
  const [examDuration, setExamDuration] = useState<number>(0); // State to store exam duration
  const [examName, setExamName] = useState<string>(''); // State to store exam name
  const [bode, setDataBode] = useState<any>([]); // State to store exam data
  const [createdExams, setCreatedExams] = useState<Exam[]>([]); // State to store created exams
  const [kiemtra, setKiemTra] = useState<any>([]); // State to store exam data

  const idKhoahoc = parseInt(searchParams.get("idKhoahoc") || '0');

  console.log("Course ID (from query string):", idKhoahoc); 

  const pathId = pathname.split('/')[2]; 

  console.log("Class ID (from path):", pathId); 

  const fetchDataUnit = async () =>{
    try {
      const response = await fetch(`http://localhost:5000/api/unit/${idKhoahoc}/${pathId}`);
      const data = await response.json();
      console.log("Dữ liệu chương trình học:", data.data);
      setUnitData(data.data); 
    } catch (error) {
      console.error("Lỗi khi fetch dữ liệu chương trình học:", error);
    }
  };

  const fetchExamData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/exams/${idKhoahoc}`);
      const data = await response.json();
      console.log("Dữ liệu bộ đề:", data.data);
      setExamData(data.data); 
    } catch (error) {
      console.error("Lỗi khi fetch dữ liệu bộ đề:", error);
    }
  };

  useEffect(() => {
    fetchDataUnit(); 
    fetchExamData(); // Fetch exam data when component mounts
  }, []); 

  const handleDetailUnit = (idChapter: number, idChuong: number, idKhoaHoc: number) => {
    console.log('Detail unit:', idChapter);
    window.location.href = `/classes/${pathId}/chapter/${idChuong}?idChuong=${idChuong}&idKhoaHoc=${idKhoaHoc}`;  
  }

  const fetchExam = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/addAllCourse/${idKhoahoc}`, {
          method: 'POST', // Use the POST method
          headers: {
              'Content-Type': 'application/json' // Specify the content type
          },
          
      });
      const data = await response.json();
      console.log("Dữ liệu bộ đề:", data);
      setDataBode(data);
      } catch (error) {
        
        console.error("Lỗi khi fetch dữ liệu bộ đề:", error);
      }
  }

  const layBaiKiemTra = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/LayBaiKiemTra`);
      const data = await response.json();
      console.log("Dữ liệu bài kiểm tra:", data.data);
      setKiemTra(data.data);
    } catch (error) {
      console.error("Lỗi khi fetch dữ liệu bài kiểm tra:", error);
    }
  }

  useEffect(() => {
    fetchExam(); // Fetch exam data when component mounts
    layBaiKiemTra(); // Fetch exam data when component mounts
  }, []);

  const handleSelectExam = (exam: Exam) => {
    setSelectedExam(exam);
    setExamDuration(exam.duration);
  }

  const handleStartExam = () => {
    if (selectedExam) {
      const newExam = { ...selectedExam, title: examName, duration: examDuration, idKhoahoc: idKhoahoc };
      console.log('Selected exam:', selectedExam);
      console.log('Exam duration:', examDuration);
      console.log('Exam name:', examName);
      console.log('Course ID:', idKhoahoc);
      // Add the selected exam to the created exams state
      setCreatedExams([...createdExams, newExam]);
      // Log the created exam information
      console.log('Created exam:', newExam);
  
      try {
        fetch('http://localhost:5000/api/createTest', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            idBoDe: selectedExam.idBoDe,
            title: examName,
            duration: examDuration,
            idNguoiDung: 3,  // Ensure this is the correct user ID
            idKhoaHoc: idKhoahoc,
          })
        })
        .then(response => response.json())
        .then(data => {
          console.log("Server response:", data);
          if (data.message === 'Tạo bài kiểm tra thành công.') {
            alert('Bài kiểm tra đã được tạo thành công!');
          } else {
            alert('Đã xảy ra lỗi khi tạo bài kiểm tra. Vui lòng thử lại.');
          }
        });
      } catch (error) {
        console.error("Lỗi khi tạo bài kiểm tra:", error);
      }
  
      // Close the modal
      document.getElementById("create-exam-modal")?.classList.remove("modal-open");
      // Reset exam name
      setExamName('');
    }
  }

  const handleExamClick = (pathId, examId: number) => {
    router.push(`/classes/${pathId}/exam/${examId}`);
  }

  return (
    <div>
      <div className="container mx-auto max-w-7xl">
        <div className="mt-16">
          <div className="p-4">
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

            <h2 className="text-lg font-medium mb-4">Các chương trình có trong lớp học</h2>

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

            <h2 className="text-lg font-medium mt-4">Các đề thi đã tạo trong lớp học</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {kiemtra.map((exam, index) => (
                <div key={index} className="card bg-base-100 card-bordered pointer" onClick={() => handleExamClick(pathId, exam.idKiemTra)}>
                  <div className="card-body">
                    <h3 className="card-title text-primary">{exam.title}</h3>
                    <p>Thời gian làm bài: {exam.duration} phút</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal for creating exam */}
      <div className="modal" id="create-exam-modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Chọn bộ đề và đặt thời gian làm bài</h3>
          <div className="py-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Tên bài kiểm tra</span>
              </label>
              <input 
                type="text" 
                className="input input-bordered" 
                value={examName} 
                onChange={(e) => setExamName(e.target.value)} 
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Chọn bộ đề</span>
              </label>
              <select className="select select-bordered" onChange={(e) => {
                  const selectedId = parseInt(e.target.value);
                  const selected = bode.find((exam: Exam) => exam.idBoDe === selectedId);
                  if (selected) handleSelectExam(selected);
                }}>
                <option value="" disabled selected>Chọn bộ đề</option>
                {bode.map((exam: Exam, index: number) => (
                  <option key={exam.idBoDe} value={exam.idBoDe}>{exam.tenBoDe}</option>
                ))}
              </select>
            </div>
            {selectedExam && (
              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Thời gian làm bài (phút)</span>
                </label>
                <input 
                  type="number" 
                  className="input input-bordered" 
                  value={examDuration} 
                  onChange={(e) => setExamDuration(parseInt(e.target.value))} 
                  min="1" 
                />
              </div>
            )}
          </div>
          <div className="modal-action">
            <button className="btn" onClick={handleStartExam}>Bắt đầu làm bài</button>
            <button className="btn btn-outline" onClick={() => document.getElementById("create-exam-modal")?.classList.remove("modal-open")}>Đóng</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassesDetailPage;