import { ZenCard, AIInsight, Category } from '../types';

// Deterministic AI Logic Simulation
export const analyzeCredentials = (cards: ZenCard[]): AIInsight => {
  let literacyScore = 10; // Base
  let automationReadiness = 5;
  let web3Fluency = 0;

  cards.forEach(card => {
    if (card.category === Category.YOUTH) literacyScore += 15;
    if (card.category === Category.VANGUARD) {
      literacyScore += 10;
      automationReadiness += 15;
    }
    if (card.category === Category.WEB3) web3Fluency += 25;
    if (card.category === Category.SPECIALIZED) {
      literacyScore += 5;
      automationReadiness += 5;
    }
  });

  // Cap scores
  literacyScore = Math.min(100, literacyScore);
  automationReadiness = Math.min(100, automationReadiness);
  web3Fluency = Math.min(100, web3Fluency);

  let status: AIInsight['status'] = 'Education-Ready';
  if (automationReadiness > 60) status = 'Workforce-Ready';
  if (literacyScore > 80 && automationReadiness > 50) status = 'Trainer-Level';
  if (web3Fluency > 50 && literacyScore > 90) status = 'Architect';

  // Recommendation Logic
  let recommendation = "Start with the ZEN AI Pioneer Foundations to build a base.";
  
  const hasPioneer = cards.some(c => c.id.includes('pioneer'));
  const hasVanguard1 = cards.some(c => c.id === 'vanguard-1');
  const hasWeb3 = cards.some(c => c.category === Category.WEB3);

  if (hasPioneer && !hasVanguard1) {
    recommendation = "You have the basics. Move to Vanguard Mod 1 to apply this mindset professionally.";
  } else if (hasVanguard1 && automationReadiness < 40) {
    recommendation = "Time to build leverage. Enroll in Vanguard Mod 2: Automation.";
  } else if (automationReadiness > 60 && web3Fluency < 20) {
    recommendation = "Your automation skills are strong. secure your portfolio with Blockchain Literacy.";
  } else if (status === 'Architect') {
    recommendation = "You are operating at an Architect level. Consider the ZEN Educator Track to mentor others.";
  }

  // Narrative Generation
  const count = cards.length;
  const narrative = `The learner has established a verified portfolio of ${count} credentials. ` +
    (automationReadiness > 50 ? "They demonstrate strong capability in automated workflows and agentic systems. " : "They are building foundational literacy. ") +
    (web3Fluency > 20 ? "Notably, they possess on-chain identity verification skills, positioning them for the Web3 economy. " : "") +
    `Current trajectory suggests a strong fit for ${status.toLowerCase()} roles within the ZEN ecosystem.`;

  return {
    literacyScore,
    automationReadiness,
    web3Fluency,
    recommendation,
    narrative,
    status
  };
};
