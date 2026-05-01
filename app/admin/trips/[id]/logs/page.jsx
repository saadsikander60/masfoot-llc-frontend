"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function LogsPage() {
  const params = useParams();
  const id = params.id;

  const [month, setMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );

  const [summary, setSummary] = useState({
    totalAmount: 0,
    totalExpense: 0,
    totalProfit: 0,
  });

  const [loading, setLoading] = useState(true);

  // 🔥 FETCH LOGS SUMMARY
  const fetchLogs = async (selectedMonth = month) => {
    try {
      const token = localStorage.getItem("token");

      const year = selectedMonth.split("-")[0];
      const monthOnly = selectedMonth.split("-")[1];

      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/logs-summary/${id}?month=${parseInt(monthOnly)}&year=${year}`;

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        setSummary({
          totalAmount: data.totalAmount,
          totalExpense: data.totalExpense,
          totalProfit: data.totalProfit,
        });
      } else {
        setSummary({
          totalAmount: 0,
          totalExpense: 0,
          totalProfit: 0,
        });
      }

    } catch (error) {
      console.log(error);
      setSummary({
        totalAmount: 0,
        totalExpense: 0,
        totalProfit: 0,
      });
    }

    setLoading(false);
  };

  // 🔁 LOAD ON PAGE
  useEffect(() => {
    if (id) {
      setLoading(true);
      fetchLogs();
    }
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-400">
          Vehicle Logs 📜
        </h1>

        {/* 📅 Month Picker */}
        <input
          type="month"
          value={month}
          onChange={(e) => {
            setMonth(e.target.value);
            setLoading(true);
            fetchLogs(e.target.value);
          }}
          className="p-2 rounded bg-white/10 border border-white/20 text-white"
        />
      </div>

      {/* 📊 SUMMARY */}
      {loading ? (
        <p className="text-center text-gray-400">Loading...</p>
      ) : (
        <div className="bg-white/10 rounded-xl border border-white/10 p-6 max-w-md">

          <h2 className="text-xl font-semibold mb-4 text-purple-300">
            Monthly Summary
          </h2>

          <table className="w-full text-left">
            <tbody>

              <tr className="border-b border-white/10">
                <td className="p-3">Total Working Amount</td>
                <td className="p-3 text-green-400">
                  {summary.totalAmount}
                </td>
              </tr>

              <tr className="border-b border-white/10">
                <td className="p-3">Total Expense</td>
                <td className="p-3 text-red-400">
                  {summary.totalExpense}
                </td>
              </tr>

              <tr>
                <td className="p-3">Total Profit</td>
                <td className="p-3 text-blue-400">
                  {summary.totalProfit}
                </td>
              </tr>

            </tbody>
          </table>

        </div>
      )}

    </div>
  );
}