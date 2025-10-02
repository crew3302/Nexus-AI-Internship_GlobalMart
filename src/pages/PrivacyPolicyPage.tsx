import React from 'react';
import { motion } from 'framer-motion';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl lg:text-5xl font-poppins font-bold text-white mb-4">
          Privacy Policy
        </h1>
        <p className="text-lg text-slate-300 font-roboto max-w-2xl mx-auto">
          Your privacy is important to us. Last updated: October 1, 2025.
        </p>
      </div>
      <div className="prose prose-invert prose-lg mx-auto text-slate-300 font-roboto space-y-6 bg-slate-800/50 p-8 rounded-lg border border-slate-700">
        <h2>1. Information We Collect</h2>
        <p>
          We collect information you provide directly to us, such as when you create an account, place an order, or contact customer service. This may include your name, email, shipping address, and payment information.
        </p>
        <h2>2. How We Use Your Information</h2>
        <p>
          We use the information we collect to process your transactions, communicate with you, screen our orders for potential risk or fraud, and, in line with the preferences you have shared with us, provide you with information or advertising relating to our products or services.
        </p>
        <h2>3. Sharing Your Information</h2>
        <p>
          We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.
        </p>
        <h2>4. Security</h2>
        <p>
          We implement a variety of security measures to maintain the safety of your personal information when you place an order or enter, submit, or access your personal information.
        </p>
      </div>
    </motion.div>
  );
};