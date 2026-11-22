import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SubscriptionItem from '@/components/SubscriptionItem';
import { Subscription } from '@/types/subscription';  // @/ 代表專案根目錄的路徑別名

const DATA: Subscription[] = [
  { id: '1', name: 'Netflix', price: 390, cycle: 'month' },
  { id: '2', name: 'Spotify', price: 149, cycle: 'month' },
  { id: '3', name: 'YouTube Premium', price: 179, cycle: 'month' },
  { id: '4', name: 'iCloud', price: 30, cycle: 'month' },
  { id: '5', name: 'Adobe Creative Cloud', price: 18000, cycle: 'year' },
];

export default function SubscriptionsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
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