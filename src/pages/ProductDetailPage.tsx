import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../services/productService"; // Import the service
import type { CartItem, Product } from "../types";
import {
  Card,
  Image,
  Typography,
  Button,
  Rate,
  Row,
  Col,
  Space,
  Tag,
  Radio,
  Divider,
} from "antd";
import {
  MinusOutlined,
  PlusOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import { useCart } from "../hooks/useCart";
import toast from "../utils/toast";

const { Title, Text, Paragraph } = Typography;

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [size, setSize] = useState("M");
  const [color, setColor] = useState("Black");
  const [qty, setQty] = useState(1);

  const discountPercent = 15;
  const discountedPrice = product
    ? product.price - (product.price * discountPercent) / 100
    : 0;

  useEffect(() => {
    if (id) {
      const found = getProductById(Number(id)); // Use the service
      if (found) {
        setProduct(found);
        setSelectedImage(found.image);
      } else {
        // Handle case where product is not found, e.g., navigate to a 404 page
        navigate("/404"); // Assuming you have a 404 route
      }
    }
  }, [id, navigate]);

  if (!product) return null;

  /* ================= SEO SCHEMA ================= */
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: [product.image],
    description: product.description,
    brand: { "@type": "Brand", name: "Your Store Name" },
    offers: {
      "@type": "Offer",
      priceCurrency: "BDT",
      price: discountedPrice,
      availability: "https://schema.org/InStock",
    },
  };

  const formatBDT = (amount: number) => `৳ ${amount.toLocaleString("en-BD")}`;

  const handleAddToCart = () => {
    addToCart({
      ...product,
      selectedSize: size,
      selectedColor: color,
      quantity: qty,
      price: discountedPrice,
    } as CartItem);
    toast.success("পণ্য কার্টে যোগ হয়েছে 🛒");
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/checkout");
  };

  const whatsappOrder = () => {
    const msg = `Hello, আমি এই পণ্যটি অর্ডার করতে চাই 👇
    
Product: ${product.title}
Size: ${size}
Color: ${color}
Quantity: ${qty}
Price: ${formatBDT(discountedPrice * qty)}
`;
    window.open(
      `https://wa.me/8801751876070?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  };

  return (
    <>
      {/* SEO SCRIPT */}
      <script type="application/ld+json">
        {JSON.stringify(productSchema)}
      </script>

      <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <Row gutter={[32, 32]}>
            {/* IMAGES */}
            <Col xs={24} md={12}>
              <Card bordered={false}>
                <div className="relative">
                  <div className="relative w-full aspect-square overflow-hidden rounded-lg">
                    <Image
                      src={selectedImage}
                      className="w-full! h-full! object-cover!"
                    />
                  </div>

                  {/* FLASH SALE BADGE */}
                  <div className="absolute top-2 left-2 bg-violet-600/70 text-white backdrop-blur-sm text-xs font-semibold px-2 py-1 rounded font-nunito">
                    🔥15% Off
                  </div>
                </div>

                <Space className="mt-4">
                  {[product.image, product.image].map((img, i) => (
                    <Image
                      key={i}
                      src={img}
                      width={70}
                      preview={false}
                      onClick={() => setSelectedImage(img)}
                      className="cursor-pointer rounded aspect-square object-cover selection:border-violet-500!"
                    />
                  ))}
                </Space>
              </Card>
            </Col>

            {/* DETAILS */}
            <Col xs={24} md={12}>
              <Card bordered={false}>
                <Title level={2}>{product.title}</Title>
                <Rate disabled allowHalf defaultValue={product.rating} />
                <Text type="secondary" className="ml-2!">
                  (124 Reviews)
                </Text>
                <Space align="center" className="mt-2 ml-2">
                  <Title level={3} className="text-red-500!">
                    {formatBDT(discountedPrice)}
                  </Title>
                  <Text delete type="secondary">
                    {formatBDT(product.price)}
                  </Text>
                </Space>

                <Space wrap className="my-3">
                  <Tag color="blue">Fast Delivery</Tag>
                  <Tag color="gold">Original Product</Tag>
                  <Tag color="green">Cash on Delivery</Tag>
                </Space>

                <Paragraph>{product.description}</Paragraph>

                <Divider />

                {/* VARIANTS */}
                <Space direction="vertical" size="middle">
                  <div>
                    <Text strong>Size: </Text>
                    <Radio.Group
                      className="ml-3"
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                    >
                      <Radio.Button
                        value="S"
                        className="text-violet-500! hover:border-violet-500!"
                      >
                        S
                      </Radio.Button>
                      <Radio.Button
                        value="M"
                        className="text-violet-500! hover:border-violet-500!"
                      >
                        M
                      </Radio.Button>
                      <Radio.Button
                        value="L"
                        className="text-violet-500! hover:border-violet-500!"
                      >
                        L
                      </Radio.Button>
                    </Radio.Group>
                  </div>

                  <div>
                    <Text strong>Color: </Text>
                    <Radio.Group
                      className="ml-3"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                    >
                      <Radio.Button
                        value="Black"
                        className="text-violet-500! hover:border-violet-500! "
                      >
                        Black
                      </Radio.Button>
                      <Radio.Button
                        value="Blue"
                        className="text-violet-500! hover:border-violet-500!"
                      >
                        Blue
                      </Radio.Button>
                    </Radio.Group>
                  </div>

                  {/* QUANTITY */}
                  <div>
                    <Text strong>Quantity:</Text>
                    <Space className="ml-3">
                      <Button
                        className="text-violet-500! hover:border-violet-500!"
                        icon={<MinusOutlined />}
                        onClick={() => setQty(Math.max(1, qty - 1))}
                      />
                      <Text>{qty}</Text>
                      <Button
                        className="text-violet-500! hover:border-violet-500!"
                        icon={<PlusOutlined />}
                        onClick={() => setQty(qty + 1)}
                      />
                    </Space>
                  </div>
                </Space>

                <Divider />

                {/* ACTION BUTTONS */}
                <Space direction="vertical" className="w-full">
                  <Button
                    size="large"
                    className="text-violet-500! hover:border-violet-500! text-lg!"
                    block
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </Button>

                  <Button
                    size="large"
                    type="primary"
                    block
                    className="bg-violet-500! hover:bg-violet-600! text-lg!"
                    onClick={handleBuyNow}
                  >
                    Buy Now
                  </Button>

                  {/* WHATSAPP */}
                  <Button
                    size="large"
                    block
                    icon={<WhatsAppOutlined />}
                    className="bg-green-500! text-white! hover:bg-green-600! border-none! text-lg!"
                    onClick={whatsappOrder}
                  >
                    Order via WhatsApp
                  </Button>
                </Space>
              </Card>
            </Col>
          </Row>

          {/* ================= FULL PRODUCT DETAILS ================= */}
          <div className="mt-12">
            <Card bordered={false}>
              <Title level={3}>📄 Product Details</Title>
              <Divider />

              <Row gutter={[24, 24]}>
                {/* DESCRIPTION */}
                <Col xs={24} md={14}>
                  <Title level={4}>Description</Title>
                  <Paragraph className="text-gray-700 leading-relaxed">
                    {product.description ||
                      "এই পণ্যটি দৈনন্দিন ব্যবহারের জন্য উপযুক্ত। উন্নত মানের ম্যাটেরিয়াল দিয়ে তৈরি, যা দীর্ঘদিন টেকসই থাকবে।"}
                  </Paragraph>

                  <Paragraph className="text-gray-700">
                    ✔ 100% Original Product
                    <br />
                    ✔ Quality Checked
                    <br />✔ বাংলাদেশে দ্রুত ডেলিভারি
                  </Paragraph>
                </Col>

                {/* SPECIFICATIONS */}
                <Col xs={24} md={10}>
                  <Title level={4}>Specifications</Title>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between border-b border-gray-200 pb-2">
                      <Text strong className="text-gray-700!" type="secondary">
                        Brand
                      </Text>
                      <Text>Escape</Text>
                    </div>

                    <div className="flex justify-between border-b border-gray-200 pb-2">
                      <Text strong className="text-gray-700!" type="secondary">
                        Available Sizes
                      </Text>
                      <Text>S, M, L</Text>
                    </div>

                    <div className="flex justify-between border-b border-gray-200 pb-2">
                      <Text strong className="text-gray-700!" type="secondary">
                        Available Colors
                      </Text>
                      <Text>Black, Blue</Text>
                    </div>

                    <div className="flex justify-between border-b border-gray-200 pb-2">
                      <Text strong className="text-gray-700!" type="secondary">
                        Material
                      </Text>
                      <Text>Premium Fabric</Text>
                    </div>

                    <div className="flex justify-between border-b border-gray-200 pb-2">
                      <Text strong className="text-gray-700!" type="secondary">
                        Country of Origin
                      </Text>
                      <Text>Bangladesh</Text>
                    </div>
                  </div>
                </Col>
              </Row>

              <Divider />

              {/* DELIVERY INFO */}
              <Row gutter={[24, 24]}>
                <Col xs={24} md={12}>
                  <Title level={4}>🚚 Delivery Information</Title>
                  <Paragraph>
                    • ঢাকা শহরের ভিতরে: 1–2 কর্মদিবস
                    <br />
                    • ঢাকার বাইরে: 2–4 কর্মদিবস
                    <br />• Cash on Delivery available
                  </Paragraph>
                </Col>

                <Col xs={24} md={12}>
                  <Title level={4}>↩ Return Policy</Title>
                  <Paragraph>
                    • ৭ দিনের মধ্যে রিটার্ন সুবিধা
                    <br />
                    • পণ্য ব্যবহার না করা থাকতে হবে
                    <br />• রিটার্ন চার্জ প্রযোজ্য হতে পারে
                  </Paragraph>
                </Col>
              </Row>

              <Divider />

              {/* REVIEWS PLACEHOLDER */}
              <Title level={4}>⭐ Customer Reviews</Title>
              <Paragraph type="secondary">
                এখনো কোনো রিভিউ নেই। প্রথম রিভিউ দিন!
              </Paragraph>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;
