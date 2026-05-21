import React from 'react'

function Sidebar() {
    const SIDEBAR_ITEMS = [
    { icon: "fa-building",    label: "Tenants",         active: true},
    { icon: "fa-sliders",     label: "Subscriptions",   active: false },
    { icon: "fa-chart-bar",   label: "Analytics",       active: false },
    { icon: "fa-file-invoice",label: "Billing",         active: false },
    { icon: "fa-bell",        label: "Notifications",   active: false, badge: 3 },
    { icon: "fa-gear",        label: "Settings",        active: false },
  ];
  return (
     <div className="tm-sidebar">
          <div className="sidebar-section-label">Main</div>
          {SIDEBAR_ITEMS.slice(0,5).map(item => (
            <div
              key={item.label}
              className={`sidebar-item ${item.active ? "active" : ""}`}
            >
              <i className={`fa-solid ${item.icon}`} />
              {item.label}
              {item.badge && <span className="sidebar-badge">{item.badge}</span>}
            </div>
          ))}

          <div className="sidebar-divider" />
          <div className="sidebar-section-label">System</div>
          {SIDEBAR_ITEMS.slice(5).map(item => (
            <div
              key={item.label}
              className={`sidebar-item ${item.active ? "active" : ""}`}
            >
              <i className={`fa-solid ${item.icon}`} />
              {item.label}
              {item.badge && <span className="sidebar-badge">{item.badge}</span>}
            </div>
          ))}
   </div>

  )
}

export default Sidebar