'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Check, X } from 'lucide-react';

interface LanguageLogicProps {
    onScore: (points: number) => void;
    onComplete: () => void;
}

const QUESTIONS = [
    // Easy: Concrete examples
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
    // Medium: Abstract applications
    {
        definition: '「サンクコスト効果」とは、すでに支払ったコストを取り戻そうとして、さらに損失を拡大させてしまう心理状態である。',
        example: 'つまらない映画だったが、チケット代がもったいないので最後まで見た。',
        isMatch: true
    },
    {
        definition: '「アンカリング効果」とは、最初に提示された情報（係留点）が、その後の判断や評価に強い影響を与える心理効果である。',
        example: '最初に3000円の値札を見て高いと思ったが、次に1500円の商品を見て、実際は相場より高くても安いと感じてしまった。',
        isMatch: true
    },
    {
        definition: '「ストローマン論法」とは、相手の主張を歪めて引用し、その歪められた主張に反論することで、相手を論破したように見せかける手法である。',
        example: 'A「子供は道路で遊ぶと危険だ」 B「Aさんは子供を家に閉じ込めておくべきだと言うのか！それは監禁だ！」',
        isMatch: true
    },
    // Hard: Subtle distinctions
    {
        definition: '「相関関係と因果関係の混同」とは、二つの事象が同時に起きているだけで、原因と結果の関係にあると誤って判断することである。',
        example: 'アイスクリームの売上が増える時期に水難事故が増えるため、アイスクリーム禁止令を出せば事故は減るはずだ。',
        isMatch: true
    },
    {
        definition: '「ダニング＝クルーガー効果」とは、能の低い人が自身の能力を過大評価してしまう認知バイアスである。',
        example: '彼は初めてのプロジェクトで失敗したが、自分の準備不足を認め、次はもっと勉強してから挑もうと反省した。',
        isMatch: false
    },
    {
        definition: '「バンドワゴン効果」とは、多くの人が支持しているという理由だけで、その選択肢を支持したくなる心理効果である。',
        example: '行列のできているラーメン屋を見て、美味しいに違いないと思い並ぶことにした。',
        isMatch: true
    }
];

export default function LanguageLogic({ onScore }: LanguageLogicProps) {
    const [index, setIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

    // Use modulo to cycle through questions if we run out, but try to keep it within time
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
