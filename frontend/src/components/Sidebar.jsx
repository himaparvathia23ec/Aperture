import React from 'react';
import { useAuth } from '../context/AuthContext';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const { logout } = useAuth();

  const navStyle = ({ isActive }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: '10px 16px',
    margin: '4px 0',
    borderRadius: '6px',
    textDecoration: 'none',
    color: isActive ? 'var(--accent-color)' : 'var(--text-secondary)',
    background: isActive ? 'var(--accent-subtle)' : 'transparent',
    fontWeight: isActive ? '600' : '400',
    transition: 'all 0.2s ease',
    fontSize: '0.9rem'
  });

  return (
    <aside style={{
      width: 'var(--sidebar-width)',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'white',
      borderRight: '1px solid #E5E7EB',
      position: 'fixed',
      left: 0,
      top: 0
    }}>
      {/* Brand */}
      <div style={{ padding: '24px', borderBottom: '1px solid #F3F4F6' }}>
        <h2 style={{ margin: 0, fontSize: '1.25rem', color: '#111827', letterSpacing: '-0.02em' }}>EcoSense AI</h2>
        <span style={{ fontSize: '0.75rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px', display: 'block' }}>
          Decision Support
        </span>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: '24px 16px' }}>
        <div style={{ fontSize: '0.75rem', color: '#9CA3AF', fontWeight: '600', marginBottom: '12px', paddingLeft: '8px' }}>
          OPERATIONS
        </div>
        <NavLink to="/" style={navStyle}>Dashboard</NavLink>
        <NavLink to="/active-crises" style={navStyle}>Active Crises</NavLink>
        <NavLink to="/resources" style={navStyle}>Resources</NavLink>

        <div style={{ fontSize: '0.75rem', color: '#9CA3AF', fontWeight: '600', marginBottom: '12px', marginTop: '24px', paddingLeft: '8px' }}>
          SYSTEM
        </div>
        <NavLink to="/account" style={navStyle}>Account Settings</NavLink>
      </nav>

      {/* User / Logout */}
      <div style={{ padding: '16px', borderTop: '1px solid #F3F4F6', background: '#F9FAFB' }}>
        <button
          onClick={logout}
          className="btn"
          style={{
            width: '100%',
            justifyContent: 'flex-start',
            color: '#6B7280',
            border: '1px solid #E5E7EB',
            background: 'white',
            fontWeight: 'normal'
          }}
        >
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
