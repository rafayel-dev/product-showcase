import { useState, useEffect, useCallback } from "react";
import { Row, Col, Card as AntCard } from "antd";
import { FiPlus } from "react-icons/fi";
import { FaStar } from "react-icons/fa"; // Import FaStar

/* ================= TYPES ================= */
interface Slide {
  image: string;
  alt: string;
}

interface Product {
  id: number;
  title: string;
  image: string;
  rating: number;
  price: number;
}

/* ================= IMAGES ================= */
import image1 from "../assets/241.png";
import image2 from "../assets/2415.png";
import image3 from "../assets/123.png";
import image5 from "../assets/12345.png";
import product00 from "../assets/product00.jpg";
import product01 from "../assets/product01.jpg";
import product02 from "../assets/product02.webp";
import product03 from "../assets/product03.webp";

const slides: Slide[] = [
  { image: image2, alt: "Slide 2" },
  { image: image3, alt: "Slide 3" },
  { image: image1, alt: "Slide 1" },
  { image: image5, alt: "Slide 5" },
];

/* ================= TEMP PRODUCT DATA ================= */
const allProducts: Product[] = Array.from({ length: 50 }, (_, i) => ({
  // Increased total products for better infinite scroll demo
  id: i + 1,
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
  price: parseFloat((Math.random() * (200 - 50) + 50).toFixed(2)), // Random price between 50 and 200
}));

/* ================= PRODUCT CARD ================= */
interface ProductCardProps {
  title: string;
  image: string;
  rating: number;
  price: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  image,
  rating,
  price,
}) => (
  <AntCard
    hoverable
    className="relative transition-all! duration-300! border! border-violet-500/50! overflow-hidden! rounded-lg!"
    cover={
      <div className="aspect-square overflow-hidden">
        <img alt={title} src={image} className="object-cover" />
        <div className="absolute top-2 left-2 bg-violet-500/80 text-white backdrop-blur-sm text-xs font-semibold px-2 py-1 rounded font-nunito">
          15% Off
        </div>
      </div>
    }
  >
    <div className="flex items-center justify-between mb-1">
      <div className="flex items-center justify-center">
        {Array.from({ length: 5 }, (_, index) => (
          <FaStar
            key={index}
            className={`h-4 w-4 ${
              index < rating ? "text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
      <div className="text-lg font-bold text-black font-nunito">${price}</div>
    </div>
    <h5 className="text-xl font-bold text-gray-900 font-nunito">{title}</h5>
    <div className="flex justify-between items-center">
      <button className="bg-violet-500 hover:bg-violet-600 text-white! font-bold py-2 px-4 rounded transition-all duration-300 cursor-pointer font-nunito">
        Buy Now
      </button>
      <button
        className="p-1 text-white bg-black rounded-full hover:bg-gray-700 transition-all duration-300 cursor-pointer"
        aria-label="Add to Cart"
      >
        <FiPlus className="h-6 w-6 text-white" />
      </button>
    </div>
  </AntCard>
);

/* ================= HOME PAGE ================= */
const initialLoadCount = 20; // 4 rows of 5 products
const productsPerLoad = 10; // Load 2 more rows at a time

const HomePage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  // Initial load
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
    }, 1000); // Simulate network delay
  }, [loading, hasMore, displayedProducts]);

  /* Slider */
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentSlide]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* ================= SLIDER ================= */}
      <div className="relative w-full overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <img
              key={index}
              src={slide.image}
              alt={slide.alt}
              className="w-full shrink-0"
            />
          ))}
        </div>
      </div>

      {/* ================= Title and Filter Dropdown ================= */}
      <div className="flex justify-between items-center mt-5">
        <h2 className="text-4xl font-bold text-gray-900 font-nunito">
          Featured Products
        </h2>
        <select className="border border-gray-300 rounded-md px-2 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-400">
          <option>All Categories</option>
          <option>Women's Fashion</option>
          <option>Men's Fashion</option>
          <option>Fashion</option>
        </select>
      </div>

      {/* ================= PRODUCT LIST ================= */}
      <Row gutter={[24, 24]} className="mt-5">
        {displayedProducts.map((product) => (
          <Col xs={24} sm={12} md={8} lg={{ flex: "0 0 20%" }} key={product.id}>
            <ProductCard
              title={product.title}
              image={product.image}
              rating={product.rating}
              price={product.price}
            />
          </Col>
        ))}
      </Row>

      {/* ================= LOAD MORE BUTTON / LOADING INDICATOR ================= */}
      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMoreProducts}
            disabled={loading}
            className="border-2 border-violet-400 text-violet-400! hover:opacity-80 transition-all duration-300 font-bold py-2 px-6 rounded-full cursor-pointer disabled:opacity-70"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}

      {!hasMore && displayedProducts.length > 0 && (
        <div className="flex justify-center mt-10">
          <p className="text-lg font-semibold text-gray-400">
            No more products to load.
          </p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
