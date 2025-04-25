import { baseApi } from "@/redux/api/baseApi";
import { TProductsResponse } from "@/types/createProduct";
import { TProduct } from "@/types/global";

const productApi = baseApi.injectEndpoints({
  // create product
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (formData) => ({
        url: "/bicycles/create-bicycle",
        method: "POST",
        body: formData,
      }),
    }),
    // get all products
    getProduct: builder.query({
      query: () => ({
        url: "/bicycles",
        method: "GET",
      }),
    }),
    // update product
    updateProduct: builder.mutation<
      TProductsResponse,
      { productId: string; data: Partial<TProduct> }
    >({
      query: ({ productId, data }) => ({
        url: `/products/${productId}`,
        method: "PATCH",
        body: data,
      }),
    }),
    // Delete a product by ID
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetProductQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
