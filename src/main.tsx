// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './main.css';
import App from './App.tsx';
import { CartProvider } from './context/CartContext.tsx';

// Theme setting at application start
const currentTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.classList.add(currentTheme);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </StrictMode>
);
