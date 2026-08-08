import React, { useState } from 'react';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Topbar from '../../Components/Topbar/Topbar';
import './AnalyticsPage.css';

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('30d');

  return (
    <div className="tm-root">
      <Sidebar />
      <div className="tm-main-wrapper">
        <Topbar />
        <main className="tm-main">
          <div className="analytics-container">
            {/* Page Header */}
            <div className="ud-page-header">
              <div className="ud-page-title-group">
                <h1>Analytics &amp; Intelligence</h1>
                <p>Real-time system throughput, module engagement, active session metrics, and audit logs.</p>
              </div>
              <div className="ud-action-bar">
                <div className="ud-plan-switch" style={{ margin: 0, padding: '3px 4px' }}>
                  {['7d', '30d', '90d', '1y'].map(t => (
                    <button
                      key={t}
                      className={`ud-plan-switch-btn ${timeRange === t ? 'active' : ''}`}
                      style={{ padding: '4px 10px', fontSize: '11px' }}
                      onClick={() => setTimeRange(t)}
                    >
                      {t.toUpperCase()}
                    </button>
                  ))}
                </div>
                <button className="ud-btn ud-btn-secondary"><i className="fa-solid fa-file-csv" /> Export CSV</button>
              </div>
            </div>

            {/* KPI Tiles */}
            <div className="ud-kpi-grid">
              <div className="ud-kpi-card">
                <div className="ud-kpi-top">
                  <div className="ud-kpi-icon" style={{ background: 'var(--primary-soft)', color: 'var(--primary)' }}>
                    <i className="fa-solid fa-user-gear" />
                  </div>
                  <span className="ud-kpi-badge up"><i className="fa-solid fa-arrow-up" /> +14.2%</span>
                </div>
                <div className="ud-kpi-value">1,842</div>
                <div className="ud-kpi-label">Active Monthly Sessions</div>
              </div>

              <div className="ud-kpi-card">
                <div className="ud-kpi-top">
                  <div className="ud-kpi-icon" style={{ background: 'rgba(16,185,129,0.12)', color: '#10B981' }}>
                    <i className="fa-solid fa-clock-rotate-left" />
                  </div>
                  <span className="ud-kpi-badge up"><i className="fa-solid fa-arrow-up" /> +5.1%</span>
                </div>
                <div className="ud-kpi-value">38m 14s</div>
                <div className="ud-kpi-label">Avg Session Duration</div>
              </div>

              <div className="ud-kpi-card">
                <div className="ud-kpi-top">
                  <div className="ud-kpi-icon" style={{ background: 'rgba(99,102,241,0.12)', color: '#6366F1' }}>
                    <i className="fa-solid fa-network-wired" />
                  </div>
                  <span className="ud-kpi-badge up">99.98%</span>
                </div>
                <div className="ud-kpi-value">4.82 ms</div>
                <div className="ud-kpi-label">Average API Latency</div>
              </div>

              <div className="ud-kpi-card">
                <div className="ud-kpi-top">
                  <div className="ud-kpi-icon" style={{ background: 'rgba(245,158,11,0.12)', color: '#F59E0B' }}>
                    <i className="fa-solid fa-square-poll-vertical" />
                  </div>
                  <span className="ud-kpi-badge up">+18.6%</span>
                </div>
                <div className="ud-kpi-value">94.8%</div>
                <div className="ud-kpi-label">Module Task Completion</div>
              </div>
            </div>

            {/* Main Charts */}
            <div className="ud-card-grid-2">
              {/* SVG Smooth Area Chart */}
              <div className="ud-card">
                <div className="ud-card-header">
                  <div>
                    <h3 className="ud-card-title"><i className="fa-solid fa-wave-square" style={{ color: 'var(--primary)' }} /> System Activity &amp; Traffic</h3>
                    <div className="ud-card-subtitle">Requests vs User logins over the selected timeframe.</div>
                  </div>
                  <div className="ud-chart-legend">
                    <span className="ud-chart-legend-item"><span className="ud-chart-dot" style={{ background: 'var(--primary)' }} /> API Requests</span>
                    <span className="ud-chart-legend-item"><span className="ud-chart-dot" style={{ background: '#06B6D4' }} /> Active Logins</span>
                  </div>
                </div>
                <div className="ud-chart-box" style={{ height: '240px' }}>
                  <svg viewBox="0 0 500 180" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                    <defs>
                      <linearGradient id="anGrad1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.0" />
                      </linearGradient>
                      <linearGradient id="anGrad2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <line x1="0" y1="30" x2="500" y2="30" stroke="var(--border)" strokeDasharray="3 3" />
                    <line x1="0" y1="80" x2="500" y2="80" stroke="var(--border)" strokeDasharray="3 3" />
                    <line x1="0" y1="130" x2="500" y2="130" stroke="var(--border)" strokeDasharray="3 3" />

                    <path d="M 0 130 Q 100 50, 200 90 T 350 40 T 500 20 L 500 160 L 0 160 Z" fill="url(#anGrad1)" />
                    <path d="M 0 130 Q 100 50, 200 90 T 350 40 T 500 20" fill="none" stroke="var(--primary)" strokeWidth="3" />

                    <path d="M 0 150 Q 100 100, 200 120 T 350 80 T 500 60 L 500 160 L 0 160 Z" fill="url(#anGrad2)" />
                    <path d="M 0 150 Q 100 100, 200 120 T 350 80 T 500 60" fill="none" stroke="#06B6D4" strokeWidth="2.5" />

                    <text x="10" y="176" fill="var(--muted)" fontSize="11">Week 1</text>
                    <text x="130" y="176" fill="var(--muted)" fontSize="11">Week 2</text>
                    <text x="260" y="176" fill="var(--muted)" fontSize="11">Week 3</text>
                    <text x="390" y="176" fill="var(--muted)" fontSize="11">Week 4</text>
                  </svg>
                </div>
              </div>

              {/* SVG Donut Ring Distribution */}
              <div className="ud-card">
                <div className="ud-card-header">
                  <h3 className="ud-card-title"><i className="fa-solid fa-chart-pie" style={{ color: '#10B981' }} /> Role Distribution</h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '240px' }}>
                  <svg viewBox="0 0 160 160" style={{ width: '140px', height: '140px' }}>
                    <circle cx="80" cy="80" r="60" fill="none" stroke="var(--surface-2)" strokeWidth="18" />
                    {/* Segment 1: Employees 60% */}
                    <circle cx="80" cy="80" r="60" fill="none" stroke="var(--primary)" strokeWidth="18" strokeDasharray="226 377" strokeDashoffset="0" transform="rotate(-90 80 80)" />
                    {/* Segment 2: Managers 28% */}
                    <circle cx="80" cy="80" r="60" fill="none" stroke="#10B981" strokeWidth="18" strokeDasharray="105 377" strokeDashoffset="-226" transform="rotate(-90 80 80)" />
                    {/* Segment 3: Admins 12% */}
                    <circle cx="80" cy="80" r="60" fill="none" stroke="#F59E0B" strokeWidth="18" strokeDasharray="45 377" strokeDashoffset="-331" transform="rotate(-90 80 80)" />
                    <text x="80" y="76" textAnchor="middle" fill="var(--text)" fontSize="20" fontWeight="800">1,842</text>
                    <text x="80" y="94" textAnchor="middle" fill="var(--muted)" fontSize="11">Total Users</text>
                  </svg>

                  <div style={{ display: 'flex', gap: '16px', marginTop: '16px', fontSize: '12px', color: 'var(--text)' }}>
                    <span><span className="ud-chart-dot" style={{ background: 'var(--primary)', display: 'inline-block' }} /> Employee (60%)</span>
                    <span><span className="ud-chart-dot" style={{ background: '#10B981', display: 'inline-block' }} /> Manager (28%)</span>
                    <span><span className="ud-chart-dot" style={{ background: '#F59E0B', display: 'inline-block' }} /> Admin (12%)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* SVG Stacked Bar Chart for Module Usage */}
            <div className="ud-card" style={{ marginBottom: '24px' }}>
              <div className="ud-card-header">
                <h3 className="ud-card-title"><i className="fa-solid fa-chart-bar" style={{ color: '#6366F1' }} /> Module Engagement Breakdown</h3>
                <span style={{ fontSize: '12px', color: 'var(--muted)' }}>Attendance vs Payroll vs Recruitment</span>
              </div>
              <div className="ud-chart-box" style={{ height: '160px' }}>
                <svg viewBox="0 0 600 130" style={{ width: '100%', height: '100%' }}>
                  {/* Bars */}
                  {[
                    { label: 'Jan', v1: 40, v2: 30, v3: 20 },
                    { label: 'Feb', v1: 55, v2: 25, v3: 30 },
                    { label: 'Mar', v1: 70, v2: 40, v3: 25 },
                    { label: 'Apr', v1: 60, v2: 35, v3: 35 },
                    { label: 'May', v1: 85, v2: 45, v3: 30 },
                    { label: 'Jun', v1: 95, v2: 50, v3: 40 },
                  ].map((b, i) => {
                    const x = 40 + i * 95;
                    return (
                      <g key={b.label}>
                        <rect x={x} y={110 - b.v1} width="36" height={b.v1} fill="var(--primary)" rx="4" />
                        <rect x={x} y={110 - b.v1 - b.v2} width="36" height={b.v2} fill="#10B981" rx="4" />
                        <rect x={x} y={110 - b.v1 - b.v2 - b.v3} width="36" height={b.v3} fill="#6366F1" rx="4" />
                        <text x={x + 18} y="126" textAnchor="middle" fill="var(--muted)" fontSize="11">{b.label}</text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* Real-time Activity Log Table */}
            <div className="ud-card">
              <div className="ud-card-header">
                <h3 className="ud-card-title"><i className="fa-solid fa-list-check" style={{ color: 'var(--primary)' }} /> Audit &amp; System Log Stream</h3>
                <button className="ud-btn ud-btn-sm ud-btn-secondary"><i className="fa-solid fa-rotate-right" /> Refresh Logs</button>
              </div>
              <div className="ud-table-container">
                <table className="ud-table">
                  <thead>
                    <tr>
                      <th>Timestamp</th>
                      <th>User / Identity</th>
                      <th>Event Type</th>
                      <th>IP Address</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ color: 'var(--muted)', fontSize: '12px' }}>2026-08-08 16:04:12</td>
                      <td style={{ fontWeight: 600 }}>Alex Morgan (Admin)</td>
                      <td><span className="ud-tag ud-tag-info">SETTINGS_UPDATE</span></td>
                      <td style={{ fontFamily: 'monospace' }}>192.168.1.104</td>
                      <td><span className="ud-tag ud-tag-success"><i className="fa-solid fa-check" /> 200 OK</span></td>
                    </tr>
                    <tr>
                      <td style={{ color: 'var(--muted)', fontSize: '12px' }}>2026-08-08 15:48:30</td>
                      <td style={{ fontWeight: 600 }}>System Worker</td>
                      <td><span className="ud-tag ud-tag-warning">CRON_SYNC</span></td>
                      <td style={{ fontFamily: 'monospace' }}>127.0.0.1</td>
                      <td><span className="ud-tag ud-tag-success"><i className="fa-solid fa-check" /> 200 OK</span></td>
                    </tr>
                    <tr>
                      <td style={{ color: 'var(--muted)', fontSize: '12px' }}>2026-08-08 14:12:05</td>
                      <td style={{ fontWeight: 600 }}>Sarah Jenkins</td>
                      <td><span className="ud-tag ud-tag-info">AUTH_LOGIN</span></td>
                      <td style={{ fontFamily: 'monospace' }}>184.72.19.4</td>
                      <td><span className="ud-tag ud-tag-success"><i className="fa-solid fa-check" /> 200 OK</span></td>
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
