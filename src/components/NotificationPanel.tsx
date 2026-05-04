import React, { useState, useEffect, useRef } from 'react';
import { 
  Bell, 
  X, 
  CheckCheck, 
  AlertTriangle, 
  CalendarDays, 
  ShieldCheck, 
  Target, 
  Brain, 
  CreditCard,
  TrendingDown,
  PartyPopper,
  Zap,
  Check
} from 'lucide-react';

export type NotificationType = 
  | 'budget_warning' 
  | 'subscription' 
  | 'cooloff_ready' 
  | 'cooloff_saved' 
  | 'goal_progress' 
  | 'goal_milestone'
  | 'ai_insight' 
  | 'transaction_alert';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
  navigateTo?: string; // tab name to navigate to
}

const getNotificationMeta = (type: NotificationType) => {
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

const formatTimeAgo = (timestamp: number): string => {
  const now = Date.now();
  const diffMs = now - timestamp;
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMinutes < 1) return 'Just now';
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  return new Date(timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

// Mock notifications data reflecting the app's features
const generateMockNotifications = (): Notification[] => {
  const now = Date.now();
  return [
    {
      id: '1',
      type: 'budget_warning',
      title: 'Budget Alert',
      message: 'Food & Drinks has used 90% of the budget ($450/$500). Slow down!',
      timestamp: now - 1000 * 60 * 15, // 15 min ago
      read: false,
      navigateTo: 'goals'
    },
    {
      id: '2',
      type: 'subscription',
      title: 'Upcoming Payment',
      message: 'Netflix Premium ($19.99) will be charged in 3 days.',
      timestamp: now - 1000 * 60 * 45, // 45 min ago
      read: false,
      navigateTo: 'dashboard'
    },
    {
      id: '3',
      type: 'cooloff_ready',
      title: 'Cool-off Complete',
      message: 'PlayStation 5 Pro cool-off timer ended. Do you still want to buy it?',
      timestamp: now - 1000 * 60 * 60 * 2, // 2 hours ago
      read: false,
      navigateTo: 'dashboard'
    },
    {
      id: '4',
      type: 'ai_insight',
      title: 'AI Insight',
      message: 'Your spending this week is 15% below average. Great job keeping it low!',
      timestamp: now - 1000 * 60 * 60 * 4, // 4 hours ago
      read: false,
      navigateTo: 'analytics'
    },
    {
      id: '5',
      type: 'goal_milestone',
      title: 'Milestone Reached!',
      message: 'Emergency Fund reached 70%! You\'re ahead of schedule by 2 months.',
      timestamp: now - 1000 * 60 * 60 * 8, // 8 hours ago
      read: true,
      navigateTo: 'goals'
    },
    {
      id: '6',
      type: 'transaction_alert',
      title: 'Large Transaction',
      message: 'Unusual spending detected: -$699 at Apple Store. Was this you?',
      timestamp: now - 1000 * 60 * 60 * 12, // 12 hours ago
      read: true,
      navigateTo: 'transactions'
    },
    {
      id: '7',
      type: 'subscription',
      title: 'Low Usage Alert',
      message: 'Gym Membership ($45/mo) has low usage. Consider canceling to save money.',
      timestamp: now - 1000 * 60 * 60 * 24, // 1 day ago
      read: true,
      navigateTo: 'dashboard'
    },
    {
      id: '8',
      type: 'cooloff_saved',
      title: 'Money Saved!',
      message: 'You skipped Designer Jacket — you saved $250! 🎉',
      timestamp: now - 1000 * 60 * 60 * 36, // 1.5 days ago
      read: true,
      navigateTo: 'dashboard'
    },
    {
      id: '9',
      type: 'budget_warning',
      title: 'Budget Exceeded',
      message: 'Shopping category has exceeded the monthly limit ($380/$400).',
      timestamp: now - 1000 * 60 * 60 * 48, // 2 days ago
      read: true,
      navigateTo: 'goals'
    },
    {
      id: '10',
      type: 'ai_insight',
      title: 'Monthly Summary',
      message: 'At current pace, you may overspend by end of month. Consider cutting discretionary expenses.',
      timestamp: now - 1000 * 60 * 60 * 72, // 3 days ago
      read: true,
      navigateTo: 'analytics'
    }
  ];
};

interface NotificationPanelProps {
  onNavigate?: (tab: string) => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(generateMockNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [closingId, setClosingId] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  const filteredNotifications = filter === 'unread' 
    ? notifications.filter(n => !n.read) 
    : notifications;

  // Close panel on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const dismissNotification = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setClosingId(id);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
      setClosingId(null);
    }, 300);
  };

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id);
    if (notification.navigateTo && onNavigate) {
      onNavigate(notification.navigateTo);
      setIsOpen(false);
    }
  };

  return (
    <div className="notification-wrapper" ref={panelRef}>
      {/* Bell Button */}
      <button 
        className="notification-bell" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Notifications"
        id="notification-bell-btn"
      >
        <Bell size={24} />
        {unreadCount > 0 && (
          <span className="notification-badge">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
        {/* Pulse ring animation when there are unread notifications */}
        {unreadCount > 0 && <span className="notification-pulse" />}
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className={`notification-panel glass-panel ${isOpen ? 'panel-enter' : ''}`}>
          {/* Header */}
          <div className="notification-panel-header">
            <div className="notification-panel-title">
              <h3>Notifications</h3>
              {unreadCount > 0 && (
                <span className="unread-pill">{unreadCount} new</span>
              )}
            </div>
            <div className="notification-panel-actions">
              {unreadCount > 0 && (
                <button 
                  className="mark-all-btn" 
                  onClick={markAllAsRead}
                  title="Mark all as read"
                >
                  <CheckCheck size={16} />
                  <span>Mark all read</span>
                </button>
              )}
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="notification-filters">
            <button 
              className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button 
              className={`filter-tab ${filter === 'unread' ? 'active' : ''}`}
              onClick={() => setFilter('unread')}
            >
              Unread {unreadCount > 0 && `(${unreadCount})`}
            </button>
          </div>

          {/* Notifications List */}
          <div className="notification-list">
            {filteredNotifications.length === 0 ? (
              <div className="notification-empty">
                <div className="empty-icon">🎉</div>
                <h4>All caught up!</h4>
                <p>No {filter === 'unread' ? 'unread ' : ''}notifications right now.</p>
              </div>
            ) : (
              filteredNotifications.map(notification => {
                const meta = getNotificationMeta(notification.type);
                return (
                  <div
                    key={notification.id}
                    className={`notification-item ${!notification.read ? 'unread' : ''} ${closingId === notification.id ? 'item-closing' : ''}`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    {/* Unread indicator dot */}
                    {!notification.read && <div className="unread-dot" style={{ background: meta.color }} />}
                    
                    {/* Icon */}
                    <div className="notification-icon" style={{ background: meta.bgColor, color: meta.color }}>
                      {meta.icon}
                    </div>

                    {/* Content */}
                    <div className="notification-content">
                      <div className="notification-title-row">
                        <span className="notification-title" style={{ color: !notification.read ? 'white' : 'var(--text-secondary)' }}>
                          {notification.title}
                        </span>
                        <span className="notification-time">{formatTimeAgo(notification.timestamp)}</span>
                      </div>
                      <p className="notification-message">{notification.message}</p>
                    </div>

                    {/* Actions */}
                    <div className="notification-item-actions">
                      {!notification.read && (
                        <button 
                          className="notif-action-btn" 
                          onClick={(e) => { e.stopPropagation(); markAsRead(notification.id); }}
                          title="Mark as read"
                        >
                          <Check size={14} />
                        </button>
                      )}
                      <button 
                        className="notif-action-btn dismiss-btn" 
                        onClick={(e) => dismissNotification(notification.id, e)}
                        title="Dismiss"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;
