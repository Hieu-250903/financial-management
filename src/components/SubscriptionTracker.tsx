import React from 'react';
import { CalendarDays, AlertTriangle } from 'lucide-react';

const subscriptions = [
  { id: '1', name: 'Netflix Premium', price: 19.99, nextBilling: 'In 3 days', icon: 'N', color: '#E50914', usage: 'High' },
  { id: '2', name: 'Gym Membership', price: 45.00, nextBilling: 'In 12 days', icon: 'G', color: '#10b981', usage: 'Low' },
  { id: '3', name: 'Spotify Duo', price: 14.99, nextBilling: 'In 15 days', icon: 'S', color: '#1DB954', usage: 'High' },
];

const SubscriptionTracker: React.FC = () => {
  return (
    <div className="glass-panel content-card">
      <h2>
        <CalendarDays size={24} color="var(--primary)" />
        Smart Subscriptions
      </h2>
      
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {subscriptions.map(sub => (
          <div key={sub.id} className="sub-item">
            <div className="sub-icon" style={{ color: sub.color }}>
              {sub.icon}
            </div>
            <div className="sub-details">
              <div className="sub-name">{sub.name}</div>
              <div className="sub-date">Billing: {sub.nextBilling}</div>
            </div>
            
            {sub.usage === 'Low' && (
              <div style={{ color: 'var(--warning)', marginRight: '15px' }} title="You haven't used this much lately. Consider canceling.">
                <AlertTriangle size={18} />
              </div>
            )}
            
            <div className="sub-amount">${sub.price}</div>
          </div>
        ))}
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px', paddingTop: '15px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <span style={{ color: 'var(--text-secondary)' }}>Total Monthly</span>
        <span style={{ fontSize: '20px', fontWeight: 'bold' }}>$79.98</span>
      </div>
    </div>
  );
};

export default SubscriptionTracker;
