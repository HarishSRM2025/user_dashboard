import React, { useState } from 'react';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Topbar from '../../Components/Topbar/Topbar';
import './SubscriptionsPage.css';

export default function SubscriptionsPage() {
  const [billingCycle, setBillingCycle] = useState('annual');

  return (
    <div className="tm-root">
      <Topbar />
      <div className="tm-body">
        <Sidebar />
        <main className="tm-main">
          <div className="subscriptions-container">
            {/* Page Header */}
            <div className="ud-page-header">
              <div className="ud-page-title-group">
                <h1>Subscriptions &amp; Licensing</h1>
                <p>Manage enterprise plans, active seat allocations, API rate limits, and renewals.</p>
              </div>
              <div className="ud-action-bar">
                <button className="ud-btn ud-btn-secondary"><i className="fa-solid fa-download" /> Export Usage</button>
                <button className="ud-btn ud-btn-primary"><i className="fa-solid fa-arrow-up-right-from-square" /> Upgrade License</button>
              </div>
            </div>

            {/* KPI Summary Tiles */}
            <div className="ud-kpi-grid">
              <div className="ud-kpi-card">
                <div className="ud-kpi-top">
                  <div className="ud-kpi-icon" style={{ background: 'rgba(59,130,246,0.12)', color: '#3B82F6' }}>
                    <i className="fa-solid fa-award" />
                  </div>
                  <span className="ud-kpi-badge up"><i className="fa-solid fa-shield" /> Active</span>
                </div>
                <div className="ud-kpi-value">Enterprise Pro</div>
                <div className="ud-kpi-label">Current Workspace Tier</div>
              </div>

              <div className="ud-kpi-card">
                <div className="ud-kpi-top">
                  <div className="ud-kpi-icon" style={{ background: 'rgba(16,185,129,0.12)', color: '#10B981' }}>
                    <i className="fa-solid fa-users" />
                  </div>
                  <span className="ud-kpi-badge up">+4 This Mo</span>
                </div>
                <div className="ud-kpi-value">24 / 30</div>
                <div className="ud-kpi-label">Allocated Seats (80%)</div>
              </div>

              <div className="ud-kpi-card">
                <div className="ud-kpi-top">
                  <div className="ud-kpi-icon" style={{ background: 'rgba(99,102,241,0.12)', color: '#6366F1' }}>
                    <i className="fa-solid fa-bolt" />
                  </div>
                  <span className="ud-kpi-badge up">Normal</span>
                </div>
                <div className="ud-kpi-value">142,850</div>
                <div className="ud-kpi-label">API Calls / 200,000</div>
              </div>

              <div className="ud-kpi-card">
                <div className="ud-kpi-top">
                  <div className="ud-kpi-icon" style={{ background: 'rgba(245,158,11,0.12)', color: '#F59E0B' }}>
                    <i className="fa-solid fa-calendar-check" />
                  </div>
                  <span className="ud-kpi-badge up">Auto-Renew</span>
                </div>
                <div className="ud-kpi-value">Sept 12, 2026</div>
                <div className="ud-kpi-label">Next Renewal Date</div>
              </div>
            </div>

            {/* Main Charts & Usage Meter Section */}
            <div className="ud-card-grid-2">
              <div className="ud-card">
                <div className="ud-card-header">
                  <div>
                    <h3 className="ud-card-title"><i className="fa-solid fa-chart-line" style={{ color: 'var(--primary)' }} /> Seat Usage &amp; Active Growth</h3>
                    <div className="ud-card-subtitle">Monthly active user count and seat utilization trend over the past 6 months.</div>
                  </div>
                  <div className="ud-chart-legend">
                    <span className="ud-chart-legend-item"><span className="ud-chart-dot" style={{ background: 'var(--primary)' }} /> Assigned Seats</span>
                    <span className="ud-chart-legend-item"><span className="ud-chart-dot" style={{ background: '#10B981' }} /> Active Users</span>
                  </div>
                </div>
                {/* SVG Multi-Area Trend Chart */}
                <div className="ud-chart-box" style={{ height: '220px' }}>
                  <svg viewBox="0 0 500 180" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                    <defs>
                      <linearGradient id="subGrad1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.0" />
                      </linearGradient>
                      <linearGradient id="subGrad2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <line x1="0" y1="30" x2="500" y2="30" stroke="var(--border)" strokeDasharray="3 3" />
                    <line x1="0" y1="80" x2="500" y2="80" stroke="var(--border)" strokeDasharray="3 3" />
                    <line x1="0" y1="130" x2="500" y2="130" stroke="var(--border)" strokeDasharray="3 3" />

                    <path d="M 10 120 Q 100 90, 200 70 T 350 50 T 490 35 L 490 160 L 10 160 Z" fill="url(#subGrad1)" />
                    <path d="M 10 120 Q 100 90, 200 70 T 350 50 T 490 35" fill="none" stroke="var(--primary)" strokeWidth="3" />

                    <path d="M 10 140 Q 100 115, 200 95 T 350 75 T 490 55 L 490 160 L 10 160 Z" fill="url(#subGrad2)" />
                    <path d="M 10 140 Q 100 115, 200 95 T 350 75 T 490 55" fill="none" stroke="#10B981" strokeWidth="3" />

                    <circle cx="10" cy="120" r="4" fill="var(--primary)" />
                    <circle cx="100" cy="98" r="4" fill="var(--primary)" />
                    <circle cx="200" cy="70" r="4" fill="var(--primary)" />
                    <circle cx="350" cy="50" r="4" fill="var(--primary)" />
                    <circle cx="490" cy="35" r="4" fill="var(--primary)" />

                    <text x="10" y="176" fill="var(--muted)" fontSize="11">Apr</text>
                    <text x="100" y="176" fill="var(--muted)" fontSize="11">May</text>
                    <text x="200" y="176" fill="var(--muted)" fontSize="11">Jun</text>
                    <text x="300" y="176" fill="var(--muted)" fontSize="11">Jul</text>
                    <text x="400" y="176" fill="var(--muted)" fontSize="11">Aug</text>
                    <text x="480" y="176" fill="var(--muted)" fontSize="11">Sep</text>
                  </svg>
                </div>
              </div>

              {/* Usage Gauges Card */}
              <div className="ud-card">
                <div className="ud-card-header">
                  <h3 className="ud-card-title"><i className="fa-solid fa-gauge-high" style={{ color: '#F59E0B' }} /> Limit Consumption</h3>
                </div>
                <div className="ud-meter-group">
                  <div className="ud-meter-row">
                    <div className="ud-meter-info">
                      <span>Employee Seats</span>
                      <span>24 / 30</span>
                    </div>
                    <div className="ud-meter-track">
                      <div className="ud-meter-fill" style={{ width: '80%', background: 'var(--primary)' }} />
                    </div>
                    <span className="ud-meter-sub">6 available seats remaining</span>
                  </div>

                  <div className="ud-meter-row">
                    <div className="ud-meter-info">
                      <span>API Rate Limits</span>
                      <span>71%</span>
                    </div>
                    <div className="ud-meter-track">
                      <div className="ud-meter-fill" style={{ width: '71%', background: '#6366F1' }} />
                    </div>
                    <span className="ud-meter-sub">142,850 of 200,000 monthly calls</span>
                  </div>

                  <div className="ud-meter-row">
                    <div className="ud-meter-info">
                      <span>Document Storage</span>
                      <span>85 GB / 100 GB</span>
                    </div>
                    <div className="ud-meter-track">
                      <div className="ud-meter-fill" style={{ width: '85%', background: '#F59E0B' }} />
                    </div>
                    <span className="ud-meter-sub">15 GB space available</span>
                  </div>

                  <div className="ud-meter-row">
                    <div className="ud-meter-info">
                      <span>Custom Domain Branding</span>
                      <span>1 / 1 Slot</span>
                    </div>
                    <div className="ud-meter-track">
                      <div className="ud-meter-fill" style={{ width: '100%', background: '#10B981' }} />
                    </div>
                    <span className="ud-meter-sub">Active: app.peopleos.io</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Plan Switcher Toggle */}
            <div className="ud-plan-switch">
              <button
                className={`ud-plan-switch-btn ${billingCycle === 'monthly' ? 'active' : ''}`}
                onClick={() => setBillingCycle('monthly')}
              >
                Monthly Billing
              </button>
              <button
                className={`ud-plan-switch-btn ${billingCycle === 'annual' ? 'active' : ''}`}
                onClick={() => setBillingCycle('annual')}
              >
                Annual Billing <span className="ud-plan-discount">Save 20%</span>
              </button>
            </div>

            {/* Plan Tier Comparison Cards */}
            <div className="ud-plan-cards">
              <div className="ud-plan-card">
                <div className="ud-plan-name">Starter</div>
                <div className="ud-plan-price">
                  ${billingCycle === 'annual' ? '39' : '49'} <span>/ month</span>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: 0 }}>Ideal for small teams getting started with HR automation.</p>
                <ul className="ud-plan-features">
                  <li><i className="fa-solid fa-check" /> Up to 10 Employee Seats</li>
                  <li><i className="fa-solid fa-check" /> Core Attendance &amp; Leave</li>
                  <li><i className="fa-solid fa-check" /> Basic Reports &amp; Export</li>
                  <li><i className="fa-solid fa-check" /> Email Support</li>
                </ul>
                <button className="ud-btn ud-btn-secondary" style={{ width: '100%', justifyContent: 'center', marginTop: 'auto' }}>
                  Downgrade to Starter
                </button>
              </div>

              <div className="ud-plan-card featured">
                <span className="ud-plan-badge">CURRENT PLAN</span>
                <div className="ud-plan-name">Enterprise Pro</div>
                <div className="ud-plan-price">
                  ${billingCycle === 'annual' ? '199' : '249'} <span>/ month</span>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: 0 }}>Advanced analytics, custom branding, and full HR stack.</p>
                <ul className="ud-plan-features">
                  <li><i className="fa-solid fa-check" /> Up to 30 Employee Seats</li>
                  <li><i className="fa-solid fa-check" /> Payroll, Attendance &amp; Performance</li>
                  <li><i className="fa-solid fa-check" /> Advanced Analytics &amp; Visual Graphs</li>
                  <li><i className="fa-solid fa-check" /> Custom Domain &amp; Branding</li>
                  <li><i className="fa-solid fa-check" /> 24/7 Priority Support</li>
                </ul>
                <button className="ud-btn ud-btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 'auto' }} disabled>
                  <i className="fa-solid fa-circle-check" /> Active Plan
                </button>
              </div>

              <div className="ud-plan-card">
                <div className="ud-plan-name">Enterprise Scale</div>
                <div className="ud-plan-price">
                  ${billingCycle === 'annual' ? '399' : '499'} <span>/ month</span>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: 0 }}>Unlimited scale with custom SLA and dedicated manager.</p>
                <ul className="ud-plan-features">
                  <li><i className="fa-solid fa-check" /> Unlimited Employee Seats</li>
                  <li><i className="fa-solid fa-check" /> Custom API &amp; Webhook Integration</li>
                  <li><i className="fa-solid fa-check" /> Dedicated Account Manager</li>
                  <li><i className="fa-solid fa-check" /> 99.99% Guaranteed SLA</li>
                  <li><i className="fa-solid fa-check" /> Audit Logs &amp; SSO Integration</li>
                </ul>
                <button className="ud-btn ud-btn-outline" style={{ width: '100%', justifyContent: 'center', marginTop: 'auto' }}>
                  Upgrade to Scale
                </button>
              </div>
            </div>

            {/* Subscription Invoices History */}
            <div className="ud-card">
              <div className="ud-card-header">
                <h3 className="ud-card-title"><i className="fa-solid fa-receipt" style={{ color: 'var(--primary)' }} /> License Renewal History</h3>
                <button className="ud-btn ud-btn-sm ud-btn-secondary"><i className="fa-solid fa-filter" /> Filter</button>
              </div>
              <div className="ud-table-container">
                <table className="ud-table">
                  <thead>
                    <tr>
                      <th>Invoice ID</th>
                      <th>Billing Period</th>
                      <th>Plan Name</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ fontWeight: 600 }}>INV-2026-0812</td>
                      <td>Aug 12, 2026 - Sept 12, 2026</td>
                      <td>Enterprise Pro (Annual)</td>
                      <td style={{ fontWeight: 700 }}>$2,388.00</td>
                      <td><span className="ud-tag ud-tag-success"><i className="fa-solid fa-check" /> Paid</span></td>
                      <td><button className="ud-btn ud-btn-sm ud-btn-secondary"><i className="fa-solid fa-file-pdf" /> PDF</button></td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 600 }}>INV-2025-0812</td>
                      <td>Aug 12, 2025 - Aug 12, 2026</td>
                      <td>Enterprise Pro (Annual)</td>
                      <td style={{ fontWeight: 700 }}>$2,388.00</td>
                      <td><span className="ud-tag ud-tag-success"><i className="fa-solid fa-check" /> Paid</span></td>
                      <td><button className="ud-btn ud-btn-sm ud-btn-secondary"><i className="fa-solid fa-file-pdf" /> PDF</button></td>
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
