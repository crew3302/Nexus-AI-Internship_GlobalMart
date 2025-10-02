import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { CartState, CartAction, Product, CartItem } from '../types';
import toast from 'react-hot-toast';

const initialState: CartState = {
  items: [],
  wishlist: [],
  isOpen: false,
  total: 0,
  itemCount: 0
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      // --- UPDATED LOGIC TO HANDLE SPECIFIC QUANTITY ---
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      let newItems: CartItem[];
      
      if (existingItem) {
        newItems = state.items.map(item =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      } else {
        newItems = [...state.items, newItem];
      }
      
      const total = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);
      
      return { ...state, items: newItems, total, itemCount };
    }
    
    case 'REMOVE_FROM_CART': {
      const newItems = state.items.filter(item => item.id !== action.payload);
      const total = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);
      
      return { ...state, items: newItems, total, itemCount };
    }
    
    case 'UPDATE_QUANTITY': {
      const newItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.max(0, action.payload.quantity) }
          : item
      ).filter(item => item.quantity > 0);
      
      const total = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);
      
      return { ...state, items: newItems, total, itemCount };
    }
    
    case 'CLEAR_CART':
      return { ...state, items: [], total: 0, itemCount: 0 };
    
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen };
      
    case 'TOGGLE_WISHLIST': {
      const existing = state.wishlist.find(item => item.id === action.payload.id);
      if (existing) {
        return { ...state, wishlist: state.wishlist.filter(item => item.id !== action.payload.id) };
      } else {
        return { ...state, wishlist: [...state.wishlist, action.payload] };
      }
    }
    
    case 'LOAD_STATE': {
      const loadedItems = action.payload.items || [];
      const total = loadedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const itemCount = loadedItems.reduce((sum, item) => sum + item.quantity, 0);
      return { ...state, ...action.payload, total, itemCount };
    }
    
    default:
      return state;
  }
}

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  // --- UPDATED FUNCTION SIGNATURE ---
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  toggleWishlist: (product: Product) => void;
} | null>(null);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const savedState = localStorage.getItem('globalmart-state');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        dispatch({ type: 'LOAD_STATE', payload: parsedState });
      } catch (error) {
        console.error('Failed to load state from localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    const stateToSave = {
      items: state.items,
      wishlist: state.wishlist,
    };
    localStorage.setItem('globalmart-state', JSON.stringify(stateToSave));
  }, [state.items, state.wishlist]);

  // --- UPDATED FUNCTION TO ACCEPT QUANTITY ---
  const addToCart = (product: Product, quantity: number = 1) => {
    const itemToAdd: CartItem = { ...product, quantity };
    dispatch({ type: 'ADD_TO_CART', payload: itemToAdd });
    toast.success(`${product.name} added to cart!`);
  };

  const removeFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    toast.success('Item removed from cart');
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    toast.success('Cart cleared');
  };

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  const toggleWishlist = (product: Product) => {
    dispatch({ type: 'TOGGLE_WISHLIST', payload: product });
    const isInWishlist = state.wishlist.some(item => item.id === product.id);
    toast.success(isInWishlist ? `${product.name} removed from wishlist!` : `${product.name} added to wishlist!`);
  };

  return (
    <CartContext.Provider value={{
      state,
      dispatch,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      toggleCart,
      toggleWishlist,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};