import { baseApi } from "@/redux/api/baseApi";

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
  }),
});

export const { useCreateProductMutation, useGetProductQuery } = productApi;