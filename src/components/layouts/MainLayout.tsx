import { Outlet } from "react-router";
import Navbar from "../shared/Navbar/Navbar";

const MainLayout = () => {
  return (
    <main className="w-full bg-white">
      <Navbar />
      <Outlet />
    </main>
  );
};

export default MainLayout;
