import { ReactNode } from "react";
import { StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  children: ReactNode;
  withBottomInset?: boolean; // 沒有底部分頁列的畫面（歡迎頁、登入頁）才需要
};

/**
 * 每個畫面共用的深紫漸層背景，並自動避開手機瀏海與底部手勢列。
 * 以前每個畫面都各寫一份，現在統一放這裡。
 */
export default function ScreenBackground({ children, withBottomInset }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={["#0f0c29", "#302b63", "#24243e"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          flex: 1,
          paddingTop: insets.top + 16,
          paddingBottom: withBottomInset ? Math.max(insets.bottom, 24) + 16 : 0,
        }}
      >
        {children}
      </LinearGradient>
    </>
  );
}
