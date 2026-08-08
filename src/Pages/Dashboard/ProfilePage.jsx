import React, { useState } from 'react';
import { ACCENTS, applyAppearance, getStoredAccent, getStoredTheme } from '../../utils/appearance';
import { fetchWithAuth } from '../../utils/fetchWithAuth';

export default function ProfilePage() {
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

  return (
    <div style={{ maxWidth: '860px' }}>
      <div className="profile-page-header">
        <div className="profile-hero-left">
          <div className="profile-avatar-lg">{initials}</div>
          <div>
            <h1 className="profile-hero-name">{user?.user_name || 'User'}</h1>
            <span className="profile-hero-role">{user?.user_role || user?.role || 'Super Admin'}</span>
          </div>
        </div>
      </div>

      <div className="profile-tab-bar">
        {['profile', 'security', 'appearance'].map(tabKey => (
          <button
            key={tabKey}
            className={`profile-tab-btn ${activeTab === tabKey ? 'active' : ''}`}
            onClick={() => { setActiveTab(tabKey); setMessage({ type: '', text: '' }); }}
          >
            {tabKey.charAt(0).toUpperCase() + tabKey.slice(1)}
          </button>
        ))}
      </div>

      {message.text && (
        <div className={`profile-msg profile-msg-${message.type}`}>
          <i className={`fa-solid ${message.type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'}`} />
          {message.text}
        </div>
      )}

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
                <span className="info-label">Role</span>
                <span className="info-value"><span className="profile-role-badge">{user?.user_role || user?.role || 'Super Admin'}</span></span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'security' && (
        <div className="panel-card" style={{ maxWidth: '520px' }}>
          <div className="panel-card-header">
            <i className="fa-solid fa-lock" />
            <h3>Change Password</h3>
          </div>
          <form onSubmit={handlePasswordSubmit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <input type="password" placeholder="Current Password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} required className="profile-input" />
            <input type="password" placeholder="New Password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required className="profile-input" />
            <input type="password" placeholder="Confirm New Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required className="profile-input" />
            <button type="submit" disabled={loading} className="profile-submit-btn">
              {loading ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        </div>
      )}

      {activeTab === 'appearance' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="panel-card">
            <div className="panel-card-header">
              <i className="fa-regular fa-sun" />
              <h3>Theme Mode</h3>
            </div>
            <div style={{ padding: '24px', display: 'flex', gap: '16px' }}>
              <button className={`theme-toggle-btn ${theme === 'light' ? 'active' : ''}`} onClick={() => handleAppearanceChange('light', accent)}>
                Light Mode
              </button>
              <button className={`theme-toggle-btn ${theme === 'dark' ? 'active' : ''}`} onClick={() => handleAppearanceChange('dark', accent)}>
                Dark Mode
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
