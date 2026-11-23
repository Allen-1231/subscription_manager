import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";

type SettingItemProps = {
  icon: string;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  danger?: boolean;
};

function SettingItem({ icon, title, subtitle, onPress, danger }: SettingItemProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.settingItem, pressed && { opacity: 0.7 }]}
      onPress={onPress}
    >
      <View style={styles.settingLeft}>
        <Text style={styles.settingIcon}>{icon}</Text>
        <View>
          <Text style={[styles.settingTitle, danger && styles.dangerText]}>
            {title}
          </Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      <Text style={styles.settingArrow}>›</Text>
    </Pressable>
  );
}

export default function SettingsTab() {
  const insets = useSafeAreaInsets();

  const handleLogout = () => {
    Alert.alert("登出", "確定要登出嗎？", [
      { text: "取消", style: "cancel" },
      {
        text: "登出",
        style: "destructive",
        onPress: () => {
          router.replace("/");
        },
      },
    ]);
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
          <Text style={styles.title}>設定</Text>

          {/* 帳號區塊 */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>帳號</Text>
            <View style={styles.sectionCard}>
              <SettingItem
                icon="👤"
                title="個人資料"
                subtitle="編輯您的個人資訊"
              />
              <View style={styles.divider} />
              <SettingItem
                icon="🔒"
                title="變更密碼"
                subtitle="更新您的登入密碼"
              />
            </View>
          </View>

          {/* 通知區塊 */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>通知</Text>
            <View style={styles.sectionCard}>
              <SettingItem
                icon="🔔"
                title="推播通知"
                subtitle="訂閱到期提醒"
              />
              <View style={styles.divider} />
              <SettingItem
                icon="📧"
                title="電子郵件通知"
                subtitle="每月帳單摘要"
              />
            </View>
          </View>

          {/* 偏好設定 */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>偏好設定</Text>
            <View style={styles.sectionCard}>
              <SettingItem
                icon="💰"
                title="預設貨幣"
                subtitle="TWD - 新台幣"
              />
              <View style={styles.divider} />
              <SettingItem
                icon="🌙"
                title="深色模式"
                subtitle="目前：開啟"
              />
              <View style={styles.divider} />
              <SettingItem
                icon="🌐"
                title="語言"
                subtitle="繁體中文"
              />
            </View>
          </View>

          {/* 其他 */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>其他</Text>
            <View style={styles.sectionCard}>
              <SettingItem
                icon="ℹ️"
                title="關於 SubKeeper"
                subtitle="版本 1.0.0"
              />
              <View style={styles.divider} />
              <SettingItem
                icon="📄"
                title="隱私權政策"
              />
              <View style={styles.divider} />
              <SettingItem
                icon="🚪"
                title="登出"
                danger
                onPress={handleLogout}
              />
            </View>
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
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#e0e0ff",
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "rgba(255,255,255,0.35)",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    marginBottom: 10,
    marginLeft: 4,
  },
  sectionCard: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    overflow: "hidden",
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  settingIcon: {
    fontSize: 22,
  },
  settingTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#e0e0ff",
  },
  settingSubtitle: {
    fontSize: 12,
    color: "rgba(255,255,255,0.35)",
    marginTop: 2,
  },
  settingArrow: {
    fontSize: 22,
    color: "rgba(255,255,255,0.2)",
    fontWeight: "300",
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.06)",
    marginLeft: 52,
  },
  dangerText: {
    color: "#f87171",
  },
});
