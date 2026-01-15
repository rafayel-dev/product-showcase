import { Row, Col } from 'antd';
import type { Product } from '../../types';
import ProductCard from './ProductCard';

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <Row gutter={[24, 24]} className="mt-4">
      {products.map((product) => (
        <Col xs={24} sm={12} md={8} lg={{ flex: '0 0 20%' }} key={product.id}>
          <ProductCard product={product} />
        </Col>
      ))}
    </Row>
  );
};

export default ProductList;
