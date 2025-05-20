import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <motion.button
      onClick={toggleTheme}
      className="relative inline-flex items-center justify-center w-12 h-6 p-1 rounded-full bg-gray-200 dark:bg-dark-400 focus:outline-none"
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <div className="absolute inset-0 flex items-center justify-between px-1.5">
        <Sun size={14} className="text-accent-500" />
        <Moon size={14} className="text-primary-400" />
      </div>
      
      <motion.div 
        className="w-5 h-5 rounded-full bg-white dark:bg-primary-500 shadow-md"
        animate={{ 
          x: theme === 'dark' ? 24 : 0,
          backgroundColor: theme === 'dark' ? '#6366F1' : '#ffffff'
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
    </motion.button>
  );
};

export default ThemeToggle;