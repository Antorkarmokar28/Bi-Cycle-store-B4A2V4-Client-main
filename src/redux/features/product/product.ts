import { baseApi } from "@/redux/api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (data) => ({
        url: "/bicycles/create-bicycle",
        method: "POST",
        body: data,
      }),
    }),
    getProduct: builder.query({
      query: () => ({
        url: "/bicycles",
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateProductMutation, useGetProductQuery } = productApi;
