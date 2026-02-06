'use client';

import { useStore } from '@/store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import ChatInterface from '@/components/diagnosis/ChatInterface';
import GameContainer from '@/components/diagnosis/GameContainer';
import ResultsView from '@/components/results/ResultsView';
import ToolsDashboard from '@/components/dashboard/ToolsDashboard';

export default function Home() {
  const { currentPhase, setPhase } = useStore();

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0a0a12] to-black text-white p-4">
      <AnimatePresence mode="wait">
        {currentPhase === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-blue-500/20 blur-3xl rounded-full" />
              <h1 className="relative text-6xl md:text-8xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-white via-zinc-200 to-zinc-500">
                Cognitive<br />Marble
              </h1>
            </div>

            <p className="text-zinc-400 max-w-md text-lg leading-relaxed">
              あなたの「思い込み」と「脳の真の実力」の<br />
              <span className="text-blue-400">ズレ</span>を可視化する。<br />
              自分だけの脳の取扱説明書を手に入れよう。
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setPhase('chat')}
              className="px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-zinc-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
              診断を開始する
            </motion.button>
          </motion.div>
        )}

        {currentPhase === 'chat' && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="h-full"
          >
            <ChatInterface />
          </motion.div>
        )}

        {currentPhase === 'games' && (
          <motion.div
            key="games"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center min-h-[80vh]"
          >
            <GameContainer />
          </motion.div>
        )}

        {currentPhase === 'results' && (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full"
          >
            <ResultsView />
          </motion.div>
        )}

        {currentPhase === 'dashboard' && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full"
          >
            <ToolsDashboard />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
