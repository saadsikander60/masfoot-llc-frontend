export const apiFetch = async (url, options = {}) => {
  const token = localStorage.getItem("token");

  const res = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  });

  // 🔥 TOKEN EXPIRE HANDLE
  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/admin/login";
    return null;
  }

  return res.json();
};