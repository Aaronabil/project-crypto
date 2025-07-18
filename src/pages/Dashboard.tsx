import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowUpDown, RefreshCw } from 'lucide-react';
import { useCryptoData } from '../contexts/CryptoContext';
import CryptoChart from '../components/ui/CryptoChart';

const Dashboard: React.FC = () => {
  const { cryptoData, loading, error, refreshData } = useCryptoData();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'ascending' | 'descending' } | null>(null);
  const [selectedCrypto, setSelectedCrypto] = useState<string | null>(null);
  
  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  // Handle sorting
  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    
    setSortConfig({ key, direction });
  };
  
  // Get sorted and filtered data
  const getSortedData = () => {
    let sortableData = [...cryptoData];
    
    // Filter by search term
    if (searchTerm) {
      sortableData = sortableData.filter(crypto => 
        crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Sort if sort config exists
    if (sortConfig) {
      sortableData.sort((a: any, b: any) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    
    return sortableData;
  };
  
  const sortedData = getSortedData();
  const selectedCryptoData = cryptoData.find(crypto => crypto.id === selectedCrypto) || cryptoData[0];
  
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  };
  
  const handleCryptoClick = (cryptoId: string) => {
    setSelectedCrypto(cryptoId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-0">Cryptocurrency Dashboard</h1>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative w-full sm:w-64">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search cryptocurrencies..."
                value={searchTerm}
                onChange={handleSearch}
                className="input-field pl-10"
              />
            </div>
            
            <motion.button
              onClick={() => refreshData()}
              className="button-secondary flex items-center z-10"
              whileTap={{ scale: 0.95 }}
            >
              <RefreshCw size={16} className="mr-2" />
              <span>Refresh</span>
            </motion.button>
          </div>
        </div>
        
        {/* Chart View */}
        <div className="glass-panel p-6 mb-8">
          {loading ? (
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 dark:bg-dark-400 rounded w-1/4 mb-4"></div>
              <div className="h-64 bg-gray-200 dark:bg-dark-400 rounded"></div>
            </div>
          ) : selectedCryptoData ? (
            <div>
              <div className="flex items-center mb-4">
                <img 
                  src={selectedCryptoData.image} 
                  alt={selectedCryptoData.name}
                  className="w-8 h-8 mr-3 rounded-full" 
                />
                <h2 className="text-xl font-semibold">{selectedCryptoData.name} ({selectedCryptoData.symbol.toUpperCase()})</h2>
                <p className={`ml-4 ${
                  selectedCryptoData.price_change_percentage_24h >= 0 
                    ? 'text-success-500' 
                    : 'text-error-500'
                }`}>
                  {selectedCryptoData.price_change_percentage_24h >= 0 ? '+' : ''}
                  {selectedCryptoData.price_change_percentage_24h.toFixed(2)}%
                </p>
              </div>
              
              <CryptoChart cryptoData={selectedCryptoData} />
            </div>
          ) : (
            <div className="text-center py-12">
              <p>Select a cryptocurrency to view its chart</p>
            </div>
          )}
        </div>
        
        {/* Table View */}
        <div className="glass-panel p-4 overflow-x-auto">
          {error && (
            <div className="bg-error-50 dark:bg-error-900/20 border border-error-200 dark:border-error-800 text-error-700 dark:text-error-300 p-4 rounded-lg mb-4">
              {error}
            </div>
          )}
          
          {loading ? (
            <div className="animate-pulse">
              <div className="h-10 bg-gray-200 dark:bg-dark-400 rounded mb-4"></div>
              {Array(5).fill(0).map((_, idx) => (
                <div key={idx} className="h-16 bg-gray-200 dark:bg-dark-400 rounded mb-2"></div>
              ))}
            </div>
          ) : sortedData.length === 0 ? (
            <div className="text-center py-8">
              <p>No cryptocurrencies match your search.</p>
            </div>
          ) : (
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-gray-200 dark:border-dark-500">
                  <th className="py-4 px-2 text-left font-semibold text-sm">#</th>
                  <th className="py-4 px-2 text-left font-semibold text-sm">Coin</th>
                  <th 
                    className="py-4 px-2 text-right font-semibold text-sm cursor-pointer"
                    onClick={() => requestSort('current_price')}
                  >
                    <div className="flex items-center justify-end">
                      <span>Price</span>
                      <ArrowUpDown size={14} className="ml-1" />
                    </div>
                  </th>
                  <th 
                    className="py-4 px-2 text-right font-semibold text-sm cursor-pointer"
                    onClick={() => requestSort('price_change_percentage_24h')}
                  >
                    <div className="flex items-center justify-end">
                      <span>24h %</span>
                      <ArrowUpDown size={14} className="ml-1" />
                    </div>
                  </th>
                  <th 
                    className="py-4 px-2 text-right font-semibold text-sm cursor-pointer"
                    onClick={() => requestSort('market_cap')}
                  >
                    <div className="flex items-center justify-end">
                      <span>Market Cap</span>
                      <ArrowUpDown size={14} className="ml-1" />
                    </div>
                  </th>
                  <th 
                    className="py-4 px-2 text-right font-semibold text-sm cursor-pointer"
                    onClick={() => requestSort('total_volume')}
                  >
                    <div className="flex items-center justify-end">
                      <span>Volume (24h)</span>
                      <ArrowUpDown size={14} className="ml-1" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedData.map((crypto, index) => (
                  <motion.tr 
                    key={crypto.id}
                    className={`border-b border-gray-100 dark:border-dark-600 hover:bg-gray-50 dark:hover:bg-dark-600/50 cursor-pointer transition-colors duration-150 ${
                      selectedCrypto === crypto.id ? 'bg-primary-50 dark:bg-primary-900/20' : ''
                    }`}
                    onClick={() => handleCryptoClick(crypto.id)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ scale: 1.01 }}
                  >
                    <td className="py-4 px-2 text-sm">{index + 1}</td>
                    <td className="py-4 px-2">
                      <div className="flex items-center">
                        <img 
                          src={crypto.image} 
                          alt={crypto.name}
                          className="w-6 h-6 mr-3" 
                        />
                        <div>
                          <p className="font-medium">{crypto.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{crypto.symbol.toUpperCase()}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-right font-medium">
                      ${crypto.current_price.toLocaleString()}
                    </td>
                    <td className={`py-4 px-2 text-right font-medium ${
                      crypto.price_change_percentage_24h >= 0 
                        ? 'text-success-500' 
                        : 'text-error-500'
                    }`}>
                      {crypto.price_change_percentage_24h >= 0 ? '+' : ''}
                      {crypto.price_change_percentage_24h.toFixed(2)}%
                    </td>
                    <td className="py-4 px-2 text-right">
                      ${crypto.market_cap.toLocaleString()}
                    </td>
                    <td className="py-4 px-2 text-right">
                      ${crypto.total_volume.toLocaleString()}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;