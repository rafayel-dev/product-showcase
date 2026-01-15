import { BsCart3 } from 'react-icons/bs';
import logo from '../assets/logo.jpg';
import { useCart } from '../hooks/useCart';
import { Badge } from 'antd';
import { Link } from 'react-router-dom';


const Header = () => {
  const { openCart, cartItems } = useCart();
  const totalItems = cartItems.reduce((sum: number, item: { quantity: number }) => sum + item.quantity, 0);

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="h-10" />
        </Link>
        <div className="flex items-center">
          <Badge count={totalItems} showZero>
            <BsCart3
              className="h-6 w-6 text-gray-700 hover:text-gray-900 cursor-pointer"
              onClick={openCart}
            />
          </Badge>
        </div>
      </div>
    </header>
  );
};

export default Header;

