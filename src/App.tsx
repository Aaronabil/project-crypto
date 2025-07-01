import React from 'react';
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { ThemeProvider } from './contexts/ThemeContext';
import { CryptoDataProvider } from './contexts/CryptoContext';
import ParticleBackground from './components/backgrounds/ParticleBackground';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import News from './pages/News';
import Wallet from './pages/Wallet';
import About from './pages/About';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <ThemeProvider>
      <CryptoDataProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-dark-700 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <ParticleBackground />
            <Layout>
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/news" element={<News />} />
                  <Route path="/wallet" element={<Wallet />} />
                  <Route path="/about" element={<About />} />
                </Routes>
              </AnimatePresence>
            </Layout>
            <ScrollToTop />
          </div>
        </Router>
      </CryptoDataProvider>
    </ThemeProvider>
  );
}

export default App;