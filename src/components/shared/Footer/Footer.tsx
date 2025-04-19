import {
  Facebook,
  Instagram,
  Mail,
  MapPinned,
  Phone,
  Twitter,
} from "lucide-react";
import { FaBicycle } from "react-icons/fa6";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-[#09192c] py-6">
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* logo inner */}
          <div>
            {/* logo */}
            <Link
              to="/"
              className="text-2xl flex items-center gap-2 font-bold py-4 uppercase"
            >
              <FaBicycle className="text-primary" />
              <p className="text-primary">
                Ride<span className="text-white">ology</span>
              </p>
            </Link>
            {/* description */}
            <p className="text-white text-sm mt-6 leading-7">
              Rideology is your go-to online shop for premium bicycles, cycling
              gear, and accessories. Whether you're a casual rider or a cycling
              enthusiast, we bring you top-quality bikes and everything you need
              for the perfect ride — delivered straight to your doorstep.
            </p>
            <ul className="text-white font-bold mt-6 mb-6">
              <li className="flex gap-4">
                <Link to="https://www.facebook.com/">
                  <Facebook />
                </Link>
                <Link to="https://www.instagram.com/">
                  <Instagram />
                </Link>
                <Link to="https://x.com/?lang=en">
                  <Twitter />
                </Link>
              </li>
            </ul>
          </div>
          {/* quick link inner */}
          <div>
            <h3 className="text-white text-3xl font-semibold mb-6 ">
              Quick Links
            </h3>
            <ul className="text-white leading-8">
              <li className="hover:underline transition ease-in-out">
                <Link to="/">Home</Link>
              </li>
              <li className="hover:underline transition ease-in-out">
                <Link to="/product">Product</Link>
              </li>
              <li className="hover:underline transition ease-in-out">
                <Link to="/product-details">Product Details</Link>
              </li>
              <li className="hover:underline">
                <Link to="/about">About Us</Link>
              </li>
              <li className="hover:underline transition ease-in-out">
                <Link to="/orders">Orders</Link>
              </li>
            </ul>
          </div>
          {/* contact inner and social inner */}
          <div>
            <h3 className="text-white font-semibold text-3xl mb-6">
              Contact Us
            </h3>
            <ul className="text-white leading-8">
              <li className="flex items-center gap-4 mb-4">
                <Phone />
                <span>+1 (415) 558-2194</span>
              </li>
              <li className="flex items-center gap-4 mb-4">
                <Mail />
                <span>support@Rideology.com</span>
              </li>
              <li className="flex items-center gap-4 mb-4">
                <MapPinned />
                <span>
                  Rideology Support Center 742 Evergreen Terrace Springfield, IL
                  62704 United States
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr className="text-white" />
      {/* All rights reserved */}
      <div className="mt-6">
        <p className="text-white text-center">
          &copy; 2025 Rideology. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
