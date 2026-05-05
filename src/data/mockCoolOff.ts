import type { CoolOffItem } from '../types/cooloff';

export const mockCoolOffItems: CoolOffItem[] = [
  { id: '1', name: 'PlayStation 5 Pro', price: 699, addedAt: Date.now() - 1000 * 60 * 60 * 20, coolOffHours: 24 },
  { id: '2', name: 'Designer Jacket', price: 250, addedAt: Date.now() - 1000 * 60 * 60 * 2, coolOffHours: 48 },
];
