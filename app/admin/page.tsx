"use client";

import axios from "axios";
import { useEffect, useState } from "react";

const Page = () => {
  const [teachers, setTeachers] = useState<any[]>([]);
  const [groups, setGroups] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [studentsCount, setStudentsCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const teachersRes = await axios.get("http://localhost:4000/teachers");
      const groupsRes = await axios.get("http://localhost:4000/groups");
      const appsRes = await axios.get("http://localhost:4000/applications");

      setTeachers(teachersRes.data);
      setGroups(groupsRes.data);
      setApplications(appsRes.data);

      // 🔥 total students count
      const totalStudents = groupsRes.data.reduce(
        (acc: number, group: any) => acc + (group.students?.length || 0),
        0
      );

      setStudentsCount(totalStudents);
    };

    fetchData();
  }, []);

  const stats = [
    {
      title: "Teachers",
      value: teachers.length,
      desc: "Active teachers in system",
    },
    {
      title: "Groups",
      value: groups.length,
      desc: "Running study groups",
    },
    {
      title: "Students",
      value: studentsCount,
      desc: "Total enrolled students",
    },
    {
      title: "Applications",
      value: applications.length,
      desc: "New join requests",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">

      {/* HEADER */}
      <div className="mb-10 rounded-3xl bg-white p-8 shadow">
        <h1 className="text-3xl font-bold">
          👋 Welcome to <span className="text-green-500">IT ZONE</span> Admin Panel
        </h1>

        <p className="mt-2 text-gray-500">
          Manage teachers, groups, students and applications from one place.
        </p>
      </div>

      {/* STATS */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((item, index) => (
          <div
            key={index}
            className="rounded-3xl bg-white p-6 shadow hover:shadow-md transition"
          >
            <h2 className="text-sm text-gray-500">{item.title}</h2>

            <p className="mt-2 text-3xl font-bold text-green-500">
              {item.value}
            </p>

            <p className="mt-2 text-sm text-gray-400">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* INFO SECTION */}
      <div className="mt-10 grid gap-6 md:grid-cols-2">

        <div className="rounded-3xl bg-white p-6 shadow">
          <h3 className="text-xl font-bold mb-3">📊 System Overview</h3>

          <p className="text-gray-500 text-sm">
            This admin panel helps you manage IT ZONE education system.
            You can control teachers, groups, students and applications in real time.
          </p>
        </div>

        <div className="rounded-3xl bg-green-500 p-6 text-white shadow">
          <h3 className="text-xl font-bold mb-3">⚡ Quick Actions</h3>

          <ul className="space-y-2 text-sm">
            <li>• Add new teacher</li>
            <li>• Create new group</li>
            <li>• Review applications</li>
            <li>• Manage students attendance</li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default Page;