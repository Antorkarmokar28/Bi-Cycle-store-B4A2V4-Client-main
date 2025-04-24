/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion, AnimatePresence } from "framer-motion";
import { MenuItems } from "./MenuItems";
import { Link } from "react-router";
import { PiSignInFill } from "react-icons/pi";
const ResponsiveMenu = ({ openMenu }: any) => {

  return (
    <AnimatePresence mode="wait">
      {openMenu && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.3 }}
          className="absolute top-20 left-0 w-full h-screen z-20"
        >
          <div className="text-xl font-semibold uppercase bg-primary py-10 m-6 rounded-3xl text-white lg:hidden">
            <ul className="flex flex-col justify-center items-center gap-10 font-inter">
              {MenuItems.map((item) => {
                return (
                  <li key={item?.id}>
                    <a className="lg:hidden" href={item?.link}>
                      {item?.title}
                    </a>
                  </li>
                );
              })}
            </ul>
            <div className="flex justify-center mt-6">
              <button className="hover:bg-white text-white px-3 py-2 rounded-md border-2 border-white duration-200 ease-in items-center gap-1 md:gap-2 font-semibold flex md:hidden ">
                <Link to="/">Sign in</Link>
                <PiSignInFill className="font-semibold md:text-2xl" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResponsiveMenu;
