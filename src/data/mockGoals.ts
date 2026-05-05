import type { GoalItem, LimitItem } from '../types/goals';

export const mockGoals: GoalItem[] = [
  { id: 1, title: 'Emergency Fund', saved: 3500, target: 5000, iconName: 'PiggyBank', date: 'Dec 2026', color: '#10b981', priority: 'high', monthlyAutoSave: 300 },
  { id: 2, title: 'MacBook Pro', saved: 1200, target: 2400, iconName: 'Laptop', date: 'Oct 2026', color: '#8b5cf6', priority: 'medium', monthlyAutoSave: 200 },
  { id: 3, title: 'Japan Trip', saved: 800, target: 4000, iconName: 'Plane', date: 'Mar 2027', color: '#ec4899', priority: 'low', monthlyAutoSave: 150 },
];

export const mockLimits: LimitItem[] = [
  { id: 1, category: 'Food & Drinks', spent: 450, budget: 500, iconName: 'Coffee' },
  { id: 2, category: 'Shopping', spent: 380, budget: 400, iconName: 'ShoppingBag' },
  { id: 3, category: 'Entertainment', spent: 120, budget: 200, iconName: 'Gamepad2' },
  { id: 4, category: 'Transport', spent: 85, budget: 150, iconName: 'Car' },
];
