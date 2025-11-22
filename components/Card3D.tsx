import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ZenCard, Category } from '../types';
import { Shield, Award, Cpu, Globe, Zap, Layers, Activity, Lock, Share2, Database, Box, Aperture, Grid, Radio, Wifi } from 'lucide-react';

interface Card3DProps {
  card: ZenCard;
  index: number;
  isActive: boolean;
  transformStyle?: React.CSSProperties;
  onClick: () => void;
}

// --- UTILS: Deterministic Randomness ---
// Allows us to generate the exact same "random" layout for a specific card ID every time.
const pseudoRandom = (seed: number) => {
  let value = seed;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
};

const getColorValue = (colorClass: string, opacity: number = 1) => {
  const base = colorClass.replace('text-', '').replace('bg-', '').replace('border-', '').split('-')[0];
  const map: Record<string, string> = {
    cyan: `rgba(6,182,212,${opacity})`,
    sky: `rgba(14,165,233,${opacity})`,
    blue: `rgba(59,130,246,${opacity})`,
    indigo: `rgba(99,102,241,${opacity})`,
    violet: `rgba(139,92,246,${opacity})`,
    purple: `rgba(168,85,247,${opacity})`,
    fuchsia: `rgba(217,70,239,${opacity})`,
    pink: `rgba(236,72,153,${opacity})`,
    rose: `rgba(244,63,94,${opacity})`,
    emerald: `rgba(16,185,129,${opacity})`,
    green: `rgba(34,197,94,${opacity})`,
    teal: `rgba(20,184,166,${opacity})`,
    amber: `rgba(245,158,11,${opacity})`,
    orange: `rgba(249,115,22,${opacity})`,
    yellow: `rgba(234,179,8,${opacity})`,
    slate: `rgba(148,163,184,${opacity})`,
    gray: `rgba(107,114,128,${opacity})`,
  };
  for (const key in map) {
    if (base.includes(key)) return map[key];
  }
  return `rgba(255,255,255,${opacity})`;
};

// --- 1. COSMIC FORGE (YOUTH/PIONEER) ---
// REDESIGNED: Uses mix-blend-mode: screen/lighten and transparent gradients to be holographic, not solid.
const CosmicForge = ({ color, seed }: { color: string; seed: number }) => {
  const rng = pseudoRandom(seed);
  const systemType = Math.floor(rng() * 3); // 0: Vortex, 1: Rings, 2: Nebula
  const colorHex = getColorValue(color, 1);
  
  // Use RGB string for transparent gradient stops
  const colorRGB = getColorValue(color, 1).replace('rgba(', '').replace(')', '').split(',').slice(0, 3).join(',');

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Deep Space Base (Keeps it dark for glass effect) */}
      <div className="absolute inset-0 bg-black/20" />
      
      {/* Procedural Stars - Sharp and bright */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={`star-${i}`}
          className="absolute rounded-full bg-white animate-pulse"
          style={{
            left: `${rng() * 100}%`,
            top: `${rng() * 100}%`,
            width: `${rng() * 2 + 1}px`,
            height: `${rng() * 2 + 1}px`,
            opacity: rng() * 0.9,
            animationDelay: `${rng() * 5}s`,
            boxShadow: '0 0 4px rgba(255,255,255,0.8)'
          }}
        />
      ))}

      <div className="absolute inset-0 flex items-center justify-center perspective-500">
        
        {/* TYPE 0: GALAXY VORTEX (Holographic) */}
        {systemType === 0 && (
          <>
            {Array.from({ length: 3 }).map((_, i) => (
               <motion.div
                 key={i}
                 className="absolute w-[140%] h-[140%] blur-[30px] mix-blend-screen"
                 style={{ 
                   background: `conic-gradient(from 0deg, transparent 0%, rgba(${colorRGB}, 0.4) 50%, transparent 100%)`,
                   borderRadius: '45%',
                 }}
                 animate={{ rotate: 360 }}
                 transition={{ duration: 15 + rng() * 10, repeat: Infinity, ease: "linear", delay: i * -5 }}
               />
            ))}
            {/* Core */}
            <div className="absolute w-16 h-16 bg-white rounded-full blur-[25px] mix-blend-overlay animate-pulse" />
          </>
        )}

        {/* TYPE 1: PLANETARY ORBIT (Holographic) */}
        {systemType === 1 && (
          <>
             <div className="absolute w-32 h-32 rounded-full blur-xl mix-blend-screen" style={{ background: `radial-gradient(circle at 30% 30%, white, rgba(${colorRGB}, 0.8), transparent)` }} />
             {Array.from({ length: 3 }).map((_, i) => (
               <motion.div
                 key={i}
                 className="absolute rounded-full border-[1px] border-white/30 mix-blend-plus-lighter"
                 style={{ 
                   width: 140 + i * 60, 
                   height: 140 + i * 60,
                   borderTopColor: colorHex,
                   boxShadow: `0 0 15px rgba(${colorRGB}, 0.2)`,
                   rotateX: 60 + (rng() * 20),
                   rotateY: rng() * 45
                 }}
                 animate={{ rotateZ: 360 }}
                 transition={{ duration: 8 + i * 5, repeat: Infinity, ease: "linear" }}
               >
                 <div className="absolute top-0 left-1/2 w-3 h-3 rounded-full bg-white shadow-[0_0_10px_white]" />
               </motion.div>
             ))}
          </>
        )}

        {/* TYPE 2: NEBULA CLOUD (Volumetric Smoke) */}
        {systemType === 2 && (
           <div className="w-full h-full relative">
             {Array.from({ length: 4 }).map((_, i) => (
               <motion.div
                 key={i}
                 className="absolute top-1/2 left-1/2 w-64 h-64 blur-[50px] mix-blend-color-dodge"
                 style={{ 
                   background: `radial-gradient(circle, rgba(${colorRGB}, 0.6) 0%, transparent 70%)`,
                   x: '-50%', y: '-50%',
                 }}
                 animate={{ 
                   scale: [1, 1.5, 1],
                   opacity: [0.3, 0.6, 0.3],
                   rotate: [0, 90, 0]
                 }}
                 transition={{ duration: 10 + i * 5, repeat: Infinity, ease: "easeInOut" }}
               />
             ))}
             {/* Sparkles inside nebula */}
             {Array.from({ length: 10 }).map((_, i) => (
                <motion.div
                  key={`spark-${i}`}
                  className="absolute bg-white w-1 h-1 rounded-full"
                  style={{ left: `${20 + rng() * 60}%`, top: `${20 + rng() * 60}%` }}
                  animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
                  transition={{ duration: 2 + rng() * 2, repeat: Infinity, delay: rng() * 5 }}
                />
             ))}
           </div>
        )}
      </div>
    </div>
  );
};

// --- 2. CYBER DECK (VANGUARD) ---
const CyberDeck = ({ color, seed }: { color: string; seed: number }) => {
  const rng = pseudoRandom(seed);
  const layoutType = Math.floor(rng() * 2); // 0: Radar, 1: Data Fall
  const borderColor = color.replace('text-', 'border-');
  const bgClass = color.replace('text-', 'bg-');

  return (
    <div className="absolute inset-0 overflow-hidden bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.4)_100%)]">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-20" 
           style={{ 
             backgroundImage: `linear-gradient(${getColorValue(color, 0.5)} 1px, transparent 1px), linear-gradient(90deg, ${getColorValue(color, 0.5)} 1px, transparent 1px)`,
             backgroundSize: '40px 40px',
             transform: 'perspective(500px) rotateX(20deg)'
           }} 
      />

      {/* TYPE 0: TACTICAL HUD */}
      {layoutType === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
           <motion.div 
             className={`absolute w-[280px] h-[280px] border ${borderColor} opacity-30 rounded-full`}
             animate={{ rotate: 360 }}
             transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
           >
             <div className="absolute inset-2 border border-dashed border-white/20 rounded-full" />
             <div className={`absolute top-0 left-1/2 w-1 h-4 ${bgClass}`} />
           </motion.div>

           <motion.div 
             className={`absolute w-[180px] h-[180px] border-2 ${borderColor} border-t-transparent border-b-transparent rounded-full opacity-60`}
             animate={{ rotate: -360 }}
             transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
           />

           {/* Scanning Line */}
           <div className={`absolute w-[280px] h-[280px] bg-gradient-to-b from-transparent via-${color.split('-')[1]}-500/20 to-transparent animate-spin-slow-variable rounded-full`} />
        </div>
      )}

      {/* TYPE 1: DATA STREAMS */}
      {layoutType === 1 && (
         <div className="flex justify-around h-full opacity-40">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="relative w-px h-full bg-white/5 overflow-hidden">
                 <motion.div 
                   className={`absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-transparent to-${color.split('-')[1]}-400`}
                   initial={{ y: -100 }}
                   animate={{ y: 600 }}
                   transition={{ 
                     duration: 2 + rng() * 3, 
                     repeat: Infinity, 
                     ease: "linear",
                     delay: rng() * 2 
                   }}
                 />
              </div>
            ))}
         </div>
      )}
    </div>
  );
};

// --- 3. CRYPTO LATTICE (WEB3) ---
const CryptoLattice = ({ color, seed }: { color: string; seed: number }) => {
  const rng = pseudoRandom(seed);
  const nodes = Math.floor(6 + rng() * 6);
  const bgClass = color.replace('text-', 'bg-');
  const borderClass = color.replace('text-', 'border-');

  // Generate static positions based on seed
  const nodePositions = useMemo(() => Array.from({ length: nodes }).map(() => ({
    left: 20 + rng() * 60,
    top: 20 + rng() * 60,
    delay: rng() * 2
  })), [seed]);

  return (
    <div className="absolute inset-0 overflow-hidden opacity-50">
      {/* Isometric Background */}
      <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(${getColorValue(color)} 1px, transparent 0)`,
          backgroundSize: '20px 20px',
          opacity: 0.3
      }} />

      {/* Connected Nodes Visualization */}
      <svg className="absolute inset-0 w-full h-full visible pointer-events-none">
        {nodePositions.map((pos, i) => {
          const nextPos = nodePositions[(i + 1) % nodePositions.length];
          return (
            <motion.line
              key={`link-${i}`}
              x1={`${pos.left}%`} y1={`${pos.top}%`}
              x2={`${nextPos.left}%`} y2={`${nextPos.top}%`}
              stroke={getColorValue(color, 0.4)}
              strokeWidth="1"
              strokeDasharray="4 4"
              initial={{ strokeDashoffset: 0 }}
              animate={{ strokeDashoffset: 24 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
          );
        })}
      </svg>

      {/* Nodes */}
      {nodePositions.map((pos, i) => (
        <motion.div
          key={`node-${i}`}
          className={`absolute w-8 h-8 border ${borderClass} bg-black/40 backdrop-blur-sm flex items-center justify-center z-10`}
          style={{ left: `${pos.left}%`, top: `${pos.top}%`, x: '-50%', y: '-50%' }}
          animate={{ 
            y: ['-50%', `calc(-50% - ${10 + rng() * 10}px)`, '-50%'],
            borderColor: [getColorValue(color, 0.3), getColorValue(color, 1), getColorValue(color, 0.3)]
           }}
          transition={{ duration: 4 + rng() * 4, repeat: Infinity, ease: "easeInOut", delay: pos.delay }}
        >
          <div className={`w-2 h-2 ${bgClass} shadow-[0_0_10px_currentColor]`} />
        </motion.div>
      ))}

      {/* Floating Cubes */}
      {Array.from({ length: 3 }).map((_, i) => (
         <motion.div 
           key={`cube-${i}`}
           className={`absolute w-16 h-16 border ${borderClass} opacity-20`}
           style={{ 
             left: `${rng() * 80}%`, 
             top: `${rng() * 80}%`,
           }}
           animate={{ rotateX: 360, rotateY: 360 }}
           transition={{ duration: 15 + rng() * 10, repeat: Infinity, ease: "linear" }}
         />
      ))}
    </div>
  );
};

// --- 4. SONIC FIELD (SPECIALIZED) ---
const SonicField = ({ color, seed }: { color: string; seed: number }) => {
  const rng = pseudoRandom(seed);
  const bars = 12;
  const bgClass = color.replace('text-', 'bg-');

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      
      {/* Background Ripple */}
      {Array.from({ length: 4 }).map((_, i) => (
         <motion.div
           key={`ripple-${i}`}
           className={`absolute rounded-full border ${color.replace('text-', 'border-')} opacity-20`}
           initial={{ width: '10%', height: '10%', opacity: 0.5 }}
           animate={{ 
             width: ['10%', '180%'], 
             height: ['10%', '180%'],
             opacity: [0.5, 0]
           }}
           transition={{ 
             duration: 4, 
             repeat: Infinity, 
             delay: i * 1, 
             ease: "easeOut" 
           }}
         />
      ))}

      {/* EQ Bars */}
      <div className="flex gap-1.5 items-end h-32 z-10">
        {Array.from({ length: bars }).map((_, i) => (
          <motion.div
            key={i}
            className={`w-2 rounded-t-sm ${bgClass} shadow-[0_0_15px_currentColor]`}
            animate={{ 
              height: [
                `${20 + rng() * 30}%`, 
                `${40 + rng() * 60}%`, 
                `${20 + rng() * 30}%`
              ]
            }}
            transition={{ 
              duration: 0.5 + rng(), 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: i * 0.1
            }}
          />
        ))}
      </div>
      
      {/* Scanline Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.4)_50%)] bg-[size:100%_4px] pointer-events-none opacity-50" />
    </div>
  );
};

// --- VISUAL ROUTER & SEED GENERATOR ---
const VisualCore = ({ card }: { card: ZenCard }) => {
  const seed = useMemo(() => {
    return card.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  }, [card.id]);

  const { colors, category } = card;

  switch (category) {
    case Category.YOUTH:
      return <CosmicForge color={colors.accent} seed={seed} />;
    case Category.VANGUARD:
      return <CyberDeck color={colors.accent} seed={seed} />;
    case Category.WEB3:
      return <CryptoLattice color={colors.accent} seed={seed} />;
    case Category.SPECIALIZED:
      return <SonicField color={colors.accent} seed={seed} />;
    default:
      return <CosmicForge color={colors.accent} seed={seed} />;
  }
};

const getCategoryIcon = (cat: Category) => {
  switch (cat) {
    case Category.YOUTH: return <Aperture />;
    case Category.VANGUARD: return <Grid />;
    case Category.WEB3: return <Box />;
    case Category.SPECIALIZED: return <Activity />;
    default: return <Zap />;
  }
};

// --- MAIN COMPONENT ---

const Card3D: React.FC<Card3DProps> = ({ card, isActive, transformStyle, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Pre-calculate deterministic random values for layout variation
  const seed = card.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const rng = pseudoRandom(seed);
  const uniqueRotation = (rng() * 10) - 5; // Slight rotation offset

  // Dynamic shadow calc
  const shadowValue = isHovered 
    ? `shadow-[0_30px_80px_-15px_rgba(0,0,0,0.9),0_0_50px_${getColorValue(card.colors.accent, 0.3)}]` 
    : '';

  return (
    <div
      className="absolute w-[320px] h-[480px] cursor-pointer select-none"
      style={transformStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* 3D FLOAT CONTAINER */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ y: -25, scale: 1.05, rotateX: 5 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={`
          relative w-full h-full liquid-glass overflow-hidden 
          transition-all duration-500 group
          ${shadowValue}
        `}
      >
        {/* --- LAYER 1: GENERATIVE ART CORE --- */}
        {/* Ensure screen blending works by having a dark base and not a solid cover */}
        <div className="absolute inset-0 z-0 mix-blend-screen scale-110">
          <VisualCore card={card} />
        </div>

        {/* --- LAYER 2: HOLOGRAPHIC NOISE & FOIL --- */}
        <div className="absolute inset-0 z-10 bg-noise mix-blend-overlay opacity-50" />
        <div className="absolute inset-0 z-10 holo-foil opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none" />
        
        {/* Shine Sweep Animation */}
        <div className="absolute inset-0 z-10 bg-gradient-to-tr from-transparent via-white/10 to-transparent skew-x-[-25deg] translate-x-[-200%] animate-shimmer-slide pointer-events-none mix-blend-soft-light" />

        {/* --- LAYER 3: CONTENT UI --- */}
        <div className="relative z-20 flex flex-col h-full p-7 justify-between font-sans text-white/90">
          
          {/* Header */}
          <div className="flex justify-between items-start transform translate-z-10">
             <div className="flex flex-col">
               <div className="flex items-center gap-2 mb-1">
                  <div className={`w-1.5 h-1.5 rounded-full ${card.colors.accent.replace('text-', 'bg-')} shadow-[0_0_8px_currentColor] animate-ping-slow`} />
                  <span className={`text-[10px] font-bold tracking-[0.2em] uppercase ${card.colors.accent} drop-shadow-md`}>
                    {card.category.split(' ')[0]}
                  </span>
               </div>
               <div className="text-[9px] text-slate-400 font-mono tracking-wider opacity-80">
                 ID: {card.id.toUpperCase().slice(0, 12)}
               </div>
             </div>
             
             {/* Icon Badge */}
             <div className={`
                w-12 h-12 rounded-2xl flex items-center justify-center
                bg-gradient-to-b from-white/5 to-black/40 border border-white/10
                backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]
                ${card.colors.accent}
                group-hover:scale-110 group-hover:rotate-3 transition-all duration-300
             `}>
               {React.cloneElement(getCategoryIcon(card.category), { size: 24, strokeWidth: 1.5 })}
             </div>
          </div>

          {/* Body Typography */}
          <div className="relative space-y-5 transform translate-z-20">
            <h2 className="text-[32px] font-black leading-[0.85] tracking-tight drop-shadow-2xl mix-blend-overlay bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/50">
              {card.title.replace('ZEN ', '')}
            </h2>
            
            {/* Animated Level Bar */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-1 h-2">
                {['Beginner', 'Intermediate', 'Advanced', 'Architect'].map((lvl, i) => {
                  const levels = ['Beginner', 'Intermediate', 'Advanced', 'Architect'];
                  const currentIdx = levels.indexOf(card.level);
                  const active = i <= currentIdx;
                  return (
                    <motion.div 
                      key={lvl} 
                      initial={{ opacity: 0.5, scaleY: 0.5 }}
                      animate={{ opacity: 1, scaleY: 1 }}
                      transition={{ delay: 0.1 * i }}
                      className={`h-full flex-1 rounded-sm transition-all duration-300 ${active ? card.colors.accent.replace('text-', 'bg-') + ' shadow-[0_0_10px_currentColor]' : 'bg-white/5'}`} 
                    />
                  );
                })}
              </div>
              <div className="flex justify-between text-[8px] uppercase text-slate-400 font-bold tracking-widest">
                <span>CLVL 0{['1', '2', '3', '4'][['Beginner', 'Intermediate', 'Advanced', 'Architect'].indexOf(card.level)]}</span>
                <span className={card.colors.accent}>{card.level}</span>
              </div>
            </div>
          </div>

          {/* Footer Metadata */}
          <div className="mt-auto space-y-3 pt-4 border-t border-white/10 relative transform translate-z-10">
            {/* Decorator Line */}
            <div className={`absolute top-[-1px] left-0 h-[1px] ${card.colors.accent.replace('text-', 'bg-')} w-1/3 shadow-[0_0_10px_currentColor]`} />

            <div className="grid grid-cols-2 gap-3">
               <div className="bg-black/30 backdrop-blur-md rounded-lg px-3 py-2 border border-white/5 group-hover:border-white/10 transition-colors">
                  <span className="text-[8px] text-slate-500 uppercase block mb-0.5">Verification</span>
                  <div className="flex items-center gap-1.5">
                    <Shield size={10} className="text-emerald-400" />
                    <span className="text-[10px] font-mono text-emerald-400 font-bold tracking-tight shadow-emerald-500/20">SECURE</span>
                  </div>
               </div>
               <div className="bg-black/30 backdrop-blur-md rounded-lg px-3 py-2 border border-white/5 group-hover:border-white/10 transition-colors">
                  <span className="text-[8px] text-slate-500 uppercase block mb-0.5">Yield Value</span>
                  <div className="flex items-center gap-1.5">
                    <Activity size={10} className={card.colors.accent} />
                    <span className={`text-[10px] font-mono font-bold ${card.colors.accent}`}>+{card.score} XP</span>
                  </div>
               </div>
            </div>

            <div className="flex justify-between items-center opacity-60 group-hover:opacity-100 transition-opacity">
               <div className="flex items-center gap-1.5">
                 <Database size={10} />
                 <span className="text-[9px] font-mono">{card.date}</span>
               </div>
               <div className="flex gap-1">
                 {[0,1,2].map(i => (
                   <div key={i} className={`w-1 h-1 rounded-full ${card.colors.accent.replace('text-', 'bg-')} opacity-50`} />
                 ))}
               </div>
            </div>
          </div>

        </div>

        {/* --- LAYER 4: THE PRISMATIC BORDER & GLOSS --- */}
        <div className="liquid-border opacity-60 mix-blend-overlay" />
        <div className={`absolute inset-0 border-2 ${card.colors.accent.replace('text-', 'border-')} opacity-0 group-hover:opacity-30 rounded-[24px] transition-opacity duration-300`} />
        
        {/* Top Gloss Reflection */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-white/50 shadow-[0_0_25px_white] opacity-50" />
      </motion.div>

      {/* --- HOVER POPOVER (Data Extraction View) --- */}
      <div 
        className={`
          absolute -right-12 top-20 w-72 pointer-events-none z-50
          transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
          ${isHovered ? 'opacity-100 translate-x-[100%] rotate-y-0 scale-100 blur-none' : 'opacity-0 translate-x-[60%] rotate-y-[-10deg] scale-95 blur-sm'}
        `}
        style={{ transformStyle: 'preserve-3d' }}
      >
         <div className="bg-zen-dark/90 backdrop-blur-2xl p-5 rounded-xl border border-white/10 shadow-2xl text-left relative overflow-hidden ring-1 ring-white/10">
            {/* Decorative corner */}
            <div className={`absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 ${card.colors.accent.replace('text-', 'border-')} opacity-50`} />
            
            <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
               <h4 className="text-[10px] font-bold text-white uppercase tracking-widest flex items-center gap-2">
                 <Radio size={12} className={card.colors.accent} />
                 Metadata Stream
               </h4>
               <div className={`px-1.5 py-0.5 rounded text-[8px] font-bold bg-white/10 text-white`}>
                 V.2.0
               </div>
            </div>
            
            <div className="space-y-4">
               <div>
                 <div className="text-[8px] text-slate-500 uppercase mb-1.5 font-mono flex items-center gap-1">
                   <Lock size={8} /> Immutable Hash
                 </div>
                 <div className="font-mono text-[10px] text-indigo-300 break-all leading-tight bg-black/40 p-2.5 rounded-lg border border-white/5 shadow-inner hover:bg-black/60 transition-colors">
                   {card.hash}
                 </div>
               </div>
               
               <div>
                 <div className="text-[8px] text-slate-500 uppercase mb-1.5 font-mono">Competencies</div>
                 <div className="flex flex-wrap gap-2">
                   {card.tags.map(t => (
                     <span key={t} className={`text-[10px] px-2.5 py-1 bg-${card.colors.accent.split('-')[1]}-500/10 ${card.colors.accent} rounded-md border border-${card.colors.accent.split('-')[1]}-500/20 shadow-sm`}>
                       {t}
                     </span>
                   ))}
                 </div>
               </div>
            </div>
         </div>
         
         {/* Connecting Line Animation */}
         <svg className="absolute top-12 -left-12 w-12 h-20 pointer-events-none overflow-visible">
            <motion.path 
              d="M 48 10 L 0 10" 
              fill="none" 
              stroke={getColorValue(card.colors.accent, 0.6)} 
              strokeWidth="1.5" 
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: isHovered ? 1 : 0, opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
            <motion.circle 
              cx="48" cy="10" r="3" 
              fill={getColorValue(card.colors.accent)} 
              initial={{ scale: 0 }}
              animate={{ scale: isHovered ? 1 : 0 }}
              transition={{ delay: 0.3 }}
            />
         </svg>
      </div>

    </div>
  );
};

export default Card3D;