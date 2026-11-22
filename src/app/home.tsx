import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function HomeScreen() {
  // 讀取上一頁用 params 帶過來的資料
  const { name } = useLocalSearchParams<{ name: string }>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>你好，{name}</Text>
      <Text style={styles.subtitle}>這裡之後會放你的訂閱列表</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#1e1b3a',
  },
  title: { fontSize: 28, fontWeight: 'bold', color: 'white' },
  subtitle: { marginTop: 8, color: '#c4b5fd' },
});