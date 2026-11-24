import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSubscriptions } from "../../context/SubscriptionContext";

type FrequencyLevel = "high" | "medium" | "low";

export default function AnalysisTab() {
  const insets = useSafeAreaInsets();
  const { subscriptions } = useSubscriptions();

  // 多選已勾選的訂閱
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // 根據項目預設或名稱字數簡單決定頻率（如已有固定對應則採用）
  const getFrequency = (id: string, name: string): FrequencyLevel => {
    const fixedMap: Record<string, FrequencyLevel> = {
      "1": "high",    // Netflix
      "2": "medium",  // Spotify
      "3": "high",    // YouTube Premium
      "4": "low",     // iCloud
      "5": "low",     // Adobe
    };
    if (fixedMap[id]) return fixedMap[id];
    // 新增項目的預設頻率判斷
    if (name.toLowerCase().includes("premium") || name.toLowerCase().includes("pro")) return "high";
    if (name.length % 2 === 0) return "medium";
    return "low";
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const selectAll = () => {
    if (selectedIds.size === subscriptions.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(subscriptions.map((s) => s.id)));
    }
  };

  // 計算選中的訂閱分析
  const analysis = useMemo(() => {
    const selected = subscriptions.filter((s) => selectedIds.has(s.id));

    const totalMonthly = selected.reduce((sum, s) => {
      return sum + (s.cycle === "month" ? s.price : Math.round(s.price / 12));
    }, 0);

    const totalYearly = totalMonthly * 12;

    const highUsage = selected.filter((s) => getFrequency(s.id, s.name) === "high");
    const mediumUsage = selected.filter((s) => getFrequency(s.id, s.name) === "medium");
    const lowUsage = selected.filter((s) => getFrequency(s.id, s.name) === "low");

    const potentialSavings = lowUsage.reduce((sum, s) => {
      return sum + (s.cycle === "month" ? s.price : Math.round(s.price / 12));
    }, 0);

    return {
      selected,
      totalMonthly,
      totalYearly,
      highUsage,
      mediumUsage,
      lowUsage,
      potentialSavings,
    };
  }, [subscriptions, selectedIds]);

  const getFrequencyColor = (level: FrequencyLevel) => {
    switch (level) {
      case "high":
        return "#4ade80";
      case "medium":
        return "#fbbf24";
      case "low":
        return "#f87171";
    }
  };

  const getFrequencyLabel = (level: FrequencyLevel) => {
    switch (level) {
      case "high":
        return "經常使用";
      case "medium":
        return "偶爾使用";
      case "low":
        return "很少使用";
    }
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={["#0f0c29", "#302b63", "#24243e"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.container, { paddingTop: insets.top + 16 }]}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* 標題 */}
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.title}>狀態分析</Text>
              <Text style={styles.subtitle}>勾選要分析的訂閱項目</Text>
            </View>
            {subscriptions.length > 0 && (
              <Pressable
                style={({ pressed }) => [styles.selectAllBtn, pressed && { opacity: 0.7 }]}
                onPress={selectAll}
              >
                <Text style={styles.selectAllText}>
                  {selectedIds.size === subscriptions.length ? "取消全選" : "全選"}
                </Text>
              </Pressable>
            )}
          </View>

          {/* 訂閱選擇清單 */}
          {subscriptions.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>📭</Text>
              <Text style={styles.emptyText}>目前沒有任何訂閱項目</Text>
              <Text style={styles.emptySubText}>請先至「訂閱內容」頁面新增項目</Text>
            </View>
          ) : (
            <View style={styles.checklistSection}>
              {subscriptions.map((sub) => {
                const isSelected = selectedIds.has(sub.id);
                const freq = getFrequency(sub.id, sub.name);
                return (
                  <Pressable
                    key={sub.id}
                    style={[styles.checkItem, isSelected && styles.checkItemSelected]}
                    onPress={() => toggleSelect(sub.id)}
                  >
                    <View style={styles.checkLeft}>
                      <View
                        style={[
                          styles.checkbox,
                          isSelected && styles.checkboxChecked,
                        ]}
                      >
                        {isSelected && <Text style={styles.checkMark}>✓</Text>}
                      </View>
                      <View>
                        <Text style={styles.checkName}>{sub.name}</Text>
                        <Text style={styles.checkPrice}>
                          ${sub.price.toLocaleString()} / {sub.cycle === "month" ? "月" : "年"}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={[
                        styles.freqBadge,
                        { backgroundColor: `${getFrequencyColor(freq)}20` },
                      ]}
                    >
                      <Text
                        style={[styles.freqText, { color: getFrequencyColor(freq) }]}
                      >
                        {getFrequencyLabel(freq)}
                      </Text>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          )}

          {/* 分析結果 */}
          {selectedIds.size > 0 && (
            <View style={styles.analysisSection}>
              <Text style={styles.sectionTitle}>📊 分析結果</Text>

              {/* 總費用 */}
              <LinearGradient
                colors={["rgba(99, 102, 241, 0.12)", "rgba(168, 85, 247, 0.08)"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.analysisCard}
              >
                <Text style={styles.analysisLabel}>選取項目總費用</Text>
                <View style={styles.analysisRow}>
                  <View style={styles.analysisStat}>
                    <Text style={styles.analysisAmount}>
                      ${analysis.totalMonthly.toLocaleString()}
                    </Text>
                    <Text style={styles.analysisUnit}>/ 月</Text>
                  </View>
                  <View style={styles.analysisDivider} />
                  <View style={styles.analysisStat}>
                    <Text style={styles.analysisAmount}>
                      ${analysis.totalYearly.toLocaleString()}
                    </Text>
                    <Text style={styles.analysisUnit}>/ 年</Text>
                  </View>
                </View>
              </LinearGradient>

              {/* 使用頻率分佈 */}
              <View style={styles.freqSection}>
                <Text style={styles.freqTitle}>使用頻繁度</Text>
                <View style={styles.freqBar}>
                  {analysis.highUsage.length > 0 && (
                    <View
                      style={[
                        styles.freqSegment,
                        {
                          flex: analysis.highUsage.length,
                          backgroundColor: "#4ade8040",
                          borderColor: "#4ade80",
                        },
                      ]}
                    >
                      <Text style={[styles.freqSegmentText, { color: "#4ade80" }]}>
                        高 {analysis.highUsage.length}
                      </Text>
                    </View>
                  )}
                  {analysis.mediumUsage.length > 0 && (
                    <View
                      style={[
                        styles.freqSegment,
                        {
                          flex: analysis.mediumUsage.length,
                          backgroundColor: "#fbbf2440",
                          borderColor: "#fbbf24",
                        },
                      ]}
                    >
                      <Text style={[styles.freqSegmentText, { color: "#fbbf24" }]}>
                        中 {analysis.mediumUsage.length}
                      </Text>
                    </View>
                  )}
                  {analysis.lowUsage.length > 0 && (
                    <View
                      style={[
                        styles.freqSegment,
                        {
                          flex: analysis.lowUsage.length,
                          backgroundColor: "#f8717140",
                          borderColor: "#f87171",
                        },
                      ]}
                    >
                      <Text style={[styles.freqSegmentText, { color: "#f87171" }]}>
                        低 {analysis.lowUsage.length}
                      </Text>
                    </View>
                  )}
                </View>
              </View>

              {/* 省錢建議 */}
              {analysis.potentialSavings > 0 && (
                <View style={styles.savingsCard}>
                  <Text style={styles.savingsIcon}>💡</Text>
                  <View style={styles.savingsContent}>
                    <Text style={styles.savingsTitle}>省錢建議</Text>
                    <Text style={styles.savingsDesc}>
                      取消很少使用的訂閱，每月可節省
                    </Text>
                    <Text style={styles.savingsAmount}>
                      ${analysis.potentialSavings.toLocaleString()} / 月
                    </Text>
                    <Text style={styles.savingsYearly}>
                      年度可節省 ${(analysis.potentialSavings * 12).toLocaleString()}
                    </Text>
                  </View>
                </View>
              )}

              {/* 低使用率列表 */}
              {analysis.lowUsage.length > 0 && (
                <View style={styles.lowUsageSection}>
                  <Text style={styles.lowUsageTitle}>⚠️ 低使用率項目</Text>
                  {analysis.lowUsage.map((sub) => (
                    <View key={sub.id} style={styles.lowUsageItem}>
                      <Text style={styles.lowUsageName}>{sub.name}</Text>
                      <Text style={styles.lowUsagePrice}>
                        ${sub.price.toLocaleString()} / {sub.cycle === "month" ? "月" : "年"}
                      </Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          )}

          {subscriptions.length > 0 && selectedIds.size === 0 && (
            <View style={styles.emptyAnalysis}>
              <Text style={styles.emptyIcon}>📋</Text>
              <Text style={styles.emptyText}>請勾選上方訂閱項目以開始分析</Text>
            </View>
          )}
        </ScrollView>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#e0e0ff",
  },
  subtitle: {
    fontSize: 13,
    color: "rgba(255,255,255,0.4)",
    marginTop: 2,
  },
  selectAllBtn: {
    backgroundColor: "rgba(99, 102, 241, 0.2)",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "rgba(99, 102, 241, 0.3)",
  },
  selectAllText: {
    color: "#a78bfa",
    fontWeight: "600",
    fontSize: 13,
  },
  checklistSection: {
    gap: 8,
    marginBottom: 24,
  },
  checkItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.04)",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  checkItemSelected: {
    backgroundColor: "rgba(99, 102, 241, 0.1)",
    borderColor: "rgba(99, 102, 241, 0.25)",
  },
  checkLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: "#6366f1",
    borderColor: "#6366f1",
  },
  checkMark: {
    color: "white",
    fontSize: 14,
    fontWeight: "700",
  },
  checkName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#e0e0ff",
  },
  checkPrice: {
    fontSize: 12,
    color: "rgba(255,255,255,0.35)",
    marginTop: 2,
  },
  freqBadge: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  freqText: {
    fontSize: 11,
    fontWeight: "600",
  },
  analysisSection: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#e0e0ff",
    marginBottom: 4,
  },
  analysisCard: {
    borderRadius: 18,
    padding: 24,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  analysisLabel: {
    fontSize: 13,
    color: "rgba(255,255,255,0.45)",
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  analysisRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  analysisStat: {
    flex: 1,
    alignItems: "center",
  },
  analysisAmount: {
    fontSize: 28,
    fontWeight: "700",
    color: "#ffffff",
  },
  analysisUnit: {
    fontSize: 13,
    color: "#a78bfa",
    marginTop: 2,
  },
  analysisDivider: {
    width: 1,
    height: 40,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  freqSection: {
    backgroundColor: "rgba(255,255,255,0.04)",
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  freqTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#e0e0ff",
    marginBottom: 12,
  },
  freqBar: {
    flexDirection: "row",
    gap: 6,
    height: 36,
  },
  freqSegment: {
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  freqSegmentText: {
    fontSize: 12,
    fontWeight: "700",
  },
  savingsCard: {
    flexDirection: "row",
    backgroundColor: "rgba(74, 222, 128, 0.08)",
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: "rgba(74, 222, 128, 0.15)",
    gap: 14,
  },
  savingsIcon: {
    fontSize: 28,
    marginTop: 2,
  },
  savingsContent: {
    flex: 1,
  },
  savingsTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#4ade80",
    marginBottom: 4,
  },
  savingsDesc: {
    fontSize: 13,
    color: "rgba(255,255,255,0.5)",
  },
  savingsAmount: {
    fontSize: 22,
    fontWeight: "700",
    color: "#4ade80",
    marginTop: 6,
  },
  savingsYearly: {
    fontSize: 12,
    color: "rgba(74, 222, 128, 0.6)",
    marginTop: 2,
  },
  lowUsageSection: {
    backgroundColor: "rgba(248, 113, 113, 0.06)",
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: "rgba(248, 113, 113, 0.12)",
  },
  lowUsageTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#f87171",
    marginBottom: 12,
  },
  lowUsageItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },
  lowUsageName: {
    fontSize: 14,
    color: "#e0e0ff",
  },
  lowUsagePrice: {
    fontSize: 14,
    color: "rgba(255,255,255,0.4)",
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    color: "#e0e0ff",
    fontWeight: "600",
  },
  emptySubText: {
    fontSize: 13,
    color: "rgba(255,255,255,0.35)",
    marginTop: 4,
  },
  emptyAnalysis: {
    alignItems: "center",
    marginTop: 40,
  },
});
