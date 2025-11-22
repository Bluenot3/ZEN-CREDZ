export enum Category {
  YOUTH = 'Youth / Pioneer',
  VANGUARD = 'Vanguard / Adult',
  WEB3 = 'Web3 & Blockchain',
  SPECIALIZED = 'Specialized Programs',
}

export interface ZenCard {
  id: string;
  title: string;
  category: Category;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Architect';
  tags: string[];
  description: string;
  date: string; // Simulated date
  hash: string; // Simulated tx hash
  score: number; // ZEN Score
  colors: {
    gradient: string; // Main background gradient class
    accent: string;   // Text accent color
    border: string;   // Border highlight color
    glow: string;     // Shadow glow color
  };
}

export interface WalletState {
  isConnected: boolean;
  provider: 'Phantom' | 'MetaMask' | 'Coinbase' | 'Here' | 'WalletConnect' | null;
  address: string | null;
  network: 'Solana' | 'Ethereum' | 'Base' | 'NEAR' | null;
}

export interface AIInsight {
  literacyScore: number;
  automationReadiness: number;
  web3Fluency: number;
  recommendation: string;
  narrative: string;
  status: 'Education-Ready' | 'Workforce-Ready' | 'Trainer-Level' | 'Architect';
}