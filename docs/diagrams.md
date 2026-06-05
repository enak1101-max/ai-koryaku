# 図面集（アーキテクチャ／シーケンス） — ４0代からできるAI攻略

| 項目 | 値 |
|------|-----|
| ドキュメント種別 | 設計図面（Phase 2: Design） |
| バージョン | 0.1.0（ドラフト） |
| 作成日 | 2026-06-05 |
| 元ドキュメント | [requirements.md](./requirements.md) / [spec.md](./spec.md) / [design.md](./design.md) |
| 記法 | Mermaid（GitHub等でレンダリング可） |

---

## 1. アーキテクチャ図（コンポーネント）

```mermaid
flowchart TB
    subgraph Client["ブラウザ（スマホ / PC）"]
        UI["Next.js 画面<br/>大文字・高コントラスト"]
        TTS["音声読み上げ<br/>Web Speech API speechSynthesis"]
        STT["音声入力<br/>Web Speech API SpeechRecognition"]
        UI --- TTS
        UI --- STT
    end

    subgraph App["Next.js サーバー（BFF / API ルート）"]
        API_CHAT["/api/chat<br/>AI中継・ストリーミング"]
        RATE["レート制限・無料枠カウント"]
        API_AUTH["/api/auth・/api/billing<br/>CC-Auth 委譲"]
        API_CONT["/api/tutorials・/api/prompts<br/>tier別出し分け"]
        API_ME["/api/me/*<br/>進捗・お気に入り"]
    end

    subgraph Data["データストア"]
        DB[("User / UsageDaily<br/>Progress / Favorite")]
        CONTENT[("Content<br/>CMS or Markdown")]
    end

    subgraph Ext["外部サービス"]
        CLAUDE["Anthropic<br/>Claude API"]
        CCAUTH["CC-Auth<br/>Platform SDK"]
        CLOUDV["(拡張) Polly / Transcribe / Whisper"]
    end

    UI -->|HTTPS| API_CHAT
    UI -->|HTTPS| API_AUTH
    UI -->|HTTPS| API_CONT
    UI -->|HTTPS| API_ME

    API_CHAT --> RATE
    RATE --> DB
    API_CHAT -->|stream| CLAUDE
    API_AUTH --> CCAUTH
    API_CONT --> CONTENT
    API_CONT --> DB
    API_ME --> DB
    TTS -. 品質拡張 .-> CLOUDV
    STT -. 精度拡張 .-> CLOUDV

    subgraph Infra["AWS"]
        CF["CloudFront"]
    end
    CF --- App
```

---

## 2. シーケンス図：声だけで完結するAIチャット（FR-02/03/10/11）

```mermaid
sequenceDiagram
    actor U as 利用者(シニア)
    participant UI as 画面(SCR-02)
    participant STT as 音声入力(STT)
    participant API as /api/chat
    participant RATE as 無料枠カウント
    participant AI as Claude API
    participant TTS as 音声読み上げ(TTS)

    U->>UI: 🎤「話す」を押す
    UI->>STT: 録音・認識開始(ja-JP)
    STT-->>UI: 認識テキスト
    UI-->>U: 入力欄に表示（確認・修正できる）
    U->>UI: 「送る」を押す
    UI->>API: POST /api/chat {messages}
    API->>RATE: 当日カウント確認・減算
    alt 無料枠内
        RATE-->>API: OK(残N)
        API->>AI: メッセージ送信(stream)
        AI-->>API: トークン逐次
        API-->>UI: SSEで逐次返却
        UI-->>U: 回答をストリーミング表示
        U->>UI: 🔊「聞く」を押す
        UI->>TTS: 回答を読み上げ
        TTS-->>U: 音声再生
    else 上限到達(429)
        RATE-->>API: limit到達
        API-->>UI: 429 {limit, resetAt}
        UI-->>U: 「今日の無料体験は終わりです」+ 登録/課金導線
    end
```

---

## 3. シーケンス図：学んで試す（チュートリアル⇄体験連動 FR-04/05）

```mermaid
sequenceDiagram
    actor U as 利用者
    participant L as 一覧(SCR-03)
    participant D as 詳細(SCR-04)
    participant API as /api/tutorials/:id
    participant TTS as 読み上げ
    participant C as 体験チャット(SCR-02)

    U->>L: チュートリアルを選ぶ
    L->>API: GET /api/tutorials/:id
    API-->>L: 本文・ステップ(tier判定)
    L-->>D: 詳細表示(進捗 0/n)
    U->>D: 🔊 本文を聞く
    D->>TTS: 読み上げ
    U->>D: 「この例文で試す」
    D->>C: 例文を渡して遷移
    C-->>U: 例文が入力済みで体験開始
```

---

## 4. シーケンス図：フリーミアム課金（FR-07/08）

```mermaid
sequenceDiagram
    actor U as 利用者
    participant UI as 料金/登録(SCR-06/07)
    participant API as /api/auth・/api/billing
    participant CC as CC-Auth SDK
    participant DB as User

    U->>UI: 「無料会員になる」
    UI->>API: POST /api/auth (登録)
    API->>CC: アカウント作成
    CC-->>API: ユーザートークン
    API->>DB: User作成(plan=free)
    API-->>UI: ログイン状態

    U->>UI: 「プレミアムに申し込む」
    UI->>API: POST /api/billing/checkout
    API->>CC: 課金フロー開始
    CC-->>U: 決済画面
    U->>CC: 決済完了
    CC-->>API: 課金成功 webhook/結果
    API->>DB: plan=premium に更新
    API-->>UI: 有料機能を即時解放
```

---

## 5. 状態遷移：AIチャット入力（音声フォールバック含む）

```mermaid
stateDiagram-v2
    [*] --> 待機
    待機 --> 録音中: 🎤押下(対応&許可)
    待機 --> 入力中: キーボード入力
    録音中 --> 確認: 認識完了
    録音中 --> 待機: マイク不可/拒否→フォールバック
    確認 --> 入力中: 修正
    確認 --> 送信中: 送る
    入力中 --> 送信中: 送る
    送信中 --> 完了: 回答受信(stream終了)
    送信中 --> エラー: AI障害(503)
    送信中 --> 上限: 429到達
    エラー --> 待機: やり直す
    上限 --> [*]: 登録/課金へ
    完了 --> 待機
```

---

## 6. 次のステップ
1. 図のレビュー・承認
2. Issue起票（Epic＋Phase/Wave分解）→ `/create-issue`
3. Phase 4 実装（Agent経由：Coordinator / CodeGen）

---

*CCAGI SDK — Phase 2: Design (Diagrams) / Standard tier*
