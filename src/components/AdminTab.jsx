import { useState } from 'react';
import {
  deleteUser,
  getAllUsers,
  getCurrentSeason,
  updateSeason,
  updateUser,
} from '../services/db';

export default function AdminTab({ onDataChange }) {
  const [seasonInput, setSeasonInput] = useState(getCurrentSeason());
  const [displaySeason, setDisplaySeason] = useState(getCurrentSeason());
  const [users, setUsers] = useState(getAllUsers());
  const [editingUserId, setEditingUserId] = useState(null);
  const [editForm, setEditForm] = useState({ fullName: '', affiliation: '', role: '' });

  const refreshUsers = () => {
    setUsers(getAllUsers());
    setDisplaySeason(getCurrentSeason());
    setSeasonInput(getCurrentSeason());
  };

  const handleUpdateSeason = () => {
    const newSeason = seasonInput.trim();
    if (!newSeason) return;
    updateSeason(newSeason);
    setDisplaySeason(newSeason);
    onDataChange?.();
  };

  const startEdit = (user) => {
    setEditingUserId(user.id);
    setEditForm({
      fullName: user.fullName,
      affiliation: user.affiliation,
      role: user.role,
    });
  };

  const cancelEdit = () => {
    setEditingUserId(null);
  };

  const saveEdit = (userId) => {
    updateUser(userId, {
      fullName: editForm.fullName.trim(),
      affiliation: editForm.affiliation.trim(),
      role: editForm.role.trim(),
    });
    setEditingUserId(null);
    refreshUsers();
    onDataChange?.();
  };

  const handleDelete = (userId) => {
    if (!window.confirm('Are you sure you want to delete this user and all their scores?')) {
      return;
    }
    deleteUser(userId);
    refreshUsers();
    onDataChange?.();
  };

  return (
    <>
      <div className="lb-header">⚙️ Admin Panel</div>
      <div className="lb-sub">Manage seasons and users</div>

      <div className="admin-season-box">
        <span className="label">📅 Current Season</span>
        <span className="value">{displaySeason}</span>
        <input
          type="text"
          value={seasonInput}
          onChange={(e) => setSeasonInput(e.target.value)}
          placeholder="e.g. Season 2"
        />
        <button type="button" className="btn btn-lemon btn-sm" onClick={handleUpdateSeason}>
          Update Season
        </button>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginLeft: '4px' }}>
          (Scores will be tagged with this season)
        </span>
      </div>

      <div style={{ marginTop: '24px', overflowX: 'auto' }}>
        <table className="lb-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Affiliation</th>
              <th>Role</th>
              <th style={{ textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} data-user-id={user.id}>
                {editingUserId === user.id ? (
                  <>
                    <td>
                      <input
                        className="inline-edit-input"
                        type="text"
                        value={editForm.fullName}
                        onChange={(e) =>
                          setEditForm((prev) => ({ ...prev, fullName: e.target.value }))
                        }
                      />
                    </td>
                    <td>
                      <input
                        className="inline-edit-input"
                        type="text"
                        value={editForm.affiliation}
                        onChange={(e) =>
                          setEditForm((prev) => ({ ...prev, affiliation: e.target.value }))
                        }
                      />
                    </td>
                    <td>
                      <input
                        className="inline-edit-input"
                        type="text"
                        value={editForm.role}
                        onChange={(e) =>
                          setEditForm((prev) => ({ ...prev, role: e.target.value }))
                        }
                      />
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <div className="admin-actions" style={{ justifyContent: 'center' }}>
                        <button
                          type="button"
                          className="btn btn-lemon btn-sm"
                          onClick={() => saveEdit(user.id)}
                        >
                          💾 Save
                        </button>
                        <button
                          type="button"
                          className="btn btn-ghost btn-sm"
                          onClick={cancelEdit}
                        >
                          ↩ Cancel
                        </button>
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td>
                      <span className="lb-name">{user.fullName}</span>
                    </td>
                    <td>
                      <span className="lb-affil">{user.affiliation}</span>
                    </td>
                    <td>
                      <span className="lb-role">{user.role}</span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <div className="admin-actions" style={{ justifyContent: 'center' }}>
                        <button
                          type="button"
                          className="btn btn-ghost btn-sm"
                          onClick={() => startEdit(user)}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(user.id)}
                        >
                          🗑 Delete
                        </button>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: '12px', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
        * Deleting a user will also remove their scores.
      </div>
    </>
  );
}
