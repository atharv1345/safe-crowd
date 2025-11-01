import { useState } from "react";

export default function SafeCrowdLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [idNumber, setIdNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Role:", role, "Email:", email, "Password:", password, "ID Number:", idNumber);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0F2027] via-[#203A43] to-[#2C5364] overflow-hidden">
      {/* Top background text */}
      <div className="absolute top-5 w-full text-center">
        <h1 className="text-4xl font-extrabold text-white/40 tracking-widest select-none uppercase">
          Welcome to SAFE Crowd login Portal
        </h1>
      </div>

      {/* Background watermark text */}
      <h1 className="absolute text-[10rem] font-extrabold text-white/10 select-none tracking-widest uppercase">
        Safe Crowd
      </h1>

      <div className="relative bg-[#FFE5B4] p-8 rounded-2xl shadow-2xl w-full max-w-md border border-[#1E3A5F] z-10">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          SAFE Crowd Login Portal 👮‍♀️
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Select Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 border border-gray-400 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="security">Security</option>
              <option value="police">Police</option>
            </select>
          </div>

          {(role === "security" || role === "police") && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ID Number <span className="text-gray-500">or</span> Email
              </label>
              <input
                id="idNumber"
                type="text"
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
                placeholder="Enter ID number (or leave blank to use email)"
                className="w-full px-4 py-2 border border-gray-400 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-3"
              />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2 border border-gray-400 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          )}

          {(role !== "security" && role !== "police") && (
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full px-4 py-2 border border-gray-400 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          )}

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-400 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex justify-between items-center text-sm">
            <a
              href="/forgot-password"
              className="text-blue-600 hover:underline"
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors mt-2 shadow-lg"
          >
            Log In
          </button>
        </form>

        <p className="text-sm text-center text-gray-700 mt-6">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
