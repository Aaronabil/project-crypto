import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative inline-flex items-center w-12 h-6 rounded-full bg-gray-300 dark:bg-gray-600 p-1 focus:outline-none"
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {/* Icon wrapper (fixed positions) */}
      <span className="absolute left-1 text-yellow-500">
        <Sun size={12} />
      </span>
      <span className="absolute right-1 text-indigo-400">
        <Moon size={12} />
      </span>

      {/* Toggle Circle */}
      <motion.span
        className="w-4 h-4 bg-white dark:bg-primary-500 rounded-full shadow-sm z-0"
        animate={{ x: theme === 'dark' ? 23 : 0 }}
        transition={{ type: 'spring', stiffness: 250, damping: 20 }}
      />
    </motion.button>
  );
};

export default ThemeToggle;
