import React, { useState, useEffect } from 'react';
import { ShieldAlert, Check, X, Clock } from 'lucide-react';

interface CoolOffItem {
  id: string;
  name: string;
  price: number;
  addedAt: number;
  coolOffHours: number;
}

const initialItems: CoolOffItem[] = [
  { id: '1', name: 'PlayStation 5 Pro', price: 699, addedAt: Date.now() - 1000 * 60 * 60 * 20, coolOffHours: 24 },
  { id: '2', name: 'Designer Jacket', price: 250, addedAt: Date.now() - 1000 * 60 * 60 * 2, coolOffHours: 48 },
];

const CoolOffPurchases: React.FC = () => {
  const [items, setItems] = useState<CoolOffItem[]>(initialItems);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 60000); // update every minute
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="glass-panel content-card">
      <h2>
        <ShieldAlert size={24} color="var(--warning)" />
        Impulse Buy Cool-off
      </h2>
      <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '-10px', marginBottom: '10px' }}>
        Wait out your cravings. Let time decide if you really need it.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {items.map(item => {
          const hoursPassed = (now - item.addedAt) / (1000 * 60 * 60);
          const progress = Math.min(100, (hoursPassed / item.coolOffHours) * 100);
          const isReady = progress >= 100;
          const timeLeft = Math.max(0, item.coolOffHours - hoursPassed).toFixed(1);

          return (
            <div key={item.id} className="cool-off-item">
              <div className="item-info">
                <span className="item-name">{item.name} <span style={{color: 'var(--text-secondary)', fontWeight: 'normal'}}>(${item.price})</span></span>
                <div className="item-meta">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${progress}%`, background: isReady ? 'var(--success)' : 'linear-gradient(90deg, var(--warning), var(--primary))' }}></div>
                  </div>
                  <span>
                    {isReady ? <span style={{color: 'var(--success)', display: 'flex', alignItems:'center', gap: '4px'}}><Check size={14}/> Ready to buy</span> : <span style={{display: 'flex', alignItems:'center', gap: '4px'}}><Clock size={14}/> {timeLeft}h left</span>}
                  </span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  className="action-btn" 
                  style={{ background: isReady ? 'var(--success)' : 'rgba(255,255,255,0.05)' }}
                  disabled={!isReady}
                  onClick={() => setItems(items.filter(i => i.id !== item.id))}
                >
                  Buy
                </button>
                <button 
                  className="action-btn" 
                  style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)' }}
                  onClick={() => setItems(items.filter(i => i.id !== item.id))}
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      
      <button style={{ 
        width: '100%', 
        padding: '12px', 
        background: 'rgba(255,255,255,0.05)', 
        border: '1px dashed rgba(255,255,255,0.2)', 
        color: 'var(--text-secondary)',
        borderRadius: '12px',
        marginTop: '10px',
        cursor: 'pointer'
      }}>
        + Add items you want to buy
      </button>
    </div>
  );
};

export default CoolOffPurchases;
