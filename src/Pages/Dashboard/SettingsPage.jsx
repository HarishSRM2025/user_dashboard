import React, { useState } from 'react';
import { ACCENTS, applyAppearance, getStoredAccent, getStoredTheme } from '../../utils/appearance';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [theme, setTheme] = useState(getStoredTheme());
  const [accent, setAccent] = useState(getStoredAccent());
  const [apiKey, setApiKey] = useState('pk_live_99481958273641029471');

  const handleAppearanceChange = (newTheme, newAccent) => {
    setTheme(newTheme);
    setAccent(newAccent);
    applyAppearance(newTheme, newAccent);
  };

  return (
    <div>
      {/* Page Header */}
      <div className="ud-page-header">
        <div className="ud-page-title-group">
          <h1>System &amp; Workspace Settings</h1>
          <p>Configure general organization preferences, theme styling, security parameters, and API keys.</p>
        </div>
        <div className="ud-action-bar">
          <button className="ud-btn ud-btn-primary"><i className="fa-solid fa-floppy-disk" /> Save Settings</button>
        </div>
      </div>

      {/* Settings Navigation Tabs */}
      <div className="ud-settings-tabs">
        <button className={`ud-settings-tab ${activeTab === 'general' ? 'active' : ''}`} onClick={() => setActiveTab('general')}>General &amp; Org</button>
        <button className={`ud-settings-tab ${activeTab === 'appearance' ? 'active' : ''}`} onClick={() => setActiveTab('appearance')}>Appearance &amp; Theme</button>
        <button className={`ud-settings-tab ${activeTab === 'security' ? 'active' : ''}`} onClick={() => setActiveTab('security')}>Security &amp; API Keys</button>
        <button className={`ud-settings-tab ${activeTab === 'integrations' ? 'active' : ''}`} onClick={() => setActiveTab('integrations')}>Integrations</button>
      </div>

      {/* Tab 1: General */}
      {activeTab === 'general' && (
        <div className="ud-card" style={{ maxWidth: '780px' }}>
          <div className="ud-card-header">
            <h3 className="ud-card-title"><i className="fa-solid fa-building" style={{ color: 'var(--primary)' }} /> Organization Profile</h3>
          </div>
          <div className="form-grid" style={{ gap: '16px' }}>
            <div>
              <label className="form-label" style={{ fontWeight: 600, fontSize: '13px', display: 'block', marginBottom: '6px' }}>Workspace Name</label>
              <input type="text" defaultValue="PeopleOS Global" className="profile-input" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text)' }} />
            </div>
            <div>
              <label className="form-label" style={{ fontWeight: 600, fontSize: '13px', display: 'block', marginBottom: '6px' }}>Primary Domain</label>
              <input type="text" defaultValue="app.peopleos.io" className="profile-input" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text)' }} />
            </div>
            <div>
              <label className="form-label" style={{ fontWeight: 600, fontSize: '13px', display: 'block', marginBottom: '6px' }}>Default Timezone</label>
              <select className="profile-input" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text)' }}>
                <option>(UTC-08:00) Pacific Time (US &amp; Canada)</option>
                <option>(UTC+00:00) London, UTC</option>
                <option>(UTC+05:30) Mumbai, New Delhi</option>
              </select>
            </div>
            <div>
              <label className="form-label" style={{ fontWeight: 600, fontSize: '13px', display: 'block', marginBottom: '6px' }}>Currency</label>
              <select className="profile-input" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text)' }}>
                <option>USD ($)</option>
                <option>EUR (€)</option>
                <option>GBP (£)</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Appearance */}
      {activeTab === 'appearance' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '780px' }}>
          <div className="ud-card">
            <div className="ud-card-header">
              <h3 className="ud-card-title"><i className="fa-solid fa-moon" style={{ color: 'var(--primary)' }} /> Interface Theme</h3>
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <button
                className={`ud-btn ${theme === 'light' ? 'ud-btn-primary' : 'ud-btn-secondary'}`}
                style={{ flex: 1, padding: '16px', justifyContent: 'center' }}
                onClick={() => handleAppearanceChange('light', accent)}
              >
                <i className="fa-regular fa-sun" /> Light Mode
              </button>
              <button
                className={`ud-btn ${theme === 'dark' ? 'ud-btn-primary' : 'ud-btn-secondary'}`}
                style={{ flex: 1, padding: '16px', justifyContent: 'center' }}
                onClick={() => handleAppearanceChange('dark', accent)}
              >
                <i className="fa-regular fa-moon" /> Dark Mode
              </button>
            </div>
          </div>

          <div className="ud-card">
            <div className="ud-card-header">
              <h3 className="ud-card-title"><i className="fa-solid fa-palette" style={{ color: '#10B981' }} /> Primary Accent Color</h3>
            </div>
            <div className="ud-accent-grid" style={{ gridTemplateColumns: 'repeat(6, 1fr)', gap: '12px' }}>
              {ACCENTS.map(item => (
                <button
                  key={item.key}
                  className={`ud-accent-swatch ${accent === item.key ? 'active' : ''}`}
                  style={{ background: item.value, height: '60px', borderRadius: '12px' }}
                  onClick={() => handleAppearanceChange(theme, item.key)}
                >
                  {accent === item.key && <i className="fa-solid fa-check" style={{ color: '#fff', fontSize: '18px' }} />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Security & API Keys */}
      {activeTab === 'security' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '780px' }}>
          <div className="ud-card">
            <div className="ud-card-header">
              <h3 className="ud-card-title"><i className="fa-solid fa-key" style={{ color: 'var(--primary)' }} /> Live Workspace API Key</h3>
              <button className="ud-btn ud-btn-sm ud-btn-secondary" onClick={() => setApiKey(`pk_live_${Math.random().toString(36).substring(2, 18)}`)}>Regenerate</button>
            </div>
            <div style={{ background: 'var(--surface-2)', padding: '14px', borderRadius: '8px', border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <code style={{ fontSize: '14px', fontFamily: 'monospace', color: 'var(--text)' }}>{apiKey}</code>
              <button className="ud-btn ud-btn-sm ud-btn-outline" onClick={() => navigator.clipboard.writeText(apiKey)}>Copy</button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Integrations */}
      {activeTab === 'integrations' && (
        <div className="ud-card-grid-equal">
          <div className="ud-card">
            <div className="ud-card-header">
              <h3 className="ud-card-title"><i className="fa-brands fa-slack" style={{ color: '#E01E5A' }} /> Slack Integration</h3>
              <span className="ud-tag ud-tag-success">Connected</span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--muted)' }}>Send attendance digests and automated leave notifications directly to Slack channels.</p>
          </div>

          <div className="ud-card">
            <div className="ud-card-header">
              <h3 className="ud-card-title"><i className="fa-brands fa-microsoft" style={{ color: '#00A4EF' }} /> Microsoft Teams</h3>
              <span className="ud-tag ud-tag-info">Available</span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--muted)' }}>Sync employee status and calendar events with MS Teams workspace.</p>
          </div>
        </div>
      )}
    </div>
  );
}
