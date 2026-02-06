'use client';

import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import RadarChart from './RadarChart';
import { ArrowRight } from 'lucide-react';
// import MarbleCanvas from './MarbleCanvas'; // TODO

export default function ResultsView() {
    const { selfScores, realScores, setPhase } = useStore();

    // Simple feedback logic
    const getFeedback = () => {
        let msg = 'あなたの脳は非常にユニークです。';

        // Find biggest gap
        let maxGap = 0;
        let gapType = '';

        // Logic to iterating keys
        const keys = Object.keys(selfScores) as (keyof typeof selfScores)[];

        keys.forEach(key => {
            const diff = realScores[key] - selfScores[key]; // Positive means Real > Self (Underestimated)
            if (Math.abs(diff) > Math.abs(maxGap)) {
                maxGap = diff;
                gapType = key;
            }
        });

        if (maxGap > 5) {
            msg = `あなたは「${gapType.toUpperCase()}」の能力を過小評価しています。実はもっと得意なはずです。`;
        } else if (maxGap < -5) {
            msg = `あなたは「${gapType.toUpperCase()}」に頼りすぎているかもしれません。実際のスコアは少し低めでした。`;
        } else {
            msg = 'あなたの自己評価は非常に正確です。自分の能力をよく理解しています。';
        }

        return msg;
    };

    return (
        <div className="flex flex-col items-center min-h-screen p-8 space-y-12 max-w-4xl mx-auto">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full items-center">
                {/* Left: Radar Chart (The "Gap") */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col items-center bg-zinc-900/50 p-8 rounded-3xl border border-white/5"
                >
                    <h3 className="text-xl font-bold mb-8 text-zinc-300">GAP ANALYSIS</h3>
                    <RadarChart selfScores={selfScores} realScores={realScores} />
                </motion.div>

                {/* Right: Marble (The "Color") - Placeholder for now */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col items-center bg-zinc-900/50 p-8 rounded-3xl border border-white/5 min-h-[400px] justify-center relative overflow-hidden"
                >
                    <h3 className="text-xl font-bold mb-8 text-zinc-300 z-10">COGNITIVE MARBLE</h3>

                    {/* Visual effect placeholder */}
                    <div className="absolute inset-0 opacity-50 blur-3xl">
                        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500 rounded-full mix-blend-screen animate-pulse" />
                        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-purple-500 rounded-full mix-blend-screen animate-pulse" style={{ animationDelay: '1s' }} />
                        <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-pink-500 rounded-full mix-blend-screen animate-pulse" style={{ animationDelay: '2s' }} />
                    </div>

                    <p className="z-10 text-center max-w-xs text-lg font-medium leading-relaxed">
                        {getFeedback()}
                    </p>
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
