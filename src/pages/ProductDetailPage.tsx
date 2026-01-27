import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, getRelatedProducts } from "../services/productService";
import type { CartItem, Product, Review } from "../types";
import ProductList from "../features/Product/ProductList";
import {
  Image,
  Typography,
  Rate,
  Row,
  Col,
  Space,
  Tag,
  Radio,
  Divider,
  Popover,
  Form,
  Carousel,
} from "antd";
import AppButton from "../components/common/AppButton";
import AppCard from "../components/common/AppCard";
import AppInput from "../components/common/AppInput";
import SEO from "../components/common/SEO";
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
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [form] = Form.useForm();
  const [selectedImage, setSelectedImage] = useState("");
  const [size, setSize] = useState("M");
  const [color, setColor] = useState("Black");
  const [qty, setQty] = useState(1);
  /* ================= DISCOUNT LOGIC ================= */
  const hasDiscount = !!product?.hasDiscount;

  const finalPrice = product
    ? (product.hasDiscount
      ? (product.discountType === 'flat'
        ? product.price - (product.discountValue || 0)
        : product.price - (product.price * (product.discountValue || 0)) / 100)
      : product.price)
    : 0;



  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const found = await getProductById(id);
        if (found) {
          setProduct(found);
          setSelectedImage(found.image);

          if (found.specifications?.availableSizes?.length) {
            setSize(found.specifications.availableSizes[0]);
          }
          if (found.specifications?.availableColors?.length) {
            setColor(found.specifications.availableColors[0]);
          }

          const related = await getRelatedProducts(found.id);
          setRelatedProducts(related);
        } else {
          // Handle case where product is not found, e.g., navigate to a 404 page
          navigate("/404");
        }
      }
    };
    fetchData();
  }, [id, navigate]);

  if (!product) return null;

  /* ================= SEO SCHEMA ================= */
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: [selectedImage],
    description: product.shortDescription,
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

  interface ReviewFormValues {
    name: string;
    orderId: string;
    rating: number;
    comment: string;
  }

  const handleReviewSubmit = (values: ReviewFormValues) => {
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
      <AppButton
        type="text"
        icon={<FaFacebook style={{ color: "#1877f2" }} />}
        onClick={shareFacebook}
      >
        Share on Facebook
      </AppButton>
      <AppButton
        type="text"
        icon={<FaTwitter style={{ color: "#1da1f2" }} />}
        onClick={shareTwitter}
      >
        Share on Twitter
      </AppButton>
      <AppButton type="text" icon={<ShareAltOutlined />} onClick={copyLink}>
        Copy Link
      </AppButton>
    </Space>
  );

  return (
    <>
      {" "}
      <SEO
        title={product.title}
        description={product.shortDescription.substring(0, 150)}
        image={selectedImage}
        type="product"
      />
      <script type="application/ld+json">
        {JSON.stringify(productSchema)}
      </script>
      <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <Row gutter={[32, 32]}>
            {/* IMAGES */}
            <Col xs={24} md={12}>
              <AppCard bordered={false}>
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
                      🔥{product.discountType === 'flat' ? `৳${product.discountValue} Off` : `${product.discountValue}% Off`}
                    </div>
                  )}
                </div>

                <Space className="mt-4" wrap>
                  {(product.imageUrls && product.imageUrls.length > 0 ? product.imageUrls : [product.image]).map((img, i) => (
                    <Image
                      key={i}
                      src={img}
                      width={70}
                      preview={false}
                      onClick={() => setSelectedImage(img)}
                      className={`cursor-pointer rounded aspect-square object-cover ${selectedImage === img ? 'border-2 border-violet-500' : ''}`}
                    />
                  ))}
                </Space>
              </AppCard>
            </Col>

            {/* DETAILS */}
            <Col xs={24} md={12}>
              <AppCard bordered={false}>
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
                  {product.status === 'Out of Stock' ? (
                    <Tag color="red" className="font-bold">Out of Stock</Tag>
                  ) : product.status === 'Discontinued' ? (
                    <Tag color="default" className="font-bold">Discontinued</Tag>
                  ) : (
                    <Tag color="green" className="font-bold">In Stock</Tag>
                  )}
                </Space>

                <Paragraph>{product.shortDescription}</Paragraph>

                {/* TAGS */}
                {product.tags && product.tags.length > 0 && (
                  <div className="mb-4">
                    {product.tags.map(tag => (
                      <Tag key={tag} className="mr-1!">#{tag}</Tag>
                    ))}
                  </div>
                )}

                <Divider />

                {/* VARIANTS */}
                <Space direction="vertical" size="middle">
                  {/* SIZES */}
                  {product.specifications?.availableSizes && product.specifications.availableSizes.length > 0 && (
                    <div>
                      <Text strong>Size: </Text>
                      <Radio.Group
                        className="ml-3"
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                      >
                        {product.specifications.availableSizes.map((s) => (
                          <Radio.Button
                            key={s}
                            value={s}
                            className={`text-violet-500! hover:border-violet-500! ${size === s ? "border-violet-500!" : ""}`}
                          >
                            {s}
                          </Radio.Button>
                        ))}
                      </Radio.Group>
                    </div>
                  )}

                  {/* COLORS */}
                  {product.specifications?.availableColors && product.specifications.availableColors.length > 0 && (
                    <div>
                      <Text strong>Color: </Text>
                      <Radio.Group
                        className="ml-3"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                      >
                        {product.specifications.availableColors.map((c) => (
                          <Radio.Button
                            key={c}
                            value={c}
                            className={`text-violet-500! hover:border-violet-500! ${color === c ? "border-violet-500!" : ""}`}
                          >
                            {c}
                          </Radio.Button>
                        ))}
                      </Radio.Group>
                    </div>
                  )}

                  {/* QUANTITY */}
                  <div className="mb-6">
                    <Text strong>Quantity:</Text>
                    <Space className="ml-3">
                      <AppButton
                        className="text-violet-500! hover:text-violet-600! hover:border-violet-500!"
                        icon={<MinusOutlined />}
                        onClick={() => setQty(Math.max(1, qty - 1))}
                      />
                      <Text>{qty}</Text>
                      <AppButton
                        className="text-violet-500! hover:text-violet-600! hover:border-violet-500!"
                        icon={<PlusOutlined />}
                        onClick={() => setQty(qty + 1)}
                      />
                    </Space>
                  </div>
                </Space>

                {/* ACTION BUTTONS */}
                <Space direction="vertical" className="w-full">
                  <AppButton
                    size="large"
                    className="text-lg! text-violet-500! hover:text-violet-600! hover:border-violet-500!"
                    block
                    disabled={product.status === 'Out of Stock' || product.status === 'Discontinued'}
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </AppButton>

                  <AppButton
                    size="large"
                    type="primary"
                    block
                    className="text-lg! text-white! hover:text-white! hover:bg-violet-50! border-violet-500!"
                    disabled={product.status === 'Out of Stock' || product.status === 'Discontinued'}
                    onClick={handleBuyNow}
                  >
                    Buy Now
                  </AppButton>

                  {/* WHATSAPP */}
                  <AppButton
                    size="large"
                    block
                    icon={<WhatsAppOutlined />}
                    className="bg-green-500! text-white! hover:bg-green-600! border-none! text-lg!"
                    onClick={whatsappOrder}
                  >
                    Order via WhatsApp
                  </AppButton>
                </Space>
              </AppCard>
            </Col>
          </Row>

          {/* ================= FULL PRODUCT DETAILS ================= */}
          <div className="mt-12">
            <AppCard bordered={false}>
              <Title level={3}>📄 Product Details</Title>
              <Divider />

              <Row gutter={[24, 24]}>
                {/* DESCRIPTION */}
                <Col xs={24} md={14}>
                  <Title level={4}>Short Description</Title>
                  <Paragraph className="text-gray-700 leading-relaxed">
                    {product.shortDescription ||
                      "এই পণ্যটি দৈনন্দিন ব্যবহারের জন্য উপযুক্ত। উন্নত মানের ম্যাটেরিয়াল দিয়ে তৈরি, যা দীর্ঘদিন টেকসই থাকবে।"}
                  </Paragraph>

                  {product.productDetails?.features && product.productDetails.features.length > 0 ? (
                    <div className="mt-4">
                      <Title level={5}>Key Features:</Title>
                      <ul className="list-disc list-inside text-gray-700">
                        {product.productDetails.features.map((feature, idx) => (
                          <li key={idx}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <Paragraph className="text-gray-700">
                      ✔ 100% Original Product
                      <br />
                      ✔ Quality Checked
                      <br />✔ বাংলাদেশে দ্রুত ডেলিভারি
                    </Paragraph>
                  )}

                </Col>

                {/* SPECIFICATIONS */}
                <Col xs={24} md={10}>
                  <Title level={4}>Specifications</Title>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between border-b border-gray-200 pb-2">
                      <Text strong className="text-gray-700!" type="secondary">
                        Brand
                      </Text>
                      <Text>{product.specifications?.brand || "—"}</Text>
                    </div>

                    <div className="flex justify-between border-b border-gray-200 pb-2">
                      <Text strong className="text-gray-700!" type="secondary">
                        Available Sizes
                      </Text>
                      <Text>{product.specifications?.availableSizes?.join(", ") || "—"}</Text>
                    </div>

                    <div className="flex justify-between border-b border-gray-200 pb-2">
                      <Text strong className="text-gray-700!" type="secondary">
                        Available Colors
                      </Text>
                      <Text>{product.specifications?.availableColors?.join(", ") || "—"}</Text>
                    </div>

                    <div className="flex justify-between border-b border-gray-200 pb-2">
                      <Text strong className="text-gray-700!" type="secondary">
                        Material
                      </Text>
                      <Text>{product.specifications?.material || "—"}</Text>
                    </div>

                    <div className="flex justify-between border-b border-gray-200 pb-2">
                      <Text strong className="text-gray-700!" type="secondary">
                        Country of Origin
                      </Text>
                      <Text>{product.specifications?.countryOfOrigin || "—"}</Text>
                    </div>
                  </div>
                </Col>
              </Row>

              <Divider />

              {/* DESCRIPTION */}
              <Col xs={24} md={24}>
                <Title level={4}>Description</Title>
                <div
                  className="text-gray-700 leading-relaxed rich-text-content"
                  dangerouslySetInnerHTML={{
                    __html: product.longDescription || "এই পণ্যটি দৈনন্দিন ব্যবহারের জন্য উপযুক্ত। উন্নত মানের ম্যাটেরিয়াল দিয়ে তৈরি, যা দীর্ঘদিন টেকসই থাকবে।"
                  }}
                />
              </Col>

              <Divider />
              {/* DELIVERY INFO */}
              <Row gutter={[24, 24]}>
                <Col xs={24} md={12}>
                  <Title level={4}>🚚 Delivery Information</Title>
                  <Paragraph className="whitespace-pre-line">
                    {product.productDetails?.deliveryInfo || `• ঢাকা শহরের ভিতরে: 1–2 কর্মদিবস
• ঢাকার বাইরে: 2–4 কর্মদিবস
• Cash on Delivery available`}
                  </Paragraph>
                </Col>

                <Col xs={24} md={12}>
                  <Title level={4}>↩ Return Policy</Title>
                  <Paragraph className="whitespace-pre-line">
                    {product.productDetails?.returnPolicy || `• ৭ দিনের মধ্যে রিটার্ন সুবিধা
• পণ্য ব্যবহার না করা থাকতে হবে
• রিটার্ন চার্জ প্রযোজ্য হতে পারে`}
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
                <Carousel draggable swipeToSlide className="review-carousel">
                  {reviews.map((review, index) => (
                    <div key={index} className="px-2">
                      <AppCard className="bg-gray-50 h-full overflow-hidden">
                        <Space
                          direction="vertical"
                          size="middle"
                          className="w-full"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full">
                            <Text
                              strong
                              className="text-sm md:text-base wrap-break-word whitespace-normal"
                            >
                              {review.name}
                            </Text>

                            {review.orderId && (
                              <Tag color="purple" className="w-fit">
                                Order ID: {review.orderId}
                              </Tag>
                            )}
                          </div>

                          <Rate
                            disabled
                            value={review.rating}
                            className="text-xs md:text-base"
                          />

                          <Paragraph className="mb-1 line-clamp-3 text-sm">
                            {review.comment}
                          </Paragraph>

                          <Text type="secondary" className="text-xs">
                            {review.date}
                          </Text>
                        </Space>
                      </AppCard>
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
                  <AppInput placeholder="আপনার নাম" />
                </Form.Item>

                <Form.Item
                  label="Order ID"
                  name="orderId"
                  rules={[{ required: true, message: "Order ID দিন" }]}
                >
                  <AppInput placeholder="যে Order ID দিয়ে কিনেছেন" />
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
                  <AppInput.TextArea
                    rows={4}
                    placeholder="পণ্যের অভিজ্ঞতা লিখুন..."
                  />
                </Form.Item>

                <AppButton
                  type="primary"
                  htmlType="submit"
                >
                  Submit Review
                </AppButton>
              </Form>
            </AppCard>
          </div>

          {/* ================= RELATED PRODUCTS ================= */}
          <div className="mt-12">
            <Title level={3}>Related Products</Title>
            <Divider />
            <ProductList products={relatedProducts} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;
