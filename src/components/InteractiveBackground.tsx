
import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  element: HTMLDivElement;
}

const InteractiveBackground = () => {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const background = backgroundRef.current;
    if (!background) return;

    // Create particles
    const createParticles = () => {
      const particleCount = Math.min(Math.floor(window.innerWidth / 15), 100);
      
      // Clear existing particles
      particles.current.forEach(particle => {
        if (particle.element.parentNode) {
          particle.element.parentNode.removeChild(particle.element);
        }
      });
      particles.current = [];
      
      // Create new particles
      for (let i = 0; i < particleCount; i++) {
        const element = document.createElement("div");
        element.className = "particle";
        
        const size = Math.random() * 5 + 2;
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        element.style.left = `${x}px`;
        element.style.top = `${y}px`;
        
        const opacity = Math.random() * 0.5 + 0.2;
        element.style.opacity = opacity.toString();
        
        background.appendChild(element);
        
        particles.current.push({
          x,
          y,
          size,
          speedX: Math.random() * 1 - 0.5,
          speedY: Math.random() * 1 - 0.5,
          element
        });
      }
    };

    // Update particles position
    let animationFrame: number;
    const updateParticles = () => {
      particles.current.forEach(particle => {
        // Basic movement
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Boundary check
        if (particle.x < 0 || particle.x > window.innerWidth) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > window.innerHeight) particle.speedY *= -1;
        
        // Mouse interaction - gentle attraction
        const dx = mouse.current.x - particle.x;
        const dy = mouse.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const angle = Math.atan2(dy, dx);
          const force = 0.1; // Gentle force factor
          particle.x += Math.cos(angle) * force;
          particle.y += Math.sin(angle) * force;
        }
        
        // Update position
        particle.element.style.left = `${particle.x}px`;
        particle.element.style.top = `${particle.y}px`;
      });
      
      animationFrame = requestAnimationFrame(updateParticles);
    };

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    // Handle window resize
    const handleResize = () => {
      createParticles();
    };

    // Initialize
    createParticles();
    updateParticles();
    
    // Event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrame);
      
      // Cleanup particles
      particles.current.forEach(particle => {
        if (particle.element.parentNode) {
          particle.element.parentNode.removeChild(particle.element);
        }
      });
    };
  }, []);

  return (
    <div 
      ref={backgroundRef}
      className="fixed inset-0 w-full h-full bg-gradient-to-br from-indigo-900 via-[#161040] to-[#06001a] z-[-1]"
    >
      <div className="absolute inset-0 opacity-40 bg-gradient-radial from-blue-500/20 via-transparent to-transparent"></div>
    </div>
  );
};

export default InteractiveBackground;
