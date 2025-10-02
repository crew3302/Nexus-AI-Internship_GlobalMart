import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { CreditCard } from 'lucide-react';

interface PaymentStepProps {
  formData: any;
  setFormData: (data: any) => void;
  onPrevStep: () => void;
  onSubmitOrder: () => void;
}

export const PaymentStep: React.FC<PaymentStepProps> = ({ formData, setFormData, onPrevStep, onSubmitOrder }) => {
  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: any = {};
    if (!formData.cardName) newErrors.cardName = 'Name on card is required';
    if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required';
    else if (!/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/.test(formData.cardNumber)) newErrors.cardNumber = 'Card number must be 16 digits';
    if (!formData.cardExpiry) newErrors.cardExpiry = 'Expiry date is required';
    else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.cardExpiry)) newErrors.cardExpiry = 'Expiry date must be in MM/YY format';
    if (!formData.cardCVC) newErrors.cardCVC = 'CVC is required';
    else if (!/^\d{3,4}$/.test(formData.cardCVC)) newErrors.cardCVC = 'CVC must be 3 or 4 digits';
    if (!formData.agreedToTerms) newErrors.terms = 'You must agree to the terms and conditions.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      onSubmitOrder();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
      return;
    }

    let formattedValue = value;

    switch (name) {
      case 'cardNumber':
        const digitsOnly = value.replace(/\D/g, '').slice(0, 16);
        formattedValue = digitsOnly.match(/.{1,4}/g)?.join(' ') || '';
        break;
      
      case 'cardExpiry':
        const expiryDigits = value.replace(/\D/g, '').slice(0, 4);
        if (expiryDigits.length > 2) {
          formattedValue = `${expiryDigits.slice(0, 2)}/${expiryDigits.slice(2)}`;
        } else {
          formattedValue = expiryDigits;
        }
        break;

      case 'cardCVC':
        formattedValue = value.replace(/\D/g, '').slice(0, 4);
        break;

      default:
        formattedValue = value;
        break;
    }

    setFormData({ ...formData, [name]: formattedValue });
  };


  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
    >
      <h2 className="text-2xl font-poppins font-bold text-white mb-6">Payment Details</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="flex items-center space-x-3 mb-6">
          <input
            type="checkbox"
            id="sameAsShipping"
            name="sameAsShipping"
            checked={formData.sameAsShipping}
            onChange={handleChange}
            className="h-4 w-4 rounded border-slate-500 bg-slate-800 text-primary-accent focus:ring-primary-accent"
          />
          <label htmlFor="sameAsShipping" className="text-sm font-medium text-slate-300">
            My billing address is the same as my shipping address.
          </label>
        </div>

        <div className="space-y-6">
          <div>
            <label htmlFor="cardName" className="block text-sm font-medium text-slate-300 mb-2">Name on Card</label>
            <input type="text" id="cardName" name="cardName" value={formData.cardName} onChange={handleChange} className={`w-full input ${errors.cardName ? 'border-red-500' : 'border-slate-600'}`} autoComplete="cc-name" />
            {errors.cardName && <p className="text-red-400 text-sm mt-1">{errors.cardName}</p>}
          </div>
          <div>
            <label htmlFor="cardNumber" className="block text-sm font-medium text-slate-300 mb-2">Card Number</label>
            <div className="relative">
              <input 
                type="text" 
                id="cardNumber" 
                name="cardNumber" 
                value={formData.cardNumber} 
                onChange={handleChange} 
                className={`w-full input pl-10 ${errors.cardNumber ? 'border-red-500' : 'border-slate-600'}`} 
                placeholder="0000 0000 0000 0000"
                maxLength={19}
                autoComplete="cc-number"
                inputMode="numeric"
              />
            </div>
            {errors.cardNumber && <p className="text-red-400 text-sm mt-1">{errors.cardNumber}</p>}
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label htmlFor="cardExpiry" className="block text-sm font-medium text-slate-300 mb-2">Expiry Date</label>
              <input 
                type="text" 
                id="cardExpiry" 
                name="cardExpiry" 
                value={formData.cardExpiry} 
                onChange={handleChange} 
                className={`w-full input ${errors.cardExpiry ? 'border-red-500' : 'border-slate-600'}`} 
                placeholder="MM/YY"
                maxLength={5}
                autoComplete="cc-exp"
                inputMode="numeric"
              />
              {errors.cardExpiry && <p className="text-red-400 text-sm mt-1">{errors.cardExpiry}</p>}
            </div>
            <div>
              <label htmlFor="cardCVC" className="block text-sm font-medium text-slate-300 mb-2">CVC</label>
              <input 
                type="text" 
                id="cardCVC" 
                name="cardCVC" 
                value={formData.cardCVC} 
                onChange={handleChange} 
                className={`w-full input ${errors.cardCVC ? 'border-red-500' : 'border-slate-600'}`} 
                placeholder="123"
                maxLength={4}
                autoComplete="cc-csc"
                inputMode="numeric"
              />
              {errors.cardCVC && <p className="text-red-400 text-sm mt-1">{errors.cardCVC}</p>}
            </div>
          </div>
        </div>

        <div className="mt-8">
            <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="agreedToTerms"
                  name="agreedToTerms"
                  checked={formData.agreedToTerms}
                  onChange={handleChange}
                  className="h-4 w-4 mt-1 rounded border-slate-500 bg-slate-800 text-primary-accent focus:ring-primary-accent"
                />
                <div>
                  <label htmlFor="agreedToTerms" className="text-sm font-medium text-slate-300">
                      I have read and agree to the website's <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary-accent hover:underline font-semibold">terms and conditions</a>.
                  </label>
                  {errors.terms && <p className="text-red-400 text-sm mt-1">{errors.terms}</p>}
                </div>
            </div>
        </div>
        
        <div className="mt-8 flex justify-between items-center">
          {/* --- UPDATED BUTTON TEXT --- */}
          <Button type="button" variant="outline" onClick={onPrevStep}>Back to Payment Method</Button>
          <Button type="submit" size="lg" loading={isSubmitting} disabled={isSubmitting || !formData.agreedToTerms}>
            {isSubmitting ? 'Processing...' : 'Confirm Order'}
          </Button>
        </div>
      </form>
      <style jsx>{`
        .input {
          background-color: #0D1120; /* Match new primary-bg */
          border-radius: 0.5rem;
          padding: 0.75rem 1rem;
          color: #E0E0E0; /* Match new primary-text */
          border-width: 1px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .input:focus {
          outline: none;
          border-color: #818CF8; /* New accent color */
          box-shadow: 0 0 0 3px rgba(129, 140, 248, 0.25); /* Glow effect */
        }
        .input.border-red-500:focus {
          border-color: #ef4444; /* Keep red for errors */
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.25);
        }
      `}</style>
    </motion.div>
  );
};