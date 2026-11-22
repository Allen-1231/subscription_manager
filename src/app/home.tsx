import { FlatList, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import SubscriptionItem from '@/components/SubscriptionItem';
import { mockSubscriptions } from '@/data/mockSubscriptions';

export default function HomeScreen() {
  // 讀取上一頁用 params 帶過來的資料
  const { name } = useLocalSearchParams<{ name: string }>();

  return (
    <SafeAreaView style={styles.container}>
      {/* 淺色背景要搭配深色狀態列文字 */}
      <StatusBar barStyle="dark-content" />
      <Text style={styles.greeting}>嗨，{name}</Text>
      <FlatList
        data={mockSubscriptions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <SubscriptionItem item={item} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={<Text style={styles.empty}>還沒有訂閱，先新增一個吧</Text>}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  listContent: {
    padding: 16,
  },
  separator: {
    height: 12,
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    color: '#888888',
  },
});