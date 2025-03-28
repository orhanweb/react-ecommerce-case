// src/components/ProductCard/index.d.ts
export interface ProductCardProps {
  image: string;
  title: string;
  price: number;
  onAddToCart: () => void;
}
