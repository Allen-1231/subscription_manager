import { Tabs } from "expo-router";
import { Text, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type TabIconProps = {
  icon: string;
  label: string;
  focused: boolean;
};

function TabIcon({ icon, label, focused }: TabIconProps) {
  return (
    <View style={tabIconStyles.container}>
      <Text style={[tabIconStyles.icon, focused && tabIconStyles.iconFocused]}>
        {icon}
      </Text>
      <Text style={[tabIconStyles.label, focused && tabIconStyles.labelFocused]}>
        {label}
      </Text>
    </View>
  );
}

const tabIconStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 6,
  },
  icon: {
    fontSize: 22,
    opacity: 0.5,
  },
  iconFocused: {
    opacity: 1,
  },
  label: {
    fontSize: 10,
    color: "rgba(255,255,255,0.4)",
    marginTop: 2,
    letterSpacing: 0.3,
  },
  labelFocused: {
    color: "#c4b5fd",
    fontWeight: "600",
  },
});

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#1a1740",
          borderTopColor: "rgba(255,255,255,0.08)",
          borderTopWidth: 1,
          height: 64 + insets.bottom,
          paddingBottom: insets.bottom,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#a78bfa",
        tabBarInactiveTintColor: "rgba(255,255,255,0.4)",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="🏠" label="首頁" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="subscriptions"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="📋" label="訂閱內容" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="analysis"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="📊" label="狀態分析" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="⚙️" label="設定" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}
