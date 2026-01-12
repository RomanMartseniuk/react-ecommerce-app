import type { Category } from "../types/Category";
import { api } from "./axios";

export const categoriesService = {
   async getCategories(): Promise<Category[]> {
      const response = await api.get<Category[]>("/categories");
      return response.data;
   },

   async getCategoryById(id: number): Promise<Category> {
      const response = await api.get<Category>(`/categories/${id}/related`);
      return response.data;
   }
};