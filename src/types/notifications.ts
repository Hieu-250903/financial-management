export type NotificationType = 
  | 'budget_warning' 
  | 'subscription' 
  | 'cooloff_ready' 
  | 'cooloff_saved' 
  | 'goal_progress' 
  | 'goal_milestone'
  | 'ai_insight' 
  | 'transaction_alert';

export interface NotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
  navigateTo?: string;
}
