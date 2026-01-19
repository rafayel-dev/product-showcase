import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../services/productService";
import type { CartItem, Product, Review } from "../types";
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
  Popover,
  Form,
  Input,
  Carousel,
} from "antd";
import {
  MinusOutlined,
  PlusOutlined,
  WhatsAppOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { useCart } from "../hooks/useCart";
import toast from "../utils/toast";

const { Title, Text, Paragraph } = Typography;

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [form] = Form.useForm();
  const [selectedImage, setSelectedImage] = useState("");
  const [size, setSize] = useState("M");
  const [color, setColor] = useState("Black");
  const [qty, setQty] = useState(1);
  const discountPercentage = 15;

  const hasDiscount = discountPercentage > 0;
  const finalPrice = product
    ? Math.round(product.price - (product.price * discountPercentage) / 100)
    : 0;

  useEffect(() => {
    if (id) {
      const found = getProductById(Number(id));
      if (found) {
        setProduct(found);
        setSelectedImage(found.image);
      } else {
        // Handle case where product is not found, e.g., navigate to a 404 page
        navigate("/404");
      }
    }
  }, [id, navigate]);

  if (!product) return null;

  /* ================= SEO SCHEMA ================= */
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: [selectedImage],
    description: product.description,
    brand: { "@type": "Brand", name: "Your Store Name" },
    offers: {
      "@type": "Offer",
      priceCurrency: "BDT",
      price: hasDiscount ? finalPrice : product.price,
      availability: "https://schema.org/InStock",
    },
  };

  const handleAddToCart = () => {
    addToCart({
      ...product,
      selectedSize: size,
      selectedColor: color,
      quantity: qty,
      price: hasDiscount ? finalPrice : product.price,
    } as CartItem);
    toast.success("পণ্য কার্টে যোগ হয়েছে 🛒");
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/checkout");
  };

  const handleReviewSubmit = (values: any) => {
    const newReview: Review = {
      name: values.name,
      orderId: values.orderId,
      rating: values.rating,
      comment: values.comment,
      date: new Date().toLocaleDateString(),
    };

    setReviews((prev) => [newReview, ...prev]);
    toast.success("আপনার রিভিউটি সাবমিট হয়েছে ❤️");
    form.resetFields();
  };

  const whatsappOrder = () => {
    const msg = `Hello, আমি এই পণ্যটি অর্ডার করতে চাই 👇
  
  Product: ${product.title}
  Size: ${size}
  Color: ${color}
  Quantity: ${qty}
  Price: ৳${(hasDiscount ? finalPrice : product.price) * qty}
  `;
    window.open(
      `https://wa.me/8801751876070?text=${encodeURIComponent(msg)}`,
      "_blank",
    );
  };

  const productUrl = window.location.href; // Get current product URL
  const productTitle = product.title;

  // Facebook Share
  const shareFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`,
      "_blank",
    );
  };

  // Twitter Share
  const shareTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(productTitle)}&url=${encodeURIComponent(productUrl)}`,
      "_blank",
    );
  };

  // Copy Link
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(productUrl);
      toast.success("Product link copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy link.");
      console.error("Failed to copy: ", err);
    }
  };

  const shareContent = (
    <Space direction="vertical">
      <Button
        type="text"
        icon={<FaFacebook style={{ color: "#1877f2" }} />}
        onClick={shareFacebook}
      >
        Share on Facebook
      </Button>
      <Button
        type="text"
        icon={<FaTwitter style={{ color: "#1da1f2" }} />}
        onClick={shareTwitter}
      >
        Share on Twitter
      </Button>
      <Button type="text" icon={<ShareAltOutlined />} onClick={copyLink}>
        Copy Link
      </Button>
    </Space>
  );

  return (
    <>
      {" "}
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
                  {hasDiscount && (
                    <div className="absolute top-2 left-2 bg-violet-600/70 text-white backdrop-blur-sm text-xs font-semibold px-2 py-1 rounded font-nunito">
                      🔥{discountPercentage}% Off
                    </div>
                  )}
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
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                  {/* LEFT SIDE */}
                  <div className="flex flex-wrap items-center gap-2">
                    <Rate
                      disabled
                      allowHalf
                      defaultValue={product.rating}
                      className="text-xs! sm:text-sm! md:text-base!"
                    />

                    <a href="#review">
                      <Text
                        type="secondary"
                        className="text-xs md:text-sm cursor-pointer hover:underline"
                      >
                        (124 Reviews)
                      </Text>
                    </a>

                    {/* SHARE BUTTON */}
                    <Popover
                      content={shareContent}
                      trigger="click"
                      placement="bottom"
                    >
                      <span className="hover:text-violet-600 text-xs md:text-sm cursor-pointer transition-all duration-300 flex items-center gap-1">
                        <ShareAltOutlined />
                        Share
                      </span>
                    </Popover>
                  </div>

                  {/* RIGHT SIDE (PRICE) */}
                  <div className="flex items-center gap-2">
                    {hasDiscount ? (
                      <>
                        <Title
                          level={4}
                          className="text-red-500! m-0! md:text-2xl!"
                        >
                          ৳{finalPrice}
                        </Title>
                        <Text delete type="secondary" className="text-sm">
                          ৳{product.price}
                        </Text>
                      </>
                    ) : (
                      <Title
                        level={4}
                        className="text-red-500! m-0! md:text-2xl!"
                      >
                        ৳{product.price}
                      </Title>
                    )}
                  </div>
                </div>

                <Space wrap className="my-3">
                  <Tag color="blue">Fast Delivery</Tag>
                  <Tag color="gold">Original Product</Tag>
                  <Tag color="green" className="font-bold">
                    In Stock
                  </Tag>
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
              {/* ================= CUSTOMER REVIEWS ================= */}

              <Title id="review" level={4}>
                ⭐ Customer Reviews
              </Title>
              {/* Review List */}
              {reviews.length === 0 ? (
                <Paragraph type="secondary">
                  এখনো কোনো রিভিউ নেই। প্রথম রিভিউ দিন!
                </Paragraph>
              ) : (
                <Carousel
                  adaptiveHeight
                  arrows
                  slidesToShow={3}
                  slidesToScroll={1}
                  responsive={[
                    { breakpoint: 1024, settings: { slidesToShow: 2 } },
                    { breakpoint: 640, settings: { slidesToShow: 1 } },
                  ]}
                >
                  {reviews.map((review, index) => (
                    <div key={index} className="review-slide">
                      <Card className="review-card bg-gray-50">
                        <Space
                          direction="vertical"
                          size="middle"
                          style={{ width: "100%" }}
                        >
                          <Space align="start" wrap style={{ width: "100%" }}>
                            <Text strong className="review-name">
                              {review.name}
                            </Text>

                            <Tag color="purple">Order ID: {review.orderId}</Tag>
                          </Space>

                          <Rate disabled value={review.rating} />

                          <Paragraph className="mb-1 line-clamp-3">
                            {review.comment}
                          </Paragraph>

                          <Text
                            type="secondary"
                            className="review-date text-xs"
                          >
                            {review.date}
                          </Text>
                        </Space>
                      </Card>
                    </div>
                  ))}
                </Carousel>
              )}

              <Divider />

              {/* ================= REVIEW FORM ================= */}
              <Title level={5}>✍️ Write a Review</Title>

              <Form
                form={form}
                layout="vertical"
                onFinish={handleReviewSubmit}
                className="max-w-lg"
              >
                <Form.Item
                  label="Your Name"
                  name="name"
                  rules={[{ required: true, message: "নাম লিখুন" }]}
                >
                  <Input placeholder="আপনার নাম" />
                </Form.Item>

                <Form.Item
                  label="Order ID"
                  name="orderId"
                  rules={[{ required: true, message: "Order ID দিন" }]}
                >
                  <Input placeholder="যে Order ID দিয়ে কিনেছেন" />
                </Form.Item>

                <Form.Item
                  label="Rating"
                  name="rating"
                  rules={[{ required: true, message: "Rating দিন" }]}
                >
                  <Rate />
                </Form.Item>

                <Form.Item
                  label="Your Review"
                  name="comment"
                  rules={[{ required: true, message: "রিভিউ লিখুন" }]}
                >
                  <Input.TextArea
                    rows={4}
                    placeholder="পণ্যের অভিজ্ঞতা লিখুন..."
                  />
                </Form.Item>

                <Button
                  type="primary"
                  htmlType="submit"
                  className="bg-violet-500! hover:bg-violet-600!"
                >
                  Submit Review
                </Button>
              </Form>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;
