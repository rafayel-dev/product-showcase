export interface Slide {
  image: string;
  alt: string;
}

export interface Product {
  id: number;
  title: string;
  image: string;
  rating: number;
  price: number;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}
