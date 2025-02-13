import { api } from "./api";
import { Product } from "../types/product";

export const productService = {
  async getProducts(): Promise<Product[]> {
    const response = await api.get<Product[]>("/products");
    return response.data;
  },
};
