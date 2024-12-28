"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vaiTro, setVaiTro] = useState("");

  const router = useRouter();

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!email) {
      alert("Email không được để trống");
      return;
    } else if (!password) {
      alert("Mật khẩu không được để trống");
      return;
    } else if (!vaiTro) {
      alert("Vai trò không được để trống");
      return;
    }
    const formData = {
      userName: email,
      matKhau: password,
      vaiTro: vaiTro,
    };
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Login Success:", data);

        const formdata2 = data.data;
  console.log("formdata2", formdata2);
        // Lưu vai trò vào localStorage hoặc session
        localStorage.setItem("userRole", JSON.stringify(formdata2));
        
        router.push("/");
      } else {
        alert("Login Failed");
        console.error("Login Failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-8">
      <div className="card lg:card-side bg-base-100 shadow-xl max-w-6xl w-full">
        <div className="hidden lg:flex lg:w-1/2 bg-primary text-primary-content p-12 flex-col justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/next.svg"
              alt="Logo"
              width={120}
              height={40}
              className="invert"
            />
          </div>
          <div>
            <h2 className="text-4xl font-bold mb-6">Chào mừng trở lại!</h2>
            <p className="text-lg opacity-90">
              Đăng nhập để tiếp tục hành trình của bạn với chúng tôi. Truy cập
              tất cả các tài nguyên và quản lý tài khoản của bạn.
            </p>
          </div>
        </div>

        <div className="card-body lg:w-1/2">
          <div className="lg:hidden flex justify-center mb-8">
            <Image
              src="/next.svg"
              alt="Logo"
              width={180}
              height={60}
              className="dark:invert"
            />
          </div>

          <h2 className="card-title text-3xl mb-8">
            Đăng nhập vào tài khoản của bạn
          </h2>

          <form className="space-y-6">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Email hoặc tên đăng nhập</span>
              </label>
              <input
                type="email"
                placeholder="name@company.com"
                className="input input-bordered w-full"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Mật khẩu</span>
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="input input-bordered w-full"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Vai trò</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={vaiTro}
                onChange={(e) => setVaiTro(e.target.value)}
              >
                <option value="giaovien">Giáo viên</option>
                <option value="hocvien">Học viên</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <label className="label cursor-pointer">
                <input type="checkbox" className="checkbox checkbox-primary" />
                <span className="label-text ml-2">Nhớ mật khẩu</span>
              </label>
              <a href="#" className="link link-primary">
                Quên mật khẩu?
              </a>
            </div>

            <button className="btn btn-primary w-full" onClick={handleLogin}>
              Đăng nhập
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
