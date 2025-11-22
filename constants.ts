import { ZenCard, Category } from './types';

export const INITIAL_CARDS: ZenCard[] = [
  {
    id: 'pioneer-1',
    title: 'ZEN AI Pioneer – Foundations',
    category: Category.YOUTH,
    level: 'Beginner',
    tags: ['Promptcraft', 'Ethics', 'LLM Basics'],
    description: 'Foundational certification for young learners understanding Large Language Models.',
    date: '2023-09-15',
    hash: '0x7a...3f19',
    score: 15,
    colors: { 
      gradient: 'from-cyan-400/30 via-teal-300/10 to-blue-500/20', 
      accent: 'text-cyan-300', 
      border: 'border-cyan-400',
      glow: 'shadow-cyan-500/50' 
    }
  },
  {
    id: 'pioneer-2',
    title: 'ZEN AI Pioneer – Agents',
    category: Category.YOUTH,
    level: 'Intermediate',
    tags: ['Hugging Face', 'Agents', 'Python Basics'],
    description: 'Building and deploying first AI agents using open source tools.',
    date: '2023-11-20',
    hash: '0x8b...9c22',
    score: 20,
    colors: { 
      gradient: 'from-sky-400/30 via-blue-400/10 to-indigo-500/20', 
      accent: 'text-sky-300', 
      border: 'border-sky-400',
      glow: 'shadow-sky-500/50' 
    }
  },
  {
    id: 'vanguard-1',
    title: 'ZEN Vanguard – Mod 1: Mindset',
    category: Category.VANGUARD,
    level: 'Beginner',
    tags: ['AI Strategy', 'Critical Thinking', 'Tools'],
    description: 'Adult track module covering the shift from manual to AI-assisted mindset.',
    date: '2024-01-10',
    hash: '0x1d...4e55',
    score: 20,
    colors: { 
      gradient: 'from-violet-500/30 via-fuchsia-400/10 to-purple-500/20', 
      accent: 'text-violet-300', 
      border: 'border-violet-400',
      glow: 'shadow-violet-500/50' 
    }
  },
  {
    id: 'vanguard-2',
    title: 'ZEN Vanguard – Mod 2: Automation',
    category: Category.VANGUARD,
    level: 'Intermediate',
    tags: ['Workflows', 'Zapier/Make', 'Efficiency'],
    description: 'Designing automated loops for business operations.',
    date: '2024-02-28',
    hash: '0x9a...1b33',
    score: 25,
    colors: { 
      gradient: 'from-fuchsia-500/30 via-pink-400/10 to-rose-500/20', 
      accent: 'text-fuchsia-300', 
      border: 'border-fuchsia-400',
      glow: 'shadow-fuchsia-500/50' 
    }
  },
  {
    id: 'vanguard-3',
    title: 'ZEN Vanguard – Mod 3: AgentOps',
    category: Category.VANGUARD,
    level: 'Advanced',
    tags: ['Multi-Agent Systems', 'Dashboards', 'Monitoring'],
    description: 'Orchestrating complex agent swarms for enterprise tasks.',
    date: '2024-04-15',
    hash: '0x4f...2d99',
    score: 30,
    colors: { 
      gradient: 'from-indigo-500/30 via-purple-500/10 to-violet-600/20', 
      accent: 'text-indigo-300', 
      border: 'border-indigo-400',
      glow: 'shadow-indigo-500/50' 
    }
  },
  {
    id: 'vanguard-4',
    title: 'ZEN Vanguard – Mod 4: Policy',
    category: Category.VANGUARD,
    level: 'Architect',
    tags: ['Governance', 'Compliance', 'Safety'],
    description: 'Establishing AI usage policies and ethical guardrails.',
    date: '2024-05-30',
    hash: '0x3c...8a11',
    score: 35,
    colors: { 
      gradient: 'from-slate-600/40 via-gray-500/20 to-zinc-500/30', 
      accent: 'text-slate-200', 
      border: 'border-slate-400',
      glow: 'shadow-slate-500/50' 
    }
  },
  {
    id: 'web3-1',
    title: 'ZEN Blockchain – On-Chain Identity',
    category: Category.WEB3,
    level: 'Intermediate',
    tags: ['Wallets', 'DID', 'Security'],
    description: 'Managing self-sovereign identity and credential wallets.',
    date: '2024-03-10',
    hash: '0xSol...9912',
    score: 15,
    colors: { 
      gradient: 'from-pink-500/30 via-rose-400/10 to-orange-500/20', 
      accent: 'text-pink-300', 
      border: 'border-pink-400',
      glow: 'shadow-pink-500/50' 
    }
  },
  {
    id: 'web3-2',
    title: 'ZEN Cards – Verifiable Badges',
    category: Category.WEB3,
    level: 'Advanced',
    tags: ['NFTs', 'Soulbound', 'Metadata'],
    description: 'Technical competency in issuing and verifying on-chain credentials.',
    date: '2024-06-01',
    hash: '0xEth...1122',
    score: 25,
    colors: { 
      gradient: 'from-purple-600/30 via-fuchsia-500/10 to-indigo-600/20', 
      accent: 'text-purple-300', 
      border: 'border-purple-400',
      glow: 'shadow-purple-500/50' 
    }
  },
  {
    id: 'spec-1',
    title: 'ZEN Homeschool Kit',
    category: Category.SPECIALIZED,
    level: 'Beginner',
    tags: ['Education', 'Curriculum', 'Family'],
    description: 'AI-enhanced learning pathways for home education.',
    date: '2023-12-05',
    hash: '0xEdu...5543',
    score: 10,
    colors: { 
      gradient: 'from-emerald-400/30 via-green-300/10 to-teal-500/20', 
      accent: 'text-emerald-300', 
      border: 'border-emerald-400',
      glow: 'shadow-emerald-500/50' 
    }
  },
  {
    id: 'spec-2',
    title: 'ZEN AI Arena – Evaluation',
    category: Category.SPECIALIZED,
    level: 'Advanced',
    tags: ['Benchmarks', 'Red Teaming', 'Model Logic'],
    description: 'Participating in competitive model evaluation and refinement.',
    date: '2024-07-20',
    hash: '0xArena...881',
    score: 30,
    colors: { 
      gradient: 'from-orange-500/30 via-amber-400/10 to-red-500/20', 
      accent: 'text-orange-300', 
      border: 'border-orange-400',
      glow: 'shadow-orange-500/50' 
    }
  },
  {
    id: 'spec-3',
    title: 'ZEN Educator Track',
    category: Category.SPECIALIZED,
    level: 'Architect',
    tags: ['Train-the-Trainer', 'Pedagogy', 'Mentorship'],
    description: 'Certified to teach ZEN curriculum to others.',
    date: '2024-08-15',
    hash: '0xTeach...001',
    score: 40,
    colors: { 
      gradient: 'from-yellow-400/30 via-amber-300/10 to-orange-500/20', 
      accent: 'text-yellow-200', 
      border: 'border-yellow-400',
      glow: 'shadow-yellow-500/50' 
    }
  },
  {
    id: 'spec-4',
    title: 'ZEN Workforce – HR Ops',
    category: Category.SPECIALIZED,
    level: 'Advanced',
    tags: ['HR', 'Recruiting', 'Automation'],
    description: 'Streamlining human resources with ethical AI tools.',
    date: '2024-09-01',
    hash: '0xWork...221',
    score: 25,
    colors: { 
      gradient: 'from-blue-500/30 via-sky-400/10 to-indigo-600/20', 
      accent: 'text-sky-300', 
      border: 'border-sky-400',
      glow: 'shadow-sky-500/50' 
    }
  }
];