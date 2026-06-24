"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import {
FaArrowRight,
FaBookOpen,
FaMoneyBillWave,
FaSearch,
} from "react-icons/fa";

import Header from "../_components/Header";
import Footer from "../_components/Footer";

interface Course {
id: string;
title: string;
description: string;
price: string;
syllabus: string[];
}

export default function Page() {
const [courses, setCourses] = useState<Course[]>([]);
const [loading, setLoading] = useState(true);
const [search, setSearch] = useState("");

useEffect(() => {
const fetchCourses = async () => {
try {
const { data } = await axios.get(
"http://localhost:4000/courses"
);

    setCourses(data);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

fetchCourses();

}, []);

const filteredCourses = courses.filter((course) =>
course.title
.toLowerCase()
.includes(search.toLowerCase())
);

return ( <main className="min-h-screen bg-gray-50"> <Header />

```
  {/* HERO */}
  <section className="relative overflow-hidden bg-linear-to-br from-black via-gray-900 to-black py-32 text-white">
    <div className="absolute inset-0">

      <div className="absolute left-1/2 top-10 h-112.5 w-112.5 -translate-x-1/2 rounded-full bg-green-500/20 blur-[140px] animate-pulse" />

      <div className="absolute left-0 bottom-0 h-80 w-80 rounded-full bg-green-400/10 blur-[120px]" />

      <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-emerald-400/10 blur-[120px]" />

    </div>

    <div className="relative mx-auto max-w-7xl px-6 text-center">

      <span className="rounded-full border border-green-500/20 bg-green-500/10 px-5 py-2 text-sm font-medium text-green-400 backdrop-blur-md">
        🚀 IT ZONE Learning Platform
      </span>

      <h1 className="mt-8 text-5xl font-extrabold leading-tight md:text-7xl">
        Professional
        <span className="block bg-linear-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
          IT Courses
        </span>
      </h1>

      <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-300">
        Zamonaviy IT texnologiyalarini o‘rganing,
        real loyihalarda ishlang va kuchli
        portfolio bilan karyerangizni boshlang.
      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-4">

        <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 backdrop-blur-md">
          📚 {courses.length} Courses
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 backdrop-blur-md">
          🎓 Professional Mentors
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 backdrop-blur-md">
          ⚡ Practice Based Learning
        </div>

      </div>
    </div>
  </section>

  {/* SEARCH */}
  <section className="mx-auto max-w-7xl px-6 pt-16">
    <div className="mx-auto max-w-xl">
      <div className="relative">

        <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />

        <input
          type="text"
          placeholder="Search course..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full rounded-2xl border border-gray-200 bg-white py-4 pl-14 pr-4 shadow-lg outline-none transition-all focus:border-green-500 focus:ring-4 focus:ring-green-100"
        />
      </div>
    </div>
  </section>

  {/* COURSES */}
  <section className="mx-auto max-w-7xl px-6 py-20">

    {loading ? (
      <div className="flex justify-center">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-green-500 border-t-transparent" />
      </div>
    ) : filteredCourses.length === 0 ? (
      <div className="py-20 text-center">
        <h2 className="text-4xl font-bold text-gray-800">
          Course Not Found 😔
        </h2>

        <p className="mt-4 text-gray-500">
          Try another keyword...
        </p>
      </div>
    ) : (
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

        {filteredCourses.map((course, index) => (
          <div
            key={course.id}
            className="group relative overflow-hidden rounded-[32px] border border-gray-200 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl"
          >
            {/* Glow */}
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-green-200 opacity-0 blur-3xl transition duration-500 group-hover:opacity-100" />

            {/* Badge */}
            <div className="mb-5 flex items-center justify-between">

              <span className="rounded-full bg-green-100 px-4 py-2 text-xs font-bold text-green-700">
                Course #{index + 1}
              </span>

            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-900">
              {course.title}
            </h2>

            {/* Description */}
            <p className="mt-4 line-clamp-3 leading-7 text-gray-500">
              {course.description}
            </p>

            {/* Price */}
            <div className="mt-6 flex items-center gap-2 text-lg font-bold text-green-600">
              <FaMoneyBillWave />
              {course.price} so'm
            </div>

            {/* Syllabus */}
            <div className="mt-7">

              <div className="mb-3 flex items-center gap-2 font-semibold text-gray-700">
                <FaBookOpen />
                Technologies
              </div>

              <div className="flex flex-wrap gap-2">

                {course.syllabus?.map(
                  (item, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-gray-100 px-3 py-2 text-xs font-medium text-gray-600 transition hover:bg-green-100 hover:text-green-700"
                    >
                      {item}
                    </span>
                  )
                )}

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
}