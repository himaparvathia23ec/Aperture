import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const TopBar = () => {
  const { user } = useAuth();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header style={{
      height: 'var(--header-height)',
      background: 'white',
      borderBottom: '1px solid #E5E7EB',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 32px',
      position: 'sticky',
      top: 0,
      zIndex: 10
    }}>
      {/* System Status */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', background: '#F0FDF4', borderRadius: '20px', border: '1px solid #DCFCE7' }}>
        <div style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: '#16A34A',
        }} />
        <span style={{ fontSize: '0.75rem', fontWeight: '600', color: '#15803D' }}>SYSTEM ONLINE</span>
      </div>

      {/* Contextual Info */}
      <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-primary)' }}>
            {time.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' })}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingLeft: '24px', borderLeft: '1px solid #E5E7EB' }}>
          <div style={{
            width: '32px',
            height: '32px',
            background: 'var(--accent-subtle)',
            color: 'var(--accent-color)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '600',
            fontSize: '0.875rem'
          }}>
            {user?.username?.charAt(0).toUpperCase()}
          </div>
          <div>
            <div style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-primary)' }}>{user?.full_name || user?.username}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{user?.role}</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
