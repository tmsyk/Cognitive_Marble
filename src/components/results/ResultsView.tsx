'use client';

import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import RadarChart from './RadarChart';
import { ArrowRight } from 'lucide-react';
import { analyzeResults } from '@/utils/analysisLogic'; // Ensure this is imported
import MarbleCanvas from './MarbleCanvas';
import { useState, useEffect } from 'react';

export default function ResultsView() {
    const { selfScores, realScores, setPhase } = useStore();

    // Advanced Analysis
    const [analysis, setAnalysis] = useState<ReturnType<typeof analyzeResults> | null>(null);

    useEffect(() => {
        if (selfScores && realScores) {
            setAnalysis(analyzeResults(selfScores, realScores));
        }
    }, [selfScores, realScores]);

    if (!analysis) return null;

    return (
        <div className="flex flex-col items-center min-h-screen p-8 space-y-12 max-w-6xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-4"
            >
                <h2 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                    DIAGNOSIS COMPLETE
                </h2>
                <p className="text-zinc-400">あなたの「脳の取扱説明書」が生成されました。</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full items-start">
                {/* Left: Radar Chart (The "Gap") */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col items-center bg-zinc-900/50 p-8 rounded-3xl border border-white/5 h-full"
                >
                    <h3 className="text-xl font-bold mb-8 text-zinc-300">GAP ANALYSIS</h3>
                    <RadarChart selfScores={selfScores} realScores={realScores} />

                    <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10 w-full">
                        <h4 className="text-sm font-bold text-zinc-400 mb-2">SELF IMAGE GAP</h4>
                        <p className="text-sm text-zinc-300 leading-relaxed">
                            {analysis.gap ? analysis.gap.description : '自己評価と実力が一致しています。'}
                        </p>
                    </div>
                </motion.div>

                {/* Right: Cognitive Profile & Advice */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col gap-6"
                >
                    {/* Primary Type Card */}
                    <div className="bg-gradient-to-br from-zinc-900 to-black p-8 rounded-3xl border border-white/10 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-50 group-hover:opacity-100 transition-opacity" />

                        <h3 className="text-lg font-bold text-zinc-400 mb-2 uppercase tracking-widest">Cognitive Style</h3>
                        <h2 className="text-3xl font-black text-white mb-4">{analysis.advice.title}</h2>
                        <p className="text-zinc-300 leading-relaxed relative z-10">
                            {analysis.advice.description}
                        </p>
                    </div>

                    {/* Advice Cards */}
                    <div className="grid grid-cols-1 gap-4">
                        <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-colors">
                            <h4 className="flex items-center gap-2 font-bold text-blue-400 mb-3">
                                🧠 Recommended Study Method
                            </h4>
                            <p className="text-sm text-zinc-300 leading-relaxed">
                                {analysis.advice.studyMethod}
                            </p>
                        </div>

                        <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 hover:border-red-500/30 transition-colors">
                            <h4 className="flex items-center gap-2 font-bold text-red-400 mb-3">
                                ⚠️ Potential Pitfalls
                            </h4>
                            <p className="text-sm text-zinc-300 leading-relaxed">
                                {analysis.advice.warning}
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>


            <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                onClick={() => setPhase('dashboard')}
                className="px-10 py-5 bg-white text-black text-xl font-bold rounded-full hover:bg-zinc-200 transition-colors shadow-[0_0_30px_rgba(255,255,255,0.2)] flex items-center gap-2"
            >
                ソリューションを確認する <ArrowRight />
            </motion.button>
        </div>
    );
}
