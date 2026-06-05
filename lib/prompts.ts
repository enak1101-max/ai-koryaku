/**
 * プロンプト集（docs/spec.md SCR-05 / FR-06）。
 * コピペで使えるテンプレ。tier で無料/有料を出し分け（有料は #6 認証導入後に解放）。
 * ※MVPでは構造データで管理（CMS化は後続）。
 */
export type PromptTemplate = {
  id: string;
  category: string;
  title: string;
  prompt: string;
  tier: "free" | "premium";
};

export const PROMPT_CATEGORIES = ["暮らし", "仕事", "学び"] as const;

export const PROMPTS: PromptTemplate[] = [
  // ---- 暮らし（無料） ----
  {
    id: "recipe-fridge",
    category: "暮らし",
    title: "冷蔵庫の材料でレシピ",
    prompt: "冷蔵庫にある「（材料を書く）」で作れる夕ごはんを、かんたんなレシピ付きで3つ提案してください。",
    tier: "free",
  },
  {
    id: "letter-thanks",
    category: "暮らし",
    title: "お礼の手紙",
    prompt: "次の人へのお礼の手紙を、心のこもったていねいな文章で書いてください。\n\n相手：（だれに）\nお礼の内容：（何について）",
    tier: "free",
  },
  {
    id: "explain-simple",
    category: "暮らし",
    title: "むずかしい言葉をやさしく",
    prompt: "「（わからない言葉）」とは何か、たとえ話を使って、子どもにも分かるようにやさしく教えてください。",
    tier: "free",
  },
  // ---- 仕事（無料 + 有料） ----
  {
    id: "mail-polite",
    category: "仕事",
    title: "ていねいなビジネスメール",
    prompt: "次の用件を、失礼のないていねいなビジネスメールにしてください。\n\n用件：（伝えたいこと）",
    tier: "free",
  },
  {
    id: "summarize-3lines",
    category: "仕事",
    title: "長文を3行に要約",
    prompt: "次の文章を、要点をのこして3行で分かりやすくまとめてください。\n\n（文章を貼り付け）",
    tier: "free",
  },
  {
    id: "meeting-minutes",
    category: "仕事",
    title: "議事録をきれいに整える（有料）",
    prompt: "次のメモを、見やすい議事録（日時・参加者・決定事項・宿題）に整えてください。\n\n（メモを貼り付け）",
    tier: "premium",
  },
  // ---- 学び（無料 + 有料） ----
  {
    id: "translate-en",
    category: "学び",
    title: "自然な英語に翻訳",
    prompt: "次の日本語を、自然でていねいな英語にしてください。\n\n（翻訳したい文）",
    tier: "free",
  },
  {
    id: "study-plan",
    category: "学び",
    title: "学習プランを立てる（有料）",
    prompt: "「（学びたいこと）」を3か月で身につけるための、1週間ごとの学習プランを作ってください。1日30分を想定します。",
    tier: "premium",
  },
];
