import React from 'react';
import { useAuth } from '../context/AuthContext';

const Account = () => {
  const { user, logout } = useAuth();

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h1>My Account</h1>
      <div className="glass-container">
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', color: '#aaa', fontSize: '0.9em' }}>Username</label>
          <div style={{ fontSize: '1.2em' }}>{user?.username}</div>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', color: '#aaa', fontSize: '0.9em' }}>Role</label>
          <div style={{ fontSize: '1.2em', color: 'var(--accent-color)' }}>{user?.role}</div>
        </div>
        <div style={{ marginBottom: '30px' }}>
          <label style={{ display: 'block', color: '#aaa', fontSize: '0.9em' }}>Last Login</label>
          <div>{new Date(user?.loginTime).toLocaleString()}</div>
        </div>

        <button className="btn" style={{ background: '#f44336', border: 'none' }} onClick={logout}>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Account;
