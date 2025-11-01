import React, { useState } from "react";

export default function SafeCrowdLoginPage() {
  const [role, setRole] = useState("admin");
  const [email, setEmail] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ role, email, idNumber, password });
    alert("Login submitted successfully!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0F2027] via-[#203A43] to-[#2C5364] overflow-hidden relative">
      {/* Background title */}
      <div className="absolute top-5 w-full text-center">
        <h1 className="text-4xl font-extrabold text-white/40 tracking-widest select-none uppercase">
          Welcome to SAFE Crowd Login Portal
        </h1>
      </div>

      {/* Watermark text */}
      <h1 className="absolute text-[10rem] font-extrabold text-white/10 select-none tracking-widest uppercase">
        Safe Crowd
      </h1>

      {/* Login Card */}
      <div className="relative bg-[#FFE5B4] p-8 rounded-2xl shadow-2xl w-full max-w-md border border-[#1E3A5F] z-10">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          SAFE Crowd Login Portal 👮‍♀️
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 border border-gray-400 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="admin">Admin</option>
              <option value="radio-operator">Radio Operator</option>
            </select>
          </div>

          {role === "radio-operator" ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ID Number <span className="text-gray-500">or</span> Email</label>
              <input
                type="text"
                placeholder="Enter ID number or email"
                value={idNumber || email}
                onChange={(e) => {
                  const value = e.target.value;
                  if (isNaN(value)) setEmail(value);
                  else setIdNumber(value);
                }}
                className="w-full px-4 py-2 border border-gray-400 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-400 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-400 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="flex justify-between items-center text-sm">
            <a href="/forgot-password" className="text-blue-600 hover:underline">Forgot password?</a>
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors mt-2 shadow-lg">
            Log In
          </button>
        </form>

        <p className="text-sm text-center text-gray-700 mt-6">
          Don’t have an account? <a href="/signup" className="text-blue-600 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
}
