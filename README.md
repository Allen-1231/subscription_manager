# SubKeeper — 訂閱管家 App

**SubKeeper** 是一款協助使用者管理所有訂閱服務的 Mobile App，可追蹤訂閱費用、分析使用頻率、並提供省錢建議。

---

## 技術架構

| 項目 | 技術 |
| :--- | :--- |
| 框架 | React Native + Expo SDK 58 |
| 語言 | TypeScript |
| 導航 | Expo Router（File-based Routing） |
| 狀態管理 | React Context API |
| 樣式 | React Native StyleSheet（原生，無外部 UI 庫） |
| 主題 | 自訂暗黑紫藍漸層（Glassmorphism 風格） |
| 後端 | 尚未完成，目前使用假資料（`src/data/`） |

---

## 專案結構

```
subscription_manager/
├── src/                   ← 所有前端原始碼
│   ├── app/               ← Expo Router 路由頁面
│   │   ├── _layout.tsx    ← 根導航器（Stack）
│   │   ├── index.tsx      ← 歡迎首頁
│   │   ├── login.tsx      ← 登入 / 註冊
│   │   └── (tabs)/        ← 登入後的 4 分頁主畫面
│   ├── components/        ← 可重用 UI 元件
│   ├── context/           ← React Context 全域狀態
│   ├── data/              ← 假資料（後端完成後移除）
│   ├── types/             ← TypeScript 型別定義
│   ├── utils/             ← 純函式工具（金額計算）
│   └── theme.ts           ← 全域色彩常數
├── assets/                ← 圖片、icon、splash 等靜態資源
├── app.json               ← Expo App 設定（icon、scheme、plugins）
├── package.json           ← 套件依賴清單
├── tsconfig.json          ← TypeScript 編譯設定
└── AGENTS.md              ← AI 協作規則文件
```

---

## 主要功能

| 功能 | 狀態 |
| :--- | :--- |
| 歡迎頁（品牌 Logo + 預覽卡片） | ✅ 完成 |
| 登入 / 註冊流程 | ✅ 完成（假資料驗證） |
| 訂閱清單總覽（首頁） | ✅ 完成 |
| 訂閱新增 / 刪除（跨頁即時同步） | ✅ 完成 |
| 狀態分析（勾選 + 多維度分析） | ✅ 完成（使用頻率為假資料） |
| 省錢估算建議 | ✅ 完成（基於使用頻率） |
| 設定 / 登出 | ✅ 完成 |
| 後端 API 串接 | 🔲 待組員完成 |
| AI 訂閱建議 | 🔲 待組員完成 |

---

## 開發指令

```bash
npx expo start          # 啟動開發伺服器
npx expo start --android  # 直接在 Android 開啟
npx tsc --noEmit        # 型別檢查
npx expo lint           # Lint 檢查
npx expo-doctor         # 診斷依賴問題
```

---

## 測試帳號

> 後端完成前，使用以下假帳號登入：

| Email | 密碼 |
| :--- | :--- |
| amy@test.com | 123456 |
| ben@test.com | 123456 |

---

## 完整路由 × 資料流關係圖

```
App 啟動
  │
  ▼
_layout.tsx（Stack 根導航 + SubscriptionProvider）
  │
  ▼
/ ─── index.tsx（歡迎頁）
        │
        ├── [登入] ──► /login?mode=login
        └── [註冊] ──► /login?mode=register
                            │
                        [成功驗證]
                            │
                            ▼
                      /(tabs)（底部 4 分頁）
                        ├── /           首頁：訂閱摘要
                        ├── /subscriptions  訂閱管理
                        ├── /analysis   狀態分析
                        └── /settings
                                └── [登出] ──► / (歡迎頁)
```

```
資料流：
  mockSubscriptions.ts
       │（初始值）
       ▼
  SubscriptionContext
       │
       ├──► (tabs)/index.tsx        （讀取）
       ├──► (tabs)/subscriptions.tsx（讀 + 寫）
       └──► (tabs)/analysis.tsx     （讀取）
```

---

## 各資料夾的 README

| 資料夾 | 說明文件 |
| :--- | :--- |
| `src/` | [src/README.md](src/README.md) |
| `src/app/` | [src/app/README.md](src/app/README.md) |
| `src/app/(tabs)/` | [src/app/(tabs)/README.md](<src/app/(tabs)/README.md>) |
| `src/components/` | [src/components/README.md](src/components/README.md) |
| `src/context/` | [src/context/README.md](src/context/README.md) |
| `src/data/` | [src/data/README.md](src/data/README.md) |
| `src/types/` | [src/types/README.md](src/types/README.md) |
| `src/utils/` | [src/utils/README.md](src/utils/README.md) |
