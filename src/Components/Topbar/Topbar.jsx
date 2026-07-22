import React from 'react'

const Topbar = () => {
  const userDataStr = localStorage.getItem('hrm_user_data');
  let userName = '';
  let initials = 'A';
  
  if (userDataStr) {
    try {
      const userData = JSON.parse(userDataStr);
      const user = userData?.data?.user || userData?.data?.data?.data?.user || userData?.user || userData?.data;
      if (user && user.user_name) {
        userName = user.user_name;
        initials = user.user_name.charAt(0).toUpperCase();
      }
    } catch (e) {
      console.error("Error parsing user data in Topbar:", e);
    }
  }

  return (
    <nav className="tm-nav">
        <div className="nav-brand">
          <div className="nav-logo-mark"><i className="fa-solid fa-sitemap" /></div>
          <span className="nav-logo-text">PeopleOS</span>
          <span className="nav-logo-badge">HRMS</span>
        </div>
        <div className="nav-right">
          {userName && (
            <span className="nav-user-name" style={{ marginRight: '8px', fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
              {userName}
            </span>
          )}
          <div className="nav-avatar" title="My account">{initials}</div>
          <button className="nav-icon-btn" title="Logout" onClick={() => {
            localStorage.removeItem('hrm_user_data');
            window.location.href = '/signin';
          }}>
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
          </button>
          <button className="nav-icon-btn" title="Notifications">
            <i className="fa-regular fa-bell" />
            <span className="nav-notif-dot" />
          </button>
          <button className="nav-icon-btn" title="Help">
            <i className="fa-regular fa-circle-question" />
          </button>
        </div>
      </nav>
  )
}

export default Topbar