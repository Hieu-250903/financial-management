
import { 
  AlertTriangle, CalendarDays, ShieldCheck, Target, 
  Brain, CreditCard, PartyPopper, Zap, Bell 
} from 'lucide-react';
import type { NotificationType, NotificationItem } from '../types/notifications';

export const getNotificationMeta = (type: NotificationType) => {
  switch (type) {
    case 'budget_warning':
      return { icon: <AlertTriangle size={18} />, color: '#f59e0b', bgColor: 'rgba(245, 158, 11, 0.15)' };
    case 'subscription':
      return { icon: <CalendarDays size={18} />, color: '#6366f1', bgColor: 'rgba(99, 102, 241, 0.15)' };
    case 'cooloff_ready':
      return { icon: <ShieldCheck size={18} />, color: '#10b981', bgColor: 'rgba(16, 185, 129, 0.15)' };
    case 'cooloff_saved':
      return { icon: <PartyPopper size={18} />, color: '#ec4899', bgColor: 'rgba(236, 72, 153, 0.15)' };
    case 'goal_progress':
      return { icon: <Target size={18} />, color: '#8b5cf6', bgColor: 'rgba(139, 92, 246, 0.15)' };
    case 'goal_milestone':
      return { icon: <Zap size={18} />, color: '#10b981', bgColor: 'rgba(16, 185, 129, 0.15)' };
    case 'ai_insight':
      return { icon: <Brain size={18} />, color: '#6366f1', bgColor: 'rgba(99, 102, 241, 0.15)' };
    case 'transaction_alert':
      return { icon: <CreditCard size={18} />, color: '#ef4444', bgColor: 'rgba(239, 68, 68, 0.15)' };
    default:
      return { icon: <Bell size={18} />, color: '#94a3b8', bgColor: 'rgba(148, 163, 184, 0.15)' };
  }
};

export const generateMockNotifications = (): NotificationItem[] => {
  const now = Date.now();
  return [
    { id: '1', type: 'budget_warning', title: 'Budget Alert', message: 'Food & Drinks has used 90% of the budget ($450/$500). Slow down!', timestamp: now - 1000 * 60 * 15, read: false, navigateTo: 'goals' },
    { id: '2', type: 'subscription', title: 'Upcoming Payment', message: 'Netflix Premium ($19.99) will be charged in 3 days.', timestamp: now - 1000 * 60 * 45, read: false, navigateTo: 'dashboard' },
    { id: '3', type: 'cooloff_ready', title: 'Cool-off Complete', message: 'PlayStation 5 Pro cool-off timer ended. Do you still want to buy it?', timestamp: now - 1000 * 60 * 60 * 2, read: false, navigateTo: 'dashboard' },
    { id: '4', type: 'ai_insight', title: 'AI Insight', message: 'Your spending this week is 15% below average. Great job keeping it low!', timestamp: now - 1000 * 60 * 60 * 4, read: false, navigateTo: 'analytics' },
    { id: '5', type: 'goal_milestone', title: 'Milestone Reached!', message: 'Emergency Fund reached 70%! You\'re ahead of schedule by 2 months.', timestamp: now - 1000 * 60 * 60 * 8, read: true, navigateTo: 'goals' },
    { id: '6', type: 'transaction_alert', title: 'Large Transaction', message: 'Unusual spending detected: -$699 at Apple Store. Was this you?', timestamp: now - 1000 * 60 * 60 * 12, read: true, navigateTo: 'transactions' },
    { id: '7', type: 'subscription', title: 'Low Usage Alert', message: 'Gym Membership ($45/mo) has low usage. Consider canceling to save money.', timestamp: now - 1000 * 60 * 60 * 24, read: true, navigateTo: 'dashboard' },
    { id: '8', type: 'cooloff_saved', title: 'Money Saved!', message: 'You skipped Designer Jacket — you saved $250! 🎉', timestamp: now - 1000 * 60 * 60 * 36, read: true, navigateTo: 'dashboard' },
    { id: '9', type: 'budget_warning', title: 'Budget Exceeded', message: 'Shopping category has exceeded the monthly limit ($380/$400).', timestamp: now - 1000 * 60 * 60 * 48, read: true, navigateTo: 'goals' },
    { id: '10', type: 'ai_insight', title: 'Monthly Summary', message: 'At current pace, you may overspend by end of month. Consider cutting discretionary expenses.', timestamp: now - 1000 * 60 * 60 * 72, read: true, navigateTo: 'analytics' }
  ];
};
