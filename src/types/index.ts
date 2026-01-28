export interface Slide {
  image: string;
  alt: string;
  link?: string;
}

export interface Product {
  id: string; // Changed to string for MongoDB compatibility
  title: string;
  image: string;
  rating: number;
  price: number;
  sku: string;
  shortDescription: string;
  longDescription: string;
  imageUrls?: string[];
  stock?: number;
  hasDiscount?: boolean;
  discountType?: "flat" | "percentage";
  discountValue?: number;
  specifications?: {
    brand?: string;
    material?: string;
    availableSizes?: string[];
    availableColors?: string[];
    countryOfOrigin?: string;
  };
  tags?: string[];
  status?: string;
  productDetails?: {
    features?: string[];
    deliveryInfo?: string;
    returnPolicy?: string;
  };
  reviews?: Review[];
  numReviews?: number;
  category?: string; // Add category
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface Review {
  _id?: string;
  name: string;
  orderId: string;
  rating: number;
  comment: string;
  date: string;
}
