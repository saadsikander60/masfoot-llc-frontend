"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function AuthGuard({ children }) {
  const [authorized, setAuthorized] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // ✅ Login page ko allow karo (IMPORTANT)
    if (pathname === "/admin/login") {
      setAuthorized(true);
      return;
    }

    // ❌ Token nahi → redirect
    if (!token) {
      window.location.href = "/admin/login";
    } else {
      setAuthorized(true);
    }
  }, [pathname]);

  if (!authorized) return null;

  return children;
}