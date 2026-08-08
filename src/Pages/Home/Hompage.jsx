import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./homepage.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import ViewUsersModal from "../../Components/Home/ViewUsersModal";
import TenantTable from "../../Components/Home/TenantTable";
import CreateTenantModal from "../../Components/Home/createTenantModal";
import DeleteConfirmModal from "../../Components/Home/DeleteConfirmModal";
import { fetchWithAuth } from "../../utils/fetchWithAuth";

/* ════════════════════════════════════
   SEED DATA
════════════════════════════════════ */
const AVATAR_COLORS = [
  ["#3B82F6","#1E3A8A"],
  ["#8B5CF6","#6D28D9"],
  ["#10B981","#047857"],
  ["#F59E0B","#B45309"],
  ["#EF4444","#B91C1C"],
  ["#06B6D4","#0E7490"],
];

const getColor = (i) => AVATAR_COLORS[i % AVATAR_COLORS.length];

const PLAN_META = {
  enterprise: { label: "Enterprise", cls: "plan-enterprise" },
  pro:        { label: "Pro",        cls: "plan-pro"        },
  starter:    { label: "Starter",    cls: "plan-starter"    },
};

const STATUS_META = {
  active:    { label: "Active",    cls: "badge-active"    },
  trial:     { label: "Trial",     cls: "badge-trial"     },
  suspended: { label: "Suspended", cls: "badge-suspended" },
  inactive:  { label: "Inactive",  cls: "badge-inactive"  },
};

const ROLE_META = {
  admin:    { label: "Admin",    cls: "role-admin"    },
  manager:  { label: "Manager",  cls: "role-manager"  },
  employee: { label: "Employee", cls: "role-employee" },
  viewer:   { label: "Viewer",   cls: "role-viewer"   },
};

const INDUSTRIES = [
  "Manufacturing","IT Services","Finance","Healthcare",
  "Retail","HR Consulting","Education","Logistics",
];

/* ════════════════════════════════════
   HELPERS
════════════════════════════════════ */
function Initials({ name, size = 34, radius = "var(--radius-xs)", colors }) {
  const letters = name.split(" ").map(w => w[0]).join("").slice(0,2).toUpperCase();
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
   STAT STRIP
════════════════════════════════════ */
function StatStrip({ tenants }) {
  const total   = tenants.length;
  const active  = tenants.filter(t => t.status === "active").length;
  const users   = tenants.reduce((a,t) => a + t.users, 0);
  const trial   = tenants.filter(t => t.status === "trial").length;

  return (
    <div className="stat-strip">
      <div className="stat-tile">
        <div className="stat-tile-icon icon-blue"><i className="fa-solid fa-building" /></div>
        <div className="stat-tile-body">
          <div className="stat-tile-value">{total}</div>
          <div className="stat-tile-label">Total Tenants</div>
          <div className="stat-tile-delta delta-up"><i className="fa-solid fa-arrow-up" />+2 this month</div>
        </div>
      </div>
      <div className="stat-tile">
        <div className="stat-tile-icon icon-green"><i className="fa-solid fa-circle-check" /></div>
        <div className="stat-tile-body">
          <div className="stat-tile-value">{active}</div>
          <div className="stat-tile-label">Active Tenants</div>
          <div className="stat-tile-delta delta-up"><i className="fa-solid fa-arrow-up" />{total ? Math.round((active/total)*100) : 0}% active rate</div>
        </div>
      </div>
      <div className="stat-tile">
        <div className="stat-tile-icon icon-purple"><i className="fa-solid fa-users" /></div>
        <div className="stat-tile-body">
          <div className="stat-tile-value">{users.toLocaleString()}</div>
          <div className="stat-tile-label">Total Users</div>
          <div className="stat-tile-delta delta-up"><i className="fa-solid fa-arrow-up" />+48 this week</div>
        </div>
      </div>
      <div className="stat-tile">
        <div className="stat-tile-icon icon-amber"><i className="fa-solid fa-hourglass-half" /></div>
        <div className="stat-tile-body">
          <div className="stat-tile-value">{trial}</div>
          <div className="stat-tile-label">On Trial</div>
          <div className="stat-tile-delta delta-down"><i className="fa-solid fa-arrow-down" />Expires soon</div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════
   ROOT PAGE
════════════════════════════════════ */
export default function Homepage() {
  const navigate = useNavigate();
  const [tenants,        setTenants]        = useState([]);
  const [viewTenant,     setViewTenant]     = useState(null);
  const [isCreateOpen,   setIsCreateOpen]   = useState(false);
  const [isRefreshing,   setIsRefreshing]   = useState(false);
  const [tenantToDelete, setTenantToDelete] = useState(null);
  const [isDeleting,     setIsDeleting]     = useState(false);

  // Map API fields to table expectations
  const mapApiTenantToTable = (t) => ({
    id: t.id,
    name: t.tenant_name,
    slug: t.slug,
    industry: t.industry || "Manufacturing",
    plan: t.plan || "starter",
    status: t.status || "trial",
    users: t.users || 0,
    created: new Date(t.createdAt).toLocaleDateString("en-IN",{ day:"numeric", month:"short", year:"numeric" }),
    employees: []
  });

  const fetchTenants = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const authApiUrl = import.meta.env.VITE_AUTH_API_URL;
      const res = await fetchWithAuth(`${authApiUrl}/tenant/get/all`);
      const data = await res.json();
      if (data.success && data.data && data.data.data) {
        setTenants(data.data.data.map(mapApiTenantToTable));
      } else if (data.success && Array.isArray(data.data)) {
        setTenants(data.data.map(mapApiTenantToTable));
      } else {
        setTenants([]);
      }
    } catch (error) {
      console.error("Failed to fetch tenants:", error);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchTenants();
  }, [fetchTenants]);

  useEffect(() => {
    const ensureAuth = () => {
      const userDataStr = localStorage.getItem("hrm_user_data");
      if (!userDataStr) {
        navigate("/signin", { replace: true });
        return false;
      }
      return true;
    };

    const handlePageShow = () => {
      ensureAuth();
    };

    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, [navigate]);

  const handleRefresh = () => {
    fetchTenants();
  };

  const handleCreate = async (form) => {
    try {
      const userDataStr = localStorage.getItem('hrm_user_data');
      if (!userDataStr) {
        alert("User data not found in local storage. Please sign in again.");
        return;
      }
      const userData = JSON.parse(userDataStr);
      const ownerId = userData?.data?.data?.user?.id || userData?.data?.user?.id || userData?.data?.id || userData?.id;

      if (!ownerId) {
        alert("Could not extract user ID from local storage.");
        return;
      }

      const authApiUrl = import.meta.env.VITE_AUTH_API_URL;
      const payload = {
        tenant_name: form.tenantName,
        slug: form.slug,
        industry: form.industry,
        plan: form.plan,
        status: "trial",
        tenant_owner_id: ownerId
      };
      const response = await fetchWithAuth(`${authApiUrl}/tenant/create`, {
        method: "POST",
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        alert(data.message || data.data?.message || "Failed to create tenant");
        return;
      }

      fetchTenants();
    } catch (error) {
      console.error(error);
      alert("Error creating tenant");
    }
  };

  const handleDeleteClick = (tenant) => {
    setTenantToDelete(tenant);
  };

  const confirmDelete = async () => {
    if (!tenantToDelete) return;
    setIsDeleting(true);

    try {
      const authApiUrl = import.meta.env.VITE_AUTH_API_URL;
      const response = await fetchWithAuth(`${authApiUrl}/tenant/delete/${tenantToDelete.id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        alert(data.message || data.data?.message || "Failed to delete tenant");
        setIsDeleting(false);
        return;
      }
      fetchTenants();
      if (viewTenant?.id === tenantToDelete.id) setViewTenant(null);
      setTenantToDelete(null);
    } catch (error) {
      console.error("Delete Error:", error);
      alert("Error deleting tenant");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="tm-root">
      <Sidebar />
      <div className="tm-main-wrapper">
        <Topbar />
        <main className="tm-main">
          {/* Page header */}
          <div className="page-header">
            <div className="page-header-left">
              <div className="page-breadcrumb">
                <span>PeopleOS</span>
                <i className="fa-solid fa-chevron-right" />
                <span className="bc-current">Tenant Management</span>
              </div>
              <h1 className="page-title">Tenant Management</h1>
              <p className="page-subtitle">
                Create, configure, and monitor all organisations on your platform
              </p>
            </div>
            <div className="page-header-right">
              <button className="btn btn-ghost" onClick={handleRefresh} disabled={isRefreshing}>
                <i className={`fa-solid fa-rotate ${isRefreshing ? 'fa-spin' : ''}`} /> Refresh
              </button>
              <button className="btn btn-primary" onClick={() => setIsCreateOpen(true)}>
                <i className="fa-solid fa-plus" /> New Tenant
              </button>
            </div>
          </div>

          {/* Stats */}
          <StatStrip tenants={tenants} />

          {/* Content grid */}
          <div className="content-grid">
            <TenantTable
              tenants={tenants}
              onView={setViewTenant}
              onDelete={handleDeleteClick}
            />
          </div>
        </main>
      </div>

      {/* View users modal */}
      {viewTenant && (
        <ViewUsersModal
          tenant={viewTenant}
          onClose={() => setViewTenant(null)}
        />
      )}

      {/* Create tenant modal */}
      {isCreateOpen && (
        <CreateTenantModal
          onClose={() => setIsCreateOpen(false)}
          onCreate={handleCreate}
        />
      )}

      {/* Delete confirmation modal */}
      <DeleteConfirmModal
        tenant={tenantToDelete}
        onClose={() => setTenantToDelete(null)}
        onConfirm={confirmDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
}
