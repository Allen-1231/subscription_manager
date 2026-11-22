import React, { useEffect, useMemo } from "react";
import { Text, StyleSheet, Animated } from "react-native";

interface AnimatedLogoProps {
  icon?: string;
}

/**
 * AnimatedLogo 元件
 * 負責首頁上方 Logo 的呼吸式顏色漸變與光暈動畫
 */
export const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ icon = "💳" }) => {
  // 使用 useMemo 初始化 Animated.Value，避免 render 時直接存取 ref.current
  const colorAnim = useMemo(() => new Animated.Value(0), []);

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(colorAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: false,
        }),
        Animated.timing(colorAnim, {
          toValue: 2,
          duration: 2000,
          useNativeDriver: false,
        }),
        Animated.timing(colorAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: false,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [colorAnim]);

  // 背景色插值過渡（靛藍 -> 紫色 -> 粉紅）
  const backgroundColor = colorAnim.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [
      "rgba(99, 102, 241, 0.25)",
      "rgba(168, 85, 247, 0.25)",
      "rgba(236, 72, 153, 0.25)",
    ],
  });

  // 邊框色插值過渡
  const borderColor = colorAnim.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [
      "rgba(99, 102, 241, 0.5)",
      "rgba(168, 85, 247, 0.5)",
      "rgba(236, 72, 153, 0.5)",
    ],
  });

  // 陰影色插值過渡
  const shadowColor = colorAnim.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [
      "rgba(99, 102, 241, 0.6)",
      "rgba(168, 85, 247, 0.6)",
      "rgba(236, 72, 153, 0.6)",
    ],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor,
          borderColor,
          shadowColor,
        },
      ]}
    >
      <Text style={styles.icon}>{icon}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 80,
    height: 80,
    borderRadius: 24,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 15,
  },
  icon: {
    fontSize: 36,
  },
});
