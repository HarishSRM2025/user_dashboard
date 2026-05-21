import React, { useState } from 'react'
import { fetchWithAuth } from '../../utils/fetchWithAuth';
import CustomRoleSelect from './CustomRoleSelect';

/* ════════════════════════════════════
   SHARED CONSTANTS
════════════════════════════════════ */
const AVATAR_COLORS = [
  ["#3B82F6", "#1E3A8A"],
  ["#8B5CF6", "#6D28D9"],
  ["#10B981", "#047857"],
  ["#F59E0B", "#B45309"],
  ["#EF4444", "#B91C1C"],
  ["#06B6D4", "#0E7490"],
];

const getColor = (i) => AVATAR_COLORS[i % AVATAR_COLORS.length];

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

/* ════════════════════════════════════
   COMPONENT
════════════════════════════════════ */
const ViewUsersModal = ({ tenant, onClose }) => {
  const [employees, setEmployees] = useState(tenant?.employees || []);
  const [updatingId, setUpdatingId] = useState(null);

  if (!tenant) return null;

  const colors = getColor(0);

  const handleRoleChange = async (empId, newDisplayRole) => {
    // Map display role back to API role format
    const apiRole = newDisplayRole === 'admin' ? 'TENANT_ADMIN' : newDisplayRole === 'manager' ? 'MANAGER' : 'EMPLOYEE';

    setUpdatingId(empId);
    try {
      const authApiUrl = import.meta.env.VITE_AUTH_API_URL;
      const res = await fetchWithAuth(`${authApiUrl}/tenant/user/role/${empId}`, {
        method: 'PUT',
        body: JSON.stringify({ user_role: apiRole })
      });
      const data = await res.json();
      if (data.success) {
        setEmployees(prev => prev.map(emp => emp.id === empId ? { ...emp, role: newDisplayRole } : emp));
        if (tenant.onRoleUpdate) tenant.onRoleUpdate(empId, newDisplayRole);
      } else {
        alert("Failed to update role: " + data.message);
      }
    } catch (e) {
      alert("Error updating role");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <div className="modal-header-left">
            <div
              className="modal-icon"
              style={{
                background: `linear-gradient(135deg,${getColor(tenant.id % 6)[0]},${getColor(tenant.id % 6)[1]})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 16, color: "#fff", borderRadius: "var(--radius-sm)"
              }}
            >
              {tenant.name[0]}
            </div>
            <div>
              <div className="modal-title">{tenant.name}</div>
              <div className="modal-sub">/{tenant.slug} · {tenant.industry}</div>
            </div>
          </div>
          <button className="modal-close" onClick={onClose}>
            <i className="fa-solid fa-xmark" />
          </button>
        </div>

        <div className="modal-body">
          {/* Tenant meta */}
          <div className="modal-tenant-info">
            <Initials
              name={tenant.name}
              size={42}
              radius="var(--radius-xs)"
              colors={getColor(tenant.id % 6)}
            />
            <div>
              <div className="modal-tenant-name">{tenant.name}</div>
              <div className="modal-tenant-meta">
                <span className={`badge ${STATUS_META[tenant.status].cls}`}>
                  <span className="badge-dot" />{STATUS_META[tenant.status].label}
                </span>
                <span className={`plan-badge ${PLAN_META[tenant.plan].cls}`}>
                  {PLAN_META[tenant.plan].label}
                </span>
                <span style={{ color: "var(--text-muted)", fontSize: 11 }}>
                  <i className="fa-regular fa-calendar" style={{ marginRight: 4 }} />
                  Since {tenant.created}
                </span>
              </div>
            </div>
          </div>

          {/* Section label */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            marginBottom: -4
          }}>
            <div className="pf-label" style={{ marginBottom: 0 }}>
              <i className="fa-solid fa-users" style={{ marginRight: 6, color: "var(--bright-blue)" }} />
              Team Members — {employees.length}
            </div>

          </div>

          {/* User list */}
          <div className="modal-user-list">
            {employees.map((emp, i) => {
              const c = getColor(i);
              const role = ROLE_META[emp.role] || ROLE_META.employee;
              return (
                <div className="modal-user-row" key={emp.id}>
                  <div
                    className="modal-user-av"
                    style={{ background: `linear-gradient(135deg,${c[0]},${c[1]})` }}
                  >
                    {emp.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="modal-user-name">{emp.name}</div>
                    <div className="modal-user-email">{emp.email}</div>
                    <div className="modal-user-phone">
                      <i className="fa-solid fa-phone" style={{ fontSize: 9 }} />{emp.phone}
                    </div>
                  </div>
                  <CustomRoleSelect
                    role={emp.role}
                    onChange={(newDisplayRole) => handleRoleChange(emp.id, newDisplayRole)}
                    disabled={updatingId === emp.id}
                  />
                  <div style={{ display: "flex", gap: 4 }}>
                    <button className="row-action-btn danger" title="Remove user">
                      <i className="fa-regular fa-trash-can" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={onClose}>Close</button>
          <a className="btn btn-primary" style={{ textDecoration: 'none' }} title="View tenant" target="_blank" href={`${import.meta.env.VITE_TENANT_URL}${tenant.slug}`}>
            <i className="fa-solid fa-arrow-up-right-from-square" /> View Tenant
          </a>
        </div>
      </div>
    </div>
  );
}

export default ViewUsersModal