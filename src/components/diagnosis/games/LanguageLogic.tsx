'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Check, X } from 'lucide-react';

interface LanguageLogicProps {
    onScore: (points: number) => void;
    onComplete: () => void;
}

const ALL_QUESTIONS = [
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
    {
        definition: '「相関関係と因果関係の混同」とは、二つの事象が同時に起きているだけで、原因と結果の関係にあると誤って判断することである。',
        example: 'アイスクリームの売上が増える時期に水難事故が増えるため、アイスクリーム禁止令を出せば事故は減るはずだ。',
        isMatch: true
    },
    {
        definition: '「ダニング＝クルーガー効果」とは、能力の低い人が自身の能力を過大評価してしまう認知バイアスである。',
        example: '彼は初めてのプロジェクトで失敗したが、自分の準備不足を認め、次はもっと勉強してから挑もうと反省した。',
        isMatch: false
    },
    {
        definition: '「バンドワゴン効果」とは、多くの人が支持しているという理由だけで、その選択肢を支持したくなる心理効果である。',
        example: '行列のできているラーメン屋を見て、美味しいに違いないと思い並ぶことにした。',
        isMatch: true
    },
    // New Questions (Expanding to ~30)
    {
        definition: '「ハロー効果」とは、ある対象を評価する際、目立ちやすい特徴に引きずられて、他の特徴についての評価も歪められる現象である。',
        example: '彼は有名大学出身で挨拶も爽やかだったので、仕事のスキルも高いだろうと採用された。',
        isMatch: true
    },
    {
        definition: '「正常性バイアス」とは、予期しない事態に直面した際、「大したことはない」と心を落ち着かせようとする心理作用である。',
        example: '火災報知器が鳴ったが、どうせ誤作動だろうと思ってそのまま作業を続けた。',
        isMatch: true
    },
    {
        definition: '「現状維持バイアス」とは、変化による利益よりも損失を恐れ、現在の状況を維持しようとする心理傾向である。',
        example: 'もっと条件の良い携帯電話プランがあったが、手続きが面倒で今のプランのまま使い続けた。',
        isMatch: true
    },
    {
        definition: '「フレーミング効果」とは、同じ情報でも表現のされ方によって、受け手の印象や判断が変わる現象である。',
        example: '「手術の成功率は90%です」と言われたので安心して手術を受けた。（「死亡率は10%です」と言われたら拒否したかもしれない）',
        isMatch: true
    },
    {
        definition: '「認知的不協和」とは、自分の信念と行動が矛盾したときに生じる不快感のことで、それを解消するために信念を変更することがある。',
        example: 'タバコは体に悪いと知っているがやめられないので、「ストレス解消に役立っているから健康に良い」と思い込むことにした。',
        isMatch: true
    },
    {
        definition: '「バーナム効果」とは、誰にでも当てはまるような曖昧な性格記述を、自分だけに当てはまるものだと捉えてしまう心理現象である。',
        example: '占い師に「あなたは外見は明るいが、内面には繊細な部分を持っている」と言われ、ズバリ当たっていると驚いた。',
        isMatch: true
    },
    {
        definition: '「プラシーボ効果」とは、有効成分が含まれていない偽薬を投与されても、薬だと信じ込むことで症状が改善する現象である。',
        example: 'ただのビタミン剤を「特効薬」だと言われて飲んだら、本当に頭痛が治った。',
        isMatch: true
    },
    {
        definition: '「ピグマリオン効果」とは、他人から期待されることで、学習や作業の成果が向上する現象である。',
        example: '先生に「君は才能がある」と期待された生徒は、自信を持って勉強に取り組み、実際に成績が上がった。',
        isMatch: true
    },
    {
        definition: '「ドア・イン・ザ・フェイス」とは、最初に大きな要求をして断らせた後、本来の小さな要求をして承諾率を高める交渉テクニックである。',
        example: '「1万円貸して」と頼んで断られた直後に、「じゃあ1000円だけでいいから」と頼んだら貸してくれた。',
        isMatch: true
    },
    {
        definition: '「フット・イン・ザ・ドア」とは、最初に小さな要求をして承諾させた後、徐々に大きな要求をしていく交渉テクニックである。',
        example: '「アンケートに1分だけ答えて」と言われ応じたら、その後30分の詳しいインタビューにも応じてしまった。',
        isMatch: true
    },
    {
        definition: '「自己奉仕バイアス」とは、成功は自分の能力のおかげ、失敗は外的要因のせいだと考える傾向である。',
        example: 'テストで良い点を取ったのは自分の努力のおかげだが、悪い点を取ったのは問題が難しすぎたからだと思った。',
        isMatch: true
    },
    {
        definition: '「スリーパー効果」とは、信憑性の低い情報源からの情報でも、時間が経つと情報源を忘れ、内容だけを信じるようになる現象である。',
        example: '怪しい週刊誌の記事を最初は疑っていたが、数ヶ月後にはその内容を真実だと思い込んで友人に話していた。',
        isMatch: true
    },
    {
        definition: '「単純接触効果」とは、特定の対象に繰り返し接することで、その対象への好感度が高まる現象である。',
        example: '最初は苦手だった曲だが、毎日ラジオで流れているのを聞いているうちに好きになってきた。',
        isMatch: true
    },
    {
        definition: '「利用可能性ヒューリスティック」とは、思い出しやすい事例や最近の情報を重視して、確率や頻度を判断してしまう傾向である。',
        example: '飛行機事故のニュースを見たばかりだったので、飛行機は自動車よりも危険だと思い込み、旅行をキャンセルした。',
        isMatch: true
    },
    {
        definition: '「損失回避性」とは、利益を得る喜びよりも、同額の損失を被る苦痛の方を大きく感じる心理傾向である。',
        example: '1万円もらえるチャンスよりも、1万円失うリスクの方を避けるために、リスクのある投資を拒否した。',
        isMatch: true
    },
    {
        definition: '「おとり効果」とは、明らかに劣る選択肢（おとり）を提示することで、特定の選択肢を選ばせやすくする手法である。',
        example: 'Sサイズ300円、Mサイズ500円に加え、Lサイズ550円（おとりではないが割安感）を用意したら、MよりLが売れるようになった。',
        isMatch: true
    },
    {
        definition: '「カクテルパーティー効果」とは、騒がしい場所でも、自分の名前や興味のある話題など、特定の音声を自然と聞き分けられる現象である。',
        example: '賑やかなパーティー会場でも、遠くで自分の悪口を言っている人の声だけははっきりと聞こえた。',
        isMatch: true
    },
    {
        definition: '「根本的な帰属の誤り」とは、他人の行動の原因を、状況要因よりもその人の性格や能力（内的要因）に求めてしまう傾向である。',
        example: '彼が遅刻したのは、交通渋滞があったからかもしれないのに、「彼はルーズな性格だからだ」と決めつけた。',
        isMatch: true
    },
    {
        definition: '「返報性の原理」とは、他人から何かを施されると、お返しをしなければならないと感じる心理作用である。',
        example: 'スーパーで試食を勧められて食べたので、買わないと悪い気がして商品を購入した。',
        isMatch: true
    },
    {
        definition: '「ギャンブラーの誤謬」とは、独立した事象の確率が過去の結果に影響されると思い込む誤りである。',
        example: 'コイン投げで5回連続「表」が出たので、次は確率的に「裏」が出やすいはずだと考えた。（実際は常に50%）',
        isMatch: true
    },
    {
        definition: '「後知恵バイアス」とは、物事が起きた後で、「最初からそうなると思っていた」と考えてしまう傾向である。',
        example: '選挙の結果が出てから、「やっぱりあの候補が勝つと思っていたよ」と、予測していなかったにも関わらず発言した。',
        isMatch: true
    },
    {
        definition: '「マインドフルネス」とは、過去や未来ではなく「今、この瞬間」の体験に意図的に意識を向け、評価をせずに観察する状態である。',
        example: '明日のプレゼンの心配をするのをやめ、今飲んでいるコーヒーの香りや味、温かさに全神経を集中させた。',
        isMatch: true
    }
];

export default function LanguageLogic({ onScore }: LanguageLogicProps) {
    const [questions] = useState(() => {
        // Shuffle on mount
        return [...ALL_QUESTIONS].sort(() => 0.5 - Math.random());
    });
    const [index, setIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

    // Use modulo to cycle through questions
    const currentQ = questions[index % questions.length];

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
