import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { CreditCard, Truck } from 'lucide-react';

interface PaymentMethodStepProps {
  formData: any;
  setFormData: (data: any) => void;
  onNextStep: () => void;
  onPrevStep: () => void;
}

export const PaymentMethodStep: React.FC<PaymentMethodStepProps> = ({ formData, setFormData, onNextStep, onPrevStep }) => {
  const handleSelectMethod = (method: 'Online' | 'COD') => {
    setFormData({ ...formData, paymentMethod: method });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNextStep();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
    >
      <h2 className="text-2xl font-poppins font-bold text-white mb-6">Payment Method</h2>
      <p className="text-slate-300 font-roboto mb-8">Please select your preferred payment method.</p>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4 mb-8">
          {/* Online Payment Option */}
          <div
            onClick={() => handleSelectMethod('Online')}
            className={`cursor-pointer rounded-lg border-2 p-4 transition-all duration-200 flex items-center gap-4 ${
              formData.paymentMethod === 'Online' ? 'border-primary-accent bg-primary-accent/10 shadow-lg' : 'border-slate-700 bg-slate-800/50 hover:border-slate-500'
            }`}
          >
            <CreditCard className={`w-6 h-6 ${formData.paymentMethod === 'Online' ? 'text-primary-accent' : 'text-slate-400'}`} />
            <div>
              <h3 className="font-poppins font-semibold text-white">Credit/Debit Card</h3>
              <p className="text-sm text-slate-400">Pay securely with your card.</p>
            </div>
          </div>

          {/* COD Option */}
          <div
            onClick={() => handleSelectMethod('COD')}
            className={`cursor-pointer rounded-lg border-2 p-4 transition-all duration-200 flex items-center gap-4 ${
              formData.paymentMethod === 'COD' ? 'border-primary-accent bg-primary-accent/10 shadow-lg' : 'border-slate-700 bg-slate-800/50 hover:border-slate-500'
            }`}
          >
            <Truck className={`w-6 h-6 ${formData.paymentMethod === 'COD' ? 'text-primary-accent' : 'text-slate-400'}`} />
            <div>
              <h3 className="font-poppins font-semibold text-white">Cash on Delivery (COD)</h3>
              <p className="text-sm text-slate-400">Pay in cash when your order is delivered.</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-between items-center">
          <Button type="button" variant="outline" onClick={onPrevStep}>Back to Shipping</Button>
          <Button type="submit" size="lg">
            {formData.paymentMethod === 'COD' ? 'Confirm Order' : 'Continue to Payment Details'}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};