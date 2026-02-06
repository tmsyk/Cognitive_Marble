'use client';

import { Bell } from 'lucide-react';

export default function RetentionTool() {
    const reviews = [
        { time: '10 min later', label: 'First Review', status: 'done' },
        { time: 'Tomorrow', label: 'Second Review', status: 'pending' },
        { time: 'Next Week', label: 'Third Review', status: 'pending' },
        { time: 'Next Month', label: 'Final Review', status: 'pending' },
    ];

    return (
        <div className="max-w-md mx-auto p-6 bg-zinc-900 rounded-3xl border border-white/10">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Bell size={20} className="text-yellow-500" />
                Review Scheduler
            </h3>

            <div className="space-y-4">
                {reviews.map((r, i) => (
                    <div key={i} className={`p-4 rounded-xl border flex justify-between items-center ${r.status === 'done'
                            ? 'bg-zinc-800 border-zinc-700 opacity-50'
                            : 'bg-zinc-800/50 border-white/10'
                        }`}>
                        <div>
                            <p className="font-bold text-lg">{r.time}</p>
                            <p className="text-sm text-zinc-500">{r.label}</p>
                        </div>
                        {r.status === 'done' ? (
                            <span className="text-green-500 font-bold">DONE</span>
                        ) : (
                            <button className="px-4 py-2 bg-blue-600 rounded-lg text-sm font-bold">
                                SET
                            </button>
                        )}
                    </div>
                ))}
            </div>

            <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl text-yellow-200 text-sm">
                💡 忘却曲線によると、最適なタイミングで復習することで記憶定着率は400%向上します。
            </div>
        </div>
    );
}
