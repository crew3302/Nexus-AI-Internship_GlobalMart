import { USD_TO_PKR_CONVERSION_RATE } from '../config';

export const formatCurrency = (priceInUSD: number) => {
  const priceInPKR = priceInUSD * USD_TO_PKR_CONVERSION_RATE;
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(priceInPKR);
};