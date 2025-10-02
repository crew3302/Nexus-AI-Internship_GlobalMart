import React from 'react';
import { motion } from 'framer-motion';
import { ProductCard } from './ProductCard';
import { SkeletonLoader } from './ui/Loader';
import { Product } from '../types';

interface ProductGridProps {
  products: Product[];
  loading: boolean;
  onViewDetails: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, loading, onViewDetails }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
            <SkeletonLoader className="w-full h-48" />
            <div className="p-4 space-y-3">
              <SkeletonLoader className="h-4 w-16" />
              <SkeletonLoader className="h-5 w-full" />
              <SkeletonLoader className="h-4 w-3/4" />
              <div className="flex justify-between items-center">
                <SkeletonLoader className="h-6 w-20" />
                <SkeletonLoader className="h-8 w-16 rounded-lg" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-slate-400 font-roboto text-lg mb-4">
          No products found
        </div>
        <p className="text-slate-500">
          Try adjusting your filters or check back later for new arrivals.
        </p>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {products.map((product) => (
        <ProductCard 
          key={product.id}
          product={product} 
          onViewDetails={onViewDetails}
        />
      ))}
    </motion.div>
  );
};