
import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const MouseFollower: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      setMousePos({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      const isClickable = target.closest('button, a, input, [role="button"], .interactive-hover');
      setIsHovering(!!isClickable);
    };

    const handleLeave = () => setIsVisible(false);
    const handleEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseleave', handleLeave);
    document.addEventListener('mouseenter', handleEnter);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
      document.removeEventListener('mouseenter', handleEnter);
    };
  }, [isVisible]);

  const config = { damping: 40, stiffness: 300 };
  const x = useSpring(mousePos.x, config);
  const y = useSpring(mousePos.y, config);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block">
      {/* Halo extérieur - Effet Premium Apple */}
      {/* Fix: Move dynamic properties and transition out of the style object to their dedicated props to resolve type errors */}
      <motion.div
        className="absolute w-12 h-12 border border-[#D4AF37]/40 rounded-full"
        style={{ 
          x, 
          y, 
          translateX: '-50%', 
          translateY: '-50%', 
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
        }}
        transition={{ scale: { duration: 0.2 } }}
      />
      {/* Point central discret qui suit avec un léger retard pour un effet organique */}
      {/* Fix: Move dynamic scale to the animate prop to avoid conflict with MotionValues in the style object */}
      <motion.div
        className="absolute w-2 h-2 bg-[#9B2226] rounded-full opacity-40"
        style={{ 
          x, 
          y, 
          translateX: '-50%', 
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 0.5 : 1
        }}
      />
    </div>
  );
};

export default MouseFollower;
