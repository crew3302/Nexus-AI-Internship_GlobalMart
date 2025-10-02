import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ProductGrid } from '../components/ProductGrid';
import { ProductModal } from '../components/ProductModal';
import { useProducts } from '../hooks/useProducts';
import { Product } from '../types';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { formatCurrency } from '../utils/currency';

export const ProductsPage: React.FC = () => {
  const { products, loading, error, refetch } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [visibleCount, setVisibleCount] = useState(12);
  const [filters, setFilters] = useState({
    category: 'all',
    price: 500000,
  });
  const [sortOrder, setSortOrder] = useState('default');

  const handleViewDetails = (product: Product) => setSelectedProduct(product);
  const closeModal = () => setSelectedProduct(null);

  const categories = useMemo(() => {
    if (loading || !products.length) return ['all'];
    return ['all', ...Array.from(new Set(products.map((p) => p.category || 'Uncategorized')))];
  }, [products, loading]);

  const filteredAndSortedProducts = useMemo(() => {
    let result = products
      .filter((p) =>
        filters.category === 'all' ? true : p.category === filters.category
      )
      .filter((p) => p.price * 280 <= filters.price);

    if (sortOrder === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, filters, sortOrder]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  return (
    <div className="min-h-screen bg-primary-bg text-primary-text">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-poppins font-bold text-primary-text mb-4">
            Our Products
          </h1>
          <p className="text-lg text-slate-300 font-roboto max-w-2xl mx-auto">
            Browse our entire collection of high-quality products.
          </p>
        </div>

        {/* Filters and Sort */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 items-center p-4 bg-slate-800/50 rounded-lg border border-slate-700">
          {/* Category Filter */}
          <div className="flex flex-col gap-2">
            <label htmlFor="category-filter" className="font-roboto text-sm text-slate-400">Category</label>
            <select
              id="category-filter"
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-primary-text focus:ring-2 focus:ring-primary-accent focus:outline-none"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
              ))}
            </select>
          </div>

          {/* Price Filter */}
          <div className="flex flex-col gap-2">
            <label htmlFor="price-filter" className="font-roboto text-sm text-slate-400">Max Price: {formatCurrency(filters.price / 280)}</label>
            <input
              type="range"
              id="price-filter"
              min="1000"
              max="500000"
              step="1000"
              value={filters.price}
              onChange={(e) => setFilters({ ...filters, price: Number(e.target.value) })}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary-accent"
            />
          </div>

          {/* Sort */}
          <div className="flex flex-col gap-2">
            <label htmlFor="sort-order" className="font-roboto text-sm text-slate-400">Sort By</label>
            <select
              id="sort-order"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-primary-text focus:ring-2 focus:ring-primary-accent focus:outline-none"
            >
              <option value="default">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 mb-8 text-center">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-poppins font-semibold text-red-400 mb-2">
              Failed to load products
            </h3>
            <p className="text-red-300 font-roboto mb-4">{error}</p>
            <Button onClick={refetch} variant="outline" className="border-red-500/50 text-red-400 hover:bg-red-500/10">
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </div>
        )}

        <ProductGrid
          products={filteredAndSortedProducts.slice(0, visibleCount)}
          loading={loading}
          onViewDetails={handleViewDetails}
        />

        {!loading && visibleCount < filteredAndSortedProducts.length && (
          <div className="text-center mt-12">
            <Button size="lg" onClick={handleLoadMore}>
              Load More Products
            </Button>
          </div>
        )}
      </motion.div>

      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={closeModal}
      />
    </div>
  );
};