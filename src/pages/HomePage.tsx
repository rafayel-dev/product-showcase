import { Select, Typography, Row, Col } from "antd";
import ProductList from "../features/Product/ProductList";
import LoadMoreButton from "../components/common/LoadMoreButton";
import { slides } from "../data";
import { useProducts } from "../hooks/useProducts";
import Slider from "../features/Slider/Slider";

const { Title } = Typography;
const { Option } = Select;

const HomePage: React.FC = () => {
  const { displayedProducts, loading, hasMore, loadMoreProducts } =
    useProducts();

  return (
    <div className="container mx-auto px-4 pt-8">
      {/* ================= SLIDER ================= */}
      <Slider slides={slides} />

      {/* ================= Title and Filter Dropdown ================= */}
      <Row
        gutter={[12, 12]}
        align="middle"
        justify="space-between"
        style={{ marginTop: 20 }}
      >
        {/* Title */}
        <Col xs={24} sm={24} md={12}>
          <Title
            level={1}
            style={{
              margin: 0,
              fontSize: "clamp(22px, 4vw, 32px)",
            }}
          >
            Featured Products
          </Title>
        </Col>

        {/* Select */}
        <Col
          xs={24}
          sm={24}
          md={12}
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Select
            defaultValue="all"
            style={{
              width: "100%",
              maxWidth: 150,
            }}
          >
            <Option value="all">All Categories</Option>
            <Option value="womens">Women's Fashion</Option>
            <Option value="mens">Men's Fashion</Option>
            <Option value="fashion">Fashion</Option>
          </Select>
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
