export type Subscription = {
  id: string;
  name: string;
  price: number;
  cycle: 'month' | 'year';
};