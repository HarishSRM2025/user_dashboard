import React, { useState } from 'react';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Topbar from '../../Components/Topbar/Topbar';
import './NotificationsPage.css';

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState('all');

  const notificationsList = [
    { id: 1, type: 'security', title: 'New Admin Login Detected', desc: 'Login registered from IP 192.168.1.104 in San Francisco, US.', time: '10 min ago', unread: true, icon: 'fa-shield-halved', color: '#EF4444' },
    { id: 2, type: 'billing', title: 'Monthly Invoice #INV-2026-08 Paid', desc: 'Receipt for $249.00 processed successfully via Visa ending 4242.', time: '1 hour ago', unread: true, icon: 'fa-file-invoice-dollar', color: '#10B981' },
    { id: 3, type: 'system', title: 'Scheduled Platform Maintenance', desc: 'System update planned for Sunday Aug 10, 02:00 AM UTC (approx 15 mins).', time: '3 hours ago', unread: true, icon: 'fa-gears', color: '#F59E0B' },
    { id: 4, type: 'team', title: 'Leave Request Approved for Sarah', desc: 'Annual leave from Aug 15 to Aug 18 has been approved.', time: '1 day ago', unread: false, icon: 'fa-user-check', color: '#3B82F6' },
  ];

  const filteredNotifs = activeTab === 'all'
    ? notificationsList
    : notificationsList.filter(n => n.type === activeTab);

  return (
    <div className="tm-root">
      <Topbar />
      <div className="tm-body">
        <Sidebar />
        <main className="tm-main">
          <div className="notifications-container">
            {/* Page Header */}
            <div className="ud-page-header">
              <div className="ud-page-title-group">
                <h1>Notification Center</h1>
                <p>System alerts, security broadcasts, billing receipts, and notification channel preferences.</p>
              </div>
              <div className="ud-action-bar">
                <button className="ud-btn ud-btn-secondary"><i className="fa-solid fa-check-double" /> Mark All as Read</button>
              </div>
            </div>

            {/* KPI Tiles */}
            <div className="ud-kpi-grid">
              <div className="ud-kpi-card">
                <div className="ud-kpi-top">
                  <div className="ud-kpi-icon" style={{ background: 'rgba(239,68,68,0.12)', color: '#EF4444' }}>
                    <i className="fa-solid fa-bell" />
                  </div>
                  <span className="ud-kpi-badge down">3 New</span>
                </div>
                <div className="ud-kpi-value">3</div>
                <div className="ud-kpi-label">Unread Notifications</div>
              </div>

              <div className="ud-kpi-card">
                <div className="ud-kpi-top">
                  <div className="ud-kpi-icon" style={{ background: 'rgba(245,158,11,0.12)', color: '#F59E0B' }}>
                    <i className="fa-solid fa-shield-cat" />
                  </div>
                  <span className="ud-kpi-badge up">Normal</span>
                </div>
                <div className="ud-kpi-value">1</div>
                <div className="ud-kpi-label">Security Alerts Today</div>
              </div>

              <div className="ud-kpi-card">
                <div className="ud-kpi-top">
                  <div className="ud-kpi-icon" style={{ background: 'rgba(16,185,129,0.12)', color: '#10B981' }}>
                    <i className="fa-solid fa-paper-plane" />
                  </div>
                  <span className="ud-kpi-badge up">99.8%</span>
                </div>
                <div className="ud-kpi-value">99.8%</div>
                <div className="ud-kpi-label">Email Delivery Rate</div>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="ud-settings-tabs">
              {['all', 'security', 'billing', 'system', 'team'].map(tab => (
                <button
                  key={tab}
                  className={`ud-settings-tab ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Notifications Feed & Preferences Matrix */}
            <div className="ud-card-grid-2">
              {/* Feed */}
              <div className="ud-card">
                <div className="ud-card-header">
                  <h3 className="ud-card-title"><i className="fa-solid fa-stream" style={{ color: 'var(--primary)' }} /> Live Feed</h3>
                </div>
                <div className="ud-notif-feed">
                  {filteredNotifs.map(n => (
                    <div key={n.id} className={`ud-notif-item ${n.unread ? 'unread' : ''}`}>
                      <div className="ud-notif-icon-lg" style={{ background: `${n.color}15`, color: n.color }}>
                        <i className={`fa-solid ${n.icon}`} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: 'var(--text)' }}>{n.title}</h4>
                          <span style={{ fontSize: '11px', color: 'var(--muted)' }}>{n.time}</span>
                        </div>
                        <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: 'var(--muted)' }}>{n.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Channel Preferences Matrix */}
              <div className="ud-card">
                <div className="ud-card-header">
                  <h3 className="ud-card-title"><i className="fa-solid fa-sliders" style={{ color: '#6366F1' }} /> Alert Preferences</h3>
                </div>
                <table className="ud-matrix-table">
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>Email</th>
                      <th>Push</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Security &amp; Auth</td>
                      <td>
                        <label className="ud-toggle-switch">
                          <input type="checkbox" defaultChecked />
                          <span className="ud-toggle-slider" />
                        </label>
                      </td>
                      <td>
                        <label className="ud-toggle-switch">
                          <input type="checkbox" defaultChecked />
                          <span className="ud-toggle-slider" />
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <td>Billing &amp; Invoices</td>
                      <td>
                        <label className="ud-toggle-switch">
                          <input type="checkbox" defaultChecked />
                          <span className="ud-toggle-slider" />
                        </label>
                      </td>
                      <td>
                        <label className="ud-toggle-switch">
                          <input type="checkbox" />
                          <span className="ud-toggle-slider" />
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <td>System Updates</td>
                      <td>
                        <label className="ud-toggle-switch">
                          <input type="checkbox" defaultChecked />
                          <span className="ud-toggle-slider" />
                        </label>
                      </td>
                      <td>
                        <label className="ud-toggle-switch">
                          <input type="checkbox" defaultChecked />
                          <span className="ud-toggle-slider" />
                        </label>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
