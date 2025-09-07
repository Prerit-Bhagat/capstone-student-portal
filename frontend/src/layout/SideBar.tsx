import {
  Calendar,
  FileText,
  Heart,
  LayoutDashboard,
  LogOut,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Appointment", href: "/appointment", icon: Calendar },
  { name: "Past Reports", href: "/past-reports", icon: FileText },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  return (
    <>
      {/* Sidebar container */}
      <div
        className={cn(
          "flex h-full w-80 flex-col bg-gray-800 text-white transition-transform duration-300 ease-in-out z-50",
          "fixed md:relative",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-4 md:px-6 py-4 md:py-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg md:text-xl font-bold">TIET MediHub</span>
          </div>
          <button
            onClick={onClose}
            className="md:hidden p-2 hover:bg-gray-700 rounded-md"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <div className="px-4">
          <nav className="space-y-2">
            {navigation.map((item) => {
              const isActive = window.location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-md px-3 py-2",
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-700"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Logout at bottom */}
        <div className="mt-auto px-4 pb-4">
          <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-gray-300 hover:bg-gray-700">
            <LogOut className="h-5 w-5" />
            Log out
          </button>
        </div>
      </div>
    </>
  );
}
