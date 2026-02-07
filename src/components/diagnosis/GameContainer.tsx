'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore, CognitiveType } from '@/store/useStore';
import { Timer, ArrowRight, BrainCircuit } from 'lucide-react';
import Visual3D from '@/components/diagnosis/games/Visual3D';
import Auditory from '@/components/diagnosis/games/Auditory';
import LanguageLogic from '@/components/diagnosis/games/LanguageLogic';
import SomaticNBack from '@/components/diagnosis/games/SomaticNBack';

const GAMES = [
    { id: 'visual_3d', types: ['visual'], label: 'メンタル・ローテーション', Component: Visual3D, duration: 45 },
    { id: 'auditory_1', types: ['auditory'], label: 'ブラインド・リスニング', Component: Auditory, duration: 60 },
    { id: 'language_1', types: ['language', 'logic'], label: '定義仕分けパズル', Component: LanguageLogic, duration: 45 },
    { id: 'wm_1', types: ['wm', 'somatic'], label: 'Nバック課題', Component: SomaticNBack, duration: 45 },
];

export default function GameContainer() {
    const { setRealScore, setPhase } = useStore();
    const [currentGameIndex, setCurrentGameIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const [showIntro, setShowIntro] = useState(true);

    // Accumulate score for current game session locally before committing to store
    const currentSessionScore = useRef(0);

    const currentGame = GAMES[currentGameIndex];

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isPlaying && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (isPlaying && timeLeft === 0) {
            finishGame(); // Time's up
        }
        return () => clearInterval(timer);
    }, [isPlaying, timeLeft]);

    const startGame = () => {
        setShowIntro(false);
        currentSessionScore.current = 0; // Reset session score
        setTimeLeft(currentGame.duration);
        setIsPlaying(true);
    };

    const addScore = (points: number) => {
        currentSessionScore.current += points;
    };

    const finishGame = () => {
        setIsPlaying(false);
        // Commit score to Global Store for ALL types this game covers
        currentGame.types.forEach(type => {
            const currentGlobalScore = useStore.getState().realScores[type as CognitiveType];
            setRealScore(type as CognitiveType, currentGlobalScore + currentSessionScore.current);
        });

        // Transition
        setTimeout(() => {
            if (currentGameIndex < GAMES.length - 1) {
                setCurrentGameIndex((prev) => prev + 1);
                setShowIntro(true);
            } else {
                setPhase('results');
            }
        }, 1000);
    };

    return (
        <div className="w-full max-w-4xl mx-auto min-h-[600px] bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden relative shadow-2xl">
            {/* Header / HUD */}
            <div className="absolute top-0 left-0 right-0 p-4 border-b border-white/5 flex justify-between items-center z-20 bg-black/50">
                <div className="flex items-center gap-3">
                    <BrainCircuit className="text-blue-400" />
                    <span className="font-mono text-sm tracking-wider text-zinc-300">
                        TEST {currentGameIndex + 1}/{GAMES.length}: {currentGame.label.toUpperCase()}
                    </span>
                </div>
                <div className={`flex items-center gap-2 font-mono text-xl font-bold ${timeLeft < 10 ? 'text-red-500 animate-pulse' : 'text-zinc-200'}`}>
                    <Timer size={20} />
                    {timeLeft}s
                </div>
            </div>

            <AnimatePresence mode="wait">
                {showIntro ? (
                    <motion.div
                        key="intro"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-black/80 z-30"
                    >
                        <h2 className="text-3xl font-bold mb-4 text-white">{currentGame.label}</h2>
                        <p className="text-zinc-400 mb-8 max-w-md">
                            このテストは {currentGame.duration} 秒間で行われます。<br />
                            準備が整ったら開始してください。
                        </p>
                        <button
                            onClick={startGame}
                            className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                        >
                            START <ArrowRight size={20} />
                        </button>
                    </motion.div>
                ) : (
                    <motion.div
                        key="game"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full h-full pt-16"
                    >
                        {/* Inject addScore and onComplete (optional finish early) */}
                        <currentGame.Component onScore={addScore} onComplete={finishGame} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
