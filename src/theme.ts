/**
 * 全 App 共用的深紫色主題色彩定義（原生純 JavaScript 物件）
 * 不依賴任何外部 UI 庫，方便在各元件中直接引用顏色變數
 */
export const theme = {
  colors: {
    primary: "#a78bfa", // 主色：按鈕、強調文字
    primaryGradient: ["#6366f1", "#a855f7", "#ec4899"], // 主視覺漸層
    backgroundGradient: ["#0f0c29", "#302b63", "#24243e"], // 背景漸層
    background: "#0f0c29",
    surface: "#1c1940",
    surfaceCard: "rgba(255, 255, 255, 0.06)", // Card 半透明底色
    surfaceCardBorder: "rgba(255, 255, 255, 0.08)",
    text: "#e0e0ff", // 一般文字
    textSecondary: "rgba(255, 255, 255, 0.45)", // 次要文字
    textMuted: "rgba(255, 255, 255, 0.3)",
    accent: "#c4b5fd",
    border: "rgba(255, 255, 255, 0.1)",
    success: "#4ade80",
    warning: "#fbbf24",
    error: "#f87171",
  },
};
