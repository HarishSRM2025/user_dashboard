import React from 'react';

export default function DeleteConfirmModal({ tenant, onClose, onConfirm, isDeleting }) {
  if (!tenant) return null;

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && !isDeleting && onClose()}>
      <div className="modal" style={{ maxWidth: 400 }}>
        <div className="modal-header">
          <div className="modal-header-left">
            <div className="modal-icon" style={{ backgroundColor: "rgba(220, 38, 38, 0.1)", color: "rgb(220, 38, 38)" }}>
              <i className="fa-solid fa-triangle-exclamation"></i>
            </div>
            <div>
              <div className="modal-title">Delete Tenant</div>
            </div>
          </div>
          <button className="modal-close" onClick={onClose} disabled={isDeleting}>
            <i className="fa-solid fa-xmark" />
          </button>
        </div>

        <div className="modal-body" style={{ padding: "20px 24px" }}>
          <p style={{ margin: 0, color: "var(--text-secondary)", lineHeight: "1.5" }}>
            Are you sure you want to delete <strong>{tenant.name}</strong>? This action cannot be undone and will permanently remove all associated data.
          </p>
        </div>

        <div className="modal-footer" style={{ borderTop: "none", paddingTop: 0 }}>
          <button className="btn btn-ghost" onClick={onClose} disabled={isDeleting}>
            Cancel
          </button>
          <button 
            className="btn" 
            style={{ backgroundColor: "rgb(220, 38, 38)", color: "white", border: "none" }}
            onClick={onConfirm}
            disabled={isDeleting}
          >
           {isDeleting ? "Deleting..." : "Delete Tenant"}
          </button>
        </div>
      </div>
    </div>
  );
}
