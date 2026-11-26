# data/

存放**假資料（Mock Data）**，在後端 API 完成前供前端開發與測試使用。後端完成後，此資料夾的檔案將被 API 呼叫取代（或僅作為型別參考保留）。

---

## 檔案說明

### `mockSubscriptions.ts`
- **角色**：訂閱清單的假資料，作為 `SubscriptionContext` 的初始狀態。
- **內容**（5 筆預設資料）：

| 名稱 | 金額 | 週期 |
| :--- | :--- | :--- |
| Netflix | $390 | 月 |
| Spotify | $149 | 月 |
| YouTube Premium | $179 | 月 |
| iCloud | $30 | 月 |
| Adobe Creative Cloud | $18,000 | 年 |

- **型別**：符合 `src/types/subscription.ts` 的 `Subscription` 型別
- **使用於**：`src/context/SubscriptionContext.tsx`

---

### `mockUsers.ts`
- **角色**：登入驗證用的假帳號清單，後端完成後**整個檔案刪除**。
- **內容**（2 組測試帳號）：

| Email | 密碼 | 顯示名稱 |
| :--- | :--- | :--- |
| amy@test.com | 123456 | Amy |
| ben@test.com | 123456 | Ben |

- **使用於**：`src/app/login.tsx`（登入驗證邏輯）

---

## 注意事項

> [!CAUTION]
> 這些都是**測試假資料**，絕對不能包含真實密碼、API 金鑰或任何敏感資訊，也不能提交到 Git 的正式分支。

> [!NOTE]
> 後端 API 完成後，`mockUsers.ts` 優先刪除（登入改為呼叫 `/auth/login`）；`mockSubscriptions.ts` 可視情況保留作為型別範例或測試用途。
