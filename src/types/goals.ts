export interface GoalItem {
  id: number;
  title: string;
  saved: number;
  target: number;
  iconName: string;
  date: string;
  color: string;
  priority: 'high' | 'medium' | 'low';
  monthlyAutoSave: number;
}

export interface LimitItem {
  id: number;
  category: string;
  spent: number;
  budget: number;
  iconName: string;
}
