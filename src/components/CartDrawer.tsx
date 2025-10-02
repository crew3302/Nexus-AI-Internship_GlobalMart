import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from './ui/Button';
import { formatCurrency } from '../utils/currency';
import { useNavigate } from 'react-router-dom';

export const CartDrawer: React.FC = () => {
  const { state, toggleCart, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && state.isOpen) {
        toggleCart();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [state.isOpen, toggleCart]);

  useEffect(() => {
    if (state.isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [state.isOpen]);

  const subtotal = state.total;
  const taxes = subtotal * 0.1;
  const shipping = subtotal * 280 > 14000 ? 0 : 999;
  const total = subtotal + taxes;

  const handleCheckout = () => {
    toggleCart(); 
    navigate('/checkout'); 
  };
  
  // --- NEW HANDLER FOR THE "CONTINUE SHOPPING" BUTTON ---
  const handleContinueShopping = () => {
    toggleCart();
    navigate('/products');
  };

  return (
    <AnimatePresence>
      {state.isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50"
            aria-hidden="true"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 40, stiffness: 400 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-slate-900 border-l border-slate-700 shadow-2xl z-50 flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
          >
            <div className="flex items-center justify-between p-4 border-b border-slate-700">
              <h2 id="cart-title" className="text-xl font-poppins font-bold text-white flex items-center">
                <ShoppingBag className="w-5 h-5 mr-2 text-primary-accent" />
                Shopping Cart ({state.itemCount})
              </h2>
              <button
                onClick={toggleCart}
                className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5 text-slate-300" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {state.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <ShoppingBag className="w-16 h-16 text-slate-600 mb-4" />
                  <h3 className="text-lg font-poppins font-semibold text-white mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-slate-400 font-roboto mb-6">
                    Add items to get started!
                  </p>
                  {/* --- UPDATED ONCLICK HANDLER --- */}
                  <Button onClick={handleContinueShopping} variant="outline">
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <>
                  <div className="p-4 space-y-4">
                    <AnimatePresence>
                      {state.items.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -50, transition: { duration: 0.2 } }}
                          className="flex gap-4 bg-slate-800/70 rounded-lg p-3"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          
                          <div className="flex-1 min-w-0">
                            <h4 className="font-poppins font-medium text-white text-sm truncate">
                              {item.name}
                            </h4>
                            <div className="text-primary-accent font-roboto font-semibold">
                              {formatCurrency(item.price)}
                            </div>
                            
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="w-7 h-7 rounded flex items-center justify-center border border-slate-600 hover:border-primary-accent hover:text-primary-accent transition-colors disabled:opacity-50"
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="w-8 text-center text-sm font-roboto text-white">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="w-7 h-7 rounded flex items-center justify-center border border-slate-600 hover:border-primary-accent hover:text-primary-accent transition-colors"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                              
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="p-1 text-slate-400 hover:text-red-400 transition-colors"
                                aria-label={`Remove ${item.name}`}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  <div className="px-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearCart}
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    >
                      Clear Cart
                    </Button>
                  </div>
                </>
              )}
            </div>

            {state.items.length > 0 && (
              <div className="border-t border-slate-700 p-4 space-y-4">
                <div className="space-y-2 text-sm font-roboto">
                  <div className="flex justify-between text-slate-300">
                    <span>Subtotal:</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Taxes (10%):</span>
                    <span>{formatCurrency(taxes)}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Shipping:</span>
                    <span>{shipping === 0 ? 'FREE' : formatCurrency(shipping / 280)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-white border-t border-slate-600 pt-2">
                    <span>Total:</span>
                    <span>{formatCurrency(total + (shipping / 280))}</span>
                  </div>
                </div>

                <Button
                  onClick={handleCheckout}
                  size="lg"
                  className="w-full"
                >
                  Proceed to Checkout
                </Button>

                <p className="text-xs text-slate-400 text-center font-roboto">
                  Free shipping on orders over {formatCurrency(50)}
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};