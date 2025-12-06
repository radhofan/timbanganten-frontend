"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "antd";

export default function LoginApprover() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("approver");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch("/api/authApprover", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Login failed");
      window.location.href = "/admin";
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
      setIsLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    await fetch("/api/logout", { method: "POST" });
    window.location.href = "/admin";
  };

  return (
    <div className="relative min-h-screen w-full">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/login.jpg"
          alt="Login Background"
          fill
          style={{ objectFit: "cover" }}
          priority
          placeholder="empty"
          unoptimized
          quality={100}
        />
      </div>
      <div className="absolute inset-0 bg-black opacity-50 -z-10"></div>
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="relative z-10 bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-md w-full max-w-md">
          <div className="flex items-center mb-6 justify-between">
            <div className="flex items-center gap-2">
              <Image
                src="/images/approver.png"
                alt="Approver Icon"
                width={24}
                height={24}
                style={{ verticalAlign: "middle" }}
              />
              <h2 className="text-2xl font-bold text-gray-800 m-2 leading-none">Login Approver</h2>
            </div>
            <select
              name="role"
              value={role}
              onChange={(e) => {
                const selectedRole = e.target.value;
                setRole(selectedRole);
                router.push(`/admin/login/${selectedRole}`);
              }}
              className="ml-4 border border-gray-300 rounded-md px-3 py-2 text-sm bg-white text-gray-700 shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="admin">Admin</option>
              <option value="approver">Approver</option>
              <option value="pengawas">Pengawas</option>
            </select>
          </div>

          {error && (
            <div className="mb-4 p-2 text-sm text-red-600 bg-red-50 rounded-md">{error}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="approver@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                required
              />
            </div>

            <div className="mb-4 relative">
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                required
              />
            </div>

            <Button
              htmlType="submit"
              loading={isLoading}
              block
              style={{
                backgroundColor: "#1f2937",
                color: "#fff",
                padding: "0.5rem 1rem",
                borderRadius: "0.375rem",
                border: "none",
                marginBottom: "0.5rem",
              }}
            >
              Log In
            </Button>
          </form>

          <Button
            onClick={handleGuestLogin}
            block
            style={{
              backgroundColor: "#fff",
              color: "#1f2937",
              border: "1px solid #9ca3af",
              padding: "0.5rem 1rem",
              borderRadius: "0.375rem",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#f9fafb";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "#4b5563";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#fff";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "#9ca3af";
            }}
          >
            Masuk sebagai guest
          </Button>
        </div>
      </div>
    </div>
  );
}
