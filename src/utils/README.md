# utils/

存放**純函式工具（Pure Functions）**，不包含任何 UI 邏輯，可在元件、頁面、Context 中任意引用。

---

## 檔案說明

### `calculations.ts`
- **角色**：金額計算與顯示格式的統一工具函式，確保整個 App 的數字顯示一致，不在各頁面重複撰寫相同邏輯。
- **提供的函式**：

| 函式名稱 | 說明 | 範例 |
| :--- | :--- | :--- |
| `toMonthly(sub)` | 將單筆訂閱換算為每月費用（年繳 ÷ 12 四捨五入） | 年繳 $18,000 → $1,500/月 |
| `getMonthlyTotal(subs)` | 多筆訂閱的每月費用加總 | [$390, $149, $1,500] → $2,039 |
| `formatMoney(amount)` | 統一金額顯示格式（千分位逗號，前加 $） | 1299 → `$1,299` |
| `getCycleUnit(cycle)` | 週期的中文單位 | `"month"` → `"月"` |

---

## 使用建議

在各分頁中引用這些函式，取代各自散落的 inline 計算邏輯：

```ts
import { getMonthlyTotal, formatMoney } from '../../utils/calculations';

const monthlyTotal = getMonthlyTotal(subscriptions);
// 顯示時：formatMoney(monthlyTotal) → "$2,039"
```

> [!TIP]
> 目前部分頁面仍有 inline 計算（如 `subscriptions.reduce(...)` 直接寫在元件中）。建議統一改用此模組，讓計算邏輯集中管理，未來換算規則改變時只需修改一處。
