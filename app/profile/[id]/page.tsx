"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FaUserGraduate } from "react-icons/fa";

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
  course: string;
  students: Student[];
}

interface Teacher {
  id: number;
  name: string;
  image: string;
  specialty: string;
  bio: string;
  groups: {
    groupId: string;
    groupName: string;
    course: string;
  }[];
}

export default function TeacherPage() {
  const { id } = useParams();

  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const teacherRes = await axios.get(
        `http://localhost:4000/teachers/${id}`
      );

      setTeacher(teacherRes.data);

      const groupsRes = await axios.get("http://localhost:4000/groups");

      const teacherGroups = groupsRes.data.filter((group: Group) =>
        teacherRes.data.groups.some(
          (g: any) => g.groupId === group.id
        )
      );

      setGroups(teacherGroups);
    };

    fetchData();
  }, [id]);

  if (!teacher) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  // ✅ TOGGLE FIX (1 MONTH ONLY)
  const updateStudent = async (
    groupId: string,
    studentId: number,
    type: "attendance" | "payments",
    index: number
  ) => {
    const group = groups.find((g) => g.id === groupId);
    if (!group) return;

    const updatedStudents = group.students.map((student) => {
      if (student.id === studentId) {
        const updatedArray = [...student[type]];
        updatedArray[index] = !updatedArray[index];

        return {
          ...student,
          [type]: updatedArray,
        };
      }
      return student;
    });

    const updatedGroup = {
      ...group,
      students: updatedStudents,
    };

    await axios.put(
      `http://localhost:4000/groups/${groupId}`,
      updatedGroup
    );

    setGroups((prev) =>
      prev.map((g) => (g.id === groupId ? updatedGroup : g))
    );

    if (selectedGroup?.id === groupId) {
      setSelectedGroup(updatedGroup);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      {/* TEACHER HEADER */}
      <div className="mb-8 rounded-3xl bg-white p-6 shadow-lg flex items-center gap-5">
        <img
          src={teacher.image}
          className="h-20 w-20 rounded-full object-cover"
        />

        <div>
          <h1 className="text-2xl font-bold">{teacher.name}</h1>
          <p className="text-green-600">{teacher.specialty}</p>
          <p className="text-gray-500 text-sm">{teacher.bio}</p>
        </div>
      </div>

      {/* GROUP SELECT */}
      <div className="rounded-3xl bg-white p-6 shadow">
        <h2 className="mb-3 font-bold">Select Group</h2>

        <select
          className="w-full rounded-2xl border p-3 outline-none focus:border-green-500"
          onChange={(e) => {
            const g = groups.find((x) => x.id === e.target.value);
            setSelectedGroup(g || null);
          }}
        >
          <option value="">Choose group</option>
          {groups.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
      </div>

      {/* STUDENTS PANEL */}
      {selectedGroup && (
        <div className="mt-10 space-y-4">

          <h2 className="text-2xl font-bold">
            {selectedGroup.name} Students
          </h2>

          {selectedGroup.students.map((student) => (
            <div
              key={student.id}
              className="rounded-3xl bg-white p-5 shadow-md flex flex-col gap-4"
            >

              {/* INFO */}
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <FaUserGraduate /> {student.name}
                  </h3>
                  <p className="text-gray-500 text-sm">{student.phone}</p>
                </div>
              </div>

              {/* ATTENDANCE */}
              <div>
                <p className="text-sm font-semibold mb-2">
                  Attendance (Months)
                </p>

                <div className="flex gap-2 flex-wrap">
                  {student.attendance.map((val, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        updateStudent(
                          selectedGroup.id,
                          student.id,
                          "attendance",
                          index
                        )
                      }
                      className={`h-8 w-8 rounded-lg transition ${
                        val
                          ? "bg-green-500"
                          : "bg-gray-300 hover:bg-gray-400"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* PAYMENTS */}
              <div>
                <p className="text-sm font-semibold mb-2">
                  Payments (Months)
                </p>

                <div className="flex gap-2 flex-wrap">
                  {student.payments.map((val, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        updateStudent(
                          selectedGroup.id,
                          student.id,
                          "payments",
                          index
                        )
                      }
                      className={`h-8 w-8 rounded-lg transition ${
                        val
                          ? "bg-green-500"
                          : "bg-red-300 hover:bg-red-400"
                      }`}
                    />
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}