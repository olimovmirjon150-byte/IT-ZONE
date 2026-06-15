"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { FaEnvelope, FaBriefcase } from "react-icons/fa";
import Footer from "../_components/Footer";
import Header from "../_components/Header";

interface Teacher {
  id: number;
  name: string;
  email: string;
  specialty: string;
  experience: string;
  image: string;
  bio: string;
}

const Page = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/teachers"
        );

        setTeachers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      {/* Hero */}
      <section className="bg-black py-24 text-white">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <span className="rounded-full bg-green-500/20 px-4 py-2 text-sm font-medium text-green-400">
            IT ZONE Team
          </span>

          <h1 className="mt-6 text-5xl font-bold">
            Meet Our Mentors
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            Tajribali mentorlar bilan zamonaviy texnologiyalarni
            o‘rganing va IT sohasida professional bo‘ling.
          </p>
        </div>
      </section>

      {/* Teachers */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          {loading ? (
            <div className="text-center text-xl font-semibold">
              Loading...
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {teachers.map((teacher) => (
                <div
                  key={teacher.id}
                  className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                >
                  {/* Image */}
                  <div className="overflow-hidden">
                    <img
                      src={teacher.image}
                      alt={teacher.name}
                      className="h-72 w-full object-cover transition duration-500 group-hover:scale-110"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {teacher.name}
                    </h2>

                    <p className="mt-2 font-medium text-green-500">
                      {teacher.specialty}
                    </p>

                    <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                      <FaBriefcase />
                      <span>{teacher.experience}</span>
                    </div>

                    <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                      <FaEnvelope />
                      <span>{teacher.email}</span>
                    </div>

                    <p className="mt-5 line-clamp-4 text-sm leading-6 text-gray-600">
                      {teacher.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Page;