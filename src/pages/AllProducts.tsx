import Loader from "@/components/shared/Loader/Loader";
import { Button } from "@/components/ui/button";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { useGetAllProductsQuery } from "@/redux/features/product/productsApi";
import { TProduct } from "@/types/global";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const categories = ["All Categories", "BMX", "Mountain", "Road"];
const brands = ["All Brands", "Mongoose", "Trek", "Giant"];
const availabilityOptions = ["All Stock", "In Stock", "Out of Stock"];
const sortOptions = [
  { value: "price", label: "Price: Low to High" },
  { value: "-price", label: "Price: High to Low" },
  { value: "-createdAt", label: "Newest" },
  { value: "createdAt", label: "Oldest" },
];

export default function AllProducts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [brand, setBrand] = useState("All Brands");
  const [availability, setAvailability] = useState("All Stock");
  const [sort, setSort] = useState("-createdAt");
  const [page, setPage] = useState(1);
  const limit = 6;

  const queryParams = {
    searchTerm: search,
    sort,
    page,
    limit,
    ...(category !== "All Categories" && { category }),
    ...(brand !== "All Brands" && { brand }),
    ...(availability !== "All Stock" && {
      inStock: availability === "In Stock",
    }),
  };

  const {
    data: productsData,
    isLoading,
    isError,
  } = useGetAllProductsQuery(queryParams);

  useEffect(() => {
    setPage(1);
  }, [search, category, brand, availability, sort]);

  const products = productsData?.data || [];
  const meta = productsData?.meta || {
    page: 1,
    limit,
    total: 0,
    totalPage: 1,
  };
  const totalPage = meta.totalPage || 1;

  const handleProductAddToCart = (productId: string) => {
    dispatch(addToCart({ productId, quantity: 1 }));
  };

  if (isError) {
    return (
      <div className="p-4 max-w-6xl mx-auto text-center text-red-500">
        Error loading products. Please try again later.
      </div>
    );
  }

  const handleProductDetails = (productId: string) => {
    navigate(`/allProducts/productDetails/${productId}`);
  };

  return (
    <div className="p-4 container mx-auto min-h-screen font-inter">
      <h1 className="text-3xl font-bold text-secondary px-4 border-l-4 border-primary mb-8">
        <span className="text-primary">Our Bicycle</span> Collection
      </h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <aside className="md:w-1/4 bg-white shadow-2xl p-4 rounded-xl space-y-4">
          <input
            type="text"
            placeholder="Search..."
            className="input input-bordered w-full py-2 px-4 border-2 border-primary rounded-lg text-primary"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div>
            <label className="font-semibold block mb-2 text-primary">Category</label>
            <select
              className="select select-bordered w-full text-primary"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-semibold block mb-2 text-primary">Brand</label>
            <select
              className="select select-bordered w-full text-primary"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            >
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-semibold block mb-2 text-primary">Availability</label>
            <select
              className="select select-bordered w-full text-primary"
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
            >
              {availabilityOptions.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-semibold block mb-2 text-primary">Sort By</label>
            <select
              className="select select-bordered w-full text-primary"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="md:w-3/4">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.length > 0 ? (
                  products.map((product: TProduct) => (
                    <div
                      key={product._id}
                      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-gray-100 hover:-translate-y-1 transform"
                    >
                      <div className="overflow-hidden rounded-t-2xl">
                        <img
                          src={product.image || "/placeholder.jpg"}
                          alt={product.name}
                          className="w-full h-[200px] object-cover transform hover:scale-105 transition duration-300"
                        />
                      </div>

                      <div className="p-5 space-y-3">
                        <h2 className="text-xl font-semibold text-gray-800">
                          {product.name}
                        </h2>

                        <div className="flex flex-wrap gap-2 text-sm text-gray-500">
                          <span className="px-2 py-1 bg-gray-100 rounded-full">
                            Brand: {product.brand}
                          </span>
                          <span className="px-2 py-1 bg-gray-100 rounded-full">
                            Category: {product.category}
                          </span>
                        </div>

                        <p className="text-sm text-gray-600 line-clamp-2">
                          {product.description}
                        </p>

                        <div className="text-sm text-gray-600 space-y-1">
                          <p>
                            <span className="font-medium">Model:</span>{" "}
                            {product.model}
                          </p>
                          <p>
                            <span className="font-medium">Quantity:</span>{" "}
                            {product.quantity}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <p className="text-lg font-bold text-primary">
                            ${product.price}
                          </p>
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
                            className="text-white cursor-pointer"
                          >
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-10">
                    <div className="text-gray-500 text-xl">
                      No products found
                    </div>
                    <button
                      className="btn btn-ghost mt-4"
                      onClick={() => {
                        setSearch("");
                        setCategory("All Categories");
                        setBrand("All Brands");
                        setAvailability("All Stock");
                      }}
                    >
                      Clear Filters
                    </button>
                  </div>
                )}
              </div>

              {/* Pagination */}
              {products.length > 0 && totalPage > 1 && (
                <div className="mt-8 flex justify-center gap-2">
                  <button
                    className="btn btn-outline"
                    disabled={page <= 1}
                    onClick={() => setPage((prev) => prev - 1)}
                  >
                    Previous
                  </button>

                  <div className="join">
                    {Array.from({ length: Math.min(5, totalPage) }, (_, i) => {
                      const pageNumber =
                        page <= 3
                          ? i + 1
                          : page >= totalPage - 2
                          ? totalPage - 4 + i
                          : page - 2 + i;
                      return (
                        <button
                          key={pageNumber}
                          className={`join-item btn ${
                            page === pageNumber ? "btn-active" : ""
                          }`}
                          onClick={() => setPage(pageNumber)}
                          disabled={pageNumber < 1 || pageNumber > totalPage}
                        >
                          {pageNumber}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    className="btn btn-outline"
                    disabled={page >= totalPage}
                    onClick={() => setPage((prev) => prev + 1)}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
