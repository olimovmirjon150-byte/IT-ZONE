import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaTelegramPlane,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo */}
          <div>
            <h2 className="text-3xl font-extrabold">
              <span className="text-green-500">IT</span> ZONE
            </h2>

            <p className="mt-4 leading-7 text-gray-400">
              Zamonaviy IT kurslari orqali o‘z karyerangizni yangi bosqichga
              olib chiqing.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-xl font-semibold">Quick Links</h3>

            <ul className="space-y-3 text-gray-400!">
                <Link href="/" className="text-decoration-none text-gray-400!">
                  <li className="cursor-pointer hover:text-green-500">
                    Home
                  </li>
                </Link>
              <Link href="/courses" className="text-decoration-none text-gray-400!">
                <li className="cursor-pointer hover:text-green-500">
                  Courses
                </li>
              </Link>
              <Link href="/teachers" className="text-decoration-none text-gray-400!">
                <li className="cursor-pointer hover:text-green-500">
                  Teachers
                </li>
              </Link>
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h3 className="mb-5 text-xl font-semibold">Courses</h3>

            <ul className="space-y-3 text-gray-400">
              <li className="cursor-pointer hover:text-green-500">
                Frontend
              </li>
              <li className="cursor-pointer hover:text-green-500">
                Backend
              </li>
              <li className="cursor-pointer hover:text-green-500">
                Cyber Security
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-5 text-xl font-semibold">Follow Us</h3>

            <div className="flex gap-3">
              <button className="rounded-2xl! bg-zinc-900 p-4 text-xl transition hover:bg-green-500">
                <FaTelegramPlane />
              </button>

              <button className="rounded-2xl! bg-zinc-900 p-4 text-xl transition hover:bg-green-500">
                <FaInstagram />
              </button>

              <button className="rounded-2xl! bg-zinc-900 p-4 text-xl transition hover:bg-green-500">
                <FaFacebookF />
              </button>

              <button className="rounded-2xl! bg-zinc-900 p-4 text-xl transition hover:bg-green-500">
                <FaYoutube />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-zinc-800 pt-6 text-center text-gray-500">
          © 2026 IT ZONE. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;