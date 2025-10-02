import React from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const OrderConfirmationPage: React.FC = () => {
  const { orderId } = useParams();

  // --- GET AND FORMAT THE CURRENT DATE AND TIME ---
  const orderDate = new Date().toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center"
    >
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
        >
          <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-6" />
        </motion.div>
        <h1 className="text-3xl lg:text-4xl font-poppins font-bold text-primary-text mb-4">
          Thank You For Your Order!
        </h1>
        <p className="text-lg text-slate-300 font-roboto mb-2">
          Your order has been placed successfully.
        </p>
        {/* --- DISPLAY THE ORDER DATE AND TIME --- */}
        <p className="text-sm text-slate-400 font-roboto mb-6">
          Placed on: {orderDate}
        </p>
        <p className="text-slate-400 font-roboto mb-8">
          Your Order ID is: <span className="font-bold text-primary-accent">{orderId}</span>
        </p>
        <Link to="/products">
          <Button size="lg">Continue Shopping</Button>
        </Link>
      </div>
    </motion.div>
  );
};