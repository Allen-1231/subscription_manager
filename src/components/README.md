# components/

共用的 **React Native 元件庫**，所有元件均為函式型元件（Function Component），按職責單一原則設計，可在多個頁面重複使用。

---

## 檔案說明

### `AnimatedLogo.tsx`
- **角色**：歡迎首頁上方的品牌識別動態 Logo。
- **功能**：使用 `Animated.loop` 讓圓角方框的背景色、邊框色、陰影色在靛藍 → 紫色 → 粉紅之間循環漸變（呼吸燈效果），內部顯示可自訂的 emoji icon（預設 💳）。
- **使用於**：`src/app/index.tsx`（歡迎頁）

---

### `HeroPreviewCard.tsx`
- **角色**：歡迎首頁中央的視覺預覽卡片，讓使用者看到 App 的主要資訊呈現樣式。
- **功能**：
  - 三層堆疊卡片（兩張偏移裝飾底卡 + 一張主資訊前景卡）
  - 展示「每月總支出」金額與訂閱數量
  - 純展示用（props 為假資料），後端完成後不會更動此元件
- **使用於**：`src/app/index.tsx`（歡迎頁）

---

### `PrimaryButton.tsx`
- **角色**：全 App 通用的**主要操作按鈕**（漸層版）。
- **功能**：三色漸層（靛藍 → 紫 → 粉紅），內含陰影，接受 `title` 與 `onPress` props，繼承 `TouchableOpacityProps` 可傳入 `style` 覆蓋寬度等屬性。
- **使用於**：`src/app/index.tsx`（「登入」按鈕）

---

### `SecondaryButton.tsx`
- **角色**：全 App 通用的**次要操作按鈕**（透明邊框版），與 `PrimaryButton` 搭配成一組。
- **功能**：半透明紫色邊框背景，文字為淺紫色，視覺層級低於 `PrimaryButton`。
- **使用於**：`src/app/index.tsx`（「註冊」按鈕）

---

### `ScreenBackground.tsx`
- **角色**：**每個畫面共用的深紫漸層背景包裝元件**，統一管理背景色、StatusBar 顏色與安全邊界（Safe Area）。
- **功能**：
  - 自動套用 `StatusBar barStyle="light-content"`
  - 自動計算 `useSafeAreaInsets()` 的頂部與底部留白
  - `withBottomInset` prop：歡迎頁 / 登入頁等無底部 TabBar 的頁面設為 `true` 以避開 Android 底部導航列
- **使用於**：（提供給所有畫面使用的基礎包裝層）

---

### `SubscriptionItem.tsx`
- **角色**：訂閱清單的**單一列元件**（早期版本遺留，目前各 Tab 頁面以 inline 方式渲染列表項目）。
- **功能**：顯示訂閱名稱與價格（`$390 / 月`）。
- **型別依賴**：`src/types/subscription.ts` 的 `Subscription`

---

### `TopLoadingBar.tsx`
- **角色**：登入 / 認證等非同步操作進行中時，顯示在畫面頂端的**藍色滑動載入條**。
- **功能**：
  - `visible` 為 `true` 時，色塊從螢幕左側持續滑向右側（無限迴圈）
  - 使用 `useNativeDriver: true` 確保動畫由原生層驅動，流暢不卡頓
  - 位置自動貼齊 StatusBar 下方（`useSafeAreaInsets`）
- **使用於**：`src/app/login.tsx`

---

## 元件依賴關係

```
app/index.tsx
  ├── AnimatedLogo
  ├── HeroPreviewCard
  ├── PrimaryButton
  └── SecondaryButton

app/login.tsx
  └── TopLoadingBar

(所有畫面可用)
  └── ScreenBackground   ← 共用背景包裝

(早期遺留，目前各頁面 inline 渲染)
  └── SubscriptionItem
```
