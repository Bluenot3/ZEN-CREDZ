import React, { useState, useEffect } from 'react';
import { ZenCard, AIInsight } from '../types';
import { analyzeCredentials } from '../services/aiService';
import { Bot, Sparkles, ChevronRight, BarChart2, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

interface AICoachProps {
  activeCards: ZenCard[];
}

const AICoach: React.FC<AICoachProps> = ({ activeCards }) => {
  const [insight, setInsight] = useState<AIInsight | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'stats'>('chat');

  const handleAnalyze = () => {
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setInsight(analyzeCredentials(activeCards));
      setLoading(false);
    }, 1200);
  };

  // Auto-update stats when cards change if already analyzed
  useEffect(() => {
    if (insight) {
      setInsight(analyzeCredentials(activeCards));
    }
  }, [activeCards]);

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-400/30">
            <Bot className="text-indigo-300 w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-white">ZEN AI Coach</h3>
            <p className="text-xs text-indigo-300 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Online • Analyzing Stack
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
        {!insight && !loading && (
          <div className="text-center py-10 opacity-60">
            <Sparkles className="w-12 h-12 mx-auto mb-4 text-indigo-400" />
            <p className="text-sm">Initialize analysis to get personalized guidance based on your card stack.</p>
            <button 
              onClick={handleAnalyze}
              className="mt-6 px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-medium transition-all shadow-lg shadow-indigo-900/50"
            >
              Analyze My Credentials
            </button>
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center py-10 space-y-4">
             <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full border-t-2 border-indigo-500 animate-spin"></div>
                <div className="absolute inset-2 rounded-full border-r-2 border-purple-500 animate-spin animation-delay-150"></div>
             </div>
             <p className="text-xs font-mono text-indigo-300 animate-pulse">READING ON-CHAIN METADATA...</p>
          </div>
        )}

        {insight && !loading && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Quick Status */}
            <div className="glass-panel p-4 rounded-xl border-l-4 border-l-indigo-500">
              <h4 className="text-xs uppercase tracking-wider text-slate-400 mb-1">Current Status</h4>
              <p className="text-xl font-bold holographic-text">{insight.status}</p>
            </div>

            {/* Chat Bubble - Recommendation */}
            <div className="flex gap-3">
              <div className="w-8 h-8 flex-shrink-0 rounded-full bg-indigo-500/20 flex items-center justify-center">
                <Bot size={16} className="text-indigo-300" />
              </div>
              <div className="bg-white/5 p-3 rounded-r-xl rounded-bl-xl text-sm text-slate-200 border border-white/10">
                <p className="font-bold text-indigo-300 mb-1">Recommendation:</p>
                {insight.recommendation}
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-2">
              <MetricTile label="Literacy" value={insight.literacyScore} color="bg-cyan-500" />
              <MetricTile label="AutoOps" value={insight.automationReadiness} color="bg-violet-500" />
              <MetricTile label="Web3" value={insight.web3Fluency} color="bg-fuchsia-500" />
            </div>

            {/* Narrative Generator */}
            <div className="glass-panel p-4 rounded-xl">
               <div className="flex items-center gap-2 mb-3 text-slate-300">
                 <FileText size={16} />
                 <span className="font-bold text-sm">Portfolio Narrative</span>
               </div>
               <p className="text-xs text-slate-400 leading-relaxed italic border-l-2 border-white/20 pl-3">
                 "{insight.narrative}"
               </p>
               <button className="mt-3 text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                 Copy for LinkedIn <ChevronRight size={12} />
               </button>
            </div>

          </motion.div>
        )}
      </div>
    </div>
  );
};

const MetricTile = ({ label, value, color }: { label: string, value: number, color: string }) => (
  <div className="bg-black/20 p-2 rounded-lg text-center border border-white/5">
    <div className="text-[10px] uppercase text-slate-500 mb-1">{label}</div>
    <div className="text-lg font-bold text-white">{value}%</div>
    <div className="w-full h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        className={`h-full ${color}`} 
      />
    </div>
  </div>
);

export default AICoach;
