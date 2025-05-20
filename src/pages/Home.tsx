import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, TrendingUp, Globe, Shield, Zap } from 'lucide-react';
import GlobeScene from '../components/3d/GlobeScene';
import { useCryptoData } from '../contexts/CryptoContext';
import CryptoCard from '../components/ui/CryptoCard';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { cryptoData, loading } = useCryptoData();
  
  // Top 4 cryptocurrencies
  const topCryptos = cryptoData.slice(0, 4);
  
  // Staggered animation for children elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  const features = [
    {
      icon: <TrendingUp className="text-primary-500" size={32} />,
      title: "Real-time Tracking",
      description: "Track cryptocurrency prices and market changes in real-time with accurate data updates."
    },
    {
      icon: <Globe className="text-secondary-500" size={32} />,
      title: "Global Coverage",
      description: "Access data from cryptocurrency exchanges worldwide, all in one centralized platform."
    },
    {
      icon: <Shield className="text-accent-500" size={32} />,
      title: "Secure Portfolio",
      description: "Keep track of your investments with our secure portfolio management tools."
    },
    {
      icon: <Zap className="text-warning-500" size={32} />,
      title: "Instant Alerts",
      description: "Receive instant notifications on price changes and market opportunities."
    }
  ];
  
  return (
    <div>
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              className="md:w-1/2 mb-8 md:mb-0 md:pr-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
                Unlock the Future of <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-secondary-500">Cryptocurrency</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6">
                Real-time insights, analytics, and portfolio management for the modern crypto investor.
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <motion.button 
                  onClick={() => navigate('/dashboard')}
                  className="button-primary flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Explore Dashboard</span>
                  <ArrowRight size={16} className="ml-2" />
                </motion.button>
                <motion.button 
                  onClick={() => navigate('/wallet')}
                  className="button-secondary flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Try Demo Wallet</span>
                </motion.button>
              </div>
            </motion.div>
            
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <GlobeScene />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Trending Cryptocurrencies */}
      <section className="py-12 bg-gray-50/50 dark:bg-dark-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-8 text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Trending Cryptocurrencies
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Stay updated with the latest market movers and top cryptocurrencies
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              // Loading skeletons
              Array(4).fill(0).map((_, idx) => (
                <div key={idx} className="glass-card p-4 h-full animate-pulse">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-gray-200 dark:bg-dark-400 rounded-full mr-3"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 dark:bg-dark-400 rounded w-1/2 mb-2"></div>
                      <div className="h-3 bg-gray-200 dark:bg-dark-400 rounded w-1/4"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-end mt-2">
                    <div className="w-1/2">
                      <div className="h-3 bg-gray-200 dark:bg-dark-400 rounded w-1/3 mb-1"></div>
                      <div className="h-5 bg-gray-200 dark:bg-dark-400 rounded w-full"></div>
                    </div>
                    <div className="w-1/4">
                      <div className="h-4 bg-gray-200 dark:bg-dark-400 rounded"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              topCryptos.map((crypto, index) => (
                <CryptoCard key={crypto.id} crypto={crypto} index={index} />
              ))
            )}
          </div>
          
          <motion.div 
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <button 
              onClick={() => navigate('/dashboard')}
              className="button-secondary inline-flex items-center"
            >
              <span>View All Cryptocurrencies</span>
              <ArrowRight size={16} className="ml-2" />
            </button>
          </motion.div>
        </div>
      </section>
      
      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Why Choose CryptoPulse
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Powerful tools and insights to navigate the cryptocurrency markets with confidence
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="glass-panel p-6 flex flex-col items-center text-center"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-dark-500 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-500 dark:text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to start your cryptocurrency journey?
            </h2>
            <p className="text-white/80 text-lg mb-8">
              Join thousands of users who trust CryptoPulse for real-time market insights and portfolio management.
            </p>
            <motion.button 
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 bg-white text-primary-600 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Get Started Now</span>
              <ArrowRight size={16} className="ml-2" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;