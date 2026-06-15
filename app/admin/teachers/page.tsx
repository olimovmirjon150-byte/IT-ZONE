"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

interface Teacher {
  id: number;
  name: string;
  email: string;
  password: string;
  specialty: string;
  experience: string;
  image: string;
  bio: string;
  groups: {
    groupId: string;
    groupName: string;
    course: string;
  }[];
}

const Page = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    specialty: "",
    experience: "",
    image: "",
    bio: "",
  });

  // GET
  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    const res = await axios.get("http://localhost:4000/teachers");
    setTeachers(res.data);
  };

  // CREATE / UPDATE
  const handleSubmit = async () => {
    try {
      if (editId !== null) {
        await axios.put(`http://localhost:4000/teachers/${editId}`, {
          id: editId,
          ...form,
          groups:
            teachers.find((t) => t.id === editId)?.groups || [],
        });
      } else {
        await axios.post("http://localhost:4000/teachers", {
          id: Date.now(),
          ...form,
          groups: [],
        });
      }

      setModalOpen(false);
      setEditId(null);

      setForm({
        name: "",
        email: "",
        password: "",
        specialty: "",
        experience: "",
        image: "",
        bio: "",
      });

      fetchTeachers();
    } catch (err) {
      console.error(err);
    }
  };

  // DELETE
  const handleDelete = async (id: number) => {
    await axios.delete(`http://localhost:4000/teachers/${id}`);
    fetchTeachers();
  };

  // EDIT
  const handleEdit = (teacher: Teacher) => {
    setEditId(teacher.id);

    setForm({
      name: teacher.name,
      email: teacher.email,
      password: teacher.password,
      specialty: teacher.specialty,
      experience: teacher.experience,
      image: teacher.image,
      bio: teacher.bio,
    });

    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">

      {/* HEADER */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">👨‍🏫 Teachers</h1>

        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 rounded-xl! bg-green-500 px-4 py-2 text-white"
        >
          <FaPlus /> Add Teacher
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-2xl bg-white shadow">
        <table className="w-full text-left">
          <thead className="border-b bg-gray-100">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Specialty</th>
              <th className="p-3">Experience</th>
              <th className="p-3">Password</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {teachers.map((t) => (
              <tr key={t.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{t.name}</td>
                <td className="p-3">{t.email}</td>
                <td className="p-3">{t.specialty}</td>
                <td className="p-3">{t.experience}</td>
                <td className="p-3">••••••</td>

                <td className="flex gap-3 p-3">
                  <button
                    onClick={() => handleEdit(t)}
                    className="text-blue-500"
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() => handleDelete(t.id)}
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
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="w-125 rounded-2xl bg-white p-6">

            <h2 className="mb-4 text-xl font-bold">
              {editId ? "Edit Teacher" : "Add Teacher"}
            </h2>

            <div className="space-y-3">

              <input
                placeholder="Name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                className="w-full mb-2 rounded-xl border p-2"
              />

              <input
                placeholder="Email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                className="w-full mb-2 rounded-xl border p-2"
              />

              <input
                placeholder="Password"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                className="w-full mb-2 rounded-xl border p-2"
              />

              <input
                placeholder="Specialty"
                value={form.specialty}
                onChange={(e) =>
                  setForm({ ...form, specialty: e.target.value })
                }
                className="w-full mb-2 rounded-xl border p-2"
              />

              <input
                placeholder="Experience"
                value={form.experience}
                onChange={(e) =>
                  setForm({ ...form, experience: e.target.value })
                }
                className="w-full mb-2 rounded-xl border p-2"
              />

              <input
                placeholder="Image URL"
                value={form.image}
                onChange={(e) =>
                  setForm({ ...form, image: e.target.value })
                }
                className="w-full mb-2 rounded-xl border p-2"
              />

              <textarea
                placeholder="Bio"
                value={form.bio}
                onChange={(e) =>
                  setForm({ ...form, bio: e.target.value })
                }
                className="w-full rounded-xl border p-2"
              />

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setModalOpen(false)}
                  className="rounded-xl! mt-3 bg-gray-200 px-4 py-2"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSubmit}
                  className="rounded-xl! mt-3 bg-green-500 px-4 py-2 text-white"
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
};

export default Page;