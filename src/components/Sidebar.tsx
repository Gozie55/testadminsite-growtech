import React, { useEffect } from "react";
import { Home, Users, FileDown, LogOut } from "lucide-react";

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }: SidebarProps) => {
  // Close on escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsSidebarOpen(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [setIsSidebarOpen]);

  // Auto-close when resizing to mobile view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsSidebarOpen]);

  return (
    <>
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed z-40 inset-y-0 left-0 transform lg:transform-none
          bg-gradient-to-b from-blue-600 to-indigo-700 text-white
          shadow-xl transition-transform duration-200 ease-in-out
          w-64 
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0`}
      >
        {/* Brand / Logo */}
        <div className="flex items-center gap-2 px-4 py-5 border-b border-white/20">
          <img
            src="/growtechafrica.png"
            alt="Logo"
            className="h-10 w-10 rounded-lg"
          />
          <span className="font-semibold text-lg">GrowTechAfrica Admin</span>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col p-4 space-y-2 flex-1">
          <a
            href="/dashboard"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition"
            onClick={() => setIsSidebarOpen(false)}
          >
            <Home className="w-5 h-5" />
            <span>Dashboard</span>
          </a>

          <a
            href="/registrations"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition"
            onClick={() => setIsSidebarOpen(false)}
          >
            <Users className="w-5 h-5" />
            <span>Registrations</span>
          </a>

          <a
            href="/export"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition"
            onClick={() => setIsSidebarOpen(false)}
          >
            <FileDown className="w-5 h-5" />
            <span>Export Data</span>
          </a>
        </nav>

        {/* Footer / Logout */}
        <div className="p-4 border-t border-white/20">
          <a href="/login">
            <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-red-500 transition">
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </a>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
