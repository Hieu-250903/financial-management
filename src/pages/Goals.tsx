import React, { useState } from 'react';
import { 
  CheckCircle2,
  Brain,
  X,
  Target,
  Coffee,
  AlertTriangle,
  Plus
} from 'lucide-react';

import type { GoalItem, LimitItem } from '../types/goals';
import { goalIcons, limitIcons, goalColors } from '../constants/goals';
import { mockGoals, mockLimits } from '../data/mockGoals';

const GoalIcon = ({ iconName, color, size = 24 }: { iconName: string; color: string; size?: number }) => {
  const entry = goalIcons[iconName];
  if (!entry) return <Target size={size} color={color} />;
  const { Icon } = entry;
  return <Icon size={size} color={color} />;
};

const LimitIcon = ({ iconName, size = 18, color }: { iconName: string; size?: number; color?: string }) => {
  const entry = limitIcons[iconName];
  if (!entry) return <Coffee size={size} color={color} />;
  const { Icon } = entry;
  return <Icon size={size} color={color} />;
};

// ---- Component ----
const Goals: React.FC = () => {
  const [goals, setGoals] = useState<GoalItem[]>(mockGoals);
  const [limits, setLimits] = useState<LimitItem[]>(mockLimits);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [showLimitModal, setShowLimitModal] = useState(false);

  // New Goal form state
  const [goalForm, setGoalForm] = useState({
    title: '', target: '', saved: '0', date: '',
    iconName: 'PiggyBank', color: '#10b981', priority: 'medium' as 'high' | 'medium' | 'low', monthlyAutoSave: ''
  });

  // New Limit form state
  const [limitForm, setLimitForm] = useState({
    category: '', budget: '', iconName: 'Coffee'
  });

  const getProgressColor = (spent: number, budget: number) => {
    const percentage = (spent / budget) * 100;
    if (percentage >= 90) return 'var(--danger)';
    if (percentage >= 75) return 'var(--warning)';
    return 'var(--success)';
  };

  const formatDateToLabel = (dateStr: string) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const handleCreateGoal = () => {
    if (!goalForm.title || !goalForm.target || !goalForm.date) return;
    const newGoal: GoalItem = {
      id: Date.now(),
      title: goalForm.title,
      target: parseFloat(goalForm.target),
      saved: parseFloat(goalForm.saved) || 0,
      date: formatDateToLabel(goalForm.date),
      iconName: goalForm.iconName,
      color: goalForm.color,
      priority: goalForm.priority,
      monthlyAutoSave: parseFloat(goalForm.monthlyAutoSave) || 0,
    };
    setGoals(prev => [...prev, newGoal]);
    setGoalForm({ title: '', target: '', saved: '0', date: '', iconName: 'PiggyBank', color: '#10b981', priority: 'medium', monthlyAutoSave: '' });
    setShowGoalModal(false);
  };

  const handleCreateLimit = () => {
    if (!limitForm.category || !limitForm.budget) return;
    const newLimit: LimitItem = {
      id: Date.now(),
      category: limitForm.category,
      spent: 0,
      budget: parseFloat(limitForm.budget),
      iconName: limitForm.iconName,
    };
    setLimits(prev => [...prev, newLimit]);
    setLimitForm({ category: '', budget: '', iconName: 'Coffee' });
    setShowLimitModal(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', paddingBottom: '30px' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ margin: 0 }}>Goals & Limits</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '5px' }}>Keep your spending in check and achieve your dreams.</p>
        </div>
        <button onClick={() => setShowGoalModal(true)} className="goal-new-btn">
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
            {limits.map(limit => {
              const percentage = Math.min((limit.spent / limit.budget) * 100, 100);
              const color = getProgressColor(limit.spent, limit.budget);
              const isNearLimit = percentage >= 85;

              return (
                <div key={limit.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ background: 'rgba(255,255,255,0.05)', padding: '8px', borderRadius: '8px', display: 'flex' }}>
                        <LimitIcon iconName={limit.iconName} />
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
            
            <button onClick={() => setShowLimitModal(true)} className="btn-hover-border" style={{ background: 'rgba(255,255,255,0.05)', border: '1px dashed rgba(255,255,255,0.2)', color: 'var(--text-secondary)', padding: '12px', borderRadius: '10px', marginTop: '10px', cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'inherit' }}>
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
            {goals.map(goal => {
              const percentage = Math.min((goal.saved / goal.target) * 100, 100);
              
              return (
                <div key={goal.id} className="glass-panel content-card goal-card-animate" style={{ padding: '20px', borderLeft: `4px solid ${goal.color}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', gap: '15px' }}>
                      <div style={{ background: `${goal.color}20`, padding: '12px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <GoalIcon iconName={goal.iconName} color={goal.color} />
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

      {/* ===== NEW GOAL MODAL ===== */}
      {showGoalModal && (
        <div className="modal-overlay" onClick={() => setShowGoalModal(false)}>
          <div className="modal-container glass-panel" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h3 className="modal-title"><Target size={22} color="var(--primary)" /> Create New Goal</h3>
                <p className="modal-subtitle">Set a savings target and start tracking your progress.</p>
              </div>
              <button className="modal-close" onClick={() => setShowGoalModal(false)}><X size={20} /></button>
            </div>

            <div className="modal-body">
              {/* Goal Name */}
              <div className="modal-field">
                <label>Goal Name *</label>
                <input type="text" className="modal-input" placeholder="e.g. New iPhone, Dream Vacation..." value={goalForm.title} onChange={e => setGoalForm({...goalForm, title: e.target.value})} />
              </div>

              {/* Target + Initial */}
              <div className="modal-row">
                <div className="modal-field">
                  <label>Target Amount *</label>
                  <div className="modal-input-prefix">
                    <span>$</span>
                    <input type="number" className="modal-input" placeholder="5,000" value={goalForm.target} onChange={e => setGoalForm({...goalForm, target: e.target.value})} />
                  </div>
                </div>
                <div className="modal-field">
                  <label>Already Saved</label>
                  <div className="modal-input-prefix">
                    <span>$</span>
                    <input type="number" className="modal-input" placeholder="0" value={goalForm.saved} onChange={e => setGoalForm({...goalForm, saved: e.target.value})} />
                  </div>
                </div>
              </div>

              {/* Deadline + Priority */}
              <div className="modal-row">
                <div className="modal-field">
                  <label>Target Date *</label>
                  <input type="month" className="modal-input" value={goalForm.date} onChange={e => setGoalForm({...goalForm, date: e.target.value})} />
                </div>
                <div className="modal-field">
                  <label>Priority</label>
                  <div className="priority-options">
                    {(['high', 'medium', 'low'] as const).map(p => (
                      <button key={p} className={`priority-btn ${goalForm.priority === p ? 'active' : ''} ${p}`} onClick={() => setGoalForm({...goalForm, priority: p})}>
                        {p.charAt(0).toUpperCase() + p.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Monthly Auto-save */}
              <div className="modal-field">
                <label>Monthly Auto-save (optional)</label>
                <div className="modal-input-prefix">
                  <span>$</span>
                  <input type="number" className="modal-input" placeholder="e.g. 200" value={goalForm.monthlyAutoSave} onChange={e => setGoalForm({...goalForm, monthlyAutoSave: e.target.value})} />
                </div>
                <span className="modal-hint">Amount to automatically set aside each month</span>
              </div>

              {/* Icon Picker */}
              <div className="modal-field">
                <label>Choose Icon</label>
                <div className="icon-picker-grid">
                  {Object.entries(goalIcons).map(([key, val]) => {
                    const isSelected = goalForm.iconName === key;
                    return (
                      <button key={key} className={`icon-pick-btn ${isSelected ? 'active' : ''}`} onClick={() => setGoalForm({...goalForm, iconName: key})} title={val.label}
                        style={isSelected ? { borderColor: goalForm.color, background: `${goalForm.color}15` } : {}}>
                        <val.Icon size={24} color={isSelected ? goalForm.color : 'var(--text-secondary)'} />
                        <span className="icon-pick-label">{val.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Color Picker */}
              <div className="modal-field">
                <label>Choose Color</label>
                <div className="color-picker-row">
                  {goalColors.map(c => (
                    <button key={c} className={`color-pick-btn ${goalForm.color === c ? 'active' : ''}`} onClick={() => setGoalForm({...goalForm, color: c})} style={{ background: c }}>
                      {goalForm.color === c && <CheckCircle2 size={16} color="white" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Preview */}
            {goalForm.title && goalForm.target && (
              <div className="modal-preview">
                <span className="modal-preview-label">Preview</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ background: `${goalForm.color}20`, padding: '10px', borderRadius: '10px', display: 'flex' }}>
                    <GoalIcon iconName={goalForm.iconName} color={goalForm.color} size={20} />
                  </div>
                  <div>
                    <strong>{goalForm.title}</strong>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                      ${parseFloat(goalForm.saved || '0').toLocaleString()} / ${parseFloat(goalForm.target).toLocaleString()}
                      {goalForm.date && ` • ${formatDateToLabel(goalForm.date)}`}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="modal-footer">
              <button className="modal-cancel-btn" onClick={() => setShowGoalModal(false)}>Cancel</button>
              <button className="modal-submit-btn" onClick={handleCreateGoal} disabled={!goalForm.title || !goalForm.target || !goalForm.date}>
                <Plus size={18} /> Create Goal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== NEW LIMIT MODAL ===== */}
      {showLimitModal && (
        <div className="modal-overlay" onClick={() => setShowLimitModal(false)}>
          <div className="modal-container glass-panel modal-sm" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h3 className="modal-title"><AlertTriangle size={22} color="var(--warning)" /> New Category Limit</h3>
                <p className="modal-subtitle">Set a monthly spending limit for a category.</p>
              </div>
              <button className="modal-close" onClick={() => setShowLimitModal(false)}><X size={20} /></button>
            </div>

            <div className="modal-body">
              <div className="modal-field">
                <label>Category Name *</label>
                <input type="text" className="modal-input" placeholder="e.g. Groceries, Clothing..." value={limitForm.category} onChange={e => setLimitForm({...limitForm, category: e.target.value})} />
              </div>

              <div className="modal-field">
                <label>Monthly Budget *</label>
                <div className="modal-input-prefix">
                  <span>$</span>
                  <input type="number" className="modal-input" placeholder="e.g. 300" value={limitForm.budget} onChange={e => setLimitForm({...limitForm, budget: e.target.value})} />
                </div>
              </div>

              <div className="modal-field">
                <label>Choose Icon</label>
                <div className="icon-picker-grid compact">
                  {Object.entries(limitIcons).map(([key, val]) => {
                    const isSelected = limitForm.iconName === key;
                    return (
                      <button key={key} className={`icon-pick-btn ${isSelected ? 'active' : ''}`} onClick={() => setLimitForm({...limitForm, iconName: key})} title={val.label}>
                        <val.Icon size={18} color={isSelected ? 'var(--primary)' : 'var(--text-secondary)'} />
                        <span className="icon-pick-label">{val.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="modal-cancel-btn" onClick={() => setShowLimitModal(false)}>Cancel</button>
              <button className="modal-submit-btn" onClick={handleCreateLimit} disabled={!limitForm.category || !limitForm.budget}>
                <Plus size={18} /> Set Limit
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .btn-hover-border:hover {
          border-color: var(--primary) !important;
          color: white !important;
        }
        .goal-card-animate {
          animation: goalSlideIn 0.3s ease;
        }
        @keyframes goalSlideIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

    </div>
  );
};

export default Goals;
