import { create } from 'zustand';

export type CognitiveType = 'visual' | 'auditory' | 'language' | 'somatic' | 'wm' | 'logic';

export interface Scores {
  visual: number;
  auditory: number;
  language: number;
  somatic: number; // Includes trial & error / motor
  wm: number;
  logic: number;
}

interface UserState {
  name: string;
  setName: (name: string) => void;
  
  // Phase 1: Preference (Self-Image)
  selfScores: Scores;
  setSelfScore: (type: keyof Scores, value: number) => void;
  resetSelfScores: () => void;
  
  // Phase 2: Performance (Real Ability)
  realScores: Scores;
  setRealScore: (type: keyof Scores, value: number) => void;
  resetRealScores: () => void;
  
  // App State
  currentPhase: 'intro' | 'chat' | 'games' | 'results' | 'dashboard';
  setPhase: (phase: 'intro' | 'chat' | 'games' | 'results' | 'dashboard') => void;
}

const initialScores: Scores = {
  visual: 0,
  auditory: 0,
  language: 0,
  somatic: 0,
  wm: 0,
  logic: 0,
};

export const useStore = create<UserState>((set) => ({
  name: '',
  setName: (name) => set({ name }),
  
  selfScores: { ...initialScores },
  setSelfScore: (type, value) => 
    set((state) => ({ selfScores: { ...state.selfScores, [type]: value } })),
  resetSelfScores: () => set({ selfScores: { ...initialScores } }),
  
  realScores: { ...initialScores },
  setRealScore: (type, value) => 
    set((state) => ({ realScores: { ...state.realScores, [type]: value } })),
  resetRealScores: () => set({ realScores: { ...initialScores } }),
  
  currentPhase: 'intro',
  setPhase: (phase) => set({ currentPhase: phase }),
}));
