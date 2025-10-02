import React from 'react';
import { motion } from 'framer-motion';

export const ReturnsPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl lg:text-5xl font-poppins font-bold text-white mb-4">
          Returns & Exchanges
        </h1>
        <p className="text-lg text-slate-300 font-roboto max-w-2xl mx-auto">
          Our policy on returns, refunds, and exchanges.
        </p>
      </div>
      <div className="prose prose-invert prose-lg mx-auto text-slate-300 font-roboto space-y-6 bg-slate-800/50 p-8 rounded-lg border border-slate-700">
        <h2>30-Day Return Policy</h2>
        <p>
          We have a 30-day return policy, which means you have 30 days after receiving your item to request a return. To be eligible for a return, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging.
        </p>
        <h2>How to Start a Return</h2>
        <p>
          To start a return, you can contact us at <a href="mailto:support@globalmart.com" className="text-primary-accent hover:underline">support@globalmart.com</a>. If your return is accepted, we’ll send you a return shipping label, as well as instructions on how and where to send your package.
        </p>
        <h2>Refunds</h2>
        <p>
          We will notify you once we’ve received and inspected your return, and let you know if the refund was approved or not. If approved, you’ll be automatically refunded on your original payment method. Please remember it can take some time for your bank or credit card company to process and post the refund too.
        </p>
      </div>
    </motion.div>
  );
};