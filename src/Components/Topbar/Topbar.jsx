import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ACCENTS, applyAppearance, getStoredAccent, getStoredTheme } from '../../utils/appearance';

const Topbar = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(getStoredTheme());
  const [accent, setAccent] = useState(getStoredAccent());
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showAccentPanel, setShowAccentPanel] = useState(false);
  const [showNotifPanel, setShowNotifPanel] = useState(false);

  let userName = 'User';
  let userEmail = 'admin@peopleos.com';
  let initials = 'U';

  const userDataStr = localStorage.getItem('hrm_user_data');
  if (userDataStr) {
    try {
      const userData = JSON.parse(userDataStr);
      const user = userData?.data?.data?.user || userData?.data?.data || userData?.data?.user || userData?.user;
      const name = user?.user_name || user?.name;
      if (name) {
        userName = name;
        initials = name.slice(0, 2).toUpperCase();
      }
      if (user?.user_email || user?.email) {
        userEmail = user.user_email || user.email;
      }
    } catch (e) {
      console.error('Error parsing user data in Topbar:', e);
    }
  }

  useEffect(() => {
    applyAppearance(theme, accent);
  }, [theme, accent]);

  // Live clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) =>
    date.toLocaleTimeString('en-US', {
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true,
    });

  const accentObj = ACCENTS.find(a => a.key === accent) || ACCENTS[0];

  const popNotifs = [
    { id: 1, icon: 'fa-shield-halved', color: '#3B82F6', title: 'New Tenant Registered', time: '10m ago', unread: true },
    { id: 2, icon: 'fa-credit-card', color: '#10B981', title: 'Invoice #INV-2026 Paid', time: '1h ago', unread: true },
    { id: 3, icon: 'fa-triangle-exclamation', color: '#F59E0B', title: 'Storage limit at 85%', time: '3h ago', unread: false }
  ];

  return (
    <nav className="ud-topbar">
      {/* Left: Search */}
      <div className="ud-topbar-left">
        <div className="ud-search-box">
          <i className="fa-solid fa-magnifying-glass ud-search-icon" />
          <input
            type="text"
            className="ud-search-input"
            placeholder="Search subscriptions, billing, settings..."
          />
          <kbd className="ud-search-kbd">⌘K</kbd>
        </div>
      </div>

      {/* Center: Clock */}
      <div className="ud-topbar-center">
        <div className="ud-clock">
          <i className="fa-regular fa-clock" />
          <span>{formatTime(currentTime)}</span>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="ud-topbar-right">
        {/* Notification bell popover wrapper */}
        <div className="ud-notif-wrapper">
          <button
            className="ud-icon-btn"
            title="Notifications"
            onClick={() => { setShowNotifPanel(p => !p); setShowAccentPanel(false); }}
          >
            <i className="fa-regular fa-bell" />
            <span className="ud-notif-badge" />
          </button>

          {showNotifPanel && (
            <>
              <div className="ud-accent-backdrop" onClick={() => setShowNotifPanel(false)} />
              <div className="ud-notif-popover">
                <div className="ud-notif-pop-header">
                  <h4>Notifications</h4>
                  <button
                    className="ud-btn ud-btn-sm ud-btn-secondary"
                    onClick={() => { setShowNotifPanel(false); navigate('/home/notifications'); }}
                  >
                    View All
                  </button>
                </div>
                {popNotifs.map(n => (
                  <div
                    key={n.id}
                    className={`ud-notif-pop-item ${n.unread ? 'unread' : ''}`}
                    onClick={() => { setShowNotifPanel(false); navigate('/home/notifications'); }}
                  >
                    <div className="ud-notif-pop-icon" style={{ background: `${n.color}15`, color: n.color }}>
                      <i className={`fa-solid ${n.icon}`} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)' }}>{n.title}</div>
                      <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '2px' }}>{n.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Theme toggle */}
        <button
          className="ud-icon-btn"
          onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
          title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        >
          <i className={theme === 'light' ? 'fa-regular fa-moon' : 'fa-regular fa-sun'} />
        </button>

        {/* Color palette picker */}
        <div className="ud-accent-wrapper">
          <button
            className="ud-icon-btn"
            onClick={() => { setShowAccentPanel(p => !p); setShowNotifPanel(false); }}
            title="Primary color"
          >
            <span className="ud-accent-dot" style={{ background: accentObj.value }} />
          </button>
          {showAccentPanel && (
            <>
              <div
                className="ud-accent-backdrop"
                onClick={() => setShowAccentPanel(false)}
              />
              <div className="ud-accent-panel">
                <div className="ud-accent-panel-title">Primary Accent</div>
                <div className="ud-accent-grid">
                  {ACCENTS.map(item => (
                    <button
                      key={item.key}
                      className={`ud-accent-swatch ${accent === item.key ? 'active' : ''}`}
                      style={{ background: item.value }}
                      onClick={() => { setAccent(item.key); setShowAccentPanel(false); }}
                      title={item.key}
                    >
                      {accent === item.key && <i className="fa-solid fa-check" />}
                      <span>{item.key.charAt(0).toUpperCase() + item.key.slice(1)}</span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* User chip */}
        <div
          className="ud-user-chip"
          onClick={() => navigate('/home/profile')}
          title={`${userName} (${userEmail})`}
        >
          <div className="ud-avatar">{initials}</div>
          <span className="ud-user-name">{userName}</span>
        </div>
      </div>
    </nav>
  );
};

export default Topbar;
