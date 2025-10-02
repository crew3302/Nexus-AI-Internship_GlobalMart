import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { Loader } from '../ui/Loader';

interface ShippingStepProps {
  formData: any;
  setFormData: (data: any) => void;
  onNextStep: () => void;
}

export const ShippingStep: React.FC<ShippingStepProps> = ({ formData, setFormData, onNextStep }) => {
  const [errors, setErrors] = useState<any>({});
  // --- NEW STATE FOR COUNTRIES AND LOADING ---
  const [countries, setCountries] = useState<string[]>([]);
  const [isLoadingCountries, setIsLoadingCountries] = useState(true);

  // --- FETCH COUNTRIES ON COMPONENT MOUNT ---
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        const countryNames = data.map((country: any) => country.name.common).sort();
        setCountries(countryNames);
      } catch (error) {
        console.error("Failed to fetch countries:", error);
        // Fallback in case of API failure
        setCountries(['Pakistan', 'United States', 'United Kingdom', 'Canada']);
      } finally {
        setIsLoadingCountries(false);
      }
    };

    fetchCountries();
  }, []);

  const validate = () => {
    const newErrors: any = {};
    if (!formData.name) newErrors.name = 'Full name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.postalCode) newErrors.postalCode = 'Postal code is required';
    if (!formData.country) newErrors.country = 'Country is required'; // --- VALIDATION FOR COUNTRY ---
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onNextStep();
    }
  };

  // --- UPDATED HANDLECHANGE WITH INPUT CHECKS ---
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let { name, value } = e.target;

    // --- INPUT VALIDATION LOGIC ---
    switch(name) {
      case 'postalCode':
        value = value.replace(/\D/g, ''); // Allow only digits
        break;
      case 'name':
      case 'city':
        value = value.replace(/[0-9]/g, ''); // Disallow digits
        break;
    }

    setFormData({ ...formData, [name]: value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
    >
      <h2 className="text-2xl font-poppins font-bold text-white mb-6">Shipping Information</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className={`w-full input ${errors.name ? 'border-red-500' : 'border-slate-600'}`} />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={`w-full input ${errors.email ? 'border-red-500' : 'border-slate-600'}`} />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>
        </div>
        <div className="mt-6">
          <label htmlFor="address" className="block text-sm font-medium text-slate-300 mb-2">Address</label>
          <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} className={`w-full input ${errors.address ? 'border-red-500' : 'border-slate-600'}`} />
          {errors.address && <p className="text-red-400 text-sm mt-1">{errors.address}</p>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-slate-300 mb-2">City</label>
            <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} className={`w-full input ${errors.city ? 'border-red-500' : 'border-slate-600'}`} />
            {errors.city && <p className="text-red-400 text-sm mt-1">{errors.city}</p>}
          </div>
          <div>
            <label htmlFor="postalCode" className="block text-sm font-medium text-slate-300 mb-2">Postal Code</label>
            <input 
              type="text" 
              id="postalCode" 
              name="postalCode" 
              value={formData.postalCode} 
              onChange={handleChange} 
              className={`w-full input ${errors.postalCode ? 'border-red-500' : 'border-slate-600'}`}
              inputMode="numeric"
            />
            {errors.postalCode && <p className="text-red-400 text-sm mt-1">{errors.postalCode}</p>}
          </div>
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-slate-300 mb-2">Country</label>
            <div className="relative">
              {isLoadingCountries && <Loader size="sm" className="absolute right-3 top-1/2 -translate-y-1/2" />}
              <select 
                id="country" 
                name="country" 
                value={formData.country} 
                onChange={handleChange} 
                disabled={isLoadingCountries}
                className={`w-full input appearance-none ${errors.country ? 'border-red-500' : 'border-slate-600'} ${isLoadingCountries ? 'cursor-wait' : ''}`}
              >
                <option value="">Select a country</option>
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>
            {errors.country && <p className="text-red-400 text-sm mt-1">{errors.country}</p>}
          </div>
        </div>
        <div className="mt-8 text-right">
          <Button type="submit" size="lg">Continue to Payment</Button>
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