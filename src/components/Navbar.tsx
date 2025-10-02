import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, NavLink } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X, User, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';

export const Navbar: React.FC = () => {
  const { state, toggleCart } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Search query:', searchQuery);
  };

  const navLinks = [
    { to: '/', text: 'Home' },
    { to: '/products', text: 'Products' },
    { to: '/about', text: 'About' },
    { to: '/contact', text: 'Contact' },
  ];

  return (
    <>
      <nav className="sticky top-0 z-40 bg-primary-bg/80 backdrop-blur-lg border-b border-slate-700/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* --- INCREASED NAVBAR HEIGHT FOR BALANCE --- */}
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 flex items-center">
              <motion.div 
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src="/assets/logo.png"
                  alt="GlobalMart Logo"
                  // --- INCREASED LOGO SIZE ---
                  className="h-20 w-auto"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = document.createElement('span');
                    fallback.className = "font-poppins text-2xl font-bold text-primary-accent"; // --- Adjusted fallback size
                    fallback.textContent = "GlobalMart";
                    target.parentNode?.insertBefore(fallback, target.nextSibling);
                  }}
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              {navLinks.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `relative px-3 py-2 rounded-md text-sm font-medium font-roboto transition-colors duration-300 ${
                      isActive
                        ? 'text-white'
                        : 'text-slate-300 hover:text-white'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.text}
                      {isActive && (
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-accent"
                          layoutId="underline"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-2">
              <motion.button
                onClick={toggleCart}
                className="relative p-2 text-slate-300 hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Shopping cart with ${state.itemCount} items`}
              >
                <ShoppingCart className="w-6 h-6" />
                {state.itemCount > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                    className="absolute -top-1 -right-1"
                  >
                    <Badge variant="accent" className="w-5 h-5 text-xs flex items-center justify-center">
                      {state.itemCount > 99 ? '99+' : state.itemCount}
                    </Badge>
                  </motion.div>
                )}
              </motion.button>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={toggleMobileMenu}
                  className="p-2 text-slate-300 hover:text-white transition-colors"
                  aria-label="Toggle mobile menu"
                >
                  {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden border-t border-slate-700/80 bg-primary-bg/95"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-md text-base font-medium font-roboto ${
                        isActive
                          ? 'text-primary-accent bg-primary-accent/10'
                          : 'text-slate-300 hover:bg-slate-800'
                      }`
                    }
                  >
                    {link.text}
                  </NavLink>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};