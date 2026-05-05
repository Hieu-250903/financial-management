import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  ArrowUpRight, 
  ArrowDownRight, 
  MoreHorizontal, 
  Download,
  Brain,
  X
} from 'lucide-react';

import { mockTransactions } from '../data/mockTransactions';

const Transactions: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // all, income, expense
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTxType, setNewTxType] = useState('expense');

  const filteredTransactions = mockTransactions.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase()) || t.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || t.type === filterType;
    return matchesSearch && matchesType;
  });

  const totalIncome = filteredTransactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = filteredTransactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
  const balance = totalIncome - totalExpense;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', paddingBottom: '30px' }}>
      {/* Quick Summary Cards */}
      <div className="dashboard-grid">
        <div className="glass-panel summary-card balance">
          <div className="card-header">
            <span>Period Balance</span>
          </div>
          <div className="card-amount">${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
        </div>
        <div className="glass-panel summary-card income">
          <div className="card-header">
            <span>Total Income</span>
          </div>
          <div className="card-amount" style={{ color: 'var(--success)' }}>
            +${totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
        </div>
        <div className="glass-panel summary-card expense">
          <div className="card-header">
            <span>Total Expense</span>
          </div>
          <div className="card-amount" style={{ color: 'var(--danger)' }}>
            -${totalExpense.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
        </div>
      </div>

      {/* Main Transactions Area */}
      <div className="glass-panel content-card" style={{ padding: '0', overflow: 'hidden' }}>
        {/* Header & Controls */}
        <div style={{ padding: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div>
            <h2 style={{ marginBottom: '5px' }}>Recent Transactions</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>View and manage your recent cash flow.</p>
          </div>
          <div style={{ display: 'flex', gap: '15px' }}>
            <button className="ai-btn" style={{ background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(99, 102, 241, 0.2))', border: '1px solid rgba(236, 72, 153, 0.3)', color: 'white', padding: '10px 15px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', transition: 'all 0.3s ease' }}>
              <Brain size={18} color="#ec4899" />
              <span>Auto-Categorize</span>
            </button>
            <button 
              onClick={() => setIsModalOpen(true)}
              style={{ background: 'var(--primary)', border: 'none', color: 'white', padding: '10px 15px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: '500' }}>
              <Plus size={18} />
              <span>Add New</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div style={{ padding: '20px 25px', display: 'flex', gap: '15px', borderBottom: '1px solid rgba(255,255,255,0.05)', backgroundColor: 'rgba(0,0,0,0.1)' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            <input 
              type="text" 
              placeholder="Search transactions..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ 
                width: '100%',
                background: 'rgba(255,255,255,0.03)', 
                border: '1px solid rgba(255,255,255,0.1)', 
                padding: '10px 15px 10px 45px', 
                borderRadius: '10px',
                color: 'white',
                outline: 'none',
                transition: 'all 0.3s'
              }} 
            />
          </div>
          <select 
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '10px 15px', borderRadius: '10px', outline: 'none', cursor: 'pointer' }}
          >
            <option value="all">All Types</option>
            <option value="income">Income Only</option>
            <option value="expense">Expense Only</option>
          </select>
          <button style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '10px 15px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <Filter size={18} />
            <span>More Filters</span>
          </button>
          <button style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '10px 15px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <Download size={18} />
            <span>Export</span>
          </button>
        </div>

        {/* Transactions List */}
        <div style={{ padding: '0' }}>
          {filteredTransactions.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
              No transactions found matching your criteria.
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ color: 'var(--text-secondary)', fontSize: '14px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <th style={{ padding: '15px 25px', fontWeight: '500' }}>Transaction</th>
                  <th style={{ padding: '15px 25px', fontWeight: '500' }}>Category</th>
                  <th style={{ padding: '15px 25px', fontWeight: '500' }}>Date</th>
                  <th style={{ padding: '15px 25px', fontWeight: '500', textAlign: 'right' }}>Amount</th>
                  <th style={{ padding: '15px 25px', fontWeight: '500', textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((tx) => (
                  <tr key={tx.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', transition: 'background-color 0.2s' }} className="table-row-hover">
                    <td style={{ padding: '15px 25px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <div style={{ 
                          width: '40px', 
                          height: '40px', 
                          borderRadius: '10px', 
                          background: tx.type === 'income' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(255,255,255,0.05)',
                          color: tx.type === 'income' ? 'var(--success)' : 'var(--text-secondary)',
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center' 
                        }}>
                          {tx.icon}
                        </div>
                        <div>
                          <div style={{ fontWeight: '500', color: 'var(--text-primary)', marginBottom: '4px' }}>{tx.title}</div>
                          <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Credit Card •••• 4242</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '15px 25px' }}>
                      <span style={{ 
                        background: 'rgba(255,255,255,0.05)', 
                        padding: '5px 12px', 
                        borderRadius: '20px', 
                        fontSize: '13px',
                        color: 'var(--text-secondary)'
                      }}>
                        {tx.category}
                      </span>
                    </td>
                    <td style={{ padding: '15px 25px', color: 'var(--text-secondary)', fontSize: '14px' }}>
                      {tx.date}
                    </td>
                    <td style={{ padding: '15px 25px', textAlign: 'right', fontWeight: '500', color: tx.type === 'income' ? 'var(--success)' : 'var(--text-primary)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '5px' }}>
                        {tx.type === 'income' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} color="var(--text-secondary)" />}
                        {tx.type === 'income' ? '+' : '-'}${tx.amount.toFixed(2)}
                      </div>
                    </td>
                    <td style={{ padding: '15px 25px', textAlign: 'center' }}>
                      <button style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '5px', borderRadius: '5px' }} className="icon-btn-hover">
                        <MoreHorizontal size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      
      {/* Add New Transaction Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center', backdropFilter: 'blur(5px)' }}>
          <div className="glass-panel" style={{ width: '400px', maxWidth: '90%', padding: '25px', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, fontSize: '20px' }}>Add Transaction</h3>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>
            
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
              <button 
                onClick={() => setNewTxType('expense')}
                style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid', borderColor: newTxType === 'expense' ? 'var(--danger)' : 'rgba(255,255,255,0.1)', background: newTxType === 'expense' ? 'rgba(239, 68, 68, 0.1)' : 'transparent', color: newTxType === 'expense' ? 'var(--danger)' : 'white', cursor: 'pointer', transition: 'all 0.2s', fontWeight: '500' }}>
                Expense
              </button>
              <button 
                onClick={() => setNewTxType('income')}
                style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid', borderColor: newTxType === 'income' ? 'var(--success)' : 'rgba(255,255,255,0.1)', background: newTxType === 'income' ? 'rgba(34, 197, 94, 0.1)' : 'transparent', color: newTxType === 'income' ? 'var(--success)' : 'white', cursor: 'pointer', transition: 'all 0.2s', fontWeight: '500' }}>
                Income
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '5px' }}>Amount</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'white', fontSize: '18px' }}>$</span>
                  <input type="number" placeholder="0.00" style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 15px 12px 35px', borderRadius: '8px', color: 'white', outline: 'none', fontSize: '20px', fontWeight: 'bold' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '5px' }}>Title</label>
                <input type="text" placeholder="e.g. Starbucks Coffee" style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 15px', borderRadius: '8px', color: 'white', outline: 'none' }} />
              </div>

              <div style={{ display: 'flex', gap: '15px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '5px' }}>Category</label>
                  <select style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 15px', borderRadius: '8px', color: 'white', outline: 'none' }}>
                    {newTxType === 'expense' ? (
                      <>
                        <option style={{ background: 'var(--bg-dark)' }}>Food & Drinks</option>
                        <option style={{ background: 'var(--bg-dark)' }}>Shopping</option>
                        <option style={{ background: 'var(--bg-dark)' }}>Utilities</option>
                        <option style={{ background: 'var(--bg-dark)' }}>Entertainment</option>
                      </>
                    ) : (
                      <>
                        <option style={{ background: 'var(--bg-dark)' }}>Salary</option>
                        <option style={{ background: 'var(--bg-dark)' }}>Freelance</option>
                        <option style={{ background: 'var(--bg-dark)' }}>Investment</option>
                      </>
                    )}
                  </select>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '5px' }}>Date</label>
                  <input type="date" defaultValue={new Date().toISOString().split('T')[0]} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '11px 15px', borderRadius: '8px', color: 'white', outline: 'none' }} />
                </div>
              </div>

              <button 
                onClick={() => setIsModalOpen(false)}
                style={{ width: '100%', background: 'var(--primary)', border: 'none', color: 'white', padding: '15px', borderRadius: '8px', fontWeight: 'bold', marginTop: '10px', cursor: 'pointer', transition: 'opacity 0.2s' }}
                onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
                onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
              >
                Save Transaction
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CSS Styles to inject locally for hover effects if not present in main css */}
      <style>{`
        .table-row-hover:hover {
          background-color: rgba(255,255,255,0.02);
        }
        .icon-btn-hover:hover {
          color: white !important;
          background-color: rgba(255,255,255,0.1) !important;
        }
        .ai-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(236, 72, 153, 0.3);
        }
      `}</style>
    </div>
  );
};

export default Transactions;
