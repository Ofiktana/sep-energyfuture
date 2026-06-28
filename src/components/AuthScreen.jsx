import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { isPasswordValid } from '../utils/passwordValidation';
import PasswordFeedback from './PasswordFeedback';

export default function AuthScreen() {
  const { login, signup } = useApp();
  const [authTab, setAuthTab] = useState('returning');
  const [loginError, setLoginError] = useState('');
  const [signupError, setSignupError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    const form = e.target;
    const username = form.elements['login-username'].value.trim();
    const loginPassword = form.elements['login-password'].value;

    if (!username) {
      setLoginError('Username is required.');
      return;
    }

    setIsSubmitting(true);
    try {
      await login(username, loginPassword);
    } catch (err) {
      setLoginError(err.message || 'Unable to sign in. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setSignupError('');
    const form = e.target;
    const fullName = form.elements['signup-fullname'].value.trim();
    const username = form.elements['signup-username'].value.trim();
    const affiliation = form.elements['signup-affiliation'].value.trim();
    const role = form.elements['signup-role'].value.trim();
    const signupPassword = form.elements['signup-password'].value;
    const signupConfirmPassword = form.elements['signup-confirm-password'].value;

    try {
      if (fullName.length < 2) throw new Error('Full name must be at least 2 characters.');
      if (username.length < 2) throw new Error('Username must be at least 2 characters.');
      if (affiliation.length < 2) throw new Error('Affiliation is required.');
      if (role.length < 2) throw new Error('Role is required.');
      if (!isPasswordValid(signupPassword)) {
        throw new Error('Password does not meet all requirements.');
      }
      if (signupPassword !== signupConfirmPassword) {
        throw new Error('Passwords do not match.');
      }

      setIsSubmitting(true);
      await signup({ fullName, username, affiliation, role, password: signupPassword });
    } catch (err) {
      setSignupError(err.message || 'Unable to create account. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const switchTab = (tab) => {
    setAuthTab(tab);
    setLoginError('');
    setSignupError('');
    setPassword('');
    setConfirmPassword('');
  };

  const passwordsMatch = confirmPassword.length > 0 && password === confirmPassword;
  const passwordsMismatch = confirmPassword.length > 0 && password !== confirmPassword;

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
            onClick={() => switchTab('returning')}
          >
            Returning User
          </button>
          <button
            type="button"
            className={`auth-tab-btn ${authTab === 'new' ? 'active' : ''}`}
            onClick={() => switchTab('new')}
          >
            New User
          </button>
        </div>

        <div className={`auth-form-panel ${authTab === 'returning' ? 'active' : ''}`}>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label" htmlFor="login-username">
                Username
              </label>
              <input
                className="form-input"
                type="text"
                id="login-username"
                name="login-username"
                placeholder="janeDoe"
                autoComplete="username"
                disabled={isSubmitting}
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
                autoComplete="current-password"
                disabled={isSubmitting}
              />
            </div>
            {loginError && <div className="form-error">{loginError}</div>}
            <div style={{ marginTop: '20px' }}>
              <button
                type="submit"
                className="btn btn-lemon btn-full btn-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Signing in…' : '🔐 Sign In'}
              </button>
            </div>
          </form>
        </div>

        <div className={`auth-form-panel ${authTab === 'new' ? 'active' : ''}`}>
          <form onSubmit={handleSignup}>
            <div className="form-group">
              <label className="form-label" htmlFor="signup-fullname">
                Full Name
              </label>
              <input
                className="form-input"
                type="text"
                id="signup-fullname"
                name="signup-fullname"
                placeholder="Dr. Jane Doe"
                autoComplete="name"
                disabled={isSubmitting}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="signup-username">
                Username
              </label>
              <input
                className="form-input"
                type="text"
                id="signup-username"
                name="signup-username"
                placeholder="janeDoe"
                autoComplete="username"
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitting}
              />
              <PasswordFeedback password={password} />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="signup-confirm-password">
                Confirm Password
              </label>
              <input
                className="form-input"
                type="password"
                id="signup-confirm-password"
                name="signup-confirm-password"
                placeholder="••••••••"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isSubmitting}
              />
              {passwordsMismatch && (
                <div className="form-error" style={{ marginTop: '10px' }}>
                  Passwords do not match.
                </div>
              )}
              {passwordsMatch && (
                <div className="form-success" style={{ marginTop: '10px' }}>
                  Passwords match.
                </div>
              )}
            </div>
            {signupError && <div className="form-error">{signupError}</div>}
            <div style={{ marginTop: '20px' }}>
              <button
                type="submit"
                className="btn btn-lemon btn-full btn-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating account…' : '🌱 Create Account'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
