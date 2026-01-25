
import type { Product } from "../../types";
import ProductCard from "./ProductCard";

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  if (!products?.length) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>

  );
};

export default ProductList;
