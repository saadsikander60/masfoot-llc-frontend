"use client";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("token", data.token);
       window.location.replace("/admin/dashboard");
      } else {
        alert(data.message);
      }

    } catch (error) {
      alert("Server error ❌");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black">

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

        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded-lg bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
           className="absolute right-3 top-2 text-purple-400 hover:text-purple-500 transition"
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-7-9-7a17.5 17.5 0 013.05-3.95M6.7 6.7A9.956 9.956 0 0112 5c5 0 9 7 9 7a17.5 17.5 0 01-4.05 4.95M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 6L3 3" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm7 0s-4 7-10 7S2 12 2 12s4-7 10-7 10 7 10 7z" />
              </svg>
            )}
          </button>
        </div>

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