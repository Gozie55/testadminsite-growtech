import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }: NavbarProps) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-md">
      {/* Mobile layout */}
      <div className="flex items-center justify-between px-4 py-3 lg:hidden text-white">
        {/* Hamburger */}
        <button
          className="p-2 rounded-md hover:bg-white/20 transition"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo + Title */}
        <button
          onClick={() => {
            setIsSidebarOpen(false);
            navigate("/dashboard");
          }}
          className="flex items-center gap-2 hover:opacity-90 transition"
        >
          <img
            src="/growtechafrica.png"
            alt="Logo"
            className="h-8 w-8 sm:h-10 sm:w-10 rounded-full border-2 border-white shadow-md"
          />
          <span className="text-base font-semibold">GrowTechAfrica</span>
        </button>

        {/* Logout */}
        <a href="/login">
          <button className="px-3 py-1.5 rounded-lg bg-red-500 text-white hover:bg-red-600 transition shadow-md text-sm">
            Logout
          </button>
        </a>
      </div>

      {/* Desktop layout */}
      <div className="hidden lg:grid lg:grid-cols-3 lg:items-center lg:px-6 lg:py-3 text-white">
        {/* Left (empty to keep grid balanced) */}
        <div />

        {/* Logo + Title (centered) */}
        <div className="flex justify-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-3 hover:opacity-90 transition"
          >
            <img
              src="/growtechafrica.png"
              alt="Logo"
              className="h-10 w-10 rounded-full border-2 border-white shadow-md"
            />
            <span className="text-xl font-bold tracking-wide drop-shadow-lg">
              GrowTechAfrica Admin
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
