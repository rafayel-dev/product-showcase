import React, { useEffect, useState } from "react";
import { Select, Typography, Row, Col, Input, Spin } from "antd";
import ProductList from "../features/Product/ProductList";
import LoadMoreButton from "../components/common/LoadMoreButton";
import EmptyState from "../components/common/EmptyState";
import { slides } from "../data";
import { useProducts } from "../hooks/useProducts";
import Slider from "../features/Slider/Slider";
import SEO from "../components/common/SEO";
import { getSliders, getCategories } from "../services/productService";
import type { Slide } from "../types";

const { Title } = Typography;
const { Option } = Select;

const HomePage: React.FC = () => {
  const {
    displayedProducts,
    loading,
    hasMore,
    loadMoreProducts,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
  } = useProducts();
  const [sliderData, setSliderData] = useState<Slide[]>(slides);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    [],
  );

  useEffect(() => {
    const fetchSliders = async () => {
      const data = await getSliders();
      if (data && data.length > 0) {
        setSliderData(data);
      }
    };
    const fetchCats = async () => {
      const cats = await getCategories();
      setCategories(cats);
    };
    fetchSliders();
    fetchCats();
  }, []);

  return (
    <div className="container mx-auto px-4 pt-8">
      <SEO
        title="Home"
        description="Discover our new arrivals and best selling products."
      />
      {/* ================= SLIDER ================= */}
      <Slider slides={sliderData} />

      {/* ================= Title and Filter Dropdown ================= */}
      <Row gutter={[12, 12]} align="middle" style={{ marginTop: 20 }}>
        {/* Title */}
        <Col xs={24} md={8}>
          <Title
            className="font-nunito"
            level={1}
            style={{
              margin: 0,
              fontSize: "clamp(22px, 4vw, 32px)",
            }}
          >
            New Arrival Products
          </Title>
        </Col>

        {/* Search + Select (Right side) */}
        <Col xs={24} md={16}>
          <div className="flex md:flex-row md:justify-end gap-3">
            <Input.Search
              placeholder="Search products..."
              allowClear
              value={searchQuery}
              onSearch={(value) => setSearchQuery(value)}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="md:w-64! w-50!"
            />

            <Select
              defaultValue="all"
              value={selectedCategory}
              onChange={setSelectedCategory}
              className="md:w-40! w-36!"
            >
              <Option value="all">All Categories</Option>
              {categories.map((cat) => (
                <Option key={cat.id} value={cat.name}>
                  {cat.name}
                </Option>
              ))}
            </Select>
          </div>
        </Col>
      </Row>

      {/* ================= PRODUCT LIST ================= */}
      {loading && displayedProducts.length === 0 ? (
        <div className="flex justify-center items-center py-32">
          <Spin size="large" />
        </div>
      ) : displayedProducts.length === 0 ? (
        <EmptyState
          onReset={() => {
            setSearchQuery("");
            setSelectedCategory("all");
          }}
        />
      ) : (
        <ProductList products={displayedProducts} />
      )}

      {/* ================= LOAD MORE BUTTON / LOADING INDICATOR ================= */}
      <LoadMoreButton
        hasMore={hasMore}
        loading={loading}
        loadMore={loadMoreProducts}
      />
    </div>
  );
};

export default HomePage;
