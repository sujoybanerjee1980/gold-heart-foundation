import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/inventory', label: 'Inventory', icon: '📦' },
    { path: '/sales', label: 'Sales', icon: '💰' },
    { path: '/reports', label: 'Reports', icon: '📈' },
    { path: '/settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <div className="app-container">
      <aside className="sidebar">
        <h1>🌾 Siragugal</h1>
        <ul className="nav-menu">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
              >
                <span>{item.icon}</span> {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      <div className="main-content">
        <header className="header">
          <h2>Siragugal Agricultural Management System</h2>
          <button className="btn btn-secondary" onClick={() => setSidebarOpen(!sidebarOpen)}>
            ☰ Menu
          </button>
        </header>
        <main className="content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
