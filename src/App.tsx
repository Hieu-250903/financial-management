import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Wallet, 
  PieChart, 
  Target, 
  Settings, 
  LogOut,
  Bell,
  Search
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import Transactions from './components/Transactions';
import Analytics from './components/Analytics';
import Goals from './components/Goals';
import Auth from './components/Auth';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  if (!isAuthenticated) {
    return <Auth onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="app-container">
      {/* Sidebar */}
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
          <a className="nav-link">
            <Settings size={20} />
            <span>Settings</span>
          </a>
          <a className="nav-link" style={{ color: 'var(--danger)', cursor: 'pointer' }} onClick={() => setIsAuthenticated(false)}>
            <LogOut size={20} />
            <span>Logout</span>
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="header">
          <div>
            <h1>Overview</h1>
            <p className="subtitle">Welcome back, let's check your finances.</p>
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
            
            <button style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', position: 'relative' }}>
              <Bell size={24} />
              <span style={{ position: 'absolute', top: 0, right: 0, width: '10px', height: '10px', background: 'var(--danger)', borderRadius: '50%', border: '2px solid var(--bg-dark)' }}></span>
            </button>

            <div className="user-profile">
              <div className="avatar">JD</div>
              <span style={{ fontWeight: 500 }}>John Doe</span>
            </div>
          </div>
        </header>

        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'transactions' && <Transactions />}
        {activeTab === 'analytics' && <Analytics />}
        {activeTab === 'goals' && <Goals />}
      </main>
    </div>
  );
}

export default App;
