import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { CryptoData } from '../../contexts/CryptoContext';

interface CryptoCardProps {
  crypto: CryptoData;
  index: number;
}

const CryptoCard: React.FC<CryptoCardProps> = ({ crypto, index }) => {
  const isPositiveChange = crypto.price_change_percentage_24h >= 0;
  
  return (
    <motion.div 
      className="glass-card p-4 h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1.0]
      }}
      whileHover={{ scale: 1.02, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
    >
      <div className="flex items-center mb-3">
        <img 
          src={crypto.image} 
          alt={crypto.name}
          className="w-8 h-8 mr-3 rounded-full" 
        />
        <div className="flex-1">
          <h3 className="font-semibold">{crypto.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 uppercase">{crypto.symbol}</p>
        </div>
      </div>
      
      <div className="flex justify-between items-end mt-2">
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Price</p>
          <p className="text-lg font-semibold">
            ${crypto.current_price.toLocaleString()}
          </p>
        </div>
        <div>
          <div className={`flex items-center text-sm ${
            isPositiveChange ? 'text-success-500' : 'text-error-500'
          }`}>
            {isPositiveChange ? (
              <TrendingUp size={16} className="mr-1" />
            ) : (
              <TrendingDown size={16} className="mr-1" />
            )}
            <span>{Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CryptoCard;