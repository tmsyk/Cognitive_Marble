import { CognitiveType } from '@/store/useStore';

export interface Question {
    id: string;
    text: string;
    options: {
        label: string;
        scores: Partial<Record<CognitiveType, number>>;
    }[];
}

export const questions: Question[] = [
    {
        id: 'q1',
        text: '新しい家電を買いました。使い始める時、あなたはどうしますか？',
        options: [
            { label: '説明書の図や写真を見る', scores: { visual: 3 } },
            { label: '説明書を読む（文字）', scores: { language: 3 } },
            { label: 'とりあえず触って動かす', scores: { somatic: 3 } },
            { label: '誰かに使い方を聞く・動画を見る', scores: { auditory: 3 } },
        ],
    },
    {
        id: 'q2',
        text: '集中したい時、どんな環境が好みですか？',
        options: [
            { label: '完全に無音の場所', scores: { auditory: 2 } }, // 音に敏感
            { label: 'カフェのような雑音がある場所', scores: { auditory: -1 } },
            { label: '整理整頓された綺麗な場所', scores: { visual: 2 } },
        ],
    },
    {
        id: 'q3',
        text: '道に迷った時、どうやって解決しますか？',
        options: [
            { label: '地図アプリを見る（回転させる）', scores: { visual: 3, logic: 1 } },
            { label: '看板やテキスト案内を読む', scores: { language: 3 } },
            { label: '人に聞く', scores: { auditory: 3 } },
            { label: 'なんとなくの勘で進む', scores: { somatic: 2 } },
        ],
    },
    {
        id: 'q4',
        text: '記憶に残っている「あの日」の思い出は？',
        options: [
            { label: 'その時の情景・景色が浮かぶ', scores: { visual: 3 } },
            { label: '交わした会話や音が聞こえる', scores: { auditory: 3 } },
            { label: 'その時の感情や身体感覚', scores: { somatic: 3 } },
            { label: '出来事の文脈や意味', scores: { language: 2, logic: 1 } },
        ],
    },
    {
        id: 'q5',
        text: '複雑な話を理解する時、何があると助かりますか？',
        options: [
            { label: '図解やイラスト', scores: { visual: 3 } },
            { label: '箇条書きのテキスト', scores: { language: 3, logic: 2 } },
            { label: '口頭での補足説明', scores: { auditory: 3 } },
            { label: '具体例や喩え話', scores: { language: 2 } },
        ],
    },
    {
        id: 'q6',
        text: '電話番号を一時的に覚える時、どうしますか？',
        options: [
            { label: '数字の並びの形をイメージする', scores: { visual: 2 } },
            { label: '心の中で繰り返す（音読）', scores: { auditory: 2, wm: 2 } },
            { label: '指で入力する動きをイメージする', scores: { somatic: 2 } },
            { label: '語呂合わせを作る', scores: { language: 2, logic: 1 } },
        ],
    }
];
