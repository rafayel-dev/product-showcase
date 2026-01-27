import type { Product, Review } from "../types";

export const API_URL = "http://localhost:5000/api";

const mapProduct = (item: any): Product => ({
  id: item.id || item._id,
  title: item.productName || item.title,
  image: item.imageUrl
    ? item.imageUrl.startsWith("http")
      ? item.imageUrl
      : `http://localhost:5000${item.imageUrl}`
    : "https://placehold.co/600x400",
  imageUrls:
    item.imageUrls?.map((url: string) =>
      url.startsWith("http") ? url : `http://localhost:5000${url}`,
    ) || [],
  price: item.price,
  shortDescription:
    item.specifications?.shortDescription || item.description || "",
  longDescription: item.productDetails?.longDescription || "",
  rating: item.rating !== undefined ? item.rating : 0,
  stock: item.stock,
  hasDiscount: item.hasDiscount,
  discountType: item.discountType,
  discountValue: item.discountValue,
  specifications: item.specifications,
  tags: item.tags,
  status: item.status,
  productDetails: item.productDetails,
  reviews: item.reviews || [],
  numReviews: item.numReviews || (item.reviews ? item.reviews.length : 0),
});

export const getProducts = async (): Promise<Product[]> => {
  try {
    const res = await fetch(`${API_URL}/products`);
    if (!res.ok) throw new Error("Failed to fetch products");
    const data = await res.json();
    return data.map(mapProduct);
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getProductById = async (
  id: string,
): Promise<Product | undefined> => {
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

export const getRelatedProducts = async (
  currentId: string,
  limit: number = 5,
): Promise<Product[]> => {
  try {
    const all = await getProducts();
    return all
      .filter((product) => product.id !== currentId)
      .sort(() => 0.5 - Math.random())
      .slice(0, limit);
  } catch {
    return [];
  }
};

export const createReview = async (
  productId: string,
  review: { rating: number; comment: string; name: string; orderId: string },
) => {
  const res = await fetch(`${API_URL}/products/${productId}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Review failed");
  }
  return await res.json();
};

export const getProductReviews = async (
  productId: string,
  page: number = 1,
  limit: number = 6,
): Promise<Review[]> => {
  try {
    const res = await fetch(
      `${API_URL}/products/${productId}/reviews?page=${page}&limit=${limit}`,
    );
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
};
