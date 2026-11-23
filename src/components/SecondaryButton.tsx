import React from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

interface SecondaryButtonProps extends TouchableOpacityProps {
  title: string;
  onPress?: () => void;
}

/**
 * SecondaryButton 元件
 * 透明邊框風格的次要按鈕，與 PrimaryButton 搭配使用
 */
export const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  title,
  onPress,
  style,
  ...rest
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      activeOpacity={0.85}
      onPress={onPress}
      {...rest}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "rgba(167, 139, 250, 0.5)",
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(167, 139, 250, 0.08)",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#c4b5fd",
    letterSpacing: 1,
  },
});
