"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

interface Application {
  id: string;
  name: string;
  phone: string;
  courseTitle: string;
  date: string;
}

export default function Page() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:4000/applications");
      setApplications(res.data);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Application o‘chirishni xohlaysizmi?");
    if (!confirmDelete) return;

    await axios.delete(`http://localhost:4000/applications/${id}`);
    fetchApplications();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">

      {/* HEADER */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">📩 Applications</h1>

        <span className="rounded-xl bg-green-100 px-4 py-2 text-sm text-green-700">
          Total: {applications.length}
        </span>
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-2xl bg-white shadow">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Course</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((app) => (
              <tr key={app.id} className="border-t hover:bg-gray-50">
                <td className="p-3 font-medium">{app.name}</td>
                <td className="p-3">{app.phone}</td>
                <td className="p-3">{app.courseTitle}</td>
                <td className="p-3">{app.date}</td>

                <td className="p-3">
                  <button
                    onClick={() => handleDelete(app.id)}
                    className="rounded-lg! bg-red-500 px-3 py-2 text-white hover:bg-red-600"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}

            {applications.length === 0 && !loading && (
              <tr>
                <td colSpan={5} className="p-6 text-center text-gray-500">
                  No applications found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}