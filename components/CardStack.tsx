import React, { useRef } from 'react';
import { motion, useAnimationFrame, useMotionValue, PanInfo, useSpring, useTransform } from 'framer-motion';
import { ZenCard } from '../types';
import Card3D from './Card3D';

interface CardStackProps {
  activeCards: ZenCard[];
  onCardClick: (card: ZenCard) => void;
}

const CardStack: React.FC<CardStackProps> = ({ activeCards, onCardClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Physics State
  const rotationY = useMotionValue(0);
  const velocity = useRef(0.2); // Base idle spin
  const isDragging = useRef(false);
  
  // Tilt Physics (Banking effect)
  // We link tilt to velocity: faster spin = more tilt
  const tiltVelocity = useMotionValue(0);
  const tiltZ = useSpring(tiltVelocity, { stiffness: 100, damping: 20 });

  // The Physics Loop (Runs at high frequency for smoothness)
  useAnimationFrame((time, delta) => {
    // Normalize delta to 60fps (approx 16.66ms)
    const timeFactor = delta / 16.66;
    
    if (!isDragging.current) {
      const baseSpeed = 0.2;
      const friction = 0.97; // "Heavy" feeling friction
      
      // Apply inertia
      if (Math.abs(velocity.current - baseSpeed) > 0.001) {
        velocity.current = velocity.current * friction + baseSpeed * (1 - friction);
      } else {
        velocity.current = baseSpeed;
      }

      const moveAmount = velocity.current * timeFactor;
      rotationY.set(rotationY.get() + moveAmount);
    }
    
    // Banking effect logic: 
    // Tilt based on velocity, but clamp it so it doesn't flip over
    // Multiplier -2 gives a "leaning into the turn" effect
    const targetTilt = Math.max(Math.min(velocity.current * -2, 15), -15);
    tiltVelocity.set(targetTilt);
  });

  const handlePanStart = () => {
    isDragging.current = true;
    velocity.current = 0;
  };

  const handlePan = (event: any, info: PanInfo) => {
    // 1:1 Direct manipulation
    const currentRotation = rotationY.get();
    // Sensitivity factor
    rotationY.set(currentRotation + info.delta.x * 0.4);
    
    // Dynamic velocity tracking for the "throw"
    velocity.current = info.velocity.x / 60; // Update velocity for banking effect during drag
  };

  const handlePanEnd = (event: any, info: PanInfo) => {
    isDragging.current = false;
    // Fling physics
    const flingVelocity = info.velocity.x / 45; 
    // Cap max speed
    velocity.current = Math.max(Math.min(flingVelocity, 12), -12);
  };

  return (
    <div 
      ref={containerRef}
      className="relative flex items-center justify-center w-full h-[650px] perspective-2000"
    >
      {/* Interactive Touch Zone */}
      <motion.div
        className="absolute inset-0 z-50 cursor-grab active:cursor-grabbing"
        onPanStart={handlePanStart}
        onPan={handlePan}
        onPanEnd={handlePanEnd}
        style={{ touchAction: 'none' }} 
      />

      {/* The 3D Stack Container */}
      <motion.div
        className="relative w-[320px] h-[480px] transform-style-3d"
        style={{
          rotateY: rotationY, 
          rotateX: 10, // Base cinematic angle
          rotateZ: tiltZ, // Dynamic banking
          z: -50,
        }}
      >
        {activeCards.map((card, index) => {
          const count = activeCards.length;
          const spacingAngle = 360 / (count || 1);
          const angle = index * spacingAngle;
          
          // Radius calculation: expands slightly with more cards
          const radius = count > 1 ? Math.max(350, 280 + count * 25) : 0;

          return (
            <Card3D
              key={card.id}
              card={card}
              index={index}
              isActive={true}
              onClick={() => onCardClick(card)}
              transformStyle={{
                transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
              }}
            />
          );
        })}
      </motion.div>

      {/* Environment Floor Reflection */}
      <div className="absolute bottom-[-50px] w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[100px] transform rotate-x-90 pointer-events-none opacity-50" />
    </div>
  );
};

export default CardStack;