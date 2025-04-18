import { Outlet } from "react-router";
import Navbar from "../shared/Navbar/Navbar";
import Footer from "../shared/Footer/Footer";

const MainLayout = () => {
  return (
    <main className="w-full bg-white">
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
};

export default MainLayout;
