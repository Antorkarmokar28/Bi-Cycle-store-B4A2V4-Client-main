import { baseApi } from "@/redux/api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (data) => ({
        url: "/bicycles/products",
        method: "POST",
        body: data,
      }),
    }),
    getProduct: builder.query({
      query: () => ({
        url: "/bicycles/products",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetProductQuery } = productApi;
