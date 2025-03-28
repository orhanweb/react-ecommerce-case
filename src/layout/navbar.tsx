// src/layout/navbar.tsx
import React from 'react';
import ThemeToggle from '../components/ThemeToggle';
import { useCart } from '@/context/CartContext';
import { MdShoppingCart } from 'react-icons/md';
import ScaleAnimated from '@/components/ScaleAnimated';
import { cn } from '@/lib/utils';

const Navbar: React.FC<{ onCartClick: () => void }> = ({ onCartClick }) => {
  const { state } = useCart();
  const isCartEmpty = state.length === 0;

  return (
    <nav className="fixed top-0 w-full max-w-[1000px] flex justify-between items-center px-4 py-2 bg-sky-200 dark:bg-sky-950 shadow-md">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Hyper-Store</h1>
      <div className="flex items-center space-x-4">
        <ThemeToggle />

        {/* Cart button */}
        <ScaleAnimated isEnabled={!isCartEmpty}>
          <button
            onClick={onCartClick}
            className={cn(
              'relative p-3 text-white rounded-full shadow-md transition-colors',
              isCartEmpty ? 'opacity-70 cursor-not-allowed bg-gray-400' : 'cursor-pointer bg-sky-400 hover:bg-sky-500'
            )}
            disabled={isCartEmpty}
          >
            <MdShoppingCart size={20} />
            {state.length > 0 && (
              <span className="absolute top-[-3px] right-[-3px] bg-red-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                {state.length}
              </span>
            )}
          </button>
        </ScaleAnimated>
      </div>
    </nav>
  );
};

export default Navbar;
