import { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../store/store";
import {
  fetchProducts,
  selectProductById,
} from "../../store/reduxSlices/productsSlice";
import { UserContext } from "../../store/userContext";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("UserContext is not provided");
  }
  const { isAuth, addToFavorites } = userContext;

  const productId = id ? Number(id) : NaN;

  useEffect(() => {
    if (!id || isNaN(productId)) {
      navigate(-1);
    } else {
      dispatch(fetchProducts());
    }
  }, [id, productId, navigate, dispatch]);

  const product = useSelector(selectProductById(productId));

  useEffect(() => {
    if (!isNaN(productId) && !product) {
      navigate(-1);
    }
  }, [product, productId, navigate]);

  if (!id || isNaN(productId) || !product) return null;

  const handleSave = async () => {
    try {
      const authenticated = await isAuth();
      if (authenticated) {
        addToFavorites(product);
      } else {
        navigate("/login");
      }
    } catch {
      navigate("/login");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex justify-center items-center bg-gray-100 rounded-lg overflow-hidden shadow-md">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-cover max-h-[500px]"
          />
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-3">{product.title}</h1>
            <p className="text-gray-600 mb-4">{product.category.name}</p>
            <p className="text-2xl font-semibold text-green-600 mb-6">
              ${product.price}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="flex gap-4 mt-6">
            <button className="flex-1 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors">
              Add to Cart
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleSave();
              }}
              className="flex-1 border border-gray-300 py-3 rounded-md hover:bg-gray-100 transition-colors"
            >
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Product Details</h2>
        <p className="text-gray-700 leading-relaxed">{product.description}</p>
      </div>
    </div>
  );
};

export default ProductPage;
