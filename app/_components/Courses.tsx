"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";

interface Course {
  id: number;
  title: string;
  description: string;
}

const Section = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/courses"
        );

        setCourses(data.slice(0, 3));
      } catch (error) {
        console.error("Courses fetch error:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-600">
            Our Courses
          </span>

          <h2 className="mt-4 text-4xl font-bold text-gray-900">
            Popular Courses
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-500">
            IT ZONE'dagi eng mashhur kurslarni o‘rganing va
            professional darajaga chiqing.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, index) => (
            <div
              key={course.id}
              className="group rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="mb-5 inline-flex rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-600">
                #{index + 1}
              </div>

              <h3 className="mb-4 text-2xl font-bold text-gray-900">
                {course.title}
              </h3>

              <p className="mb-8 text-gray-500">
                {course.description}
              </p>

            <Link href="/courses" className="text-decoration-none">
              <button className="flex items-center gap-2 font-semibold text-green-500 transition-all duration-300 group-hover:gap-4">
                Learn More
                <FaArrowRight />
              </button>
            </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section;