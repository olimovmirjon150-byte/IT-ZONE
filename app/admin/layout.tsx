"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { GraduationCap, Users, User, ClipboardList, LogOut } from "lucide-react";
import { TiThMenu } from "react-icons/ti";
import { MdGolfCourse } from "react-icons/md";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isAdmin = localStorage.getItem("role") === "admin";

    if (!isAdmin) {
      router.replace("/login");
    }

    setAuthChecked(true);
  }, [router]);

  const menuItems = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: TiThMenu,
    },
    {
      name: "Courses",
      href: "/admin/courses",
      icon: MdGolfCourse,
    },
    {
      name: "Teachers",
      href: "/admin/teachers",
      icon: GraduationCap,
    },
    {
      name: "Groups",
      href: "/admin/groups",
      icon: Users,
    },
    {
      name: "Students",
      href: "/admin/students",
      icon: User,
    },
    {
      name: "Applications",
      href: "/admin/applications",
      icon: ClipboardList,
    },
  ];

  if (!authChecked) return null;

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* SIDEBAR */}
      <aside className="fixed left-0 top-0 h-screen w-64 border-r border-gray-200 bg-white p-5">

        {/* LOGO */}
        <div className="mb-10">
          <h1 className="text-2xl font-black">
            <span className="text-green-500">IT</span> ZONE
          </h1>
          <p className="text-sm text-gray-500">
            Admin Dashboard
          </p>
        </div>

        {/* MENU */}
        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center text-decoration-none gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all ${
                  active
                    ? "bg-green-500 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100!"
                }`}
              >
                <Icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* LOGOUT */}
        <div className="absolute bottom-6">
          <button
            onClick={() => {
              localStorage.removeItem("role");
              router.push("/login");
            }}
            className="flex w-100 items-center justify-center gap-2 rounded-2xl! bg-red-50 px-4 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-500 hover:text-white"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* CONTENT */}
      <main className="ml-64 w-full p-6">
        {children}
      </main>
    </div>
  );
}