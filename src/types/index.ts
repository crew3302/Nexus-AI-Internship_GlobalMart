export interface Product {
id: string;
name: string;
description?: string;
price: number;
image?: string;
category?: string;
rating?: number;
stock?: number;
features?: string[];
}
export interface CartItem extends Product {
quantity: number;
}
export interface CartState {
items: CartItem[];
wishlist: Product[];
isOpen: boolean;
total: number;
itemCount: number;
}
export type CartAction =
// --- UPDATED PAYLOAD TO SUPPORT QUANTITY ---
| { type: 'ADD_TO_CART'; payload: CartItem }
| { type: 'REMOVE_FROM_CART'; payload: string }
| { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
| { type: 'CLEAR_CART' }
| { type: 'TOGGLE_CART' }
| { type: 'TOGGLE_WISHLIST'; payload: Product }
| { type: 'LOAD_STATE'; payload: Partial<CartState> };