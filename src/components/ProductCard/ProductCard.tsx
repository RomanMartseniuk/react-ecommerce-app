import type React from "react";
import type { Product } from "../../types/Product";
import { Link } from "react-router";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div
      key={product.id}
      className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <div className="relative w-full h-72 overflow-hidden rounded-t-lg">
        <img
          src={product.images[0]}
          alt={product.title}
          className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="p-4 flex flex-col flex-1">
        <Link
          to={`/product/${product.id}`}
          className="text-base font-semibold mb-1 truncate hover:underline"
          title={product.title}
        >
          {product.title}
        </Link>

        <p className="text-sm text-gray-600 mb-3">${product.price}</p>

        <div className="mt-auto flex gap-2">
          <button
            type="button"
            className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
            Add to Cart
          </button>

          <button
            type="button"
            className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6  h-6 text-red-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
