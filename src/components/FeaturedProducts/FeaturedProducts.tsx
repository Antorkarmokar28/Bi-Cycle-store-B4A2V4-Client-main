import { useGetProductQuery } from "@/redux/features/admin/productsmanagement";
import { TProduct } from "@/types/global";
import { Link, useNavigate } from "react-router";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/features/cart/cartSlice";

const FeaturedProducts = () => {
  const dispatch = useDispatch();
  const { data: productData } = useGetProductQuery(undefined);
  const navigate = useNavigate();
  // redirect product details page
  const handleProductDetails = (productId: string) => {
    navigate(`/allProducts/productDetails/${productId}`);
  };
  // add to product in the cart 
  const handleProductAddToCart = (productId: string) => {
    dispatch(addToCart({ productId, quantity: 1 }));
  };
  return (
    <div className="container mx-auto bg-white mt-20 px-4 md:px-8 font-inter">
      <h3 className="text-3xl font-bold text-secondary px-4 border-l-4 border-primary mb-8">
        <span className="text-primary">Featured </span> Products
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {productData?.data?.slice(0, 6).map((product: TProduct) => (
          <div
            key={product._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-gray-100"
          >
            <div className="overflow-hidden rounded-t-2xl">
              <img
                className="w-full h-[220px] lg:h-[250px] object-cover transform hover:scale-105 transition duration-300"
                src={product.image}
                alt={product.name}
              />
            </div>

            <div className="p-5 space-y-3">
              <h5 className="text-xl font-semibold text-gray-800">
                {product.name}
              </h5>
              <p className="text-sm text-gray-500">Brand: {product.brand}</p>

              <div className="flex items-center justify-between">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    product.quantity > 0
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {product.quantity > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </div>

              <div className="flex items-center justify-between pt-4">
                <button
                  onClick={() => handleProductDetails(product._id)}
                  className="text-primary font-medium text-sm hover:underline cursor-pointer"
                >
                  See More Details
                </button>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProductAddToCart(product._id);
                  }}
                  className="text-white bg-primary hover:bg-primary/90 cursor-pointer"
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <Link to="/allProducts">
          <Button className="text-white px-6 py-2 text-lg cursor-pointer">
            View All
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedProducts;
