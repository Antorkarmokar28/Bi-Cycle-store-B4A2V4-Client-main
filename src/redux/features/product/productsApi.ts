// redux/features/product/productsApi.ts
import { baseApi } from "@/redux/api/baseApi";
import {
  TProductsResponse,
  TSingleProductResponse,
} from "@/types/createProduct";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<TProductsResponse, Record<string, unknown>>({
      query: (params) => ({
        url: "/bicycles",
        method: "GET",
        params: params,
      }),
    }),
    getSingleProduct: builder.query<TSingleProductResponse, string>({
      query: (productId) => ({
        url: `/bicycles/${productId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllProductsQuery, useGetSingleProductQuery } = productApi;
