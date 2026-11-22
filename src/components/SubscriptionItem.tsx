import { StyleSheet, Text, View } from 'react-native';
import { Subscription } from '@/types/subscription';

type Props = {
  item: Subscription;
};

export default function SubscriptionItem({ item }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>
        ${item.price} / {item.cycle === 'month' ? '月' : '年'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: '#555555',
  },
});