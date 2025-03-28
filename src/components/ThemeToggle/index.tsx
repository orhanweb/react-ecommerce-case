// src/components/ThemeToggle/index.tsx
import React, { useState } from 'react';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import ScaleAnimated from '../ScaleAnimated';

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'; // Determine the new theme
    document.documentElement.classList.replace(theme, newTheme);
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };

  return (
    <ScaleAnimated>
      <button
        className="p-3 bg-sky-400 text-white rounded-full cursor-pointer shadow-md hover:bg-sky-500 transition-colors"
        onClick={toggleTheme}
        aria-label="Toggle Theme"
      >
        {React.createElement(theme === 'dark' ? MdDarkMode : MdLightMode, { size: 20 })}
      </button>
    </ScaleAnimated>
  );
};

export default ThemeToggle;
