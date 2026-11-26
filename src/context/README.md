# context/

存放 React **Context（全域狀態）** 相關檔案，讓跨頁面的資料共享不需透過路由參數逐層傳遞。

---

## 檔案說明

### `SubscriptionContext.tsx`
- **角色**：整個 App 的**訂閱資料共享層（Single Source of Truth）**，確保「首頁」、「訂閱內容」、「狀態分析」三個分頁使用同一份資料，任何修改都會即時同步。
- **狀態**：
  - `subscriptions: Subscription[]` — 目前所有訂閱項目的陣列
- **提供的函式**：
  - `addSubscription(name, price, cycle)` — 新增一筆訂閱（加在最前面）
  - `deleteSubscription(id)` — 依 ID 刪除一筆訂閱
- **初始資料**：來自 `src/data/mockSubscriptions.ts`（後端完成後替換為 API 呼叫）
- **掛載位置**：`src/app/_layout.tsx` 的 `<SubscriptionProvider>` 包裝整個 Stack 導航器

---

## 使用方式

```tsx
// 在任何子元件中取得訂閱資料與操作函式：
import { useSubscriptions } from '../context/SubscriptionContext';

const { subscriptions, addSubscription, deleteSubscription } = useSubscriptions();
```

> **注意**：`useSubscriptions()` 必須在 `<SubscriptionProvider>` 的子元件中呼叫，否則會拋出錯誤。

---

## 資料流圖

```
src/data/mockSubscriptions.ts
         │（初始資料）
         ▼
SubscriptionContext（Provider 在 _layout.tsx）
         │
         ├──► (tabs)/index.tsx        讀取 subscriptions
         ├──► (tabs)/subscriptions.tsx 讀取 + 呼叫 add / delete
         └──► (tabs)/analysis.tsx     讀取 subscriptions
```
