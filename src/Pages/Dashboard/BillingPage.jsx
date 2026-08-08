import React from 'react';

export default function BillingPage() {
  return (
    <div>
      {/* Page Header */}
      <div className="ud-page-header">
        <div className="ud-page-title-group">
          <h1>Billing &amp; Payment Methods</h1>
          <p>Track invoices, manage saved credit cards, tax IDs, and billing statements.</p>
        </div>
        <div className="ud-action-bar">
          <button className="ud-btn ud-btn-secondary"><i className="fa-solid fa-file-invoice-dollar" /> Tax Statement</button>
          <button className="ud-btn ud-btn-primary"><i className="fa-solid fa-plus" /> Add Payment Method</button>
        </div>
      </div>

      {/* Financial Overview Tiles */}
      <div className="ud-kpi-grid">
        <div className="ud-kpi-card">
          <div className="ud-kpi-top">
            <div className="ud-kpi-icon" style={{ background: 'rgba(16,185,129,0.12)', color: '#10B981' }}>
              <i className="fa-solid fa-wallet" />
            </div>
            <span className="ud-kpi-badge up">Current</span>
          </div>
          <div className="ud-kpi-value">$0.00</div>
          <div className="ud-kpi-label">Outstanding Balance</div>
        </div>

        <div className="ud-kpi-card">
          <div className="ud-kpi-top">
            <div className="ud-kpi-icon" style={{ background: 'rgba(59,130,246,0.12)', color: '#3B82F6' }}>
              <i className="fa-solid fa-calendar-minus" />
            </div>
            <span className="ud-kpi-badge up">Sept 12</span>
          </div>
          <div className="ud-kpi-value">$249.00</div>
          <div className="ud-kpi-label">Upcoming Invoice</div>
        </div>

        <div className="ud-kpi-card">
          <div className="ud-kpi-top">
            <div className="ud-kpi-icon" style={{ background: 'rgba(99,102,241,0.12)', color: '#6366F1' }}>
              <i className="fa-solid fa-chart-line" />
            </div>
            <span className="ud-kpi-badge up">2026 YTD</span>
          </div>
          <div className="ud-kpi-value">$2,988.00</div>
          <div className="ud-kpi-label">Total Annual Spend</div>
        </div>

        <div className="ud-kpi-card">
          <div className="ud-kpi-top">
            <div className="ud-kpi-icon" style={{ background: 'rgba(245,158,11,0.12)', color: '#F59E0B' }}>
              <i className="fa-solid fa-credit-card" />
            </div>
            <span className="ud-kpi-badge up">Default</span>
          </div>
          <div className="ud-kpi-value">•••• 4242</div>
          <div className="ud-kpi-label">Visa Card ending</div>
        </div>
      </div>

      {/* Credit Card Graphic & Spend Graph */}
      <div className="ud-card-grid-2">
        {/* Saved Credit Card Visual */}
        <div className="ud-card">
          <div className="ud-card-header">
            <h3 className="ud-card-title"><i className="fa-solid fa-credit-card" style={{ color: 'var(--primary)' }} /> Primary Payment Card</h3>
            <button className="ud-btn ud-btn-sm ud-btn-secondary">Edit Card</button>
          </div>

          <div className="ud-credit-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '1px' }}>PEOPLEOS ENTERPRISE</span>
              <i className="fa-brands fa-cc-visa" style={{ fontSize: '28px', color: '#fff' }} />
            </div>
            <div className="ud-card-chip" />
            <div className="ud-card-num">•••• •••• •••• 4242</div>
            <div className="ud-card-foot">
              <div>
                <div style={{ fontSize: '9px', opacity: 0.7 }}>CARD HOLDER</div>
                <div style={{ fontWeight: 700, fontSize: '13px' }}>ALEX MORGAN</div>
              </div>
              <div>
                <div style={{ fontSize: '9px', opacity: 0.7 }}>EXPIRES</div>
                <div style={{ fontWeight: 700, fontSize: '13px' }}>09/28</div>
              </div>
            </div>
          </div>
        </div>

        {/* 12-Month Spend Bar Chart */}
        <div className="ud-card">
          <div className="ud-card-header">
            <h3 className="ud-card-title"><i className="fa-solid fa-chart-simple" style={{ color: '#10B981' }} /> Monthly Billing Spend</h3>
            <span style={{ fontSize: '12px', color: 'var(--muted)' }}>USD ($)</span>
          </div>
          <div className="ud-chart-box" style={{ height: '180px' }}>
            <svg viewBox="0 0 350 140" style={{ width: '100%', height: '100%' }}>
              {[
                { m: 'Mar', v: 80 }, { m: 'Apr', v: 80 }, { m: 'May', v: 95 },
                { m: 'Jun', v: 95 }, { m: 'Jul', v: 120 }, { m: 'Aug', v: 120 },
              ].map((item, idx) => {
                const x = 20 + idx * 54;
                return (
                  <g key={item.m}>
                    <rect x={x} y={110 - item.v * 0.7} width="32" height={item.v * 0.7} fill="var(--primary)" rx="4" />
                    <text x={x + 16} y="128" textAnchor="middle" fill="var(--muted)" fontSize="11">{item.m}</text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="ud-card" style={{ marginBottom: '24px' }}>
        <div className="ud-card-header">
          <h3 className="ud-card-title"><i className="fa-solid fa-file-invoice" style={{ color: 'var(--primary)' }} /> Billing Transaction History</h3>
          <button className="ud-btn ud-btn-sm ud-btn-secondary"><i className="fa-solid fa-download" /> Download All</button>
        </div>
        <div className="ud-table-container">
          <table className="ud-table">
            <thead>
              <tr>
                <th>Invoice Code</th>
                <th>Date</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Payment Method</th>
                <th>Status</th>
                <th>Invoice</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 600 }}>#INV-2026-08</td>
                <td>Aug 12, 2026</td>
                <td>Enterprise Pro Monthly Subscription</td>
                <td style={{ fontWeight: 700 }}>$249.00</td>
                <td>Visa •••• 4242</td>
                <td><span className="ud-tag ud-tag-success"><i className="fa-solid fa-circle-check" /> Paid</span></td>
                <td><button className="ud-btn ud-btn-sm ud-btn-secondary"><i className="fa-solid fa-file-pdf" /> PDF</button></td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>#INV-2026-07</td>
                <td>Jul 12, 2026</td>
                <td>Enterprise Pro Monthly Subscription</td>
                <td style={{ fontWeight: 700 }}>$249.00</td>
                <td>Visa •••• 4242</td>
                <td><span className="ud-tag ud-tag-success"><i className="fa-solid fa-circle-check" /> Paid</span></td>
                <td><button className="ud-btn ud-btn-sm ud-btn-secondary"><i className="fa-solid fa-file-pdf" /> PDF</button></td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>#INV-2026-06</td>
                <td>Jun 12, 2026</td>
                <td>Enterprise Pro Monthly Subscription</td>
                <td style={{ fontWeight: 700 }}>$249.00</td>
                <td>Visa •••• 4242</td>
                <td><span className="ud-tag ud-tag-success"><i className="fa-solid fa-circle-check" /> Paid</span></td>
                <td><button className="ud-btn ud-btn-sm ud-btn-secondary"><i className="fa-solid fa-file-pdf" /> PDF</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Tax & Billing Details Block */}
      <div className="ud-card">
        <div className="ud-card-header">
          <h3 className="ud-card-title"><i className="fa-solid fa-building-columns" style={{ color: 'var(--primary)' }} /> Organization Tax &amp; Billing Address</h3>
          <button className="ud-btn ud-btn-sm ud-btn-primary">Save Info</button>
        </div>
        <div className="form-grid" style={{ gap: '16px' }}>
          <div>
            <label className="form-label" style={{ fontWeight: 600, fontSize: '13px', display: 'block', marginBottom: '6px' }}>Company Legal Name</label>
            <input type="text" defaultValue="PeopleOS Global Inc." className="profile-input" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text)' }} />
          </div>
          <div>
            <label className="form-label" style={{ fontWeight: 600, fontSize: '13px', display: 'block', marginBottom: '6px' }}>Tax ID / VAT Code</label>
            <input type="text" defaultValue="US99-4819582" className="profile-input" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text)' }} />
          </div>
          <div>
            <label className="form-label" style={{ fontWeight: 600, fontSize: '13px', display: 'block', marginBottom: '6px' }}>Billing Contact Email</label>
            <input type="email" defaultValue="billing@peopleos.io" className="profile-input" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text)' }} />
          </div>
          <div>
            <label className="form-label" style={{ fontWeight: 600, fontSize: '13px', display: 'block', marginBottom: '6px' }}>Country / Region</label>
            <input type="text" defaultValue="United States" className="profile-input" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text)' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
