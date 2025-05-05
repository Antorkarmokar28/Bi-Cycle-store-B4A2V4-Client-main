import { NavLink } from "react-router";
import { MenuItems } from "./MenuItems";
import { FaBicycle } from "react-icons/fa6";
import { CiMenuFries } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { PiSignInFill } from "react-icons/pi";
import { useEffect, useState } from "react";
import ResponsiveMenu from "./ResponsiveMenu";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout, useCurrentUser } from "@/redux/features/auth/authSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { selectCart } from "@/redux/features/cart/cartSlice";
import { useSelector } from "react-redux";

const Navbar = () => {
  const cart = useSelector(selectCart);
  const cartItemCount = cart.length;
  const user = useAppSelector(useCurrentUser);
  const disPatch = useAppDispatch();

  const handleSignOut = () => {
    disPatch(logout());
  };

  const [openMenu, setOpenMenu] = useState(false);
  const [nav, setNav] = useState(false);

  const scrollNavbar = () => {
    if (window.scrollY >= 20) {
      setNav(true);
    } else {
      setNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollNavbar);
  }, []);

  return (
    <>
      <nav
        className={`sticky top-0 py-6 bg-white z-40 scroll-auto ${
          nav ? "border-b-2 border-primary" : "border-transparent"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-8 font-inter">
          {/* Logo inner */}
          <NavLink
            to="/"
            className="text-2xl flex items-center gap-2 font-bold py-4 uppercase"
          >
            <FaBicycle className="text-primary" />
            <p className="text-primary">
              Ride<span className="text-secondary">ology</span>
            </p>
          </NavLink>

          {/* Menu inner */}
          <div className="hidden lg:block">
            <ul className="flex items-center gap-6">
              {MenuItems.map((item) => (
                <li key={item?.id}>
                  <NavLink
                    to={item?.link}
                    className={({ isActive }) =>
                      isActive
                        ? "inline-block py-1 px-3 text-primary font-bold border-b-2 border-primary"
                        : "inline-block py-1 px-3 text-secondary hover:text-primary duration-200 ease-in font-bold"
                    }
                  >
                    {item?.title}
                  </NavLink>
                </li>
              ))}

              {/* ✅ Only show checkout if user is logged in */}
              {user && (
                <li>
                  <NavLink
                    to="/checkout"
                    className={({ isActive }) =>
                      isActive
                        ? "inline-block py-1 px-3 text-primary font-bold border-b-2 border-primary"
                        : "inline-block py-1 px-3 text-secondary hover:text-primary duration-200 ease-in font-bold"
                    }
                  >
                    Checkout
                  </NavLink>
                </li>
              )}
            </ul>
          </div>

          {/* Icons inner */}
          <div className="flex gap-4 md:gap-4 items-center">
            <NavLink
              to="/checkout"
              className="text-2xl bg-primary hover:text-white p-2 rounded-full duration-200 text-white relative"
            >
              <CiShoppingCart className="font-bold" />
              {/* Show cart count only when user is logged in */}
              {user && (
                <div className="absolute -top-3 left-6 w-6 h-6 rounded-full bg-gray-300 font-bold">
                  <p className="text-red-500 text-sm text-center">
                    {cartItemCount}
                  </p>
                </div>
              )}
            </NavLink>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="px-2 py-2 rounded-full bg-primary text-white">
                  Profile
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem className="mt-6 bg-white p-6 border-2 border-primary rounded-lg">
                    <p className="text-center text-primary mb-4 font-bold font-inter">
                      {user.name}
                    </p>
                    <NavLink
                      className="block mb-4 text-center hover:text-primary duration-200 font-inter"
                      to="/admin-dashboard"
                    >
                      Dashboard
                    </NavLink>
                    <button
                      onClick={handleSignOut}
                      className="hover:bg-primary cursor-pointer hover:text-white px-3 py-2 rounded-md border-2 border-primary text-primary duration-200 ease-in md:flex items-center gap-1 md:gap-2 font-semibold hidden"
                    >
                      Sign Out
                      <PiSignInFill className="font-semibold md:text-2xl" />
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <NavLink
                to="/signin"
                className="hover:bg-primary hover:text-white px-3 py-2 rounded-md border-2 border-primary text-primary duration-200 ease-in md:flex items-center gap-1 md:gap-2 font-semibold hidden"
              >
                Sign in
                <PiSignInFill className="font-semibold md:text-2xl" />
              </NavLink>
            )}
          </div>

          {/* Mobile hamburger menu inner */}
          <div
            className="lg:hidden"
            onClick={() => {
              setOpenMenu(!openMenu);
            }}
          >
            <CiMenuFries className="text-3xl text-secondary" />
          </div>
        </div>

        {/* Sidebar menu */}
        <ResponsiveMenu openMenu={openMenu} />
      </nav>
    </>
  );
};

export default Navbar;
