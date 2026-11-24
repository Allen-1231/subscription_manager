import { Subscription } from "../types/subscription";

/** 單筆訂閱換算成每月費用（年繳除以 12 並四捨五入） */
export const toMonthly = (sub: Subscription): number =>
  sub.cycle === "month" ? sub.price : Math.round(sub.price / 12);

/** 多筆訂閱的每月總費用 */
export const getMonthlyTotal = (subs: Subscription[]): number =>
  subs.reduce((sum, sub) => sum + toMonthly(sub), 0);

/** 金額統一顯示格式，例如 1299 → $1,299 */
export const formatMoney = (amount: number): string =>
  `$${amount.toLocaleString()}`;

/** 週期的中文單位：month → 月、year → 年 */
export const getCycleUnit = (cycle: Subscription["cycle"]): string =>
  cycle === "month" ? "月" : "年";
