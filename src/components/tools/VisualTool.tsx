'use client';

import { Camera, Scan } from 'lucide-react';
import { useState } from 'react';

export default function VisualTool() {
    const [scanning, setScanning] = useState(false);

    return (
        <div className="max-w-md mx-auto h-[600px] bg-black rounded-3xl overflow-hidden border border-zinc-800 relative flex flex-col">
            {/* Camera Viewfinder Mock */}
            <div className="flex-1 bg-zinc-900 relative">
                <div className="absolute inset-0 flex items-center justify-center text-zinc-700">
                    [ Camera Preview ]
                </div>

                {/* Overlay UI */}
                <div className="absolute inset-8 border-2 border-white/20 rounded-xl flex items-center justify-center">
                    {scanning && (
                        <div className="w-full h-1 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)] animate-[scan_2s_ease-in-out_infinite]" />
                    )}
                </div>
            </div>

            {/* Controls */}
            <div className="h-48 bg-black p-6 flex flex-col items-center justify-between">
                <p className="text-zinc-400 text-sm text-center">教科書やノートを撮影してください</p>
                <button
                    onClick={() => setScanning(!scanning)}
                    className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                    <div className="w-16 h-16 bg-white rounded-full" />
                </button>
            </div>

            <style jsx global>{`
           @keyframes scan {
               0% { transform: translateY(-100px); opacity: 0; }
               50% { opacity: 1; }
               100% { transform: translateY(100px); opacity: 0; }
           } 
        `}</style>
        </div>
    );
}
