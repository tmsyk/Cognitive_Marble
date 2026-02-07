'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Mic, Play, Ear } from 'lucide-react';

interface AuditoryProps {
    onScore: (points: number) => void;
    onComplete: () => void;
}

export default function Auditory({ onScore }: AuditoryProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [sequence, setSequence] = useState<string>('');
    const [input, setInput] = useState('');
    const [level, setLevel] = useState(1);
    const [status, setStatus] = useState<'idle' | 'playing' | 'answering' | 'feedback'>('idle');
    const [feedback, setFeedback] = useState<'success' | 'failure' | null>(null);

    const generateSequence = (length: number) => {
        let seq = '';
        for (let i = 0; i < length; i++) {
            seq += Math.floor(Math.random() * 10).toString();
        }
        return seq;
    };

    const playSequence = (seq: string) => {
        setStatus('playing');
        const u = new SpeechSynthesisUtterance();
        u.text = seq.split('').join('、'); // Reading digits
        u.lang = 'ja-JP';
        u.rate = 1.0; // Slightly faster
        u.onend = () => {
            setStatus('answering');
        };
        window.speechSynthesis.speak(u);
    };

    const handleStart = () => {
        const seq = generateSequence(3 + level);
        setSequence(seq);
        setInput('');
        playSequence(seq);
    };

    const handleSubmit = () => {
        if (input === sequence) {
            setFeedback('success');
            onScore(20); // Linear scoring: 20 points per level

            setTimeout(() => {
                setFeedback(null);
                setLevel(prev => prev + 1);
                handleStart();
            }, 1000);
        } else {
            setFeedback('failure');
            setTimeout(() => {
                setFeedback(null);
                handleStart(); // Retry same level
            }, 1000);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-full gap-8 p-4">
            {status === 'idle' && (
                <button
                    onClick={handleStart}
                    className="p-8 rounded-full bg-blue-600 hover:bg-blue-500 transition-all shadow-[0_0_30px_rgba(37,99,235,0.5)]"
                >
                    <Play size={48} fill="white" />
                </button>
            )}

            {status === 'playing' && (
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="flex flex-col items-center"
                >
                    <div className="w-32 h-32 rounded-full bg-zinc-800 flex items-center justify-center relative">
                        <Volume2 size={48} className="text-zinc-500" />
                        <motion.div
                            className="absolute inset-0 border-4 border-blue-500 rounded-full"
                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                        />
                    </div>
                    <p className="mt-8 text-xl font-bold text-zinc-400">Listening...</p>
                    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
                        <Ear className="text-zinc-700 animate-pulse w-20 h-20" />
                    </div>
                </motion.div>
            )}

            {status === 'answering' && (
                <div className="flex flex-col items-center gap-6 w-full max-w-sm">
                    <p className="text-zinc-400">聞こえた数字を入力してください</p>
                    <input
                        type="text"
                        inputMode="numeric"
                        pattern="\d*"
                        value={input}
                        onChange={(e) => {
                            // Convert full-width to half-width and filter non-digits
                            const val = e.target.value.replace(/[０-９]/g, (s) => {
                                return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
                            }).replace(/[^0-9]/g, '');
                            setInput(val);
                        }}
                        className="w-full text-center text-4xl bg-transparent border-b-2 border-zinc-700 focus:border-blue-500 outline-none py-4 font-mono tracking-widest text-white"
                        autoFocus
                        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                    />
                    <button
                        onClick={handleSubmit}
                        className="w-full py-4 bg-zinc-800 hover:bg-zinc-700 rounded-lg font-bold transition-colors"
                    >
                        回答する
                    </button>
                </div>
            )}

            {feedback && (
                <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/80 text-6xl font-bold ${feedback === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                    {feedback === 'success' ? 'CORRECT' : 'WRONG'}
                </div>
            )}
        </div>
    );
}
