
import { CognitiveType } from '@/store/useStore';

interface AnalysisResult {
    gap: {
        type: CognitiveType;
        value: number; // Positive = Real > Self (Underestimated), Negative = Real < Self (Overestimated)
        description: string;
    } | null;
    primaryTypes: CognitiveType[];
    advice: {
        title: string;
        description: string;
        studyMethod: string;
        warning: string;
    };
}

const TYPE_LABELS: Record<CognitiveType, string> = {
    visual: '視覚',
    auditory: '聴覚',
    language: '言語',
    somatic: '体感覚',
    wm: 'ワーキングメモリ',
    logic: '論理',
};

// Combinations of advice
const ADVICE_DATABASE: Record<string, any> = {
    'visual-logic': {
        title: '構造的ビジュアライザー',
        description: '物事を「図解」と「構造」で捉えるのが得意です。複雑な概念も図に書き出すことで瞬時に理解できます。',
        studyMethod: 'マインドマップやフローチャートを多用しましょう。文字だけのテキストは読まず、まず図表から全体像を掴むのが近道です。',
        warning: '詳細な文字情報の読み込みが雑になりがちなので、契約書などは意識して読みましょう。'
    },
    'auditory-language': {
        title: '対話的言語学習者',
        description: '「耳」と「言葉」で情報を処理する達人です。講義を聞いたり、人と話すことで思考が整理されます。',
        studyMethod: '音声教材やポッドキャストを活用しましょう。学んだことを誰かに話す（ティーチング）ことが最強の定着法です。',
        warning: '図形や空間的な情報の処理には時間がかかることがあるため、可視化ツールを補助的に使いましょう。'
    },
    'somatic-wm': {
        title: '直感的マルチタスカー',
        description: '「身体感覚」と「短期記憶」が優れています。現場での臨機応変な対応や、身体を使った作業で本領を発揮します。',
        studyMethod: '実際に手を動かす「実践形式」がベストです。座学よりも、シミュレーションやロールプレイングを取り入れましょう。',
        warning: '抽象的な理論だけの議論は退屈に感じやすく、集中力が切れやすい傾向があります。'
    },
    // Fallback or generic combinations
    'default': {
        title: 'バランス型思想家',
        description: '特定の感覚に偏らず、状況に応じて柔軟に情報処理を行うことができます。',
        studyMethod: '複数のアプローチ（読む、聞く、書く）を組み合わせることで、より深い理解が得られます。',
        warning: '器用貧乏にならないよう、意識的に得意分野を伸ばすフェーズを設けると良いでしょう。'
    }
};

export function analyzeResults(selfScores: Record<CognitiveType, number>, realScores: Record<CognitiveType, number>): AnalysisResult {
    // 1. Identify Gaps (Comparing Normalized Self to Real)
    // Assuming Self Scores need x10 multiplier to match 0-100 scale of Real Scores
    const SELF_MULTIPLIER = 10;

    let maxGapVal = 0;
    let maxGapType: CognitiveType | null = null;

    (Object.keys(selfScores) as CognitiveType[]).forEach(type => {
        const normalizedSelf = selfScores[type] * SELF_MULTIPLIER;
        const real = realScores[type];
        const diff = real - normalizedSelf;

        if (Math.abs(diff) > Math.abs(maxGapVal)) {
            maxGapVal = diff;
            maxGapType = type;
        }
    });

    let gapDescription = '';
    if (maxGapVal > 20) {
        gapDescription = `「${TYPE_LABELS[maxGapType!]}」の能力を過小評価しています。実は潜在的な強みです。もっと自信を持って活用しましょう。`;
    } else if (maxGapVal < -20) {
        gapDescription = `「${TYPE_LABELS[maxGapType!]}」を少し過信しているかもしれません。この分野は慎重に確認する習慣をつけるとミスが減ります。`;
    } else {
        gapDescription = '自己評価と実力のズレが少なく、自分の能力を正確に把握できています（メタ認知が高い状態です）。';
    }

    // 2. Determine Primary Types (Top 2 Real Scores)
    const sortedTypes = (Object.keys(realScores) as CognitiveType[])
        .sort((a, b) => realScores[b] - realScores[a]);

    const top2 = sortedTypes.slice(0, 2);
    const primaryKey = top2.sort().join('-'); // Sort to match key format

    // Find exact match or partial match or default
    let advice = ADVICE_DATABASE[primaryKey];

    if (!advice) {
        // Try to find advice based on just the #1 type if combination not found
        // For MVP, simplistic fallback logic mapping
        if (top2.includes('visual')) advice = ADVICE_DATABASE['visual-logic']; // Fallback proxy
        else if (top2.includes('auditory')) advice = ADVICE_DATABASE['auditory-language'];
        else if (top2.includes('somatic')) advice = ADVICE_DATABASE['somatic-wm'];
        else advice = ADVICE_DATABASE['default'];
    }

    return {
        gap: maxGapType ? { type: maxGapType, value: maxGapVal, description: gapDescription } : null,
        primaryTypes: top2,
        advice
    };
}
