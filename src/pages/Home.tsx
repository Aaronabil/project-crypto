"use client";
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, TrendingUp, Globe, Shield, Zap } from 'lucide-react';
// import GlobeScene from '../components/3d/GlobeScene';
import { useCryptoData } from '../contexts/CryptoContext';
import CryptoCard from '../components/ui/CryptoCard';
import { World } from '../components/3d/Globe';



const globeConfig = {
  pointSize: 4,
  globeColor: "#062056",
  showAtmosphere: true,
  atmosphereColor: "#FFFFFF",
  atmosphereAltitude: 0.1,
  emissive: "#062056",
  emissiveIntensity: 0.1,
  shininess: 0.9,
  polygonColor: "rgba(255,255,255,0.7)",
  ambientLight: "#38bdf8",
  directionalLeftLight: "#ffffff",
  directionalTopLight: "#ffffff",
  pointLight: "#ffffff",
  arcTime: 1000,
  arcLength: 0.9,
  rings: 1,
  maxRings: 3,
  initialPosition: { lat: 22.3193, lng: 114.1694 },
  autoRotate: true,
  autoRotateSpeed: 0.5,
};
const colors = ["#06b6d4", "#3b82f6", "#6366f1"];
const sampleArcs = [
  {
    order: 1,
    startLat: -19.885592,
    startLng: -43.951191,
    endLat: -22.9068,
    endLng: -43.1729,
    arcAlt: 0.1,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 1,
    startLat: 28.6139,
    startLng: 77.209,
    endLat: 3.139,
    endLng: 101.6869,
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 1,
    startLat: -19.885592,
    startLng: -43.951191,
    endLat: -1.303396,
    endLng: 36.852443,
    arcAlt: 0.5,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 2,
    startLat: 1.3521,
    startLng: 103.8198,
    endLat: 35.6762,
    endLng: 139.6503,
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 2,
    startLat: 51.5072,
    startLng: -0.1276,
    endLat: 3.139,
    endLng: 101.6869,
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 2,
    startLat: -15.785493,
    startLng: -47.909029,
    endLat: 36.162809,
    endLng: -115.119411,
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 3,
    startLat: -33.8688,
    startLng: 151.2093,
    endLat: 22.3193,
    endLng: 114.1694,
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 3,
    startLat: 21.3099,
    startLng: -157.8581,
    endLat: 40.7128,
    endLng: -74.006,
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 3,
    startLat: -6.2088,
    startLng: 106.8456,
    endLat: 51.5072,
    endLng: -0.1276,
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 4,
    startLat: 11.986597,
    startLng: 8.571831,
    endLat: -15.595412,
    endLng: -56.05918,
    arcAlt: 0.5,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 4,
    startLat: -34.6037,
    startLng: -58.3816,
    endLat: 22.3193,
    endLng: 114.1694,
    arcAlt: 0.7,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 4,
    startLat: 51.5072,
    startLng: -0.1276,
    endLat: 48.8566,
    endLng: -2.3522,
    arcAlt: 0.1,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 5,
    startLat: 14.5995,
    startLng: 120.9842,
    endLat: 51.5072,
    endLng: -0.1276,
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 5,
    startLat: 1.3521,
    startLng: 103.8198,
    endLat: -33.8688,
    endLng: 151.2093,
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 5,
    startLat: 34.0522,
    startLng: -118.2437,
    endLat: 48.8566,
    endLng: -2.3522,
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 6,
    startLat: -15.432563,
    startLng: 28.315853,
    endLat: 1.094136,
    endLng: -63.34546,
    arcAlt: 0.7,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 6,
    startLat: 37.5665,
    startLng: 126.978,
    endLat: 35.6762,
    endLng: 139.6503,
    arcAlt: 0.1,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 6,
    startLat: 22.3193,
    startLng: 114.1694,
    endLat: 51.5072,
    endLng: -0.1276,
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 7,
    startLat: -19.885592,
    startLng: -43.951191,
    endLat: -15.595412,
    endLng: -56.05918,
    arcAlt: 0.1,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 7,
    startLat: 48.8566,
    startLng: -2.3522,
    endLat: 52.52,
    endLng: 13.405,
    arcAlt: 0.1,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 7,
    startLat: 52.52,
    startLng: 13.405,
    endLat: 34.0522,
    endLng: -118.2437,
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 8,
    startLat: -8.833221,
    startLng: 13.264837,
    endLat: -33.936138,
    endLng: 18.436529,
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 8,
    startLat: 49.2827,
    startLng: -123.1207,
    endLat: 52.3676,
    endLng: 4.9041,
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 8,
    startLat: 1.3521,
    startLng: 103.8198,
    endLat: 40.7128,
    endLng: -74.006,
    arcAlt: 0.5,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 9,
    startLat: 51.5072,
    startLng: -0.1276,
    endLat: 34.0522,
    endLng: -118.2437,
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 9,
    startLat: 22.3193,
    startLng: 114.1694,
    endLat: -22.9068,
    endLng: -43.1729,
    arcAlt: 0.7,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 9,
    startLat: 1.3521,
    startLng: 103.8198,
    endLat: -34.6037,
    endLng: -58.3816,
    arcAlt: 0.5,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 10,
    startLat: -22.9068,
    startLng: -43.1729,
    endLat: 28.6139,
    endLng: 77.209,
    arcAlt: 0.7,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 10,
    startLat: 34.0522,
    startLng: -118.2437,
    endLat: 31.2304,
    endLng: 121.4737,
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 10,
    startLat: -6.2088,
    startLng: 106.8456,
    endLat: 52.3676,
    endLng: 4.9041,
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 11,
    startLat: 41.9028,
    startLng: 12.4964,
    endLat: 34.0522,
    endLng: -118.2437,
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 11,
    startLat: -6.2088,
    startLng: 106.8456,
    endLat: 31.2304,
    endLng: 121.4737,
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 11,
    startLat: 22.3193,
    startLng: 114.1694,
    endLat: 1.3521,
    endLng: 103.8198,
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 12,
    startLat: 34.0522,
    startLng: -118.2437,
    endLat: 37.7749,
    endLng: -122.4194,
    arcAlt: 0.1,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 12,
    startLat: 35.6762,
    startLng: 139.6503,
    endLat: 22.3193,
    endLng: 114.1694,
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 12,
    startLat: 22.3193,
    startLng: 114.1694,
    endLat: 34.0522,
    endLng: -118.2437,
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 13,
    startLat: 52.52,
    startLng: 13.405,
    endLat: 22.3193,
    endLng: 114.1694,
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 13,
    startLat: 11.986597,
    startLng: 8.571831,
    endLat: 35.6762,
    endLng: 139.6503,
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 13,
    startLat: -22.9068,
    startLng: -43.1729,
    endLat: -34.6037,
    endLng: -58.3816,
    arcAlt: 0.1,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 14,
    startLat: -33.936138,
    startLng: 18.436529,
    endLat: 21.395643,
    endLng: 39.883798,
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { cryptoData, loading } = useCryptoData();
  const globeContainerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      if (globeContainerRef.current) {
        setContainerSize({
          width: globeContainerRef.current.offsetWidth,
          height: globeContainerRef.current.offsetHeight,
        });
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
          <div className="flex flex-col md:flex-row items-center mx-6">
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
              ref={globeContainerRef}
              className="w-full aspect-square max-w-[600px] mx-auto"
            >
              <World
                data={sampleArcs}
                globeConfig={globeConfig}
                width={containerSize.width}
                height={containerSize.height}
              />
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
              Why Choose Cryptoctabil
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
              Join thousands of users who trust Cryptoctabil for real-time market insights and portfolio management.
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