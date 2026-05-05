import React, { useState, useEffect, useRef } from 'react';
import { 
  Bell, 
  X, 
  CheckCheck, 
  Check
} from 'lucide-react';

import type { NotificationItem } from '../types/notifications';
import { getNotificationMeta, generateMockNotifications } from '../data/mockNotifications';
import { formatTimeAgo } from '../utils/formatters';

interface NotificationPanelProps {
  onNavigate?: (tab: string) => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(generateMockNotifications);
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

  const handleNotificationClick = (notification: NotificationItem) => {
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
