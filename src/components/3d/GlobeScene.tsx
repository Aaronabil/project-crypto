import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, Environment } from '@react-three/drei';
import { motion } from 'framer-motion';
import Globe from './Globe';

const Loader = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-gray-50/50 dark:bg-dark-800/50 backdrop-blur-sm">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <span className="text-primary-500 font-medium">Loading 3D Scene...</span>
    </div>
  </div>
);

const GlobeScene: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleSceneCreated = () => {
    setIsLoading(false);
  };

  return (
    <motion.div 
      className="w-full h-[400px] md:h-[500px] relative rounded-xl overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {isLoading && <Loader />}
      <Canvas onCreated={handleSceneCreated}>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#6366f1" />
          <Globe />
          <Environment preset="city" />
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            rotateSpeed={0.5}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
    </motion.div>
  );
};

export default GlobeScene;