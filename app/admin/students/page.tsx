"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

interface Student {
  id: number;
  name: string;
  phone: string;
  attendance: boolean[];
  payments: boolean[];
  groupId: string;
  groupName: string;
}

interface Group {
  id: string;
  name: string;
  students: Student[];
}

export default function Page() {
  const [students, setStudents] = useState<Student[]>([]);
  const [editStudent, setEditStudent] = useState<Student | null>(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
  });

  // GET ALL STUDENTS FROM GROUPS
  const fetchStudents = async () => {
    const res = await axios.get("http://localhost:4000/groups");

    const allStudents = res.data.flatMap((group: Group) =>
      group.students.map((s) => ({
        ...s,
        groupId: group.id,
        groupName: group.name,
      }))
    );

    setStudents(allStudents);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // DELETE STUDENT
  const handleDelete = async (groupId: string, studentId: number) => {
    const groupsRes = await axios.get("http://localhost:4000/groups");

    const updatedGroups = groupsRes.data.map((group: Group) => {
      if (group.id !== groupId) return group;

      return {
        ...group,
        students: group.students.filter((s) => s.id !== studentId),
      };
    });

    await Promise.all(
      updatedGroups.map((g: Group) =>
        axios.put(`http://localhost:4000/groups/${g.id}`, g)
      )
    );

    fetchStudents();
  };

  // OPEN EDIT
  const openEdit = (student: Student) => {
    setEditStudent(student);
    setForm({
      name: student.name,
      phone: student.phone,
    });
  };

  // SAVE EDIT
  const saveEdit = async () => {
    if (!editStudent) return;

    const groupsRes = await axios.get("http://localhost:4000/groups");

    const updatedGroups = groupsRes.data.map((group: Group) => {
      if (group.id !== editStudent.groupId) return group;

      return {
        ...group,
        students: group.students.map((s) =>
          s.id === editStudent.id
            ? {
                ...s,
                name: form.name,
                phone: form.phone,
              }
            : s
        ),
      };
    });

    await Promise.all(
      updatedGroups.map((g: Group) =>
        axios.put(`http://localhost:4000/groups/${g.id}`, g)
      )
    );

    setEditStudent(null);
    fetchStudents();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">👨‍🎓 Students</h1>
        <p className="text-gray-500">All students from groups</p>
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-2xl bg-white shadow">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Group</th>
              <th className="p-3 text-left">Attendance</th>
              <th className="p-3 text-left">Payments</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.map((s) => (
              <tr key={s.id} className="border-t">
                <td className="p-3 font-semibold">{s.name}</td>
                <td className="p-3">{s.phone}</td>
                <td className="p-3">{s.groupName}</td>

                <td className="p-3">
                  {s.attendance.filter(Boolean).length}/{s.attendance.length}
                </td>

                <td className="p-3">
                  {s.payments.filter(Boolean).length}/{s.payments.length}
                </td>

                <td className="flex gap-3 p-3">
                  <button
                    onClick={() => openEdit(s)}
                    className="text-blue-500"
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() => handleDelete(s.groupId, s.id)}
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

      {/* EDIT MODAL */}
      {editStudent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6">

            <h2 className="mb-4 text-xl font-bold">
              Edit Student
            </h2>

            <input
              className="mb-3 w-full rounded-xl border p-2"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              placeholder="Name"
            />

            <input
              className="mb-4 w-full rounded-xl border p-2"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
              placeholder="Phone"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditStudent(null)}
                className="rounded-xl! bg-gray-200 px-4 py-2"
              >
                Cancel
              </button>

              <button
                onClick={saveEdit}
                className="rounded-xl! bg-green-500 px-4 py-2 text-white"
              >
                Save
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}