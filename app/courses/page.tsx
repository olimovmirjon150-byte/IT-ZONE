"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { FaArrowRight, FaBookOpen, FaMoneyBillWave } from "react-icons/fa";
import Header from "../_components/Header";
import Footer from "../_components/Footer";

interface Course {
  id: string;
  title: string;
  description: string;
  price: string;
  syllabus: string[];
}

const Page = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/courses");
        setCourses(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden bg-linear-to-br from-black via-gray-900 to-black py-28 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-green-500 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <span className="rounded-full bg-green-500/20 px-5 py-2 text-sm font-medium text-green-400">
            🚀 IT ZONE Learning Platform
          </span>

          <h1 className="mt-6 text-5xl font-extrabold tracking-tight">
            Professional <span className="text-green-400">Courses</span> for Your Future
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-gray-300">
            Zamonaviy IT kurslar, real projectlar va professional mentorlar bilan
            o‘z karyerangizni boshlang.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3">
              📚 {courses.length} Courses
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3">
              🎓 Certified Learning
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3">
              ⚡ Practice Based
            </div>
          </div>
        </div>
      </section>

      {/* COURSES */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        {loading ? (
          <div className="text-center text-lg font-semibold">
            Loading courses...
          </div>
        ) : (
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <div
                key={course.id}
                className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
              >
                {/* glow */}
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-green-100 opacity-0 blur-2xl transition group-hover:opacity-100" />

                {/* TITLE */}
                <h2 className="text-2xl font-bold text-gray-900">
                  {course.title}
                </h2>

                {/* DESCRIPTION */}
                <p className="mt-3 text-sm leading-6 text-gray-500">
                  {course.description}
                </p>

                {/* PRICE */}
                <div className="mt-5 flex items-center gap-2 text-green-600">
                  <FaMoneyBillWave />
                  <span className="font-semibold">{course.price} so‘m</span>
                </div>

                {/* SYLLABUS */}
                <div className="mt-6">
                  <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <FaBookOpen /> Syllabus
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {course.syllabus?.map((item, i) => (
                      <span
                        key={i}
                        className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
};

export default Page;