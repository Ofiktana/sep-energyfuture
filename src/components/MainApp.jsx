import { useState } from 'react';
import { getInitials } from '../utils/helpers';
import { useApp } from '../context/AppContext';
import AdminTab from './AdminTab';
import GameTab from './GameTab';
import LeaderboardTab from './LeaderboardTab';
import Logo from './Logo';

export default function MainApp() {
  const { user, logout } = useApp();
  const [currentTab, setCurrentTab] = useState('game');
  const [refreshKey, setRefreshKey] = useState(0);

  const isAdmin = user.isAdmin === true;
  const initials = getInitials(user.fullName);

  const handleDataChange = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const tabs = [
    { id: 'game', label: '🎮 Game' },
    { id: 'leaderboard', label: '🏆 Leaderboard' },
  ];

  if (isAdmin) {
    tabs.push({ id: 'admin', label: '⚙️ Admin' });
  }

  return (
    <div className="main-shell">
      <header className="app-header">
        <div className="header-brand">
          <Logo />
          ⚡ Energy Future
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <div className="header-user">
            <div className="header-avatar">{initials}</div>
            <div className="header-user-info">
              <div className="header-user-name">{user.fullName}</div>
              <div className="header-user-role">
                {user.role} · {user.affiliation}
              </div>
            </div>
          </div>
          <button type="button" id="logout-btn" className="btn btn-danger btn-sm" onClick={logout}>
            ↩ Sign Out
          </button>
        </div>
      </header>

      <div className="tabs-bar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`tab-btn ${currentTab === tab.id ? 'active' : ''}`}
            onClick={() => setCurrentTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="tab-panel">
        <div className={`tab-content ${currentTab === 'game' ? 'active' : ''}`}>
          <GameTab user={user} onScoreSaved={handleDataChange} />
        </div>
        <div className={`tab-content ${currentTab === 'leaderboard' ? 'active' : ''}`}>
          <LeaderboardTab refreshKey={refreshKey} />
        </div>
        {isAdmin && (
          <div className={`tab-content ${currentTab === 'admin' ? 'active' : ''}`}>
            <AdminTab refreshKey={refreshKey} onDataChange={handleDataChange} />
          </div>
        )}
      </div>
    </div>
  );
}
