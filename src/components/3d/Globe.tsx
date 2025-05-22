import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useTexture } from '@react-three/drei';
import { useTheme } from '../../contexts/ThemeContext';
import * as THREE from 'three';

const Globe = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { theme } = useTheme();
  
  // Create textures based on theme - using more reliable image URLs
  const darkMap = useTexture('https://uc7b8ffa902cd83da576ebf96066.previews.dropboxusercontent.com/p/thumb/ACom-uFtFkf3kjXGgylcq2bItG0Ply5Uv8kndVHqLrWV0Ya2iqprXmRpMemX4GipnF6Sp9nbOeHxAZryp7e7G76csT0BuCt2DKcKdrwjjVuI_3bm8M04-wR_ylYJH0hHMPwgutgzNFcOgMEOrFBOjJONvWMuCEmzEi1Ktc1lDtHkarckkSNEIOOk0vbjqFDkPPd16wntxbbCzJGzKwHGIbk1i6u45cPbD7WPdiQfOwv-FnNQErqel1ku36z5HwMPZiJPKBtHZWPTt9m2ZSFMfHXngHnw33Tm5-APV8pICZmn29JZWkyVP96SUbPlzp0fmMKjIbgG1GtxQzjUhffxeZTuHMg9nIlBdI1fp2RsDeK4YCKD8SJBXvhnWV0a5PGYDYr95NElqloqXJeg0PmukTYP/p.jpeg?is_prewarmed=true');
const lightMap = useTexture('https://uc7b8ffa902cd83da576ebf96066.previews.dropboxusercontent.com/p/thumb/ACom-uFtFkf3kjXGgylcq2bItG0Ply5Uv8kndVHqLrWV0Ya2iqprXmRpMemX4GipnF6Sp9nbOeHxAZryp7e7G76csT0BuCt2DKcKdrwjjVuI_3bm8M04-wR_ylYJH0hHMPwgutgzNFcOgMEOrFBOjJONvWMuCEmzEi1Ktc1lDtHkarckkSNEIOOk0vbjqFDkPPd16wntxbbCzJGzKwHGIbk1i6u45cPbD7WPdiQfOwv-FnNQErqel1ku36z5HwMPZiJPKBtHZWPTt9m2ZSFMfHXngHnw33Tm5-APV8pICZmn29JZWkyVP96SUbPlzp0fmMKjIbgG1GtxQzjUhffxeZTuHMg9nIlBdI1fp2RsDeK4YCKD8SJBXvhnWV0a5PGYDYr95NElqloqXJeg0PmukTYP/p.jpeg?is_prewarmed=true');

  
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
    <mesh ref={meshRef} scale={2.1}>
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