import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
}

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    // Initialize particles
    let particles: Particle[] = [];
    const particleCount = Math.min(window.innerWidth / 10, 100);
    
    const createParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * 3 + 1;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const speedX = Math.random() * 0.5 - 0.25;
        const speedY = Math.random() * 0.5 - 0.25;
        
        const lightColors = [
          'rgba(99, 102, 241, 0.4)',
          'rgba(16, 185, 129, 0.3)',
          'rgba(245, 158, 11, 0.2)'
        ];
        
        const darkColors = [
          'rgba(165, 180, 252, 0.3)',
          'rgba(110, 231, 183, 0.2)',
          'rgba(253, 186, 116, 0.2)'
        ];
        
        const colors = theme === 'dark' ? darkColors : lightColors;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particles.push({
          x,
          y,
          size,
          speedX,
          speedY,
          color
        });
      }
    };
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around edges
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.y < 0) particle.y = canvas.height;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });
      
      // Connect nearby particles with lines
      connectParticles();
      
      requestAnimationFrame(animate);
    };
    
    // Connect particles that are close to each other
    const connectParticles = () => {
      const maxDistance = 100;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            const opacity = 1 - (distance / maxDistance);
            const gradientColor = theme === 'dark' 
              ? `rgba(165, 180, 252, ${opacity * 0.2})` 
              : `rgba(99, 102, 241, ${opacity * 0.15})`;
            
            ctx.beginPath();
            ctx.strokeStyle = gradientColor;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };
    
    // Handle resize
    window.addEventListener('resize', () => {
      setCanvasSize();
      createParticles();
    });
    
    // Handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      // Slightly adjust particles based on mouse position
      particles.forEach(particle => {
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          const angle = Math.atan2(dy, dx);
          particle.speedX -= Math.cos(angle) * 0.02;
          particle.speedY -= Math.sin(angle) * 0.02;
        }
      });
    };
    
    canvas.addEventListener('mousemove', handleMouseMove);
    
    // Initialize
    setCanvasSize();
    createParticles();
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [theme]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="particles-container"
      style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }}
    />
  );
};

export default ParticleBackground;