import React from 'react';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/currency';

export const OrderSummary: React.FC = () => {
  const { state } = useCart();
  
  const subtotal = state.total;
  const taxes = subtotal * 0.1;
  const shipping = subtotal * 280 > 14000 ? 0 : 999;
  const total = subtotal + taxes + (shipping / 280);

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 sticky top-24">
      <h2 className="text-xl font-poppins font-bold text-primary-text mb-6 border-b border-slate-700 pb-4">
        Order Summary
      </h2>
      {/* --- ADDED PADDING TO PREVENT CLIPPING --- */}
      <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-4 pt-2">
        {state.items.map(item => (
          <div key={item.id} className="flex gap-4">
            <div className="relative">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-16 h-16 object-contain rounded-lg bg-slate-700/50" 
              />
              {/* --- CORRECTED BADGE POSITIONING --- */}
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary-accent text-primary-bg rounded-full text-xs flex items-center justify-center font-bold">
                {item.quantity}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-primary-text truncate">{item.name}</p>
              <p className="text-sm text-slate-400">Qty: {item.quantity}</p>
            </div>
            <p className="font-semibold text-primary-text">{formatCurrency(item.price * item.quantity)}</p>
          </div>
        ))}
      </div>
      <div className="space-y-2 text-sm font-roboto border-t border-slate-700 pt-4">
        <div className="flex justify-between text-slate-300">
          <span>Subtotal:</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between text-slate-300">
          <span>Taxes:</span>
          <span>{formatCurrency(taxes)}</span>
        </div>
        <div className="flex justify-between text-slate-300">
          <span>Shipping:</span>
          <span>{shipping === 0 ? 'FREE' : formatCurrency(shipping / 280)}</span>
        </div>
        <div className="flex justify-between text-lg font-bold text-primary-text border-t border-slate-600 pt-2 mt-2">
          <span>Total:</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>
    </div>
  );
};