import { Select, Typography } from 'antd';
import ProductList from '../features/Product/ProductList';
import LoadMoreButton from '../components/common/LoadMoreButton';
import { slides } from '../data';
import { useProducts } from '../hooks/useProducts';
import Slider from '../features/Slider/Slider';

const { Title } = Typography;
const { Option } = Select;

const HomePage: React.FC = () => {
  const { displayedProducts, loading, hasMore, loadMoreProducts } = useProducts();

  return (
    <div className="container mx-auto px-4 pt-8">
      {/* ================= SLIDER ================= */}
      <Slider slides={slides} />

      {/* ================= Title and Filter Dropdown ================= */}
      <div className="flex justify-between items-center mt-5">
        <Title level={1}>Featured Products</Title>
        <Select className='hover:border-violet-600!' defaultValue="all" style={{ width: 150 }}>
          <Option value="all">All Categories</Option>
          <Option value="womens">Women's Fashion</Option>
          <Option value="mens">Men's Fashion</Option>
          <Option value="fashion">Fashion</Option>
        </Select>
      </div>

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
