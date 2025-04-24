import { useGetAllProductsQuery } from "@/redux/features/product/productsApi";
import { TProduct } from "@/types/global";
import { useState, useEffect } from "react";

const categories = ["All", "BMX", "Mountain", "Road"];
const brands = ["All", "Mongoose", "Trek", "Giant"];
const availabilityOptions = ["All", "Available", "Out of Stock"];
const sortOptions = [
  { value: "price", label: "Price: Low to High" },
  { value: "-price", label: "Price: High to Low" },
  { value: "-createdAt", label: "Newest" },
  { value: "createdAt", label: "Oldest" },
];

export default function AllProducts() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [availability, setAvailability] = useState("All");
  const [sort, setSort] = useState("price");
  const [page, setPage] = useState(1);
  const limit = 6;

  // Build query parameters
  const queryParams = {
    searchTerm: search,
    sort,
    page,
    limit,
    ...(category !== "All" && { category }),
    ...(brand !== "All" && { brand }),
    ...(availability !== "All" && { inStock: availability === "Available" }), // Changed from 'availability' to 'inStock'
  };

  const {
    data: productsData,
    isLoading,
    isError,
  } = useGetAllProductsQuery(queryParams);
  const products = productsData?.data|| [];
  console.log(products);
  const totalPage = productsData?.data?.meta?.totalPage || 1;

  // Reset page when filters/search change
  useEffect(() => {
    setPage(1);
  }, [search, category, brand, availability, sort]);

  if (isError) {
    return (
      <div className="p-4 max-w-6xl mx-auto text-center text-red-500">
        Error loading products. Please try again later.
      </div>
    );
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Our Bicycle Collection
      </h1>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 bg-gray-100 p-4 rounded-lg">
        <input
          type="text"
          placeholder="Search by name, brand, or category..."
          className="input input-bordered w-full md:max-w-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex flex-wrap gap-2">
          <select
            className="select select-bordered select-sm md:select-md"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            className="select select-bordered select-sm md:select-md"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          >
            {brands.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>

          <select
            className="select select-bordered select-sm md:select-md"
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
          >
            {availabilityOptions.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>

          <select
            className="select select-bordered select-sm md:select-md"
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
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-3 flex justify-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : products.length > 0 ? (
          products?.map((product: TProduct) => (
            <div
              key={product._id}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow"
            >
              <figure className="px-4 pt-4">
                <img
                  src={product.image || "/placeholder.jpg"}
                  alt={product.name}
                  className="rounded-xl h-48 w-full object-cover"
                />
              </figure>
              <div className="card-body p-4">
                <h2 className="card-title">{product.name}</h2>
                <div className="flex flex-wrap gap-2 text-sm">
                  <span className="badge badge-outline">{product.brand}</span>
                  <span className="badge badge-outline">
                    {product.category}
                  </span>
                  {product.inStock ? (
                    <span className="badge badge-success">In Stock</span>
                  ) : (
                    <span className="badge badge-error">Out of Stock</span>
                  )}
                </div>
                <p className="text-gray-600 line-clamp-2">
                  {product.description}
                </p>
                <div className="mt-2">
                  <p className="text-lg font-bold text-primary">
                    ${product.price}
                  </p>
                  <p className="text-sm text-gray-500">
                    Model: {product.model}
                  </p>
                  <p className="text-sm text-gray-500">
                    Quantity: {product.quantity}
                  </p>
                </div>
                <div className="card-actions mt-4">
                  <button className="btn btn-primary btn-block">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center py-10">
            <div className="text-gray-500 text-xl">No products found</div>
            <button
              className="btn btn-ghost mt-4"
              onClick={() => {
                setSearch("");
                setCategory("All");
                setBrand("All");
                setAvailability("All");
              }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Pagination - Only show if there are products */}
      {products.length > 0 && (
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
    </div>
  );
}
