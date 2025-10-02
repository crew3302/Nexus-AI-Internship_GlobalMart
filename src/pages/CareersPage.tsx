import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';

export const CareersPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl lg:text-5xl font-poppins font-bold text-white mb-4">
          Careers at GlobalMart
        </h1>
        <p className="text-lg text-slate-300 font-roboto max-w-2xl mx-auto">
          Join our team and help us build the future of e-commerce.
        </p>
      </div>
      <div className="prose prose-invert prose-lg mx-auto text-slate-300 font-roboto space-y-6 text-center bg-slate-800/50 p-8 rounded-lg border border-slate-700">
        <h2>We're Growing!</h2>
        <p>
          GlobalMart is always looking for passionate, talented individuals to join our dynamic team. We believe in fostering a collaborative and innovative environment where everyone can thrive.
        </p>
        <p>
          While we don't have any open positions right now, we are always accepting resumes. If you're interested in future opportunities, please send your CV and a cover letter to our careers department.
        </p>
        <div className="mt-8">
            <a href="mailto:careers@globalmart.com">
                <Button size="lg">Email Us Your Resume</Button>
            </a>
        </div>
      </div>
    </motion.div>
  );
};