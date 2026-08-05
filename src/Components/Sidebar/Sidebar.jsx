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

  const initials = (user?.user_name || 'User').slice(0, 2).toUpperCase();

  const SIDEBAR_ITEMS = [
    { icon: "fa-building",    label: "Tenants",         path: "/home", active: true },
    { icon: "fa-sliders",     label: "Subscriptions",   path: "/home/subscriptions", active: false },
    { icon: "fa-chart-bar",   label: "Analytics",       path: "/home/analytics", active: false },
    { icon: "fa-file-invoice",label: "Billing",         path: "/home/billing", active: false },
    { icon: "fa-bell",        label: "Notifications",   path: "/home/notifications", active: false, badge: 3 },
    { icon: "fa-gear",        label: "Settings",        path: "/home/settings", active: false },
  ];

  return (
    <div className="tm-sidebar">
      <div className="sidebar-section-label" style={{ padding: '0 8px', margin: '8px 0 4px 0', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', color: 'var(--muted)' }}>
        Main Menu
      </div>
      {SIDEBAR_ITEMS.slice(0, 5).map(item => (
        <NavLink
          to={item.path}
          key={item.label}
          className={({ isActive }) => `sidebar-item ${isActive ? "active" : ""}`}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', borderRadius: '10px', textDecoration: 'none' }}
        >
          <i className={`fa-solid ${item.icon}`} style={{ width: '18px', textAlign: 'center' }} />
          <span style={{ flex: 1 }}>{item.label}</span>
          {item.badge && <span className="sidebar-badge">{item.badge}</span>}
        </NavLink>
      ))}

      <div className="sidebar-divider" style={{ borderTop: '1px solid var(--border)', margin: '12px 0' }} />
      
      <div className="sidebar-section-label" style={{ padding: '0 8px', margin: '8px 0 4px 0', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', color: 'var(--muted)' }}>
        System
      </div>
      {SIDEBAR_ITEMS.slice(5).map(item => (
        <NavLink
          to={item.path}
          key={item.label}
          className={({ isActive }) => `sidebar-item ${isActive ? "active" : ""}`}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', borderRadius: '10px', textDecoration: 'none' }}
        >
          <i className={`fa-solid ${item.icon}`} style={{ width: '18px', textAlign: 'center' }} />
          <span style={{ flex: 1 }}>{item.label}</span>
          {item.badge && <span className="sidebar-badge">{item.badge}</span>}
        </NavLink>
      ))}

      <div className="sidebar-footer">
        <div className="sidebar-user-row">
          <div 
            className="sidebar-user-left" 
            onClick={() => navigate('/home/profile')}
            style={{ cursor: 'pointer' }}
            title="View Profile & Settings"
          >
            <div className="sidebar-avatar">{initials}</div>
            <div>
              <div className="sidebar-name">{user?.user_name || 'User'}</div>
              <div className="sidebar-email">{user?.user_email || ''}</div>
            </div>
          </div>
          <button 
            className="sidebar-logout-icon" 
            title="Logout" 
            onClick={() => { 
              localStorage.removeItem('hrm_user_data'); 
              window.location.replace('/signin'); 
            }}
          >
            <i className="fa-solid fa-arrow-right-from-bracket" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
