import React from 'react'
import { NavLink } from 'react-router-dom'

function Sidebar() {
    const userDataStr = localStorage.getItem('hrm_user_data');
    let user = {};
    try {
      const userData = JSON.parse(userDataStr || '{}');
      user = userData?.data?.data?.user || userData?.data?.user || userData?.user || {};
    } catch {}

    const initials = (user?.user_name || 'User').slice(0, 2).toUpperCase();
    const SIDEBAR_ITEMS = [
    { icon: "fa-building",    label: "Tenants",         path: "/home", active: true},
    { icon: "fa-sliders",     label: "Subscriptions",   path: "/home/subscriptions", active: false },
    { icon: "fa-chart-bar",   label: "Analytics",       path: "/home/analytics", active: false },
    { icon: "fa-file-invoice",label: "Billing",         path: "/home/billing", active: false },
    { icon: "fa-bell",        label: "Notifications",   path: "/home/notifications", active: false, badge: 3 },
    { icon: "fa-gear",        label: "Settings",        path: "/home/settings", active: false },
  ];
  return (
     <div className="tm-sidebar">
          <div className="sidebar-section-label">Main</div>
          {SIDEBAR_ITEMS.slice(0,5).map(item => (
            <NavLink
              to={item.path}
              key={item.label}
              className={({ isActive }) => `sidebar-item ${isActive ? "active" : ""}`}
            >
              <i className={`fa-solid ${item.icon}`} />
              {item.label}
              {item.badge && <span className="sidebar-badge">{item.badge}</span>}
            </NavLink>
          ))}

          <div className="sidebar-divider" />
          <div className="sidebar-section-label">System</div>
          {SIDEBAR_ITEMS.slice(5).map(item => (
            <NavLink
              to={item.path}
              key={item.label}
              className={({ isActive }) => `sidebar-item ${isActive ? "active" : ""}`}
            >
              <i className={`fa-solid ${item.icon}`} />
              {item.label}
              {item.badge && <span className="sidebar-badge">{item.badge}</span>}
            </NavLink>
          ))}
          <div className="sidebar-footer">
            <div className="sidebar-user">
              <div className="sidebar-avatar">{initials}</div>
              <div>
                <div className="sidebar-name">{user?.user_name || 'User'}</div>
                <div className="sidebar-email">{user?.user_email || ''}</div>
              </div>
            </div>
            <button className="sidebar-logout" onClick={() => { localStorage.removeItem('hrm_user_data'); window.location.replace('/signin'); }}>
              <i className="fa-solid fa-arrow-right-from-bracket" /> Logout
            </button>
          </div>
   </div>

  )
}

export default Sidebar
