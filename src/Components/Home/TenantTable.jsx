import React, { useState, useEffect } from "react";
import { fetchWithAuth } from "../../utils/fetchWithAuth";
import CustomRoleSelect from './CustomRoleSelect';

const AVATAR_COLORS = [
  ["var(--primary)", "var(--primary)"],
  ["#8B5CF6", "#6D28D9"],
  ["#10B981", "#047857"],
  ["#F59E0B", "#B45309"],
  ["#EF4444", "#B91C1C"],
  ["#06B6D4", "#0E7490"],
];

const getColor = (i) => AVATAR_COLORS[i % AVATAR_COLORS.length];

const TENANT_URL = import.meta.env.VITE_TENANT_URL;

const PLAN_META = {
  enterprise: { label: "Enterprise", cls: "plan-enterprise" },
  pro: { label: "Pro", cls: "plan-pro" },
  starter: { label: "Starter", cls: "plan-starter" },
};

const STATUS_META = {
  active: { label: "Active", cls: "badge-active" },
  trial: { label: "Trial", cls: "badge-trial" },
  suspended: { label: "Suspended", cls: "badge-suspended" },
  inactive: { label: "Inactive", cls: "badge-inactive" },
};

const ROLE_META = {
  admin: { label: "Admin", cls: "role-admin" },
  manager: { label: "Manager", cls: "role-manager" },
  employee: { label: "Employee", cls: "role-employee" },
  viewer: { label: "Viewer", cls: "role-viewer" },
};

function Initials({ name, size = 34, radius = "var(--radius-xs)", colors }) {
  const letters = name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div
      style={{
        width: size, height: size,
        borderRadius: radius,
        background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: size * 0.36, fontWeight: 700, color: "#fff", flexShrink: 0,
      }}
    >
      {letters}
    </div>
  );
}

function TenantTable({ tenants, onView, onDelete }) {
  const [expanded, setExpanded] = useState(null);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortAsc, setSortAsc] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({ plan: "", status: "", industry: "" });

  const [tenantUsers, setTenantUsers] = useState({});
  const [loadingUsers, setLoadingUsers] = useState({});

  useEffect(() => {
    tenants.forEach(t => {
      if (!tenantUsers[t.id] && !loadingUsers[t.id]) {
        setLoadingUsers(prev => ({ ...prev, [t.id]: true }));
        const authApiUrl = import.meta.env.VITE_AUTH_API_URL;
        fetchWithAuth(`${authApiUrl}/tenant/user/tenant/${t.id}`)
          .then(res => res.json())
          .then(data => {
            if (data.success) {
              setTenantUsers(prev => ({ ...prev, [t.id]: data.data }));
            } else {
              setTenantUsers(prev => ({ ...prev, [t.id]: [] }));
            }
          })
          .catch(() => {
            setTenantUsers(prev => ({ ...prev, [t.id]: [] }));
          })
          .finally(() => {
            setLoadingUsers(prev => ({ ...prev, [t.id]: false }));
          });
      }
    });
  }, [tenants, tenantUsers, loadingUsers]);

  const handleRoleChange = async (tenantId, empId, newApiRole) => {
    setLoadingUsers(prev => ({ ...prev, [`${tenantId}_${empId}`]: true }));
    try {
      const authApiUrl = import.meta.env.VITE_AUTH_API_URL;
      const res = await fetchWithAuth(`${authApiUrl}/tenant/user/role/${empId}`, {
        method: 'PUT',
        body: JSON.stringify({ user_role: newApiRole })
      });
      const data = await res.json();
      if (data.success) {
        setTenantUsers(prev => ({
          ...prev,
          [tenantId]: prev[tenantId].map(u => u.id === empId ? { ...u, user_role: newApiRole } : u)
        }));
      } else {
        alert("Failed to update role: " + data.message);
      }
    } catch (e) {
      alert("Error updating role");
    } finally {
      setLoadingUsers(prev => ({ ...prev, [`${tenantId}_${empId}`]: false }));
    }
  };

  const toggle = (id) => setExpanded(prev => prev === id ? null : id);

  const handleSort = (field) => {
    if (sortField === field) setSortAsc(a => !a);
    else { setSortField(field); setSortAsc(true); }
  };

  const filtered = tenants
    .filter(t =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.slug.toLowerCase().includes(search.toLowerCase()) ||
      t.industry.toLowerCase().includes(search.toLowerCase())
    )
    .filter(t => filters.plan === "" || t.plan === filters.plan)
    .filter(t => filters.status === "" || t.status === filters.status)
    .filter(t => filters.industry === "" || t.industry === filters.industry)
    .sort((a, b) => {
      let av = a[sortField], bv = b[sortField];
      if (typeof av === "string") av = av.toLowerCase();
      if (typeof bv === "string") bv = bv.toLowerCase();
      if (av < bv) return sortAsc ? -1 : 1;
      if (av > bv) return sortAsc ? 1 : -1;
      return 0;
    });

  const SortIcon = ({ field }) => (
    <i className={`fa-solid ${sortField === field ? (sortAsc ? "fa-sort-up" : "fa-sort-down") : "fa-sort"}`} />
  );

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-header-left">
          <div className="card-header-icon">
            <i className="fa-solid fa-building" />
          </div>
          <span className="card-title">All Tenants</span>
          <span className="card-count">{filtered.length} of {tenants.length}</span>
        </div>
        <div className="card-header-right">
          <div className="search-input-wrap">
            <i className="fa-solid fa-magnifying-glass" />
            <input
              className="search-input"
              placeholder="Search tenants..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <button className={`btn btn-ghost ${showFilters ? 'active' : ''}`} onClick={() => setShowFilters(!showFilters)}>
            <i className="fa-solid fa-sliders" /> Filter
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="filter-bar" style={{ padding: '12px 20px', borderBottom: '1px solid var(--border)', display: 'flex', gap: '16px', background: 'var(--bg-secondary)', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <label className="pf-label" style={{ marginBottom: 0, fontSize: 12, color: 'var(--text-secondary)' }}>Plan</label>
            <select className="search-input" style={{ padding: '6px 10px', height: 'auto' }} value={filters.plan} onChange={e => setFilters({ ...filters, plan: e.target.value })}>
              <option value="">All Plans</option>
              <option value="enterprise">Enterprise</option>
              <option value="pro">Pro</option>
              <option value="starter">Starter</option>
            </select>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <label className="pf-label" style={{ marginBottom: 0, fontSize: 12, color: 'var(--text-secondary)' }}>Status</label>
            <select className="search-input" style={{ padding: '6px 10px', height: 'auto' }} value={filters.status} onChange={e => setFilters({ ...filters, status: e.target.value })}>
              <option value="">All Statuses</option>
              <option value="active">Active</option>
              <option value="trial">Trial</option>
              <option value="suspended">Suspended</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <label className="pf-label" style={{ marginBottom: 0, fontSize: 12, color: 'var(--text-secondary)' }}>Industry</label>
            <select className="search-input" style={{ padding: '6px 10px', height: 'auto' }} value={filters.industry} onChange={e => setFilters({ ...filters, industry: e.target.value })}>
              <option value="">All Industries</option>
              {[...new Set(tenants.map(t => t.industry))].map(ind => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>
          </div>
          <div style={{ flex: 1 }}></div>
          {(filters.plan || filters.status || filters.industry) && (
            <button className="btn btn-ghost" style={{ fontSize: 13, padding: '4px 8px' }} onClick={() => setFilters({ plan: '', status: '', industry: '' })}>
              Clear Filters
            </button>
          )}
        </div>
      )}

      <div className="tenant-table-wrap">
        {filtered.length === 0 ? (
          <div className="empty-state">
            <i className="fa-regular fa-building" />
            <p>No tenants match your search.</p>
          </div>
        ) : (
          <table className="tenant-table">
            <thead>
              <tr>
                <th onClick={() => handleSort("name")}>Tenant <SortIcon field="name" /></th>
                <th onClick={() => handleSort("industry")}>Industry <SortIcon field="industry" /></th>
                <th onClick={() => handleSort("plan")}>Plan <SortIcon field="plan" /></th>
                <th onClick={() => handleSort("status")}>Status <SortIcon field="status" /></th>
                <th onClick={() => handleSort("users")}>Users <SortIcon field="users" /></th>
                <th onClick={() => handleSort("created")}>Created <SortIcon field="created" /></th>
                <th style={{ width: 100 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t, idx) => {
                const colors = getColor(idx);
                const statusKey = (t.status || "trial").toString().toLowerCase();
                const planKey = (t.plan || "starter").toString().toLowerCase();
                const status = STATUS_META[statusKey] || STATUS_META[t.status] || { label: t.status || "Trial", cls: "badge-trial" };
                const plan = PLAN_META[planKey] || PLAN_META[t.plan] || { label: t.plan || "Starter", cls: "plan-starter" };
                const isOpen = expanded === t.id;

                return (
                  <React.Fragment key={t.id}>
                    <tr className={isOpen ? "row-expanded" : ""}>
                      {/* Expand toggle */}


                      {/* Name */}
                      <td>
                        <div className="tenant-name-cell">
                          <Initials name={t.name} size={34} colors={colors} />
                          <div>
                            <div className="tenant-name">{t.name}</div>
                            <div className="tenant-slug">/{t.slug}</div>
                          </div>
                        </div>
                      </td>

                      {/* Industry */}
                      <td style={{ color: "var(--text-secondary)", fontSize: 13 }}>
                        {t.industry}
                      </td>

                      {/* Plan */}
                      <td>
                        <span className={`plan-badge ${plan.cls}`}>
                          {plan.label}
                        </span>
                      </td>

                      {/* Status */}
                      <td>
                        <span className={`badge ${status.cls}`}>
                          <span className="badge-dot" />
                          {status.label}
                        </span>
                      </td>

                      {/* Users */}
                      <td>
                        <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>
                          {tenantUsers[t.id] !== undefined ? tenantUsers[t.id].length : (loadingUsers[t.id] ? <i className="fa-solid fa-spinner fa-spin" style={{ marginRight: 4 }} /> : t.users)}
                        </span>
                        <span style={{ color: "var(--text-muted)", fontSize: 11, marginLeft: 3 }}>users</span>
                      </td>

                      {/* Created */}
                      <td style={{ color: "var(--text-muted)", fontSize: 12.5 }}>
                        {t.created}
                      </td>

                      {/* Actions */}
                      <td>
                        <div className="row-actions">
                          <button
                            className="row-action-btn"
                            title="View users"
                            onClick={() => onView({
                              ...t,
                              employees: (tenantUsers[t.id] || []).map(u => ({
                                id: u.id,
                                name: u.user_name,
                                email: u.user_email,
                                phone: u.user_phone,
                                role: u.user_role === 'TENANT_ADMIN' ? 'admin' : u.user_role === 'MANAGER' ? 'manager' : 'employee'
                              })),
                              onRoleUpdate: (empId, newDisplayRole) => {
                                const apiRole = newDisplayRole === 'admin' ? 'TENANT_ADMIN' : newDisplayRole === 'manager' ? 'MANAGER' : 'EMPLOYEE';
                                setTenantUsers(prev => ({
                                  ...prev,
                                  [t.id]: prev[t.id].map(u => u.id === empId ? { ...u, user_role: apiRole } : u)
                                }));
                              }
                            })}
                          >
                            <i className="fa-regular fa-eye" />
                          </button>
                          <a className="row-action-btn" title="Go tenant" target="_blank" href={`${TENANT_URL}${t.slug}/auth`}>
                            <i className="fa-solid fa-arrow-up-right-from-square" />
                          </a>
                          <button
                            className="row-action-btn danger"
                            title="Delete tenant"
                            onClick={() => onDelete(t)}
                          >
                            <i className="fa-regular fa-trash-can" />
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Expandable users sub-row */}
                    
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
export default TenantTable;