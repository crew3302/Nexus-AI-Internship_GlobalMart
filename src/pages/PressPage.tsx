import React from 'react';
import { motion } from 'framer-motion';

export const PressPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl lg:text-5xl font-poppins font-bold text-white mb-4">
          Press & Media
        </h1>
        <p className="text-lg text-slate-300 font-roboto max-w-2xl mx-auto">
          For all media inquiries and assets.
        </p>
      </div>
      <div className="prose prose-invert prose-lg mx-auto text-slate-300 font-roboto space-y-6 bg-slate-800/50 p-8 rounded-lg border border-slate-700">
        <h2>Media Inquiries</h2>
        <p>
          For all press and media-related questions, please contact our public relations team. We are happy to provide information about GlobalMart, our mission, and our impact on the e-commerce landscape in Pakistan.
        </p>
        <p>
            <strong>Contact:</strong><br />
            Email: <a href="mailto:press@globalmart.com" className="text-primary-accent hover:underline">press@globalmart.com</a><br />
            Phone: <a href="tel:+923001234567" className="text-primary-accent hover:underline">+92 300 1234567</a>
        </p>
        <h2>Brand Assets</h2>
        <p>
            Looking for our logo or other brand assets? Please reach out to our press team, and we will provide you with our official media kit.
        </p>
      </div>
    </motion.div>
  );
};