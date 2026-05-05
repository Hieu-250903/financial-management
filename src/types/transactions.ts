import type { ReactNode } from 'react';

export interface Transaction {
  id: number;
  title: string;
  category: string;
  type: 'income' | 'expense';
  amount: number;
  date: string;
  icon: ReactNode;
}
