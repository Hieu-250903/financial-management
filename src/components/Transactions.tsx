import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  ArrowUpRight, 
  ArrowDownRight, 
  MoreHorizontal, 
  Coffee, 
  ShoppingBag, 
  Zap, 
  CreditCard, 
  DollarSign,
  Download,
  Brain
} from 'lucide-react';

// Giả lập dữ liệu giao dịch
const initialTransactions = [
  { id: 1, title: 'Starbucks Coffee', category: 'Food & Drinks', type: 'expense', amount: 5.50, date: '2026-05-03', icon: <Coffee size={18} /> },
  { id: 2, title: 'Freelance Design Project', category: 'Income', type: 'income', amount: 1200.00, date: '2026-05-02', icon: <DollarSign size={18} /> },
  { id: 3, title: 'Amazon Shopping', category: 'Shopping', type: 'expense', amount: 134.99, date: '2026-05-01', icon: <ShoppingBag size={18} /> },
  { id: 4, title: 'Electricity Bill', category: 'Utilities', type: 'expense', amount: 85.00, date: '2026-04-28', icon: <Zap size={18} /> },
  { id: 5, title: 'Netflix Subscription', category: 'Entertainment', type: 'expense', amount: 15.99, date: '2026-04-25', icon: <CreditCard size={18} /> },
  { id: 6, title: 'Salary', category: 'Income', type: 'income', amount: 4500.00, date: '2026-04-24', icon: <DollarSign size={18} /> },
];

const Transactions: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // all, income, expense

  const filteredTransactions = initialTransactions.filter(t => {
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
            <button style={{ background: 'var(--primary)', border: 'none', color: 'white', padding: '10px 15px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: '500' }}>
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
