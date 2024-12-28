"use client";
import React, { useState, useEffect } from "react";

interface Class {
    idLop: number | null;
    tenLop: string | null;
    soLuongHocVien: number | null;
    ngayMoLop: string | null;
    ngayKetThuc: string | null;
    phongHoc: string | null;
    tenGiaoVien: string | null;
    trangThaiGiaoVien: string | null;
    ngayHoc: string | null;
    gioHoc: string | null;
    gioKetThuc: string | null;
}

interface Course {
    idKhoaHoc: number;
    tenKhoaHoc: string;
    moTaKhoaHoc: string;
    hocPhi: string;
    classes: Class[];
}

const CourseList = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [selectedClass, setSelectedClass] = useState<string | null>(null); // Lớp học được chọn
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
    });

    const fetchCourseDetails = async (course: Course) => {
        console.log("Lấy chi tiết khóa học:", course.idKhoaHoc);
        try {
            const response = await fetch(`http://localhost:5000/api/getDetailByCourseId/${course.idKhoaHoc}`);
            const data = await response.json();
            console.log("Chi tiết khóa học:", data.data.data);
            setSelectedCourse(data.data.data);
        } catch (error) {
            console.error("Lỗi khi lấy chi tiết khóa học:", error);
        }
    };

    // Gọi API lấy danh sách khóa học
    const fetchCourses = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/getAllCourse");
            const data = await response.json();
            setCourses(data.data.data);
        } catch (error) {
            console.error("Lỗi khi lấy khóa học:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    // Xử lý khi click vào một khóa học
    const fetchCourseDetail = (course: Course) => {
        fetchCourseDetails(course);
    };

    // Xử lý khi click "Đăng ký"
    const handleRegisterClick = (course: Course) => {
        fetchCourseDetail(course);
        setIsVisible(true);
    };

    // Đóng modal
    const closeModal = () => {
        setSelectedCourse(null);
        setSelectedClass(null);
        setFormData({ name: "", email: "", phone: "" });
    };

    // Xử lý thay đổi form
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedClass(e.target.value);  // Lưu idLop vào state
        console.log("idLớp học được chọn:", e.target.value);
    };
    

    // Gửi form
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedClass) {
            alert("Vui lòng chọn lớp học!");
            return;
        }

        // Lấy thông tin người dùng từ localStorage
        const userRole = localStorage.getItem("userRole");
        const parsedUserRole = userRole ? JSON.parse(userRole) : null;
        const idNguoiDung = parsedUserRole?.idnguoidung;

        // Lấy thời gian hiện tại
        const thoiGianDangKy = new Date().toISOString();  // Lấy thời gian hiện tại theo định dạng ISO

        // Log thông tin đăng ký
        console.log("Thông tin đăng ký:", {
            idKhoaHoc: selectedCourse?.idKhoaHoc,
            idLop: selectedClass,
            idNguoiDung: idNguoiDung,
            thoiGianDangKy: thoiGianDangKy,
            trangThaiThanhToan: "Chưa thanh toán",
        });

        // Gọi API để gửi thông tin đăng ký
        fetch("http://localhost:5000/api/course", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                idKhoaHoc: selectedCourse?.idKhoaHoc,
                idLop: selectedClass,
                idNguoiDung: idNguoiDung,
                thoiGianDangKy: thoiGianDangKy,
                trangThaiThanhToan: "Chưa thanh toán",
                ...formData,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                alert("Đăng ký thành công!");
                closeModal();
            })
            .catch((error) => {
                console.error("Lỗi đăng ký:", error);
                alert("Đăng ký thất bại!");
            });
    };

    return (
        <div className="container mx-auto px-6">
            <h1 className="text-3xl font-bold mb-6">Danh sách khóa học</h1>

            {loading ? (
                <p>Đang tải khóa học...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {courses.map((course) => (
                        <div
                            key={course.idKhoaHoc}
                            className="card bg-base-100 card-bordered shadow-lg p-6"
                        >
                            <h2 className="text-xl font-semibold">{course.tenKhoaHoc}</h2>
                            <p className="text-sm mt-2">{course.moTaKhoaHoc}</p>
                            <button
                                className="btn btn-primary mt-4"
                                onClick={() => handleRegisterClick(course)}
                            >
                                Đăng ký khóa học
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {isVisible && selectedCourse && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl flex">
                        {/* Phần bên trái: Thông tin khóa học */}
                        <div className="w-1/2 pr-6">
                            <h2 className="text-2xl font-bold mb-4 text-center">Thông tin khóa học</h2>

                            <h3 className="text-xl font-semibold">{selectedCourse.tenKhoaHoc}</h3>
                            <p className="text-sm text-gray-600 mt-2">{selectedCourse.moTaKhoaHoc}</p>
                            <p className="mt-4 font-semibold">Học phí: {selectedCourse.hocPhi}</p>

                            <div className="mt-4">
                                <label className="block text-sm font-medium mb-2">Chọn lớp học</label>
                                <select
                                    className="select select-bordered w-full"
                                    value={selectedClass || ""}
                                    onChange={handleClassChange}
                                >
                                    <option value="" disabled>Chọn lớp học</option>
                                    {selectedCourse.classes.length > 0 ? (
                                        // Nhóm các lớp học có cùng tên lại
                                        Object.values(
                                            selectedCourse.classes.reduce((acc, classItem) => {
                                                const className = classItem.tenLop || "Không tên lớp"; // Lấy tên lớp, hoặc "Không tên lớp" nếu không có
                                                if (!acc[className]) {
                                                    acc[className] = [];
                                                }
                                                acc[className].push(classItem);
                                                return acc;
                                            }, {} as Record<string, Class[]>)
                                        ).map((classGroup, index) => {
                                            // Tạo chuỗi hiển thị tất cả thời gian học cho mỗi lớp
                                            const classTimes = classGroup
                                                .map((classItem) => `${classItem.ngayHoc} ${classItem.gioHoc} - ${classItem.gioKetThuc}`)
                                                .join(" và ");

                                            return (
                                                <option key={classGroup[0].idLop} value={classGroup[0].idLop || ""}>
                                                    {classGroup[0].tenLop} | {classTimes}
                                                </option>

                                            );
                                        })
                                    ) : (
                                        <option disabled>Không có lớp học nào</option>
                                    )}
                                </select>
                            </div>


                        </div>

                        {/* Phần bên phải: Form đăng ký */}
                        <div className="w-1/2 pl-6">
                            <h2 className="text-2xl font-bold mb-4 text-center">Thông tin học viên</h2>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Họ và tên</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="input input-bordered w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="input input-bordered w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Số điện thoại</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="input input-bordered w-full"
                                    />
                                </div>
                                <div className="flex justify-end gap-4 mt-6">
                                    <button
                                        type="button"
                                        className="btn btn-ghost"
                                        onClick={() => setIsVisible(false)}
                                    >
                                        Hủy
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        Xác nhận đăng ký
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CourseList;
