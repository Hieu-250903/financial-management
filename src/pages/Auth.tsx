import React, { useState } from 'react';
import { Wallet, Mail, Lock, User, ArrowRight } from 'lucide-react';

interface AuthProps {
  onLogin: () => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      
      {/* Background glowing effects */}
      <div style={{ position: 'absolute', top: '10%', left: '20%', width: '400px', height: '400px', background: 'var(--primary)', borderRadius: '50%', filter: 'blur(150px)', opacity: 0.15 }}></div>
      <div style={{ position: 'absolute', bottom: '10%', right: '20%', width: '400px', height: '400px', background: '#ec4899', borderRadius: '50%', filter: 'blur(150px)', opacity: 0.15 }}></div>

      <div className="glass-panel auth-card" style={{ width: '420px', maxWidth: '90%', padding: '40px', position: 'relative', zIndex: 10, border: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ textAlign: 'center', marginBottom: '35px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(99, 102, 241, 0.1)', padding: '15px', borderRadius: '20px', marginBottom: '20px' }}>
            <Wallet size={40} color="var(--primary)" />
          </div>
          <h2 style={{ margin: '0 0 10px 0', fontSize: '28px', color: 'white' }}>
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '15px' }}>
            {isLogin ? 'Enter your details to access your account' : 'Start managing your finances intelligently'}
          </p>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onLogin(); }} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {!isLogin && (
            <div>
              <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Full Name</label>
              <div style={{ position: 'relative' }}>
                <User size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                <input required type="text" placeholder="John Doe" style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '14px 15px 14px 45px', borderRadius: '12px', color: 'white', outline: 'none', transition: 'all 0.3s', fontSize: '15px' }} className="input-focus" />
              </div>
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
              <input required type="email" placeholder="you@example.com" style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '14px 15px 14px 45px', borderRadius: '12px', color: 'white', outline: 'none', transition: 'all 0.3s', fontSize: '15px' }} className="input-focus" />
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Password</label>
              {isLogin && <a href="#" style={{ fontSize: '13px', color: 'var(--primary)', textDecoration: 'none', transition: 'color 0.2s' }} className="link-hover">Forgot Password?</a>}
            </div>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
              <input required type="password" placeholder="••••••••" style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '14px 15px 14px 45px', borderRadius: '12px', color: 'white', outline: 'none', transition: 'all 0.3s', fontSize: '15px' }} className="input-focus" />
            </div>
          </div>

          <button type="submit" style={{ background: 'var(--primary)', border: 'none', color: 'white', padding: '16px', borderRadius: '12px', fontSize: '16px', fontWeight: 'bold', marginTop: '10px', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', transition: 'background-color 0.3s, transform 0.2s' }} className="btn-primary-hover">
            {isLogin ? 'Sign In' : 'Create Account'}
            <ArrowRight size={18} />
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '30px', fontSize: '15px', color: 'var(--text-secondary)' }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => setIsLogin(!isLogin)} 
            style={{ background: 'none', border: 'none', color: 'white', fontWeight: 'bold', cursor: 'pointer', padding: 0, fontSize: '15px', transition: 'color 0.2s' }}
            className="link-hover"
          >
            {isLogin ? 'Sign Up' : 'Log In'}
          </button>
        </div>
      </div>

      <style>{`
        .input-focus:focus {
          border-color: var(--primary) !important;
          background: rgba(255,255,255,0.08) !important;
          box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
        }
        .btn-primary-hover:hover {
          background-color: #4f46e5 !important;
          transform: translateY(-2px);
        }
        .btn-primary-hover:active {
          transform: translateY(0);
        }
        .link-hover:hover {
          color: var(--primary) !important;
        }
        .auth-card {
          animation: fadeUp 0.5s ease-out forwards;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Auth;
