import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ACCENTS, applyAppearance, getStoredAccent, getStoredTheme } from '../../utils/appearance';

const Topbar = () => {
  const navigate = useNavigate();
  const userDataStr = localStorage.getItem('hrm_user_data');
  let userName = '';
  let initials = 'A';
  const [theme, setTheme] = useState(getStoredTheme());
  const [accent, setAccent] = useState(getStoredAccent());

  if (userDataStr) {
    try {
      const userData = JSON.parse(userDataStr);
      const user = userData?.data?.data?.user || userData?.data?.data || userData?.data?.user || userData?.user;
      const name = user?.user_name || user?.name;
      if (name) {
        userName = name;
        initials = name.charAt(0).toUpperCase();
      }
    } catch (e) {
      console.error("Error parsing user data in Topbar:", e);
    }
  }

  useEffect(() => {
    applyAppearance(theme, accent);
  }, [theme, accent]);

  return (
    <nav className="tm-nav">
      <div className="nav-brand">
        <div className="nav-logo-mark"><i className="fa-solid fa-sitemap" /></div>
        <span className="nav-logo-text">PeopleOS</span>
        <span className="nav-logo-badge">HRMS</span>
      </div>
      <div className="nav-right">
        <button className={`nav-chip ${theme === 'light' ? 'active' : ''}`} onClick={() => setTheme('light')}>Light</button>
        <button className={`nav-chip ${theme === 'dark' ? 'active' : ''}`} onClick={() => setTheme('dark')}>Dark</button>
        <div className="nav-accent-row">
          {ACCENTS.map((item) => (
            <button
              key={item.key}
              className={`nav-accent ${accent === item.key ? 'active' : ''}`}
              style={{ background: item.value }}
              onClick={() => setAccent(item.key)}
              title={`Accent: ${item.key}`}
            />
          ))}
        </div>
        <div 
          className="nav-avatar" 
          title="My Profile & Settings"
          onClick={() => navigate('/home/profile')}
          style={{ cursor: 'pointer' }}
        >
          {initials}
        </div>
        <button className="nav-icon-btn" title="Logout" onClick={() => {
          localStorage.removeItem('hrm_user_data');
          window.location.replace('/signin');
        }}>
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
        </button>
      </div>
    </nav>
  );
};

export default Topbar;
