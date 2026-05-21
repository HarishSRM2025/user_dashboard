import React from 'react'

const Topbar = () => {
  return (
    <nav className="tm-nav">
        <div className="nav-brand">
          <div className="nav-logo-mark"><i className="fa-solid fa-sitemap" /></div>
          <span className="nav-logo-text">PeopleOS</span>
          <span className="nav-logo-badge">HRMS</span>
        </div>
        <div className="nav-right">
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
          <div className="nav-avatar" title="My account">A</div>
        </div>
      </nav>
  )
}

export default Topbar