import { Drawer, Button, Space, Typography, InputNumber } from 'antd';
import { useCart } from '../../hooks/useCart';
import { FiX } from 'react-icons/fi';
import type { CartItem } from '../../types';
import { Link } from 'react-router-dom';

const { Text } = Typography;

const CartDrawer: React.FC = () => {
  const { isCartOpen, cartItems, closeCart, removeFromCart, updateQuantity, clearCart } = useCart();

  const totalPrice = cartItems.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0);

  return (
    <Drawer
      title="Your Cart"
      placement="right"
      onClose={closeCart}
      open={isCartOpen}
      width={400}
      extra={
        <Space>
          <Button onClick={clearCart} danger>
            Clear Cart
          </Button>
        </Space>
      }
    >
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <img src={item.image} alt={item.title} className="w-16 h-16 object-cover mr-4" />
                <div>
                  <Text strong>{item.title}</Text>
                  <br />
                  <Text type="secondary">${item.price} x </Text>
                  <InputNumber
                    min={1}
                    value={item.quantity}
                    onChange={(value: number | null) => updateQuantity(item.id, value || 1)}
                    style={{ width: 50 }}
                  />
                </div>
              </div>
              <Button
                type="text"
                className='bg-red-50!'
                danger
                icon={<FiX />}
                onClick={() => removeFromCart(item.id)}
              />
            </div>
          ))}
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-300">
            <Text strong>Total:</Text>
            <Text strong>${totalPrice.toFixed(2)}</Text>
          </div>
          <Link to="/checkout" onClick={closeCart}>
            <Button type="primary" size="large" block className="mt-4! bg-violet-500! hover:bg-violet-600!">
              Proceed to Checkout
            </Button>
          </Link>
        </>
      )}
    </Drawer>
  );
};

export default CartDrawer;
