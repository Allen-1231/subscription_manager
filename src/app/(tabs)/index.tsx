import React from "react";
import { View, Text, StyleSheet, StatusBar, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { useSubscriptions } from "../../context/SubscriptionContext";

export default function HomeTab() {
  const insets = useSafeAreaInsets();
  const { name } = useLocalSearchParams<{ name: string }>();
  const { subscriptions } = useSubscriptions();

  const monthlyTotal = subscriptions.reduce((sum, s) => {
    return sum + (s.cycle === "month" ? s.price : Math.round(s.price / 12));
  }, 0);

  const yearlyTotal = monthlyTotal * 12;
  const totalSubscriptions = subscriptions.length;

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
          {/* 問候語 */}
          <View style={styles.greetingSection}>
            <Text style={styles.greeting}>嗨，{name || "使用者"} 👋</Text>
            <Text style={styles.greetingSub}>歡迎回來，以下是您的訂閱摘要</Text>
          </View>

          {/* 月費總覽卡片 */}
          <LinearGradient
            colors={["rgba(99, 102, 241, 0.15)", "rgba(168, 85, 247, 0.1)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.summaryCard}
          >
            <Text style={styles.summaryLabel}>每月總支出</Text>
            <Text style={styles.summaryAmount}>${monthlyTotal.toLocaleString()}</Text>
            <Text style={styles.summarySub}>共 {totalSubscriptions} 項訂閱</Text>
          </LinearGradient>

          {/* 統計區塊 */}
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statIcon}>📅</Text>
              <Text style={styles.statValue}>${monthlyTotal.toLocaleString()}</Text>
              <Text style={styles.statLabel}>每月費用</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statIcon}>📆</Text>
              <Text style={styles.statValue}>${yearlyTotal.toLocaleString()}</Text>
              <Text style={styles.statLabel}>年度預估</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statIcon}>📦</Text>
              <Text style={styles.statValue}>{totalSubscriptions}</Text>
              <Text style={styles.statLabel}>訂閱數量</Text>
            </View>
          </View>

          {/* 最近訂閱 */}
          <View style={styles.recentSection}>
            <Text style={styles.sectionTitle}>您的訂閱</Text>
            {subscriptions.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>目前沒有訂閱項目</Text>
              </View>
            ) : (
              subscriptions.map((sub) => (
                <View key={sub.id} style={styles.subItem}>
                  <View style={styles.subLeft}>
                    <View style={styles.subIcon}>
                      <Text style={styles.subIconText}>
                        {sub.name.charAt(0)}
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.subName}>{sub.name}</Text>
                      <Text style={styles.subCycle}>
                        {sub.cycle === "month" ? "每月" : "每年"}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.subPrice}>
                    ${sub.price.toLocaleString()}
                  </Text>
                </View>
              ))
            )}
          </View>
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
  greetingSection: {
    marginBottom: 24,
  },
  greeting: {
    fontSize: 28,
    fontWeight: "700",
    color: "#e0e0ff",
    letterSpacing: 0.5,
  },
  greetingSub: {
    fontSize: 14,
    color: "rgba(255,255,255,0.4)",
    marginTop: 4,
  },
  summaryCard: {
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    marginBottom: 20,
  },
  summaryLabel: {
    fontSize: 12,
    color: "rgba(255,255,255,0.45)",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  summaryAmount: {
    fontSize: 42,
    fontWeight: "700",
    color: "#ffffff",
    marginTop: 6,
  },
  summarySub: {
    fontSize: 13,
    color: "#a78bfa",
    marginTop: 4,
  },
  statsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 16,
    padding: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  statIcon: {
    fontSize: 20,
    marginBottom: 6,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#e0e0ff",
  },
  statLabel: {
    fontSize: 11,
    color: "rgba(255,255,255,0.4)",
    marginTop: 2,
  },
  recentSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#e0e0ff",
    marginBottom: 14,
  },
  subItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  subLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  subIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(99, 102, 241, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  subIconText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#a78bfa",
  },
  subName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#e0e0ff",
  },
  subCycle: {
    fontSize: 12,
    color: "rgba(255,255,255,0.35)",
    marginTop: 2,
  },
  subPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: "#c4b5fd",
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 24,
  },
  emptyText: {
    color: "rgba(255,255,255,0.35)",
    fontSize: 14,
  },
});
