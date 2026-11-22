import React from "react";
import { Text, View, StyleSheet, StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AnimatedLogo } from "../components/AnimatedLogo";
import { HeroPreviewCard } from "../components/HeroPreviewCard";
import { PrimaryButton } from "../components/PrimaryButton";
import { router } from 'expo-router';

/**
 * 歡迎頁面
 */
const WelcomeScreen = () => {
  const handleStart = () => {
    router.push('/login');
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={["#0f0c29", "#302b63", "#24243e"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        {/* 上方：品牌與標題區塊 */}
        <View style={styles.headerSection}>
          <AnimatedLogo />
          <Text style={styles.title}>Subscription</Text>
          <Text style={styles.titleAccent}>Manager</Text>
          <Text style={styles.subtitle}>輕鬆管理您的所有訂閱服務</Text>
        </View>

        {/* 中間：預覽疊層卡片 */}
        <HeroPreviewCard />

        {/* 下方：主要操作區塊 */}
        <View style={styles.footerSection}>
          <PrimaryButton title="立即開始" onPress={handleStart} />
          <Text style={styles.footerNote}>免費使用・無需信用卡</Text>
        </View>
      </LinearGradient>
    </>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 50,
    paddingBottom: 44,
    paddingHorizontal: 24,
  },
  headerSection: {
    alignItems: "center",
    marginTop: 8,
  },
  title: {
    fontSize: 36,
    fontWeight: "300",
    color: "#e0e0ff",
    letterSpacing: 2,
  },
  titleAccent: {
    fontSize: 36,
    fontWeight: "800",
    color: "#a78bfa",
    letterSpacing: 2,
    marginTop: -4,
  },
  subtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.45)",
    marginTop: 12,
    letterSpacing: 0.5,
  },
  footerSection: {
    width: "100%",
    alignItems: "center",
    gap: 14,
    marginBottom: -4,
  },
  footerNote: {
    fontSize: 12,
    color: "rgba(255,255,255,0.3)",
    letterSpacing: 0.3,
  },
});
