"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const Page = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      // Admin Check
      const adminRes = await axios.get("http://localhost:4000/admin");

      const admin = adminRes.data.find(
        (item: { email: string; password: string }) =>
          item.email === email.trim() &&
          item.password === password.trim()
      );

      if (admin) {
        localStorage.setItem("role", "admin");
        localStorage.setItem("token", "admin");

        router.push("/admin");
        return;
      }

      // Teacher Check
      const teacherRes = await axios.get("http://localhost:4000/teachers");

      const teacher = teacherRes.data.find(
        (item: { email: string; password: string }) =>
          item.email === email.trim() &&
          item.password === password.trim()
      );

      if (teacher) {
        localStorage.setItem("role", "teacher");
        localStorage.setItem("teacher", JSON.stringify(teacher));

        router.push(`/profile/${teacher.id}`);
        return;
      }

      setError("Email yoki parolingiz xato!");
    } catch (err) {
      console.error(err);
      setError("Server bilan bog'lanishda xatolik!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-md rounded-3xl border border-gray-100 bg-white p-8 shadow-xl">
        {/* Logo */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold">
            <span className="text-green-500">IT</span> ZONE
          </h1>

          <p className="mt-3 text-gray-500">
            Admin yoki o'qituvchi sifatida tizimga kiring
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              required
              placeholder="name@gmail.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              className={`w-full rounded-2xl border px-4 py-3 outline-none transition ${
                error
                  ? "border-red-500"
                  : "border-gray-200 focus:border-green-500"
              }`}
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              required
              placeholder="********"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              className={`w-full rounded-2xl border px-4 py-3 outline-none transition ${
                error
                  ? "border-red-500"
                  : "border-gray-200 focus:border-green-500"
              }`}
            />

            {error && (
              <p className="mt-2 text-sm font-medium text-red-500">
                {error}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl! bg-green-500 py-3 font-semibold text-white transition-all duration-300 hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Page;