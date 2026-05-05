import React from 'react';
import { LayoutDashboard, Wallet, PieChart, Target, Settings, LogOut } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onLogout }) => {
  return (
    <aside className="sidebar">
      <div className="logo-container">
        <Wallet size={32} color="#6366f1" />
        <span>LuminaMoney</span>
      </div>
      
      <nav className="nav-links mt-10" style={{ marginTop: '40px' }}>
        <a className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </a>
        <a className={`nav-link ${activeTab === 'transactions' ? 'active' : ''}`} onClick={() => setActiveTab('transactions')}>
          <Wallet size={20} />
          <span>Transactions</span>
        </a>
        <a className={`nav-link ${activeTab === 'analytics' ? 'active' : ''}`} onClick={() => setActiveTab('analytics')}>
          <PieChart size={20} />
          <span>Analytics</span>
        </a>
        <a className={`nav-link ${activeTab === 'goals' ? 'active' : ''}`} onClick={() => setActiveTab('goals')}>
          <Target size={20} />
          <span>Goals & Limits</span>
        </a>
      </nav>

      <div style={{ marginTop: 'auto' }} className="nav-links">
        <a className={`nav-link ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>
          <Settings size={20} />
          <span>Settings</span>
        </a>
        <a className="nav-link" style={{ color: 'var(--danger)', cursor: 'pointer' }} onClick={onLogout}>
          <LogOut size={20} />
          <span>Logout</span>
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
