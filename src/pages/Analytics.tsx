import React, { useState } from 'react';
import { 
  PieChart, Pie, Cell, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { 
  Brain, 
  TrendingUp, 
  TrendingDown, 
  AlertCircle,
  Calendar
} from 'lucide-react';

import { categoryData, monthlyData } from '../data/mockAnalytics';

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('This Month');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', paddingBottom: '30px' }}>
      
      {/* Header Area */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ margin: 0 }}>Financial Analytics</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '5px' }}>Deep dive into your spending patterns.</p>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '5px', borderRadius: '12px', display: 'flex', alignItems: 'center' }}>
          <Calendar size={18} style={{ color: 'var(--text-secondary)', marginLeft: '10px' }} />
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            style={{ background: 'transparent', border: 'none', color: 'white', padding: '8px 15px', outline: 'none', cursor: 'pointer' }}>
            <option style={{ background: 'var(--bg-dark)' }}>This Month</option>
            <option style={{ background: 'var(--bg-dark)' }}>Last Month</option>
            <option style={{ background: 'var(--bg-dark)' }}>Last 3 Months</option>
            <option style={{ background: 'var(--bg-dark)' }}>This Year</option>
          </select>
        </div>
      </div>

      {/* AI Insights Card */}
      <div className="glass-panel" style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(139, 92, 246, 0.15))', border: '1px solid rgba(139, 92, 246, 0.3)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
          <div style={{ background: 'rgba(139, 92, 246, 0.2)', padding: '15px', borderRadius: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Brain size={32} color="#a78bfa" />
          </div>
          <div>
            <h3 style={{ margin: '0 0 10px 0', color: '#eaddff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              AI Financial Insights
            </h3>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.6' }}>
              <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }}></div>
                Your savings rate this month is <strong style={{ color: 'white' }}>24%</strong>, which is excellent!
              </li>
              <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ef4444' }}></div>
                Watch out: You spent <strong style={{ color: 'white' }}>150% more on Food & Drinks</strong> compared to last week.
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#6366f1' }}></div>
                Based on your habits, you will have around <strong style={{ color: 'white' }}>$1,200</strong> left by the end of the month.
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
        
        {/* Cash Flow Bar Chart */}
        <div className="glass-panel content-card" style={{ padding: '25px' }}>
          <h3 style={{ margin: '0 0 25px 0' }}>Income vs Expenses</h3>
          <div style={{ height: '300px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" axisLine={false} tickLine={false} />
                <YAxis stroke="#94a3b8" axisLine={false} tickLine={false} />
                <RechartsTooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                  contentStyle={{ background: 'rgba(20,22,30,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ color: 'white' }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                <Bar dataKey="income" name="Income" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={40} />
                <Bar dataKey="expense" name="Expense" fill="#ef4444" radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Spending by Category Doughnut */}
        <div className="glass-panel content-card" style={{ padding: '25px' }}>
          <h3 style={{ margin: '0 0 25px 0' }}>Spending Breakdown</h3>
          <div style={{ height: '300px', width: '100%', position: 'relative' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ background: 'rgba(20,22,30,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ color: 'white' }}
                  formatter={(value: any) => `$${value}`}
                />
                <Legend iconType="circle" layout="vertical" verticalAlign="middle" align="right" />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Text */}
            <div style={{ position: 'absolute', top: '45%', left: '42%', transform: 'translate(-50%, -50%)', textAlign: 'center', pointerEvents: 'none' }}>
              <div style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Total Spent</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>$1,850</div>
            </div>
          </div>
        </div>

      </div>

      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '25px' }}>
        <div className="glass-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '15px', borderRadius: '12px' }}>
            <TrendingUp size={24} color="#10b981" />
          </div>
          <div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '5px' }}>Savings Rate</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>24.5%</div>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '15px', borderRadius: '12px' }}>
            <TrendingDown size={24} color="#ef4444" />
          </div>
          <div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '5px' }}>Avg. Daily Spend</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>$61.66</div>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '15px', borderRadius: '12px' }}>
            <AlertCircle size={24} color="#f59e0b" />
          </div>
          <div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '5px' }}>Fixed Costs</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>42%</div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Analytics;
