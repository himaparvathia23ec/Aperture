import React from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

const Layout = ({ children }) => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-secondary)' }}>
      <Sidebar />
      <div style={{
        flex: 1,
        marginLeft: 'var(--sidebar-width)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <TopBar />
        <main style={{
          padding: '32px',
          width: '100%',
          boxSizing: 'border-box'
        }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
