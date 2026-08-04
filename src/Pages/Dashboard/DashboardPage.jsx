import { useEffect, useMemo, useState } from 'react';
import { ACCENTS, applyAppearance, getStoredAccent, getStoredTheme } from '../../utils/appearance';

const CARDS = {
  subscriptions: { title: 'Subscriptions', icon: 'fa-layer-group', text: 'Manage active plans, renewals, and seat usage.' },
  analytics: { title: 'Analytics', icon: 'fa-chart-column', text: 'Review product usage, team trends, and engagement.' },
  billing: { title: 'Billing', icon: 'fa-credit-card', text: 'Track invoices, payment methods, and billing history.' },
  notifications: { title: 'Notifications', icon: 'fa-bell', text: 'Control email alerts, reminders, and system updates.' },
  settings: { title: 'Settings', icon: 'fa-gear', text: 'Switch theme, update colors, and manage profile access.' },
  profile: { title: 'Profile', icon: 'fa-user', text: 'Update profile details and change your password.' },
};

export default function DashboardPage({ pageKey }) {
  const page = CARDS[pageKey] || CARDS.settings;
  const [theme, setTheme] = useState(getStoredTheme());
  const [accent, setAccent] = useState(getStoredAccent());
  const [name] = useState(() => {
    try {
      const data = JSON.parse(localStorage.getItem('hrm_user_data') || '{}');
      return data?.data?.data?.user?.user_name || data?.data?.user?.user_name || data?.user?.user_name || 'User';
    } catch {
      return 'User';
    }
  });

  useEffect(() => {
    applyAppearance(theme, accent);
  }, [theme, accent]);

  const stats = useMemo(() => ([
    ['Plan', 'Pro'],
    ['Seats', '24'],
    ['Usage', '78%'],
    ['Status', 'Active'],
  ]), []);

  return (
    <div className="dash-page">
      <div className="page-shell">
        <div className="page-hero">
          <div className="hero-copy">
            <div className="eyebrow">Workspace</div>
            <h1>{page.title}</h1>
            <p>{page.text}</p>
          </div>
          <div className="hero-icon"><i className={`fa-solid ${page.icon}`} /></div>
        </div>

        {pageKey === 'settings' && (
          <div className="settings-panel">
            <div className="setting-block">
              <h3>Theme</h3>
              <div className="toggle-row">
                <button className={`pill-btn ${theme === 'light' ? 'active' : ''}`} onClick={() => setTheme('light')}>Light</button>
                <button className={`pill-btn ${theme === 'dark' ? 'active' : ''}`} onClick={() => setTheme('dark')}>Dark</button>
              </div>
            </div>
            <div className="setting-block">
              <h3>Primary color</h3>
              <div className="accent-row">
                {ACCENTS.map((item) => (
                  <button
                    key={item.key}
                    className={`accent-swatch ${accent === item.key ? 'active' : ''}`}
                    style={{ background: item.value }}
                    onClick={() => setAccent(item.key)}
                    aria-label={item.key}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {pageKey === 'profile' && (
          <div className="profile-grid">
            <div className="panel-card">
              <h3>Profile details</h3>
              <div className="form-grid">
                <label><span>Name</span><input defaultValue={name} /></label>
                <label><span>Email</span><input defaultValue={(() => { try { const d = JSON.parse(localStorage.getItem('hrm_user_data') || '{}'); return d?.data?.data?.user?.user_email || d?.data?.user?.user_email || ''; } catch { return ''; } })()} /></label>
              </div>
            </div>
            <div className="panel-card">
              <h3>Change password</h3>
              <div className="form-grid">
                <label><span>Current password</span><input type="password" /></label>
                <label><span>New password</span><input type="password" /></label>
                <label><span>Confirm password</span><input type="password" /></label>
              </div>
            </div>
          </div>
        )}

        {pageKey !== 'settings' && pageKey !== 'profile' && (
          <div className="metric-row">
            {stats.map(([label, value]) => (
              <div className="metric-card" key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
