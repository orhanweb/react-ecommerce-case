import { createContext, useReducer, ReactNode, useContext } from 'react';
import { Product } from '../types';

interface CartContextType {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}

type CartState = Product[];
type CartAction = { type: 'ADD_TO_CART'; payload: Product } | { type: 'REMOVE_FROM_CART'; payload: number } | { type: 'CLEAR_CART' };

const CART_STORAGE_KEY = 'shopping-cart';

// Get initial cart state from localStorage
const getInitialState = (): CartState => {
  if (typeof window !== 'undefined') {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    return savedCart ? JSON.parse(savedCart) : [];
  }
  return [];
};

// Reducer function
function cartReducer(state: CartState, action: CartAction): CartState {
  let newState: CartState;
  switch (action.type) {
    case 'ADD_TO_CART':
      if (state.some(item => item.id === action.payload.id)) return state;
      newState = [...state, action.payload];
      break;

    case 'REMOVE_FROM_CART':
      newState = state.filter(item => item.id !== action.payload);
      break;

    case 'CLEAR_CART':
      newState = [];
      break;

    default:
      return state;
  }

  // Update localStorage on every change
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newState));
  return newState;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, getInitialState());

  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>;
}

// Custom Hook
export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}
