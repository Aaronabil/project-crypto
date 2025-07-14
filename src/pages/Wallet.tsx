import React, { useState, useEffect, forwardRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  PieChart, Wallet as WalletIcon, Repeat, TrendingUp, BarChart2,
  Plus, Send, ArrowDown, Settings, X, CheckCircle2Icon
} from 'lucide-react';
import { useCryptoData } from '../contexts/CryptoContext';
import CryptoChart from '../components/ui/CryptoChart';
// import { FaCaretDown } from "react-icons/fa";
import { Listbox } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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

const currencyList = [
  { code: 'USD', name: 'US Dollar' },
  { code: 'IDR', name: 'Indonesian Rupiah' },
  { code: 'EUR', name: 'Euro' },
  { code: 'JPY', name: 'Japanese Yen' },
];

const Wallet: React.FC = () => {
  const { cryptoData } = useCryptoData();
  const [activeTab, setActiveTab] = useState('portfolio');
  const [portfolio, setPortfolio] = useState<PortfolioAsset[]>(() => {
  const saved = sessionStorage.getItem('portfolio');
  return saved ? JSON.parse(saved) : [];
});
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
  const saved = sessionStorage.getItem('transactions');
  return saved ? JSON.parse(saved) : [];
});
  const [currency, setCurrency] = useState(currencyList[0]);
  const [isCurrencyModalOpen, setIsCurrencyModalOpen] = useState(false);
  const [dateTime, setDateTime] = useState(new Date());
  const [showNotif, setShowNotif] = useState(false);

  // Initialize demo portfolio data
  useEffect(() => {
      if (portfolio.length === 0 && cryptoData.length > 0 && transactions.length === 0) {
      const demoPortfolio: PortfolioAsset[] = [];
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
      setPortfolio(demoPortfolio);
      setTransactions(demoTransactions);
    }
  }, [cryptoData]);

  useEffect(() => {
  sessionStorage.setItem('portfolio', JSON.stringify(portfolio));
  sessionStorage.setItem('transactions', JSON.stringify(transactions));
}, [portfolio, transactions]);


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

  const fiatToUsdRates: Record<string, number> = {
    IDR: 0.000062, // 1 IDR = 0.000062 USD (example, update as needed)
    EUR: 1.08,     // 1 EUR = 1.08 USD (example)
    JPY: 0.0063,   // 1 JPY = 0.0063 USD (example)
    USD: 1,
  };

  const handleAddAsset = () => {
    if (!selectedCryptoId || !assetAmount || parseFloat(assetAmount) <= 0) return;

    const crypto = cryptoData.find(c => c.id === selectedCryptoId);
    if (!crypto) return;

    let amountToken = 0;
    const inputAmount = parseFloat(assetAmount);
    const selectedCurrency = currency.code.toUpperCase();
    const cryptoSymbol = crypto.symbol.toUpperCase();

    if (selectedCurrency === cryptoSymbol) {
      // User entered amount in token
      amountToken = inputAmount;
    } else if (selectedCurrency === 'USD') {
      // User entered amount in USD
      amountToken = inputAmount / crypto.current_price;
    } else if (fiatToUsdRates[selectedCurrency]) {
      // User entered amount in fiat, convert to USD then to token
      const usdAmount = inputAmount * fiatToUsdRates[selectedCurrency];
      amountToken = usdAmount / crypto.current_price;
    } else {
      // Fallback: treat as USD
      amountToken = inputAmount / crypto.current_price;
    }

    const newAsset: PortfolioAsset = {
      cryptoId: selectedCryptoId,
      amount: amountToken,
      purchasePrice: crypto.current_price,
      timestamp: dateTime.getTime(),
    };

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: 'buy',
      cryptoId: selectedCryptoId,
      amount: amountToken,
      price: crypto.current_price,
      timestamp: dateTime.getTime(),
    };

    setPortfolio([...portfolio, newAsset]);
    setTransactions([newTransaction, ...transactions]);
    setIsAddingAsset(false);
    setSelectedCryptoId('');
    setAssetAmount('');
    setShowNotif(true);
    setTimeout(() => setShowNotif(false), 2500);
  };

  // Custom read-only input for DatePicker
  const ReadOnlyInput = forwardRef(({ value, onClick, className }, ref) => (
    <input
      type="text"
      readOnly
      value={value}
      onClick={onClick}
      ref={ref}
      className={className}
      style={{ cursor: 'default', backgroundColor: 'inherit' }}
    />
  ));

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Notifikasi coin berhasil ditambahkan di pojok kanan bawah */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={showNotif ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ type: 'spring', stiffness: 400, damping: 32, duration: 1 }}
        style={{ pointerEvents: 'none' }}
        className="fixed bottom-6 right-6 z-50"
      >
        <AnimatePresence>
          {showNotif && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ type: 'spring', stiffness: 400, damping: 32, duration: 1 }}
              className="bg-dark-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3"
            >
              <CheckCircle2Icon className="w-5 h-5 text-white" />
              <div>
                <div className="font-semibold">Coin successfully added to portfolio!</div>
                <div className="text-xs opacity-80">A new asset has been added to your portfolio list.</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
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
                  <p className={`text-xl font-semibold ${totalProfitLoss >= 0 ? 'text-success-500' : 'text-error-500'
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
        <AnimatePresence>
          {isAddingAsset && (
            <motion.div
              key="modal-bg"
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <motion.div
                key="modal-panel"
                className="glass-panel p-6 w-full max-w-md rounded-xl"
                initial={{ opacity: 0, scale: 0.95, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 40 }}
                transition={{ type: 'spring', stiffness: 300, damping: 28, duration: 0.35 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">Add Asset</h3>
                  <button
                    onClick={() => setIsAddingAsset(false)}
                    className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-dark-500"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Select Cryptocurrency</label>
                    <Listbox value={selectedCryptoId} onChange={setSelectedCryptoId}>
                      <div className="relative">
                        <Listbox.Button className="input-field flex justify-between items-center w-full">
                          <span>
                            {selectedCryptoId ? (
                              <>
                                <img
                                  src={cryptoData.find(c => c.id === selectedCryptoId)?.image}
                                  alt={cryptoData.find(c => c.id === selectedCryptoId)?.name}
                                  className="inline w-5 h-5 mr-2 rounded-full align-middle"
                                />
                                {cryptoData.find(c => c.id === selectedCryptoId)?.name} (
                                {cryptoData.find(c => c.id === selectedCryptoId)?.symbol.toUpperCase()})
                              </>
                            ) : (
                              'Select a cryptocurrency'
                            )}
                          </span>
                          <ChevronDownIcon className="w-5 h-5 ml-2 text-gray-400" />
                        </Listbox.Button>
                        <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-dark-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {cryptoData.map(crypto => (
                            <Listbox.Option
                              key={crypto.id}
                              value={crypto.id}
                              className={({ active }) =>
                                `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-900 dark:text-primary-100' : 'text-gray-900 dark:text-gray-100'
                                }`
                              }
                            >
                              {({ selected }) => (
                                <>
                                  <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                    <img src={crypto.image} alt={crypto.name} className="inline w-5 h-5 mr-2 rounded-full align-middle" />
                                    {crypto.name} ({crypto.symbol.toUpperCase()})
                                  </span>
                                  {selected ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-600 dark:text-primary-400">
                                      <CheckIcon className="w-5 h-5" aria-hidden="true" />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </div>
                    </Listbox>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Amount</label>
                    <div className="relative">
                      <input
                        type="text"
                        inputMode="decimal"
                        pattern="[0-9]*"
                        placeholder="Enter amount"
                        value={assetAmount}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (/^\d*\.?\d{0,4}$/.test(val) || val === '') {
                            setAssetAmount(val);
                          }
                        }}
                        className="input-field pr-20"
                        min="0"
                        step="0.0001"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center text-gray-500 font-semibold"
                        onClick={() => setIsCurrencyModalOpen(true)}
                        tabIndex={-1}
                      >
                        {currency.code}
                        <ChevronDownIcon className="w-4 h-4 ml-1" />
                      </button>
                    </div>
                    <label className="block text-sm font-medium mb-1 mt-3">Date</label>
                    <div className="relative w-full">
                      <DatePicker
                        selected={dateTime}
                        onChange={setDateTime}
                        timeFormat="hh:mm aa"
                        timeIntervals={5}
                        dateFormat="d MMMM yyyy"
                        className="input-field w-full pr-10"
                        calendarClassName="w-full"
                        popperClassName="z-50"
                        wrapperClassName="w-full"
                        customInput={<ReadOnlyInput />}
                      />
                      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 z-1 flex items-center h-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <rect x="3" y="7" width="18" height="14" rx="2" strokeWidth="2" stroke="currentColor" fill="none" />
                          <path d="M16 3v4M8 3v4M3 11h18" strokeWidth="2" stroke="currentColor" />
                        </svg>
                      </span>
                    </div>
                    <AnimatePresence>
                      {isCurrencyModalOpen && (
                        <motion.div
                          key="currency-modal-bg"
                          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <motion.div
                            key="currency-modal-panel"
                            className="bg-white dark:bg-dark-700 rounded-lg shadow-lg p-6 w-full max-w-xs"
                            initial={{ opacity: 0, scale: 0.95, y: 40 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 40 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 28, duration: 0.3 }}
                          >
                            <h3 className="text-lg font-semibold mb-4">Select Currency</h3>
                            <ul>
                              {currencyList.map((cur) => (
                                <li key={cur.code}>
                                  <button
                                    className={`w-full text-left px-3 py-2 rounded hover:bg-primary-100 dark:hover:bg-primary-900/30 ${currency.code === cur.code ? 'font-bold bg-primary-50 dark:bg-primary-900/20' : ''
                                      }`}
                                    onClick={() => {
                                      setCurrency(cur);
                                      setIsCurrencyModalOpen(false);
                                    }}
                                  >
                                    {cur.name} ({cur.code})
                                  </button>
                                </li>
                              ))}
                            </ul>
                            <button
                              className="mt-4 w-full py-2 rounded button-primary"
                              onClick={() => setIsCurrencyModalOpen(false)}
                            >
                              Cancel
                            </button>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
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
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tabs Navigation */}
        <div className="glass-panel overflow-hidden">
          <div className="flex border-b border-gray-200 dark:border-dark-500">
            {tabItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-4 py-3 flex items-center text-sm font-medium transition-colors duration-200 relative ${activeTab === item.id
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

                            {/* Show purchase date below purchase price */}
                            {asset.timestamp && (
                              <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                                Purchased on: {new Date(asset.timestamp).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                              </div>
                            )}

                            <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                {asset.profitLossPercentage >= 0 ? (
                                  <TrendingUp size={16} className="text-success-500 mr-1" />
                                ) : (
                                  <ArrowDown size={16} className="text-error-500 mr-1" />
                                )}
                                <span className={`text-sm font-medium ${asset.profitLossPercentage >= 0 ? 'text-success-500' : 'text-error-500'
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
                  <div className="flex flex-col items-center justify-center py-12">
                    <img
                      src="https://raw.githubusercontent.com/Aaronabil/project-crypto/main/public/images/coingeko.png"
                      className="w-60 h-60 mb-6 select-none pointer-events-none"
                      draggable="false"
                    />
                    <p className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                      What coins are you researching today?
                    </p>
                    <button
                      onClick={() => setIsAddingAsset(true)}
                      className="button-primary"
                    >
                      + Add Asset
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
                              <td className={`py-3 px-2 text-right font-medium ${asset.profitLossPercentage >= 0 ? 'text-success-500' : 'text-error-500'
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