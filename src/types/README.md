# types/

存放 TypeScript **型別定義（Type Definitions）**，確保整個專案的資料結構一致，並提供 IDE 自動補全與編譯期型別檢查。

---

## 檔案說明

### `subscription.ts`
- **角色**：整個 App 中「訂閱項目」的核心資料型別定義，所有與訂閱相關的元件、頁面、Context、假資料都依賴此型別。
- **型別內容**：

```ts
export type Subscription = {
  id: string;        // 唯一識別碼（假資料用數字字串；後端串接後使用 UUID）
  name: string;      // 訂閱服務名稱，例如「Netflix」
  price: number;     // 費用金額（整數，新台幣）
  cycle: 'month' | 'year'; // 扣款週期：月繳 或 年繳
};
```

> [!NOTE]
> AGENTS.md 中的規劃欄位（待後端確認後擴充）：
> `plan`（方案名稱）、`billingCycle`（改名）、`category`（分類）

---

## 使用此型別的所有檔案

| 檔案 | 用途 |
| :--- | :--- |
| `src/data/mockSubscriptions.ts` | 假資料陣列的型別標注 |
| `src/data/mockUsers.ts` | （不使用） |
| `src/context/SubscriptionContext.tsx` | Context 狀態的型別標注 |
| `src/utils/calculations.ts` | 計算函式的參數型別 |
| `src/components/SubscriptionItem.tsx` | 元件 props 的型別 |
| `src/app/(tabs)/subscriptions.tsx` | 新增訂閱時建立的物件型別 |
| `src/app/(tabs)/analysis.tsx` | 分析函式的資料型別 |
