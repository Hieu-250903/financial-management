import React from 'react';
import { Search } from 'lucide-react';
import NotificationPanel from '../components/NotificationPanel';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const getTitle = () => {
    switch (activeTab) {
      case 'settings': return 'Settings';
      case 'transactions': return 'Transactions';
      case 'analytics': return 'Analytics';
      case 'goals': return 'Goals & Limits';
      default: return 'Overview';
    }
  };

  const getSubtitle = () => {
    if (activeTab === 'settings') return 'Manage your preferences and account.';
    return 'Welcome back, let\'s check your finances.';
  };

  return (
    <header className="header">
      <div>
        <h1>{getTitle()}</h1>
        <p className="subtitle">{getSubtitle()}</p>
      </div>
      
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <div style={{ position: 'relative' }}>
          <Search size={20} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
          <input 
            type="text" 
            placeholder="Search..." 
            style={{ 
              background: 'rgba(255,255,255,0.05)', 
              border: '1px solid rgba(255,255,255,0.1)', 
              padding: '12px 15px 12px 45px', 
              borderRadius: '30px',
              color: 'white',
              outline: 'none',
              width: '250px'
            }} 
          />
        </div>
        
        <NotificationPanel onNavigate={(tab) => setActiveTab(tab)} />

        <div className="user-profile">
          <div className="avatar">JD</div>
          <span style={{ fontWeight: 500 }}>John Doe</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
