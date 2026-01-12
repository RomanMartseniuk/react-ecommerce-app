import type React from "react";
import type { Product } from "../../types/Product";
import ProductCard from "../ProductCard/ProductCard";

type Props = {
   products: Product[]
}

const ProductList:React.FC<Props> = ({products}) => {
  return (
    <div className="grid grid-cols-5 gap-4 p-5">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
