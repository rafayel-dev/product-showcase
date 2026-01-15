import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header, Footer } from './layouts';
import { CheckoutPage, HomePage, OrderSuccessPage } from './pages';
import ProductDetailPage from './pages/ProductDetailPage';
import { CartProvider } from './context/CartContext';
import CartDrawer from './components/Cart/CartDrawer';

function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-success" element={<OrderSuccessPage />} />
          </Routes>
          <Footer />
          <CartDrawer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;