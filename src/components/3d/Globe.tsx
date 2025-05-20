import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useTexture } from '@react-three/drei';
import { useTheme } from '../../contexts/ThemeContext';
import * as THREE from 'three';

const Globe = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { theme } = useTheme();
  
  // Create textures based on theme - using more reliable image URLs
  const darkMap = useTexture('https://i.imgur.com/jYLeHQt.jpeg');
  const lightMap = useTexture('https://i.imgur.com/jYLeHQt.jpeg');
  
  useEffect(() => {
    if (darkMap && lightMap) {
      darkMap.wrapS = THREE.RepeatWrapping;
      darkMap.wrapT = THREE.RepeatWrapping;
      lightMap.wrapS = THREE.RepeatWrapping;
      lightMap.wrapT = THREE.RepeatWrapping;
    }
  }, [darkMap, lightMap]);
  
  // Animation
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
    }
  });
  
  return (
    <mesh ref={meshRef} scale={2.5}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
        map={theme === 'dark' ? darkMap : lightMap}
        emissive={theme === 'dark' ? new THREE.Color('#3730a3') : new THREE.Color('#6366f1')}
        emissiveIntensity={0.2}
        metalness={0.5}
        roughness={0.7}
      />
    </mesh>
  );
};

export default Globe;