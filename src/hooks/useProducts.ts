import { useState, useEffect, useCallback } from 'react';
import type { Product } from '../types';
import { getProducts } from '../services/productService'; // Import the service

const initialLoadCount = 20;
const productsPerLoad = 10;

export const useProducts = () => {
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    const allProductsData = getProducts(); // Use the service
    setDisplayedProducts(allProductsData.slice(0, initialLoadCount));
    setHasMore(allProductsData.length > initialLoadCount);
  }, []);

  const loadMoreProducts = useCallback(() => {
    if (loading || !hasMore) return;

    setLoading(true);
    setTimeout(() => {
      const allProductsData = getProducts(); // Use the service again
      const currentLength = displayedProducts.length;
      const nextProducts = allProductsData.slice(
        currentLength,
        currentLength + productsPerLoad
      );

      setDisplayedProducts((prevProducts) => [
        ...prevProducts,
        ...nextProducts,
      ]);
      setHasMore(currentLength + nextProducts.length < allProductsData.length);
      setLoading(false);
    }, 1000);
  }, [loading, hasMore, displayedProducts]);

  return { displayedProducts, loading, hasMore, loadMoreProducts };
};
