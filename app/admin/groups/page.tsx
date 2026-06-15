"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaPlus, FaTrash, FaUsers } from "react-icons/fa";

interface Student {
  id: number;
  name: string;
  phone: string;
  attendance: boolean[];
  payments: boolean[];
}

interface Group {
  id: string;
  name: string;
  teacherId: number | null;
  teacher: string;
  course: string;
  price: string;
  duration: string;
  students: Student[];
}

interface Teacher {
  id: number | string;
  name: string;
  groups?: {
    groupId: string;
    groupName: string;
    course: string;
  }[];
}

export default function Page() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const [studentsModal, setStudentsModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

  const [studentName, setStudentName] = useState("");
  const [studentPhone, setStudentPhone] = useState("");

  const [form, setForm] = useState({
    name: "",
    teacherId: "",
    teacher: "",
    course: "",
    price: "",
    duration: "",
  });

  useEffect(() => {
    fetchGroups();
    fetchTeachers();
  }, []);

  const fetchGroups = async () => {
    const res = await axios.get("http://localhost:4000/groups");
    setGroups(res.data);
  };

  const fetchTeachers = async () => {
    const res = await axios.get("http://localhost:4000/teachers");
    setTeachers(res.data);
  };

  const syncTeacherGroups = async (teacherId: number | string, group: Group) => {
    const teacher = teachers.find((t) => String(t.id) === String(teacherId));
    if (!teacher) return;

    const exists = teacher.groups?.some((g) => g.groupId === group.id);

    const updatedGroups = exists
      ? teacher.groups
      : [
          ...(teacher.groups || []),
          {
            groupId: group.id,
            groupName: group.name,
            course: group.course,
          },
        ];

    await axios.patch(`http://localhost:4000/teachers/${teacherId}`, {
      groups: updatedGroups,
    });
  };

  const resetForm = () => {
    setForm({
      name: "",
      teacherId: "",
      teacher: "",
      course: "",
      price: "",
      duration: "",
    });
    setEditId(null);
    setModalOpen(false);
  };

  // CREATE / UPDATE GROUP
  const handleSubmit = async () => {
    if (!form.name.trim() || form.teacherId === "" || !form.course.trim())
      return alert("Fill all fields");

    const teacherId =
      form.teacherId === ""
        ? null
        : isNaN(Number(form.teacherId))
        ? form.teacherId
        : Number(form.teacherId);

    let groupId = editId || Math.random().toString(36).substring(2, 10);

    const payload = {
      id: groupId,
      ...form,
      teacherId,
      students: [],
    };

    if (editId) {
      await axios.put(`http://localhost:4000/groups/${editId}`, payload);
    } else {
      await axios.post("http://localhost:4000/groups", payload);
    }

    // 🔥 FIX: update teacher groups
    if (teacherId) {
      await syncTeacherGroups(teacherId, payload);
    }

    fetchGroups();
    fetchTeachers();
    resetForm();
  };

  const handleDelete = async (id: string) => {
    await axios.delete(`http://localhost:4000/groups/${id}`);
    fetchGroups();
  };

  const handleEdit = (group: Group) => {
    setEditId(group.id);
    setForm({
      name: group.name,
      teacherId: group.teacherId?.toString() || "",
      teacher: group.teacher,
      course: group.course,
      price: group.price,
      duration: group.duration,
    });
    setModalOpen(true);
  };

  const openStudents = (group: Group) => {
    setSelectedGroup(group);
    setStudentsModal(true);
  };

  // ADD STUDENT
  const addStudent = async () => {
    if (!selectedGroup) return;

    const newStudent: Student = {
      id: Date.now(),
      name: studentName,
      phone: studentPhone,
      attendance: Array(15).fill(false),
      payments: Array(12).fill(false),
    };

    const updated = {
      ...selectedGroup,
      students: [...selectedGroup.students, newStudent],
    };

    await axios.put(`http://localhost:4000/groups/${selectedGroup.id}`, updated);

    setSelectedGroup(updated);
    fetchGroups();

    setStudentName("");
    setStudentPhone("");
  };

  const deleteStudent = async (id: number) => {
    if (!selectedGroup) return;

    const updated = {
      ...selectedGroup,
      students: selectedGroup.students.filter((s) => s.id !== id),
    };

    await axios.put(`http://localhost:4000/groups/${selectedGroup.id}`, updated);

    setSelectedGroup(updated);
    fetchGroups();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">

      {/* HEADER */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Groups</h1>

        <button
          onClick={() => setModalOpen(true)}
          className="rounded-xl! flex justify-center items-center gap-2 bg-green-500 px-4 py-2 text-white"
        >
          <FaPlus /> Group
        </button>
      </div>

      {/* TABLE */}
      <div className="rounded-2xl bg-white shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Group</th>
              <th className="p-3">Teacher</th>
              <th className="p-3">Course</th>
              <th className="p-3">Students</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {groups.map((g) => (
              <tr key={g.id} className="border-t">
                <td className="p-3 font-semibold">{g.name}</td>
                <td className="p-3">{g.teacher}</td>
                <td className="p-3">{g.course}</td>
                <td className="p-3">{g.students.length}</td>

                <td className="flex gap-3 p-3">
                  <button onClick={() => handleEdit(g)} className="text-blue-500">
                    <FaEdit />
                  </button>

                  <button onClick={() => handleDelete(g.id)} className="text-red-500">
                    <FaTrash />
                  </button>

                  <button onClick={() => openStudents(g)} className="text-green-600">
                    <FaUsers />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* GROUP MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-xl rounded-2xl bg-white p-6">
            <h2 className="mb-4 text-xl font-bold">
              {editId ? "Edit Group" : "Create Group"}
            </h2>

            <div className="space-y-3">

              <input
                className="w-full rounded-xl border p-2"
                placeholder="Group name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <select
                className="w-full rounded-xl border mt-2 mb-2 p-2"
                value={form.teacherId}
                onChange={(e) => {
                  const t = teachers.find((x) => String(x.id) === e.target.value);

                  setForm({
                    ...form,
                    teacherId: e.target.value,
                    teacher: t?.name || "",
                  });
                }}
              >
                <option value="">Select teacher</option>
                {teachers.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>

              <input
                className="w-full rounded-xl border p-2"
                placeholder="Course"
                value={form.course}
                onChange={(e) => setForm({ ...form, course: e.target.value })}
              />

              <input
                className="w-full mt-2 mb-2 rounded-xl border p-2"
                placeholder="Price"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />

              <input
                className="w-full rounded-xl border p-2"
                placeholder="Duration"
                value={form.duration}
                onChange={(e) => setForm({ ...form, duration: e.target.value })}
              />

              <div className="flex justify-end mt-3 gap-2">
                <button onClick={resetForm} className="rounded-xl! bg-gray-200 px-4 py-2">
                  Cancel
                </button>

                <button onClick={handleSubmit} className="rounded-xl! bg-green-500 px-4 py-2 text-white">
                  Save
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* STUDENTS MODAL */}
      {studentsModal && selectedGroup && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4">
          <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white p-6">

            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">{selectedGroup.name} Students</h2>

              <button
                onClick={() => {
                  setStudentsModal(false);
                  setSelectedGroup(null);
                }}
                className="rounded-xl! bg-gray-200 px-4 py-2"
              >
                Close
              </button>
            </div>

            <div className="flex gap-2 mb-4">
              <input
                className="border p-2 rounded-xl"
                placeholder="Name"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
              />

              <input
                className="border p-2 rounded-xl"
                placeholder="Phone"
                value={studentPhone}
                onChange={(e) => setStudentPhone(e.target.value)}
              />

              <button
                onClick={addStudent}
                className="bg-green-500 text-white px-4 py-2 rounded-xl!"
              >
                Add
              </button>
            </div>

            <table className="w-full">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Attendance</th>
                  <th>Payments</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {selectedGroup.students.map((s) => (
                  <tr key={s.id}>
                    <td>{s.name}</td>
                    <td>{s.phone}</td>
                    <td>{s.attendance.filter(Boolean).length}/15</td>
                    <td>{s.payments.filter(Boolean).length}/12</td>
                    <td>
                      <button
                        onClick={() => deleteStudent(s.id)}
                        className="text-red-500"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        </div>
      )}

    </div>
  );
}