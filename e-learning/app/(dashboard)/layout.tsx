"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";  // Sử dụng app router

interface DashboardLayoutProps {
  student: React.ReactNode;
  teacher: React.ReactNode;
}

const checkUserRole = () => {
  if (typeof window !== "undefined") {
    const userRole = localStorage.getItem("userRole");
    if (userRole) {
      const parsedRole = JSON.parse(userRole); // Giả sử dữ liệu lưu trong localStorage là JSON
      return parsedRole.vaitro || "guest";  // Trả về vaitro hoặc guest nếu không có
    }
  }
  return "guest";  // Nếu không tìm thấy dữ liệu
};

const DashboardLayout = ({ student, teacher }: DashboardLayoutProps) => {
  const [userRole, setUserRole] = useState("guest");
  const router = useRouter();

  useEffect(() => {
    const role = checkUserRole();
    setUserRole(role);

    if (role === "guest") {
      router.push("/login");  // Chuyển hướng nếu không có vai trò
    }
  }, []);

  if (userRole === "guest") {
    return null;  // Đợi redirect, không render gì
  }

  return userRole === "hocvien"
    ? student
    : userRole === "giaovien"
    ? teacher
    : <p>Bạn không có quyền truy cập.</p>;
};

export default DashboardLayout;
