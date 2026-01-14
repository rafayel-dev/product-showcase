import { Row, Col } from 'antd';
import type { Product } from '../../types';
import ProductCard from './ProductCard';

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <Row gutter={[24, 24]} className="mt-2">
      {products.map((product) => (
        <Col xs={24} sm={12} md={8} lg={{ flex: '0 0 20%' }} key={product.id}>
          <ProductCard
            title={product.title}
            image={product.image}
            rating={product.rating}
            price={product.price}
          />
        </Col>
      ))}
    </Row>
  );
};

export default ProductList;
