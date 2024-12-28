"use client";
import { Folder, Users } from "lucide-react";
import { FileText } from "lucide-react";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

interface Props {
  id: string;
}
const Tab = ({ id }: Props) => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <div className="z-[9999] border-b bg-base-100 fixed top-16 w-full h-14 flex items-center px-6 shadow-sm">
      <div role="tablist" className="tabs tabs-lifted w-fit">
        <Link
          href={`/classes/${id}`}
          role="tab"
          className={`tab ${
            isActive(`/classes/${id}`) ||
            pathname.includes(`/classes/${id}/chapter`)
              ? "tab-active"
              : ""
          } tab-lifted flex items-center gap-2 px-6 font-medium hover:bg-base-200 transition-colors`}
        >
          <FileText size={18} className="text-primary" />
         Chương trình học
        </Link>
        <Link
          href={`/classes/${id}/exercise`}
          role="tab"
          className={`tab ${
            isActive(`/classes/${id}/exercise`) ||
            pathname.includes("/exercise")
              ? "tab-active"
              : ""
          } tab-lifted flex items-center gap-2 px-6 font-medium hover:bg-base-200 transition-colors`}
        >
          <Folder size={18} className="text-primary" />
          Bài tập
        </Link>
        <Link
          href={`/classes/${id}/punishment-writing`}
          role="tab"
          className={`tab ${
            isActive(`/classes/${id}/punishment-writing`) ? "tab-active" : ""
          } tab-lifted flex items-center gap-2 px-6 font-medium hover:bg-base-200 transition-colors`}
        >
          <FileText size={18} className="text-primary" />
          Chép phạt
        </Link>
        <Link
          href={`/classes/${id}/member`}
          role="tab"
          className={`tab ${
            isActive(`/classes/${id}/member`) ? "tab-active" : ""
          } tab-lifted flex items-center gap-2 px-6 font-medium hover:bg-base-200 transition-colors`}
        >
          <Users size={18} className="text-primary" />
          Thành viên
        </Link>
      </div>
    </div>
  );
};

export default Tab;
