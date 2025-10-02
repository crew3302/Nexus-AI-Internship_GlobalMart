import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShippingStep } from '../components/checkout/ShippingStep';
import { PaymentStep } from '../components/checkout/PaymentStep';
import { OrderSummary } from '../components/checkout/OrderSummary';
import { PaymentMethodStep } from '../components/checkout/PaymentMethodStep'; // --- IMPORT NEW COMPONENT ---
import toast from 'react-hot-toast';

export const CheckoutPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Pakistan',
    // --- NEW FIELD FOR PAYMENT METHOD ---
    paymentMethod: 'Online',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
    sameAsShipping: true,
    agreedToTerms: false,
  });

  const { state, clearCart } = useCart();
  const navigate = useNavigate();

  if (state.items.length === 0 && step !== 4) { // Update condition for final step
      setTimeout(() => navigate('/products'), 0);
      return null;
  }

  // --- UPDATED NAVIGATION LOGIC ---
  const handleNextStep = () => {
    if (step === 2 && formData.paymentMethod === 'COD') {
      handleSubmitOrder();
    } else {
      setStep(prev => prev + 1);
    }
  };
  const handlePrevStep = () => setStep(prev => prev - 1);

  const handleSubmitOrder = () => {
    toast.loading('Processing your order...');
    setTimeout(() => {
      toast.dismiss();
      toast.success('Order placed successfully!');
      
      const orderId = Math.random().toString(36).substr(2, 9).toUpperCase();
      
      clearCart();
      navigate(`/order-confirmation/${orderId}`);
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          {/* --- UPDATED STEPPER UI --- */}
          <div className="flex items-center border-b border-slate-700 pb-4 mb-8">
            <div className="flex items-center">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-colors ${step >= 1 ? 'bg-primary-accent text-white' : 'bg-slate-700 text-slate-300'}`}>1</span>
              <span className={`ml-3 font-poppins transition-colors ${step >= 1 ? 'text-white' : 'text-slate-400'}`}>Shipping</span>
            </div>
            <div className="flex-1 h-px bg-slate-700 mx-4"></div>
            <div className="flex items-center">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-colors ${step >= 2 ? 'bg-primary-accent text-white' : 'bg-slate-700 text-slate-300'}`}>2</span>
              <span className={`ml-3 font-poppins transition-colors ${step >= 2 ? 'text-white' : 'text-slate-400'}`}>Payment</span>
            </div>
             <div className="flex-1 h-px bg-slate-700 mx-4"></div>
            <div className="flex items-center">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-colors ${step >= 3 ? 'bg-primary-accent text-white' : 'bg-slate-700 text-slate-300'}`}>3</span>
              <span className={`ml-3 font-poppins transition-colors ${step >= 3 ? 'text-white' : 'text-slate-400'}`}>Details</span>
            </div>
          </div>

          {/* --- UPDATED CONDITIONAL RENDERING --- */}
          <AnimatePresence mode="wait">
            {step === 1 && (
              <ShippingStep
                formData={formData}
                setFormData={setFormData}
                onNextStep={handleNextStep}
              />
            )}
            {step === 2 && (
              <PaymentMethodStep
                formData={formData}
                setFormData={setFormData}
                onPrevStep={handlePrevStep}
                onNextStep={handleNextStep}
              />
            )}
            {step === 3 && (
              <PaymentStep
                formData={formData}
                setFormData={setFormData}
                onPrevStep={handlePrevStep}
                onSubmitOrder={handleSubmitOrder}
              />
            )}
          </AnimatePresence>
        </div>

        <aside className="lg:col-span-1">
          <OrderSummary />
        </aside>
      </div>
    </div>
  );
};