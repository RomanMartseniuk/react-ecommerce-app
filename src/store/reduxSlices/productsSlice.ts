import {
  createSlice,
  type PayloadAction,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";

import type { Product } from "../../types/Product";
import type { Filters } from "../../types/Filters";
import type { Category } from "../../types/Category";

import { productsService } from "../../api/productsService";
import { categoriesService } from "../../api/categoriesService";

interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
  filters: Filters;
  categories: Category[];
  page: number;
  pageSize: number;
}
const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
  filters: {},
  categories: [],
  page: 1,
  pageSize: 10,
};

export const fetchProducts = createAsyncThunk<Product[], Filters | undefined>(
  "products/fetchProducts",
  async (filters) => {
    return await productsService.getProducts(filters);
  }
);


export const fetchCategories = createAsyncThunk<Category[]>(
  "products/fetchCategories",
  async () => {
    return await categoriesService.getCategories();
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<Filters>) {
      state.filters = action.payload;
      state.page = 1;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setPageSize(state, action: PayloadAction<number>) {
      state.pageSize = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
  },
});

export const { setFilters, setPage, setPageSize } = productsSlice.actions;

export const selectProducts = (state: { products: ProductsState }) =>
  state.products.products;
export const selectFilters = (state: { products: ProductsState }) =>
  state.products.filters;
export const selectCategories = (state: { products: ProductsState }) =>
  state.products.categories;
export const selectPage = (state: { products: ProductsState }) =>
  state.products.page;
export const selectPageSize = (state: { products: ProductsState }) =>
  state.products.pageSize;
export const selectLoading = (state: { products: ProductsState }) =>
  state.products.loading;
export const selectProductById =
  (id: number) => (state: { products: ProductsState }) => {
    return state.products.products.find((product) => product.id === id) || null;
  };

export const selectTotalPages = createSelector(
  (state: { products: ProductsState }) => state.products.products.length,
  (state: { products: ProductsState }) => state.products.pageSize,
  (productsLength, pageSize) => Math.ceil(productsLength / pageSize)
);
export const selectPaginatedProducts = createSelector(
  (state: { products: ProductsState }) => state.products.products,
  (state: { products: ProductsState }) => state.products.page,
  (state: { products: ProductsState }) => state.products.pageSize,
  (products, page, pageSize) => {
    const start = (page - 1) * pageSize;
    return products.slice(start, start + pageSize);
  }
);

export default productsSlice.reducer;
