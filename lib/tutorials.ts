/**
 * チュートリアル（docs/spec.md SCR-03/04 / FR-04）。
 * 基礎コースは無料。各ステップに体験チャットへ送れる例文(example)を持てる（FR-05）。
 * ※MVPではMarkdown相当の構造データで管理（CMS化は後続）。
 */
export type TutorialStep = {
  title: string;
  body: string;
  /** 「この例文で試す」で体験チャットに送る例文（任意） */
  example?: string;
};

export type Tutorial = {
  id: string;
  title: string;
  summary: string;
  emoji: string;
  tier: "free" | "premium";
  steps: TutorialStep[];
};

export const TUTORIALS: Tutorial[] = [
  {
    id: "first-step",
    title: "はじめてAIに話しかけてみよう",
    summary: "むずかしくありません。まずは1回、質問してみましょう。",
    emoji: "👋",
    tier: "free",
    steps: [
      {
        title: "体験ページをひらく",
        body: "「ためしてみる」ボタンを押すと、AIと話せるページが開きます。登録は要りません。",
      },
      {
        title: "質問を入れて送る",
        body: "下の入力らんに聞きたいことを書いて「送る」を押します。お題ボタンを押すと例文が入って便利です。",
        example: "こんにちは。あなたにできることを、かんたんに教えてください。",
      },
      {
        title: "答えを聞いてみる",
        body: "AIの返事のところにある🔊ボタンを押すと、声で読み上げてくれます。",
      },
    ],
  },
  {
    id: "summarize",
    title: "長い文章を短くまとめてもらう",
    summary: "メールやお知らせの長文を、3行でわかりやすく。",
    emoji: "📝",
    tier: "free",
    steps: [
      {
        title: "まとめたい文章を用意する",
        body: "新聞記事やメールなど、長くて読むのが大変な文章を用意します。",
      },
      {
        title: "AIにお願いする",
        body: "「次の文章を3行でまとめて」とお願いし、続けて文章を貼り付けます。",
        example: "次の文章を、3行くらいの分かりやすい言葉でまとめてください。\n\n（ここに文章を貼り付けてください）",
      },
    ],
  },
  {
    id: "polite-mail",
    title: "ていねいなメールを書いてもらう",
    summary: "言いたいことを伝えるだけで、失礼のない文章に。",
    emoji: "✉️",
    tier: "free",
    steps: [
      {
        title: "伝えたいことを決める",
        body: "「お礼を言いたい」「お願いごとがある」など、用件を思い浮かべます。",
      },
      {
        title: "AIにていねいにしてもらう",
        body: "用件を書いて「ていねいなメールにして」とお願いします。",
        example: "次の内容を、相手に失礼のないていねいなメール文にしてください。\n\n先日はお世話になりました。来週の打ち合わせを、火曜日に変更したいです。",
      },
    ],
  },
  {
    id: "translate",
    title: "英語に翻訳してもらう",
    summary: "海外の家族や旅行のとき、言葉の心配がへります。",
    emoji: "🌏",
    tier: "free",
    steps: [
      {
        title: "翻訳したい文を決める",
        body: "短い文からはじめると安心です。",
      },
      {
        title: "AIに翻訳をお願いする",
        body: "「次の日本語を英語にして」とお願いします。",
        example: "次の日本語を自然な英語にしてください。\n\n「写真をいっしょに撮ってもいいですか？」",
      },
    ],
  },
  {
    id: "recipe",
    title: "今日の献立を相談する",
    summary: "冷蔵庫にある材料を伝えると、レシピを提案してくれます。",
    emoji: "🍳",
    tier: "free",
    steps: [
      {
        title: "ある材料を書き出す",
        body: "冷蔵庫にあるものを思い出して、いくつか挙げてみましょう。",
      },
      {
        title: "AIに献立を聞く",
        body: "材料を伝えて「夕ごはんの献立を考えて」とお願いします。",
        example: "冷蔵庫にある「卵・キャベツ・豚肉」で作れる夕ごはんの献立を、かんたんなレシピ付きで提案してください。",
      },
    ],
  },
  {
    id: "explain",
    title: "わからない言葉を教えてもらう",
    summary: "横文字やニュースの言葉を、やさしく解説してもらえます。",
    emoji: "💡",
    tier: "free",
    steps: [
      {
        title: "わからない言葉を見つける",
        body: "ニュースや説明書で出てきた、意味がわからない言葉を選びます。",
      },
      {
        title: "AIにやさしく聞く",
        body: "「○○とは何か、やさしく教えて」と聞いてみましょう。",
        example: "「サブスク」とは何か、パソコンが苦手な人にも分かるように、たとえ話を使ってやさしく教えてください。",
      },
    ],
  },
];

export function getTutorial(id: string): Tutorial | undefined {
  return TUTORIALS.find((t) => t.id === id);
}
