import { useEffect, useMemo, useState } from 'react';
import { ACCENTS, applyAppearance, getStoredAccent, getStoredTheme } from '../../utils/appearance';
import { fetchWithAuth } from '../../utils/fetchWithAuth';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Topbar from '../../Components/Topbar/Topbar';
import '../../Pages/Home/homepage.css';

/* ── Full Profile Page ── */
function ProfilePage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [theme, setTheme] = useState(getStoredTheme());
  const [accent, setAccent] = useState(getStoredAccent());
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const userDataStr = localStorage.getItem('hrm_user_data');
  let user = {};
  try {
    const parsed = JSON.parse(userDataStr || '{}');
    user = parsed?.data?.data?.user || parsed?.data?.user || parsed?.user || {};
  } catch (e) {
    console.error(e);
  }

  const initials = (user?.user_name || 'U').slice(0, 2).toUpperCase();

  const handleAppearanceChange = (newTheme, newAccent) => {
    setTheme(newTheme);
    setAccent(newAccent);
    applyAppearance(newTheme, newAccent);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    if (!oldPassword || !newPassword || !confirmPassword) {
      setMessage({ type: 'error', text: 'All password fields are required.' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match.' });
      return;
    }
    if (newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters.' });
      return;
    }
    setLoading(true);
    try {
      const authApiUrl = import.meta.env.VITE_AUTH_API_URL;
      const response = await fetchWithAuth(`${authApiUrl}/user/change-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_email: user.user_email || user.email,
          old_password: oldPassword,
          new_password: newPassword
        })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setMessage({ type: 'success', text: 'Password updated successfully!' });
        setOldPassword(''); setNewPassword(''); setConfirmPassword('');
      } else {
        setMessage({ type: 'error', text: data?.message || data?.error || 'Failed to change password.' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Error updating password.' });
    } finally {
      setLoading(false);
    }
  };

  const TABS = [
    { key: 'profile', icon: 'fa-user', label: 'Profile Info' },
    { key: 'security', icon: 'fa-lock', label: 'Security' },
    { key: 'appearance', icon: 'fa-palette', label: 'Appearance' },
  ];

  return (
    <div style={{ maxWidth: '860px' }}>
      {/* Page Hero Header */}
      <div className="profile-page-header">
        <div className="profile-hero-left">
          <div className="profile-avatar-lg">{initials}</div>
          <div>
            <h1 className="profile-hero-name">{user?.user_name || 'User'}</h1>
            <span className="profile-hero-role">{user?.user_role || user?.role || 'Super Admin'}</span>
          </div>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="profile-tab-bar">
        {TABS.map(tab => (
          <button
            key={tab.key}
            className={`profile-tab-btn ${activeTab === tab.key ? 'active' : ''}`}
            onClick={() => { setActiveTab(tab.key); setMessage({ type: '', text: '' }); }}
          >
            <i className={`fa-solid ${tab.icon}`} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Message Banner */}
      {message.text && (
        <div className={`profile-msg profile-msg-${message.type}`}>
          <i className={`fa-solid ${message.type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'}`} />
          {message.text}
        </div>
      )}

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="profile-grid-2">
          <div className="panel-card profile-info-card">
            <div className="panel-card-header">
              <i className="fa-solid fa-user" />
              <h3>Account Details</h3>
            </div>
            <div className="profile-info-rows">
              <div className="profile-info-row">
                <span className="info-label">Full Name</span>
                <span className="info-value">{user?.user_name || '—'}</span>
              </div>
              <div className="profile-info-row">
                <span className="info-label">Email Address</span>
                <span className="info-value">{user?.user_email || user?.email || '—'}</span>
              </div>
              <div className="profile-info-row">
                <span className="info-label">Phone</span>
                <span className="info-value">{user?.user_phone || '—'}</span>
              </div>
              <div className="profile-info-row">
                <span className="info-label">Role</span>
                <span className="info-value">
                  <span className="profile-role-badge">{user?.user_role || user?.role || 'Super Admin'}</span>
                </span>
              </div>
              <div className="profile-info-row">
                <span className="info-label">User ID</span>
                <span className="info-value" style={{ fontFamily: 'monospace', fontSize: '13px' }}>{user?.id || '—'}</span>
              </div>
            </div>
          </div>

          <div className="panel-card">
            <div className="panel-card-header">
              <i className="fa-solid fa-shield-halved" />
              <h3>Account Status</h3>
            </div>
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="profile-status-item">
                <div className="status-dot status-active" />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '14px' }}>Account Active</div>
                  <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '2px' }}>Your account is in good standing</div>
                </div>
              </div>
              <div className="profile-status-item">
                <div className="status-dot status-active" />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '14px' }}>Email Verified</div>
                  <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '2px' }}>Your email address is confirmed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="panel-card" style={{ maxWidth: '520px' }}>
          <div className="panel-card-header">
            <i className="fa-solid fa-lock" />
            <h3>Change Password</h3>
          </div>
          <form onSubmit={handlePasswordSubmit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div className="form-field">
              <label className="form-label">Current Password</label>
              <input
                type="password"
                placeholder="Enter your current password"
                value={oldPassword}
                onChange={e => setOldPassword(e.target.value)}
                required
                className="profile-input"
              />
            </div>
            <div className="form-field">
              <label className="form-label">New Password</label>
              <input
                type="password"
                placeholder="Enter a new password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                required
                className="profile-input"
              />
            </div>
            <div className="form-field">
              <label className="form-label">Confirm New Password</label>
              <input
                type="password"
                placeholder="Re-enter your new password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
                className="profile-input"
              />
            </div>
            <button type="submit" disabled={loading} className="profile-submit-btn">
              {loading ? <><i className="fa-solid fa-spinner fa-spin" /> Updating...</> : <><i className="fa-solid fa-lock" /> Update Password</>}
            </button>
          </form>
        </div>
      )}

      {/* Appearance Tab */}
      {activeTab === 'appearance' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="panel-card">
            <div className="panel-card-header">
              <i className="fa-regular fa-sun" />
              <h3>Theme Mode</h3>
            </div>
            <div style={{ padding: '24px', display: 'flex', gap: '16px' }}>
              <button
                className={`theme-toggle-btn ${theme === 'light' ? 'active' : ''}`}
                onClick={() => handleAppearanceChange('light', accent)}
              >
                <i className="fa-regular fa-sun" />
                <span>Light Mode</span>
              </button>
              <button
                className={`theme-toggle-btn ${theme === 'dark' ? 'active' : ''}`}
                onClick={() => handleAppearanceChange('dark', accent)}
              >
                <i className="fa-regular fa-moon" />
                <span>Dark Mode</span>
              </button>
            </div>
          </div>

          <div className="panel-card">
            <div className="panel-card-header">
              <i className="fa-solid fa-palette" />
              <h3>Primary Color</h3>
            </div>
            <div style={{ padding: '24px' }}>
              <div className="accent-swatch-grid">
                {ACCENTS.map((item) => (
                  <button
                    key={item.key}
                    className={`accent-swatch ${accent === item.key ? 'active' : ''}`}
                    style={{ background: item.value }}
                    onClick={() => handleAppearanceChange(theme, item.key)}
                    aria-label={item.key}
                  >
                    {accent === item.key && <i className="fa-solid fa-check" style={{ color: '#fff', fontSize: '14px' }} />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Generic page cards for other keys ── */
const CARDS = {
  subscriptions: { title: 'Subscriptions', icon: 'fa-layer-group', text: 'Manage active plans, renewals, and seat usage.' },
  analytics: { title: 'Analytics', icon: 'fa-chart-column', text: 'Review product usage, team trends, and engagement.' },
  billing: { title: 'Billing', icon: 'fa-credit-card', text: 'Track invoices, payment methods, and billing history.' },
  notifications: { title: 'Notifications', icon: 'fa-bell', text: 'Control email alerts, reminders, and system updates.' },
  settings: { title: 'Settings', icon: 'fa-gear', text: 'Switch theme, update colors, and manage profile access.' },
};

function GenericPage({ pageKey }) {
  const page = CARDS[pageKey] || CARDS.settings;
  const [theme, setTheme] = useState(getStoredTheme());
  const [accent, setAccent] = useState(getStoredAccent());

  useEffect(() => {
    applyAppearance(theme, accent);
  }, [theme, accent]);

  const stats = useMemo(() => ([
    ['Plan', 'Pro'], ['Seats', '24'], ['Usage', '78%'], ['Status', 'Active'],
  ]), []);

  return (
    <div>
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

        {pageKey !== 'settings' && (
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

/* ── Layout wrapper: Topbar + Sidebar + content ── */
export default function DashboardPage({ pageKey }) {
  return (
    <div className="tm-root">
      <Topbar />
      <div className="tm-body">
        <Sidebar />
        <main className="tm-main">
          {pageKey === 'profile' ? <ProfilePage /> : <GenericPage pageKey={pageKey} />}
        </main>
      </div>
    </div>
  );
}
