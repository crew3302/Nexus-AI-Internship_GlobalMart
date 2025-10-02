import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Star, Truck, Shield, RefreshCw } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { formatCurrency } from '../utils/currency';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = product ? [
    product.image,
    `${product.image}?random=1`,
    `${product.image}?random=2`
  ].filter(img => img) : [];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setQuantity(1);
      setCurrentImageIndex(0);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      onClose();
    }
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  };

  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="product-modal-title">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.6, bounce: 0.4 }}
            className="relative bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl max-w-4xl w-full max-h-full overflow-y-auto"
          >
            <button
              onClick={onClose}
              className="sticky top-4 right-4 z-20 p-2 bg-slate-800/80 backdrop-blur-sm rounded-full text-primary-text hover:text-white transition-colors float-right mr-4"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* --- MAIN LAYOUT --- */}
            <div className="flex flex-col lg:flex-row lg:items-start">
              
              {/* ✅ Image Gallery Section (Adjusted Alignment) */}
              <div className="lg:w-1/2 p-6 flex flex-col items-center lg:mt-12">
                {/* Main Image */}
                <div className="relative w-full bg-slate-800/50 rounded-xl aspect-[4/5] mb-4 shadow-xl shadow-primary-accent/10 border-2 border-primary-accent/30">
                  <img
                    src={images[currentImageIndex]}
                    alt={product.name}
                    className="w-full h-full object-contain rounded-xl p-2"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto-compress&cs=tinysrgb&w=600';
                    }}
                  />
                </div>

                {/* Thumbnails */}
                {images.length > 1 && (
                  <div className="flex flex-row justify-center gap-4">
                    {images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 cursor-pointer flex-shrink-0
                          ${
                            index === currentImageIndex
                              ? 'border-primary-accent ring-2 ring-primary-accent/60'
                              : 'border-slate-600 hover:border-primary-accent/80 hover:scale-110'
                          }`
                        }
                      >
                        <img
                          src={img}
                          alt={`${product.name} thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* --- Content Section --- */}
              <div className="lg:w-1/2 p-6 pt-0 lg:pt-6">
                {product.category && (
                  <Badge className="mb-3" variant="default">
                    {product.category}
                  </Badge>
                )}

                <h2 id="product-modal-title" className="text-2xl lg:text-3xl font-poppins font-bold text-white mb-3">
                  {product.name}
                </h2>

                {product.rating && (
                  <div className="flex items-center mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(Number(product.rating))
                              ? 'text-yellow-400 fill-current'
                              : 'text-slate-600'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-slate-400 ml-2 font-roboto">
                      ({product.rating}) • 150+ reviews
                    </span>
                  </div>
                )}

                <div className="text-3xl font-bold text-primary-accent font-poppins mb-6">
                  {formatCurrency(product.price)}
                </div>

                <div className="mb-6">
                  <h3 className="font-poppins font-semibold text-white mb-2">
                    Description
                  </h3>
                  <p className="text-slate-300 font-roboto leading-relaxed">
                    {product.description || 'No description available for this product.'}
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="font-poppins font-semibold text-white mb-3">
                    Quantity
                  </h3>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={decrementQuantity}
                      className="w-10 h-10 rounded-lg border border-slate-600 flex items-center justify-center text-primary-text hover:border-primary-accent hover:text-primary-accent transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-roboto font-semibold text-white text-lg">
                      {quantity}
                    </span>
                    <button
                      onClick={incrementQuantity}
                      className="w-10 h-10 rounded-lg border border-slate-600 flex items-center justify-center text-primary-text hover:border-primary-accent hover:text-primary-accent transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <Button
                  onClick={handleAddToCart}
                  size="lg"
                  className="w-full mb-6"
                >
                  Add {quantity} to Cart - {formatCurrency(product.price * quantity)}
                </Button>

                <div className="grid grid-cols-3 gap-4 text-center border-t border-slate-700 pt-6">
                  <div className="flex flex-col items-center">
                    <Truck className="w-6 h-6 text-primary-accent mb-2" />
                    <span className="text-sm font-roboto text-slate-300">Free Shipping</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Shield className="w-6 h-6 text-primary-accent mb-2" />
                    <span className="text-sm font-roboto text-slate-300">2 Year Warranty</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <RefreshCw className="w-6 h-6 text-primary-accent mb-2" />
                    <span className="text-sm font-roboto text-slate-300">30-Day Returns</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
