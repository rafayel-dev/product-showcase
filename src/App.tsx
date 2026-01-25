import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header, Footer } from './layouts';
import { CartProvider } from './context/CartContext';
import { CartDrawer } from './components';
import WhatsAppFloat from './components/whatsapp/WhatsAppFloat';
import AppSpin from './components/common/AppSpin';

// Lazy load pages
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const CheckoutPage = React.lazy(() => import('./pages/CheckoutPage'));
const HomePage = React.lazy(() => import('./pages/HomePage'));
const OrderSuccessPage = React.lazy(() => import('./pages/OrderSuccessPage'));
const PrivacyPolicyPage = React.lazy(() => import('./pages/PrivacyPolicyPage'));
const ProductDetailPage = React.lazy(() => import('./pages/ProductDetailPage'));
const TermsOfServicePage = React.lazy(() => import('./pages/TermsOfServicePage'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));

function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Header />
          <Suspense fallback={<AppSpin />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-success" element={<OrderSuccessPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms-of-service" element={<TermsOfServicePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
          <Footer />
          <CartDrawer />
          <WhatsAppFloat />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;