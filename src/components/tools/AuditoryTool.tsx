'use client';

import { Play, SkipBack, SkipForward } from 'lucide-react';

export default function AuditoryTool() {
    return (
        <div className="max-w-md mx-auto p-8 bg-zinc-900 rounded-3xl border border-white/10">
            <div className="w-full aspect-square bg-gradient-to-br from-zinc-800 to-black rounded-2xl mb-8 shadow-inner flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-zinc-800 border-4 border-zinc-700 shadow-xl" />
            </div>

            <h3 className="text-2xl font-bold mb-2">Cognitive Science Intro</h3>
            <p className="text-zinc-500 mb-8">Chapter 1: The Visual Cortex</p>

            <div className="w-full bg-zinc-800 h-1 rounded-full mb-8 relative">
                <div className="w-1/3 h-full bg-green-500 rounded-full" />
                <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow" />
            </div>

            <div className="flex justify-between items-center mb-8">
                <button className="text-zinc-500 font-bold hover:text-white">1.0x</button>
                <button className="text-white font-bold border-b-2 border-green-500">1.5x</button>
                <button className="text-zinc-500 font-bold hover:text-white">2.0x</button>
            </div>

            <div className="flex justify-center items-center gap-8">
                <SkipBack size={32} />
                <div className="w-20 h-20 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 transition-transform">
                    <Play size={32} fill="black" className="ml-1" />
                </div>
                <SkipForward size={32} />
            </div>
        </div>
    );
}
