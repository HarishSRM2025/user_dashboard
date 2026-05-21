import React, { useState, useRef, useEffect } from "react";

const ROLE_META = {
  admin:    { label: "Admin",    cls: "role-admin"    },
  manager:  { label: "Manager",  cls: "role-manager"  },
  employee: { label: "Employee", cls: "role-employee" },
  viewer:   { label: "Viewer",   cls: "role-viewer"   },
};

export default function CustomRoleSelect({ role, onChange, disabled }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentRole = ROLE_META[role] || ROLE_META.employee;

  return (
    <div ref={ref} style={{ position: "relative", display: "inline-block" }}>
      <button 
        className={`user-role-badge ${currentRole.cls}`}
        onClick={() => !disabled && setOpen(!open)}
        style={{ border: "none", cursor: disabled ? "wait" : "pointer", opacity: disabled ? 0.6 : 1, display: "flex", alignItems: "center", gap: 6, margin: 0 }}
      >
        <span>{currentRole.label}</span>
        <i className="fa-solid fa-chevron-down" style={{ fontSize: 10, opacity: 0.7 }} />
      </button>
      
      {open && !disabled && (
        <div style={{
          position: "absolute", top: "100%", left: 0, marginTop: 8,
          background: "var(--light-gray)", border: "1px solid var(--border)",
          borderRadius: "var(--radius-sm)", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)",
          zIndex: 50, minWidth: 140, padding: 6,
          animation: "fadeIn 0.15s ease",
        }}>
           <div style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", padding: "4px 8px 8px 8px", borderBottom: "1px solid var(--border)", marginBottom: 4 }}>
             CHANGE ROLE
           </div>
          {["admin", "manager", "employee"].map(r => (
            <div 
              key={r}
              onClick={() => { onChange(r); setOpen(false); }}
              style={{
                padding: "8px 10px", fontSize: 13, cursor: "pointer",
                borderRadius: "var(--radius-xs)", display: "flex", alignItems: "center",
                justifyContent: "space-between", color: "var(--text-primary)",
                background: role === r ? "var(--bg-secondary)" : "transparent",
                fontWeight: role === r ? 600 : 400
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "var(--bg-secondary)" }}
              onMouseLeave={(e) => { e.currentTarget.style.background = role === r ? "var(--bg-secondary)" : "transparent" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span className={`badge-dot ${ROLE_META[r].cls.replace('role-', 'badge-')}`} style={{ background: r === 'admin' ? '#3B82F6' : r === 'manager' ? '#8B5CF6' : '#10B981', display:'inline-block', width:8, height:8, borderRadius:'50%' }} />
                {ROLE_META[r].label}
              </div>
              {role === r && <i className="fa-solid fa-check" style={{ color: "var(--bright-blue)", fontSize: 12 }}/>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
