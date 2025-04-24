import { useParams } from "react-router";
import { TProduct } from "@/types/global";
import { useGetSingleProductQuery } from "@/redux/features/product/productsApi";
import { Button } from "@/components/ui/button";

const ProductDetails = () => {
  const { productId } = useParams<{ productId: string }>(); // Changed to match route parameter
  const { data, isLoading, isError } = useGetSingleProductQuery(
    productId as string
  );

  if (isLoading)
    return (
      <p className="text-center text-primary text-3xl font-bold">Loading...</p>
    );
  if (isError || !data?.data)
    return (
      <p className="text-center text-red-600 text-3xl font-bold">
        Product not found!
      </p>
    );

  const product: TProduct = data.data; // Changed variable name to avoid conflict

  return (
    <div className="container mx-auto bg-white p-4 md:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
        {/* Image section matching card style */}
        <div className="overflow-hidden rounded-t-2xl">
          <img
            className="w-full h-[300px] md:h-[350px] object-cover transform hover:scale-105 transition duration-300"
            src={product.image}
            alt={product.name}
          />
        </div>

        {/* Content section matching card style */}
        <div className="p-5 space-y-3">
          <h1 className="text-2xl font-semibold text-gray-800">
            {product.name}
          </h1>

          <div className="space-y-2">
            <p className="text-sm text-gray-700">
              <span className="font-medium">Brand:</span> {product.brand}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-medium">Model:</span> {product.model}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-medium">Category:</span> {product.category}
            </p>
          </div>

          {/* Stock status matching card style */}
          <div className="flex items-center justify-between pt-2">
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                product.quantity > 0
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {product.quantity > 0
                ? `In Stock (${product.quantity})`
                : "Out of Stock"}
            </span>
            <p className="text-xl font-semibold text-primary">
              ${product.price}
            </p>
          </div>

          {/* Description with matching style */}
          <div className="pt-4 border-t border-gray-100">
            <h3 className="text-sm font-medium text-gray-800 mb-2">
              Description
            </h3>
            <p className="text-sm text-gray-500">{product.description}</p>
          </div>

          {/* Optional: Add to cart button if needed */}
          <Button className="w-full mt-6  text-white py-2 cursor-pointer">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
