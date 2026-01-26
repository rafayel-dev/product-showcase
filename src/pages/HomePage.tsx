import { Select, Typography, Row, Col, Input } from "antd";
import ProductList from "../features/Product/ProductList";
import LoadMoreButton from "../components/common/LoadMoreButton";
import { slides } from "../data";
import { useProducts } from "../hooks/useProducts";
import Slider from "../features/Slider/Slider";
import SEO from "../components/common/SEO";

const { Title } = Typography;
const { Option } = Select;

const HomePage: React.FC = () => {
  const { displayedProducts, loading, hasMore, loadMoreProducts } =
    useProducts();

  return (
    <div className="container mx-auto px-4 pt-8">
      <SEO
        title="Home"
        description="Discover our new arrivals and best selling products."
      />
      {/* ================= SLIDER ================= */}
      <Slider slides={slides} />

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
              onSearch={(value) => console.log(value)}
              className="md:w-64! w-50!"
            />

            <Select defaultValue="all" className="md:w-40! w-36!">
              <Option value="all">All Categories</Option>
              <Option value="womens">Women's Fashion</Option>
              <Option value="mens">Men's Fashion</Option>
              <Option value="fashion">Fashion</Option>
            </Select>
          </div>
        </Col>
      </Row>

      {/* ================= PRODUCT LIST ================= */}
      <ProductList products={displayedProducts} />

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
