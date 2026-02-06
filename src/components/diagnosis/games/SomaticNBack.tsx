'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Circle, Square, Triangle, Star, Diamond } from 'lucide-react';

interface SomaticNBackProps {
    onScore: (points: number) => void;
    onComplete: () => void;
}

const SYMBOLS = [Circle, Square, Triangle, Star, Diamond];
const N_BACK = 2;

export default function SomaticNBack({ onScore }: SomaticNBackProps) {
    const [sequence, setSequence] = useState<number[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [feedback, setFeedback] = useState<'hit' | 'miss' | 'false_alarm' | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    // Scoring state
    const lastActionIndex = useRef<number>(-1);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying) {
            interval = setInterval(() => {
                nextStep();
            }, 2000); // 2 seconds per symbol
        }
        return () => clearInterval(interval);
    }, [isPlaying, sequence, currentIndex]);

    const startGame = () => {
        // Generate initial sequence (longer than needed)
        const seq: number[] = [];
        for (let i = 0; i < 30; i++) {
            // 30% chance of being a match
            if (i >= N_BACK && Math.random() < 0.3) {
                seq.push(seq[i - N_BACK]);
            } else {
                seq.push(Math.floor(Math.random() * SYMBOLS.length));
            }
        }
        setSequence(seq);
        setCurrentIndex(0);
        setIsPlaying(true);
    };

    const nextStep = () => {
        setFeedback(null); // Clear feedback
        setCurrentIndex(prev => prev + 1);
    };

    const handlePress = () => {
        if (lastActionIndex.current === currentIndex) return; // Prevent double press
        lastActionIndex.current = currentIndex;

        const currentSymbol = sequence[currentIndex];
        const nBackSymbol = sequence[currentIndex - N_BACK];

        if (currentIndex >= N_BACK && currentSymbol === nBackSymbol) {
            // Hit!
            setFeedback('hit');
            onScore(15);
        } else {
            // False Alarm
            setFeedback('false_alarm');
            onScore(-5); // Penalty?
        }
    };

    // Check for "Miss" (User didn't press when they should have) logic is hard in real-time interval
    // We can check it when moving to next index: if previous was match and user didn't press.
    // But for MVP simplicity, we only reward Hits and penalize False Alarms immediately.

    const CurrentIcon = sequence.length > 0 ? SYMBOLS[sequence[currentIndex]] : Circle;

    return (
        <div className="flex flex-col items-center justify-center h-full gap-8 p-4">
            {!isPlaying ? (
                <div className="text-center max-w-lg">
                    <h3 className="text-2xl font-bold mb-6">2-Back Task (Working Memory)</h3>
                    <div className="bg-zinc-800/50 p-6 rounded-xl border border-white/5 text-left mb-8 space-y-4">
                        <p className="text-zinc-300">
                            これは「記憶の保持力」を試すテストです。
                        </p>
                        <ol className="list-decimal list-inside text-zinc-400 space-y-2">
                            <li>画面に図形が順番に表示されます（◯、△、□...）。</li>
                            <li>常に<strong>「2つ前の図形」</strong>を覚えておいてください。</li>
                            <li><span className="text-blue-400 font-bold">「今の図形」が「2つ前の図形」と同じ</span>場合にのみ、ボタンを押してください。</li>
                        </ol>
                        <div className="text-xs text-zinc-500 mt-4 pt-4 border-t border-white/5">
                            例： <br />
                            ◯ → △ → <span className="text-blue-400">◯（2つ前と同じ！押す）</span><br />
                            □ → ☆ → □（2つ前と同じ！押す）
                        </div>
                    </div>
                    <button
                        onClick={startGame}
                        className="px-8 py-3 bg-blue-600 rounded-full font-bold hover:bg-blue-500 transition-colors shadow-lg"
                    >
                        START
                    </button>
                </div>
            ) : (
                <>
                    <div className="relative w-40 h-40 flex items-center justify-center bg-zinc-800/50 rounded-2xl border border-white/10">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.2 }}
                                className="text-white"
                            >
                                {sequence[currentIndex] !== undefined && <CurrentIcon size={80} />}
                            </motion.div>
                        </AnimatePresence>

                        {/* Feedback Overlay */}
                        {feedback && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1.5 }}
                                className={`absolute inset-0 flex items-center justify-center font-bold text-xl ${feedback === 'hit' ? 'text-green-500' : 'text-red-500'
                                    }`}
                            >
                                {feedback === 'hit' ? 'GOOD!' : 'MISS!'}
                            </motion.div>
                        )}
                    </div>

                    <div className="h-2 w-full max-w-xs bg-zinc-800 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-blue-500"
                            initial={{ width: '0%' }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 2, ease: "linear", repeat: Infinity }}
                            key={currentIndex} // Reset on index change
                        />
                    </div>

                    <button
                        onClick={handlePress}
                        className="mt-4 w-48 h-48 rounded-full bg-zinc-800 border-4 border-zinc-600 hover:bg-zinc-700 hover:border-blue-500/50 active:scale-95 transition-all flex flex-col items-center justify-center gap-2 group"
                    >
                        <Zap size={40} className="text-zinc-500 group-hover:text-yellow-400 transition-colors" />
                        <span className="font-bold text-lg tracking-wider">MATCH!</span>
                    </button>
                </>
            )}
        </div>
    );
}
