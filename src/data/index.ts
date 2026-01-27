import type { Slide, Product } from "../types";

import image1 from "../assets/241.png";
import image2 from "../assets/2415.png";
import image3 from "../assets/123.png";
import image5 from "../assets/12345.png";
import product00 from "../assets/product00.jpg";
import product01 from "../assets/product01.jpg";
import product02 from "../assets/product02.webp";
import product03 from "../assets/product03.webp";

export * from "./bangladeshDistricts";

export const slides: Slide[] = [
  { image: image2, alt: "Slide 2" },
  { image: image3, alt: "Slide 3" },
  { image: image1, alt: "Slide 1" },
  { image: image5, alt: "Slide 5" },
];

export const allProducts: Product[] = Array.from({ length: 50 }, (_, i) => ({
  // Increased total products for better infinite scroll demo
  id: (i + 1).toString(),
  title: `Here are the biggest enterprise Product ${i + 1}`,
  image:
    i % 4 === 0
      ? product01
      : i % 4 === 1
        ? product03
        : i % 4 === 2
          ? product02
          : product00,
  rating: Math.floor(Math.random() * 3) + 3,
  price: Math.floor(Math.random() * (1500 - 100 + 1)) + 500,
  shortDescription: `Short description for Product ${i + 1}`,
  longDescription: `This is a detailed description for Product ${
    i + 1
  }. It highlights the key features and benefits of the product, showcasing its quality and utility.`,
}));
