"use client";

import axios from "axios";
import { useState } from "react";
import Header from "../_components/Header";
import Footer from "../_components/Footer";

const Page = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    courseTitle: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.courseTitle) return;

    try {
      setLoading(true);

      await axios.post("http://localhost:4000/applications", {
        id: Date.now().toString(),
        ...form,
        date: new Date().toISOString().slice(0, 10),
      });

      setSuccess(true);

      setForm({
        name: "",
        phone: "",
        courseTitle: "",
      });

      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-white">
<Header />
      {/* SUCCESS TOAST */}
      {success && (
        <div className="fixed right-6 top-6 z-50 rounded-2xl bg-green-500 px-6 py-4 text-white shadow-xl animate-bounce">
          ✅ So‘rov muvaffaqiyatli yuborildi!
        </div>
      )}

      {/* CENTER FORM */}
      <div className="flex min-h-screen items-center justify-center px-6">

        <div className="w-full max-w-xl rounded-3xl border bg-white p-8 shadow-xl">

          <h1 className="text-3xl font-bold text-gray-900">
            📩 Application Form
          </h1>

          <p className="mt-2 text-gray-500">
            Kursga yozilish uchun formani to‘ldiring
          </p>

          <div className="mt-8 space-y-4">

            {/* NAME */}
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full name"
              className="w-full rounded-xl border p-3 outline-none focus:border-green-500"
            />

            {/* PHONE */}
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone number"
              className="w-full rounded-xl mt-3 mb-3 border p-3 outline-none focus:border-green-500"
            />

            {/* COURSE */}
            <input
              name="courseTitle"
              value={form.courseTitle}
              onChange={handleChange}
              placeholder="Course title"
              className="w-full rounded-xl border p-3 outline-none focus:border-green-500"
            />

            {/* BUTTON */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full rounded-xl! mt-4 bg-green-500 py-3 font-semibold text-white transition hover:bg-green-600 disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Application"}
            </button>

          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
};

export default Page;