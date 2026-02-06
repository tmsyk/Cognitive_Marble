'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Check, X } from 'lucide-react';

interface LanguageLogicProps {
    onScore: (points: number) => void;
    onComplete: () => void;
}

const QUESTIONS = [
    {
        definition: '「逆説的思考」とは、一般的に正しいと思われることの逆を考えることで、新しい視点や解決策を見出す思考法である。',
        example: '「急がば回れ」という言葉通り、近道を探すのをやめて地道なルートを選んだ。',
        isMatch: true
    },
    {
        definition: '「確証バイアス」とは、自分の仮説や信念を裏付ける情報ばかりを集め、反証する情報を無視する傾向のことである。',
        example: '彼は自分の新商品の欠点を指摘するレビューを徹底的に分析し、改良を加えた。',
        isMatch: false
    },
    {
        definition: '「サンクコスト効果」とは、すでに支払ったコストを取り戻そうとして、さらに損失を拡大させてしまう心理状態である。',
        example: 'つまらない映画だったが、チケット代がもったいないので最後まで見た。',
        isMatch: true
    }
];

export default function LanguageLogic({ onScore }: LanguageLogicProps) {
    const [index, setIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

    const currentQ = QUESTIONS[index % QUESTIONS.length];

    const handleAnswer = (answer: boolean) => {
        const isCorrect = answer === currentQ.isMatch;

        if (isCorrect) {
            setScore(s => s + 10);
            onScore(10);
            setFeedback('correct');
        } else {
            setFeedback('wrong');
        }

        setTimeout(() => {
            setFeedback(null);
            setIndex(prev => prev + 1);
        }, 600);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full gap-8 p-4 max-w-2xl mx-auto">
            <div className="bg-zinc-900/80 p-6 rounded-xl border border-white/10 w-full">
                <div className="flex items-center gap-2 mb-4 text-yellow-500">
                    <BookOpen size={20} />
                    <span className="font-bold">定義</span>
                </div>
                <p className="text-lg leading-relaxed">{currentQ.definition}</p>
            </div>

            <div className="flex flex-col items-center w-full">
                <span className="text-zinc-500 mb-2 text-sm">以下の事例は、上の定義に当てはまるか？</span>
                <div className="bg-zinc-800/50 p-6 rounded-xl border border-white/5 w-full text-center">
                    <p className="text-xl font-medium">{currentQ.example}</p>
                </div>
            </div>

            <div className="flex gap-4 w-full">
                <button
                    onClick={() => handleAnswer(true)}
                    className="flex-1 py-6 rounded-xl bg-zinc-800 hover:bg-zinc-700 border-2 border-transparent hover:border-green-500/50 transition-all font-bold text-xl flex flex-col items-center gap-2"
                >
                    <div className="w-12 h-12 rounded-full border-2 border-green-500 flex items-center justify-center text-green-500">
                        ○
                    </div>
                    当てはまる
                </button>
                <button
                    onClick={() => handleAnswer(false)}
                    className="flex-1 py-6 rounded-xl bg-zinc-800 hover:bg-zinc-700 border-2 border-transparent hover:border-red-500/50 transition-all font-bold text-xl flex flex-col items-center gap-2"
                >
                    <div className="w-12 h-12 rounded-full border-2 border-red-500 flex items-center justify-center text-red-500">
                        ×
                    </div>
                    当てはまらない
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
        </div>
    );
}
