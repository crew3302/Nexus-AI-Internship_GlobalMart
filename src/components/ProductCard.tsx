import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Plus, Eye, Heart } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { formatCurrency } from '../utils/currency';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  const { state, addToCart, toggleWishlist } = useCart();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const isInWishlist = state.wishlist.some(item => item.id === product.id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    const rect = e.currentTarget.getBoundingClientRect();
    const flyElement = document.createElement('div');
    flyElement.className = 'fixed z-50 pointer-events-none';
    flyElement.innerHTML = `
      <div class="w-8 h-8 bg-primary-accent rounded-full flex items-center justify-center animate-fly-to-cart">
        <svg class="w-4 h-4 text-primary-bg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
        </svg>
      </div>
    `;
    flyElement.style.left = `${rect.left + rect.width / 2}px`;
    flyElement.style.top = `${rect.top + rect.height / 2}px`;
    
    document.body.appendChild(flyElement);
    
    setTimeout(() => {
      document.body.removeChild(flyElement);
    }, 800);
    
    addToCart(product);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      whileHover={{ y: -10, scale: 1.03 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-slate-800/40 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden shadow-lg hover:border-primary-accent/50 hover:shadow-2xl hover:shadow-primary-accent/10 transition-all duration-300 cursor-pointer group"
      onClick={() => onViewDetails(product)}
    >
      <div className="relative overflow-hidden">
        {!imageLoaded && (
          <div className="w-full h-48 bg-slate-700 animate-pulse" />
        )}
        
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-48 object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=400';
          }}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-black/50 flex items-center justify-center gap-2"
        >
          <Button
            size="sm"
            variant="secondary"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(product);
            }}
            className="bg-white/90 backdrop-blur-sm border-white text-black hover:bg-white"
          >
            <Eye className="w-4 h-4 mr-1" />
            View Details
          </Button>
        </motion.div>

        {product.stock && product.stock < 10 && (
          <div className="absolute top-2 left-2">
            <Badge variant="warning" className="text-xs">
              Only {product.stock} left
            </Badge>
          </div>
        )}

        <button
          onClick={handleWishlistToggle}
          className={`absolute top-2 right-2 p-2 rounded-full transition-colors duration-200 ${
            isInWishlist ? 'bg-red-500/80 text-white' : 'bg-black/40 text-white hover:bg-red-500/80'
          }`}
          aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-5 h-5 transition-all ${isInWishlist ? 'fill-current' : ''}`} />
        </button>

      </div>

      <div className="p-4">
        {product.category && (
          <Badge className="mb-2" variant="default">
            {product.category}
          </Badge>
        )}

        <h3 className="font-poppins font-semibold text-primary-text text-lg mb-2 line-clamp-2">
          {product.name}
        </h3>

        {product.description && (
          <p className="text-slate-400 text-sm mb-3 line-clamp-2 font-roboto">
            {product.description}
          </p>
        )}

        {product.rating && (
          <div className="flex items-center mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(Number(product.rating))
                      ? 'text-yellow-400 fill-current'
                      : 'text-slate-600'
                  }`}
                />
              ))}
            </div>
            <span className="text-slate-400 text-sm ml-2 font-roboto">
              ({product.rating})
            </span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="text-xl font-bold text-primary-accent font-poppins">
            {formatCurrency(product.price)}
          </div>
          
          <Button
            size="sm"
            onClick={handleAddToCart}
            aria-label={`Add ${product.name} to cart`}
          >
            <Plus className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>
      </div>
    </motion.div>
  );
};