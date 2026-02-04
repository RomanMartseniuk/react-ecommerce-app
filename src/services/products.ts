import request from "@/api/axios"

export type producsRequestType = {
   title?: string,
   price_min?: number,
   price_max?: number,
   categoryId?: number,
   limit?: number,
   offset?: number
}


export const productsApi = {
   get: async ({title = '', price_min = 0, price_max = Infinity, categoryId = -1, offset = 0, limit = 20} = {}) => {
      const params = new URLSearchParams();
      if (title.length) params.append('title', title);
      if (price_min) params.append('price_min', price_min.toString());
      if (price_max !== Infinity) params.append('price_max', price_max.toString());
      if (categoryId !== -1) params.append('categoryId', categoryId.toString());
      params.append('offset', offset.toString());
      params.append('limit', limit.toString());

      const response = await request.get(`/products/?${params.toString()}`);
      const data = await response.data;

      return data;
   }
}