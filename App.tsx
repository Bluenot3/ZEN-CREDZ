import React, { useState } from 'react';
import { Wallet, Layers, Plus, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

// Types & Constants
import { ZenCard, WalletState, Category } from './types';
import { INITIAL_CARDS } from './constants';

// Components
import WalletModal from './components/WalletModal';
import CardStack from './components/CardStack';
import AICoach from './components/AICoach';

// --- Internal Component: Orb Logo ---
const OrbLogo = () => {
  return (
    <div className="relative w-10 h-10 flex items-center justify-center" style={{ perspective: '200px' }}>
       {/* Core Glow */}
       <div className="absolute inset-0 bg-indigo-500/50 blur-xl rounded-full animate-pulse" />
       
       {/* Central Core */}
       <div className="absolute w-3 h-3 bg-white rounded-full shadow-[0_0_15px_white] z-10 animate-pulse-glow" />

       {/* Wireframe Rings */}
       <div className="absolute w-8 h-8 border border-cyan-300/60 rounded-full animate-orbit-x" style={{ transformStyle: 'preserve-3d' }} />
       <div className="absolute w-10 h-10 border border-indigo-400/50 rounded-full animate-orbit-y" style={{ transformStyle: 'preserve-3d' }} />
       <div className="absolute w-6 h-6 border border-violet-400/70 rounded-full animate-orbit-z" style={{ transformStyle: 'preserve-3d' }} />
       
       {/* Particle Sparkles around logo */}
       <motion.div 
         animate={{ rotate: 360 }} 
         transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
         className="absolute inset-0"
       >
          <div className="absolute top-0 left-1/2 w-0.5 h-0.5 bg-white rounded-full shadow-[0_0_4px_white]" />
       </motion.div>
    </div>
  );
};

// --- Zen Progress Readout Component (Internal) ---
const ZenProgressReadout = ({ currentScore, maxScore }: { currentScore: number, maxScore: number }) => {
    const progress = Math.min(100, (currentScore / maxScore) * 100);
    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    // Status Logic
    let status = "Education-Ready";
    if (currentScore > 30) status = "Workforce-Ready";
    if (currentScore > 80) status = "Trainer-Level";
    if (currentScore > 120) status = "Universal Operator";

    const progressColor = progress < 40 ? 'stroke-cyan-500' : progress < 80 ? 'stroke-indigo-500' : 'stroke-green-500';
    const textColor = progress < 40 ? 'text-cyan-400' : progress < 80 ? 'text-indigo-400' : 'text-green-400';

    return (
        <div className="relative flex flex-col items-center justify-center p-6 bg-zen-panel/50 backdrop-blur-xl rounded-2xl border border-white/10 shadow-xl z-20">
            <div className="relative mb-4">
                <svg width="140" height="140" className="-rotate-90">
                    <circle r={radius} cx="70" cy="70" fill="transparent" stroke="#1e293b" strokeWidth="8" />
                    <circle
                        r={radius}
                        cx="70"
                        cy="70"
                        fill="transparent"
                        className={`transition-all duration-1000 ${progressColor}`}
                        strokeWidth="8"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        style={{ filter: 'drop-shadow(0 0 6px currentColor)' }}
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-3xl font-bold ${textColor}`}>{Math.round(progress)}%</span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Complete</span>
                </div>
            </div>
            <div className="text-center">
                <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Trajectory Status</div>
                <div className="text-lg font-bold text-white holographic-text">{status}</div>
                <div className="text-xs font-mono text-slate-500 mt-1">{currentScore} / {maxScore} ZEN Points</div>
            </div>
        </div>
    );
};

// --- Main App ---

const generateAddress = (provider: string) => {
  if (provider === 'Phantom') return `8xP...${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
  return `0x${Math.random().toString(16).substring(2, 6).toUpperCase()}...${Math.random().toString(16).substring(2, 6).toUpperCase()}`;
};

const MAX_SCORE = INITIAL_CARDS.reduce((acc, card) => acc + (card.score || 0), 0);

const App = () => {
  // --- State ---
  const [wallet, setWallet] = useState<WalletState>({
    isConnected: false,
    provider: null,
    address: null,
    network: null,
  });
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [activeCards, setActiveCards] = useState<ZenCard[]>([]);
  const [minting, setMinting] = useState(false);

  // --- Handlers ---
  
  const handleConnect = (provider: WalletState['provider']) => {
    setWallet({
      isConnected: true,
      provider,
      address: generateAddress(provider || 'MetaMask'),
      network: provider === 'Phantom' ? 'Solana' : 'Ethereum',
    });
    setIsWalletModalOpen(false);
  };

  const toggleCard = (card: ZenCard) => {
    const exists = activeCards.find(c => c.id === card.id);
    if (exists) {
      setActiveCards(prev => prev.filter(c => c.id !== card.id));
    } else {
      // Sort by date to keep timeline logical
      setActiveCards(prev => [...prev, card].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
    }
  };

  const simulateMint = () => {
    if (!wallet.isConnected) {
      setIsWalletModalOpen(true);
      return;
    }
    const available = INITIAL_CARDS.find(c => !activeCards.find(ac => ac.id === c.id));
    if (available) {
      setMinting(true);
      setTimeout(() => {
        toggleCard(available);
        setMinting(false);
      }, 800);
    } else {
      alert("All credentials minted!");
    }
  };

  const currentScore = activeCards.reduce((acc, card) => acc + (card.score || 0), 0);

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-200 overflow-hidden relative">
      
      {/* Background Grain */}
      <div className="absolute inset-0 pointer-events-none opacity-5 bg-noise" />

      {/* --- Header --- */}
      <header className="h-16 border-b border-white/10 glass-panel flex items-center justify-between px-6 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <OrbLogo />
          <div>
            <h1 className="font-bold text-lg tracking-wide">ZEN <span className="text-indigo-400 font-light">Credz</span></h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {wallet.isConnected ? (
            <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10">
               <div className={`w-2 h-2 rounded-full ${wallet.network === 'Solana' ? 'bg-purple-500' : 'bg-green-500'} animate-pulse`}></div>
               <span className="text-xs font-mono text-indigo-200">{wallet.address}</span>
            </div>
          ) : (
            <button 
              onClick={() => setIsWalletModalOpen(true)}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-full text-sm font-medium transition-all shadow-lg shadow-indigo-600/20"
            >
              <Wallet size={16} />
              Connect Wallet
            </button>
          )}
        </div>
      </header>

      {/* --- Main Grid --- */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden relative">
        
        {/* LEFT: Controls */}
        <aside className="hidden lg:flex lg:col-span-3 xl:col-span-2 border-r border-white/10 flex-col bg-zen-panel/40 backdrop-blur-md p-6 overflow-y-auto custom-scrollbar z-20">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
            <Layers size={14} /> Credential Database
          </h2>
          <div className="space-y-6">
            {Object.values(Category).map(cat => (
              <div key={cat}>
                <h3 className="text-[10px] text-indigo-400 mb-2 font-bold uppercase opacity-80">{cat}</h3>
                <div className="space-y-1 border-l border-white/10 pl-2">
                  {INITIAL_CARDS.filter(c => c.category === cat).map(card => {
                    const isActive = activeCards.find(c => c.id === card.id);
                    return (
                      <button
                        key={card.id}
                        onClick={() => toggleCard(card)}
                        className={`w-full text-left text-xs py-2 px-3 rounded-md transition-all flex items-center justify-between ${
                          isActive 
                            ? 'bg-indigo-500/20 text-indigo-100 border border-indigo-500/30 shadow-[0_0_10px_rgba(99,102,241,0.1)]' 
                            : 'text-slate-500 hover:text-slate-300 hover:bg-white/5 border border-transparent'
                        }`}
                      >
                        <span className="truncate pr-2">{card.title.replace('ZEN ', '')}</span>
                        {isActive && <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_5px_currentColor]" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-auto pt-6">
             <button
               onClick={simulateMint}
               disabled={minting}
               className="w-full py-3 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl font-bold text-sm text-white shadow-lg shadow-indigo-900/40 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 group relative overflow-hidden"
             >
               <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:250%_250%,100%_100%] bg-[position:-100%_0,0_0] bg-no-repeat transition-[background-position_0s] hover:bg-[position:200%_0,0_0] duration-[1500ms]" />
               {minting ? <span className="animate-pulse">Minting...</span> : <><Plus size={16} /> Simulate Mint</>}
             </button>
          </div>
        </aside>

        {/* CENTER: 3D Stage */}
        <section className="col-span-1 lg:col-span-6 xl:col-span-7 relative flex flex-col items-center justify-between py-8 perspective-2000 overflow-hidden bg-gradient-to-b from-zen-dark/50 to-zen-panel/50">
          
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/5 rounded-full blur-[120px]" />
             <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />
          </div>

          {/* Top: Empty State or Helper */}
          <div className="relative z-10 h-12 flex items-center">
             {activeCards.length === 0 && (
               <div className="flex items-center gap-2 text-amber-400/60 bg-amber-900/20 px-4 py-2 rounded-full border border-amber-500/20">
                 <AlertCircle size={14} />
                 <span className="text-xs tracking-wide uppercase">System Empty: Connect Wallet & Select Programs</span>
               </div>
             )}
          </div>

          {/* Middle: 3D Stack */}
          <div className="relative w-full flex-1 flex items-center justify-center z-30">
            <CardStack activeCards={activeCards} onCardClick={(c) => console.log(c)} />
          </div>

          {/* Bottom: Progress Ring */}
          <div className="relative z-20 mt-[-40px]">
            <ZenProgressReadout currentScore={currentScore} maxScore={MAX_SCORE} />
          </div>

        </section>

        {/* RIGHT: AI Coach */}
        <aside className="hidden lg:block lg:col-span-3 border-l border-white/10 bg-zen-panel/40 backdrop-blur-md z-20">
          <AICoach activeCards={activeCards} />
        </aside>

      </main>

      {/* --- Timeline Bar --- */}
      <footer className="h-14 bg-black/40 border-t border-white/10 flex items-center px-4 z-40 overflow-x-auto custom-scrollbar backdrop-blur-lg">
         <div className="flex items-center gap-8 min-w-max mx-auto">
            {activeCards.map((card, i) => (
              <div key={card.id} className="relative group cursor-pointer opacity-60 hover:opacity-100 transition-opacity">
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-2 h-2 rounded-full ${card.colors.accent.replace('text-', 'bg-')} shadow-[0_0_8px_currentColor]`}></div>
                  <div className="text-[9px] text-slate-500 font-mono uppercase">{card.date}</div>
                </div>
                {/* Connector Line */}
                {i < activeCards.length - 1 && (
                  <div className="absolute top-1 left-3 w-[calc(100%+24px)] h-[1px] bg-white/10" />
                )}
              </div>
            ))}
            {activeCards.length === 0 && <span className="text-[10px] text-slate-600 uppercase tracking-widest">Timeline Initializing...</span>}
         </div>
      </footer>

      <WalletModal 
        isOpen={isWalletModalOpen} 
        onClose={() => setIsWalletModalOpen(false)} 
        onConnect={handleConnect} 
      />

    </div>
  );
};

export default App;