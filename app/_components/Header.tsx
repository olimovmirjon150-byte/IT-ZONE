import Link from "next/link";
import { FaSignInAlt } from "react-icons/fa";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <h1 className="text-3xl font-extrabold">
          <span className="text-green-500">IT</span>
          <span className="text-gray-900"> ZONE</span>
        </h1>

        {/* Navigation */}
        <nav>
          <ul className="flex items-center gap-10">
            <Link href="/" className="text-decoration-none">
              <li className="cursor-pointer font-medium text-gray-600 transition hover:text-green-500">
                Home
              </li>
            </Link>

            <Link href="/courses" className="text-decoration-none">
              <li className="cursor-pointer font-medium text-gray-600 transition hover:text-green-500">
                Courses
              </li>
            </Link>
            <Link href="/teachers" className="text-decoration-none">
              <li className="cursor-pointer font-medium text-gray-600 transition hover:text-green-500">
                Teachers
              </li>
            </Link>
          </ul>
        </nav>
        <div className="flex gap-2">
        <Link
  href="/login"
  className="flex text-decoration-none items-center gap-3 rounded-2xl bg-green-500 px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-green-600 hover:shadow-lg"
>
  <FaSignInAlt className="text-lg" />
  Login
</Link>

        {/* Button */}
        <Link href="/applications" className="text-decoration-none">
        <button className="cursor-pointer rounded-2xl! bg-green-500 px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-green-600 hover:shadow-lg">
          Join Now
        </button>
        </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;