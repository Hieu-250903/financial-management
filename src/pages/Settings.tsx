import React, { useState } from 'react';
import {
  User, Bell, Wallet, Palette, Database, Info,
  ChevronRight, Camera, Moon, Sun, Monitor,
  Download, Upload, Trash2, Shield, Globe,
  CreditCard, Brain, ShieldAlert,
  Target, CalendarDays, AlertTriangle, Check
} from 'lucide-react';

import type { SettingsSection, NotifPref } from '../types/settings';
import { accentColors, currencies } from '../constants/settings';

const Settings: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SettingsSection>('profile');
  const [displayName, setDisplayName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@email.com');
  const [currency, setCurrency] = useState('USD');
  const [theme, setTheme] = useState<'dark' | 'light' | 'auto'>('dark');
  const [accentColor, setAccentColor] = useState('#6366f1');
  const [compactMode, setCompactMode] = useState(false);
  const [budgetThreshold, setBudgetThreshold] = useState(85);
  const [coolOffDefault, setCoolOffDefault] = useState(24);
  const [monthStartDay, setMonthStartDay] = useState(1);
  const [subReminderDays, setSubReminderDays] = useState(3);
  const [largeTransactionAmount, setLargeTransactionAmount] = useState(500);
  const [aiAllowance, setAiAllowance] = useState(true);
  const [savedMsg, setSavedMsg] = useState('');
  const [notifPrefs, setNotifPrefs] = useState<NotifPref[]>([
    { id: 'budget', label: 'Budget Alerts', description: 'When spending nears category limits', icon: <AlertTriangle size={18} />, enabled: true },
    { id: 'subscription', label: 'Subscription Reminders', description: 'Before upcoming subscription charges', icon: <CalendarDays size={18} />, enabled: true },
    { id: 'cooloff', label: 'Cool-off Updates', description: 'When cool-off timers complete', icon: <ShieldAlert size={18} />, enabled: true },
    { id: 'goals', label: 'Goal Milestones', description: 'Progress updates on savings goals', icon: <Target size={18} />, enabled: true },
    { id: 'ai', label: 'AI Insights', description: 'Smart spending suggestions and analysis', icon: <Brain size={18} />, enabled: true },
    { id: 'transaction', label: 'Large Transactions', description: 'Alerts for unusually large spending', icon: <CreditCard size={18} />, enabled: true },
  ]);

  const showSaved = () => {
    setSavedMsg('Settings saved!');
    setTimeout(() => setSavedMsg(''), 2000);
  };

  const toggleNotif = (id: string) => {
    setNotifPrefs(prev => prev.map(n => n.id === id ? { ...n, enabled: !n.enabled } : n));
  };

  const sidebarItems: { id: SettingsSection; label: string; icon: React.ReactNode }[] = [
    { id: 'profile', label: 'Profile & Account', icon: <User size={18} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
    { id: 'financial', label: 'Financial', icon: <Wallet size={18} /> },
    { id: 'appearance', label: 'Appearance', icon: <Palette size={18} /> },
    { id: 'data', label: 'Data & Privacy', icon: <Database size={18} /> },
    { id: 'about', label: 'About & Help', icon: <Info size={18} /> },
  ];

  const renderProfile = () => (
    <div className="settings-section">
      <h3 className="settings-section-title"><User size={20} /> Profile & Account</h3>
      <p className="settings-section-desc">Manage your personal information and account settings.</p>

      <div className="settings-card glass-panel">
        <div className="profile-header">
          <div className="profile-avatar-large">
            <span>JD</span>
            <button className="avatar-edit-btn"><Camera size={14} /></button>
          </div>
          <div className="profile-info">
            <h4>{displayName}</h4>
            <p>{email}</p>
            <span className="profile-badge">Free Plan</span>
          </div>
        </div>
      </div>

      <div className="settings-card glass-panel">
        <h4 className="card-section-title">Personal Information</h4>
        <div className="settings-field">
          <label>Display Name</label>
          <input type="text" value={displayName} onChange={e => setDisplayName(e.target.value)} className="settings-input" />
        </div>
        <div className="settings-field">
          <label>Email Address</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="settings-input" />
        </div>
        <div className="settings-field">
          <label>Language</label>
          <select className="settings-select">
            <option>English</option>
            <option>Tiếng Việt</option>
          </select>
        </div>
        <div className="settings-field">
          <label>Timezone</label>
          <select className="settings-select">
            <option>UTC+7 (Ho Chi Minh)</option>
            <option>UTC+0 (London)</option>
            <option>UTC-5 (New York)</option>
            <option>UTC+9 (Tokyo)</option>
          </select>
        </div>
        <button className="settings-save-btn" onClick={showSaved}>Save Changes</button>
      </div>

      <div className="settings-card glass-panel">
        <h4 className="card-section-title"><Shield size={18} /> Security</h4>
        <div className="settings-row clickable">
          <div><strong>Change Password</strong><p className="row-desc">Update your account password</p></div>
          <ChevronRight size={18} color="var(--text-secondary)" />
        </div>
        <div className="settings-row clickable">
          <div><strong>Two-Factor Authentication</strong><p className="row-desc">Add an extra layer of security</p></div>
          <span className="status-pill off">Off</span>
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="settings-section">
      <h3 className="settings-section-title"><Bell size={20} /> Notifications</h3>
      <p className="settings-section-desc">Choose what you want to be notified about.</p>

      <div className="settings-card glass-panel">
        <h4 className="card-section-title">Notification Types</h4>
        {notifPrefs.map(pref => (
          <div className="settings-row" key={pref.id}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div className="notif-pref-icon">{pref.icon}</div>
              <div>
                <strong>{pref.label}</strong>
                <p className="row-desc">{pref.description}</p>
              </div>
            </div>
            <label className="toggle-switch">
              <input type="checkbox" checked={pref.enabled} onChange={() => toggleNotif(pref.id)} />
              <span className="toggle-slider"></span>
            </label>
          </div>
        ))}
      </div>

      <div className="settings-card glass-panel">
        <h4 className="card-section-title">Thresholds</h4>
        <div className="settings-field">
          <label>Budget warning at</label>
          <div className="range-field">
            <input type="range" min="50" max="100" value={budgetThreshold} onChange={e => setBudgetThreshold(+e.target.value)} className="settings-range" />
            <span className="range-value">{budgetThreshold}%</span>
          </div>
          <p className="field-hint">Alert when spending reaches this % of category budget</p>
        </div>
        <div className="settings-field">
          <label>Subscription reminder</label>
          <select className="settings-select" value={subReminderDays} onChange={e => setSubReminderDays(+e.target.value)}>
            <option value={1}>1 day before</option>
            <option value={3}>3 days before</option>
            <option value={5}>5 days before</option>
            <option value={7}>7 days before</option>
          </select>
        </div>
        <div className="settings-field">
          <label>Large transaction threshold</label>
          <div className="input-with-prefix">
            <span>$</span>
            <input type="number" value={largeTransactionAmount} onChange={e => setLargeTransactionAmount(+e.target.value)} className="settings-input" />
          </div>
          <p className="field-hint">Get notified for transactions above this amount</p>
        </div>
        <button className="settings-save-btn" onClick={showSaved}>Save Changes</button>
      </div>
    </div>
  );

  const renderFinancial = () => (
    <div className="settings-section">
      <h3 className="settings-section-title"><Wallet size={20} /> Financial Preferences</h3>
      <p className="settings-section-desc">Customize how your finances are tracked and displayed.</p>

      <div className="settings-card glass-panel">
        <h4 className="card-section-title"><Globe size={18} /> Currency & Region</h4>
        <div className="settings-field">
          <label>Default Currency</label>
          <div className="currency-grid">
            {currencies.map(c => (
              <button key={c.code} className={`currency-btn ${currency === c.code ? 'active' : ''}`} onClick={() => setCurrency(c.code)}>
                <span className="currency-symbol">{c.symbol}</span>
                <span className="currency-code">{c.code}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="settings-field">
          <label>Monthly cycle starts on</label>
          <select className="settings-select" value={monthStartDay} onChange={e => setMonthStartDay(+e.target.value)}>
            {[1, 5, 10, 15, 20, 25].map(d => (
              <option key={d} value={d}>Day {d} of each month</option>
            ))}
          </select>
          <p className="field-hint">This affects how "This Month" is calculated across the app</p>
        </div>
      </div>

      <div className="settings-card glass-panel">
        <h4 className="card-section-title"><ShieldAlert size={18} /> Cool-off Timer</h4>
        <div className="settings-field">
          <label>Default waiting period</label>
          <div className="cooloff-options">
            {[12, 24, 48, 72].map(h => (
              <button key={h} className={`cooloff-btn ${coolOffDefault === h ? 'active' : ''}`} onClick={() => setCoolOffDefault(h)}>
                {h}h
              </button>
            ))}
          </div>
          <p className="field-hint">How long to wait before allowing impulse purchases</p>
        </div>
      </div>

      <div className="settings-card glass-panel">
        <h4 className="card-section-title"><Brain size={18} /> AI Features</h4>
        <div className="settings-row">
          <div>
            <strong>AI Daily Allowance</strong>
            <p className="row-desc">Smart daily spending limit based on your goals</p>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" checked={aiAllowance} onChange={() => setAiAllowance(!aiAllowance)} />
            <span className="toggle-slider"></span>
          </label>
        </div>
        <div className="settings-row">
          <div>
            <strong>Smart Categorization</strong>
            <p className="row-desc">Auto-categorize transactions using AI</p>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" defaultChecked />
            <span className="toggle-slider"></span>
          </label>
        </div>
        <button className="settings-save-btn" onClick={showSaved}>Save Changes</button>
      </div>
    </div>
  );

  const renderAppearance = () => (
    <div className="settings-section">
      <h3 className="settings-section-title"><Palette size={20} /> Appearance</h3>
      <p className="settings-section-desc">Personalize the look and feel of LuminaMoney.</p>

      <div className="settings-card glass-panel">
        <h4 className="card-section-title">Theme</h4>
        <div className="theme-options">
          {([
            { id: 'dark' as const, icon: <Moon size={22} />, label: 'Dark' },
            { id: 'light' as const, icon: <Sun size={22} />, label: 'Light' },
            { id: 'auto' as const, icon: <Monitor size={22} />, label: 'System' },
          ]).map(t => (
            <button key={t.id} className={`theme-btn ${theme === t.id ? 'active' : ''}`} onClick={() => setTheme(t.id)}>
              {t.icon}
              <span>{t.label}</span>
              {theme === t.id && <Check size={16} className="theme-check" />}
            </button>
          ))}
        </div>
      </div>

      <div className="settings-card glass-panel">
        <h4 className="card-section-title">Accent Color</h4>
        <div className="accent-grid">
          {accentColors.map(c => (
            <button key={c.value} className={`accent-btn ${accentColor === c.value ? 'active' : ''}`} onClick={() => setAccentColor(c.value)} style={{ '--accent': c.value } as React.CSSProperties}>
              <div className="accent-swatch" style={{ background: c.value }}></div>
              <span>{c.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="settings-card glass-panel">
        <h4 className="card-section-title">Layout</h4>
        <div className="settings-row">
          <div>
            <strong>Compact Mode</strong>
            <p className="row-desc">Reduce spacing for more content on screen</p>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" checked={compactMode} onChange={() => setCompactMode(!compactMode)} />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderData = () => (
    <div className="settings-section">
      <h3 className="settings-section-title"><Database size={20} /> Data & Privacy</h3>
      <p className="settings-section-desc">Manage your data, exports, and account.</p>

      <div className="settings-card glass-panel">
        <h4 className="card-section-title">Export Data</h4>
        <div className="export-btns">
          <button className="export-btn"><Download size={18} /><div><strong>Export as CSV</strong><p>Spreadsheet compatible</p></div></button>
          <button className="export-btn"><Download size={18} /><div><strong>Export as PDF</strong><p>Formatted report</p></div></button>
        </div>
      </div>

      <div className="settings-card glass-panel">
        <h4 className="card-section-title">Import Data</h4>
        <button className="export-btn" style={{ width: '100%' }}><Upload size={18} /><div><strong>Import CSV</strong><p>Upload transactions from another app</p></div></button>
      </div>

      <div className="settings-card glass-panel danger-zone">
        <h4 className="card-section-title" style={{ color: 'var(--danger)' }}><Trash2 size={18} /> Danger Zone</h4>
        <div className="settings-row">
          <div><strong>Clear All Data</strong><p className="row-desc">Reset all transactions, goals, and settings</p></div>
          <button className="danger-btn">Clear</button>
        </div>
        <div className="settings-row">
          <div><strong style={{ color: 'var(--danger)' }}>Delete Account</strong><p className="row-desc">Permanently delete your account and all data</p></div>
          <button className="danger-btn delete">Delete</button>
        </div>
      </div>
    </div>
  );

  const renderAbout = () => (
    <div className="settings-section">
      <h3 className="settings-section-title"><Info size={20} /> About & Help</h3>
      <p className="settings-section-desc">App information and support.</p>

      <div className="settings-card glass-panel">
        <div className="about-header">
          <div className="about-logo">
            <Wallet size={32} color="var(--primary)" />
          </div>
          <h4>LuminaMoney</h4>
          <p className="version-text">Version 1.0.0</p>
          <p className="row-desc">Your intelligent financial companion</p>
        </div>
      </div>

      <div className="settings-card glass-panel">
        <h4 className="card-section-title">Quick Links</h4>
        <div className="settings-row clickable"><div><strong>Keyboard Shortcuts</strong></div><ChevronRight size={18} color="var(--text-secondary)" /></div>
        <div className="settings-row clickable"><div><strong>Documentation</strong></div><ChevronRight size={18} color="var(--text-secondary)" /></div>
        <div className="settings-row clickable"><div><strong>Send Feedback</strong></div><ChevronRight size={18} color="var(--text-secondary)" /></div>
        <div className="settings-row clickable"><div><strong>Report a Bug</strong></div><ChevronRight size={18} color="var(--text-secondary)" /></div>
      </div>

      <div className="settings-card glass-panel">
        <div style={{ textAlign: 'center', padding: '10px 0' }}>
          <p className="row-desc">Made with ❤️ by LuminaMoney Team</p>
          <p className="row-desc" style={{ marginTop: '5px' }}>© 2026 LuminaMoney. All rights reserved.</p>
        </div>
      </div>
    </div>
  );

  const sections: Record<SettingsSection, () => React.ReactNode> = {
    profile: renderProfile,
    notifications: renderNotifications,
    financial: renderFinancial,
    appearance: renderAppearance,
    data: renderData,
    about: renderAbout,
  };

  return (
    <div className="settings-page">
      {/* Saved toast */}
      {savedMsg && (
        <div className="settings-toast">
          <Check size={16} />
          {savedMsg}
        </div>
      )}

      <div className="settings-layout">
        {/* Settings Sidebar */}
        <nav className="settings-sidebar glass-panel">
          {sidebarItems.map(item => (
            <button key={item.id} className={`settings-nav-item ${activeSection === item.id ? 'active' : ''}`} onClick={() => setActiveSection(item.id)}>
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Settings Content */}
        <div className="settings-content">
          {sections[activeSection]()}
        </div>
      </div>
    </div>
  );
};

export default Settings;
