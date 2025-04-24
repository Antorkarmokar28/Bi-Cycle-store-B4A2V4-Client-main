export type TError = {
  data: {
    message: string;
    stack: string;
    success: boolean;
  };
  status: number;
};

export type TResponse<T = unknown> = {
  data?: T;
  error?: TError;
  success: boolean;
  message: string;
};

export type TProduct = {
  _id: string;
  name: string;
  brand: string;
  model: string;
  category: string;
  description: string;
  price: number;
  quantity: number;
  inStock: boolean;
  image: string;
  createdAt: string; // or Date if you parse it
  updatedAt: string; // or Date if you parse it
};
