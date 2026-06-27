import { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function AuthScreen() {
  const { login, signup } = useApp();
  const [authTab, setAuthTab] = useState('returning');
  const [loginError, setLoginError] = useState('');
  const [signupError, setSignupError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    const form = e.target;
    const name = form.elements['login-name'].value.trim();
    const password = form.elements['login-password'].value.trim();

    try {
      login(name, password);
    } catch (err) {
      setLoginError(err.message);
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setSignupError('');
    const form = e.target;
    const name = form.elements['signup-name'].value.trim();
    const affiliation = form.elements['signup-affiliation'].value.trim();
    const role = form.elements['signup-role'].value.trim();
    const password = form.elements['signup-password'].value.trim();

    try {
      if (name.length < 2) throw new Error('Name must be at least 2 characters.');
      if (affiliation.length < 2) throw new Error('Affiliation is required.');
      if (role.length < 2) throw new Error('Role is required.');
      if (password.length < 4) throw new Error('Password must be at least 4 characters.');
      signup(name, affiliation, role, password);
    } catch (err) {
      setSignupError(err.message);
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="auth-logo-ring">⚡</div>
        <h1 className="auth-title">Energy Future</h1>
        <p className="auth-subtitle">Seplat Energy Plc</p>

        <div className="auth-tabs">
          <button
            type="button"
            className={`auth-tab-btn ${authTab === 'returning' ? 'active' : ''}`}
            onClick={() => setAuthTab('returning')}
          >
            Returning User
          </button>
          <button
            type="button"
            className={`auth-tab-btn ${authTab === 'new' ? 'active' : ''}`}
            onClick={() => setAuthTab('new')}
          >
            New User
          </button>
        </div>

        <div className={`auth-form-panel ${authTab === 'returning' ? 'active' : ''}`}>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label" htmlFor="login-name">
                Username
              </label>
              <input
                className="form-input"
                type="text"
                id="login-name"
                name="login-name"
                placeholder="janeDoe"
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="login-password">
                Password
              </label>
              <input
                className="form-input"
                type="password"
                id="login-password"
                name="login-password"
                placeholder="••••••••"
              />
            </div>
            {loginError && <div className="form-error">{loginError}</div>}
            <div style={{ marginTop: '20px' }}>
              <button type="submit" className="btn btn-lemon btn-full btn-lg">
                🔐 Sign In
              </button>
            </div>
          </form>
        </div>

        <div className={`auth-form-panel ${authTab === 'new' ? 'active' : ''}`}>
          <form onSubmit={handleSignup}>
            <div className="form-group">
              <label className="form-label" htmlFor="signup-name">
                Username
              </label>
              <input
                className="form-input"
                type="text"
                id="signup-name"
                name="signup-name"
                placeholder="janeDoe"
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="signup-affiliation">
                Affiliation
              </label>
              <input
                className="form-input"
                type="text"
                id="signup-affiliation"
                name="signup-affiliation"
                placeholder="Clean Energy Institute"
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="signup-role">
                Role
              </label>
              <input
                className="form-input"
                type="text"
                id="signup-role"
                name="signup-role"
                placeholder="Research Director"
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="signup-password">
                Password
              </label>
              <input
                className="form-input"
                type="password"
                id="signup-password"
                name="signup-password"
                placeholder="••••••••"
              />
            </div>
            {signupError && <div className="form-error">{signupError}</div>}
            <div style={{ marginTop: '20px' }}>
              <button type="submit" className="btn btn-lemon btn-full btn-lg">
                🌱 Create Account
              </button>
            </div>
          </form>
        </div>

        {/* <p className="auth-footer-note" style={{ marginTop: '16px' }}>
          Demo credentials:{' '}
          <strong style={{ color: 'var(--text-muted)' }}>Admin User / admin123</strong> or{' '}
          <strong style={{ color: 'var(--text-muted)' }}>Dr. Sarah Chen / password</strong>
        </p> */}
      </div>
    </div>
  );
}
