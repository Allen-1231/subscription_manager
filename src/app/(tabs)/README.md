# app/(tabs)/

**登入後的主功能區域**，使用 Expo Router 的 `Tabs` 導航器，提供底部四個分頁按鈕，所有頁面共享同一組訂閱資料狀態（透過 `SubscriptionContext`）。

---

## 檔案說明

### `_layout.tsx` — 分頁導航器佈局
- **角色**：定義底部 Tab Bar 的外觀與四個分頁的路由名稱、icon 與標籤文字。
- **Tab Bar 樣式**：深紫色背景（`#1a1740`）+ 半透明頂部邊框，使用 `useSafeAreaInsets()` 自動避開 Android 底部導航列。
- **分頁清單**：

| 分頁名稱 | 路由 | Icon |
| :--- | :--- | :--- |
| 首頁 | `index` | 🏠 |
| 訂閱內容 | `subscriptions` | 📋 |
| 狀態分析 | `analysis` | 📊 |
| 設定 | `settings` | ⚙️ |

---

### `index.tsx` — 首頁（`/(tabs)/`）
- **角色**：登入後看到的第一個畫面，顯示訂閱摘要總覽。
- **功能**：
  - 顯示問候語（從登入頁傳入的使用者名稱）
  - 每月總支出卡片（漸層毛玻璃風格）
  - 三格統計卡（每月費用、年度預估、訂閱數量）
  - 訂閱列表（與「訂閱內容」頁即時同步）
- **資料來源**：`useSubscriptions()` Context，所有訂閱新增 / 刪除會即時反映

---

### `subscriptions.tsx` — 訂閱內容（`/(tabs)/subscriptions`）
- **角色**：讓使用者查看、新增、刪除訂閱項目的主要管理頁面。
- **功能**：
  - 顯示所有訂閱清單，每項右側有 🗑️ 垃圾桶刪除按鈕
  - 右上角「+ 新增」按鈕開啟 Modal 底部彈窗，可輸入名稱、金額、週期（月 / 年）
  - 刪除會出現確認 Alert（含訂閱名稱）
- **資料來源 / 寫入**：`useSubscriptions()` → `addSubscription()` / `deleteSubscription()`
- **聯動效果**：新增 / 刪除後，「首頁」與「狀態分析」的資料即時更新

---

### `analysis.tsx` — 狀態分析（`/(tabs)/analysis`）
- **角色**：讓使用者勾選訂閱項目並查看費用分析與省錢建議。
- **功能**：
  - 多選勾選訂閱清單（支援全選 / 取消全選）
  - 自動計算選取項目的月費、年費
  - 使用頻繁度分佈長條圖（高 🟢 / 中 🟡 / 低 🔴）
  - 低使用率項目警示 + 省錢估算（月 / 年可節省金額）
- **資料來源**：`useSubscriptions()` Context（與訂閱內容頁共用同一份資料）

---

### `settings.tsx` — 設定（`/(tabs)/settings`）
- **角色**：App 的設定中心，目前為佔位介面（待後端串接）。
- **功能**：
  - 帳號區塊（個人資料、變更密碼）
  - 通知區塊（推播通知、Email 通知）
  - 偏好設定（貨幣、深色模式、語言）
  - 其他（關於 App、隱私政策）
  - **登出**：點擊後出現確認 Alert，確認後清除導航歷史並 `router.replace("/")` 返回歡迎首頁

---

## 路由關係圖（分頁間）

```
/(tabs) — Tabs 導航器
  │
  ├─ /         (tabs/index.tsx)         ← 首頁：訂閱摘要總覽
  ├─ /subscriptions (tabs/subscriptions.tsx) ← 訂閱管理（新增 / 刪除）
  ├─ /analysis  (tabs/analysis.tsx)     ← 勾選分析 + 省錢建議
  └─ /settings  (tabs/settings.tsx)     ← 設定 + 登出
           │
           └─ [登出] ──────────────────► / (歡迎首頁)
```

---

## 資料流關係圖

```
SubscriptionContext（全域狀態）
       │
       ├──► tabs/index.tsx        （讀取：展示列表與統計）
       ├──► tabs/subscriptions.tsx（讀取 + 寫入：新增 / 刪除）
       └──► tabs/analysis.tsx     （讀取：勾選分析）
```
