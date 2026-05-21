import React, { useState } from 'react';
import './createTenantModal.css';

const INDUSTRIES = [
  "Manufacturing","IT Services","Finance","Healthcare",
  "Retail","HR Consulting","Education","Logistics", "Other"
];

const PLANS = [
  { id: 'starter', name: 'Starter', icon: 'fa-seedling', color: '#10B981', bgColor: 'rgba(16, 185, 129, 0.05)', desc: 'Basic features for small teams.', features: ['Up to 50 users', 'Core HR modules'] },
  { id: 'pro', name: 'Pro', icon: 'fa-rocket', color: '#2563EB', bgColor: 'rgba(37, 99, 235, 0.05)', desc: 'Advanced analytics & payroll.', features: ['Up to 250 users', 'Premium Support'] },
  { id: 'enterprise', name: 'Enterprise', icon: 'fa-crown', color: '#F59E0B', bgColor: 'rgba(245, 158, 11, 0.05)', desc: 'Full-suite custom solution.', features: ['Unlimited users', 'Custom Integrations'] }
];

const CreateTenantModal = ({ onClose, onCreate }) => {
  const [form, setForm] = useState({
    tenantName: '',
    slug: '',
    industry: 'Manufacturing',
    plan: 'starter',
    adminName: '',
    adminEmail: '',
    adminPhone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => {
      const newForm = { ...prev, [name]: value };
      if (name === 'tenantName' && prev.slug === prev.tenantName.toLowerCase().replace(/\s+/g,"-")) {
        newForm.slug = value.toLowerCase().replace(/\s+/g,"-");
      }
      return newForm;
    });
  };

  const handleManualSlugChange = (e) => {
    setForm(prev => ({ ...prev, slug: e.target.value.toLowerCase().replace(/\s+/g,"-") }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(form);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal create-tenant-modal">
        <div className="modal-header">
          <div className="modal-header-left">
            <div
              className="modal-icon"
              style={{
                background: `linear-gradient(135deg, var(--bright-blue), var(--deep-blue))`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 16, color: "#fff", borderRadius: "var(--radius-sm)"
              }}
            >
              <i className="fa-solid fa-plus" />
            </div>
            <div>
              <div className="modal-title">Create New Tenant</div>
              <div className="modal-sub">Setup a new organisation workspace</div>
            </div>
          </div>
          <button className="modal-close" onClick={onClose} type="button">
            <i className="fa-solid fa-xmark" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body create-tenant-body">
            
            <div>
              <div className="pf-label create-tenant-section-label">
                <i className="fa-solid fa-building" style={{ marginRight: 6, color: "var(--bright-blue)" }} />
                Organisation Details
              </div>
              
              <div className="create-tenant-grid">
                <div className="create-tenant-field">
                  <label className="pf-label">Tenant Name *</label>
                  <input 
                    type="text" 
                    name="tenantName" 
                    value={form.tenantName} 
                    onChange={handleChange} 
                    required 
                    placeholder="e.g. Acme Corp" 
                    className="create-tenant-input"
                  />
                </div>
                <div className="create-tenant-field">
                  <label className="pf-label">URL Slug *</label>
                  <input 
                    type="text" 
                    name="slug" 
                    value={form.slug} 
                    onChange={handleManualSlugChange} 
                    required 
                    placeholder="e.g. acme-corp"
                    className="create-tenant-input"
                  />
                </div>
                <div className="create-tenant-field col-span-2">
                  <label className="pf-label">Industry</label>
                  <select 
                    name="industry" 
                    value={form.industry} 
                    onChange={handleChange}
                    className="create-tenant-input"
                  >
                    {INDUSTRIES.map(ind => <option key={ind} value={ind}>{ind}</option>)}
                  </select>
                </div>
              </div>

              {/* Plan Selection Cards */}
              <div style={{ marginTop: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
                  <div className="pf-label create-tenant-section-label" style={{ marginBottom: 0 }}>
                    <i className="fa-solid fa-layer-group" style={{ marginRight: 6, color: "var(--bright-purple)" }} />
                    Subscription Plan
                  </div>
                  <span style={{ fontSize: 11, color: "var(--amber)", fontWeight: 500 }}>
                    <i className="fa-regular fa-clock" style={{ marginRight: 4 }} />
                    7-day free trial on all plans
                  </span>
                </div>
                <div className="plan-cards">
                  {PLANS.map(p => {
                    const isActive = form.plan === p.id;
                    return (
                    <div 
                      key={p.id} 
                      className="plan-card"
                      onClick={() => setForm(prev => ({ ...prev, plan: p.id }))}
                      style={{
                        borderColor: isActive ? p.color : undefined,
                        backgroundColor: isActive ? p.bgColor : undefined,
                        boxShadow: isActive ? `0 0 0 1px ${p.color}` : undefined
                      }}
                    >
                      <i className={`fa-solid ${p.icon} plan-card-icon`} style={{ color: p.color }} />
                      <div className="plan-card-name" style={{ color: isActive ? p.color : "var(--text-main)"}}>{p.name}</div>
                      <div className="plan-card-desc">{p.desc}</div>
                      <ul className="plan-features">
                        {p.features.map(f => (
                          <li key={f}>
                            <i className="fa-solid fa-check" style={{ color: p.color, marginRight: 6, fontSize: 10 }} />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )})}
                </div>
              </div>
            </div>

            {/* <div style={{ marginTop: 8 }}>
              <div className="pf-label create-tenant-section-label">
                <i className="fa-solid fa-user-tie" style={{ marginRight: 6, color: "var(--bright-purple)" }} />
                Primary Admin User (Optional)
              </div>

              <div className="create-tenant-grid">
                <div className="create-tenant-field">
                  <label className="pf-label">Admin Name</label>
                  <input 
                    type="text" 
                    name="adminName" 
                    value={form.adminName} 
                    onChange={handleChange} 
                    placeholder="Full name" 
                    className="create-tenant-input"
                  />
                </div>
                <div className="create-tenant-field">
                  <label className="pf-label">Admin Email</label>
                  <input 
                    type="email" 
                    name="adminEmail" 
                    value={form.adminEmail} 
                    onChange={handleChange} 
                    placeholder="admin@company.com" 
                    className="create-tenant-input"
                  />
                </div>
                <div className="create-tenant-field col-span-2">
                  <label className="pf-label">Admin Phone</label>
                  <input 
                    type="tel" 
                    name="adminPhone" 
                    value={form.adminPhone} 
                    onChange={handleChange} 
                    placeholder="+91 98765 43210" 
                    className="create-tenant-input"
                  />
                </div>
              </div>
            </div> */}

          </div>

          <div className="modal-footer" style={{ borderTop: "1px solid var(--border-color)" }}>
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">
              <i className="fa-solid fa-check" /> Create Tenant
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTenantModal;