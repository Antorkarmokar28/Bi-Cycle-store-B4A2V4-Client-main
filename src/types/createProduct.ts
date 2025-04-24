import { TProduct } from "./global";

export interface ApiError {
  data?: {
    message?: string;
  };
  message?: string;
}

export interface ProductFormData {
  name: string;
  brand: string;
  price: string;
  quantity: string;
  category: string;
  model?: string;
  description?: string;
  inStock: "true" | "false";
  image: FileList;
}

// types/product.type.ts
export type TMeta = {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
};

export type TProductsResponse = {
  success: boolean;
  message: string;
  data: {
    products: TProduct[];
    meta: TMeta;
  };
};

export type TSingleProductResponse = {
  success: boolean;
  message: string;
  data: TProduct;
};
