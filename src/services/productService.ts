import type { Product } from '../types';

const API_URL = 'http://localhost:5000/api';

const mapProduct = (item: any): Product => ({
  id: item.id || item._id,
  title: item.productName || item.title,
  image: item.imageUrl ? (item.imageUrl.startsWith('http') ? item.imageUrl : `http://localhost:5000${item.imageUrl}`) : 'https://placehold.co/600x400',
  imageUrls: item.imageUrls?.map((url: string) => url.startsWith('http') ? url : `http://localhost:5000${url}`) || [],
  price: item.price,
  shortDescription: item.specifications?.shortDescription || item.description || "",
  longDescription: item.productDetails?.longDescription || "",
  rating: item.rating || 4.5,
  stock: item.stock,
  hasDiscount: item.hasDiscount,
  discountType: item.discountType,
  discountValue: item.discountValue,
  specifications: item.specifications,
  tags: item.tags,
  status: item.status,
  productDetails: item.productDetails,
});

export const getProducts = async (): Promise<Product[]> => {
  try {
    const res = await fetch(`${API_URL}/products`);
    if (!res.ok) throw new Error('Failed to fetch products');
    const data = await res.json();
    return data.map(mapProduct);
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getProductById = async (id: string): Promise<Product | undefined> => {
  try {
    const res = await fetch(`${API_URL}/products/${id}`);
    if (!res.ok) return undefined;
    const data = await res.json();
    return mapProduct(data);
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const getRelatedProducts = async (currentId: string, limit: number = 5): Promise<Product[]> => {
  try {
    const all = await getProducts();
    return all
      .filter(product => product.id !== currentId)
      .sort(() => 0.5 - Math.random())
      .slice(0, limit);
  } catch {
    return [];
  }
};