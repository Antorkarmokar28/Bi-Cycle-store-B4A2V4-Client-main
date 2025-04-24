import { Link } from "react-router";
import { Button } from "../ui/button";
import { FaArrowRightLong } from "react-icons/fa6";
import { CategoryItems } from "./CategoryItems";
import { IoIosArrowForward } from "react-icons/io";
import { TypeAnimation } from "react-type-animation";
const Banner = () => {
  return (
    <>
      <div className="container mx-auto flex justify-between items-end py-10 px-4 md:px-8 bg-white">
        <div>
          <h2 className="text-3xl md:text-5xl text-secondary font-inter font-bold mb-6">
            The Ultimate Bi-Cycle Store
          </h2>
          <p className="font-inter mb-4 text-secondary">
            We foster curosity and deliver moments of brand and product
            excitment
          </p>
          <Button className="text-white font-inter">
            <Link to="/">Book Now</Link>
            <FaArrowRightLong />
          </Button>
        </div>
        <div>
          <p className="font-inter text-secondary hidden md:block md:text-lg border-l-4 border-primary pl-4">
            Try connected Electric bike with Rideout
          </p>
        </div>
      </div>
      <div className="w-full h-[500px] bg-[url('assets/images/Bicycle-Banner.png')] bg-no-repeat bg-cover bg-center relative z-0">
        <div className="container mx-auto absolute md:top-[34%] xl:left-20 2xl:left-[10%] top-20">
          <div className="md:w-3/4 lg:w-2/4 px-4 md:px-8">
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                "Find Your Perfect Ride",
                1000, // wait 1s before replacing "Mice" with "Hamsters"
                "Conquer the City Streets",
                1000,
                "Explore the Mountain Trails",
                1000,
                "Experience the Joy of Cycling!",
                1000,
              ]}
              wrapper="span"
              speed={90}
              className="text-white text-1xl md:text-3xl font-inter font-bold"
              repeat={Infinity}
            />
            <p className="mt-3 text-sm md:lg md:mt-6 text-white font-inter leading-7">
              Discover the joy of cycling with top-quality bicycles designed for
              adventure, speed, and comfort. Whether you're commuting, racing,
              or exploring, we’ve got the perfect ride for you!" Let me know if
              you'd like more variations or tweaks!
            </p>
          </div>
        </div>
        <div className="md:px-0 px-6 bg-secondary opacity-80 py-2 absolute bottom-0 w-full">
          <div className="container mx-auto flex justify-between items-center px-4 md:px-8">
            <ul className="flex flex-wrap gap-4">
              {CategoryItems.map((item) => (
                <li key={item?.id}>
                  <a
                    className="text-sm lg:text-lg text-white font-inter"
                    href={item?.link}
                  >
                    {item?.title}
                  </a>
                </li>
              ))}
            </ul>
            <Button className="text-white font-inter">
              <Link to="/">Shop Now</Link>
              <IoIosArrowForward />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
