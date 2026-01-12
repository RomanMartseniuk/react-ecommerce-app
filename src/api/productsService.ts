import type { Filters } from "../types/Filters";
import type { Product } from "../types/Product";
import { api } from "./axios";

export const productsService = {
  async getProducts(filters?: Filters): Promise<Product[]> {
    const params = { ...filters };
    const response = await api.get<Product[]>("/products", { params });
    return response.data;
  },

  async getProductById(id: number): Promise<Product> {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  },
};