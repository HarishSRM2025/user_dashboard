import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();

  const userDataStr = localStorage.getItem('hrm_user_data');
  let user = {};
  try {
    const userData = JSON.parse(userDataStr || '{}');
    user = userData?.data?.data?.user || userData?.data?.user || userData?.user || {};
  } catch (e) {
    console.error(e);
  }

  const userName = user?.user_name || 'User';
  const initials = userName.slice(0, 2).toUpperCase();

  const MAIN_ITEMS = [
    { icon: 'fa-solid fa-house',          label: 'Dashboard',      path: '/home', exact: true },
    { icon: 'fa-solid fa-layer-group',    label: 'Subscriptions',  path: '/home/subscriptions' },
  ];

  const METRICS_ITEMS = [
    { icon: 'fa-solid fa-chart-column',   label: 'Analytics',      path: '/home/analytics' },
    { icon: 'fa-solid fa-credit-card',    label: 'Billing',        path: '/home/billing' },
    { icon: 'fa-solid fa-bell',           label: 'Notifications',  path: '/home/notifications', badge: 3 },
  ];

  const SYSTEM_ITEMS = [
    { icon: 'fa-solid fa-gear',           label: 'Settings',       path: '/home/settings' },
    { icon: 'fa-solid fa-user',           label: 'My Profile',     path: '/home/profile' },
  ];

  return (
    <aside className="ud-sidebar">
      {/* Logo Header */}
      <div className="ud-sidebar-header">
        <div className="ud-sidebar-logo-icon">
          <i className="fa-solid fa-sitemap" />
        </div>
        <div className="ud-sidebar-brand">
          <span className="ud-sidebar-brand-name">PeopleOS</span>
          <span className="ud-sidebar-brand-badge">HRMS</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="ud-sidebar-nav">
        <div className="ud-menu-section">MAIN MENU</div>
        {MAIN_ITEMS.map(item => (
          <NavLink
            key={item.label}
            to={item.path}
            end={item.exact}
            className={({ isActive }) => `ud-menu-item ${isActive ? 'active' : ''}`}
          >
            <span className="ud-menu-icon"><i className={item.icon} /></span>
            <span className="ud-menu-label">{item.label}</span>
            {item.badge && <span className="ud-menu-badge">{item.badge}</span>}
          </NavLink>
        ))}

        <div className="ud-menu-section" style={{ marginTop: '16px' }}>FINANCE &amp; METRICS</div>
        {METRICS_ITEMS.map(item => (
          <NavLink
            key={item.label}
            to={item.path}
            end={item.exact}
            className={({ isActive }) => `ud-menu-item ${isActive ? 'active' : ''}`}
          >
            <span className="ud-menu-icon"><i className={item.icon} /></span>
            <span className="ud-menu-label">{item.label}</span>
            {item.badge && <span className="ud-menu-badge">{item.badge}</span>}
          </NavLink>
        ))}

        <div className="ud-menu-section" style={{ marginTop: '16px' }}>SYSTEM &amp; PREFERENCES</div>
        {SYSTEM_ITEMS.map(item => (
          <NavLink
            key={item.label}
            to={item.path}
            end={item.exact}
            className={({ isActive }) => `ud-menu-item ${isActive ? 'active' : ''}`}
          >
            <span className="ud-menu-icon"><i className={item.icon} /></span>
            <span className="ud-menu-label">{item.label}</span>
          </NavLink>
        ))}

        {/* System Health / Active Plan Status Widget */}
        <div className="ud-sidebar-widget" style={{ marginTop: '20px' }}>
          <div className="ud-sidebar-widget-title">Active Plan</div>
          <div className="ud-sidebar-widget-val">
            <span className="ud-sidebar-widget-dot" /> Enterprise Pro
          </div>
          <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '4px' }}>
            24 / 30 Seats Used
          </div>
          <div className="ud-meter-track" style={{ marginTop: '8px', height: '5px' }}>
            <div className="ud-meter-fill" style={{ width: '80%' }} />
          </div>
        </div>
      </nav>

      {/* User Footer */}
      <div className="ud-sidebar-footer">
        <div
          className="ud-sidebar-user"
          onClick={() => navigate('/home/profile')}
          title="View Profile & Settings"
        >
          <div className="ud-sidebar-user-avatar">{initials}</div>
          <div className="ud-sidebar-user-info">
            <div className="ud-sidebar-user-name">{userName}</div>
            <div className="ud-sidebar-user-sub">Account Settings</div>
          </div>
          <i className="fa-solid fa-chevron-right ud-sidebar-user-arrow" />
        </div>

        <button
          className="ud-sidebar-logout"
          title="Logout"
          onClick={() => {
            localStorage.removeItem('hrm_user_data');
            window.location.replace('/signin');
          }}
        >
          <i className="fa-solid fa-arrow-right-from-bracket" />
          Sign out
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
