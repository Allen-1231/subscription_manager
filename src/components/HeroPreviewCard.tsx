import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface HeroPreviewCardProps {
  label?: string;
  amount?: string;
  subscriptionCountText?: string;
}

/**
 * HeroPreviewCard 元件
 * 負責首頁中央具層次感與現代毛玻璃漸層的預覽疊層卡片
 */
export const HeroPreviewCard: React.FC<HeroPreviewCardProps> = ({
  label = "每月總支出",
  amount = "$1,299",
  subscriptionCountText = "共 8 項訂閱",
}) => {
  return (
    <View style={styles.container}>
      {/* 底層裝飾卡片 2 */}
      <View style={[styles.card, styles.cardBack2]} />
      {/* 底層裝飾卡片 1 */}
      <View style={[styles.card, styles.cardBack1]} />
      {/* 前景主資訊卡片 */}
      <LinearGradient
        colors={["rgba(99, 102, 241, 0.12)", "rgba(168, 85, 247, 0.08)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.card, styles.cardFront]}
      >
        <Text style={styles.cardLabel}>{label}</Text>
        <Text style={styles.cardAmount}>{amount}</Text>
        <Text style={styles.cardSubs}>{subscriptionCountText}</Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -10,
  },
  card: {
    position: "absolute",
    width: "88%",
    height: 160,
    borderRadius: 20,
  },
  cardBack2: {
    backgroundColor: "rgba(99, 102, 241, 0.06)",
    transform: [{ rotate: "6deg" }, { translateY: -10 }],
    borderWidth: 1,
    borderColor: "rgba(99, 102, 241, 0.1)",
  },
  cardBack1: {
    backgroundColor: "rgba(168, 85, 247, 0.1)",
    transform: [{ rotate: "-3deg" }, { translateY: -5 }],
    borderWidth: 1,
    borderColor: "rgba(168, 85, 247, 0.15)",
  },
  cardFront: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    paddingHorizontal: 28,
    paddingVertical: 24,
    justifyContent: "center",
  },
  cardLabel: {
    fontSize: 12,
    color: "rgba(255,255,255,0.45)",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  cardAmount: {
    fontSize: 42,
    fontWeight: "700",
    color: "#ffffff",
    marginTop: 6,
  },
  cardSubs: {
    fontSize: 13,
    color: "#a78bfa",
    marginTop: 4,
  },
});
