import React, { useState, useEffect } from 'react';
import { ShieldAlert, Check, X, Clock, Link, StickyNote, Plus } from 'lucide-react';

interface CoolOffItem {
  id: string;
  name: string;
  price: number;
  addedAt: number;
  coolOffHours: number;
  link?: string;
  note?: string;
}

const initialItems: CoolOffItem[] = [
  { id: '1', name: 'PlayStation 5 Pro', price: 699, addedAt: Date.now() - 1000 * 60 * 60 * 20, coolOffHours: 24 },
  { id: '2', name: 'Designer Jacket', price: 250, addedAt: Date.now() - 1000 * 60 * 60 * 2, coolOffHours: 48 },
];

const coolOffOptions = [
  { label: '12h', value: 12 },
  { label: '24h', value: 24 },
  { label: '48h', value: 48 },
  { label: '72h', value: 72 },
];

const CoolOffPurchases: React.FC = () => {
  const [items, setItems] = useState<CoolOffItem[]>(initialItems);
  const [now, setNow] = useState(Date.now());
  const [showModal, setShowModal] = useState(false);
  const [savedAmount, setSavedAmount] = useState<number | null>(null);

  // Form state
  const [form, setForm] = useState({
    name: '',
    price: '',
    coolOffHours: 24,
    link: '',
    note: '',
  });

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Auto-hide saved toast
  useEffect(() => {
    if (savedAmount !== null) {
      const t = setTimeout(() => setSavedAmount(null), 3000);
      return () => clearTimeout(t);
    }
  }, [savedAmount]);

  const resetForm = () => {
    setForm({ name: '', price: '', coolOffHours: 24, link: '', note: '' });
  };

  const handleAdd = () => {
    if (!form.name || !form.price) return;
    const newItem: CoolOffItem = {
      id: Date.now().toString(),
      name: form.name,
      price: parseFloat(form.price),
      addedAt: Date.now(),
      coolOffHours: form.coolOffHours,
      link: form.link || undefined,
      note: form.note || undefined,
    };
    setItems(prev => [...prev, newItem]);
    resetForm();
    setShowModal(false);
  };

  const handleSkip = (item: CoolOffItem) => {
    setSavedAmount(item.price);
    setItems(prev => prev.filter(i => i.id !== item.id));
  };

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
        {items.length === 0 && (
          <div className="cooloff-empty">
            <ShieldAlert size={28} color="var(--text-secondary)" style={{ opacity: 0.3 }} />
            <p>No items in cool-off. Stay strong! 💪</p>
          </div>
        )}
        {items.map(item => {
          const hoursPassed = (now - item.addedAt) / (1000 * 60 * 60);
          const progress = Math.min(100, (hoursPassed / item.coolOffHours) * 100);
          const isReady = progress >= 100;
          const timeLeft = Math.max(0, item.coolOffHours - hoursPassed).toFixed(1);

          return (
            <div key={item.id} className="cool-off-item cooloff-item-animate">
              <div className="item-info">
                <span className="item-name">
                  {item.name} <span style={{color: 'var(--text-secondary)', fontWeight: 'normal'}}>(${item.price})</span>
                  {item.link && (
                    <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ marginLeft: '6px', color: 'var(--primary)' }} title="View product">
                      <Link size={13} />
                    </a>
                  )}
                </span>
                {item.note && (
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                    <StickyNote size={11} /> {item.note}
                  </span>
                )}
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
                  onClick={() => handleSkip(item)}
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      
      <button onClick={() => setShowModal(true)} className="cooloff-add-btn">
        + Add items you want to buy
      </button>

      {/* Saved Toast */}
      {savedAmount !== null && (
        <div className="cooloff-saved-toast">
          🎉 You saved <strong>${savedAmount}</strong> by skipping!
        </div>
      )}

      {/* ===== ADD ITEM MODAL ===== */}
      {showModal && (
        <div className="modal-overlay" onClick={() => { setShowModal(false); resetForm(); }}>
          <div className="modal-container glass-panel modal-sm" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h3 className="modal-title">
                  <ShieldAlert size={22} color="var(--warning)" /> Add to Cool-off
                </h3>
                <p className="modal-subtitle">Thinking about buying something? Add it here and wait before deciding.</p>
              </div>
              <button className="modal-close" onClick={() => { setShowModal(false); resetForm(); }}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              {/* Item Name */}
              <div className="modal-field">
                <label>What do you want to buy? *</label>
                <input
                  type="text"
                  className="modal-input"
                  placeholder="e.g. AirPods Max, New Sneakers..."
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  autoFocus
                />
              </div>

              {/* Price */}
              <div className="modal-field">
                <label>Price *</label>
                <div className="modal-input-prefix">
                  <span>$</span>
                  <input
                    type="number"
                    className="modal-input"
                    placeholder="e.g. 549"
                    value={form.price}
                    onChange={e => setForm({ ...form, price: e.target.value })}
                  />
                </div>
              </div>

              {/* Cool-off Period */}
              <div className="modal-field">
                <label>Cool-off Period</label>
                <div className="cooloff-period-options">
                  {coolOffOptions.map(opt => (
                    <button
                      key={opt.value}
                      className={`cooloff-period-btn ${form.coolOffHours === opt.value ? 'active' : ''}`}
                      onClick={() => setForm({ ...form, coolOffHours: opt.value })}
                    >
                      <span className="cooloff-period-value">{opt.label}</span>
                      <span className="cooloff-period-label">
                        {opt.value < 24 ? 'Quick' : opt.value === 24 ? '1 day' : opt.value === 48 ? '2 days' : '3 days'}
                      </span>
                    </button>
                  ))}
                </div>
                <span className="modal-hint">Longer periods help you make better decisions</span>
              </div>

              {/* Link */}
              <div className="modal-field">
                <label><Link size={13} style={{ marginRight: '4px' }} />Product Link (optional)</label>
                <input
                  type="url"
                  className="modal-input"
                  placeholder="https://..."
                  value={form.link}
                  onChange={e => setForm({ ...form, link: e.target.value })}
                />
              </div>

              {/* Note */}
              <div className="modal-field">
                <label><StickyNote size={13} style={{ marginRight: '4px' }} />Why do you want this? (optional)</label>
                <textarea
                  className="modal-input cooloff-textarea"
                  placeholder="e.g. I've been wanting this for months..."
                  value={form.note}
                  onChange={e => setForm({ ...form, note: e.target.value })}
                  rows={2}
                />
                <span className="modal-hint">Writing it down helps you reflect on whether it's a need or a want</span>
              </div>
            </div>

            {/* Preview */}
            {form.name && form.price && (
              <div className="modal-preview">
                <span className="modal-preview-label">Preview</span>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong>{form.name}</strong>
                    <span style={{ color: 'var(--text-secondary)', marginLeft: '8px' }}>(${parseFloat(form.price).toLocaleString()})</span>
                  </div>
                  <span style={{ fontSize: '13px', color: 'var(--warning)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={14} /> {form.coolOffHours}h wait
                  </span>
                </div>
              </div>
            )}

            <div className="modal-footer">
              <button className="modal-cancel-btn" onClick={() => { setShowModal(false); resetForm(); }}>Cancel</button>
              <button
                className="modal-submit-btn"
                onClick={handleAdd}
                disabled={!form.name || !form.price}
                style={{ background: 'linear-gradient(135deg, var(--warning), #f97316)' }}
              >
                <Plus size={18} /> Start Cool-off
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoolOffPurchases;
