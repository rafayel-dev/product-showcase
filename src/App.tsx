import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header, Footer } from './layouts';
import { CheckoutPage, HomePage, OrderSuccessPage, PrivacyPolicyPage, ProductDetailPage, TermsOfServicePage } from './pages';
import { CartProvider } from './context/CartContext';
import { CartDrawer } from './components';
import WhatsAppFloat from './components/whatsapp/WhatsAppFloat';

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
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          </Routes>
          <Footer />
          <CartDrawer />
          <WhatsAppFloat />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;