import { Header, Footer } from './layouts';
import { HomePage } from './pages';
import { CartProvider } from './context/CartContext';
import CartDrawer from './components/Cart/CartDrawer';

function App() {
  return (
    <CartProvider>
      <div>
        <Header />
        <HomePage />
        <Footer />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}

export default App;