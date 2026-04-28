"use client";
import { useRouter } from "next/navigation";

export default function Profile() {

  const router = useRouter();

  const admin = {
    name: "Marwah Ali",
    phone: "+971551923098",
    address: "Hatta, United Arab Emirates"
  };

  const getInitials = (name) => {
    const words = name.split(" ");
    return words.map(word => word[0]).join("").toUpperCase();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/admin/login");
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-purple-200">

      {/* Sidebar (SAME AS DASHBOARD) */}
      <div className="w-64 flex flex-col justify-between p-5 border-r border-purple-400/30 shadow-lg shadow-black/50">

        <div>
          <h2 className="text-xl font-semibold mb-6 text-center text-purple-300">
            Admin Dashboard
          </h2>

          <div
  onClick={() => router.push("/admin/dashboard")}
  className="bg-white/10 p-3 rounded-lg mb-4 cursor-pointer hover:bg-white/20 transition text-center flex items-center justify-center gap-2"
>
  <span className="text-purple-400 text-xl">🏠</span>
  <span className="text-purple-400 font-medium">Dashboard</span>
</div>

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
      <div className="flex-1 flex flex-col items-center justify-center relative">

      

        {/* Profile Circle */}
        <div className="w-28 h-28 rounded-full bg-purple-600 flex items-center justify-center text-3xl font-bold mb-6 shadow-lg">
          {getInitials(admin.name)}
        </div>

        {/* Info Card */}
        <div className="bg-white/10 p-6 rounded-xl backdrop-blur-md text-center w-80 border border-purple-300/20">

          <h2 className="text-xl font-semibold mb-4">
            {admin.name}
          </h2>

          <p className="mb-2">
            📞 {admin.phone}
          </p>

          <p>
            📍 {admin.address}
          </p>

        </div>

      </div>

    </div>
  );
}