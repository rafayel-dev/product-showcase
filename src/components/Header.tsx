import { BsCart3 } from 'react-icons/bs';
import logo from '../assets/logo.jpg';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-10" />
        </div>
        <div className="flex items-center">
          <BsCart3 className="h-6 w-6 text-gray-700 hover:text-gray-900 cursor-pointer" />
        </div>
      </div>
    </header>
  );
};

export default Header;
