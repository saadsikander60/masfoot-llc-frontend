"use client";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        // ✅ token save
        localStorage.setItem("token", data.token);

        // ❌ alert hata diya (UX improve)
        // alert("Login successful ✅");

        // ✅ smooth redirect
        window.location.href = "/admin/dashboard";

      } else {
        // ❗ error alert rehne diya
        alert(data.message);
      }

    } catch (error) {
      alert("Server error ❌");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black">

      {/* 🔥 Logo Section */}
      <div className="text-center mb-10">
        
        <div className="flex justify-center mb-4">
          <div className="bg-black/40 backdrop-blur-lg p-4 rounded-full shadow-xl shadow-purple-500/30 border border-white/10">
            
            <img 
              src="/logo.png" 
              alt="Masfoot Logo"
              className="w-32 h-32 object-contain"
            />

          </div>
        </div>

        <h1 className="text-white text-3xl font-bold tracking-wide">
          MASFOOT LLC
        </h1>

        <p className="text-purple-300 text-sm mt-1 tracking-wide">
          Premium Heavy Vehicle Services
        </p>

      </div>

      {/* 🔥 Login Card */}
      <div className="bg-black/40 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-80 border border-white/10">
        
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-2 rounded-lg bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 rounded-lg bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

      </div>

    </div>
  );
}