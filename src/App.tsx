import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { CartProvider } from './context/CartContext';
import { useProducts } from './hooks/useProducts';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { Button } from './components/ui/Button';
import { Product } from './types';
import { RefreshCw, AlertCircle } from 'lucide-react';

// Page Imports
import { ProductsPage } from './pages/Products';
import { ContactPage } from './pages/Contact';
import { AboutPage } from './pages/About';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { ShippingInfoPage } from './pages/ShippingInfoPage';
import { ReturnsPage } from './pages/ReturnsPage';
import { FAQPage } from './pages/FAQPage';
import { CareersPage } from './pages/CareersPage';
import { PressPage } from './pages/PressPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';

const HomePage: React.FC = () => {
  const { products, loading, error, refetch } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <>
      <Hero />
      <section id="products" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-poppins font-bold text-primary-text mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-slate-300 font-roboto max-w-2xl mx-auto">
              Discover our carefully curated selection of premium products at unbeatable prices
            </p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 mb-8 text-center">
              <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-lg font-poppins font-semibold text-red-400 mb-2">
                Sorry — we couldn't load products
              </h3>
              <p className="text-red-300 font-roboto mb-4">{error}</p>
              <Button onClick={refetch} variant="outline" className="border-red-500/50 text-red-400 hover:bg-red-500/10">
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Refreshing
              </Button>
            </div>
          )}

          <ProductGrid
            products={products.slice(0, 8)} 
            loading={loading}
            onViewDetails={handleViewDetails}
          />

          {!loading && products.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
              className="text-center mt-16"
            >
              <Link to="/products">
                <Button size="lg" variant="outline">
                  View All Products
                </Button>
              </Link>
            </motion.div>
          )}

        </div>
      </section>
      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={closeModal}
      />
    </>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <CartProvider>
        {/* --- LAYOUT FIX APPLIED HERE --- */}
        <div className="min-h-screen bg-primary-bg text-primary-text flex flex-col">
          <Navbar />
          <main className="flex-grow"> {/* This makes the main content area expand */}
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
              <Route path="/shipping-info" element={<ShippingInfoPage />} />
              <Route path="/returns" element={<ReturnsPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/careers" element={<CareersPage />} />
              <Route path="/press" element={<PressPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            </Routes>
          </main>
          <CartDrawer />
          <Footer />
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: 'rgba(23, 26, 58, 0.8)',
                color: '#E0E0E0',
                border: '1px solid #4A5568',
                backdropFilter: 'blur(10px)',
              },
            }}
          />
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;