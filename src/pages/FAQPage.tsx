import React from 'react';
import { motion } from 'framer-motion';

const faqs = [
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, Mastercard, American Express), as well as bank transfers and cash on delivery (COD) for eligible orders."
  },
  {
    question: "How can I track my order?",
    answer: "Once your order has shipped, you will receive an email with a tracking number and a link to the courier's website where you can track your package."
  },
  {
    question: "Do you ship internationally?",
    answer: "Currently, we only ship within Pakistan. We are working on expanding our shipping options to more countries in the future."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy for most items. Please visit our Returns page for more detailed information on eligibility and the return process."
  }
];

export const FAQPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl lg:text-5xl font-poppins font-bold text-white mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-slate-300 font-roboto max-w-2xl mx-auto">
          Find answers to common questions about shopping with GlobalMart.
        </p>
      </div>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className="bg-slate-800/50 p-6 rounded-lg border border-slate-700"
          >
            <h3 className="font-poppins font-semibold text-primary-accent text-lg mb-2">{faq.question}</h3>
            <p className="font-roboto text-slate-300">{faq.answer}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};