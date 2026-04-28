"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  const [hadith, setHadith] = useState({ en: "", ur: "" });

  const hadithList = [
    { en: "Actions are judged by intentions.", ur: "اعمال کا دارومدار نیتوں پر ہے۔" },
    { en: "The best among you are those with the best character.", ur: "تم میں سب سے بہتر وہ ہے جس کا اخلاق اچھا ہو۔" },
    { en: "Speak good or remain silent.", ur: "اچھی بات کہو یا خاموش رہو۔" },
    { en: "A Muslim is the one from whose tongue and hand others are safe.", ur: "مسلمان وہ ہے جس کی زبان اور ہاتھ سے دوسرے محفوظ رہیں۔" },
    { en: "None of you truly believes until he loves for his brother what he loves for himself.", ur: "تم میں سے کوئی اس وقت تک کامل ایمان والا نہیں ہو سکتا جب تک اپنے بھائی کے لیے وہی پسند نہ کرے جو اپنے لیے کرتا ہے۔" },
    { en: "Allah is kind and loves kindness.", ur: "اللہ مہربان ہے اور مہربانی کو پسند کرتا ہے۔" },
    { en: "The strong person is the one who controls anger.", ur: "طاقتور وہ نہیں جو کشتی میں جیت جائے بلکہ وہ ہے جو غصے پر قابو رکھے۔" },
    { en: "Cleanliness is half of faith.", ur: "صفائی نصف ایمان ہے۔" },
    { en: "Make things easy, do not make them difficult.", ur: "آسانی پیدا کرو، سختی نہ کرو۔" },
    { en: "Smiling is charity.", ur: "مسکرانا بھی صدقہ ہے۔" }
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) window.location.href = "/admin/login";

    const today = new Date().getDate();
    const index = today % hadithList.length;
    setHadith(hadithList[index]);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/admin/login";
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-purple-200">

      {/* Sidebar */}
      <div className="w-64 flex flex-col justify-between p-5 border-r border-purple-400/30 shadow-lg shadow-black/50">

        <div>
          <h2 className="text-xl font-semibold mb-6 text-center text-purple-300">
            Admin Dashboard
          </h2>

         <div
  onClick={() => router.push("/admin/vehicles")}
  className="bg-white/10 p-3 rounded-lg mb-4 cursor-pointer hover:bg-white/20 transition text-center flex items-center justify-center gap-2"
>
  <span className="text-purple-400 text-xl">🚛</span>
  <span className="text-purple-400 font-medium">Heavy Vehicles</span>
</div>
<div
  onClick={() => router.push("/admin/profile")}
  className="bg-white/10 p-3 rounded-lg cursor-pointer hover:bg-white/20 transition text-center flex items-center justify-center gap-2"
>
  <span className="text-cyan-400 text-xl">👤</span>
  <span className="text-purple-400 font-medium">Profile</span>
</div>
        </div>

        <button
          onClick={handleLogout}
          className="bg-white/10 p-2 rounded-lg hover:bg-white/20 transition"
        >
          Logout
        </button>

      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center p-6">

        <h1 className="text-4xl md:text-5xl font-extrabold tracking-widest bg-gradient-to-r from-purple-400 via-pink-300 to-indigo-400 bg-clip-text text-transparent mb-12 text-center">
          MASFOOT LLC
        </h1>

        <div className="max-w-xl bg-white/10 p-6 rounded-xl shadow-xl backdrop-blur-md text-center border border-purple-300/20">

          <h2 className="text-lg text-purple-300 mb-3">
            Daily Hadith
          </h2>

          <p className="text-purple-200 text-lg italic mb-4">
            "{hadith.en}"
          </p>

          <p className="text-purple-300 text-lg font-semibold leading-relaxed">
            {hadith.ur}
          </p>

        </div>

      </div>

    </div>
  );
}