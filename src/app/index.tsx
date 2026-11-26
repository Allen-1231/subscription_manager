import React from "react";
import { Text, View, StyleSheet, StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AnimatedLogo } from "../components/AnimatedLogo";
import { HeroPreviewCard } from "../components/HeroPreviewCard";
import { PrimaryButton } from "../components/PrimaryButton";
import { SecondaryButton } from "../components/SecondaryButton";
import { router } from 'expo-router';

/**
 * 歡迎頁面
 */
const WelcomeScreen = () => {
  const insets = useSafeAreaInsets();

  const handleLogin = () => {
    router.push({ pathname: '/login', params: { mode: 'login' } });
  };

  const handleRegister = () => {
    router.push({ pathname: '/login', params: { mode: 'register' } });
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={["#0f0c29", "#302b63", "#24243e"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.container, { paddingBottom: Math.max(insets.bottom, 24) + 16 }]}
      >
        {/* 上方：品牌與標題區塊 */}
        <View style={styles.headerSection}>
          <AnimatedLogo />
          <Text style={styles.title}>SubKeeper</Text>
          <Text style={styles.subtitle}>輕鬆管理您的所有訂閱服務</Text>
        </View>

        {/* 中間：預覽疊層卡片 */}
        <HeroPreviewCard />

        {/* 下方：登入與註冊按鈕 */}
        <View style={styles.footerSection}>
          <PrimaryButton title="登入" onPress={handleLogin} />
          <SecondaryButton title="註冊" onPress={handleRegister} />
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
    paddingHorizontal: 24,
  },
  headerSection: {
    alignItems: "center",
    marginTop: 8,
  },
  title: {
    fontSize: 50,
    fontWeight: "300",
    color: "#e0e0ff",
    letterSpacing: 2,
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
    gap: 12,
  },
});
