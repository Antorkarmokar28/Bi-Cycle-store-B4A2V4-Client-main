import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react"; // optional icons
import { FaBicycle } from "react-icons/fa6";
import { AdminSidebarItems } from "./AdminSidebarItems";
import { NavLink } from "react-router";
const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  // Close menu when window is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // Close menu when clicking a link
  const handleLinkClick = () => {
    setIsOpen(false);
  };
  return (
    <div className="flex">
      {/* Mobile menu button */}
      <button className="md:hidden p-4 z-50" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? (
          <X className="text-white absolute left-52 top-10" />
        ) : (
          <Menu />
        )}
      </button>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-[#09192c] text-white p-5 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:block`}
      >
        <h2 className="text-2xl flex items-center gap-2 font-bold py-4 uppercase">
          <FaBicycle className="text-primary" />
          <p className="text-primary">
            Ride<span className="text-white">ology</span>
          </p>
        </h2>
        <ul>
          {AdminSidebarItems.map((item) => (
            <li>
              <NavLink
                onClick={handleLinkClick}
                key={item?.key}
                to={item?.link}
                className = "block py-2 px-4 hove:bg-gray-700 rounded"
              >
                {item?.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      {/* Page Content */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold">Welcome to Rideology!</h1>
        <p className="mt-4 text-gray-600">Your one-stop bicycle shop.</p>
      </div>
    </div>
  );
};

export default AdminSidebar;
// href = "#";
// onClick = { handleLinkClick };
// className = "block py-2 px-4 bg-gray-700 rounded";
