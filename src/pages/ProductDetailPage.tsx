import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { allProducts } from '../data';
import type { Product } from '../types';
import { Card, Image, Typography, Button, Rate, Flex } from 'antd';
import { useCart } from '../hooks/useCart';
import toast from '../utils/toast';

const { Title, Text, Paragraph } = Typography;

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    if (id) {
      const foundProduct = allProducts.find((p) => p.id === parseInt(id));
      setProduct(foundProduct || null);
    }
  }, [id]);

  if (!product) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <Title level={3}>Product Not Found</Title>
        <Text>The product you are looking for does not exist.</Text>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.title} added to cart!`);
  };

  return (
    <div className='min-h-screen' style={{ padding: '20px' }}>
      <Flex justify="center" align="flex-start" wrap="wrap" gap="large">
        <div style={{ flex: '1 1 400px', maxWidth: '500px' }}>
          <Card cover={<Image alt={product.title} src={product.image} style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />} />
        </div>
        <div style={{ flex: '1 1 400px', maxWidth: '600px' }}>
          <Title level={2}>{product.title}</Title>
          <Rate disabled defaultValue={product.rating} allowHalf />
          <Text strong style={{ fontSize: '24px', display: 'block', margin: '10px 0' }}>
            ${product.price.toFixed(2)}
          </Text>
          <Paragraph>
            {product.description || 'No description available for this product.'}
          </Paragraph>
          <Button type="primary" size="large" onClick={handleAddToCart} style={{ marginTop: '20px' }}>
            Add to Cart
          </Button>
        </div>
      </Flex>
    </div>
  );
};

export default ProductDetailPage;
