import { Button } from "@/components/ui/button";
import { useCreateProductMutation } from "@/redux/features/admin/productsmanagement";
import { ApiError, ProductFormData } from "@/types/createProduct";
import { Loader } from "lucide-react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";


const CreateProduct = () => {
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormData>();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const formData = new FormData();

      // Append image file
      if (data.image[0]) {
        formData.append("file", data.image[0]);
      }

      // Prepare product data
      const productData = {
        name: data.name,
        brand: data.brand,
        price: parseFloat(data.price),
        quantity: parseInt(data.quantity),
        category: data.category,
        model: data.model,
        description: data.description,
        inStock: data.inStock === "true",
      };

      formData.append("data", JSON.stringify(productData));

      // Submit data
      const result = await createProduct(formData).unwrap();

      if (result.success) {
        toast.success("Product created successfully!");
        reset();
      }
    } catch (error) {
      const apiError = error as ApiError;
      toast.error(
        apiError?.data?.message || "Failed to create product. Please try again."
      );
    }
  };

  return (
    <div className="container mx-auto bg-white p-6 mt-10 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-8 text-center">Add New Product</h2>

      <form
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Product Image */}
        <div className="md:col-span-2 lg:col-span-3">
          <label className="block mb-2 font-medium">
            Product Image <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            accept="image/*"
            {...register("image", { required: "Image is required" })}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
          />
          {errors.image && (
            <p className="mt-1 text-sm text-red-600">{errors.image.message}</p>
          )}
        </div>

        {/* Product Name */}
        <div>
          <label className="block mb-2 font-medium">
            Product Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters",
              },
            })}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        {/* Brand */}
        <div>
          <label className="block mb-2 font-medium">
            Brand <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register("brand", { required: "Brand is required" })}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
          />
          {errors.brand && (
            <p className="mt-1 text-sm text-red-600">{errors.brand.message}</p>
          )}
        </div>

        {/* Price */}
        <div>
          <label className="block mb-2 font-medium">
            Price ($) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            {...register("price", {
              required: "Price is required",
              min: {
                value: 0.01,
                message: "Price must be greater than 0",
              },
            })}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
          />
          {errors.price && (
            <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
          )}
        </div>

        {/* Quantity */}
        <div>
          <label className="block mb-2 font-medium">
            Quantity <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            min="0"
            {...register("quantity", {
              required: "Quantity is required",
              min: {
                value: 0,
                message: "Quantity cannot be negative",
              },
            })}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
          />
          {errors.quantity && (
            <p className="mt-1 text-sm text-red-600">
              {errors.quantity.message}
            </p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block mb-2 font-medium">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            {...register("category", { required: "Category is required" })}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
          >
            <option value="">Select category</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Mountain">Mountain</option>
            <option value="Road">Road</option>
            <option value="Electric">Electric</option>
            <option value="BMX">BMX</option>
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-600">
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Model */}
        <div>
          <label className="block mb-2 font-medium">
            Model <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register("model")}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        {/* Description */}
        <div className="md:col-span-2 lg:col-span-3">
          <label className="block mb-2 font-medium">Description</label>
          <textarea
            rows={4}
            {...register("description")}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        {/* Stock Status */}
        <div>
          <label className="block mb-2 font-medium">
            Stock Status <span className="text-red-500">*</span>
          </label>
          <select
            {...register("inStock", { required: "Stock status is required" })}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
          >
            <option value="true">In Stock</option>
            <option value="false">Out of Stock</option>
          </select>
          {errors.inStock && (
            <p className="mt-1 text-sm text-red-600">
              {errors.inStock.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 lg:col-span-3">
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black text-white py-3 px-6 rounded hover:bg-gray-800 cursor-pointer shadow-sm transition-colors"
          >
            {isLoading ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Creating Product...
              </>
            ) : (
              "Create Product"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
