import { useEffect, useState } from 'react';
import { getCurrentSeason, updateSeason } from '../services/seasonService';
import { deleteUser, fetchAllUsers, updateUser } from '../services/usersService';

export default function AdminTab({ refreshKey, onDataChange }) {
  const [seasonInput, setSeasonInput] = useState('');
  const [displaySeason, setDisplaySeason] = useState('');
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editForm, setEditForm] = useState({ fullName: '', affiliation: '', role: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const loadData = async () => {
    setIsLoading(true);
    setError('');
    try {
      const [season, firestoreUsers] = await Promise.all([
        getCurrentSeason(),
        fetchAllUsers(),
      ]);
      setDisplaySeason(season);
      setSeasonInput(season);
      setUsers(firestoreUsers);
    } catch (err) {
      setError(err.message || 'Unable to load admin data.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [refreshKey]);

  const handleUpdateSeason = async () => {
    const newSeason = seasonInput.trim();
    if (!newSeason) return;

    setIsSaving(true);
    setError('');
    try {
      const updated = await updateSeason(newSeason);
      setDisplaySeason(updated);
      onDataChange?.();
    } catch (err) {
      setError(err.message || 'Unable to update season.');
    } finally {
      setIsSaving(false);
    }
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

  const saveEdit = async (userId) => {
    setIsSaving(true);
    setError('');
    try {
      await updateUser(userId, {
        fullName: editForm.fullName,
        affiliation: editForm.affiliation,
        role: editForm.role,
      });
      setEditingUserId(null);
      await loadData();
      onDataChange?.();
    } catch (err) {
      setError(err.message || 'Unable to update user.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user and all their scores?')) {
      return;
    }

    setIsSaving(true);
    setError('');
    try {
      await deleteUser(userId);
      await loadData();
      onDataChange?.();
    } catch (err) {
      setError(err.message || 'Unable to delete user.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <div className="lb-header">⚙️ Admin Panel</div>
      <div className="lb-sub">Manage seasons and users</div>

      {error && <div className="form-error" style={{ marginBottom: '16px' }}>{error}</div>}

      <div className="admin-season-box">
        <span className="label">📅 Current Season</span>
        <span className="value">{displaySeason || '…'}</span>
        <input
          type="text"
          value={seasonInput}
          onChange={(e) => setSeasonInput(e.target.value)}
          placeholder="e.g. Season 2"
          disabled={isLoading || isSaving}
        />
        <button
          type="button"
          className="btn btn-lemon btn-sm"
          onClick={handleUpdateSeason}
          disabled={isLoading || isSaving}
        >
          Update Season
        </button>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginLeft: '4px' }}>
          (Scores will be tagged with this season)
        </span>
      </div>

      <div style={{ marginTop: '24px', overflowX: 'auto' }}>
        {isLoading ? (
          <div className="lb-empty">Loading users…</div>
        ) : (
          <table className="lb-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Name</th>
                <th>Affiliation</th>
                <th>Role</th>
                <th style={{ textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="lb-empty" style={{ padding: '40px' }}>
                    No users in Firestore yet.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} data-user-id={user.id}>
                    {editingUserId === user.id ? (
                      <>
                        <td>
                          <span className="lb-meta">{user.username}</span>
                        </td>
                        <td>
                          <input
                            className="inline-edit-input"
                            type="text"
                            value={editForm.fullName}
                            onChange={(e) =>
                              setEditForm((prev) => ({ ...prev, fullName: e.target.value }))
                            }
                            disabled={isSaving}
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
                            disabled={isSaving}
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
                            disabled={isSaving}
                          />
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <div className="admin-actions" style={{ justifyContent: 'center' }}>
                            <button
                              type="button"
                              className="btn btn-lemon btn-sm"
                              onClick={() => saveEdit(user.id)}
                              disabled={isSaving}
                            >
                              💾 Save
                            </button>
                            <button
                              type="button"
                              className="btn btn-ghost btn-sm"
                              onClick={cancelEdit}
                              disabled={isSaving}
                            >
                              ↩ Cancel
                            </button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>
                          <span className="lb-meta">{user.username}</span>
                        </td>
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
                              disabled={isSaving}
                            >
                              ✏️ Edit
                            </button>
                            <button
                              type="button"
                              className="btn btn-danger btn-sm"
                              onClick={() => handleDelete(user.id)}
                              disabled={isSaving}
                            >
                              🗑 Delete
                            </button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
      <div style={{ marginTop: '12px', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
        * Deleting a user will also remove their scores from Firestore.
      </div>
    </>
  );
}
