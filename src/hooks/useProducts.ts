import { useState, useEffect, useCallback } from 'react';
import type { Product } from '../types';
import { getProducts } from '../services/productService'; // Import the service

const initialLoadCount = 20;
const productsPerLoad = 10;

export const useProducts = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    const fetchAll = async () => {
        setLoading(true);
        const data = await getProducts();
        setAllProducts(data);
        setDisplayedProducts(data.slice(0, initialLoadCount));
        setHasMore(data.length > initialLoadCount);
        setLoading(false);
    };
    fetchAll();
  }, []);

  const loadMoreProducts = useCallback(() => {
    if (loading || !hasMore) return;

    setLoading(true);
    // Simulate network delay for "Load More" user feedback, or just render immediately
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
    }, 500); 
  }, [loading, hasMore, displayedProducts, allProducts]);

  return { displayedProducts, loading, hasMore, loadMoreProducts };
};
