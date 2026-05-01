"use client";

export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
      
      <img
        src="/logo.png"
        alt="loading"
        className="w-24 h-24 animate-spin-slow"
      />

      <style jsx>{`
        .animate-spin-slow {
          animation: spin 2.5s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

    </div>
  );
}