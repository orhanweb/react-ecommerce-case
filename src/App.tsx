// src/App.tsx
import React, { useEffect, useState } from 'react';
import Navbar from './layout/navbar';
import { fetchProducts } from './service';
import { Category, Product } from './types';
import ProductCard from './components/ProductCard';
import ProductCardSkeleton from './components/ProductCardSkeleton';
import CategorySelector from './components/CategorySelector';
import { Skeleton } from './components/ui/skeleton';
import { useCart } from './context/CartContext';
import CartModal from './components/CartModal';

const App: React.FC = () => {
  // Data
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  // Page Controling
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Cart and dispatch function with useCart
  const { dispatch } = useCart();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productsData = await fetchProducts();
        setProducts(productsData);

        const calculatedCategories = getUniqueCategories(productsData);
        setCategories(calculatedCategories);
      } catch (error) {
        console.error('An error occurred while loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  // Unique Categories and All Categories option
  const getUniqueCategories = (products: Product[]): { displayName: string; originalName: string }[] => {
    const categories = new Set(products.map(product => product.category));

    const formattedCategories = [...categories].map(category => ({
      displayName: category
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '),
      originalName: category
    }));

    return [{ displayName: 'Tüm Kategoriler', originalName: 'all' }, ...formattedCategories];
  };

  // If no category is selected or All categories are selected show all products
  const filteredProducts = selectedCategory === 'all' || selectedCategory === '' ? products : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-dvh bg-white dark:bg-slate-900 text-black dark:text-white flex justify-center">
      <div className="w-full max-w-[1000px]">
        <Navbar onCartClick={() => setIsModalOpen(true)} />
        <main className="p-4 mt-16 space-y-4">
          <div>
            {loading ? (
              <Skeleton className="h-8 w-36" />
            ) : (
              <CategorySelector categories={categories} selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-items-center">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => <ProductCardSkeleton key={i} />)
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  image={product.image}
                  title={product.title}
                  price={product.price}
                  onAddToCart={() => handleAddToCart(product)}
                />
              ))
            ) : (
              // Show message if product not found
              <div className="col-span-full text-center font-semibold text-2xl text-gray-500 dark:text-gray-400 mt-8">
                Üzgünüz, istediğiniz ürünü bulamadık.
              </div>
            )}
          </div>
        </main>
      </div>
      {isModalOpen && <CartModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default App;
