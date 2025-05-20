import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  PieChart, Wallet as WalletIcon, Repeat, TrendingUp, BarChart2, 
  Plus, Send, ArrowDown, Settings, Trash2
} from 'lucide-react';
import { useCryptoData } from '../contexts/CryptoContext';
import CryptoChart from '../components/ui/CryptoChart';

interface PortfolioAsset {
  cryptoId: string;
  amount: number;
  purchasePrice: number;
  timestamp: number;
}

interface Transaction {
  id: string;
  type: 'buy' | 'sell' | 'transfer';
  cryptoId: string;
  amount: number;
  price: number;
  timestamp: number;
}

const Wallet: React.FC = () => {
  const { cryptoData } = useCryptoData();
  const [activeTab, setActiveTab] = useState('portfolio');
  const [portfolio, setPortfolio] = useState<PortfolioAsset[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  
  // Initialize demo portfolio data
  useEffect(() => {
    if (cryptoData.length > 0 && portfolio.length === 0) {
      // Create a demo portfolio with the top 4 cryptocurrencies
      const demoPortfolio: PortfolioAsset[] = [
        {
          cryptoId: 'bitcoin',
          amount: 0.75,
          purchasePrice: 48000,
          timestamp: Date.now() - 30 * 24 * 60 * 60 * 1000 // 30 days ago
        },
        {
          cryptoId: 'ethereum',
          amount: 5.2,
          purchasePrice: 2500,
          timestamp: Date.now() - 45 * 24 * 60 * 60 * 1000 // 45 days ago
        },
        {
          cryptoId: 'solana',
          amount: 25,
          purchasePrice: 90,
          timestamp: Date.now() - 15 * 24 * 60 * 60 * 1000 // 15 days ago
        },
        {
          cryptoId: 'cardano',
          amount: 1000,
          purchasePrice: 0.32,
          timestamp: Date.now() - 60 * 24 * 60 * 60 * 1000 // 60 days ago
        }
      ];
      
      setPortfolio(demoPortfolio);
      
      // Create demo transactions
      const demoTransactions: Transaction[] = [
        {
          id: '1',
          type: 'buy',
          cryptoId: 'bitcoin',
          amount: 0.75,
          price: 48000,
          timestamp: Date.now() - 30 * 24 * 60 * 60 * 1000
        },
        {
          id: '2',
          type: 'buy',
          cryptoId: 'ethereum',
          amount: 5.2,
          price: 2500,
          timestamp: Date.now() - 45 * 24 * 60 * 60 * 1000
        },
        {
          id: '3',
          type: 'buy',
          cryptoId: 'solana',
          amount: 25,
          price: 90,
          timestamp: Date.now() - 15 * 24 * 60 * 60 * 1000
        },
        {
          id: '4',
          type: 'buy',
          cryptoId: 'cardano',
          amount: 1000,
          price: 0.32,
          timestamp: Date.now() - 60 * 24 * 60 * 60 * 1000
        },
        {
          id: '5',
          type: 'sell',
          cryptoId: 'bitcoin',
          amount: 0.25,
          price: 52000,
          timestamp: Date.now() - 10 * 24 * 60 * 60 * 1000
        },
        {
          id: '6',
          type: 'transfer',
          cryptoId: 'ethereum',
          amount: 1.0,
          price: 2700,
          timestamp: Date.now() - 5 * 24 * 60 * 60 * 1000
        }
      ];
      
      setTransactions(demoTransactions);
    }
  }, [cryptoData, portfolio.length]);
  
  // Calculate portfolio value and gains
  const calculatePortfolioStats = () => {
    let totalValue = 0;
    let totalInvestment = 0;
    
    // Map portfolio assets to include current prices and values
    const portfolioWithValues = portfolio.map(asset => {
      const crypto = cryptoData.find(c => c.id === asset.cryptoId);
      const currentPrice = crypto ? crypto.current_price : 0;
      const currentValue = asset.amount * currentPrice;
      const investmentValue = asset.amount * asset.purchasePrice;
      
      totalValue += currentValue;
      totalInvestment += investmentValue;
      
      const profitLoss = currentValue - investmentValue;
      const profitLossPercentage = investmentValue > 0 
        ? (profitLoss / investmentValue) * 100 
        : 0;
      
      return {
        ...asset,
        crypto,
        currentPrice,
        currentValue,
        investmentValue,
        profitLoss,
        profitLossPercentage
      };
    });
    
    const totalProfitLoss = totalValue - totalInvestment;
    const totalProfitLossPercentage = totalInvestment > 0 
      ? (totalProfitLoss / totalInvestment) * 100 
      : 0;
    
    return {
      portfolioWithValues,
      totalValue,
      totalInvestment,
      totalProfitLoss,
      totalProfitLossPercentage
    };
  };
  
  const {
    portfolioWithValues,
    totalValue,
    totalInvestment,
    totalProfitLoss,
    totalProfitLossPercentage
  } = calculatePortfolioStats();
  
  const tabItems = [
    { id: 'portfolio', label: 'Portfolio', icon: <PieChart size={18} /> },
    { id: 'assets', label: 'Assets', icon: <WalletIcon size={18} /> },
    { id: 'transactions', label: 'Transactions', icon: <Repeat size={18} /> }
  ];
  
  const [isAddingAsset, setIsAddingAsset] = useState(false);
  const [selectedCryptoId, setSelectedCryptoId] = useState('');
  const [assetAmount, setAssetAmount] = useState('');
  
  const handleAddAsset = () => {
    if (!selectedCryptoId || !assetAmount || parseFloat(assetAmount) <= 0) return;
    
    const crypto = cryptoData.find(c => c.id === selectedCryptoId);
    if (!crypto) return;
    
    const newAsset: PortfolioAsset = {
      cryptoId: selectedCryptoId,
      amount: parseFloat(assetAmount),
      purchasePrice: crypto.current_price,
      timestamp: Date.now()
    };
    
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: 'buy',
      cryptoId: selectedCryptoId,
      amount: parseFloat(assetAmount),
      price: crypto.current_price,
      timestamp: Date.now()
    };
    
    setPortfolio([...portfolio, newAsset]);
    setTransactions([newTransaction, ...transactions]);
    
    // Reset form
    setIsAddingAsset(false);
    setSelectedCryptoId('');
    setAssetAmount('');
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold mb-8">Crypto Wallet</h1>
        
        {/* Demo Disclaimer */}
        <div className="glass-panel p-4 mb-8 bg-accent-50 dark:bg-accent-900/20 border border-accent-200 dark:border-accent-800">
          <p className="text-accent-800 dark:text-accent-300 text-sm">
            <span className="font-medium">⚠️ Demo Wallet:</span> This is a simulation for demonstration purposes. No real cryptocurrency transactions are performed.
          </p>
        </div>
        
        {/* Portfolio Overview */}
        <div className="glass-panel p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="col-span-3 md:col-span-2">
              <h2 className="text-xl font-semibold mb-4">Portfolio Overview</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-white/40 dark:bg-dark-600/40 rounded-lg">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Total Balance</p>
                  <p className="text-xl font-semibold">${totalValue.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-white/40 dark:bg-dark-600/40 rounded-lg">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Total Invested</p>
                  <p className="text-xl font-semibold">${totalInvestment.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-white/40 dark:bg-dark-600/40 rounded-lg col-span-2 md:col-span-1">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Profit/Loss</p>
                  <p className={`text-xl font-semibold ${
                    totalProfitLoss >= 0 ? 'text-success-500' : 'text-error-500'
                  }`}>
                    {totalProfitLoss >= 0 ? '+' : ''}${totalProfitLoss.toLocaleString()} ({totalProfitLossPercentage.toFixed(2)}%)
                  </p>
                </div>
              </div>
              
              {portfolioWithValues.length > 0 && portfolioWithValues[0].crypto && (
                <div className="h-64">
                  <CryptoChart cryptoData={portfolioWithValues[0].crypto} />
                </div>
              )}
            </div>
            
            <div className="col-span-3 md:col-span-1">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Quick Actions</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-6">
                <button 
                  onClick={() => setIsAddingAsset(true)}
                  className="button-primary flex flex-col items-center justify-center py-3"
                >
                  <Plus size={24} className="mb-1" />
                  <span>Buy</span>
                </button>
                <button className="button-secondary flex flex-col items-center justify-center py-3">
                  <Send size={24} className="mb-1" />
                  <span>Send</span>
                </button>
                <button className="button-secondary flex flex-col items-center justify-center py-3">
                  <ArrowDown size={24} className="mb-1" />
                  <span>Receive</span>
                </button>
                <button className="button-secondary flex flex-col items-center justify-center py-3">
                  <Repeat size={24} className="mb-1" />
                  <span>Swap</span>
                </button>
              </div>
              
              <h3 className="font-semibold mb-3">Top Assets</h3>
              <div className="space-y-3">
                {portfolioWithValues.slice(0, 3).map(asset => (
                  <div key={asset.cryptoId} className="p-3 bg-white/40 dark:bg-dark-600/40 rounded-lg flex items-center">
                    {asset.crypto && (
                      <>
                        <img 
                          src={asset.crypto.image} 
                          alt={asset.crypto.name}
                          className="w-8 h-8 rounded-full mr-3" 
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <p className="font-medium">{asset.crypto.name}</p>
                            <p className="text-sm font-semibold">${asset.currentValue.toLocaleString()}</p>
                          </div>
                          <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                            <p>{asset.amount} {asset.crypto.symbol.toUpperCase()}</p>
                            <p className={asset.profitLossPercentage >= 0 ? 'text-success-500' : 'text-error-500'}>
                              {asset.profitLossPercentage >= 0 ? '+' : ''}{asset.profitLossPercentage.toFixed(2)}%
                            </p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Add Asset Modal */}
        {isAddingAsset && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <motion.div 
              className="glass-panel p-6 w-full max-w-md rounded-xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Add Asset</h3>
                <button 
                  onClick={() => setIsAddingAsset(false)}
                  className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-dark-500"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Select Cryptocurrency</label>
                  <select
                    value={selectedCryptoId}
                    onChange={(e) => setSelectedCryptoId(e.target.value)}
                    className="input-field"
                  >
                    <option value="">Select a cryptocurrency</option>
                    {cryptoData.map(crypto => (
                      <option key={crypto.id} value={crypto.id}>
                        {crypto.name} ({crypto.symbol.toUpperCase()})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Amount</label>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    value={assetAmount}
                    onChange={(e) => setAssetAmount(e.target.value)}
                    className="input-field"
                    min="0"
                    step="0.0001"
                  />
                </div>
                <button 
                  onClick={handleAddAsset}
                  className="button-primary w-full"
                  disabled={!selectedCryptoId || !assetAmount || parseFloat(assetAmount) <= 0}
                >
                  Add to Portfolio
                </button>
              </div>
            </motion.div>
          </div>
        )}
        
        {/* Tabs Navigation */}
        <div className="glass-panel overflow-hidden">
          <div className="flex border-b border-gray-200 dark:border-dark-500">
            {tabItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-4 py-3 flex items-center text-sm font-medium transition-colors duration-200 relative ${
                  activeTab === item.id
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400'
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                <span>{item.label}</span>
                {activeTab === item.id && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500 dark:bg-primary-400"
                    initial={false}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </button>
            ))}
          </div>
          
          <div className="p-4">
            {/* Portfolio Tab Content */}
            {activeTab === 'portfolio' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold">Asset Allocation</h2>
                  <button className="p-1 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-600">
                    <Settings size={18} />
                  </button>
                </div>
                
                {portfolioWithValues.length > 0 ? (
                  <div className="space-y-4">
                    {portfolioWithValues.map(asset => (
                      <div key={asset.cryptoId} className="p-4 bg-white/30 dark:bg-dark-600/30 rounded-lg">
                        {asset.crypto && (
                          <>
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center">
                                <img 
                                  src={asset.crypto.image} 
                                  alt={asset.crypto.name}
                                  className="w-6 h-6 rounded-full mr-2" 
                                />
                                <span className="font-medium">{asset.crypto.name}</span>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold">${asset.currentValue.toLocaleString()}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {asset.amount} {asset.crypto.symbol.toUpperCase()}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex justify-between text-xs mb-1">
                              <span>Purchase Price</span>
                              <span>Current Price</span>
                            </div>
                            
                            <div className="flex justify-between text-sm mb-2">
                              <span>${asset.purchasePrice.toLocaleString()}</span>
                              <span>${asset.currentPrice.toLocaleString()}</span>
                            </div>
                            
                            <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                {asset.profitLossPercentage >= 0 ? (
                                  <TrendingUp size={16} className="text-success-500 mr-1" />
                                ) : (
                                  <ArrowDown size={16} className="text-error-500 mr-1" />
                                )}
                                <span className={`text-sm font-medium ${
                                  asset.profitLossPercentage >= 0 ? 'text-success-500' : 'text-error-500'
                                }`}>
                                  {asset.profitLossPercentage >= 0 ? '+' : ''}
                                  {asset.profitLossPercentage.toFixed(2)}%
                                </span>
                              </div>
                              <div className="flex space-x-2">
                                <button className="text-xs py-1 px-2 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-md">
                                  Buy
                                </button>
                                <button className="text-xs py-1 px-2 bg-gray-100 dark:bg-dark-500 text-gray-600 dark:text-gray-300 rounded-md">
                                  Sell
                                </button>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                      Your portfolio is empty. Add some assets to get started.
                    </p>
                    <button
                      onClick={() => setIsAddingAsset(true)}
                      className="button-primary"
                    >
                      Add Asset
                    </button>
                  </div>
                )}
              </div>
            )}
            
            {/* Assets Tab Content */}
            {activeTab === 'assets' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold">Your Assets</h2>
                  <button
                    onClick={() => setIsAddingAsset(true)}
                    className="button-primary text-sm py-1 px-3 flex items-center"
                  >
                    <Plus size={16} className="mr-1" />
                    <span>Add Asset</span>
                  </button>
                </div>
                
                {portfolioWithValues.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px]">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-dark-500">
                          <th className="py-3 px-2 text-left font-medium text-sm">Asset</th>
                          <th className="py-3 px-2 text-right font-medium text-sm">Holdings</th>
                          <th className="py-3 px-2 text-right font-medium text-sm">Price</th>
                          <th className="py-3 px-2 text-right font-medium text-sm">Value</th>
                          <th className="py-3 px-2 text-right font-medium text-sm">P/L</th>
                          <th className="py-3 px-2 text-right font-medium text-sm">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {portfolioWithValues.map(asset => (
                          asset.crypto && (
                            <tr key={asset.cryptoId} className="border-b border-gray-100 dark:border-dark-600 hover:bg-gray-50 dark:hover:bg-dark-600/50">
                              <td className="py-3 px-2">
                                <div className="flex items-center">
                                  <img 
                                    src={asset.crypto.image} 
                                    alt={asset.crypto.name} 
                                    className="w-6 h-6 mr-2 rounded-full"
                                  />
                                  <div>
                                    <p className="font-medium">{asset.crypto.name}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{asset.crypto.symbol.toUpperCase()}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3 px-2 text-right">
                                {asset.amount.toLocaleString()} {asset.crypto.symbol.toUpperCase()}
                              </td>
                              <td className="py-3 px-2 text-right">
                                ${asset.currentPrice.toLocaleString()}
                              </td>
                              <td className="py-3 px-2 text-right font-medium">
                                ${asset.currentValue.toLocaleString()}
                              </td>
                              <td className={`py-3 px-2 text-right font-medium ${
                                asset.profitLossPercentage >= 0 ? 'text-success-500' : 'text-error-500'
                              }`}>
                                {asset.profitLossPercentage >= 0 ? '+' : ''}
                                {asset.profitLossPercentage.toFixed(2)}%
                              </td>
                              <td className="py-3 px-2 text-right">
                                <div className="flex justify-end space-x-1">
                                  <button className="p-1 text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded">
                                    <BarChart2 size={16} />
                                  </button>
                                  <button className="p-1 text-gray-500 hover:bg-gray-50 dark:hover:bg-dark-500 rounded">
                                    <Settings size={16} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          )
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                      Your asset list is empty. Add some assets to get started.
                    </p>
                    <button
                      onClick={() => setIsAddingAsset(true)}
                      className="button-primary"
                    >
                      Add Asset
                    </button>
                  </div>
                )}
              </div>
            )}
            
            {/* Transactions Tab Content */}
            {activeTab === 'transactions' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold">Transaction History</h2>
                  <div className="flex space-x-2">
                    <select className="text-sm py-1 px-2 border border-gray-200 dark:border-dark-500 rounded-md bg-white dark:bg-dark-600">
                      <option value="all">All Types</option>
                      <option value="buy">Buy</option>
                      <option value="sell">Sell</option>
                      <option value="transfer">Transfer</option>
                    </select>
                  </div>
                </div>
                
                {transactions.length > 0 ? (
                  <div className="space-y-3">
                    {transactions.map(tx => {
                      const crypto = cryptoData.find(c => c.id === tx.cryptoId);
                      return (
                        <div key={tx.id} className="p-3 bg-white/30 dark:bg-dark-600/30 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              {tx.type === 'buy' && <Plus size={18} className="text-success-500 mr-2" />}
                              {tx.type === 'sell' && <ArrowDown size={18} className="text-error-500 mr-2" />}
                              {tx.type === 'transfer' && <Repeat size={18} className="text-primary-500 mr-2" />}
                              
                              {crypto && (
                                <div className="flex items-center">
                                  <img 
                                    src={crypto.image} 
                                    alt={crypto.name} 
                                    className="w-6 h-6 mr-2 rounded-full"
                                  />
                                  <div>
                                    <div className="flex items-center">
                                      <p className="font-medium capitalize">{tx.type}</p>
                                      <p className="ml-1 text-gray-600 dark:text-gray-300">{crypto.name}</p>
                                    </div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                      {new Date(tx.timestamp).toLocaleDateString()}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                            <div className="text-right">
                              <p className="font-medium">
                                {tx.type === 'buy' ? '+' : tx.type === 'sell' ? '-' : ''}
                                {tx.amount} {crypto?.symbol.toUpperCase()}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                Price: ${tx.price.toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400">
                      No transactions found. Your transaction history will appear here.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Wallet;