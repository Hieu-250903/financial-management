
import { Coffee, ShoppingBag, Zap, CreditCard, DollarSign } from 'lucide-react';
import type { Transaction } from '../types/transactions';

export const mockTransactions: Transaction[] = [
  { id: 1, title: 'Starbucks Coffee', category: 'Food & Drinks', type: 'expense', amount: 5.50, date: '2026-05-03', icon: <Coffee size={18} /> },
  { id: 2, title: 'Freelance Design Project', category: 'Income', type: 'income', amount: 1200.00, date: '2026-05-02', icon: <DollarSign size={18} /> },
  { id: 3, title: 'Amazon Shopping', category: 'Shopping', type: 'expense', amount: 134.99, date: '2026-05-01', icon: <ShoppingBag size={18} /> },
  { id: 4, title: 'Electricity Bill', category: 'Utilities', type: 'expense', amount: 85.00, date: '2026-04-28', icon: <Zap size={18} /> },
  { id: 5, title: 'Netflix Subscription', category: 'Entertainment', type: 'expense', amount: 15.99, date: '2026-04-25', icon: <CreditCard size={18} /> },
  { id: 6, title: 'Salary', category: 'Income', type: 'income', amount: 4500.00, date: '2026-04-24', icon: <DollarSign size={18} /> },
];
