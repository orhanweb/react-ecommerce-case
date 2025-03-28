// src/components/CartModal/index.tsx
import React from 'react';
import { useCart } from '@/context/CartContext';
import { MdClose } from 'react-icons/md';
import { FaTrash } from 'react-icons/fa';

const CartModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { state, dispatch } = useCart();

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleClearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    onClose();
  };

  const handleCheckout = () => {
    alert('Ödemeniz başarıyla yapıldı! Sepetiniz boşaltılıyor...');
    handleClearCart();
  };

  return (
    <div className="fixed inset-0 z-[100] p-2 backdrop-blur-xs bg-black/50 flex justify-center items-center" onClick={handleBackdropClick}>
      <div id="dialog-card" className={`p-4 rounded-xl shadow-2xl w-full max-w-[800px] bg-white dark:bg-slate-800`}>
        {/* Header */}
        <div className="flex justify-between items-center px-2 pb-2 mb-2 border-b-2 dark:border-slate-700">
          <h2 className="text-xl font-semibold">Alışveriş Sepeti</h2>
          <button onClick={onClose} className="cursor-pointer hover:bg-red-500/50 transition-all rounded-full p-2">
            <MdClose size={24} />
          </button>
        </div>

        {/* Product List */}
        <div className="p-2 max-h-[60vh] overflow-y-auto">
          {state.length === 0 ? (
            <p className="text-center text-gray-400">Sepetiniz boş.</p>
          ) : (
            <ul className="space-y-4">
              {state.map(product => (
                <li key={product.id} className="flex items-center gap-4 pb-2 border-b dark:border-slate-700 last:border-b-0">
                  <img src={product.image} alt={product.title} className="w-16 h-16 object-contain rounded-lg bg-white" />
                  <div className="flex-1">
                    <h3 className="font-semibold line-clamp-2">{product.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400">${product.price}</p>
                  </div>
                  <button
                    onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: product.id })}
                    className="p-2 cursor-pointer hover:bg-red-100 rounded-full transition-colors dark:hover:bg-red-500/30"
                  >
                    <FaTrash className="text-red-500 dark:text-red-400" size={20} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Total and Payment */}
        <div className="mt-2 pt-2 border-t-2 dark:border-slate-700">
          <span className="flex justify-end font-semibold text-lg">
            Toplam: ${state.reduce((total, product) => total + product.price, 0).toFixed(2)}
          </span>
          {/* Buttons - Show only if product is available */}
          {state.length > 0 && (
            <div className="flex justify-end gap-3 mt-4">
              <button onClick={handleClearCart} className="py-2 px-4 cursor-pointer bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all">
                Sepeti Boşalt
              </button>
              <button onClick={handleCheckout} className="py-2 px-4 cursor-pointer bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-all">
                Ödeme Yap
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartModal;
