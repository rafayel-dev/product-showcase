import { useState, useEffect } from "react";
import { Row, Col, Card as AntCard, Pagination } from "antd";

/* ================= TYPES ================= */
interface Slide {
  image: string;
  alt: string;
}

interface Product {
  id: number;
  title: string;
  desc: string;
  image: string;
}

/* ================= IMAGES ================= */
import image1 from "../assets/241.png";
import image2 from "../assets/2415.png";
import product00 from "../assets/product00.jpg";
import product01 from "../assets/product01.jpg";
import product02 from "../assets/product02.webp";
import product03 from "../assets/product03.webp";

const slides: Slide[] = [
  { image: image1, alt: "Slide 1" },
  { image: image2, alt: "Slide 2" },
];

/* ================= TEMP PRODUCT DATA ================= */
const products: Product[] = Array.from({ length: 36 }, (_, i) => ({
  id: i + 1,
  title: `Product ${i + 1}`,
  desc: "Here are the biggest enterprise technology acquisitions of 2021.",
  image: i % 4 === 0 ? product01 : i % 4 === 1 ? product03 : i % 4 === 2 ? product02 : product00,
}));

/* ================= PRODUCT CARD ================= */
interface ProductCardProps {
  title: string;
  desc: string;
  image: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, desc, image }) => (
  <AntCard
    hoverable
    cover={
      <div className="aspect-square overflow-hidden">
        <img alt={title} src={image} className="object-cover" />
      </div>
    }
  >
    <h5 className="text-xl font-bold text-gray-900">{title}</h5>
    <p className="text-gray-600 mt-2">{desc}</p>
  </AntCard>
);

/* ================= HOME PAGE ================= */
const HomePage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  /* Pagination state */
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 20;

  /* Slider */
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentSlide((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentSlide]);

  /* Pagination calculation */
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedProducts = products.slice(
    startIndex,
    startIndex + pageSize
  );

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

      {/* ================= PRODUCT LIST ================= */}
      <Row gutter={[24, 24]} className="mt-10">
        {paginatedProducts.map((product) => (
          <Col
            xs={24}
            sm={12}
            md={8}
            lg={{ flex: '0 0 20%' }}
            key={product.id}
          >
            <ProductCard
              title={product.title}
              desc={product.desc}
              image={product.image}
            />
          </Col>
        ))}
      </Row>

      {/* ================= PAGINATION ================= */}
      {products.length > pageSize && (
        <div className="flex justify-center mt-10">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={products.length}
            onChange={(page) => setCurrentPage(page)}
            showSizeChanger={false}
          />
        </div>
      )}
    </div>
  );
};

export default HomePage;
