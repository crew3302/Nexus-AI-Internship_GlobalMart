import { useState, useEffect } from 'react';
import axios from 'axios';
import { Product } from '../types';

interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useProducts = (): UseProductsReturn => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // --- UPDATED API ENDPOINT ---
      const response = await axios.get('https://api.escuelajs.co/api/v1/products');
      
      // --- UPDATED DATA TRANSFORMATION LOGIC ---
      const transformedProducts = response.data.map((item: any) => ({
        id: item.id.toString(),
        name: item.title || 'Unnamed Product',
        description: item.description || 'No description available',
        price: parseFloat(item.price) || Math.floor(Math.random() * 100) + 10,
        // The new API provides an array of images, we'll use the first valid one.
        image: (item.images && item.images.length > 0) ? item.images[0].replace(/[\[\]"]/g, '') : 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: item.category?.name || 'General',
        rating: (Math.random() * 2 + 3).toFixed(1), // API doesn't provide rating
        stock: Math.floor(Math.random() * 100) + 1, // API doesn't provide stock
        features: []
      }));
      
      setProducts(transformedProducts);
    } catch (err) {
      console.error('Failed to fetch products:', err);
      setError('Failed to load products. Please try again.');
      
      // --- UPDATED FALLBACK PRODUCTS TO MATCH NEW API STRUCTURE ---
      setProducts([
        {
          id: '1',
          name: 'Classic Red Pullover Hoodie',
          description: 'A comfortable and stylish red hoodie, perfect for any casual occasion.',
          price: 10,
          image: 'https://i.imgur.com/qNOjJje.jpeg',
          category: 'Clothes',
          rating: 4.5,
          stock: 25
        },
        {
          id: '2',
          name: 'Majestic Mountain Graphic T-Shirt',
          description: 'A stunning t-shirt with a majestic mountain graphic, embodying adventure.',
          price: 44,
          image: 'https://i.imgur.com/xYO62rV.jpeg',
          category: 'Clothes',
          rating: 4.7,
          stock: 30
        },
        {
          id: '3',
          name: 'Classic Black Hooded Sweatshirt',
          description: 'A versatile black hoodie that combines comfort and style, a wardrobe essential.',
          price: 79,
          image: 'https://i.imgur.com/cHddUCu.jpeg',
          category: 'Clothes',
          rating: 4.8,
          stock: 15
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const refetch = () => {
    fetchProducts();
  };

  return { products, loading, error, refetch };
};