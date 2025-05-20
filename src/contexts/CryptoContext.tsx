import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

export interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
  total_volume: number;
  sparkline_in_7d?: {
    price: number[];
  };
}

interface CryptoContextType {
  cryptoData: CryptoData[];
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
}

const CryptoContext = createContext<CryptoContextType | undefined>(undefined);

const MAX_RETRIES = 3;
const RETRY_DELAY = 2000; // 2 seconds

export const CryptoDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCryptoData = async (retryCount = 0) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(
        'https://api.coingecko.com/api/v3/coins/markets', {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 20,
            page: 1,
            sparkline: true,
            price_change_percentage: '24h'
          },
          timeout: 10000 // 10 second timeout
        }
      );
      
      setCryptoData(response.data);
    } catch (err: any) {
      console.error('Error fetching crypto data:', err);
      
      // Handle specific error types
      let errorMessage = 'Failed to fetch cryptocurrency data. ';
      
      if (axios.isAxiosError(err)) {
        if (err.code === 'ECONNABORTED') {
          errorMessage += 'Request timed out. ';
        } else if (err.response) {
          // Server responded with error status
          errorMessage += `Server error: ${err.response.status}. `;
        } else if (err.request) {
          // Request made but no response
          errorMessage += 'No response from server. ';
        }
      }
      
      // Implement retry logic
      if (retryCount < MAX_RETRIES) {
        errorMessage += 'Retrying...';
        setError(errorMessage);
        
        // Retry after delay
        setTimeout(() => {
          fetchCryptoData(retryCount + 1);
        }, RETRY_DELAY);
        return;
      }
      
      errorMessage += 'Using fallback data.';
      setError(errorMessage);
      // Use mock data as fallback after all retries fail
      setCryptoData(getMockData());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptoData();
    
    // Refresh data every 2 minutes
    const interval = setInterval(() => {
      fetchCryptoData();
    }, 2 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <CryptoContext.Provider value={{ cryptoData, loading, error, refreshData: fetchCryptoData }}>
      {children}
    </CryptoContext.Provider>
  );
};

export const useCryptoData = (): CryptoContextType => {
  const context = useContext(CryptoContext);
  if (context === undefined) {
    throw new Error('useCryptoData must be used within a CryptoDataProvider');
  }
  return context;
};

// Mock data for development or when API fails
const getMockData = (): CryptoData[] => [
  {
    id: "bitcoin",
    symbol: "btc",
    name: "Bitcoin",
    image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
    current_price: 51432.12,
    market_cap: 1008540934156,
    price_change_percentage_24h: 2.34,
    total_volume: 37854392456,
    sparkline_in_7d: { price: [50000, 51000, 50500, 52000, 51500, 50800, 51432] }
  },
  {
    id: "ethereum",
    symbol: "eth",
    name: "Ethereum",
    image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
    current_price: 2823.45,
    market_cap: 339547293045,
    price_change_percentage_24h: 3.12,
    total_volume: 18763254198,
    sparkline_in_7d: { price: [2750, 2800, 2780, 2900, 2850, 2820, 2823] }
  },
  {
    id: "ripple",
    symbol: "xrp",
    name: "XRP",
    image: "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png",
    current_price: 0.5324,
    market_cap: 28452789123,
    price_change_percentage_24h: -1.24,
    total_volume: 1853254198,
    sparkline_in_7d: { price: [0.54, 0.55, 0.53, 0.52, 0.54, 0.53, 0.5324] }
  },
  {
    id: "cardano",
    symbol: "ada",
    name: "Cardano",
    image: "https://assets.coingecko.com/coins/images/975/large/cardano.png",
    current_price: 0.3524,
    market_cap: 12452789123,
    price_change_percentage_24h: 0.74,
    total_volume: 853254198,
    sparkline_in_7d: { price: [0.35, 0.36, 0.34, 0.35, 0.36, 0.35, 0.3524] }
  },
  {
    id: "solana",
    symbol: "sol",
    name: "Solana",
    image: "https://assets.coingecko.com/coins/images/4128/large/solana.png",
    current_price: 102.74,
    market_cap: 43452789123,
    price_change_percentage_24h: 5.24,
    total_volume: 2853254198,
    sparkline_in_7d: { price: [95, 98, 100, 103, 99, 101, 102.74] }
  }
];