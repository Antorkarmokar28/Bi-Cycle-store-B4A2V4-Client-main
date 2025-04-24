import Banner from "@/components/Banner/Banner";
import FeaturedProducts from "@/components/FeaturedProducts/FeaturedProducts";
import ImageGallery from "@/components/ImageGallery/ImageGallery";
import Service from "@/components/Service/Service";

const Home = () => {
  return (
    <div>
      <Banner />
      <Service />
      <FeaturedProducts />
      <ImageGallery />
    </div>
  );
};

export default Home;
