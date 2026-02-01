import type { Product, Review } from "../types";

// Define Base URL for static assets (images)
// export const BASE_URL = "http://10.10.89.32:5000";
export const BASE_URL = "http://10.10.20.43:5000";
// export const BASE_URL = "http://localhost:5000";
// export const BASE_URL = "https://living-utility-pro-restored.trycloudflare.com";
export const API_URL = `${BASE_URL}/api`;

const mapProduct = (item: any): Product => ({
  id: item.id || item._id,
  title: item.productName || item.title,
  sku: item.sku,
  image: item.imageUrl
    ? item.imageUrl.startsWith("http")
      ? item.imageUrl
      : `${BASE_URL}${item.imageUrl}`
    : "https://placehold.co/600x400",
  imageUrls:
    item.imageUrls?.map((url: string) =>
      url.startsWith("http") ? url : `${BASE_URL}${url}`,
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
  category: item.category,
  status: item.status,
  productDetails: item.productDetails,
  reviews: item.reviews || [],
  numReviews: item.numReviews || (item.reviews ? item.reviews.length : 0),
});

export const getProducts = async (
  page: number = 1,
  limit: number = 50,
): Promise<Product[]> => {
  try {
    const res = await fetch(
      `${API_URL}/products?page=${page}&limit=${limit}&isPublished=true`,
    );
    if (!res.ok) throw new Error("Failed to fetch products");
    const data = await res.json();
    return (data.products || []).map(mapProduct);
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getCategories = async (): Promise<
  { id: string; name: string }[]
> => {
  try {
    const res = await fetch(`${API_URL}/categories`);
    if (!res.ok) return [];
    return await res.json();
  } catch {
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
    const response = await fetch(
      `${API_URL}/products/${currentId}/related?limit=${limit}`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch related products");
    }
    const data = await response.json();
    return data.map(mapProduct);
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

export const getSliders = async (): Promise<any[]> => {
  try {
    const res = await fetch(`${API_URL}/sliders`);
    if (!res.ok) return [];
    const data = await res.json();
    return data.map((item: any) => ({
      image: item.image.startsWith("http")
        ? item.image
        : `${BASE_URL}${item.image}`,
      alt: item.title || "Slider Image",
      link: item.link,
    }));
  } catch {
    return [];
  }
};
