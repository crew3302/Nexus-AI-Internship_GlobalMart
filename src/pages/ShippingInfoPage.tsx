import React from 'react';
import { motion } from 'framer-motion';

export const ShippingInfoPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl lg:text-5xl font-poppins font-bold text-white mb-4">
          Shipping Information
        </h1>
        <p className="text-lg text-slate-300 font-roboto max-w-2xl mx-auto">
          Everything you need to know about our shipping process and policies.
        </p>
      </div>
      <div className="prose prose-invert prose-lg mx-auto text-slate-300 font-roboto space-y-6 bg-slate-800/50 p-8 rounded-lg border border-slate-700">
        <h2>Processing Time</h2>
        <p>
          Orders are processed within 1-2 business days. Orders are not shipped or delivered on weekends or holidays. If we are experiencing a high volume of orders, shipments may be delayed by a few days. Please allow additional days in transit for delivery.
        </p>
        <h2>Shipping Rates & Delivery Estimates</h2>
        <p>
          Shipping charges for your order will be calculated and displayed at checkout. We offer standard shipping across Pakistan. Delivery typically takes 3-5 business days after processing.
        </p>
        <h2>Free Shipping</h2>
        <p>
          We offer free shipping for all orders over {new Intl.NumberFormat('en-PK', { style: 'currency', currency: 'PKR', minimumFractionDigits: 0 }).format(14000)}. This will be automatically applied at checkout if your order qualifies.
        </p>
        <h2>Shipment Confirmation & Order Tracking</h2>
        <p>
          You will receive a shipment confirmation email once your order has shipped, containing your tracking number(s). The tracking number will be active within 24 hours.
        </p>
      </div>
    </motion.div>
  );
};