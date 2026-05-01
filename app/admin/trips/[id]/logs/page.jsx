"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiFetch } from "../../../../utils/api";

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

  // 🔥 FETCH LOGS SUMMARY (SAFE)
  const fetchLogs = async (selectedMonth = month) => {
    try {
      const year = selectedMonth.split("-")[0];
      const monthOnly = selectedMonth.split("-")[1];

      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/logs-summary/${id}?month=${parseInt(monthOnly)}&year=${year}`;

      const data = await apiFetch(url);

      // 🔥 IMPORTANT (401 safe)
      if (!data) return;

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
  let isMounted = true;

  const loadData = async () => {
    try {
      const year = month.split("-")[0];
      const monthOnly = month.split("-")[1];

      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/logs-summary/${id}?month=${parseInt(monthOnly)}&year=${year}`;

      const data = await apiFetch(url);

      // 🔥 SAFE CHECK
      if (!data || !isMounted) return;

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
    }

    if (isMounted) setLoading(false);
  };

  if (id) {
    setLoading(true);
    loadData();
  }

  return () => {
    isMounted = false; // 🔥 prevent crash
  };
}, [id, month]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white p-6 flex flex-col items-center">

      {/* 🔥 TOP CENTER HEADING */}
      <h1 className="text-3xl font-bold text-green-400 text-center mb-6">
        Vehicle Logs 📜
      </h1>

      {/* 📅 Month Picker (centered) */}
      <input
        type="month"
        value={month}
        onChange={(e) => {
          setMonth(e.target.value);
          setLoading(true);
          fetchLogs(e.target.value);
        }}
        className="p-2 rounded bg-white/10 border border-white/20 text-white mb-6"
      />

      {/* 📊 SUMMARY (CENTER BOX) */}
      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : (
        <div className="bg-white/10 rounded-xl border border-white/10 p-6 w-full max-w-md text-center shadow-lg">

          <h2 className="text-xl font-semibold mb-4 text-purple-300">
            Monthly Summary
          </h2>

          <table className="w-full text-left">
            <tbody>

              <tr className="border-b border-white/10">
                <td className="p-3">Total Working Amount</td>
                <td className="p-3 text-green-400 font-semibold">
                  {summary.totalAmount}
                </td>
              </tr>

              <tr className="border-b border-white/10">
                <td className="p-3">Total Expense</td>
                <td className="p-3 text-red-400 font-semibold">
                  {summary.totalExpense}
                </td>
              </tr>

              <tr>
                <td className="p-3">Total Profit</td>
                <td className="p-3 text-blue-400 font-semibold">
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