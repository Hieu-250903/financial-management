import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface AppLayoutProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ activeTab, setActiveTab, onLogout, children }) => {
  return (
    <div className="app-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={onLogout} />
      <main className="main-content">
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
