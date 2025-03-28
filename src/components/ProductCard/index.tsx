// src/components/ProductCard/index.tsx
import React from 'react';
import ScaleAnimated from '../ScaleAnimated';
import { ProductCardProps } from './index.d';

const ProductCard: React.FC<ProductCardProps> = ({ image, title, price, onAddToCart }) => {
  return (
    <div className="w-full flex flex-col space-y-4 justify-between p-4 rounded-lg shadow-xl bg-sky-100 dark:bg-slate-800">
      <div className="space-y-2">
        <img className="w-full h-48 object-contain rounded-lg bg-white" src={image} alt={title} />
        <h3 className="text-xl font-semibold line-clamp-2">{title}</h3>
      </div>

      <div className="space-y-4">
        <p className="text-lg font-bold ">${price}</p>
        <ScaleAnimated className="w-full">
          <button onClick={onAddToCart} className="w-full p-2 cursor-pointer bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-all">
            Sepete Ekle
          </button>
        </ScaleAnimated>
      </div>
    </div>
  );
};

export default ProductCard;
