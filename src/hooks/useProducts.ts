import { useState, useEffect, useCallback } from "react";
import type { Product } from "../types";
import { getProducts } from "../services/productService"; // Import the service

const initialLoadCount = 20;
const productsPerLoad = 10;

export const useProducts = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      const data = await getProducts();
      setAllProducts(data);
      // Logic handled by filter effect below once allProducts is set
      setLoading(false);
    };
    fetchAll();
  }, []);

  useEffect(() => {
    let result = allProducts;

    if (selectedCategory && selectedCategory !== "all") {
      result = result.filter(
        (p) =>
          p.category === selectedCategory ||
          p.category?.toLowerCase() === selectedCategory.toLowerCase(),
      );
    }

    if (searchQuery) {
      const lower = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(lower) ||
          p.shortDescription?.toLowerCase().includes(lower) ||
          p.tags?.some((t) => t.toLowerCase().includes(lower)),
      );
    }

    setFilteredProducts(result);
    setDisplayedProducts(result.slice(0, initialLoadCount));
    setHasMore(result.length > initialLoadCount);
  }, [allProducts, searchQuery, selectedCategory]);

  const loadMoreProducts = useCallback(() => {
    if (loading || !hasMore) return;

    setLoading(true);
    setTimeout(() => {
      const currentLength = displayedProducts.length;
      const nextProducts = filteredProducts.slice(
        currentLength,
        currentLength + productsPerLoad,
      );

      setDisplayedProducts((prevProducts) => [
        ...prevProducts,
        ...nextProducts,
      ]);
      setHasMore(currentLength + nextProducts.length < filteredProducts.length);
      setLoading(false);
    }, 500);
  }, [loading, hasMore, displayedProducts, filteredProducts]);

  return {
    displayedProducts,
    loading,
    hasMore,
    loadMoreProducts,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
  };
};
