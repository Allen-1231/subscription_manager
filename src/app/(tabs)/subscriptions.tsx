import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  TextInput,
  Pressable,
  Modal,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Subscription } from "../../types/subscription";
import { mockSubscriptions } from "../../data/mockSubscriptions";

export default function SubscriptionsTab() {
  const insets = useSafeAreaInsets();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([...mockSubscriptions]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newCycle, setNewCycle] = useState<"month" | "year">("month");

  const handleAdd = () => {
    if (!newName.trim() || !newPrice.trim()) {
      Alert.alert("請填寫完整", "名稱和費用都要填寫");
      return;
    }
    const price = parseInt(newPrice, 10);
    if (isNaN(price) || price <= 0) {
      Alert.alert("費用格式錯誤", "請輸入有效的金額");
      return;
    }
    const newSub: Subscription = {
      id: Date.now().toString(),
      name: newName.trim(),
      price,
      cycle: newCycle,
    };
    setSubscriptions((prev) => [...prev, newSub]);
    setNewName("");
    setNewPrice("");
    setNewCycle("month");
    setModalVisible(false);
  };

  const handleDelete = (id: string) => {
    Alert.alert("刪除訂閱", "確定要刪除這項訂閱嗎？", [
      { text: "取消", style: "cancel" },
      {
        text: "刪除",
        style: "destructive",
        onPress: () => setSubscriptions((prev) => prev.filter((s) => s.id !== id)),
      },
    ]);
  };

  const totalMonthly = subscriptions.reduce((sum, s) => {
    return sum + (s.cycle === "month" ? s.price : Math.round(s.price / 12));
  }, 0);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={["#0f0c29", "#302b63", "#24243e"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.container, { paddingTop: insets.top + 16 }]}
      >
        {/* 標題列 */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>訂閱內容</Text>
            <Text style={styles.subtitle}>
              共 {subscriptions.length} 項・月均 ${totalMonthly.toLocaleString()}
            </Text>
          </View>
          <Pressable
            style={({ pressed }) => [styles.addButton, pressed && { opacity: 0.7 }]}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.addButtonText}>+ 新增</Text>
          </Pressable>
        </View>

        {/* 訂閱列表 */}
        <FlatList
          data={subscriptions}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>📭</Text>
              <Text style={styles.emptyText}>還沒有訂閱</Text>
              <Text style={styles.emptySubText}>點擊右上方「+ 新增」來添加</Text>
            </View>
          }
          renderItem={({ item }) => (
            <Pressable
              style={styles.subItem}
              onLongPress={() => handleDelete(item.id)}
            >
              <View style={styles.subLeft}>
                <View style={styles.subIcon}>
                  <Text style={styles.subIconText}>{item.name.charAt(0)}</Text>
                </View>
                <View>
                  <Text style={styles.subName}>{item.name}</Text>
                  <Text style={styles.subCycle}>
                    {item.cycle === "month" ? "每月訂閱" : "每年訂閱"}
                  </Text>
                </View>
              </View>
              <Text style={styles.subPrice}>${item.price.toLocaleString()}</Text>
            </Pressable>
          )}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        />

        {/* 新增 Modal */}
        <Modal
          visible={modalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.modalOverlay}
          >
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>新增訂閱</Text>

              <TextInput
                style={styles.input}
                placeholder="訂閱名稱（如 Netflix）"
                placeholderTextColor="rgba(255,255,255,0.3)"
                value={newName}
                onChangeText={setNewName}
              />

              <TextInput
                style={styles.input}
                placeholder="費用（如 390）"
                placeholderTextColor="rgba(255,255,255,0.3)"
                keyboardType="numeric"
                value={newPrice}
                onChangeText={setNewPrice}
              />

              {/* 週期切換 */}
              <View style={styles.cycleRow}>
                <Pressable
                  style={[
                    styles.cycleButton,
                    newCycle === "month" && styles.cycleButtonActive,
                  ]}
                  onPress={() => setNewCycle("month")}
                >
                  <Text
                    style={[
                      styles.cycleText,
                      newCycle === "month" && styles.cycleTextActive,
                    ]}
                  >
                    每月
                  </Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.cycleButton,
                    newCycle === "year" && styles.cycleButtonActive,
                  ]}
                  onPress={() => setNewCycle("year")}
                >
                  <Text
                    style={[
                      styles.cycleText,
                      newCycle === "year" && styles.cycleTextActive,
                    ]}
                  >
                    每年
                  </Text>
                </Pressable>
              </View>

              <View style={styles.modalActions}>
                <Pressable
                  style={styles.cancelButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.cancelText}>取消</Text>
                </Pressable>
                <Pressable style={styles.confirmButton} onPress={handleAdd}>
                  <LinearGradient
                    colors={["#6366f1", "#a855f7"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.confirmGradient}
                  >
                    <Text style={styles.confirmText}>確認新增</Text>
                  </LinearGradient>
                </Pressable>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 16,
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
  addButton: {
    backgroundColor: "rgba(99, 102, 241, 0.2)",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "rgba(99, 102, 241, 0.3)",
  },
  addButtonText: {
    color: "#a78bfa",
    fontWeight: "700",
    fontSize: 14,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  subItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  subLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  subIcon: {
    width: 42,
    height: 42,
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
    marginTop: 60,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    color: "#e0e0ff",
    fontWeight: "600",
  },
  emptySubText: {
    fontSize: 13,
    color: "rgba(255,255,255,0.35)",
    marginTop: 4,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  modalContent: {
    backgroundColor: "#1e1b3a",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#e0e0ff",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    padding: 16,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    color: "white",
    fontSize: 16,
    marginBottom: 12,
  },
  cycleRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  cycleButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  cycleButtonActive: {
    backgroundColor: "rgba(99, 102, 241, 0.2)",
    borderColor: "#6366f1",
  },
  cycleText: {
    color: "rgba(255,255,255,0.4)",
    fontWeight: "600",
  },
  cycleTextActive: {
    color: "#a78bfa",
  },
  modalActions: {
    flexDirection: "row",
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  cancelText: {
    color: "rgba(255,255,255,0.5)",
    fontWeight: "600",
    fontSize: 16,
  },
  confirmButton: {
    flex: 1,
    borderRadius: 14,
    overflow: "hidden",
  },
  confirmGradient: {
    paddingVertical: 16,
    alignItems: "center",
  },
  confirmText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
