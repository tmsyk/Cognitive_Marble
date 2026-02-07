'use client';

import { motion } from 'framer-motion';
import { CognitiveType } from '@/store/useStore';

interface RadarChartProps {
    selfScores: Record<CognitiveType, number>;
    realScores: Record<CognitiveType, number>;
}

const AXES: { key: CognitiveType; label: string }[] = [
    { key: 'visual', label: '視覚' },
    { key: 'auditory', label: '聴覚' },
    { key: 'language', label: '言語' },
    { key: 'logic', label: '論理' },
    { key: 'wm', label: 'WM' },
    { key: 'somatic', label: '体感覚' },
];

const MAX_SCORE = 100;
const SELF_SCORE_MULTIPLIER = 10;

// Helper to calculate polygon points
const getPoints = (scores: Record<CognitiveType, number>, radius: number) => {
    return AXES.map((axis, i) => {
        const angle = (Math.PI * 2 * i) / AXES.length - Math.PI / 2;
        // Normalize score 0-MAX to 0-1, then 0-radius
        // Avoid 0 usually for visual appeal, maybe min 0.1?
        const value = Math.min(Math.max(scores[axis.key] || 0, 0), MAX_SCORE);
        const r = (value / MAX_SCORE) * radius;
        const x = Math.cos(angle) * r + 150; // Center offset
        const y = Math.sin(angle) * r + 150;
        return `${x},${y}`;
    }).join(' ');
};

const getAxisPoint = (i: number, radius: number) => {
    const angle = (Math.PI * 2 * i) / AXES.length - Math.PI / 2;
    const x = Math.cos(angle) * radius + 150;
    const y = Math.sin(angle) * radius + 150;
    return { x, y };
};

export default function RadarChart({ selfScores, realScores }: RadarChartProps) {
    const radius = 100;

    // Apply multiplier to selfScores before passing to getPoints
    const multipliedSelfScores: Record<CognitiveType, number> = Object.keys(selfScores).reduce((acc, key) => {
        acc[key as CognitiveType] = selfScores[key as CognitiveType] * SELF_SCORE_MULTIPLIER;
        return acc;
    }, {} as Record<CognitiveType, number>);

    const selfPoints = getPoints(multipliedSelfScores, radius);
    const realPoints = getPoints(realScores, radius);

    return (
        <div className="relative w-[300px] h-[300px] mx-auto">
            <svg width="300" height="300" viewBox="0 0 300 300" className="overflow-visible">
                {/* Background Grid */}
                {[0.2, 0.4, 0.6, 0.8, 1].map((scale) => (
                    <polygon
                        key={scale}
                        points={AXES.map((_, i) => {
                            const p = getAxisPoint(i, radius * scale);
                            return `${p.x},${p.y}`;
                        }).join(' ')}
                        fill="none"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="1"
                    />
                ))}

                {/* Axes Lines */}
                {AXES.map((axis, i) => {
                    const p = getAxisPoint(i, radius + 10); // Label pos
                    const lineEnd = getAxisPoint(i, radius);
                    return (
                        <g key={axis.key}>
                            <line x1="150" y1="150" x2={lineEnd.x} y2={lineEnd.y} stroke="rgba(255,255,255,0.1)" />
                            <text
                                x={p.x}
                                y={p.y}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fill="#aaa"
                                fontSize="12"
                                className="font-mono"
                            >
                                {axis.label}
                            </text>
                        </g>
                    );
                })}

                {/* Self Score (Red) */}
                <motion.polygon
                    initial={{ opacity: 0, scale: 0, transformOrigin: 'center' }}
                    animate={{ opacity: 0.7, scale: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    points={selfPoints}
                    fill="rgba(255, 59, 48, 0.3)"
                    stroke="var(--color-self)"
                    strokeWidth="2"
                />

                {/* Real Score (Blue) */}
                <motion.polygon
                    initial={{ opacity: 0, scale: 0, transformOrigin: 'center' }}
                    animate={{ opacity: 0.7, scale: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    points={realPoints}
                    fill="rgba(0, 122, 255, 0.3)"
                    stroke="var(--color-real)"
                    strokeWidth="2"
                />
            </svg>

            {/* Legend */}
            <div className="absolute -bottom-8 left-0 right-0 flex justify-center gap-6 text-xs font-mono">
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[var(--color-self)]" />
                    <span className="text-zinc-400">SELF IMAGE</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[var(--color-real)]" />
                    <span className="text-zinc-400">REAL ABILITY</span>
                </div>
            </div>
        </div>
    );
}
