"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";

interface Chapter {
    id: number;
    title: string;
    type: "Phát âm" | "Từ đồng nghĩa" | "Từ loại";
    description: string;
}

interface ClassesDetailPageProps {
    classId: string;
}

const ClassesDetailPage: React.FC<ClassesDetailPageProps> = ({ classId }) => {
    const searchParams = useSearchParams();
    const idKhoaHoc = searchParams.get("idKhoaHoc");
    const [chapters, setChapters] = React.useState<Chapter[]>([]);
    const [idChuong, setIdChuong] = React.useState("");
    const dataUnit = async () => {
        try {
            const res = await fetch(`http://localhost:5000/api/unit/${idKhoaHoc}/${classId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
    
            if (!res.ok) {
                throw new Error("Lỗi khi fetch dữ liệu");
            }
    
            const data = await res.json();
            console.log("Data unit:", data.data);
            setChapters(data.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    
    useEffect(() => {
        dataUnit();
    }, []);

    console.log("idKhoaHoc:", idKhoaHoc);
    console.log("classId:", classId);

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
                                        <span className="text-3xl font-bold">ddd</span>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <h1 className="text-2xl font-bold">Chào mừng tới lớp học</h1>\
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
                            {chapters.map((chapter) => (
                                <Link key={chapter.idChuong} href={`/classes/${classId}/chapter/${chapter.idChuong}?idKhoaHoc=${idKhoaHoc}`} className="card bg-base-100 card-bordered">
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
