# app/

Expo Router 的**路由根目錄**，每個 `.tsx` 檔案都對應一個頁面（路由），`_layout.tsx` 定義導航器的結構。

---

## 檔案說明

### `_layout.tsx` — 根路由佈局（Stack 導航器）
- **角色**：整個 App 的最外層導航容器，同時注入全域 `SubscriptionProvider`（訂閱資料共享狀態）。
- **包含的 Stack 路由**：
  - `index`（歡迎頁）
  - `login`（登入 / 註冊頁）
  - `(tabs)`（登入後的主功能分頁群組）

### `index.tsx` — 歡迎首頁 (`/`)
- **角色**：App 啟動後第一個看到的畫面，也是登出後的返回目標。
- **功能**：展示品牌 Logo（`AnimatedLogo`）、App 標語、預覽卡片（`HeroPreviewCard`），以及「**登入**」與「**註冊**」兩個按鈕。
- **跳轉**：
  - 「登入」→ `router.push('/login?mode=login')`
  - 「註冊」→ `router.push('/login?mode=register')`

### `login.tsx` — 登入 / 註冊頁 (`/login`)
- **角色**：同一個頁面兼容兩種模式，以 `mode` URL 參數（`login` / `register`）切換顯示內容。
- **功能**：
  - 電子郵件與密碼表單
  - 頂端載入條（`TopLoadingBar`）給等待回應的視覺回饋
  - 登入成功後以 `router.replace('/(tabs)')` 進入主頁，並傳遞使用者名稱
- **登入驗證**：目前對比 `src/data/mockUsers.ts` 的假帳號（後端完成後替換為 API 呼叫）

---

## 路由關係圖

```
App 啟動
  │
  ▼
/ (index.tsx — 歡迎頁)
  │
  ├─ [登入按鈕] ──────► /login?mode=login (login.tsx)
  │                           │
  └─ [註冊按鈕] ──────► /login?mode=register
                              │
                      [成功驗證 / 註冊]
                              │
                              ▼
                        /(tabs)（主分頁群組）
                              │
                      [設定→登出] ──► / (歡迎頁)
```

---

## 相關目錄

| 關聯對象 | 說明 |
| :--- | :--- |
| `(tabs)/` | 登入後的主功能分頁群組，定義底部 4 個 Tab |
| `src/context/SubscriptionContext.tsx` | 在 `_layout.tsx` 注入，讓所有子頁面共享訂閱資料 |
| `src/components/AnimatedLogo.tsx` | 歡迎頁使用的動態 Logo 元件 |
| `src/components/HeroPreviewCard.tsx` | 歡迎頁使用的預覽卡片元件 |
| `src/data/mockUsers.ts` | 目前登入驗證使用的假帳號資料 |
