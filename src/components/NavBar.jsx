"use client";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {Home, UserPlus, LayoutDashboard, User} from "lucide-react";
import clsx from "clsx";

const navItems = [
  {href: "/user/homePage", icon: <Home size={20} />, label: "Home"},
  {href: "/user/requestBlood", icon: <LayoutDashboard size={20} />, label: "Request"},
  {href: "/user/events", icon: <UserPlus size={20} />, label: "Events"},
  {href: "/user/profile", icon: <User size={20} />, label: "Profile"},
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed z-50 bg-white/30 backdrop-blur-md shadow-md border border-white/20 px-4 py-2 rounded-xl flex justify-around items-center w-[95%] left-1/2 -translate-x-1/2
      bottom-4 md:top-4 md:bottom-auto md:rounded-full md:justify-center md:gap-12 md:w-auto">
      {navItems.map((item, index) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(
              "flex flex-col items-center px-3 py-2 rounded-full transition-all",
              isActive ? "bg-white/80 text-black shadow-md" : "hover:bg-red-200/50 text-gray-700",
              index === navItems.length - 1 && "md:ml-150" // shift Profile slightly right on desktop
            )}>
            {/* Mobile: show icon + label */}
            <span className="block md:hidden text-xl">{item.icon}</span>
            <span className="block text-xs md:hidden font-medium">{item.label}</span>

            {/* Desktop: show label only */}
            <span className="hidden md:block text-lg font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
