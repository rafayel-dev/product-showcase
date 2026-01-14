
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8 mt-10">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; {new Date().getFullYear()} Product Showcase. All rights reserved.</p>
        <div className="mt-4">
          <a href="#" className="text-gray-400 hover:text-white mx-2 transition-all duration-300">Privacy Policy</a>
          <span className="text-gray-400">|</span>
          <a href="#" className="text-gray-400 hover:text-white mx-2 transition-all duration-300">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;