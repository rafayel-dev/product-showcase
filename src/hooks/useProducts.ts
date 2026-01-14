import { useState, useEffect, useCallback } from 'react';
import type { Product } from '../types';
import { allProducts } from '../data';

const initialLoadCount = 20;
const productsPerLoad = 10;

export const useProducts = () => {
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    setDisplayedProducts(allProducts.slice(0, initialLoadCount));
    setHasMore(allProducts.length > initialLoadCount);
  }, []);

  const loadMoreProducts = useCallback(() => {
    if (loading || !hasMore) return;

    setLoading(true);
    setTimeout(() => {
      const currentLength = displayedProducts.length;
      const nextProducts = allProducts.slice(
        currentLength,
        currentLength + productsPerLoad
      );

      setDisplayedProducts((prevProducts) => [
        ...prevProducts,
        ...nextProducts,
      ]);
      setHasMore(currentLength + nextProducts.length < allProducts.length);
      setLoading(false);
    }, 1000);
  }, [loading, hasMore, displayedProducts]);

  return { displayedProducts, loading, hasMore, loadMoreProducts };
};
