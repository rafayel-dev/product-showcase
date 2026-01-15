import { allProducts } from '../data';
import type { Product } from '../types';

export const getProducts = (): Product[] => {
  // In a real application, this would be an API call
  return allProducts;
};

export const getProductById = (id: number): Product | undefined => {
  // In a real application, this would be an API call
  return allProducts.find(product => product.id === id);
};