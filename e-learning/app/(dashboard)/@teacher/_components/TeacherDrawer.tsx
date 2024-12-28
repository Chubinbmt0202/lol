"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  GraduationCap,
  CalendarDays,
  UserCircle,
  BookText,
} from "lucide-react";
import StudentNavbar from "./TeacherNavbar";

interface Props {
  children: React.ReactNode;
}

const menu = [
  {
    label: "Trang chủ",
    href: "/",
    icon: <LayoutDashboard size={20} />,
  },
  {
    label: "Lớp học",
    href: "/classes",
    icon: <GraduationCap size={20} />,
  },
  {
    label: "Lịch giảng dạy",
    href: "/schedule",
    icon: <CalendarDays size={20} />,
  },
  {
    label: "Hồ sơ cá nhân",
    href: "/profile",
    icon: <UserCircle size={20} />,
  },
  {
    label: "Kho bài tập",
    href: "/exercises",
    icon: <BookText size={20} />,
  },
];

const Drawer: React.FC<Props> = ({ children }) => {
  const pathName = usePathname();

  return (
    <div className="drawer lg:drawer-open ">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content bg-base-100">
        <StudentNavbar />
        <div className="py-20">{children}</div>
      </div>
      <div className="drawer-side z-[9999]">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <aside className="bg-base-200 w-80 min-h-screen">
          {/* Logo */}
          <div className="navbar bg-base-200 border-b border-base-300 h-16">
            <div className="flex-1">
              <Link href="/" className="btn btn-ghost text-xl">
                <span className="text-primary font-bold">E</span>
                <span className="font-semibold">Learning</span>
              </Link>
            </div>
          </div>

          {/* Menu */}
          <ul className="menu bg-base-200 w-full p-4 font-medium menu-lg z-[9999]">
            {menu.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={
                    item.href === "/"
                      ? pathName === "/"
                        ? "active"
                        : ""
                      : pathName.includes(item.href)
                      ? "active"
                      : ""
                  }
                >
                  <span className="flex items-center gap-3">
                    {item.icon}
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default Drawer;
