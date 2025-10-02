import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X, AlertCircle, Info } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  isVisible: boolean;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ 
  message, 
  type = 'info', 
  isVisible, 
  onClose 
}) => {
  const icons = {
    success: CheckCircle,
    error: X,
    warning: AlertCircle,
    info: Info
  };

  const colors = {
    success: 'border-green-400/50 bg-green-500/10 text-green-300',
    error: 'border-red-400/50 bg-red-500/10 text-red-300',
    warning: 'border-yellow-400/50 bg-yellow-500/10 text-yellow-300',
    info: 'border-primary-accent/50 bg-primary-accent/10 text-primary-accent'
  };

  const Icon = icons[type];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className={`fixed bottom-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border bg-slate-800/50 backdrop-blur-xl shadow-lg ${colors[type]}`}
        >
          <Icon className="w-5 h-5 flex-shrink-0" />
          <span className="font-roboto text-sm font-medium">{message}</span>
          <button
            onClick={onClose}
            className="ml-2 text-slate-400 hover:text-white transition-colors"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};