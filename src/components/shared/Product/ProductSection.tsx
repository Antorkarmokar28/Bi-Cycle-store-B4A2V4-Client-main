import ProductCard from "./ProductCard";

const ProductSection = () => {
  return (
    <div className="container bg-white mx-auto mt-20 px-4 md:px-8 font-inter mb-30">
      <h3 className="border-l-4 border-primary px-4 text-3xl font-bold mb-6">
        <span className="text-primary">Featured</span> Bicycles
      </h3>
      <ProductCard />
    </div>
  );
};

export default ProductSection;
