'use client';

import { useStore, CognitiveType } from '@/store/useStore';
import { motion } from 'framer-motion';
import { Camera, Headphones, Calendar, Brain, ArrowLeft } from 'lucide-react';
import VisualTool from '@/components/tools/VisualTool';
import AuditoryTool from '@/components/tools/AuditoryTool';
import RetentionTool from '@/components/tools/RetentionTool';
import { useState } from 'react';

export default function ToolsDashboard() {
    const { realScores, setPhase } = useStore();
    const [activeTool, setActiveTool] = useState<string | null>(null);

    // Determine top score (excluding logic/wm for primary sensory tools, or just simple max)
    const getTopType = () => {
        const { visual, auditory, language, somatic } = realScores;
        const scores = { visual, auditory, language, somatic };
        return Object.entries(scores).reduce((a, b) => a[1] > b[1] ? a : b)[0] as CognitiveType;
    };

    const topType = getTopType();

    const TOOLS = [
        {
            id: 'visual',
            type: 'visual',
            label: 'Camera Summarizer',
            desc: '教科書を撮影して、視覚的な要約を自動生成します。',
            icon: Camera,
            Component: VisualTool
        },
        {
            id: 'auditory',
            type: 'auditory',
            label: 'Speed Reader & Player',
            desc: '文章を読み上げ、聴覚からのインプットを加速させます。',
            icon: Headphones,
            Component: AuditoryTool
        },
        {
            id: 'retention',
            type: 'universal',
            label: 'Retention Scheduler',
            desc: '忘却曲線に基づいた復習タイミングを管理します。',
            icon: Calendar,
            Component: RetentionTool
        }
    ];

    const heroTool = TOOLS.find(t => t.type === topType) || TOOLS[0];

    return (
        <div className="min-h-screen p-8 text-white max-w-5xl mx-auto">
            {activeTool ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <button
                        onClick={() => setActiveTool(null)}
                        className="flex items-center gap-2 mb-6 text-zinc-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft size={20} /> Back to Dashboard
                    </button>
                    {(() => {
                        const T = TOOLS.find(t => t.id === activeTool)?.Component;
                        return T ? <T /> : null;
                    })()}
                </motion.div>
            ) : (
                <div className="space-y-12">
                    <div className="flex justify-between items-center">
                        <h2 className="text-3xl font-bold">Recommended Tools</h2>
                        <button onClick={() => setPhase('intro')} className="text-xs text-zinc-500 border border-white/10 px-3 py-1 rounded-full">Sign Out</button>
                    </div>

                    {/* Hero Section: Best Match */}
                    <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-900/50 to-purple-900/50 border border-white/10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-32 bg-blue-500/20 blur-3xl rounded-full" />

                        <span className="inline-block px-3 py-1 bg-yellow-400/20 text-yellow-400 rounded-full text-xs font-bold mb-4 border border-yellow-400/20">
                            BEST MATCH FOR YOU
                        </span>

                        <h3 className="text-4xl font-black mb-4">{heroTool.label}</h3>
                        <p className="text-zinc-300 max-w-xl mb-8 text-lg">{heroTool.desc}</p>

                        <button
                            onClick={() => setActiveTool(heroTool.id)}
                            className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition-colors shadow-lg flex items-center gap-2"
                        >
                            ツールを起動 <heroTool.icon size={20} />
                        </button>
                    </div>

                    {/* Grid of other tools */}
                    <div>
                        <h3 className="text-xl font-bold mb-6 text-zinc-400">ALL TOOLS</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {TOOLS.map((tool) => (
                                <div
                                    key={tool.id}
                                    onClick={() => setActiveTool(tool.id)}
                                    className="p-6 bg-zinc-900/50 rounded-2xl border border-white/5 hover:bg-zinc-800 transition-colors cursor-pointer group"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <tool.icon className="text-zinc-500 group-hover:text-blue-400 transition-colors" size={32} />
                                        {tool.id === heroTool.id && <Brain size={16} className="text-yellow-500" />}
                                    </div>
                                    <h4 className="text-xl font-bold mb-2">{tool.label}</h4>
                                    <p className="text-zinc-500 text-sm">{tool.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
