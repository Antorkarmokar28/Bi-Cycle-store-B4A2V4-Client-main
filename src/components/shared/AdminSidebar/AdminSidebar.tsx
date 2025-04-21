import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { FaBicycle } from "react-icons/fa6";
import { NavLink, Outlet } from "react-router";
import { useAppSelector } from "@/redux/hooks";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { CustomerSidebarItems } from "./CustomerSidebarItems";
import { AdminSidebarItems } from "./AdminSidebarItems";
import { TAdminSidebarItems } from "@/types/sidebar";

// user role
const userRole = {
  ADMIN: "admin",
  CUSTOMER: "customer",
};

const AdminSidebar = () => {
  const user = useAppSelector(useCurrentUser);

  const [sidebarItems, setSidebarItems] = useState<TAdminSidebarItems>([]);

  useEffect(() => {
    // Check user role and set sidebar items accordingly
    switch (user?.role) {
      case userRole.ADMIN:
        setSidebarItems(AdminSidebarItems);
        break;
      case userRole.CUSTOMER:
        setSidebarItems(CustomerSidebarItems);
        break;
      default:
        setSidebarItems([]);
    }
  }, [user]);

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
          {sidebarItems.map((item) => (
            <li key={item?.key} className="mb-4">
              <NavLink
                onClick={handleLinkClick}
                to={item?.link}
                className={({ isActive }) =>
                  `flex gap-4 py-2 px-4 rounded ${
                    isActive ? "bg-gray-700" : "hover:bg-gray-700"
                  }`
                }
              >
                {item?.icon}
                {item?.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Page Content */}
      <Outlet />
    </div>
  );
};

export default AdminSidebar;