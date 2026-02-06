'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

interface Visual3DProps {
    onScore: (points: number) => void;
    onComplete: () => void;
}

// Simple representation of blocks: multiple cubes in 3D space
type Shape = [number, number, number][];

const SHAPES: Shape[] = [
    // L-shape
    [[0, 0, 0], [1, 0, 0], [2, 0, 0], [0, 1, 0]],
    // T-shape
    [[0, 0, 0], [1, 0, 0], [2, 0, 0], [1, 1, 0]],
    // S-shape (3D)
    [[0, 0, 0], [1, 0, 0], [1, 1, 0], [2, 1, 0]],
    // Block
    [[0, 0, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0]],
];

// Helper to render a single shape
const BlockShape = ({ shape, rotation = [0, 0, 0], scale = 1 }: { shape: Shape, rotation?: [number, number, number], scale?: number }) => {
    return (
        <div className="relative w-32 h-32 preserve-3d" style={{ perspective: '800px' }}>
            <div
                className="absolute inset-0 w-full h-full preserve-3d transition-transform duration-500 ease-out"
                style={{
                    transform: `rotateX(${rotation[0]}deg) rotateY(${rotation[1]}deg) rotateZ(${rotation[2]}deg) scale(${scale})`
                }}
            >
                {shape.map((pos, idx) => (
                    <div
                        key={idx}
                        className="absolute w-10 h-10 border border-white/20 bg-blue-500/80 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                        style={{
                            transform: `translate3d(${pos[0] * 40 - 20}px, ${pos[1] * -40 + 20}px, ${pos[2] * 40}px)`,
                        }}
                    >
                        {/* Cube faces for 3D effect */}
                        <div className="absolute inset-0 bg-blue-400/30 translate-z-5" />
                        <div className="absolute inset-0 bg-blue-600/30 -translate-z-5" />
                        <div className="absolute inset-0 bg-blue-500/30 rotate-y-90" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default function Visual3D({ onScore }: Visual3DProps) {
    const [currentLevel, setCurrentLevel] = useState(0);
    const [score, setScore] = useState(0); // Display only
    const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

    const currentShape = SHAPES[currentLevel % SHAPES.length];
    const foilShape = SHAPES[(currentLevel + 1) % SHAPES.length];

    const handleAnswer = (isCorrect: boolean) => {
        if (isCorrect) {
            setScore(s => s + 10);
            onScore(10);
            setFeedback('correct');
        } else {
            setFeedback('wrong');
        }

        setTimeout(() => {
            setFeedback(null);
            setCurrentLevel(prev => prev + 1);
        }, 500);
    };

    return (
        <div className="flex flex-col items-center h-full gap-8">
            <div className="flex flex-col items-center">
                <h3 className="text-zinc-400 mb-4 tracking-widest text-sm">TARGET</h3>
                <div className="p-8 bg-zinc-900/50 rounded-2xl border border-white/5">
                    <BlockShape shape={currentShape} rotation={[20, 20, 0]} />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-8 w-full max-w-2xl px-4">
                {/* Option A (Correct for this mock) */}
                <button
                    onClick={() => handleAnswer(true)}
                    className="flex flex-col items-center p-6 bg-zinc-800/30 hover:bg-zinc-800 rounded-xl border border-white/10 transition-all group"
                >
                    <span className="mb-4 text-zinc-500 font-bold group-hover:text-blue-400">OPTION A</span>
                    <BlockShape shape={currentShape} rotation={[110, -20, 0]} />
                </button>

                {/* Option B (Foil) */}
                <button
                    onClick={() => handleAnswer(false)}
                    className="flex flex-col items-center p-6 bg-zinc-800/30 hover:bg-zinc-800 rounded-xl border border-white/10 transition-all group"
                >
                    <span className="mb-4 text-zinc-500 font-bold group-hover:text-red-400">OPTION B</span>
                    <BlockShape shape={foilShape} rotation={[45, 45, 120]} />
                </button>
            </div>

            {feedback && (
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    className={`absolute inset-0 flex items-center justify-center bg-black/40 z-50 pointer-events-none`}
                >
                    {feedback === 'correct' ? (
                        <Check className="text-green-500 w-32 h-32 drop-shadow-[0_0_20px_rgba(34,197,94,0.8)]" />
                    ) : (
                        <X className="text-red-500 w-32 h-32 drop-shadow-[0_0_20px_rgba(239,68,68,0.8)]" />
                    )}
                </motion.div>
            )}

            <div className="absolute bottom-4 right-4 font-mono text-zinc-500">
                SCORE: {score}
            </div>
        </div>
    );
}
