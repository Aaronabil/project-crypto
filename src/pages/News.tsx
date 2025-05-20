import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface NewsItem {
  id: number;
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  source: string;
  date: string;
  category: string;
}

const News: React.FC = () => {
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API fetch with mock data
    const fetchNews = async () => {
      try {
        setLoading(true);
        // In a real app, this would be an API call
        setTimeout(() => {
          setNewsData(mockNewsData);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching news:', error);
        setLoading(false);
      }
    };
    
    fetchNews();
  }, []);
  
  // Filter by category
  const [activeCategory, setActiveCategory] = useState('all');
  const categories = ['all', 'bitcoin', 'ethereum', 'defi', 'nft', 'regulation'];
  
  const filteredNews = activeCategory === 'all' 
    ? newsData 
    : newsData.filter(item => item.category === activeCategory);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold mb-8">Crypto News & Updates</h1>
        
        {/* Categories */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 capitalize ${
                activeCategory === category
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 dark:bg-dark-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-500'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Featured Article */}
        {!loading && filteredNews.length > 0 && (
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="glass-panel p-6 rounded-xl overflow-hidden">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="order-2 md:order-1">
                  <div className="text-xs text-primary-500 font-semibold uppercase mb-2">
                    Featured
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold mb-3">
                    {filteredNews[0].title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {filteredNews[0].description}
                  </p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {filteredNews[0].source} · {filteredNews[0].date}
                    </span>
                    <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-dark-600 rounded-full capitalize">
                      {filteredNews[0].category}
                    </span>
                  </div>
                  <a 
                    href={filteredNews[0].url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="button-primary inline-flex items-center"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight size={16} className="ml-2" />
                  </a>
                </div>
                <div className="order-1 md:order-2">
                  <img 
                    src={filteredNews[0].imageUrl} 
                    alt={filteredNews[0].title}
                    className="w-full h-48 md:h-full object-cover rounded-lg" 
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* News Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6).fill(0).map((_, idx) => (
              <div key={idx} className="glass-card p-4 animate-pulse">
                <div className="h-40 bg-gray-200 dark:bg-dark-400 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-200 dark:bg-dark-400 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-200 dark:bg-dark-400 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-dark-400 rounded w-5/6 mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-dark-400 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        ) : filteredNews.length === 0 ? (
          <div className="text-center py-12">
            <p>No news articles found for this category.</p>
          </div>
        ) : (
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredNews.slice(1).map((item) => (
              <motion.div 
                key={item.id} 
                className="glass-card overflow-hidden group"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {item.source}
                    </span>
                    <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-dark-600 rounded-full capitalize">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="font-semibold mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {item.date}
                    </span>
                    <a 
                      href={item.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary-500 hover:text-primary-600 font-medium text-sm flex items-center"
                    >
                      <span>Read More</span>
                      <ArrowRight size={14} className="ml-1" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

// Mock news data
const mockNewsData: NewsItem[] = [
  {
    id: 1,
    title: "Bitcoin Surges Past $60,000 as Institutional Investment Grows",
    description: "Bitcoin has reached a new all-time high as institutional investors continue to adopt the cryptocurrency, with major companies adding it to their balance sheets.",
    url: "#",
    imageUrl: "https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    source: "CryptoNews",
    date: "Jun 10, 2023",
    category: "bitcoin"
  },
  {
    id: 2,
    title: "Ethereum 2.0 Upgrade: What You Need to Know",
    description: "The long-awaited Ethereum 2.0 upgrade is set to transform the network with proof-of-stake consensus and improved scalability. Here's what to expect.",
    url: "#",
    imageUrl: "https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    source: "ETH Updates",
    date: "Jun 8, 2023",
    category: "ethereum"
  },
  {
    id: 3,
    title: "DeFi Total Value Locked Reaches $50 Billion Milestone",
    description: "Decentralized Finance continues to grow as total value locked in DeFi protocols has reached $50 billion, marking a significant milestone for the industry.",
    url: "#",
    imageUrl: "https://images.pexels.com/photos/6771607/pexels-photo-6771607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    source: "DeFi Pulse",
    date: "Jun 5, 2023",
    category: "defi"
  },
  {
    id: 4,
    title: "NFT Market Rebounds: Blue-Chip Collections Lead the Recovery",
    description: "After months of declining sales, the NFT market is showing signs of recovery with blue-chip collections recording significant increases in trading volume.",
    url: "#",
    imageUrl: "https://images.pexels.com/photos/11053072/pexels-photo-11053072.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    source: "NFT Insider",
    date: "Jun 3, 2023",
    category: "nft"
  },
  {
    id: 5,
    title: "Global Regulatory Framework for Cryptocurrencies Proposed",
    description: "Financial authorities from major economies are working on a coordinated regulatory framework for cryptocurrencies to address concerns about market stability and security.",
    url: "#",
    imageUrl: "https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    source: "Regulation Watch",
    date: "Jun 1, 2023",
    category: "regulation"
  },
  {
    id: 6,
    title: "Major Bank Launches Cryptocurrency Custody Services",
    description: "One of the world's largest banks has announced the launch of cryptocurrency custody services for institutional clients, signaling growing mainstream acceptance.",
    url: "#",
    imageUrl: "https://images.pexels.com/photos/4386158/pexels-photo-4386158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    source: "Banking Today",
    date: "May 29, 2023",
    category: "bitcoin"
  },
  {
    id: 7,
    title: "New Layer 2 Solution Promises 100x Scaling for Ethereum",
    description: "A new Layer 2 scaling solution for Ethereum claims to increase transaction throughput by 100x while maintaining security and decentralization.",
    url: "#",
    imageUrl: "https://images.pexels.com/photos/8358141/pexels-photo-8358141.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    source: "ETH Updates",
    date: "May 27, 2023",
    category: "ethereum"
  }
];

export default News;