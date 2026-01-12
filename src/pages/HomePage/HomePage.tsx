import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch } from "../../store/store";
import {
  fetchCategories,
  fetchProducts,
  selectCategories,
  selectFilters,
  selectLoading,
  selectPaginatedProducts,
  selectTotalPages,
  setFilters,
  setPage,
} from "../../store/reduxSlices/productsSlice";
import { useQuery } from "../../hooks/useQuery";
import ProductList from "../../components/ProductList/ProductList";
import Loader from "../../components/Loader/Loader";

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { setQuery } = useQuery();

  const products = useSelector(selectPaginatedProducts);
  const categories = useSelector(selectCategories);
  const filters = useSelector(selectFilters);
  const totalPages = useSelector(selectTotalPages);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    const categoryId = searchParams.get("categoryId")
      ? Number(searchParams.get("categoryId"))
      : undefined;
    const price_max = searchParams.get("price_max")
      ? Number(searchParams.get("price_max"))
      : undefined;
    const price_min = searchParams.get("price_min")
      ? Number(searchParams.get("price_min"))
      : undefined;
    const title = searchParams.get("title") || undefined;
    const page = searchParams.get("page")
      ? Number(searchParams.get("page"))
      : 1;

    const initialFilters = { categoryId, price_max, price_min, title };

    dispatch(setFilters(initialFilters));
    dispatch(setPage(page));

    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProducts(filters));
  }, [dispatch, filters]);

  function handleCategoryClick(categoryId: string | undefined) {
    setQuery({ categoryId, page: undefined });
    dispatch(
      setFilters({
        ...filters,
        categoryId: categoryId ? Number(categoryId) : undefined,
      })
    );
    dispatch(setPage(1));
  }

  console.log(products);
  return (
    <div>
      <div className="flex items-center justify-between px-5">
        <div className="flex gap-4">
          <button
            className="text-[14px] block py-1 px-3 bg-gray-300 rounded-md transition-all hover:bg-gray-400 cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              handleCategoryClick(undefined);
            }}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              className=" text-[14px] block py-1 px-3 bg-gray-300 rounded-md transition-all hover:bg-gray-400 cursor-pointer"
              key={category.id}
              onClick={(e) => {
                e.preventDefault();
                handleCategoryClick(category.id.toString());
              }}
            >
              {category.name}
            </button>
          ))}
        </div>
        <div className="flex item-center">
          <input
            className="w-90 mr-3 text-[14px] outline-0 focus:border-gray-400 px-2 py-1 rounded-md border border-gray-300"
            placeholder="Enter product name here..."
            type="text"
            name=""
            id=""
          />
          <button
            className="block py-1 px-3 bg-gray-300 cursor-pointer rounded-md hover:bg-gray-400 transition-all text-[14px]"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            Search
          </button>
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <ProductList products={products} />
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setQuery({ page: page.toString() });
                      dispatch(setPage(page));
                    }}
                    key={page}
                    className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-200"
                  >
                    {page}
                  </button>
                )
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;
