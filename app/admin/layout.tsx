"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { HousePlus } from "lucide-react";

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
    const isAdmin = localStorage.getItem("nestuzAdmin") === "true";
    if (!isAdmin) {
      router.replace("/login");
    }
    setAuthChecked(true);
  }, [router]);

  const menuItems = [
    {
      name: "Properties",
      href: "/admin/properties",
      icon: "🏠",
    },
    {
      name: "Add Property",
      href: "/admin/create",
      icon: "➕",
    },
    {
      name: "Orders",
      href: "/admin/orders",
      icon: "📦",
    },
    {
      name: "Categories",
      href: "/admin/categories",
      icon: "🏷️",
    },
    {
      name: "Add Category",
      href: "/admin/createCategory",
      icon: "✨",
    },
  ];

  if (!authChecked) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-[#050816] text-white">
      
      {/* SIDEBAR */}
      <aside className="fixed left-0 top-0 flex h-screen w-60 flex-col border-r border-white/10 bg-black/70 p-4 backdrop-blur-3xl">
        
        {/* LOGO */}
        <div className="flex items-center gap-3">
          
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-cyan-400 to-blue-600 shadow-lg shadow-cyan-500/30">
            <HousePlus size={24} />
          </div>

          <div>
            <h2 className="text-xl font-black">
              NestUz
            </h2>

            <p className="text-xs text-gray-400">
              Admin Dashboard
            </p>
          </div>
        </div>

        {/* MENU */}
        <nav className="mt-10 flex flex-col gap-2">
          {menuItems.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-decoration-none transition-all duration-300 ${
                  active
                    ? "bg-linear-to-r from-cyan-400 to-blue-600 text-white shadow-lg shadow-cyan-500/20"
                    : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span className="text-lg">
                  {item.icon}
                </span>

                <span className="text-sm font-medium">
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* LOGOUT */}
        <div className="mt-auto">
          
          <button
            onClick={() => {
              localStorage.removeItem("nestuzAdmin");
              router.push("/");
            }}
            className="flex h-12 w-full items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10 text-sm font-semibold text-red-400 transition hover:bg-red-500 hover:text-white"
          >
            Logout
          </button>
        </div>

        {/* GLOW */}
        <div className="absolute bottom-0 left-1/2 h-28 w-28 -translate-x-1/2 rounded-full bg-cyan-500/20 blur-[80px]" />
      </aside>

      {/* CONTENT */}
      <main className="ml-60 w-full p-6">
        {children}
      </main>
    </div>
  );
}