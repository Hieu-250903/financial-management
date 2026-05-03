import React, { useState } from 'react';
import { 
  Target, 
  AlertTriangle, 
  Plus, 
  Plane, 
  Laptop, 
  PiggyBank,
  Coffee, 
  ShoppingBag, 
  Gamepad2, 
  Car,
  CheckCircle2,
  Brain
} from 'lucide-react';

const limitsData = [
  { id: 1, category: 'Food & Drinks', spent: 450, budget: 500, icon: <Coffee size={18} /> },
  { id: 2, category: 'Shopping', spent: 380, budget: 400, icon: <ShoppingBag size={18} /> },
  { id: 3, category: 'Entertainment', spent: 120, budget: 200, icon: <Gamepad2 size={18} /> },
  { id: 4, category: 'Transport', spent: 85, budget: 150, icon: <Car size={18} /> }
];

const goalsData = [
  { id: 1, title: 'Emergency Fund', saved: 3500, target: 5000, icon: <PiggyBank size={24} color="#10b981" />, date: 'Dec 2026', color: '#10b981' },
  { id: 2, title: 'MacBook Pro', saved: 1200, target: 2400, icon: <Laptop size={24} color="#8b5cf6" />, date: 'Oct 2026', color: '#8b5cf6' },
  { id: 3, title: 'Japan Trip', saved: 800, target: 4000, icon: <Plane size={24} color="#ec4899" />, date: 'Mar 2027', color: '#ec4899' }
];

const Goals: React.FC = () => {

  const getProgressColor = (spent: number, budget: number) => {
    const percentage = (spent / budget) * 100;
    if (percentage >= 90) return 'var(--danger)'; // Red
    if (percentage >= 75) return 'var(--warning)'; // Yellow
    return 'var(--success)'; // Green
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', paddingBottom: '30px' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ margin: 0 }}>Goals & Limits</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '5px' }}>Keep your spending in check and achieve your dreams.</p>
        </div>
        <button style={{ background: 'var(--primary)', border: 'none', color: 'white', padding: '10px 15px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: '500' }}>
          <Plus size={18} />
          <span>New Goal</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
        
        {/* Monthly Budgets & Limits Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <h3 style={{ margin: 0, fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertTriangle size={20} color="var(--warning)" />
            Monthly Category Limits
          </h3>
          
          <div className="glass-panel" style={{ padding: '25px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {limitsData.map(limit => {
              const percentage = Math.min((limit.spent / limit.budget) * 100, 100);
              const color = getProgressColor(limit.spent, limit.budget);
              const isNearLimit = percentage >= 85;

              return (
                <div key={limit.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ background: 'rgba(255,255,255,0.05)', padding: '8px', borderRadius: '8px', display: 'flex' }}>
                        {limit.icon}
                      </div>
                      <span style={{ fontWeight: '500' }}>{limit.category}</span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontWeight: 'bold', color: isNearLimit ? color : 'white' }}>${limit.spent}</span>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}> / ${limit.budget}</span>
                    </div>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
                    <div style={{ 
                      width: `${percentage}%`, 
                      height: '100%', 
                      background: color,
                      borderRadius: '10px',
                      transition: 'width 0.5s ease-in-out'
                    }}></div>
                  </div>
                  {isNearLimit && (
                    <div style={{ fontSize: '12px', color: color, marginTop: '5px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <AlertTriangle size={12} />
                      You are very close to your limit!
                    </div>
                  )}
                </div>
              );
            })}
            
            <button style={{ background: 'rgba(255,255,255,0.05)', border: '1px dashed rgba(255,255,255,0.2)', color: 'var(--text-secondary)', padding: '12px', borderRadius: '10px', marginTop: '10px', cursor: 'pointer', transition: 'all 0.2s' }} className="btn-hover-border">
              + Set limit for another category
            </button>
          </div>
        </div>

        {/* Savings Goals Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <h3 style={{ margin: 0, fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Target size={20} color="var(--primary)" />
            Savings Goals
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {goalsData.map(goal => {
              const percentage = Math.min((goal.saved / goal.target) * 100, 100);
              
              return (
                <div key={goal.id} className="glass-panel content-card" style={{ padding: '20px', borderLeft: `4px solid ${goal.color}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', gap: '15px' }}>
                      <div style={{ background: `${goal.color}20`, padding: '12px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {goal.icon}
                      </div>
                      <div>
                        <h4 style={{ margin: '0 0 5px 0', fontSize: '16px' }}>{goal.title}</h4>
                        <div style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <Brain size={14} color="var(--primary)" />
                          ETA: {goal.date}
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '18px', fontWeight: 'bold' }}>${goal.saved.toLocaleString()}</div>
                      <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>of ${goal.target.toLocaleString()}</div>
                    </div>
                  </div>
                  
                  <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden', marginTop: '20px' }}>
                    <div style={{ 
                      width: `${percentage}%`, 
                      height: '100%', 
                      background: goal.color,
                      borderRadius: '10px',
                      transition: 'width 0.5s ease-in-out'
                    }}></div>
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '13px' }}>
                    <span style={{ color: goal.color, fontWeight: '500' }}>{percentage.toFixed(1)}% Completed</span>
                    <span style={{ color: 'var(--text-secondary)' }}>${(goal.target - goal.saved).toLocaleString()} left</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* AI Success Banner */}
      <div className="glass-panel" style={{ background: 'linear-gradient(90deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05))', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '20px', display: 'flex', alignItems: 'center', gap: '20px' }}>
        <CheckCircle2 size={32} color="#10b981" />
        <div>
          <h4 style={{ margin: '0 0 5px 0', color: 'white', fontSize: '16px' }}>You're on track!</h4>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '14px' }}>
            Based on your current saving rate, you will reach your <strong>Emergency Fund</strong> goal 2 months earlier than expected. Keep it up!
          </p>
        </div>
        <button style={{ marginLeft: 'auto', background: '#10b981', border: 'none', color: 'white', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '500' }}>
          Add Funds
        </button>
      </div>

      <style>{`
        .btn-hover-border:hover {
          border-color: var(--primary) !important;
          color: white !important;
        }
      `}</style>

    </div>
  );
};

export default Goals;
