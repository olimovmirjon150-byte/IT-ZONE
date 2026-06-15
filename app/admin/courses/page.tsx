"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";

interface Course {
  id: string;
  title: string;
  description: string;
  price: string;
  syllabus: string[];
}

export default function Page() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    syllabus: "",
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const res = await axios.get("http://localhost:4000/courses");
    setCourses(res.data);
  };

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      price: "",
      syllabus: "",
    });
    setEditId(null);
    setModalOpen(false);
  };

  // CREATE / UPDATE
  const handleSubmit = async () => {
    if (!form.title || !form.description || !form.price) {
      return alert("Barcha maydonlarni to‘ldiring");
    }

    const payload = {
      title: form.title,
      description: form.description,
      price: form.price,
      syllabus: form.syllabus.split(" ").filter(Boolean),
    };

    if (editId) {
      await axios.put(`http://localhost:4000/courses/${editId}`, {
        id: editId,
        ...payload,
      });
    } else {
      await axios.post("http://localhost:4000/courses", {
        id: Date.now().toString(),
        ...payload,
      });
    }

    fetchCourses();
    resetForm();
  };

  // DELETE
  const handleDelete = async (id: string) => {
    const ok = confirm("Kursni o‘chirishni xohlaysizmi?");
    if (!ok) return;

    await axios.delete(`http://localhost:4000/courses/${id}`);
    fetchCourses();
  };

  // EDIT
  const handleEdit = (course: Course) => {
    setEditId(course.id);
    setForm({
      title: course.title,
      description: course.description,
      price: course.price,
      syllabus: course.syllabus.join(" "),
    });
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">

      {/* HEADER */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">📚 Courses</h1>

        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 rounded-xl! bg-green-500 px-4 py-2 text-white"
        >
          <FaPlus /> Add Course
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-2xl bg-white shadow">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Syllabus</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {courses.map((c) => (
              <tr key={c.id} className="border-t hover:bg-gray-50">
                <td className="p-3 font-semibold">{c.title}</td>
                <td className="p-3">{c.price}</td>
                <td className="p-3 text-sm text-gray-600">
                  {c.syllabus.join(", ")}
                </td>

                <td className="flex gap-3 p-3">
                  <button
                    onClick={() => handleEdit(c)}
                    className="text-blue-500"
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() => handleDelete(c.id)}
                    className="text-red-500"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-xl rounded-2xl bg-white p-6">

            <h2 className="mb-4 text-xl font-bold">
              {editId ? "Edit Course" : "Create Course"}
            </h2>

            <div className="space-y-3">

              <input
                placeholder="Title"
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
                className="w-full rounded-xl border p-2"
              />

              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="w-full mt-2 rounded-xl border p-2"
              />

              <input
                placeholder="Price"
                value={form.price}
                onChange={(e) =>
                  setForm({ ...form, price: e.target.value })
                }
                className="w-full mt-1 mb-2 rounded-xl border p-2"
              />

              <input
                placeholder="Syllabus (space bilan yozing)"
                value={form.syllabus}
                onChange={(e) =>
                  setForm({ ...form, syllabus: e.target.value })
                }
                className="w-full rounded-xl border p-2"
              />

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={resetForm}
                  className="rounded-xl! bg-gray-200 px-4 py-2"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSubmit}
                  className="rounded-xl! bg-green-500 px-4 py-2 text-white"
                >
                  Save
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}   