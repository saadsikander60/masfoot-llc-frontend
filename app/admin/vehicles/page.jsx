"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function VehiclesPage() {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const [editId, setEditId] = useState(null); // 🔥 NEW

  const [form, setForm] = useState({
    carName: "",
    carNumber: "",
    carColor: "",
    ownerName: "",
    registrationDate: "",
    notes: "",
  });

  const fetchCars = async (value = "") => {
    try {
      const token = localStorage.getItem("token");

      let url = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/cars`;

      if (value && value.trim() !== "") {
        url += `?carNumber=${value.toUpperCase()}`;
      }

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setCars(data.cars || []);

    } catch (error) {
      console.log(error);
      setCars([]);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    fetchCars(value);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 ADD + UPDATE SAME FUNCTION
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      let url = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/add-car`;
      let method = "POST";

      // 🔥 UPDATE MODE
      if (editId) {
        url = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/car/${editId}`;
        method = "PUT";
      }

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        setShowModal(false);
        setEditId(null); // reset

        setForm({
          carName: "",
          carNumber: "",
          carColor: "",
          ownerName: "",
          registrationDate: "",
          notes: "",
        });

        fetchCars(); // 🔥 refresh UI
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 🔥 EDIT CLICK
  const handleEdit = (car) => {
    setEditId(car._id);
    setForm({
      carName: car.carName,
      carNumber: car.carNumber,
      carColor: car.carColor,
      ownerName: car.ownerName,
      registrationDate: car.registrationDate?.split("T")[0],
      notes: car.notes || "",
    });
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white p-6">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-purple-300">
          All Vehicles 🚛
        </h1>

        <button
          onClick={() => {
            setEditId(null);
            setShowModal(true);
          }}
          className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg shadow-lg"
        >
          + Add New Vehicle
        </button>

        <p className="text-sm text-gray-300 mt-2">
  Total Vehicles: {cars.length}
</p>
      </div>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search with vehicle number..."
          value={search}
          onChange={handleSearch}
          className="w-full max-w-md p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300"
        />
      </div>

      <div className="overflow-x-auto bg-white/10 rounded-xl border border-white/10">
        <table className="w-full text-left">
          <thead className="bg-white/10 text-purple-300">
            <tr>
              <th className="p-3">Car Name</th>
              <th className="p-3">V/Number</th>
              <th className="p-3">Color</th>
              <th className="p-3">Owner</th>
              <th className="p-3"> RG/Date</th>
              <th className="p-3">Action</th> 
            </tr>
          </thead>

          <tbody>
            {cars.length > 0 ? (
              cars.map((car) => (
                <tr
                  key={car._id}
                  onClick={() => router.push(`/admin/trips/${car._id}`)}
                  className="border-t border-white/10 cursor-pointer hover:bg-white/5"
                >
                  <td className="p-3">{car.carName}</td>
                  <td className="p-3">{car.carNumber}</td>
                  <td className="p-3">{car.carColor}</td>
                  <td className="p-3">{car.ownerName}</td>
                  <td className="p-3">
                    {new Date(car.registrationDate).toLocaleDateString()}
                  </td>

                  {/* 🔥 UPDATE BUTTON */}
                  <td className="p-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // 🔥 row click stop
                        handleEdit(car);
                      }}
                      className="bg-blue-600 px-3 py-1 rounded"
                    >
                      Update
                    </button>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-6 text-gray-400">
                  No vehicles found...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-gradient-to-br from-purple-900 via-indigo-900 to-black p-6 rounded-xl w-full max-w-md border border-white/20">

            <h2 className="text-xl font-bold mb-4 text-purple-300">
              {editId ? "Update Vehicle ✏️" : "Add Vehicle 🚗"}
            </h2>

            <div className="space-y-3">
              <input name="carName" placeholder="Car Name" value={form.carName} onChange={handleChange} className="w-full p-2 rounded bg-white/10 border border-white/20" />
              <input name="carNumber" placeholder="Car Number" value={form.carNumber} onChange={handleChange} className="w-full p-2 rounded bg-white/10 border border-white/20" />
              <input name="carColor" placeholder="Car Color" value={form.carColor} onChange={handleChange} className="w-full p-2 rounded bg-white/10 border border-white/20" />
              <input name="ownerName" placeholder="Owner Name" value={form.ownerName} onChange={handleChange} className="w-full p-2 rounded bg-white/10 border border-white/20" />
              <input type="date" name="registrationDate" value={form.registrationDate} onChange={handleChange} className="w-full p-2 rounded bg-white/10 border border-white/20" />
              <input name="notes" placeholder="Notes" value={form.notes} onChange={handleChange} className="w-full p-2 rounded bg-white/10 border border-white/20" />
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