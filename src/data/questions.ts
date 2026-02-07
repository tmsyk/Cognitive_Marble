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
            { label: '動画で使い方を見る', scores: { visual: 1, auditory: 2 } },
        ],
    },
    {
        id: 'q2',
        text: '集中したい時、どんな環境が好みですか？',
        options: [
            { label: '完全に無音の場所', scores: { auditory: 2 } },
            { label: 'カフェのような雑音がある場所', scores: { auditory: -1 } },
            { label: '整理整頓された綺麗な場所', scores: { visual: 2 } },
            { label: '歩き回れる広い場所', scores: { somatic: 2 } },
        ],
    },
    {
        id: 'q3',
        text: '道に迷った時、どうやって解決しますか？',
        options: [
            { label: '地図アプリを回転させて見る', scores: { visual: 3, logic: 1 } },
            { label: '看板や住所表示を読む', scores: { language: 3 } },
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
            { label: '出来事の意味や文脈', scores: { language: 2, logic: 1 } },
        ],
    },
    {
        id: 'q5',
        text: '複雑な話を理解する時、何があると助かりますか？',
        options: [
            { label: '図解やイラスト', scores: { visual: 3 } },
            { label: '論理的な構成のテキスト', scores: { language: 3, logic: 2 } },
            { label: '口頭での補足説明', scores: { auditory: 3 } },
            { label: '実際にやってみる機会', scores: { somatic: 3 } },
        ],
    },
    {
        id: 'q6',
        text: '電話番号を一時的に覚える時、どうしますか？',
        options: [
            { label: '数字の並びの形をイメージする', scores: { visual: 2 } },
            { label: '心の中で繰り返す（音読）', scores: { auditory: 2, wm: 2 } },
            { label: 'キーパッドを押す指の動き', scores: { somatic: 2 } },
            { label: '語呂合わせを作る', scores: { language: 2, logic: 1 } },
        ],
    },
    {
        id: 'q7',
        text: '新しいダンスやスポーツの動きを覚えるとき、どうするのが一番早いですか？',
        options: [
            { label: '上手な人の動きを見る', scores: { visual: 3 } },
            { label: 'コーチの言葉による指示を聞く', scores: { auditory: 3, language: 1 } },
            { label: '実際に体を動かしながら覚える', scores: { somatic: 3 } },
            { label: '動きの理論や仕組みを理解する', scores: { logic: 2 } },
        ],
    },
    {
        id: 'q8',
        text: '部屋の模様替えをするとき、まず何をしますか？',
        options: [
            { label: '完成図を頭の中でイメージする', scores: { visual: 3 } },
            { label: '家具のサイズを測って計算する', scores: { logic: 3 } },
            { label: 'とりあえず家具を動かしてみる', scores: { somatic: 3 } },
            { label: 'インテリア雑誌やブログを読む', scores: { language: 2 } },
        ],
    },
    {
        id: 'q9',
        text: '誰かと議論するとき、重要視することは？',
        options: [
            { label: '相手の声のトーンや話し方', scores: { auditory: 3 } },
            { label: '話の筋道が通っているか', scores: { logic: 3 } },
            { label: '言葉の定義や表現の正確さ', scores: { language: 3 } },
            { label: '相手の表情や身振り手振り', scores: { visual: 2 } },
        ],
    },
    {
        id: 'q10',
        text: '暗算をするとき、頭の中で何が起きていますか？',
        options: [
            { label: '数字が画像として浮かぶ', scores: { visual: 2, wm: 1 } },
            { label: '数字を声に出して（心の中で）読む', scores: { auditory: 2, wm: 1 } },
            { label: 'そろばんや指の動きのような感覚', scores: { somatic: 2, wm: 1 } },
            { label: '数式や論理が浮かぶ', scores: { logic: 3, wm: 1 } },
        ],
    },
    {
        id: 'q11',
        text: '映画を見るとき、何に最も惹かれますか？',
        options: [
            { label: '映像美やカメラワーク', scores: { visual: 3 } },
            { label: '音楽や効果音、セリフの声質', scores: { auditory: 3 } },
            { label: '脚本の構成や伏線', scores: { logic: 2, language: 2 } },
            { label: 'アクションシーンの迫力', scores: { somatic: 2 } },
        ],
    },
    {
        id: 'q12',
        text: '新しいソフトウェアの使い方を学ぶとき、どれが好みですか？',
        options: [
            { label: 'チュートリアル動画を見る', scores: { visual: 2, auditory: 1 } },
            { label: 'マニュアルやヘルプ記事を読む', scores: { language: 2, logic: 1 } },
            { label: '実際にいじりながら覚える', scores: { somatic: 3 } },
            { label: 'ショートカットキーを覚える', scores: { wm: 2, logic: 1 } },
        ],
    },
    {
        id: 'q13',
        text: 'カラオケで新しい曲を覚えるとき、何に頼りますか？',
        options: [
            { label: '歌詞カードの文字', scores: { language: 3 } },
            { label: 'メロディやリズムを耳で聞く', scores: { auditory: 3 } },
            { label: 'ミュージックビデオの映像', scores: { visual: 2 } },
            { label: 'リズムに合わせて体を動かす', scores: { somatic: 2 } },
        ],
    },
    {
        id: 'q14',
        text: 'プレゼンテーション資料を作るとき、最もこだわるのは？',
        options: [
            { label: 'デザインやレイアウト', scores: { visual: 3 } },
            { label: '論理構成やデータの正確さ', scores: { logic: 3 } },
            { label: 'キャッチコピーや文章表現', scores: { language: 3 } },
            { label: '話すときのリズムや間', scores: { auditory: 2 } },
        ],
    },
    {
        id: 'q15',
        text: '旅行の計画を立てるとき、どうしますか？',
        options: [
            { label: '地図を見てルートをイメージする', scores: { visual: 3 } },
            { label: '時刻表や予算を緻密に計算する', scores: { logic: 3 } },
            { label: 'ガイドブックや口コミを読む', scores: { language: 3 } },
            { label: '行き当たりばったりで楽しむ', scores: { somatic: 2 } },
        ],
    },
    {
        id: 'q16',
        text: '人の名前を覚えるとき、何を手がかりにしますか？',
        options: [
            { label: '顔の特徴', scores: { visual: 3 } },
            { label: '名前の響きや声', scores: { auditory: 3 } },
            { label: '漢字の文字面', scores: { language: 2, visual: 1 } },
            { label: 'その人と会った時の状況や行動', scores: { logic: 1, somatic: 1 } },
        ],
    },
    {
        id: 'q17',
        text: '料理をするとき、レシピをどう使いますか？',
        options: [
            { label: '完成写真を見て盛り付けを真似る', scores: { visual: 3 } },
            { label: '分量を正確に計って手順通り作る', scores: { logic: 3 } },
            { label: '手順の説明文をじっくり読む', scores: { language: 3 } },
            { label: '味見をしながら感覚で作る', scores: { somatic: 3 } },
        ],
    },
    {
        id: 'q18',
        text: 'トラブルが起きたとき、まずどう反応しますか？',
        options: [
            { label: '状況を観察して全体像を把握する', scores: { visual: 2, logic: 1 } },
            { label: '誰かに相談する、叫ぶ', scores: { auditory: 2, language: 1 } },
            { label: '原因と結果を分析する', scores: { logic: 3 } },
            { label: 'すぐに行動に移して対処する', scores: { somatic: 3 } },
        ],
    },
    {
        id: 'q19',
        text: '外国語を学習するとき、効果的な方法は？',
        options: [
            { label: '単語帳やテキストを目で見て覚える', scores: { visual: 2, language: 2 } },
            { label: '音声を繰り返し聞く・シャドーイング', scores: { auditory: 3 } },
            { label: '文法構造や規則を理解する', scores: { logic: 3 } },
            { label: '実際に現地に行って会話する', scores: { somatic: 3 } },
        ],
    },
    {
        id: 'q20',
        text: '買い物をするとき、決定的な要因は？',
        options: [
            { label: '見た目やデザイン', scores: { visual: 3 } },
            { label: 'スペックやコスパの計算', scores: { logic: 3 } },
            { label: '商品説明やレビューの文章', scores: { language: 3 } },
            { label: '手に取った時の質感や重さ', scores: { somatic: 3 } },
        ],
    },
    {
        id: 'q21',
        text: 'リラックスするとき、何をしますか？',
        options: [
            { label: '絶景写真やアートを見る', scores: { visual: 3 } },
            { label: '好きな音楽を聴く', scores: { auditory: 3 } },
            { label: '読書をする', scores: { language: 3 } },
            { label: 'スポーツや散歩をする', scores: { somatic: 3 } },
        ],
    },
    {
        id: 'q22',
        text: '複雑な機械の組み立て説明書、どこを見ますか？',
        options: [
            { label: '組み立て図（イラスト）', scores: { visual: 3 } },
            { label: '手順の番号順のテキスト', scores: { language: 2, logic: 1 } },
            { label: '部品リストと完成形から推測', scores: { logic: 3 } },
            { label: '説明書は見ずに形を合わせる', scores: { somatic: 3 } },
        ],
    },
    {
        id: 'q23',
        text: 'あなたはグループの中でどのような役割を担うことが多いですか？',
        options: [
            { label: 'ビジョンを描くリーダー', scores: { visual: 2, logic: 1 } },
            { label: '皆の意見を聞く調整役', scores: { auditory: 3 } },
            { label: '企画書や記録をまとめる書記', scores: { language: 3 } },
            { label: '現場で率先して動く実行部隊', scores: { somatic: 3 } },
        ],
    },
    {
        id: 'q24',
        text: 'PCのフォルダ整理、どういう基準で行いますか？',
        options: [
            { label: '色分けやアイコンで視覚的に', scores: { visual: 3 } },
            { label: '日付やプロジェクトごとの階層構造', scores: { logic: 3 } },
            { label: '検索しやすいファイル名をつける', scores: { language: 3 } },
            { label: 'デスクトップに平置き（配置で覚える）', scores: { somatic: 2, visual: 1 } },
        ],
    },
    {
        id: 'q25',
        text: '好きなゲームのジャンルは？',
        options: [
            { label: 'グラフィックが綺麗なオープンワールド', scores: { visual: 3 } },
            { label: '音ゲー・リズムゲーム', scores: { auditory: 3, somatic: 1 } },
            { label: 'ノベルゲーム・テキストアドベンチャー', scores: { language: 3 } },
            { label: '格闘ゲーム・アクション', scores: { somatic: 3, wm: 1 } },
        ],
    },
    {
        id: 'q26',
        text: '新しいアイデアを思いつくのはどんな時？',
        options: [
            { label: 'ぼーっと景色を眺めている時', scores: { visual: 2 } },
            { label: '誰かと会話している時', scores: { auditory: 3, language: 1 } },
            { label: '文章を書いている時', scores: { language: 3 } },
            { label: '歩いている時や運動中', scores: { somatic: 3 } },
        ],
    },
    {
        id: 'q27',
        text: '約束の時間を守るために、どうしていますか？',
        options: [
            { label: 'アナログ時計の針の位置で把握', scores: { visual: 2 } },
            { label: 'アラームやリマインダー音', scores: { auditory: 3 } },
            { label: '逆算して行動計画を立てる', scores: { logic: 3 } },
            { label: '体内時計の感覚', scores: { somatic: 3 } },
        ],
    },
    {
        id: 'q28',
        text: 'ウェブサイトのデザインで気になる点は？',
        options: [
            { label: '色使いや画像のクオリティ', scores: { visual: 3 } },
            { label: 'メニューの構造や使いやすさ（UI/UX）', scores: { logic: 2, somatic: 1 } },
            { label: 'キャッチコピーや見出しの言葉', scores: { language: 3 } },
            { label: '操作した時の反応速度や音', scores: { somatic: 1, auditory: 1 } },
        ],
    },
    {
        id: 'q29',
        text: 'スピーチを聞いている時、何に集中しますか？',
        options: [
            { label: 'スライドや配布資料', scores: { visual: 2, language: 1 } },
            { label: '話者の声のトーンや抑揚', scores: { auditory: 3 } },
            { label: '話の内容の論理性', scores: { logic: 3, language: 1 } },
            { label: '会場の雰囲気や空気感', scores: { somatic: 2 } },
        ],
    },
    {
        id: 'q30',
        text: 'ストレス解消法は？',
        options: [
            { label: '映画鑑賞や絵を描く', scores: { visual: 3 } },
            { label: '誰かに愚痴を聞いてもらう', scores: { auditory: 3, language: 1 } },
            { label: '日記に書き出す', scores: { language: 3 } },
            { label: 'カラオケやジムで発散', scores: { somatic: 3, auditory: 1 } },
        ],
    },
    {
        id: 'q31',
        text: '新しいスマホを選ぶ決め手は？',
        options: [
            { label: '画面の綺麗さやデザイン', scores: { visual: 3 } },
            { label: 'スピーカーの音質', scores: { auditory: 3 } },
            { label: 'スペック表の数値', scores: { logic: 3 } },
            { label: '手に持った時のフィット感', scores: { somatic: 3 } },
        ],
    },
    {
        id: 'q32',
        text: '会議の内容を記録するとき、どうしますか？',
        options: [
            { label: '図やマインドマップを描く', scores: { visual: 3 } },
            { label: 'ボイスレコーダーで録音する', scores: { auditory: 3 } },
            { label: '要点を箇条書きでまとめる', scores: { logic: 2, language: 2 } },
            { label: '発言を一字一句タイピングする', scores: { somatic: 1, language: 2 } },
        ],
    },
    {
        id: 'q33',
        text: '自分の性格を一言で表すと？',
        options: [
            { label: '観察力が鋭い', scores: { visual: 3 } },
            { label: '聞き上手', scores: { auditory: 3 } },
            { label: '理屈っぽい', scores: { logic: 3 } },
            { label: '行動力がある', scores: { somatic: 3 } },
        ],
    },
    {
        id: 'q34',
        text: '詩や小説を読むとき、何を感じますか？',
        options: [
            { label: '情景がありありと浮かぶ', scores: { visual: 3 } },
            { label: '言葉のリズムや響きを楽しむ', scores: { auditory: 2, language: 2 } },
            { label: '作者の意図や伏線を考察する', scores: { logic: 3 } },
            { label: '登場人物の感情が身体に伝わる', scores: { somatic: 3 } },
        ],
    },
    {
        id: 'q35',
        text: '家具の配置を変えるとき、何が一番重要？',
        options: [
            { label: '見た目のバランス', scores: { visual: 3 } },
            { label: '生活動線の効率', scores: { logic: 3 } },
            { label: '風水や言い伝え', scores: { language: 2 } },
            { label: '動きやすさ、ぶつからないか', scores: { somatic: 3 } },
        ],
    },
    {
        id: 'q36',
        text: '数学の問題を解くとき、どう感じますか？',
        options: [
            { label: '図形やグラフで考えると分かりやすい', scores: { visual: 3 } },
            { label: '数式の美しさに惹かれる', scores: { logic: 3 } },
            { label: '問題文の読解が重要だと思う', scores: { language: 3 } },
            { label: '計算の手順を体で覚えている', scores: { somatic: 1, wm: 2 } },
        ],
    },
    {
        id: 'q37',
        text: '人の嘘を見抜くとき、どこに注目しますか？',
        options: [
            { label: '視線の動きや微表情', scores: { visual: 3 } },
            { label: '声の震えや口調の変化', scores: { auditory: 3 } },
            { label: '話の矛盾点', scores: { logic: 3 } },
            { label: 'なんとなくの違和感（直感）', scores: { somatic: 3 } },
        ],
    },
    {
        id: 'q38',
        text: '好きな授業はどれでしたか（またはどれなら好きになれそうですか）？',
        options: [
            { label: '美術・図工', scores: { visual: 3 } },
            { label: '音楽', scores: { auditory: 3 } },
            { label: '国語・現代文', scores: { language: 3 } },
            { label: '体育', scores: { somatic: 3 } },
        ],
    },
    {
        id: 'q39',
        text: 'カフェのメニューを選ぶとき、どうしますか？',
        options: [
            { label: '写真を見て美味しそうなもの', scores: { visual: 3 } },
            { label: '店員さんのおすすめを聞く', scores: { auditory: 3 } },
            { label: 'メニューの説明書きを読む', scores: { language: 2 } },
            { label: '今の体調やお腹の空き具合で決める', scores: { somatic: 3 } },
        ],
    },
    {
        id: 'q40',
        text: '何かを説明するとき、よく使う言葉は？',
        options: [
            { label: '「見て、こんな感じ」', scores: { visual: 3 } },
            { label: '「聞いて、つまりね」', scores: { auditory: 3 } },
            { label: '「要するに、論理的には」', scores: { logic: 3 } },
            { label: '「なんかこう、ガッてやる感じ」', scores: { somatic: 3 } },
        ],
    },
    {
        id: 'q41',
        text: 'ウェブ会議中、相手の通信状態が悪くなったら？',
        options: [
            { label: '映像が固まると気になる', scores: { visual: 3 } },
            { label: '音声が途切れると気になる', scores: { auditory: 3 } },
            { label: '話の流れが止まるのが嫌だ', scores: { logic: 2 } },
            { label: 'チャットで文字連絡に切り替える', scores: { language: 2, logic: 1 } },
        ],
    },
    {
        id: 'q42',
        text: 'あなたは直感派？論理派？',
        options: [
            { label: 'パッと見た印象で決める直感派', scores: { visual: 3 } },
            { label: 'じっくり考えて決める論理派', scores: { logic: 3 } },
            { label: '言葉にして整理する派', scores: { language: 3 } },
            { label: '体の感覚に従う直感派', scores: { somatic: 3 } },
        ],
    },
    {
        id: 'q43',
        text: '新しい場所に行くとき、不安なことは？',
        options: [
            { label: '景色が想像できないこと', scores: { visual: 2 } },
            { label: '言葉が通じるか（海外など）', scores: { language: 3, auditory: 1 } },
            { label: '治安や安全性', scores: { somatic: 2, logic: 1 } },
            { label: 'スケジュール通りに行けるか', scores: { logic: 3 } },
        ],
    },
    {
        id: 'q44',
        text: 'キーボード入力について',
        options: [
            { label: 'キーの配置を目で見ている', scores: { visual: 3 } },
            { label: '打鍵音のリズムが大事', scores: { auditory: 2 } },
            { label: '指が勝手に動く（ブラインドタッチ）', scores: { somatic: 3 } },
            { label: '変換効率やショートカットを駆使する', scores: { logic: 2, wm: 1 } },
        ],
    },
    {
        id: 'q45',
        text: '記憶力テスト。何を覚えるのが得意？',
        options: [
            { label: '絵や写真の内容', scores: { visual: 3 } },
            { label: '聞いた話の内容', scores: { auditory: 3 } },
            { label: '文章や単語', scores: { language: 3 } },
            { label: 'ダンスの振り付け', scores: { somatic: 3 } },
        ],
    },
    {
        id: 'q46',
        text: 'あなたはどの感覚が敏感だと思いますか？',
        options: [
            { label: '色彩感覚や変化への気づき', scores: { visual: 3 } },
            { label: '音程やノイズへの気づき', scores: { auditory: 3 } },
            { label: '言葉のニュアンスの違い', scores: { language: 3 } },
            { label: '気温や湿度、触覚', scores: { somatic: 3 } },
        ],
    },
    {
        id: 'q47',
        text: 'DIYで棚を作ります。設計はどうする？',
        options: [
            { label: '簡単なスケッチを描く', scores: { visual: 3 } },
            { label: 'とりあえず木材を買ってきて作りながら考える', scores: { somatic: 3 } },
            { label: '必要な寸法を計算して図面を引く', scores: { logic: 3 } },
            { label: '作り方の動画や記事を探す', scores: { auditory: 1, language: 2 } },
        ],
    },
    {
        id: 'q48',
        text: '自分の部屋で一番こだわっているところは？',
        options: [
            { label: '照明やインテリアの色味', scores: { visual: 3 } },
            { label: 'オーディオ環境や静寂性', scores: { auditory: 3 } },
            { label: '本棚のラインナップ', scores: { language: 3 } },
            { label: 'イスやベッドの寝心地', scores: { somatic: 3 } },
        ],
    },
    {
        id: 'q49',
        text: '友人の誕生日プレゼント、どう選ぶ？',
        options: [
            { label: '見た目がおしゃれなもの', scores: { visual: 3 } },
            { label: '実用性が高いもの（機能重視）', scores: { logic: 3 } },
            { label: '手紙やメッセージカードを添えること重視', scores: { language: 3 } },
            { label: '肌触りが良いものやリラックスグッズ', scores: { somatic: 3 } },
        ],
    },
    {
        id: 'q50',
        text: '人生で大切にしていることは？',
        options: [
            { label: '美しいものを見ること', scores: { visual: 3 } },
            { label: '美しい音を聞くこと', scores: { auditory: 3 } },
            { label: '深い思索や論理的思考', scores: { logic: 3 } },
            { label: '健康な体と美味しい食事', scores: { somatic: 3 } },
        ],
    }
];

