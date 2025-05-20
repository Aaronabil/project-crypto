import React from 'react';
import { motion } from 'framer-motion';
import { Github as GitHub, Twitter, Globe, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white/30 dark:bg-dark-800/30 backdrop-blur-sm mt-16 py-8 border-t border-gray-100 dark:border-dark-600">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div 
            className="mb-6 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center">
                <Globe size={20} className="text-white" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-secondary-500">
                CryptoPulse
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-xs">
              Real-time cryptocurrency insights and analytics for modern investors.
            </p>
          </motion.div>
          
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-300">Documentation</a></li>
                <li><a href="#" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-300">API</a></li>
                <li><a href="#" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-300">Privacy Policy</a></li>
                <li><a href="#" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-300">Terms of Service</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-300">About Us</a></li>
                <li><a href="#" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-300">Careers</a></li>
                <li><a href="#" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-300">Blog</a></li>
                <li><a href="#" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-300">Contact</a></li>
              </ul>
            </div>
            
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Connect</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-300">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-300">
                  <GitHub size={20} />
                </a>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-300">
                  <Mail size={20} />
                </a>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Subscribe to our newsletter
                </p>
                <div className="mt-2 flex">
                  <input 
                    type="email" 
                    placeholder="your@email.com" 
                    className="input-field text-sm py-1.5 flex-1"
                  />
                  <button className="button-primary ml-2 py-1.5 text-sm">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-8 pt-6 border-t border-gray-100 dark:border-dark-600 text-center text-sm text-gray-500 dark:text-gray-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p>&copy; {new Date().getFullYear()} CryptoPulse. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;