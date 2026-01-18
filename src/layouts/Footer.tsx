import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8 mt-10">
      <div className="container mx-auto px-4 text-center">
        <p>
          &copy; {new Date().getFullYear()} Product Showcase. All rights
          reserved.
        </p>

        <div className="mt-4">
          <Link
            to="/privacy-policy"
            className="text-gray-400 hover:text-white text-sm mx-2 transition-all duration-300"
          >
            Privacy Policy
          </Link>
          <span className="text-gray-400">|</span>
          <Link
            to="/terms-of-service"
            className="text-gray-400 hover:text-white text-sm mx-2 transition-all duration-300"
          >
            Terms of Service
          </Link>
          <span className="text-gray-400">|</span>
          <Link
            to="/about"
            className="text-gray-400 hover:text-white text-sm mx-2 transition-all duration-300"
          >
            About Us
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
