# src/

前端原始碼的**根目錄**，所有與 App 邏輯、畫面、元件、資料相關的程式碼都存放於此（Expo Router 設定 `appDir: 'src'`）。

---

## 目錄結構

```
src/
├── app/                   ← 路由頁面（Expo Router 自動對應）
│   ├── _layout.tsx        ← 根 Stack 導航器 + SubscriptionProvider 注入
│   ├── index.tsx          ← 歡迎首頁 (/)
│   ├── login.tsx          ← 登入 / 註冊頁 (/login)
│   └── (tabs)/            ← 登入後的主功能分頁群組
│       ├── _layout.tsx    ← 底部 Tab 導航器
│       ├── index.tsx      ← 首頁摘要 (/)
│       ├── subscriptions.tsx ← 訂閱管理 (/subscriptions)
│       ├── analysis.tsx   ← 狀態分析 (/analysis)
│       └── settings.tsx   ← 設定 (/settings)
│
├── components/            ← 可重用 UI 元件
│   ├── AnimatedLogo.tsx
│   ├── HeroPreviewCard.tsx
│   ├── PrimaryButton.tsx
│   ├── SecondaryButton.tsx
│   ├── ScreenBackground.tsx
│   ├── SubscriptionItem.tsx
│   └── TopLoadingBar.tsx
│
├── context/               ← React Context（全域狀態）
│   └── SubscriptionContext.tsx
│
├── data/                  ← 假資料（後端完成後移除）
│   ├── mockSubscriptions.ts
│   └── mockUsers.ts
│
├── types/                 ← TypeScript 型別定義
│   └── subscription.ts
│
├── utils/                 ← 純函式工具
│   └── calculations.ts
│
└── theme.ts               ← 全 App 共用色彩常數
```

---

## `theme.ts` — 全域色彩主題

- **角色**：集中管理整個 App 的色彩設計 Token，所有顏色只在此一處定義，之後需要換色只改這個檔案。
- **包含的色彩**：

| 色彩名稱 | 色碼 | 用途說明 |
| :--- | :--- | :--- |
| `primary` | `#a78bfa` | 主色：按鈕、強調文字 |
| `primaryGradient` | `["#6366f1","#a855f7","#ec4899"]` | 主視覺漸層（按鈕、Logo） |
| `backgroundGradient` | `["#0f0c29","#302b63","#24243e"]` | 全畫面背景漸層 |
| `text` | `#e0e0ff` | 一般正文文字 |
| `textSecondary` | `rgba(255,255,255,0.45)` | 次要說明文字 |
| `accent` | `#c4b5fd` | 金額、Badge 等強調色 |
| `success` | `#4ade80` | 高使用率、成功狀態 |
| `warning` | `#fbbf24` | 中使用率、警示 |
| `error` | `#f87171` | 低使用率、刪除、錯誤 |

---

## 完整路由 × 資料流關係圖

```
App 啟動
  │
  ▼
_layout.tsx（Stack 根導航）
  ├── SubscriptionProvider（全域訂閱資料注入）
  │
  ▼
/ ─ index.tsx（歡迎頁）
  │   ├── AnimatedLogo
  │   ├── HeroPreviewCard
  │   ├── PrimaryButton → /login?mode=login
  │   └── SecondaryButton → /login?mode=register
  │
/login ─ login.tsx
  │   ├── TopLoadingBar
  │   ├── [驗證 mockUsers]
  │   └── 成功 → /(tabs) + 傳入 name
  │
/(tabs) ─ Tabs 導航器
  ├── /(tabs)/ ─ index.tsx（首頁）
  │               └── 讀取 SubscriptionContext
  ├── /subscriptions ─ subscriptions.tsx
  │               └── 讀取 + 寫入 SubscriptionContext
  ├── /analysis ─ analysis.tsx
  │               └── 讀取 SubscriptionContext
  └── /settings ─ settings.tsx
                  └── 登出 → router.dismissAll() + router.replace("/")
```
