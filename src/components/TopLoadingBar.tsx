import { useEffect, useMemo } from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SCREEN_WIDTH = Dimensions.get('window').width;
const BAR_WIDTH = SCREEN_WIDTH * 0.4; // 色塊寬度：螢幕的 40%

type Props = {
  visible: boolean; // true 才顯示並開始動畫
};

export default function TopLoadingBar({ visible }: Props) {
  const insets = useSafeAreaInsets(); // 取得狀態列高度，讓條子貼在它下方
  // 跟 AnimatedLogo 一樣的寫法：用 useMemo 建立動畫數值
  const translateX = useMemo(() => new Animated.Value(-BAR_WIDTH), []);

  useEffect(() => {
    if (!visible) return;

    translateX.setValue(-BAR_WIDTH); // 每次開始都從螢幕左邊外面出發
    const loop = Animated.loop(
      Animated.timing(translateX, {
        toValue: SCREEN_WIDTH, // 一路滑到螢幕右邊外面
        duration: 900,
        useNativeDriver: true, // 位移動畫可以交給原生層，比較順
      })
    );
    loop.start();
    return () => loop.stop(); // 隱藏或離開畫面時停止動畫
  }, [visible, translateX]);

  if (!visible) return null; // 不載入時什麼都不畫

  return (
    <View style={[styles.track, { top: insets.top }]}>
      <Animated.View style={[styles.bar, { transform: [{ translateX }] }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    position: 'absolute', // 浮在畫面上方，不影響其他排版
    left: 0,
    right: 0,
    height: 4,
    overflow: 'hidden',   // 色塊滑出軌道的部分要裁掉
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
  },
  bar: {
    width: BAR_WIDTH,
    height: '100%',
    backgroundColor: '#3b82f6',
  },
});