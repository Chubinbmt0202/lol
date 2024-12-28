"use client";
import React, { useState } from "react";
import {
  Folder,
  Users,
  FileText,
  MessageSquare,
  Settings,
  Send,
  MoreVertical,
} from "lucide-react";
import Link from "next/link";

const HomePage = () => {
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  const userData = {
    id: 1,
    name: "Nguyễn Văn A",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucy",
    coverImage: "https://gstatic.com/classroom/themes/img_read.jpg",
  };

  return (
    <div>
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Bảng tin</h1>
          <p className="text-base-content/70 mt-1">
            Cập nhật thông tin mới nhất từ các lớp học của bạn
          </p>
        </div>

        {/* Main Content */}
        <div className="container mx-auto">
          <div className="grid grid-cols-12 gap-6">
            {/* Left Column */}
            <div className="col-span-12 lg:col-span-3">
              <div className="card bg-base-100 card-bordered">
                <div className="card-body">
                  <h2 className="card-title mb-4">Thống kê</h2>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Users size={20} className="text-base-content/70" />
                      <span>6 lớp đang dạy</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Folder size={20} className="text-base-content/70" />
                      <span>15 tài liệu đã tải lên</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FileText size={20} className="text-base-content/70" />
                      <span>8 bài tập đã giao</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="col-span-12 lg:col-span-9">
              {/* Announcement */}
              <div className="card bg-base-100 card-bordered card-compact">
                <div className="card-body">
                  <div className="flex items-center gap-4">
                    <img
                      className="avatar avatar-xl rounded-full h-12 w-12"
                      src={userData.avatar}
                      alt=""
                    />
                    <div className="w-full">
                      {!showAnnouncement ? (
                        <button
                          className="w-full text-left text-base-content/70 hover:bg-base-200 p-3 rounded-lg"
                          onClick={() => setShowAnnouncement(true)}
                        >
                          Thông báo gì đó cho học viên của bạn? 😊
                        </button>
                      ) : (
                        <>
                          <textarea
                            value={announcement}
                            onChange={(e) => setAnnouncement(e.target.value)}
                            className="textarea textarea-bordered w-full mt-4"
                            placeholder="Viết thông báo cho học viên của bạn..."
                            rows={4}
                            autoFocus
                          />
                          <div className="flex justify-end gap-2 mt-4">
                            <button
                              className="btn btn-ghost"
                              onClick={() => {
                                setShowAnnouncement(false);
                                setAnnouncement("");
                              }}
                            >
                              Để sau
                            </button>
                            <button className="btn btn-primary">
                              Thông báo ngay
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* post */}
              {[1, 2, 3].map((post) => (
                <div
                  key={post}
                  className="card bg-base-100 card-bordered hover:shadow-md transition-all duration-300 mt-4"
                >
                  <div className="card-body p-6">
                    <div className="flex items-start gap-4">
                      <img
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Lucy"
                        alt=""
                        className="avatar rounded-full w-12 h-12 ring-2 ring-base-200"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-bold hover:text-primary transition-colors">
                              Nguyễn Văn A
                            </h3>
                            <p className="text-sm text-base-content/60">
                              Hôm nay lúc 9:00
                            </p>
                          </div>
                          <div className="dropdown dropdown-end">
                            <label
                              tabIndex={0}
                              className="btn btn-ghost btn-sm btn-circle"
                            >
                              <MoreVertical size={18} />
                            </label>
                            <ul
                              tabIndex={0}
                              className="dropdown-content menu p-2 shadow-lg bg-base-100 rounded-box w-52"
                            >
                              <li>
                                <a className="text-base py-2">Chỉnh sửa</a>
                              </li>
                              <li>
                                <a className="text-base py-2 text-error">Xóa</a>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <p className="mt-4 text-base text-base-content/80 leading-relaxed">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Quisquam, quos.
                        </p>
                      </div>
                    </div>

                    <div className="divider my-4"></div>

                    <div className="flex items-center gap-3">
                      <img
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Lucy"
                        alt=""
                        className="avatar rounded-full w-10 h-10 ring-2 ring-base-200"
                      />
                      <div className="flex-1 flex gap-2">
                        <input
                          type="text"
                          placeholder="Phản hồi cho học viên..."
                          className="input input-bordered w-full focus:outline-none focus:border-primary"
                        />
                        <button className="btn btn-ghost btn-square">
                          <Send size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
