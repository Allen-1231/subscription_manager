This is an Expo/React Native mobile application. Prioritize mobile-first patterns, performance, and cross-platform compatibility.

## Expo has changed — do not trust your training data

Expo ships breaking changes every SDK release. APIs you remember are likely renamed, moved, or removed. Before writing any code that touches an Expo, EAS, or React Native API:

1. Read the major version of the `expo` package in `package.json`.
2. Fetch the matching versioned docs: `https://docs.expo.dev/versions/v<major>.0.0/`
3. For anything else, fetch https://docs.expo.dev/llms.txt — an index of all Expo docs with corrections to common LLM misconceptions. Follow its links to the specific page you need; never answer from memory.

## Commands

Use `bunx` instead of `npx` if the project uses bun (`bun.lock` present).

```bash
npx expo install <package>  # ALWAYS use instead of npm/yarn/pnpm/bun add — resolves SDK-compatible versions
npx expo start              # start the dev server
npx expo lint               # lint
npx tsc --noEmit            # typecheck
npx expo-doctor             # diagnose dependency and config issues
npx expo install --fix      # fix incompatible package versions
```

Run lint and typecheck before declaring any task done.

## Navigation & Routing

- Use **Expo Router** for all navigation. Routes live in `src/app/` — every file there is a screen, `_layout.tsx` files define navigators. Keep non-route code (components, hooks, utils) outside `src/app/`.
- Import `Link`, `router`, and `useLocalSearchParams` from `expo-router`.
- Docs: https://docs.expo.dev/router/introduction.md

## Building with EAS

Use EAS to build, sign, and submit the app in the cloud (`eas build`, `eas submit`) and to ship over-the-air updates (`eas update`) — no local Xcode or Android Studio required. Run EAS CLI as `bunx eas-cli <command>` in Bun projects, or `npx eas-cli@latest <command>` otherwise; substitute that for bare `eas` in docs examples.
Docs: https://docs.expo.dev/eas/index.md

## Rules

- If `ios/` and `android/` directories do not exist, they are generated (Continuous Native Generation). Never create or edit them by hand — configure native behavior in `app.json` and config plugins.
- Expo Go only includes its bundled native modules. After adding a library with native code, the app needs a development build: `npx expo run:ios|android` locally, or `eas build --profile development`.
- Prefer recommended Expo modules over third-party libraries, and check your available skills before adding dependencies. Docs: https://docs.expo.dev/versions/latest/index.md

---

# 專案規則

## 專案說明
- 專案：訂閱管家 App
- 使用者與功能：可以查看客戶自己有訂閱哪些內容與方案與各自的金額、每個月與每年的訂閱開銷 (各自與總金額)、客戶若想取消，會有試算功能可以幫助客戶看若取消訂閱什麼或換方案會省多少，每個月與每年這樣省多少錢、一個月一次的客戶表單讓客戶勾選他的訂閱項目與使用頻繁率為何，並由 AI 告訴他是否其實可以不需要哪個訂閱
- 我負責 UI/UX 與前端（React 初學者，約學一個月）；後端與 AI 由組員負責，API 尚未完成

## 技術限制
- Expo、TypeScript、Expo Router
- 後端未完成前，一律使用 `src/data/` 內的假資料
- 資料欄位（暫定，與後端確認後再改）：
  Subscription = { id, name, plan, price, billingCycle ("monthly" | "yearly"), category }

## 資料夾規則
請參考：
```
src/
├── app/index.tsx              ← 只負責組合畫面，目標 100 行內
├── components/
│   ├── SubscriptionItem.tsx   ← 列表的單一列
│   ├── SubscriptionForm.tsx   ← 新增/編輯表單
│   └── SummaryCard.tsx        ← 月/年總花費卡片
├── utils/
│   └── calculations.ts        ← 月/年換算、加總
└── data/
    └── mockSubscriptions.ts   ← 假資料
```

## 程式風格
- 只用函式型元件，元件名稱 PascalCase，變數與函式 camelCase
- 單一檔案盡量不超過約 200 行，太長就拆元件
- 金額統一用同一個格式化函式顯示
- 不要使用網頁專屬元素（div、p、span）

## 工作方式
- 先說明你的規劃與假設，我確認後再寫程式
- 一次只處理我要求的那一件事
- 新檔案給完整內容；既有檔案只給變動處並標明位置
- 只有在使用我沒用過的 Expo API 或遇到錯誤時，才去查官方文件；一般畫面與樣式修改不需要
- 程式碼要完整可執行，加簡短中文註解，命名使用有意義的英文
- 新增套件前先告知並說明原因
- 不確定時先問我，不要自行猜測
- 完成後確認能執行、通過 lint 與 typecheck、不留 console.log

## UI/UX 原則
- 每個畫面都要處理：載入中、錯誤、空資料、處理中
- 按鈕文字要清楚，使用者要能一眼知道下一步
- 擁有優良的 UI/UX

## 禁止事項
- 不要把密碼、金鑰、.env 內容寫進程式或提交到 Git
- 不要在前端直接連資料庫，一律透過 API
- 不要更動不相關的檔案、不要自行升級套件版本

# 讀取通知
- 每次回答的第一行都要寫『已讀取專案規則』。