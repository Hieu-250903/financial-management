import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Wallet, Brain } from 'lucide-react';
import CoolOffPurchases from './CoolOffPurchases';
import SubscriptionTracker from './SubscriptionTracker';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: '1', amount: 400 },
  { name: '5', amount: 300 },
  { name: '10', amount: 550 },
  { name: '15', amount: 450 },
  { name: '20', amount: 700 },
  { name: '25', amount: 600 },
  { name: '30', amount: 800 },
];

const Dashboard: React.FC = () => {
  return (
    <>
      <div className="dashboard-grid">
        <div className="glass-panel summary-card balance">
          <div className="card-header">
            <span>Total Balance</span>
            <div className="card-icon"><Wallet size={20} /></div>
          </div>
          <div className="card-amount">$12,450.00</div>
          <div className="card-trend trend-up">
            <TrendingUp size={16} />
            <span>+2.5% vs last month</span>
          </div>
        </div>

        <div className="glass-panel summary-card income">
          <div className="card-header">
            <span>Monthly Income</span>
            <div className="card-icon"><TrendingUp size={20} /></div>
          </div>
          <div className="card-amount">$4,200.00</div>
          <div className="card-trend trend-up">
            <TrendingUp size={16} />
            <span>+5.0% vs last month</span>
          </div>
        </div>

        <div className="glass-panel summary-card expense">
          <div className="card-header">
            <span>Monthly Expenses</span>
            <div className="card-icon"><TrendingDown size={20} /></div>
          </div>
          <div className="card-amount">$1,850.00</div>
          <div className="card-trend trend-down">
            <TrendingDown size={16} />
            <span>-1.2% vs last month</span>
          </div>
        </div>
      </div>

      <div className="main-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          <div className="glass-panel content-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2>Cash Flow Overview</h2>
              <select style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '5px 10px', borderRadius: '8px', outline: 'none' }}>
                <option>This Month</option>
                <option>Last Month</option>
              </select>
            </div>
            
            <div style={{ height: '300px', width: '100%', marginTop: '20px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="name" stroke="#94a3b8" axisLine={false} tickLine={false} />
                  <YAxis stroke="#94a3b8" axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ background: 'rgba(20,22,30,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                    itemStyle={{ color: 'white' }}
                  />
                  <Area type="monotone" dataKey="amount" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorAmount)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Daily Allowance Feature */}
          <div className="glass-panel content-card" style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(236, 72, 153, 0.1))', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
             <h2>
               <Brain size={24} color="var(--primary)" />
               AI Daily Allowance
             </h2>
             <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '-10px' }}>Based on your goals, here is what you can safely spend today.</p>
             
             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px' }}>
                <div style={{ fontSize: '48px', fontWeight: 'bold', color: 'var(--text-primary)' }}>
                  $45.<span style={{ fontSize: '24px', color: 'var(--text-secondary)' }}>00</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '14px', color: 'var(--success)' }}>+$12 rolled over from yesterday</div>
                  <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Resets in 9 hours</div>
                </div>
             </div>
             
             <div className="progress-bar" style={{ width: '100%', height: '8px', marginTop: '15px' }}>
                <div className="progress-fill" style={{ width: '30%', background: 'var(--primary)' }}></div>
             </div>
             <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                <span>Spent: $15.00</span>
                <span>Remaining: $45.00</span>
             </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          <CoolOffPurchases />
          <SubscriptionTracker />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
