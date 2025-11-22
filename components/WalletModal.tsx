import React from 'react';
import { X, Wallet } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { WalletState } from '../types';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (provider: WalletState['provider']) => void;
}

const WalletOption = ({ name, iconColor, onClick }: { name: string; iconColor: string; onClick: () => void }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-indigo-500/50 transition-all group"
  >
    <div className={`w-10 h-10 rounded-full ${iconColor} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
      <Wallet className="w-5 h-5 text-white" />
    </div>
    <span className="text-lg font-medium text-slate-200">{name}</span>
  </button>
);

const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose, onConnect }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-md glass-panel rounded-2xl p-6 shadow-2xl shadow-indigo-500/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-indigo-400">Connect</span> Wallet
              </h2>
              <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-3">
              <WalletOption 
                name="Phantom" 
                iconColor="bg-purple-600" 
                onClick={() => onConnect('Phantom')} 
              />
              <WalletOption 
                name="MetaMask" 
                iconColor="bg-orange-600" 
                onClick={() => onConnect('MetaMask')} 
              />
              <WalletOption 
                name="Coinbase Wallet" 
                iconColor="bg-blue-600" 
                onClick={() => onConnect('Coinbase')} 
              />
              <WalletOption 
                name="Here Wallet" 
                iconColor="bg-amber-500" 
                onClick={() => onConnect('Here')} 
              />
               <WalletOption 
                name="WalletConnect" 
                iconColor="bg-sky-500" 
                onClick={() => onConnect('WalletConnect')} 
              />
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 text-center">
              <p className="text-xs text-slate-500">
                By connecting, you agree to the Simulated Terms of Service.
                <br/>This is a demo; no real assets are moved.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WalletModal;
