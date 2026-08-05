import React, { useState } from 'react';
import { ACCENTS, applyAppearance, getStoredAccent, getStoredTheme } from '../../utils/appearance';
import { fetchWithAuth } from '../../utils/fetchWithAuth';

export default function ProfileModal({ onClose }) {
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

  const handleAppearanceChange = (newTheme, newAccent) => {
    setTheme(newTheme);
    setAccent(newAccent);
    applyAppearance(newTheme, newAccent);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (!oldPassword || !newPassword || !confirmPassword) {
      setMessage({ type: 'danger', text: 'All password fields are required.' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage({ type: 'danger', text: 'New passwords do not match.' });
      return;
    }

    if (newPassword.length < 6) {
      setMessage({ type: 'danger', text: 'Password must be at least 6 characters.' });
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
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setMessage({ type: 'danger', text: data?.message || data?.error || 'Failed to change password.' });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: 'danger', text: err.message || 'Error updating password.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }} onClick={onClose}>
      <div style={{
        background: 'var(--surface)', borderRadius: '16px', border: '1px solid var(--border)',
        maxWidth: '540px', width: '90%', overflow: 'hidden', color: 'var(--text)'
      }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid var(--border)' }}>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>User Profile & Settings</h3>
          <button style={{ background: 'none', border: 'none', color: 'var(--muted)', fontSize: '20px', cursor: 'pointer' }} onClick={onClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}>
          <button 
            style={{
              flex: 1, padding: '12px', border: 'none', background: 'none', color: activeTab === 'profile' ? 'var(--primary)' : 'var(--muted)',
              borderBottom: activeTab === 'profile' ? '2px solid var(--primary)' : 'none', cursor: 'pointer', fontWeight: 600
            }}
            onClick={() => setActiveTab('profile')}
          >
            <i className="fa-solid fa-user" style={{ marginRight: '6px' }}></i> Profile
          </button>
          <button 
            style={{
              flex: 1, padding: '12px', border: 'none', background: 'none', color: activeTab === 'password' ? 'var(--primary)' : 'var(--muted)',
              borderBottom: activeTab === 'password' ? '2px solid var(--primary)' : 'none', cursor: 'pointer', fontWeight: 600
            }}
            onClick={() => setActiveTab('password')}
          >
            <i className="fa-solid fa-key" style={{ marginRight: '6px' }}></i> Security
          </button>
          <button 
            style={{
              flex: 1, padding: '12px', border: 'none', background: 'none', color: activeTab === 'appearance' ? 'var(--primary)' : 'var(--muted)',
              borderBottom: activeTab === 'appearance' ? '2px solid var(--primary)' : 'none', cursor: 'pointer', fontWeight: 600
            }}
            onClick={() => setActiveTab('appearance')}
          >
            <i className="fa-solid fa-palette" style={{ marginRight: '6px' }}></i> Appearance
          </button>
        </div>

        <div style={{ padding: '24px' }}>
          {message.text && (
            <div style={{
              padding: '10px 14px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px',
              background: message.type === 'success' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
              color: message.type === 'success' ? '#10B981' : '#EF4444'
            }}>
              {message.text}
            </div>
          )}

          {activeTab === 'profile' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingBottom: '16px', borderBottom: '1px solid var(--border)' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', fontWeight: 700 }}>
                  {(user.user_name || 'U').slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '18px', color: 'var(--text)' }}>
                    {user.user_name || 'User Profile'}
                  </h4>
                  <span style={{ fontSize: '12px', background: 'var(--primary-soft)', color: 'var(--primary)', padding: '4px 10px', borderRadius: '12px', fontWeight: 600 }}>
                    {user.user_role || user.role || 'Super Admin'}
                  </span>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: 'var(--muted)' }}>Email Address</label>
                <input type="text" value={user.user_email || user.email || ''} readOnly style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: 'var(--muted)' }}>Phone</label>
                <input type="text" value={user.user_phone || ''} readOnly style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }} />
              </div>
            </div>
          )}

          {activeTab === 'password' && (
            <form onSubmit={handlePasswordSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Current Password</label>
                <input 
                  type="password" 
                  placeholder="Enter current password" 
                  value={oldPassword} 
                  onChange={e => setOldPassword(e.target.value)} 
                  required 
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>New Password</label>
                <input 
                  type="password" 
                  placeholder="Enter new password" 
                  value={newPassword} 
                  onChange={e => setNewPassword(e.target.value)} 
                  required 
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Confirm New Password</label>
                <input 
                  type="password" 
                  placeholder="Confirm new password" 
                  value={confirmPassword} 
                  onChange={e => setConfirmPassword(e.target.value)} 
                  required 
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }}
                />
              </div>

              <button 
                type="submit"
                disabled={loading}
                style={{
                  padding: '12px', borderRadius: '8px', border: 'none', background: 'var(--primary)', color: '#fff',
                  fontWeight: 600, cursor: 'pointer', marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                }}
              >
                {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-lock"></i>}
                {loading ? 'Updating Password...' : 'Update Password'}
              </button>
            </form>
          )}

          {activeTab === 'appearance' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px' }}>Theme Mode</label>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button 
                    type="button"
                    style={{
                      flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid var(--border)',
                      background: theme === 'light' ? 'var(--primary-soft)' : 'transparent',
                      color: theme === 'light' ? 'var(--primary)' : 'var(--text)', cursor: 'pointer', fontWeight: 600
                    }}
                    onClick={() => handleAppearanceChange('light', accent)}
                  >
                    <i className="fa-regular fa-sun" style={{ marginRight: '6px' }}></i> Light Mode
                  </button>
                  <button 
                    type="button"
                    style={{
                      flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid var(--border)',
                      background: theme === 'dark' ? 'var(--primary-soft)' : 'transparent',
                      color: theme === 'dark' ? 'var(--primary)' : 'var(--text)', cursor: 'pointer', fontWeight: 600
                    }}
                    onClick={() => handleAppearanceChange('dark', accent)}
                  >
                    <i className="fa-regular fa-moon" style={{ marginRight: '6px' }}></i> Dark Mode
                  </button>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px' }}>Primary Brand Color</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '10px' }}>
                  {ACCENTS.map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => handleAppearanceChange(theme, item.key)}
                      style={{
                        height: '42px', borderRadius: '10px', background: item.value,
                        border: accent === item.key ? '3px solid var(--text)' : 'none',
                        cursor: 'pointer'
                      }}
                      title={item.key}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
