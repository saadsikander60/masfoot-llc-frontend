"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function TripsPage() {
  const params = useParams();
  const id = params.id;

  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    date: "",
    location: "",
    amount: "",
    expense: "",
    invoice: "",
  });

  // 🔥 FETCH TRIPS
  const fetchTrips = async (value = "") => {
    try {
      const token = localStorage.getItem("token");

      let url = `http://localhost:5000/api/admin/trips/${id}`;

      if (value && value.trim() !== "") {
        url += `?invoice=${value}`;
      }

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        setTrips(data.trips || []);
      } else {
        setTrips([]);
      }

    } catch (error) {
      console.log(error);
      setTrips([]);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetchTrips();
    }
  }, [id]);

  // 🔍 SEARCH
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    fetchTrips(value);
  };

  // 🔄 INPUT CHANGE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ➕ ADD TRIP
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/admin/add-trip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          carId: id,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setShowModal(false);

        // reset form
        setForm({
          date: "",
          location: "",
          amount: "",
          expense: "",
          invoice: "",
        });

        fetchTrips(); // 🔥 refresh UI
      } else {
        alert(data.message);
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white p-6">

      {/* 🔥 Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-purple-300">
          Vehicle Trips 🚛
        </h1>

        <div className="flex gap-3">
          {/* Search */}
          <input
            type="text"
            placeholder="Search by invoice..."
            value={search}
            onChange={handleSearch}
            className="w-56 p-2 rounded-lg bg-white/10 border border-white/20 text-white"
          />

          {/* Add Button */}
          <button
            onClick={() => setShowModal(true)}
            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg"
          >
            + Add Trip
          </button>
        </div>
      </div>

      {/* 🔥 TABLE */}
      {loading ? (
        <p className="text-center text-gray-400">Loading...</p>
      ) : trips.length === 0 ? (
        <p className="text-center text-gray-400">No trips found...</p>
      ) : (
        <div className="overflow-x-auto bg-white/10 rounded-xl border border-white/10">
          <table className="w-full text-left">
            <thead className="bg-white/10 text-purple-300">
              <tr>
                <th className="p-3">Invoice</th>
                <th className="p-3">Location</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Expense</th>
                <th className="p-3">Profit</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>

            <tbody>
              {trips.map((trip) => (
                <tr key={trip._id} className="border-t border-white/10 hover:bg-white/5">
                  <td className="p-3 text-purple-300">{trip.invoice}</td>
                  <td className="p-3">{trip.location}</td>
                  <td className="p-3">{trip.amount}</td>
                  <td className="p-3">{trip.expense}</td>
                  <td className="p-3 text-green-400">{trip.profit}</td>
                  <td className="p-3">
                    {new Date(trip.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 🔥 MODAL FORM */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-gradient-to-br from-purple-900 via-indigo-900 to-black p-6 rounded-xl w-full max-w-md border border-white/20">

            <h2 className="text-xl font-bold mb-4 text-purple-300">
              Add Trip 🚛
            </h2>

            <div className="space-y-3">
              <input type="date" name="date" value={form.date} onChange={handleChange} className="w-full p-2 rounded bg-white/10 border border-white/20" />
              <input name="location" placeholder="Location" value={form.location} onChange={handleChange} className="w-full p-2 rounded bg-white/10 border border-white/20" />
              <input name="amount" placeholder="Amount" value={form.amount} onChange={handleChange} className="w-full p-2 rounded bg-white/10 border border-white/20" />
              <input name="expense" placeholder="Expense" value={form.expense} onChange={handleChange} className="w-full p-2 rounded bg-white/10 border border-white/20" />
              <input name="invoice" placeholder="Invoice" value={form.invoice} onChange={handleChange} className="w-full p-2 rounded bg-white/10 border border-white/20" />
            </div>

            <div className="flex justify-between mt-5">
              <button onClick={() => setShowModal(false)} className="bg-gray-600 px-4 py-2 rounded">
                Cancel
              </button>

              <button onClick={handleSubmit} className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700">
                Save
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}